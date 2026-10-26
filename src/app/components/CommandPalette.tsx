import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, GraduationCap, BookOpen, X, ArrowRight, CornerDownLeft } from "lucide-react";
import PROGRAMMES from "../../data/programmes.json";
import type { Module } from "../../api/timeedit";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgramme: (code: string) => void;
  onSelectModule?: (code: string) => void;
  currentModules?: Module[];
  currentProgrammeCode?: string | null;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProgramme,
  onSelectModule,
  currentModules = [],
  currentProgrammeCode,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Combined searchable items
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default: show current programme modules first, plus popular programmes
      const progItems = PROGRAMMES.slice(0, 8).map(p => ({
        type: "programme" as const,
        id: p.code,
        title: p.label,
        subtitle: `Code: ${p.code}`,
        code: p.code,
      }));
      const modItems = currentModules.slice(0, 6).map(m => ({
        type: "module" as const,
        id: m.code,
        title: m.title,
        subtitle: `${m.code} · Year ${m.stage} · ${m.credits} credits`,
        code: m.code,
      }));
      return [...modItems, ...progItems];
    }

    const matchedMods = currentModules
      .filter(m => m.code.toLowerCase().includes(q) || m.title.toLowerCase().includes(q))
      .slice(0, 10)
      .map(m => ({
        type: "module" as const,
        id: m.code,
        title: m.title,
        subtitle: `${m.code} · Year ${m.stage} · ${m.credits} credits`,
        code: m.code,
      }));

    const matchedProgs = PROGRAMMES
      .filter(p => p.label.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
      .slice(0, 15)
      .map(p => ({
        type: "programme" as const,
        id: p.code,
        title: p.label,
        subtitle: `Programme Code: ${p.code}`,
        code: p.code,
      }));

    return [...matchedMods, ...matchedProgs];
  }, [query, currentModules]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          if (selected.type === "programme") {
            onSelectProgramme(selected.code);
          } else if (selected.type === "module" && onSelectModule) {
            onSelectModule(selected.code);
          }
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onSelectProgramme, onSelectModule]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-border bg-card">
          <Search size={18} className="text-muted-foreground mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search all 1,245 programmes or jump to module (e.g. MTH1002)..."
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <X size={14} />
            </button>
          )}
          <span className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5 ml-2 font-mono">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-border/50">
          {results.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-xs">
              No matching programmes or modules found.
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    if (item.type === "programme") onSelectProgramme(item.code);
                    else if (onSelectModule) onSelectModule(item.code);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded cursor-pointer transition-colors ${
                    isSelected ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                        item.type === "programme"
                          ? "bg-[#003C3C] text-white"
                          : "bg-[#00A693] text-white"
                      }`}
                    >
                      {item.type === "programme" ? (
                        <GraduationCap size={15} />
                      ) : (
                        <BookOpen size={14} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {item.title}
                        </p>
                        <span
                          className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                            item.type === "programme"
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-[#00A693]/10 text-[#00A693]"
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <CornerDownLeft size={13} className="text-muted-foreground shrink-0 ml-2" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-card px-1.5 py-0.5 border border-border rounded text-[10px]">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-mono bg-card px-1.5 py-0.5 border border-border rounded text-[10px]">↵</kbd> select
            </span>
          </div>
          <span>University of Exeter Programme Planner</span>
        </div>
      </div>
    </div>
  );
};
