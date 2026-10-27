package uk.ac.exeter.ele3.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import uk.ac.exeter.ele3.ui.theme.*

sealed class NavDestination(val route: String, val label: String) {
    object Dashboard : NavDestination("dashboard", "Dashboard")
    object Modules : NavDestination("modules", "Modules")
    object Downloads : NavDestination("downloads", "Downloads")
}

@Composable
fun TabletNavRail(
    currentRoute: String,
    isLoggedIn: Boolean,
    onNavigate: (String) -> Unit,
    onOpenAuth: () -> Unit
) {
    NavigationRail(
        containerColor = DarkSurface,
        contentColor = TextPrimary,
        header = {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.padding(top = 16.dp, bottom = 24.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .clip(CircleShape)
                        .background(ExeterDeepGreen),
                    contentAlignment = Alignment.Center
                ) {
                    Image(
                        painter = painterResource(id = uk.ac.exeter.ele3.R.drawable.ic_exeter_crest),
                        contentDescription = "Exeter Emblem",
                        modifier = Modifier.size(38.dp)
                    )
                }
            }
        },
        modifier = Modifier.width(88.dp)
    ) {
        // Navigation items
        NavigationRailItem(
            selected = currentRoute == NavDestination.Dashboard.route,
            onClick = { onNavigate(NavDestination.Dashboard.route) },
            icon = { Icon(Icons.Default.Home, contentDescription = "Dashboard") },
            label = { Text("Home", color = if (currentRoute == NavDestination.Dashboard.route) ExeterMint else TextSecondary) },
            colors = NavigationRailItemDefaults.colors(
                selectedIconColor = DarkBackground,
                indicatorColor = ExeterMint,
                unselectedIconColor = TextSecondary
            )
        )

        NavigationRailItem(
            selected = currentRoute == NavDestination.Modules.route,
            onClick = { onNavigate(NavDestination.Modules.route) },
            icon = { Icon(Icons.Default.School, contentDescription = "Modules") },
            label = { Text("Modules", color = if (currentRoute == NavDestination.Modules.route) ExeterMint else TextSecondary) },
            colors = NavigationRailItemDefaults.colors(
                selectedIconColor = DarkBackground,
                indicatorColor = ExeterMint,
                unselectedIconColor = TextSecondary
            )
        )

        NavigationRailItem(
            selected = currentRoute == NavDestination.Downloads.route,
            onClick = { onNavigate(NavDestination.Downloads.route) },
            icon = { Icon(Icons.Default.Download, contentDescription = "Downloads") },
            label = { Text("Offline", color = if (currentRoute == NavDestination.Downloads.route) ExeterMint else TextSecondary) },
            colors = NavigationRailItemDefaults.colors(
                selectedIconColor = DarkBackground,
                indicatorColor = ExeterMint,
                unselectedIconColor = TextSecondary
            )
        )

        Spacer(modifier = Modifier.weight(1f))

        // SSO Login Status Button at bottom of rail
        IconButton(
            onClick = onOpenAuth,
            modifier = Modifier.padding(bottom = 20.dp)
        ) {
            Box(contentAlignment = Alignment.BottomEnd) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = "Exeter Account",
                    tint = if (isLoggedIn) ExeterMint else TextMuted,
                    modifier = Modifier.size(28.dp)
                )
                // Green indicator dot if authenticated
                if (isLoggedIn) {
                    Box(
                        modifier = Modifier
                            .size(9.dp)
                            .clip(CircleShape)
                            .background(SuccessGreen)
                    )
                }
            }
        }
    }
}
