import React, { useState } from 'react';
import {
  X,
  Moon,
  Sun,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  Columns,
  ExternalLink,
} from 'lucide-react';

export interface OpenDocument {
  id: string;
  title: string;
  url: string;
  isDarkMode?: boolean;
}

interface DocumentSidePanelProps {
  documents: OpenDocument[];
  onCloseDocument: (id: string) => void;
  onCloseAll: () => void;
}

export const DocumentSidePanel: React.FC<DocumentSidePanelProps> = ({
  documents,
  onCloseDocument,
  onCloseAll,
}) => {
  // Per-document dark mode inversion state (defaults to true for OLED reading)
  const [docDarkModes, setDocDarkModes] = useState<Record<string, boolean>>({});
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  if (!documents || documents.length === 0) return null;

  const toggleDocDarkMode = (id: string) => {
    setDocDarkModes(prev => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : false, // defaults true, toggles false
    }));
  };

  const isDocDark = (id: string, defaultSetting = true) => {
    return docDarkModes[id] !== undefined ? docDarkModes[id] : defaultSetting;
  };

  const isDual = documents.length >= 2;

  return (
    <aside
      className={`h-full border-l border-[#1a1a20] bg-[#000000] text-[#f2f3f6] flex flex-col transition-all duration-200 z-30 shrink-0 select-none shadow-2xl relative ${
        isMaximized
          ? 'w-[88vw] xl:w-[85vw]'
          : isDual
          ? 'w-[68vw] xl:w-[62vw]'
          : 'w-[46vw] xl:w-[42vw]'
      }`}
      style={{
        backgroundColor: '#000000',
      }}
    >
      {/* ── Top Master Bar: Documents Tabs + Global Actions ───────────── */}
      <div className="h-10 border-b border-[#1f2026] bg-[#0b0b0e] px-3 flex items-center justify-between gap-3 text-xs">
        {/* Document Tabs */}
        <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto scrollbar-none">
          {documents.map((doc, idx) => (
            <div
              key={doc.id}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#15151c] border border-[#23232e] text-[#d7dbe3] text-xs font-medium max-w-[200px] shrink-0"
            >
              <FileText size={12} className="text-[#00C4AD] shrink-0" />
              <span className="truncate">{doc.title}</span>
              <button
                type="button"
                onClick={() => onCloseDocument(doc.id)}
                className="text-[#8c93a1] hover:text-white hover:bg-white/10 rounded-sm p-0.5 transition-colors cursor-pointer"
                title={`Close ${doc.title}`}
              >
                <X size={11} />
              </button>
            </div>
          ))}
          {isDual && (
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#60a5fa] bg-[#60a5fa]/10 px-1.5 py-0.5 rounded border border-[#60a5fa]/20 shrink-0">
              Split Screen
            </span>
          )}
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setIsMaximized(v => !v)}
            className="p-1.5 rounded-md hover:bg-white/10 text-[#a0a7b4] hover:text-white transition-colors cursor-pointer"
            title={isMaximized ? 'Restore panel size' : 'Expand panel'}
          >
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button
            type="button"
            onClick={onCloseAll}
            className="p-1.5 rounded-md hover:bg-rose-500/20 text-[#a0a7b4] hover:text-rose-400 transition-colors cursor-pointer"
            title="Close all open documents"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* ── Document Viewers Grid (1 or 2 Columns) ───────────────────── */}
      <div className="flex-1 flex overflow-hidden divide-x divide-[#1a1a20]">
        {documents.slice(0, 2).map((doc) => {
          const dark = isDocDark(doc.id, true);

          return (
            <div key={doc.id} className="flex-1 flex flex-col min-w-0 h-full bg-[#000000]">
              {/* Document Header Bar */}
              <div className="h-8 px-3 border-b border-[#16161d] bg-[#07070a] flex items-center justify-between text-xs text-[#a0a7b4]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-[#f2f3f6] truncate text-[12px]">
                    {doc.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* OLED Dark Inversion Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleDocDarkMode(doc.id)}
                    className={`p-1 rounded-md transition-colors cursor-pointer ${
                      dark
                        ? 'text-[#60a5fa] hover:bg-[#60a5fa]/10'
                        : 'text-amber-400 hover:bg-amber-400/10'
                    }`}
                    title={dark ? 'Switch to original colors' : 'Enable OLED Dark Inversion'}
                  >
                    {dark ? <Moon size={13} /> : <Sun size={13} />}
                  </button>

                  {/* Direct Download / Open in tab */}
                  <a
                    href={doc.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md text-[#8c93a1] hover:text-white hover:bg-white/10 transition-colors"
                    title="Download document PDF"
                  >
                    <Download size={13} />
                  </a>

                  {/* Close Document */}
                  <button
                    type="button"
                    onClick={() => onCloseDocument(doc.id)}
                    className="p-1 rounded-md text-[#8c93a1] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Close this document"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Document PDF Canvas Frame */}
              <div className="flex-1 relative overflow-hidden bg-[#000000] p-1.5 flex items-center justify-center">
                <iframe
                  src={`${doc.url}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                  className="w-full h-full rounded border-none bg-white transition-all duration-150"
                  style={{
                    filter: dark
                      ? 'invert(0.92) hue-rotate(180deg) contrast(1.15) brightness(1.05)'
                      : 'none',
                  }}
                  title={doc.title}
                />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
