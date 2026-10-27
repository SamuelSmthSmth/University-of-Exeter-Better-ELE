package uk.ac.exeter.ele3.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlin.math.*

data class ModuleSubjectVisual(
    val bgGradient: List<Color>,
    val linePrimary: Color,
    val lineSecondary: Color,
    val mathSymbol: String,
    val style: String
)

fun getModuleVisual(moduleCode: String): ModuleSubjectVisual {
    val code = moduleCode.uppercase().trim()
    return when {
        code.contains("MTH2003") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF00241E), Color(0xFF004D40)),
            linePrimary = Color(0xFF00C4AD),
            lineSecondary = Color(0xFF80CBC4),
            mathSymbol = "∂y/∂t",
            style = "waves"
        )
        code.contains("MTH2008") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF081426), Color(0xFF1E3A8A)),
            linePrimary = Color(0xFF60A5FA),
            lineSecondary = Color(0xFF93C5FD),
            mathSymbol = "ε - δ",
            style = "convergence"
        )
        code.contains("MTH2010") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF220847), Color(0xFF581C87)),
            linePrimary = Color(0xFFC084FC),
            lineSecondary = Color(0xFFE9D5FF),
            mathSymbol = "⟨G, *⟩",
            style = "algebra"
        )
        code.contains("MTH1004") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF331402), Color(0xFF7C2D12)),
            linePrimary = Color(0xFFFB923C),
            lineSecondary = Color(0xFFFDBA74),
            mathSymbol = "N(μ, σ²)",
            style = "gaussian"
        )
        code.contains("MTH2014") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF022423), Color(0xFF134E4A)),
            linePrimary = Color(0xFF2DD4BF),
            lineSecondary = Color(0xFF5EEAD4),
            mathSymbol = "Δx → 0",
            style = "mesh"
        )
        code.contains("MTH1002") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF3B0413), Color(0xFF881337)),
            linePrimary = Color(0xFFFB7185),
            lineSecondary = Color(0xFFFDA4AF),
            mathSymbol = "∬ f dA",
            style = "integral"
        )
        code.contains("MTH1001") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF151336), Color(0xFF312E81)),
            linePrimary = Color(0xFF818CF8),
            lineSecondary = Color(0xFFA5B4FC),
            mathSymbol = "A ∪ B",
            style = "structures"
        )
        code.contains("MTH1003") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF2E2000), Color(0xFF713F12)),
            linePrimary = Color(0xFFFBBF24),
            lineSecondary = Color(0xFFFDE68A),
            mathSymbol = "dx/dt",
            style = "waves"
        )
        code.contains("MTH2004") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF151336), Color(0xFF3730A3)),
            linePrimary = Color(0xFFA78BFA),
            lineSecondary = Color(0xFFC4B5FD),
            mathSymbol = "∇ × F",
            style = "integral"
        )
        code.contains("MTH2009") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF052136), Color(0xFF0369A1)),
            linePrimary = Color(0xFF38BDF8),
            lineSecondary = Color(0xFF7DD3FC),
            mathSymbol = "∮ f(z)dz",
            style = "convergence"
        )
        code.contains("MTH2011") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF0A0F1D), Color(0xFF334155)),
            linePrimary = Color(0xFF94A3B8),
            lineSecondary = Color(0xFFCBD5E1),
            mathSymbol = "Av = λv",
            style = "mesh"
        )
        code.contains("MTH2015") -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF290547), Color(0xFF701A75)),
            linePrimary = Color(0xFFF472B6),
            lineSecondary = Color(0xFFFBCFE8),
            mathSymbol = "min L(θ)",
            style = "algebra"
        )
        else -> ModuleSubjectVisual(
            bgGradient = listOf(Color(0xFF00241E), Color(0xFF004D40)),
            linePrimary = Color(0xFF00C4AD),
            lineSecondary = Color(0xFF80CBC4),
            mathSymbol = "∑ xᵢ",
            style = "waves"
        )
    }
}

@Composable
fun GeometricBanner(
    seedText: String,
    modifier: Modifier = Modifier
) {
    val visual = remember(seedText) { getModuleVisual(seedText) }

    Box(modifier = modifier.fillMaxSize()) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val w = size.width
            val h = size.height

            // Background Gradient Fill
            drawRect(
                brush = Brush.horizontalGradient(
                    colors = visual.bgGradient,
                    startX = 0f,
                    endX = w
                )
            )

            when (visual.style) {
                "waves" -> {
                    // Differential Equations: Harmonic Sinusoidal Waves
                    val wavePath1 = Path()
                    val wavePath2 = Path()
                    val wavePath3 = Path()

                    val points = 60
                    for (i in 0..points) {
                        val x = (w / points) * i
                        val normX = (i.toFloat() / points) * 2 * Math.PI.toFloat()
                        val y1 = (h * 0.5f) + sin(normX * 1.5f) * (h * 0.28f)
                        val y2 = (h * 0.5f) + sin(normX * 2.2f + 1.2f) * (h * 0.22f)
                        val y3 = (h * 0.5f) + cos(normX * 1.8f + 0.5f) * (h * 0.32f)

                        if (i == 0) {
                            wavePath1.moveTo(x, y1)
                            wavePath2.moveTo(x, y2)
                            wavePath3.moveTo(x, y3)
                        } else {
                            wavePath1.lineTo(x, y1)
                            wavePath2.lineTo(x, y2)
                            wavePath3.lineTo(x, y3)
                        }
                    }
                    drawPath(wavePath1, color = visual.linePrimary.copy(alpha = 0.45f), style = Stroke(width = 2.5f))
                    drawPath(wavePath2, color = visual.lineSecondary.copy(alpha = 0.35f), style = Stroke(width = 2f))
                    drawPath(wavePath3, color = visual.linePrimary.copy(alpha = 0.25f), style = Stroke(width = 1.5f))
                }

                "convergence" -> {
                    // Real Analysis: Nested convergent epsilon interval brackets
                    val cx = w * 0.65f
                    val cy = h * 0.5f
                    val numSteps = 7
                    for (i in 1..numSteps) {
                        val radiusX = (w * 0.45f) / i
                        val radiusY = (h * 0.42f) / (1f + (i * 0.25f))
                        val alpha = (0.5f - (i * 0.05f)).coerceAtLeast(0.15f)
                        drawOval(
                            color = visual.linePrimary.copy(alpha = alpha),
                            topLeft = Offset(cx - radiusX, cy - radiusY),
                            size = androidx.compose.ui.geometry.Size(radiusX * 2, radiusY * 2),
                            style = Stroke(width = 1.8f)
                        )
                    }
                    // Convergence asymptote
                    drawLine(
                        color = visual.lineSecondary.copy(alpha = 0.4f),
                        start = Offset(0f, cy),
                        end = Offset(w, cy),
                        strokeWidth = 1.5f
                    )
                }

                "algebra" -> {
                    // Groups & Rings: Symmetric Polygon & Symmetry Axes
                    val cx = w * 0.7f
                    val cy = h * 0.5f
                    for (sideCount in listOf(6, 8)) {
                        val hexPath = Path()
                        val r = h * 0.42f * (if (sideCount == 6) 1f else 0.65f)
                        for (i in 0 until sideCount) {
                            val angle = (2 * Math.PI / sideCount * i).toFloat()
                            val px = cx + r * cos(angle)
                            val py = cy + r * sin(angle)
                            if (i == 0) hexPath.moveTo(px, py) else hexPath.lineTo(px, py)
                        }
                        hexPath.close()
                        drawPath(hexPath, color = visual.linePrimary.copy(alpha = 0.4f), style = Stroke(width = 2f))
                    }
                    // Reflection axes
                    drawLine(
                        color = visual.lineSecondary.copy(alpha = 0.3f),
                        start = Offset(cx - (h * 0.5f), cy - (h * 0.5f)),
                        end = Offset(cx + (h * 0.5f), cy + (h * 0.5f)),
                        strokeWidth = 1.2f
                    )
                    drawLine(
                        color = visual.lineSecondary.copy(alpha = 0.3f),
                        start = Offset(cx - (h * 0.5f), cy + (h * 0.5f)),
                        end = Offset(cx + (h * 0.5f), cy - (h * 0.5f)),
                        strokeWidth = 1.2f
                    )
                }

                "gaussian" -> {
                    // Probability & Statistics: Gaussian Bell Curve
                    val bellPath = Path()
                    val points = 60
                    val mu = w * 0.62f
                    val sigma = w * 0.16f
                    for (i in 0..points) {
                        val x = (w / points) * i
                        val norm = (x - mu) / sigma
                        val y = (h * 0.88f) - (exp(-0.5f * norm * norm) * (h * 0.65f))
                        if (i == 0) bellPath.moveTo(x, y) else bellPath.lineTo(x, y)
                    }
                    drawPath(bellPath, color = visual.linePrimary.copy(alpha = 0.55f), style = Stroke(width = 2.5f))

                    // Mean vertical axis
                    drawLine(
                        color = visual.lineSecondary.copy(alpha = 0.4f),
                        start = Offset(mu, h * 0.2f),
                        end = Offset(mu, h * 0.9f),
                        strokeWidth = 1.5f
                    )
                    // Baseline
                    drawLine(
                        color = visual.linePrimary.copy(alpha = 0.3f),
                        start = Offset(0f, h * 0.88f),
                        end = Offset(w, h * 0.88f),
                        strokeWidth = 1.5f
                    )
                }

                "mesh" -> {
                    // Numerical Modelling / Matrices: Discrete Orthogonal Mesh
                    val step = 24f
                    var x = 0f
                    while (x < w) {
                        drawLine(
                            color = visual.linePrimary.copy(alpha = 0.18f),
                            start = Offset(x, 0f),
                            end = Offset(x, h),
                            strokeWidth = 1f
                        )
                        x += step
                    }
                    var y = 0f
                    while (y < h) {
                        drawLine(
                            color = visual.lineSecondary.copy(alpha = 0.18f),
                            start = Offset(0f, y),
                            end = Offset(w, y),
                            strokeWidth = 1f
                        )
                        y += step
                    }
                }

                else -> {
                    // Elegant flow curves
                    for (i in 1..4) {
                        val cx = (w * 0.3f) + (i * 40f)
                        val cy = h / 2f
                        val radius = (h * 0.5f) + (i * 12f)
                        drawCircle(
                            color = visual.linePrimary.copy(alpha = 0.35f / i),
                            center = Offset(cx, cy),
                            radius = radius,
                            style = Stroke(width = 2f)
                        )
                    }
                }
            }
        }

        // Subject Math Symbol Badge in Top Left
        Box(
            modifier = Modifier
                .align(Alignment.TopStart)
                .padding(10.dp)
                .clip(RoundedCornerShape(8.dp))
                .background(Color.Black.copy(alpha = 0.45f))
                .padding(horizontal = 8.dp, vertical = 3.dp)
        ) {
            Text(
                text = visual.mathSymbol,
                color = visual.linePrimary,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Monospace
            )
        }
    }
}
