import React, { useState } from 'react';
import { Course, CourseDeadline, ExamPaper } from '../types';
import {
  BookOpen,
  Calendar,
  Clock,
  Pin,
  PinOff,
  Sparkles,
  ArrowRight,
  FileArchive,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { EleGeometricPattern } from './EleGeometricPattern';

interface DashboardProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenPdf: (url: string, title: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ courses, onSelectCourse, onOpenPdf }) => {
  const [termFilter, setTermFilter] = useState<'all' | 'term1' | 'term2' | 'pinned'>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Collect all upcoming deadlines
  const allDeadlines: CourseDeadline[] = courses.flatMap(c => c.deadlines || []);
  allDeadlines.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
      course.title.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;

    if (termFilter === 'pinned') return course.isPinned;
    if (termFilter === 'term1') return course.term.toLowerCase().includes('autumn') || course.term.toLowerCase().includes('term 1');
    if (termFilter === 'term2') return course.term.toLowerCase().includes('spring') || course.term.toLowerCase().includes('term 2');
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-[#051414] text-slate-100">
      {/* Hero Banner with Exeter Geometric Pattern */}
      <div className="relative border-b border-[#0f2e2e] bg-gradient-to-r from-[#002626] via-[#003C3C] to-[#071e1e] p-6 md:p-10 overflow-hidden shadow-xl">
        <EleGeometricPattern className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen" />

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00A693]/20 border border-[#00A693]/40 text-[#00C4AD] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Year 2026/27 • Stage 2 MMath</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
              Welcome to <span className="text-[#00C4AD]">ELE 2 Modern</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
              Your personalized, offline-first study hub. Access auto-organized past exam papers from the Exeter Library archive, paired problem sheets, and night-mode lecture slides.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#061717]/80 border border-[#163a3a] backdrop-blur text-center">
              <span className="text-2xl font-black text-[#00C4AD]">{courses.length}</span>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">Enrolled Modules</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#061717]/80 border border-[#163a3a] backdrop-blur text-center">
              <span className="text-2xl font-black text-amber-300">{allDeadlines.length}</span>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">Active Deadlines</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#061717]/80 border border-[#163a3a] backdrop-blur text-center col-span-2 sm:col-span-1">
              <span className="text-2xl font-black text-emerald-400">100%</span>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">Offline Ready</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full p-6 md:p-8 space-y-8 flex-1">
        {/* Deadlines Section */}
        {allDeadlines.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white tracking-tight">Upcoming Deadlines & Submissions</h2>
              </div>
              <span className="text-xs text-slate-400">Synced from Official ELE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allDeadlines.map(d => {
                const daysRemaining = Math.ceil((new Date(d.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return (
                  <div
                    key={d.id}
                    className="p-5 rounded-2xl border border-[#0f2e2e] bg-[#071e1e] hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-sm relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#00A693]/15 text-[#00C4AD]">
                          {d.courseCode}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          daysRemaining <= 3 ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {daysRemaining <= 0 ? 'Due Today' : `Due in ${daysRemaining} days`}
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-base mb-1">{d.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{d.description || d.courseName}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#0f2e2e] flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">Weighting: {d.weighting}%</span>
                      <a
                        href={d.officialSubmissionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#00C4AD] hover:text-white transition-colors"
                      >
                        <span>Official Submission</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Modules Filter & Search Bar */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Your Enrolled Modules</h2>
              <p className="text-xs text-slate-400">Click any module to open its smart workspace.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Filter Tabs */}
              <div className="bg-[#0b2626] p-1 rounded-xl border border-[#163a3a] flex items-center gap-1">
                {[
                  { id: 'all', label: 'All Modules' },
                  { id: 'pinned', label: 'Pinned' },
                  { id: 'term1', label: 'Term 1' },
                  { id: 'term2', label: 'Term 2' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setTermFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      termFilter === tab.id
                        ? 'bg-[#00A693] text-black shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter modules..."
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  className="pl-9 pr-3 py-1.5 rounded-xl text-xs bg-[#0b2626] border border-[#163a3a] text-white placeholder-slate-400 focus:outline-none focus:border-[#00A693] w-40 sm:w-48"
                />
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="group p-6 rounded-3xl border border-[#0f2e2e] bg-[#071e1e] hover:border-[#00A693] hover:shadow-2xl hover:shadow-[#00A693]/10 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-[#00A693]/15 text-[#00C4AD] border border-[#00A693]/30">
                      {course.code}
                    </span>
                    <span className="text-xs text-slate-400">
                      {course.credits} Credits • Stage {course.stage}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-lg group-hover:text-[#00C4AD] transition-colors leading-snug mb-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4">{course.term}</p>
                </div>

                <div className="pt-4 border-t border-[#0f2e2e] space-y-3">
                  {/* Progress ring / bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span>Module Completion</span>
                      <span className="font-mono text-[#00C4AD] font-semibold">{course.progressPercentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#0b2626] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00A693] to-[#00C4AD] rounded-full"
                        style={{ width: `${course.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Convenor */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="truncate">{course.convenor.name}</span>
                    <span className="flex items-center gap-1 text-[#00C4AD] font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Open Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
