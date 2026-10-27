package uk.ac.exeter.ele3.ui.screens

import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ViewList
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import uk.ac.exeter.ele3.data.PanoptoRepository
import uk.ac.exeter.ele3.data.model.Course
import uk.ac.exeter.ele3.data.model.Recording
import uk.ac.exeter.ele3.ui.components.GeometricBanner
import uk.ac.exeter.ele3.ui.theme.*
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.util.Locale

data class WeekGroup(
    val weekNumber: Int,
    val label: String,
    val dateRange: String,
    val recordings: List<Recording>
)

@Composable
fun ModuleDetailScreen(
    course: Course,
    onBack: () -> Unit,
    onPlayRecording: (Recording) -> Unit,
    repository: PanoptoRepository
) {
    val context = LocalContext.current
    val downloads by repository.downloads.collectAsState()

    var searchQuery by remember { mutableStateOf("") }
    var selectedFilter by remember { mutableStateOf("All") } // "All", "Unwatched", "Downloaded"
    var isReverseChronological by remember { mutableStateOf(true) } // Default newest first
    var isWeekView by remember { mutableStateOf(true) } // Default By Week

    val dateFormatter = remember { DateTimeFormatter.ofPattern("dd/MM/yyyy") }
    val displayFormatter = remember { DateTimeFormatter.ofPattern("dd MMM", Locale.UK) }

    fun parseRecordingDate(dStr: String): LocalDate {
        return try {
            LocalDate.parse(dStr, dateFormatter)
        } catch (e: Exception) {
            LocalDate.now()
        }
    }

    val termStartMonday = remember(course.recordings) {
        val allDates = course.recordings.map { parseRecordingDate(it.date) }
        val minD = allDates.minOrNull() ?: LocalDate.now()
        minD.with(DayOfWeek.MONDAY)
    }

    // Filter recordings by search query & filter chip
    val filteredRecordings = remember(course.recordings, searchQuery, selectedFilter, downloads) {
        course.recordings.filter { rec ->
            val matchesSearch = if (searchQuery.isBlank()) true else {
                val q = searchQuery.trim().lowercase()
                rec.title.lowercase().contains(q) ||
                rec.date.contains(q)
            }
            val matchesFilter = when (selectedFilter) {
                "Downloaded" -> downloads.any { it.recordingId == rec.id }
                "Unwatched" -> {
                    val p = repository.getProgress(rec.id)
                    p == null || p.progressFraction < 0.90f
                }
                else -> true
            }
            matchesSearch && matchesFilter
        }
    }

    // Group into weeks
    val weekGroups = remember(filteredRecordings, isReverseChronological, termStartMonday) {
        val groupedMap = filteredRecordings.groupBy { r ->
            val d = parseRecordingDate(r.date)
            val monday = d.with(DayOfWeek.MONDAY)
            val weekNum = (ChronoUnit.WEEKS.between(termStartMonday, monday) + 1).toInt().coerceAtLeast(1)
            val sunday = monday.plusDays(6)
            val label = "Week $weekNum"
            val range = "${monday.format(displayFormatter)} – ${sunday.format(displayFormatter)}"
            Triple(weekNum, label, range)
        }

        val list = groupedMap.map { (key, recs) ->
            WeekGroup(
                weekNumber = key.first,
                label = key.second,
                dateRange = key.third,
                recordings = if (isReverseChronological) recs.reversed() else recs
            )
        }

        if (isReverseChronological) list.sortedByDescending { it.weekNumber }
        else list.sortedBy { it.weekNumber }
    }

    // Latest week is expanded by default
    val defaultExpandedWeek = remember(weekGroups) {
        weekGroups.firstOrNull()?.weekNumber
    }

    var expandedWeeks by remember(course.id, defaultExpandedWeek) {
        mutableStateOf(if (defaultExpandedWeek != null) setOf(defaultExpandedWeek) else emptySet())
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
    ) {
        // Top Back Row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .clip(RoundedCornerShape(10.dp))
                    .background(DarkSurface)
            ) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = TextPrimary)
            }
            Spacer(modifier = Modifier.width(12.dp))
            Text(
                text = "Back to Modules",
                style = MaterialTheme.typography.titleMedium,
                color = TextSecondary
            )
        }

        // Hero Course Header Banner
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = DarkSurface),
            border = CardDefaults.outlinedCardBorder().copy(brush = SolidColor(DarkBorder))
        ) {
            Column {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(100.dp)
                ) {
                    GeometricBanner(seedText = course.code)
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(DarkBackground.copy(alpha = 0.35f))
                    )
                    Row(
                        modifier = Modifier
                            .align(Alignment.BottomStart)
                            .padding(horizontal = 20.dp, vertical = 14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = course.title,
                            style = MaterialTheme.typography.headlineMedium,
                            fontWeight = FontWeight.Bold,
                            color = TextPrimary
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = DarkBackground.copy(alpha = 0.8f)
                        ) {
                            Text(
                                text = "${course.recordings.size} lectures",
                                style = MaterialTheme.typography.labelSmall,
                                color = ExeterMint,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                    }
                }

                // Convenor bar
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(DarkSurfaceVariant)
                        .padding(horizontal = 20.dp, vertical = 10.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = course.convenor.name,
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.SemiBold,
                            color = TextPrimary
                        )
                        Spacer(modifier = Modifier.width(14.dp))
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Mail, contentDescription = null, tint = ExeterMint, modifier = Modifier.size(14.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = course.convenor.email,
                                style = MaterialTheme.typography.bodySmall,
                                color = ExeterMint
                            )
                        }
                    }

                    course.convenor.officeHours?.let { hours ->
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Schedule, contentDescription = null, tint = TextMuted, modifier = Modifier.size(14.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = hours,
                                style = MaterialTheme.typography.bodySmall,
                                color = TextMuted
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Search & Controls Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Search Input
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                placeholder = { Text("Search lectures, topics, dates...", color = TextMuted, fontSize = 13.sp) },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null, tint = ExeterMint, modifier = Modifier.size(18.dp)) },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { searchQuery = "" }) {
                            Icon(Icons.Default.Clear, contentDescription = "Clear", tint = TextMuted, modifier = Modifier.size(18.dp))
                        }
                    }
                },
                singleLine = true,
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp),
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = ExeterMint,
                    unfocusedBorderColor = DarkBorder,
                    focusedContainerColor = DarkSurface,
                    unfocusedContainerColor = DarkSurface,
                    focusedTextColor = TextPrimary,
                    unfocusedTextColor = TextPrimary
                )
            )

            Spacer(modifier = Modifier.width(12.dp))

            // Sort Toggle Button
            Surface(
                shape = RoundedCornerShape(12.dp),
                color = DarkSurface,
                border = CardDefaults.outlinedCardBorder().copy(brush = SolidColor(DarkBorder)),
                modifier = Modifier
                    .height(48.dp)
                    .clickable { isReverseChronological = !isReverseChronological }
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.SwapVert,
                        contentDescription = "Sort Order",
                        tint = ExeterMint,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (isReverseChronological) "Newest First" else "Oldest First",
                        style = MaterialTheme.typography.labelSmall,
                        color = TextPrimary,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }

            Spacer(modifier = Modifier.width(8.dp))

            // View Mode Toggle (By Week vs Flat List)
            Surface(
                shape = RoundedCornerShape(12.dp),
                color = DarkSurface,
                border = CardDefaults.outlinedCardBorder().copy(brush = SolidColor(DarkBorder)),
                modifier = Modifier
                    .height(48.dp)
                    .clickable { isWeekView = !isWeekView }
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = if (isWeekView) Icons.Default.ViewAgenda else Icons.AutoMirrored.Filled.ViewList,
                        contentDescription = "View Mode",
                        tint = ExeterMint,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (isWeekView) "By Week" else "Flat List",
                        style = MaterialTheme.typography.labelSmall,
                        color = TextPrimary,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }

            if (isWeekView && weekGroups.isNotEmpty()) {
                Spacer(modifier = Modifier.width(8.dp))
                val allExpanded = expandedWeeks.size == weekGroups.size
                TextButton(
                    onClick = {
                        expandedWeeks = if (allExpanded) emptySet() else weekGroups.map { it.weekNumber }.toSet()
                    },
                    modifier = Modifier.height(48.dp)
                ) {
                    Text(
                        text = if (allExpanded) "Collapse All" else "Expand All",
                        color = ExeterMint,
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Filter Pills Row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            listOf("All", "Unwatched", "Downloaded").forEach { filterName ->
                val isSelected = selectedFilter == filterName
                FilterChip(
                    selected = isSelected,
                    onClick = { selectedFilter = filterName },
                    label = {
                        Text(
                            text = filterName,
                            color = if (isSelected) DarkBackground else TextSecondary,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                            fontSize = 12.sp
                        )
                    },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = ExeterMint,
                        containerColor = DarkSurface
                    ),
                    border = FilterChipDefaults.filterChipBorder(
                        enabled = true,
                        selected = isSelected,
                        borderColor = if (isSelected) ExeterMint else DarkBorder
                    ),
                    modifier = Modifier.height(32.dp)
                )
            }

            Spacer(modifier = Modifier.weight(1f))

            Text(
                text = "${filteredRecordings.size} of ${course.recordings.size} lectures",
                style = MaterialTheme.typography.labelSmall,
                color = TextMuted
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Recordings List
        LazyColumn(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .padding(horizontal = 24.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
            contentPadding = PaddingValues(bottom = 32.dp)
        ) {
            if (isWeekView) {
                // By Week Accordions
                weekGroups.forEach { group ->
                    val isExpanded = expandedWeeks.contains(group.weekNumber)

                    item(key = "week_${group.weekNumber}") {
                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable {
                                    expandedWeeks = if (isExpanded) {
                                        expandedWeeks - group.weekNumber
                                    } else {
                                        expandedWeeks + group.weekNumber
                                    }
                                },
                            shape = RoundedCornerShape(14.dp),
                            colors = CardDefaults.cardColors(containerColor = if (isExpanded) DarkSurface else DarkSurface.copy(alpha = 0.65f)),
                            border = CardDefaults.outlinedCardBorder().copy(
                                brush = SolidColor(if (isExpanded) ExeterMint.copy(alpha = 0.45f) else DarkBorder)
                            )
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(horizontal = 16.dp, vertical = 12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(
                                        modifier = Modifier
                                            .size(36.dp)
                                            .clip(RoundedCornerShape(10.dp))
                                            .background(if (isExpanded) ExeterDeepGreen else DarkSurfaceVariant),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Text(
                                            text = "W${group.weekNumber}",
                                            style = MaterialTheme.typography.labelMedium,
                                            fontWeight = FontWeight.Bold,
                                            color = if (isExpanded) ExeterMint else TextSecondary
                                        )
                                    }
                                    Spacer(modifier = Modifier.width(12.dp))
                                    Column {
                                        Row(verticalAlignment = Alignment.CenterVertically) {
                                            Text(
                                                text = group.label,
                                                style = MaterialTheme.typography.titleSmall,
                                                fontWeight = FontWeight.Bold,
                                                color = TextPrimary
                                            )
                                            Spacer(modifier = Modifier.width(8.dp))
                                            Text(
                                                text = "·  ${group.recordings.size} lectures",
                                                style = MaterialTheme.typography.bodySmall,
                                                color = TextMuted
                                            )
                                        }
                                        Text(
                                            text = group.dateRange,
                                            style = MaterialTheme.typography.bodySmall,
                                            color = ExeterMint,
                                            fontSize = 11.sp
                                        )
                                    }
                                }

                                Icon(
                                    imageVector = if (isExpanded) Icons.Default.ExpandLess else Icons.Default.ExpandMore,
                                    contentDescription = if (isExpanded) "Collapse" else "Expand",
                                    tint = if (isExpanded) ExeterMint else TextMuted
                                )
                            }
                        }
                    }

                    if (isExpanded) {
                        items(group.recordings, key = { it.id }) { recording ->
                            val progress = remember(recording.id) { repository.getProgress(recording.id) }
                            val isDownloaded = remember(downloads, recording.id) {
                                downloads.any { it.recordingId == recording.id }
                            }

                            Box(modifier = Modifier.padding(start = 8.dp)) {
                                LectureRecordingCard(
                                    recording = recording,
                                    progressFraction = progress?.progressFraction ?: 0f,
                                    isDownloaded = isDownloaded,
                                    onDownloadClick = {
                                        if (isDownloaded) {
                                            Toast.makeText(context, "Already downloaded", Toast.LENGTH_SHORT).show()
                                        } else {
                                            repository.startDownload(
                                                recordingId = recording.id,
                                                moduleCode = course.code,
                                                title = recording.title,
                                                date = recording.date,
                                                duration = recording.duration
                                            )
                                            Toast.makeText(context, "Download started...", Toast.LENGTH_SHORT).show()
                                        }
                                    },
                                    onPlayClick = { onPlayRecording(recording) }
                                )
                            }
                        }
                    }
                }
            } else {
                // Flat List Mode
                val recordingsList = if (isReverseChronological) filteredRecordings.reversed() else filteredRecordings
                items(recordingsList, key = { it.id }) { recording ->
                    val progress = remember(recording.id) { repository.getProgress(recording.id) }
                    val isDownloaded = remember(downloads, recording.id) {
                        downloads.any { it.recordingId == recording.id }
                    }

                    LectureRecordingCard(
                        recording = recording,
                        progressFraction = progress?.progressFraction ?: 0f,
                        isDownloaded = isDownloaded,
                        onDownloadClick = {
                            if (isDownloaded) {
                                Toast.makeText(context, "Already downloaded", Toast.LENGTH_SHORT).show()
                            } else {
                                repository.startDownload(
                                    recordingId = recording.id,
                                    moduleCode = course.code,
                                    title = recording.title,
                                    date = recording.date,
                                    duration = recording.duration
                                )
                                Toast.makeText(context, "Download started...", Toast.LENGTH_SHORT).show()
                            }
                        },
                        onPlayClick = { onPlayRecording(recording) }
                    )
                }
            }
        }
    }
}

@Composable
fun LectureRecordingCard(
    recording: Recording,
    progressFraction: Float,
    isDownloaded: Boolean,
    onDownloadClick: () -> Unit,
    onPlayClick: () -> Unit
) {
    Card(
        onClick = onPlayClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = DarkSurface),
        border = CardDefaults.outlinedCardBorder().copy(brush = SolidColor(DarkBorder))
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = recording.title,
                    style = MaterialTheme.typography.bodyLarge,
                    fontWeight = FontWeight.SemiBold,
                    color = TextPrimary,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )

                Spacer(modifier = Modifier.height(4.dp))

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = recording.date,
                        style = MaterialTheme.typography.bodySmall,
                        color = TextMuted
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        text = "·  ${recording.duration}",
                        style = MaterialTheme.typography.bodySmall,
                        color = ExeterMint
                    )
                }

                // Watch progress bar
                if (progressFraction > 0.02f) {
                    Spacer(modifier = Modifier.height(6.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(0.55f),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        LinearProgressIndicator(
                            progress = { progressFraction.coerceIn(0f, 1f) },
                            modifier = Modifier
                                .weight(1f)
                                .height(4.dp)
                                .clip(RoundedCornerShape(2.dp)),
                            color = ExeterMint,
                            trackColor = DarkSurfaceVariant
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "${(progressFraction * 100).toInt()}%",
                            style = MaterialTheme.typography.labelSmall,
                            color = ExeterMint,
                            fontSize = 10.sp
                        )
                    }
                }
            }

            Row(verticalAlignment = Alignment.CenterVertically) {
                // Download button
                IconButton(onClick = onDownloadClick) {
                    Icon(
                        imageVector = if (isDownloaded) Icons.Default.CheckCircle else Icons.Default.Download,
                        contentDescription = "Download",
                        tint = if (isDownloaded) SuccessGreen else TextSecondary
                    )
                }

                Spacer(modifier = Modifier.width(6.dp))

                // Play Button
                Box(
                    modifier = Modifier
                        .size(38.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(ExeterTeal)
                        .clickable(onClick = onPlayClick),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.PlayArrow,
                        contentDescription = "Play",
                        tint = TextPrimary,
                        modifier = Modifier.size(22.dp)
                    )
                }
            }
        }
    }
}
