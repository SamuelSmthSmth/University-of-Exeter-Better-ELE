import { Course, UserProfile } from '../types';
import { generateCandidatePapers } from '../api/examPapers';

export const CURRENT_USER: UserProfile = {
  name: "Samuel",
  studentId: "710082341",
  email: "s.smith@exeter.ac.uk",
  degreeProgramme: "MMath Mathematics with Honours",
  stage: 2,
};

export const MOCK_COURSES: Course[] = [
  {
    id: "mth1001",
    code: "MTH1001",
    title: "Mathematical Structures",
    stage: 1,
    credits: 30,
    term: "Autumn & Spring Term",
    academicYear: "2026/27",
    color: "#00A693", // Exeter teal
    isPinned: true,
    progressPercentage: 68,
    convenor: {
      name: "Prof. Nigel Byott",
      email: "n.p.byott@exeter.ac.uk",
      officeHours: "Tuesdays 14:00 - 16:00 (Harrison 102)"
    },
    deadlines: [
      {
        id: "mth1001-d1",
        courseId: "mth1001",
        courseCode: "MTH1001",
        courseName: "Mathematical Structures",
        title: "Mid-Term Class Test 2 (Groups & Isomorphisms)",
        description: "40-minute in-person test covering groups, subgroups, and Lagrange's Theorem.",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        weighting: 10,
        submissionStatus: "not_submitted",
        officialSubmissionUrl: "https://ele.exeter.ac.uk/course/view.php?id=19876",
      },
      {
        id: "mth1001-d2",
        courseId: "mth1001",
        courseCode: "MTH1001",
        courseName: "Mathematical Structures",
        title: "Coursework Portfolio: Abstract Algebra",
        description: "Written proofs and worksheet submissions from weeks 1 to 6.",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        weighting: 40,
        submissionStatus: "not_submitted",
        officialSubmissionUrl: "https://ele.exeter.ac.uk/course/view.php?id=19876",
      }
    ],
    examPapers: generateCandidatePapers("MTH1001").slice(0, 8),
    sections: [
      {
        id: "sec-1",
        title: "Week 1 - 3: Logic, Sets, & Proofs",
        resources: [
          {
            id: "res-1",
            name: "Lecture 1: Propositional Logic and Truth Tables",
            category: "slide",
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1001-24May.pdf",
            fileSize: "1.8 MB",
            timeModified: "Sep 25, 2026",
            originalSection: "Week 1 - 3: Logic, Sets, & Proofs"
          },
          {
            id: "res-2",
            name: "Lecture 2: Sets, Functions, and Equivalence Relations",
            category: "slide",
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1001-23May.pdf",
            fileSize: "2.4 MB",
            timeModified: "Oct 02, 2026",
            originalSection: "Week 1 - 3: Logic, Sets, & Proofs"
          },
          {
            id: "res-3",
            name: "Problem Sheet 1: Logic & Sets Exercises",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1001-22May.pdf",
            fileSize: "410 KB",
            timeModified: "Oct 05, 2026",
            originalSection: "Week 1 - 3: Logic, Sets, & Proofs"
          },
          {
            id: "res-4",
            name: "Problem Sheet 1: Worked Solutions & Feedback",
            category: "solution",
            sheetNumber: 1,
            isSolution: true,
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1001-21May.pdf",
            fileSize: "520 KB",
            timeModified: "Oct 12, 2026",
            originalSection: "Week 1 - 3: Logic, Sets, & Proofs"
          }
        ]
      },
      {
        id: "sec-2",
        title: "Week 4 - 7: Number Theory & Group Theory",
        resources: [
          {
            id: "res-5",
            name: "Lecture 3: Modular Arithmetic & Euclidean Algorithm",
            category: "slide",
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1001-24Jan.pdf",
            fileSize: "3.1 MB",
            timeModified: "Oct 16, 2026",
            originalSection: "Week 4 - 7: Number Theory & Group Theory"
          },
          {
            id: "res-6",
            name: "Lecture 4: Definition of Groups, Subgroups, and Permutations",
            category: "slide",
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1001-23Jan.pdf",
            fileSize: "2.8 MB",
            timeModified: "Oct 23, 2026",
            originalSection: "Week 4 - 7: Number Theory & Group Theory"
          },
          {
            id: "res-7",
            name: "Problem Sheet 2: Number Theory & Modulo Calculations",
            category: "problem_sheet",
            sheetNumber: 2,
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1001-22Jan.pdf",
            fileSize: "380 KB",
            timeModified: "Oct 24, 2026",
            originalSection: "Week 4 - 7: Number Theory & Group Theory"
          },
          {
            id: "res-8",
            name: "Problem Sheet 2: Full Solutions",
            category: "solution",
            sheetNumber: 2,
            isSolution: true,
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1001-20Jan.pdf",
            fileSize: "610 KB",
            timeModified: "Oct 30, 2026",
            originalSection: "Week 4 - 7: Number Theory & Group Theory"
          },
          {
            id: "res-9",
            name: "Problem Sheet 3: Group Axioms and Cayley Tables",
            category: "problem_sheet",
            sheetNumber: 3,
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1001-23May.pdf",
            fileSize: "490 KB",
            timeModified: "Nov 02, 2026",
            originalSection: "Week 4 - 7: Number Theory & Group Theory"
          }
        ]
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
    color: "#003C3C", // Exeter dark teal
    isPinned: true,
    progressPercentage: 54,
    convenor: {
      name: "Dr. Ana Rute Neves",
      email: "a.r.neves@exeter.ac.uk",
      officeHours: "Thursdays 10:00 - 12:00 (Laver 311)"
    },
    deadlines: [
      {
        id: "mth2008-d1",
        courseId: "mth2008",
        courseCode: "MTH2008",
        courseName: "Real Analysis",
        title: "Assignment 1: Supremum, Infimum & Sequence Convergence",
        dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        weighting: 15,
        submissionStatus: "not_submitted",
        officialSubmissionUrl: "https://ele.exeter.ac.uk/course/view.php?id=21440",
      }
    ],
    examPapers: generateCandidatePapers("MTH2008").slice(0, 8),
    sections: [
      {
        id: "sec-2008-1",
        title: "Sequences, Subsequences & Limits",
        resources: [
          {
            id: "res-201",
            name: "Lecture 1 & 2: Completeness Axiom & Epsilon-N Proofs",
            category: "slide",
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH2008-24May.pdf",
            fileSize: "2.1 MB",
            timeModified: "Sep 28, 2026",
            originalSection: "Sequences, Subsequences & Limits"
          },
          {
            id: "res-202",
            name: "Problem Sheet 1: Bounds and Sequence Limits",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH2008-23May.pdf",
            fileSize: "320 KB",
            timeModified: "Oct 04, 2026",
            originalSection: "Sequences, Subsequences & Limits"
          },
          {
            id: "res-203",
            name: "Problem Sheet 1: Solutions & Common Errors",
            category: "solution",
            sheetNumber: 1,
            isSolution: true,
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH2008-22May.pdf",
            fileSize: "590 KB",
            timeModified: "Oct 11, 2026",
            originalSection: "Sequences, Subsequences & Limits"
          }
        ]
      }
    ]
  },
  {
    id: "mth1002",
    code: "MTH1002",
    title: "Mathematical Methods",
    stage: 1,
    credits: 30,
    term: "Autumn & Spring Term",
    academicYear: "2026/27",
    color: "#C8A96E", // Exeter gold
    isPinned: false,
    progressPercentage: 82,
    convenor: {
      name: "Dr. Stuart Townley",
      email: "s.townley@exeter.ac.uk",
      officeHours: "Mondays 11:00 - 13:00"
    },
    examPapers: generateCandidatePapers("MTH1002").slice(0, 8),
    sections: [
      {
        id: "sec-1002-1",
        title: "Calculus & Ordinary Differential Equations",
        resources: [
          {
            id: "res-1002-1",
            name: "ODE Notes: First and Second Order Linear Equations",
            category: "slide",
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1002-22Jan.pdf",
            fileSize: "3.7 MB",
            timeModified: "Oct 10, 2026",
            originalSection: "Calculus & Ordinary Differential Equations"
          },
          {
            id: "res-1002-2",
            name: "Problem Sheet 1: Integrating Factors & Separation of Variables",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=MTH1002-22Jan.pdf",
            fileSize: "290 KB",
            timeModified: "Oct 14, 2026",
            originalSection: "Calculus & Ordinary Differential Equations"
          }
        ]
      }
    ]
  },
  {
    id: "com1011",
    code: "COM1011",
    title: "Object-Oriented Programming",
    stage: 1,
    credits: 15,
    term: "Spring Term",
    academicYear: "2026/27",
    color: "#0284C7", // Cyan blue
    isPinned: false,
    progressPercentage: 40,
    convenor: {
      name: "Dr. Matthew Collison",
      email: "m.collison@exeter.ac.uk",
      officeHours: "Wednesdays 14:00 - 15:00 (Innovation Centre)"
    },
    deadlines: [
      {
        id: "com1011-d1",
        courseId: "com1011",
        courseCode: "COM1011",
        courseName: "Object-Oriented Programming",
        title: "Java Swing GUI Application Coursework",
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        weighting: 50,
        submissionStatus: "not_submitted",
        officialSubmissionUrl: "https://ele.exeter.ac.uk/course/view.php?id=18402",
      }
    ],
    examPapers: generateCandidatePapers("COM1011").slice(0, 8),
    sections: []
  }
];
