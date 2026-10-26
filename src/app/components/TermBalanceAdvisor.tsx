import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Clock, ChevronDown, ChevronUp, Scale, ShieldAlert } from "lucide-react";
import type { Module, StageReq, Programme } from "../../api/timeedit";

interface TermBalanceAdvisorProps {
  sel: Set<string>;
  programme: Programme;
  modules: Module[];
  stageReqs: StageReq[];
  compact?: boolean;
}

export function getStageCreditBreakdown(stage: number, sel: Set<string>, modules: Module[]) {
  const selectedMods = modules.filter(
    m => m.stage === stage && (m.type === "compulsory" || sel.has(m.code))
  );

  let term1 = 0;
  let term2 = 0;
  let other = 0;
  let fullYearCredits = 0;

  selectedMods.forEach(m => {
    if (m.term === "AUT") {
      term1 += m.credits;
    } else if (m.term === "SPR") {
      term2 += m.credits;
    } else if (m.term === "AUTSPR" || m.term === "FULL" || m.term === "") {
      // Full year modules at Exeter run across both terms (50% Autumn / 50% Spring)
      term1 += m.credits / 2;
      term2 += m.credits / 2;
      fullYearCredits += m.credits;
    } else {
      other += m.credits;
    }
  });

  const isAllNonCondonable = selectedMods.length > 0 && selectedMods.every(m => !m.condonable);
  const nonCondonableCredits = selectedMods.filter(m => !m.condonable).reduce((s, m) => s + m.credits, 0);

  return {
    total: term1 + term2 + other,
    term1,
    term2,
    other,
    fullYearCredits,
    isAllNonCondonable,
    nonCondonableCredits,
    count: selectedMods.length,
  };
}

export const TermBalanceAdvisor: React.FC<TermBalanceAdvisorProps> = ({
  sel,
  programme,
  modules,
  stageReqs,
  compact = false,
}) => {
  const stages = stageReqs.length > 0 ? stageReqs.map(r => r.stage) : [1, 2, 3, 4];
  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>({ 1: true, 2: true, 3: true, 4: true });

  const totalSelected = stages.reduce((s, st) => s + getStageCreditBreakdown(st, sel, modules).total, 0);
  const targetTotal = programme.totalCredits || stages.length * 120;
  const overallPercentage = Math.min(100, Math.round((totalSelected / Math.max(1, targetTotal)) * 100));

  if (compact) {
    return (
      <div className="px-4 py-2.5 bg-card border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale size={15} className="text-[#00A693]" />
          <span className="text-xs font-semibold text-foreground">
            {totalSelected} / {targetTotal} credits ({overallPercentage}%)
          </span>
        </div>
        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00A693] transition-all duration-300"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Header Widget */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Degree Progress
          </span>
          <span className="text-xs font-bold text-[#00A693]">{overallPercentage}%</span>
        </div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-black text-foreground tabular-nums">{totalSelected}</span>
          <span className="text-xs text-muted-foreground font-semibold">/ {targetTotal} credits</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#003C3C] transition-all duration-500"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* Stage Breakdown & Balance Meter */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Scale size={13} className="text-[#00A693]" />
            Workload & Term Balance
          </h4>

          <div className="space-y-3">
            {stages.map(stage => {
              const req = stageReqs.find(r => r.stage === stage);
              const stageRequired = req?.totalRequired ?? 120;
              const breakdown = getStageCreditBreakdown(stage, sel, modules);
              const isComplete = breakdown.total >= stageRequired;
              const isOver = breakdown.total > stageRequired;
              const isExpanded = expandedStages[stage] ?? true;

              // Term imbalance detection (Exeter standard is 60 Term 1 / 60 Term 2)
              const hasImbalance = stageRequired === 120 && (breakdown.term1 > 65 || breakdown.term2 > 65);

              return (
                <div
                  key={stage}
                  className="bg-card rounded-xl border border-border overflow-hidden transition-all shadow-2xs"
                >
                  {/* Stage Summary Line */}
                  <div
                    onClick={() =>
                      setExpandedStages(prev => ({ ...prev, [stage]: !prev[stage] }))
                    }
                    className="p-3 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                          isComplete && !isOver
                            ? breakdown.isAllNonCondonable
                              ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white ring-1 ring-amber-400/40 shadow-xs"
                              : "bg-[#00A693] text-white"
                            : isOver
                            ? "bg-destructive text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Y{stage}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs font-bold text-foreground">
                            {req?.label || `Year ${stage}`}
                          </p>
                          {breakdown.isAllNonCondonable && (
                            <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-1.5 py-0.2 rounded-full border border-amber-500/30">
                              <ShieldAlert size={9} /> Non-cond.
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {breakdown.total} / {stageRequired} credits
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isComplete && !isOver && (
                        breakdown.isAllNonCondonable ? (
                          <span title="100% Non-condonable stage satisfied">
                            <CheckCircle2 size={15} className="text-amber-500" />
                          </span>
                        ) : (
                          <CheckCircle2 size={15} className="text-[#00A693]" />
                        )
                      )}
                      {isOver && (
                        <AlertCircle size={15} className="text-destructive" />
                      )}
                      {isExpanded ? (
                        <ChevronUp size={14} className="text-muted-foreground" />
                      ) : (
                        <ChevronDown size={14} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Term Details */}
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-border/60 bg-muted/20 space-y-2.5">
                      {/* Dual-bar workload balance */}
                      <div>
                        <div className="flex justify-between text-[10px] font-semibold text-muted-foreground mb-1">
                          <span>AUT (T1): <strong className="text-foreground">{breakdown.term1}cr</strong></span>
                          <span>SPR (T2): <strong className="text-foreground">{breakdown.term2}cr</strong></span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 h-2">
                          {/* Autumn bar */}
                          <div className="bg-muted rounded-full overflow-hidden flex justify-end">
                            <div
                              className={`h-full transition-all duration-300 ${
                                breakdown.term1 > 65
                                  ? "bg-amber-500"
                                  : breakdown.isAllNonCondonable && breakdown.term1 === 60
                                  ? "bg-gradient-to-r from-amber-500 to-amber-600"
                                  : "bg-[#007A6B]"
                              }`}
                              style={{ width: `${Math.min(100, (breakdown.term1 / 60) * 100)}%` }}
                              title={`Autumn: ${breakdown.term1} / 60cr`}
                            />
                          </div>
                          {/* Spring bar */}
                          <div className="bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                breakdown.term2 > 65
                                  ? "bg-amber-500"
                                  : breakdown.isAllNonCondonable && breakdown.term2 === 60
                                  ? "bg-gradient-to-r from-amber-500 to-amber-600"
                                  : "bg-[#00A693]"
                              }`}
                              style={{ width: `${Math.min(100, (breakdown.term2 / 60) * 100)}%` }}
                              title={`Spring: ${breakdown.term2} / 60cr`}
                            />
                          </div>
                        </div>
                        {breakdown.fullYearCredits > 0 && (
                          <p className="text-[10px] text-muted-foreground mt-1">
                            Includes {breakdown.fullYearCredits}cr full-year modules (split {breakdown.fullYearCredits / 2}cr Autumn / {breakdown.fullYearCredits / 2}cr Spring)
                          </p>
                        )}
                        {breakdown.other > 0 && (
                          <p className="text-[10px] text-muted-foreground mt-1">
                            + {breakdown.other} credits across other terms
                          </p>
                        )}
                      </div>

                      {/* Warnings or Balance Badge */}
                      {hasImbalance && (
                        <div className="flex items-start gap-1.5 p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] leading-tight">
                          <AlertCircle size={13} className="shrink-0 mt-0.5" />
                          <span>
                            Term imbalance ({breakdown.term1} vs {breakdown.term2} cr). Ideal target is 60/60.
                          </span>
                        </div>
                      )}

                      {isOver && (
                        <div className="flex items-start gap-1.5 p-2 rounded-lg bg-destructive/10 text-destructive text-[11px] leading-tight">
                          <AlertCircle size={13} className="shrink-0 mt-0.5" />
                          <span>Stage exceeds limit by {breakdown.total - stageRequired} credits.</span>
                        </div>
                      )}

                      {!hasImbalance && isComplete && !isOver && (
                        breakdown.isAllNonCondonable ? (
                          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-semibold border border-amber-500/20">
                            <ShieldAlert size={13} className="shrink-0 text-amber-600 dark:text-amber-400" />
                            <span>100% Non-condonable — all {breakdown.total} credits must be passed to progress</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            <CheckCircle2 size={13} />
                            <span>Stage requirement satisfied</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="p-3 bg-card rounded-xl border border-border text-[11px] text-muted-foreground space-y-1.5">
          <p className="font-bold text-foreground">Exeter Guidelines</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#007A6B]" />
            <span>Autumn Term 1 (target 60cr)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A693]" />
            <span>Spring Term 2 (target 60cr)</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert size={12} className="text-destructive" />
            <span>Non-condonable modules must be passed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
