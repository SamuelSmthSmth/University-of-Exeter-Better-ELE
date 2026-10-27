package uk.ac.exeter.ele3.data

import uk.ac.exeter.ele3.data.model.Convenor
import uk.ac.exeter.ele3.data.model.Course
import uk.ac.exeter.ele3.data.model.Recording

object CoursesData {
    val courses: List<Course> = listOf(
        Course(
            id = "mth2003",
            code = "MTH2003",
            title = "Differential Equations",
            stage = 2,
            credits = 15,
            term = "Autumn Term",
            academicYear = "2026/27",
            convenor = Convenor(
                name = "Dr. Joanne Mason",
                email = "J.Mason@exeter.ac.uk",
                officeHours = "Thursdays 14:00 - 15:00 (Harrison 312)"
            ),
            recordings = listOf(
                Recording(
                    id = "d50d6915-a05c-406e-8875-b4c900d2b536",
                    title = "MTH2003 – Differential Equations – Lecture 01",
                    date = "21/09/2026",
                    duration = "51 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d50d6915-a05c-406e-8875-b4c900d2b536&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d50d6915-a05c-406e-8875-b4c900d2b536&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "67ac3c43-b63e-4497-821b-b4ca00f3da30",
                    title = "MTH2003 – Differential Equations – Lecture 02",
                    date = "22/09/2026",
                    duration = "51 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=67ac3c43-b63e-4497-821b-b4ca00f3da30&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=67ac3c43-b63e-4497-821b-b4ca00f3da30&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0f5115b1-35f4-4227-90ef-b4cd00bb5443",
                    title = "MTH2003 – Differential Equations – Lecture 03",
                    date = "25/09/2026",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0f5115b1-35f4-4227-90ef-b4cd00bb5443&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0f5115b1-35f4-4227-90ef-b4cd00bb5443&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3b847089-c864-46db-8d92-b4d000dbbf4b",
                    title = "MTH2003 – Differential Equations – Lecture 04",
                    date = "28/09/2026",
                    duration = "41 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3b847089-c864-46db-8d92-b4d000dbbf4b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3b847089-c864-46db-8d92-b4d000dbbf4b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "dc375ff3-28ee-4b9d-a482-b4d100fd2c93",
                    title = "MTH2003 – Differential Equations – Lecture 05",
                    date = "29/09/2026",
                    duration = "53 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=dc375ff3-28ee-4b9d-a482-b4d100fd2c93&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=dc375ff3-28ee-4b9d-a482-b4d100fd2c93&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1b18ef53-0fc6-4917-a190-b4d400baf365",
                    title = "MTH2003 – Differential Equations – Lecture 06",
                    date = "02/10/2026",
                    duration = "53 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1b18ef53-0fc6-4917-a190-b4d400baf365&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1b18ef53-0fc6-4917-a190-b4d400baf365&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "adddf58a-b353-4625-b379-b4d700dc39b8",
                    title = "MTH2003 – Differential Equations – Lecture 07",
                    date = "05/10/2026",
                    duration = "50 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=adddf58a-b353-4625-b379-b4d700dc39b8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=adddf58a-b353-4625-b379-b4d700dc39b8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a58692a7-95f4-474a-ba21-b4d800fcd8fc",
                    title = "MTH2003 – Differential Equations – Lecture 08",
                    date = "06/10/2026",
                    duration = "53 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a58692a7-95f4-474a-ba21-b4d800fcd8fc&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a58692a7-95f4-474a-ba21-b4d800fcd8fc&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9dc7202a-e735-499d-99d1-b4db0108a63b",
                    title = "MTH2003 – Differential Equations – Lecture 09",
                    date = "09/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9dc7202a-e735-499d-99d1-b4db0108a63b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9dc7202a-e735-499d-99d1-b4db0108a63b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "36f4b74b-89e4-4e38-a628-b4de00da16c6",
                    title = "MTH2003 – Differential Equations – Lecture 10",
                    date = "12/10/2026",
                    duration = "52 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=36f4b74b-89e4-4e38-a628-b4de00da16c6&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=36f4b74b-89e4-4e38-a628-b4de00da16c6&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "81905292-e873-4cc3-be0a-b4df00fa9b11",
                    title = "MTH2003 – Differential Equations – Lecture 11",
                    date = "13/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=81905292-e873-4cc3-be0a-b4df00fa9b11&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=81905292-e873-4cc3-be0a-b4df00fa9b11&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "419587c9-8978-454c-b2dd-b4e200b9555d",
                    title = "MTH2003 – Differential Equations – Lecture 12",
                    date = "16/10/2026",
                    duration = "52 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=419587c9-8978-454c-b2dd-b4e200b9555d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=419587c9-8978-454c-b2dd-b4e200b9555d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "40ae704d-b461-43ea-b498-b4e500da4b61",
                    title = "MTH2003 – Differential Equations – Lecture 13",
                    date = "19/10/2026",
                    duration = "49 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=40ae704d-b461-43ea-b498-b4e500da4b61&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=40ae704d-b461-43ea-b498-b4e500da4b61&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3e6b90ed-ebd1-4ca8-a741-b4e600fa9f2b",
                    title = "MTH2003 – Differential Equations – Lecture 14",
                    date = "20/10/2026",
                    duration = "48 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3e6b90ed-ebd1-4ca8-a741-b4e600fa9f2b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3e6b90ed-ebd1-4ca8-a741-b4e600fa9f2b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "69cd4583-0192-4a08-b1db-b4e9015799f8",
                    title = "MTH2003 – Differential Equations – Lecture 15",
                    date = "23/10/2026",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=69cd4583-0192-4a08-b1db-b4e9015799f8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=69cd4583-0192-4a08-b1db-b4e9015799f8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                )
            )
        ),
        Course(
            id = "mth2008",
            code = "MTH2008",
            title = "Real Analysis",
            stage = 2,
            credits = 15,
            term = "Autumn Term",
            academicYear = "2026/27",
            convenor = Convenor(
                name = "Tony Samuel",
                email = "a.samuel@exeter.ac.uk",
                officeHours = "Mondays 14:00 - 16:00 (Harrison 208)"
            ),
            recordings = listOf(
                Recording(
                    id = "88f71bf4-c41a-4fc5-ab35-b4d100a1362a",
                    title = "MTH2008 – Real Analysis – Lecture 01",
                    date = "26/09/2026",
                    duration = "28 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=88f71bf4-c41a-4fc5-ab35-b4d100a1362a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=88f71bf4-c41a-4fc5-ab35-b4d100a1362a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4b9c40bb-cea8-4b78-8442-b4d100a5e9e8",
                    title = "MTH2008 – Real Analysis – Lecture 02",
                    date = "26/09/2026",
                    duration = "47 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4b9c40bb-cea8-4b78-8442-b4d100a5e9e8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4b9c40bb-cea8-4b78-8442-b4d100a5e9e8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7f4397a6-01c8-47e3-a3d4-b4d100a5ea14",
                    title = "MTH2008 – Real Analysis – Lecture 03",
                    date = "26/09/2026",
                    duration = "47 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7f4397a6-01c8-47e3-a3d4-b4d100a5ea14&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7f4397a6-01c8-47e3-a3d4-b4d100a5ea14&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "849a98b2-a779-4551-8213-b4d000bae351",
                    title = "MTH2008 – Real Analysis – Lecture 04",
                    date = "28/09/2026",
                    duration = "46 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=849a98b2-a779-4551-8213-b4d000bae351&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=849a98b2-a779-4551-8213-b4d000bae351&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "95d6889c-4419-48ef-88ef-b4d901837e6a",
                    title = "MTH2008 – Real Analysis – Lecture 05",
                    date = "05/10/2026",
                    duration = "35 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=95d6889c-4419-48ef-88ef-b4d901837e6a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=95d6889c-4419-48ef-88ef-b4d901837e6a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e83e9df9-bb1f-4c51-943b-b4d700bb19a9",
                    title = "MTH2008 – Real Analysis – Lecture 06",
                    date = "05/10/2026",
                    duration = "46 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e83e9df9-bb1f-4c51-943b-b4d700bb19a9&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e83e9df9-bb1f-4c51-943b-b4d700bb19a9&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bae6cc5a-b74a-4c1b-8fa0-b4d8008a3366",
                    title = "MTH2008 – Real Analysis – Lecture 07",
                    date = "06/10/2026",
                    duration = "48 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bae6cc5a-b74a-4c1b-8fa0-b4d8008a3366&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bae6cc5a-b74a-4c1b-8fa0-b4d8008a3366&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4b5587e6-248d-4163-96f9-b4de00b9681a",
                    title = "MTH2008 – Real Analysis – Lecture 08",
                    date = "12/10/2026",
                    duration = "48 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4b5587e6-248d-4163-96f9-b4de00b9681a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4b5587e6-248d-4163-96f9-b4de00b9681a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bc0921a4-b4d0-472c-a9dd-b4df0087d5db",
                    title = "MTH2008 – Real Analysis – Lecture 09",
                    date = "13/10/2026",
                    duration = "47 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bc0921a4-b4d0-472c-a9dd-b4df0087d5db&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bc0921a4-b4d0-472c-a9dd-b4df0087d5db&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bd087c27-9507-40f2-bd57-b4e1011411af",
                    title = "MTH2008 – Real Analysis – Lecture 10",
                    date = "15/10/2026",
                    duration = "46 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bd087c27-9507-40f2-bd57-b4e1011411af&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bd087c27-9507-40f2-bd57-b4e1011411af&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1d3a9b2f-1fa3-4b72-9ef6-b4e500b9bb51",
                    title = "MTH2008 – Real Analysis – Lecture 11",
                    date = "19/10/2026",
                    duration = "48 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1d3a9b2f-1fa3-4b72-9ef6-b4e500b9bb51&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1d3a9b2f-1fa3-4b72-9ef6-b4e500b9bb51&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4f16ee72-58db-4102-addf-b4e90157a770",
                    title = "MTH2008 – Real Analysis – Lecture 12",
                    date = "22/10/2026",
                    duration = "45 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4f16ee72-58db-4102-addf-b4e90157a770&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4f16ee72-58db-4102-addf-b4e90157a770&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                )
            )
        ),
        Course(
            id = "mth2010",
            code = "MTH2010",
            title = "Groups, Rings and Fields",
            stage = 2,
            credits = 15,
            term = "Autumn Term",
            academicYear = "2026/27",
            convenor = Convenor(
                name = "Gihan Marasingha",
                email = "G.Marasingha@exeter.ac.uk",
                officeHours = "Tuesdays 14:00 - 16:00 (Harrison 102)"
            ),
            recordings = listOf(
                Recording(
                    id = "54b91bc4-f98d-4def-a992-b4c900a1aa78",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 01",
                    date = "21/09/2026",
                    duration = "53 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=54b91bc4-f98d-4def-a992-b4c900a1aa78&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=54b91bc4-f98d-4def-a992-b4c900a1aa78&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7c895f52-3e68-474f-9ad9-b4cc00d307a4",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 02",
                    date = "24/09/2026",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7c895f52-3e68-474f-9ad9-b4cc00d307a4&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7c895f52-3e68-474f-9ad9-b4cc00d307a4&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e9e5d175-6a35-4f1b-a968-b4cd00fde2f8",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 03",
                    date = "25/09/2026",
                    duration = "53 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e9e5d175-6a35-4f1b-a968-b4cd00fde2f8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e9e5d175-6a35-4f1b-a968-b4cd00fde2f8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "18ba48bd-80ef-4612-96bd-b4d000aae224",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 04",
                    date = "28/09/2026",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=18ba48bd-80ef-4612-96bd-b4d000aae224&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=18ba48bd-80ef-4612-96bd-b4d000aae224&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "df0a17da-932b-4fde-93c9-b4d300e9637e",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 05",
                    date = "01/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=df0a17da-932b-4fde-93c9-b4d300e9637e&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=df0a17da-932b-4fde-93c9-b4d300e9637e&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9f2e81ff-68a4-407b-bda7-b4d400fc7c79",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 06",
                    date = "02/10/2026",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9f2e81ff-68a4-407b-bda7-b4d400fc7c79&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9f2e81ff-68a4-407b-bda7-b4d400fc7c79&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "166c8b2e-45b6-4093-a8f7-b4d700aaea6a",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 07",
                    date = "05/10/2026",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=166c8b2e-45b6-4093-a8f7-b4d700aaea6a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=166c8b2e-45b6-4093-a8f7-b4d700aaea6a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7fc38ebf-fcc8-4213-9934-b4da00dc3511",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 08",
                    date = "08/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7fc38ebf-fcc8-4213-9934-b4da00dc3511&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7fc38ebf-fcc8-4213-9934-b4da00dc3511&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "41c93aa6-82c2-4355-af7b-b4db0108addc",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 09",
                    date = "09/10/2026",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=41c93aa6-82c2-4355-af7b-b4db0108addc&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=41c93aa6-82c2-4355-af7b-b4db0108addc&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f6fad070-77f2-48e1-be4f-b4de0088e546",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 10",
                    date = "12/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f6fad070-77f2-48e1-be4f-b4de0088e546&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f6fad070-77f2-48e1-be4f-b4de0088e546&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a002e01a-0dd4-4d94-9463-b4de00aa1fd9",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 11",
                    date = "12/10/2026",
                    duration = "52 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a002e01a-0dd4-4d94-9463-b4de00aa1fd9&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a002e01a-0dd4-4d94-9463-b4de00aa1fd9&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "8ed03f4f-7308-4e37-9d37-b4e100e26ac7",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 12",
                    date = "15/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=8ed03f4f-7308-4e37-9d37-b4e100e26ac7&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8ed03f4f-7308-4e37-9d37-b4e100e26ac7&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "5bee6561-5bd2-4713-b874-b4e500a9521b",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 13",
                    date = "19/10/2026",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5bee6561-5bd2-4713-b874-b4e500a9521b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5bee6561-5bd2-4713-b874-b4e500a9521b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "91c68d24-0f62-4243-87ab-b4e90157ae9c",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 14",
                    date = "22/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=91c68d24-0f62-4243-87ab-b4e90157ae9c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=91c68d24-0f62-4243-87ab-b4e90157ae9c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e8c2f2ed-df2e-4d4e-a806-b4e90157aade",
                    title = "MTH2010 – Groups, Rings and Fields – Lecture 15",
                    date = "23/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e8c2f2ed-df2e-4d4e-a806-b4e90157aade&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e8c2f2ed-df2e-4d4e-a806-b4e90157aade&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                )
            )
        ),
        Course(
            id = "mth2014",
            code = "MTH2014",
            title = "Numerical Modelling",
            stage = 2,
            credits = 15,
            term = "Autumn Term",
            academicYear = "2026/27",
            convenor = Convenor(
                name = "Dr. Markus Mueller",
                email = "m.mueller@exeter.ac.uk",
                officeHours = "Thursdays 15:00 - 16:00 (Harrison 214)"
            ),
            recordings = listOf(
                Recording(
                    id = "7aa546ae-73de-490a-920b-b4c900e58726",
                    title = "MTH2014 – Numerical Modelling – Lecture 01",
                    date = "21/09/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7aa546ae-73de-490a-920b-b4c900e58726&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7aa546ae-73de-490a-920b-b4c900e58726&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3144feeb-5adc-463f-b700-b4cc00c29825",
                    title = "MTH2014 – Numerical Modelling – Lecture 02",
                    date = "24/09/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3144feeb-5adc-463f-b700-b4cc00c29825&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3144feeb-5adc-463f-b700-b4cc00c29825&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "18c13bdc-59ce-40dc-9c45-b4cd00ab68b5",
                    title = "MTH2014 – Numerical Modelling – Lecture 03",
                    date = "25/09/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=18c13bdc-59ce-40dc-9c45-b4cd00ab68b5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=18c13bdc-59ce-40dc-9c45-b4cd00ab68b5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "5ff610fb-8c39-4964-b2ae-b4d000ecd8fd",
                    title = "MTH2014 – Numerical Modelling – Lecture 04",
                    date = "28/09/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5ff610fb-8c39-4964-b2ae-b4d000ecd8fd&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5ff610fb-8c39-4964-b2ae-b4d000ecd8fd&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9f187d2d-d8fd-46c8-9ed2-b4d300e967d6",
                    title = "MTH2014 – Numerical Modelling – Lecture 05",
                    date = "01/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9f187d2d-d8fd-46c8-9ed2-b4d300e967d6&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9f187d2d-d8fd-46c8-9ed2-b4d300e967d6&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "2c71b589-05d2-4dd8-accc-b4d400aa84a2",
                    title = "MTH2014 – Numerical Modelling – Lecture 06",
                    date = "02/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2c71b589-05d2-4dd8-accc-b4d400aa84a2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2c71b589-05d2-4dd8-accc-b4d400aa84a2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "27fd9241-e1b3-40db-be2b-b4d700ec9474",
                    title = "MTH2014 – Numerical Modelling – Lecture 07",
                    date = "05/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=27fd9241-e1b3-40db-be2b-b4d700ec9474&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=27fd9241-e1b3-40db-be2b-b4d700ec9474&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f4a61a8d-79f7-4b47-b3e7-b4da00cb67ff",
                    title = "MTH2014 – Numerical Modelling – Lecture 08",
                    date = "08/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f4a61a8d-79f7-4b47-b3e7-b4da00cb67ff&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f4a61a8d-79f7-4b47-b3e7-b4da00cb67ff&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a84f09bd-afec-4cd0-a8ef-b4db0108b188",
                    title = "MTH2014 – Numerical Modelling – Lecture 09",
                    date = "09/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a84f09bd-afec-4cd0-a8ef-b4db0108b188&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a84f09bd-afec-4cd0-a8ef-b4db0108b188&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9925a5bb-c707-4b23-81c1-b4de00eb5688",
                    title = "MTH2014 – Numerical Modelling – Lecture 10",
                    date = "12/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9925a5bb-c707-4b23-81c1-b4de00eb5688&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9925a5bb-c707-4b23-81c1-b4de00eb5688&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bb21a93f-5703-418d-b092-b4e100d27a6e",
                    title = "MTH2014 – Numerical Modelling – Lecture 11",
                    date = "15/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bb21a93f-5703-418d-b092-b4e100d27a6e&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bb21a93f-5703-418d-b092-b4e100d27a6e&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "2d8d07ce-9627-4e06-9674-b4e1011414de",
                    title = "MTH2014 – Numerical Modelling – Lecture 12",
                    date = "15/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2d8d07ce-9627-4e06-9674-b4e1011414de&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2d8d07ce-9627-4e06-9674-b4e1011414de&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "daebef7f-a9d8-4d7d-9f93-b4e200a98aac",
                    title = "MTH2014 – Numerical Modelling – Lecture 13",
                    date = "16/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=daebef7f-a9d8-4d7d-9f93-b4e200a98aac&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=daebef7f-a9d8-4d7d-9f93-b4e200a98aac&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7fd89580-efc2-47d1-a468-b4e500eb3e8c",
                    title = "MTH2014 – Numerical Modelling – Lecture 14",
                    date = "19/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7fd89580-efc2-47d1-a468-b4e500eb3e8c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7fd89580-efc2-47d1-a468-b4e500eb3e8c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "87f44b4c-f5f9-42dd-b383-b4e90157b8d0",
                    title = "MTH2014 – Numerical Modelling – Lecture 15",
                    date = "22/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=87f44b4c-f5f9-42dd-b383-b4e90157b8d0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=87f44b4c-f5f9-42dd-b383-b4e90157b8d0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "5dad51d7-0f63-4bfa-9052-b4e90157b1d6",
                    title = "MTH2014 – Numerical Modelling – Lecture 16",
                    date = "22/10/2026",
                    duration = "57 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5dad51d7-0f63-4bfa-9052-b4e90157b1d6&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5dad51d7-0f63-4bfa-9052-b4e90157b1d6&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a2feff42-d4c3-4155-8587-b4e90157b56f",
                    title = "MTH2014 – Numerical Modelling – Lecture 17",
                    date = "23/10/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a2feff42-d4c3-4155-8587-b4e90157b56f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a2feff42-d4c3-4155-8587-b4e90157b56f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                )
            )
        ),
        Course(
            id = "mth1002",
            code = "MTH1002",
            title = "Mathematical Methods",
            stage = 1,
            credits = 30,
            term = "Autumn & Spring Term",
            academicYear = "2025/26",
            convenor = Convenor(
                name = "Mark Holland & Layal Hakim",
                email = "m.p.holland@exeter.ac.uk",
                officeHours = "Fridays 13:30 - 14:30 (Harrison 206 / 205)"
            ),
            recordings = listOf(
                Recording(
                    id = "3478ab69-3264-4b00-bff3-b35d00bc3930",
                    title = "MTH1002 – Mathematical Methods – Lecture 01",
                    date = "22/09/2025",
                    duration = "47 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3478ab69-3264-4b00-bff3-b35d00bc3930&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3478ab69-3264-4b00-bff3-b35d00bc3930&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "c5319448-d1c1-4f0e-9d38-b35e00d53225",
                    title = "MTH1002 – Mathematical Methods – Lecture 02",
                    date = "23/09/2025",
                    duration = "41 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=c5319448-d1c1-4f0e-9d38-b35e00d53225&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=c5319448-d1c1-4f0e-9d38-b35e00d53225&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "34951582-8a5d-4aeb-aad5-b36000c53944",
                    title = "MTH1002 – Mathematical Methods – Lecture 03",
                    date = "25/09/2025",
                    duration = "43 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=34951582-8a5d-4aeb-aad5-b36000c53944&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=34951582-8a5d-4aeb-aad5-b36000c53944&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "39b1c0d5-14f5-46d5-a8dc-b36400b45b6a",
                    title = "MTH1002 – Mathematical Methods – Lecture 04",
                    date = "29/09/2025",
                    duration = "42 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=39b1c0d5-14f5-46d5-a8dc-b36400b45b6a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=39b1c0d5-14f5-46d5-a8dc-b36400b45b6a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a1ebdab1-0411-41fc-a5c4-b36500d59715",
                    title = "MTH1002 – Mathematical Methods – Lecture 05",
                    date = "30/09/2025",
                    duration = "38 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a1ebdab1-0411-41fc-a5c4-b36500d59715&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a1ebdab1-0411-41fc-a5c4-b36500d59715&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e5fc0823-9b28-4fd7-9b7d-b36700ce5d05",
                    title = "MTH1002 – Mathematical Methods – Lecture 06",
                    date = "02/10/2025",
                    duration = "1 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e5fc0823-9b28-4fd7-9b7d-b36700ce5d05&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e5fc0823-9b28-4fd7-9b7d-b36700ce5d05&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "8c6ed300-a2f2-4029-9140-b36b00b4016f",
                    title = "MTH1002 – Mathematical Methods – Lecture 07",
                    date = "06/10/2025",
                    duration = "41 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=8c6ed300-a2f2-4029-9140-b36b00b4016f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8c6ed300-a2f2-4029-9140-b36b00b4016f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a3aa6d72-cb45-4d31-a91c-b36c00d4cb82",
                    title = "MTH1002 – Mathematical Methods – Lecture 08",
                    date = "07/10/2025",
                    duration = "44 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a3aa6d72-cb45-4d31-a91c-b36c00d4cb82&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a3aa6d72-cb45-4d31-a91c-b36c00d4cb82&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "52be37de-dcb9-4949-a6c2-b36e00c4f0bb",
                    title = "MTH1002 – Mathematical Methods – Lecture 09",
                    date = "09/10/2025",
                    duration = "43 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=52be37de-dcb9-4949-a6c2-b36e00c4f0bb&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=52be37de-dcb9-4949-a6c2-b36e00c4f0bb&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0b24d5e5-15d2-4f08-90b4-b37200b449ab",
                    title = "MTH1002 – Mathematical Methods – Lecture 10",
                    date = "13/10/2025",
                    duration = "46 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0b24d5e5-15d2-4f08-90b4-b37200b449ab&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0b24d5e5-15d2-4f08-90b4-b37200b449ab&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ceeae16f-76ce-4969-8758-b37300d4f26a",
                    title = "MTH1002 – Mathematical Methods – Lecture 11",
                    date = "14/10/2025",
                    duration = "45 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ceeae16f-76ce-4969-8758-b37300d4f26a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ceeae16f-76ce-4969-8758-b37300d4f26a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "155bb8e1-ee1f-4b41-9cc5-b37500c5cec3",
                    title = "MTH1002 – Mathematical Methods – Lecture 12",
                    date = "16/10/2025",
                    duration = "2 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=155bb8e1-ee1f-4b41-9cc5-b37500c5cec3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=155bb8e1-ee1f-4b41-9cc5-b37500c5cec3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "49660c71-0d83-4554-a6ef-b37900b7251c",
                    title = "MTH1002 – Mathematical Methods – Lecture 13",
                    date = "20/10/2025",
                    duration = "46 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=49660c71-0d83-4554-a6ef-b37900b7251c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=49660c71-0d83-4554-a6ef-b37900b7251c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7c786ebb-6286-49c5-8092-b37a00d5610a",
                    title = "MTH1002 – Mathematical Methods – Lecture 14",
                    date = "21/10/2025",
                    duration = "43 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7c786ebb-6286-49c5-8092-b37a00d5610a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7c786ebb-6286-49c5-8092-b37a00d5610a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "609d6f28-69aa-4641-90eb-b37c00c5ab8a",
                    title = "MTH1002 – Mathematical Methods – Lecture 15",
                    date = "23/10/2025",
                    duration = "44 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=609d6f28-69aa-4641-90eb-b37c00c5ab8a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=609d6f28-69aa-4641-90eb-b37c00c5ab8a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f915f607-1b39-4417-b932-b38700c54ae1",
                    title = "MTH1002 – Mathematical Methods – Lecture 16",
                    date = "03/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f915f607-1b39-4417-b932-b38700c54ae1&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f915f607-1b39-4417-b932-b38700c54ae1&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "6769c740-d77b-4c22-bfeb-b38800e573a6",
                    title = "MTH1002 – Mathematical Methods – Lecture 17",
                    date = "04/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6769c740-d77b-4c22-bfeb-b38800e573a6&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=6769c740-d77b-4c22-bfeb-b38800e573a6&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d34d015e-3565-43d7-85b3-b38a00d78ce9",
                    title = "MTH1002 – Mathematical Methods – Lecture 18",
                    date = "06/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d34d015e-3565-43d7-85b3-b38a00d78ce9&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d34d015e-3565-43d7-85b3-b38a00d78ce9&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "8708cd56-476e-40fe-b776-b38e00c5af85",
                    title = "MTH1002 – Mathematical Methods – Lecture 19",
                    date = "10/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=8708cd56-476e-40fe-b776-b38e00c5af85&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8708cd56-476e-40fe-b776-b38e00c5af85&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "6d8cff6d-9ddf-4c75-bdd3-b38f00e582c4",
                    title = "MTH1002 – Mathematical Methods – Lecture 20",
                    date = "11/11/2025",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6d8cff6d-9ddf-4c75-bdd3-b38f00e582c4&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=6d8cff6d-9ddf-4c75-bdd3-b38f00e582c4&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "06a6f3e1-43e8-414a-aae4-b39100d650ec",
                    title = "MTH1002 – Mathematical Methods – Lecture 21",
                    date = "13/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=06a6f3e1-43e8-414a-aae4-b39100d650ec&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=06a6f3e1-43e8-414a-aae4-b39100d650ec&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "312afaad-0fe1-407c-9bf8-b39500c566c1",
                    title = "MTH1002 – Mathematical Methods – Lecture 22",
                    date = "17/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=312afaad-0fe1-407c-9bf8-b39500c566c1&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=312afaad-0fe1-407c-9bf8-b39500c566c1&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "aae025c4-0c8a-4493-b324-b39600e5e038",
                    title = "MTH1002 – Mathematical Methods – Lecture 23",
                    date = "18/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=aae025c4-0c8a-4493-b324-b39600e5e038&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=aae025c4-0c8a-4493-b324-b39600e5e038&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bddfdd7d-e269-4b01-9e24-b39800ddeccc",
                    title = "MTH1002 – Mathematical Methods – Lecture 24",
                    date = "20/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bddfdd7d-e269-4b01-9e24-b39800ddeccc&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bddfdd7d-e269-4b01-9e24-b39800ddeccc&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e5ca11a1-406e-4da7-b4dd-b39c00c4597a",
                    title = "MTH1002 – Mathematical Methods – Lecture 25",
                    date = "24/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e5ca11a1-406e-4da7-b4dd-b39c00c4597a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e5ca11a1-406e-4da7-b4dd-b39c00c4597a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "92ba2c60-92bd-46c2-920d-b39d00e4c6e6",
                    title = "MTH1002 – Mathematical Methods – Lecture 26",
                    date = "25/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=92ba2c60-92bd-46c2-920d-b39d00e4c6e6&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=92ba2c60-92bd-46c2-920d-b39d00e4c6e6&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a6dca2a7-2589-4af9-a32b-b39f00d59381",
                    title = "MTH1002 – Mathematical Methods – Lecture 27",
                    date = "27/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a6dca2a7-2589-4af9-a32b-b39f00d59381&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a6dca2a7-2589-4af9-a32b-b39f00d59381&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1ff1d7c6-8fb2-493e-85d4-b3a300c3a9fe",
                    title = "MTH1002 – Mathematical Methods – Lecture 28",
                    date = "01/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1ff1d7c6-8fb2-493e-85d4-b3a300c3a9fe&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1ff1d7c6-8fb2-493e-85d4-b3a300c3a9fe&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3f630533-458e-4f54-a05d-b3a400e4c663",
                    title = "MTH1002 – Mathematical Methods – Lecture 29",
                    date = "02/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3f630533-458e-4f54-a05d-b3a400e4c663&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3f630533-458e-4f54-a05d-b3a400e4c663&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7333b2e7-0e5e-49b6-b4f2-b3a600d4f5b8",
                    title = "MTH1002 – Mathematical Methods – Lecture 30",
                    date = "04/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7333b2e7-0e5e-49b6-b4f2-b3a600d4f5b8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7333b2e7-0e5e-49b6-b4f2-b3a600d4f5b8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0b08a87e-7ad9-4404-b1cf-b3aa00c55185",
                    title = "MTH1002 – Mathematical Methods – Lecture 31",
                    date = "08/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0b08a87e-7ad9-4404-b1cf-b3aa00c55185&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0b08a87e-7ad9-4404-b1cf-b3aa00c55185&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ff36b23d-9f8b-4202-87b9-b3ab00e57cf0",
                    title = "MTH1002 – Mathematical Methods – Lecture 32",
                    date = "09/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ff36b23d-9f8b-4202-87b9-b3ab00e57cf0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ff36b23d-9f8b-4202-87b9-b3ab00e57cf0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ef12655b-1173-4ee8-af73-b3b0008f9d3a",
                    title = "MTH1002 – Mathematical Methods – Lecture 33",
                    date = "11/12/2025",
                    duration = "49 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ef12655b-1173-4ee8-af73-b3b0008f9d3a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ef12655b-1173-4ee8-af73-b3b0008f9d3a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "84900ec1-0bfb-4734-a27d-b3cd00e6655c",
                    title = "MTH1002 – Mathematical Methods – Lecture 34",
                    date = "12/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=84900ec1-0bfb-4734-a27d-b3cd00e6655c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=84900ec1-0bfb-4734-a27d-b3cd00e6655c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "79942a56-5e09-4ee6-9dce-b3d000a5b5f2",
                    title = "MTH1002 – Mathematical Methods – Lecture 35",
                    date = "15/01/2026",
                    duration = "57 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=79942a56-5e09-4ee6-9dce-b3d000a5b5f2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=79942a56-5e09-4ee6-9dce-b3d000a5b5f2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e3a1c40c-3469-4e80-8d48-b3d100a45135",
                    title = "MTH1002 – Mathematical Methods – Lecture 36",
                    date = "16/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e3a1c40c-3469-4e80-8d48-b3d100a45135&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e3a1c40c-3469-4e80-8d48-b3d100a45135&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "8a9f0ffb-cb1c-4cb8-9b55-b3d400e5eb10",
                    title = "MTH1002 – Mathematical Methods – Lecture 37",
                    date = "19/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=8a9f0ffb-cb1c-4cb8-9b55-b3d400e5eb10&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8a9f0ffb-cb1c-4cb8-9b55-b3d400e5eb10&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "c7ddefb4-d174-498b-b0f5-b3d700a49957",
                    title = "MTH1002 – Mathematical Methods – Lecture 38",
                    date = "22/01/2026",
                    duration = "50 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=c7ddefb4-d174-498b-b0f5-b3d700a49957&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=c7ddefb4-d174-498b-b0f5-b3d700a49957&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3378fca2-b00e-4be9-9553-b3d800a6cfb5",
                    title = "MTH1002 – Mathematical Methods – Lecture 39",
                    date = "23/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3378fca2-b00e-4be9-9553-b3d800a6cfb5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3378fca2-b00e-4be9-9553-b3d800a6cfb5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4a537fb5-6b7a-4a13-b799-b3db00e66d4d",
                    title = "MTH1002 – Mathematical Methods – Lecture 40",
                    date = "26/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4a537fb5-6b7a-4a13-b799-b3db00e66d4d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4a537fb5-6b7a-4a13-b799-b3db00e66d4d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "70049a6e-9833-40e7-be8c-b3de00a54329",
                    title = "MTH1002 – Mathematical Methods – Lecture 41",
                    date = "29/01/2026",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=70049a6e-9833-40e7-be8c-b3de00a54329&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=70049a6e-9833-40e7-be8c-b3de00a54329&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "5d96508b-9e34-4772-9a0a-b3df00a4d512",
                    title = "MTH1002 – Mathematical Methods – Lecture 42",
                    date = "30/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5d96508b-9e34-4772-9a0a-b3df00a4d512&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5d96508b-9e34-4772-9a0a-b3df00a4d512&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "248999bb-2ffe-4752-a21f-b3e200e6203f",
                    title = "MTH1002 – Mathematical Methods – Lecture 43",
                    date = "02/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=248999bb-2ffe-4752-a21f-b3e200e6203f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=248999bb-2ffe-4752-a21f-b3e200e6203f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b1c48602-5a88-4edd-8458-b3e500a4bead",
                    title = "MTH1002 – Mathematical Methods – Lecture 44",
                    date = "05/02/2026",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b1c48602-5a88-4edd-8458-b3e500a4bead&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b1c48602-5a88-4edd-8458-b3e500a4bead&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "45a7461c-90e7-47b4-9ef8-b3e600ad7eaa",
                    title = "MTH1002 – Mathematical Methods – Lecture 45",
                    date = "06/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=45a7461c-90e7-47b4-9ef8-b3e600ad7eaa&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=45a7461c-90e7-47b4-9ef8-b3e600ad7eaa&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bee0729a-8867-43e5-ae28-b3e900e65942",
                    title = "MTH1002 – Mathematical Methods – Lecture 46",
                    date = "09/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bee0729a-8867-43e5-ae28-b3e900e65942&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bee0729a-8867-43e5-ae28-b3e900e65942&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "cd36da0f-5540-41f0-b2da-b3ec00a4c474",
                    title = "MTH1002 – Mathematical Methods – Lecture 47",
                    date = "12/02/2026",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=cd36da0f-5540-41f0-b2da-b3ec00a4c474&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=cd36da0f-5540-41f0-b2da-b3ec00a4c474&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "91ea700e-4bc0-4771-b2a6-b3ed00a55392",
                    title = "MTH1002 – Mathematical Methods – Lecture 48",
                    date = "13/02/2026",
                    duration = "62 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=91ea700e-4bc0-4771-b2a6-b3ed00a55392&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=91ea700e-4bc0-4771-b2a6-b3ed00a55392&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0e7e2ca1-eb69-48f6-af2c-b3f000e5e642",
                    title = "MTH1002 – Mathematical Methods – Lecture 49",
                    date = "16/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0e7e2ca1-eb69-48f6-af2c-b3f000e5e642&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0e7e2ca1-eb69-48f6-af2c-b3f000e5e642&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "c759ac6d-8502-4bec-88b5-b3f300a4eb55",
                    title = "MTH1002 – Mathematical Methods – Lecture 50",
                    date = "19/02/2026",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=c759ac6d-8502-4bec-88b5-b3f300a4eb55&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=c759ac6d-8502-4bec-88b5-b3f300a4eb55&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e09ef177-887a-4fa4-a757-b3f400a4f9c0",
                    title = "MTH1002 – Mathematical Methods – Lecture 51",
                    date = "20/02/2026",
                    duration = "7 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e09ef177-887a-4fa4-a757-b3f400a4f9c0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e09ef177-887a-4fa4-a757-b3f400a4f9c0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bf0a8cbc-c4b2-4163-b69e-b3f700e71024",
                    title = "MTH1002 – Mathematical Methods – Lecture 52",
                    date = "23/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bf0a8cbc-c4b2-4163-b69e-b3f700e71024&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bf0a8cbc-c4b2-4163-b69e-b3f700e71024&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "42b29f5b-cc83-41e9-940c-b3fa00a6b792",
                    title = "MTH1002 – Mathematical Methods – Lecture 53",
                    date = "26/02/2026",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=42b29f5b-cc83-41e9-940c-b3fa00a6b792&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=42b29f5b-cc83-41e9-940c-b3fa00a6b792&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "718299bb-2d37-43ee-b4f3-b3fb00a73363",
                    title = "MTH1002 – Mathematical Methods – Lecture 54",
                    date = "27/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=718299bb-2d37-43ee-b4f3-b3fb00a73363&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=718299bb-2d37-43ee-b4f3-b3fb00a73363&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1c4b0bfa-1df8-4cee-bded-b3fe00e7cca0",
                    title = "MTH1002 – Mathematical Methods – Lecture 55",
                    date = "02/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1c4b0bfa-1df8-4cee-bded-b3fe00e7cca0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1c4b0bfa-1df8-4cee-bded-b3fe00e7cca0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7ee0af26-a78e-4a27-9b39-b40100a6dea1",
                    title = "MTH1002 – Mathematical Methods – Lecture 56",
                    date = "05/03/2026",
                    duration = "57 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7ee0af26-a78e-4a27-9b39-b40100a6dea1&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7ee0af26-a78e-4a27-9b39-b40100a6dea1&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3762567b-4c79-4f5c-8cbf-b40200a62639",
                    title = "MTH1002 – Mathematical Methods – Lecture 57",
                    date = "06/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3762567b-4c79-4f5c-8cbf-b40200a62639&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3762567b-4c79-4f5c-8cbf-b40200a62639&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "70a876c0-6af8-4d44-b532-b40500e8009d",
                    title = "MTH1002 – Mathematical Methods – Lecture 58",
                    date = "09/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=70a876c0-6af8-4d44-b532-b40500e8009d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=70a876c0-6af8-4d44-b532-b40500e8009d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "21cb873a-2ac3-492d-8355-b40800a640fd",
                    title = "MTH1002 – Mathematical Methods – Lecture 59",
                    date = "12/03/2026",
                    duration = "57 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=21cb873a-2ac3-492d-8355-b40800a640fd&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=21cb873a-2ac3-492d-8355-b40800a640fd&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e6735f94-2a6e-4767-8194-b40900a73bc3",
                    title = "MTH1002 – Mathematical Methods – Lecture 60",
                    date = "13/03/2026",
                    duration = "59 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e6735f94-2a6e-4767-8194-b40900a73bc3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e6735f94-2a6e-4767-8194-b40900a73bc3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1dc47ad5-a5f4-4867-b0c1-b40c00e84be7",
                    title = "MTH1002 – Mathematical Methods – Lecture 61",
                    date = "16/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1dc47ad5-a5f4-4867-b0c1-b40c00e84be7&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1dc47ad5-a5f4-4867-b0c1-b40c00e84be7&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b3c6bee5-e5b5-4a88-90c5-b40f00a86fe6",
                    title = "MTH1002 – Mathematical Methods – Lecture 62",
                    date = "19/03/2026",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b3c6bee5-e5b5-4a88-90c5-b40f00a86fe6&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b3c6bee5-e5b5-4a88-90c5-b40f00a86fe6&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d4c24b42-1f48-48a8-8afc-b41000a74e6c",
                    title = "MTH1002 – Mathematical Methods – Lecture 63",
                    date = "20/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d4c24b42-1f48-48a8-8afc-b41000a74e6c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d4c24b42-1f48-48a8-8afc-b41000a74e6c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "23a8255d-e1d5-47b3-8d91-b41300efb06c",
                    title = "MTH1002 – Mathematical Methods – Lecture 64",
                    date = "23/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=23a8255d-e1d5-47b3-8d91-b41300efb06c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=23a8255d-e1d5-47b3-8d91-b41300efb06c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bfce6c64-f48c-40d4-a832-b41600b00ff8",
                    title = "MTH1002 – Mathematical Methods – Lecture 65",
                    date = "26/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bfce6c64-f48c-40d4-a832-b41600b00ff8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bfce6c64-f48c-40d4-a832-b41600b00ff8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ceb1e717-413c-4849-bff4-b41700b002b1",
                    title = "MTH1002 – Mathematical Methods – Lecture 66",
                    date = "27/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ceb1e717-413c-4849-bff4-b41700b002b1&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ceb1e717-413c-4849-bff4-b41700b002b1&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                )
            )
        ),
        Course(
            id = "mth1001",
            code = "MTH1001",
            title = "Mathematical Structures",
            stage = 1,
            credits = 30,
            term = "Autumn & Spring Term",
            academicYear = "2025/26",
            convenor = Convenor(
                name = "Prof. Nigel Byott",
                email = "n.p.byott@exeter.ac.uk",
                officeHours = "Tuesdays 14:00 - 16:00 (Harrison 102)"
            ),
            recordings = listOf(
                Recording(
                    id = "2a751a50-7bd1-4aa1-8a80-b35d011f1067",
                    title = "MTH1001 – Mathematical Structures – Lecture 01",
                    date = "22/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2a751a50-7bd1-4aa1-8a80-b35d011f1067&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2a751a50-7bd1-4aa1-8a80-b35d011f1067&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bb025e29-4fe5-46b6-952b-b36000a3f502",
                    title = "MTH1001 – Mathematical Structures – Lecture 02",
                    date = "25/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bb025e29-4fe5-46b6-952b-b36000a3f502&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bb025e29-4fe5-46b6-952b-b36000a3f502&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3b20b878-a71d-4a61-8d5d-b3610106ba69",
                    title = "MTH1001 – Mathematical Structures – Lecture 03",
                    date = "26/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3b20b878-a71d-4a61-8d5d-b3610106ba69&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3b20b878-a71d-4a61-8d5d-b3610106ba69&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "5ed04a0d-11cc-4a43-b074-b3640116cf11",
                    title = "MTH1001 – Mathematical Structures – Lecture 04",
                    date = "29/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5ed04a0d-11cc-4a43-b074-b3640116cf11&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5ed04a0d-11cc-4a43-b074-b3640116cf11&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "efa09d1a-80a6-4bfe-a1ad-b36700ad06b9",
                    title = "MTH1001 – Mathematical Structures – Lecture 05",
                    date = "02/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=efa09d1a-80a6-4bfe-a1ad-b36700ad06b9&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=efa09d1a-80a6-4bfe-a1ad-b36700ad06b9&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "c815509d-412f-4fb9-8908-b368010652f5",
                    title = "MTH1001 – Mathematical Structures – Lecture 06",
                    date = "03/10/2025",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=c815509d-412f-4fb9-8908-b368010652f5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=c815509d-412f-4fb9-8908-b368010652f5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "5f4b5140-38d7-4094-b0cb-b36b01176540",
                    title = "MTH1001 – Mathematical Structures – Lecture 07",
                    date = "06/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5f4b5140-38d7-4094-b0cb-b36b01176540&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5f4b5140-38d7-4094-b0cb-b36b01176540&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "62015692-9e07-41bb-94c7-b36e00a3ff1b",
                    title = "MTH1001 – Mathematical Structures – Lecture 08",
                    date = "09/10/2025",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=62015692-9e07-41bb-94c7-b36e00a3ff1b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=62015692-9e07-41bb-94c7-b36e00a3ff1b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "5602c7ab-dd06-41c6-ab63-b36f01066aca",
                    title = "MTH1001 – Mathematical Structures – Lecture 09",
                    date = "10/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5602c7ab-dd06-41c6-ab63-b36f01066aca&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5602c7ab-dd06-41c6-ab63-b36f01066aca&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b981d19a-6e5f-485e-a316-b3720116d6a4",
                    title = "MTH1001 – Mathematical Structures – Lecture 10",
                    date = "13/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b981d19a-6e5f-485e-a316-b3720116d6a4&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b981d19a-6e5f-485e-a316-b3720116d6a4&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "fd35e82c-aee5-4720-9a19-b37500a4212d",
                    title = "MTH1001 – Mathematical Structures – Lecture 11",
                    date = "16/10/2025",
                    duration = "51 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=fd35e82c-aee5-4720-9a19-b37500a4212d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=fd35e82c-aee5-4720-9a19-b37500a4212d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "6e9e3b16-b2f6-47f7-9422-b376010f5c65",
                    title = "MTH1001 – Mathematical Structures – Lecture 12",
                    date = "17/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6e9e3b16-b2f6-47f7-9422-b376010f5c65&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=6e9e3b16-b2f6-47f7-9422-b376010f5c65&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "db6220c1-660a-4fb3-b81f-b3790116e11d",
                    title = "MTH1001 – Mathematical Structures – Lecture 13",
                    date = "20/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=db6220c1-660a-4fb3-b81f-b3790116e11d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=db6220c1-660a-4fb3-b81f-b3790116e11d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "19afc9b0-c5e4-4150-ad48-b37c00a3fa3c",
                    title = "MTH1001 – Mathematical Structures – Lecture 14",
                    date = "23/10/2025",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=19afc9b0-c5e4-4150-ad48-b37c00a3fa3c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=19afc9b0-c5e4-4150-ad48-b37c00a3fa3c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d7882668-0fb1-4b60-8a33-b37d01072e80",
                    title = "MTH1001 – Mathematical Structures – Lecture 15",
                    date = "24/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d7882668-0fb1-4b60-8a33-b37d01072e80&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d7882668-0fb1-4b60-8a33-b37d01072e80&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "29619f8b-27d5-4762-aca7-b3870127c4eb",
                    title = "MTH1001 – Mathematical Structures – Lecture 16",
                    date = "03/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=29619f8b-27d5-4762-aca7-b3870127c4eb&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=29619f8b-27d5-4762-aca7-b3870127c4eb&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "60175b8f-ec74-4e51-94ad-b38a00b5328d",
                    title = "MTH1001 – Mathematical Structures – Lecture 17",
                    date = "06/11/2025",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=60175b8f-ec74-4e51-94ad-b38a00b5328d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=60175b8f-ec74-4e51-94ad-b38a00b5328d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0c0f65b5-2c89-4d7a-8ac9-b38b011832f5",
                    title = "MTH1001 – Mathematical Structures – Lecture 18",
                    date = "07/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0c0f65b5-2c89-4d7a-8ac9-b38b011832f5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0c0f65b5-2c89-4d7a-8ac9-b38b011832f5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e03ddc62-8d31-40af-9ded-b38e01272842",
                    title = "MTH1001 – Mathematical Structures – Lecture 19",
                    date = "10/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e03ddc62-8d31-40af-9ded-b38e01272842&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e03ddc62-8d31-40af-9ded-b38e01272842&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ca2b202c-20d7-4a41-bfd3-b39100b53d93",
                    title = "MTH1001 – Mathematical Structures – Lecture 20",
                    date = "13/11/2025",
                    duration = "53 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ca2b202c-20d7-4a41-bfd3-b39100b53d93&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ca2b202c-20d7-4a41-bfd3-b39100b53d93&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "08afa6bb-3a4f-420d-94c5-b3920118976a",
                    title = "MTH1001 – Mathematical Structures – Lecture 21",
                    date = "14/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=08afa6bb-3a4f-420d-94c5-b3920118976a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=08afa6bb-3a4f-420d-94c5-b3920118976a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "75e9536d-aa64-4623-8d43-b39501275e1d",
                    title = "MTH1001 – Mathematical Structures – Lecture 22",
                    date = "17/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=75e9536d-aa64-4623-8d43-b39501275e1d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=75e9536d-aa64-4623-8d43-b39501275e1d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "061a1756-9d45-4503-b773-b39800b483b2",
                    title = "MTH1001 – Mathematical Structures – Lecture 23",
                    date = "20/11/2025",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=061a1756-9d45-4503-b773-b39800b483b2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=061a1756-9d45-4503-b773-b39800b483b2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "498eaee2-d0cf-4c66-8898-b39901176e29",
                    title = "MTH1001 – Mathematical Structures – Lecture 24",
                    date = "21/11/2025",
                    duration = "57 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=498eaee2-d0cf-4c66-8898-b39901176e29&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=498eaee2-d0cf-4c66-8898-b39901176e29&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3a8e94e9-af17-41f0-835e-b39c0126a723",
                    title = "MTH1001 – Mathematical Structures – Lecture 25",
                    date = "24/11/2025",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3a8e94e9-af17-41f0-835e-b39c0126a723&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3a8e94e9-af17-41f0-835e-b39c0126a723&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4303275d-3370-401f-9205-b39f00b418b2",
                    title = "MTH1001 – Mathematical Structures – Lecture 26",
                    date = "27/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4303275d-3370-401f-9205-b39f00b418b2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4303275d-3370-401f-9205-b39f00b418b2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "fbcc6cf1-bd75-40c6-8383-b3a001171732",
                    title = "MTH1001 – Mathematical Structures – Lecture 27",
                    date = "28/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=fbcc6cf1-bd75-40c6-8383-b3a001171732&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=fbcc6cf1-bd75-40c6-8383-b3a001171732&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3207400a-a0e4-48da-b577-b3a30126891a",
                    title = "MTH1001 – Mathematical Structures – Lecture 28",
                    date = "01/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3207400a-a0e4-48da-b577-b3a30126891a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3207400a-a0e4-48da-b577-b3a30126891a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b96a396e-4d4d-44ee-a76c-b3a600b3cbb0",
                    title = "MTH1001 – Mathematical Structures – Lecture 29",
                    date = "04/12/2025",
                    duration = "1 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b96a396e-4d4d-44ee-a76c-b3a600b3cbb0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b96a396e-4d4d-44ee-a76c-b3a600b3cbb0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "dd3ed9b6-73ea-4eb3-a938-b3a70116f019",
                    title = "MTH1001 – Mathematical Structures – Lecture 30",
                    date = "05/12/2025",
                    duration = "57 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=dd3ed9b6-73ea-4eb3-a938-b3a70116f019&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=dd3ed9b6-73ea-4eb3-a938-b3a70116f019&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0f3b3a66-6016-490b-94da-b3aa01272183",
                    title = "MTH1001 – Mathematical Structures – Lecture 31",
                    date = "08/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0f3b3a66-6016-490b-94da-b3aa01272183&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0f3b3a66-6016-490b-94da-b3aa01272183&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9912c698-abf9-46ec-9c8b-b3b0008f9573",
                    title = "MTH1001 – Mathematical Structures – Lecture 32",
                    date = "11/12/2025",
                    duration = "57 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9912c698-abf9-46ec-9c8b-b3b0008f9573&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9912c698-abf9-46ec-9c8b-b3b0008f9573&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a02730a4-8271-47c5-aac5-b3b0008f99e7",
                    title = "MTH1001 – Mathematical Structures – Lecture 33",
                    date = "12/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a02730a4-8271-47c5-aac5-b3b0008f99e7&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a02730a4-8271-47c5-aac5-b3b0008f99e7&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b67ae908-210f-4e84-ba91-b3ce00a4dd7b",
                    title = "MTH1001 – Mathematical Structures – Lecture 34",
                    date = "13/01/2026",
                    duration = "57 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b67ae908-210f-4e84-ba91-b3ce00a4dd7b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b67ae908-210f-4e84-ba91-b3ce00a4dd7b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ab4da590-0a36-479f-9370-b3d100d55d40",
                    title = "MTH1001 – Mathematical Structures – Lecture 35",
                    date = "16/01/2026",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ab4da590-0a36-479f-9370-b3d100d55d40&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ab4da590-0a36-479f-9370-b3d100d55d40&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f77dbef5-326b-4302-9449-b3d100e64499",
                    title = "MTH1001 – Mathematical Structures – Lecture 36",
                    date = "16/01/2026",
                    duration = "6 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f77dbef5-326b-4302-9449-b3d100e64499&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f77dbef5-326b-4302-9449-b3d100e64499&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3c732025-4915-4a8e-af77-b3d400e180a8",
                    title = "MTH1001 – Mathematical Structures – Lecture 37",
                    date = "16/01/2026",
                    duration = "41 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3c732025-4915-4a8e-af77-b3d400e180a8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3c732025-4915-4a8e-af77-b3d400e180a8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bb66c7fa-720e-4712-a45b-b3d500a4defb",
                    title = "MTH1001 – Mathematical Structures – Lecture 38",
                    date = "20/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bb66c7fa-720e-4712-a45b-b3d500a4defb&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bb66c7fa-720e-4712-a45b-b3d500a4defb&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3f2bc14c-de33-414a-a261-b3d800d5e593",
                    title = "MTH1001 – Mathematical Structures – Lecture 39",
                    date = "23/01/2026",
                    duration = "6 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3f2bc14c-de33-414a-a261-b3d800d5e593&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3f2bc14c-de33-414a-a261-b3d800d5e593&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "527348f4-655d-4641-be34-b3d800e646b8",
                    title = "MTH1001 – Mathematical Structures – Lecture 40",
                    date = "23/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=527348f4-655d-4641-be34-b3d800e646b8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=527348f4-655d-4641-be34-b3d800e646b8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "c2dcc6a3-a09d-4502-ab2b-b3dc00a51c7b",
                    title = "MTH1001 – Mathematical Structures – Lecture 41",
                    date = "27/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=c2dcc6a3-a09d-4502-ab2b-b3dc00a51c7b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=c2dcc6a3-a09d-4502-ab2b-b3dc00a51c7b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ad174832-216e-4703-837a-b3df00d5cc01",
                    title = "MTH1001 – Mathematical Structures – Lecture 42",
                    date = "30/01/2026",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ad174832-216e-4703-837a-b3df00d5cc01&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ad174832-216e-4703-837a-b3df00d5cc01&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e1d83ffc-6488-4634-9ce8-b3df00e64387",
                    title = "MTH1001 – Mathematical Structures – Lecture 43",
                    date = "30/01/2026",
                    duration = "47 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e1d83ffc-6488-4634-9ce8-b3df00e64387&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e1d83ffc-6488-4634-9ce8-b3df00e64387&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "651d0749-a3cf-47a8-92aa-b3e300a520f0",
                    title = "MTH1001 – Mathematical Structures – Lecture 44",
                    date = "03/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=651d0749-a3cf-47a8-92aa-b3e300a520f0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=651d0749-a3cf-47a8-92aa-b3e300a520f0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9d7df390-d80d-426a-acf9-b3e600df0a6b",
                    title = "MTH1001 – Mathematical Structures – Lecture 45",
                    date = "06/02/2026",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9d7df390-d80d-426a-acf9-b3e600df0a6b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9d7df390-d80d-426a-acf9-b3e600df0a6b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ff52c677-480a-4b02-91ab-b3e600f05332",
                    title = "MTH1001 – Mathematical Structures – Lecture 46",
                    date = "06/02/2026",
                    duration = "45 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ff52c677-480a-4b02-91ab-b3e600f05332&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ff52c677-480a-4b02-91ab-b3e600f05332&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "68078f43-25b8-4112-a8e0-b3ea00a49d38",
                    title = "MTH1001 – Mathematical Structures – Lecture 47",
                    date = "10/02/2026",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=68078f43-25b8-4112-a8e0-b3ea00a49d38&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=68078f43-25b8-4112-a8e0-b3ea00a49d38&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bd3f35a6-5764-4452-97f3-b3ed00d6662e",
                    title = "MTH1001 – Mathematical Structures – Lecture 48",
                    date = "13/02/2026",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bd3f35a6-5764-4452-97f3-b3ed00d6662e&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bd3f35a6-5764-4452-97f3-b3ed00d6662e&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "88641774-ca02-48f4-8ac5-b3ed00e6ed74",
                    title = "MTH1001 – Mathematical Structures – Lecture 49",
                    date = "13/02/2026",
                    duration = "45 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=88641774-ca02-48f4-8ac5-b3ed00e6ed74&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=88641774-ca02-48f4-8ac5-b3ed00e6ed74&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4c4ba47a-79bc-4035-9e0d-b3f100a48791",
                    title = "MTH1001 – Mathematical Structures – Lecture 50",
                    date = "17/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4c4ba47a-79bc-4035-9e0d-b3f100a48791&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4c4ba47a-79bc-4035-9e0d-b3f100a48791&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4a7eb4f9-15b5-4840-9e1b-b3f400d5ecb0",
                    title = "MTH1001 – Mathematical Structures – Lecture 51",
                    date = "20/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4a7eb4f9-15b5-4840-9e1b-b3f400d5ecb0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4a7eb4f9-15b5-4840-9e1b-b3f400d5ecb0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "254b30a9-24f3-4f0e-9ae4-b3f400e66a6c",
                    title = "MTH1001 – Mathematical Structures – Lecture 52",
                    date = "20/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=254b30a9-24f3-4f0e-9ae4-b3f400e66a6c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=254b30a9-24f3-4f0e-9ae4-b3f400e66a6c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "313ce300-bd4b-4f01-b420-b3f800a67d29",
                    title = "MTH1001 – Mathematical Structures – Lecture 53",
                    date = "24/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=313ce300-bd4b-4f01-b420-b3f800a67d29&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=313ce300-bd4b-4f01-b420-b3f800a67d29&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4d69df2b-c155-4017-a2ce-b3fb00d6c8be",
                    title = "MTH1001 – Mathematical Structures – Lecture 54",
                    date = "27/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4d69df2b-c155-4017-a2ce-b3fb00d6c8be&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4d69df2b-c155-4017-a2ce-b3fb00d6c8be&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a0628147-f8fb-4171-ad03-b3fb00e755ef",
                    title = "MTH1001 – Mathematical Structures – Lecture 55",
                    date = "27/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a0628147-f8fb-4171-ad03-b3fb00e755ef&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a0628147-f8fb-4171-ad03-b3fb00e755ef&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "369cec49-268b-4c42-b682-b3ff00a6fe2b",
                    title = "MTH1001 – Mathematical Structures – Lecture 56",
                    date = "03/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=369cec49-268b-4c42-b682-b3ff00a6fe2b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=369cec49-268b-4c42-b682-b3ff00a6fe2b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1af23da6-d64c-4131-ab10-b40200d6adcb",
                    title = "MTH1001 – Mathematical Structures – Lecture 57",
                    date = "06/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1af23da6-d64c-4131-ab10-b40200d6adcb&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1af23da6-d64c-4131-ab10-b40200d6adcb&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "962f44b8-b412-4cd0-8251-b40200e7cec9",
                    title = "MTH1001 – Mathematical Structures – Lecture 58",
                    date = "06/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=962f44b8-b412-4cd0-8251-b40200e7cec9&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=962f44b8-b412-4cd0-8251-b40200e7cec9&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b83f7773-becb-43bb-9a2a-b40600a656b4",
                    title = "MTH1001 – Mathematical Structures – Lecture 59",
                    date = "10/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b83f7773-becb-43bb-9a2a-b40600a656b4&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b83f7773-becb-43bb-9a2a-b40600a656b4&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "62cd376a-6d93-4d0a-8519-b40900d6e076",
                    title = "MTH1001 – Mathematical Structures – Lecture 60",
                    date = "13/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=62cd376a-6d93-4d0a-8519-b40900d6e076&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=62cd376a-6d93-4d0a-8519-b40900d6e076&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0d509205-181f-4eef-abc8-b40900e741c3",
                    title = "MTH1001 – Mathematical Structures – Lecture 61",
                    date = "13/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0d509205-181f-4eef-abc8-b40900e741c3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0d509205-181f-4eef-abc8-b40900e741c3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ae62e650-14f7-440e-9dc2-b40d00a6bf9b",
                    title = "MTH1001 – Mathematical Structures – Lecture 62",
                    date = "17/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ae62e650-14f7-440e-9dc2-b40d00a6bf9b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ae62e650-14f7-440e-9dc2-b40d00a6bf9b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d7e442c9-3c4e-4b76-8493-b41000d7eac2",
                    title = "MTH1001 – Mathematical Structures – Lecture 63",
                    date = "20/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d7e442c9-3c4e-4b76-8493-b41000d7eac2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d7e442c9-3c4e-4b76-8493-b41000d7eac2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7fff80d5-3aee-461d-985a-b41000e92a94",
                    title = "MTH1001 – Mathematical Structures – Lecture 64",
                    date = "20/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7fff80d5-3aee-461d-985a-b41000e92a94&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7fff80d5-3aee-461d-985a-b41000e92a94&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "440dcae8-ceac-4962-924c-b41400a71f0b",
                    title = "MTH1001 – Mathematical Structures – Lecture 65",
                    date = "24/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=440dcae8-ceac-4962-924c-b41400a71f0b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=440dcae8-ceac-4962-924c-b41400a71f0b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "43cdd873-9886-4812-9cf7-b41700e094ec",
                    title = "MTH1001 – Mathematical Structures – Lecture 66",
                    date = "27/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=43cdd873-9886-4812-9cf7-b41700e094ec&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=43cdd873-9886-4812-9cf7-b41700e094ec&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "da6ff4f7-70fc-42fb-9242-b41700f0d912",
                    title = "MTH1001 – Mathematical Structures – Lecture 67",
                    date = "27/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=da6ff4f7-70fc-42fb-9242-b41700f0d912&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=da6ff4f7-70fc-42fb-9242-b41700f0d912&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3cc86e4c-82e3-4435-a31c-b43900a4579d",
                    title = "MTH1001 – Mathematical Structures – Lecture 68",
                    date = "30/04/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3cc86e4c-82e3-4435-a31c-b43900a4579d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3cc86e4c-82e3-4435-a31c-b43900a4579d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                )
            )
        ),
        Course(
            id = "mth1003",
            code = "MTH1003",
            title = "Mathematical Modelling",
            stage = 1,
            credits = 30,
            term = "Autumn & Spring Term",
            academicYear = "2025/26",
            convenor = Convenor(
                name = "Dr. Krasimira Tsaneva-Atanasova",
                email = "k.tsaneva-atanasova@exeter.ac.uk",
                officeHours = null
            ),
            recordings = listOf(
                Recording(
                    id = "398089ea-c3ff-4bb3-986f-b35d009bd060",
                    title = "MTH1003 – Mathematical Modelling – Lecture 01",
                    date = "22/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=398089ea-c3ff-4bb3-986f-b35d009bd060&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=398089ea-c3ff-4bb3-986f-b35d009bd060&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "119dc97a-a8e8-4169-af4c-b36000e63bd7",
                    title = "MTH1003 – Mathematical Modelling – Lecture 02",
                    date = "25/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=119dc97a-a8e8-4169-af4c-b36000e63bd7&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=119dc97a-a8e8-4169-af4c-b36000e63bd7&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "dc229754-1234-4c9d-bdd3-b36100c4dd33",
                    title = "MTH1003 – Mathematical Modelling – Lecture 03",
                    date = "26/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=dc229754-1234-4c9d-bdd3-b36100c4dd33&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=dc229754-1234-4c9d-bdd3-b36100c4dd33&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a2c4cbd7-e0e1-4278-8a3b-b3640093e828",
                    title = "MTH1003 – Mathematical Modelling – Lecture 04",
                    date = "29/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a2c4cbd7-e0e1-4278-8a3b-b3640093e828&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a2c4cbd7-e0e1-4278-8a3b-b3640093e828&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9ea970b7-2d1a-4dd3-a646-b36700ee53e4",
                    title = "MTH1003 – Mathematical Modelling – Lecture 05",
                    date = "02/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9ea970b7-2d1a-4dd3-a646-b36700ee53e4&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9ea970b7-2d1a-4dd3-a646-b36700ee53e4&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "eda92451-6793-44e0-a92b-b36800c4e481",
                    title = "MTH1003 – Mathematical Modelling – Lecture 06",
                    date = "03/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=eda92451-6793-44e0-a92b-b36800c4e481&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=eda92451-6793-44e0-a92b-b36800c4e481&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bef4d2eb-1ba2-45f7-9cf0-b36b0093cd01",
                    title = "MTH1003 – Mathematical Modelling – Lecture 07",
                    date = "06/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bef4d2eb-1ba2-45f7-9cf0-b36b0093cd01&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bef4d2eb-1ba2-45f7-9cf0-b36b0093cd01&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f5c4ac44-52c5-4efb-bb88-b36e00e63a03",
                    title = "MTH1003 – Mathematical Modelling – Lecture 08",
                    date = "09/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f5c4ac44-52c5-4efb-bb88-b36e00e63a03&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f5c4ac44-52c5-4efb-bb88-b36e00e63a03&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f83b1fe3-4724-4f05-9070-b36f00c50746",
                    title = "MTH1003 – Mathematical Modelling – Lecture 09",
                    date = "10/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f83b1fe3-4724-4f05-9070-b36f00c50746&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f83b1fe3-4724-4f05-9070-b36f00c50746&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "98377953-e353-4083-8c82-b37200942e01",
                    title = "MTH1003 – Mathematical Modelling – Lecture 10",
                    date = "13/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=98377953-e353-4083-8c82-b37200942e01&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=98377953-e353-4083-8c82-b37200942e01&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1ee79e20-8dbd-47dc-a7ff-b37500e63a22",
                    title = "MTH1003 – Mathematical Modelling – Lecture 11",
                    date = "16/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1ee79e20-8dbd-47dc-a7ff-b37500e63a22&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1ee79e20-8dbd-47dc-a7ff-b37500e63a22&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "de4e82e4-8887-408e-a028-b37600cdef92",
                    title = "MTH1003 – Mathematical Modelling – Lecture 12",
                    date = "17/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=de4e82e4-8887-408e-a028-b37600cdef92&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=de4e82e4-8887-408e-a028-b37600cdef92&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d10d5e13-b880-4a44-84ed-b37900953615",
                    title = "MTH1003 – Mathematical Modelling – Lecture 13",
                    date = "20/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d10d5e13-b880-4a44-84ed-b37900953615&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d10d5e13-b880-4a44-84ed-b37900953615&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4b6bcc61-b36c-45b5-886f-b37c00e69c05",
                    title = "MTH1003 – Mathematical Modelling – Lecture 14",
                    date = "23/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4b6bcc61-b36c-45b5-886f-b37c00e69c05&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4b6bcc61-b36c-45b5-886f-b37c00e69c05&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "550e2e75-18ae-4f80-87f3-b37d00c54e36",
                    title = "MTH1003 – Mathematical Modelling – Lecture 15",
                    date = "24/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=550e2e75-18ae-4f80-87f3-b37d00c54e36&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=550e2e75-18ae-4f80-87f3-b37d00c54e36&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "52cf2acf-daea-42e3-a3bd-b38700a4c52e",
                    title = "MTH1003 – Mathematical Modelling – Lecture 16",
                    date = "03/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=52cf2acf-daea-42e3-a3bd-b38700a4c52e&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=52cf2acf-daea-42e3-a3bd-b38700a4c52e&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "75f5fc46-8e77-49f0-b98d-b38a00f69b85",
                    title = "MTH1003 – Mathematical Modelling – Lecture 17",
                    date = "06/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=75f5fc46-8e77-49f0-b98d-b38a00f69b85&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=75f5fc46-8e77-49f0-b98d-b38a00f69b85&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3332179e-297c-4ce9-81bb-b38b00d7f1f7",
                    title = "MTH1003 – Mathematical Modelling – Lecture 18",
                    date = "07/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3332179e-297c-4ce9-81bb-b38b00d7f1f7&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3332179e-297c-4ce9-81bb-b38b00d7f1f7&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9c21f4e3-8657-4460-9c72-b38e00a66a60",
                    title = "MTH1003 – Mathematical Modelling – Lecture 19",
                    date = "10/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9c21f4e3-8657-4460-9c72-b38e00a66a60&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9c21f4e3-8657-4460-9c72-b38e00a66a60&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7fd40dce-62b3-46cd-953e-b39100f6d27f",
                    title = "MTH1003 – Mathematical Modelling – Lecture 20",
                    date = "13/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7fd40dce-62b3-46cd-953e-b39100f6d27f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7fd40dce-62b3-46cd-953e-b39100f6d27f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "14f9a95f-a3fa-4b16-a614-b39200d71006",
                    title = "MTH1003 – Mathematical Modelling – Lecture 21",
                    date = "14/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=14f9a95f-a3fa-4b16-a614-b39200d71006&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=14f9a95f-a3fa-4b16-a614-b39200d71006&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "37e66e62-e890-4056-b2ef-b39500a4f559",
                    title = "MTH1003 – Mathematical Modelling – Lecture 22",
                    date = "17/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=37e66e62-e890-4056-b2ef-b39500a4f559&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=37e66e62-e890-4056-b2ef-b39500a4f559&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1e625e83-d7e8-43c1-ad58-b39800ff6948",
                    title = "MTH1003 – Mathematical Modelling – Lecture 23",
                    date = "20/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1e625e83-d7e8-43c1-ad58-b39800ff6948&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1e625e83-d7e8-43c1-ad58-b39800ff6948&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3f1568ba-5177-48af-a8f0-b39900d6c31f",
                    title = "MTH1003 – Mathematical Modelling – Lecture 24",
                    date = "21/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3f1568ba-5177-48af-a8f0-b39900d6c31f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3f1568ba-5177-48af-a8f0-b39900d6c31f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "12acab75-fb9c-4a09-8a80-b39c00a309cd",
                    title = "MTH1003 – Mathematical Modelling – Lecture 25",
                    date = "24/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=12acab75-fb9c-4a09-8a80-b39c00a309cd&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=12acab75-fb9c-4a09-8a80-b39c00a309cd&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "2826cf36-be5c-4c5f-94b1-b39f00f66777",
                    title = "MTH1003 – Mathematical Modelling – Lecture 26",
                    date = "27/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2826cf36-be5c-4c5f-94b1-b39f00f66777&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2826cf36-be5c-4c5f-94b1-b39f00f66777&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "45083471-e1cf-4e80-854d-b3a000d52e21",
                    title = "MTH1003 – Mathematical Modelling – Lecture 27",
                    date = "28/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=45083471-e1cf-4e80-854d-b3a000d52e21&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=45083471-e1cf-4e80-854d-b3a000d52e21&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "feec6fe1-725c-469c-b5f5-b3a300a34ac6",
                    title = "MTH1003 – Mathematical Modelling – Lecture 28",
                    date = "01/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=feec6fe1-725c-469c-b5f5-b3a300a34ac6&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=feec6fe1-725c-469c-b5f5-b3a300a34ac6&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bd6005e2-e2cc-472a-9054-b3a600f66139",
                    title = "MTH1003 – Mathematical Modelling – Lecture 29",
                    date = "04/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bd6005e2-e2cc-472a-9054-b3a600f66139&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bd6005e2-e2cc-472a-9054-b3a600f66139&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "78ed9dd7-ce08-44bc-ab2a-b3a700d508d4",
                    title = "MTH1003 – Mathematical Modelling – Lecture 30",
                    date = "05/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=78ed9dd7-ce08-44bc-ab2a-b3a700d508d4&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=78ed9dd7-ce08-44bc-ab2a-b3a700d508d4&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "43dbb4c4-e4cd-41fc-b0d0-b3aa00a3d812",
                    title = "MTH1003 – Mathematical Modelling – Lecture 31",
                    date = "08/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=43dbb4c4-e4cd-41fc-b0d0-b3aa00a3d812&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=43dbb4c4-e4cd-41fc-b0d0-b3aa00a3d812&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "12fd503c-7791-491f-8eda-b3b0008fa1aa",
                    title = "MTH1003 – Mathematical Modelling – Lecture 32",
                    date = "11/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=12fd503c-7791-491f-8eda-b3b0008fa1aa&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=12fd503c-7791-491f-8eda-b3b0008fa1aa&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "21d7fbdc-e3d2-4c26-8dd5-b3b0008fa532",
                    title = "MTH1003 – Mathematical Modelling – Lecture 33",
                    date = "12/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=21d7fbdc-e3d2-4c26-8dd5-b3b0008fa532&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=21d7fbdc-e3d2-4c26-8dd5-b3b0008fa532&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3bf26eb4-f615-441b-89f9-b3cd0117d059",
                    title = "MTH1003 – Mathematical Modelling – Lecture 34",
                    date = "12/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3bf26eb4-f615-441b-89f9-b3cd0117d059&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3bf26eb4-f615-441b-89f9-b3cd0117d059&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a03a11d9-39e3-4d1f-9435-b3ce01279532",
                    title = "MTH1003 – Mathematical Modelling – Lecture 35",
                    date = "13/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a03a11d9-39e3-4d1f-9435-b3ce01279532&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a03a11d9-39e3-4d1f-9435-b3ce01279532&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "568d599f-ea44-4d41-85fd-b3d000f75dab",
                    title = "MTH1003 – Mathematical Modelling – Lecture 36",
                    date = "15/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=568d599f-ea44-4d41-85fd-b3d000f75dab&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=568d599f-ea44-4d41-85fd-b3d000f75dab&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0b674c30-66ce-4be8-8931-b3d401182b73",
                    title = "MTH1003 – Mathematical Modelling – Lecture 37",
                    date = "19/01/2026",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0b674c30-66ce-4be8-8931-b3d401182b73&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0b674c30-66ce-4be8-8931-b3d401182b73&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "899a245f-2c64-4724-9a5b-b3d50127c2b3",
                    title = "MTH1003 – Mathematical Modelling – Lecture 38",
                    date = "20/01/2026",
                    duration = "49 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=899a245f-2c64-4724-9a5b-b3d50127c2b3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=899a245f-2c64-4724-9a5b-b3d50127c2b3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a65a61de-3c33-4ac2-a181-b3d700f6f25a",
                    title = "MTH1003 – Mathematical Modelling – Lecture 39",
                    date = "22/01/2026",
                    duration = "49 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a65a61de-3c33-4ac2-a181-b3d700f6f25a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a65a61de-3c33-4ac2-a181-b3d700f6f25a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "33d9f99a-43aa-451b-ba20-b3de00f74fb4",
                    title = "MTH1003 – Mathematical Modelling – Lecture 40",
                    date = "29/01/2026",
                    duration = "37 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=33d9f99a-43aa-451b-ba20-b3de00f74fb4&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=33d9f99a-43aa-451b-ba20-b3de00f74fb4&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7457e8c4-094c-47f7-be3e-b3e2011817cc",
                    title = "MTH1003 – Mathematical Modelling – Lecture 41",
                    date = "02/02/2026",
                    duration = "2 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7457e8c4-094c-47f7-be3e-b3e2011817cc&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7457e8c4-094c-47f7-be3e-b3e2011817cc&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "5c0130b7-807f-4351-b841-b3e301283dc3",
                    title = "MTH1003 – Mathematical Modelling – Lecture 42",
                    date = "03/02/2026",
                    duration = "49 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5c0130b7-807f-4351-b841-b3e301283dc3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5c0130b7-807f-4351-b841-b3e301283dc3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "c60ef97a-3eb4-4585-b31e-b3e500ff644f",
                    title = "MTH1003 – Mathematical Modelling – Lecture 43",
                    date = "05/02/2026",
                    duration = "50 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=c60ef97a-3eb4-4585-b31e-b3e500ff644f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=c60ef97a-3eb4-4585-b31e-b3e500ff644f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "444c4c8e-791d-4baf-b5c4-b3e50120d2c3",
                    title = "MTH1003 – Mathematical Modelling – Lecture 44",
                    date = "05/02/2026",
                    duration = "51 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=444c4c8e-791d-4baf-b5c4-b3e50120d2c3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=444c4c8e-791d-4baf-b5c4-b3e50120d2c3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "eab2eb3e-68de-4506-b811-b3e6010f6df6",
                    title = "MTH1003 – Mathematical Modelling – Lecture 45",
                    date = "06/02/2026",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=eab2eb3e-68de-4506-b811-b3e6010f6df6&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=eab2eb3e-68de-4506-b811-b3e6010f6df6&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "dce8d5e5-3891-4d5d-abfb-b3e90117e802",
                    title = "MTH1003 – Mathematical Modelling – Lecture 46",
                    date = "09/02/2026",
                    duration = "53 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=dce8d5e5-3891-4d5d-abfb-b3e90117e802&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=dce8d5e5-3891-4d5d-abfb-b3e90117e802&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d0f17250-966c-4e09-ad09-b3ea01282374",
                    title = "MTH1003 – Mathematical Modelling – Lecture 47",
                    date = "10/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d0f17250-966c-4e09-ad09-b3ea01282374&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d0f17250-966c-4e09-ad09-b3ea01282374&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "41b3c02a-1823-455c-9ca7-b3ec00f71091",
                    title = "MTH1003 – Mathematical Modelling – Lecture 48",
                    date = "12/02/2026",
                    duration = "52 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=41b3c02a-1823-455c-9ca7-b3ec00f71091&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=41b3c02a-1823-455c-9ca7-b3ec00f71091&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9e8cd324-dcb1-47ea-9f2c-b3f0011793d5",
                    title = "MTH1003 – Mathematical Modelling – Lecture 49",
                    date = "16/02/2026",
                    duration = "1 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9e8cd324-dcb1-47ea-9f2c-b3f0011793d5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9e8cd324-dcb1-47ea-9f2c-b3f0011793d5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7c3bd128-e582-42fe-a597-b3f1012805e5",
                    title = "MTH1003 – Mathematical Modelling – Lecture 50",
                    date = "17/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7c3bd128-e582-42fe-a597-b3f1012805e5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7c3bd128-e582-42fe-a597-b3f1012805e5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "47bde2fa-117c-4f80-800a-b3f300f7c4ce",
                    title = "MTH1003 – Mathematical Modelling – Lecture 51",
                    date = "19/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=47bde2fa-117c-4f80-800a-b3f300f7c4ce&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=47bde2fa-117c-4f80-800a-b3f300f7c4ce&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b4c5d08c-ce4f-4ff9-a336-b3f70118e5cb",
                    title = "MTH1003 – Mathematical Modelling – Lecture 52",
                    date = "23/02/2026",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b4c5d08c-ce4f-4ff9-a336-b3f70118e5cb&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b4c5d08c-ce4f-4ff9-a336-b3f70118e5cb&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "be6cd78d-9495-430e-9fa0-b3f80129cb0d",
                    title = "MTH1003 – Mathematical Modelling – Lecture 53",
                    date = "24/02/2026",
                    duration = "57 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=be6cd78d-9495-430e-9fa0-b3f80129cb0d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=be6cd78d-9495-430e-9fa0-b3f80129cb0d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "5cbec9b2-a0cc-41de-b3d6-b3fa00f9216c",
                    title = "MTH1003 – Mathematical Modelling – Lecture 54",
                    date = "26/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=5cbec9b2-a0cc-41de-b3d6-b3fa00f9216c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=5cbec9b2-a0cc-41de-b3d6-b3fa00f9216c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f6d3f0f4-acf5-4648-b411-b3fe0119ae3a",
                    title = "MTH1003 – Mathematical Modelling – Lecture 55",
                    date = "02/03/2026",
                    duration = "1 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f6d3f0f4-acf5-4648-b411-b3fe0119ae3a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f6d3f0f4-acf5-4648-b411-b3fe0119ae3a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4bded649-5579-48e1-9353-b3ff0129811a",
                    title = "MTH1003 – Mathematical Modelling – Lecture 56",
                    date = "03/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4bded649-5579-48e1-9353-b3ff0129811a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4bded649-5579-48e1-9353-b3ff0129811a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "8dae5582-3b45-475f-bf8d-b40100f8357d",
                    title = "MTH1003 – Mathematical Modelling – Lecture 57",
                    date = "05/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=8dae5582-3b45-475f-bf8d-b40100f8357d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8dae5582-3b45-475f-bf8d-b40100f8357d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "43c2fe52-fd7d-4809-9bc4-b405011a1e1f",
                    title = "MTH1003 – Mathematical Modelling – Lecture 58",
                    date = "09/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=43c2fe52-fd7d-4809-9bc4-b405011a1e1f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=43c2fe52-fd7d-4809-9bc4-b405011a1e1f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a3520757-3fc5-4e06-9801-b40601296da0",
                    title = "MTH1003 – Mathematical Modelling – Lecture 59",
                    date = "10/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a3520757-3fc5-4e06-9801-b40601296da0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a3520757-3fc5-4e06-9801-b40601296da0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "850638f7-fbe4-4137-a78b-b40800f8aedb",
                    title = "MTH1003 – Mathematical Modelling – Lecture 60",
                    date = "12/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=850638f7-fbe4-4137-a78b-b40800f8aedb&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=850638f7-fbe4-4137-a78b-b40800f8aedb&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1c533f50-6402-48a0-8a2f-b40c011a07f1",
                    title = "MTH1003 – Mathematical Modelling – Lecture 61",
                    date = "16/03/2026",
                    duration = "1 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1c533f50-6402-48a0-8a2f-b40c011a07f1&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1c533f50-6402-48a0-8a2f-b40c011a07f1&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bbef8cb1-8dc8-461d-a1f0-b40d0129e9a5",
                    title = "MTH1003 – Mathematical Modelling – Lecture 62",
                    date = "17/03/2026",
                    duration = "44 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bbef8cb1-8dc8-461d-a1f0-b40d0129e9a5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bbef8cb1-8dc8-461d-a1f0-b40d0129e9a5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ddc0abc5-0c63-40cc-ba94-b40f0100de32",
                    title = "MTH1003 – Mathematical Modelling – Lecture 63",
                    date = "19/03/2026",
                    duration = "46 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ddc0abc5-0c63-40cc-ba94-b40f0100de32&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ddc0abc5-0c63-40cc-ba94-b40f0100de32&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "77131d4e-6dfb-4d0e-b33e-b4130123030c",
                    title = "MTH1003 – Mathematical Modelling – Lecture 64",
                    date = "23/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=77131d4e-6dfb-4d0e-b33e-b4130123030c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=77131d4e-6dfb-4d0e-b33e-b4130123030c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "11ec52d0-24a0-46cf-9487-b414012a7dd7",
                    title = "MTH1003 – Mathematical Modelling – Lecture 65",
                    date = "24/03/2026",
                    duration = "47 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=11ec52d0-24a0-46cf-9487-b414012a7dd7&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=11ec52d0-24a0-46cf-9487-b414012a7dd7&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                )
            )
        ),
        Course(
            id = "mth1004",
            code = "MTH1004",
            title = "Probability, Statistics and Data",
            stage = 1,
            credits = 30,
            term = "Autumn & Spring Term",
            academicYear = "2025/26",
            convenor = Convenor(
                name = "Dr. Chaitra Nagaraja",
                email = "C.Nagaraja@exeter.ac.uk",
                officeHours = null
            ),
            recordings = listOf(
                Recording(
                    id = "cdcee728-f8db-47c6-a44e-b35d00ee0633",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 01",
                    date = "22/09/2025",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=cdcee728-f8db-47c6-a44e-b35d00ee0633&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=cdcee728-f8db-47c6-a44e-b35d00ee0633&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ae2aea34-a8be-4a35-9d6e-b35e00e5ce8e",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 02",
                    date = "23/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ae2aea34-a8be-4a35-9d6e-b35e00e5ce8e&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ae2aea34-a8be-4a35-9d6e-b35e00e5ce8e&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "6c52551a-3b39-4bb4-a26d-b36100b521d2",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 03",
                    date = "26/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6c52551a-3b39-4bb4-a26d-b36100b521d2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=6c52551a-3b39-4bb4-a26d-b36100b521d2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "30ca82fc-4b60-4a73-a500-b36400e5f635",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 04",
                    date = "29/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=30ca82fc-4b60-4a73-a500-b36400e5f635&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=30ca82fc-4b60-4a73-a500-b36400e5f635&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1b10463d-b30a-4480-928f-b36500b42b5a",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 05",
                    date = "30/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1b10463d-b30a-4480-928f-b36500b42b5a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1b10463d-b30a-4480-928f-b36500b42b5a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ebc8b970-aa45-4301-89bb-b36500e54cd7",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 06",
                    date = "30/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ebc8b970-aa45-4301-89bb-b36500e54cd7&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ebc8b970-aa45-4301-89bb-b36500e54cd7&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "01cabf03-47a0-4b6f-bbbb-b36800f5d573",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 07",
                    date = "03/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=01cabf03-47a0-4b6f-bbbb-b36800f5d573&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=01cabf03-47a0-4b6f-bbbb-b36800f5d573&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b2e335f0-5e0a-4726-965c-b36b00e61542",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 08",
                    date = "06/10/2025",
                    duration = "45 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b2e335f0-5e0a-4726-965c-b36b00e61542&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b2e335f0-5e0a-4726-965c-b36b00e61542&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d279b51f-e9b8-4691-bb1e-b36c00e555e1",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 09",
                    date = "07/10/2025",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d279b51f-e9b8-4691-bb1e-b36c00e555e1&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d279b51f-e9b8-4691-bb1e-b36c00e555e1&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a47a36e7-e67f-48b8-aaab-b36f00b42ddd",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 10",
                    date = "10/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a47a36e7-e67f-48b8-aaab-b36f00b42ddd&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a47a36e7-e67f-48b8-aaab-b36f00b42ddd&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "edcf3955-9a4a-4491-8bcf-b37200e5d480",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 11",
                    date = "13/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=edcf3955-9a4a-4491-8bcf-b37200e5d480&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=edcf3955-9a4a-4491-8bcf-b37200e5d480&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d81a2c00-6b1d-47cd-aa64-b37300e59ed1",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 12",
                    date = "14/10/2025",
                    duration = "53 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d81a2c00-6b1d-47cd-aa64-b37300e59ed1&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d81a2c00-6b1d-47cd-aa64-b37300e59ed1&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "3470907f-e3da-4edf-9bb1-b37600bc6a78",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 13",
                    date = "17/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=3470907f-e3da-4edf-9bb1-b37600bc6a78&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=3470907f-e3da-4edf-9bb1-b37600bc6a78&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7b9cf7c5-349c-4e43-8f05-b37900e6f695",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 14",
                    date = "20/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7b9cf7c5-349c-4e43-8f05-b37900e6f695&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7b9cf7c5-349c-4e43-8f05-b37900e6f695&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7f9a6b55-d296-49cb-a73e-b37a00e5a61d",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 15",
                    date = "21/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7f9a6b55-d296-49cb-a73e-b37a00e5a61d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7f9a6b55-d296-49cb-a73e-b37a00e5a61d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "acbc4c22-e214-4683-bb0f-b37d00b53c5a",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 16",
                    date = "24/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=acbc4c22-e214-4683-bb0f-b37d00b53c5a&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=acbc4c22-e214-4683-bb0f-b37d00b53c5a&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a1359b86-c4fc-443a-990f-b38700f65671",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 17",
                    date = "03/11/2025",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a1359b86-c4fc-443a-990f-b38700f65671&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a1359b86-c4fc-443a-990f-b38700f65671&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4553ab16-8978-4a2b-9cf6-b38800f5e49d",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 18",
                    date = "04/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4553ab16-8978-4a2b-9cf6-b38800f5e49d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4553ab16-8978-4a2b-9cf6-b38800f5e49d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "2ffdc563-bda1-4c23-bf18-b38b00c70ed0",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 19",
                    date = "07/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2ffdc563-bda1-4c23-bf18-b38b00c70ed0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2ffdc563-bda1-4c23-bf18-b38b00c70ed0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "eb10febe-95dd-46d9-b4b3-b38f00f60d81",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 20",
                    date = "11/11/2025",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=eb10febe-95dd-46d9-b4b3-b38f00f60d81&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=eb10febe-95dd-46d9-b4b3-b38f00f60d81&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e21b2fa2-9be2-4821-ab97-b39200c692f2",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 21",
                    date = "14/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e21b2fa2-9be2-4821-ab97-b39200c692f2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e21b2fa2-9be2-4821-ab97-b39200c692f2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "8741fa57-4c8c-465e-af23-b39500f6e0bf",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 22",
                    date = "17/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=8741fa57-4c8c-465e-af23-b39500f6e0bf&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8741fa57-4c8c-465e-af23-b39500f6e0bf&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "eb9533b1-c222-4d07-803c-b39600f5ec48",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 23",
                    date = "18/11/2025",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=eb9533b1-c222-4d07-803c-b39600f5ec48&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=eb9533b1-c222-4d07-803c-b39600f5ec48&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "908456e7-04d0-468e-81dc-b39900c5b287",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 24",
                    date = "21/11/2025",
                    duration = "52 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=908456e7-04d0-468e-81dc-b39900c5b287&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=908456e7-04d0-468e-81dc-b39900c5b287&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bfd306a1-fc16-4126-b463-b39c00f588f8",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 25",
                    date = "24/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bfd306a1-fc16-4126-b463-b39c00f588f8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bfd306a1-fc16-4126-b463-b39c00f588f8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4504a0b2-b868-478e-92a7-b39d00f53b9c",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 26",
                    date = "25/11/2025",
                    duration = "52 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4504a0b2-b868-478e-92a7-b39d00f53b9c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4504a0b2-b868-478e-92a7-b39d00f53b9c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "6a159268-c14a-4606-9d53-b3a000c4c72c",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 27",
                    date = "28/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6a159268-c14a-4606-9d53-b3a000c4c72c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=6a159268-c14a-4606-9d53-b3a000c4c72c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f3e020a5-57cb-44c8-9812-b3a300f543df",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 28",
                    date = "01/12/2025",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f3e020a5-57cb-44c8-9812-b3a300f543df&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f3e020a5-57cb-44c8-9812-b3a300f543df&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bc801be0-c42d-404f-9108-b3a400f551af",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 29",
                    date = "02/12/2025",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bc801be0-c42d-404f-9108-b3a400f551af&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bc801be0-c42d-404f-9108-b3a400f551af&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4de3013f-5e92-4abe-b40c-b3a700c4474d",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 30",
                    date = "05/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4de3013f-5e92-4abe-b40c-b3a700c4474d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4de3013f-5e92-4abe-b40c-b3a700c4474d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e7138184-6c9e-4a78-ae70-b3aa00f5eef2",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 31",
                    date = "08/12/2025",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e7138184-6c9e-4a78-ae70-b3aa00f5eef2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e7138184-6c9e-4a78-ae70-b3aa00f5eef2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "29051d28-57c4-4da0-9b3a-b3ab00f68977",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 32",
                    date = "09/12/2025",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=29051d28-57c4-4da0-9b3a-b3ab00f68977&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=29051d28-57c4-4da0-9b3a-b3ab00f68977&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4119f1cb-b8f0-4c3e-a547-b3b0008fa8c7",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 33",
                    date = "12/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4119f1cb-b8f0-4c3e-a547-b3b0008fa8c7&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4119f1cb-b8f0-4c3e-a547-b3b0008fa8c7&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "acc42e3b-479d-409d-aedf-b3ce01179f18",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 34",
                    date = "13/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=acc42e3b-479d-409d-aedf-b3ce01179f18&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=acc42e3b-479d-409d-aedf-b3ce01179f18&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9bd5c658-6729-4ed3-a9aa-b3d00094d2eb",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 35",
                    date = "15/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9bd5c658-6729-4ed3-a9aa-b3d00094d2eb&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9bd5c658-6729-4ed3-a9aa-b3d00094d2eb&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "72b7a0e2-5bd0-4f6c-80d8-b3d10117e045",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 36",
                    date = "16/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=72b7a0e2-5bd0-4f6c-80d8-b3d10117e045&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=72b7a0e2-5bd0-4f6c-80d8-b3d10117e045&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b94efbc8-805a-4f9e-aec2-b3d50116f5bc",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 37",
                    date = "20/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b94efbc8-805a-4f9e-aec2-b3d50116f5bc&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b94efbc8-805a-4f9e-aec2-b3d50116f5bc&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a55526a0-0662-467f-862d-b3d70093eaad",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 38",
                    date = "22/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a55526a0-0662-467f-862d-b3d70093eaad&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a55526a0-0662-467f-862d-b3d70093eaad&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7c4bcc58-c61f-4f5f-815d-b3d80117818e",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 39",
                    date = "23/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7c4bcc58-c61f-4f5f-815d-b3d80117818e&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7c4bcc58-c61f-4f5f-815d-b3d80117818e&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4261a930-d5dc-43af-8729-b3dc0117295c",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 40",
                    date = "27/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4261a930-d5dc-43af-8729-b3dc0117295c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4261a930-d5dc-43af-8729-b3dc0117295c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "28762956-5672-4931-9eaf-b3de00966e1b",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 41",
                    date = "29/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=28762956-5672-4931-9eaf-b3de00966e1b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=28762956-5672-4931-9eaf-b3de00966e1b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "051a7f54-82b5-4889-808e-b3df01172c47",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 42",
                    date = "30/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=051a7f54-82b5-4889-808e-b3df01172c47&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=051a7f54-82b5-4889-808e-b3df01172c47&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "820c7761-e51f-4811-8d5c-b3e301179486",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 43",
                    date = "03/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=820c7761-e51f-4811-8d5c-b3e301179486&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=820c7761-e51f-4811-8d5c-b3e301179486&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "64e60530-3857-4d57-8da8-b3e500944784",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 44",
                    date = "05/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=64e60530-3857-4d57-8da8-b3e500944784&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=64e60530-3857-4d57-8da8-b3e500944784&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b28e5d8a-af8f-46d8-bc27-b3e601212f9c",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 45",
                    date = "06/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b28e5d8a-af8f-46d8-bc27-b3e601212f9c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b28e5d8a-af8f-46d8-bc27-b3e601212f9c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a1372872-298f-43c5-9adc-b3ea0116d88d",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 46",
                    date = "10/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a1372872-298f-43c5-9adc-b3ea0116d88d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a1372872-298f-43c5-9adc-b3ea0116d88d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f59bb854-017a-4494-98c2-b3ec00941f6e",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 47",
                    date = "12/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f59bb854-017a-4494-98c2-b3ec00941f6e&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f59bb854-017a-4494-98c2-b3ec00941f6e&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b930e333-95b9-4b0e-a39f-b3ed01179475",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 48",
                    date = "13/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b930e333-95b9-4b0e-a39f-b3ed01179475&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b930e333-95b9-4b0e-a39f-b3ed01179475&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "facdae31-499b-4434-a5b6-b3f101176090",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 49",
                    date = "17/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=facdae31-499b-4434-a5b6-b3f101176090&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=facdae31-499b-4434-a5b6-b3f101176090&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "77b3ee67-3748-4e03-bf54-b3f30094851f",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 50",
                    date = "19/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=77b3ee67-3748-4e03-bf54-b3f30094851f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=77b3ee67-3748-4e03-bf54-b3f30094851f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e1f2f935-ddcf-4407-bc67-b3f40163c694",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 51",
                    date = "20/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e1f2f935-ddcf-4407-bc67-b3f40163c694&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e1f2f935-ddcf-4407-bc67-b3f40163c694&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a330d5a4-c009-4f52-813c-b3f801183ccc",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 52",
                    date = "24/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a330d5a4-c009-4f52-813c-b3f801183ccc&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a330d5a4-c009-4f52-813c-b3f801183ccc&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "c3c4626b-c929-4e5d-810a-b3fa00966dc8",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 53",
                    date = "26/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=c3c4626b-c929-4e5d-810a-b3fa00966dc8&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=c3c4626b-c929-4e5d-810a-b3fa00966dc8&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a33f12c3-7d22-48f5-9f6d-b3fb01199642",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 54",
                    date = "27/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a33f12c3-7d22-48f5-9f6d-b3fb01199642&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a33f12c3-7d22-48f5-9f6d-b3fb01199642&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "15577bd1-afe6-4339-aa80-b3ff0118e7a5",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 55",
                    date = "03/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=15577bd1-afe6-4339-aa80-b3ff0118e7a5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=15577bd1-afe6-4339-aa80-b3ff0118e7a5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "6caa0c41-801b-44d7-a775-b40100963531",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 56",
                    date = "05/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6caa0c41-801b-44d7-a775-b40100963531&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=6caa0c41-801b-44d7-a775-b40100963531&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0d171405-2121-49b1-877c-b40201188c34",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 57",
                    date = "06/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0d171405-2121-49b1-877c-b40201188c34&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0d171405-2121-49b1-877c-b40201188c34&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7626b57f-9847-470f-a521-b40601188ab3",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 58",
                    date = "10/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7626b57f-9847-470f-a521-b40601188ab3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7626b57f-9847-470f-a521-b40601188ab3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7a6f6ec8-73e2-424a-82fb-b408009660d3",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 59",
                    date = "12/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7a6f6ec8-73e2-424a-82fb-b408009660d3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7a6f6ec8-73e2-424a-82fb-b408009660d3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a55a32c2-d3cd-4d1a-822e-b4090119ecc5",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 60",
                    date = "13/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a55a32c2-d3cd-4d1a-822e-b4090119ecc5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a55a32c2-d3cd-4d1a-822e-b4090119ecc5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "eb52e6f6-af09-4466-8668-b40d011a2093",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 61",
                    date = "17/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=eb52e6f6-af09-4466-8668-b40d011a2093&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=eb52e6f6-af09-4466-8668-b40d011a2093&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "a9fba60a-e410-42ec-a013-b40f0097f3f3",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 62",
                    date = "19/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=a9fba60a-e410-42ec-a013-b40f0097f3f3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a9fba60a-e410-42ec-a013-b40f0097f3f3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ca903158-b553-46be-91e7-b4100119811c",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 63",
                    date = "20/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ca903158-b553-46be-91e7-b4100119811c&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ca903158-b553-46be-91e7-b4100119811c&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "08de7020-94a4-4aa0-8026-b41401197dc4",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 64",
                    date = "24/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=08de7020-94a4-4aa0-8026-b41401197dc4&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=08de7020-94a4-4aa0-8026-b41401197dc4&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "03ce4620-a328-475a-915b-b4160097bea3",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 65",
                    date = "26/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=03ce4620-a328-475a-915b-b4160097bea3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=03ce4620-a328-475a-915b-b4160097bea3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1f061b79-ab2d-4292-8f39-b4170122fa58",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 66",
                    date = "27/03/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1f061b79-ab2d-4292-8f39-b4170122fa58&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1f061b79-ab2d-4292-8f39-b4170122fa58&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "9884e4f0-eda0-40c7-a591-b43600ac8330",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 67",
                    date = "27/04/2026",
                    duration = "52 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=9884e4f0-eda0-40c7-a591-b43600ac8330&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=9884e4f0-eda0-40c7-a591-b43600ac8330&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "85e2c8b8-8ec3-46b7-a1d8-b43700e46385",
                    title = "MTH1004 – Probability, Statistics and Data – Lecture 68",
                    date = "28/04/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=85e2c8b8-8ec3-46b7-a1d8-b43700e46385&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=85e2c8b8-8ec3-46b7-a1d8-b43700e46385&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                )
            )
        ),
        Course(
            id = "mth1000",
            code = "MTH1000",
            title = "Foundations",
            stage = 1,
            credits = 15,
            term = "Autumn Term",
            academicYear = "2025/26",
            convenor = Convenor(
                name = "Mathematics Faculty",
                email = "maths-office@exeter.ac.uk",
                officeHours = null
            ),
            recordings = listOf(
                Recording(
                    id = "f975c05e-ae69-4966-8f0c-b35d008c9857",
                    title = "MTH1000 – Foundations – Lecture 01",
                    date = "22/09/2025",
                    duration = "51 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f975c05e-ae69-4966-8f0c-b35d008c9857&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f975c05e-ae69-4966-8f0c-b35d008c9857&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "329ac828-9cdd-4dca-9dea-b35e00839142",
                    title = "MTH1000 – Foundations – Lecture 02",
                    date = "23/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=329ac828-9cdd-4dca-9dea-b35e00839142&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=329ac828-9cdd-4dca-9dea-b35e00839142&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "dcff12e6-5073-4cd0-88ad-b35e00c4f43f",
                    title = "MTH1000 – Foundations – Lecture 03",
                    date = "23/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=dcff12e6-5073-4cd0-88ad-b35e00c4f43f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=dcff12e6-5073-4cd0-88ad-b35e00c4f43f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "00442646-5e2f-4fb2-9b67-b36500831649",
                    title = "MTH1000 – Foundations – Lecture 04",
                    date = "30/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=00442646-5e2f-4fb2-9b67-b36500831649&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=00442646-5e2f-4fb2-9b67-b36500831649&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "66f83ca2-7263-4fdc-84a7-b36500c46b37",
                    title = "MTH1000 – Foundations – Lecture 05",
                    date = "30/09/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=66f83ca2-7263-4fdc-84a7-b36500c46b37&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=66f83ca2-7263-4fdc-84a7-b36500c46b37&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1cf8c563-18ab-4099-b828-b36b00830a3f",
                    title = "MTH1000 – Foundations – Lecture 06",
                    date = "06/10/2025",
                    duration = "2 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1cf8c563-18ab-4099-b828-b36b00830a3f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1cf8c563-18ab-4099-b828-b36b00830a3f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "74441b7a-5287-4986-bb13-b36c00c4bd22",
                    title = "MTH1000 – Foundations – Lecture 07",
                    date = "07/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=74441b7a-5287-4986-bb13-b36c00c4bd22&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=74441b7a-5287-4986-bb13-b36c00c4bd22&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "2f3d79df-bc8b-4919-a23c-b36f00f634fa",
                    title = "MTH1000 – Foundations – Lecture 08",
                    date = "10/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2f3d79df-bc8b-4919-a23c-b36f00f634fa&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2f3d79df-bc8b-4919-a23c-b36f00f634fa&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1cde48cb-b957-46f6-bde6-b372008339d7",
                    title = "MTH1000 – Foundations – Lecture 09",
                    date = "13/10/2025",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1cde48cb-b957-46f6-bde6-b372008339d7&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1cde48cb-b957-46f6-bde6-b372008339d7&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4c4c6b85-a050-47a7-a0df-b37300c4f3cf",
                    title = "MTH1000 – Foundations – Lecture 10",
                    date = "14/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4c4c6b85-a050-47a7-a0df-b37300c4f3cf&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4c4c6b85-a050-47a7-a0df-b37300c4f3cf&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "c01b3f14-9b05-40e6-95a1-b37600fe0874",
                    title = "MTH1000 – Foundations – Lecture 11",
                    date = "17/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=c01b3f14-9b05-40e6-95a1-b37600fe0874&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=c01b3f14-9b05-40e6-95a1-b37600fe0874&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "da8f17a0-e20f-4348-b884-b379008461b1",
                    title = "MTH1000 – Foundations – Lecture 12",
                    date = "20/10/2025",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=da8f17a0-e20f-4348-b884-b379008461b1&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=da8f17a0-e20f-4348-b884-b379008461b1&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "6e4ba4f8-9d16-47d3-8745-b37a00c698db",
                    title = "MTH1000 – Foundations – Lecture 13",
                    date = "21/10/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6e4ba4f8-9d16-47d3-8745-b37a00c698db&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=6e4ba4f8-9d16-47d3-8745-b37a00c698db&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4b3863e4-1354-4148-9c82-b37c00957492",
                    title = "MTH1000 – Foundations – Lecture 14",
                    date = "23/10/2025",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4b3863e4-1354-4148-9c82-b37c00957492&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4b3863e4-1354-4148-9c82-b37c00957492&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d13fa4cf-758b-49f8-a89d-b38800d55d89",
                    title = "MTH1000 – Foundations – Lecture 15",
                    date = "04/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d13fa4cf-758b-49f8-a89d-b38800d55d89&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d13fa4cf-758b-49f8-a89d-b38800d55d89&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "b330148f-f646-4e21-9705-b38e00941a9f",
                    title = "MTH1000 – Foundations – Lecture 16",
                    date = "10/11/2025",
                    duration = "1 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=b330148f-f646-4e21-9705-b38e00941a9f&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b330148f-f646-4e21-9705-b38e00941a9f&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d2c3cf0b-cc4f-4a15-8b95-b38f00945fbc",
                    title = "MTH1000 – Foundations – Lecture 17",
                    date = "11/11/2025",
                    duration = "10 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d2c3cf0b-cc4f-4a15-8b95-b38f00945fbc&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d2c3cf0b-cc4f-4a15-8b95-b38f00945fbc&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "6ad5595e-101e-46bf-a41f-b38f00d5d339",
                    title = "MTH1000 – Foundations – Lecture 18",
                    date = "11/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6ad5595e-101e-46bf-a41f-b38f00d5d339&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=6ad5595e-101e-46bf-a41f-b38f00d5d339&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "7e16c159-f6f5-4569-977d-b395009513f2",
                    title = "MTH1000 – Foundations – Lecture 19",
                    date = "17/11/2025",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=7e16c159-f6f5-4569-977d-b395009513f2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=7e16c159-f6f5-4569-977d-b395009513f2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "59c938cf-e354-48a7-90a6-b39600937a00",
                    title = "MTH1000 – Foundations – Lecture 20",
                    date = "18/11/2025",
                    duration = "31 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=59c938cf-e354-48a7-90a6-b39600937a00&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=59c938cf-e354-48a7-90a6-b39600937a00&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "bc5b07bd-a759-427c-9748-b39600d59db0",
                    title = "MTH1000 – Foundations – Lecture 21",
                    date = "18/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=bc5b07bd-a759-427c-9748-b39600d59db0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=bc5b07bd-a759-427c-9748-b39600d59db0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "66177560-d631-4063-84e2-b39c00932959",
                    title = "MTH1000 – Foundations – Lecture 22",
                    date = "24/11/2025",
                    duration = "56 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=66177560-d631-4063-84e2-b39c00932959&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=66177560-d631-4063-84e2-b39c00932959&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "155319b5-e288-4eb7-ada2-b39d0092e193",
                    title = "MTH1000 – Foundations – Lecture 23",
                    date = "25/11/2025",
                    duration = "6 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=155319b5-e288-4eb7-ada2-b39d0092e193&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=155319b5-e288-4eb7-ada2-b39d0092e193&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "0ac9b722-ef24-479a-9c0f-b39d00d48bb3",
                    title = "MTH1000 – Foundations – Lecture 24",
                    date = "25/11/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=0ac9b722-ef24-479a-9c0f-b39d00d48bb3&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=0ac9b722-ef24-479a-9c0f-b39d00d48bb3&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f44c47f0-7b4b-405a-828a-b3a300933e5b",
                    title = "MTH1000 – Foundations – Lecture 25",
                    date = "01/12/2025",
                    duration = "55 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f44c47f0-7b4b-405a-828a-b3a300933e5b&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f44c47f0-7b4b-405a-828a-b3a300933e5b&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "26d0f727-91c3-4d58-8190-b3a400939ef0",
                    title = "MTH1000 – Foundations – Lecture 26",
                    date = "02/12/2025",
                    duration = "7 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=26d0f727-91c3-4d58-8190-b3a400939ef0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=26d0f727-91c3-4d58-8190-b3a400939ef0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "50210d2f-c7a3-42d3-92a2-b3a400d44fa5",
                    title = "MTH1000 – Foundations – Lecture 27",
                    date = "02/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=50210d2f-c7a3-42d3-92a2-b3a400d44fa5&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=50210d2f-c7a3-42d3-92a2-b3a400d44fa5&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "75a8bf76-b320-427c-a65e-b3aa009462e4",
                    title = "MTH1000 – Foundations – Lecture 28",
                    date = "08/12/2025",
                    duration = "54 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=75a8bf76-b320-427c-a65e-b3aa009462e4&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=75a8bf76-b320-427c-a65e-b3aa009462e4&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "190eecfd-a396-4175-9635-b3ab00934323",
                    title = "MTH1000 – Foundations – Lecture 29",
                    date = "09/12/2025",
                    duration = "7 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=190eecfd-a396-4175-9635-b3ab00934323&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=190eecfd-a396-4175-9635-b3ab00934323&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "783eb9b2-dd89-4cd3-acad-b3ab00d4ffb1",
                    title = "MTH1000 – Foundations – Lecture 30",
                    date = "09/12/2025",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=783eb9b2-dd89-4cd3-acad-b3ab00d4ffb1&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=783eb9b2-dd89-4cd3-acad-b3ab00d4ffb1&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "4452b86b-9623-4403-97cf-b3cd0094218d",
                    title = "MTH1000 – Foundations – Lecture 31",
                    date = "12/01/2026",
                    duration = "7 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=4452b86b-9623-4403-97cf-b3cd0094218d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=4452b86b-9623-4403-97cf-b3cd0094218d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "ce32d588-3314-415b-8ab1-b3db0106cbae",
                    title = "MTH1000 – Foundations – Lecture 32",
                    date = "26/01/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=ce32d588-3314-415b-8ab1-b3db0106cbae&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=ce32d588-3314-415b-8ab1-b3db0106cbae&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "88b70e4f-531c-4257-ad05-b3db0106c904",
                    title = "MTH1000 – Foundations – Lecture 33",
                    date = "26/01/2026",
                    duration = "2 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=88b70e4f-531c-4257-ad05-b3db0106c904&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=88b70e4f-531c-4257-ad05-b3db0106c904&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "37d9efee-00f5-45ef-87f0-b3e2010716c2",
                    title = "MTH1000 – Foundations – Lecture 34",
                    date = "02/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=37d9efee-00f5-45ef-87f0-b3e2010716c2&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=37d9efee-00f5-45ef-87f0-b3e2010716c2&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "53faf3cd-7261-4795-8796-b3e2010713c0",
                    title = "MTH1000 – Foundations – Lecture 35",
                    date = "02/02/2026",
                    duration = "4 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=53faf3cd-7261-4795-8796-b3e2010713c0&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=53faf3cd-7261-4795-8796-b3e2010713c0&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "e0ebcbd8-6bce-4b03-9cee-b3e901070a9d",
                    title = "MTH1000 – Foundations – Lecture 36",
                    date = "09/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e0ebcbd8-6bce-4b03-9cee-b3e901070a9d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e0ebcbd8-6bce-4b03-9cee-b3e901070a9d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "f5e1ef48-8ed9-4f78-af47-b3e9010707ce",
                    title = "MTH1000 – Foundations – Lecture 37",
                    date = "09/02/2026",
                    duration = "30 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=f5e1ef48-8ed9-4f78-af47-b3e9010707ce&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=f5e1ef48-8ed9-4f78-af47-b3e9010707ce&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "6c83292b-f2e1-40e0-acd0-b3f300d6266d",
                    title = "MTH1000 – Foundations – Lecture 38",
                    date = "16/02/2026",
                    duration = "1 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6c83292b-f2e1-40e0-acd0-b3f300d6266d&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=6c83292b-f2e1-40e0-acd0-b3f300d6266d&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1a1e2f80-8bdb-448e-a9ed-b3f001069bf9",
                    title = "MTH1000 – Foundations – Lecture 39",
                    date = "16/02/2026",
                    duration = "58 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1a1e2f80-8bdb-448e-a9ed-b3f001069bf9&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1a1e2f80-8bdb-448e-a9ed-b3f001069bf9&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "577d02e6-8254-4771-9a78-b3f701088c44",
                    title = "MTH1000 – Foundations – Lecture 40",
                    date = "23/02/2026",
                    duration = "1 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=577d02e6-8254-4771-9a78-b3f701088c44&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=577d02e6-8254-4771-9a78-b3f701088c44&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "fee16d9a-6c73-4ca4-9fc5-b3fe010885ec",
                    title = "MTH1000 – Foundations – Lecture 41",
                    date = "02/03/2026",
                    duration = "1 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=fee16d9a-6c73-4ca4-9fc5-b3fe010885ec&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=fee16d9a-6c73-4ca4-9fc5-b3fe010885ec&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "2ef8c268-aa7e-47ad-9771-b40501081692",
                    title = "MTH1000 – Foundations – Lecture 42",
                    date = "09/03/2026",
                    duration = "6 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2ef8c268-aa7e-47ad-9771-b40501081692&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2ef8c268-aa7e-47ad-9771-b40501081692&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "1543da11-6ece-43ea-bddc-b40d00c7458e",
                    title = "MTH1000 – Foundations – Lecture 43",
                    date = "17/03/2026",
                    duration = "3 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=1543da11-6ece-43ea-bddc-b40d00c7458e&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1543da11-6ece-43ea-bddc-b40d00c7458e&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                ),
                Recording(
                    id = "d6ddad65-4ac5-43a4-a01e-b41400c8d220",
                    title = "MTH1000 – Foundations – Lecture 44",
                    date = "24/03/2026",
                    duration = "10 mins",
                    panoptoUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=d6ddad65-4ac5-43a4-a01e-b41400c8d220&instance=MoodleELE2",
                    embedUrl = "https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=d6ddad65-4ac5-43a4-a01e-b41400c8d220&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                )
            )
        ),
    )
}
