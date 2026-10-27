package uk.ac.exeter.ele3.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.FilterList
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Videocam
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
fun ModulesScreen(
    onSelectCourse: (Course) -> Unit,
    repository: PanoptoRepository
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedFilter by remember { mutableStateOf("All") }

    val allCourses = remember { CoursesData.courses }
    val filteredCourses = remember(searchQuery, selectedFilter) {
        allCourses.filter { course ->
            val matchesSearch = if (searchQuery.isBlank()) true else {
                val q = searchQuery.trim().lowercase()
                course.code.lowercase().contains(q) ||
                course.title.lowercase().contains(q) ||
                course.convenor.name.lowercase().contains(q)
            }

            val matchesFilter = when (selectedFilter) {
                "Autumn" -> course.term.contains("Autumn", ignoreCase = true)
                "Spring" -> course.term.contains("Spring", ignoreCase = true)
                "Stage 2" -> course.stage == 2
                "Stage 1" -> course.stage == 1
                else -> true
            }

            matchesSearch && matchesFilter
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(horizontal = 24.dp, vertical = 20.dp)
    ) {
        // Top Header Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Course Modules",
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )
                Text(
                    text = "${filteredCourses.size} modules available for Stage 2",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextMuted
                )
            }

            // Search Bar
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                placeholder = { Text("Filter by code, name, lecturer...", color = TextMuted) },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null, tint = ExeterMint) },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { searchQuery = "" }) {
                            Icon(Icons.Default.Clear, contentDescription = "Clear", tint = TextMuted)
                        }
                    }
                },
                singleLine = true,
                modifier = Modifier
                    .width(360.dp)
                    .height(52.dp),
                shape = RoundedCornerShape(14.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = ExeterMint,
                    unfocusedBorderColor = DarkBorder,
                    focusedContainerColor = DarkSurface,
                    unfocusedContainerColor = DarkSurface,
                    focusedTextColor = TextPrimary,
                    unfocusedTextColor = TextPrimary
                )
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Filter Pills Row
        Row(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            listOf("All", "Autumn", "Spring", "Stage 2", "Stage 1").forEach { filterName ->
                val isSelected = selectedFilter == filterName
                FilterChip(
                    selected = isSelected,
                    onClick = { selectedFilter = filterName },
                    label = {
                        Text(
                            text = filterName,
                            color = if (isSelected) DarkBackground else TextSecondary,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
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
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Modules 3-column Grid
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            val rows = (filteredCourses.size + 2) / 3
            items(rows) { rowIndex ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    for (colIndex in 0..2) {
                        val itemIndex = rowIndex * 3 + colIndex
                        if (itemIndex < filteredCourses.size) {
                            val course = filteredCourses[itemIndex]
                            Box(modifier = Modifier.weight(1f)) {
                                ModuleCard(
                                    course = course,
                                    onClick = { onSelectCourse(course) }
                                )
                            }
                        } else {
                            Spacer(modifier = Modifier.weight(1f))
                        }
                    }
                }
            }
        }
    }
}
