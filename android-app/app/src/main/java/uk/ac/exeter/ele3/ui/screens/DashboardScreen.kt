package uk.ac.exeter.ele3.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import uk.ac.exeter.ele3.data.CoursesData
import uk.ac.exeter.ele3.data.PanoptoRepository
import uk.ac.exeter.ele3.data.model.Course
import uk.ac.exeter.ele3.data.model.Recording
import uk.ac.exeter.ele3.ui.components.GeometricBanner
import uk.ac.exeter.ele3.ui.theme.*

@Composable
fun DashboardScreen(
    onSelectCourse: (Course) -> Unit,
    onPlayRecording: (Recording) -> Unit,
    repository: PanoptoRepository,
    isLoggedIn: Boolean = false,
    onOpenAuth: () -> Unit = {}
) {
    val allCourses = remember { CoursesData.courses }
    val downloads by repository.downloads.collectAsState()

    // Recent recordings for quick resume
    val recentRecordings = remember {
        allCourses.flatMap { course ->
            course.recordings.take(2).map { it to course.code }
        }.take(8)
    }

    val totalLectures = remember { allCourses.sumOf { it.recordings.size } }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(horizontal = 24.dp, vertical = 20.dp)
    ) {
        // Hero Greeting Header
        Text(
            text = "Welcome to ELE 3",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = TextPrimary
        )

        // SSO Connect Banner if not logged in
        if (!isLoggedIn) {
            Spacer(modifier = Modifier.height(14.dp))
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable(onClick = onOpenAuth),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = ExeterDeepGreen.copy(alpha = 0.5f)),
                border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(ExeterTeal))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        modifier = Modifier.weight(1f),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.Lock,
                            contentDescription = null,
                            tint = ExeterMint,
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text(
                                text = "Sign in with Exeter Single Sign-On",
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Bold,
                                color = TextPrimary
                            )
                            Text(
                                text = "Connect your Microsoft account to stream Panopto lecture recordings",
                                style = MaterialTheme.typography.bodySmall,
                                color = TextSecondary
                            )
                        }
                    }

                    Button(
                        onClick = onOpenAuth,
                        colors = ButtonDefaults.buttonColors(containerColor = ExeterMint, contentColor = DarkBackground),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text("Sign In", fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(18.dp))

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            // ── Quick Overview Stats Cards ────────────────────────────────────
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    StatCard(
                        title = "Enrolled Modules",
                        value = "${allCourses.size}",
                        icon = Icons.Default.School,
                        accentColor = ExeterMint,
                        modifier = Modifier.weight(1f)
                    )
                    StatCard(
                        title = "Total Recordings",
                        value = "$totalLectures",
                        icon = Icons.Default.Videocam,
                        accentColor = ExeterTeal,
                        modifier = Modifier.weight(1f)
                    )
                    StatCard(
                        title = "Offline Lectures",
                        value = "${downloads.size}",
                        icon = Icons.Default.DownloadDone,
                        accentColor = SuccessGreen,
                        modifier = Modifier.weight(1f)
                    )
                }
            }

            // ── Recent Recordings / Continue Watching Row ─────────────────────
            item {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Continue Watching & Recent Lectures",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.SemiBold,
                            color = ExeterMint
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    LazyRow(
                        horizontalArrangement = Arrangement.spacedBy(14.dp)
                    ) {
                        items(recentRecordings) { (recording, courseCode) ->
                            val progress = remember(recording.id) { repository.getProgress(recording.id) }
                            RecentRecordingCard(
                                recording = recording,
                                courseCode = courseCode,
                                progressFraction = progress?.progressFraction ?: 0f,
                                onClick = { onPlayRecording(recording) }
                            )
                        }
                    }
                }
            }

            // ── Active Stage 2 Modules Row ────────────────────────────────────
            item {
                Column {
                    Text(
                        text = "Current Term Modules",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold,
                        color = TextPrimary
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    val termOneModules = allCourses.filter { it.stage == 2 }
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        termOneModules.forEach { course ->
                            Box(modifier = Modifier.weight(1f)) {
                                ModuleCard(
                                    course = course,
                                    onClick = { onSelectCourse(course) }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun StatCard(
    title: String,
    value: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    accentColor: androidx.compose.ui.graphics.Color,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = DarkSurface),
        border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(DarkBorder))
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(accentColor.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = accentColor,
                    modifier = Modifier.size(22.dp)
                )
            }
            Spacer(modifier = Modifier.width(14.dp))
            Column {
                Text(
                    text = value,
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )
                Text(
                    text = title,
                    style = MaterialTheme.typography.bodySmall,
                    color = TextMuted
                )
            }
        }
    }
}

@Composable
fun RecentRecordingCard(
    recording: Recording,
    courseCode: String,
    progressFraction: Float,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .width(280.dp)
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = DarkSurface),
        border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(DarkBorder))
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = courseCode,
                    style = MaterialTheme.typography.labelSmall,
                    fontWeight = FontWeight.Bold,
                    color = ExeterMint
                )
                Text(
                    text = recording.duration,
                    style = MaterialTheme.typography.labelSmall,
                    color = TextMuted
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = recording.title,
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )

            if (progressFraction > 0.03f) {
                Spacer(modifier = Modifier.height(8.dp))
                LinearProgressIndicator(
                    progress = { progressFraction },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(3.dp)
                        .clip(RoundedCornerShape(2.dp)),
                    color = ExeterMint,
                    trackColor = DarkSurfaceVariant
                )
            }

            Spacer(modifier = Modifier.height(10.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = recording.date,
                    style = MaterialTheme.typography.bodySmall,
                    color = TextMuted
                )

                Box(
                    modifier = Modifier
                        .size(30.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(ExeterTeal),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.PlayArrow,
                        contentDescription = "Play",
                        tint = TextPrimary,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun ModuleCard(
    course: Course,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = DarkSurface),
        border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(DarkBorder))
    ) {
        Column {
            // Thumbnail Banner with dynamic subject artwork
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(100.dp)
            ) {
                GeometricBanner(seedText = course.code)

                // Recording count chip in top right
                Box(
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .padding(10.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(DarkBackground.copy(alpha = 0.75f))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Videocam,
                            contentDescription = null,
                            tint = ExeterMint,
                            modifier = Modifier.size(13.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "${course.recordings.size}",
                            style = MaterialTheme.typography.labelSmall,
                            color = TextPrimary,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            // Info Body
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = course.title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )

                Spacer(modifier = Modifier.height(4.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = course.convenor.name,
                        style = MaterialTheme.typography.bodySmall,
                        color = TextSecondary,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                        modifier = Modifier.weight(1f)
                    )
                    Text(
                        text = "${course.credits} credits",
                        style = MaterialTheme.typography.labelSmall,
                        color = ExeterMint
                    )
                }
            }
        }
    }
}
