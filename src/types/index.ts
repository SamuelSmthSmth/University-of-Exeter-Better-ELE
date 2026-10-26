export type ResourceCategory = 
  | 'slide'
  | 'problem_sheet'
  | 'solution'
  | 'past_paper'
  | 'assignment'
  | 'recording'
  | 'code'
  | 'general';

export interface CourseResource {
  id: string;
  name: string;
  category: ResourceCategory;
  fileUrl: string;
  fileSize?: string;
  timeModified?: string;
  sheetNumber?: number;
  year?: string;
  month?: string;
  isSolution?: boolean;
  pairedSolutionId?: string;
  originalSection: string;
}

export interface PairedProblemSheet {
  sheetNumber: number;
  title: string;
  questionPaper: CourseResource;
  solutionPaper?: CourseResource;
}

export interface ExamPaper {
  id: string;
  moduleCode: string;
  year: string;           // e.g. "2024", "2023"
  session: 'Jan' | 'May' | 'Aug' | 'Other';
  title: string;
  filename: string;
  pdfUrl: string;
  hasSolution: boolean;
  solutionUrl?: string;
  isLocal?: boolean;
  fileSize?: string;
}

export interface CourseDeadline {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  title: string;
  description?: string;
  dueDate: string;        // ISO string
  weighting?: number;     // e.g. 40 (meaning 40%)
  submissionStatus: 'not_submitted' | 'submitted' | 'graded';
  officialSubmissionUrl: string;
}

export interface CourseSection {
  id: string;
  title: string;
  summary?: string;
  resources: CourseResource[];
}

export interface PanoptoRecording {
  id: string;
  title: string;
  date: string;
  duration: string;
  lecturer?: string;
  panoptoUrl: string;
}

export interface Course {
  id: string;
  code: string;           // e.g. "MTH1001"
  title: string;          // e.g. "Mathematical Structures"
  stage: number;          // 1, 2, 3, 4
  credits: number;        // 15 or 30
  term: string;           // "Term 1", "Term 2", "Autumn & Spring"
  academicYear: string;   // "2026/27"
  convenor: {
    name: string;
    email: string;
    officeHours?: string;
  };
  progressPercentage: number;
  color: string;
  isPinned: boolean;
  sections: CourseSection[];
  examPapers?: ExamPaper[];
  deadlines?: CourseDeadline[];
  panoptoFolderUrl?: string;
  recordings?: PanoptoRecording[];
}

export interface UserProfile {
  name: string;
  studentId: string;
  email: string;
  degreeProgramme: string;
  stage: number;
  avatarUrl?: string;
}
