package uk.ac.exeter.ele3.data.model

data class Convenor(
    val name: String,
    val email: String,
    val officeHours: String? = null
)

data class Recording(
    val id: String,
    val title: String,
    val date: String,
    val duration: String,
    val panoptoUrl: String,
    val embedUrl: String
)

data class Course(
    val id: String,
    val code: String,
    val title: String,
    val stage: Int,
    val credits: Int,
    val term: String,
    val academicYear: String,
    val convenor: Convenor,
    val recordings: List<Recording>
)

data class StreamInfo(
    val id: String,
    val tag: String,
    val name: String,
    val streamType: Int, // 1 = Camera/Audio, 2 = Screen/Slides
    val rawUrl: String,
    val m3u8Url: String
)

data class CaptionItem(
    val time: Double, // in seconds
    val duration: Double,
    val text: String
)

data class DeliveryResponse(
    val success: Boolean,
    val sessionName: String,
    val duration: Double,
    val hasCaptions: Boolean,
    val captions: List<CaptionItem> = emptyList(),
    val streams: List<StreamInfo> = emptyList(),
    val error: String? = null
)

data class DownloadItem(
    val recordingId: String,
    val moduleCode: String,
    val title: String,
    val date: String,
    val duration: String,
    val localFilePath: String,
    val progress: Float = 1.0f,
    val isCompleted: Boolean = true
)

data class WatchProgress(
    val recordingId: String,
    val positionSeconds: Long,
    val durationSeconds: Long,
    val lastWatchedTimestamp: Long = System.currentTimeMillis()
) {
    val progressFraction: Float
        get() = if (durationSeconds > 0) (positionSeconds.toFloat() / durationSeconds.toFloat()).coerceIn(0f, 1f) else 0f
}
