import React from 'react';
import { Search, Moon, Sun, Bell, Sparkles, BookOpen, User, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface NavigationProps {
  user: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onGoHome: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  user,
  isDarkMode,
  onToggleDarkMode,
  onOpenSearch,
  onGoHome,
}) => {
  return (
    <header className="h-16 border-b border-[#0f2e2e] bg-[#002B2B] px-6 flex items-center justify-between sticky top-0 z-30 select-none shadow-md">
      {/* Brand & Logo */}
      <div className="flex items-center gap-4 cursor-pointer" onClick={onGoHome}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A693] to-[#003C3C] flex items-center justify-center font-black text-white text-base shadow-lg shadow-[#00A693]/20 border border-[#00A693]/40">
            E2
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">ELE 2</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00A693] text-black">
                Modern
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">University of Exeter</p>
          </div>
        </div>
      </div>

      {/* Global Quick Search (Ctrl + K) */}
      <div className="flex-1 max-w-md mx-6 hidden sm:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs bg-[#061e1e] hover:bg-[#0b2929] border border-[#133d3d] text-slate-400 hover:text-slate-200 transition-all shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#00A693]" />
            <span>Search modules, past papers, problem sheets...</span>
          </div>
          <kbd className="px-2 py-0.5 rounded bg-[#0f3838] border border-[#1a4a4a] text-[10px] font-mono text-slate-300 font-semibold">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Mobile search trigger */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 rounded-xl border border-[#163a3a] bg-[#071e1e] text-slate-300 hover:text-white"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Offline indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#061717] border border-[#163a3a] text-[11px] text-[#00C4AD]">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Offline Ready</span>
        </div>

        {/* Dark Mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-xl border border-[#163a3a] bg-[#071e1e] text-slate-300 hover:text-white hover:bg-[#133838] transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-[#00C4AD]" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Student Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#0f2e2e]">
          <div className="w-8 h-8 rounded-full bg-[#00A693]/20 border border-[#00A693]/50 flex items-center justify-center font-bold text-xs text-[#00C4AD]">
            {user.name.charAt(0)}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-white leading-tight">{user.name}</p>
            <p className="text-[10px] text-slate-400 font-mono">{user.studentId}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
