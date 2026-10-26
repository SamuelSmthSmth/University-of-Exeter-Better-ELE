import { CourseResource, ResourceCategory, PairedProblemSheet } from '../types';
import { PDFDocument } from 'pdf-lib';

/**
 * Classifies an incoming resource based on its filename, title, and section.
 */
export function classifyResource(name: string, sectionTitle: string = ''): {
  category: ResourceCategory;
  sheetNumber?: number;
  year?: string;
  isSolution?: boolean;
} {
  const text = `${sectionTitle} ${name}`.toLowerCase();

  // 1. Solution detection
  const isSolution = /\b(solution|solutions|answers?|worked\s*solutions?|marking\s*scheme|sols?)\b/i.test(name);

  // 2. Problem Sheet / Homework / Tutorial detection
  const sheetMatch = name.match(/\b(?:sheet|exercise|tutorial|problem|worksheet|hw|homework|task)\s*#?(\d+)\b/i);
  if (sheetMatch || (isSolution && sheetMatch)) {
    const sheetNumber = sheetMatch ? parseInt(sheetMatch[1], 10) : undefined;
    return {
      category: isSolution ? 'solution' : 'problem_sheet',
      sheetNumber,
      isSolution,
    };
  }

  // 3. Past Paper detection
  const examMatch = text.match(/\b(exam|past\s*paper|specimen|january|may|assessment\s*paper)\b/i);
  const yearMatch = text.match(/\b(20\d\d)\b/);
  if (examMatch || (yearMatch && text.includes('paper'))) {
    return {
      category: 'past_paper',
      year: yearMatch ? yearMatch[1] : undefined,
      isSolution,
    };
  }

  // 4. Lecture slides and notes
  if (/\b(lecture|slide|slides|notes?|deck|presentation|handout|topic|week\s*\d+)\b/i.test(text) || name.endsWith('.pptx') || name.endsWith('.pdf')) {
    return {
      category: 'slide',
    };
  }

  // 5. Code & Data
  if (/\.(py|m|r|java|cpp|c|ipynb|zip|tar|csv|json)$/i.test(name)) {
    return {
      category: 'code',
    };
  }

  // 6. Video / Recording
  if (/\b(panopto|recording|video|recap|stream)\b/i.test(text)) {
    return {
      category: 'recording',
    };
  }

  // 7. Coursework / Assignment
  if (/\b(coursework|assignment|brief|rubric|submission)\b/i.test(text)) {
    return {
      category: 'assignment',
    };
  }

  return {
    category: 'general',
  };
}

/**
 * Intelligent Pairing Engine: Pairs Question Sheets with their corresponding Solution Sheets.
 */
export function pairProblemSheets(resources: CourseResource[]): PairedProblemSheet[] {
  const sheets = resources.filter(r => r.category === 'problem_sheet');
  const solutions = resources.filter(r => r.category === 'solution');

  const pairedMap = new Map<number, PairedProblemSheet>();

  // Index questions
  sheets.forEach((q, idx) => {
    const num = q.sheetNumber ?? (idx + 1);
    pairedMap.set(num, {
      sheetNumber: num,
      title: q.name,
      questionPaper: q,
    });
  });

  // Attach solutions
  solutions.forEach(sol => {
    if (sol.sheetNumber !== undefined && pairedMap.has(sol.sheetNumber)) {
      pairedMap.get(sol.sheetNumber)!.solutionPaper = sol;
    } else {
      // Fuzzy match by number in title
      const numMatch = sol.name.match(/\b(\d+)\b/);
      if (numMatch) {
        const num = parseInt(numMatch[1], 10);
        if (pairedMap.has(num)) {
          pairedMap.get(num)!.solutionPaper = sol;
          return;
        }
      }
      // If standalone solution, create a pair entry
      const fallbackNum = sol.sheetNumber ?? (pairedMap.size + 1);
      if (!pairedMap.has(fallbackNum)) {
        pairedMap.set(fallbackNum, {
          sheetNumber: fallbackNum,
          title: `Sheet ${fallbackNum} (Solutions)`,
          questionPaper: sol, // fallback
          solutionPaper: sol,
        });
      }
    }
  });

  return Array.from(pairedMap.values()).sort((a, b) => a.sheetNumber - b.sheetNumber);
}

/**
 * PDF Merger: Merges multiple slide deck PDFs into one unified semester book.
 */
export async function combinePdfSlides(
  pdfUrls: string[],
  onProgress?: (current: number, total: number) => void
): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (let i = 0; i < pdfUrls.length; i++) {
    const url = pdfUrls[i];
    if (onProgress) onProgress(i + 1, pdfUrls.length);

    try {
      const bytes = await fetch(url).then(res => res.arrayBuffer());
      const pdf = await PDFDocument.load(bytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    } catch (err) {
      console.warn(`Failed to merge PDF from ${url}:`, err);
    }
  }

  return await mergedPdf.save();
}
