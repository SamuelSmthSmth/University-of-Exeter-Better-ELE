import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  ExternalLink,
  Columns,
  BookOpen,
  Sliders,
  FileText
} from 'lucide-react';

interface ExeterPdfReaderProps {
  url: string;
  title: string;
  secondaryUrl?: string;
  secondaryTitle?: string;
  onClose: () => void;
  initialMode?: 'slide' | 'document';
}

export const ExeterPdfReader: React.FC<ExeterPdfReaderProps> = ({
  url,
  title,
  secondaryUrl,
  secondaryTitle,
  onClose,
  initialMode = 'document',
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'slide' | 'document'>(initialMode);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSplitView, setIsSplitView] = useState<boolean>(!!secondaryUrl);
  const [activeSecondaryUrl, setActiveSecondaryUrl] = useState<string | undefined>(secondaryUrl);
  const [activeSecondaryTitle, setActiveSecondaryTitle] = useState<string | undefined>(secondaryTitle);

  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen?.();
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'd' || e.key === 'D') {
        // Toggle dark mode
        setIsDarkMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onClose]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#051414]/95 backdrop-blur-md text-slate-100 animate-in fade-in duration-200"
    >
      {/* Top Controls Toolbar */}
      <header className="h-14 border-b border-[#0f2e2e] bg-[#071d1d] px-4 flex items-center justify-between gap-4 select-none">
        {/* Left: Document Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-[#00A693]/15 text-[#00A693]">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold truncate text-white">{title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="capitalize">{viewMode} Mode</span>
              <span>•</span>
              <span className={isDarkMode ? 'text-[#00A693]' : 'text-slate-400'}>
                {isDarkMode ? 'OLED Dark Inversion ON' : 'Original Colors'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Mode & Zoom Controls */}
        <div className="flex items-center gap-1 bg-[#0b2626] p-1 rounded-xl border border-[#163a3a]">
          {/* Slide vs Document Mode */}
          <button
            onClick={() => setViewMode('document')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'document'
                ? 'bg-[#00A693] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#133838]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Document
          </button>
          <button
            onClick={() => setViewMode('slide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'slide'
                ? 'bg-[#00A693] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#133838]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Slide Deck
          </button>

          <div className="w-[1px] h-4 bg-[#1b4444] mx-1" />

          {/* Zoom Out */}
          <button
            onClick={() => setZoomLevel(prev => Math.max(50, prev - 15))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#133838] transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono px-1 min-w-[3rem] text-center text-slate-300">
            {zoomLevel}%
          </span>

          {/* Zoom In */}
          <button
            onClick={() => setZoomLevel(prev => Math.min(200, prev + 15))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#133838] transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions & Tools */}
        <div className="flex items-center gap-2">
          {/* Split Screen Toggle (if secondary is available or clicked) */}
          <button
            onClick={() => setIsSplitView(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isSplitView
                ? 'bg-[#00A693]/20 border-[#00A693] text-[#00C4AD]'
                : 'border-[#1b4444] text-slate-300 hover:bg-[#133838]'
            }`}
            title="Toggle Split-Screen Comparison"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>{isSplitView ? 'Exit Split View' : 'Split View'}</span>
          </button>

          {/* Dark Mode Inversion Toggle */}
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            className={`p-2 rounded-lg border transition-all ${
              isDarkMode
                ? 'bg-[#003C3C] border-[#00A693] text-[#00C4AD]'
                : 'bg-[#0b2626] border-[#163a3a] text-amber-400 hover:bg-[#133838]'
            }`}
            title="Toggle OLED Dark Mode Inversion (Press 'D')"
          >
            {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Direct Download */}
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-[#163a3a] bg-[#0b2626] text-slate-300 hover:text-white hover:bg-[#133838] transition-colors"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </a>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg border border-[#163a3a] bg-[#0b2626] text-slate-300 hover:text-white hover:bg-[#133838] transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <div className="w-[1px] h-5 bg-[#1b4444] mx-1" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
            title="Close viewer (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Reader Canvas Body */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4 bg-[#030d0d]">
        {/* Primary View Panel */}
        <div className="flex-1 flex flex-col rounded-2xl border border-[#0f2e2e] bg-[#061717] overflow-hidden shadow-2xl relative">
          <div className="h-9 px-4 border-b border-[#0f2e2e] bg-[#082020] flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold text-slate-200 truncate">{title}</span>
            <span className="text-slate-500 font-mono">Zoom: {zoomLevel}%</span>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <div
              className={`transition-all duration-150 origin-top shadow-2xl rounded-lg overflow-hidden border border-[#1b4444] ${
                viewMode === 'slide' ? 'w-full max-w-4xl aspect-[16/10]' : 'w-full max-w-4xl h-full'
              }`}
              style={{
                transform: `scale(${zoomLevel / 100})`,
                filter: isDarkMode
                  ? 'invert(0.92) hue-rotate(180deg) contrast(1.15) brightness(1.05)'
                  : 'none',
              }}
            >
              <iframe
                src={`${url}#toolbar=0&navpanes=0&view=FitH`}
                className="w-full h-full border-none bg-white"
                title={title}
              />
            </div>
          </div>
        </div>

        {/* Secondary View Panel (Split Screen) */}
        {isSplitView && (
          <div className="flex-1 flex flex-col rounded-2xl border border-[#0f2e2e] bg-[#061717] overflow-hidden shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="h-9 px-4 border-b border-[#0f2e2e] bg-[#082020] flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-amber-300 truncate">
                {activeSecondaryTitle || 'Side-by-Side: Solutions / Mark Scheme'}
              </span>
              <button
                onClick={() => setIsSplitView(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-4">
              <div
                className={`transition-all duration-150 origin-top shadow-2xl rounded-lg overflow-hidden border border-[#1b4444] ${
                  viewMode === 'slide' ? 'w-full max-w-4xl aspect-[16/10]' : 'w-full max-w-4xl h-full'
                }`}
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  filter: isDarkMode
                    ? 'invert(0.92) hue-rotate(180deg) contrast(1.15) brightness(1.05)'
                    : 'none',
                }}
              >
                <iframe
                  src={`${activeSecondaryUrl || url}#toolbar=0&navpanes=0&view=FitH`}
                  className="w-full h-full border-none bg-white"
                  title={activeSecondaryTitle || 'Secondary Document'}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
