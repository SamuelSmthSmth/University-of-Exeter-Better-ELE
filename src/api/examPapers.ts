import { ExamPaper } from '../types';

/**
 * Exeter University Library Exam Papers API & Discovery Engine
 * Predictable URL pattern:
 * https://library.exeter.ac.uk/exampapers/viewpdf.php?filename={MODULE_CODE}-{YY}{SESSION}.pdf
 * e.g. MTH1002-22Jan.pdf, MTH1001-24May.pdf
 */

export const SESSIONS = ['May', 'Jan', 'Aug'] as const;
export type ExamSession = typeof SESSIONS[number];

// Candidate years (e.g. 2018 to 2025)
export const YEARS_TO_PROBE = [
  { full: '2025', short: '25' },
  { full: '2024', short: '24' },
  { full: '2023', short: '23' },
  { full: '2022', short: '22' },
  { full: '2021', short: '21' },
  { full: '2020', short: '20' },
  { full: '2019', short: '19' },
  { full: '2018', short: '18' },
];

export function buildExamPaperUrl(filename: string): string {
  // Use Vite proxy in browser environment to bypass CORS
  return `/library-api/exampapers/viewpdf.php?filename=${encodeURIComponent(filename)}`;
}

export function buildDirectExamPaperUrl(filename: string): string {
  return `https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=${encodeURIComponent(filename)}`;
}

const KNOWN_LOCAL_PAPERS: Record<string, string[]> = {
  MTH2008: ['MTH2008-22Jan.pdf', 'MTH2008-23Jan.pdf', 'MTH2008-24Jan.pdf', 'MTH2008-25Jan.pdf'],
  MTH2003: ['MTH2003-20Jan.pdf', 'MTH2003-21Jan.pdf', 'MTH2003-22Jan.pdf', 'MTH2003-23Jan.pdf', 'MTH2003-24Jan.pdf', 'MTH2003-25Jan.pdf'],
  MTH2010: ['MTH2010-21Jan.pdf', 'MTH2010-22Jan.pdf', 'MTH2010-23Jan.pdf', 'MTH2010-24Jan.pdf', 'MTH2010-25Jan.pdf'],
  MTH1001: ['MTH1001-18May.pdf', 'MTH1001-19May.pdf', 'MTH1001-20Jan.pdf', 'MTH1001-20May.pdf', 'MTH1001-21Jan.pdf', 'MTH1001-21May.pdf', 'MTH1001-22Jan.pdf', 'MTH1001-22May.pdf', 'MTH1001-23Jan.pdf', 'MTH1001-23May.pdf', 'MTH1001-24Jan.pdf', 'MTH1001-24May.pdf', 'MTH1001-25Jan.pdf', 'MTH1001-25May.pdf'],
  MTH1002: ['MTH1002-18Jan.pdf', 'MTH1002-18May.pdf', 'MTH1002-19May.pdf', 'MTH1002-20Jan.pdf', 'MTH1002-20May.pdf', 'MTH1002-21Jan.pdf', 'MTH1002-21May.pdf', 'MTH1002-22Jan.pdf', 'MTH1002-22May.pdf', 'MTH1002-23Jan.pdf', 'MTH1002-23May.pdf', 'MTH1002-24Jan.pdf', 'MTH1002-24May.pdf', 'MTH1002-25Jan.pdf', 'MTH1002-25May.pdf'],
  MTH1003: ['MTH1003-18May.pdf', 'MTH1003-19May.pdf', 'MTH1003-20May.pdf', 'MTH1003-21May.pdf', 'MTH1003-22May.pdf', 'MTH1003-23May.pdf', 'MTH1003-24May.pdf', 'MTH1003-25May.pdf'],
  MTH1004: ['MTH1004-18May.pdf', 'MTH1004-19May.pdf', 'MTH1004-20May.pdf', 'MTH1004-21May.pdf', 'MTH1004-22May.pdf', 'MTH1004-23May.pdf', 'MTH1004-24May.pdf', 'MTH1004-25May.pdf']
};

/**
 * Generates all candidate exam paper queries for a given module code.
 */
export function generateCandidatePapers(moduleCode: string): ExamPaper[] {
  const cleanCode = moduleCode.trim().toUpperCase();
  const candidates: ExamPaper[] = [];
  const localList = KNOWN_LOCAL_PAPERS[cleanCode] || [];

  for (const year of YEARS_TO_PROBE) {
    for (const session of SESSIONS) {
      const filename = `${cleanCode}-${year.short}${session}.pdf`;
      const isLocal = localList.includes(filename);
      const sessionLabel = session === 'Jan' ? 'January Exam' : session === 'May' ? 'May/June Exam' : 'August Deferral/Referral';
      
      // Check for local solution pair (e.g. MTH2008 January questions & solutions)
      let solutionUrl: string | undefined = undefined;
      let hasSolution = false;
      if (cleanCode === 'MTH2008' && session === 'Jan') {
        solutionUrl = `/materials/MTH2008/January${year.full}_Solutions.pdf`;
        hasSolution = true;
      }

      candidates.push({
        id: `${cleanCode}-${year.full}-${session}`,
        moduleCode: cleanCode,
        year: year.full,
        session: session,
        title: `${year.full} ${sessionLabel}`,
        filename,
        pdfUrl: isLocal ? `/materials/${cleanCode}/${filename}` : buildExamPaperUrl(filename),
        hasSolution,
        solutionUrl,
        isLocal,
      });
    }
  }

  return candidates;
}

/**
 * Probes the Exeter library endpoint to check which papers actually exist.
 * Uses HEAD or small range GET requests.
 */
export async function discoverAvailableExamPapers(moduleCode: string): Promise<ExamPaper[]> {
  const candidates = generateCandidatePapers(moduleCode);
  const verifiedPapers: ExamPaper[] = [];

  // Run in batches of 4 to avoid flooding the network
  const batchSize = 4;
  for (let i = 0; i < candidates.length; i += batchSize) {
    const batch = candidates.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (paper) => {
        try {
          const res = await fetch(paper.pdfUrl, { method: 'HEAD' });
          if (res.ok && res.status === 200) {
            const contentType = res.headers.get('content-type') || '';
            // Make sure it didn't return an HTML error page
            if (contentType.includes('pdf') || res.status === 200) {
              return paper;
            }
          }
          return null;
        } catch {
          return null;
        }
      })
    );

    for (const item of results) {
      if (item) verifiedPapers.push(item);
    }
  }

  return verifiedPapers;
}
