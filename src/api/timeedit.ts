// ═══════════════════════════════════════════════════════════════════
// TIMEEDIT API SERVICE
// University of Exeter Study Guide API
// Base: https://uk-exeter.studyguide.timeedit.net/api
// Routed through Vite proxy at /timeedit-api in development
// ═══════════════════════════════════════════════════════════════════

const BASE = "/timeedit-api";
export const API_YEAR = "2026-27";

// ── App types (mirrored from App.tsx) ──────────────────────────────

export interface Module {
  code: string;
  title: string;
  credits: number;
  stage: number;
  type: "compulsory" | "optional";
  condonable: boolean;
  prerequisites: string[];
  corequisites: string[];
  description: string;
  assessmentType: string;
  term: string;           // "AUT" | "SPR" | "AUTSPR" | "SUM" | ""
  optionalGroup?: string; // "A", "B", "C" ...
}

export interface StageReq {
  stage: number;
  label: string;
  totalRequired: number;
  notes: string[];
}

export interface Programme {
  code: string;
  title: string;
  totalCredits: number;
  dept: string;
  faculty: string;
}

// ── Known programme codes ──────────────────────────────────────────
// These are verified codes from the TimeEdit system.

export const KNOWN_PROGRAMMES: { code: string; title: string; totalCredits: number; dept: string }[] = [
  { code: "UFX4MASMAS04",  title: "MMath (Hons) Mathematics",                          totalCredits: 480, dept: "Mathematics and Statistics" },
  { code: "UFS3MASMAS09",  title: "BSc (Hons) Mathematics",                            totalCredits: 360, dept: "Mathematics and Statistics" },
  { code: "UFS3MASSTA01",  title: "BSc (Hons) Mathematics and Statistics",             totalCredits: 360, dept: "Mathematics and Statistics" },
  { code: "UFX4MASMAS09",  title: "MMath (Hons) Mathematics with Professional Experience", totalCredits: 480, dept: "Mathematics and Statistics" },
  { code: "UFX4MASMAS10",  title: "MMath (Hons) Mathematics with International Study", totalCredits: 480, dept: "Mathematics and Statistics" },
  { code: "UFX5MASMAS01",  title: "MMath (Hons) Mathematics with Year in Industry",    totalCredits: 600, dept: "Mathematics and Statistics" },
];

// ── Raw API response types ─────────────────────────────────────────

interface TEName { language: string; value: string; }
interface TEValue { name: string; type: string; values: string[]; subType?: string; }

interface TEModuleRef {
  code: string; id: string;
  names: TEName[];
  uid: string;
}

interface TEStudyRef { code: string; id: string; names: TEName[]; uid: string; }

interface TEOffering {
  code: string;
  period: { code: string; names: TEName[] };
  startDate: string;
  endDate: string;
}

interface TEModuleEntry {
  module: TEModuleRef;
  offerings: TEOffering[];
  studies: Array<{
    study: TEStudyRef;
    values: TEValue[];
  }>;
  required: boolean;
  alternative: boolean;
}

interface TEGroup {
  code: string;
  type: string; // STG1, STG2, STG3, STG4, COMP, OPT, CCG
  names: TEName[];
  modules: TEModuleEntry[];
  groups: Array<{ group: TEGroup; required: boolean; target: unknown }>;
  organisation?: { code: string; names: TEName[] };
}

interface TEGroupEntry { group: TEGroup; required: boolean; target: unknown }

interface TEStudyResponse {
  code: string;
  data: {
    code: string;
    names: TEName[];
    groups: TEGroupEntry[];
    organisation?: { code: string; names: TEName[] };
    faculty?: { code: string; names: TEName[] };
    descriptions: Array<{ language: string; text: string; type: { code: string } }>;
  };
}

interface TELink {
  type: string; // "Pre-requisite (Child)" | "Pre-requisite (Parent)" | "Corequisite"
  labels?: TEName[];
  target: TEModuleRef & { subType?: string; type?: string };
}

interface TEAssessmentEntry {
  assessment: {
    type: string;
    typeAbbreviation: string;
    category: string;
    values: TEValue[];
  };
  weighting: number; // percentage, 0–100
  values: TEValue[];
}

interface TEModuleResponse {
  code: string;
  credits: number;
  data: {
    code: string;
    names: TEName[];
    credits: { optimum: number; values: TEValue[] };
    descriptions: Array<{ language: string; text: string; type: { code: string; names: TEName[] } }>;
    links: TELink[];
    assessments: TEAssessmentEntry[];
    organisation?: { code: string; names: TEName[] };
    offerings: TEOffering[];
  };
}

// ── Helpers ────────────────────────────────────────────────────────

/** Strip HTML tags from a string, returning plain text */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<\/li>/gi, "; ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Find a description by type code */
function findDesc(
  descs: Array<{ language: string; text: string; type: { code: string } }>,
  typeCode: string,
): string {
  const d = descs.find(d => d.type.code === typeCode && d.language === "EN");
  return d ? stripHtml(d.text) : "";
}

/** Map OPT-N suffix to letter: OPT-1 → "A", OPT-2 → "B" … */
function optGroupLetter(groupCode: string): string {
  const m = groupCode.match(/OPT-(\d+)$/);
  if (!m) return "A";
  return String.fromCharCode(64 + parseInt(m[1], 10));
}

/** Build a human-readable assessment string from assessments array */
function buildAssessment(assessments: TEAssessmentEntry[]): string {
  const summative = assessments.filter(a => {
    const typeVal = a.assessment.values.find(v => v.name === "Assessment_Type");
    return typeVal?.values[0] === "SUMMATIVE";
  });
  if (summative.length === 0) return "";
  const parts = summative.map(a => {
    const abbr = a.assessment.typeAbbreviation;
    const label = abbr.startsWith("EXA") ? "Exam" : abbr.startsWith("CRW") ? "Coursework" : abbr;
    return `${label} (${Math.round(a.weighting)}%)`;
  });
  return parts.join(" + ");
}

// ── Fetch helpers ──────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`TimeEdit API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ── Public API ─────────────────────────────────────────────────────

/**
 * Fetch and parse the full programme structure.
 * Returns Module stubs (no description/prereqs), StageReqs, and Programme info.
 * Module details must be enriched separately via fetchModuleDetail().
 */
export async function fetchProgrammeStructure(
  code: string,
  year: string = API_YEAR,
): Promise<{ modules: Module[]; stageReqs: StageReq[]; programme: Programme }> {
  const raw = await apiFetch<TEStudyResponse>(
    `/product?code=${encodeURIComponent(code)}&year=${encodeURIComponent(year)}&type=STUDY`,
  );

  if (!raw || !raw.data) {
    throw new Error(`Programme '${code}' not found for academic year ${year}. Please verify the programme code.`);
  }

  const d = raw.data;
  const modules: Module[] = [];
  const stageReqs: StageReq[] = [];

  // Walk the top-level groups (STG1 … STGn)
  for (const stageEntry of d.groups) {
    const stageGroup = stageEntry.group;
    const stageMatch = stageGroup.type.match(/^STG(\d+)$/);
    if (!stageMatch) continue;
    const stageNum = parseInt(stageMatch[1], 10);

    // Collect stage notes from descriptions
    const descKey = `Programme_Structure_STG${stageNum}_Detail`;
    const noteText = findDesc(d.descriptions, descKey);
    const notes: string[] = noteText
      ? noteText.split(/[.;]/).map(s => s.trim()).filter(s => s.length > 4)
      : [];

    stageReqs.push({
      stage: stageNum,
      label: `Stage ${stageNum}`,
      totalRequired: 120, // standard per-stage credits
      notes,
    });

    // Walk sub-groups (COMP / OPT / CCG)
    for (const subEntry of stageGroup.groups) {
      const sub = subEntry.group;
      const isCompulsory = sub.type === "COMP" || sub.type === "CCG";
      const optLetter = isCompulsory ? undefined : optGroupLetter(sub.code);

      for (const moduleEntry of sub.modules) {
        // Determine condonability for this programme
        const studyEntry = moduleEntry.studies.find(
          s => s.study.code === code,
        );
        const condVal = studyEntry?.values.find(v => v.name === "IsCondonable")?.values[0];
        const condonable = condVal !== "Non-condonable";

        const term = moduleEntry.offerings[0]?.period?.code ?? "";

        modules.push({
          code: moduleEntry.module.code,
          title: moduleEntry.module.names.find(n => n.language === "EN")?.value
                 ?? moduleEntry.module.names[0]?.value
                 ?? moduleEntry.module.code,
          credits: 15, // placeholder — enriched by fetchModuleDetail
          stage: stageNum,
          type: isCompulsory ? "compulsory" : "optional",
          condonable,
          prerequisites: [],   // enriched by fetchModuleDetail
          corequisites: [],    // enriched by fetchModuleDetail
          description: "",     // enriched by fetchModuleDetail
          assessmentType: "",  // enriched by fetchModuleDetail
          term,
          optionalGroup: optLetter,
        });
      }
    }
  }

  // Deduplicate (a module may appear in multiple sub-groups for combined programmes)
  const seen = new Set<string>();
  const uniqueModules = modules.filter(m => {
    if (seen.has(m.code)) return false;
    seen.add(m.code);
    return true;
  });

  const programme: Programme = {
    code: d.code,
    title: d.names.find(n => n.language === "EN")?.value ?? d.names[0]?.value ?? code,
    totalCredits: stageReqs.length * 120,
    dept: d.organisation?.names.find(n => n.language === "EN")?.value
          ?? d.organisation?.names[0]?.value
          ?? "Mathematics and Statistics",
    faculty: d.faculty?.names.find(n => n.language === "EN")?.value
             ?? d.faculty?.names[0]?.value
             ?? "",
  };

  return { modules: uniqueModules, stageReqs, programme };
}

/**
 * Fetch full module detail and return enriched fields.
 * Merge result into existing Module stub.
 */
export async function fetchModuleDetail(
  code: string,
  year: string = API_YEAR,
): Promise<Partial<Module>> {
  const raw = await apiFetch<TEModuleResponse>(
    `/product?code=${encodeURIComponent(code)}&year=${encodeURIComponent(year)}&type=MODULE`,
  );

  if (!raw || !raw.data) {
    return {};
  }

  const d = raw.data;
  const credits = d.credits?.optimum ?? raw.credits ?? 15;

  const description = findDesc(d.descriptions, "Module_Description")
    || findDesc(d.descriptions, "Module_Description_Short");

  const assessment = buildAssessment(d.assessments ?? []);

  // Prerequisites: TimeEdit's 'type' and 'name' fields are frequently swapped or bi-directional.
  // The ONLY reliable field is the label value indicating the true relationship direction.
  const prerequisites = (d.links ?? [])
    .filter(l => l.labels?.some(label => label.value === "Pre-requisite of this Module"))
    .map(l => l.target.code);

  // Corequisites
  const corequisites = (d.links ?? [])
    .filter(l => 
      l.type === "Co-requisite" || 
      l.type === "Corequisite" ||
      l.labels?.some(label => label.value?.includes("Co-requisite"))
    )
    .map(l => l.target.code);

  return {
    credits,
    description,
    assessmentType: assessment,
    prerequisites,
    corequisites,
  };
}
