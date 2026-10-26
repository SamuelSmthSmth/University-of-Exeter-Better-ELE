import React from "react";
import { X, CheckCircle, Circle, ArrowRight, BookOpen, AlertCircle, ShieldAlert } from "lucide-react";
import type { Module } from "../../api/timeedit";

interface ModuleComparisonDrawerProps {
  moduleCodes: string[];
  moduleMap: Map<string, Module>;
  selected: Set<string>;
  onToggle: (code: string) => void;
  onRemove: (code: string) => void;
  onClose: () => void;
}

export const ModuleComparisonDrawer: React.FC<ModuleComparisonDrawerProps> = ({
  moduleCodes,
  moduleMap,
  selected,
  onToggle,
  onRemove,
  onClose,
}) => {
  if (moduleCodes.length === 0) return null;

  const modules = moduleCodes.map(c => moduleMap.get(c)).filter(Boolean) as Module[];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-card border-t border-border shadow-2xl transition-transform animate-in slide-in-from-bottom-5 duration-200 max-h-[70vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-[#003C3C] text-white">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-[#00C4AD]" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            Module Comparison ({modules.length}/3)
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto p-6">
        <div
          className="grid gap-4 min-w-[600px]"
          style={{ gridTemplateColumns: `160px repeat(${modules.length}, minmax(220px, 1fr))` }}
        >
          {/* Row: Headers */}
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-3">
            Module
          </div>
          {modules.map(m => (
            <div key={m.code} className="bg-muted/40 p-3 rounded border border-border relative">
              <button
                onClick={() => onRemove(m.code)}
                className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground rounded"
                title="Remove from comparison"
              >
                <X size={13} />
              </button>
              <span className="text-[11px] font-bold text-[#00A693]">{m.code}</span>
              <h4 className="text-sm font-semibold text-foreground leading-tight mt-0.5 mb-2 line-clamp-2">
                {m.title}
              </h4>
              <button
                onClick={() => onToggle(m.code)}
                disabled={m.type === "compulsory"}
                className={`w-full py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  m.type === "compulsory"
                    ? "bg-[#003C3C] text-white cursor-default"
                    : selected.has(m.code)
                    ? "bg-[#00A693] text-white hover:bg-[#008f7e]"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {m.type === "compulsory" ? (
                  "Compulsory"
                ) : selected.has(m.code) ? (
                  <>
                    <CheckCircle size={13} /> Selected
                  </>
                ) : (
                  <>
                    <Circle size={13} /> Select Module
                  </>
                )}
              </button>
            </div>
          ))}

          {/* Row: Credits & Stage */}
          <div className="text-xs font-bold text-muted-foreground py-2 border-t border-border/60">
            Year & Credits
          </div>
          {modules.map(m => (
            <div key={m.code} className="text-xs font-medium py-2 border-t border-border/60">
              Year {m.stage} · <span className="font-bold">{m.credits} Credits</span>
            </div>
          ))}

          {/* Row: Term */}
          <div className="text-xs font-bold text-muted-foreground py-2 border-t border-border/60">
            Term
          </div>
          {modules.map(m => (
            <div key={m.code} className="text-xs font-medium py-2 border-t border-border/60">
              <span
                className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                  m.term === "AUT"
                    ? "bg-[#007A6B]/15 text-[#007A6B]"
                    : m.term === "SPR"
                    ? "bg-[#00A693]/15 text-[#00A693]"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {m.term === "AUT"
                  ? "Autumn (Term 1)"
                  : m.term === "SPR"
                  ? "Spring (Term 2)"
                  : m.term === "AUTSPR"
                  ? "Full Year (AUT & SPR)"
                  : "Other Term"}
              </span>
            </div>
          ))}

          {/* Row: Assessment Type */}
          <div className="text-xs font-bold text-muted-foreground py-2 border-t border-border/60">
            Assessment
          </div>
          {modules.map(m => (
            <div key={m.code} className="text-xs py-2 border-t border-border/60 leading-relaxed">
              {m.assessmentType || "Written Examination & Coursework"}
            </div>
          ))}

          {/* Row: Condonable */}
          <div className="text-xs font-bold text-muted-foreground py-2 border-t border-border/60">
            Condonable
          </div>
          {modules.map(m => (
            <div key={m.code} className="text-xs py-2 border-t border-border/60">
              {m.condonable ? (
                <span className="text-emerald-600 font-semibold">Yes (can be condoned)</span>
              ) : (
                <span className="text-destructive font-bold flex items-center gap-1">
                  <ShieldAlert size={13} /> Non-condonable
                </span>
              )}
            </div>
          ))}

          {/* Row: Prerequisites */}
          <div className="text-xs font-bold text-muted-foreground py-2 border-t border-border/60">
            Prerequisites
          </div>
          {modules.map(m => (
            <div key={m.code} className="text-xs py-2 border-t border-border/60">
              {m.prerequisites.length === 0 ? (
                <span className="text-muted-foreground">None</span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {m.prerequisites.map(p => (
                    <span
                      key={p}
                      className="bg-secondary text-secondary-foreground font-mono text-[10px] px-1.5 py-0.5 rounded font-bold"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
