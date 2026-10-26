import React, { useEffect, useState } from "react";
import { X, Type, Eye, Sparkles, Sliders, ExternalLink, RotateCcw, Check, ZapOff, Link as LinkIcon, Focus } from "lucide-react";

export interface A11ySettings {
  fontSize: "normal" | "medium" | "large";
  highContrast: boolean;
  dyslexicFont: boolean;
  reducedMotion: boolean;
  underlineLinks: boolean;
  enhancedFocus: boolean;
}

export const DEFAULT_A11Y_SETTINGS: A11ySettings = {
  fontSize: "normal",
  highContrast: false,
  dyslexicFont: false,
  reducedMotion: false,
  underlineLinks: false,
  enhancedFocus: false,
};

export function applyA11ySettings(settings: A11ySettings) {
  const root = document.documentElement;

  // Font size
  root.classList.remove("a11y-font-md", "a11y-font-lg");
  if (settings.fontSize === "medium") root.classList.add("a11y-font-md");
  if (settings.fontSize === "large") root.classList.add("a11y-font-lg");

  // High contrast
  root.classList.toggle("a11y-high-contrast", settings.highContrast);

  // Dyslexic font
  root.classList.toggle("a11y-dyslexic", settings.dyslexicFont);

  // Reduced motion
  root.classList.toggle("a11y-reduce-motion", settings.reducedMotion);

  // Underline links
  root.classList.toggle("a11y-underline-links", settings.underlineLinks);

  // Enhanced focus
  root.classList.toggle("a11y-enhanced-focus", settings.enhancedFocus);
}

export function AccessibilityModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [settings, setSettings] = useState<A11ySettings>(() => {
    try {
      const saved = localStorage.getItem("exeter_a11y_settings");
      return saved ? { ...DEFAULT_A11Y_SETTINGS, ...JSON.parse(saved) } : DEFAULT_A11Y_SETTINGS;
    } catch {
      return DEFAULT_A11Y_SETTINGS;
    }
  });

  // Apply whenever settings change
  useEffect(() => {
    applyA11ySettings(settings);
    localStorage.setItem("exeter_a11y_settings", JSON.stringify(settings));
  }, [settings]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resetDefaults = () => {
    setSettings(DEFAULT_A11Y_SETTINGS);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-labelledby="a11y-dialog-title"
        aria-modal="true"
        className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#003C3C] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00C4AD]/20 border border-[#00C4AD]/40 flex items-center justify-center text-[#00C4AD]">
              <Sliders size={20} />
            </div>
            <div>
              <h2 id="a11y-dialog-title" className="text-lg font-bold tracking-tight">Accessibility Settings</h2>
              <p className="text-xs text-white/70">Customise display and reading comfort for Programme Planner</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close accessibility settings"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-foreground">
          {/* 1. Font Size Scaling */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Type size={16} className="text-[#00A693]" />
              <span>Text Scaling</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["normal", "medium", "large"] as const).map((size) => {
                const labels = { normal: "Default (100%)", medium: "Medium (+15%)", large: "Large (+30%)" };
                const isSelected = settings.fontSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSettings((s) => ({ ...s, fontSize: size }))}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? "bg-[#003C3C] text-white border-[#003C3C] dark:bg-[#00C4AD] dark:text-[#003C3C] dark:border-[#00C4AD] shadow-xs"
                        : "bg-background border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{size.charAt(0).toUpperCase() + size.slice(1)}</span>
                    <span className="text-[10px] opacity-80">{labels[size]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            {/* 2. High Contrast */}
            <label className="flex items-start justify-between gap-4 cursor-pointer select-none">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Eye size={16} className="text-[#00A693]" />
                  <span>High Contrast</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enhances borders and strengthens text contrast ratios for increased visibility.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => setSettings((s) => ({ ...s, highContrast: e.target.checked }))}
                className="mt-1 h-5 w-5 rounded border-border text-[#00A693] focus:ring-[#00A693] accent-[#00A693]"
              />
            </label>

            {/* 3. Dyslexia-Friendly Font */}
            <label className="flex items-start justify-between gap-4 cursor-pointer select-none">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Sparkles size={16} className="text-[#00A693]" />
                  <span>Dyslexia-Friendly Font</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Applies wide letter-spacing, open typography, and increased line height.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.dyslexicFont}
                onChange={(e) => setSettings((s) => ({ ...s, dyslexicFont: e.target.checked }))}
                className="mt-1 h-5 w-5 rounded border-border text-[#00A693] focus:ring-[#00A693] accent-[#00A693]"
              />
            </label>

            {/* 4. Reduced Motion */}
            <label className="flex items-start justify-between gap-4 cursor-pointer select-none">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <ZapOff size={16} className="text-[#00A693]" />
                  <span>Reduce Motion</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Eliminates splash animations, layout slide transitions, and pulsing UI indicators.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => setSettings((s) => ({ ...s, reducedMotion: e.target.checked }))}
                className="mt-1 h-5 w-5 rounded border-border text-[#00A693] focus:ring-[#00A693] accent-[#00A693]"
              />
            </label>

            {/* 5. Underline Links */}
            <label className="flex items-start justify-between gap-4 cursor-pointer select-none">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <LinkIcon size={16} className="text-[#00A693]" />
                  <span>Always Underline Links</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Adds clear underlines to all interactive links and module codes for visual distinction.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.underlineLinks}
                onChange={(e) => setSettings((s) => ({ ...s, underlineLinks: e.target.checked }))}
                className="mt-1 h-5 w-5 rounded border-border text-[#00A693] focus:ring-[#00A693] accent-[#00A693]"
              />
            </label>

            {/* 6. Enhanced Keyboard Focus */}
            <label className="flex items-start justify-between gap-4 cursor-pointer select-none">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Focus size={16} className="text-[#00A693]" />
                  <span>High-Visibility Focus Indicators</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Highlights the currently focused element with a distinctive 3px teal outline when tabbing.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enhancedFocus}
                onChange={(e) => setSettings((s) => ({ ...s, enhancedFocus: e.target.checked }))}
                className="mt-1 h-5 w-5 rounded border-border text-[#00A693] focus:ring-[#00A693] accent-[#00A693]"
              />
            </label>
          </div>

          {/* Official Statement link */}
          <div className="p-3.5 bg-muted/40 rounded-xl border border-border flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-foreground">University Accessibility Statement</div>
              <div className="text-muted-foreground mt-0.5">Review full Exeter digital compliance standards</div>
            </div>
            <a
              href="https://www.exeter.ac.uk/about/oursite/accessibility/compliance/ele/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#00A693] hover:underline"
            >
              <span>View Statement</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-muted/20 border-t border-border flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={resetDefaults}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#003C3C] hover:bg-[#00524d] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Check size={14} />
            <span>Apply & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
