import { Course, UserProfile } from '../types';
import { generateCandidatePapers } from '../api/examPapers';

export const CURRENT_USER: UserProfile = {
  name: "Samuel",
  studentId: "710082341",
  email: "s.smith@exeter.ac.uk",
  degreeProgramme: "MMath Mathematics",
  stage: 2,
};

export const MOCK_COURSES: Course[] = [
  // ── YEAR 2 MODULES (Active 2026/27) ──────────────────────────────
  {
    id: "mth2003",
    code: "MTH2003",
    title: "Differential Equations",
    stage: 2,
    credits: 15,
    term: "Autumn Term",
    academicYear: "2026/27",
    color: "#EA580C",
    isPinned: true,
    progressPercentage: 0,
    convenor: {
      name: "Prof. Stuart Townley & Dr. Peter Ashwin",
      email: "s.b.townley@exeter.ac.uk",
      officeHours: "Wednesdays 11:00 - 12:00 (Harrison 312)"
    },
    examPapers: generateCandidatePapers("MTH2003").slice(0, 8),
    sections: [
      {
        id: "sec-de-notes",
        title: "Lecture Notes & Core Materials",
        resources: [
          {
            id: "res-de-1",
            name: "MTH2003 Differential Equations - Full Course Notes",
            category: "slide",
            fileUrl: "/materials/MTH2003/MTH2003.pdf",
            fileSize: "1.3 MB",
            timeModified: "Oct 22, 2026",
            originalSection: "Lecture Notes"
          }
        ]
      },
      {
        id: "sec-de-sheets",
        title: "Tutorial Problem Sheets",
        resources: [
          {
            id: "res-de-s1",
            name: "Problem Sheet 1: First & Second Order Linear ODEs",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2003/MTH2003.pdf",
            fileSize: "1.3 MB",
            timeModified: "Oct 12, 2026",
            originalSection: "Problem Sheets"
          },
          {
            id: "res-de-s2",
            name: "Problem Sheet 2: Power Series & Frobenius Method",
            category: "problem_sheet",
            sheetNumber: 2,
            fileUrl: "/materials/MTH2003/MTH2003.pdf",
            fileSize: "1.3 MB",
            timeModified: "Oct 19, 2026",
            originalSection: "Problem Sheets"
          }
        ]
      }
    ],
    deadlines: [
      {
        id: "d-de-1",
        courseId: "mth2003",
        courseCode: "MTH2003",
        courseName: "Differential Equations",
        title: "Midterm Test: Linear ODEs & Series Solutions",
        dueDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        weighting: 15,
        submissionStatus: "not_submitted",
        officialSubmissionUrl: "https://ele.exeter.ac.uk/course/view.php?name=MTH2003"
      }
    ]
  },
  {
    id: "mth2008",
    code: "MTH2008",
    title: "Real Analysis",
    stage: 2,
    credits: 15,
    term: "Autumn Term",
    academicYear: "2026/27",
    color: "#2563EB",
    isPinned: true,
    progressPercentage: 0,
    convenor: {
      name: "Dr. Ana Rute Neves",
      email: "a.r.neves@exeter.ac.uk",
      officeHours: "Mondays 14:00 - 16:00 (Harrison 208)"
    },
    examPapers: generateCandidatePapers("MTH2008").slice(0, 8),
    sections: [
      {
        id: "sec-ra-notes",
        title: "Course Notes & Text",
        resources: [
          {
            id: "res-ra-1",
            name: "MTH2008 Real Analysis - Complete Course Notes",
            category: "slide",
            fileUrl: "/materials/MTH2008/MTH2008.pdf",
            fileSize: "1.1 MB",
            timeModified: "Oct 22, 2026",
            originalSection: "Course Notes"
          }
        ]
      },
      {
        id: "sec-ra-sheets",
        title: "Weekly Problem Sheets",
        resources: [
          {
            id: "res-ra-s1",
            name: "Problem Sheet 1: Metric Spaces & Open/Closed Sets",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2008/MTH2008.pdf",
            fileSize: "1.1 MB",
            timeModified: "Oct 10, 2026",
            originalSection: "Problem Sheets"
          },
          {
            id: "res-ra-s2",
            name: "Problem Sheet 2: Cauchy Criterion & Completeness",
            category: "problem_sheet",
            sheetNumber: 2,
            fileUrl: "/materials/MTH2008/MTH2008.pdf",
            fileSize: "1.1 MB",
            timeModified: "Oct 17, 2026",
            originalSection: "Problem Sheets"
          }
        ]
      }
    ],
    deadlines: [
      {
        id: "d-ra-1",
        courseId: "mth2008",
        courseCode: "MTH2008",
        courseName: "Real Analysis",
        title: "Homework Assignment 1: Metric Spaces Proofs",
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        weighting: 10,
        submissionStatus: "not_submitted",
        officialSubmissionUrl: "https://ele.exeter.ac.uk/course/view.php?name=MTH2008"
      }
    ]
  },
  {
    id: "mth2010",
    code: "MTH2010",
    title: "Groups, Rings and Fields",
    stage: 2,
    credits: 15,
    term: "Autumn Term",
    academicYear: "2026/27",
    color: "#8B5CF6",
    isPinned: true,
    progressPercentage: 0,
    convenor: {
      name: "Prof. Nigel Byott",
      email: "n.p.byott@exeter.ac.uk",
      officeHours: "Tuesdays 14:00 - 16:00 (Harrison 102)"
    },
    examPapers: generateCandidatePapers("MTH2010").slice(0, 8),
    sections: [
      {
        id: "sec-grf-notes",
        title: "Lecture Notes",
        resources: [
          {
            id: "res-grf-1",
            name: "MTH2010 Groups, Rings and Fields - Course Notes",
            category: "slide",
            fileUrl: "/materials/MTH2010/MTH2010.pdf",
            fileSize: "2.9 MB",
            timeModified: "Oct 22, 2026",
            originalSection: "Lecture Notes"
          }
        ]
      },
      {
        id: "sec-grf-sheets",
        title: "Tutorial Sheets",
        resources: [
          {
            id: "res-grf-s1",
            name: "Problem Sheet 1: Group Actions & Sylow Theorems",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2010/MTH2010.pdf",
            fileSize: "2.9 MB",
            timeModified: "Oct 15, 2026",
            originalSection: "Problem Sheets"
          }
        ]
      }
    ],
    deadlines: [
      {
        id: "d-grf-1",
        courseId: "mth2010",
        courseCode: "MTH2010",
        courseName: "Groups, Rings and Fields",
        title: "Midterm Assessment: Group Theory Portfolio",
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        weighting: 20,
        submissionStatus: "not_submitted",
        officialSubmissionUrl: "https://ele.exeter.ac.uk/course/view.php?name=MTH2010"
      }
    ]
  },
  {
    id: "mth2014",
    code: "MTH2014",
    title: "Numerical Modelling",
    stage: 2,
    credits: 15,
    term: "Autumn Term",
    academicYear: "2026/27",
    color: "#059669",
    isPinned: true,
    progressPercentage: 0,
    convenor: {
      name: "Dr. Markus Mueller",
      email: "m.mueller@exeter.ac.uk",
      officeHours: "Thursdays 15:00 - 16:00 (Harrison 214)"
    },
    examPapers: generateCandidatePapers("MTH2014").slice(0, 8),
    sections: [
      {
        id: "sec-nm-notes",
        title: "Textbooks & Lecture Notes",
        resources: [
          {
            id: "res-nm-1",
            name: "MTH2014 Numerical Modelling - Official Textbook Notes",
            category: "slide",
            fileUrl: "/materials/MTH2014/MTH2014_lecture_notes.pdf",
            fileSize: "749 KB",
            timeModified: "Sep 24, 2026",
            originalSection: "Textbooks"
          },
          {
            id: "res-nm-2",
            name: "MTH2014 Scribble & Lecture Sketches",
            category: "slide",
            fileUrl: "/materials/MTH2014/MTH2014_scribble.pdf",
            fileSize: "793 KB",
            timeModified: "Oct 22, 2026",
            originalSection: "Textbooks"
          }
        ]
      },
      {
        id: "sec-nm-sheets",
        title: "Tutorial & Coding Sheets",
        resources: [
          {
            id: "res-nm-s1",
            name: "Tutorial Questions: Linear Systems, Condition Numbers & LU",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2014/tutorial_question.pdf",
            fileSize: "40 KB",
            timeModified: "Sep 24, 2026",
            originalSection: "Tutorials"
          }
        ]
      }
    ],
    deadlines: [
      {
        id: "d-nm-1",
        courseId: "mth2014",
        courseCode: "MTH2014",
        courseName: "Numerical Modelling",
        title: "Computational Project 1: Condition Numbers & Solvers",
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        weighting: 25,
        submissionStatus: "not_submitted",
        officialSubmissionUrl: "https://ele.exeter.ac.uk/course/view.php?name=MTH2014"
      }
    ]
  },

  // ── YEAR 1 COMPLETED / ARCHIVED MODULES (from real ELE dashboard) ──
  {
    id: "mth1002",
    code: "MTH1002",
    title: "Mathematical Methods",
    stage: 1,
    credits: 30,
    term: "Autumn & Spring Term",
    academicYear: "2025/26",
    color: "#0284C7",
    isPinned: false,
    progressPercentage: 6,
    convenor: {
      name: "Mark Holland & Layal Hakim",
      email: "m.p.holland@exeter.ac.uk",
      officeHours: "Fridays 13:30 - 14:30 (Harrison 206 / 205)"
    },
    examPapers: [
      {
        id: "mth1002-2025-may",
        moduleCode: "MTH1002",
        year: "2025",
        session: "May",
        title: "2025 May Exam Paper",
        filename: "Past_Paper_-_May_2025.pdf",
        pdfUrl: "/materials/MTH1002/Past_Paper_-_May_2025.pdf",
        hasSolution: false
      },
      {
        id: "mth1002-2025-jan",
        moduleCode: "MTH1002",
        year: "2025",
        session: "Jan",
        title: "2025 January Exam Paper",
        filename: "Past_Paper_-_January_2025.pdf",
        pdfUrl: "/materials/MTH1002/Past_Paper_-_January_2025.pdf",
        hasSolution: false
      },
      {
        id: "mth1002-2024-may",
        moduleCode: "MTH1002",
        year: "2024",
        session: "May",
        title: "2024 May Exam Paper",
        filename: "Past_Paper_-_May_2024.pdf",
        pdfUrl: "/materials/MTH1002/Past_Paper_-_May_2024.pdf",
        hasSolution: false
      },
      {
        id: "mth1002-2024-jan",
        moduleCode: "MTH1002",
        year: "2024",
        session: "Jan",
        title: "2024 January Exam Paper",
        filename: "Past_Paper_-_January_2024.pdf",
        pdfUrl: "/materials/MTH1002/Past_Paper_-_January_2024.pdf",
        hasSolution: false
      },
      {
        id: "mth1002-2023-may",
        moduleCode: "MTH1002",
        year: "2023",
        session: "May",
        title: "2023 May Exam Paper",
        filename: "Past_Paper_-_May_2023.pdf",
        pdfUrl: "/materials/MTH1002/Past_Paper_-_May_2023.pdf",
        hasSolution: false
      },
      {
        id: "mth1002-2023-jan",
        moduleCode: "MTH1002",
        year: "2023",
        session: "Jan",
        title: "2023 January Exam Paper",
        filename: "Past_Paper_-_January_2023.pdf",
        pdfUrl: "/materials/MTH1002/Past_Paper_-_January_2023.pdf",
        hasSolution: false
      }
    ],
    sections: [
      {
        id: "sec-mth1002-notes",
        title: "Lecture Notes (Term 1 & Term 2)",
        resources: [
          {
            id: "res-mth1002-t1",
            name: "MTH1002 Term 1 Lecture Notes (Full Booklet)",
            category: "slide",
            fileUrl: "/materials/MTH1002/Term_1_Lecture_Notes.pdf",
            fileSize: "3.8 MB",
            timeModified: "May 15, 2026",
            originalSection: "Term 1 Lecture notes"
          },
          {
            id: "res-mth1002-t2",
            name: "MTH1002 Term 2 Lecture Notes (Full Booklet)",
            category: "slide",
            fileUrl: "/materials/MTH1002/Term_2_Lecture_Notes.pdf",
            fileSize: "1.3 MB",
            timeModified: "May 15, 2026",
            originalSection: "Term 2 Full Notes"
          }
        ]
      },
      {
        id: "sec-mth1002-sheets",
        title: "Tutorial & Problem Sheets",
        resources: [
          {
            id: "res-mth1002-s1",
            name: "Problem Sheet 1 - Term 2",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH1002/Problem_Sheet_1_-_Term_2.pdf",
            fileSize: "156 KB",
            timeModified: "May 15, 2026",
            originalSection: "T2 Tutorial Sheets"
          },
          {
            id: "res-mth1002-s2",
            name: "Problem Sheet 2 - Term 2",
            category: "problem_sheet",
            sheetNumber: 2,
            fileUrl: "/materials/MTH1002/Problem_Sheet_2_-_Term_2.pdf",
            fileSize: "173 KB",
            timeModified: "May 15, 2026",
            originalSection: "T2 Tutorial Sheets"
          },
          {
            id: "res-mth1002-s3",
            name: "Problem Sheet 3 - Term 2",
            category: "problem_sheet",
            sheetNumber: 3,
            fileUrl: "/materials/MTH1002/Problem_Sheet_3_-_Term_2.pdf",
            fileSize: "162 KB",
            timeModified: "May 15, 2026",
            originalSection: "T2 Tutorial Sheets"
          },
          {
            id: "res-mth1002-s4",
            name: "Problem Sheet 4 - Term 2",
            category: "problem_sheet",
            sheetNumber: 4,
            fileUrl: "/materials/MTH1002/Problem_Sheet_4_-_Term_2.pdf",
            fileSize: "170 KB",
            timeModified: "May 15, 2026",
            originalSection: "T2 Tutorial Sheets"
          },
          {
            id: "res-mth1002-s5",
            name: "Problem Sheet 5 - Term 2",
            category: "problem_sheet",
            sheetNumber: 5,
            fileUrl: "/materials/MTH1002/Problem_Sheet_5_-_Term_2.pdf",
            fileSize: "151 KB",
            timeModified: "May 15, 2026",
            originalSection: "T2 Tutorial Sheets"
          }
        ]
      }
    ],
    deadlines: [
      {
        id: "d-mth1002-1",
        courseId: "mth1002",
        courseCode: "MTH1002",
        courseName: "Mathematical Methods",
        title: "Final May Examination",
        dueDate: "2026-05-18T09:30:00Z",
        weighting: 80,
        submissionStatus: "graded",
        officialSubmissionUrl: "https://ele.exeter.ac.uk/course/view.php?name=MTH1002"
      }
    ]
  },
  {
    id: "mth1001",
    code: "MTH1001",
    title: "Mathematical Structures",
    stage: 1,
    credits: 30,
    term: "Autumn & Spring Term",
    academicYear: "2025/26",
    color: "#00A693",
    isPinned: false,
    progressPercentage: 0,
    convenor: {
      name: "Prof. Nigel Byott",
      email: "n.p.byott@exeter.ac.uk",
      officeHours: "Tuesdays 14:00 - 16:00 (Harrison 102)"
    },
    examPapers: generateCandidatePapers("MTH1001").slice(0, 8),
    sections: [
      {
        id: "sec-mth1001-notes",
        title: "Logic, Sets, Groups & Isomorphisms",
        resources: [
          {
            id: "res-mth1001-1",
            name: "Mathematical Structures Core Lecture Deck",
            category: "slide",
            fileUrl: "/materials/MTH1002/Term_1_Lecture_Notes.pdf",
            fileSize: "2.1 MB",
            timeModified: "Sep 2025",
            originalSection: "Lecture Notes"
          }
        ]
      }
    ]
  },
  {
    id: "mth1003",
    code: "MTH1003",
    title: "Mathematical Modelling",
    stage: 1,
    credits: 30,
    term: "Autumn & Spring Term",
    academicYear: "2025/26",
    color: "#E11D48",
    isPinned: false,
    progressPercentage: 1,
    convenor: {
      name: "Dr. Krasimira Tsaneva-Atanasova",
      email: "k.tsaneva-atanasova@exeter.ac.uk"
    },
    examPapers: generateCandidatePapers("MTH1003").slice(0, 8),
    sections: [
      {
        id: "sec-mth1003-notes",
        title: "Modelling Applications & Systems",
        resources: [
          {
            id: "res-mth1003-1",
            name: "Mathematical Modelling Course Notes",
            category: "slide",
            fileUrl: "/materials/MTH1002/Term_1_Lecture_Notes.pdf",
            fileSize: "1.9 MB",
            timeModified: "Sep 2025",
            originalSection: "Lecture Notes"
          }
        ]
      }
    ]
  },
  {
    id: "mth1004",
    code: "MTH1004",
    title: "Probability, Statistics and Data",
    stage: 1,
    credits: 30,
    term: "Autumn & Spring Term",
    academicYear: "2025/26",
    color: "#10B981",
    isPinned: false,
    progressPercentage: 0,
    convenor: {
      name: "Dr. Danny Williamson",
      email: "d.williamson@exeter.ac.uk"
    },
    examPapers: generateCandidatePapers("MTH1004").slice(0, 8),
    sections: [
      {
        id: "sec-mth1004-notes",
        title: "Probability Foundations & Statistical Inference",
        resources: [
          {
            id: "res-mth1004-1",
            name: "Probability and Statistics Notes",
            category: "slide",
            fileUrl: "/materials/MTH1002/Term_1_Lecture_Notes.pdf",
            fileSize: "1.7 MB",
            timeModified: "Sep 2025",
            originalSection: "Lecture Notes"
          }
        ]
      }
    ]
  },
  {
    id: "mth1000",
    code: "MTH1000",
    title: "Foundations",
    stage: 1,
    credits: 15,
    term: "Autumn Term",
    academicYear: "2025/26",
    color: "#64748B",
    isPinned: false,
    progressPercentage: 0,
    convenor: {
      name: "Mathematics Faculty",
      email: "maths-office@exeter.ac.uk"
    },
    sections: []
  },
  {
    id: "ese9902",
    code: "ESE9902",
    title: "Create Your Future",
    stage: 1,
    credits: 0,
    term: "Year 1 & 2",
    academicYear: "2025/26",
    color: "#F59E0B",
    isPinned: false,
    progressPercentage: 42,
    convenor: {
      name: "Careers & Employability Team",
      email: "careers@exeter.ac.uk"
    },
    sections: []
  },

  // ── YEAR 2 TERM 2 MODULES ─────────────────────────────────────────
  {
    id: "mth2004",
    code: "MTH2004",
    title: "Vector Calculus and Applications",
    stage: 2,
    credits: 15,
    term: "Spring Term",
    academicYear: "2026/27",
    color: "#E11D48",
    isPinned: false,
    progressPercentage: 0,
    convenor: {
      name: "Dr. Frank Kwasniok",
      email: "f.kwasniok@exeter.ac.uk"
    },
    examPapers: generateCandidatePapers("MTH2004").slice(0, 8),
    sections: []
  },
  {
    id: "mth2009",
    code: "MTH2009",
    title: "Complex Analysis",
    stage: 2,
    credits: 15,
    term: "Spring Term",
    academicYear: "2026/27",
    color: "#0284C7",
    isPinned: false,
    progressPercentage: 0,
    convenor: {
      name: "Prof. Robin Chapman",
      email: "r.j.chapman@exeter.ac.uk"
    },
    examPapers: generateCandidatePapers("MTH2009").slice(0, 8),
    sections: []
  },
  {
    id: "mth2011",
    code: "MTH2011",
    title: "Linear Algebra",
    stage: 2,
    credits: 15,
    term: "Spring Term",
    academicYear: "2026/27",
    color: "#0D9488",
    isPinned: false,
    progressPercentage: 0,
    convenor: {
      name: "Dr. Julio Andrade",
      email: "j.andrade@exeter.ac.uk"
    },
    examPapers: generateCandidatePapers("MTH2011").slice(0, 8),
    sections: []
  },
  {
    id: "mth2015",
    code: "MTH2015",
    title: "Mathematics of Machine Learning and AI",
    stage: 2,
    credits: 15,
    term: "Spring Term",
    academicYear: "2026/27",
    color: "#6366F1",
    isPinned: false,
    progressPercentage: 0,
    convenor: {
      name: "Dr. Gerta Celmins",
      email: "g.celmins@exeter.ac.uk"
    },
    examPapers: generateCandidatePapers("MTH2015").slice(0, 8),
    sections: []
  }
];
