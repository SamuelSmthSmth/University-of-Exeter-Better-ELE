import React, { useState, useEffect } from 'react';
import { Course, CourseResource, ExamPaper, PairedProblemSheet } from '../types';
import { pairProblemSheets, combinePdfSlides } from '../services/vfs';
import { discoverAvailableExamPapers } from '../api/examPapers';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Layers,
  Sparkles,
  Columns,
  Search,
  Calendar,
  AlertCircle,
  FileArchive,
  RefreshCw,
  Mail,
  UserCheck
} from 'lucide-react';

interface CourseViewProps {
  course: Course;
  onBack: () => void;
  onOpenPdf: (url: string, title: string, secondaryUrl?: string, secondaryTitle?: string) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({ course, onBack, onOpenPdf }) => {
  const [activeTab, setActiveTab] = useState<'slides' | 'sheets' | 'exams' | 'assignments' | 'raw'>('sheets');
  const [examPapers, setExamPapers] = useState<ExamPaper[]>(course.examPapers || []);
  const [isScanningExams, setIsScanningExams] = useState<boolean>(false);
  const [isCombiningPdf, setIsCombiningPdf] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collect all resources flat
  const allResources = course.sections.flatMap(s => s.resources);
  const slides = allResources.filter(r => r.category === 'slide');
  const pairedSheets = pairProblemSheets(allResources);

  // Scan Exeter library archive for past papers on mount if empty
  useEffect(() => {
    if (!course.examPapers || course.examPapers.length === 0) {
      handleScanLibraryPapers();
    }
  }, [course.code]);

  const handleScanLibraryPapers = async () => {
    setIsScanningExams(true);
    try {
      const verified = await discoverAvailableExamPapers(course.code);
      if (verified.length > 0) {
        setExamPapers(verified);
      }
    } catch (err) {
      console.warn("Exam paper discovery failed:", err);
    } finally {
      setIsScanningExams(false);
    }
  };

  const handleCombineAllSlides = async () => {
    if (slides.length === 0) return;
    setIsCombiningPdf(true);
    try {
      const urls = slides.map(s => s.fileUrl);
      const mergedBytes = await combinePdfSlides(urls);
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      onOpenPdf(blobUrl, `${course.code} - Combined Term Lecture Slides.pdf`);
    } catch (err) {
      console.error("PDF merge failed:", err);
    } finally {
      setIsCombiningPdf(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#051414] text-slate-100 overflow-y-auto">
      {/* Top Navigation Breadcrumb */}
      <div className="h-14 border-b border-[#0f2e2e] bg-[#071d1d]/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#00A693]" />
          <span>Back to Enrolled Modules</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href={`https://ele.exeter.ac.uk/course/view.php?id=${course.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0b2626] border border-[#163a3a] text-slate-200 hover:text-white hover:bg-[#133838] transition-colors"
          >
            <span>Open in Official ELE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Module Hero Banner */}
      <div className="p-6 md:p-8 border-b border-[#0f2e2e] bg-gradient-to-b from-[#082424] to-[#051414] relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono tracking-wider bg-[#00A693]/20 border border-[#00A693]/40 text-[#00C4AD]">
                {course.code}
              </span>
              <span className="text-xs text-slate-400">Stage {course.stage} • {course.credits} Credits</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">{course.term}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-3">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#00A693]" />
                <span className="font-medium text-white">{course.convenor.name}</span>
              </div>
              <a
                href={`mailto:${course.convenor.email}`}
                className="flex items-center gap-1.5 text-slate-400 hover:text-[#00C4AD] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{course.convenor.email}</span>
              </a>
              {course.convenor.officeHours && (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.convenor.officeHours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleCombineAllSlides}
              disabled={isCombiningPdf || slides.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#00A693] hover:bg-[#00C4AD] text-[#051414] shadow-lg shadow-[#00A693]/20 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isCombiningPdf ? 'Stitching Slides...' : 'Combine All Slides to PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-b border-[#0f2e2e] bg-[#071d1d] sticky top-14 z-10 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto gap-4">
          <nav className="flex space-x-1 py-2">
            {[
              { id: 'sheets', label: 'Problem Sheets & Solutions', icon: BookOpen, count: pairedSheets.length },
              { id: 'exams', label: 'Past Exam Papers', icon: FileArchive, count: examPapers.length },
              { id: 'slides', label: 'Lecture Slides', icon: Layers, count: slides.length },
              { id: 'assignments', label: 'Coursework & Deadlines', icon: AlertCircle, count: course.deadlines?.length || 0 },
              { id: 'raw', label: 'Original Lecturer View', icon: FileText, count: course.sections.length },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#003C3C] text-[#00C4AD] border border-[#00A693]/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0b2626]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-[#00A693] text-black font-bold' : 'bg-[#102d2d] text-slate-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full">
        {/* 1. Problem Sheets & Solutions Tab */}
        {activeTab === 'sheets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Paired Problem Sheets</h3>
                <p className="text-xs text-slate-400">Questions and corresponding worked solutions side-by-side.</p>
              </div>
            </div>

            {pairedSheets.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-[#163a3a] rounded-2xl bg-[#061717]">
                <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <p className="text-sm text-slate-400">No problem sheets identified for this module yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {pairedSheets.map(sheet => (
                  <div
                    key={sheet.sheetNumber}
                    className="p-5 rounded-2xl border border-[#0f2e2e] bg-[#071e1e] hover:border-[#1c4d4d] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#00A693]/15 text-[#00C4AD] border border-[#00A693]/30 flex items-center justify-center font-bold text-sm shrink-0">
                        #{sheet.sheetNumber}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{sheet.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                          <span>{sheet.questionPaper.fileSize || 'PDF'}</span>
                          <span>•</span>
                          <span>Section: {sheet.questionPaper.originalSection}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* View Question Paper */}
                      <button
                        onClick={() => onOpenPdf(sheet.questionPaper.fileUrl, sheet.title)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0b2626] border border-[#163a3a] text-slate-200 hover:text-white hover:bg-[#133838] transition-colors"
                      >
                        Questions
                      </button>

                      {/* View Solution Paper (if available) */}
                      {sheet.solutionPaper ? (
                        <>
                          <button
                            onClick={() => onOpenPdf(sheet.solutionPaper!.fileUrl, `${sheet.title} (Solutions)`)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                          >
                            Solutions
                          </button>

                          {/* Split-Screen: Both at once! */}
                          <button
                            onClick={() =>
                              onOpenPdf(
                                sheet.questionPaper.fileUrl,
                                sheet.title,
                                sheet.solutionPaper!.fileUrl,
                                `${sheet.title} (Worked Solutions)`
                              )
                            }
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#003C3C] border border-[#00A693] text-[#00C4AD] hover:bg-[#004f4f] transition-all"
                            title="Open questions on the left and solutions on the right"
                          >
                            <Columns className="w-3.5 h-3.5" />
                            <span>Split-Screen View</span>
                          </button>
                        </>
                      ) : (
                        <span className="px-3 py-1.5 text-xs text-slate-500 italic">
                          Solutions pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. Past Exam Papers Tab */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">University of Exeter Past Exam Papers</h3>
                <p className="text-xs text-slate-400">
                  Archived from <code className="text-[#00C4AD]">library.exeter.ac.uk/exampapers</code>.
                </p>
              </div>

              <button
                onClick={handleScanLibraryPapers}
                disabled={isScanningExams}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0b2626] border border-[#163a3a] text-slate-200 hover:text-white hover:bg-[#133838] transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanningExams ? 'animate-spin text-[#00A693]' : ''}`} />
                <span>{isScanningExams ? 'Probing Library Archive...' : 'Rescan Library Papers'}</span>
              </button>
            </div>

            {examPapers.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-[#163a3a] rounded-2xl bg-[#061717]">
                <FileArchive className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <p className="text-sm text-slate-400">Scanning the library archive for {course.code} past papers...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {examPapers.map(paper => (
                  <div
                    key={paper.id}
                    className="p-5 rounded-2xl border border-[#0f2e2e] bg-[#071e1e] hover:border-[#00A693]/50 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#00A693]/15 text-[#00C4AD]">
                          {paper.year}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {paper.session} Session
                        </span>
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-1">{paper.title}</h4>
                      <p className="text-xs text-slate-400 font-mono">{paper.filename}</p>
                    </div>

                    <div className="pt-4 border-t border-[#0f2e2e] flex items-center justify-between mt-4">
                      <button
                        onClick={() => onOpenPdf(paper.pdfUrl, `${course.code} ${paper.title}`)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#00C4AD] hover:text-white transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read in Exeter Reader</span>
                      </button>

                      <a
                        href={paper.pdfUrl}
                        download
                        className="text-slate-400 hover:text-white p-1"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Lecture Slides Tab */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Lecture Slides & Slide Decks</h3>
                <p className="text-xs text-slate-400">Optimized for Slide Deck presentation mode with OLED dark mode.</p>
              </div>
              <button
                onClick={handleCombineAllSlides}
                disabled={isCombiningPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00A693]/15 border border-[#00A693]/40 text-[#00C4AD] hover:bg-[#00A693]/25 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Combine to Single PDF</span>
              </button>
            </div>

            <div className="grid gap-3">
              {slides.map(slide => (
                <div
                  key={slide.id}
                  className="p-4 rounded-xl border border-[#0f2e2e] bg-[#071e1e] hover:border-[#1c4d4d] transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#00A693]/15 text-[#00C4AD]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{slide.name}</h4>
                      <p className="text-xs text-slate-400">Section: {slide.originalSection}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenPdf(slide.fileUrl, slide.name)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0b2626] border border-[#163a3a] text-slate-200 hover:text-white hover:bg-[#133838] transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Slides</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Coursework & Deadlines Tab */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Coursework & Assessment Points</h3>
              <p className="text-xs text-slate-400">Check assignment briefs, weighting, and submit via the official portal.</p>
            </div>

            {(!course.deadlines || course.deadlines.length === 0) ? (
              <div className="p-12 text-center border border-dashed border-[#163a3a] rounded-2xl bg-[#061717]">
                <CheckCircle2 className="w-10 h-10 text-[#00A693] mx-auto mb-3" />
                <p className="text-sm text-slate-400">No active assignment deadlines reported for this module.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {course.deadlines.map(d => (
                  <div
                    key={d.id}
                    className="p-5 rounded-2xl border border-[#0f2e2e] bg-[#071e1e] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                          Weighting: {d.weighting}%
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          Due: {new Date(d.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white text-base">{d.title}</h4>
                      {d.description && <p className="text-xs text-slate-300 mt-1">{d.description}</p>}
                    </div>

                    <a
                      href={d.officialSubmissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#00A693] hover:bg-[#00C4AD] text-black transition-all shadow-md shrink-0"
                    >
                      <span>Submit on Official ELE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. Original Raw Lecturer View */}
        {activeTab === 'raw' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Original Lecturer Structure</h3>
              <p className="text-xs text-slate-400">Direct replica of the module sections as uploaded to Moodle.</p>
            </div>

            <div className="space-y-4">
              {course.sections.map(section => (
                <div key={section.id} className="p-5 rounded-2xl border border-[#0f2e2e] bg-[#071e1e]">
                  <h4 className="font-bold text-white text-sm mb-3 border-b border-[#0f2e2e] pb-2">
                    {section.title}
                  </h4>
                  <div className="grid gap-2">
                    {section.resources.map(res => (
                      <div
                        key={res.id}
                        onClick={() => onOpenPdf(res.fileUrl, res.name)}
                        className="p-3 rounded-xl bg-[#0b2626] hover:bg-[#133838] border border-[#163a3a] flex items-center justify-between text-xs cursor-pointer transition-colors"
                      >
                        <span className="text-slate-200 font-medium">{res.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{res.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
