package uk.ac.exeter.ele3.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import uk.ac.exeter.ele3.ui.theme.ExeterDeepGreen
import uk.ac.exeter.ele3.ui.theme.ExeterMint
import uk.ac.exeter.ele3.ui.theme.ExeterTeal
import kotlin.math.abs

@Composable
fun GeometricBanner(
    seedText: String,
    modifier: Modifier = Modifier
) {
    val seed = remember(seedText) {
        abs(seedText.hashCode())
    }

    Canvas(modifier = modifier.fillMaxSize()) {
        val w = size.width
        val h = size.height

        // Background fill
        drawRect(color = ExeterDeepGreen)

        val strokeWidth = 2f
        val numLines = 6
        val step = w / (numLines + 1)

        // Draw elegant intersecting curved arcs
        for (i in 1..numLines) {
            val cx = step * i + ((seed * 17 * i) % 40) - 20
            val cy = h / 2f
            val radius = (h * 0.7f) + ((seed * 13 * i) % 30)

            val color = if (i % 2 == 0) ExeterTeal.copy(alpha = 0.35f) else ExeterMint.copy(alpha = 0.25f)

            drawCircle(
                color = color,
                center = Offset(cx, cy),
                radius = radius,
                style = Stroke(width = strokeWidth)
            )
        }

        // Connecting horizon lines
        drawLine(
            color = ExeterMint.copy(alpha = 0.2f),
            start = Offset(0f, h * 0.35f),
            end = Offset(w, h * 0.65f),
            strokeWidth = 1.5f
        )
        drawLine(
            color = ExeterTeal.copy(alpha = 0.25f),
            start = Offset(0f, h * 0.65f),
            end = Offset(w, h * 0.35f),
            strokeWidth = 1.5f
        )
    }
}
