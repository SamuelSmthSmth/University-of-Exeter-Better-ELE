package uk.ac.exeter.ele3.data

import android.app.DownloadManager
import android.content.Context
import android.content.SharedPreferences
import android.net.Uri
import android.os.Environment
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import okhttp3.FormBody
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONArray
import org.json.JSONObject
import uk.ac.exeter.ele3.data.model.CaptionItem
import uk.ac.exeter.ele3.data.model.DeliveryResponse
import uk.ac.exeter.ele3.data.model.DownloadItem
import uk.ac.exeter.ele3.data.model.StreamInfo
import uk.ac.exeter.ele3.data.model.WatchProgress
import java.io.File
import java.io.IOException
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.TimeUnit
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job

class PanoptoRepository(private val context: Context) {
    private val authManager = AuthManager.getInstance(context)
    private val prefs: SharedPreferences = context.getSharedPreferences("ele3_watch_prefs", Context.MODE_PRIVATE)
    private val downloadPrefs: SharedPreferences = context.getSharedPreferences("ele3_downloads", Context.MODE_PRIVATE)

    private val client = OkHttpClient.Builder()
        .connectTimeout(15, TimeUnit.SECONDS)
        .readTimeout(15, TimeUnit.SECONDS)
        .build()

    private val _downloads = MutableStateFlow<List<DownloadItem>>(loadDownloads())
    val downloads: StateFlow<List<DownloadItem>> = _downloads.asStateFlow()
    private val _watchProgressVersion = MutableStateFlow(System.currentTimeMillis())
    val watchProgressVersion: StateFlow<Long> = _watchProgressVersion.asStateFlow()
    private val downloadJobs = ConcurrentHashMap<String, Job>()

    // ── DeliveryInfo API ────────────────────────────────────────────────────────

    suspend fun fetchDeliveryInfo(deliveryId: String): DeliveryResponse = withContext(Dispatchers.IO) {
        val cookies = authManager.cookieString.value ?: ""

        val deliveryReqBody = FormBody.Builder()
            .add("deliveryId", deliveryId)
            .add("responseType", "json")
            .build()

        val captionReqBody = FormBody.Builder()
            .add("deliveryId", deliveryId)
            .add("getCaptions", "true")
            .add("language", "1")
            .add("responseType", "json")
            .build()

        val deliveryRequest = Request.Builder()
            .url("https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer/DeliveryInfo.aspx")
            .post(deliveryReqBody)
            .addHeader("Cookie", cookies)
            .addHeader("User-Agent", "Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36")
            .build()

        val captionRequest = Request.Builder()
            .url("https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer/DeliveryInfo.aspx")
            .post(captionReqBody)
            .addHeader("Cookie", cookies)
            .addHeader("User-Agent", "Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36")
            .build()

        try {
            val deliveryResp = client.newCall(deliveryRequest).execute()
            val deliveryJsonStr = deliveryResp.body?.string() ?: ""

            if (!deliveryResp.isSuccessful || deliveryJsonStr.isBlank()) {
                return@withContext DeliveryResponse(
                    success = false,
                    sessionName = "",
                    duration = 0.0,
                    hasCaptions = false,
                    error = "Failed to fetch session. HTTP ${deliveryResp.code}"
                )
            }

            val rootJson = JSONObject(deliveryJsonStr)
            val deliveryObj = rootJson.optJSONObject("Delivery") ?: rootJson
            val sessionName = deliveryObj.optString("SessionName", "Panopto Lecture")
            val duration = deliveryObj.optDouble("Duration", 0.0)

            val rawStreams = deliveryObj.optJSONArray("Streams") ?: JSONArray()
            val streamList = mutableListOf<StreamInfo>()

            for (i in 0 until rawStreams.length()) {
                val s = rawStreams.getJSONObject(i)
                val streamUrl = s.optString("StreamUrl")
                if (streamUrl.isNotBlank()) {
                    val streamType = s.optInt("StreamType", if (s.optString("Tag") == "dv") 1 else 2)
                    streamList.add(
                        StreamInfo(
                            id = s.optString("PublicId", s.optString("StreamId", "stream-$i")),
                            tag = s.optString("Tag", if (streamType == 1) "dv" else "object"),
                            name = s.optString("Name", if (streamType == 1) "Camera & Audio" else "Presentation Screen"),
                            streamType = streamType,
                            rawUrl = streamUrl,
                            m3u8Url = streamUrl
                        )
                    )
                }
            }

            // Fetch Captions
            val captionList = mutableListOf<CaptionItem>()
            try {
                val captionResp = client.newCall(captionRequest).execute()
                val captionJsonStr = captionResp.body?.string() ?: ""
                if (captionJsonStr.isNotBlank()) {
                    val captionArray = JSONArray(captionJsonStr)
                    for (i in 0 until captionArray.length()) {
                        val c = captionArray.getJSONObject(i)
                        val text = c.optString("Caption", "").trim()
                        if (text.isNotEmpty()) {
                            captionList.add(
                                CaptionItem(
                                    time = c.optDouble("Time", 0.0),
                                    duration = c.optDouble("CaptionDuration", 3.0),
                                    text = text
                                )
                            )
                        }
                    }
                }
            } catch (ignored: Exception) {
                // Captions are optional
            }

            DeliveryResponse(
                success = streamList.isNotEmpty(),
                sessionName = sessionName,
                duration = duration,
                hasCaptions = captionList.isNotEmpty(),
                captions = captionList,
                streams = streamList
            )
        } catch (e: Exception) {
            DeliveryResponse(
                success = false,
                sessionName = "",
                duration = 0.0,
                hasCaptions = false,
                error = e.localizedMessage ?: "Network connection error"
            )
        }
    }

    // ── Watch Progress Persistence ──────────────────────────────────────────────

    fun saveProgress(recordingId: String, positionSec: Long, durationSec: Long) {
        prefs.edit()
            .putLong("${recordingId}_pos", positionSec)
            .putLong("${recordingId}_dur", durationSec)
            .putLong("${recordingId}_time", System.currentTimeMillis())
            .apply()
        _watchProgressVersion.value = System.currentTimeMillis()
    }

    fun getProgress(recordingId: String): WatchProgress? {
        val pos = prefs.getLong("${recordingId}_pos", -1L)
        val dur = prefs.getLong("${recordingId}_dur", 0L)
        val time = prefs.getLong("${recordingId}_time", 0L)
        return if (pos >= 0) {
            WatchProgress(recordingId, pos, dur, time)
        } else null
    }

    fun getAllProgress(): List<WatchProgress> {
        val allKeys = prefs.all.keys
        val idSet = allKeys.mapNotNull {
            if (it.endsWith("_pos")) it.removeSuffix("_pos") else null
        }
        return idSet.mapNotNull { id -> getProgress(id) }
            .filter { it.positionSeconds > 0 && it.progressFraction < 0.98f }
            .sortedByDescending { it.lastWatchedTimestamp }
    }

    // ── Offline Downloads ───────────────────────────────────────────────────────

    fun isDownloaded(recordingId: String): Boolean {
        return _downloads.value.any { it.recordingId == recordingId && it.isCompleted && File(it.localFilePath).let { f -> f.exists() && f.length() > 50_000 } }
    }

    fun getLocalFile(recordingId: String): File? {
        val item = _downloads.value.find { it.recordingId == recordingId && it.isCompleted } ?: return null
        val file = File(item.localFilePath)
        return if (file.exists() && file.length() > 50_000) file else null
    }

    fun startDownload(recordingId: String, moduleCode: String, title: String, date: String, duration: String) {
        val fileName = "ELE3_${moduleCode}_${recordingId.take(8)}.mp4"
        val moviesDir = context.getExternalFilesDir(Environment.DIRECTORY_MOVIES) ?: context.filesDir
        val destinationFile = File(moviesDir, fileName)

        val item = DownloadItem(
            recordingId = recordingId,
            moduleCode = moduleCode,
            title = title,
            date = date,
            duration = duration,
            localFilePath = destinationFile.absolutePath,
            progress = 0.02f,
            isCompleted = false
        )

        val updated = _downloads.value.filter { it.recordingId != recordingId } + item
        _downloads.value = updated

        downloadJobs[recordingId]?.cancel()
        val job = CoroutineScope(Dispatchers.IO).launch {
            try {
                val cookies = authManager.cookieString.value ?: ""

                // 1. Preferred: Panopto DeliveryInfo stream (fMP4 direct CDN stream, ~300-600MB)
                val delivery = fetchDeliveryInfo(recordingId)
                val stream = delivery.streams.find { it.streamType == 1 || it.tag.contains("dv", ignoreCase = true) }
                    ?: delivery.streams.firstOrNull()

                if (stream != null && stream.m3u8Url.isNotBlank()) {
                    downloadVideoStream(
                        masterPlaylistUrl = stream.m3u8Url,
                        cookies = cookies,
                        destinationFile = destinationFile,
                        recordingId = recordingId,
                        onProgress = { fraction ->
                            updateProgress(recordingId, fraction, false)
                        }
                    )
                } else {
                    // 2. Fallback to podcast direct MP4 export
                    val podcastUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Podcast/Download/$recordingId.mp4"
                    downloadDirectFile(podcastUrl, cookies, destinationFile) { fraction ->
                        updateProgress(recordingId, fraction, false)
                    }
                }

                if (destinationFile.exists() && destinationFile.length() > 50_000) {
                    updateProgress(recordingId, 1.0f, true)
                } else {
                    removeDownload(recordingId)
                }
            } catch (e: Exception) {
                if (e !is CancellationException) {
                    android.util.Log.e("PanoptoRepo", "Download failed for $recordingId", e)
                }
                File(destinationFile.parentFile, "${destinationFile.name}.part").delete()
                removeDownload(recordingId)
            } finally {
                downloadJobs.remove(recordingId)
            }
        }
        downloadJobs[recordingId] = job
    }

    private fun downloadVideoStream(
        masterPlaylistUrl: String,
        cookies: String,
        destinationFile: File,
        recordingId: String,
        onProgress: (Float) -> Unit
    ) {
        val req = Request.Builder()
            .url(masterPlaylistUrl)
            .addHeader("Cookie", cookies)
            .addHeader("User-Agent", "Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36")
            .build()

        val resp = client.newCall(req).execute()
        val playlistText = resp.body?.string() ?: return
        resp.close()

        val baseUri = java.net.URI(masterPlaylistUrl)

        var streamPlaylistUrl = masterPlaylistUrl
        var streamBody = playlistText

        // Master playlist handling: find optimal sub-playlist (prefer 720p or ~1.5 - 2 Mbps)
        if (playlistText.contains("#EXT-X-STREAM-INF")) {
            val lines = playlistText.lines()
            var selectedChildPath: String? = null
            var bestBandwidth = 0L

            for (i in lines.indices) {
                val line = lines[i].trim()
                if (line.startsWith("#EXT-X-STREAM-INF") && i + 1 < lines.size) {
                    val nextLine = lines[i + 1].trim()
                    if (nextLine.isNotEmpty() && !nextLine.startsWith("#")) {
                        val is720p = line.contains("1280x720")
                        val bw = Regex("""BANDWIDTH=(\d+)""").find(line)?.groupValues?.get(1)?.toLongOrNull() ?: 0L

                        if (is720p || selectedChildPath == null || (bw in (bestBandwidth + 1)..2_500_000L)) {
                            selectedChildPath = nextLine
                            bestBandwidth = bw
                            if (is720p) break
                        }
                    }
                }
            }

            if (selectedChildPath != null) {
                val resolved = baseUri.resolve(selectedChildPath)
                streamPlaylistUrl = if (resolved.query == null && baseUri.query != null) {
                    if (resolved.toString().contains("?")) resolved.toString() else "${resolved}?${baseUri.query}"
                } else {
                    resolved.toString()
                }

                val childReq = Request.Builder()
                    .url(streamPlaylistUrl)
                    .addHeader("Cookie", cookies)
                    .addHeader("User-Agent", "Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36")
                    .build()
                val childResp = client.newCall(childReq).execute()
                streamBody = childResp.body?.string() ?: ""
                childResp.close()
            }
        }

        val childUri = java.net.URI(streamPlaylistUrl)

        // Case 1: Fragmented MP4 with #EXT-X-MAP (Panopto's default for fast CDN video)
        val mapRegex = Regex("""#EXT-X-MAP:URI="([^"]+)"""")
        val mapMatch = mapRegex.find(streamBody)
        if (mapMatch != null) {
            val mp4FileName = mapMatch.groupValues[1]
            val resolved = childUri.resolve(mp4FileName)
            val directMp4Url = if (resolved.query == null && childUri.query != null) {
                if (resolved.toString().contains("?")) resolved.toString() else "${resolved}?${childUri.query}"
            } else {
                resolved.toString()
            }
            downloadDirectFile(directMp4Url, cookies, destinationFile, onProgress)
            return
        }

        // Case 2: Traditional HLS .ts chunks
        val segments = mutableListOf<String>()
        for (line in streamBody.lines()) {
            val trimmed = line.trim()
            if (trimmed.isNotEmpty() && !trimmed.startsWith("#")) {
                val resolved = childUri.resolve(trimmed)
                val finalUrl = if (resolved.query == null && childUri.query != null) {
                    if (resolved.toString().contains("?")) resolved.toString() else "${resolved}?${childUri.query}"
                } else {
                    resolved.toString()
                }
                segments.add(finalUrl)
            }
        }

        if (segments.isNotEmpty()) {
            destinationFile.parentFile?.mkdirs()
            val tempFile = File(destinationFile.parentFile, "${destinationFile.name}.part")
            if (tempFile.exists()) tempFile.delete()
            val total = segments.size

            tempFile.outputStream().use { out ->
                for ((idx, segUrl) in segments.withIndex()) {
                    val segReq = Request.Builder()
                        .url(segUrl)
                        .addHeader("Cookie", cookies)
                        .addHeader("User-Agent", "Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36")
                        .build()

                    try {
                        val segResp = client.newCall(segReq).execute()
                        segResp.body?.byteStream()?.use { input -> input.copyTo(out) }
                        segResp.close()
                    } catch (e: Exception) {
                        // ignore dropped segment and continue
                    }
                    val progress = ((idx + 1).toFloat() / total.toFloat()).coerceIn(0.02f, 0.99f)
                    onProgress(progress)
                }
            }

            if (tempFile.exists() && tempFile.length() > 50_000) {
                if (destinationFile.exists()) destinationFile.delete()
                tempFile.renameTo(destinationFile)
            } else {
                tempFile.delete()
                throw IOException("Download incomplete")
            }
        }
    }

    private fun downloadDirectFile(
        fileUrl: String,
        cookies: String,
        destinationFile: File,
        onProgress: (Float) -> Unit
    ) {
        val downloadClient = client.newBuilder()
            .readTimeout(180, TimeUnit.SECONDS)
            .connectTimeout(30, TimeUnit.SECONDS)
            .build()

        val req = Request.Builder()
            .url(fileUrl)
            .addHeader("Cookie", cookies)
            .addHeader("User-Agent", "Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36")
            .build()

        val response = downloadClient.newCall(req).execute()
        if (!response.isSuccessful || response.body == null) {
            response.close()
            throw IOException("Download failed with HTTP ${response.code}")
        }

        val body = response.body!!
        val contentLength = body.contentLength()
        destinationFile.parentFile?.mkdirs()

        val tempFile = File(destinationFile.parentFile, "${destinationFile.name}.part")
        if (tempFile.exists()) tempFile.delete()

        body.byteStream().use { input ->
            tempFile.outputStream().use { output ->
                val buffer = ByteArray(65536)
                var bytesRead: Int
                var totalRead = 0L
                var lastEmit = 0L

                while (input.read(buffer).also { bytesRead = it } != -1) {
                    output.write(buffer, 0, bytesRead)
                    totalRead += bytesRead
                    val now = System.currentTimeMillis()
                    if (now - lastEmit > 200) {
                        lastEmit = now
                        val frac = if (contentLength > 0) {
                            (totalRead.toFloat() / contentLength.toFloat()).coerceIn(0.02f, 0.99f)
                        } else {
                            (totalRead.toFloat() / (400f * 1024f * 1024f)).coerceIn(0.02f, 0.99f)
                        }
                        onProgress(frac)
                    }
                }
            }
        }
        response.close()

        if (tempFile.exists() && tempFile.length() > 50_000) {
            if (destinationFile.exists()) destinationFile.delete()
            tempFile.renameTo(destinationFile)
        } else {
            tempFile.delete()
            throw IOException("Download file incomplete or empty")
        }
    }

    private fun updateProgress(recordingId: String, progress: Float, isCompleted: Boolean) {
        val current = _downloads.value.map {
            if (it.recordingId == recordingId) it.copy(progress = progress, isCompleted = isCompleted) else it
        }
        _downloads.value = current
        if (isCompleted) {
            saveDownloads(current)
        }
    }

    private fun loadDownloads(): List<DownloadItem> {
        val json = downloadPrefs.getString("download_items", null) ?: return emptyList()
        val list = mutableListOf<DownloadItem>()
        try {
            val array = JSONArray(json)
            for (i in 0 until array.length()) {
                val obj = array.getJSONObject(i)
                val path = obj.getString("localFilePath")
                val f = File(path)
                if (f.exists() && f.length() > 50_000) {
                    list.add(
                        DownloadItem(
                            recordingId = obj.getString("recordingId"),
                            moduleCode = obj.getString("moduleCode"),
                            title = obj.getString("title"),
                            date = obj.getString("date"),
                            duration = obj.getString("duration"),
                            localFilePath = path,
                            progress = 1.0f,
                            isCompleted = true
                        )
                    )
                }
            }
        } catch (ignored: Exception) {}
        return list
    }

    private fun saveDownloads(items: List<DownloadItem>) {
        val array = JSONArray()
        items.filter { it.isCompleted }.forEach { item ->
            val obj = JSONObject()
            obj.put("recordingId", item.recordingId)
            obj.put("moduleCode", item.moduleCode)
            obj.put("title", item.title)
            obj.put("date", item.date)
            obj.put("duration", item.duration)
            obj.put("localFilePath", item.localFilePath)
            array.put(obj)
        }
        downloadPrefs.edit().putString("download_items", array.toString()).apply()
    }

    fun removeDownload(recordingId: String) {
        downloadJobs[recordingId]?.cancel()
        downloadJobs.remove(recordingId)
        val existing = _downloads.value.find { it.recordingId == recordingId }
        existing?.let {
            try {
                File(it.localFilePath).delete()
                File("${it.localFilePath}.part").delete()
            } catch (ignored: Exception) {}
        }
        val updated = _downloads.value.filter { it.recordingId != recordingId }
        saveDownloads(updated)
        _downloads.value = updated
    }


    companion object {
        @Volatile
        private var INSTANCE: PanoptoRepository? = null

        fun getInstance(context: Context): PanoptoRepository {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: PanoptoRepository(context.applicationContext).also { INSTANCE = it }
            }
        }
    }
}
