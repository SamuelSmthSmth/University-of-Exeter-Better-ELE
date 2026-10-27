package uk.ac.exeter.ele3.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DeleteOutline
import androidx.compose.material.icons.filled.DownloadDone
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import uk.ac.exeter.ele3.data.PanoptoRepository
import uk.ac.exeter.ele3.data.model.DownloadItem
import uk.ac.exeter.ele3.data.model.Recording
import uk.ac.exeter.ele3.ui.theme.*
import java.io.File

@Composable
fun DownloadsScreen(
    repository: PanoptoRepository,
    onPlayOffline: (Recording) -> Unit
) {
    val downloads by repository.downloads.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(horizontal = 24.dp, vertical = 20.dp)
    ) {
        Text(
            text = "Offline Downloads",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = TextPrimary
        )
        Text(
            text = "${downloads.size} lectures available for offline playback",
            style = MaterialTheme.typography.bodyMedium,
            color = TextMuted
        )

        Spacer(modifier = Modifier.height(20.dp))

        if (downloads.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(40.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.DownloadDone,
                        contentDescription = null,
                        tint = TextMuted,
                        modifier = Modifier.size(54.dp)
                    )
                    Spacer(modifier = Modifier.height(14.dp))
                    Text(
                        text = "No downloaded lectures yet",
                        style = MaterialTheme.typography.titleMedium,
                        color = TextPrimary,
                        fontWeight = FontWeight.SemiBold
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Tap the download icon on any lecture in a module to save it for flights or travel without Wi-Fi.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextMuted
                    )
                }
            }
        } else {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(downloads) { item ->
                    val file = remember(item.localFilePath) { File(item.localFilePath) }
                    val partFile = remember(item.localFilePath) { File("${item.localFilePath}.part") }
                    val sizeMb = remember(item.progress, item.isCompleted) {
                        val active = if (item.isCompleted) file else (if (partFile.exists()) partFile else file)
                        if (active.exists()) String.format(java.util.Locale.UK, "%.1f MB", active.length() / (1024.0 * 1024.0)) else "0 MB"
                    }

                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable(enabled = item.isCompleted) {
                                onPlayOffline(
                                    Recording(
                                        id = item.recordingId,
                                        title = item.title,
                                        date = item.date,
                                        duration = item.duration,
                                        panoptoUrl = item.localFilePath,
                                        embedUrl = item.localFilePath
                                    )
                                )
                            },
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = DarkSurface),
                        border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(DarkBorder))
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = item.title,
                                    style = MaterialTheme.typography.bodyLarge,
                                    fontWeight = FontWeight.Bold,
                                    color = TextPrimary
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = item.moduleCode,
                                        style = MaterialTheme.typography.labelSmall,
                                        fontWeight = FontWeight.Bold,
                                        color = ExeterMint
                                    )
                                    Spacer(modifier = Modifier.width(10.dp))
                                    Text(
                                        text = "·  ${item.duration}",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = TextMuted
                                    )
                                    Spacer(modifier = Modifier.width(10.dp))
                                    Text(
                                        text = if (item.isCompleted) "·  $sizeMb" else "·  Downloading ${(item.progress * 100).toInt()}% ($sizeMb)",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = if (item.isCompleted) SuccessGreen else ExeterMint
                                    )
                                }

                                if (!item.isCompleted) {
                                    Spacer(modifier = Modifier.height(8.dp))
                                    LinearProgressIndicator(
                                        progress = { item.progress },
                                        modifier = Modifier
                                            .fillMaxWidth(0.6f)
                                            .height(4.dp)
                                            .clip(RoundedCornerShape(2.dp)),
                                        color = ExeterMint,
                                        trackColor = DarkSurfaceVariant
                                    )
                                }
                            }

                            Row(verticalAlignment = Alignment.CenterVertically) {
                                IconButton(onClick = { repository.removeDownload(item.recordingId) }) {
                                    Icon(
                                        imageVector = Icons.Default.DeleteOutline,
                                        contentDescription = "Delete",
                                        tint = DangerRed
                                    )
                                }

                                Spacer(modifier = Modifier.width(6.dp))

                                if (item.isCompleted) {
                                    Box(
                                        modifier = Modifier
                                            .size(38.dp)
                                            .clip(RoundedCornerShape(10.dp))
                                            .background(ExeterTeal),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Icon(
                                            imageVector = Icons.Default.PlayArrow,
                                            contentDescription = "Play Offline",
                                            tint = TextPrimary,
                                            modifier = Modifier.size(22.dp)
                                        )
                                    }
                                } else {
                                    CircularProgressIndicator(
                                        modifier = Modifier.size(28.dp),
                                        strokeWidth = 2.5.dp,
                                        color = ExeterMint
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
