import React from "react";

interface EleGeometricPatternProps {
  seed?: string;
  className?: string;
  height?: number | string;
}

// Procedurally renders subtle dark-teal geometric motifs matching ELE's course thumbnails
export const EleGeometricPattern: React.FC<EleGeometricPatternProps> = ({ seed = "exeter-ele", className = "", height = "100%" }) => {
  // Simple deterministic hash of seed string to choose pattern variant and colors
  let hash = 0;
  const safeSeed = seed || "exeter-ele";
  for (let i = 0; i < safeSeed.length; i++) {
    hash = (hash << 5) - hash + safeSeed.charCodeAt(i);
    hash |= 0;
  }
  const variant = Math.abs(hash) % 4;

  const bgTeal = "#003232";
  const darkTeal = "#002424";
  const lightTeal = "#004848";
  const accentLine = "rgba(0, 196, 173, 0.15)";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height, backgroundColor: bgTeal }}
    >
      <svg
        className="w-full h-full object-cover pointer-events-none opacity-85"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 160"
      >
        <defs>
          <linearGradient id={`grad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkTeal} />
            <stop offset="50%" stopColor={bgTeal} />
            <stop offset="100%" stopColor={lightTeal} />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill={`url(#grad-${seed})`} />

        {variant === 0 && (
          // Diamond / Isometric mesh (Variant 1 from ELE image)
          <g stroke={accentLine} strokeWidth="1.5" fill="none">
            <polygon points="100,0 200,80 100,160 0,80" fill="rgba(0, 60, 60, 0.3)" />
            <polygon points="300,0 400,80 300,160 200,80" fill="rgba(0, 80, 80, 0.25)" />
            <polygon points="200,80 300,160 200,240 100,160" fill="rgba(0, 40, 40, 0.4)" />
            <line x1="0" y1="0" x2="400" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="400" y1="0" x2="0" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </g>
        )}

        {variant === 1 && (
          // Concentric ripple rings (Variant 2 from ELE image)
          <g fill="none" stroke={accentLine} strokeWidth="1.5">
            <circle cx="120" cy="80" r="40" stroke="rgba(0, 196, 173, 0.2)" />
            <circle cx="120" cy="80" r="75" stroke="rgba(255, 255, 255, 0.08)" />
            <circle cx="120" cy="80" r="110" stroke="rgba(0, 196, 173, 0.12)" />
            <circle cx="280" cy="80" r="50" stroke="rgba(255, 255, 255, 0.08)" />
            <circle cx="280" cy="80" r="90" stroke="rgba(0, 196, 173, 0.16)" />
          </g>
        )}

        {variant === 2 && (
          // Hexagon / faceted pattern (Variant 3 from ELE image)
          <g stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" fill="none">
            <path d="M50 20 L110 20 L140 70 L110 120 L50 120 L20 70 Z" fill="rgba(0, 60, 60, 0.25)" />
            <path d="M170 20 L230 20 L260 70 L230 120 L170 120 L140 70 Z" fill="rgba(0, 80, 80, 0.2)" />
            <path d="M290 20 L350 20 L380 70 L350 120 L290 120 L260 70 Z" fill="rgba(0, 50, 50, 0.3)" />
            <circle cx="140" cy="70" r="4" fill="rgba(0, 196, 173, 0.4)" />
            <circle cx="260" cy="70" r="4" fill="rgba(0, 196, 173, 0.4)" />
          </g>
        )}

        {variant === 3 && (
          // Grid + intersecting diagonal waves (Variant 4 from ELE image)
          <g stroke="rgba(0, 196, 173, 0.12)" strokeWidth="1" fill="none">
            <path d="M0,40 Q100,0 200,40 T400,40" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <path d="M0,80 Q100,120 200,80 T400,80" stroke="rgba(0, 196, 173, 0.2)" strokeWidth="1.5" />
            <path d="M0,120 Q100,80 200,120 T400,120" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <line x1="100" y1="0" x2="100" y2="160" stroke="rgba(255,255,255,0.05)" />
            <line x1="200" y1="0" x2="200" y2="160" stroke="rgba(255,255,255,0.05)" />
            <line x1="300" y1="0" x2="300" y2="160" stroke="rgba(255,255,255,0.05)" />
          </g>
        )}
      </svg>
    </div>
  );
};
