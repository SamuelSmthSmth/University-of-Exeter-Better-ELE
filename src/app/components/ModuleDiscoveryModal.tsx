import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import confetti from "canvas-confetti";
import {
  X,
  Heart,
  Star,
  RotateCcw,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Trash2,
  Check,
  Zap,
  Info,
  BadgeCheck,
  Flame,
  User,
  GraduationCap,
} from "lucide-react";
import type { Module, StageReq, Programme } from "../../api/timeedit";
import {
  type DiscoveryState,
  type DiscoveryCardItem,
  type SwipeAction,
  buildInitialDeck,
  processSwipe,
  undoLastSwipe,
  calculatePersonalityProfile,
  autoFillPlanFromPortfolio,
  getModuleTinderTags,
  getModuleCardVisual,
  getModuleImages,
} from "../utils/moduleDiscovery";

export interface ModuleDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  modules: Module[];
  moduleMap: Map<string, Module>;
  stageReqs: StageReq[];
  programme: Programme;
  selectedModules: Set<string>;
  onApplyToPlan: (newSelected: Set<string>, summary: string) => void;
  discoveryState: DiscoveryState;
  onUpdateDiscoveryState: (state: DiscoveryState) => void;
}

type TinderTab = "discover" | "matches" | "profile";

export const ModuleDiscoveryModal: React.FC<ModuleDiscoveryModalProps> = ({
  isOpen,
  onClose,
  modules,
  moduleMap,
  stageReqs,
  programme,
  selectedModules,
  onApplyToPlan,
  discoveryState,
  onUpdateDiscoveryState,
}) => {
  const [activeTab, setActiveTab] = useState<TinderTab>("discover");
  const [selectedStageFilter, setSelectedStageFilter] = useState<number | "all">("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [deck, setDeck] = useState<DiscoveryCardItem[]>([]);
  const [expandedInfo, setExpandedInfo] = useState(false);
  const [applyFeedback, setApplyFeedback] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Match celebration state (Iconic "It's a Match!" modal)
  const [matchCelebration, setMatchCelebration] = useState<{
    module: Module;
    reason: string;
  } | null>(null);

  // Tactile haptic feedback
  const triggerHaptic = useCallback((ms: number | number[] = 10) => {
    try {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(ms);
      }
    } catch {}
  }, []);

  // Initialize or re-filter deck
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined") {
        const p = new URLSearchParams(window.location.search);
        if (p.get("seeddemo") === "1" && discoveryState.liked.length === 0) {
          onUpdateDiscoveryState({
            liked: ["MTH2003", "MTH2004", "MTH2005"],
            disliked: ["MTH2006"],
            superliked: ["MTH2003"],
            history: [
              { code: "MTH2003", action: "superlike", timestamp: Date.now() },
              { code: "MTH2004", action: "like", timestamp: Date.now() },
              { code: "MTH2005", action: "like", timestamp: Date.now() },
              { code: "MTH2006", action: "dislike", timestamp: Date.now() },
            ],
          });
          return;
        }
        if (p.get("portfolio") === "1" || p.get("tab") === "matches") {
          setActiveTab("matches");
        } else if (p.get("persona") === "1" || p.get("tab") === "profile") {
          setActiveTab("profile");
        }
      }
      const initialDeck = buildInitialDeck(modules, stageReqs, discoveryState, selectedStageFilter);
      setDeck(initialDeck);
      setExpandedInfo(false);
      setCurrentPhotoIndex(0);

      if (typeof window !== "undefined") {
        const p = new URLSearchParams(window.location.search);
        if (p.get("matchmodal") === "1" && modules.length > 0) {
          const sampleMod = modules.find(m => m.code === "MTH2003") || modules[0];
          setMatchCelebration({
            module: sampleMod,
            reason: "Unlocks 7 advanced modules and matches your academic pathway!",
          });
        }
      }
    }
  }, [isOpen, modules, stageReqs, selectedStageFilter, discoveryState.liked.length]);

  // Current top cards in deck
  const currentCard = deck[0];
  const nextCard = deck[1];
  const thirdCard = deck[2];

  // Images for current card
  const cardImages = useMemo(() => {
    if (!currentCard) return [];
    return getModuleImages(currentCard.module);
  }, [currentCard]);

  // Next image handler for photo carousel
  const handleNextPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (cardImages.length <= 1) return;
    triggerHaptic(6);
    setCurrentPhotoIndex(prev => (prev + 1) % cardImages.length);
  }, [cardImages.length, triggerHaptic]);

  // Prev image handler
  const handlePrevPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (cardImages.length <= 1) return;
    triggerHaptic(6);
    setCurrentPhotoIndex(prev => (prev - 1 + cardImages.length) % cardImages.length);
  }, [cardImages.length, triggerHaptic]);

  // Motion values for swipe drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-18, 18]);
  const likeOpacity = useTransform(x, [25, 120], [0, 1]);
  const passOpacity = useTransform(x, [-25, -120], [0, 1]);
  const superlikeOpacity = useTransform(y, [-25, -100], [0, 1]);

  // Execute swipe action
  const handleSwipe = useCallback(
    (action: SwipeAction) => {
      if (!currentCard) return;

      if (action === "like") triggerHaptic(12);
      else if (action === "superlike") triggerHaptic([15, 40, 15]);
      else triggerHaptic(8);

      const targetMod = currentCard.module;
      const code = targetMod.code;
      const unlocksCount = currentCard.unlocksCount;

      const { nextState, nextDeck } = processSwipe(
        discoveryState,
        code,
        action,
        deck,
        moduleMap
      );

      onUpdateDiscoveryState(nextState);
      setDeck(nextDeck);
      setExpandedInfo(false);
      setCurrentPhotoIndex(0);
      x.set(0);
      y.set(0);

      // Check for iconic "It's a Match!" celebration in Exeter emerald & gold
      const shouldCelebrate =
        action === "superlike" ||
        (action === "like" && (unlocksCount >= 3 || nextState.liked.length === 1 || nextState.liked.length % 4 === 0));

      if (shouldCelebrate) {
        let reason = "This module aligns with your curriculum archetype!";
        if (unlocksCount >= 3) {
          reason = `Unlocks ${unlocksCount} advanced courses in your degree pathway!`;
        } else if (action === "superlike") {
          reason = "You superliked this module! High priority for your degree plan.";
        }

        setMatchCelebration({
          module: targetMod,
          reason,
        });

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.55 },
            colors: ["#003C3C", "#00A693", "#F59E0B", "#FBBF24"],
          });
        } catch {}
      }
    },
    [currentCard, discoveryState, deck, moduleMap, onUpdateDiscoveryState, triggerHaptic, x, y]
  );

  // Rewind / Undo
  const handleUndo = useCallback(() => {
    if (discoveryState.history.length === 0) return;
    triggerHaptic(10);

    const { nextState, restoredCode } = undoLastSwipe(discoveryState);
    onUpdateDiscoveryState(nextState);

    if (restoredCode) {
      const restoredMod = moduleMap.get(restoredCode);
      if (restoredMod) {
        const restoredItem: DiscoveryCardItem = {
          module: restoredMod,
          priorityScore: 9999,
          unlocksCount: 0,
          unlockedCodes: [],
          reason: "↺ Restored from undo",
        };
        setDeck(prev => [restoredItem, ...prev]);
        setCurrentPhotoIndex(0);
      }
    }
  }, [discoveryState, moduleMap, onUpdateDiscoveryState, triggerHaptic]);

  // Reset discovery deck
  const handleResetDeck = useCallback(() => {
    if (confirm("Reset all likes and passes for this programme?")) {
      const resetState: DiscoveryState = {
        liked: [],
        disliked: [],
        superliked: [],
        history: [],
      };
      onUpdateDiscoveryState(resetState);
      const freshDeck = buildInitialDeck(modules, stageReqs, resetState, selectedStageFilter);
      setDeck(freshDeck);
      setCurrentPhotoIndex(0);
      triggerHaptic(15);
    }
  }, [modules, onUpdateDiscoveryState, selectedStageFilter, stageReqs, triggerHaptic]);

  // Apply Liked to Plan
  const handleApplyToPlan = useCallback(() => {
    triggerHaptic([20, 60, 20]);
    const { newSelected, addedCodes, skippedDueToCap, skippedDueToPrereq } = autoFillPlanFromPortfolio(
      discoveryState.liked,
      discoveryState.superliked,
      selectedModules,
      modules,
      stageReqs
    );

    let summary = "";
    if (addedCodes.length > 0) {
      summary = `Added ${addedCodes.length} matched modules to your degree plan!`;
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#003C3C", "#00A693", "#F59E0B", "#FBBF24"],
        });
      } catch {}
    } else if (skippedDueToCap.length > 0) {
      summary = "Stage credit limits reached (120cr). Deselect existing modules to add more.";
    } else if (skippedDueToPrereq.length > 0) {
      summary = "Some matched modules require prerequisites that aren't yet planned.";
    } else {
      summary = "All liked modules are already active in your degree plan.";
    }

    setApplyFeedback(summary);
    onApplyToPlan(newSelected, summary);
    setTimeout(() => setApplyFeedback(null), 4500);
  }, [discoveryState.liked, discoveryState.superliked, selectedModules, modules, stageReqs, onApplyToPlan, triggerHaptic]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (matchCelebration) {
        if (e.key === "Escape" || e.key === "Enter") {
          setMatchCelebration(null);
        }
        return;
      }

      if (activeTab !== "discover") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSwipe("like");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSwipe("dislike");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handleSwipe("superlike");
      } else if (e.key === " " || e.key === "Tab") {
        e.preventDefault();
        handleNextPhoto();
      } else if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleUndo();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, matchCelebration, activeTab, handleSwipe, handleUndo, handleNextPhoto, onClose]);

  // Personality calculation
  const personality = useMemo(() => {
    return calculatePersonalityProfile(discoveryState.liked, moduleMap);
  }, [discoveryState.liked, moduleMap]);

  // Available stages
  const availableStages = useMemo(() => {
    return Array.from(new Set(modules.filter(m => m.type === "optional").map(m => m.stage))).sort();
  }, [modules]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end lg:justify-center items-center overflow-hidden animate-in fade-in duration-200">
      
      {/* ── Main Exeter-Styled Device Frame ─────────────────────────────────── */}
      <div className="w-full h-full lg:h-[92vh] lg:max-h-[860px] lg:max-w-[420px] lg:rounded-[40px] bg-gradient-to-b from-[#F0FDF9] via-white to-[#FDFBF7] text-slate-900 border-t lg:border-8 border-[#003C3C]/20 flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* ── Top Discover Header (Exeter Emerald & Gold Brand) ──────────────── */}
        <header className="shrink-0 px-5 pt-4 pb-3 flex items-center justify-between z-30 bg-white/80 backdrop-blur-md border-b border-emerald-900/10">
          {/* Back Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#003C3C] hover:text-[#00A693] active:scale-95 transition-all cursor-pointer"
            title="Close Discover"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Center Brand / Discover Title */}
          <div className="text-center">
            <h1 className="text-lg font-black tracking-tight text-[#003C3C] flex items-center justify-center gap-1.5 leading-none">
              <span>Discover</span>
              <Sparkles size={15} className="text-[#F59E0B] fill-amber-400" />
            </h1>
            <p className="text-[11px] font-medium text-slate-500 truncate max-w-[210px] mt-0.5">
              {programme.title || "Exeter Degree Programme"}
            </p>
          </div>

          {/* Right Filter Button */}
          <button
            type="button"
            onClick={() => setShowFilterDropdown(v => !v)}
            className={`w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
              showFilterDropdown ? "text-[#00A693] border-[#00A693] ring-2 ring-[#00A693]/20" : "text-slate-700 hover:text-[#003C3C]"
            }`}
            title="Filter by Stage"
          >
            <SlidersHorizontal size={18} />
          </button>
        </header>

        {/* ── Stage Filter Dropdown / Filter Bar ────────────────────────────── */}
        <AnimatePresence>
          {showFilterDropdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 z-20 overflow-hidden"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                <span>Filter by Year:</span>
                <span className="text-[11px] font-bold text-[#007A6B]">{deck.length} modules left</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStageFilter("all");
                    setShowFilterDropdown(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedStageFilter === "all"
                      ? "bg-[#003C3C] text-white ring-2 ring-[#F59E0B]/50 shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  All Years
                </button>
                {availableStages.map(stg => (
                  <button
                    key={stg}
                    type="button"
                    onClick={() => {
                      setSelectedStageFilter(stg);
                      setShowFilterDropdown(false);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedStageFilter === stg
                        ? "bg-[#003C3C] text-white ring-2 ring-[#F59E0B]/50 shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Year {stg}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main Tab Content ──────────────────────────────────────────────── */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          
          {/* TAB 1: DISCOVER (Tinder Swipe Deck with Photography) */}
          {activeTab === "discover" && (
            <div className="flex-1 relative flex flex-col justify-between p-4 overflow-hidden select-none">
              
              {/* Card Arena */}
              <div className="flex-1 relative flex items-center justify-center min-h-[460px]">
                {currentCard ? (
                  <div className="relative w-full h-full max-h-[550px] flex items-center justify-center">
                    
                    {/* 3rd Card Underneath (Depth Stack) */}
                    {thirdCard && (
                      <div
                        className="absolute w-full h-full max-h-[510px] rounded-[32px] bg-[#002B2B] border border-emerald-900/30 shadow-sm pointer-events-none transition-transform"
                        style={{ transform: "translateY(22px) scale(0.88)", zIndex: 1 }}
                      />
                    )}

                    {/* 2nd Card Underneath (Depth Stack) */}
                    {nextCard && (
                      <div
                        className="absolute w-full h-full max-h-[520px] rounded-[32px] bg-[#003333] border border-emerald-900/40 shadow-md pointer-events-none transition-transform overflow-hidden"
                        style={{ transform: "translateY(11px) scale(0.94)", zIndex: 2 }}
                      >
                        <div
                          className={`h-full w-full bg-gradient-to-br ${getModuleCardVisual(nextCard.module).gradient} opacity-40`}
                        />
                      </div>
                    )}

                    {/* Active Draggable Card */}
                    <motion.div
                      key={currentCard.module.code}
                      style={{ x, y, rotate, zIndex: 10 }}
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.8}
                      onDragEnd={(_, info) => {
                        if (info.offset.x > 110) {
                          handleSwipe("like");
                        } else if (info.offset.x < -110) {
                          handleSwipe("dislike");
                        } else if (info.offset.y < -90) {
                          handleSwipe("superlike");
                        }
                      }}
                      className="absolute w-full h-full max-h-[530px] rounded-[32px] shadow-2xl border border-emerald-900/20 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing bg-[#002424]"
                    >
                      {/* Directional Stamp Overlays */}
                      <motion.div
                        style={{ opacity: likeOpacity }}
                        className="absolute top-12 left-7 z-40 border-4 border-[#00A693] text-[#00C4AD] font-black text-2xl px-4 py-1 rounded-xl rotate-[-15deg] pointer-events-none tracking-wider uppercase bg-[#003C3C]/80 shadow-lg"
                      >
                        LIKE ♥
                      </motion.div>

                      <motion.div
                        style={{ opacity: passOpacity }}
                        className="absolute top-12 right-7 z-40 border-4 border-[#EF4444] text-[#EF4444] font-black text-2xl px-4 py-1 rounded-xl rotate-[15deg] pointer-events-none tracking-wider uppercase bg-rose-950/80 shadow-lg"
                      >
                        NOPE ✕
                      </motion.div>

                      <motion.div
                        style={{ opacity: superlikeOpacity }}
                        className="absolute bottom-28 inset-x-0 mx-auto w-fit z-40 border-4 border-[#F59E0B] text-[#F59E0B] font-black text-xl px-5 py-1.5 rounded-xl pointer-events-none tracking-wider uppercase bg-amber-950/90 shadow-2xl"
                      >
                        ★ SUPER LIKE ★
                      </motion.div>

                      {/* ── CARD PHOTOGRAPHY HERO ──────────────────────────── */}
                      <div className="absolute inset-0 z-0 overflow-hidden bg-[#002B2B]">
                        {/* High-Resolution Thematic Photo */}
                        {cardImages.length > 0 && (
                          <img
                            key={`${currentCard.module.code}-${currentPhotoIndex}`}
                            src={cardImages[currentPhotoIndex]}
                            alt={currentCard.module.title}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                            onError={(e) => {
                              // If image fails, hide broken img tag and reveal vibrant gradient underneath
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}

                        {/* Fallback Subject Gradient Underlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-b ${getModuleCardVisual(currentCard.module).gradient} opacity-60 -z-10`}
                        />

                        {/* Exeter Pine Vignette Overlay (Dark gradient ensuring text readability) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001D1D] via-[#001D1D]/45 to-black/30 pointer-events-none" />

                        {/* Tap Left / Right to cycle photo segments */}
                        {cardImages.length > 1 && (
                          <div className="absolute inset-0 z-10 flex">
                            <div
                              onClick={handlePrevPhoto}
                              className="w-1/2 h-2/3 cursor-pointer"
                              title="Previous photo"
                            />
                            <div
                              onClick={handleNextPhoto}
                              className="w-1/2 h-2/3 cursor-pointer"
                              title="Next photo"
                            />
                          </div>
                        )}
                      </div>

                      {/* ── Segmented Photo Indicator Bars (Tinder clone) ─────── */}
                      <div className="relative z-20 p-4 pb-0 flex items-center justify-between gap-1.5">
                        <div className="flex-1 flex items-center gap-1.5">
                          {cardImages.map((_, idx) => (
                            <div
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentPhotoIndex(idx);
                              }}
                              className="flex-1 h-1 rounded-full cursor-pointer transition-all overflow-hidden bg-white/30 backdrop-blur-xs"
                            >
                              <div
                                className={`h-full transition-all duration-200 ${
                                  idx === currentPhotoIndex ? "bg-[#F59E0B] w-full" : "w-0"
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top Pills Bar (Location & Credits) */}
                      <div className="relative z-20 px-4 pt-2.5 flex items-center justify-between gap-2">
                        {/* Location-style stage pill */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="bg-[#003C3C]/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1 shadow-sm">
                            <span>📍 Stage {currentCard.module.stage}</span>
                            <span className="opacity-40">•</span>
                            <span>{currentCard.module.term === "AUT" ? "Term 1" : currentCard.module.term === "SPR" ? "Term 2" : "Full Year"}</span>
                          </span>

                          {!currentCard.module.condonable && (
                            <span className="bg-[#F59E0B] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider">
                              Non-Condonable
                            </span>
                          )}
                        </div>

                        {/* Credits gold pill */}
                        <span className="bg-[#F59E0B] text-slate-950 text-xs font-black px-3 py-1.5 rounded-full shadow-sm shrink-0 flex items-center gap-1">
                          <GraduationCap size={13} />
                          <span>{currentCard.module.credits} Credits</span>
                        </span>
                      </div>

                      {/* Context banner (Why this card?) */}
                      {currentCard.reason && (
                        <div className="relative z-20 px-4 pt-1">
                          <div className="px-3 py-1 rounded-xl bg-[#003C3C]/80 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-2 shadow-xs">
                            <Sparkles size={13} className="text-[#F59E0B] shrink-0 fill-amber-400" />
                            <span className="truncate">{currentCard.reason}</span>
                          </div>
                        </div>
                      )}

                      {/* Bottom Profile Overlay (Tinder layout with Exeter colors) */}
                      <div className="relative z-20 bg-gradient-to-t from-[#001D1D] via-[#001D1D]/90 to-transparent pt-10 pb-5 px-5 text-white flex flex-col justify-end">
                        
                        {/* Title & Gold Verified Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
                                {currentCard.module.code}
                              </h2>
                              <BadgeCheck size={22} className="text-[#F59E0B] fill-amber-400/20 shrink-0" />
                            </div>
                            <h3 className="text-base font-bold text-white/95 line-clamp-1 mt-0.5">
                              {currentCard.module.title}
                            </h3>
                          </div>

                          {/* Info Button to slide up syllabus */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedInfo(v => !v);
                            }}
                            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 active:scale-90 transition-all cursor-pointer"
                            title="View module syllabus"
                          >
                            <Info size={18} />
                          </button>
                        </div>

                        {/* Interest Pill Tags (Tinder style) */}
                        <div className="flex items-center gap-1.5 flex-wrap mt-3">
                          {getModuleTinderTags(currentCard.module, currentCard.unlocksCount)
                            .slice(0, 4)
                            .map((tag, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-semibold bg-white/15 hover:bg-white/25 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white/95 shadow-2xs"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>

                        {/* Expandable Syllabus Drawer / Mini Preview */}
                        {expandedInfo && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-white/20 text-xs text-white/85 space-y-2 overflow-hidden"
                          >
                            <p className="line-clamp-4 leading-relaxed text-white/90">
                              {currentCard.module.description || "Detailed syllabus and learning outcomes provided by University of Exeter."}
                            </p>
                            {currentCard.module.assessmentType && (
                              <div className="flex items-center gap-2 text-white font-medium">
                                <BookOpen size={13} className="text-[#00C4AD]" />
                                <span>{currentCard.module.assessmentType}</span>
                              </div>
                            )}
                            {currentCard.module.prerequisites.length > 0 && (
                              <div className="text-[11px] text-amber-200">
                                <strong>Requires:</strong> {currentCard.module.prerequisites.join(", ")}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  /* Empty Deck State */
                  <div className="text-center p-6 max-w-sm space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#003C3C] to-[#00A693] text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20 ring-4 ring-amber-400/20">
                      <Sparkles size={32} className="text-[#F59E0B]" />
                    </div>
                    <h3 className="text-xl font-black text-[#003C3C]">
                      No More Modules!
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You've swiped through all available optional modules for this filter. Review your matches in the portfolio or apply them directly to your degree plan.
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab("matches")}
                        className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#003C3C] to-[#007A6B] text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 ring-2 ring-amber-400/40 hover:opacity-95 transition-all cursor-pointer"
                      >
                        <Heart size={16} className="fill-white" />
                        <span>View Matches ({discoveryState.liked.length})</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetDeck}
                        className="w-full py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        <span>Reset Deck & Swipe Again</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Floating Action Controls (Exeter Emerald & Gold Palette) ── */}
              <div className="shrink-0 pt-2 pb-1 flex items-center justify-center gap-3 z-30">
                {/* 1. Rewind / Undo (Warm Gold / Amber) */}
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={discoveryState.history.length === 0}
                  className={`w-11 h-11 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer ${
                    discoveryState.history.length === 0
                      ? "opacity-35 cursor-not-allowed text-slate-300"
                      : "text-[#D97706] hover:scale-110 active:scale-90 hover:bg-amber-50"
                  }`}
                  title="Rewind (Undo last swipe)"
                >
                  <RotateCcw size={19} strokeWidth={2.5} />
                </button>

                {/* 2. Dislike (Nope) */}
                <button
                  type="button"
                  onClick={() => handleSwipe("dislike")}
                  disabled={!currentCard}
                  className="w-14 h-14 rounded-full bg-white shadow-lg border border-slate-200 text-[#EF4444] flex items-center justify-center hover:scale-110 active:scale-90 hover:bg-red-50 transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                  title="Nope (Swipe Left)"
                >
                  <X size={28} strokeWidth={3} />
                </button>

                {/* 3. Super Like (Exeter Gold) */}
                <button
                  type="button"
                  onClick={() => handleSwipe("superlike")}
                  disabled={!currentCard}
                  className="w-11 h-11 rounded-full bg-amber-50/50 shadow-md border border-amber-300 text-[#F59E0B] flex items-center justify-center hover:scale-110 active:scale-90 transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                  title="Super Like (Swipe Up)"
                >
                  <Star size={20} className="fill-[#F59E0B]" />
                </button>

                {/* 4. Like (Exeter Emerald Green with Gold Ring) */}
                <button
                  type="button"
                  onClick={() => handleSwipe("like")}
                  disabled={!currentCard}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#004D40] via-[#00796B] to-[#00A693] text-white shadow-xl shadow-emerald-900/30 ring-4 ring-amber-400/30 flex items-center justify-center hover:scale-110 active:scale-90 transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                  title="Like (Swipe Right)"
                >
                  <Heart size={30} className="fill-white" />
                </button>

                {/* 5. Next Photo / Info */}
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  disabled={!currentCard}
                  className="w-11 h-11 rounded-full bg-white shadow-md border border-slate-200 text-[#00A693] hover:scale-110 active:scale-90 flex items-center justify-center transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                  title="Next Photo / Visual"
                >
                  <Zap size={19} className="fill-[#00A693]" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: MATCHES (Exeter Green & Gold Portfolio) */}
          {activeTab === "matches" && (
            <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#003C3C] flex items-center gap-2">
                    <Heart size={20} className="text-[#00A693] fill-[#00A693]" />
                    <span>Your Matches</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {discoveryState.liked.length} modules curated for {programme.code}
                  </p>
                </div>

                {discoveryState.liked.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetDeck}
                    className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={13} /> Reset
                  </button>
                )}
              </div>

              {/* 1-Tap Apply to Plan Button */}
              <div className="p-4 rounded-3xl bg-gradient-to-r from-[#003C3C] to-[#007A6B] text-white shadow-lg shadow-emerald-900/20 ring-2 ring-amber-400/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                    Auto-Fill Engine
                  </span>
                  <span className="text-xs font-bold text-amber-300">{discoveryState.liked.length} Likes Ready</span>
                </div>
                <h4 className="text-base font-black">
                  Apply Matches to Degree Plan
                </h4>
                <p className="text-xs text-white/85">
                  Intelligently populates eligible elective slots respecting the 120 credit stage limits and prerequisite sequences.
                </p>
                <button
                  type="button"
                  onClick={handleApplyToPlan}
                  disabled={discoveryState.liked.length === 0}
                  className="w-full py-3 rounded-full bg-white text-[#003C3C] font-black text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-amber-50 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Sparkles size={16} className="text-[#F59E0B]" />
                  <span>Sync to Active Degree Plan</span>
                </button>
              </div>

              {/* Liked Cards List */}
              <div className="space-y-2">
                {discoveryState.liked.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No matches yet. Swipe right on modules in Discover to build your portfolio!
                  </div>
                ) : (
                  discoveryState.liked.map(code => {
                    const mod = moduleMap.get(code);
                    if (!mod) return null;
                    const isSuper = discoveryState.superliked.includes(code);
                    const isInPlan = selectedModules.has(code);

                    return (
                      <div
                        key={code}
                        className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003C3C] to-[#007A6B] flex items-center justify-center text-amber-300 font-black text-xs shrink-0 shadow-2xs border border-amber-400/30">
                            {mod.credits}
                          </div>
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-1.5">
                              <h5 className="text-xs font-black text-slate-900 truncate">
                                {mod.code} {mod.title}
                              </h5>
                              {isSuper && <Star size={13} className="text-[#F59E0B] fill-[#F59E0B] shrink-0" />}
                            </div>
                            <span className="text-[11px] text-slate-500 block truncate">
                              Stage {mod.stage} • {mod.term === "AUT" ? "Term 1" : mod.term === "SPR" ? "Term 2" : "Full Year"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isInPlan ? (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Check size={12} /> In Plan
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                const nextLiked = discoveryState.liked.filter(c => c !== code);
                                const nextSuper = discoveryState.superliked.filter(c => c !== code);
                                onUpdateDiscoveryState({
                                  ...discoveryState,
                                  liked: nextLiked,
                                  superliked: nextSuper,
                                });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Remove match"
                            >
                              <X size={15} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ARCHETYPE (Exeter Curriculum Persona) */}
          {activeTab === "profile" && (
            <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-4">
              <div className="text-center pt-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#003C3C] to-[#00A693] text-amber-300 ring-4 ring-amber-400/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20 text-2xl font-black">
                  🎓
                </div>
                <h3 className="text-xl font-black text-[#003C3C] mt-2">
                  {personality.archetype}
                </h3>
                <p className="text-xs font-bold text-[#00A693] mt-0.5">
                  "{personality.tagline}"
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed px-2">
                  {personality.description}
                </p>
              </div>

              {/* Assessment Breakdown Chart */}
              <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Assessment Preference</span>
                  <span>{personality.examPercentage}% Exam / {personality.courseworkPercentage}% Coursework</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#003C3C] h-full transition-all duration-500"
                    style={{ width: `${personality.examPercentage}%` }}
                    title={`Exam: ${personality.examPercentage}%`}
                  />
                  <div
                    className="bg-[#F59E0B] h-full transition-all duration-500"
                    style={{ width: `${personality.courseworkPercentage}%` }}
                    title={`Coursework: ${personality.courseworkPercentage}%`}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#003C3C] inline-block"/> Final Exams</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] inline-block"/> Coursework & Projects</span>
                </div>
              </div>

              {/* Term Distribution */}
              <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Term Workload Balance</span>
                  <span>{personality.autumnCredits}cr Term 1 / {personality.springCredits}cr Term 2</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#007A6B] h-full transition-all duration-500"
                    style={{ width: `${(personality.autumnCredits / (personality.autumnCredits + personality.springCredits || 1)) * 100}%` }}
                  />
                  <div
                    className="bg-amber-500 h-full transition-all duration-500"
                    style={{ width: `${(personality.springCredits / (personality.autumnCredits + personality.springCredits || 1)) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#007A6B] inline-block"/> Autumn Term</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"/> Spring Term</span>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Liked</span>
                  <span className="text-xl font-black text-[#003C3C]">{personality.totalLiked}</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Programme</span>
                  <span className="text-xs font-black text-[#003C3C] truncate block">{programme.code}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ── Bottom 3-Tab Bar (Exeter Emerald & Gold Nav) ──────────────────── */}
        <nav className="shrink-0 px-8 py-3 bg-white/95 backdrop-blur-md border-t border-emerald-900/10 flex items-center justify-around z-30">
          {/* Tab 1: Discover */}
          <button
            type="button"
            onClick={() => setActiveTab("discover")}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
              activeTab === "discover"
                ? "text-[#00A693] scale-105"
                : "text-slate-400 hover:text-slate-600"
            }`}
            title="Discover Cards"
          >
            <Flame size={24} className={activeTab === "discover" ? "fill-[#00A693]" : ""} />
            <span className="text-[10px] font-bold">Discover</span>
          </button>

          {/* Tab 2: Matches */}
          <button
            type="button"
            onClick={() => setActiveTab("matches")}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer relative ${
              activeTab === "matches"
                ? "text-[#00A693] scale-105"
                : "text-slate-400 hover:text-slate-600"
            }`}
            title="Your Matches"
          >
            <div className="relative">
              <Heart size={24} className={activeTab === "matches" ? "fill-[#00A693]" : ""} />
              {discoveryState.liked.length > 0 && (
                <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 bg-[#F59E0B] text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {discoveryState.liked.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold">Matches</span>
          </button>

          {/* Tab 3: Profile / Archetype */}
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
              activeTab === "profile"
                ? "text-[#00A693] scale-105"
                : "text-slate-400 hover:text-slate-600"
            }`}
            title="Curriculum Archetype"
          >
            <User size={24} className={activeTab === "profile" ? "fill-[#00A693]" : ""} />
            <span className="text-[10px] font-bold">Persona</span>
          </button>
        </nav>

        {/* ── Toast Notification for Apply to Plan ──────────────────────────── */}
        {applyFeedback && (
          <div className="absolute top-16 inset-x-4 z-40 bg-[#003C3C] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between text-xs font-bold animate-in slide-in-from-top-2 duration-200 border border-amber-400/30">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>{applyFeedback}</span>
            </span>
            <button
              type="button"
              onClick={() => setApplyFeedback(null)}
              className="p-1 text-white/70 hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* ── THE ICONIC "IT'S A MATCH!" CELEBRATION (Exeter Emerald & Gold) ── */}
        <AnimatePresence>
          {matchCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
            >
              {/* Overlapping Tilted Cards at Top */}
              <div className="relative w-64 h-48 flex items-center justify-center mb-6">
                {/* Left Card: Student / Exeter Profile */}
                <motion.div
                  initial={{ x: -80, rotate: -25, opacity: 0 }}
                  animate={{ x: -32, rotate: -12, opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-32 h-44 rounded-2xl bg-gradient-to-br from-[#003C3C] to-[#005C53] text-white shadow-2xl border-2 border-white flex flex-col justify-between p-3 ring-2 ring-amber-400/40"
                >
                  <div className="text-[9px] font-black uppercase tracking-wider text-amber-300">
                    Scholar
                  </div>
                  <div className="text-center">
                    <span className="text-2xl">🎓</span>
                    <h6 className="text-xs font-black mt-1">Exeter Student</h6>
                  </div>
                  <div className="text-[9px] text-white/75 truncate">
                    {programme.code}
                  </div>
                </motion.div>

                {/* Right Card: Matched Module */}
                <motion.div
                  initial={{ x: 80, rotate: 25, opacity: 0 }}
                  animate={{ x: 32, rotate: 12, opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-32 h-44 rounded-2xl bg-gradient-to-br from-[#002B2B] to-[#006A61] text-white shadow-2xl border-2 border-white flex flex-col justify-between p-3 ring-2 ring-amber-400/40 overflow-hidden relative"
                >
                  <div className="text-[9px] font-black uppercase tracking-wider text-amber-300">
                    Match
                  </div>
                  <div className="text-center">
                    <h6 className="text-sm font-black tracking-tight">{matchCelebration.module.code}</h6>
                    <p className="text-[10px] text-white/85 line-clamp-2 mt-0.5">{matchCelebration.module.title}</p>
                  </div>
                  <div className="text-[9px] text-amber-300 font-bold">
                    Stage {matchCelebration.module.stage} • {matchCelebration.module.credits}cr
                  </div>
                </motion.div>

                {/* Floating Heart Badge in Center */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute z-20 w-12 h-12 rounded-full bg-gradient-to-tr from-[#003C3C] to-[#00A693] text-white flex items-center justify-center shadow-xl shadow-emerald-900/40 border-2 border-white ring-2 ring-amber-400/50"
                >
                  <Heart size={22} className="fill-amber-400 text-amber-400" />
                </motion.div>
              </div>

              {/* Match Headings */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="space-y-1.5 mb-6"
              >
                <span className="text-[11px] font-black uppercase tracking-widest text-[#D97706]">
                  CONGRATULATIONS
                </span>
                <h2 className="text-3xl font-black text-[#003C3C] tracking-tight leading-none">
                  It's a Match!
                </h2>
                <p className="text-xs text-slate-600 max-w-xs mt-2 leading-relaxed">
                  You and <strong className="text-[#003C3C]">{matchCelebration.module.code}</strong> are a great fit. {matchCelebration.reason}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="w-full max-w-xs space-y-2.5"
              >
                {/* Primary Button */}
                <button
                  type="button"
                  onClick={() => {
                    const nextSelected = new Set(selectedModules);
                    nextSelected.add(matchCelebration.module.code);
                    onApplyToPlan(nextSelected, `Added ${matchCelebration.module.code} to your plan!`);
                    setMatchCelebration(null);
                    triggerHaptic(20);
                  }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#003C3C] to-[#007A6B] text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 ring-2 ring-amber-400/40 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                >
                  <Heart size={15} className="fill-amber-300 text-amber-300" />
                  <span>Add to Degree Plan</span>
                </button>

                {/* Secondary Button */}
                <button
                  type="button"
                  onClick={() => setMatchCelebration(null)}
                  className="w-full py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Keep Swiping
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
