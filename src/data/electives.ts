// ═══════════════════════════════════════════════════════════════════
// UNIVERSITY OF EXETER FREE ELECTIVE MODULES CATALOGUE
// Curated list of multidisciplinary elective modules available for
// Stage 2, 3, and 4 undergraduate students outside their home department.
// ═══════════════════════════════════════════════════════════════════

export interface ElectiveModule {
  code: string;
  title: string;
  credits: number;
  department: string;
  category: "Languages (FLC)" | "Business & Management" | "Humanities & Arts" | "Social Sciences & Law" | "Data & Digital" | "Environment & Science";
  term: "AUT" | "SPR" | "AUTSPR";
  description: string;
  assessmentType: string;
}

export const CURATED_ELECTIVES: ElectiveModule[] = [
  // ── Languages (Foreign Language Centre - FLC) ───────────────────
  {
    code: "FLF1115",
    title: "French Beginners (Fast-Track)",
    credits: 15,
    department: "Foreign Language Centre",
    category: "Languages (FLC)",
    term: "AUT",
    description: "An intensive introductory course in spoken and written French for students with no previous knowledge of the language. Emphasizes communicative competence in everyday situations.",
    assessmentType: "Oral (40%) + Written Exam (60%)",
  },
  {
    code: "FLF2115",
    title: "French Intermediate",
    credits: 15,
    department: "Foreign Language Centre",
    category: "Languages (FLC)",
    term: "SPR",
    description: "Develops existing competence in French to intermediate fluency, focusing on discussion of topical issues, culture, and formal writing.",
    assessmentType: "Coursework (50%) + Exam (50%)",
  },
  {
    code: "FLS1115",
    title: "Spanish Beginners (Fast-Track)",
    credits: 15,
    department: "Foreign Language Centre",
    category: "Languages (FLC)",
    term: "AUT",
    description: "Introductory Spanish for complete beginners. Covers grammatical foundations, conversational fluency, and insights into Hispanic culture.",
    assessmentType: "Oral (40%) + Written Exam (60%)",
  },
  {
    code: "FLS2115",
    title: "Spanish Intermediate",
    credits: 15,
    department: "Foreign Language Centre",
    category: "Languages (FLC)",
    term: "SPR",
    description: "Consolidates intermediate Spanish listening, speaking, reading, and written expression on social and cultural themes.",
    assessmentType: "Coursework (50%) + Exam (50%)",
  },
  {
    code: "FLG1115",
    title: "German Beginners (Fast-Track)",
    credits: 15,
    department: "Foreign Language Centre",
    category: "Languages (FLC)",
    term: "AUT",
    description: "Introduction to the German language and the contemporary German-speaking world for students without prior study.",
    assessmentType: "Oral (40%) + Written Exam (60%)",
  },
  {
    code: "FLJ1115",
    title: "Japanese Beginners",
    credits: 15,
    department: "Foreign Language Centre",
    category: "Languages (FLC)",
    term: "AUT",
    description: "Fundamentals of Japanese, including mastery of Hiragana and Katakana syllabaries, basic Kanji, and essential spoken communication.",
    assessmentType: "Continuous Assessment (50%) + Exam (50%)",
  },
  {
    code: "FLM1115",
    title: "Mandarin Chinese Beginners",
    credits: 15,
    department: "Foreign Language Centre",
    category: "Languages (FLC)",
    term: "AUT",
    description: "Introduction to Standard Modern Chinese (Mandarin), focusing on Pinyin pronunciation, core Hanzi characters, and conversational exchanges.",
    assessmentType: "Oral Presentation (40%) + Written Exam (60%)",
  },
  {
    code: "FLI1115",
    title: "Italian Beginners",
    credits: 15,
    department: "Foreign Language Centre",
    category: "Languages (FLC)",
    term: "SPR",
    description: "Comprehensive introduction to Italian for beginners, focusing on contemporary cultural context, travel, and practical dialogue.",
    assessmentType: "Oral (40%) + Written Exam (60%)",
  },
  {
    code: "FLB1115",
    title: "British Sign Language (BSL) Beginners",
    credits: 15,
    department: "Foreign Language Centre",
    category: "Languages (FLC)",
    term: "AUT",
    description: "Introduction to British Sign Language and Deaf awareness, covering fingerspelling, spatial grammar, and everyday conversational interaction.",
    assessmentType: "Practical Signing Exam (70%) + Portfolio (30%)",
  },

  // ── Business & Management (Exeter Business School) ──────────────
  {
    code: "BEM1020",
    title: "Principles of Marketing",
    credits: 15,
    department: "Exeter Business School",
    category: "Business & Management",
    term: "AUT",
    description: "Explores the fundamental concepts and tools of marketing: consumer behavior, segmentation, targeting, positioning, and marketing mix strategies.",
    assessmentType: "Individual Report (60%) + Group Presentation (40%)",
  },
  {
    code: "BEM1002",
    title: "Introduction to Finance & Accounting",
    credits: 15,
    department: "Exeter Business School",
    category: "Business & Management",
    term: "SPR",
    description: "Designed for non-specialists to understand financial reporting, balance sheets, cash flow analysis, and capital investment appraisal.",
    assessmentType: "Exam (70%) + Mid-term Test (30%)",
  },
  {
    code: "BEM2025",
    title: "Social Enterprise & Sustainable Innovation",
    credits: 15,
    department: "Exeter Business School",
    category: "Business & Management",
    term: "SPR",
    description: "Examines how business models can address pressing societal and environmental challenges, fostering purpose-driven entrepreneurship.",
    assessmentType: "Business Pitch (50%) + Project Report (50%)",
  },
  {
    code: "BEM2007",
    title: "Leadership and High-Performing Teams",
    credits: 15,
    department: "Exeter Business School",
    category: "Business & Management",
    term: "AUT",
    description: "Critical analysis of leadership theories, organizational dynamics, emotional intelligence, and interpersonal team collaboration.",
    assessmentType: "Case Study Analysis (60%) + Reflective Essay (40%)",
  },
  {
    code: "BEE1029",
    title: "Economic Principles for Modern Society",
    credits: 15,
    department: "Economics",
    category: "Business & Management",
    term: "AUT",
    description: "Accessible introduction to micro and macroeconomic principles that shape public policy, inflation, climate economics, and international trade.",
    assessmentType: "Multiple Choice & Short Answer Exam (100%)",
  },

  // ── Humanities & Arts ───────────────────────────────────────────
  {
    code: "PHL1005",
    title: "Introduction to Ethics & Moral Reasoning",
    credits: 15,
    department: "Philosophy",
    category: "Humanities & Arts",
    term: "AUT",
    description: "Examines classic moral dilemmas and ethical frameworks (utilitarianism, Kantian deontology, virtue ethics) with contemporary applied dilemmas.",
    assessmentType: "Essay (60%) + Seminar Participation (40%)",
  },
  {
    code: "PHL2010",
    title: "Philosophy of Science & Technology",
    credits: 15,
    department: "Philosophy",
    category: "Humanities & Arts",
    term: "SPR",
    description: "Investigates the nature of scientific truth, paradigm shifts (Kuhn, Popper), AI consciousness, and epistemic reliability.",
    assessmentType: "Research Essay (70%) + Presentation (30%)",
  },
  {
    code: "EAS2026",
    title: "Creative Writing: Craft & Voice",
    credits: 15,
    department: "English and Creative Writing",
    category: "Humanities & Arts",
    term: "SPR",
    description: "Interactive workshop in prose and poetic composition. Students develop critical editing techniques, narrative pacing, and voice.",
    assessmentType: "Creative Writing Portfolio (80%) + Commentary (20%)",
  },
  {
    code: "HIH1001",
    title: "Making of the Modern World: Global Transformations",
    credits: 15,
    department: "History",
    category: "Humanities & Arts",
    term: "AUT",
    description: "Surveys global historical shifts from the Enlightenment through industrialization, imperialism, and decolonization.",
    assessmentType: "Historical Source Analysis (40%) + Exam (60%)",
  },
  {
    code: "AHV1008",
    title: "Visual Culture & Art History",
    credits: 15,
    department: "Art History & Visual Culture",
    category: "Humanities & Arts",
    term: "SPR",
    description: "Explores how visual representations across painting, photography, and digital media construct cultural meaning and political authority.",
    assessmentType: "Visual Analysis Essay (60%) + Exhibition Review (40%)",
  },

  // ── Social Sciences & Law ───────────────────────────────────────
  {
    code: "LAW1004",
    title: "Law for Non-Lawyers: Everyday Legal Rights",
    credits: 15,
    department: "Law School",
    category: "Social Sciences & Law",
    term: "AUT",
    description: "Practical grounding in key areas of English law: contract formation, consumer protection, employment rights, civil liberties, and digital privacy.",
    assessmentType: "Practical Problem Questions (60%) + Case Critique (40%)",
  },
  {
    code: "POL1000",
    title: "Global Politics in an Age of Turbulence",
    credits: 15,
    department: "Politics and International Relations",
    category: "Social Sciences & Law",
    term: "SPR",
    description: "Explores geopolitical power balances, multilateralism, security challenges, climate diplomacy, and the rise of emerging global powers.",
    assessmentType: "Policy Brief (50%) + Essay (50%)",
  },
  {
    code: "PSY1202",
    title: "Social & Behavioral Psychology",
    credits: 15,
    department: "Psychology",
    category: "Social Sciences & Law",
    term: "AUT",
    description: "Investigates human social behavior: conformity, obedience, stereotyping, group dynamics, cognitive biases, and interpersonal attraction.",
    assessmentType: "Online Tests (30%) + Critical Review (70%)",
  },
  {
    code: "SOC1015",
    title: "Sociology of the Digital Age",
    credits: 15,
    department: "Sociology",
    category: "Social Sciences & Law",
    term: "SPR",
    description: "Analyzes social media surveillance, algorithmic inequality, digital identity, online subcultures, and the gig economy.",
    assessmentType: "Digital Essay (60%) + Group Project (40%)",
  },
  {
    code: "GEO1002",
    title: "Global Environmental Challenges",
    credits: 15,
    department: "Geography",
    category: "Social Sciences & Law",
    term: "AUT",
    description: "Interdisciplinary exploration of climate change, biodiversity loss, water scarcity, and environmental governance for sustainability.",
    assessmentType: "Poster Presentation (40%) + Synthesis Report (60%)",
  },

  // ── Data & Digital (Accessible to all disciplines) ──────────────
  {
    code: "COM1011",
    title: "Introduction to Data Science & Analytics",
    credits: 15,
    department: "Computer Science",
    category: "Data & Digital",
    term: "AUT",
    description: "No prerequisite coding required. Introduces exploratory data analysis, data storytelling, visualization techniques, and ethical AI.",
    assessmentType: "Project Portfolio (70%) + Quiz (30%)",
  },
  {
    code: "CSM1020",
    title: "Python for Non-Programmers",
    credits: 15,
    department: "Computer Science",
    category: "Data & Digital",
    term: "SPR",
    description: "Hands-on foundation in Python programming tailored for students from non-computing disciplines. Covers automation, data cleaning, and scripts.",
    assessmentType: "Coding Assignments (60%) + Final Mini-Project (40%)",
  },
  {
    code: "HUM2001",
    title: "Digital Humanities: Culture & Code",
    credits: 15,
    department: "Humanities",
    category: "Data & Digital",
    term: "SPR",
    description: "Investigates how computational methods (text mining, digital archives, spatial mapping) transform historical and literary scholarship.",
    assessmentType: "Digital Archive Project (60%) + Essay (40%)",
  },

  // ── Environment & Science ───────────────────────────────────────
  {
    code: "BIO1330",
    title: "Genetics and Society: Ethical Horizons",
    credits: 15,
    department: "Biosciences",
    category: "Environment & Science",
    term: "SPR",
    description: "Examines modern gene editing (CRISPR), synthetic biology, personalized medicine, and their ethical ramifications for global society.",
    assessmentType: "Debate Briefing (40%) + Written Evaluation (60%)",
  },
  {
    code: "PHY1104",
    title: "The Quantum Universe & Cosmology",
    credits: 15,
    department: "Physics and Astronomy",
    category: "Environment & Science",
    term: "SPR",
    description: "Conceptual introduction to astrophysics, black holes, the Big Bang, and quantum theory, requiring no advanced calculus.",
    assessmentType: "Conceptual Problem Sets (50%) + Final Essay (50%)",
  },
];

// ═══════════════════════════════════════════════════════════════════
// DISCIPLINE SIMILARITY VALIDATOR
// ═══════════════════════════════════════════════════════════════════

/**
 * Checks whether an elective module is too similar to the student's degree.
 * Exeter regulations prohibit taking free electives within the student's
 * primary discipline/home subject area.
 */
export function isDisciplineSimilar(
  moduleCode: string,
  programmeTitle: string = "",
  programmeDept: string = "",
  coreModulePrefixes: string[] = []
): { similar: boolean; reason?: string } {
  const codePrefix = moduleCode.substring(0, 3).toUpperCase();

  // 1. Direct match with home programme's core module prefixes
  const normalizedCore = coreModulePrefixes.map(p => p.substring(0, 3).toUpperCase());
  if (normalizedCore.includes(codePrefix)) {
    return {
      similar: true,
      reason: `Module code prefix "${codePrefix}" matches your programme's core curriculum prefix. Free electives must be taken from outside your home discipline.`,
    };
  }

  // 2. Department / Title keyword matching
  const pTitle = (programmeTitle || "").toLowerCase();
  const pDept = (programmeDept || "").toLowerCase();

  const disciplinePrefixMap: Record<string, { subject: string; matchers: string[] }> = {
    MTH: { subject: "Mathematics & Statistics", matchers: ["math", "statistic"] },
    BEM: { subject: "Business & Management", matchers: ["business", "management", "marketing"] },
    BEE: { subject: "Economics", matchers: ["economic"] },
    COM: { subject: "Computer Science", matchers: ["computer science", "computing", "software"] },
    CSM: { subject: "Computer Science", matchers: ["computer science", "computing", "software"] },
    ECM: { subject: "Computer Science & Engineering", matchers: ["computer science", "engineering"] },
    ENG: { subject: "Engineering", matchers: ["engineering"] },
    PHY: { subject: "Physics", matchers: ["physics", "astronomy"] },
    BIO: { subject: "Biosciences", matchers: ["bioscience", "biology", "biochemistry", "biological"] },
    CHM: { subject: "Chemistry", matchers: ["chemistry"] },
    GEO: { subject: "Geography", matchers: ["geography", "environmental science"] },
    LAW: { subject: "Law", matchers: ["law", "legal", "llb"] },
    PHL: { subject: "Philosophy", matchers: ["philosophy"] },
    HIH: { subject: "History", matchers: ["history"] },
    POL: { subject: "Politics & International Relations", matchers: ["politic", "international relation"] },
    PSY: { subject: "Psychology", matchers: ["psychology", "neuroscience"] },
    SOC: { subject: "Sociology", matchers: ["sociology"] },
    EAS: { subject: "English & Creative Writing", matchers: ["english", "creative writing", "literature"] },
  };

  const info = disciplinePrefixMap[codePrefix];
  if (info) {
    const matchesTitle = info.matchers.some(m => pTitle.includes(m));
    const matchesDept = info.matchers.some(m => pDept.includes(m));

    if (matchesTitle || matchesDept) {
      return {
        similar: true,
        reason: `Module prefix "${codePrefix}" belongs to ${info.subject}, which overlaps with your degree (${programmeTitle || programmeDept}). Free electives must broaden your studies outside your home subject.`,
      };
    }
  }

  return { similar: false };
}
