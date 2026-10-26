import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  ShieldAlert,
  Search,
  X,
  Share2,
  Trash2,
  Info,
  ChevronRight,
  ChevronUp,
  AlertCircle,
  SlidersHorizontal,
  Plus,
  Check,
  Layers,
  Download,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { Module, StageReq, Programme } from "../../api/timeedit";
import type { ModuleStatus } from "../App";
import { getModuleStatus, getStageCredits, getStageCreditDetails, DetailPanel } from "../App";
import { TimetableEvent } from "../../api/timetable";

export interface MobilePlannerViewProps {
  sel: Set<string>;
  onToggle: (code: string) => void;
  onSelect: (code: string) => void;
  activeCode: string | null;
  onCloseActive: () => void;
  programme: Programme;
  modules: Module[];
  moduleMap: Map<string, Module>;
  stageReqs: StageReq[];
  onAddToCompare?: (code: string) => void;
  comparisonCodes?: string[];
  freeElectives?: Record<number, Module>;
  onOpenFreeElectiveModal?: (stage: number) => void;
  onRemoveFreeElective?: (stage: number) => void;
  onBackToDashboard: () => void;
  plans: { id: string; name: string; programmeCode: string | null; selectedModules: string[] }[];
  activePlanId: string;
  onSwitchPlan: (id: string) => void;
  onCreatePlan: () => void;
  onExportPdf: () => void;
  onExportCsv: () => void;
  onShare: () => void;
  onResetPlan: () => void;
  timetableEvents?: TimetableEvent[];
  onOpenTimetableModal?: () => void;
  dark?: boolean;
  onToggleDark?: () => void;
  onOpenDiscoveryModal?: () => void;
  discoveryLikes?: Set<string>;
}

export const MobilePlannerView: React.FC<MobilePlannerViewProps> = ({
  sel,
  onToggle,
  onSelect,
  activeCode,
  onCloseActive,
  programme,
  modules,
  moduleMap,
  stageReqs,
  onAddToCompare,
  comparisonCodes = [],
  freeElectives = {},
  onOpenFreeElectiveModal,
  onRemoveFreeElective,
  onBackToDashboard,
  plans,
  activePlanId,
  onSwitchPlan,
  onCreatePlan,
  onExportPdf,
  onExportCsv,
  onShare,
  onResetPlan,
  onOpenDiscoveryModal,
  discoveryLikes = new Set(),
}) => {
  // Active Year / Stage Filter (defaults to Stage 1)
  const availableStages = useMemo(() => {
    return stageReqs.length > 0 ? stageReqs.map(r => r.stage) : [1, 2, 3, 4];
  }, [stageReqs]);

  const [activeStage, setActiveStage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search).get("stage");
      if (p) {
        const parsed = parseInt(p, 10);
        if (!isNaN(parsed) && availableStages.includes(parsed)) return parsed;
      }
    }
    return availableStages[0] || 1;
  });
  const [showAllStages, setShowAllStages] = useState(false);

  // Bottom dock modal drawers
  const [showCreditHealthSheet, setShowCreditHealthSheet] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("sheet") === "health";
    }
    return false;
  });
  const [showSearchModal, setShowSearchModal] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("sheet") === "search";
    }
    return false;
  });
  const [showPlanActionsModal, setShowPlanActionsModal] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("sheet") === "plan";
    }
    return false;
  });

  // Search input state inside search modal
  const [searchFilter, setSearchFilter] = useState("");

  // Mobile tactile haptics helper (Web Vibration API)
  const triggerHaptic = useCallback((ms = 8) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(ms);
      } catch {
        // Ignored on unsupported devices
      }
    }
  }, []);

  // Scroll to top state & handler for long module lists
  const contentRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollTop(e.currentTarget.scrollTop > 220);
  };

  const scrollToTop = () => {
    triggerHaptic(8);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStageSelect = (stageNum: number) => {
    triggerHaptic(8);
    setShowAllStages(false);
    setActiveStage(stageNum);
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleToggleModule = (code: string) => {
    triggerHaptic(12);
    onToggle(code);
  };

  // Total credits calculation
  const totalEarnedCredits = useMemo(() => {
    return availableStages.reduce((sum, st) => sum + getStageCredits(st, sel, modules), 0);
  }, [availableStages, sel, modules]);

  const targetTotalCredits = programme.totalCredits || availableStages.length * 120;
  const overallPercentage = Math.min(100, Math.round((totalEarnedCredits / Math.max(1, targetTotalCredits)) * 100));

  // Current active plan
  const activePlan = plans.find(p => p.id === activePlanId) || plans[0] || { name: "Default Plan" };

  // Current stage requirement & modules
  const currentStageReq = stageReqs.find(r => r.stage === activeStage);
  const currentStageCredits = getStageCredits(activeStage, sel, modules);
  const currentStageTarget = currentStageReq?.totalRequired || 120;
  const currentStageFull = currentStageCredits >= currentStageTarget;

  // Search results for mobile search drawer
  const searchResults = useMemo(() => {
    const q = searchFilter.trim().toLowerCase();
    if (!q) return [];
    return modules.filter(m =>
      m.code.toLowerCase().includes(q) ||
      m.title.toLowerCase().includes(q) ||
      (m.description && m.description.toLowerCase().includes(q))
    );
  }, [modules, searchFilter]);

  // Native share handler
  const handleNativeShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `${programme.title} - Exeter Degree Plan`;
    const shareText = `Check out my University of Exeter degree course plan for ${programme.title} (${programme.code}): ${totalEarnedCredits}/${targetTotalCredits} credits selected!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback
      }
    }
    onShare();
  };

  // Term breakdown for Credit Health sheet
  const creditHealthData = useMemo(() => {
    return availableStages.map(stageNum => {
      const details = getStageCreditDetails(stageNum, sel, modules);
      const req = stageReqs.find(r => r.stage === stageNum);
      const target = req?.totalRequired || 120;
      const isComplete = details.total >= target;
      const stageMods = modules.filter(m => m.stage === stageNum && (m.type === "compulsory" || sel.has(m.code)));
      const nonCondMods = stageMods.filter(m => !m.condonable);
      return {
        stage: stageNum,
        label: req?.label || `Year ${stageNum}`,
        total: details.total,
        target,
        term1: details.term1,
        term2: details.term2,
        other: details.other,
        isComplete,
        nonCondCount: nonCondMods.length,
      };
    });
  }, [availableStages, sel, modules, stageReqs]);

  // Stages to render based on toggle
  const stagesToRender = showAllStages ? availableStages : [activeStage];

  return (
    <div className="flex-1 flex flex-col bg-[#f4f4f4] dark:bg-[#0d0d0d] text-foreground min-h-0 relative overflow-x-hidden">
      {/* ── Mobile Compact Header ─────────────────────────────────────────── */}
      <header className="shrink-0 bg-[#003C3C] text-white px-4 py-2.5 flex items-center justify-between border-b border-white/10 shadow-sm z-30">
        <button
          type="button"
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-white font-semibold text-sm hover:opacity-80 active:scale-95 transition-all p-1.5 -ml-1 rounded-lg"
          title="Return to Dashboard"
        >
          <ArrowLeft size={18} />
          <span>Courses</span>
        </button>

        <div className="text-center min-w-0 px-2 flex-1">
          <div className="text-xs font-mono font-bold text-[#00C4AD] tracking-wider truncate">
            {programme.code}
          </div>
          <div className="text-[13px] font-bold text-white truncate">
            {programme.title}
          </div>
        </div>

        <div className="flex items-center gap-1.5 -mr-1">
          {onOpenDiscoveryModal && (
            <button
              type="button"
              onClick={() => {
                triggerHaptic(10);
                onOpenDiscoveryModal();
              }}
              className="p-2 text-white/90 hover:text-white rounded-lg active:scale-95 transition-colors relative cursor-pointer"
              title="Module Matchmaker"
            >
              <Sparkles size={18} className="text-[#00C4AD]" />
              {discoveryLikes.size > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00C4AD]" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowSearchModal(true)}
            className="p-2 text-white/80 hover:text-white rounded-lg active:scale-95 transition-colors"
            title="Search modules"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            onClick={() => setShowPlanActionsModal(true)}
            className="p-2 text-white/80 hover:text-white rounded-lg active:scale-95 transition-colors"
            title="Plan options & share"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </header>

      {/* ── Stage Segmented Controller (Thumb-friendly Year Tabs) ─────────── */}
      <div className="shrink-0 bg-card border-b border-border px-3 py-2 shadow-2xs z-20">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
          {availableStages.map(stageNum => {
            const req = stageReqs.find(r => r.stage === stageNum);
            const target = req?.totalRequired || 120;
            const earned = getStageCredits(stageNum, sel, modules);
            const isFull = earned >= target;
            const isSelected = !showAllStages && activeStage === stageNum;

            return (
              <button
                key={stageNum}
                type="button"
                onClick={() => handleStageSelect(stageNum)}
                className={`flex-1 min-w-[90px] py-2 px-3 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#003C3C] dark:bg-[#00A693] text-white shadow-sm ring-2 ring-[#00C4AD]/40"
                    : "bg-muted/50 hover:bg-muted text-foreground border border-border/70"
                }`}
              >
                <span className="text-xs font-bold tracking-wide">
                  Year {stageNum}
                </span>
                <span
                  className={`text-[11px] font-mono font-semibold mt-0.5 flex items-center gap-1 ${
                    isSelected
                      ? "text-white/90"
                      : isFull
                      ? "text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  {earned}/{target}cr {isFull && "✓"}
                </span>
              </button>
            );
          })}

          {/* View All Toggle */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic(8);
              setShowAllStages(prev => !prev);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold shrink-0 transition-all ${
              showAllStages
                ? "bg-[#003C3C] dark:bg-[#00A693] text-white shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:text-foreground border border-border/70"
            }`}
          >
            All Years
          </button>
        </div>
      </div>

      {/* ── Scrollable Stage Content ───────────────────────────────────────── */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-6 pb-28"
      >
        {/* Tinder Matchmaker Discovery Launch Card */}
        {onOpenDiscoveryModal && (
          <div className="bg-gradient-to-r from-[#003C3C] via-[#005549] to-[#00A693] text-white rounded-2xl p-3.5 sm:p-4 shadow-md flex items-center justify-between gap-2.5 animate-in fade-in duration-200">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#00C4AD]">
                <Sparkles size={13} className="shrink-0" />
                <span className="truncate">Module Matchmaker</span>
                {discoveryLikes.size > 0 && (
                  <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold shrink-0">
                    {discoveryLikes.size}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-black text-white leading-tight">
                Unsure what to pick?
              </h3>
              <p className="text-[11.5px] text-white/80 leading-snug line-clamp-2">
                Swipe right to discover modules & build your dream curriculum.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                triggerHaptic(12);
                onOpenDiscoveryModal();
              }}
              className="shrink-0 px-3 py-2 rounded-xl bg-white text-[#003C3C] font-black text-xs shadow-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer hover:bg-white/90"
            >
              <span>Swipe</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}

        {stagesToRender.map(stageNum => {
          const req = stageReqs.find(r => r.stage === stageNum);
          const targetCredits = req?.totalRequired || 120;
          const earnedCredits = getStageCredits(stageNum, sel, modules);
          const isFull = earnedCredits >= targetCredits;

          const stageMods = modules.filter(m => m.stage === stageNum);
          const compulsory = stageMods.filter(m => m.type === "compulsory");
          const optional = stageMods.filter(m => m.type === "optional" && !m.isFreeElective);
          const groups = [...new Set(optional.map(m => m.optionalGroup))].filter(Boolean) as string[];

          return (
            <div key={stageNum} className="space-y-4 animate-in fade-in-50 duration-200 slide-in-from-right-2">
              {/* Stage Summary Banner */}
              <div className="bg-card border border-border rounded-2xl p-4 shadow-xs">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-[#003C3C] dark:bg-[#00A693] text-white px-2 py-0.5 rounded-lg">
                        Year {stageNum}
                      </span>
                      <h2 className="text-lg font-bold text-foreground">
                        {req?.label || `Stage ${stageNum}`}
                      </h2>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {compulsory.length} compulsory{optional.length > 0 ? `, ${optional.length} optional` : ""} modules
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black text-foreground tabular-nums">
                      {earnedCredits} <span className="text-xs font-normal text-muted-foreground">/ {targetCredits} cr</span>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-0.5 ${
                        isFull
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {isFull ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                      {isFull ? "Stage Complete" : `${targetCredits - earnedCredits} cr needed`}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isFull ? "bg-[#00A693]" : "bg-[#003C3C] dark:bg-[#00C4AD]"
                    }`}
                    style={{ width: `${Math.min(100, (earnedCredits / targetCredits) * 100)}%` }}
                  />
                </div>

                {/* Notes / Special Guidance */}
                {req?.notes && req.notes.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-[#EBF3F2]/60 dark:bg-[#003C3C]/20 border border-[#00A693]/30 text-xs text-foreground space-y-1">
                    {req.notes.map((n, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Info size={14} className="text-[#00A693] shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{n}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Compulsory Modules */}
              {compulsory.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Compulsory Modules ({compulsory.length})
                    </h3>
                    <span className="text-[11px] text-muted-foreground">Always required</span>
                  </div>
                  <div className="space-y-3">
                    {compulsory.map(mod => (
                      <MobileModuleCard
                        key={mod.code}
                        mod={mod}
                        status="compulsory"
                        onToggle={handleToggleModule}
                        onSelect={onSelect}
                        modules={modules}
                        onAddToCompare={onAddToCompare}
                        isCompared={comparisonCodes.includes(mod.code)}
                        isLiked={discoveryLikes.has(mod.code)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Modules Groups */}
              {groups.map(grp => {
                const grpMods = optional.filter(m => m.optionalGroup === grp);
                return (
                  <div key={grp} className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Optional Group {grp} ({grpMods.length} available)
                      </h3>
                      <span className="text-[11px] text-muted-foreground">Select options</span>
                    </div>
                    <div className="space-y-3">
                      {grpMods.map(mod => {
                        const status = getModuleStatus(mod, sel, moduleMap, stageReqs, modules);
                        return (
                          <MobileModuleCard
                            key={mod.code}
                            mod={mod}
                            status={status}
                            onToggle={handleToggleModule}
                            onSelect={onSelect}
                            modules={modules}
                            onAddToCompare={onAddToCompare}
                            isCompared={comparisonCodes.includes(mod.code)}
                            isLiked={discoveryLikes.has(mod.code)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Free Elective Section (Stage 2+) */}
              {stageNum >= 2 && (
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Free Elective Module (Outside Subject)
                    </h3>
                    <span className="text-[11px] font-semibold text-[#00A693]">Max 1 per year</span>
                  </div>

                  {freeElectives[stageNum] ? (
                    <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 shadow-xs flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-lg">
                            {freeElectives[stageNum].code}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                            Free Elective
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-foreground mt-1 truncate">
                          {freeElectives[stageNum].title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {freeElectives[stageNum].credits} credits · Counts to Year {stageNum}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {onOpenFreeElectiveModal && (
                          <button
                            type="button"
                            onClick={() => onOpenFreeElectiveModal(stageNum)}
                            className="px-3 py-2 text-xs font-bold bg-card border border-border rounded-xl text-foreground hover:bg-muted active:scale-95 transition-all"
                          >
                            Change
                          </button>
                        )}
                        {onRemoveFreeElective && (
                          <button
                            type="button"
                            onClick={() => onRemoveFreeElective(stageNum)}
                            className="p-2 text-xs font-bold rounded-xl text-rose-600 hover:bg-rose-500/10 active:scale-95 transition-all"
                            title="Remove elective"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenFreeElectiveModal?.(stageNum)}
                      className="w-full p-4 rounded-2xl border-2 border-dashed border-border/80 bg-card/60 hover:bg-muted/40 active:scale-[0.99] transition-all text-left flex items-center justify-between gap-3 group"
                    >
                      <div>
                        <span className="font-bold text-sm text-foreground group-hover:text-[#00A693] transition-colors flex items-center gap-1.5">
                          <Plus size={16} className="text-[#00A693]" />
                          Add 15cr Free Elective Module
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Broaden your studies with Languages, Humanities, Business, or Data Science.
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-muted-foreground shrink-0" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Floating Back to Top Button ────────────────────────────────────── */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-30 px-3.5 py-2 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-lg text-xs font-bold text-foreground flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer ring-1 ring-black/5 dark:ring-white/10 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <ChevronUp size={15} className="text-[#00A693]" />
          <span>Top</span>
        </button>
      )}

      {/* ── Mobile Bottom Navigation Dock (Thumb Zone) ────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border shadow-xl px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between max-w-md mx-auto gap-2">
          {/* 1. Year Switcher Button */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic(8);
              const currentIndex = availableStages.indexOf(activeStage);
              const nextStage = availableStages[(currentIndex + 1) % availableStages.length];
              setShowAllStages(false);
              setActiveStage(nextStage);
            }}
            className="flex-1 py-2 px-2.5 rounded-xl bg-muted/60 hover:bg-muted active:scale-95 transition-all flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <Layers size={18} className="text-[#00A693]" />
            <span className="text-[11px] font-bold text-foreground mt-0.5 truncate">
              {showAllStages ? "All Years" : `Year ${activeStage}`}
            </span>
          </button>

          {/* 2. Credit Health & Workload (Primary Central Pill) */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic(8);
              setShowCreditHealthSheet(true);
            }}
            className="flex-[1.5] py-2 px-3 rounded-2xl bg-[#003C3C] dark:bg-[#00A693] text-white shadow-md active:scale-95 transition-all flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tabular-nums tracking-tight">
                {totalEarnedCredits} / {targetTotalCredits}
              </span>
              <span className="text-[10px] font-bold uppercase bg-white/20 px-1 rounded">
                cr
              </span>
            </div>
            <span className="text-[10.5px] font-semibold text-white/85 mt-0.2 flex items-center gap-1">
              <span>{overallPercentage}% Degree Health</span>
              <span>▾</span>
            </span>
          </button>

          {/* 3. Search Modules Button */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic(8);
              setShowSearchModal(true);
            }}
            className="flex-1 py-2 px-2.5 rounded-xl bg-muted/60 hover:bg-muted active:scale-95 transition-all flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <Search size={18} className="text-[#00A693]" />
            <span className="text-[11px] font-bold text-foreground mt-0.5">
              Search
            </span>
          </button>

          {/* 4. Plan Actions & Share Button */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic(8);
              setShowPlanActionsModal(true);
            }}
            className="flex-1 py-2 px-2.5 rounded-xl bg-muted/60 hover:bg-muted active:scale-95 transition-all flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <Share2 size={18} className="text-[#00A693]" />
            <span className="text-[11px] font-bold text-foreground mt-0.5">
              Share
            </span>
          </button>
        </div>
      </div>

      {/* ── Credit Health & Workload Bottom Sheet ─────────────────────────── */}
      {showCreditHealthSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div
            onClick={e => e.stopPropagation()}
            className="bg-card w-full max-h-[85vh] rounded-t-3xl border-t border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          >
            {/* Sheet Handle */}
            <div className="pt-3 pb-2 flex justify-center">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Degree Credit Health & Workload
                </h3>
                <p className="text-xs text-muted-foreground">
                  {programme.title} ({programme.code})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreditHealthSheet(false)}
                className="p-2 rounded-full bg-muted text-foreground hover:bg-muted/80"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto scrollbar-none space-y-5">
              {/* Overall Degree Completion Meter */}
              <div className="bg-muted/40 border border-border rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Total Completion
                  </span>
                  <span className="text-base font-black text-[#00A693]">
                    {overallPercentage}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-foreground tabular-nums">
                    {totalEarnedCredits}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">
                    / {targetTotalCredits} credits required
                  </span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00A693] transition-all duration-300"
                    style={{ width: `${overallPercentage}%` }}
                  />
                </div>
              </div>

              {/* Stage by Stage Breakdown with Term 1 vs Term 2 balance */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
                  Year-by-Year Workload Breakdown
                </h4>
                {creditHealthData.map(st => {
                  const termBalanceDiff = Math.abs(st.term1 - st.term2);
                  const isUneven = st.total > 0 && termBalanceDiff > 15;

                  return (
                    <div
                      key={st.stage}
                      className="bg-card border border-border rounded-2xl p-4 shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-foreground">
                          {st.label}
                        </span>
                        <span
                          className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
                            st.isComplete
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {st.total}/{st.target} cr {st.isComplete && "✓"}
                        </span>
                      </div>

                      {/* Term 1 vs Term 2 workload split */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-muted/40 p-2.5 rounded-xl border border-border/50">
                          <span className="text-muted-foreground block text-[11px]">
                            Autumn (Term 1)
                          </span>
                          <span className="font-bold text-sm text-foreground">
                            {st.term1} cr
                          </span>
                        </div>
                        <div className="bg-muted/40 p-2.5 rounded-xl border border-border/50">
                          <span className="text-muted-foreground block text-[11px]">
                            Spring (Term 2)
                          </span>
                          <span className="font-bold text-sm text-foreground">
                            {st.term2} cr
                          </span>
                        </div>
                      </div>

                      {isUneven && (
                        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span>
                            Notice: Term workload is uneven ({st.term1}cr vs {st.term2}cr). An ideal target is 60cr / 60cr.
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Close Button */}
            <div className="p-4 border-t border-border bg-card">
              <button
                type="button"
                onClick={() => setShowCreditHealthSheet(false)}
                className="w-full py-3.5 rounded-2xl bg-[#003C3C] dark:bg-[#00A693] text-white font-bold text-sm shadow-sm active:scale-95 transition-all"
              >
                Close Credit Health
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Module Search Modal ────────────────────────────────────── */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col animate-in fade-in duration-150">
          {/* Search Header */}
          <div className="p-4 bg-card border-b border-border flex items-center gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                autoFocus
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Search modules (e.g. MTH1001, Calculus)..."
                className="w-full h-12 pl-10 pr-10 bg-muted/60 border border-border rounded-2xl text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00A693]"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setShowSearchModal(false);
                setSearchFilter("");
              }}
              className="px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground active:scale-95"
            >
              Done
            </button>
          </div>

          {/* Search Results List */}
          <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-3">
            {!searchFilter.trim() ? (
              <div className="py-12 text-center text-muted-foreground space-y-2">
                <Search size={36} className="mx-auto text-muted-foreground/40" />
                <p className="text-sm font-medium">Type a module code or title to search</p>
                <p className="text-xs opacity-70">e.g. MTH1001, ECM2414, Statistics, Python</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground space-y-1">
                <p className="text-sm font-semibold">No modules found matching &ldquo;{searchFilter}&rdquo;</p>
                <p className="text-xs opacity-70">Check spelling or search by general keyword</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs font-bold text-muted-foreground uppercase px-1">
                  Found {searchResults.length} module{searchResults.length > 1 ? "s" : ""}
                </div>
                {searchResults.map(mod => {
                  const status = getModuleStatus(mod, sel, moduleMap, stageReqs, modules);
                  return (
                    <MobileModuleCard
                      key={mod.code}
                      mod={mod}
                      status={status}
                      onToggle={handleToggleModule}
                      onSelect={code => {
                        setShowSearchModal(false);
                        onSelect(code);
                      }}
                      modules={modules}
                      onAddToCompare={onAddToCompare}
                      isCompared={comparisonCodes.includes(mod.code)}
                      isLiked={discoveryLikes.has(mod.code)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Plan Actions & Native Share Modal ─────────────────────────────── */}
      {showPlanActionsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div
            onClick={e => e.stopPropagation()}
            className="bg-card w-full max-h-[85vh] rounded-t-3xl border-t border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          >
            {/* Sheet Handle */}
            <div className="pt-3 pb-2 flex justify-center">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Study Plan & Actions
                </h3>
                <p className="text-xs text-muted-foreground">
                  Active Plan: <strong className="text-foreground">{activePlan.name}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPlanActionsModal(false)}
                className="p-2 rounded-full bg-muted text-foreground hover:bg-muted/80"
              >
                <X size={16} />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="p-5 overflow-y-auto scrollbar-none space-y-4">
              {/* Native Mobile Share Button */}
              <button
                type="button"
                onClick={() => {
                  setShowPlanActionsModal(false);
                  handleNativeShare();
                }}
                className="w-full py-4 px-4 rounded-2xl bg-[#007A6B] hover:bg-[#006a5d] text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
              >
                <Share2 size={20} />
                <span>Share Study Plan</span>
              </button>

              {/* Saved Plans Switcher */}
              <div className="bg-muted/30 border border-border rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Switch Study Plan
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPlanActionsModal(false);
                      onCreatePlan();
                    }}
                    className="text-xs font-bold text-[#00A693] flex items-center gap-1 hover:underline"
                  >
                    <Plus size={13} /> New Plan
                  </button>
                </div>
                <div className="divide-y divide-border/60">
                  {plans.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        onSwitchPlan(p.id);
                        setShowPlanActionsModal(false);
                      }}
                      className="w-full py-2.5 px-1 flex items-center justify-between text-left hover:text-[#00A693] transition-colors"
                    >
                      <span className={`text-sm ${p.id === activePlanId ? "font-bold text-[#00A693]" : "text-foreground"}`}>
                        {p.name}
                      </span>
                      {p.id === activePlanId && <Check size={16} className="text-[#00A693]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Export Options */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPlanActionsModal(false);
                    onExportPdf();
                  }}
                  className="py-3.5 px-3 rounded-2xl border border-border bg-card hover:bg-muted text-foreground font-bold text-xs flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <Download size={18} className="text-[#00A693]" />
                  <span>Export PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPlanActionsModal(false);
                    onExportCsv();
                  }}
                  className="py-3.5 px-3 rounded-2xl border border-border bg-card hover:bg-muted text-foreground font-bold text-xs flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <Download size={18} className="text-[#00A693]" />
                  <span>Download CSV</span>
                </button>
              </div>

              {/* Reset Plan */}
              <button
                type="button"
                onClick={() => {
                  setShowPlanActionsModal(false);
                  onResetPlan();
                }}
                className="w-full py-3 px-4 rounded-2xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Trash2 size={15} />
                <span>Reset Current Plan Selections</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Detail Panel Drawer ────────────────────────────────────── */}
      {activeCode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden animate-in fade-in duration-200">
          <div className="bg-card w-full h-[90vh] rounded-t-3xl border-t border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex-1 overflow-hidden">
              <DetailPanel
                modCode={activeCode}
                sel={sel}
                onToggle={handleToggleModule}
                onClose={onCloseActive}
                onViewTree={() => {}}
                onSelectMod={onSelect}
                moduleMap={moduleMap}
                stageReqs={stageReqs}
                modules={modules}
                onAddToCompare={onAddToCompare}
                isCompared={comparisonCodes.includes(activeCode)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TACTILE MOBILE MODULE CARD (Minimum 48px touch targets, 16px text)
// ═══════════════════════════════════════════════════════════════════

interface MobileModuleCardProps {
  mod: Module;
  status: ModuleStatus;
  onToggle: (c: string) => void;
  onSelect: (c: string) => void;
  modules: Module[];
  onAddToCompare?: (c: string) => void;
  isCompared?: boolean;
  isLiked?: boolean;
}

const MobileModuleCard: React.FC<MobileModuleCardProps> = ({
  mod,
  status,
  onToggle,
  onSelect,
  onAddToCompare,
  isCompared,
  isLiked,
}) => {
  const isSelectable = status === "available" || status === "selected";
  const isSelected = status === "selected";
  const isCompulsory = status === "compulsory";
  const isLocked = status === "locked-prereq" || status === "locked-credits";

  // Term Badge
  const termBadge = useMemo(() => {
    if (mod.term === "AUT") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> Autumn (T1)
        </span>
      );
    }
    if (mod.term === "SPR") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#00A693]/15 text-[#007A6B] dark:text-[#00C4AD] border border-[#00A693]/30">
          <span className="w-2 h-2 rounded-full bg-[#00A693]" /> Spring (T2)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-500/30">
        <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400" /> Full Year
      </span>
    );
  }, [mod.term]);

  return (
    <div
      onClick={() => onSelect(mod.code)}
      className={`rounded-2xl border bg-card p-4 transition-all shadow-2xs active:scale-[0.99] cursor-pointer flex flex-col justify-between gap-3 ${
        isSelected
          ? "border-[#00A693] ring-2 ring-[#00A693]/30 bg-card"
          : isCompulsory
          ? "border-border/90 bg-card"
          : isLocked
          ? "border-border/60 opacity-70 bg-muted/20"
          : "border-border hover:border-[#00A693]"
      }`}
    >
      {/* Top Meta: Code, Badges, Credits */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black font-mono px-2.5 py-1 rounded-lg bg-muted text-[#007A6B] dark:text-[#00C4AD] tracking-wider">
            {mod.code}
          </span>
          {termBadge}
          {isLiked && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <Heart size={11} className="fill-emerald-500 text-emerald-500" /> Match
            </span>
          )}
          {!mod.condonable && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              <ShieldAlert size={12} /> Non-cond.
            </span>
          )}
        </div>

        <div className="text-right shrink-0">
          <span className="text-base font-black text-foreground tabular-nums">
            {mod.credits}
          </span>
          <span className="text-[11px] font-bold text-muted-foreground ml-0.5 uppercase">
            cr
          </span>
        </div>
      </div>

      {/* Module Title & Description */}
      <div>
        <h4 className="text-[16.5px] font-bold text-foreground leading-snug">
          {mod.title}
        </h4>
        {mod.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {mod.description}
          </p>
        )}
      </div>

      {/* Bottom Actions Row with large 48px touch target button */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onSelect(mod.code);
          }}
          className="text-xs font-semibold text-[#00A693] hover:underline flex items-center gap-1 py-1"
        >
          <span>View Details</span>
          <ChevronRight size={14} />
        </button>

        {/* Primary Toggle Action Button */}
        {isCompulsory ? (
          <span className="h-11 px-4 rounded-xl bg-[#003C3C]/10 dark:bg-[#00C4AD]/15 text-[#003C3C] dark:text-[#00C4AD] font-bold text-xs flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Compulsory
          </span>
        ) : isSelected ? (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onToggle(mod.code);
            }}
            className="h-11 px-4 rounded-xl bg-[#00A693] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <CheckCircle2 size={16} /> Selected ✓
          </button>
        ) : isSelectable ? (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onToggle(mod.code);
            }}
            className="h-11 px-4 rounded-xl border-2 border-[#00A693] text-[#007A6B] dark:text-[#00C4AD] font-bold text-xs flex items-center gap-1.5 hover:bg-[#00A693]/10 active:scale-95 transition-all"
          >
            <Plus size={16} /> Add to Plan
          </button>
        ) : (
          <span className="h-11 px-3 rounded-xl bg-muted text-muted-foreground font-semibold text-xs flex items-center gap-1 cursor-not-allowed">
            <Lock size={14} /> Locked
          </span>
        )}
      </div>
    </div>
  );
};
