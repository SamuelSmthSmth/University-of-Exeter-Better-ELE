import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Mail,
  Maximize2,
  Paperclip,
  Search,
  Share2,
  Sparkles,
  User,
  CheckCircle,
  AlertCircle,
  Columns,
  PlaySquare,
  FileCheck,
  Building,
  RotateCw
} from 'lucide-react';
import { Course, CourseResource, CourseSection, PairedProblemSheet, ExamPaper } from '../../types';
import { EleGeometricPattern } from './EleGeometricPattern';
import { pairProblemSheets, combineSlidePdfs } from '../../services/vfs';
import { generateCandidatePapers } from '../../api/examPapers';

interface EleCourseViewProps {
  course: Course;
  onBack: () => void;
  onOpenPdf: (url: string, title: string, secondaryUrl?: string, secondaryTitle?: string) => void;
  onOpenCalendarModal?: (initialTab?: 'calendar' | 'manage' | 'export') => void;
}

export const EleCourseView: React.FC<EleCourseViewProps> = ({
  course,
  onBack,
  onOpenPdf,
  onOpenCalendarModal,
}) => {
  const [activeTab, setActiveTab] = useState<'sheets' | 'exams' | 'slides' | 'deadlines'>('sheets');
  const [examSessionFilter, setExamSessionFilter] = useState<'all' | 'Jan' | 'May' | 'Aug'>('all');
  const [examSearch, setExamSearch] = useState('');
  const [isCombiningSlides, setIsCombiningSlides] = useState(false);
  const [combineProgress, setCombineProgress] = useState<string | null>(null);

  // Flatten all course resources
  const allResources = useMemo(() => {
    return course.sections.flatMap(s => s.resources);
  }, [course]);

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

  // Slide resources
  const slideResources = useMemo(() => {
    return allResources.filter(r => r.category === 'slide');
  }, [allResources]);

  // Combine slides handler
  const handleCombineAllSlides = async () => {
    if (slideResources.length === 0) return;
    try {
      setIsCombiningSlides(true);
      setCombineProgress('Generating combined lecture slides deck...');
      const combinedBlobUrl = await combineSlidePdfs(slideResources);
      setCombineProgress(null);
      setIsCombiningSlides(false);
      onOpenPdf(combinedBlobUrl, `${course.code} - Complete Lecture Slides (Combined)`);
    } catch (err) {
      console.error('Failed to combine slides:', err);
      setIsCombiningSlides(false);
      setCombineProgress(null);
      alert('Could not combine all slides automatically. Individual slide PDFs can still be viewed directly.');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F9F9F9] dark:bg-background text-foreground relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Breadcrumbs & Back Navigation ──────────────────────────────── */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 font-bold text-[#007A6B] dark:text-[#00C4AD] hover:underline cursor-pointer transition-colors"
            >
              <ArrowLeft size={16} /> Dashboard
            </button>
            <span>/</span>
            <span className="hover:text-foreground cursor-pointer" onClick={onBack}>My courses</span>
            <span>/</span>
            <span>{course.academicYear}</span>
            <span>/</span>
            <span className="font-semibold text-foreground font-mono">{course.code}</span>
          </div>

          <a
            href={`https://ele.exeter.ac.uk/course/view.php?name=${course.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground shadow-2xs transition-colors"
          >
            <span>Official ELE</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>

        {/* ── Course Hero Banner ─────────────────────────────────────────── */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs relative">
          <div className="h-32 sm:h-44 relative overflow-hidden">
            <EleGeometricPattern seed={course.code} height="100%" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-end justify-between gap-4 text-white">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#00C4AD] text-[#003C3C] text-xs font-mono font-black uppercase tracking-wider shadow-xs">
                    {course.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-white text-xs font-medium">
                    {course.term}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-white text-xs font-medium">
                    Stage {course.stage} · {course.credits} Credits
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-xs">
                  {course.title}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCombineAllSlides}
                  disabled={isCombiningSlides || slideResources.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-50"
                  title="Combine all lecture slide decks into a single PDF document"
                >
                  <Layers size={14} />
                  <span>{isCombiningSlides ? 'Combining Slides...' : 'Combine All Slides'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Convenor & Quick Meta Bar */}
          <div className="p-4 sm:p-5 bg-card/90 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#007A6B]/15 dark:bg-[#00C4AD]/15 text-[#007A6B] dark:text-[#00C4AD] flex items-center justify-center font-bold">
                <User size={20} />
              </div>
              <div>
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <span>{course.convenor.name}</span>
                  <span className="text-[11px] font-normal text-muted-foreground">(Module Convenor)</span>
                </div>
                <div className="text-muted-foreground text-xs flex items-center gap-3 mt-0.5">
                  <a href={`mailto:${course.convenor.email}`} className="hover:underline flex items-center gap-1 text-[#007A6B] dark:text-[#00C4AD]">
                    <Mail size={12} /> {course.convenor.email}
                  </a>
                  {course.convenor.officeHours && (
                    <span className="hidden md:inline text-muted-foreground">
                      · Office Hours: {course.convenor.officeHours}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-xl border border-border">
                <CheckCircle size={14} className="text-emerald-500" />
                <span>{course.progressPercentage}% Term Progress</span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-xl border border-border">
                <Building size={14} className="text-[#007A6B] dark:text-[#00C4AD]" />
                <span>Exeter Library Archive Linked</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation Tabs ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 border-b border-border pb-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('sheets')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'sheets'
                ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <BookOpen size={16} />
            <span>Problem Sheets & Solutions</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
              activeTab === 'sheets' ? 'bg-white/20 text-white dark:text-[#003C3C]' : 'bg-muted text-muted-foreground'
            }`}>
              {pairedSheets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('exams')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'exams'
                ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <GraduationCap size={16} />
            <span>Past Exam Papers</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
              activeTab === 'exams' ? 'bg-white/20 text-white dark:text-[#003C3C]' : 'bg-muted text-muted-foreground'
            }`}>
              {examPapers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'slides'
                ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <PlaySquare size={16} />
            <span>Lecture Slides & Content</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
              activeTab === 'slides' ? 'bg-white/20 text-white dark:text-[#003C3C]' : 'bg-muted text-muted-foreground'
            }`}>
              {slideResources.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deadlines')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'deadlines'
                ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Calendar size={16} />
            <span>Assessments & Deadlines</span>
            {(course.deadlines?.length || 0) > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono ${
                activeTab === 'deadlines' ? 'bg-white/20 text-white dark:text-[#003C3C]' : 'bg-rose-500/20 text-rose-500'
              }`}>
                {course.deadlines?.length}
              </span>
            )}
          </button>
        </div>

        {/* ── TAB 1: Problem Sheets & Solutions (Smart Pairing) ─────────────── */}
        {activeTab === 'sheets' && (
          <div className="space-y-4">
            <div className="bg-[#E2EDE5] dark:bg-[#003C3C]/30 border border-[#D0E1D4] dark:border-[#005c5c] rounded-2xl p-4 text-xs sm:text-sm text-[#1D2125] dark:text-[#E8F5F3] flex items-start gap-3">
              <Sparkles size={18} className="text-[#007A6B] dark:text-[#00C4AD] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#155724] dark:text-[#4ade80]">Intelligent Solution Pairing:</span>{' '}
                Better ELE automatically links problem sheets with their corresponding worked solutions. Click{' '}
                <strong>Split Screen View</strong> on any sheet to view the question and solution side-by-side with OLED Dark Mode!
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {pairedSheets.map(sheet => {
                const hasSol = !!sheet.solutionPaper;
                return (
                  <div
                    key={sheet.sheetNumber}
                    className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#007A6B] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#007A6B]/10 dark:bg-[#00C4AD]/10 text-[#007A6B] dark:text-[#00C4AD] flex items-center justify-center font-bold font-mono shrink-0">
                        #{sheet.sheetNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-foreground text-sm sm:text-base">
                            {sheet.title}
                          </h3>
                          {hasSol ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-bold border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle size={10} /> Solutions Released
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10.5px] font-bold border border-amber-500/20">
                              Solutions Pending Release
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Problem Sheet PDF {hasSol ? '· Worked Solutions PDF attached' : '· Solutions will be posted after seminar'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap self-end md:self-center">
                      {/* Split Screen Button */}
                      {hasSol && (
                        <button
                          onClick={() => onOpenPdf(
                            sheet.questionPaper.fileUrl,
                            sheet.questionPaper.name,
                            sheet.solutionPaper!.fileUrl,
                            sheet.solutionPaper!.name
                          )}
                          className="px-3.5 py-2 rounded-xl bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] text-xs font-bold flex items-center gap-1.5 shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                          title="Open Question Paper and Solution side-by-side in split view"
                        >
                          <Columns size={14} />
                          <span>Split Screen View</span>
                        </button>
                      )}

                      {/* Open Question */}
                      <button
                        onClick={() => onOpenPdf(sheet.questionPaper.fileUrl, sheet.questionPaper.name)}
                        className="px-3 py-2 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FileText size={14} className="text-[#007A6B] dark:text-[#00C4AD]" />
                        <span>Question Sheet</span>
                      </button>

                      {/* Open Solution */}
                      {hasSol && (
                        <button
                          onClick={() => onOpenPdf(sheet.solutionPaper!.fileUrl, sheet.solutionPaper!.name)}
                          className="px-3 py-2 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <CheckCircle size={14} className="text-emerald-500" />
                          <span>Solution PDF</span>
                        </button>
                      )}

                      <a
                        href={sheet.questionPaper.fileUrl}
                        download
                        className="p-2 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Download Question Sheet"
                      >
                        <Download size={15} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 2: Past Exam Papers (Exeter Library Archive) ──────────────── */}
        {activeTab === 'exams' && (
          <div className="space-y-4">
            {/* Filter controls bar */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Session Filter Chips */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto scrollbar-none">
                {[
                  { label: 'All Sessions', value: 'all' },
                  { label: 'January Exams', value: 'Jan' },
                  { label: 'May/June Exams', value: 'May' },
                  { label: 'August Referrals', value: 'Aug' },
                ].map(chip => (
                  <button
                    key={chip.value}
                    onClick={() => setExamSessionFilter(chip.value as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      examSessionFilter === chip.value
                        ? 'bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] shadow-2xs'
                        : 'bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Search Past Papers */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={examSearch}
                  onChange={e => setExamSearch(e.target.value)}
                  placeholder="Search year or filename..."
                  className="w-full pl-8 pr-3 py-1.5 bg-muted/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#007A6B]"
                />
              </div>
            </div>

            {/* Past papers list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examPapers.map(paper => (
                <div
                  key={paper.id}
                  className="bg-card border border-border rounded-2xl p-4 shadow-xs hover:border-[#007A6B] hover:shadow-sm transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#007A6B] dark:text-[#00C4AD] bg-[#007A6B]/10 dark:bg-[#00C4AD]/10 px-2 py-0.5 rounded-md">
                        {paper.year}
                      </span>
                      <span className="text-[11px] font-semibold text-muted-foreground">
                        {paper.session === 'Jan' ? 'January Exam' : paper.session === 'May' ? 'May/June' : 'August Session'}
                      </span>
                    </div>

                    <h4 className="font-bold text-foreground text-sm group-hover:text-[#007A6B] dark:group-hover:text-[#00C4AD] transition-colors line-clamp-1">
                      {paper.title}
                    </h4>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5 truncate">
                      {paper.filename}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenPdf(paper.pdfUrl, `${course.code} - ${paper.title}`)}
                      className="flex-1 py-1.5 px-3 bg-[#003C3C] dark:bg-[#00C4AD] text-white dark:text-[#003C3C] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:opacity-90 transition-all cursor-pointer"
                    >
                      <BookOpen size={13} />
                      <span>Open in Reader</span>
                    </button>

                    <a
                      href={`https://library.exeter.ac.uk/exampapers/viewpdf.php?filename=${encodeURIComponent(paper.filename)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Open directly from Exeter Library Archive"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: Lecture Slides & Course Content ──────────────────────── */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            {/* Combine Banner */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#007A6B]/15 dark:bg-[#00C4AD]/15 text-[#007A6B] dark:text-[#00C4AD] flex items-center justify-center shrink-0">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm sm:text-base">
                    Combine All Lecture Slides into One Master Deck
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Merge all {slideResources.length} lecture presentations into a unified PDF file for seamless offline reading and revision.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCombineAllSlides}
                disabled={isCombiningSlides || slideResources.length === 0}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#007A6B] hover:bg-[#006e60] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-50"
              >
                <Layers size={14} />
                <span>{isCombiningSlides ? 'Processing PDF...' : 'Combine All Slides'}</span>
              </button>
            </div>

            {/* Sections & Resource Tree */}
            <div className="space-y-4">
              {course.sections.map(section => (
                <div key={section.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
                  <div className="px-5 py-3.5 bg-muted/40 border-b border-border flex items-center justify-between">
                    <h3 className="font-bold text-foreground text-sm">
                      {section.title}
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {section.resources.length} resources
                    </span>
                  </div>

                  <div className="divide-y divide-border">
                    {section.resources.map(res => (
                      <div
                        key={res.id}
                        className="p-4 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-xl bg-muted text-[#007A6B] dark:text-[#00C4AD] shrink-0 mt-0.5">
                            {res.category === 'slide' ? <PlaySquare size={16} /> : <FileText size={16} />}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground text-xs sm:text-sm">
                              {res.name}
                            </div>
                            <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                              <span className="uppercase font-mono font-medium">{res.category}</span>
                              {res.fileSize && <span>· {res.fileSize}</span>}
                              {res.timeModified && <span>· Updated {res.timeModified}</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => onOpenPdf(res.fileUrl, res.name)}
                            className="px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <BookOpen size={13} className="text-[#007A6B] dark:text-[#00C4AD]" />
                            <span>View</span>
                          </button>

                          <a
                            href={res.fileUrl}
                            download
                            className="p-1.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            title="Download file"
                          >
                            <Download size={14} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: Assessments & Deadlines (Official Submission Guard) ───── */}
        {activeTab === 'deadlines' && (
          <div className="space-y-4">
            <div className="bg-[#FFF4E5] dark:bg-amber-950/20 border border-[#FFE2B8] dark:border-amber-900/40 rounded-2xl p-4 text-xs sm:text-sm text-[#7A4B00] dark:text-amber-200 flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Official Examination & Submission Guard:</span>{' '}
                For examination integrity, official coursework submissions and e-tests must be completed through the University of Exeter's verified Moodle portal. Better ELE provides direct, authenticated handoffs to the exact submission point.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {(course.deadlines || []).map(deadline => {
                const dueDate = new Date(deadline.dueDate);
                const isOverdue = dueDate.getTime() < Date.now();
                const daysRemaining = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

                return (
                  <div
                    key={deadline.id}
                    className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold border border-rose-500/20">
                          {deadline.weighting ? `${deadline.weighting}% of Module` : 'Assessment'}
                        </span>
                        <span className={`text-xs font-semibold ${
                          daysRemaining <= 3 ? 'text-rose-500' : 'text-muted-foreground'
                        }`}>
                          {isOverdue ? 'Passed' : `Due in ${daysRemaining} days`}
                        </span>
                      </div>

                      <h3 className="font-bold text-foreground text-base">
                        {deadline.title}
                      </h3>
                      {deadline.description && (
                        <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                          {deadline.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-[#007A6B] dark:text-[#00C4AD]" />
                          {dueDate.toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end md:self-center">
                      <a
                        href={deadline.officialSubmissionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#007A6B] hover:bg-[#006e60] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
                      >
                        <span>Submit on Official ELE</span>
                        <ExternalLink size={13} />
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
