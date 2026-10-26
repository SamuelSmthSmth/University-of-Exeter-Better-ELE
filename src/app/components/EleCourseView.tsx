import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  User,
  Video,
  Clock,
  Columns,
  Play,
  X,
} from 'lucide-react';
import { Course, CourseResource, ExamPaper, PanoptoRecording } from '../../types';
import { EleGeometricPattern } from './EleGeometricPattern';
import { pairProblemSheets } from '../../services/vfs';
import { generateCandidatePapers } from '../../api/examPapers';

interface EleCourseViewProps {
  course: Course;
  onBack: () => void;
  onOpenDocument: (doc: { id: string; title: string; url: string }) => void;
  onOpenDualDocuments?: (
    doc1: { id: string; title: string; url: string },
    doc2: { id: string; title: string; url: string }
  ) => void;
  onOpenCalendarModal?: (initialTab?: 'calendar' | 'manage' | 'export') => void;
}

type TabType = 'notes' | 'sheets' | 'exams' | 'panopto';

export const EleCourseView: React.FC<EleCourseViewProps> = ({
  course,
  onBack,
  onOpenDocument,
  onOpenDualDocuments,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('notes');
  const [activePanopto, setActivePanopto] = useState<PanoptoRecording | null>(null);
  const [examSessionFilter, setExamSessionFilter] = useState<'all' | 'Jan' | 'May' | 'Aug'>('all');
  const [examSearch, setExamSearch] = useState('');

  // Flatten all course resources
  const allResources = useMemo(() => {
    return course.sections.flatMap(s => s.resources);
  }, [course]);

  // Lecture notes resources
  const noteResources = useMemo(() => {
    return allResources.filter(r => r.category === 'slide' || r.category === 'general');
  }, [allResources]);

  // Paired problem sheets
  const pairedSheets = useMemo(() => {
    return pairProblemSheets(allResources);
  }, [allResources]);

  // Exam papers (from course or auto-generated candidate papers)
  const examPapers = useMemo(() => {
    const list = course.examPapers && course.examPapers.length > 0 
      ? course.examPapers 
      : generateCandidatePapers(course.code);

    return list.filter(p => {
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
    // Generate clean lecture recording list
    return [
      {
        id: `${course.code}-rec-1`,
        title: `${course.code} Lecture 1: Course Overview & Foundations`,
        date: "23 Sep 2026",
        duration: "50 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://exeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#query=${course.code}`,
      },
      {
        id: `${course.code}-rec-2`,
        title: `${course.code} Lecture 2: Core Theory & Definitions`,
        date: "25 Sep 2026",
        duration: "49 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://exeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#query=${course.code}`,
      },
      {
        id: `${course.code}-rec-3`,
        title: `${course.code} Lecture 3: Worked Examples & Theorems`,
        date: "30 Sep 2026",
        duration: "52 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://exeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#query=${course.code}`,
      },
      {
        id: `${course.code}-rec-4`,
        title: `${course.code} Lecture 4: Problem Sheet 1 Discussion`,
        date: "02 Oct 2026",
        duration: "48 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://exeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#query=${course.code}`,
      },
      {
        id: `${course.code}-rec-5`,
        title: `${course.code} Lecture 5: Advanced Applications & Synthesis`,
        date: "07 Oct 2026",
        duration: "51 mins",
        lecturer: course.convenor.name,
        panoptoUrl: `https://exeter.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#query=${course.code}`,
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

        {/* ── TAB 1: Lecture Notes ────────────────────────────────────────── */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            {noteResources.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                No lecture notes uploaded yet.
              </div>
            ) : (
              noteResources.map(note => (
                <div
                  key={note.id}
                  className="bg-card border border-border rounded-xl p-4 shadow-xs hover:border-[#007A6B] dark:hover:border-[#00C4AD] transition-all flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#007A6B]/10 dark:bg-[#00C4AD]/10 text-[#007A6B] dark:text-[#00C4AD] flex items-center justify-center shrink-0">
                      <BookOpen size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {note.name}
                      </h4>
                      {note.fileSize && (
                        <p className="text-xs text-muted-foreground">{note.fileSize}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenDocument({
                          id: note.id,
                          title: note.name,
                          url: note.fileUrl,
                        })
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-[#007A6B] hover:bg-[#006a5d] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Open Note
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── TAB 2: Problem Sheets ───────────────────────────────────────── */}
        {activeTab === 'sheets' && (
          <div className="space-y-3">
            {pairedSheets.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                No problem sheets available for this module.
              </div>
            ) : (
              pairedSheets.map(sheet => {
                const hasSol = !!sheet.solutionPaper;
                return (
                  <div
                    key={sheet.sheetNumber}
                    className="bg-card border border-border rounded-xl p-4 shadow-xs hover:border-[#007A6B] dark:hover:border-[#00C4AD] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted text-[#007A6B] dark:text-[#00C4AD] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        #{sheet.sheetNumber}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">
                          {sheet.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenDocument({
                            id: sheet.questionPaper.id,
                            title: sheet.title,
                            url: sheet.questionPaper.fileUrl,
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Open Sheet
                      </button>

                      {hasSol && onOpenDualDocuments && (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenDualDocuments(
                              {
                                id: sheet.questionPaper.id,
                                title: `${sheet.title} (Sheet)`,
                                url: sheet.questionPaper.fileUrl,
                              },
                              {
                                id: sheet.solutionPaper!.id,
                                title: `${sheet.title} (Solution)`,
                                url: sheet.solutionPaper!.fileUrl,
                              }
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-[#007A6B] hover:bg-[#006a5d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Columns size={13} />
                          <span>Split with Solution</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── TAB 3: Past Papers ─────────────────────────────────────────── */}
        {activeTab === 'exams' && (
          <div className="space-y-4">
            {/* Session filter chips */}
            <div className="flex items-center gap-2">
              {(['all', 'Jan', 'May', 'Aug'] as const).map(session => (
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

            <div className="space-y-3">
              {examPapers.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                  No past exam papers found for this session.
                </div>
              ) : (
                examPapers.map(paper => (
                  <div
                    key={paper.id}
                    className="bg-card border border-border rounded-xl p-4 shadow-xs hover:border-[#007A6B] dark:hover:border-[#00C4AD] transition-all flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex items-center gap-3">
                      <span className="px-2 py-1 rounded bg-[#007A6B]/10 dark:bg-[#00C4AD]/10 text-[#007A6B] dark:text-[#00C4AD] font-mono font-bold text-xs">
                        {paper.session} {paper.year}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">
                          {paper.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenDocument({
                            id: paper.id,
                            title: paper.title,
                            url: paper.pdfUrl,
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Open Paper
                      </button>

                      {paper.hasSolution && paper.solutionUrl && onOpenDualDocuments && (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenDualDocuments(
                              {
                                id: paper.id,
                                title: `${paper.year} Exam`,
                                url: paper.pdfUrl,
                              },
                              {
                                id: `${paper.id}-sol`,
                                title: `${paper.year} Solution`,
                                url: paper.solutionUrl!,
                              }
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-[#007A6B] hover:bg-[#006a5d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Columns size={13} />
                          <span>Split with Solution</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── TAB 4: Panopto Recordings ───────────────────────────────────── */}
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
                      Multi-Stream Synced
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={activePanopto.panoptoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open in Panopto Portal</span>
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
                      activePanopto.embedUrl ||
                      `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=${activePanopto.id}&instance=MoodleELE2&autoplay=true&offerviewer=true`
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

            <div className="space-y-3">
              {panoptoRecordings.map(rec => {
                const isCurrentActive = activePanopto?.id === rec.id;
                return (
                  <div
                    key={rec.id}
                    className={`bg-card border rounded-xl p-4 shadow-xs transition-all flex items-center justify-between gap-4 ${
                      isCurrentActive
                        ? 'border-[#007A6B] dark:border-[#00C4AD] ring-1 ring-[#007A6B] dark:ring-[#00C4AD]'
                        : 'border-border hover:border-[#007A6B] dark:hover:border-[#00C4AD]'
                    }`}
                  >
                    <div className="min-w-0 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#007A6B]/10 dark:bg-[#00C4AD]/10 text-[#007A6B] dark:text-[#00C4AD] flex items-center justify-center shrink-0">
                        <Play size={16} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1"><Clock size={11} /> {rec.duration}</span>
                          <span>•</span>
                          <span>{rec.date}</span>
                          {rec.lecturer && <span>• {rec.lecturer}</span>}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setActivePanopto(rec)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isCurrentActive
                            ? 'bg-[#007A6B] dark:bg-[#00C4AD] text-white dark:text-[#003C3C]'
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
