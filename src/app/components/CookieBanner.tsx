import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, ChevronDown, ChevronUp, Check, X } from "lucide-react";

export type CookieConsentChoice = "all" | "essential" | "custom" | null;

export interface CookiePreferences {
  essential: boolean; // always true
  analytics: boolean;
  preferences: boolean;
}

export function CookieBanner({
  onOpenPrivacy,
  onOpenTerms,
  forceShow = false,
  onDismissForce,
}: {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  forceShow?: boolean;
  onDismissForce?: () => void;
}) {
  const [hasDecided, setHasDecided] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    preferences: true,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("nocookie") === "1") {
      setHasDecided(true);
      return;
    }
    const saved = localStorage.getItem("exeter_cookie_consent");
    if (!saved && !forceShow) {
      // Show banner if never decided
      setHasDecided(false);
    } else if (forceShow) {
      setHasDecided(false);
      setShowDetails(true);
    }
  }, [forceShow]);

  const handleAcceptAll = () => {
    localStorage.setItem("exeter_cookie_consent", "all");
    localStorage.setItem(
      "exeter_cookie_preferences",
      JSON.stringify({ essential: true, analytics: true, preferences: true })
    );
    setHasDecided(true);
    if (onDismissForce) onDismissForce();
  };

  const handleDeclineAll = () => {
    localStorage.setItem("exeter_cookie_consent", "essential");
    localStorage.setItem(
      "exeter_cookie_preferences",
      JSON.stringify({ essential: true, analytics: false, preferences: false })
    );
    setHasDecided(true);
    if (onDismissForce) onDismissForce();
  };

  const handleSaveCustom = () => {
    localStorage.setItem("exeter_cookie_consent", "custom");
    localStorage.setItem("exeter_cookie_preferences", JSON.stringify(prefs));
    setHasDecided(true);
    if (onDismissForce) onDismissForce();
  };

  if (hasDecided && !forceShow) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-16 lg:bottom-0 inset-x-0 z-[110] p-3 sm:p-5 flex justify-center pointer-events-none animate-in slide-in-from-bottom-5 duration-300 print:hidden"
    >
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-5 w-full max-w-4xl pointer-events-auto flex flex-col gap-4 text-foreground ring-1 ring-black/5 dark:ring-white/5">
        {/* Top summary row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#00A693]/15 text-[#00A693] flex items-center justify-center shrink-0 mt-0.5">
              <Cookie size={22} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-foreground">Cookie & Storage Notice</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                We use cookies and local storage to keep your module selections, degree requirements, timetable sync, and accessibility settings active. You can choose whether to enable optional performance and analytics insights.
              </p>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors flex items-center gap-1"
            >
              <span>Manage Preferences</span>
              {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button
              type="button"
              onClick={handleDeclineAll}
              className="px-4 py-2 border border-border text-foreground hover:bg-muted text-xs font-semibold rounded-xl transition-colors"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2 bg-[#003C3C] hover:bg-[#00524d] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Detailed Preferences Expansion (the "blah") */}
        {showDetails && (
          <div className="border-t border-border pt-4 mt-1 space-y-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Essential */}
              <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Essential Storage</span>
                  <span className="text-[10px] font-semibold text-[#00A693] bg-[#00A693]/10 px-1.5 py-0.5 rounded">
                    Always Active
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Required for saving degree plans, selected modules, credit balancing, and dark mode.
                </p>
              </div>

              {/* Preferences */}
              <label className="p-3 bg-muted/40 rounded-xl border border-border space-y-1.5 cursor-pointer block">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Functional Preferences</span>
                  <input
                    type="checkbox"
                    checked={prefs.preferences}
                    onChange={(e) => setPrefs((p) => ({ ...p, preferences: e.target.checked }))}
                    className="h-4 w-4 rounded border-border text-[#00A693] focus:ring-[#00A693] accent-[#00A693]"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Remembers your recent searches, timetable calendars, and tree layout choices.
                </p>
              </label>

              {/* Analytics */}
              <label className="p-3 bg-muted/40 rounded-xl border border-border space-y-1.5 cursor-pointer block">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Anonymous Analytics</span>
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                    className="h-4 w-4 rounded border-border text-[#00A693] focus:ring-[#00A693] accent-[#00A693]"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Helps the University understand common pathways and improve course search speeds.
                </p>
              </label>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-foreground underline"
                >
                  Privacy Notice
                </button>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-foreground underline"
                >
                  Terms of Service
                </button>
              </div>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-1.5 bg-[#00A693] hover:bg-[#008f7e] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Check size={14} />
                <span>Save Selected Preferences</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
