import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { Search, BookOpen, FileText, ArrowRight, X, Clock, Layers } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenPdf: (url: string, title: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  courses,
  onSelectCourse,
  onOpenPdf,
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Matched courses
  const matchedCourses = courses.filter(
    c => c.code.toLowerCase().includes(cleanQuery) || c.title.toLowerCase().includes(cleanQuery)
  );

  // Matched resources & past papers
  const allResources = courses.flatMap(c =>
    c.sections.flatMap(s => s.resources.map(r => ({ ...r, courseCode: c.code, courseTitle: c.title })))
  );

  const matchedResources = cleanQuery.length > 1
    ? allResources.filter(r => r.name.toLowerCase().includes(cleanQuery)).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl rounded-2xl border border-[#0f2e2e] bg-[#071e1e] shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="h-14 px-4 border-b border-[#0f2e2e] flex items-center gap-3 bg-[#082323]">
          <Search className="w-5 h-5 text-[#00A693]" />
          <input
            autoFocus
            type="text"
            placeholder="Search modules, lecture slides, past papers, problem sheets..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Modules Group */}
          {matchedCourses.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                Modules
              </p>
              <div className="space-y-1">
                {matchedCourses.map(course => (
                  <div
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-[#0b2929] cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#00A693]/15 text-[#00C4AD]">
                        {course.code}
                      </span>
                      <span className="text-sm font-semibold text-white group-hover:text-[#00C4AD] transition-colors">
                        {course.title}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00C4AD] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Group */}
          {matchedResources.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                Documents & Resources
              </p>
              <div className="space-y-1">
                {matchedResources.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onOpenPdf(res.fileUrl, res.name);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-[#0b2929] cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 rounded bg-[#00A693]/15 text-[#00C4AD] shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-[#00C4AD] truncate">
                          {res.name}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {res.courseCode} • {res.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#00C4AD] group-hover:translate-x-0.5 transition-transform shrink-0">
                      Open in Reader →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedCourses.length === 0 && matchedResources.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              No results found matching &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="h-10 px-4 border-t border-[#0f2e2e] bg-[#061717] flex items-center justify-between text-[11px] text-slate-400 select-none">
          <span>Navigate with <kbd className="font-mono text-slate-300">↑</kbd> <kbd className="font-mono text-slate-300">↓</kbd></span>
          <span>Close with <kbd className="font-mono text-slate-300">Esc</kbd></span>
        </div>
      </div>
    </div>
  );
};
