import React, { useState } from 'react';
import { X, ExternalLink, RotateCw, Globe, ArrowLeft } from 'lucide-react';

interface InAppBrowserModalProps {
  isOpen: boolean;
  url: string;
  title: string;
  onClose: () => void;
}

export const InAppBrowserModal: React.FC<InAppBrowserModalProps> = ({
  isOpen,
  url,
  title,
  onClose,
}) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen || !url) return null;

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey(k => k + 1);
  };

  const handleOpenExternal = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <div
        className="h-14 px-4 bg-[#003C3C] text-white flex items-center justify-between border-b border-white/10 shrink-0 select-none shadow-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Back to ELE 3 (Esc)"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="h-4 w-px bg-white/20" />

          <img src="/ele3-emblem.png" alt="Exeter" className="w-5 h-5 rounded-full object-cover shrink-0" />

          <div>
            <h2 className="text-sm font-bold tracking-tight text-white leading-tight">
              {title}
            </h2>
            <p className="text-[11px] text-white/60 truncate max-w-xs sm:max-w-md font-mono">
              {url}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Reload Page"
          >
            <RotateCw size={15} />
          </button>

          {/* Open in external browser fallback */}
          <button
            type="button"
            onClick={handleOpenExternal}
            className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Open in External Browser"
          >
            <ExternalLink size={15} />
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/80 text-white transition-colors cursor-pointer ml-1"
            title="Close In-App Browser"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── Main Browser Viewport ────────────────────────────────────────── */}
      <div
        className="flex-1 w-full bg-white relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#051414] text-neutral-400 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#00C4AD] border-t-transparent animate-spin" />
            <p className="text-xs font-mono">Loading {title}...</p>
          </div>
        )}

        <iframe
          key={iframeKey}
          src={url}
          title={title}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          allow="camera; microphone; geolocation; fullscreen; clipboard-read; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
        />
      </div>
    </div>
  );
};
