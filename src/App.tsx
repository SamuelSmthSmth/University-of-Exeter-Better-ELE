import React, { useState, useEffect } from 'react';
import { Course } from './types';
import { MOCK_COURSES, CURRENT_USER } from './data/mockCourses';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { CourseView } from './components/CourseView';
import { ExeterPdfReader } from './components/reader/ExeterPdfReader';
import { CommandPalette } from './components/CommandPalette';

export const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ele_modern_courses');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('ele_theme') !== 'light';
  });

  // Active PDF Reader state
  const [activePdf, setActivePdf] = useState<{
    url: string;
    title: string;
    secondaryUrl?: string;
    secondaryTitle?: string;
  } | null>(null);

  // Sync theme to HTML root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('ele_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('ele_theme', 'light');
    }
  }, [isDarkMode]);

  // Global Ctrl + K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenPdf = (
    url: string,
    title: string,
    secondaryUrl?: string,
    secondaryTitle?: string
  ) => {
    setActivePdf({ url, title, secondaryUrl, secondaryTitle });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#051414] text-slate-100 font-sans antialiased overflow-hidden">
      {/* Top Header Navigation */}
      <Navigation
        user={CURRENT_USER}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onGoHome={() => setSelectedCourse(null)}
      />

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {selectedCourse ? (
          <CourseView
            course={selectedCourse}
            onBack={() => setSelectedCourse(null)}
            onOpenPdf={handleOpenPdf}
          />
        ) : (
          <Dashboard
            courses={courses}
            onSelectCourse={setSelectedCourse}
            onOpenPdf={handleOpenPdf}
          />
        )}
      </main>

      {/* Custom Exeter Reader (In-App PDF Viewer) */}
      {activePdf && (
        <ExeterPdfReader
          url={activePdf.url}
          title={activePdf.title}
          secondaryUrl={activePdf.secondaryUrl}
          secondaryTitle={activePdf.secondaryTitle}
          onClose={() => setActivePdf(null)}
        />
      )}

      {/* Spotlight Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        courses={courses}
        onSelectCourse={setSelectedCourse}
        onOpenPdf={handleOpenPdf}
      />
    </div>
  );
};

export default App;
