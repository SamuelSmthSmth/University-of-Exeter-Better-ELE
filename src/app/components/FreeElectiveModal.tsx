import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  Sparkles,
  Search,
  Check,
  AlertTriangle,
  BookOpen,
  Globe,
  Briefcase,
  PenTool,
  Scale,
  Code2,
  Leaf,
  Trash2,
  Info,
} from "lucide-react";
import { CURATED_ELECTIVES, ElectiveModule, isDisciplineSimilar } from "../../data/electives";
import { Module } from "../../api/timeedit";

interface FreeElectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: number;
  programmeTitle: string;
  programmeDept: string;
  coreModulePrefixes: string[];
  currentElective: Module | null;
  onSelectElective: (stage: number, mod: Module) => void;
  onRemoveElective?: (stage: number) => void;
}

type ElectiveCategory =
  | "All"
  | "Languages (FLC)"
  | "Business & Management"
  | "Humanities & Arts"
  | "Social Sciences & Law"
  | "Data & Digital"
  | "Environment & Science";

const CATEGORIES: { id: ElectiveCategory; label: string; icon: React.ReactNode }[] = [
  { id: "All", label: "All Electives", icon: <BookOpen size={14} /> },
  { id: "Languages (FLC)", label: "Languages (FLC)", icon: <Globe size={14} /> },
  { id: "Business & Management", label: "Business & Econ", icon: <Briefcase size={14} /> },
  { id: "Humanities & Arts", label: "Humanities", icon: <PenTool size={14} /> },
  { id: "Social Sciences & Law", label: "Social Sciences & Law", icon: <Scale size={14} /> },
  { id: "Data & Digital", label: "Data & Digital", icon: <Code2 size={14} /> },
  { id: "Environment & Science", label: "Environment & Sci", icon: <Leaf size={14} /> },
];

export function FreeElectiveModal({
  isOpen,
  onClose,
  stage,
  programmeTitle,
  programmeDept,
  coreModulePrefixes,
  currentElective,
  onSelectElective,
  onRemoveElective,
}: FreeElectiveModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<ElectiveCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customTerm, setCustomTerm] = useState<"AUT" | "SPR" | "AUTSPR">("AUT");
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset search when opening
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setShowCustomForm(false);
    }
  }, [isOpen]);

  const filteredElectives = useMemo(() => {
    return CURATED_ELECTIVES.filter((m) => {
      const matchesCategory =
        selectedCategory === "All" || m.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        m.code.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handleSelectCurated = (elective: ElectiveModule) => {
    const similarity = isDisciplineSimilar(
      elective.code,
      programmeTitle,
      programmeDept,
      coreModulePrefixes
    );
    if (similarity.similar) return; // Disallowed

    const mod: Module = {
      code: elective.code,
      title: elective.title,
      credits: elective.credits,
      stage: stage,
      type: "optional",
      condonable: true,
      prerequisites: [],
      corequisites: [],
      description: elective.description,
      assessmentType: elective.assessmentType,
      term: elective.term,
      optionalGroup: "Free Elective",
      isFreeElective: true,
    };

    onSelectElective(stage, mod);
    onClose();
  };

  const handleSelectCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = customCode.trim().toUpperCase();
    const cleanTitle = customTitle.trim();
    if (!cleanCode || !cleanTitle) return;

    const similarity = isDisciplineSimilar(
      cleanCode,
      programmeTitle,
      programmeDept,
      coreModulePrefixes
    );
    if (similarity.similar) {
      alert(similarity.reason);
      return;
    }

    const mod: Module = {
      code: cleanCode,
      title: cleanTitle,
      credits: 15,
      stage: stage,
      type: "optional",
      condonable: true,
      prerequisites: [],
      corequisites: [],
      description: "Custom multidisciplinary free elective chosen outside core degree discipline.",
      assessmentType: "Module Convenor Assessment",
      term: customTerm,
      optionalGroup: "Free Elective",
      isFreeElective: true,
    };

    onSelectElective(stage, mod);
    onClose();
  };

  const customSimilarity = customCode.length >= 3
    ? isDisciplineSimilar(customCode.trim().toUpperCase(), programmeTitle, programmeDept, coreModulePrefixes)
    : { similar: false };

  return (
    <div className="fixed inset-0 z-[125] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-labelledby="free-elective-title"
        aria-modal="true"
        className="bg-card w-full max-w-4xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 text-foreground"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#003C3C] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00C4AD]/20 border border-[#00C4AD]/40 flex items-center justify-center text-[#00C4AD]">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="free-elective-title" className="text-lg font-bold tracking-tight">
                  Year {stage} Free Elective Selection
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#00C4AD]/20 text-[#00C4AD] border border-[#00C4AD]/30">
                  Strictly 1 Module / Year
                </span>
              </div>
              <p className="text-xs text-white/70">
                Broaden your degree with accredited modules from outside your home discipline
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close free elective modal"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Advisory banner */}
        <div className="bg-muted/40 px-6 py-3 border-b border-border text-xs text-muted-foreground flex items-start gap-2.5">
          <Info size={16} className="text-[#00A693] shrink-0 mt-0.5" />
          <div>
            <span>
              <strong>Exeter Modular Elective Policy:</strong> Undergraduate students entering Stage 2 or above can select <strong>one 15-credit free elective</strong> per academic year from outside their discipline.
            </span>
            <span className="block text-foreground/80 mt-0.5">
              Current Programme: <strong>{programmeTitle || "Undergraduate Degree"}</strong> ({programmeDept || "Core Department"}). Modules in your home discipline are disabled.
            </span>
          </div>
        </div>

        {/* Current Active Elective Status */}
        {currentElective && (
          <div className="px-6 py-3 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-muted-foreground">Currently selected for Stage {stage}:</span>
              <span className="font-bold text-emerald-900 dark:text-emerald-200">
                {currentElective.code} - {currentElective.title}
              </span>
              <span className="text-[11px] text-muted-foreground">({currentElective.credits} credits · {currentElective.term || "AUT/SPR"})</span>
            </div>
            {onRemoveElective && (
              <button
                type="button"
                onClick={() => {
                  onRemoveElective(stage);
                  onClose();
                }}
                className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 shrink-0 font-medium"
              >
                <Trash2 size={13} />
                <span>Remove Elective</span>
              </button>
            )}
          </div>
        )}

        {/* Search & Category Tabs */}
        <div className="p-4 sm:p-6 border-b border-border space-y-4 shrink-0 bg-background/50">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search free electives by title, code (e.g. FLF, BEM, LAW), or topic..."
                className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00A693] focus:bg-background transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="px-3.5 py-2 border border-border hover:bg-muted text-xs font-semibold rounded-xl transition-colors shrink-0 text-[#00A693] hover:text-[#008f7e]"
            >
              {showCustomForm ? "Browse Curated" : "+ Enter Custom Code"}
            </button>
          </div>

          {/* Category Tabs */}
          {!showCustomForm && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-[#003C3C] text-white shadow-xs dark:bg-[#00A693]"
                        : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Body: Curated List or Custom Form */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {showCustomForm ? (
            /* Custom Module Form */
            <form onSubmit={handleSelectCustom} className="max-w-xl mx-auto space-y-4 py-4">
              <div className="p-4 bg-muted/40 border border-border rounded-xl space-y-1">
                <h4 className="text-sm font-bold text-foreground">Add Any University of Exeter Module</h4>
                <p className="text-xs text-muted-foreground">
                  If your chosen elective is not listed in our curated list, enter its official Exeter module code and title below. We will verify that it does not overlap with your degree discipline.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-foreground">
                  Module Code (e.g. ARA1001, SOC2005, LAW1004)
                </label>
                <input
                  type="text"
                  required
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="e.g. ARA1001"
                  className="w-full px-3 py-2 bg-muted/30 border border-border rounded-xl text-xs uppercase focus:ring-2 focus:ring-[#00A693]"
                />
              </div>

              {customSimilarity.similar && (
                <div className="p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <strong>Discipline Overlap Detected:</strong>
                    <p className="mt-0.5">{customSimilarity.reason}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold mb-1 text-foreground">
                  Module Title
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Introduction to Middle East Politics"
                  className="w-full px-3 py-2 bg-muted/30 border border-border rounded-xl text-xs focus:ring-2 focus:ring-[#00A693]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-foreground">
                  Delivery Term
                </label>
                <select
                  value={customTerm}
                  onChange={(e) => setCustomTerm(e.target.value as any)}
                  className="w-full px-3 py-2 bg-muted/30 border border-border rounded-xl text-xs focus:ring-2 focus:ring-[#00A693]"
                >
                  <option value="AUT">Autumn Term (Term 1)</option>
                  <option value="SPR">Spring Term (Term 2)</option>
                  <option value="AUTSPR">Whole Year (Autumn & Spring)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomForm(false)}
                  className="px-4 py-2 border border-border text-xs rounded-xl hover:bg-muted transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={customSimilarity.similar || !customCode || !customTitle}
                  className="px-5 py-2 bg-[#00A693] hover:bg-[#008f7e] disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Add as Stage {stage} Elective</span>
                </button>
              </div>
            </form>
          ) : (
            /* Curated Electives Grid */
            <div className="space-y-2.5">
              {filteredElectives.length === 0 ? (
                <div className="text-center py-12 text-xs text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60 space-y-2">
                  <p>No free electives match "{searchQuery}" in this category.</p>
                  <button
                    type="button"
                    onClick={() => setShowCustomForm(true)}
                    className="text-xs font-semibold text-[#00A693] underline hover:text-[#008f7e]"
                  >
                    Enter a custom Exeter module code instead
                  </button>
                </div>
              ) : (
                filteredElectives.map((elective) => {
                  const similarity = isDisciplineSimilar(
                    elective.code,
                    programmeTitle,
                    programmeDept,
                    coreModulePrefixes
                  );
                  const isCurrent = currentElective?.code === elective.code;

                  return (
                    <div
                      key={elective.code}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isCurrent
                          ? "bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/30"
                          : similarity.similar
                          ? "bg-muted/30 border-border/60 opacity-60"
                          : "bg-card hover:bg-muted/30 border-border shadow-2xs"
                      }`}
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-muted text-foreground border border-border">
                            {elective.code}
                          </span>
                          <span className="font-bold text-sm text-foreground">
                            {elective.title}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#00A693]/15 text-[#00A693]">
                            {elective.credits} credits
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            {elective.term === "AUT"
                              ? "Term 1 (Autumn)"
                              : elective.term === "SPR"
                              ? "Term 2 (Spring)"
                              : "Terms 1 & 2"}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {elective.description}
                        </p>

                        <div className="text-[11px] text-muted-foreground/80 flex items-center gap-3 pt-0.5 flex-wrap">
                          <span>{elective.department}</span>
                          {elective.assessmentType && (
                            <>
                              <span>·</span>
                              <span>Assessment: {elective.assessmentType}</span>
                            </>
                          )}
                        </div>

                        {/* Similarity warning badge */}
                        {similarity.similar && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                            <AlertTriangle size={12} className="shrink-0" />
                            <span>{similarity.reason}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0 self-end sm:self-center">
                        {isCurrent ? (
                          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1">
                            <Check size={14} />
                            <span>Selected</span>
                          </span>
                        ) : similarity.similar ? (
                          <button
                            type="button"
                            disabled
                            className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium rounded-xl cursor-not-allowed border border-border"
                          >
                            Disallowed (Home Discipline)
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSelectCurated(elective)}
                            className="px-4 py-2 bg-[#003C3C] hover:bg-[#00524d] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <span>Pick for Year {stage}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/20 border-t border-border flex items-center justify-between shrink-0 text-xs text-muted-foreground">
          <span>Max 1 Free Elective (15 credits) per academic stage.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 border border-border hover:bg-muted text-foreground font-semibold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
