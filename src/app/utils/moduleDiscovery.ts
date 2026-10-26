// ═══════════════════════════════════════════════════════════════════
// MODULE DISCOVERY & MATCHMAKER ENGINE
// ═══════════════════════════════════════════════════════════════════

import type { Module, StageReq } from "../../api/timeedit";

export type SwipeAction = "like" | "dislike" | "superlike";

export interface SwipeHistoryEntry {
  code: string;
  action: SwipeAction;
  timestamp: number;
}

export interface DiscoveryState {
  liked: string[];
  disliked: string[];
  superliked: string[];
  history: SwipeHistoryEntry[];
}

export interface DiscoveryCardItem {
  module: Module;
  reason?: string;
  priorityScore: number;
  unlocksCount: number;
  unlockedCodes: string[];
}

export interface PersonalityProfile {
  archetype: string;
  tagline: string;
  description: string;
  examPercentage: number;
  courseworkPercentage: number;
  autumnCredits: number;
  springCredits: number;
  totalLiked: number;
  topStages: number[];
}

/**
 * Generates Tinder-style interest pills for a module.
 */
export function getModuleTinderTags(module: Module, unlocksCount: number = 0): string[] {
  const tags: string[] = [];

  // Assessment tags
  if (module.assessmentType) {
    const examMatch = module.assessmentType.match(/Exam\s*\((\d+)%\)/i);
    const crwMatch = module.assessmentType.match(/Coursework\s*\((\d+)%\)/i);
    const exam = examMatch ? parseInt(examMatch[1], 10) : 0;
    const crw = crwMatch ? parseInt(crwMatch[1], 10) : 0;

    if (exam === 0 && crw === 100) tags.push("100% Coursework 📝");
    else if (exam >= 80) tags.push(`Exam Heavy (${exam}%) 🧠`);
    else if (crw >= 70) tags.push(`Project Heavy (${crw}%) 🛠️`);
    else if (exam > 0 && crw > 0) tags.push(`Balanced (${exam}% / ${crw}%) ⚖️`);
  }

  // Term tag
  if (module.term === "AUT") tags.push("Autumn Term 🍂");
  else if (module.term === "SPR") tags.push("Spring Term 🌸");
  else tags.push("Full Academic Year 📅");

  // Prerequisites status
  if (!module.prerequisites || module.prerequisites.length === 0) {
    tags.push("No Prerequisites 🚀");
  } else {
    tags.push(`${module.prerequisites.length} Prereq${module.prerequisites.length > 1 ? "s" : ""} 📋`);
  }

  // Unlocks
  if (unlocksCount > 0) {
    tags.push(`Unlocks ${unlocksCount} Courses 🔑`);
  }

  // Credits
  tags.push(`${module.credits} Credits 🎓`);

  // Keyword extraction from module title
  const title = (module.title || "").toLowerCase();
  if (title.includes("software") || title.includes("programming") || title.includes("coding")) tags.push("Software Dev 💻");
  else if (title.includes("machine learning") || title.includes("ai") || title.includes("intelligence")) tags.push("AI & ML 🤖");
  else if (title.includes("data") || title.includes("statistics") || title.includes("analytics")) tags.push("Data Science 📊");
  else if (title.includes("math") || title.includes("calculus") || title.includes("algebra") || title.includes("analysis")) tags.push("Pure Math 📐");
  else if (title.includes("security") || title.includes("cryptograph") || title.includes("cyber")) tags.push("Cybersecurity 🛡️");
  else if (title.includes("finance") || title.includes("economic") || title.includes("market")) tags.push("Economics 📈");
  else if (title.includes("nature") || title.includes("biological") || title.includes("climate")) tags.push("Environmental 🌿");

  return tags;
}

/**
 * Returns dynamic subject-based gradients and accents aligned with Exeter's emerald & gold brand.
 */
export function getModuleCardVisual(module: Module): {
  gradient: string;
  accentColor: string;
  textColor: string;
  badgeBg: string;
} {
  const code = (module.code || "").toUpperCase();
  const name = (module.title || "").toLowerCase();

  // Computer Science / Cyber
  if (code.startsWith("ECM") || name.includes("computer") || name.includes("software")) {
    return {
      gradient: "from-[#003C3C] via-[#005C53] to-[#042F2E]",
      accentColor: "#00A693",
      textColor: "text-emerald-300",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    };
  }

  // Mathematics & Statistics
  if (code.startsWith("MTH") || name.includes("math") || name.includes("algebra")) {
    return {
      gradient: "from-[#002B2B] via-[#0F3D3E] to-[#1E293B]",
      accentColor: "#F59E0B",
      textColor: "text-amber-300",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    };
  }

  // Engineering & Physics
  if (code.startsWith("ENG") || name.includes("engineer") || name.includes("physics")) {
    return {
      gradient: "from-[#1F2937] via-[#064E3B] to-[#78350F]",
      accentColor: "#F59E0B",
      textColor: "text-amber-400",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    };
  }

  // Business & Finance
  if (code.startsWith("BEM") || name.includes("business") || name.includes("management") || name.includes("finance")) {
    return {
      gradient: "from-[#003C3C] via-[#1E3A8A] to-[#0F172A]",
      accentColor: "#00A693",
      textColor: "text-sky-300",
      badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    };
  }

  // Exeter signature Emerald & Gold fallback
  return {
    gradient: "from-[#003C3C] via-[#005F55] to-[#0D1F1D]",
    accentColor: "#00A693",
    textColor: "text-emerald-300",
    badgeBg: "bg-[#00A693]/20 text-emerald-300 border-[#00A693]/30",
  };
}

/**
 * Returns curated high-resolution educational photography tailored to the module's topic.
 * Provides a 2-to-3 image gallery for the Tinder card photo carousel.
 */
export function getModuleImages(module: Module): string[] {
  const code = (module.code || "").toUpperCase();
  const title = (module.title || "").toLowerCase();

  // 1. Weather / Climate / Meteorology / Fluid Dynamics
  if (title.includes("weather") || title.includes("climate") || title.includes("atmosphere") || title.includes("fluid")) {
    return [
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1000&q=80", // Storm clouds / atmospheric layers
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80", // Orbital view of earth atmosphere
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80", // Mathematical equations
    ];
  }

  // 2. Machine Learning / AI / Neural Networks / Vision
  if (title.includes("machine learning") || title.includes("intelligence") || title.includes("neural") || title.includes("ai")) {
    return [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80", // Neural network abstract digital flow
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80", // Cyber AI computing
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80", // Code workstation
    ];
  }

  // 3. Software Engineering / Coding / Web / Systems
  if (title.includes("software") || title.includes("program") || title.includes("develop") || title.includes("object") || code.startsWith("ECM")) {
    return [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80", // Dark code editor
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80", // Modern development setup
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80", // Exeter campus
    ];
  }

  // 4. Statistics / Data Science / Analytics / Probability
  if (title.includes("data") || title.includes("statistic") || title.includes("probability") || title.includes("analytics")) {
    return [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80", // Glowing analytics graphs & data
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80", // Digital charts
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80", // Mathematical board
    ];
  }

  // 5. Differential Equations / Complex Analysis / Calculus / Pure Mathematics
  if (title.includes("differential") || title.includes("equation") || title.includes("analysis") || title.includes("calculus") || title.includes("algebra") || title.includes("geometry") || code.startsWith("MTH")) {
    return [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80", // 3D topological geometric manifold
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80", // Mathematical proofs on slate
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80", // Matrix lattice
    ];
  }

  // 6. Cybersecurity / Cryptography / Networks / Security
  if (title.includes("security") || title.includes("cryptograph") || title.includes("network") || title.includes("cyber")) {
    return [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80", // Cyber matrix data lock
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80", // Network server infrastructure
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80", // Code workstation
    ];
  }

  // 7. Finance / Economics / Markets / Accounting
  if (title.includes("finance") || title.includes("economic") || title.includes("market") || title.includes("business") || code.startsWith("BEM")) {
    return [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80", // Stock charts & financial analytics
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80", // Financial architectural district
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80", // Data graphs
    ];
  }

  // 8. Engineering / Robotics / Mechanics / Physics
  if (title.includes("engineer") || title.includes("mechanic") || title.includes("robot") || title.includes("physics") || code.startsWith("ENG")) {
    return [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80", // Precision engineering
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80", // Robotics
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80", // Hardware circuits
    ];
  }

  // 9. Universal Academic Exeter Fallback
  return [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80", // University campus architecture
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80", // Student collaboration & study
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80", // Scientific mathematics
  ];
}



/**
 * Calculates which modules directly require `moduleCode` as a prerequisite.
 */
export function getPostRequisites(moduleCode: string, allModules: Module[]): string[] {
  return allModules
    .filter(m => m.prerequisites && m.prerequisites.includes(moduleCode))
    .map(m => m.code);
}

/**
 * Build initial swipe deck from optional modules for the active programme.
 */
export function buildInitialDeck(
  modules: Module[],
  stageReqs: StageReq[],
  state: DiscoveryState,
  stageFilter?: number | "all"
): DiscoveryCardItem[] {
  const swipedCodes = new Set([
    ...state.liked,
    ...state.disliked,
    ...state.superliked,
  ]);

  // Optional modules only (compulsory modules don't need swiping as they are already mandated)
  let pool = modules.filter(m => m.type === "optional");

  if (stageFilter && stageFilter !== "all") {
    pool = pool.filter(m => m.stage === stageFilter);
  }

  // Filter out already swiped cards
  const unswiped = pool.filter(m => !swipedCodes.has(m.code));

  // Map post-requisites and base priority
  const items: DiscoveryCardItem[] = unswiped.map(mod => {
    const unlockedCodes = getPostRequisites(mod.code, modules);
    const unlocksCount = unlockedCodes.length;

    // Base priority: Stage 1 = 1000, Stage 2 = 700, Stage 3 = 400, Stage 4 = 100
    // Higher unlocks add +20 per unlocked module
    const stageWeight = (5 - mod.stage) * 200;
    const priorityScore = stageWeight + unlocksCount * 25;

    let reason: string | undefined = undefined;
    if (unlocksCount >= 3) {
      reason = `🔑 Unlocks ${unlocksCount} higher-level modules!`;
    } else if (mod.stage === 1) {
      reason = "Foundation core elective";
    }

    return {
      module: mod,
      priorityScore,
      unlocksCount,
      unlockedCodes,
      reason,
    };
  });

  // Sort descending by priority score
  items.sort((a, b) => b.priorityScore - a.priorityScore);

  return items;
}

/**
 * Process a swipe action, update discovery state, and re-order the remaining deck
 * based on prerequisite chains and post-requisite boosts.
 */
export function processSwipe(
  currentState: DiscoveryState,
  targetCode: string,
  action: SwipeAction,
  currentDeck: DiscoveryCardItem[],
  moduleMap: Map<string, Module>
): { nextState: DiscoveryState; nextDeck: DiscoveryCardItem[] } {
  const nextLiked = [...currentState.liked];
  const nextDisliked = [...currentState.disliked];
  const nextSuperliked = [...currentState.superliked];

  if (action === "like") {
    if (!nextLiked.includes(targetCode)) nextLiked.push(targetCode);
  } else if (action === "dislike") {
    if (!nextDisliked.includes(targetCode)) nextDisliked.push(targetCode);
  } else if (action === "superlike") {
    if (!nextSuperliked.includes(targetCode)) nextSuperliked.push(targetCode);
    if (!nextLiked.includes(targetCode)) nextLiked.push(targetCode);
  }

  const nextState: DiscoveryState = {
    liked: nextLiked,
    disliked: nextDisliked,
    superliked: nextSuperliked,
    history: [
      ...currentState.history,
      { code: targetCode, action, timestamp: Date.now() },
    ],
  };

  // Remove swiped card from remaining deck
  const remaining = currentDeck.filter(item => item.module.code !== targetCode);

  const targetMod = moduleMap.get(targetCode);
  if (!targetMod) {
    return { nextState, nextDeck: remaining };
  }

  if (action === "like" || action === "superlike") {
    const postReqCodes = new Set(getPostRequisites(targetCode, Array.from(moduleMap.values())));
    const preReqCodes = new Set(targetMod.prerequisites || []);
    const coReqCodes = new Set(targetMod.corequisites || []);

    const updatedRemaining: DiscoveryCardItem[] = remaining.map(item => {
      let scoreDelta = 0;
      let newReason = item.reason;

      // 1. Post-requisite boost: Boost downstream modules that depend on this liked module
      if (postReqCodes.has(item.module.code)) {
        scoreDelta += action === "superlike" ? 120 : 80;
        newReason = `✨ Unlocked by ${targetCode} which you liked!`;
      }

      // 2. Co-requisite pairing boost
      if (coReqCodes.has(item.module.code)) {
        scoreDelta += 90;
        newReason = `🔗 Co-requisite paired with ${targetCode}`;
      }

      // 3. Prerequisite injection: If this card is a prerequisite of the liked module, heavily prioritize it
      if (preReqCodes.has(item.module.code)) {
        scoreDelta += 250;
        newReason = `🚨 Required prerequisite for ${targetCode}!`;
      }

      return {
        ...item,
        priorityScore: item.priorityScore + scoreDelta,
        reason: newReason || item.reason,
      };
    });

    // Re-sort deck by updated priority score
    updatedRemaining.sort((a, b) => b.priorityScore - a.priorityScore);
    return { nextState, nextDeck: updatedRemaining };
  } else {
    // If disliked: Lower priority of modules that strictly require this module
    const postReqCodes = new Set(getPostRequisites(targetCode, Array.from(moduleMap.values())));
    const updatedRemaining: DiscoveryCardItem[] = remaining.map(item => {
      if (postReqCodes.has(item.module.code)) {
        return {
          ...item,
          priorityScore: item.priorityScore - 40,
        };
      }
      return item;
    });

    updatedRemaining.sort((a, b) => b.priorityScore - a.priorityScore);
    return { nextState, nextDeck: updatedRemaining };
  }
}

/**
 * Rewind / Undo the last swipe action.
 */
export function undoLastSwipe(
  currentState: DiscoveryState
): { nextState: DiscoveryState; restoredCode: string | null; restoredAction: SwipeAction | null } {
  if (currentState.history.length === 0) {
    return { nextState: currentState, restoredCode: null, restoredAction: null };
  }

  const lastEntry = currentState.history[currentState.history.length - 1];
  const nextHistory = currentState.history.slice(0, -1);
  const nextLiked = currentState.liked.filter(c => c !== lastEntry.code);
  const nextDisliked = currentState.disliked.filter(c => c !== lastEntry.code);
  const nextSuperliked = currentState.superliked.filter(c => c !== lastEntry.code);

  const nextState: DiscoveryState = {
    liked: nextLiked,
    disliked: nextDisliked,
    superliked: nextSuperliked,
    history: nextHistory,
  };

  return { nextState, restoredCode: lastEntry.code, restoredAction: lastEntry.action };
}

/**
 * Calculates student personality and workload archetype based on liked modules.
 */
export function calculatePersonalityProfile(
  likedCodes: string[],
  moduleMap: Map<string, Module>
): PersonalityProfile {
  const likedMods = likedCodes
    .map(c => moduleMap.get(c))
    .filter((m): m is Module => !!m);

  if (likedMods.length === 0) {
    return {
      archetype: "The Explorer",
      tagline: "Ready to discover your path",
      description: "Start swiping right on modules that pique your interest to unlock your personalized curriculum archetype.",
      examPercentage: 50,
      courseworkPercentage: 50,
      autumnCredits: 0,
      springCredits: 0,
      totalLiked: 0,
      topStages: [],
    };
  }

  let totalExamWeight = 0;
  let totalCourseworkWeight = 0;
  let assessedCount = 0;
  let autumnCredits = 0;
  let springCredits = 0;
  const stageCounts: Record<number, number> = {};

  likedMods.forEach(m => {
    // Term credits
    if (m.term === "AUT") autumnCredits += m.credits;
    else if (m.term === "SPR") springCredits += m.credits;
    else {
      autumnCredits += m.credits / 2;
      springCredits += m.credits / 2;
    }

    // Stage distribution
    stageCounts[m.stage] = (stageCounts[m.stage] || 0) + 1;

    // Assessment parse: e.g. "Exam (80%) + Coursework (20%)"
    if (m.assessmentType) {
      const examMatch = m.assessmentType.match(/Exam\s*\((\d+)%\)/i);
      const crwMatch = m.assessmentType.match(/Coursework\s*\((\d+)%\)/i);

      if (examMatch || crwMatch) {
        const exam = examMatch ? parseInt(examMatch[1], 10) : 0;
        const crw = crwMatch ? parseInt(crwMatch[1], 10) : 0;
        totalExamWeight += exam;
        totalCourseworkWeight += crw;
        assessedCount++;
      }
    }
  });

  const avgExam = assessedCount > 0 ? Math.round(totalExamWeight / assessedCount) : 65;
  const avgCrw = assessedCount > 0 ? Math.round(totalCourseworkWeight / assessedCount) : 35;

  // Determine Archetype
  let archetype = "Balanced Polymath";
  let tagline = "Well-rounded strategist across theory & application";
  let description = "You maintain a harmonious balance between rigorous summative exams and practical continuous coursework.";

  if (avgCrw >= 50) {
    archetype = "Applied Practitioner";
    tagline = "Hands-on problem solver & coursework specialist";
    description = "You thrive on continuous assessment, project-based assignments, and applied coursework over high-stakes exams.";
  } else if (avgExam >= 75) {
    archetype = "Theoretical Purist";
    tagline = "Deep analytical thinker & theoretical master";
    description = "You gravitate toward rigorous theoretical foundations and high-focus exam formats where precision and proofs shine.";
  } else if (autumnCredits > springCredits * 1.6) {
    archetype = "Autumn Sprinter";
    tagline = "Front-loaded momentum seeker";
    description = "Your selections heavily favor Autumn Term (Term 1), setting yourself up for an intense first term and breezy spring revision.";
  } else if (springCredits > autumnCredits * 1.6) {
    archetype = "Spring Finisher";
    tagline = "Late-season crescendo planner";
    description = "You stack your elective workload into Spring Term (Term 2), leaving ample breathing room in Autumn to settle in.";
  }

  const topStages = Object.entries(stageCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([stg]) => parseInt(stg, 10));

  return {
    archetype,
    tagline,
    description,
    examPercentage: avgExam,
    courseworkPercentage: avgCrw,
    autumnCredits,
    springCredits,
    totalLiked: likedMods.length,
    topStages,
  };
}

/**
 * Intelligent Auto-fill: Populates empty optional slots in active plan
 * using liked modules from portfolio, validating stage caps (120cr) and prerequisites.
 */
export function autoFillPlanFromPortfolio(
  likedCodes: string[],
  superlikedCodes: string[],
  currentSelected: Set<string>,
  modules: Module[],
  stageReqs: StageReq[]
): {
  newSelected: Set<string>;
  addedCodes: string[];
  skippedDueToCap: string[];
  skippedDueToPrereq: string[];
} {
  const result = new Set<string>(currentSelected);
  const addedCodes: string[] = [];
  const skippedDueToCap: string[] = [];
  const skippedDueToPrereq: string[] = [];

  const moduleMap = new Map<string, Module>(modules.map(m => [m.code, m]));

  // Prioritize Superliked codes first, then liked codes
  const candidateCodes = Array.from(new Set([...superlikedCodes, ...likedCodes]));

  // Helper to compute current credits for a given stage in result
  const getStageCreds = (stage: number) => {
    return modules
      .filter(m => (m.type === "compulsory" || result.has(m.code)) && m.stage === stage)
      .reduce((sum, m) => sum + m.credits, 0);
  };

  for (const code of candidateCodes) {
    if (result.has(code)) continue;

    const mod = moduleMap.get(code);
    if (!mod || mod.type === "compulsory") continue;

    const req = stageReqs.find(r => r.stage === mod.stage);
    const targetCap = req ? req.totalRequired : 120;
    const currentStageCredits = getStageCreds(mod.stage);

    // Check credit cap
    if (currentStageCredits + mod.credits > targetCap) {
      skippedDueToCap.push(code);
      continue;
    }

    // Check prerequisites
    const prereqsSatisfied = mod.prerequisites.every(pCode => {
      const pMod = moduleMap.get(pCode);
      return pMod && (pMod.type === "compulsory" || result.has(pCode));
    });

    if (!prereqsSatisfied) {
      skippedDueToPrereq.push(code);
      continue;
    }

    // Select module
    result.add(code);
    addedCodes.push(code);
  }

  return {
    newSelected: result,
    addedCodes,
    skippedDueToCap,
    skippedDueToPrereq,
  };
}
