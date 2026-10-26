import React, { useState, useMemo } from "react";
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  GraduationCap,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  Upload,
  ExternalLink,
  Check,
  Filter,
  FileText,
  CalendarDays,
} from "lucide-react";
import { TimetableEvent, getEventTheme, EVENT_THEMES, EventCategory } from "../../api/timetable";

interface TimetableCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "calendar" | "manage" | "export";
  events: TimetableEvent[];
  loading: boolean;
  lastSync: string | null;
  icsUrl: string;
  onUpdateIcsUrl: (url: string) => void;
  onSyncNow: () => void;
}

export const TimetableCalendarModal: React.FC<TimetableCalendarModalProps> = ({
  isOpen,
  onClose,
  initialTab = "calendar",
  events,
  loading,
  lastSync,
  icsUrl,
  onUpdateIcsUrl,
  onSyncNow,
}) => {
  const [activeTab, setActiveTab] = useState<"calendar" | "manage" | "export">(initialTab);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    // Default to the first date in the events list if available, or current date
    if (events.length > 0) {
      return new Date(events[0].start);
    }
    return new Date();
  });
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"day" | "schedule" | "upcoming" | "month">("day");
  const [newIcsUrlInput, setNewIcsUrlInput] = useState<string>(icsUrl);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);

  // Sync initial tab when opened
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Unique module codes from events
  const moduleCodes = useMemo(() => {
    const set = new Set<string>();
    events.forEach(e => {
      if (e.moduleCode) set.add(e.moduleCode);
    });
    return Array.from(set).sort();
  }, [events]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    if (selectedCourseFilter === "all") return events;
    return events.filter(e => e.moduleCode === selectedCourseFilter);
  }, [events, selectedCourseFilter]);

  // Events for selected date
  const eventsForSelectedDate = useMemo(() => {
    return filteredEvents.filter(e => {
      const d = new Date(e.start);
      return (
        d.getFullYear() === selectedDate.getFullYear() &&
        d.getMonth() === selectedDate.getMonth() &&
        d.getDate() === selectedDate.getDate()
      );
    });
  }, [filteredEvents, selectedDate]);

  // Format date helper
  const formatDateHeading = (d: Date) => {
    return d.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handlePrevDay = () => {
    setSelectedDate(prev => new Date(prev.getTime() - 24 * 60 * 60 * 1000));
  };

  const handleNextDay = () => {
    setSelectedDate(prev => new Date(prev.getTime() + 24 * 60 * 60 * 1000));
  };

  const handleSaveIcsUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIcsUrlInput.trim()) return;
    onUpdateIcsUrl(newIcsUrlInput.trim());
    setSyncSuccessMsg("Timetable URL updated and synchronizing!");
    setTimeout(() => setSyncSuccessMsg(null), 4000);
  };

  const handleCopyCalendarUrl = () => {
    navigator.clipboard.writeText(icsUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  const handleDownloadIcs = () => {
    // Generate .ics string or redirect to URL
    window.open(icsUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-card text-foreground border border-border w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#003C3C] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10">
              <CalendarIcon size={20} className="text-[#00C4AD]" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">University of Exeter Calendar</h2>
              <p className="text-xs text-white/70">
                {icsUrl
                  ? `Active Timetable Feed · ${events.length} Synchronised Events`
                  : "No Calendar Feed Connected"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Close (ESC)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation matching ELE screenshots */}
        <div className="bg-muted/40 border-b border-border px-5 sm:px-6 flex items-center justify-between gap-4 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "calendar"
                  ? "bg-[#003C3C] text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <CalendarDays size={14} />
              <span>Calendar View</span>
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "manage"
                  ? "bg-[#003C3C] text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Upload size={14} />
              <span>Imported Calendars</span>
            </button>
            <button
              onClick={() => setActiveTab("export")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "export"
                  ? "bg-[#003C3C] text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Download size={14} />
              <span>Export Calendar</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground py-2 shrink-0">
            <button
              onClick={onSyncNow}
              disabled={loading}
              className="px-2.5 py-1 rounded-lg bg-[#007A6B]/10 hover:bg-[#007A6B]/20 text-[#007A6B] dark:text-[#00C4AD] font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              title="Synchronize latest events from Exeter MyTimetable"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              <span>{loading ? "Syncing..." : "Sync Timetable"}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* ════════ TAB 1: CALENDAR VIEW matching media_1788869319449.png ════════ */}
          {activeTab === "calendar" && (
            <div className="space-y-6">
              {/* Controls Toolbar matching media_1788869319449.png */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/30 p-3 rounded-xl border border-border/70">
                <div className="flex items-center gap-2">
                  {/* View Mode */}
                  <select
                    value={viewMode}
                    onChange={e => setViewMode(e.target.value as any)}
                    className="h-8.5 px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground focus:outline-none"
                  >
                    <option value="day">Day Cards View</option>
                    <option value="schedule">Schedule Timeline (Official Grid)</option>
                    <option value="upcoming">Upcoming Sessions</option>
                  </select>

                  {/* Course Filter */}
                  <div className="flex items-center gap-1.5">
                    <Filter size={13} className="text-muted-foreground" />
                    <select
                      value={selectedCourseFilter}
                      onChange={e => setSelectedCourseFilter(e.target.value)}
                      className="h-8.5 px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground focus:outline-none max-w-[200px]"
                    >
                      <option value="all">All courses & modules</option>
                      {moduleCodes.map(code => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Day Navigation */}
                {(viewMode === "day" || viewMode === "schedule") && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevDay}
                      className="p-1.5 rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
                      title="Previous Day"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <input
                      type="date"
                      value={selectedDate.toISOString().split("T")[0]}
                      onChange={e => {
                        if (e.target.value) {
                          setSelectedDate(new Date(e.target.value));
                        }
                      }}
                      className="h-8.5 px-2.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground focus:outline-none"
                    />
                    <button
                      onClick={handleNextDay}
                      className="p-1.5 rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
                      title="Next Day"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Official Exeter MyTimetable Color Legend */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 px-3.5 py-2.5 bg-muted/40 border border-border/70 rounded-xl text-xs">
                <span className="font-bold text-muted-foreground text-[10.5px] uppercase tracking-wider">Official Event Colors:</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#007D69] ring-2 ring-[#007D69]/30" />
                  <span className="font-semibold text-foreground">Lecture (Green)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#48BA75] ring-2 ring-[#48BA75]/30" />
                  <span className="font-semibold text-foreground">Seminar (Light Green)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#69B3E7] ring-2 ring-[#69B3E7]/30" />
                  <span className="font-semibold text-foreground">Computer Lab (Blue)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9569BE] ring-2 ring-[#9569BE]/30" />
                  <span className="font-semibold text-foreground">Drop-in (Purple)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D9383A] ring-2 ring-[#D9383A]/30" />
                  <span className="font-semibold text-foreground">Exam (Red)</span>
                </div>
              </div>

              {/* Day Header Banner */}
              {(viewMode === "day" || viewMode === "schedule") && (
                <div className="text-center py-1">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {formatDateHeading(selectedDate)}
                  </h3>
                </div>
              )}

              {/* Main Content Area */}
              {events.length === 0 ? (
                <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-muted/10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00A693]/15 text-[#00A693] flex items-center justify-center mx-auto">
                    <CalendarDays size={24} />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h3 className="font-bold text-base text-foreground">No Timetable Connected</h3>
                    <p className="text-xs text-muted-foreground">
                      Connect your personal Exeter MyTimetable iCal feed to view your live lecture, seminar, and lab schedule here.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("manage")}
                    className="px-4 py-2 bg-[#003C3C] hover:bg-[#004d4d] text-white rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Upload size={14} />
                    <span>Connect Exeter Timetable</span>
                  </button>
                </div>
              ) : (viewMode === "day" || viewMode === "schedule") ? (
                eventsForSelectedDate.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-border bg-muted/10 space-y-3">
                    <CalendarIcon size={36} className="mx-auto text-muted-foreground/50" />
                    <p className="text-sm font-medium text-muted-foreground">
                      No timetable classes scheduled for this date.
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      Use the date picker or navigation arrows above to browse your semester schedule.
                    </p>
                  </div>
                ) : viewMode === "schedule" ? (
                  /* Official MyTimetable Timeline View matching screenshot */
                  <div className="space-y-3 bg-muted/20 p-3 sm:p-4 rounded-2xl border border-border/80">
                    {eventsForSelectedDate.map(evt => {
                      const theme = getEventTheme(evt);
                      const startTime = new Date(evt.start).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      const endTime = new Date(evt.end).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      return (
                        <div
                          key={evt.uid}
                          className="border border-border/90 rounded-xl overflow-hidden shadow-xs bg-card transition-all hover:shadow-md"
                        >
                          {/* Official colored top bar */}
                          <div className={`${theme.headerBg} ${theme.darkHeaderBg} px-4 py-1.5 flex items-center justify-between`}>
                            <span className={`text-xs font-bold ${theme.headerText} ${theme.darkHeaderText}`}>
                              {startTime} - {endTime}
                            </span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${theme.badgeBg} ${theme.badgeText} ${theme.darkHeaderText} border ${theme.badgeBorder}`}>
                              {evt.activityType}
                            </span>
                          </div>

                          {/* White / card content below */}
                          <div className="px-4 py-3 bg-card space-y-1">
                            <div className="font-bold text-sm text-foreground">
                              {evt.summary}
                            </div>
                            {evt.location && (
                              <div className="text-xs text-[#5e7a88] dark:text-muted-foreground flex items-center gap-1.5">
                                <MapPin size={12} className="shrink-0 opacity-80" />
                                <span>{evt.location}</span>
                              </div>
                            )}
                            {evt.staff && (
                              <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-0.5">
                                <User size={12} className="shrink-0 opacity-80" />
                                <span>Lecturer: {evt.staff}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Day Cards View with Full Details */
                  <div className="space-y-4">
                    {eventsForSelectedDate.map(evt => {
                      const theme = getEventTheme(evt);
                      const startTime = new Date(evt.start).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      const endTime = new Date(evt.end).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      return (
                        <div
                          key={evt.uid}
                          className="border border-border rounded-2xl overflow-hidden shadow-xs bg-card transition-all"
                        >
                          {/* Colored Header matching Exeter TimeEdit colors */}
                          <div className={`${theme.headerBg} ${theme.darkHeaderBg} px-5 py-3 border-b border-black/10 flex items-center justify-between`}>
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              <FileText size={18} className={`${theme.headerText} ${theme.darkHeaderText} shrink-0`} />
                              <h4 className={`font-bold text-base ${theme.headerText} ${theme.darkHeaderText} truncate`}>
                                {evt.summary}
                              </h4>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText} ${theme.darkHeaderText} border ${theme.badgeBorder} shrink-0`}>
                              {evt.activityType}
                            </span>
                          </div>

                          {/* Event Details */}
                          <div className="p-5 space-y-3 text-sm text-foreground">
                            {/* Time */}
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <Clock size={16} className="text-[#007A6B] dark:text-[#00C4AD] shrink-0" />
                              <span className="font-medium text-foreground">
                                {startTime} – {endTime}
                              </span>
                            </div>

                            {/* Location */}
                            {evt.location && (
                              <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin size={16} className="text-[#007A6B] dark:text-[#00C4AD] shrink-0" />
                                <span className="font-medium text-foreground">{evt.location}</span>
                              </div>
                            )}

                            {/* Module */}
                            {evt.moduleCode && (
                              <div className="flex items-center gap-3 text-muted-foreground">
                                <GraduationCap size={16} className="text-[#007A6B] dark:text-[#00C4AD] shrink-0" />
                                <span className="font-mono font-semibold text-[#007A6B] dark:text-[#00C4AD]">
                                  {evt.moduleCode}
                                </span>
                              </div>
                            )}

                            {/* Staff */}
                            {evt.staff && (
                              <div className="flex items-center gap-3 text-muted-foreground">
                                <User size={16} className="text-[#007A6B] dark:text-[#00C4AD] shrink-0" />
                                <span>Lecturer: {evt.staff}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                /* Upcoming Events List */
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Next 20 Scheduled Sessions
                  </h4>
                  <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden bg-card">
                    {filteredEvents.slice(0, 20).map(evt => {
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
                          className={`p-4 hover:bg-muted/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer border-l-4 ${theme.leftBorder}`}
                          onClick={() => {
                            setSelectedDate(new Date(evt.start));
                            setViewMode("day");
                          }}
                        >
                          <div className="space-y-1">
                            <div className="font-bold text-foreground text-sm flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs text-[#007A6B] dark:text-[#00C4AD]">
                                {evt.moduleCode}
                              </span>
                              <span>{evt.summary}</span>
                              <span className={`text-[10.5px] uppercase font-bold px-2 py-0.5 rounded-full ${theme.bgLight} text-foreground border ${theme.cardBorder}`}>
                                {evt.activityType}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-3">
                              <span>{evt.location || "Streatham Campus"}</span>
                              {evt.staff && <span>· {evt.staff}</span>}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-xs font-bold text-foreground">{dateStr}</div>
                            <div className="text-xs text-[#007A6B] dark:text-[#00C4AD] font-mono font-bold">
                              {timeStr}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════ TAB 2: IMPORTED CALENDARS matching media_1788869327376.png ════════ */}
          {activeTab === "manage" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Imported calendars</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Manage your active Exeter timetable subscription feed or connect another calendar URL.
                </p>
              </div>

              {/* Active Subscriptions Card */}
              {icsUrl ? (
                <div className="border border-border rounded-2xl p-5 bg-card shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <h4 className="font-bold text-foreground text-sm">
                          University of Exeter - Active Timetable Feed
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Subscribed via Exeter MyTimetable iCal feed
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={onSyncNow}
                        disabled={loading}
                        className="h-8 px-3 rounded-lg bg-[#003C3C] text-white text-xs font-semibold hover:bg-[#004d4d] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                        <span>Sync now</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateIcsUrl("");
                          setNewIcsUrlInput("");
                        }}
                        className="h-8 px-3 rounded-lg border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors cursor-pointer"
                        title="Disconnect calendar feed"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-3 text-xs font-mono break-all text-muted-foreground border border-border/60 select-all">
                    {icsUrl}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>
                      Last synchronised:{" "}
                      <strong className="text-foreground">
                        {lastSync ? new Date(lastSync).toLocaleString("en-GB") : "Never"}
                      </strong>
                    </span>
                    <span>{events.length} active events</span>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-border rounded-2xl p-6 bg-muted/10 text-center space-y-2">
                  <p className="text-xs font-semibold text-foreground">No Calendar Feed Connected</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    You have not connected an Exeter MyTimetable feed yet. Paste your feed URL below to import your class schedule.
                  </p>
                </div>
              )}

              {/* Update Timetable URL Form */}
              <div className="border border-border rounded-2xl p-5 bg-muted/20 space-y-4">
                <h4 className="font-bold text-sm text-foreground">Import or update timetable URL</h4>
                <p className="text-xs text-muted-foreground">
                  Paste your student iCal link from MyTimetable (begins with <code>https://mytimetable.exeter.ac.uk/ical?...</code>).
                </p>

                {syncSuccessMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                    <Check size={14} />
                    <span>{syncSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSaveIcsUrl} className="space-y-3">
                  <input
                    type="url"
                    value={newIcsUrlInput}
                    onChange={e => setNewIcsUrlInput(e.target.value)}
                    placeholder="https://mytimetable.exeter.ac.uk/ical?..."
                    className="w-full h-10 px-3 rounded-xl border border-border bg-card text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-[#007A6B]"
                    required
                  />

                  <div className="flex items-center justify-between gap-3">
                    {icsUrl ? (
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateIcsUrl("");
                          setNewIcsUrlInput("");
                        }}
                        className="text-xs text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                      >
                        Disconnect calendar feed
                      </button>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">URL format: https://mytimetable.exeter.ac.uk/ical?...</span>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-[#007A6B] hover:bg-[#006e60] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Save & Synchronize
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ════════ TAB 3: EXPORT CALENDAR matching media_1788869340863.png & media_1788868957700.png ════════ */}
          {activeTab === "export" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Export calendar</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect your Exeter timetable to Outlook, Google Calendar, or Apple Calendar on your devices.
                </p>
              </div>

              {/* 1-Click Sync Buttons matching media_1788868957700.png */}
              <div className="border border-border rounded-2xl p-5 bg-card shadow-xs space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  University of Exeter One-Click Timetable Sync
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Outlook */}
                  <a
                    href={`https://outlook.office.com/calendar/0/addfromweb?url=${encodeURIComponent(
                      icsUrl
                    )}&name=Exeter+Timetable`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border border-border hover:border-[#007A6B] hover:bg-muted/40 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <div>
                        <div className="font-bold text-sm text-foreground">Microsoft Outlook</div>
                        <div className="text-[11px] text-muted-foreground">University Student Email</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground" />
                  </a>

                  {/* Google Calendar */}
                  <a
                    href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(
                      icsUrl.replace("https://", "webcal://")
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border border-border hover:border-[#007A6B] hover:bg-muted/40 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <div>
                        <div className="font-bold text-sm text-foreground">Google Calendar</div>
                        <div className="text-[11px] text-muted-foreground">Android & Web</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground" />
                  </a>

                  {/* Apple Calendar */}
                  <a
                    href={icsUrl.replace("https://", "webcal://")}
                    className="p-3.5 rounded-xl border border-border hover:border-[#007A6B] hover:bg-muted/40 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div>
                        <div className="font-bold text-sm text-foreground">Apple Calendar</div>
                        <div className="text-[11px] text-muted-foreground">iPhone, iPad & Mac</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground" />
                  </a>

                  {/* Download Raw File */}
                  <button
                    onClick={handleDownloadIcs}
                    className="p-3.5 rounded-xl border border-border hover:border-[#007A6B] hover:bg-muted/40 transition-all flex items-center justify-between group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Download size={16} className="text-[#007A6B] dark:text-[#00C4AD]" />
                      <div>
                        <div className="font-bold text-sm text-foreground">Download .ICS File</div>
                        <div className="text-[11px] text-muted-foreground">Manual import</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground" />
                  </button>
                </div>
              </div>

              {/* Copy URL Bar */}
              <div className="border border-border rounded-2xl p-5 bg-muted/20 space-y-3">
                <h4 className="font-bold text-sm text-foreground">Calendar Subscription URL</h4>
                <p className="text-xs text-muted-foreground">
                  Any new timetable updates or room changes from the university will automatically sync through this link:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={icsUrl}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-card text-xs font-mono text-muted-foreground select-all focus:outline-none"
                  />
                  <button
                    onClick={handleCopyCalendarUrl}
                    className="h-10 px-4 rounded-xl bg-[#003C3C] hover:bg-[#004d4d] text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedUrl ? <Check size={14} /> : null}
                    <span>{copiedUrl ? "Copied!" : "Get calendar URL"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-muted/30 border-t border-border px-5 sm:px-6 py-3 flex items-center justify-between shrink-0 text-xs text-muted-foreground">
          <div>© University of Exeter · MyTimetable Integration</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
