package uk.ac.exeter.ele3.data

import android.app.DownloadManager
import android.content.Context
import android.content.SharedPreferences
import android.net.Uri
import android.os.Environment
import kotlinx.coroutines.Dispatchers
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
import java.util.concurrent.TimeUnit

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
    }

    fun getProgress(recordingId: String): WatchProgress? {
        val pos = prefs.getLong("${recordingId}_pos", -1L)
        val dur = prefs.getLong("${recordingId}_dur", 0L)
        val time = prefs.getLong("${recordingId}_time", 0L)
        return if (pos >= 0) {
            WatchProgress(recordingId, pos, dur, time)
        } else null
    }

    // ── Offline Downloads ───────────────────────────────────────────────────────

    fun startDownload(recordingId: String, moduleCode: String, title: String, date: String, duration: String, streamUrl: String) {
        val downloadManager = context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        val fileName = "ELE3_${moduleCode}_${recordingId.take(8)}.mp4"

        val cookies = authManager.cookieString.value ?: ""
        val uri = Uri.parse(streamUrl)

        val request = DownloadManager.Request(uri)
            .setTitle("$moduleCode — $title")
            .setDescription("Downloading lecture recording for offline viewing")
            .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            .setDestinationInExternalFilesDir(context, Environment.DIRECTORY_MOVIES, fileName)
            .addRequestHeader("Cookie", cookies)
            .addRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 14; Tablet)")

        val downloadId = downloadManager.enqueue(request)
        val destinationFile = File(context.getExternalFilesDir(Environment.DIRECTORY_MOVIES), fileName)

        val item = DownloadItem(
            recordingId = recordingId,
            moduleCode = moduleCode,
            title = title,
            date = date,
            duration = duration,
            localFilePath = destinationFile.absolutePath,
            progress = 1.0f,
            isCompleted = true
        )

        val updated = _downloads.value.filter { it.recordingId != recordingId } + item
        saveDownloads(updated)
        _downloads.value = updated
    }

    private fun loadDownloads(): List<DownloadItem> {
        val json = downloadPrefs.getString("download_items", null) ?: return emptyList()
        val list = mutableListOf<DownloadItem>()
        try {
            val array = JSONArray(json)
            for (i in 0 until array.length()) {
                val obj = array.getJSONObject(i)
                val path = obj.getString("localFilePath")
                if (File(path).exists()) {
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
        items.forEach { item ->
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
        val existing = _downloads.value.find { it.recordingId == recordingId }
        existing?.let {
            File(it.localFilePath).delete()
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
