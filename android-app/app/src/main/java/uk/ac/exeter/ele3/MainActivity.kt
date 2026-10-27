package uk.ac.exeter.ele3

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import uk.ac.exeter.ele3.data.AuthManager
import uk.ac.exeter.ele3.data.PanoptoRepository
import uk.ac.exeter.ele3.data.model.Course
import uk.ac.exeter.ele3.data.model.Recording
import uk.ac.exeter.ele3.ui.components.AuthDialog
import uk.ac.exeter.ele3.ui.components.NavDestination
import uk.ac.exeter.ele3.ui.components.TabletNavRail
import uk.ac.exeter.ele3.ui.screens.DashboardScreen
import uk.ac.exeter.ele3.ui.screens.DownloadsScreen
import uk.ac.exeter.ele3.ui.screens.ModuleDetailScreen
import uk.ac.exeter.ele3.ui.screens.PlayerScreen
import uk.ac.exeter.ele3.ui.theme.DarkBackground
import uk.ac.exeter.ele3.ui.theme.ELE3Theme

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val defaultHandler = Thread.getDefaultUncaughtExceptionHandler()
        Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
            android.util.Log.e("ELE3_FATAL", "FATAL CRASH DETECTED", throwable)
            try {
                val file = java.io.File(applicationContext.filesDir, "crash.txt")
                file.writeText("${java.util.Date()}\n${throwable.stackTraceToString()}")
            } catch (ignored: Exception) {}
            defaultHandler?.uncaughtException(thread, throwable)
        }

        val authManager = AuthManager.getInstance(this)
        val repository = PanoptoRepository.getInstance(this)

        setContent {
            ELE3Theme {
                val isLoggedIn by authManager.isLoggedIn.collectAsState()

                var currentRoute by remember { mutableStateOf(NavDestination.Dashboard.route) }
                var selectedCourse by remember { mutableStateOf<Course?>(null) }
                var activeRecording by remember { mutableStateOf<Recording?>(null) }
                var isAuthDialogOpen by remember { mutableStateOf(false) }

                // System Back button navigation handling
                BackHandler(enabled = activeRecording != null || selectedCourse != null) {
                    if (activeRecording != null) {
                        activeRecording = null
                    } else if (selectedCourse != null) {
                        selectedCourse = null
                    }
                }

                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = DarkBackground
                ) {
                    if (activeRecording != null) {
                        // Fullscreen Immersive Video Player (Hides Nav Rail)
                        PlayerScreen(
                            recording = activeRecording!!,
                            onBack = { activeRecording = null },
                            repository = repository,
                            authManager = authManager
                        )
                    } else {
                        // Tablet Layout with Left Nav Rail
                        Row(modifier = Modifier.fillMaxSize()) {
                            TabletNavRail(
                                currentRoute = currentRoute,
                                isLoggedIn = isLoggedIn,
                                onNavigate = { route ->
                                    currentRoute = route
                                    selectedCourse = null
                                },
                                onOpenAuth = { isAuthDialogOpen = true }
                            )

                            Box(modifier = Modifier.weight(1f).fillMaxHeight()) {
                                if (selectedCourse != null) {
                                    ModuleDetailScreen(
                                        course = selectedCourse!!,
                                        onBack = { selectedCourse = null },
                                        onPlayRecording = { recording -> activeRecording = recording },
                                        repository = repository
                                    )
                                } else {
                                    when (currentRoute) {
                                        NavDestination.Dashboard.route, NavDestination.Modules.route -> {
                                            DashboardScreen(
                                                onSelectCourse = { course -> selectedCourse = course },
                                                onPlayRecording = { recording -> activeRecording = recording },
                                                repository = repository,
                                                isLoggedIn = isLoggedIn,
                                                onOpenAuth = { isAuthDialogOpen = true }
                                            )
                                        }

                                        NavDestination.Downloads.route -> {
                                            DownloadsScreen(
                                                repository = repository,
                                                onPlayOffline = { recording -> activeRecording = recording }
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // In-App Exeter Microsoft SSO Dialog
                    AuthDialog(
                        isOpen = isAuthDialogOpen,
                        onDismiss = { isAuthDialogOpen = false },
                        authManager = authManager
                    )
                }
            }
        }
    }
}
