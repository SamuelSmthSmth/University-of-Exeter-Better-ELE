import React, { useState, useEffect, useCallback } from "react";
import { useIsDesktop } from "../hooks/useIsDesktop";

export function IntroSplash() {
  const isDesktop = useIsDesktop();
  const [isExiting, setIsExiting] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  // Responsive duration: 700ms on desktop, 1500ms on mobile for a polished app reveal
  const animDuration = isDesktop ? 700 : 1500;

  const handleExit = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsUnmounted(true);
    }, 320); // 0.32s slide transition
  }, []);

  useEffect(() => {
    // Check if splash bypass requested via url param
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      if (p.get("nosplash") === "1") {
        setIsUnmounted(true);
        return;
      }
    }

    const timer = setTimeout(() => {
      handleExit();
    }, animDuration);

    const handleKeyDown = () => {
      handleExit();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [animDuration, handleExit]);

  if (isUnmounted) return null;

  if (!isDesktop) {
    // ── MOBILE SPECIFIC OPTIMIZED INTRO ANIMATION ─────────────────────────
    return (
      <div
        onClick={handleExit}
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer ${
          isExiting ? "pointer-events-none" : ""
        }`}
        style={{
          transform: isExiting ? "translate3d(0, -100%, 0) scale(0.96)" : "translate3d(0, 0, 0) scale(1)",
          opacity: isExiting ? 0 : 1,
          transition: "transform 0.32s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.28s ease-in",
          willChange: "transform, opacity",
        }}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#004A46] via-[#003030] to-[#001E1E]"
          style={{ animation: "splashBgFadeIn 0.18s ease-out both" }}
        />

        {/* Ambient Halo & Pulse Rings */}
        <div
          className="absolute w-80 h-80 rounded-full border border-[#00C4AD]/20 pointer-events-none"
          style={{ animation: "mobilePulseGlow 1.8s ease-in-out infinite" }}
        />
        <div
          className="absolute w-60 h-60 rounded-full bg-[#00A693]/15 blur-2xl pointer-events-none"
          style={{ animation: "mobilePulseGlow 1.8s ease-in-out 0.2s infinite" }}
        />

        {/* Central Card with Glassmorphism */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-xs animate-in zoom-in-95 fade-in duration-300">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center p-3 mb-5 ring-1 ring-white/10">
            <img
              src="https://www.exeter.ac.uk/v8media/recruitmentsites/images/homepage/uoe-logo.svg"
              alt="University of Exeter"
              className="w-full h-auto drop-shadow-md"
            />
          </div>

          <span className="text-[11px] font-bold tracking-[0.22em] text-[#00C4AD] uppercase font-mono">
            University of Exeter
          </span>

          <h1 className="mt-1 text-2xl font-black text-white tracking-tight">
            ELE 2
          </h1>

          <p className="mt-1 text-xs text-emerald-100/70 font-medium">
            2026/27 Academic Year
          </p>

          {/* Native-feel Loader Bar */}
          <div className="mt-6 w-36 h-1.5 bg-white/15 rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#00A693] via-[#00C4AD] to-emerald-300 rounded-full"
              style={{
                animation: "mobileSplashProgress 1200ms cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
            />
          </div>

          <span className="mt-5 text-[10.5px] font-semibold tracking-wider text-white/40 uppercase">
            Tap to open
          </span>
        </div>
      </div>
    );
  }

  // ── DESKTOP INTRO ANIMATION (Preserved) ──────────────────────────────────
  return (
    <div
      onClick={handleExit}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer bg-background ${
        isExiting ? "pointer-events-none" : ""
      }`}
      style={{
        transform: isExiting ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.36s cubic-bezier(0.76, 0, 0.24, 1)",
        willChange: "transform",
      }}
    >
      {/* ── Seamless Background Fade-in from user's browser color (white/black) to Exeter Green ── */}
      <div
        className="absolute inset-0 bg-[#003C3C]"
        style={{
          animation: "splashBgFadeIn 0.18s ease-out both",
        }}
      />

      {/* ── Abstract Brand Paths passing from off-screen to off-screen ──── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1600 1000"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ── TOP-RIGHT CLUSTER ─────────────────────────────────────────── */}
        {/* 1. White Path: Sweeping arc diving down and curving out right */}
        <path
          d="M 1260, -120 L 1260, 240 C 1260, 390 1370, 470 1720, 480"
          stroke="#FFFFFF"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          style={{
            animation: "exeterCornerStroke 450ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms both",
          }}
        />

        {/* 2. Mint Green Path: Bent angular path entering from top and cutting across */}
        <path
          d="M 1040, -120 L 1180, 160 L 1720, 160"
          stroke="#00C896"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          style={{
            animation: "exeterCornerStroke 550ms cubic-bezier(0.25, 0.1, 0.25, 1) 100ms both",
          }}
        />

        {/* 3. Deep Green Path: Straight diagonal cutting across the corner */}
        <path
          d="M 1720, 320 L 1420, -120"
          stroke="#002422"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          style={{
            animation: "exeterCornerStroke 650ms cubic-bezier(0.25, 0.1, 0.25, 1) 50ms both",
          }}
        />

        {/* ── BOTTOM-LEFT CLUSTER ───────────────────────────────────────── */}
        {/* 4. Mint Green Path: Smooth sweeping ski-curve from bottom to left edge */}
        <path
          d="M 220, 1120 L 220, 740 C 220, 560 120, 480 -120, 460"
          stroke="#00C896"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          style={{
            animation: "exeterCornerStroke 500ms cubic-bezier(0.25, 0.1, 0.25, 1) 80ms both",
          }}
        />

        {/* 5. White Path: Bent angular path cutting in horizontally then shooting down */}
        <path
          d="M -120, 760 L 340, 760 L 520, 1120"
          stroke="#FFFFFF"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          style={{
            animation: "exeterCornerStroke 680ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms both",
          }}
        />

        {/* 6. Deep Green Path: Straight diagonal accent path across corner */}
        <path
          d="M -120, 930 L 280, 1120"
          stroke="#002422"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          style={{
            animation: "exeterCornerStroke 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 150ms both",
          }}
        />
      </svg>

      {/* ── Centerpiece: Fast, Crisp University of Exeter Logo & Title ── */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        <img
          src="https://www.exeter.ac.uk/v8media/recruitmentsites/images/homepage/uoe-logo.svg"
          alt="University of Exeter"
          className="h-24 sm:h-32 w-auto drop-shadow-md"
          style={{
            animation: "exeterLogoFadeIn 0.15s ease-out both",
          }}
        />
        <h1
          className="mt-4 text-xl sm:text-2xl font-bold text-white tracking-wide"
          style={{
            animation: "exeterLogoFadeIn 0.18s ease-out 0.04s both",
          }}
        >
          ELE 2
        </h1>
      </div>
    </div>
  );
}
