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
    panoptoFolderUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#folderID=%22f0331003-mth2003%22",
    recordings: [
      {
        id: "d50d6915-a05c-406e-8875-b4c900d2b536",
        title: "21/09/2026 @ 13:32 - MTH2003_L1/01 - Differential Equations",
        date: "21/09/2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d50d6915-a05c-406e-8875-b4c900d2b536&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d50d6915-a05c-406e-8875-b4c900d2b536&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "a58692a7-95f4-474a-ba21-b4d800fcd8fc",
        title: "06/10/2026 @ 15:32 - MTH2003_L3/01 - Differential Equations",
        date: "06/10/2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a58692a7-95f4-474a-ba21-b4d800fcd8fc&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a58692a7-95f4-474a-ba21-b4d800fcd8fc&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "36f4b74b-89e4-4e38-a628-b4de00da16c6",
        title: "12/10/2026 @ 13:32 - MTH2003_L1/01 - Differential Equations",
        date: "12/10/2026",
        duration: "52 mins",
        lecturer: "Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=36f4b74b-89e4-4e38-a628-b4de00da16c6&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=36f4b74b-89e4-4e38-a628-b4de00da16c6&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "3e6b90ed-ebd1-4ca8-a741-b4e600fa9f2b",
        title: "20/10/2026 @ 15:32 - MTH2003_L3/01 - Differential Equations",
        date: "20/10/2026",
        duration: "51 mins",
        lecturer: "Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3e6b90ed-ebd1-4ca8-a741-b4e600fa9f2b&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3e6b90ed-ebd1-4ca8-a741-b4e600fa9f2b&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "69cd4583-0192-4a08-b1db-b4e9015799f8",
        title: "23/10/2026 @ 11:32 - MTH2003_L2/01 - Differential Equations",
        date: "23/10/2026",
        duration: "53 mins",
        lecturer: "Prof. Stuart Townley",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=69cd4583-0192-4a08-b1db-b4e9015799f8&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=69cd4583-0192-4a08-b1db-b4e9015799f8&instance=MoodleELE2&autoplay=true&offerviewer=true"
      }
    ],
    examPapers: generateCandidatePapers("MTH2003"),
    sections: [
      {
        id: "sec-de-notes",
        title: "Lecture Notes & Core Handouts",
        resources: [
          {
            id: "res-de-1",
            name: "MTH2003 Differential Equations - Full Course Notes",
            category: "slide",
            fileUrl: "/materials/MTH2003/MTH2003.pdf",
            fileSize: "1.3 MB",
            timeModified: "Oct 22, 2026",
            originalSection: "Lecture Notes"
          },
          {
            id: "res-de-2",
            name: "Topic 1: First Order Differential Equations & Integrating Factors",
            category: "slide",
            fileUrl: "/materials/MTH2003/ODE_1st.pdf",
            fileSize: "157 KB",
            timeModified: "Sep 15, 2026",
            originalSection: "Lecture Notes"
          },
          {
            id: "res-de-3",
            name: "Topic 2: Second Order Linear Differential Equations",
            category: "slide",
            fileUrl: "/materials/MTH2003/ODEs_2nd.pdf",
            fileSize: "371 KB",
            timeModified: "Oct 23, 2026",
            originalSection: "Lecture Notes"
          },
          {
            id: "res-de-4",
            name: "Topic 3: Systems of Differential Equations & Phase Planes",
            category: "slide",
            fileUrl: "/materials/MTH2003/ODE_systems.pdf",
            fileSize: "792 KB",
            timeModified: "Oct 23, 2026",
            originalSection: "Lecture Notes"
          },
          {
            id: "res-de-5",
            name: "Review: Matrices, Determinants & Eigenvalues",
            category: "slide",
            fileUrl: "/materials/MTH2003/Review_Matrices.pdf",
            fileSize: "61 KB",
            timeModified: "Sep 15, 2026",
            originalSection: "Handouts"
          },
          {
            id: "res-de-6",
            name: "Review: Linear Systems of Equations & Diagonalisation",
            category: "slide",
            fileUrl: "/materials/MTH2003/Review_Linear_Systems.pdf",
            fileSize: "69 KB",
            timeModified: "Sep 15, 2026",
            originalSection: "Handouts"
          }
        ]
      },
      {
        id: "sec-de-sheets",
        title: "Examples Sheets & Tutorials",
        resources: [
          {
            id: "res-de-ex1-sol",
            name: "Examples Sheet 1: Solutions",
            category: "solution",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2003/Examples_Sheet_1_Solutions.pdf",
            fileSize: "230 KB",
            timeModified: "Oct 23, 2026",
            originalSection: "Examples Sheets"
          },
          {
            id: "res-de-ex2",
            name: "Examples Sheet 2: Second Order ODEs",
            category: "problem_sheet",
            sheetNumber: 2,
            fileUrl: "/materials/MTH2003/Examples_Sheet_2.pdf",
            fileSize: "90 KB",
            timeModified: "Oct 20, 2026",
            originalSection: "Examples Sheets"
          },
          {
            id: "res-de-ex2-sol",
            name: "Examples Sheet 2: Solutions",
            category: "solution",
            sheetNumber: 2,
            fileUrl: "/materials/MTH2003/Examples_Sheet_2_Solutions.pdf",
            fileSize: "150 KB",
            timeModified: "Oct 23, 2026",
            originalSection: "Examples Sheets"
          },
          {
            id: "res-de-tut1-sol",
            name: "Tutorial Sheet 1: Solutions",
            category: "solution",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2003/Tutorial_Sheet_1_Solutions.pdf",
            fileSize: "161 KB",
            timeModified: "Oct 23, 2026",
            originalSection: "Tutorial Sheets"
          },
          {
            id: "res-de-tut2-sol",
            name: "Tutorial Sheet 2: Solutions",
            category: "solution",
            sheetNumber: 2,
            fileUrl: "/materials/MTH2003/Tutorial_Sheet_2_Solutions.pdf",
            fileSize: "146 KB",
            timeModified: "Oct 23, 2026",
            originalSection: "Tutorial Sheets"
          },
          {
            id: "res-de-fb1-sol",
            name: "Feedback Sheet 1: Solutions",
            category: "solution",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2003/Feedback_Sheet_1_Solutions.pdf",
            fileSize: "135 KB",
            timeModified: "Oct 23, 2026",
            originalSection: "Feedback Sheets"
          },
          {
            id: "res-de-fb2-sol",
            name: "Feedback Sheet 2: Solutions",
            category: "solution",
            sheetNumber: 2,
            fileUrl: "/materials/MTH2003/Feedback_Sheet_2_Solutions.pdf",
            fileSize: "123 KB",
            timeModified: "Oct 23, 2026",
            originalSection: "Feedback Sheets"
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
    panoptoFolderUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#folderID=%22f0331008-mth2008%22",
    recordings: [
      {
        id: "13a44381-0697-4e82-a8ce-b4c900b268bc",
        title: "MTH2008 – Real Analysis – Lecture 1",
        date: "23/09/2026",
        duration: "51 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=13a44381-0697-4e82-a8ce-b4c900b268bc&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=13a44381-0697-4e82-a8ce-b4c900b268bc&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "9e8abe6e-27a4-4904-8814-b4ca008087cc",
        title: "MTH2008 – Real Analysis – Lecture 2",
        date: "26/09/2026",
        duration: "48 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9e8abe6e-27a4-4904-8814-b4ca008087cc&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9e8abe6e-27a4-4904-8814-b4ca008087cc&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "bae6cc5a-b74a-4c1b-8fa0-b4d8008a3366",
        title: "MTH2008 – Real Analysis – Lecture 8",
        date: "14/10/2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bae6cc5a-b74a-4c1b-8fa0-b4d8008a3366&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bae6cc5a-b74a-4c1b-8fa0-b4d8008a3366&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "bd087c27-9507-40f2-bd57-b4e1011411af",
        title: "MTH2008 – Real Analysis – Lecture 12",
        date: "23/10/2026",
        duration: "52 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bd087c27-9507-40f2-bd57-b4e1011411af&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bd087c27-9507-40f2-bd57-b4e1011411af&instance=MoodleELE2&autoplay=true&offerviewer=true"
      }
    ],
    examPapers: generateCandidatePapers("MTH2008"),
    sections: [
      {
        id: "sec-ra-notes",
        title: "Course Notes & Core References",
        resources: [
          {
            id: "res-ra-1",
            name: "MTH2008 Real Analysis - Complete Course Notes",
            category: "slide",
            fileUrl: "/materials/MTH2008/MTH2008.pdf",
            fileSize: "1.1 MB",
            timeModified: "Oct 22, 2026",
            originalSection: "Course Notes"
          },
          {
            id: "res-ra-ref",
            name: "Counterexamples in Analysis (Gelbaum & Olmsted)",
            category: "general",
            fileUrl: "/materials/MTH2008/Counterexamples_in_Analysis.pdf",
            fileSize: "3.8 MB",
            timeModified: "Sep 15, 2026",
            originalSection: "Reading List"
          }
        ]
      },
      {
        id: "sec-ra-sheets",
        title: "Weekly Problem Sheets",
        resources: [
          {
            id: "res-ra-s1",
            name: "Exercise Sheet 1: Metric Spaces & Open/Closed Balls",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2008/Exercise_Sheet_1.pdf",
            fileSize: "168 KB",
            timeModified: "Oct 19, 2026",
            originalSection: "Exercise Sheets"
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
    panoptoFolderUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#folderID=%22f0331010-mth2010%22",
    recordings: [
      {
        id: "7c895f52-3e68-474f-9ad9-b4cc00d307a4",
        title: "24/09/2026 @ 13:32 - MTH2010_L1/01 - Groups, Rings and Fields",
        date: "24/09/2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7c895f52-3e68-474f-9ad9-b4cc00d307a4&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7c895f52-3e68-474f-9ad9-b4cc00d307a4&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "e9e5d175-6a35-4f1b-a968-b4cd00fde2f8",
        title: "25/09/2026 @ 15:32 - MTH2010_L2/01 - Groups, Rings and Fields",
        date: "25/09/2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e9e5d175-6a35-4f1b-a968-b4cd00fde2f8&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e9e5d175-6a35-4f1b-a968-b4cd00fde2f8&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "18ba48bd-80ef-4612-96bd-b4d000aae224",
        title: "28/09/2026 @ 10:32 - MTH2010_L3/01 - Groups, Rings and Fields",
        date: "28/09/2026",
        duration: "52 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=18ba48bd-80ef-4612-96bd-b4d000aae224&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=18ba48bd-80ef-4612-96bd-b4d000aae224&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "166c8b2e-45b6-4093-a8f7-b4d700aaea6a",
        title: "05/10/2026 @ 10:32 - MTH2010_L3/01 - Groups, Rings and Fields",
        date: "05/10/2026",
        duration: "51 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=166c8b2e-45b6-4093-a8f7-b4d700aaea6a&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=166c8b2e-45b6-4093-a8f7-b4d700aaea6a&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "41c93aa6-82c2-4355-af7b-b4db0108addc",
        title: "09/10/2026 @ 15:32 - MTH2010_L2/01 - Groups, Rings and Fields",
        date: "09/10/2026",
        duration: "49 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=41c93aa6-82c2-4355-af7b-b4db0108addc&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=41c93aa6-82c2-4355-af7b-b4db0108addc&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "a002e01a-0dd4-4d94-9463-b4de00aa1fd9",
        title: "12/10/2026 @ 10:32 - MTH2010_L3/01 - Groups, Rings and Fields",
        date: "12/10/2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a002e01a-0dd4-4d94-9463-b4de00aa1fd9&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a002e01a-0dd4-4d94-9463-b4de00aa1fd9&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "8ed03f4f-7308-4e37-9d37-b4e100e26ac7",
        title: "15/10/2026 @ 13:32 - MTH2010_L1/01 - Groups, Rings and Fields",
        date: "15/10/2026",
        duration: "52 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=8ed03f4f-7308-4e37-9d37-b4e100e26ac7&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8ed03f4f-7308-4e37-9d37-b4e100e26ac7&instance=MoodleELE2&autoplay=true&offerviewer=true"
      }
    ],
    examPapers: generateCandidatePapers("MTH2010"),
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
            fileSize: "1.2 MB",
            timeModified: "Oct 22, 2026",
            originalSection: "Lecture Notes"
          }
        ]
      },
      {
        id: "sec-grf-sheets",
        title: "Tutorial Sheets & Solutions",
        resources: [
          {
            id: "res-grf-s1",
            name: "Problem Sheet 1: Group Actions & Sylow Theorems",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2010/MTH2010-24Jan.pdf",
            fileSize: "280 KB",
            timeModified: "Oct 15, 2026",
            originalSection: "Problem Sheets"
          },
          {
            id: "res-grf-s1-sol",
            name: "Problem Sheet 1: Solutions & Worked Proofs",
            category: "solution",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2010/MTH2010-25Jan.pdf",
            fileSize: "195 KB",
            timeModified: "Oct 18, 2026",
            originalSection: "Solutions"
          },
          {
            id: "res-grf-s4",
            name: "Tutorial Sheet 4: Ring Homomorphisms & Ideals",
            category: "problem_sheet",
            sheetNumber: 4,
            fileUrl: "/materials/MTH2010/Algebra25-Sheet4.pdf",
            fileSize: "245 KB",
            timeModified: "Nov 02, 2026",
            originalSection: "Tutorials"
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
    panoptoFolderUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#folderID=%22f0331014-mth2014%22",
    recordings: [
      {
        id: "2d8d07ce-9627-4e06-9674-b4e1011414de",
        title: "15/10/2026 @ 14:32 - MTH2014_L4/01 - Numerical Modelling",
        date: "15/10/2026",
        duration: "52 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2d8d07ce-9627-4e06-9674-b4e1011414de&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2d8d07ce-9627-4e06-9674-b4e1011414de&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "87f44b4c-f5f9-42dd-b383-b4e90157b8d0",
        title: "22/10/2026 @ 12:32 - MTH2014_L1/01 - Numerical Modelling",
        date: "22/10/2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=87f44b4c-f5f9-42dd-b383-b4e90157b8d0&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=87f44b4c-f5f9-42dd-b383-b4e90157b8d0&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "5dad51d7-0f63-4bfa-9052-b4e90157b1d6",
        title: "22/10/2026 @ 14:32 - MTH2014_L5/01 - Numerical Modelling",
        date: "22/10/2026",
        duration: "51 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5dad51d7-0f63-4bfa-9052-b4e90157b1d6&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5dad51d7-0f63-4bfa-9052-b4e90157b1d6&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "a2feff42-d4c3-4155-8587-b4e90157b56f",
        title: "23/10/2026 @ 10:32 - MTH2014_L3/01 - Numerical Modelling",
        date: "23/10/2026",
        duration: "49 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a2feff42-d4c3-4155-8587-b4e90157b56f&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a2feff42-d4c3-4155-8587-b4e90157b56f&instance=MoodleELE2&autoplay=true&offerviewer=true"
      }
    ],
    examPapers: generateCandidatePapers("MTH2014"),
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
    recordings: [
      {
        id: "4a537fb5-6b7a-4a13-b799-b3db00e66d4d",
        title: "26/01/2026 @ 13:32 - MTH1002_L4/01 - Methods",
        date: "26/01/2026",
        duration: "50 mins",
        lecturer: "Layal Hakim",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4a537fb5-6b7a-4a13-b799-b3db00e66d4d&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4a537fb5-6b7a-4a13-b799-b3db00e66d4d&instance=MoodleELE2&autoplay=true&offerviewer=true"
      }
    ],
    examPapers: generateCandidatePapers("MTH1002"),
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
