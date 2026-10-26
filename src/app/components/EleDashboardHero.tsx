import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Clock,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Calendar as CalendarIcon,
  HelpCircle,
  Accessibility,
  ArrowRight,
  ExternalLink,
  Filter,
  RotateCcw,
  FileText,
  MapPin,
  BookOpen,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import PROGRAMMES from "../../data/programmes.json";
import { EleGeometricPattern } from "./EleGeometricPattern";
import { TimetableEvent, getEventTheme } from "../../api/timetable";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { MOCK_COURSES } from "../../data/mockCourses";
import { Course } from "../../types";

interface EleDashboardHeroProps {
  onSelectProgramme: (code: string) => void;
  onSelectCourse?: (course: Course) => void;
  recentProgrammes?: string[];
  timetableEvents?: TimetableEvent[];
  onOpenCalendarModal?: (initialTab?: "calendar" | "manage" | "export") => void;
  onOpenAccessibility?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenCookies?: () => void;
}

const DISCIPLINES = [
  { label: "All Programmes", query: "" },
  { label: "Mathematics & Stats", query: "Math" },
  { label: "Computer Science", query: "Computer" },
  { label: "Engineering", query: "Engineering" },
  { label: "Business & Management", query: "Business" },
  { label: "Law", query: "Law" },
  { label: "Physics & Astronomy", query: "Physics" },
  { label: "Psychology & Health", query: "Psychology" },
  { label: "Economics & Finance", query: "Economics" },
  { label: "Geography & Environment", query: "Geography" },
  { label: "Biosciences & Medicine", query: "Bio" },
];

const AWARDS = [
  { label: "All Awards", value: "" },
  { label: "BSc (Hons)", value: "BSc" },
  { label: "BA (Hons)", value: "BA" },
  { label: "BEng / MEng (Engineering)", value: "Eng" },
  { label: "LLB (Law)", value: "LLB" },
  { label: "Integrated Masters (MMath/MSci/etc)", value: "Masters" },
  { label: "Medical / Health", value: "Medical" },
];

const PATHWAYS = [
  { label: "All Pathways", value: "" },
  { label: "Standard Full-Time", value: "standard" },
  { label: "With Study Abroad", value: "abroad" },
  { label: "With Placement / Industry", value: "placement" },
];

const DURATIONS = [
  { label: "All Durations", value: "" },
  { label: "3-Year Programmes", value: "3" },
  { label: "4-Year Programmes", value: "4" },
];

const DESKTOP_PAGE_SIZE = 12;
const MOBILE_PAGE_SIZE = 6;

export const EleDashboardHero: React.FC<EleDashboardHeroProps> = ({
  onSelectProgramme,
  onSelectCourse,
  recentProgrammes = [],
  timetableEvents = [],
  onOpenCalendarModal,
  onOpenAccessibility,
  onOpenPrivacy,
  onOpenTerms,
  onOpenCookies,
}) => {
  const isDesktop = useIsDesktop();
  const pageSize = isDesktop ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE;

  const [catalogMode, setCatalogMode] = useState<"myCourses" | "programmes">("myCourses");
  const [search, setSearch] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedAward, setSelectedAward] = useState("");
  const [selectedPathway, setSelectedPathway] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterView, setFilterView] = useState<"All" | "In progress" | "Future">("All");
  const [cardLayout, setCardLayout] = useState<"Card" | "List">("Card");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filtered enrolled modules (for myCourses view)
  const filteredCourses = useMemo(() => {
    const q = (search || sidebarSearch).trim().toLowerCase();
    let list = MOCK_COURSES;
    if (filterView === "In progress") {
      list = list.filter(c => c.progressPercentage > 0 && c.progressPercentage < 100);
    } else if (filterView === "Future") {
      list = list.filter(c => c.progressPercentage === 0);
    }
    if (q) {
      list = list.filter(c =>
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.convenor.name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, sidebarSearch, filterView]);

  // Interactive calendar month state (starts September 2026 where academic semester begins)
  const [calendarDate, setCalendarDate] = useState<Date>(() => new Date(2026, 8, 1));
  const [hoveredDayEvents, setHoveredDayEvents] = useState<{
    date: Date;
    events: TimetableEvent[];
  } | null>(null);

  const prevMonth = () => {
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setHoveredDayEvents(null);
  };

  const nextMonth = () => {
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setHoveredDayEvents(null);
  };

  const currentMonthName = calendarDate.toLocaleDateString("en-GB", { month: "long" });
  const currentYear = calendarDate.getFullYear();

  // Reset to page 1 whenever any filter criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sidebarSearch, selectedDiscipline, selectedAward, selectedPathway, selectedDuration, sortOrder]);

  const hasActiveFilters = Boolean(
    search || sidebarSearch || selectedDiscipline || selectedAward || selectedPathway || selectedDuration
  );

  const resetAllFilters = () => {
    setSearch("");
    setSidebarSearch("");
    setSelectedDiscipline("");
    setSelectedAward("");
    setSelectedPathway("");
    setSelectedDuration("");
    setCurrentPage(1);
  };

  // Filtered programmes with multi-criteria support
  const filtered = useMemo(() => {
    let list = PROGRAMMES;

    // Discipline filter
    if (selectedDiscipline) {
      const d = selectedDiscipline.toLowerCase();
      list = list.filter(p => p.label.toLowerCase().includes(d) || p.code.toLowerCase().includes(d));
    }

    // Award filter
    if (selectedAward) {
      if (selectedAward === "BSc") list = list.filter(p => p.label.includes("BSc"));
      else if (selectedAward === "BA") list = list.filter(p => p.label.includes("BA"));
      else if (selectedAward === "Eng") list = list.filter(p => /Eng|Engineering/i.test(p.label));
      else if (selectedAward === "LLB") list = list.filter(p => p.label.includes("LLB"));
      else if (selectedAward === "Masters") list = list.filter(p => /MMath|MSci|MEng|MChem|MPhys|MBus|Master/i.test(p.label));
      else if (selectedAward === "Medical") list = list.filter(p => /BMBS|Medical|Nursing|Medicine/i.test(p.label));
    }

    // Pathway filter
    if (selectedPathway) {
      if (selectedPathway === "abroad") list = list.filter(p => /Abroad/i.test(p.label));
      else if (selectedPathway === "placement") list = list.filter(p => /Placement|Industry|Experience/i.test(p.label));
      else if (selectedPathway === "standard") list = list.filter(p => !/Abroad|Placement|Industry|Experience/i.test(p.label));
    }

    // Duration filter
    if (selectedDuration) {
      if (selectedDuration === "3") list = list.filter(p => p.code.startsWith("UF") && p.code.charAt(3) === "3");
      else if (selectedDuration === "4") list = list.filter(p => p.code.startsWith("UF") && p.code.charAt(3) === "4");
    }

    // Search query
    const activeQuery = (search || sidebarSearch).trim().toLowerCase();
    if (activeQuery) {
      list = list.filter(p => p.label.toLowerCase().includes(activeQuery) || p.code.toLowerCase().includes(activeQuery));
    }

    if (sortOrder === "desc") {
      list = [...list].reverse();
    }

    return list;
  }, [search, sidebarSearch, selectedDiscipline, selectedAward, selectedPathway, selectedDuration, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  // Paginated to 6 on mobile, 12 on desktop
  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const recentItems = useMemo(() => {
    return recentProgrammes
      .map(code => PROGRAMMES.find(p => p.code === code))
      .filter(Boolean) as { code: string; label: string }[];
  }, [recentProgrammes]);

  // Dynamic calendar days generation with authentic timetable event highlights
  const calendarDays = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Monday is 0, Sunday is 6
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;

    const days: {
      d: number | null;
      date?: Date;
      isCurrentDay?: boolean;
      hasEvents?: boolean;
      events?: TimetableEvent[];
    }[] = [];

    // Pad beginning blanks
    for (let i = 0; i < firstDay; i++) {
      days.push({ d: null });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      // Exeter simulated 'today' is 8 Sept 2026
      const isCurrentDay = year === 2026 && month === 8 && d === 8;

      const dayEvts = (timetableEvents || []).filter(e => {
        if (!e || !e.start) return false;
        const ed = new Date(e.start);
        return !isNaN(ed.getTime()) && ed.getFullYear() === year && ed.getMonth() === month && ed.getDate() === d;
      });

      days.push({
        d,
        date: dateObj,
        isCurrentDay,
        hasEvents: dayEvts.length > 0,
        events: dayEvts,
      });
    }

    // Pad ending blanks to fill full 7-col grid
    while (days.length % 7 !== 0) {
      days.push({ d: null });
    }

    return days;
  }, [calendarDate, timetableEvents]);

  // Upcoming timetable sessions (first 3 scheduled sessions)
  const upcomingEvents = useMemo(() => {
    return (timetableEvents || []).filter(e => e && e.start).slice(0, 3);
  }, [timetableEvents]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F9F9F9] dark:bg-background text-foreground relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Top Notice Banner matching ELE screenshot ───────────────────────── */}
        {!bannerDismissed && (
          <div className="bg-[#E2EDE5] dark:bg-[#003C3C]/40 border border-[#D0E1D4] dark:border-[#005c5c] rounded-2xl p-4 text-[14px] leading-relaxed text-[#1D2125] dark:text-[#E8F5F3] flex items-start justify-between gap-4 shadow-xs">
            <div className="flex-1">
              <span className="font-bold text-[#155724] dark:text-[#4ade80]">New Editor and More:</span>{" "}
              We have updated the Programme Planner for the <strong>2026/27 academic year</strong> with full module prerequisites, credit rules, and interactive skill trees. Choose your degree programme below or explore available modules directly from the official TimeEdit timetable.
            </div>
            <button
              onClick={() => setBannerDismissed(true)}
              className="text-muted-foreground hover:text-foreground p-1 shrink-0 rounded-full transition-colors"
              title="Dismiss announcement"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* ── Dashboard Heading matching ELE screenshot ──────────────────────── */}
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#1D2125] dark:text-foreground">
            Dashboard
          </h1>
        </div>

        {/* ── Main 2-Column Layout (Content + ELE Right Sidebar) ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left / Center Main Content (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">

            {/* ── Ask SID Card matching ELE screenshot ─────────────────────────── */}
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6">
              {/* SID Green Badge with Sideways S:D Mascot linking to Ask SID Online */}
              <a
                href="https://sid.exeter.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-48 sm:w-52 h-24 sm:h-28 bg-[#007A6B] hover:bg-[#006e60] rounded-xl flex items-center justify-between text-white shrink-0 p-4 shadow-sm select-none transition-all hover:scale-[1.02] group"
                title="Open Ask SID Online in a new tab"
              >
                {/* Exeter SID Smiley Face Mascot */}
                <div className="flex flex-col items-center justify-center pr-2 border-r border-white/25">
                  <div className="text-2xl sm:text-3xl font-black -rotate-90 tracking-tighter select-none group-hover:scale-110 transition-transform">
                    :D
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/90 mt-1">
                    SID
                  </span>
                </div>
                {/* Text on right of badge */}
                <div className="pl-3 flex-1 flex flex-col justify-center">
                  <div className="text-lg sm:text-xl font-bold leading-tight">Ask</div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight leading-none">SID</div>
                  <div className="text-[11px] font-bold tracking-wider text-[#A3E5DC] uppercase mt-0.5 flex items-center gap-1">
                    ONLINE <ExternalLink size={10} />
                  </div>
                </div>
              </a>

              {/* SID Explanation Text */}
              <div className="text-[14.5px] sm:text-[15px] text-[#333333] dark:text-muted-foreground leading-relaxed">
                The new, improved{" "}
                <a
                  href="https://sid.exeter.ac.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#007A6B] dark:text-[#00C4AD] hover:underline inline-flex items-center gap-1"
                >
                  SID Online Service <ExternalLink size={13} />
                </a>{" "}
                is your first point of contact for most student queries, including course module approvals, Hub/Info Point support, and degree registry. Select your course below to begin planning your academic stages for 2026/27.
              </div>
            </div>

            {/* ── Recently Opened Programmes (if any) ────────────────────────── */}
            {recentItems.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-[#007A6B]" />
                  Recent Programmes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentItems.map(item => (
                    <div
                      key={item.code}
                      onClick={() => onSelectProgramme(item.code)}
                      className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#007A6B] cursor-pointer transition-all group"
                    >
                      <EleGeometricPattern seed={item.code} height={70} />
                      <div className="p-4">
                        <span className="text-xs font-mono font-bold text-[#007A6B] dark:text-[#00C4AD]">
                          {item.code}
                        </span>
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-[#007A6B] transition-colors line-clamp-2 mt-1">
                          {item.label}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ELE Mode Switcher: My Courses vs All Programmes ──────────── */}
            <div className="flex items-center gap-2 border-b border-border/80 pb-3">
              <button
                type="button"
                onClick={() => setCatalogMode("myCourses")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  catalogMode === "myCourses"
                    ? "bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <GraduationCap size={16} />
                <span>My Courses (Active 2026/27)</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
                  catalogMode === "myCourses" ? "bg-white/20 text-white dark:text-[#003C3C]" : "bg-muted text-muted-foreground"
                }`}>
                  {MOCK_COURSES.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCatalogMode("programmes")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  catalogMode === "programmes"
                    ? "bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <BookOpen size={16} />
                <span>All Degree Programmes Directory</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
                  catalogMode === "programmes" ? "bg-white/20 text-white dark:text-[#003C3C]" : "bg-muted text-muted-foreground"
                }`}>
                  1,245
                </span>
              </button>
            </div>

            {/* ── Filter Bar with Enhanced Multi-Filter Controls ────────────── */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 sm:space-y-4">
              {/* Mobile Filter Layout (< md) */}
              <div className="block md:hidden space-y-3">
                {/* Search Input (Touch-friendly 48px height, 16px font to prevent auto-zoom) */}
                <div className="relative w-full">
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search programmes (e.g. Maths, CS)..."
                    className="w-full h-12 pl-10 pr-10 bg-muted/50 border border-border rounded-2xl text-base text-foreground focus:outline-none focus:ring-2 focus:ring-[#007A6B] placeholder:text-muted-foreground"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Mobile Quick Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))}
                    className="flex-1 h-11 px-3 bg-muted/60 hover:bg-muted border border-border rounded-xl text-xs font-bold text-foreground flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span>Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(v => !v)}
                    className={`flex-1 h-11 px-3 border rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all ${
                      hasActiveFilters || mobileFiltersOpen
                        ? "bg-[#003C3C] dark:bg-[#00A693] text-white border-transparent shadow-xs"
                        : "bg-muted/60 hover:bg-muted border-border text-foreground"
                    }`}
                  >
                    <Filter size={14} />
                    <span>Filters</span>
                    {hasActiveFilters && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCardLayout(l => (l === "Card" ? "List" : "Card"))}
                    className="h-11 px-3.5 bg-muted/60 hover:bg-muted border border-border rounded-xl text-xs font-bold text-foreground flex items-center justify-center gap-1 active:scale-95 transition-all"
                  >
                    <span>{cardLayout}</span>
                  </button>
                </div>

                {/* Mobile Quick Filter Chips (1-tap filtering for top categories) */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 pt-1">
                  {[
                    { label: "All Programmes", active: !selectedAward && !selectedDuration && !selectedPathway, onClick: resetAllFilters },
                    { label: "BSc (Hons)", active: selectedAward === "BSc", onClick: () => setSelectedAward(a => (a === "BSc" ? "" : "BSc")) },
                    { label: "Masters / MMath", active: selectedAward === "Masters", onClick: () => setSelectedAward(a => (a === "Masters" ? "" : "Masters")) },
                    { label: "3-Year", active: selectedDuration === "3", onClick: () => setSelectedDuration(d => (d === "3" ? "" : "3")) },
                    { label: "4-Year", active: selectedDuration === "4", onClick: () => setSelectedDuration(d => (d === "4" ? "" : "4")) },
                    { label: "With Placement", active: selectedPathway === "placement", onClick: () => setSelectedPathway(p => (p === "placement" ? "" : "placement")) },
                  ].map(chip => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={chip.onClick}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 active:scale-95 transition-all cursor-pointer ${
                        chip.active
                          ? "bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-2xs ring-1 ring-[#003C3C] dark:ring-[#00C4AD]"
                          : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Collapsible Mobile Filter Details */}
                {mobileFiltersOpen && (
                  <div className="p-3 bg-muted/30 border border-border rounded-xl space-y-3 pt-3 animate-in fade-in duration-150">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">
                          Degree Award
                        </label>
                        <select
                          value={selectedAward}
                          onChange={e => setSelectedAward(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B]"
                        >
                          {AWARDS.map(a => (
                            <option key={a.label} value={a.value}>{a.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">
                            Pathway
                          </label>
                          <select
                            value={selectedPathway}
                            onChange={e => setSelectedPathway(e.target.value)}
                            className="w-full h-10 px-3 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B]"
                          >
                            {PATHWAYS.map(p => (
                              <option key={p.label} value={p.value}>{p.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">
                            Duration
                          </label>
                          <select
                            value={selectedDuration}
                            onChange={e => setSelectedDuration(e.target.value)}
                            className="w-full h-10 px-3 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B]"
                          >
                            {DURATIONS.map(d => (
                              <option key={d.label} value={d.value}>{d.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={resetAllFilters}
                        className="w-full py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <RotateCcw size={13} /> Reset All Filters
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Desktop Filter Layout (>= md) */}
              <div className="hidden md:block space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {/* 1. All / In Progress dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setFilterView(v => (v === "All" ? "In progress" : "All"))}
                      className="h-10 px-4 bg-card hover:bg-muted border border-border rounded-xl text-[14px] text-foreground font-normal flex items-center gap-2 transition-colors shadow-2xs"
                    >
                      <span>{filterView}</span>
                      <ChevronDown size={15} className="text-muted-foreground" />
                    </button>
                  </div>

                  {/* 2. Search Input */}
                  <div className="relative flex-1 min-w-[220px]">
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search by programme title or code..."
                      className="w-full h-10 pl-4 pr-9 bg-card border border-border rounded-xl text-[14px] text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B] placeholder:text-muted-foreground shadow-2xs"
                    />
                    {search ? (
                      <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X size={15} />
                      </button>
                    ) : (
                      <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    )}
                  </div>

                  {/* 3. Sort by Course Name dropdown */}
                  <button
                    onClick={() => setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))}
                    className="h-10 px-4 bg-card hover:bg-muted border border-border rounded-xl text-[14px] text-foreground font-normal flex items-center gap-2 transition-colors shadow-2xs"
                  >
                    <span>Sort by course name {sortOrder === "desc" ? "(Z-A)" : ""}</span>
                    <ChevronDown size={15} className="text-muted-foreground" />
                  </button>

                  {/* 4. Card / List View dropdown */}
                  <button
                    onClick={() => setCardLayout(l => (l === "Card" ? "List" : "Card"))}
                    className="h-10 px-4 bg-card hover:bg-muted border border-border rounded-xl text-[14px] text-foreground font-normal flex items-center gap-2 transition-colors shadow-2xs"
                  >
                    <span>{cardLayout}</span>
                    <ChevronDown size={15} className="text-muted-foreground" />
                  </button>
                </div>

                {/* Advanced Secondary Filters: Degree Award, Pathway, and Duration */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-border/60">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0 mr-1">
                    <Filter size={13} className="text-[#007A6B]" /> Filters:
                  </span>

                  {/* Award Type Filter */}
                  <select
                    value={selectedAward}
                    onChange={e => setSelectedAward(e.target.value)}
                    className="h-8 px-3 rounded-lg border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B] cursor-pointer"
                  >
                    {AWARDS.map(a => (
                      <option key={a.label} value={a.value}>
                        {a.label}
                      </option>
                    ))}
                  </select>

                  {/* Study Pathway Filter */}
                  <select
                    value={selectedPathway}
                    onChange={e => setSelectedPathway(e.target.value)}
                    className="h-8 px-3 rounded-lg border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B] cursor-pointer"
                  >
                    {PATHWAYS.map(p => (
                      <option key={p.label} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>

                  {/* Duration Filter */}
                  <select
                    value={selectedDuration}
                    onChange={e => setSelectedDuration(e.target.value)}
                    className="h-8 px-3 rounded-lg border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B] cursor-pointer"
                  >
                    {DURATIONS.map(d => (
                      <option key={d.label} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>

                  {/* Reset Filters button if any are active */}
                  {hasActiveFilters && (
                    <button
                      onClick={resetAllFilters}
                      className="h-8 px-2.5 rounded-lg text-xs font-medium text-[#007A6B] dark:text-[#00C4AD] hover:bg-muted flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={12} /> Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* Discipline Quick Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                {DISCIPLINES.map(d => {
                  const active = selectedDiscipline === d.query;
                  return (
                    <button
                      key={d.label}
                      onClick={() => setSelectedDiscipline(d.query)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-[12.5px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                        active
                          ? "bg-[#003C3C] dark:bg-[#00A693] text-white shadow-xs"
                          : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Course Cards Grid ─────────────────────────────────────────── */}
            <div>
              {catalogMode === "myCourses" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3 px-1">
                    <span>
                      Showing <strong>{filteredCourses.length}</strong> enrolled modules · 2026/27 Academic Year
                    </span>
                    <span className="hidden sm:inline text-xs">Exeter Learning Environment (ELE 2)</span>
                  </div>

                  {filteredCourses.length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground shadow-xs">
                      <Search size={40} className="mx-auto mb-3 opacity-30 text-[#007A6B]" />
                      <p className="font-semibold text-foreground text-base">No enrolled courses match your criteria</p>
                      <p className="text-sm mt-1">Try clearing your search query or reset the filter.</p>
                      <button
                        onClick={() => { setSearch(""); setFilterView("All"); }}
                        className="mt-4 px-4 py-2 rounded-xl bg-[#007A6B] text-white text-xs font-semibold hover:bg-[#006a5d] transition-colors"
                      >
                        Reset Filter
                      </button>
                    </div>
                  ) : cardLayout === "Card" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {filteredCourses.map(course => (
                        <div
                          key={course.id}
                          onClick={() => onSelectCourse ? onSelectCourse(course) : onSelectProgramme(course.code)}
                          className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#007A6B] active:scale-[0.99] cursor-pointer transition-all flex flex-col group"
                        >
                          {/* Thumbnail Geometric Header Banner */}
                          <div className="h-28 sm:h-36 relative overflow-hidden rounded-t-2xl">
                            <EleGeometricPattern seed={course.code} height="100%" />
                            <div className="absolute top-3 left-3 flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md bg-[#00C4AD] text-[#003C3C] text-xs font-mono font-bold shadow-xs">
                                {course.code}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs text-white text-[11px] font-medium">
                                {course.term}
                              </span>
                            </div>
                          </div>

                          {/* Course Information */}
                          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-[16.5px] sm:text-[15px] font-bold text-[#007A6B] dark:text-[#00C4AD] group-hover:underline transition-all leading-snug line-clamp-2 mb-1.5">
                                {course.title}
                              </h3>
                              <p className="text-xs text-muted-foreground font-medium">
                                {course.convenor.name} · Stage {course.stage} · {course.credits} Credits
                              </p>

                              {/* Term Progress Bar */}
                              <div className="mt-3 space-y-1">
                                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                                  <span>Course Progress</span>
                                  <span className="font-semibold text-foreground">{course.progressPercentage}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#007A6B] dark:bg-[#00C4AD] rounded-full transition-all duration-300"
                                    style={{ width: `${course.progressPercentage}%` }}
                                  />
                                </div>
                              </div>

                              {/* Badges: Past Papers & Deadlines */}
                              <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <span className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground border border-border">
                                  {course.examPapers?.length || 8} Past Papers
                                </span>
                                {(course.deadlines?.length || 0) > 0 && (
                                  <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-medium border border-rose-500/20">
                                    {course.deadlines?.length} Deadlines
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
                              <span className="font-bold text-sm text-[#007A6B] dark:text-[#00C4AD] group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                                Open Course Hub <ArrowRight size={15} />
                              </span>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  if (onSelectCourse) onSelectCourse(course);
                                  else onSelectProgramme(course.code);
                                }}
                                className="p-1.5 hover:text-foreground text-muted-foreground rounded-lg"
                                title="Course options"
                              >
                                <MoreVertical size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* List View for My Courses */
                    <div className="bg-card border border-border rounded-2xl divide-y divide-border shadow-xs overflow-hidden">
                      {filteredCourses.map(course => (
                        <div
                          key={course.id}
                          onClick={() => onSelectCourse ? onSelectCourse(course) : onSelectProgramme(course.code)}
                          className="p-4 hover:bg-muted/40 transition-colors cursor-pointer flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-mono font-bold text-[#007A6B] dark:text-[#00C4AD]">
                                {course.code}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                · {course.term} · {course.convenor.name}
                              </span>
                            </div>
                            <h3 className="text-[15px] font-semibold text-foreground hover:text-[#007A6B] transition-colors truncate">
                              {course.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#007A6B] dark:text-[#00C4AD]">
                              {course.progressPercentage}%
                            </span>
                            <ArrowRight size={16} className="text-[#007A6B] shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* ── All 1,245 Degree Programmes Grid ──────────────────────── */
                <div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3 px-1">
                    <span>
                      Showing <strong>{filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)}</strong> of <strong>{filtered.length}</strong> programmes ({pageSize} per page)
                    </span>
                    <span className="hidden sm:inline text-xs">Page {safePage} of {totalPages} · University of Exeter</span>
                  </div>

                  {filtered.length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground shadow-xs">
                      <Search size={40} className="mx-auto mb-3 opacity-30 text-[#007A6B]" />
                      <p className="font-semibold text-foreground text-base">No courses found matching your criteria</p>
                      <p className="text-sm mt-1">Try clearing filters or search by a degree keyword like "Maths", "CS", or "Law".</p>
                      {hasActiveFilters && (
                        <button
                          onClick={resetAllFilters}
                          className="mt-4 px-4 py-2 rounded-xl bg-[#007A6B] text-white text-xs font-semibold hover:bg-[#006a5d] transition-colors"
                        >
                          Reset All Filters
                        </button>
                      )}
                    </div>
                  ) : cardLayout === "Card" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {paginated.map(p => (
                        <div
                          key={p.code}
                          onClick={() => onSelectProgramme(p.code)}
                          className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#007A6B] active:scale-[0.99] cursor-pointer transition-all flex flex-col group"
                        >
                          {/* Thumbnail Geometric Header Banner with rounded-t-2xl */}
                          <div className="h-28 sm:h-36 relative overflow-hidden rounded-t-2xl">
                            <EleGeometricPattern seed={p.code} height="100%" />
                          </div>

                          {/* Course Information */}
                          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                            <div>
                              {/* Course Title with ELE Teal Link styling */}
                              <h3 className="text-[16.5px] sm:text-[15px] font-bold text-[#007A6B] dark:text-[#00C4AD] group-hover:underline transition-all leading-snug line-clamp-2 mb-1.5">
                                {p.label}
                              </h3>
                              {/* Course Code / Dept */}
                              <p className="text-xs sm:text-[12px] text-muted-foreground font-mono font-medium">
                                {p.code} · Undergraduate & Master's
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
                              <span className="font-bold text-sm text-[#007A6B] dark:text-[#00C4AD] group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                                Launch Planner <ArrowRight size={15} />
                              </span>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  onSelectProgramme(p.code);
                                }}
                                className="p-1.5 hover:text-foreground text-muted-foreground rounded-lg"
                                title="Course options"
                              >
                                <MoreVertical size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* List View option */
                    <div className="bg-card border border-border rounded-2xl divide-y divide-border shadow-xs overflow-hidden">
                      {paginated.map(p => (
                        <div
                          key={p.code}
                          onClick={() => onSelectProgramme(p.code)}
                          className="p-4 hover:bg-muted/40 transition-colors cursor-pointer flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0 flex-1">
                            <span className="text-xs font-mono font-bold text-[#007A6B] dark:text-[#00C4AD] block mb-0.5">
                              {p.code}
                            </span>
                            <h3 className="text-[15px] font-semibold text-foreground hover:text-[#007A6B] transition-colors truncate">
                              {p.label}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              University of Exeter · 2026/27 Academic Year
                            </p>
                          </div>
                          <ArrowRight size={16} className="text-[#007A6B] shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── 12-Item Pagination Controls Bar ──────────────────────────── */}
                  {totalPages > 1 && (
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 bg-card border border-border rounded-2xl px-5 py-3.5 shadow-xs">
                      <div className="text-xs text-muted-foreground">
                        Page <strong>{safePage}</strong> of <strong>{totalPages}</strong> ({filtered.length} total programmes)
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={safePage === 1}
                          className="px-3.5 py-1.5 rounded-xl border border-border bg-card text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                        >
                          <ChevronLeft size={14} /> Previous
                        </button>

                        {/* Quick page numbers */}
                        <div className="hidden sm:flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum = safePage <= 3 ? i + 1 : safePage >= totalPages - 2 ? totalPages - 4 + i : safePage - 2 + i;
                            if (pageNum < 1 || pageNum > totalPages) return null;
                            const isCurrent = pageNum === safePage;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-8 h-8 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors ${
                                  isCurrent
                                    ? "bg-[#003C3C] text-white shadow-2xs"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={safePage === totalPages}
                          className="px-3.5 py-1.5 rounded-xl border border-border bg-card text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                        >
                          Next <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Footer Info matching ELE ────────────────────────────────────── */}
            <div className="border-t border-border pt-6 pb-12 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <button
                  type="button"
                  onClick={onOpenAccessibility}
                  className="hover:underline hover:text-foreground transition-colors text-left text-xs"
                >
                  Accessibility Settings
                </button>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:underline hover:text-foreground transition-colors text-left text-xs"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:underline hover:text-foreground transition-colors text-left text-xs"
                >
                  Terms of Service
                </button>
                <button
                  type="button"
                  onClick={onOpenCookies}
                  className="hover:underline hover:text-foreground transition-colors text-left text-xs"
                >
                  Cookie Preferences
                </button>
                <a href="https://ele.exeter.ac.uk/course/view.php?id=27644" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-foreground transition-colors text-xs">
                  ELE Support
                </a>
                <a href="https://www.exeter.ac.uk/study/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-foreground transition-colors text-xs">
                  Exeter Study Guide
                </a>
              </div>
              <div className="text-left sm:text-right text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground/80 block">Unofficial Student Advisory Tool</span>
                <span>Not affiliated with, endorsed by, or operated by the University of Exeter.</span>
              </div>
            </div>
          </div>

          {/* ── Right Sidebar (4 cols on lg) matching ELE screenshot ──────────── */}
          <div className="hidden lg:block lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">

            {/* 1. Search Courses Box */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-0 overflow-hidden border border-border rounded-xl">
                <input
                  type="text"
                  value={sidebarSearch}
                  onChange={e => setSidebarSearch(e.target.value)}
                  placeholder="Search courses"
                  className="w-full h-10 px-3 text-[12.5px] bg-card text-foreground focus:outline-none"
                />
                <button
                  onClick={() => setSearch(sidebarSearch)}
                  className="h-10 px-4 bg-[#003C3C] hover:bg-[#004d4d] text-white flex items-center justify-center transition-colors"
                  title="Search courses"
                >
                  <Search size={16} />
                </button>
              </div>
              <div className="mt-2.5">
                <a
                  href="https://ele.exeter.ac.uk/course/index.php?categoryid=297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#007A6B] dark:text-[#00C4AD] hover:underline inline-flex items-center gap-1"
                >
                  Course Index <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* 2. Monthly Calendar Widget matching ELE screenshot */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xs relative">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className="p-1 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  title="Previous month"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="text-center">
                  <div className="text-[15px] font-bold text-foreground">{currentMonthName}</div>
                  <div className="text-xs text-muted-foreground">{currentYear}</div>
                </div>
                <button
                  onClick={nextMonth}
                  className="p-1 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  title="Next month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground mb-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

              {/* Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs relative">
                {calendarDays.map((item, idx) => (
                  <div key={idx} className="relative flex flex-col items-center justify-center">
                    {item.d ? (
                      <button
                        onClick={() => {
                          if (item.hasEvents && item.events) {
                            setHoveredDayEvents({ date: item.date!, events: item.events });
                          }
                        }}
                        onMouseEnter={() => {
                          if (item.hasEvents && item.events) {
                            setHoveredDayEvents({ date: item.date!, events: item.events });
                          }
                        }}
                        className={`w-7 h-7 flex flex-col items-center justify-center rounded-full text-[12.5px] transition-all cursor-pointer relative ${
                          item.hasEvents
                            ? "bg-[#00C4AD] text-[#003C3C] dark:bg-[#00A693] dark:text-white font-bold shadow-xs hover:scale-110"
                            : item.isCurrentDay
                            ? "bg-[#003C3C] text-white font-bold"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="leading-none">{item.d}</span>
                        {item.hasEvents && (
                          <span className="w-1 h-1 bg-[#003C3C] dark:bg-white rounded-xs mt-0.5" />
                        )}
                      </button>
                    ) : (
                      <div className="w-7 h-7" />
                    )}
                  </div>
                ))}

                {/* Event Hover/Click Popover matching media_1788869113630.png */}
                {hoveredDayEvents && (
                  <div
                    onMouseLeave={() => setHoveredDayEvents(null)}
                    className="absolute left-1/2 -translate-x-1/2 top-4 w-72 bg-card border border-border rounded-2xl shadow-xl p-3.5 z-40 text-left text-foreground animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="flex items-center justify-between border-b border-border/70 pb-2 mb-2.5">
                      <div className="font-bold text-[13px] text-foreground">
                        {hoveredDayEvents.date.toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}{" "}
                        events
                      </div>
                      <button
                        onClick={() => setHoveredDayEvents(null)}
                        className="p-1 text-muted-foreground hover:text-foreground rounded-md"
                      >
                        <X size={12} />
                      </button>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {hoveredDayEvents.events.map(evt => {
                        const timeStr = `${new Date(evt.start).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })} - ${new Date(evt.end).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`;

                        const theme = getEventTheme(evt);
                        return (
                          <div
                            key={evt.uid}
                            className={`p-2 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 space-y-1 transition-colors border-l-4 ${theme.leftBorder}`}
                          >
                            <div className="flex items-start gap-1.5">
                              <FileText size={13} style={{ color: theme.hex }} className="mt-0.5 shrink-0" />
                              <div className="font-semibold text-xs text-foreground line-clamp-1">
                                {evt.summary}
                              </div>
                            </div>
                            <div className="text-[11px] text-muted-foreground pl-4 flex items-center justify-between">
                              <span>{timeStr}</span>
                              <span className="font-mono font-medium">{evt.location?.split("/")[0] || ""}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-border/70 text-center">
                      <button
                        onClick={() => {
                          setHoveredDayEvents(null);
                          onOpenCalendarModal?.("calendar");
                        }}
                        className="text-xs font-bold text-[#007A6B] dark:text-[#00C4AD] hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        View in full calendar <ExternalLink size={11} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Links below calendar connected to full modal */}
              <div className="mt-4 pt-3 border-t border-border/70 text-xs text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => onOpenCalendarModal?.("calendar")}
                  className="hover:underline text-[#007A6B] dark:text-[#00C4AD] font-medium cursor-pointer"
                >
                  Full calendar
                </button>
                <span>•</span>
                <button
                  onClick={() => onOpenCalendarModal?.("manage")}
                  className="hover:underline text-[#007A6B] dark:text-[#00C4AD] font-medium cursor-pointer"
                >
                  Import or export calendars
                </button>
              </div>
            </div>

            {/* 3. Upcoming Events Widget dynamically populated from MyTimetable feed */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xs text-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground text-[15px]">Upcoming Events</h3>
                {upcomingEvents.length > 0 && (
                  <span className="text-[11px] font-semibold text-[#007A6B] dark:text-[#00C4AD]">
                    {upcomingEvents.length} scheduled
                  </span>
                )}
              </div>

              {upcomingEvents.length === 0 ? (
                <p className="text-muted-foreground text-[13px] leading-relaxed">
                  There are no upcoming course events or timetable deadlines today.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {upcomingEvents.map(evt => {
                    const theme = getEventTheme(evt);
                    const d = new Date(evt.start);
                    const dateStr = d.toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    });
                    const timeStr = d.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <div
                        key={evt.uid}
                        onClick={() => onOpenCalendarModal?.("calendar")}
                        className={`p-2.5 rounded-xl border border-border/70 bg-muted/20 hover:bg-muted/50 cursor-pointer transition-colors space-y-1 border-l-4 ${theme.leftBorder}`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: theme.hex }} />
                            <span className="font-bold text-foreground font-mono">
                              {evt.moduleCode}
                            </span>
                            <span className={`text-[9.5px] uppercase font-bold px-1.5 py-0.5 rounded ${theme.badgeBg} ${theme.badgeText} dark:text-white border ${theme.badgeBorder}`}>
                              {evt.activityType}
                            </span>
                          </div>
                          <span className="text-muted-foreground text-[11px] font-medium">
                            {dateStr} · {timeStr}
                          </span>
                        </div>
                        <div className="font-medium text-xs text-foreground line-clamp-1">
                          {evt.summary.replace(/^[A-Z]{3}\d{4}[^\-]*-\s*/, "")}
                        </div>
                        {evt.location && (
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <MapPin size={11} className="shrink-0 text-muted-foreground/70" />
                            <span className="truncate">{evt.location}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={() => onOpenCalendarModal?.("calendar")}
                className="mt-2 text-xs font-semibold text-[#007A6B] dark:text-[#00C4AD] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Go to calendar... <ExternalLink size={12} />
              </button>
            </div>

            {/* 4. Help & Support Card */}
            <div className="bg-muted/40 border border-border rounded-2xl p-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <HelpCircle size={16} className="text-[#007A6B]" />
                <span>Need timetable help?</span>
              </div>
              <p className="leading-relaxed">
                Check module specifications and prerequisites directly in the Exeter Study Guide or launch the command palette with <kbd className="font-mono bg-card px-1.5 py-0.5 border border-border rounded-md text-[11px]">⌘K</kbd>.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Accessibility icon in bottom right (matching ELE screenshot cyan icon) */}
        <div className="fixed bottom-6 right-6 z-20">
          <button
            type="button"
            onClick={onOpenAccessibility}
            className="w-12 h-12 rounded-full bg-[#00C4AD] hover:bg-[#00A693] text-[#003C3C] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
            title="Exeter Accessibility Settings and Options"
          >
            <Accessibility size={24} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
