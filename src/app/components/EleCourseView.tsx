import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  GraduationCap,
  HelpCircle,
  Mail,
  Play,
  Search,
  Sparkles,
  User,
  Video,
  X,
  AlertCircle,
} from 'lucide-react';
import { Course, CourseResource, ExamPaper, PanoptoRecording } from '../../types';
import { EleGeometricPattern } from './EleGeometricPattern';
import { pairProblemSheets } from '../../services/vfs';
import { generateCandidatePapers } from '../../api/examPapers';

interface EleCourseViewProps {
  course: Course;
  onBack: () => void;
  onOpenDocument: (doc: { id: string; title: string; url: string }) => void;
  onOpenCalendarModal?: (initialTab?: 'calendar' | 'manage' | 'export') => void;
}

type TabType = 'notes' | 'sheets' | 'exams' | 'panopto';

export const EleCourseView: React.FC<EleCourseViewProps> = ({
  course,
  onBack,
  onOpenDocument,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('notes');
  const [activePanopto, setActivePanopto] = useState<PanoptoRecording | null>(null);
  const [examSessionFilter, setExamSessionFilter] = useState<'all' | 'Jan' | 'May'>('all');
  const [examSearch, setExamSearch] = useState('');

  // Flatten all course resources
  const allResources = useMemo(() => {
    return course.sections.flatMap(s => s.resources);
  }, [course]);

  // Lecture notes resources
  const noteResources = useMemo(() => {
    return allResources.filter(r => r.category === 'slide' || r.category === 'general');
  }, [allResources]);

  // Paired problem sheets (Formative)
  const pairedSheets = useMemo(() => {
    return pairProblemSheets(allResources);
  }, [allResources]);



  // Exam papers (Jan & May only - no August papers)
  const examPapers = useMemo(() => {
    const list = course.examPapers && course.examPapers.length > 0 
      ? course.examPapers 
      : generateCandidatePapers(course.code);

    return list.filter(p => {
      // Exclude August session entirely
      if (p.session === ('Aug' as any)) return false;
      
      const matchesSession = examSessionFilter === 'all' || p.session === examSessionFilter;
      const matchesQuery = !examSearch.trim() || 
        p.title.toLowerCase().includes(examSearch.toLowerCase()) || 
        p.year.includes(examSearch) ||
        p.filename.toLowerCase().includes(examSearch.toLowerCase());
      return matchesSession && matchesQuery;
    });
  }, [course, examSessionFilter, examSearch]);

  // Mock Panopto recordings if not present
  const panoptoRecordings: PanoptoRecording[] = useMemo(() => {
    if (course.recordings && course.recordings.length > 0) {
      return course.recordings;
    }
    // Clean lecture recording list
    return [
      {
        id: `${course.code}-rec-1`,
        title: `${course.code} Lecture 1: Course Overview & Foundations`,
        date: "23 Sep 2026",
        duration: "50 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?query=${course.code}`,
        embedUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?query=${course.code}&instance=MoodleELE2&autoplay=true&offerviewer=true`,
      },
      {
        id: `${course.code}-rec-2`,
        title: `${course.code} Lecture 2: Core Theory & Definitions`,
        date: "25 Sep 2026",
        duration: "49 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?query=${course.code}`,
        embedUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?query=${course.code}&instance=MoodleELE2&autoplay=true&offerviewer=true`,
      },
      {
        id: `${course.code}-rec-3`,
        title: `${course.code} Lecture 3: Worked Examples & Theorems`,
        date: "30 Sep 2026",
        duration: "52 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?query=${course.code}`,
        embedUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?query=${course.code}&instance=MoodleELE2&autoplay=true&offerviewer=true`,
      },
      {
        id: `${course.code}-rec-4`,
        title: `${course.code} Lecture 4: Problem Sheet 1 Discussion`,
        date: "02 Oct 2026",
        duration: "48 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?query=${course.code}`,
        embedUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?query=${course.code}&instance=MoodleELE2&autoplay=true&offerviewer=true`,
      },
      {
        id: `${course.code}-rec-5`,
        title: `${course.code} Lecture 5: Advanced Applications & Synthesis`,
        date: "07 Oct 2026",
        duration: "51 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?query=${course.code}`,
        embedUrl: `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?query=${course.code}&instance=MoodleELE2&autoplay=true&offerviewer=true`,
      },
    ];
  }, [course]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F9F9F9] dark:bg-background text-foreground relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Simple, Clean Back Navigation ──────────────────────────────── */}
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#007A6B] dark:text-[#00C4AD] hover:underline cursor-pointer transition-colors"
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
        </div>

        {/* ── Clean Course Header ────────────────────────────────────────── */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs relative">
          <div className="h-28 sm:h-36 relative overflow-hidden">
            <EleGeometricPattern seed={course.code} height="100%" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-[#00C4AD] text-[#003C3C] text-xs font-mono font-black uppercase tracking-wider shadow-xs">
                  {course.code}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-xs">
                {course.title}
              </h1>
            </div>
          </div>

          {/* Convenor Info Bar */}
          <div className="p-4 sm:p-5 bg-card border-t border-border flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#007A6B]/15 dark:bg-[#00C4AD]/15 text-[#007A6B] dark:text-[#00C4AD] flex items-center justify-center font-bold">
                <User size={18} />
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  {course.convenor.name}
                </div>
                <div className="text-muted-foreground text-xs flex items-center gap-3 mt-0.5">
                  <a href={`mailto:${course.convenor.email}`} className="hover:underline flex items-center gap-1 text-[#007A6B] dark:text-[#00C4AD]">
                    <Mail size={12} /> {course.convenor.email}
                  </a>
                  {course.convenor.officeHours && (
                    <span className="hidden md:inline text-muted-foreground">
                      · {course.convenor.officeHours}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 Clean Module Tabs ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 border-b border-border pb-1 overflow-x-auto scrollbar-none">
          {/* 1. Lecture Notes */}
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'notes'
                ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <BookOpen size={16} />
            <span>Lecture Notes</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
              activeTab === 'notes' ? 'bg-white/20 text-white dark:text-[#003C3C]' : 'bg-muted text-muted-foreground'
            }`}>
              {noteResources.length}
            </span>
          </button>

          {/* 2. Problem Sheets */}
          <button
            onClick={() => setActiveTab('sheets')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'sheets'
                ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <FileText size={16} />
            <span>Problem Sheets</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
              activeTab === 'sheets' ? 'bg-white/20 text-white dark:text-[#003C3C]' : 'bg-muted text-muted-foreground'
            }`}>
              {pairedSheets.length}
            </span>
          </button>

          {/* 3. Past Papers */}
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'exams'
                ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <GraduationCap size={16} />
            <span>Past Papers</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
              activeTab === 'exams' ? 'bg-white/20 text-white dark:text-[#003C3C]' : 'bg-muted text-muted-foreground'
            }`}>
              {examPapers.length}
            </span>
          </button>

          {/* 4. Panopto Recordings */}
          <button
            onClick={() => setActiveTab('panopto')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'panopto'
                ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Video size={16} />
            <span>Panopto Recordings</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
              activeTab === 'panopto' ? 'bg-white/20 text-white dark:text-[#003C3C]' : 'bg-muted text-muted-foreground'
            }`}>
              {panoptoRecordings.length}
            </span>
          </button>
        </div>

        {/* ── TAB 1: Lecture Notes (Dense Card Grid) ───────────────────────── */}
        {activeTab === 'notes' && (
          <div>
            {noteResources.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                No lecture notes uploaded yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {noteResources.map(note => (
                  <div
                    key={note.id}
                    onClick={() =>
                      onOpenDocument({
                        id: note.id,
                        title: note.name,
                        url: note.fileUrl,
                      })
                    }
                    className="group bg-card border border-border hover:border-[#007A6B] dark:hover:border-[#00C4AD] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#007A6B]/10 dark:bg-[#00C4AD]/10 text-[#007A6B] dark:text-[#00C4AD] flex items-center justify-center font-bold shrink-0">
                          <BookOpen size={16} />
                        </div>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">
                          {note.fileSize || 'PDF'}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-[#007A6B] dark:group-hover:text-[#00C4AD] transition-colors line-clamp-2">
                        {note.name}
                      </h4>
                      {note.originalSection && (
                        <p className="text-[11px] text-muted-foreground truncate mt-1">
                          {note.originalSection}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-[#007A6B] dark:text-[#00C4AD]">
                      <span>Open Note</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: Problem Sheets ─────────────────────────────────────── */}
        {activeTab === 'sheets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Exercise & Problem Sheets
              </h3>
              <span className="text-xs text-muted-foreground font-mono">
                {pairedSheets.length} available
              </span>
            </div>

              {pairedSheets.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                  No problem sheets available for this module.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {pairedSheets.map(sheet => (
                    <div
                      key={sheet.sheetNumber}
                      className="group bg-card border border-border hover:border-[#007A6B] dark:hover:border-[#00C4AD] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="w-8 h-8 rounded-lg bg-[#007A6B]/10 dark:bg-[#00C4AD]/10 text-[#007A6B] dark:text-[#00C4AD] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            #{String(sheet.sheetNumber).padStart(2, '0')}
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {sheet.solutionPaper && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                                Solutions Available
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground uppercase">
                              Formative
                            </span>
                          </div>
                        </div>
                        <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                          {sheet.title}
                        </h4>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() =>
                            onOpenDocument({
                              id: sheet.questionPaper.id,
                              title: sheet.title,
                              url: sheet.questionPaper.fileUrl,
                            })
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-[#007A6B]/15 hover:bg-[#007A6B]/25 text-[#007A6B] dark:text-[#00C4AD] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Open Sheet</span>
                          <span>→</span>
                        </button>

                        {sheet.solutionPaper && (
                          <button
                            type="button"
                            onClick={() =>
                              onOpenDocument({
                                id: sheet.solutionPaper!.id,
                                title: `${sheet.title} – Solutions`,
                                url: sheet.solutionPaper!.fileUrl,
                              })
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Open solutions PDF"
                          >
                            <FileCheck2 size={12} />
                            <span>Solutions</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}

        {/* ── TAB 3: Past Papers (Grid, No Aug, No Solutions) ─────────────── */}
        {activeTab === 'exams' && (
          <div className="space-y-4">
            {/* Session filter chips & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {(['all', 'Jan', 'May'] as const).map(session => (
                  <button
                    key={session}
                    type="button"
                    onClick={() => setExamSessionFilter(session)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      examSessionFilter === session
                        ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C]'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {session === 'all' ? 'All Sessions' : `${session} Exams`}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter by year or paper..."
                  value={examSearch}
                  onChange={e => setExamSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#007A6B] dark:focus:border-[#00C4AD]"
                />
              </div>
            </div>

            {/* Papers Grid */}
            {examPapers.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                No past exam papers found for this session.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {examPapers.map(paper => (
                  <div
                    key={paper.id}
                    onClick={() =>
                      onOpenDocument({
                        id: paper.id,
                        title: paper.title,
                        url: paper.pdfUrl,
                      })
                    }
                    className="group bg-card border border-border hover:border-[#007A6B] dark:hover:border-[#00C4AD] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded bg-[#007A6B]/10 dark:bg-[#00C4AD]/10 text-[#007A6B] dark:text-[#00C4AD] font-mono font-bold text-xs uppercase">
                          {paper.session} {paper.year}
                        </span>
                        <GraduationCap size={16} className="text-muted-foreground group-hover:text-[#007A6B] dark:group-hover:text-[#00C4AD] transition-colors" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-[#007A6B] dark:group-hover:text-[#00C4AD] transition-colors line-clamp-2">
                        {paper.title}
                      </h4>
                      <p className="text-[11px] font-mono text-muted-foreground mt-1">
                        {paper.filename}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-[#007A6B] dark:text-[#00C4AD]">
                      <span>Open Paper</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 4: Panopto Recordings (Grid & Player) ───────────────────── */}
        {activeTab === 'panopto' && (
          <div className="space-y-4">
            {/* Active Panopto In-App Player */}
            {activePanopto && (
              <div className="bg-[#0A0A0A] border border-border rounded-2xl overflow-hidden shadow-2xl transition-all">
                <div className="p-3.5 bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5 text-white min-w-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00C4AD] animate-pulse shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold truncate">{activePanopto.title}</span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00C4AD]/20 text-[#00C4AD]">
                      Multi-Source Interactive
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={activePanopto.panoptoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-[#007A6B] hover:bg-[#006a5d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                      title="Open full interactive multi-source viewer in new tab"
                    >
                      <span>Full Multi-Source Portal</span>
                      <ExternalLink size={12} />
                    </a>
                    <button
                      type="button"
                      onClick={() => setActivePanopto(null)}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="Close Player"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={
                      activePanopto.embedUrl?.includes('interactivity=all')
                        ? activePanopto.embedUrl
                        : `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=${activePanopto.id}&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true`
                    }
                    title={activePanopto.title}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 bg-card border border-border rounded-xl p-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Video size={16} className="text-[#007A6B] dark:text-[#00C4AD]" />
                <span>Exeter Panopto Video Portal ({panoptoRecordings.length} recordings available)</span>
              </div>
              <a
                href={course.panoptoFolderUrl || `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#query=${course.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#007A6B] text-white text-xs font-semibold flex items-center gap-1 hover:bg-[#006a5d] transition-colors"
              >
                <span>Open Panopto Folder</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Recordings Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {panoptoRecordings.map(rec => {
                const isCurrentActive = activePanopto?.id === rec.id;
                return (
                  <div
                    key={rec.id}
                    className={`bg-card border rounded-xl p-4 shadow-xs transition-all flex flex-col justify-between ${
                      isCurrentActive
                        ? 'border-[#007A6B] dark:border-[#00C4AD] ring-1 ring-[#007A6B] dark:ring-[#00C4AD]'
                        : 'border-border hover:border-[#007A6B] dark:hover:border-[#00C4AD]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                          <Clock size={11} /> {rec.duration}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {rec.date}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                        {rec.title}
                      </h4>

                      {rec.lecturer && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2">
                          <User size={12} />
                          <span className="truncate">{rec.lecturer}</span>
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setActivePanopto(rec)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isCurrentActive
                            ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C]'
                            : 'bg-[#007A6B]/15 hover:bg-[#007A6B]/25 text-[#007A6B] dark:text-[#00C4AD]'
                        }`}
                      >
                        <Play size={12} fill="currentColor" />
                        <span>Watch in App</span>
                      </button>

                      <a
                        href={rec.panoptoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Open in Panopto Web Portal"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
