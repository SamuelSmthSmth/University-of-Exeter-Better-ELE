package uk.ac.exeter.ele3.ui.screens

import android.app.Activity
import android.app.PictureInPictureParams
import android.net.Uri
import android.os.Build
import android.util.Rational
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.annotation.OptIn
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.media3.common.MediaItem
import androidx.media3.common.PlaybackParameters
import androidx.media3.common.Player
import androidx.media3.common.util.UnstableApi
import androidx.media3.datasource.okhttp.OkHttpDataSource
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.source.DefaultMediaSourceFactory
import androidx.media3.ui.PlayerView
import kotlinx.coroutines.delay
import okhttp3.OkHttpClient
import uk.ac.exeter.ele3.data.AuthManager
import uk.ac.exeter.ele3.data.PanoptoRepository
import uk.ac.exeter.ele3.data.model.DeliveryResponse
import uk.ac.exeter.ele3.data.model.Recording
import uk.ac.exeter.ele3.data.model.StreamInfo
import uk.ac.exeter.ele3.ui.theme.*
import java.io.File
import java.util.concurrent.TimeUnit
import kotlin.math.abs

enum class PlayerLayoutMode {
    SIDE_BY_SIDE,
    PICTURE_IN_PICTURE,
    FOCUS
}

@OptIn(UnstableApi::class)
@Composable
fun PlayerScreen(
    recording: Recording,
    onBack: () -> Unit,
    repository: PanoptoRepository,
    authManager: AuthManager
) {
    val context = LocalContext.current
    val activity = context as? Activity

    var deliveryResponse by remember { mutableStateOf<DeliveryResponse?>(null) }
    var isLoading by remember { mutableStateOf(true) }
    var useWebFallback by remember { mutableStateOf(false) }

    var isPlaying by remember { mutableStateOf(false) }
    var currentPositionMs by remember { mutableStateOf(0L) }
    var durationMs by remember { mutableStateOf(1L) }
    var playbackSpeed by remember { mutableStateOf(1.0f) }
    var showCaptions by remember { mutableStateOf(true) }

    var controlsVisible by remember { mutableStateOf(true) }
    var lastInteractionTime by remember { mutableStateOf(System.currentTimeMillis()) }

    var layoutMode by remember { mutableStateOf(PlayerLayoutMode.SIDE_BY_SIDE) }
    var isSwapped by remember { mutableStateOf(false) }

    // ExoPlayer instances
    var primaryPlayer by remember { mutableStateOf<ExoPlayer?>(null) }
    var secondaryPlayer by remember { mutableStateOf<ExoPlayer?>(null) }

    DisposableEffect(Unit) {
        onDispose {
            primaryPlayer?.release()
            secondaryPlayer?.release()
        }
    }

    fun refreshInteraction() {
        lastInteractionTime = System.currentTimeMillis()
    }

    // Auto-hide controls after 3.5s of inactivity while playing
    LaunchedEffect(controlsVisible, isPlaying, lastInteractionTime) {
        if (controlsVisible && isPlaying) {
            delay(3500)
            controlsVisible = false
        }
    }

    // Load media: Offline check first, then online DeliveryInfo
    LaunchedEffect(recording.id) {
        // 1. Check offline file first
        val localFile = repository.getLocalFile(recording.id)
            ?: (if (recording.panoptoUrl.startsWith("/") && File(recording.panoptoUrl).exists()) File(recording.panoptoUrl) else null)

        if (localFile != null && localFile.exists() && localFile.length() > 50_000) {
            val pPlayer = ExoPlayer.Builder(context).build().apply {
                setMediaItem(MediaItem.fromUri(Uri.fromFile(localFile)))
                prepare()
                playWhenReady = true
                addListener(object : Player.Listener {
                    override fun onIsPlayingChanged(playing: Boolean) {
                        isPlaying = playing
                    }
                })
            }
            primaryPlayer = pPlayer
            isLoading = false
            useWebFallback = false
            return@LaunchedEffect
        }

        // 2. Online streaming
        isLoading = true
        val response = repository.fetchDeliveryInfo(recording.id)
        deliveryResponse = response
        isLoading = false

        if (!response.success || response.streams.isEmpty()) {
            useWebFallback = true
        }
    }

    // Initialize online ExoPlayers once streams are ready
    DisposableEffect(deliveryResponse) {
        val delivery = deliveryResponse
        if (delivery == null || !delivery.success || delivery.streams.isEmpty() || primaryPlayer != null) {
            return@DisposableEffect onDispose {}
        }

        val cookies = authManager.cookieString.value ?: ""
        val okHttpClient = OkHttpClient.Builder()
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(15, TimeUnit.SECONDS)
            .build()

        val dataSourceFactory = OkHttpDataSource.Factory(okHttpClient)
            .setUserAgent("Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36")
            .setDefaultRequestProperties(mapOf("Cookie" to cookies))

        val mediaSourceFactory = DefaultMediaSourceFactory(dataSourceFactory)

        val streams = delivery.streams
        val primaryStream = streams.find { it.streamType == 1 || it.tag == "dv" } ?: streams[0]
        val secondaryStream = streams.find { it != primaryStream } ?: streams.getOrNull(1)

        val pPlayer = ExoPlayer.Builder(context)
            .setMediaSourceFactory(mediaSourceFactory)
            .build().apply {
                setMediaItem(MediaItem.fromUri(primaryStream.m3u8Url))
                prepare()
                playWhenReady = true
            }

        val sPlayer = if (secondaryStream != null) {
            ExoPlayer.Builder(context)
                .setMediaSourceFactory(mediaSourceFactory)
                .build().apply {
                    setMediaItem(MediaItem.fromUri(secondaryStream.m3u8Url))
                    volume = 0f
                    prepare()
                    playWhenReady = true
                }
        } else null

        // Sync listener on primary player
        pPlayer.addListener(object : Player.Listener {
            override fun onIsPlayingChanged(playing: Boolean) {
                isPlaying = playing
                if (playing) sPlayer?.play() else sPlayer?.pause()
            }

            override fun onPlaybackParametersChanged(playbackParameters: PlaybackParameters) {
                sPlayer?.playbackParameters = playbackParameters
            }
        })

        // Restore saved watch position if available
        repository.getProgress(recording.id)?.let { saved ->
            if (saved.positionSeconds > 10) {
                pPlayer.seekTo(saved.positionSeconds * 1000)
                sPlayer?.seekTo(saved.positionSeconds * 1000)
            }
        }

        primaryPlayer = pPlayer
        secondaryPlayer = sPlayer

        onDispose {
            if (pPlayer.currentPosition > 3000) {
                repository.saveProgress(recording.id, pPlayer.currentPosition / 1000, pPlayer.duration.coerceAtLeast(1L) / 1000)
            }
            pPlayer.release()
            sPlayer?.release()
        }
    }

    // Periodic time & watch progress tracking
    LaunchedEffect(primaryPlayer) {
        val p = primaryPlayer ?: return@LaunchedEffect
        while (true) {
            currentPositionMs = p.currentPosition
            durationMs = p.duration.coerceAtLeast(1L)

            // Keep secondary player strictly in lockstep
            secondaryPlayer?.let { s ->
                if (abs(s.currentPosition - p.currentPosition) > 500) {
                    s.seekTo(p.currentPosition)
                }
            }

            // Persist watch progress every 5s
            if (currentPositionMs > 5000) {
                repository.saveProgress(recording.id, currentPositionMs / 1000, durationMs / 1000)
            }

            delay(250)
        }
    }

    // Active Closed Caption text
    val activeCaption = remember(currentPositionMs, showCaptions, deliveryResponse) {
        if (!showCaptions) null
        else {
            val currentSec = currentPositionMs / 1000.0
            deliveryResponse?.captions?.find { c ->
                currentSec >= c.time && currentSec <= (c.time + c.duration.coerceAtLeast(2.0))
            }?.text
        }
    }

    // Enter System Picture-in-Picture
    fun enterSystemPiP() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && activity != null) {
            val params = PictureInPictureParams.Builder()
                .setAspectRatio(Rational(16, 9))
                .build()
            activity.enterPictureInPictureMode(params)
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = null
            ) {
                controlsVisible = !controlsVisible
                refreshInteraction()
            }
    ) {
        if (isLoading) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator(color = ExeterMint)
            }
        } else if (useWebFallback) {
            // Web fallback player
            AndroidView(
                factory = { ctx ->
                    WebView(ctx).apply {
                        settings.apply {
                            javaScriptEnabled = true
                            domStorageEnabled = true
                            mediaPlaybackRequiresUserGesture = false
                            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                        }
                        webViewClient = WebViewClient()
                        loadUrl(recording.embedUrl)
                    }
                },
                modifier = Modifier.fillMaxSize()
            )
        } else {
            // Fullscreen Native Multi-Stream Layout
            val stream1 = if (!isSwapped) primaryPlayer else secondaryPlayer
            val stream2 = if (!isSwapped) secondaryPlayer else primaryPlayer

            Box(modifier = Modifier.fillMaxSize()) {
                when (layoutMode) {
                    PlayerLayoutMode.SIDE_BY_SIDE -> {
                        Row(modifier = Modifier.fillMaxSize()) {
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .fillMaxHeight()
                            ) {
                                stream1?.let { player ->
                                    AndroidView(
                                        factory = { ctx ->
                                            PlayerView(ctx).apply {
                                                this.player = player
                                                useController = false
                                                isClickable = false
                                                isFocusable = false
                                            }
                                        },
                                        modifier = Modifier.fillMaxSize()
                                    )
                                }
                            }

                            if (stream2 != null) {
                                Box(
                                    modifier = Modifier
                                        .weight(1f)
                                        .fillMaxHeight()
                                ) {
                                    AndroidView(
                                        factory = { ctx ->
                                            PlayerView(ctx).apply {
                                                this.player = stream2
                                                useController = false
                                                isClickable = false
                                                isFocusable = false
                                            }
                                        },
                                        modifier = Modifier.fillMaxSize()
                                    )
                                }
                            }
                        }
                    }

                    PlayerLayoutMode.PICTURE_IN_PICTURE -> {
                        Box(modifier = Modifier.fillMaxSize()) {
                            // Fullscreen Primary stream
                            stream1?.let { player ->
                                AndroidView(
                                    factory = { ctx ->
                                        PlayerView(ctx).apply {
                                            this.player = player
                                            useController = false
                                            isClickable = false
                                            isFocusable = false
                                        }
                                    },
                                    modifier = Modifier.fillMaxSize()
                                )
                            }

                            // Secondary Floating Corner PiP Bubble
                            if (stream2 != null) {
                                Box(
                                    modifier = Modifier
                                        .align(Alignment.BottomEnd)
                                        .padding(bottom = if (controlsVisible) 90.dp else 24.dp, end = 24.dp)
                                        .width(260.dp)
                                        .aspectRatio(16f / 9f)
                                        .clip(RoundedCornerShape(12.dp))
                                        .clickable { isSwapped = !isSwapped; refreshInteraction() }
                                ) {
                                    AndroidView(
                                        factory = { ctx ->
                                            PlayerView(ctx).apply {
                                                this.player = stream2
                                                useController = false
                                                isClickable = false
                                                isFocusable = false
                                            }
                                        },
                                        modifier = Modifier.fillMaxSize()
                                    )
                                }
                            }
                        }
                    }

                    PlayerLayoutMode.FOCUS -> {
                        Box(modifier = Modifier.fillMaxSize()) {
                            stream1?.let { player ->
                                AndroidView(
                                    factory = { ctx ->
                                        PlayerView(ctx).apply {
                                            this.player = player
                                            useController = false
                                            isClickable = false
                                            isFocusable = false
                                        }
                                    },
                                    modifier = Modifier.fillMaxSize()
                                )
                            }
                        }
                    }
                }

                // Transparent Gesture & Tap Interceptor over video to toggle controls
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .clickable(
                            interactionSource = remember { MutableInteractionSource() },
                            indication = null
                        ) {
                            controlsVisible = !controlsVisible
                            refreshInteraction()
                        }
                )

                // Closed Caption Overlay (remains visible even when controls hide)
                if (!activeCaption.isNullOrBlank()) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .padding(bottom = if (controlsVisible) 100.dp else 30.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color.Black.copy(alpha = 0.82f))
                            .padding(horizontal = 16.dp, vertical = 6.dp)
                    ) {
                        Text(
                            text = activeCaption,
                            style = MaterialTheme.typography.bodyLarge,
                            fontWeight = FontWeight.SemiBold,
                            color = Color.White
                        )
                    }
                }

                // ── Top Bar Overlay (Fades out with controls) ─────────────────────
                AnimatedVisibility(
                    visible = controlsVisible,
                    enter = fadeIn(),
                    exit = fadeOut(),
                    modifier = Modifier.align(Alignment.TopCenter)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(
                                Brush.verticalGradient(
                                    colors = listOf(Color.Black.copy(alpha = 0.85f), Color.Transparent)
                                )
                            )
                            .padding(horizontal = 20.dp, vertical = 16.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            IconButton(
                                onClick = onBack,
                                modifier = Modifier
                                    .clip(RoundedCornerShape(10.dp))
                                    .background(DarkSurface.copy(alpha = 0.8f))
                            ) {
                                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = TextPrimary)
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = recording.title,
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = TextPrimary,
                                maxLines = 1
                            )
                        }

                        // Swap Feeds button in top right
                        if (stream2 != null) {
                            IconButton(
                                onClick = { isSwapped = !isSwapped; refreshInteraction() },
                                modifier = Modifier
                                    .clip(RoundedCornerShape(10.dp))
                                    .background(DarkSurface.copy(alpha = 0.8f))
                            ) {
                                Icon(Icons.Default.SwapHoriz, contentDescription = "Swap Feeds", tint = ExeterMint)
                            }
                        }
                    }
                }

                // ── Bottom Controls Overlay (Fades out with controls) ─────────────
                AnimatedVisibility(
                    visible = controlsVisible,
                    enter = fadeIn(),
                    exit = fadeOut(),
                    modifier = Modifier.align(Alignment.BottomCenter)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(
                                Brush.verticalGradient(
                                    colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.92f))
                                )
                            )
                            .padding(horizontal = 24.dp, vertical = 12.dp)
                    ) {
                        // Timeline Scrubber
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = formatTime(currentPositionMs),
                                style = MaterialTheme.typography.labelSmall,
                                color = ExeterMint
                            )
                            Slider(
                                value = (currentPositionMs.toFloat() / durationMs.toFloat()).coerceIn(0f, 1f),
                                onValueChange = { fraction ->
                                    refreshInteraction()
                                    val seekTarget = (fraction * durationMs).toLong()
                                    primaryPlayer?.seekTo(seekTarget)
                                    secondaryPlayer?.seekTo(seekTarget)
                                },
                                modifier = Modifier
                                    .weight(1f)
                                    .padding(horizontal = 12.dp),
                                colors = SliderDefaults.colors(
                                    thumbColor = ExeterMint,
                                    activeTrackColor = ExeterTeal,
                                    inactiveTrackColor = DarkSurfaceVariant
                                )
                            )
                            Text(
                                text = formatTime(durationMs),
                                style = MaterialTheme.typography.labelSmall,
                                color = TextMuted
                            )
                        }

                        // Bottom Control Buttons Row
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            // Left spacer
                            Spacer(modifier = Modifier.width(48.dp))

                            // Center: Jump, Play/Pause
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                IconButton(onClick = {
                                    refreshInteraction()
                                    val target = (currentPositionMs - 10000).coerceAtLeast(0)
                                    primaryPlayer?.seekTo(target)
                                    secondaryPlayer?.seekTo(target)
                                }) {
                                    Icon(Icons.Default.Replay10, contentDescription = "-10s", tint = TextPrimary)
                                }

                                Box(
                                    modifier = Modifier
                                        .size(46.dp)
                                        .clip(CircleShape)
                                        .background(ExeterMint)
                                        .clickable {
                                            refreshInteraction()
                                            if (isPlaying) primaryPlayer?.pause() else primaryPlayer?.play()
                                        },
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                                        contentDescription = "Play/Pause",
                                        tint = DarkBackground,
                                        modifier = Modifier.size(28.dp)
                                    )
                                }

                                IconButton(onClick = {
                                    refreshInteraction()
                                    val target = (currentPositionMs + 10000).coerceAtMost(durationMs)
                                    primaryPlayer?.seekTo(target)
                                    secondaryPlayer?.seekTo(target)
                                }) {
                                    Icon(Icons.Default.Forward10, contentDescription = "+10s", tint = TextPrimary)
                                }
                            }

                            // Right: Layout switchers, Speed, CC, PiP
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                // Layout mode toggle
                                IconButton(onClick = {
                                    refreshInteraction()
                                    layoutMode = when (layoutMode) {
                                        PlayerLayoutMode.SIDE_BY_SIDE -> PlayerLayoutMode.PICTURE_IN_PICTURE
                                        PlayerLayoutMode.PICTURE_IN_PICTURE -> PlayerLayoutMode.FOCUS
                                        PlayerLayoutMode.FOCUS -> PlayerLayoutMode.SIDE_BY_SIDE
                                    }
                                }) {
                                    Icon(
                                        imageVector = when (layoutMode) {
                                            PlayerLayoutMode.SIDE_BY_SIDE -> Icons.Default.GridView
                                            PlayerLayoutMode.PICTURE_IN_PICTURE -> Icons.Default.PictureInPicture
                                            PlayerLayoutMode.FOCUS -> Icons.Default.Fullscreen
                                        },
                                        contentDescription = "Layout",
                                        tint = ExeterMint
                                    )
                                }

                                // Speed button
                                TextButton(onClick = {
                                    refreshInteraction()
                                    val speeds = listOf(0.75f, 1.0f, 1.25f, 1.5f, 2.0f)
                                    val nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.size
                                    playbackSpeed = speeds[nextIdx]
                                    primaryPlayer?.playbackParameters = PlaybackParameters(playbackSpeed)
                                }) {
                                    Text("${playbackSpeed}x", color = ExeterMint, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                }

                                // CC toggle
                                IconButton(onClick = {
                                    refreshInteraction()
                                    showCaptions = !showCaptions
                                }) {
                                    Icon(
                                        imageVector = if (showCaptions) Icons.Default.ClosedCaption else Icons.Default.ClosedCaptionDisabled,
                                        contentDescription = "Captions",
                                        tint = if (showCaptions) ExeterMint else TextMuted
                                    )
                                }

                                // System PiP
                                IconButton(onClick = {
                                    refreshInteraction()
                                    enterSystemPiP()
                                }) {
                                    Icon(Icons.Default.PictureInPictureAlt, contentDescription = "System PiP", tint = TextPrimary)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

private fun formatTime(ms: Long): String {
    val totalSec = ms / 1000
    val minutes = totalSec / 60
    val seconds = totalSec % 60
    return String.format("%02d:%02d", minutes, seconds)
}
