import React, { useState, useMemo } from "react";
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
  GraduationCap,
  FileCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { EleGeometricPattern } from "./EleGeometricPattern";
import { TimetableEvent, getEventTheme } from "../../api/timetable";
import { MOCK_COURSES } from "../../data/mockCourses";
import { Course } from "../../types";

interface EleDashboardHeroProps {
  onSelectCourse: (course: Course) => void;
  recentCourseCodes?: string[];
  timetableEvents?: TimetableEvent[];
  onOpenCalendarModal?: (initialTab?: "calendar" | "manage" | "export") => void;
  onOpenAccessibility?: () => void;
}

const TERMS = [
  { label: "All Terms", value: "All" },
  { label: "Term 1 (Autumn)", value: "Term 1" },
  { label: "Term 2 (Spring)", value: "Term 2" },
  { label: "Whole Year", value: "Term 1 and 2" },
];

const STAGES = [
  { label: "All Stages", value: "All" },
  { label: "Stage 2 (Current)", value: "2" },
  { label: "Stage 1", value: "1" },
];

export const EleDashboardHero: React.FC<EleDashboardHeroProps> = ({
  onSelectCourse,
  recentCourseCodes = [],
  timetableEvents = [],
  onOpenCalendarModal,
  onOpenAccessibility,
}) => {
  const [search, setSearch] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [sortOrder, setSortOrder] = useState<"code" | "title" | "progress">("code");
  const [cardLayout, setCardLayout] = useState<"Card" | "List">("Card");

  // Filtered enrolled modules for Samuel
  const filteredCourses = useMemo(() => {
    let list = [...MOCK_COURSES];
    const q = search.trim().toLowerCase();

    if (q) {
      list = list.filter(
        c =>
          c.code.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.convenor.name.toLowerCase().includes(q)
      );
    }

    if (selectedTerm !== "All") {
      list = list.filter(c => c.term === selectedTerm);
    }

    if (selectedStage !== "All") {
      list = list.filter(c => c.stage === Number(selectedStage));
    }

    list.sort((a, b) => {
      if (sortOrder === "title") return a.title.localeCompare(b.title);
      if (sortOrder === "progress") return b.progressPercentage - a.progressPercentage;
      return a.code.localeCompare(b.code);
    });

    return list;
  }, [search, selectedTerm, selectedStage, sortOrder]);

  // Recent courses
  const recentCourses = useMemo(() => {
    return recentCourseCodes
      .map(code => MOCK_COURSES.find(c => c.code === code))
      .filter((c): c is Course => !!c)
      .slice(0, 3);
  }, [recentCourseCodes]);

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

  const calendarDays = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1; // Mon = 0

    const days: Array<{
      d: number | null;
      date?: Date;
      hasEvents?: boolean;
      events?: TimetableEvent[];
      isCurrentDay?: boolean;
    }> = [];

    for (let i = 0; i < offset; i++) {
      days.push({ d: null });
    }

    const today = new Date();
    const isThisMonth = today.getFullYear() === year && today.getMonth() === month;

    for (let d = 1; d <= totalDays; d++) {
      const cellDate = new Date(year, month, d);
      const isCurrentDay = isThisMonth && today.getDate() === d;

      const dayEvents = (timetableEvents || []).filter(e => {
        if (!e || !e.start) return false;
        const eDate = new Date(e.start);
        return (
          eDate.getFullYear() === year &&
          eDate.getMonth() === month &&
          eDate.getDate() === d
        );
      });

      days.push({
        d,
        date: cellDate,
        hasEvents: dayEvents.length > 0,
        events: dayEvents,
        isCurrentDay,
      });
    }

    while (days.length % 7 !== 0) {
      days.push({ d: null });
    }

    return days;
  }, [calendarDate, timetableEvents]);

  // Upcoming timetable sessions (first 3 scheduled sessions)
  const upcomingEvents = useMemo(() => {
    return (timetableEvents || []).filter(e => e && e.start).slice(0, 3);
  }, [timetableEvents]);

  const hasActiveFilters = search || selectedTerm !== "All" || selectedStage !== "All";

  const resetAllFilters = () => {
    setSearch("");
    setSelectedTerm("All");
    setSelectedStage("All");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F9F9F9] dark:bg-background text-foreground relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Dashboard Heading & Student Status ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#1D2125] dark:text-foreground">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              MMath Mathematics (Honours) · Stage 2 · 2026/27 Academic Year
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Stage 2 Active</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold shadow-2xs">
              <GraduationCap size={14} className="text-[#007A6B] dark:text-[#00C4AD]" />
              <span>14 Modules</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold shadow-2xs">
              <FileCheck size={14} className="text-[#007A6B] dark:text-[#00C4AD]" />
              <span>Offline Ready</span>
            </div>
          </div>
        </div>

        {/* ── Main 2-Column Layout (Courses + Sidebar) ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left / Center Main Content (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">

            {/* ── Recent Courses (if any) ─────────────────────────────────── */}
            {recentCourses.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-[#007A6B] dark:text-[#00C4AD]" />
                  Recently Viewed
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recentCourses.map(course => (
                    <div
                      key={course.code}
                      onClick={() => onSelectCourse(course)}
                      className="bg-card border border-border rounded-xl p-3 shadow-xs hover:border-[#007A6B] dark:hover:border-[#00C4AD] cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-xs font-mono font-bold text-[#007A6B] dark:text-[#00C4AD]">
                          {course.code}
                        </span>
                        <div className="text-xs font-medium text-foreground truncate group-hover:text-[#007A6B] dark:group-hover:text-[#00C4AD] transition-colors">
                          {course.title}
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-0.5 group-hover:text-[#007A6B] transition-all shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Filter Bar ────────────────────────────────────────────── */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search modules (e.g. MTH2008, Real Analysis, Markus Mueller)..."
                    className="w-full h-10 pl-9 pr-9 bg-muted/40 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B] dark:focus:ring-[#00C4AD] placeholder:text-muted-foreground transition-all"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Term Filter */}
                <select
                  value={selectedTerm}
                  onChange={e => setSelectedTerm(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B] cursor-pointer"
                >
                  {TERMS.map(t => (
                    <option key={t.label} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>

                {/* Stage Filter */}
                <select
                  value={selectedStage}
                  onChange={e => setSelectedStage(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B] cursor-pointer"
                >
                  {STAGES.map(s => (
                    <option key={s.label} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>

                {/* Sort Order */}
                <select
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value as any)}
                  className="h-10 px-3 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B] cursor-pointer"
                >
                  <option value="code">Sort by Code</option>
                  <option value="title">Sort by Title</option>
                  <option value="progress">Sort by Progress</option>
                </select>

                {/* Card / List View Toggle */}
                <button
                  type="button"
                  onClick={() => setCardLayout(l => (l === "Card" ? "List" : "Card"))}
                  className="h-10 px-3.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Switch between Card and List view"
                >
                  <span>{cardLayout} view</span>
                </button>

                {/* Reset Filters */}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="h-10 px-3 rounded-xl text-xs font-medium text-[#007A6B] dark:text-[#00C4AD] hover:bg-muted flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* ── Courses Count & Grid ───────────────────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground px-1">
                <span>
                  Showing <strong>{filteredCourses.length}</strong> of <strong>{MOCK_COURSES.length}</strong> enrolled modules
                </span>
                <span className="text-xs">Exeter Learning Environment (ELE 2)</span>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground shadow-xs">
                  <Search size={36} className="mx-auto mb-3 opacity-30 text-[#007A6B]" />
                  <p className="font-semibold text-foreground text-base">No modules match your filter</p>
                  <p className="text-sm mt-1">Try clearing your search query or reset the term selection.</p>
                  <button
                    onClick={resetAllFilters}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#007A6B] text-white text-xs font-semibold hover:bg-[#006a5d] transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : cardLayout === "Card" ? (
                /* Card Layout */
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCourses.map(course => {
                    const hasLocalNotes = course.sections.some(s =>
                      s.resources.some(r => r.fileUrl?.startsWith("/materials/"))
                    );
                    const totalSheets = course.sections
                      .flatMap(s => s.resources)
                      .filter(r => r.category === "problem_sheet").length;

                    return (
                      <div
                        key={course.id}
                        onClick={() => onSelectCourse(course)}
                        className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#007A6B] active:scale-[0.99] cursor-pointer transition-all flex flex-col group"
                      >
                        {/* Thumbnail Geometric Header Banner */}
                        <div className="h-28 sm:h-36 relative overflow-hidden rounded-t-2xl">
                          <EleGeometricPattern seed={course.code} height="100%" />
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-[#00C4AD] text-[#003C3C] text-xs font-mono font-bold shadow-xs">
                              {course.code}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs text-white text-[11px] font-medium">
                              {course.term}
                            </span>
                          </div>

                          {hasLocalNotes && (
                            <div className="absolute top-3 right-3">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                                <FileCheck size={10} /> Local PDF
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Course Information */}
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-[16px] sm:text-[15px] font-bold text-[#007A6B] dark:text-[#00C4AD] group-hover:underline transition-all leading-snug line-clamp-2 mb-1.5">
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

                            {/* Badges: Past Papers, Sheets */}
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                              <span className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground border border-border">
                                {course.examPapers?.length || 8} Past Papers
                              </span>
                              {totalSheets > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground border border-border">
                                  {totalSheets} Sheets
                                </span>
                              )}
                              {(course.deadlines?.length || 0) > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-medium border border-rose-500/20">
                                  {course.deadlines?.length} Deadlines
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
                            <span className="font-bold text-sm text-[#007A6B] dark:text-[#00C4AD] group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                              Open Module Hub <ArrowRight size={15} />
                            </span>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                onSelectCourse(course);
                              }}
                              className="p-1.5 hover:text-foreground text-muted-foreground rounded-lg"
                              title="Open module"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List Layout */
                <div className="bg-card border border-border rounded-2xl divide-y divide-border shadow-xs overflow-hidden">
                  {filteredCourses.map(course => (
                    <div
                      key={course.id}
                      onClick={() => onSelectCourse(course)}
                      className="p-4 hover:bg-muted/40 transition-colors cursor-pointer flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono font-bold text-[#007A6B] dark:text-[#00C4AD]">
                            {course.code}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            · {course.term} · {course.convenor.name} · {course.credits} Credits
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

            {/* ── Footer ──────────────────────────────────────────────── */}
            <div className="border-t border-border pt-6 pb-12 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <button
                  type="button"
                  onClick={onOpenAccessibility}
                  className="hover:underline hover:text-foreground transition-colors text-left text-xs cursor-pointer"
                >
                  Accessibility Settings
                </button>
                <a
                  href="https://library.exeter.ac.uk/exampapers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-foreground transition-colors text-xs flex items-center gap-1"
                >
                  Exeter Exam Library <ExternalLink size={11} />
                </a>
                <a
                  href="https://mytimetable.exeter.ac.uk/schedule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-foreground transition-colors text-xs flex items-center gap-1"
                >
                  MyTimetable <ExternalLink size={11} />
                </a>
                <a
                  href="https://srs.exeter.ac.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-foreground transition-colors text-xs flex items-center gap-1"
                >
                  Student Records (SITS) <ExternalLink size={11} />
                </a>
                <a
                  href="https://outlook.office.com/mail/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-foreground transition-colors text-xs flex items-center gap-1"
                >
                  University Email <ExternalLink size={11} />
                </a>
              </div>
              <div className="text-left sm:text-right text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground/80 block">ELE 2 · Samuel's Personal Learning Hub</span>
                <span>Fast, offline-ready course companion.</span>
              </div>
            </div>
          </div>

          {/* ── Right Sidebar (4 cols on lg) ──────────────────────────── */}
          <div className="hidden lg:block lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">

            {/* 1. Monthly Calendar Widget */}
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

                {/* Event Popover */}
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

              {/* Links below calendar */}
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
                  Import or export
                </button>
              </div>
            </div>

            {/* 2. Upcoming Events Widget dynamically populated from MyTimetable */}
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

            {/* 3. Quick Tips Card */}
            <div className="bg-muted/40 border border-border rounded-2xl p-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <Sparkles size={16} className="text-[#007A6B] dark:text-[#00C4AD]" />
                <span>ELE 2 Quick Tip</span>
              </div>
              <p className="leading-relaxed">
                Click any module to open its lecture notes, problem sheets, and past papers. Offline materials stored in <code className="font-mono bg-card px-1 py-0.5 rounded text-[11px]">/materials/</code> load instantly without internet.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Accessibility icon in bottom right */}
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
