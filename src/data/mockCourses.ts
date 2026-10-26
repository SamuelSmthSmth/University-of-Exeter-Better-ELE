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
        id: "69cd4583-0192-4a08-b1db-b4e9015799f8",
        title: "23/10/2026 @ 11:32 - MTH2003_L2/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=69cd4583-0192-4a08-b1db-b4e9015799f8&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=69cd4583-0192-4a08-b1db-b4e9015799f8&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "3e6b90ed-ebd1-4ca8-a741-b4e600fa9f2b",
        title: "20/10/2026 @ 15:32 - MTH2003_L3/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3e6b90ed-ebd1-4ca8-a741-b4e600fa9f2b&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3e6b90ed-ebd1-4ca8-a741-b4e600fa9f2b&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "40ae704d-b461-43ea-b498-b4e500da4b61",
        title: "19/10/2026 @ 13:32 - MTH2003_L1/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=40ae704d-b461-43ea-b498-b4e500da4b61&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=40ae704d-b461-43ea-b498-b4e500da4b61&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "419587c9-8978-454c-b2dd-b4e200b9555d",
        title: "16/10/2026 @ 11:32 - MTH2003_L2/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=419587c9-8978-454c-b2dd-b4e200b9555d&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=419587c9-8978-454c-b2dd-b4e200b9555d&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "81905292-e873-4cc3-be0a-b4df00fa9b11",
        title: "13/10/2026 @ 15:32 - MTH2003_L3/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=81905292-e873-4cc3-be0a-b4df00fa9b11&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=81905292-e873-4cc3-be0a-b4df00fa9b11&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "36f4b74b-89e4-4e38-a628-b4de00da16c6",
        title: "12/10/2026 @ 13:32 - MTH2003_L1/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=36f4b74b-89e4-4e38-a628-b4de00da16c6&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=36f4b74b-89e4-4e38-a628-b4de00da16c6&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "9dc7202a-e735-499d-99d1-b4db0108a63b",
        title: "09/10/2026 @ 11:32 - MTH2003_L2/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9dc7202a-e735-499d-99d1-b4db0108a63b&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9dc7202a-e735-499d-99d1-b4db0108a63b&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "a58692a7-95f4-474a-ba21-b4d800fcd8fc",
        title: "06/10/2026 @ 15:32 - MTH2003_L3/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a58692a7-95f4-474a-ba21-b4d800fcd8fc&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a58692a7-95f4-474a-ba21-b4d800fcd8fc&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "adddf58a-b353-4625-b379-b4d700dc39b8",
        title: "05/10/2026 @ 13:32 - MTH2003_L1/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=adddf58a-b353-4625-b379-b4d700dc39b8&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=adddf58a-b353-4625-b379-b4d700dc39b8&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "1b18ef53-0fc6-4917-a190-b4d400baf365",
        title: "02/10/2026 @ 11:32 - MTH2003_L2/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1b18ef53-0fc6-4917-a190-b4d400baf365&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1b18ef53-0fc6-4917-a190-b4d400baf365&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "dc375ff3-28ee-4b9d-a482-b4d100fd2c93",
        title: "29/09/2026 @ 15:32 - MTH2003_L3/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=dc375ff3-28ee-4b9d-a482-b4d100fd2c93&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=dc375ff3-28ee-4b9d-a482-b4d100fd2c93&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "3b847089-c864-46db-8d92-b4d000dbbf4b",
        title: "28/09/2026 @ 13:32 - MTH2003_L1/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3b847089-c864-46db-8d92-b4d000dbbf4b&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3b847089-c864-46db-8d92-b4d000dbbf4b&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "0f5115b1-35f4-4227-90ef-b4cd00bb5443",
        title: "25/09/2026 @ 11:32 - MTH2003_L2/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0f5115b1-35f4-4227-90ef-b4cd00bb5443&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0f5115b1-35f4-4227-90ef-b4cd00bb5443&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "67ac3c43-b63e-4497-821b-b4ca00f3da30",
        title: "22/09/2026 @ 15:32 - MTH2003_L3/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=67ac3c43-b63e-4497-821b-b4ca00f3da30&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=67ac3c43-b63e-4497-821b-b4ca00f3da30&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "d50d6915-a05c-406e-8875-b4c900d2b536",
        title: "21/09/2026 @ 13:32 - MTH2003_L1/01 - Differential Equations",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Stuart Townley & Dr. Peter Ashwin",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d50d6915-a05c-406e-8875-b4c900d2b536&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d50d6915-a05c-406e-8875-b4c900d2b536&instance=MoodleELE2&autoplay=true&offerviewer=true"
      }
    ],
    examPapers: generateCandidatePapers("MTH2003"),
    sections: [
      {
        id: "sec-de-notes",
        title: "Lecture Notes & Handouts",
        resources: [
          {
            id: "res-de-ode1",
            name: "First Order ODEs Notes",
            category: "slide",
            fileUrl: "/materials/MTH2003/First order ODEs notes.pdf",
            fileSize: "156 KB",
            originalSection: "Topic 1: First Order ODEs"
          },
          {
            id: "res-de-ode2",
            name: "Second Order ODEs Notes",
            category: "slide",
            fileUrl: "/materials/MTH2003/Second order ODEs notes.pdf",
            fileSize: "371 KB",
            originalSection: "Topic 2: Second Order ODEs"
          },
          {
            id: "res-de-odesys",
            name: "Linear Systems of ODEs Notes",
            category: "slide",
            fileUrl: "/materials/MTH2003/Linear systems of ODEs notes.pdf",
            fileSize: "792 KB",
            originalSection: "Topic 3: Systems of ODEs"
          },
          {
            id: "res-de-gloss",
            name: "Glossary of Terms & Classification",
            category: "general",
            fileUrl: "/materials/MTH2003/Glossary.pdf",
            fileSize: "172 KB",
            originalSection: "Handouts"
          },
          {
            id: "res-de-mat",
            name: "Review of Matrices for ODEs",
            category: "general",
            fileUrl: "/materials/MTH2003/Review of Matrices.pdf",
            fileSize: "60 KB",
            originalSection: "Handouts"
          },
          {
            id: "res-de-sys",
            name: "Review of Linear Algebraic Systems",
            category: "general",
            fileUrl: "/materials/MTH2003/Review of Linear Algebraic Systems.pdf",
            fileSize: "68 KB",
            originalSection: "Handouts"
          }
        ]
      },
      {
        id: "sec-de-sheets",
        title: "Examples & Tutorial Sheets",
        resources: [
          {
            id: "res-de-ex1",
            name: "Examples Sheet 1: First Order ODEs",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2003/Examples Sheet 1.pdf",
            fileSize: "70 KB",
            originalSection: "Topic 1: First Order ODEs"
          },
          {
            id: "res-de-tut1",
            name: "Tutorial Sheet 1 for Week 3",
            category: "problem_sheet",
            sheetNumber: 2,
            fileUrl: "/materials/MTH2003/Tutorial Sheet 1 for Week 3.pdf",
            fileSize: "73 KB",
            originalSection: "Topic 1: First Order ODEs"
          },
          {
            id: "res-de-fb1",
            name: "Feedback Sheet 1: Separable & Exact ODEs",
            category: "problem_sheet",
            sheetNumber: 3,
            fileUrl: "/materials/MTH2003/Feedback Sheet 1.pdf",
            fileSize: "62 KB",
            originalSection: "Topic 1: First Order ODEs"
          },
          {
            id: "res-de-ex2",
            name: "Examples Sheet 2: Second Order ODEs",
            category: "problem_sheet",
            sheetNumber: 4,
            fileUrl: "/materials/MTH2003/Examples Sheet 2.pdf",
            fileSize: "89 KB",
            originalSection: "Topic 2: Second Order ODEs"
          },
          {
            id: "res-de-tut2",
            name: "Tutorial Sheet 2 for Week 5",
            category: "problem_sheet",
            sheetNumber: 5,
            fileUrl: "/materials/MTH2003/Tutorial Sheet 2 for week 5.pdf",
            fileSize: "83 KB",
            originalSection: "Topic 2: Second Order ODEs"
          },
          {
            id: "res-de-fb2",
            name: "Feedback Sheet 2: Series & Resonance",
            category: "problem_sheet",
            sheetNumber: 6,
            fileUrl: "/materials/MTH2003/Feedback Sheet 2.pdf",
            fileSize: "65 KB",
            originalSection: "Topic 2: Second Order ODEs"
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
        id: "88f71bf4-c41a-4fc5-ab35-b4d100a1362a",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 01",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=88f71bf4-c41a-4fc5-ab35-b4d100a1362a&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=88f71bf4-c41a-4fc5-ab35-b4d100a1362a&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "4b9c40bb-cea8-4b78-8442-b4d100a5e9e8",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 02",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4b9c40bb-cea8-4b78-8442-b4d100a5e9e8&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4b9c40bb-cea8-4b78-8442-b4d100a5e9e8&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "7f4397a6-01c8-47e3-a3d4-b4d100a5ea14",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 03",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7f4397a6-01c8-47e3-a3d4-b4d100a5ea14&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7f4397a6-01c8-47e3-a3d4-b4d100a5ea14&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "849a98b2-a779-4551-8213-b4d000bae351",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 04",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=849a98b2-a779-4551-8213-b4d000bae351&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=849a98b2-a779-4551-8213-b4d000bae351&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "95d6889c-4419-48ef-88ef-b4d901837e6a",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 06",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=95d6889c-4419-48ef-88ef-b4d901837e6a&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=95d6889c-4419-48ef-88ef-b4d901837e6a&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "e83e9df9-bb1f-4c51-943b-b4d700bb19a9",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 07",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e83e9df9-bb1f-4c51-943b-b4d700bb19a9&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e83e9df9-bb1f-4c51-943b-b4d700bb19a9&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "bae6cc5a-b74a-4c1b-8fa0-b4d8008a3366",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 08",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bae6cc5a-b74a-4c1b-8fa0-b4d8008a3366&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bae6cc5a-b74a-4c1b-8fa0-b4d8008a3366&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "4b5587e6-248d-4163-96f9-b4de00b9681a",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 10",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4b5587e6-248d-4163-96f9-b4de00b9681a&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4b5587e6-248d-4163-96f9-b4de00b9681a&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "bc0921a4-b4d0-472c-a9dd-b4df0087d5db",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 11",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bc0921a4-b4d0-472c-a9dd-b4df0087d5db&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bc0921a4-b4d0-472c-a9dd-b4df0087d5db&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "bd087c27-9507-40f2-bd57-b4e1011411af",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 12",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bd087c27-9507-40f2-bd57-b4e1011411af&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bd087c27-9507-40f2-bd57-b4e1011411af&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "1d3a9b2f-1fa3-4b72-9ef6-b4e500b9bb51",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 13",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1d3a9b2f-1fa3-4b72-9ef6-b4e500b9bb51&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1d3a9b2f-1fa3-4b72-9ef6-b4e500b9bb51&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "4f16ee72-58db-4102-addf-b4e90157a770",
        title: "MTH2008 \u2013 Real Analysis \u2013 Lecture 14",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Ana Rute Neves",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4f16ee72-58db-4102-addf-b4e90157a770&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4f16ee72-58db-4102-addf-b4e90157a770&instance=MoodleELE2&autoplay=true&offerviewer=true"
      }
    ],
    examPapers: generateCandidatePapers("MTH2008"),
    sections: [
      {
        id: "sec-ra-notes",
        title: "Course Notes & Slide Decks",
        resources: [
          {
            id: "res-ra-core",
            name: "Leture notes: Real Analysis",
            category: "slide",
            fileUrl: "/materials/MTH2008/Leture notes_ Real Analysis.pdf",
            fileSize: "1.0 MB",
            timeModified: "Oct 26, 2026",
            originalSection: "Lecture Notes"
          },
          {
            id: "res-ra-w12-ann",
            name: "Annotated Slides: Weeks 1 & 2 (Metric Spaces)",
            category: "slide",
            fileUrl: "/materials/MTH2008/Annotated Slides for Weeks 1 & 2.pdf",
            fileSize: "8.9 MB",
            timeModified: "Oct 26, 2026",
            originalSection: "Weeks 1 & 2"
          },
          {
            id: "res-ra-w12-blank",
            name: "Blank Slides: Weeks 1 & 2",
            category: "slide",
            fileUrl: "/materials/MTH2008/Blank Slides for Weeks 1 & 2.pdf",
            fileSize: "238 KB",
            timeModified: "Oct 26, 2026",
            originalSection: "Weeks 1 & 2"
          },
          {
            id: "res-ra-w34-ann",
            name: "Annotated Slides: Weeks 3 & 4 (Topological Spaces)",
            category: "slide",
            fileUrl: "/materials/MTH2008/Annotated Slides for Weeks 3 & 4.pdf",
            fileSize: "7.2 MB",
            timeModified: "Oct 26, 2026",
            originalSection: "Weeks 3 & 4"
          },
          {
            id: "res-ra-w34-blank",
            name: "Blank Slides: Weeks 3 & 4",
            category: "slide",
            fileUrl: "/materials/MTH2008/Blank slides for Weeks 3 & 4.pdf",
            fileSize: "327 KB",
            timeModified: "Oct 26, 2026",
            originalSection: "Weeks 3 & 4"
          },
          {
            id: "res-ra-w57-ann",
            name: "Annotated Slides: Weeks 5 & 7 (Sequences & Completeness)",
            category: "slide",
            fileUrl: "/materials/MTH2008/Annotated Slides for Weeks 5 & 7.pdf",
            fileSize: "8.7 MB",
            timeModified: "Oct 26, 2026",
            originalSection: "Weeks 5 & 7"
          },
          {
            id: "res-ra-w57-blank",
            name: "Blank Slides: Weeks 5 & 7",
            category: "slide",
            fileUrl: "/materials/MTH2008/Blank slides for Weeks 5 & 7.pdf",
            fileSize: "231 KB",
            timeModified: "Oct 26, 2026",
            originalSection: "Weeks 5 & 7"
          },
          {
            id: "res-ra-counter",
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
        title: "Exercise & Problem Sheets",
        resources: [
          {
            id: "res-ra-s1",
            name: "Exercise Sheet 1: Metric Spaces & Open/Closed Balls",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2008/Exercise Sheet 1.pdf",
            fileSize: "121 KB",
            timeModified: "Oct 26, 2026",
            originalSection: "Assessments"
          },
          {
            id: "res-ra-s2",
            name: "Exercise Sheet 2: Topology of Metric Spaces",
            category: "problem_sheet",
            sheetNumber: 2,
            fileUrl: "/materials/MTH2008/Exercise Sheet 2.pdf",
            fileSize: "136 KB",
            timeModified: "Oct 26, 2026",
            originalSection: "Assessments"
          },
          {
            id: "res-ra-s3",
            name: "Exercise Sheet 3: Convergence & Completeness",
            category: "problem_sheet",
            sheetNumber: 3,
            fileUrl: "/materials/MTH2008/Exercise Sheet 3.pdf",
            fileSize: "149 KB",
            timeModified: "Oct 26, 2026",
            originalSection: "Assessments"
          },
          {
            id: "res-ra-fa1",
            name: "Graded Formative Assessment 1",
            category: "problem_sheet",
            sheetNumber: 4,
            fileUrl: "/materials/MTH2008/Graded Formative Assessment 1.pdf",
            fileSize: "121 KB",
            timeModified: "Oct 26, 2026",
            originalSection: "Assessments"
          },
          {
            id: "res-ra-fa2",
            name: "Graded Formative Assessment 2",
            category: "problem_sheet",
            sheetNumber: 5,
            fileUrl: "/materials/MTH2008/Graded Formative Assessment 2.pdf",
            fileSize: "120 KB",
            timeModified: "Oct 26, 2026",
            originalSection: "Assessments"
          }
        ]
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
        id: "e8c2f2ed-df2e-4d4e-a806-b4e90157aade",
        title: "23/10/2026 @ 15:32 - MTH2010_L2/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e8c2f2ed-df2e-4d4e-a806-b4e90157aade&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e8c2f2ed-df2e-4d4e-a806-b4e90157aade&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "91c68d24-0f62-4243-87ab-b4e90157ae9c",
        title: "22/10/2026 @ 13:32 - MTH2010_L1/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=91c68d24-0f62-4243-87ab-b4e90157ae9c&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=91c68d24-0f62-4243-87ab-b4e90157ae9c&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "5bee6561-5bd2-4713-b874-b4e500a9521b",
        title: "19/10/2026 @ 10:32 - MTH2010_L3/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5bee6561-5bd2-4713-b874-b4e500a9521b&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5bee6561-5bd2-4713-b874-b4e500a9521b&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "8ed03f4f-7308-4e37-9d37-b4e100e26ac7",
        title: "15/10/2026 @ 13:32 - MTH2010_L1/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=8ed03f4f-7308-4e37-9d37-b4e100e26ac7&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8ed03f4f-7308-4e37-9d37-b4e100e26ac7&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "a002e01a-0dd4-4d94-9463-b4de00aa1fd9",
        title: "12/10/2026 @ 10:32 - MTH2010_L3/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a002e01a-0dd4-4d94-9463-b4de00aa1fd9&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a002e01a-0dd4-4d94-9463-b4de00aa1fd9&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "f6fad070-77f2-48e1-be4f-b4de0088e546",
        title: "12/10/2026 @ 08:32 - MTH2010_L4/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f6fad070-77f2-48e1-be4f-b4de0088e546&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f6fad070-77f2-48e1-be4f-b4de0088e546&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "41c93aa6-82c2-4355-af7b-b4db0108addc",
        title: "09/10/2026 @ 15:32 - MTH2010_L2/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=41c93aa6-82c2-4355-af7b-b4db0108addc&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=41c93aa6-82c2-4355-af7b-b4db0108addc&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "7fc38ebf-fcc8-4213-9934-b4da00dc3511",
        title: "08/10/2026 @ 13:32 - MTH2010_L1/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7fc38ebf-fcc8-4213-9934-b4da00dc3511&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7fc38ebf-fcc8-4213-9934-b4da00dc3511&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "166c8b2e-45b6-4093-a8f7-b4d700aaea6a",
        title: "05/10/2026 @ 10:32 - MTH2010_L3/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=166c8b2e-45b6-4093-a8f7-b4d700aaea6a&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=166c8b2e-45b6-4093-a8f7-b4d700aaea6a&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "9f2e81ff-68a4-407b-bda7-b4d400fc7c79",
        title: "02/10/2026 @ 15:32 - MTH2010_L2/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9f2e81ff-68a4-407b-bda7-b4d400fc7c79&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9f2e81ff-68a4-407b-bda7-b4d400fc7c79&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "df0a17da-932b-4fde-93c9-b4d300e9637e",
        title: "01/10/2026 @ 13:32 - MTH2010_L1/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=df0a17da-932b-4fde-93c9-b4d300e9637e&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=df0a17da-932b-4fde-93c9-b4d300e9637e&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "18ba48bd-80ef-4612-96bd-b4d000aae224",
        title: "28/09/2026 @ 10:32 - MTH2010_L3/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=18ba48bd-80ef-4612-96bd-b4d000aae224&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=18ba48bd-80ef-4612-96bd-b4d000aae224&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "e9e5d175-6a35-4f1b-a968-b4cd00fde2f8",
        title: "25/09/2026 @ 15:32 - MTH2010_L2/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e9e5d175-6a35-4f1b-a968-b4cd00fde2f8&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e9e5d175-6a35-4f1b-a968-b4cd00fde2f8&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "7c895f52-3e68-474f-9ad9-b4cc00d307a4",
        title: "24/09/2026 @ 13:32 - MTH2010_L1/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7c895f52-3e68-474f-9ad9-b4cc00d307a4&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7c895f52-3e68-474f-9ad9-b4cc00d307a4&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "54b91bc4-f98d-4def-a992-b4c900a1aa78",
        title: "21/09/2026 @ 10:32 - MTH2010_L3/01 - Groups, Rings and Fields",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Prof. Nigel Byott",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=54b91bc4-f98d-4def-a992-b4c900a1aa78&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=54b91bc4-f98d-4def-a992-b4c900a1aa78&instance=MoodleELE2&autoplay=true&offerviewer=true"
      }
    ],
    examPapers: generateCandidatePapers("MTH2010"),
    sections: [
      {
        id: "sec-grf-notes",
        title: "Lecture Notes: Chapters 1 to 10",
        resources: [
          {
            id: "res-grf-ch1",
            name: "Chapter 1: Groups",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 1_ Groups.pdf",
            fileSize: "311 KB",
            originalSection: "Week 1"
          },
          {
            id: "res-grf-ch2",
            name: "Chapter 2: Left Cosets and Quotient Groups",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 2_ Left Cosets and Quotient Groups.pdf",
            fileSize: "312 KB",
            originalSection: "Week 2"
          },
          {
            id: "res-grf-ch3",
            name: "Chapter 3: Group Actions",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 3_ Group Actions.pdf",
            fileSize: "284 KB",
            originalSection: "Week 3"
          },
          {
            id: "res-grf-ch4",
            name: "Chapter 4: The Class Equation",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 4_ The Class Equation.pdf",
            fileSize: "286 KB",
            originalSection: "Week 4"
          },
          {
            id: "res-grf-ch5",
            name: "Chapter 5: Sylow's Theorems",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 5_ Sylow's Theorems.pdf",
            fileSize: "291 KB",
            originalSection: "Week 5"
          },
          {
            id: "res-grf-ch6",
            name: "Chapter 6: Polynomials",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 6_ Polynomials.pdf",
            fileSize: "223 KB",
            originalSection: "Week 7"
          },
          {
            id: "res-grf-ch7",
            name: "Chapter 7: Rings",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 7_ Rings.pdf",
            fileSize: "254 KB",
            originalSection: "Week 8"
          },
          {
            id: "res-grf-ch8",
            name: "Chapter 8: Ring Homomorphisms and Ideals",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 8_ Ring Homomorphisms and Ideals.pdf",
            fileSize: "239 KB",
            originalSection: "Week 9"
          },
          {
            id: "res-grf-ch9",
            name: "Chapter 9: Prime and Maximal Ideals",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 9_ Prime and Maximal Ideals.pdf",
            fileSize: "287 KB",
            originalSection: "Week 10"
          },
          {
            id: "res-grf-ch10",
            name: "Chapter 10: Divisibility and Factorisation in Rings",
            category: "slide",
            fileUrl: "/materials/MTH2010/Chapter 10_ Divisibility and Factorisation in Rings.pdf",
            fileSize: "265 KB",
            originalSection: "Week 11"
          }
        ]
      },
      {
        id: "sec-grf-sheets",
        title: "Problem Sheets & Formative Work",
        resources: [
          {
            id: "res-grf-ps1",
            name: "Problem Sheet 1: Groups & Subgroups",
            category: "problem_sheet",
            sheetNumber: 1,
            fileUrl: "/materials/MTH2010/Problem Sheet 1.pdf",
            fileSize: "154 KB",
            originalSection: "Assessments"
          },
          {
            id: "res-grf-ps2",
            name: "Problem Sheet 2: Cosets & Lagrange's Theorem",
            category: "problem_sheet",
            sheetNumber: 2,
            fileUrl: "/materials/MTH2010/Problem Sheet 2.pdf",
            fileSize: "154 KB",
            originalSection: "Assessments"
          },
          {
            id: "res-grf-gfs1",
            name: "Graded Formative Sheet 1: Group Homomorphisms",
            category: "problem_sheet",
            sheetNumber: 3,
            fileUrl: "/materials/MTH2010/Graded Formative Sheet 1.pdf",
            fileSize: "155 KB",
            originalSection: "Assessments"
          }
        ]
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
        id: "a2feff42-d4c3-4155-8587-b4e90157b56f",
        title: "23/10/2026 @ 10:32 - MTH2014_L3/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a2feff42-d4c3-4155-8587-b4e90157b56f&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a2feff42-d4c3-4155-8587-b4e90157b56f&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "5dad51d7-0f63-4bfa-9052-b4e90157b1d6",
        title: "22/10/2026 @ 14:32 - MTH2014_L5/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5dad51d7-0f63-4bfa-9052-b4e90157b1d6&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5dad51d7-0f63-4bfa-9052-b4e90157b1d6&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "87f44b4c-f5f9-42dd-b383-b4e90157b8d0",
        title: "22/10/2026 @ 12:32 - MTH2014_L1/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=87f44b4c-f5f9-42dd-b383-b4e90157b8d0&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=87f44b4c-f5f9-42dd-b383-b4e90157b8d0&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "7fd89580-efc2-47d1-a468-b4e500eb3e8c",
        title: "19/10/2026 @ 14:32 - MTH2014_L2/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7fd89580-efc2-47d1-a468-b4e500eb3e8c&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7fd89580-efc2-47d1-a468-b4e500eb3e8c&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "daebef7f-a9d8-4d7d-9f93-b4e200a98aac",
        title: "16/10/2026 @ 10:32 - MTH2014_L3/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=daebef7f-a9d8-4d7d-9f93-b4e200a98aac&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=daebef7f-a9d8-4d7d-9f93-b4e200a98aac&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "2d8d07ce-9627-4e06-9674-b4e1011414de",
        title: "15/10/2026 @ 14:32 - MTH2014_L4/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2d8d07ce-9627-4e06-9674-b4e1011414de&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2d8d07ce-9627-4e06-9674-b4e1011414de&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "bb21a93f-5703-418d-b092-b4e100d27a6e",
        title: "15/10/2026 @ 12:32 - MTH2014_L1/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bb21a93f-5703-418d-b092-b4e100d27a6e&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bb21a93f-5703-418d-b092-b4e100d27a6e&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "9925a5bb-c707-4b23-81c1-b4de00eb5688",
        title: "12/10/2026 @ 14:32 - MTH2014_L2/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9925a5bb-c707-4b23-81c1-b4de00eb5688&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9925a5bb-c707-4b23-81c1-b4de00eb5688&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "a84f09bd-afec-4cd0-a8ef-b4db0108b188",
        title: "09/10/2026 @ 10:32 - MTH2014_L3/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a84f09bd-afec-4cd0-a8ef-b4db0108b188&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a84f09bd-afec-4cd0-a8ef-b4db0108b188&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "f4a61a8d-79f7-4b47-b3e7-b4da00cb67ff",
        title: "08/10/2026 @ 12:32 - MTH2014_L1/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f4a61a8d-79f7-4b47-b3e7-b4da00cb67ff&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f4a61a8d-79f7-4b47-b3e7-b4da00cb67ff&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "27fd9241-e1b3-40db-be2b-b4d700ec9474",
        title: "05/10/2026 @ 14:32 - MTH2014_L2/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=27fd9241-e1b3-40db-be2b-b4d700ec9474&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=27fd9241-e1b3-40db-be2b-b4d700ec9474&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "2c71b589-05d2-4dd8-accc-b4d400aa84a2",
        title: "02/10/2026 @ 10:32 - MTH2014_L3/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2c71b589-05d2-4dd8-accc-b4d400aa84a2&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2c71b589-05d2-4dd8-accc-b4d400aa84a2&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "9f187d2d-d8fd-46c8-9ed2-b4d300e967d6",
        title: "01/10/2026 @ 12:32 - MTH2014_L1/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9f187d2d-d8fd-46c8-9ed2-b4d300e967d6&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9f187d2d-d8fd-46c8-9ed2-b4d300e967d6&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "5ff610fb-8c39-4964-b2ae-b4d000ecd8fd",
        title: "28/09/2026 @ 14:32 - MTH2014_L2/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5ff610fb-8c39-4964-b2ae-b4d000ecd8fd&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5ff610fb-8c39-4964-b2ae-b4d000ecd8fd&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "18c13bdc-59ce-40dc-9c45-b4cd00ab68b5",
        title: "25/09/2026 @ 10:32 - MTH2014_L3/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=18c13bdc-59ce-40dc-9c45-b4cd00ab68b5&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=18c13bdc-59ce-40dc-9c45-b4cd00ab68b5&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "3144feeb-5adc-463f-b700-b4cc00c29825",
        title: "24/09/2026 @ 12:32 - MTH2014_L1/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3144feeb-5adc-463f-b700-b4cc00c29825&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3144feeb-5adc-463f-b700-b4cc00c29825&instance=MoodleELE2&autoplay=true&offerviewer=true"
      },
      {
        id: "7aa546ae-73de-490a-920b-b4c900e58726",
        title: "21/09/2026 @ 14:32 - MTH2014_L2/01 - Numerical Modelling",
        date: "Oct 2026",
        duration: "50 mins",
        lecturer: "Dr. Markus Mueller",
        panoptoUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7aa546ae-73de-490a-920b-b4c900e58726&instance=MoodleELE2",
        embedUrl: "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7aa546ae-73de-490a-920b-b4c900e58726&instance=MoodleELE2&autoplay=true&offerviewer=true"
      }
    ],
    examPapers: generateCandidatePapers("MTH2014"),
    sections: [
      {
        id: "sec-nm-notes",
        title: "Textbooks & Lecture Notes",
        resources: [
          {
            id: "res-nm-oct",
            name: "MTH2014 Numerical Modelling - Lecture Notes (v2 Oct 2026)",
            category: "slide",
            fileUrl: "/materials/MTH2014/MTH2014_lecture_notes_v2_October_2026.pdf",
            fileSize: "812 KB",
            timeModified: "Oct 26, 2026",
            originalSection: "Lecture Notes"
          },
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
