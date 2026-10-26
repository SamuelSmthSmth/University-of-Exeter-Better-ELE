import React, { useState, useEffect, useMemo, useRef, useCallback, useContext } from "react";
import { fetchProgrammeStructure, fetchModuleDetail, API_YEAR, type StageReq, type Programme, type Module } from '../api/timeedit';
import PROGRAMMES from '../data/programmes.json';
import {
  Search, Moon, Sun, X, ChevronDown, ChevronUp, Lock,
  CheckCircle, CheckCircle2, Circle, GraduationCap, Network, List,
  BookOpen, AlertCircle, Info, ArrowRight, Waves, Filter,
  Share2, Trash2, Workflow, Columns3, LayoutGrid, ShieldAlert, Printer, Undo2,
  Bell, MessageSquare, Scale, Download, Plus, Bookmark, HelpCircle,
  FileSpreadsheet, Map as MapIcon, Check, ExternalLink, Accessibility, Sparkles, User, Menu, Calendar,
  Heart
} from "lucide-react";
import { PrintView } from "./PrintView";
import { EleGeometricPattern } from "./components/EleGeometricPattern";
import { CommandPalette } from "./components/CommandPalette";
import { ModuleComparisonDrawer } from "./components/ModuleComparisonDrawer";
import { TermBalanceAdvisor } from "./components/TermBalanceAdvisor";
import { EleDashboardHero } from "./components/EleDashboardHero";
import { useTimetable } from "../api/timetable";
import { TimetableCalendarModal } from "./components/TimetableCalendarModal";
import { IntroSplash } from "./components/IntroSplash";
import { AccessibilityModal, applyA11ySettings, DEFAULT_A11Y_SETTINGS } from "./components/AccessibilityModal";
import { PrivacyPolicyModal } from "./components/PrivacyPolicyModal";
import { TermsModal } from "./components/TermsModal";
import { CookieBanner } from "./components/CookieBanner";
import { FreeElectiveModal } from "./components/FreeElectiveModal";
import { MobilePlannerView } from "./components/MobilePlannerView";
import { ModuleDiscoveryModal } from "./components/ModuleDiscoveryModal";
import type { DiscoveryState } from "./utils/moduleDiscovery";
import { useIsDesktop } from "./hooks/useIsDesktop";
import { EleCourseView } from "./components/EleCourseView";
import { ExeterPdfReader } from "./components/reader/ExeterPdfReader";
import { Course } from "../types";
export { useIsDesktop };

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface PlanProfile {
  id: string;
  name: string;
  programmeCode: string | null;
  selectedModules: string[];
  freeElectives?: Record<number, Module>;
}

type ViewType = "programme" | "tree";
export type ModuleStatus = "compulsory" | "selected" | "available" | "locked-prereq" | "locked-credits";

export const RewindModeContext = React.createContext<{
  isRewindMode: boolean;
  setIsRewindMode: (v: boolean | ((prev: boolean) => boolean)) => void;
}>({ isRewindMode: false, setIsRewindMode: () => {} });

type TimeEditState = {
  modules: Module[];
  stageReqs: StageReq[];
  programme: Programme;
  moduleMap: Map<string, Module>;
  loading: boolean;
  error: string | null;
};

function useTimeEdit(programmeCode: string | null) {
  const [state, setState] = useState<TimeEditState>({
    modules: [], stageReqs: [], moduleMap: new Map(),
    programme: { code: programmeCode ?? "", title: "", totalCredits: 0, dept: "", faculty: "" },
    loading: !!programmeCode, error: null,
  });

  const enrichedRef = useRef<Set<string>>(new Set());

  const enrichModules = useCallback((mods: Module[]) => {
    mods.forEach(async (mod) => {
      if (enrichedRef.current.has(mod.code)) return;
      enrichedRef.current.add(mod.code);
      try {
        const detail = await fetchModuleDetail(mod.code);
        setState(prev => {
          const updated = prev.modules.map(m =>
            m.code === mod.code ? { ...m, ...detail } : m
          );
          return { ...prev, modules: updated, moduleMap: new Map(updated.map(m => [m.code, m])) };
        });
      } catch {
        // Non-fatal: module stays with stub data
      }
    });
  }, []);

  useEffect(() => {
    if (!programmeCode) {
      setState({
        modules: [], stageReqs: [], moduleMap: new Map(),
        programme: { code: "", title: "", totalCredits: 0, dept: "", faculty: "" },
        loading: false, error: null,
      });
      return;
    }

    enrichedRef.current = new Set();
    setState(s => ({ ...s, loading: true, error: null }));
    let cancelled = false;

    fetchProgrammeStructure(programmeCode)
      .then(({ modules, stageReqs, programme }) => {
        if (cancelled) return;
        setState({
          modules, stageReqs, programme,
          moduleMap: new Map(modules.map(m => [m.code, m])),
          loading: false, error: null,
        });
        enrichModules(modules);
      })
      .catch(err => {
        if (cancelled) return;
        setState(s => ({ ...s, loading: false, error: String(err.message ?? err) }));
      });

    return () => { cancelled = true; };
  }, [programmeCode, enrichModules]);

  return state;
}

// ═══════════════════════════════════════════════════════════════════
// TREE LAYOUT CONSTANTS
// ═══════════════════════════════════════════════════════════════════

export const NW = 170, NH = 82, CSTEP = 300, RSTEP = 100, CPAD = 52, RPAD = 52;

export function buildNodePos(modules: Module[], layoutType: "standard" | "waterfall" = "standard"): Record<string, { x: number; y: number }> {
  const pos: Record<string, { x: number; y: number }> = {};
  const byStage: Record<number, Module[]> = {};
  modules.forEach(m => { byStage[m.stage] = [...(byStage[m.stage] || []), m]; });
  const stages = Array.from(new Set(modules.map(m => m.stage))).sort((a, b) => a - b);
  if (stages.length === 0) stages.push(1, 2, 3, 4);

  if (layoutType === "waterfall") {
    // Vertical Waterfall: Top-to-bottom cascading flow by academic stage
    const NODE_GAP_X = 32;
    const ROW_GAP_Y = 24;
    const STAGE_GAP_Y = 88;
    const MAX_COLS = 5;

    let curY = RPAD + 44;

    stages.forEach(s => {
      const sortedMods = (byStage[s] || []).sort((a, b) => {
        if (a.type !== b.type) return a.type === "compulsory" ? -1 : 1;
        if (a.term !== b.term) return (a.term || "").localeCompare(b.term || "");
        return a.code.localeCompare(b.code);
      });

      sortedMods.forEach((m, i) => {
        const col = i % MAX_COLS;
        const row = Math.floor(i / MAX_COLS);
        pos[m.code] = {
          x: CPAD + 24 + col * (NW + NODE_GAP_X),
          y: curY + row * (NH + ROW_GAP_Y),
        };
      });

      const numRows = Math.ceil(sortedMods.length / MAX_COLS) || 1;
      curY += numRows * (NH + ROW_GAP_Y) + STAGE_GAP_Y;
    });
  } else {
    stages.forEach((s, stageIndex) => {
      const sortedMods = (byStage[s] || [])
        .sort((a, b) => a.type === b.type ? a.code.localeCompare(b.code) : a.type === "compulsory" ? -1 : 1);
      sortedMods.forEach((m, i) => { pos[m.code] = { x: CPAD + stageIndex * CSTEP, y: RPAD + i * RSTEP }; });
    });
  }
  return pos;
}

// ═══════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════

function useDarkMode(): [boolean, () => void] {
  const [dark, setDark] = useState(() => {
    const s = localStorage.getItem("exeter-theme");
    return s ? s === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("exeter-theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, () => setDark(d => !d)];
}

// ═══════════════════════════════════════════════════════════════════
// CREDIT HELPERS
// ═══════════════════════════════════════════════════════════════════

export function getStageCreditDetails(stage: number, sel: Set<string>, modules: Module[]) {
  const selectedMods = modules.filter(m => m.stage === stage && (m.type === "compulsory" || sel.has(m.code)));
  let term1 = 0;
  let term2 = 0;
  let other = 0;

  selectedMods.forEach(m => {
    if (m.term === "AUT") {
      term1 += m.credits;
    } else if (m.term === "SPR") {
      term2 += m.credits;
    } else if (m.term === "AUTSPR" || m.term === "FULL" || m.term === "") {
      term1 += m.credits / 2;
      term2 += m.credits / 2;
    } else {
      other += m.credits;
    }
  });

  return { total: term1 + term2 + other, term1, term2, other };
}

export function getStageCredits(stage: number, sel: Set<string>, modules: Module[]) {
  return getStageCreditDetails(stage, sel, modules).total;
}

export function getModuleStatus(
  mod: Module, sel: Set<string>,
  moduleMap: Map<string, Module>, stageReqs: StageReq[], modules: Module[],
  isRewindMode: boolean = false
): ModuleStatus {
  if (mod.type === "compulsory") return "compulsory";
  if (sel.has(mod.code)) return "selected";
  
  if (!isRewindMode) {
    const prereqsMet = mod.prerequisites.every(c => {
      const pm = moduleMap.get(c);
      return pm && (pm.type === "compulsory" || sel.has(c));
    });
    if (!prereqsMet) return "locked-prereq";
  }

  const stageCredits = getStageCredits(mod.stage, sel, modules);
  const req = stageReqs.find(r => r.stage === mod.stage);
  if (req && stageCredits + mod.credits > req.totalRequired) return "locked-credits";
  return "available";
}

// ═══════════════════════════════════════════════════════════════════
// STATUS STYLING
// ═══════════════════════════════════════════════════════════════════

const STATUS_NODE: Record<ModuleStatus, string> = {
  compulsory:       "bg-[#003C3C] border-[#003C3C] text-white shadow-sm",
  selected:         "bg-[#00A693] border-[#00A693] text-white shadow-md",
  available:        "bg-card border-[#00A693] text-foreground",
  "locked-prereq":  "bg-muted/50 border-border text-muted-foreground",
  "locked-credits": "bg-muted/50 border-border text-muted-foreground",
};

const STATUS_BADGE: Record<ModuleStatus, { label: string; cls: string }> = {
  compulsory:       { label: "Compulsory",    cls: "bg-[#003C3C] text-white" },
  selected:         { label: "Selected",      cls: "bg-[#00A693] text-white" },
  available:        { label: "Available",     cls: "bg-secondary text-secondary-foreground" },
  "locked-prereq":  { label: "Prereq needed", cls: "bg-muted text-muted-foreground" },
  "locked-credits": { label: "Stage full",    cls: "bg-muted text-muted-foreground" },
};

// ═══════════════════════════════════════════════════════════════════
// CREDIT PROGRESS
// ═══════════════════════════════════════════════════════════════════

function CreditProgress({ sel, programme, compact, modules, stageReqs }: {
  sel: Set<string>; programme: Programme; compact?: boolean;
  modules: Module[]; stageReqs: StageReq[];
}) {
  const totalDetails = stageReqs.reduce((acc, req) => {
    const d = getStageCreditDetails(req.stage, sel, modules);
    return {
      total: acc.total + d.total,
      term1: acc.term1 + d.term1,
      term2: acc.term2 + d.term2,
      other: acc.other + d.other
    };
  }, { total: 0, term1: 0, term2: 0, other: 0 });

  const totalSel = totalDetails.total;

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 bg-card border-b border-border">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide shrink-0">Credits</span>
        <div className="flex flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-[#007A6B] transition-all duration-300" style={{ width: `${Math.min(100, (totalDetails.term1 / programme.totalCredits) * 100)}%` }} />
          <div className="h-full bg-[#00C4AD] transition-all duration-300" style={{ width: `${Math.min(100, (totalDetails.term2 / programme.totalCredits) * 100)}%` }} />
          <div className="h-full bg-[#00A693] transition-all duration-300" style={{ width: `${Math.min(100, (totalDetails.other / programme.totalCredits) * 100)}%` }} />
        </div>
        <span className="text-xs font-semibold text-foreground tabular-nums shrink-0">
          {totalSel}<span className="text-muted-foreground">/{programme.totalCredits}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-0.5">
      <div className="mb-3">
        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Total Credits</div>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-2xl font-bold text-foreground leading-none tabular-nums">{totalSel}</span>
          <span className="text-sm text-muted-foreground mb-0.5">/ {programme.totalCredits}</span>
        </div>
        <div className="flex h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-[#007A6B] transition-all duration-500" style={{ width: `${Math.min(100, (totalDetails.term1 / programme.totalCredits) * 100)}%` }} title="Term 1 (AUT)" />
          <div className="h-full bg-[#00C4AD] transition-all duration-500" style={{ width: `${Math.min(100, (totalDetails.term2 / programme.totalCredits) * 100)}%` }} title="Term 2 (SPR)" />
          <div className="h-full bg-[#00A693] transition-all duration-500" style={{ width: `${Math.min(100, (totalDetails.other / programme.totalCredits) * 100)}%` }} title="Other Terms" />
        </div>
      </div>
      {stageReqs.map(req => {
        const details = getStageCreditDetails(req.stage, sel, modules);
        const earned = details.total;
        const pct1 = (details.term1 / req.totalRequired) * 100;
        const pct2 = (details.term2 / req.totalRequired) * 100;
        const pctOther = (details.other / req.totalRequired) * 100;
        const full = earned >= req.totalRequired;
        return (
          <div key={req.stage} className="py-2.5 border-t border-border/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground">{req.label}</span>
              <span className={`text-xs tabular-nums font-semibold ${full ? "text-[#00A693]" : "text-foreground"}`}>
                {earned}<span className="text-muted-foreground font-normal">/{req.totalRequired}</span>
              </span>
            </div>
            <div className="flex h-1.5 bg-muted rounded-full overflow-hidden mb-1">
              <div className="h-full bg-[#007A6B] transition-all duration-300" style={{ width: `${pct1}%` }} title="Term 1 (AUT)" />
              <div className="h-full bg-[#00C4AD] transition-all duration-300" style={{ width: `${pct2}%` }} title="Term 2 (SPR)" />
              <div className="h-full bg-[#00A693] transition-all duration-300" style={{ width: `${pctOther}%` }} title="Other Terms" />
            </div>
            {full
              ? <p className="text-[10px] text-[#00A693] font-semibold">✓ Complete</p>
              : <p className="text-[10px] text-muted-foreground">{req.totalRequired - earned} cr remaining</p>
            }
          </div>
        );
      })}
      <p className="text-[10px] text-muted-foreground leading-relaxed pt-2 mt-1 border-t border-border/50">
        Locked modules require prerequisites or stage has reached its credit limit.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODULE DETAIL PANEL
// ═══════════════════════════════════════════════════════════════════

export function DetailPanel({
  modCode,
  sel,
  onToggle,
  onClose,
  onViewTree,
  onSelectMod,
  moduleMap,
  stageReqs,
  modules,
  onAddToCompare,
  isCompared,
}: {
  modCode: string;
  sel: Set<string>;
  onToggle: (code: string) => void;
  onClose: () => void;
  onViewTree: () => void;
  onSelectMod?: (code: string) => void;
  moduleMap: Map<string, Module>;
  stageReqs: StageReq[];
  modules: Module[];
  onAddToCompare?: (code: string) => void;
  isCompared?: boolean;
}) {
  const { isRewindMode } = useContext(RewindModeContext);
  const mod = moduleMap.get(modCode);
  if (!mod) return null;
  const status = getModuleStatus(mod, sel, moduleMap, stageReqs, modules, isRewindMode);
  const badge = STATUS_BADGE[status];
  const isSelectable = status === "available" || status === "selected";
  const prereqMods = mod.prerequisites.map(c => moduleMap.get(c)).filter(Boolean) as Module[];
  const coreqMods  = mod.corequisites.map(c => moduleMap.get(c)).filter(Boolean) as Module[];

  // Downstream modules unlocked by this module
  const downstreamUnlocks = useMemo(() => {
    return modules.filter(m => m.prerequisites && m.prerequisites.includes(mod.code));
  }, [modules, mod.code]);

  const lockReason =
    status === "locked-prereq"  ? "Complete prerequisite modules to unlock this module." :
    status === "locked-credits" ? "Stage credit limit reached. Deselect another optional module first." : null;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-card">
      {/* ELE Geometric Banner Header */}
      <div className="relative h-24 shrink-0 overflow-hidden">
        <EleGeometricPattern seed={mod.code} height="100%" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10 shadow-xs"
        >
          <X size={14} />
        </button>
        <div className="absolute bottom-2 left-4 z-10 flex items-center gap-2">
          <span className="bg-[#003C3C]/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold tracking-wider">
            {mod.code}
          </span>
          <a
            href={`https://ele.exeter.ac.uk/course/search.php?search=${encodeURIComponent(mod.code)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#007A6B]/90 hover:bg-[#007A6B] text-white px-2 py-0.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
            title={`Open ${mod.code} on Exeter Learning Environment`}
          >
            <span>Open in ELE</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Header Info */}
      <div className="border-b border-border px-5 py-3.5 bg-card">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold ${badge.cls}`}>{badge.label}</span>
          <span className="text-[10px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-lg">
            {mod.term === "AUT" ? "Autumn (Term 1)" : mod.term === "SPR" ? "Spring (Term 2)" : mod.term === "AUTSPR" ? "Full Year" : "Other Term"}
          </span>
        </div>
        <h3 className="text-base font-bold text-foreground leading-snug">{mod.title}</h3>
      </div>

      {/* Body */}
      <div className="flex-1 px-5 py-4 space-y-5">
        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          <Chip label={`Year ${mod.stage}`} variant="primary" />
          <Chip label={`${mod.credits} credits`} variant="accent" />
          {mod.optionalGroup && <Chip label={`Group ${mod.optionalGroup}`} variant="muted" />}
          <Chip label={mod.condonable ? "Condonable" : "Non-condonable"} variant={mod.condonable ? "muted" : "danger"} />
        </div>

        {/* Description */}
        <div>
          <SectionLabel>Module Overview</SectionLabel>
          <p className="text-xs text-foreground leading-relaxed bg-muted/20 p-3.5 rounded-xl border border-border/60">
            {mod.description || "Detailed syllabus available on University of Exeter Study Guide."}
          </p>
        </div>

        {/* Assessment matching ELE Assessment View */}
        <div>
          <SectionLabel>Assessment Information</SectionLabel>
          <div className="bg-muted/30 border border-border rounded-xl overflow-hidden">
            <div className="p-3 text-xs text-foreground font-medium flex items-center justify-between border-b border-border/60 bg-muted/40">
              <span className="font-bold">Assessment Method</span>
              <span className="text-muted-foreground">Weight</span>
            </div>
            <div className="p-3 text-xs text-foreground leading-relaxed flex items-center justify-between">
              <span>{mod.assessmentType || "Written Examination & Coursework"}</span>
              <span className="font-bold text-[#00A693]">100%</span>
            </div>
          </div>
        </div>

        {/* Prerequisites with Click-to-Jump Navigation */}
        {prereqMods.length > 0 && (
          <div>
            <SectionLabel>Prerequisites ({prereqMods.length})</SectionLabel>
            <div className="space-y-1.5">
              {prereqMods.map(pm => {
                const met = pm.type === "compulsory" || sel.has(pm.code);
                return (
                  <div
                    key={pm.code}
                    onClick={() => onSelectMod?.(pm.code)}
                    className={`flex items-center justify-between gap-2.5 text-xs p-2.5 rounded-xl border transition-all cursor-pointer ${
                      met
                        ? "bg-secondary/40 border-border/60 text-foreground hover:border-[#00A693]"
                        : "bg-muted/40 border-border/50 text-muted-foreground hover:border-[#00A693] hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {met ? (
                        <CheckCircle size={14} className="text-[#00A693] shrink-0" />
                      ) : (
                        <Circle size={14} className="text-muted-foreground shrink-0" />
                      )}
                      <span className="font-bold font-mono text-[#007A6B] dark:text-[#00C4AD] shrink-0">{pm.code}</span>
                      <span className="truncate flex-1 font-medium">{pm.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {pm.type !== "compulsory" && !met && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggle(pm.code);
                          }}
                          className="px-2 py-0.5 rounded-md bg-[#00A693] text-white text-[10px] font-bold hover:bg-[#008f7e]"
                        >
                          + Select
                        </button>
                      )}
                      <ArrowRight size={12} className="text-muted-foreground/60" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Downstream Unlocks Navigation */}
        {downstreamUnlocks.length > 0 && (
          <div>
            <SectionLabel>Unlocks Later Stages ({downstreamUnlocks.length})</SectionLabel>
            <div className="grid grid-cols-1 gap-1.5">
              {downstreamUnlocks.map(dm => (
                <button
                  key={dm.code}
                  type="button"
                  onClick={() => onSelectMod?.(dm.code)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl border border-border/60 hover:border-[#00A693] bg-muted/20 hover:bg-card transition-all text-left text-xs group cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Workflow size={13} className="text-[#00A693] shrink-0" />
                    <span className="font-bold font-mono text-[#007A6B] dark:text-[#00C4AD] shrink-0">{dm.code}</span>
                    <span className="truncate text-foreground group-hover:text-[#007A6B] font-medium">{dm.title}</span>
                  </div>
                  <span className="text-[10.5px] text-muted-foreground shrink-0 font-medium ml-2">
                    Y{dm.stage} · {dm.credits}cr
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Corequisites */}
        {coreqMods.length > 0 && (
          <div>
            <SectionLabel>Corequisites</SectionLabel>
            <div className="space-y-1.5">
              {coreqMods.map(cm => (
                <div
                  key={cm.code}
                  onClick={() => onSelectMod?.(cm.code)}
                  className="flex items-center gap-2.5 text-xs p-2.5 rounded-xl bg-muted/40 border border-border/50 text-muted-foreground cursor-pointer hover:border-[#00A693] transition-colors"
                >
                  <Info size={14} className="text-muted-foreground shrink-0" />
                  <span className="font-bold font-mono text-[#00A693] shrink-0">{cm.code}</span>
                  <span className="truncate flex-1">{cm.title}</span>
                  <ArrowRight size={12} className="text-muted-foreground/60" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lock reason */}
        {lockReason && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-xs leading-relaxed border border-destructive/20">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            {lockReason}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 bg-card border-t border-border px-5 py-3.5 space-y-2">
        {mod.type !== "compulsory" && (
          <button
            onClick={() => onToggle(mod.code)}
            disabled={!isSelectable}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
              status === "selected"
                ? "bg-muted text-foreground hover:bg-muted/80"
                : isSelectable
                ? "bg-[#00A693] text-white hover:bg-[#008f7e] active:scale-[0.98]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {status === "selected" ? "Deselect Module" : "Select Module"}
          </button>
        )}

        {/* Open in ELE Action */}
        <a
          href={`https://ele.exeter.ac.uk/course/search.php?search=${encodeURIComponent(mod.code)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#007A6B] hover:bg-[#006558] transition-colors flex items-center justify-center gap-1.5 shadow-2xs group cursor-pointer"
          title={`Search and open ${mod.code} on Exeter Learning Environment`}
        >
          <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
          <span>Open in ELE</span>
        </a>

        <div className="flex items-center gap-2">
          {onAddToCompare && (
            <button
              onClick={() => onAddToCompare(mod.code)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1.5"
            >
              <Scale size={13} />
              {isCompared ? "Remove from Compare" : "Add to Compare"}
            </button>
          )}
          <button
            onClick={onViewTree}
            className="hidden sm:flex flex-1 py-2 rounded-xl text-xs font-semibold text-[#00A693] hover:bg-secondary transition-colors items-center justify-center gap-1.5"
          >
            <Network size={13} />
            View in Tree
          </button>
        </div>
      </div>
    </div>
  );
}

function Chip({ label, variant }: { label: string; variant: "primary" | "accent" | "muted" | "danger" }) {
  const cls = {
    primary: "bg-[#003C3C] text-white",
    accent:  "bg-[#00A693]/15 text-[#007A6B] dark:bg-[#00A693]/20 dark:text-[#00C4AD]",
    muted:   "bg-muted text-muted-foreground",
    danger:  "bg-destructive/10 text-destructive",
  }[variant];
  return <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${cls}`}>{label}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{children}</p>;
}

function ProgrammeView({
  sel,
  onToggle,
  onSelect,
  programme,
  modules,
  moduleMap,
  stageReqs,
  onAddToCompare,
  comparisonCodes = [],
  searchQuery: externalSearchQuery,
  onSearchQuery: externalSetSearchQuery,
  freeElectives = {},
  onOpenFreeElectiveModal,
  onRemoveFreeElective,
  onOpenDiscovery,
  discoveryLikes,
}: {
  sel: Set<string>;
  onToggle: (c: string) => void;
  onSelect: (c: string) => void;
  programme: Programme;
  modules: Module[];
  moduleMap: Map<string, Module>;
  stageReqs: StageReq[];
  onAddToCompare?: (c: string) => void;
  comparisonCodes?: string[];
  searchQuery?: string;
  onSearchQuery?: (q: string) => void;
  freeElectives?: Record<number, Module>;
  onOpenFreeElectiveModal?: (stage: number) => void;
  onRemoveFreeElective?: (stage: number) => void;
  onOpenDiscovery?: () => void;
  discoveryLikes?: Set<string>;
}) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 1: true, 2: true, 3: true, 4: true });
  const [cardLayout, setCardLayout] = useState<"grid" | "list">("grid");
  const [stageFilter, setStageFilter] = useState<"all" | number>("all");
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalSetSearchQuery || setInternalSearchQuery;
  const { isRewindMode } = useContext(RewindModeContext);

  const visibleStageReqs = useMemo(() => {
    if (stageFilter === "all") return stageReqs;
    return stageReqs.filter(r => r.stage === stageFilter);
  }, [stageReqs, stageFilter]);

  const filterBySearch = useCallback((mods: Module[]) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return mods;
    return mods.filter(m =>
      m.code.toLowerCase().includes(q) ||
      m.title.toLowerCase().includes(q) ||
      (m.description && m.description.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="space-y-5 p-4 sm:p-6 bg-[#f4f4f4] dark:bg-background">
      {/* ELE Authentic Course Banner */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
        <div className="h-28 relative">
          <EleGeometricPattern seed={programme.code || "EXETER"} height="100%" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 sm:p-6">
            <div className="text-white">
              <span className="bg-[#003C3C]/90 text-[#00C4AD] px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold tracking-wider">
                {programme.code}
              </span>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mt-1 leading-tight">
                {programme.title}
              </h2>
            </div>
          </div>
        </div>
        <div className="px-5 py-3.5 bg-card flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border">
          <div className="flex items-center gap-2">
            <GraduationCap size={15} className="text-[#00A693]" />
            <span>{programme.dept || "University of Exeter"}</span>
            <span>·</span>
            <span className="font-semibold text-foreground">{programme.totalCredits || 360} total credits</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider bg-secondary text-secondary-foreground px-2 py-0.5 rounded-lg">
            Academic Year {API_YEAR}
          </span>
        </div>
      </div>

      {/* Structure Controls Bar: Stage Quick-Switcher Tabs, Real-Time Search, and Grid/List switcher */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 px-1">
        {/* Interactive Stage Quick-Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setStageFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              stageFilter === "all"
                ? "bg-[#003C3C] text-white shadow-xs dark:bg-[#00A693]"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span>All Stages</span>
          </button>

          {stageReqs.map(req => {
            const reqMods = modules.filter(m => m.stage === req.stage);
            const isAllNonCond = reqMods.length > 0 && reqMods.every(m => !m.condonable);
            const earned = getStageCredits(req.stage, sel, modules);
            const full = earned >= req.totalRequired;
            const isActive = stageFilter === req.stage;

            return (
              <button
                key={req.stage}
                type="button"
                onClick={() => setStageFilter(req.stage)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#003C3C] text-white shadow-xs dark:bg-[#00A693]"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span>{req.label || `Year ${req.stage}`}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono tabular-nums ${
                    full
                      ? isAllNonCond
                        ? isActive ? "bg-amber-500/30 text-white" : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                        : isActive ? "bg-white/20 text-white" : "bg-[#00A693]/15 text-[#007A6B] dark:text-[#00C4AD]"
                      : isActive ? "bg-white/10 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {earned}/{req.totalRequired}cr {full && (isAllNonCond ? "🛡️" : "✓")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Layout Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Instant Real-Time Search */}
          <div className="relative flex-1 md:w-56">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search in course..."
              className="w-full pl-8 pr-7 py-1.5 bg-card border border-border rounded-xl text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00A693] text-foreground transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Grid / List switcher */}
          <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setCardLayout("grid")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                cardLayout === "grid"
                  ? "bg-[#003C3C] text-white shadow-xs dark:bg-[#00A693]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              title="Card Grid view (fills wide screens)"
            >
              <LayoutGrid size={13} />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setCardLayout("list")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                cardLayout === "list"
                  ? "bg-[#003C3C] text-white shadow-xs dark:bg-[#00A693]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              title="Compact List view"
            >
              <List size={13} />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          {/* Module Matchmaker Discovery Trigger */}
          {onOpenDiscovery && (
            <button
              type="button"
              onClick={onOpenDiscovery}
              className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-gradient-to-r from-[#00A693] to-teal-500 text-white shadow-2xs hover:opacity-95 transition-all cursor-pointer shrink-0"
              title="Discover optional modules with Tinder-style Matchmaker"
            >
              <Sparkles size={13} />
              <span className="hidden sm:inline">Matchmaker</span>
              {discoveryLikes && discoveryLikes.size > 0 && (
                <span className="bg-white/25 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {discoveryLikes.size}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Stages Accordion */}
      {visibleStageReqs.map(req => {
        const mods = modules.filter(m => m.stage === req.stage);
        const compulsory = mods.filter(m => m.type === "compulsory");
        const optional = mods.filter(m => m.type === "optional" && !m.isFreeElective);
        const groups = [...new Set(optional.map(m => m.optionalGroup))].filter(Boolean) as string[];

        const isAllNonCond = mods.length > 0 && mods.every(m => !m.condonable);
        const filteredCompulsory = filterBySearch(compulsory);
        const earned = getStageCredits(req.stage, sel, modules);
        const full = earned >= req.totalRequired;
        const isOpen = expanded[req.stage] ?? true;

        return (
          <div key={req.stage} className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
            {/* Stage Accordion Header */}
            <button
              type="button"
              onClick={() => setExpanded(e => ({ ...e, [req.stage]: !isOpen }))}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors border-b border-border/50 text-left"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-2xs shrink-0 ${
                    full
                      ? isAllNonCond
                        ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white ring-1 ring-amber-400/40"
                        : "bg-[#00A693] text-white"
                      : "bg-[#003C3C] text-white dark:bg-muted dark:text-foreground"
                  }`}
                >
                  Y{req.stage}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-foreground text-[15px]">{req.label}</h3>
                    {full && (
                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isAllNonCond
                            ? "text-amber-700 dark:text-amber-300 bg-amber-500/15 border border-amber-500/30"
                            : "text-[#00A693] bg-[#00A693]/10"
                        }`}
                      >
                        {isAllNonCond ? <ShieldAlert size={11} /> : <CheckCircle2 size={11} />}
                        {isAllNonCond ? "100% Non-condonable" : "Satisfied"}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2 flex-wrap">
                    <span><strong>{earned}</strong> / {req.totalRequired} credits selected</span>
                    <span>·</span>
                    <span>{compulsory.length} compulsory{optional.length > 0 ? `, ${optional.length} optional` : ""}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        full
                          ? isAllNonCond
                            ? "bg-gradient-to-r from-amber-500 to-amber-600"
                            : "bg-[#00A693]"
                          : "bg-[#003C3C] dark:bg-[#00A693]"
                      }`}
                      style={{ width: `${Math.min(100, (earned / req.totalRequired) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold tabular-nums text-muted-foreground">
                    {Math.round((earned / req.totalRequired) * 100)}%
                  </span>
                </div>
                <div className="p-1 text-muted-foreground">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="p-5 space-y-6">
                {/* Modern Guidance Note */}
                {req.notes.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-[#EBF3F2]/70 dark:bg-[#003C3C]/20 border border-[#00A693]/30 flex items-start gap-3 text-xs text-foreground">
                    <div className="w-6 h-6 rounded-lg bg-[#00A693]/15 text-[#00A693] flex items-center justify-center shrink-0 mt-0.5">
                      <Info size={14} />
                    </div>
                    <div className="space-y-1 flex-1">
                      {req.notes.map((n, i) => (
                        <p key={i} className="leading-relaxed font-medium">
                          {n}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compulsory Modules Section */}
                {filteredCompulsory.length > 0 && (
                  <div>
                    <GroupLabel>
                      Compulsory Modules ({filteredCompulsory.length})
                    </GroupLabel>
                    <div className={cardLayout === "grid" ? "grid grid-cols-1 xl:grid-cols-2 gap-3.5" : "space-y-2"}>
                      {filteredCompulsory.map(m => (
                        <ModuleRow
                          key={m.code}
                          mod={m}
                          status="compulsory"
                          onToggle={onToggle}
                          onSelect={onSelect}
                          onAddToCompare={onAddToCompare}
                          isCompared={comparisonCodes.includes(m.code)}
                          isLiked={discoveryLikes?.has(m.code)}
                          modules={modules}
                          layout={cardLayout}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Module Groups */}
                {groups.map(grp => {
                  const grpMods = optional.filter(m => m.optionalGroup === grp);
                  const filteredGrpMods = filterBySearch(grpMods);
                  if (searchQuery && filteredGrpMods.length === 0) return null;

                  return (
                    <div key={grp}>
                      <GroupLabel>
                        Optional Group {grp} ({grpMods.length} available)
                      </GroupLabel>
                      <div className={cardLayout === "grid" ? "grid grid-cols-1 xl:grid-cols-2 gap-3.5" : "space-y-2"}>
                        {filteredGrpMods.map(m => {
                          const s = getModuleStatus(m, sel, moduleMap, stageReqs, modules, isRewindMode);
                          return (
                            <ModuleRow
                              key={m.code}
                              mod={m}
                              status={s}
                              onToggle={onToggle}
                              onSelect={onSelect}
                              onAddToCompare={onAddToCompare}
                              isCompared={comparisonCodes.includes(m.code)}
                              isLiked={discoveryLikes?.has(m.code)}
                              modules={modules}
                              layout={cardLayout}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Free Elective Section (Stage 2+, strictly Max 1 per year) */}
                {req.stage >= 2 && (
                  <div className="pt-3 border-t border-border/70 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <GroupLabel>
                        Free Elective Module (Max 1 · Outside Discipline)
                      </GroupLabel>
                      <span className="text-[10.5px] font-semibold text-[#00A693] bg-[#00A693]/10 border border-[#00A693]/20 px-2.5 py-0.5 rounded-full">
                        Year {req.stage} Opportunity
                      </span>
                    </div>

                    {freeElectives[req.stage] ? (
                      <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
                            {freeElectives[req.stage].code}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-foreground">
                                {freeElectives[req.stage].title}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 shrink-0">
                                Free Elective
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2 flex-wrap">
                              <span>{freeElectives[req.stage].credits} credits</span>
                              <span>·</span>
                              <span>{freeElectives[req.stage].term === "AUT" ? "Autumn (Term 1)" : freeElectives[req.stage].term === "SPR" ? "Spring (Term 2)" : "Full Year"}</span>
                              <span>·</span>
                              <span className="text-emerald-700 dark:text-emerald-400 font-medium">Counts towards Year {req.stage} 120-credit requirement</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          {onOpenFreeElectiveModal && (
                            <button
                              type="button"
                              onClick={() => onOpenFreeElectiveModal(req.stage)}
                              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border hover:bg-muted text-foreground transition-colors cursor-pointer"
                            >
                              Change
                            </button>
                          )}
                          {onRemoveFreeElective && (
                            <button
                              type="button"
                              onClick={() => onRemoveFreeElective(req.stage)}
                              className="p-1.5 text-xs font-semibold rounded-lg text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                              title="Remove Free Elective"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/20 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-foreground">
                              Optional Free Elective (15 credits)
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00A693]/15 text-[#00A693]">
                              Stage {req.stage}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Broaden your degree by substituting 15 credits with an approved module outside your home discipline (e.g. Languages, Business, Humanities, Law, Data Science).
                          </p>
                        </div>
                        {onOpenFreeElectiveModal && (
                          <button
                            type="button"
                            onClick={() => onOpenFreeElectiveModal(req.stage)}
                            className="px-4 py-2 rounded-xl bg-[#003C3C] hover:bg-[#00524d] text-white text-xs font-semibold shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer dark:bg-[#00A693] dark:hover:bg-[#008f7e]"
                          >
                            <Sparkles size={14} className="text-[#00C4AD]" />
                            <span>+ Pick Free Elective</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Empty State when search has no matches in this stage */}
                {searchQuery && filteredCompulsory.length === 0 && groups.every(grp => filterBySearch(optional.filter(m => m.optionalGroup === grp)).length === 0) && (
                  <div className="text-center py-6 text-xs text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60">
                    No modules match "{searchQuery}" in {req.label || `Year ${req.stage}`}.
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-1 mb-2.5">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{children}</span>
    </div>
  );
}

function ModuleRow({
  mod,
  status,
  onToggle,
  onSelect,
  onAddToCompare,
  isCompared,
  isLiked,
  modules,
  layout = "grid",
}: {
  mod: Module;
  status: ModuleStatus;
  onToggle: (c: string) => void;
  onSelect: (c: string) => void;
  onAddToCompare?: (c: string) => void;
  isCompared?: boolean;
  isLiked?: boolean;
  modules: Module[];
  layout?: "grid" | "list";
}) {
  const isSelectable = status === "available" || status === "selected";
  const isLocked = status === "locked-prereq" || status === "locked-credits";

  // How many modules this unlocks downstream
  const unlocksCount = useMemo(() => {
    return modules.filter(m => m.prerequisites && m.prerequisites.includes(mod.code)).length;
  }, [modules, mod.code]);

  const termBadge = useMemo(() => {
    if (mod.term === "AUT") {
      return (
        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Autumn (T1)
        </span>
      );
    }
    if (mod.term === "SPR") {
      return (
        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#00A693]/10 text-[#007A6B] dark:text-[#00C4AD] border border-[#00A693]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A693]" /> Spring (T2)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400" /> Full Year
      </span>
    );
  }, [mod.term]);

  if (layout === "list") {
    // ── Sleek Compact List Row ──────────────────────────────────────────
    return (
      <div
        onClick={() => onSelect(mod.code)}
        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl border bg-card cursor-pointer transition-all hover:shadow-sm hover:border-[#007A6B] dark:hover:border-[#00C4AD] group ${
          status === "selected"
            ? "border-[#00A693] ring-1 ring-[#00A693]/30"
            : isLocked
            ? "border-border/60 opacity-65 bg-muted/20"
            : "border-border/80"
        }`}
      >
        {/* Selection Indicator or Book */}
        {mod.type !== "compulsory" ? (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              if (isSelectable) onToggle(mod.code);
            }}
            disabled={!isSelectable}
            className={`shrink-0 transition-colors ${
              isSelectable ? "text-[#00A693] hover:text-[#008f7e]" : "text-muted-foreground cursor-not-allowed"
            }`}
          >
            {status === "selected" ? (
              <CheckCircle2 size={19} className="text-[#00A693]" />
            ) : isLocked ? (
              <Lock size={16} className="text-muted-foreground" />
            ) : (
              <Circle size={19} className="text-muted-foreground hover:text-[#00A693]" />
            )}
          </button>
        ) : (
          <div className="shrink-0 text-[#003C3C] dark:text-[#00C4AD]">
            <BookOpen size={18} />
          </div>
        )}

        {/* Code & Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12.5px] font-bold font-mono text-[#007A6B] dark:text-[#00C4AD]">
              {mod.code}
            </span>
            {termBadge}
            {isLiked && (
              <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <Heart size={10} className="fill-emerald-500 text-emerald-500" /> Match
              </span>
            )}
            {!mod.condonable && (
              <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                <ShieldAlert size={11} /> Non-cond.
              </span>
            )}
            {unlocksCount > 0 && (
              <span
                className="hidden md:inline-flex items-center gap-1 text-[10.5px] font-medium text-[#007A6B] dark:text-[#00C4AD] bg-[#00A693]/10 px-2 py-0.5 rounded-full"
                title={`Unlocks ${unlocksCount} higher stage module${unlocksCount > 1 ? "s" : ""}`}
              >
                <Workflow size={11} /> Unlocks {unlocksCount}
              </span>
            )}
          </div>
          <p className="text-[14px] font-semibold text-foreground truncate mt-0.5 group-hover:text-[#007A6B] dark:group-hover:text-[#00C4AD] transition-colors">
            {mod.title}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onAddToCompare && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onAddToCompare(mod.code);
              }}
              title={isCompared ? "In comparison" : "Compare this module"}
              className={`p-1.5 rounded-lg transition-colors ${
                isCompared
                  ? "bg-[#00A693]/20 text-[#00A693]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Scale size={14} />
            </button>
          )}

          <div className="text-right">
            <span className="text-xs font-black tabular-nums text-foreground">
              {mod.credits}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground ml-0.5">cr</span>
          </div>

          <ArrowRight size={14} className="text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    );
  }

  // ── 2-Column Responsive Card Grid ──────────────────────────────────
  return (
    <div
      onClick={() => onSelect(mod.code)}
      className={`rounded-2xl border bg-card p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 group relative shadow-2xs hover:shadow-md ${
        status === "selected"
          ? "border-[#00A693] ring-1 ring-[#00A693]/30 bg-card"
          : status === "compulsory"
          ? "border-border hover:border-[#003C3C] dark:hover:border-[#00C4AD]"
          : isLocked
          ? "border-border/60 opacity-60 bg-muted/20"
          : "border-border hover:border-[#00A693]"
      }`}
    >
      {/* Top Header: Code, Badges, and Credits */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black font-mono px-2 py-0.5 rounded-lg bg-muted text-[#007A6B] dark:text-[#00C4AD] tracking-wider">
            {mod.code}
          </span>
          {termBadge}
          {isLiked && (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <Heart size={10} className="fill-emerald-500 text-emerald-500" /> Match
            </span>
          )}
          {!mod.condonable && (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              <ShieldAlert size={11} /> Non-cond.
            </span>
          )}
        </div>

        {/* Credits */}
        <div className="text-right shrink-0 flex items-center gap-1">
          <span className="text-sm font-black tabular-nums text-foreground">
            {mod.credits}
          </span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase">cr</span>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h4 className="text-[14.5px] font-bold text-foreground group-hover:text-[#007A6B] dark:group-hover:text-[#00C4AD] transition-colors leading-snug line-clamp-2">
          {mod.title}
        </h4>
        {mod.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {mod.description}
          </p>
        )}
      </div>

      {/* Bottom Footer: Dependencies peek, Selection / Compulsory status, and Actions */}
      <div className="pt-2.5 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
        {/* Left: Prerequisite or Unlocks peek */}
        <div className="flex items-center gap-1.5 truncate">
          {unlocksCount > 0 && (
            <span
              className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#007A6B] dark:text-[#00C4AD] bg-[#00A693]/10 px-2 py-0.5 rounded-full"
              title={`Unlocks ${unlocksCount} higher stage module${unlocksCount > 1 ? "s" : ""}`}
            >
              <Workflow size={11} /> Unlocks {unlocksCount}
            </span>
          )}
          {mod.prerequisites && mod.prerequisites.length > 0 && (
            <span
              className="inline-flex items-center gap-1 text-[10.5px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full truncate"
              title={`Prerequisites: ${mod.prerequisites.join(", ")}`}
            >
              Req: {mod.prerequisites[0]}{mod.prerequisites.length > 1 ? ` +${mod.prerequisites.length - 1}` : ""}
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onAddToCompare && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onAddToCompare(mod.code);
              }}
              title={isCompared ? "In comparison" : "Compare this module"}
              className={`p-1.5 rounded-lg transition-colors ${
                isCompared
                  ? "bg-[#00A693]/20 text-[#00A693]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Scale size={13} />
            </button>
          )}

          {/* Compulsory vs Optional toggle */}
          {mod.type === "compulsory" ? (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#003C3C] dark:text-[#00C4AD] bg-[#003C3C]/10 dark:bg-[#00C4AD]/15 px-2.5 py-1 rounded-full">
              <CheckCircle2 size={12} /> Compulsory
            </span>
          ) : (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                if (isSelectable) onToggle(mod.code);
              }}
              disabled={!isSelectable}
              className={`inline-flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-1 rounded-full transition-all ${
                status === "selected"
                  ? "bg-[#00A693] text-white hover:bg-[#008f7e] shadow-2xs"
                  : isLocked
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-muted hover:bg-muted/80 text-foreground border border-border"
              }`}
            >
              {status === "selected" ? (
                <>
                  <CheckCircle2 size={12} /> Selected
                </>
              ) : isLocked ? (
                <>
                  <Lock size={11} /> Locked
                </>
              ) : (
                <>
                  <Plus size={12} /> Select
                </>
              )}
            </button>
          )}

          <div className="p-1 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all">
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SKILL TREE VIEW
// ═══════════════════════════════════════════════════════════════════

function SkillTreeView({ sel, onToggle, activeCode, onSelect, modules, moduleMap, stageReqs }: {
  sel: Set<string>; onToggle: (code: string) => void;
  activeCode: string | null; onSelect: (code: string) => void;
  modules: Module[]; moduleMap: Map<string, Module>; stageReqs: StageReq[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.85);
  const [animateDashes, setAnimateDashes] = useState(true);
  const [layoutType, setLayoutType] = useState<"standard" | "waterfall">("waterfall");
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [termFilter, setTermFilter] = useState<"all" | "AUT" | "SPR">("all");
  const [showMinimap, setShowMinimap] = useState(true);
  const dragging = useRef(false);
  const lastDragPos = useRef({ x: 0, y: 0 });
  const { isRewindMode, setIsRewindMode } = useContext(RewindModeContext);

  // Compute layout from live module list
  const nodePos = useMemo(() => buildNodePos(modules, layoutType), [modules, layoutType]);
  const stages = useMemo(() => {
    const list = Array.from(new Set(modules.map(m => m.stage))).sort((a, b) => a - b);
    return list.length > 0 ? list : [1, 2, 3, 4];
  }, [modules]);
  const stageCount = stages.length;

  const CANVAS_W = useMemo(() => {
    if (layoutType === "waterfall") {
      const maxCols = Math.min(5, Math.max(1, ...stages.map(s => modules.filter(m => m.stage === s).length)));
      return Math.max(1180, CPAD + 48 + maxCols * (NW + 32) + CPAD + 20);
    }
    return CPAD + stageCount * CSTEP - (CSTEP - NW) + CPAD;
  }, [layoutType, modules, stageCount, stages]);

  const CANVAS_H = useMemo(() => {
    if (layoutType === "waterfall") {
      let totalH = RPAD + 44;
      stages.forEach(s => {
        const count = modules.filter(m => m.stage === s).length;
        const numRows = Math.ceil(count / 5) || 1;
        totalH += numRows * (NH + 24) + 88;
      });
      return totalH + RPAD + 40;
    }
    const max = Math.max(1, ...stages.map(s => modules.filter(m => m.stage === s).length));
    return RPAD + max * RSTEP + RPAD;
  }, [modules, layoutType, stages]);

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    dragging.current = true;
    lastDragPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setAttribute("data-dragging", "1");
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    containerRef.current.scrollLeft -= e.clientX - lastDragPos.current.x;
    containerRef.current.scrollTop  -= e.clientY - lastDragPos.current.y;
    lastDragPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = (e: React.MouseEvent) => {
    dragging.current = false;
    e.currentTarget.removeAttribute("data-dragging");
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    const t = e.touches[0];
    dragging.current = true;
    lastDragPos.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const t = e.touches[0];
    containerRef.current.scrollLeft -= t.clientX - lastDragPos.current.x;
    containerRef.current.scrollTop  -= t.clientY - lastDragPos.current.y;
    lastDragPos.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = () => { dragging.current = false; };

  useEffect(() => {
    if (!activeCode || !containerRef.current) return;
    const pos = nodePos[activeCode];
    if (!pos) return;
    const el = containerRef.current;
    el.scrollTo({
      left: pos.x * zoom - el.clientWidth / 2 + (NW * zoom) / 2,
      top:  pos.y * zoom - el.clientHeight / 2 + (NH * zoom) / 2,
      behavior: "smooth",
    });
  }, [activeCode, zoom]);

  // Focus target for path highlighting
  const focusCode = hoveredCode || activeCode;

  // Compute ancestor and descendant dependency sets
  const { ancestorCodes, descendantCodes } = useMemo(() => {
    if (!focusCode) return { ancestorCodes: new Set<string>(), descendantCodes: new Set<string>() };

    const ancestors = new Set<string>();
    const queue = [focusCode];
    while (queue.length > 0) {
      const curr = queue.shift()!;
      const m = moduleMap.get(curr);
      if (m?.prerequisites) {
        for (const p of m.prerequisites) {
          if (!ancestors.has(p)) {
            ancestors.add(p);
            queue.push(p);
          }
        }
      }
    }

    const descendants = new Set<string>();
    const dQueue = [focusCode];
    while (dQueue.length > 0) {
      const curr = dQueue.shift()!;
      for (const m of modules) {
        if (m.prerequisites.includes(curr) && !descendants.has(m.code)) {
          descendants.add(m.code);
          dQueue.push(m.code);
        }
      }
    }

    return { ancestorCodes: ancestors, descendantCodes: descendants };
  }, [focusCode, moduleMap, modules]);

  const edges = useMemo(() => {
    const result: { id: string; from: string; to: string; x1: number; y1: number; x2: number; y2: number; met: boolean }[] = [];
    modules.forEach(mod => {
      mod.prerequisites.forEach(prereqCode => {
        const src = nodePos[prereqCode];
        const tgt = nodePos[mod.code];
        if (!src || !tgt) return;
        const srcMod = moduleMap.get(prereqCode);
        const met = !!srcMod && (srcMod.type === "compulsory" || sel.has(prereqCode));
        if (layoutType === "waterfall") {
          result.push({
            id: `${prereqCode}->${mod.code}`,
            from: prereqCode,
            to: mod.code,
            x1: src.x + NW / 2,
            y1: src.y + NH,
            x2: tgt.x + NW / 2,
            y2: tgt.y,
            met,
          });
        } else {
          result.push({
            id: `${prereqCode}->${mod.code}`,
            from: prereqCode,
            to: mod.code,
            x1: src.x + NW,
            y1: src.y + NH / 2,
            x2: tgt.x,
            y2: tgt.y + NH / 2,
            met,
          });
        }
      });
    });
    return result;
  }, [sel, modules, moduleMap, nodePos, layoutType]);

  return (
    <div 
      className="relative w-full h-full bg-[#f8fafc] dark:bg-background overflow-hidden select-none touch-none flex flex-col"
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(0, 166, 147, 0.25) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Top Toolbar Controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 flex-wrap justify-end">
        {/* Term Filter Buttons */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-xl shadow-xs p-1">
          <button
            onClick={() => setTermFilter("all")}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              termFilter === "all" ? "bg-[#003C3C] text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Terms
          </button>
          <button
            onClick={() => setTermFilter("AUT")}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              termFilter === "AUT" ? "bg-[#007A6B] text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Autumn (T1)
          </button>
          <button
            onClick={() => setTermFilter("SPR")}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              termFilter === "SPR" ? "bg-[#00A693] text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Spring (T2)
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-xl shadow-xs p-1">
          <button onClick={() => setZoom(z => Math.max(0.35, z - 0.15))}
            className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground w-6 h-6 flex items-center justify-center font-bold text-sm">
            −
          </button>
          <button onClick={() => setZoom(0.85)}
            className="px-1 py-1 text-[11px] tabular-nums text-muted-foreground hover:text-foreground transition-colors min-w-[32px] text-center font-semibold">
            {Math.round(zoom * 100)}%
          </button>
          <button onClick={() => setZoom(z => Math.min(2, z + 0.15))}
            className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground w-6 h-6 flex items-center justify-center font-bold text-sm">
            +
          </button>
          <div className="w-px h-3 bg-border mx-0.5" />
          <button
            onClick={() => setAnimateDashes(v => !v)}
            title={animateDashes ? "Pause flow animation" : "Animate path flow"}
            className={`p-1 rounded-lg transition-colors w-6 h-6 flex items-center justify-center ${animateDashes ? "bg-[#00A693]/15 text-[#00A693]" : "text-muted-foreground hover:bg-muted"}`}
          >
            <Waves size={13} />
          </button>
          <button
            onClick={() => setLayoutType(t => t === "standard" ? "waterfall" : "standard")}
            className="p-1 rounded-lg transition-colors w-6 h-6 flex items-center justify-center text-muted-foreground hover:bg-muted"
            title={layoutType === "waterfall" ? "Switch to Horizontal Pipeline layout" : "Switch to Vertical Waterfall layout"}
          >
            {layoutType === "waterfall" ? <Columns3 size={13} /> : <Workflow size={13} />}
          </button>
          <button
            onClick={() => setShowMinimap(v => !v)}
            className={`p-1 rounded-lg transition-colors w-6 h-6 flex items-center justify-center ${showMinimap ? "bg-[#00A693]/15 text-[#00A693]" : "text-muted-foreground hover:bg-muted"}`}
            title="Toggle Mini-map"
          >
            <MapIcon size={13} />
          </button>
          <button
            onClick={() => setIsRewindMode(v => (typeof v === "function" ? !v(isRewindMode) : !v))}
            title={isRewindMode ? "Exit Rewind Mode" : "Enter Rewind Mode"}
            className={`p-1 rounded-lg transition-colors w-6 h-6 flex items-center justify-center ${isRewindMode ? "bg-[#00A693]/20 text-[#00A693] ring-1 ring-[#00A693]" : "text-muted-foreground hover:bg-muted"}`}
          >
            <Undo2 size={13} />
          </button>
        </div>
      </div>

      {/* Legend — top left */}
      <div className="absolute top-3 left-3 z-20 bg-card/95 backdrop-blur border border-border rounded-xl shadow-xs p-2.5 text-[10px] space-y-1.5">
        <LegendItem fill="#003C3C" label="Compulsory" />
        <LegendItem fill="#00A693" label="Selected" />
        <LegendItem fill="transparent" stroke="#00A693" label="Available" />
        <LegendItem fill="transparent" stroke="#94a3b8" label="Locked" dim />
        <div className="pt-1 border-t border-border/50 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#f59e0b]" />
            <span className="text-foreground">Prerequisite Path</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#00C4AD]" />
            <span className="text-foreground">Unlocked by this</span>
          </div>
        </div>
      </div>

      {/* Canvas — drag-to-pan on desktop and touch */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto select-none"
        style={{ cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative" style={{ width: CANVAS_W * zoom, height: CANVAS_H * zoom, minWidth: "100%" }}>
          {/* Year / Stage labels */}
          {layoutType === "standard" ? (
            stages.map(s => (
              <div
                key={s}
                className="absolute flex justify-center pointer-events-none z-10"
                style={{ left: (CPAD + (s - 1) * CSTEP) * zoom, top: 8 * zoom, width: NW * zoom }}
              >
                <div
                  className="px-3 py-1 rounded-full bg-[#003C3C] text-white font-bold tracking-wider uppercase shadow-xs whitespace-nowrap"
                  style={{ fontSize: `${zoom * 9.5}px` }}
                >
                  Year {s}
                </div>
              </div>
            ))
          ) : (
            stages.map(s => {
              const stageMods = modules.filter(m => m.stage === s);
              if (stageMods.length === 0) return null;
              const minY = Math.min(...stageMods.map(m => nodePos[m.code]?.y ?? 0));
              const req = stageReqs.find(r => r.stage === s);
              return (
                <div
                  key={s}
                  className="absolute pointer-events-none z-10 flex items-center gap-3"
                  style={{ left: (CPAD + 24) * zoom, top: (minY - 32) * zoom }}
                >
                  <div
                    className="px-3.5 py-1 rounded-full bg-[#003C3C] text-white font-bold tracking-wider uppercase shadow-xs flex items-center gap-2"
                    style={{ fontSize: `${zoom * 10}px` }}
                  >
                    <span>Year {s}</span>
                    <span className="opacity-70 text-[9px] font-normal normal-case">
                      · {req?.label || `Stage ${s}`}
                    </span>
                  </div>
                  <div
                    className="h-px bg-[#003C3C]/20 dark:bg-white/10"
                    style={{ width: `${Math.max(250, (CANVAS_W - CPAD * 2 - 180)) * zoom}px` }}
                  />
                </div>
              );
            })
          )}

          {/* SVG edges */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: CANVAS_W * zoom, height: CANVAS_H * zoom }}
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            preserveAspectRatio="none"
          >
            <defs>
              <style>{`
                @keyframes dashFlow {
                  to { stroke-dashoffset: -18; }
                }
                .dash-anim {
                  animation: dashFlow 0.7s linear infinite;
                }
              `}</style>
              <marker id="arrowMet" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0, 7 2.5, 0 5" fill="#00A693" /></marker>
              <marker id="arrowUnmet" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0, 7 2.5, 0 5" fill="#94a3b8" /></marker>
              <marker id="arrowAmber" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0, 7 2.5, 0 5" fill="#f59e0b" /></marker>
              <marker id="arrowTeal" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0, 7 2.5, 0 5" fill="#00C4AD" /></marker>
            </defs>

            {edges.map(e => {
              const isAncestorEdge = focusCode ? (ancestorCodes.has(e.from) && (ancestorCodes.has(e.to) || e.to === focusCode)) : false;
              const isDescendantEdge = focusCode ? ((e.from === focusCode || descendantCodes.has(e.from)) && descendantCodes.has(e.to)) : false;
              const isFocusPath = isAncestorEdge || isDescendantEdge;

              let strokeColor = e.met ? "#00A693" : "#94a3b8";
              let strokeWidth = e.met ? "1.8" : "1.2";
              let opacity = e.met ? 0.85 : 0.45;
              let marker = e.met ? "url(#arrowMet)" : "url(#arrowUnmet)";

              if (focusCode) {
                if (isAncestorEdge) {
                  strokeColor = "#f59e0b"; // Amber for prerequisite chain leading into this module
                  strokeWidth = "2.8";
                  opacity = 1;
                  marker = "url(#arrowAmber)";
                } else if (isDescendantEdge) {
                  strokeColor = "#00C4AD"; // Teal for modules unlocked downstream
                  strokeWidth = "2.8";
                  opacity = 1;
                  marker = "url(#arrowTeal)";
                } else {
                  opacity = 0.1;
                }
              }

              const d = layoutType === "waterfall"
                ? `M ${e.x1} ${e.y1} C ${e.x1} ${e.y1 + Math.max(25, Math.abs(e.y2 - e.y1) * 0.45)} ${e.x2} ${e.y2 - Math.max(25, Math.abs(e.y2 - e.y1) * 0.45)} ${e.x2} ${e.y2}`
                : `M ${e.x1} ${e.y1} C ${e.x1 + Math.max(50, Math.abs(e.x2 - e.x1) * 0.45)} ${e.y1} ${e.x2 - Math.max(50, Math.abs(e.x2 - e.x1) * 0.45)} ${e.y2} ${e.x2} ${e.y2}`;

              return (
                <path
                  key={e.id}
                  d={d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={e.met || isFocusPath ? undefined : "5 3.5"}
                  opacity={opacity}
                  markerEnd={marker}
                  className={!e.met && animateDashes && !isFocusPath ? "dash-anim" : ""}
                />
              );
            })}
          </svg>

          {/* Module nodes */}
          {modules.map(mod => {
            const pos = nodePos[mod.code];
            if (!pos) return null;
            const status = getModuleStatus(mod, sel, moduleMap, stageReqs, modules, isRewindMode);
            const isActive = mod.code === activeCode;
            const isHovered = mod.code === hoveredCode;
            const isLocked = status === "locked-prereq" || status === "locked-credits";

            const isFocus = mod.code === focusCode;
            const isAncestor = ancestorCodes.has(mod.code);
            const isDescendant = descendantCodes.has(mod.code);
            const isDimmed = focusCode ? (!isFocus && !isAncestor && !isDescendant) : false;
            const termDimmed = termFilter !== "all" && mod.term && mod.term !== termFilter;

            return (
              <div
                key={mod.code}
                data-node="1"
                onClick={() => onSelect(mod.code)}
                onMouseEnter={() => setHoveredCode(mod.code)}
                onMouseLeave={() => setHoveredCode(null)}
                className={`absolute rounded-xl border-2 cursor-pointer select-none flex flex-col justify-center px-3 py-2 transition-all duration-150 shadow-2xs ${
                  STATUS_NODE[status]
                } ${
                  isFocus ? "ring-4 ring-[#00A693] scale-[1.05] z-30 shadow-lg" :
                  isAncestor ? "ring-2 ring-amber-500 scale-[1.02] z-20 shadow-md" :
                  isDescendant ? "ring-2 ring-[#00C4AD] scale-[1.02] z-20 shadow-md" :
                  isActive ? "ring-2 ring-[#00A693] scale-[1.03]" : ""
                } ${
                  isDimmed || termDimmed ? "opacity-25 grayscale-[60%]" : isLocked ? "opacity-60" : ""
                }`}
                style={{
                  left: pos.x * zoom,
                  top: pos.y * zoom,
                  width: NW * zoom,
                  height: NH * zoom,
                }}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="font-bold leading-none font-mono" style={{ fontSize: `${zoom * 9.5}px`, opacity: 0.85 }}>
                    {mod.code}
                  </span>
                  <span className={`shrink-0 rounded-md px-1.5 py-0.5 font-bold leading-none ${
                    status === "compulsory" || status === "selected" ? "bg-white/20 text-inherit" : "bg-black/5 dark:bg-white/10 text-inherit"
                  }`} style={{ fontSize: `${zoom * 9}px` }}>{mod.credits}cr</span>
                </div>
                <div className="font-semibold leading-tight mt-1 line-clamp-2" style={{ fontSize: `${zoom * 10.5}px` }}>
                  {mod.title}
                </div>
                {status === "locked-prereq"  && <Lock size={9 * zoom} className="mt-1 opacity-70" />}
                {status === "locked-credits" && <AlertCircle size={9 * zoom} className="mt-1 opacity-70" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini-Map HUD */}
      {showMinimap && (
        <div className="absolute bottom-4 left-4 z-20 bg-card/90 backdrop-blur border border-border rounded-xl p-2 shadow-md flex flex-col gap-1 pointer-events-none">
          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
            <span>Map Overview</span>
          </div>
          <div
            className="relative bg-muted/60 rounded-lg border border-border/50 overflow-hidden"
            style={{ width: 130, height: 75 }}
          >
            {modules.map(m => {
              const p = nodePos[m.code];
              if (!p) return null;
              const mx = (p.x / CANVAS_W) * 130;
              const my = (p.y / CANVAS_H) * 75;
              const isSel = sel.has(m.code) || m.type === "compulsory";
              const isFocus = m.code === focusCode;
              return (
                <div
                  key={m.code}
                  className="absolute rounded-full transition-all"
                  style={{
                    left: Math.max(0, Math.min(127, mx)),
                    top: Math.max(0, Math.min(72, my)),
                    width: isFocus ? 5 : 3,
                    height: isFocus ? 5 : 3,
                    backgroundColor: isFocus ? "#f59e0b" : isSel ? "#00A693" : "#94a3b8",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function LegendItem({ fill, stroke, label, dim }: { fill: string; stroke?: string; label: string; dim?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3.5 h-3.5 rounded border-[1.5px] shrink-0"
        style={{ background: fill, borderColor: stroke || fill, opacity: dim ? 0.45 : 1 }} />
      <span className={dim ? "text-muted-foreground" : "text-foreground"}>{label}</span>
    </div>
  );
}




// ═══════════════════════════════════════════════════════════════════
// SHARE MODAL
// ═══════════════════════════════════════════════════════════════════

function ShareModal({ programmeCode, selected, onClose, onLoad }: {
  programmeCode: string | null; selected: Set<string>;
  onClose: () => void; onLoad: (code: string, sel: Set<string>) => void;
}) {
  const [loadText, setLoadText] = useState("");
  
  const shareCode = useMemo(() => {
    if (!programmeCode) return "";
    return btoa(`${programmeCode}|${Array.from(selected).join(",")}`);
  }, [programmeCode, selected]);

  const handleLoad = () => {
    try {
      const decoded = atob(loadText.trim());
      const [prog, selStr] = decoded.split("|");
      if (prog) {
        onLoad(prog, new Set(selStr ? selStr.split(",") : []));
        onClose();
      }
    } catch {
      alert("Invalid code format");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl flex flex-col border border-border animate-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-muted/30">
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-[#00A693]" />
            <h3 className="font-bold text-lg text-foreground">Save & Share</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-6">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">Your Share Code</label>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Copy this code to save your progress or share it with others. It remembers your programme and module choices.
            </p>
            <div className="flex gap-2">
              <input readOnly value={shareCode} className="flex-1 px-3 py-2 bg-muted text-foreground text-sm font-mono rounded-lg border border-border focus:outline-none" />
              <button onClick={() => navigator.clipboard.writeText(shareCode)} className="px-4 py-2 bg-[#003C3C] text-white rounded-lg text-sm font-semibold hover:bg-[#00524d] transition-colors shrink-0 shadow-sm">Copy</button>
            </div>
          </div>
          <div className="border-t border-border/50 pt-5">
            <label className="block text-sm font-bold text-foreground mb-1.5">Load from Code</label>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Paste a code here to automatically load a programme and its saved choices.
            </p>
            <div className="flex gap-2">
              <input value={loadText} onChange={e => setLoadText(e.target.value)} placeholder="Paste code here..." className="flex-1 px-3 py-2 bg-background text-foreground text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[#00A693] font-mono" />
              <button onClick={handleLoad} className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shrink-0 shadow-sm">Load</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SHARE PREVIEW MODAL
// ═══════════════════════════════════════════════════════════════════

function SharePreviewModal({ pendingShare, onConfirm, onCancel }: {
  pendingShare: { code: string, sel: Set<string> };
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-card w-full max-w-sm rounded-2xl shadow-2xl flex flex-col border border-border p-6 text-center animate-in zoom-in-95 duration-200">
        <h3 className="font-bold text-xl mb-3 text-foreground">Load Shared Planner?</h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          You are about to load programme <span className="font-bold text-foreground">{pendingShare.code}</span> with <span className="font-bold text-foreground">{pendingShare.sel.size}</span> selected modules.<br/><br/>
          This will replace your current planner progress.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 rounded-lg bg-[#00A693] text-white font-semibold hover:bg-[#008f7e] transition-colors shadow-sm">Confirm</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════

export default function App() {
  const isDesktop = useIsDesktop();
  const [dark, toggleDark] = useDarkMode();
  const [view, setView] = useState<ViewType>("programme");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activePdfReader, setActivePdfReader] = useState<{
    url: string;
    title: string;
    secondaryUrl?: string;
    secondaryTitle?: string;
  } | null>(null);

  // Keep mobile experience focused on Course Structure
  useEffect(() => {
    if (!isDesktop && view === "tree") {
      setView("programme");
    }
  }, [isDesktop, view]);
  const [isRewindMode, setIsRewindMode] = useState(() => {
    return localStorage.getItem("planner_rewind_mode") === "true";
  });
  useEffect(() => {
    localStorage.setItem("planner_rewind_mode", String(isRewindMode));
  }, [isRewindMode]);

  const [targetModules, setTargetModules] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("planner_target_modules");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? new Set(parsed) : new Set();
    } catch {
      return new Set();
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("planner_target_modules", JSON.stringify(Array.from(targetModules)));
    } catch {}
  }, [targetModules]);

  // Persist selections to localStorage
  const [manualSelected, setManualSelected] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("planner_selected_modules");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? new Set(parsed) : new Set();
    } catch {
      return new Set();
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("planner_selected_modules", JSON.stringify(Array.from(manualSelected)));
    } catch {}
  }, [manualSelected]);

  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [displayCode, setDisplayCode] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printMode, setPrintMode] = useState<"eco" | "full">("full");

  useEffect(() => {
    if (activeCode) setDisplayCode(activeCode);
  }, [activeCode]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showCredits, setShowCredits] = useState(false);
  const [programmeCode, setProgrammeCode] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [pendingShare, setPendingShare] = useState<{ code: string; sel: Set<string> } | null>(null);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showPlansMenu, setShowPlansMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Comparison Tray
  const [comparisonCodes, setComparisonCodes] = useState<string[]>([]);
  const [showComparisonDrawer, setShowComparisonDrawer] = useState(false);

  // Module Matchmaker Discovery
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [discoveryState, setDiscoveryState] = useState<DiscoveryState>({
    liked: [],
    disliked: [],
    superliked: [],
    history: [],
  });

  useEffect(() => {
    if (!programmeCode) return;
    try {
      const saved = localStorage.getItem(`planner_discovery_${programmeCode}`);
      if (saved) {
        setDiscoveryState(JSON.parse(saved));
      } else {
        setDiscoveryState({ liked: [], disliked: [], superliked: [], history: [] });
      }
    } catch {
      setDiscoveryState({ liked: [], disliked: [], superliked: [], history: [] });
    }
  }, [programmeCode]);

  useEffect(() => {
    if (!programmeCode) return;
    try {
      localStorage.setItem(`planner_discovery_${programmeCode}`, JSON.stringify(discoveryState));
    } catch {}
  }, [discoveryState, programmeCode]);

  // Recent programmes
  const [recentProgrammes, setRecentProgrammes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("planner_recent_programmes");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // URL SYNC - Load state from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pCode = params.get('programme') || params.get('p');
    const viewParam = params.get('view') as ViewType | null;
    const mod = params.get('module') || params.get('m');
    const q = params.get('q');
    
    if (pCode) {
      // Avoid overwriting state if active plan loaded something else, but here we prioritize URL
      setProgrammeCode(pCode);
    }
    if (viewParam && ["programme", "tree"].includes(viewParam)) {
      setView(viewParam);
    }
    if (mod) {
      setActiveCode(mod);
    }
    if (q) {
      setSearchQuery(q);
    }
    if (params.get('matchmaker') === '1' || params.get('discover') === '1') {
      setIsDiscoveryOpen(true);
    }
    
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setProgrammeCode(params.get('programme') || params.get('p'));
      const viewParam = params.get('view') as ViewType | null;
      setView(viewParam && ["programme", "tree"].includes(viewParam) ? viewParam : "programme");
      setActiveCode(params.get('module'));
      setSearchQuery(params.get('q') || "");
      if (params.get('matchmaker') === '1' || params.get('discover') === '1') {
        setIsDiscoveryOpen(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // URL SYNC - Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let changed = false;
    
    if (programmeCode) {
      if (params.get('programme') !== programmeCode) { params.set('programme', programmeCode); changed = true; }
    } else {
      if (params.has('programme')) { params.delete('programme'); changed = true; }
    }

    if (view !== "programme") {
      if (params.get('view') !== view) { params.set('view', view); changed = true; }
    } else {
      if (params.has('view')) { params.delete('view'); changed = true; }
    }

    if (activeCode) {
      if (params.get('module') !== activeCode) { params.set('module', activeCode); changed = true; }
    } else {
      if (params.has('module')) { params.delete('module'); changed = true; }
    }

    if (searchQuery) {
      if (params.get('q') !== searchQuery) { params.set('q', searchQuery); changed = true; }
    } else {
      if (params.has('q')) { params.delete('q'); changed = true; }
    }

    if (changed) {
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      window.history.pushState({}, '', newUrl);
    }
  }, [programmeCode, view, activeCode, searchQuery]);

  const handleSelectProgramme = (code: string) => {
    setProgrammeCode(code);
    setRecentProgrammes(prev => {
      const next = [code, ...prev.filter(c => c !== code)].slice(0, 6);
      localStorage.setItem("planner_recent_programmes", JSON.stringify(next));
      return next;
    });
  };

  // Multi-Plan Profiles

  const [plans, setPlans] = useState<PlanProfile[]>(() => {
    try {
      const saved = localStorage.getItem("planner_profiles_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(p => ({
            id: p.id || `plan_${Math.random()}`,
            name: p.name || "My Plan",
            programmeCode: p.programmeCode || null,
            selectedModules: Array.isArray(p.selectedModules) ? p.selectedModules : [],
            freeElectives: p.freeElectives && typeof p.freeElectives === "object" ? p.freeElectives : {},
          }));
        }
      }
    } catch {}
    return [{ id: "default", name: "Default Plan", programmeCode: null, selectedModules: [], freeElectives: {} }];
  });

  const [activePlanId, setActivePlanId] = useState<string>(() => {
    return localStorage.getItem("planner_active_profile_id") || "default";
  });

  useEffect(() => {
    localStorage.setItem("planner_profiles_v1", JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem("planner_active_profile_id", activePlanId);
  }, [activePlanId]);

  const switchPlan = (targetPlanId: string) => {
    // save current selections and free electives to active plan first
    setPlans(prev => prev.map(p => p.id === activePlanId ? {
      ...p,
      programmeCode,
      selectedModules: Array.from(isRewindMode ? targetModules : manualSelected),
      freeElectives,
    } : p));

    const target = plans.find(p => p.id === targetPlanId);
    if (target) {
      setActivePlanId(targetPlanId);
      if (target.programmeCode !== programmeCode) {
        setProgrammeCode(target.programmeCode);
      }
      const selSet = new Set(target.selectedModules);
      if (isRewindMode) setTargetModules(selSet);
      else setManualSelected(selSet);
      setFreeElectives(target.freeElectives || {});
    }
    setShowPlansMenu(false);
  };

  const createNewPlan = () => {
    const name = prompt("Name your new plan:", `Plan ${plans.length + 1}`);
    if (!name) return;
    const newId = `plan_${Date.now()}`;
    const newPlan: PlanProfile = {
      id: newId,
      name,
      programmeCode,
      selectedModules: Array.from(isRewindMode ? targetModules : manualSelected),
      freeElectives: { ...freeElectives },
    };
    setPlans(prev => [...prev, newPlan]);
    setActivePlanId(newId);
    setShowPlansMenu(false);
  };

  // Global keyboard shortcuts (Cmd+K for palette, / for module search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(v => !v);
      } else if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName) &&
        !(e.target as HTMLElement)?.isContentEditable
      ) {
        if (programmeCode && searchInputRef.current) {
          e.preventDefault();
          searchInputRef.current.focus();
          setShowSearchDropdown(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [programmeCode]);

  // Load share code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareParam = params.get("share");
    if (shareParam) {
      try {
        const decoded = atob(shareParam);
        const [prog, selStr] = decoded.split("|");
        if (prog) {
          setPendingShare({ code: prog, sel: new Set(selStr ? selStr.split(",") : []) });
        }
      } catch {
        console.error("Invalid share code in URL");
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Live TimeEdit data
  const { modules: rawModules, stageReqs, programme, moduleMap: rawModuleMap, loading, error } = useTimeEdit(programmeCode);

  // Free Elective state (Stage 2+, strictly Max 1 per stage, outside discipline)
  const [freeElectives, setFreeElectives] = useState<Record<number, Module>>(() => {
    try {
      const saved = localStorage.getItem("planner_free_electives");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return {};
  });

  const [freeElectiveModalStage, setFreeElectiveModalStage] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("planner_free_electives", JSON.stringify(freeElectives || {}));
    } catch {}
  }, [freeElectives]);

  // Merge active free electives into modules and moduleMap
  const { modules, moduleMap } = useMemo(() => {
    const activeElectives = (freeElectives && typeof freeElectives === "object")
      ? Object.values(freeElectives).filter(Boolean)
      : [];
    if (activeElectives.length === 0) {
      return { modules: rawModules || [], moduleMap: rawModuleMap || new Map() };
    }

    const seenCodes = new Set((rawModules || []).map(m => m.code));
    const merged = [...(rawModules || [])];
    const map = new Map(rawModuleMap || new Map());

    for (const el of activeElectives) {
      if (el && el.code) {
        if (!seenCodes.has(el.code)) {
          merged.push(el);
          seenCodes.add(el.code);
        }
        map.set(el.code, el);
      }
    }

    return { modules: merged, moduleMap: map };
  }, [rawModules, rawModuleMap, freeElectives]);

  // Extract core module prefixes for discipline similarity checking
  const coreModulePrefixes = useMemo(() => {
    const set = new Set<string>();
    (rawModules || []).forEach(m => {
      if (m && m.code) {
        const p = m.code.substring(0, 3).toUpperCase();
        if (p) set.add(p);
      }
    });
    return Array.from(set);
  }, [rawModules]);

  const handleSelectFreeElective = (stg: number, mod: Module) => {
    setFreeElectives(prev => {
      const next = { ...prev, [stg]: mod };
      setPlans(pList => pList.map(p => p.id === activePlanId ? { ...p, freeElectives: next } : p));
      return next;
    });
    setManualSelected(prev => new Set(prev).add(mod.code));
    if (isRewindMode) {
      setTargetModules(prev => new Set(prev).add(mod.code));
    }
  };

  const handleRemoveFreeElective = (stg: number) => {
    const existing = freeElectives[stg];
    setFreeElectives(prev => {
      const next = { ...prev };
      delete next[stg];
      setPlans(pList => pList.map(p => p.id === activePlanId ? { ...p, freeElectives: next } : p));
      return next;
    });
    if (existing) {
      setManualSelected(prev => {
        const next = new Set(prev);
        next.delete(existing.code);
        return next;
      });
      setTargetModules(prev => {
        const next = new Set(prev);
        next.delete(existing.code);
        return next;
      });
    }
  };

  // Real Exeter student timetable feed & calendar modal
  const timetable = useTimetable();
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [calendarModalTab, setCalendarModalTab] = useState<"calendar" | "manage" | "export">("calendar");

  const handleOpenCalendarModal = (tab: "calendar" | "manage" | "export" = "calendar") => {
    setCalendarModalTab(tab);
    setIsCalendarModalOpen(true);
  };

  // Accessibility, Privacy, Terms, and Cookies Modals
  const [isA11yModalOpen, setIsA11yModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isCookieBannerForced, setIsCookieBannerForced] = useState(false);

  // Initialize accessibility settings on app startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem("exeter_a11y_settings");
      if (saved) {
        applyA11ySettings({ ...DEFAULT_A11Y_SETTINGS, ...JSON.parse(saved) });
      }
    } catch {}
  }, []);

  const [openNavDropdown, setOpenNavDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenNavDropdown(null);
    if (openNavDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openNavDropdown]);

  const selected = useMemo(() => {
    if (!isRewindMode) return manualSelected;
    const computed = new Set(targetModules);
    let added = true;
    while (added) {
      added = false;
      for (const code of Array.from(computed)) {
        const mod = moduleMap.get(code);
        if (mod && mod.prerequisites) {
          for (const prereq of mod.prerequisites) {
            if (!computed.has(prereq)) {
              computed.add(prereq);
              added = true;
            }
          }
        }
      }
    }
    return computed;
  }, [isRewindMode, manualSelected, targetModules, moduleMap]);

  useEffect(() => { setActiveCode(null); }, [programmeCode]);

  function toggleModule(code: string) {
    if (isRewindMode) {
      setTargetModules(prev => {
        const next = new Set(prev);
        if (next.has(code)) next.delete(code); else next.add(code);
        return next;
      });
    } else {
      setManualSelected(prev => {
        const next = new Set(prev);
        if (next.has(code)) next.delete(code); else next.add(code);
        return next;
      });
    }
  }

  const handleToggleCompare = (code: string) => {
    setComparisonCodes(prev => {
      if (prev.includes(code)) {
        return prev.filter(c => c !== code);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 modules simultaneously.");
        return prev;
      }
      setShowComparisonDrawer(true);
      return [...prev, code];
    });
  };

  function viewInTree(code: string) {
    setActiveCode(code);
    setView("tree");
  }

  function exportPlanToCsv() {
    if (!programmeCode) return;
    const chosen = modules.filter(m => m.type === "compulsory" || selected.has(m.code));
    const csvRows = [
      ["Stage", "Module Code", "Title", "Credits", "Term", "Type", "Condonable", "Prerequisites"],
      ...chosen.map(m => [
        m.stage,
        `"${m.code}"`,
        `"${m.title.replace(/"/g, '""')}"`,
        m.credits,
        `"${m.term || 'AUT/SPR'}"`,
        m.isFreeElective ? "Free Elective" : m.type,
        m.condonable ? "Yes" : "Non-condonable",
        `"${m.prerequisites.join("; ")}"`
      ])
    ];
    const content = csvRows.map(r => r.join(",")).join("\n");
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${programme.code || 'exeter'}_study_plan.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  }

  const currentProgramme: Programme = loading
    ? (() => {
        const local = PROGRAMMES.find(p => p.code === programmeCode);
        return local
          ? { code: local.code, title: local.label, totalCredits: 0, dept: "Loading...", faculty: "" }
          : { code: programmeCode ?? "", title: "Loading Programme...", totalCredits: 0, dept: "Fetching...", faculty: "" };
      })()
    : programme;

  const tabs: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: "programme", label: "Course Structure", icon: <List size={14} /> },
    { id: "tree",      label: "Skill Tree", icon: <Network size={14} /> },
  ];

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || !modules.length) return [];
    return modules.filter(m =>
      m.code.toLowerCase().includes(q) ||
      m.title.toLowerCase().includes(q) ||
      (m.description && m.description.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [searchQuery, modules]);

  const activePlan = plans.find(p => p.id === activePlanId) || plans[0] || { id: "default", name: "Default Plan", programmeCode: null, selectedModules: [] };

  return (
    <RewindModeContext.Provider value={{ isRewindMode, setIsRewindMode }}>
      <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground print:h-auto print:overflow-visible">
        <IntroSplash />

        {/* Global Command Palette */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectProgramme={handleSelectProgramme}
          onSelectModule={c => {
            setActiveCode(c);
            setDisplayCode(c);
          }}
          currentModules={modules}
          currentProgrammeCode={programmeCode}
        />

        {/* Module Comparison Drawer */}
        {showComparisonDrawer && comparisonCodes.length > 0 && (
          <ModuleComparisonDrawer
            moduleCodes={comparisonCodes}
            moduleMap={moduleMap}
            selected={selected}
            onToggle={toggleModule}
            onRemove={c => setComparisonCodes(prev => prev.filter(code => code !== c))}
            onClose={() => setShowComparisonDrawer(false)}
          />
        )}

        {showShareModal && (
          <ShareModal
            programmeCode={programmeCode}
            selected={selected}
            onClose={() => setShowShareModal(false)}
            onLoad={(code, sel) => setPendingShare({ code, sel })}
          />
        )}

        {pendingShare && (
          <SharePreviewModal
            pendingShare={pendingShare}
            onConfirm={() => {
              handleSelectProgramme(pendingShare.code);
              if (isRewindMode) setTargetModules(pendingShare.sel);
              else setManualSelected(pendingShare.sel);
              setPendingShare(null);
            }}
            onCancel={() => setPendingShare(null)}
          />
        )}

        {/* ── ELE Top Navigation Bar: Mobile vs Desktop ─────────────────────── */}
        {!isDesktop && !programmeCode ? (
          <header className="shrink-0 bg-[#003C3C] text-white print:hidden shadow-xs z-30 px-4 h-14 flex items-center justify-between">
            <div
              onClick={() => setProgrammeCode(null)}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src="https://www.exeter.ac.uk/v8media/recruitmentsites/images/homepage/uoe-logo.svg"
                alt="University of Exeter"
                className="h-8 w-auto shrink-0"
              />
              <span className="font-bold text-sm tracking-tight text-white">Programme Planner</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleDark}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={() => setOpenNavDropdown(cur => (cur === "mobileMenu" ? null : "mobileMenu"))}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                title="University links & options"
              >
                <Menu size={20} />
              </button>

              {/* Mobile Student Hub Drawer Menu */}
              {openNavDropdown === "mobileMenu" && (
                <div
                  onClick={() => setOpenNavDropdown(null)}
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
                >
                  <div
                    onClick={e => e.stopPropagation()}
                    className="bg-card w-full max-h-[85vh] rounded-t-3xl border-t border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 text-foreground"
                  >
                    <div className="pt-3 pb-2 flex justify-center">
                      <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
                    </div>

                    <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-foreground">Exeter Student Hub</h3>
                        <p className="text-xs text-muted-foreground">Quick access to campus tools & support</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenNavDropdown(null)}
                        className="p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="p-4 overflow-y-auto divide-y divide-border/60 text-sm">
                      <div className="py-2 space-y-1">
                        <a
                          href="https://sid.exeter.ac.uk/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenNavDropdown(null)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors font-semibold text-[#007A6B] dark:text-[#00C4AD]"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Ask SID Online
                          </span>
                          <ExternalLink size={14} />
                        </a>

                        <div
                          onClick={() => {
                            setOpenNavDropdown(null);
                            handleOpenCalendarModal("calendar");
                          }}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors font-semibold text-foreground cursor-pointer"
                        >
                          <span className="flex items-center gap-2.5">
                            <Calendar size={16} className="text-[#00A693]" />
                            MyTimetable & Lecture Sync
                          </span>
                          <span className="text-[10px] font-bold uppercase bg-[#00A693]/20 text-[#00A693] px-2 py-0.5 rounded-full">Sync</span>
                        </div>

                        <a
                          href="https://outlook.office.com/mail/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenNavDropdown(null)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-foreground"
                        >
                          <span>Student Email (Outlook)</span>
                          <ExternalLink size={14} className="opacity-50" />
                        </a>

                        <a
                          href="https://srs.exeter.ac.uk/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenNavDropdown(null)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-foreground"
                        >
                          <span>Student Records System (SRS)</span>
                          <ExternalLink size={14} className="opacity-50" />
                        </a>

                        <a
                          href="https://www.exeter.ac.uk/departments/library/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenNavDropdown(null)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-foreground"
                        >
                          <span>University Library</span>
                          <ExternalLink size={14} className="opacity-50" />
                        </a>

                        <a
                          href="https://www.exeter.ac.uk/wellbeing/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenNavDropdown(null)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-foreground"
                        >
                          <span>Wellbeing Services & Support</span>
                          <ExternalLink size={14} className="opacity-50" />
                        </a>
                      </div>

                      <div className="py-3 space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenNavDropdown(null);
                            setIsA11yModalOpen(true);
                          }}
                          className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors text-xs font-medium text-foreground flex items-center justify-between"
                        >
                          <span>Accessibility Settings</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOpenNavDropdown(null);
                            setIsPrivacyModalOpen(true);
                          }}
                          className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors text-xs font-medium text-foreground flex items-center justify-between"
                        >
                          <span>Privacy Policy</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOpenNavDropdown(null);
                            setIsTermsModalOpen(true);
                          }}
                          className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors text-xs font-medium text-foreground flex items-center justify-between"
                        >
                          <span>Terms of Service</span>
                        </button>
                      </div>

                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenNavDropdown(null);
                            if (confirm("Reset everything to factory default? This will clear local selections, saved plans, recent courses, and calendar cache.")) {
                              try { localStorage.clear(); sessionStorage.clear(); } catch {}
                              window.location.href = window.location.origin + window.location.pathname;
                            }
                          }}
                          className="w-full p-3 rounded-xl hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2"
                        >
                          <Trash2 size={15} />
                          <span>Reset All Local Data</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>
        ) : isDesktop ? (
          <header className="shrink-0 bg-[#003C3C] text-white print:hidden shadow-xs z-30">
          {/* Main Nav Bar */}
          <div className="flex items-center justify-between px-3 sm:px-6 h-[58px] gap-4">
            {/* Left: Brand + Dashboard + View Switcher */}
            <div className="flex items-center h-full gap-2.5 sm:gap-3.5 shrink-0">
              <div
                onClick={() => setProgrammeCode(null)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity shrink-0 py-2"
                title="Return to Programme Planner Dashboard"
              >
                <img
                  src="https://www.exeter.ac.uk/v8media/recruitmentsites/images/homepage/uoe-logo.svg"
                  alt="University of Exeter"
                  className="h-8 w-auto shrink-0"
                />
              </div>

              {/* Dashboard Return Button */}
              <button
                onClick={() => {
                  setProgrammeCode(null);
                  setSelectedCourse(null);
                }}
                className={`h-9 px-3 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                  !programmeCode && !selectedCourse
                    ? "bg-[#00A693] text-white shadow-xs"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                title="Return to Dashboard"
              >
                <LayoutGrid size={14} />
                <span className="hidden xs:inline">Dashboard</span>
              </button>

              {/* Active Course Hub Pill in Header */}
              {selectedCourse && (
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-xl text-white text-xs font-mono font-bold">
                  <span>{selectedCourse.code}</span>
                  <span className="hidden sm:inline font-sans font-normal opacity-80">· {selectedCourse.title}</span>
                </div>
              )}

              {/* View Switcher: Course Structure & Skill Tree & Matchmaker (shown when programme is active) */}
              {programmeCode && (
                <div className="flex items-center bg-black/25 p-1 rounded-xl border border-white/10 gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setView("programme")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      view === "programme"
                        ? "bg-[#00A693] text-white shadow-xs"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <List size={13} />
                    <span>Course Structure</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("tree")}
                    className={`hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-bold transition-all items-center gap-1.5 cursor-pointer ${
                      view === "tree"
                        ? "bg-[#00A693] text-white shadow-xs"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Network size={13} />
                    <span>Skill Tree</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDiscoveryOpen(true)}
                    className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-bold transition-all items-center gap-1.5 cursor-pointer bg-gradient-to-r from-[#00A693] to-teal-500 hover:opacity-90 text-white shadow-xs"
                    title="Open Tinder-style Module Matchmaker"
                  >
                    <Sparkles size={13} />
                    <span>Matchmaker</span>
                    {discoveryState.liked.length > 0 && (
                      <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                        {discoveryState.liked.length}
                      </span>
                    )}
                  </button>
                </div>
              )}

              {/* ELE Main Menu Links (shown on dashboard) */}
              {!programmeCode && (
                <nav className="hidden lg:flex items-center h-full text-[13px] font-normal text-white">

                {/* 2. ELE Support ▾ */}
                <div className="relative h-full flex items-center">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setOpenNavDropdown(cur => (cur === "support" ? null : "support"));
                    }}
                    className={`h-full px-2.5 flex items-center gap-1 hover:bg-white/10 hover:text-white transition-colors cursor-pointer ${
                      openNavDropdown === "support" ? "bg-white/10 text-white" : "text-white"
                    }`}
                  >
                    <span>ELE Support</span>
                    <span className="text-[11px] opacity-70">▾</span>
                  </button>
                  {openNavDropdown === "support" && (
                    <div
                      onClick={e => e.stopPropagation()}
                      className="absolute left-0 top-full mt-1 w-64 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 text-foreground text-[13.5px]"
                    >
                      <div className="px-4 py-1.5 font-bold text-muted-foreground uppercase text-[10.5px] border-b border-border/60">
                        ELE Support
                      </div>
                      <div className="py-1">
                        <a
                          href="https://ele.exeter.ac.uk/course/view.php?id=27644"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenNavDropdown(null)}
                          className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group"
                        >
                          <span>Student Support</span>
                          <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a
                          href="https://ele.exeter.ac.uk/course/view.php?id=4956"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenNavDropdown(null)}
                          className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group"
                        >
                          <span>Staff Support</span>
                          <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Library (direct link) */}
                <a
                  href="https://www.exeter.ac.uk/departments/library/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full px-2.5 flex items-center text-[14.5px] font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Library
                </a>

                {/* 4. Daily Tools ▾ */}
                <div className="relative h-full flex items-center">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setOpenNavDropdown(cur => (cur === "dailyTools" ? null : "dailyTools"));
                    }}
                    className={`h-full px-2.5 flex items-center gap-1 hover:bg-white/10 hover:text-white transition-colors cursor-pointer ${
                      openNavDropdown === "dailyTools" ? "bg-white/10 text-white" : "text-white"
                    }`}
                  >
                    <span>Daily Tools</span>
                    <span className="text-[11px] opacity-70">▾</span>
                  </button>
                  {openNavDropdown === "dailyTools" && (
                    <div
                      onClick={e => e.stopPropagation()}
                      className="absolute left-0 top-full mt-1 w-64 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 text-foreground text-[13.5px]"
                    >
                      <div className="px-4 py-1.5 font-bold text-muted-foreground uppercase text-[10.5px] border-b border-border/60">
                        Daily Tools
                      </div>
                      <div className="py-1">
                        {[
                          { label: "Outlook", href: "https://outlook.office.com/mail/" },
                          { label: "Timetable", href: "https://mytimetable.exeter.ac.uk/schedule", isTimetable: true },
                          { label: "Student Records", href: "https://srs.exeter.ac.uk/" },
                          { label: "SID Online", href: "https://sid.exeter.ac.uk/Login/login" },
                          { label: "Print on campus", href: "https://www.exeter.ac.uk/departments/it/howdoi/printing/" },
                          { label: "File Converter", href: "https://libguides.exeter.ac.uk/accessibility/SensusAccess" },
                        ].map(item =>
                          item.isTimetable ? (
                            <div
                              key={item.label}
                              onClick={() => {
                                setOpenNavDropdown(null);
                                handleOpenCalendarModal("calendar");
                              }}
                              className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span>{item.label}</span>
                                <span className="text-[9.5px] uppercase font-bold text-white bg-[#007A6B] dark:bg-[#00A693] px-1.5 py-0.5 rounded">Sync</span>
                              </div>
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                title="Open MyTimetable in new tab"
                              >
                                <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                              </a>
                            </div>
                          ) : (
                            <a
                              key={item.label}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpenNavDropdown(null)}
                              className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group"
                            >
                              <span>{item.label}</span>
                              <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Studying ▾ */}
                <div className="relative h-full flex items-center">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setOpenNavDropdown(cur => (cur === "studying" ? null : "studying"));
                    }}
                    className={`h-full px-2.5 flex items-center gap-1 hover:bg-white/10 hover:text-white transition-colors cursor-pointer ${
                      openNavDropdown === "studying" ? "bg-white/10 text-white" : "text-white"
                    }`}
                  >
                    <span>Studying</span>
                    <span className="text-[11px] opacity-70">▾</span>
                  </button>
                  {openNavDropdown === "studying" && (
                    <div
                      onClick={e => e.stopPropagation()}
                      className="absolute left-0 top-full mt-1 w-72 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 text-foreground text-[13.5px] max-h-[80vh] overflow-y-auto"
                    >
                      <div className="px-4 py-1.5 font-bold text-muted-foreground uppercase text-[10.5px] border-b border-border/60">
                        Studying
                      </div>
                      <div className="py-1">
                        {[
                          { label: "Info Points and Hubs", href: "https://www.exeter.ac.uk/students/infopoints/" },
                          { label: "Help with English", href: "https://universityofexeteruk.sharepoint.com/sites/GuidedIndependentLearningTheInsessionalteam" },
                          { label: "Past Exam Papers", href: "https://library.exeter.ac.uk/exampapers" },
                          { label: "Accelerate", href: "https://accelerate.exeter.ac.uk/" },
                          { label: "Study Skills", href: "https://libguides.exeter.ac.uk/skills" },
                          { label: "Academic Honesty", href: "https://libguides.exeter.ac.uk/academichonesty" },
                          { label: "Referencing", href: "https://libguides.exeter.ac.uk/referencing" },
                          { label: "GenAI Guidance", href: "https://libguides.exeter.ac.uk/referencing/generativeai" },
                        ].map(item => (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpenNavDropdown(null)}
                            className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group"
                          >
                            <span>{item.label}</span>
                            <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Student Life ▾ */}
                <div className="relative h-full flex items-center">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setOpenNavDropdown(cur => (cur === "studentLife" ? null : "studentLife"));
                    }}
                    className={`h-full px-2.5 flex items-center gap-1 hover:bg-white/10 hover:text-white transition-colors cursor-pointer ${
                      openNavDropdown === "studentLife" ? "bg-white/10 text-white" : "text-white"
                    }`}
                  >
                    <span>Student Life</span>
                    <span className="text-[11px] opacity-70">▾</span>
                  </button>
                  {openNavDropdown === "studentLife" && (
                    <div
                      onClick={e => e.stopPropagation()}
                      className="absolute left-0 top-full mt-1 w-64 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 text-foreground text-[13.5px]"
                    >
                      <div className="px-4 py-1.5 font-bold text-muted-foreground uppercase text-[10.5px] border-b border-border/60">
                        Student Life
                      </div>
                      <div className="py-1">
                        {[
                          { label: "Student Voice", href: "https://www.exeter.ac.uk/students/yourvoice/" },
                          { label: "Student Guild (Exeter)", href: "https://www.exeterguild.com/acrep" },
                          { label: "Student Union (Cornwall)", href: "https://www.thesu.org.uk/findmyrep" },
                          { label: "Students Homepage", href: "https://www.exeter.ac.uk/students/" },
                          { label: "Career Support", href: "https://www.exeter.ac.uk/careers/" },
                        ].map(item => (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpenNavDropdown(null)}
                            className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group"
                          >
                            <span>{item.label}</span>
                            <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 7. Wellbeing ▾ */}
                <div className="relative h-full flex items-center">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setOpenNavDropdown(cur => (cur === "wellbeing" ? null : "wellbeing"));
                    }}
                    className={`h-full px-2.5 flex items-center gap-1 hover:bg-white/10 hover:text-white transition-colors cursor-pointer ${
                      openNavDropdown === "wellbeing" ? "bg-white/10 text-white" : "text-white"
                    }`}
                  >
                    <span>Wellbeing</span>
                    <span className="text-[11px] opacity-70">▾</span>
                  </button>
                  {openNavDropdown === "wellbeing" && (
                    <div
                      onClick={e => e.stopPropagation()}
                      className="absolute left-0 top-full mt-1 w-72 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 text-foreground text-[13.5px]"
                    >
                      <div className="px-4 py-1.5 font-bold text-muted-foreground uppercase text-[10.5px] border-b border-border/60">
                        Wellbeing
                      </div>
                      <div className="py-1">
                        {[
                          { label: "Wellbeing Services", href: "https://www.exeter.ac.uk/wellbeing/" },
                          { label: "Support & Report", href: "https://www.exeter.ac.uk/students/support-report/" },
                          { label: "Online Self-Help", href: "https://www.exeter.ac.uk/students/wellbeing/devon/resources/takingcareofyourwellbeing/" },
                          { label: "Wellbeing Toolkit", href: "https://ele.exeter.ac.uk/course/view.php?id=7295" },
                          { label: "Book a wellbeing appointment", href: "https://www.exeter.ac.uk/students/wellbeing/devon/contact/makeanappointment/" },
                        ].map(item => (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpenNavDropdown(null)}
                            className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group"
                          >
                            <span>{item.label}</span>
                            <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            )}
            </div>

            {/* Centre: Top Module Search Bar (when programme is loaded) */}
            {programmeCode && (
              <div ref={searchContainerRef} className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  placeholder="Search modules (e.g. MTH1001, Analysis)..."
                  className="w-full pl-8 pr-16 py-1.5 bg-black/25 hover:bg-black/35 focus:bg-black/45 border border-white/15 focus:border-[#00C4AD] rounded-xl text-xs text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#00C4AD] transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setShowSearchDropdown(false);
                      }}
                      className="p-1 text-white/60 hover:text-white rounded-md transition-colors"
                      title="Clear search"
                    >
                      <X size={12} />
                    </button>
                  )}
                  <kbd className="hidden md:inline-block text-[10px] font-mono font-semibold bg-white/10 text-white/70 px-1.5 py-0.5 rounded border border-white/15" title="Press / to focus">
                    /
                  </kbd>
                </div>

                {/* Live Module Quick Search Results Dropdown */}
                {showSearchDropdown && searchQuery.trim() && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-card border border-border rounded-xl shadow-xl py-1.5 z-50 text-foreground overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[10.5px] font-bold text-muted-foreground uppercase border-b border-border/50 flex items-center justify-between">
                      <span>Matching Modules ({searchResults.length})</span>
                      <span className="text-[10px] lowercase text-muted-foreground font-normal">click to view</span>
                    </div>
                    {searchResults.length === 0 ? (
                      <div className="px-3 py-4 text-center text-xs text-muted-foreground">
                        No modules found matching &ldquo;{searchQuery}&rdquo;
                      </div>
                    ) : (
                      <div className="max-h-64 overflow-y-auto divide-y divide-border/40">
                        {searchResults.map(m => (
                          <button
                            key={m.code}
                            type="button"
                            onClick={() => {
                              setActiveCode(m.code);
                              setDisplayCode(m.code);
                              setShowSearchDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-muted/60 transition-colors flex items-center justify-between group cursor-pointer"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-mono font-bold text-[#007A6B] dark:text-[#00C4AD]">{m.code}</span>
                                <span className="text-[10px] text-muted-foreground">Year {m.stage}</span>
                                {!m.condonable && (
                                  <span className="text-[9.5px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-1 rounded">Non-cond.</span>
                                )}
                              </div>
                              <p className="text-xs font-medium text-foreground truncate group-hover:text-[#007A6B] dark:group-hover:text-[#00C4AD]">
                                {m.title}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-foreground">{m.credits}</span>
                              <span className="text-[10px] text-muted-foreground ml-0.5">cr</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Right: Quick actions & ELE Profile */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Compare Button */}
              {comparisonCodes.length > 0 && (
                <button
                  onClick={() => setShowComparisonDrawer(v => !v)}
                  className="px-3 py-1.5 rounded-md bg-[#00A693] text-white text-[13px] font-bold flex items-center gap-1.5 hover:bg-[#008f7e] transition-colors shadow-xs"
                >
                  <Scale size={14} />
                  <span>Compare ({comparisonCodes.length})</span>
                </button>
              )}

              {/* Plans Profile Menu */}
              {programmeCode && (
                <div className="relative">
                  <button
                    onClick={() => setShowPlansMenu(v => !v)}
                    className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-white text-[13px] font-semibold flex items-center gap-1.5 transition-colors border border-white/15"
                  >
                    <Bookmark size={14} className="text-[#00C4AD]" />
                    <span className="hidden sm:inline max-w-[120px] truncate">{activePlan.name}</span>
                    <ChevronDown size={13} className="opacity-70" />
                  </button>
                  {showPlansMenu && (
                    <div className="absolute right-0 top-full mt-1.5 w-56 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 text-[13px] text-foreground">
                      <div className="px-3.5 py-1.5 font-bold text-muted-foreground uppercase text-[10.5px] border-b border-border/60">
                        Saved Study Plans
                      </div>
                      {plans.map(p => (
                        <button
                          key={p.id}
                          onClick={() => switchPlan(p.id)}
                          className={`w-full text-left px-3.5 py-2 hover:bg-muted transition-colors flex items-center justify-between ${
                            p.id === activePlanId ? "font-bold text-[#00A693]" : ""
                          }`}
                        >
                          <span className="truncate">{p.name}</span>
                          {p.id === activePlanId && <Check size={14} />}
                        </button>
                      ))}
                      <div className="border-t border-border/60 pt-1.5 mt-1">
                        <button
                          onClick={createNewPlan}
                          className="w-full text-left px-3.5 py-2 hover:bg-muted text-[#00A693] font-semibold flex items-center gap-2"
                        >
                          <Plus size={14} /> + New Plan
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Export Menu */}
              {programmeCode && (
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(v => !v)}
                    className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-white text-[13px] font-semibold flex items-center gap-1.5 transition-colors border border-white/15"
                  >
                    <Download size={14} className="text-[#00C4AD]" />
                    <span className="hidden sm:inline">Export</span>
                    <ChevronDown size={13} className="opacity-70" />
                  </button>
                  {showExportMenu && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 text-[13px] text-foreground">
                      <button
                        onClick={() => {
                          setShowExportMenu(false);
                          setShowPrintModal(true);
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-muted transition-colors flex items-center gap-2.5"
                      >
                        <Printer size={14} /> Export to PDF
                      </button>
                      <button
                        onClick={exportPlanToCsv}
                        className="w-full text-left px-3.5 py-2 hover:bg-muted transition-colors flex items-center gap-2.5"
                      >
                        <FileSpreadsheet size={14} /> Download CSV
                      </button>
                      <button
                        onClick={() => {
                          setShowExportMenu(false);
                          setShowShareModal(true);
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-muted transition-colors flex items-center gap-2.5"
                      >
                        <Share2 size={14} /> Share Link
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Clear Selections */}
              {programmeCode && (
                <button
                  onClick={() => {
                    if (confirm("Reset all selected modules for this plan?")) {
                      if (isRewindMode) setTargetModules(new Set());
                      else setManualSelected(new Set());
                    }
                  }}
                  className="p-2 rounded-md hover:bg-white/10 text-white/70 hover:text-[#ff6b6b] transition-colors"
                  title="Clear all selected modules"
                >
                  <Trash2 size={16} />
                </button>
              )}

              {/* Dark mode */}
              <button
                onClick={toggleDark}
                className="p-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {/* ELE Right Cluster: Student Avatar Dropdown matching ELE (white circle, dark teal letters 'SO', with chevron) */}
              <div className="relative pl-1 sm:pl-2 border-l border-white/20">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setOpenNavDropdown(cur => (cur === "profile" ? null : "profile"));
                  }}
                  className="flex items-center gap-1.5 p-1 rounded-md hover:bg-white/10 cursor-pointer group transition-colors"
                  title="Exeter Student Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-[#003C3C] flex items-center justify-center font-bold text-xs shadow-xs select-none">
                    <User size={16} />
                  </div>
                  <ChevronDown size={12} className="text-white group-hover:text-white transition-colors" />
                </button>

                {openNavDropdown === "profile" && (
                  <div
                    onClick={e => e.stopPropagation()}
                    className="absolute right-0 top-full mt-1.5 w-56 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 text-foreground text-[13px]"
                  >
                    <div className="px-4 py-2 border-b border-border/60 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#003C3C] text-white flex items-center justify-center font-bold text-xs">
                        <User size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-foreground text-[13px] truncate">Student User</div>
                        <div className="text-[11px] text-muted-foreground truncate">University of Exeter</div>
                      </div>
                    </div>
                    <div className="py-1">
                      <a
                        href="https://ele.exeter.ac.uk/user/profile.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpenNavDropdown(null)}
                        className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group"
                      >
                        <span>Profile</span>
                        <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <a
                        href="https://ele.exeter.ac.uk/user/preferences.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpenNavDropdown(null)}
                        className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group"
                      >
                        <span>Preferences</span>
                        <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <div className="border-t border-border/60 my-1" />
                      <button
                        type="button"
                        onClick={() => {
                          setOpenNavDropdown(null);
                          setIsA11yModalOpen(true);
                        }}
                        className="w-full px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between text-left text-xs font-medium cursor-pointer"
                      >
                        <span>Accessibility Settings</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenNavDropdown(null);
                          setIsPrivacyModalOpen(true);
                        }}
                        className="w-full px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between text-left text-xs font-medium cursor-pointer"
                      >
                        <span>Privacy Policy</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenNavDropdown(null);
                          setIsTermsModalOpen(true);
                        }}
                        className="w-full px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between text-left text-xs font-medium cursor-pointer"
                      >
                        <span>Terms of Service</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenNavDropdown(null);
                          setIsCookieBannerForced(true);
                        }}
                        className="w-full px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between text-left text-xs font-medium cursor-pointer"
                      >
                        <span>Cookie Preferences</span>
                      </button>
                      <div className="border-t border-border/60 my-1" />
                      <button
                        type="button"
                        onClick={() => {
                          setOpenNavDropdown(null);
                          if (confirm("Reset everything to factory default? This will completely clear all local selections, saved plans, recent programmes, calendar feeds, and cookies.")) {
                            try {
                              localStorage.clear();
                              sessionStorage.clear();
                            } catch {}
                            window.location.href = window.location.origin + window.location.pathname;
                          }
                        }}
                        className="w-full px-4 py-2 hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors flex items-center justify-between text-left text-xs font-medium cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Trash2 size={13} />
                          <span>Reset to Factory Default</span>
                        </span>
                      </button>
                      <div className="border-t border-border/60 my-1" />
                      <a
                        href="https://ele.exeter.ac.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpenNavDropdown(null)}
                        className="px-4 py-2 hover:bg-muted text-foreground hover:text-[#007A6B] dark:hover:text-[#00C4AD] transition-colors flex items-center justify-between group font-medium"
                      >
                        <span>ELE</span>
                        <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      ) : null}

        {/* ── Body ─────────────────────────────────────────────────── */}
        <div className="flex-1 flex overflow-hidden print:hidden">
          {/* Landing page: authentic ELE dashboard with all 1,245 programmes */}
          {!programmeCode && !selectedCourse && (
            <EleDashboardHero
              onSelectProgramme={handleSelectProgramme}
              onSelectCourse={course => setSelectedCourse(course)}
              recentProgrammes={recentProgrammes}
              timetableEvents={timetable.events}
              onOpenCalendarModal={handleOpenCalendarModal}
              onOpenAccessibility={() => setIsA11yModalOpen(true)}
              onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
              onOpenTerms={() => setIsTermsModalOpen(true)}
              onOpenCookies={() => setIsCookieBannerForced(true)}
            />
          )}

          {/* Dedicated ELE Module Course Hub */}
          {!programmeCode && selectedCourse && (
            <EleCourseView
              course={selectedCourse}
              onBack={() => setSelectedCourse(null)}
              onOpenPdf={(url, title, secondaryUrl, secondaryTitle) => {
                setActivePdfReader({ url, title, secondaryUrl, secondaryTitle });
              }}
              onOpenCalendarModal={handleOpenCalendarModal}
            />
          )}

          {/* Loading state */}
          {programmeCode && loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-background">
              <div className="w-10 h-10 rounded-full border-4 border-[#00A693] border-t-transparent animate-spin" />
              <p className="text-sm font-semibold text-muted-foreground">Loading programme data…</p>
              <p className="text-xs text-muted-foreground/60">Fetching from TimeEdit · {API_YEAR}</p>
            </div>
          )}

          {/* Error state */}
          {programmeCode && !loading && error && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-background text-center px-8">
              <AlertCircle size={36} className="text-destructive" />
              <div>
                <p className="text-base font-bold text-foreground mb-1">Could not load programme</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <button
                onClick={() => setProgrammeCode(c => c)}
                className="px-4 py-2 bg-[#003C3C] text-white rounded text-xs font-semibold hover:bg-[#00524d] transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Main Planner View */}
          {programmeCode && !loading && !error && (
            <>
              {isDesktop ? (
                <>
                  {/* Left Sidebar: Term Balance & Workload Advisor */}
                  <div className="w-80 shrink-0 border-r border-border bg-sidebar overflow-y-auto">
                    <TermBalanceAdvisor
                      sel={selected}
                      programme={currentProgramme}
                      modules={modules}
                      stageReqs={stageReqs}
                    />
                  </div>

                  {/* Centre Workspace */}
                  <div className="flex-1 overflow-y-auto bg-[#f4f4f4] dark:bg-background">
                    {view === "programme" && (
                      <ProgrammeView
                        sel={selected}
                        onToggle={toggleModule}
                        onSelect={setActiveCode}
                        programme={currentProgramme}
                        modules={modules}
                        moduleMap={moduleMap}
                        stageReqs={stageReqs}
                        onAddToCompare={handleToggleCompare}
                        comparisonCodes={comparisonCodes}
                        searchQuery={searchQuery}
                        onSearchQuery={setSearchQuery}
                        freeElectives={freeElectives}
                        onOpenFreeElectiveModal={(stg) => setFreeElectiveModalStage(stg)}
                        onRemoveFreeElective={handleRemoveFreeElective}
                        onOpenDiscovery={() => setIsDiscoveryOpen(true)}
                        discoveryLikes={new Set(discoveryState.liked)}
                      />
                    )}
                    {view === "tree" && (
                      <div className="flex h-full">
                        <SkillTreeView
                          sel={selected}
                          onToggle={toggleModule}
                          activeCode={activeCode}
                          onSelect={setActiveCode}
                          modules={modules}
                          moduleMap={moduleMap}
                          stageReqs={stageReqs}
                        />
                      </div>
                    )}
                  </div>

                  {/* Detail Panel */}
                  <div
                    className={`border-l border-border bg-sidebar overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${
                      activeCode ? "w-[460px] opacity-100" : "w-0 opacity-0 border-none"
                    }`}
                  >
                    <div className="w-[460px] h-full flex flex-col">
                      {displayCode && (
                        <DetailPanel
                          modCode={displayCode}
                          sel={selected}
                          onToggle={toggleModule}
                          onClose={() => setActiveCode(null)}
                          onViewTree={() => viewInTree(displayCode)}
                          onSelectMod={setActiveCode}
                          moduleMap={moduleMap}
                          stageReqs={stageReqs}
                          modules={modules}
                          onAddToCompare={handleToggleCompare}
                          isCompared={comparisonCodes.includes(displayCode)}
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <MobilePlannerView
                  sel={selected}
                  onToggle={toggleModule}
                  onSelect={setActiveCode}
                  activeCode={activeCode}
                  onCloseActive={() => setActiveCode(null)}
                  programme={currentProgramme}
                  modules={modules}
                  moduleMap={moduleMap}
                  stageReqs={stageReqs}
                  onAddToCompare={handleToggleCompare}
                  comparisonCodes={comparisonCodes}
                  freeElectives={freeElectives}
                  onOpenFreeElectiveModal={stg => setFreeElectiveModalStage(stg)}
                  onRemoveFreeElective={handleRemoveFreeElective}
                  onBackToDashboard={() => setProgrammeCode(null)}
                  plans={plans}
                  activePlanId={activePlanId}
                  onSwitchPlan={switchPlan}
                  onCreatePlan={createNewPlan}
                  onExportPdf={() => {
                    setPrintMode("full");
                    setShowPrintModal(false);
                    setTimeout(() => window.print(), 300);
                  }}
                  onExportCsv={exportPlanToCsv}
                  onShare={() => setShowShareModal(true)}
                  onResetPlan={() => {
                    if (confirm("Reset all selected modules for this plan?")) {
                      if (isRewindMode) setTargetModules(new Set());
                      else setManualSelected(new Set());
                    }
                  }}
                  timetableEvents={timetable.events}
                  onOpenTimetableModal={() => handleOpenCalendarModal("calendar")}
                  dark={dark}
                  onToggleDark={toggleDark}
                  onOpenDiscoveryModal={() => setIsDiscoveryOpen(true)}
                  discoveryLikes={new Set(discoveryState.liked)}
                />
              )}
            </>
          )}
        </div>

        {/* Print Options Modal */}
        {showPrintModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
            <div className="bg-card w-full max-w-md rounded shadow-xl overflow-hidden border border-border">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h2 className="text-lg font-bold text-foreground">Print / Export PDF</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Choose layout style for printable report.</p>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setPrintMode("eco");
                    setShowPrintModal(false);
                    setTimeout(() => window.print(), 300);
                  }}
                  className="flex flex-col items-center gap-2.5 p-4 rounded border-2 border-border hover:border-primary/50 bg-background hover:bg-muted/40 transition-all text-left"
                >
                  <div className="w-full aspect-[1/1.414] bg-white border border-gray-200 rounded shadow-2xs flex flex-col p-2">
                    <div className="w-4 h-4 rounded-full border border-gray-300 mb-2" />
                    <div className="w-full h-1 bg-gray-200 rounded mb-1" />
                    <div className="w-2/3 h-1 bg-gray-200 rounded" />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-bold text-foreground">Eco Print</span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">White Cover</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setPrintMode("full");
                    setShowPrintModal(false);
                    setTimeout(() => window.print(), 300);
                  }}
                  className="flex flex-col items-center gap-2.5 p-4 rounded border-2 border-border hover:border-[#00A693]/50 bg-background hover:bg-muted/40 transition-all text-left"
                >
                  <div className="w-full aspect-[1/1.414] bg-[#00A693] rounded shadow-2xs flex flex-col p-2">
                    <div className="w-4 h-4 rounded-full border border-white/50 mb-2" />
                    <div className="w-full h-1 bg-white/50 rounded mb-1" />
                    <div className="w-2/3 h-1 bg-white/50 rounded" />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-bold text-foreground">Full Colour</span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">Exeter Green</span>
                  </div>
                </button>
              </div>
              <div className="px-6 py-3 bg-muted/20 border-t border-border flex justify-end">
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {programmeCode && (
          <PrintView
            programme={currentProgramme}
            modules={modules}
            stageReqs={stageReqs}
            selected={selected}
            printMode={printMode}
          />
        )}

        {/* Exeter Student MyTimetable Synchronization & Calendar Modal */}
        <TimetableCalendarModal
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
          initialTab={calendarModalTab}
          events={timetable.events}
          loading={timetable.loading}
          lastSync={timetable.lastSync}
          icsUrl={timetable.icsUrl}
          onUpdateIcsUrl={timetable.updateIcsUrl}
          onSyncNow={timetable.syncNow}
        />

        {/* Global Floating Accessibility button when inside a programme view */}
        {programmeCode && (
          <div className="fixed bottom-6 right-6 z-30 print:hidden">
            <button
              type="button"
              onClick={() => setIsA11yModalOpen(true)}
              className="w-12 h-12 rounded-full bg-[#00C4AD] hover:bg-[#00A693] text-[#003C3C] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
              title="Exeter Accessibility Settings and Options"
            >
              <Accessibility size={24} className="stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* Module Matchmaker Discovery Modal */}
        <ModuleDiscoveryModal
          isOpen={isDiscoveryOpen}
          onClose={() => setIsDiscoveryOpen(false)}
          modules={modules}
          moduleMap={moduleMap}
          stageReqs={stageReqs}
          programme={currentProgramme}
          selectedModules={selected}
          onApplyToPlan={(newSel) => {
            setSelected(newSel);
            setManualSelected(newSel);
          }}
          discoveryState={discoveryState}
          onUpdateDiscoveryState={setDiscoveryState}
        />

        {/* Accessibility Settings Modal */}
        <AccessibilityModal
          isOpen={isA11yModalOpen}
          onClose={() => setIsA11yModalOpen(false)}
        />

        {/* Privacy Policy Modal */}
        <PrivacyPolicyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />

        {/* Terms of Service Modal */}
        <TermsModal
          isOpen={isTermsModalOpen}
          onClose={() => setIsTermsModalOpen(false)}
        />

        {/* Free Elective Picker Modal */}
        <FreeElectiveModal
          isOpen={freeElectiveModalStage !== null}
          onClose={() => setFreeElectiveModalStage(null)}
          stage={freeElectiveModalStage ?? 2}
          programmeTitle={currentProgramme.title}
          programmeDept={currentProgramme.dept}
          coreModulePrefixes={coreModulePrefixes}
          currentElective={freeElectiveModalStage ? freeElectives[freeElectiveModalStage] || null : null}
          onSelectElective={handleSelectFreeElective}
          onRemoveElective={handleRemoveFreeElective}
        />

        {/* Exeter In-App PDF Reader & Presentation Engine */}
        {activePdfReader && (
          <ExeterPdfReader
            url={activePdfReader.url}
            title={activePdfReader.title}
            secondaryUrl={activePdfReader.secondaryUrl}
            secondaryTitle={activePdfReader.secondaryTitle}
            onClose={() => setActivePdfReader(null)}
          />
        )}

        {/* Cookie Consent Banner */}
        <CookieBanner
          onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
          onOpenTerms={() => setIsTermsModalOpen(true)}
          forceShow={isCookieBannerForced}
          onDismissForce={() => setIsCookieBannerForced(false)}
        />
      </div>
    </RewindModeContext.Provider>
  );
}
