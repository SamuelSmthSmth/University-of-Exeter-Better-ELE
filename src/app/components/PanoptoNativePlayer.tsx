import React, { useState, useEffect, useRef, useCallback } from 'react';
import Hls from 'hls.js';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  ArrowLeftRight, Grid2X2, Square, Layers, Bookmark,
  Plus, Trash2, ExternalLink, X, Clock, FastForward,
  RotateCcw, Sparkles
} from 'lucide-react';
import { PanoptoRecording } from '../../types';

interface StreamInfo {
  id: string;
  tag: string;
  name: string;
  streamType: number;
  rawUrl: string;
  m3u8: string;
}

interface DeliveryResponse {
  success: boolean;
  sessionName: string;
  duration: number;
  streams: StreamInfo[];
  error?: string;
}

export interface LectureBookmark {
  id: string;
  timestamp: number;
  timeFormatted: string;
  note: string;
  createdAt: string;
}

interface PanoptoNativePlayerProps {
  recording: PanoptoRecording;
  onClose: () => void;
}

const SPEED_PRESETS = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const PanoptoNativePlayer: React.FC<PanoptoNativePlayerProps> = ({
  recording,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  // Stream state
  const [loading, setLoading] = useState<boolean>(true);
  const [delivery, setDelivery] = useState<DeliveryResponse | null>(null);
  const [useFallbackEmbed, setUseFallbackEmbed] = useState<boolean>(false);

  // Selected secondary source index if multiple
  const [selectedSecondaryIdx, setSelectedSecondaryIdx] = useState<number>(0);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Layout & swap states
  // 'side-by-side' | 'pip' | 'focus'
  const [layout, setLayout] = useState<'side-by-side' | 'pip' | 'focus'>('side-by-side');
  const [isSwapped, setIsSwapped] = useState<boolean>(false);

  // Bookmarks & notes
  const [bookmarks, setBookmarks] = useState<LectureBookmark[]>(() => {
    try {
      const saved = localStorage.getItem(`panopto_bookmarks_${recording.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [resumeNotice, setResumeNotice] = useState<string | null>(null);

  // Hls instances ref
  const hls1Ref = useRef<Hls | null>(null);
  const hls2Ref = useRef<Hls | null>(null);

  // Fetch DeliveryInfo
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setUseFallbackEmbed(false);

    fetch(`/api/panopto-delivery/${recording.id}`)
      .then(res => res.json())
      .then((data: DeliveryResponse) => {
        if (!isMounted) return;
        if (data.success && data.streams && data.streams.length > 0) {
          setDelivery(data);
          if (data.duration) setDuration(data.duration);
          setLoading(false);
        } else {
          setUseFallbackEmbed(true);
          setLoading(false);
        }
      })
      .catch(err => {
        console.warn('[PanoptoNativePlayer] DeliveryInfo fetch failed, using embed fallback:', err);
        if (isMounted) {
          setUseFallbackEmbed(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      if (hls1Ref.current) {
        hls1Ref.current.destroy();
        hls1Ref.current = null;
      }
      if (hls2Ref.current) {
        hls2Ref.current.destroy();
        hls2Ref.current = null;
      }
    };
  }, [recording.id]);

  // Derive Primary and Secondary streams
  const primaryStream = delivery?.streams.find(s => s.streamType === 1 || s.tag === 'dv') || delivery?.streams[0];
  const secondaryStreams = delivery?.streams.filter(s => s !== primaryStream) || [];
  const secondaryStream = secondaryStreams[selectedSecondaryIdx] || secondaryStreams[0];

  // Set up Hls.js for videos
  useEffect(() => {
    if (!delivery || useFallbackEmbed) return;

    const v1 = videoRef1.current;
    const v2 = videoRef2.current;

    // Stream 1 (Primary - Camera + Audio)
    if (primaryStream && v1) {
      if (hls1Ref.current) hls1Ref.current.destroy();

      if (Hls.isSupported()) {
        const hls1 = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 90,
        });
        hls1.loadSource(primaryStream.m3u8);
        hls1.attachMedia(v1);
        hls1Ref.current = hls1;
      } else if (v1.canPlayType('application/vnd.apple.mpegurl')) {
        v1.src = primaryStream.m3u8;
      }
    }

    // Stream 2 (Secondary - Visualiser / Screen, Muted)
    if (secondaryStream && v2) {
      if (hls2Ref.current) hls2Ref.current.destroy();

      v2.muted = true;
      if (Hls.isSupported()) {
        const hls2 = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 90,
        });
        hls2.loadSource(secondaryStream.m3u8);
        hls2.attachMedia(v2);
        hls2Ref.current = hls2;
      } else if (v2.canPlayType('application/vnd.apple.mpegurl')) {
        v2.src = secondaryStream.m3u8;
      }
    }

    // Check saved playback position for auto-resume
    try {
      const savedPos = localStorage.getItem(`panopto_pos_${recording.id}`);
      if (savedPos) {
        const pos = parseFloat(savedPos);
        if (pos > 10 && v1) {
          v1.currentTime = pos;
          if (v2) v2.currentTime = pos;
          setCurrentTime(pos);
          setResumeNotice(`Auto-resumed from ${formatTime(pos)}`);
          setTimeout(() => setResumeNotice(null), 4000);
        }
      }
    } catch {}

    return () => {
      if (hls1Ref.current) {
        hls1Ref.current.destroy();
        hls1Ref.current = null;
      }
      if (hls2Ref.current) {
        hls2Ref.current.destroy();
        hls2Ref.current = null;
      }
    };
  }, [delivery, primaryStream, secondaryStream, useFallbackEmbed, recording.id]);

  // Video event synchronization
  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1) return;

    const onPlay = () => {
      setIsPlaying(true);
      if (v2 && v2.paused) v2.play().catch(() => {});
    };

    const onPause = () => {
      setIsPlaying(false);
      if (v2 && !v2.paused) v2.pause();
    };

    const onTimeUpdate = () => {
      setCurrentTime(v1.currentTime);
      if (v1.duration && !isNaN(v1.duration)) setDuration(v1.duration);

      // Keep secondary stream in lockstep
      if (v2 && Math.abs(v2.currentTime - v1.currentTime) > 0.4) {
        v2.currentTime = v1.currentTime;
      }

      // Persist position every ~5 seconds
      if (Math.floor(v1.currentTime) % 5 === 0) {
        try {
          localStorage.setItem(`panopto_pos_${recording.id}`, v1.currentTime.toString());
        } catch {}
      }
    };

    v1.addEventListener('play', onPlay);
    v1.addEventListener('pause', onPause);
    v1.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      v1.removeEventListener('play', onPlay);
      v1.removeEventListener('pause', onPause);
      v1.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [delivery, recording.id]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1) return;

    if (v1.paused) {
      v1.play().catch(console.error);
      if (v2) v2.play().catch(() => {});
    } else {
      v1.pause();
      if (v2) v2.pause();
    }
  }, []);

  // Seek handler
  const handleSeek = (newTime: number) => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1) return;

    v1.currentTime = newTime;
    if (v2) v2.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleRelativeSeek = useCallback((delta: number) => {
    const v1 = videoRef1.current;
    if (!v1) return;
    const next = Math.max(0, Math.min(v1.duration || duration, v1.currentTime + delta));
    handleSeek(next);
  }, [duration]);

  // Speed change handler
  const handleSpeedChange = useCallback((speed: number) => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (v1) v1.playbackRate = speed;
    if (v2) v2.playbackRate = speed;
    setPlaybackSpeed(speed);
  }, []);

  // Mute toggle
  const toggleMute = useCallback(() => {
    const v1 = videoRef1.current;
    if (!v1) return;
    v1.muted = !v1.muted;
    setIsMuted(v1.muted);
  }, []);

  // Stream Swap handler
  const toggleSwap = useCallback(() => {
    setIsSwapped(prev => !prev);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in note input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
        case 'j':
          e.preventDefault();
          handleRelativeSeek(-5);
          break;
        case 'ArrowRight':
        case 'l':
          e.preventDefault();
          handleRelativeSeek(5);
          break;
        case '[': {
          e.preventDefault();
          const currIdx = SPEED_PRESETS.indexOf(playbackSpeed);
          if (currIdx > 0) handleSpeedChange(SPEED_PRESETS[currIdx - 1]);
          break;
        }
        case ']': {
          e.preventDefault();
          const currIdx = SPEED_PRESETS.indexOf(playbackSpeed);
          if (currIdx < SPEED_PRESETS.length - 1) handleSpeedChange(SPEED_PRESETS[currIdx + 1]);
          break;
        }
        case 's':
        case 'S':
          e.preventDefault();
          toggleSwap();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case '1':
          e.preventDefault();
          setLayout('focus');
          break;
        case '2':
          e.preventDefault();
          setLayout('pip');
          break;
        case '3':
          e.preventDefault();
          setLayout('side-by-side');
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
            setIsFullscreen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, handleRelativeSeek, handleSpeedChange, toggleSwap, toggleMute, playbackSpeed]);

  // Add bookmark
  const handleAddBookmark = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newBm: LectureBookmark = {
      id: `bm-${Date.now()}`,
      timestamp: currentTime,
      timeFormatted: formatTime(currentTime),
      note: newNoteText.trim() || 'Key Lecture Concept',
      createdAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
    };

    const updated = [...bookmarks, newBm].sort((a, b) => a.timestamp - b.timestamp);
    setBookmarks(updated);
    setNewNoteText('');
    try {
      localStorage.setItem(`panopto_bookmarks_${recording.id}`, JSON.stringify(updated));
    } catch {}
  };

  const handleDeleteBookmark = (bmId: string) => {
    const updated = bookmarks.filter(b => b.id !== bmId);
    setBookmarks(updated);
    try {
      localStorage.setItem(`panopto_bookmarks_${recording.id}`, JSON.stringify(updated));
    } catch {}
  };

  // Decide which stream goes into which visual slot
  const slot1IsPrimary = !isSwapped;

  return (
    <div
      ref={containerRef}
      className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl transition-all relative flex flex-col font-sans select-none"
    >
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <div className="px-4 py-3 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2.5 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00C4AD] animate-pulse shrink-0" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate max-w-md">
              {recording.title}
            </h3>
            <p className="text-[11px] text-neutral-400 font-mono flex items-center gap-2">
              <span>{recording.date}</span>
              {recording.lecturer && <span>· {recording.lecturer}</span>}
              {!useFallbackEmbed && delivery && (
                <span className="text-[#00C4AD] font-bold">
                  · Dual HLS Native ({delivery.streams.length} feeds)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Secondary source switcher if 2+ content feeds exist */}
          {!useFallbackEmbed && secondaryStreams.length > 1 && (
            <div className="flex items-center gap-1 bg-neutral-800 p-0.5 rounded-lg border border-neutral-700 text-xs text-neutral-300">
              <span className="px-1.5 text-[10px] uppercase font-mono text-neutral-400">Feed 2:</span>
              {secondaryStreams.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSecondaryIdx(idx)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    selectedSecondaryIdx === idx
                      ? 'bg-[#007A6B] text-white shadow-xs'
                      : 'hover:text-white'
                  }`}
                >
                  {s.name.includes('Content_2') ? 'Screen 2' : 'Screen 1'}
                </button>
              ))}
            </div>
          )}

          {/* Layout switcher buttons */}
          {!useFallbackEmbed && (
            <div className="flex items-center bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
              <button
                type="button"
                onClick={() => setLayout('side-by-side')}
                title="Side by Side (50/50) [3]"
                className={`p-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  layout === 'side-by-side'
                    ? 'bg-[#007A6B] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Grid2X2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => setLayout('pip')}
                title="Picture-in-Picture [2]"
                className={`p-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  layout === 'pip'
                    ? 'bg-[#007A6B] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Layers size={14} />
              </button>
              <button
                type="button"
                onClick={() => setLayout('focus')}
                title="Single Stream Focus [1]"
                className={`p-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  layout === 'focus'
                    ? 'bg-[#007A6B] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Square size={14} />
              </button>
            </div>
          )}

          {/* Swap Stream Button */}
          {!useFallbackEmbed && (
            <button
              type="button"
              onClick={toggleSwap}
              title="Swap Streams (S)"
              className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-neutral-700 cursor-pointer"
            >
              <ArrowLeftRight size={13} className={isSwapped ? 'text-[#00C4AD]' : ''} />
              <span className="hidden sm:inline">Swap (S)</span>
            </button>
          )}

          {/* Notes & Bookmarks Drawer Toggle */}
          <button
            type="button"
            onClick={() => setShowNotesDrawer(prev => !prev)}
            title="Lecture Notes & Bookmarks"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border cursor-pointer ${
              showNotesDrawer
                ? 'bg-[#00C4AD]/20 border-[#00C4AD] text-[#00C4AD]'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border-neutral-700'
            }`}
          >
            <Bookmark size={13} />
            <span className="hidden sm:inline">Notes</span>
            {bookmarks.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#00C4AD] text-[#003C3C] font-bold">
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* External portal launch fallback */}
          <a
            href={recording.panoptoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-[#007A6B] hover:bg-[#006a5d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            title="Open official Panopto portal in new tab"
          >
            <span className="hidden sm:inline">Panopto Portal</span>
            <ExternalLink size={12} />
          </a>

          {/* Close Player */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Close Player"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── Auto-Resume Notification Pill ──────────────────────────────────── */}
      {resumeNotice && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-black/85 backdrop-blur-md border border-[#00C4AD]/60 text-[#00C4AD] px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 shadow-xl animate-fade-in">
          <Clock size={13} />
          <span>{resumeNotice}</span>
          <button
            type="button"
            onClick={() => handleSeek(0)}
            className="ml-2 underline text-white hover:text-[#00C4AD] cursor-pointer"
          >
            Start from 00:00
          </button>
        </div>
      )}

      {/* ── Main Viewport Area ──────────────────────────────────────────────── */}
      <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
        {loading && (
          <div className="flex flex-col items-center gap-3 text-neutral-400">
            <div className="w-8 h-8 rounded-full border-2 border-[#00C4AD] border-t-transparent animate-spin" />
            <p className="text-xs font-mono">Initializing multi-stream HLS feeds...</p>
          </div>
        )}

        {/* Fallback to interactive Panopto embed if no direct streams */}
        {!loading && useFallbackEmbed && (
          <iframe
            src={
              recording.embedUrl?.includes('interactivity=all')
                ? recording.embedUrl
                : `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=${recording.id}&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true`
            }
            title={recording.title}
            className="w-full h-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
          />
        )}

        {/* Native Multi-Stream Video Layouts */}
        {!loading && !useFallbackEmbed && (
          <div className="w-full h-full relative">
            {/* 1. Side-by-Side (50/50 dual grid) */}
            {layout === 'side-by-side' && (
              <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-1.5 p-1.5 bg-black">
                {/* Visual Slot 1 */}
                <div className="relative w-full h-full bg-neutral-950 rounded-lg overflow-hidden flex items-center justify-center border border-neutral-850 group">
                  <video
                    ref={slot1IsPrimary ? videoRef1 : videoRef2}
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={togglePlay}
                    playsInline
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] font-mono font-bold text-white border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
                    {slot1IsPrimary ? (primaryStream?.name || 'Primary Camera & Audio') : (secondaryStream?.name || 'Visualiser/Screen')}
                  </div>
                </div>

                {/* Visual Slot 2 */}
                <div className="relative w-full h-full bg-neutral-950 rounded-lg overflow-hidden flex items-center justify-center border border-neutral-850 group">
                  <video
                    ref={slot1IsPrimary ? videoRef2 : videoRef1}
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={togglePlay}
                    playsInline
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] font-mono font-bold text-white border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
                    {slot1IsPrimary ? (secondaryStream?.name || 'Visualiser/Screen') : (primaryStream?.name || 'Primary Camera & Audio')}
                  </div>
                </div>
              </div>
            )}

            {/* 2. PiP (Focus main + floating corner thumbnail) */}
            {layout === 'pip' && (
              <div className="w-full h-full relative bg-black">
                {/* Main full-screen stream */}
                <video
                  ref={slot1IsPrimary ? videoRef1 : videoRef2}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                  playsInline
                />

                {/* Floating dockable thumbnail (click to swap) */}
                <div
                  onClick={toggleSwap}
                  className="absolute bottom-16 right-4 w-56 sm:w-72 aspect-video bg-neutral-900 border-2 border-[#00C4AD] rounded-xl overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform group z-10"
                  title="Click to swap feeds (S)"
                >
                  <video
                    ref={slot1IsPrimary ? videoRef2 : videoRef1}
                    className="w-full h-full object-cover pointer-events-none"
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-white transition-opacity">
                      Click to Swap (S)
                    </span>
                  </div>
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono font-bold text-white">
                    {slot1IsPrimary ? 'Visualiser (PiP)' : 'Camera (PiP)'}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Single Stream Focus (100% full screen with 1-click swap) */}
            {layout === 'focus' && (
              <div className="w-full h-full relative bg-black">
                <video
                  ref={slot1IsPrimary ? videoRef1 : videoRef2}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                  playsInline
                />
                {/* Keep secondary video attached off-screen so time sync stays active */}
                <video
                  ref={slot1IsPrimary ? videoRef2 : videoRef1}
                  className="hidden"
                  playsInline
                />

                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/75 backdrop-blur-xs text-[11px] font-mono font-bold text-white border border-white/10 flex items-center gap-2">
                  <span>{slot1IsPrimary ? 'Active Feed: Primary' : 'Active Feed: Secondary'}</span>
                  <button
                    type="button"
                    onClick={toggleSwap}
                    className="px-1.5 py-0.5 rounded bg-[#007A6B] text-[10px] text-white hover:bg-[#006a5d] cursor-pointer"
                  >
                    Switch to {slot1IsPrimary ? 'Visualiser' : 'Camera'} (S)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Native Control Bar ─────────────────────────────────────────────── */}
      {!useFallbackEmbed && (
        <div className="px-4 py-3 bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 flex flex-col gap-2 z-20">
          {/* Scrubber Progress Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-300 w-12 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 group py-1 cursor-pointer">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.5}
                value={currentTime}
                onChange={e => handleSeek(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#00C4AD] group-hover:h-2 transition-all"
              />
            </div>
            <span className="text-xs font-mono text-neutral-400 w-12">
              {formatTime(duration)}
            </span>
          </div>

          {/* Bottom Action Row */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            {/* Play, Pause, Jump 5s */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 rounded-xl bg-[#007A6B] hover:bg-[#006a5d] text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={() => handleRelativeSeek(-5)}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Rewind 5s (←)"
              >
                <RotateCcw size={15} />
              </button>

              <button
                type="button"
                onClick={() => handleRelativeSeek(5)}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Forward 5s (→)"
              >
                <FastForward size={15} />
              </button>

              {/* Volume & Mute */}
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Mute / Unmute (M)"
                >
                  {isMuted ? <VolumeX size={15} className="text-rose-400" /> : <Volume2 size={15} />}
                </button>
              </div>
            </div>

            {/* Speed Presets */}
            <div className="flex items-center gap-1 bg-neutral-800/80 p-1 rounded-xl border border-neutral-700">
              <span className="text-[10px] font-mono text-neutral-400 uppercase px-1.5">Speed:</span>
              {SPEED_PRESETS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSpeedChange(s)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    playbackSpeed === s
                      ? 'bg-[#00C4AD] text-[#003C3C] shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Quick Bookmark button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAddBookmark()}
                className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-neutral-700 transition-colors cursor-pointer"
                title={`Bookmark timestamp ${formatTime(currentTime)}`}
              >
                <Plus size={13} className="text-[#00C4AD]" />
                <span>Bookmark {formatTime(currentTime)}</span>
              </button>

              {/* Fullscreen toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Collapsible Bookmarks & Notes Drawer ───────────────────────────── */}
      {showNotesDrawer && (
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 animate-fade-in z-20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
              <Bookmark size={15} className="text-[#00C4AD]" />
              <span>Timestamp Bookmarks & Notes ({bookmarks.length})</span>
            </div>
            <button
              type="button"
              onClick={() => setShowNotesDrawer(false)}
              className="text-neutral-400 hover:text-white text-xs cursor-pointer"
            >
              Hide
            </button>
          </div>

          {/* New Bookmark Input Form */}
          <form onSubmit={handleAddBookmark} className="flex gap-2 mb-4">
            <div className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#00C4AD] flex items-center gap-1 shrink-0">
              <Clock size={12} />
              <span>{formatTime(currentTime)}</span>
            </div>
            <input
              type="text"
              placeholder="Add personal note at current timestamp (e.g., Proof of Mean Value Theorem)..."
              value={newNoteText}
              onChange={e => setNewNoteText(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#00C4AD]"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-[#007A6B] hover:bg-[#006a5d] text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <Plus size={13} />
              <span>Save Note</span>
            </button>
          </form>

          {/* Bookmarks List */}
          {bookmarks.length === 0 ? (
            <div className="text-center py-4 text-neutral-500 text-xs border border-dashed border-neutral-850 rounded-xl">
              No notes saved yet. Type a note above or click "Bookmark {formatTime(currentTime)}" to save key lecture timestamps.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {bookmarks.map(bm => (
                <div
                  key={bm.id}
                  className="bg-neutral-900 border border-neutral-800 hover:border-[#00C4AD]/60 rounded-xl p-2.5 flex items-start justify-between gap-2 transition-all group"
                >
                  <button
                    type="button"
                    onClick={() => handleSeek(bm.timestamp)}
                    className="flex-1 text-left cursor-pointer min-w-0"
                    title={`Jump to ${bm.timeFormatted}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-[#00C4AD]/20 text-[#00C4AD] font-mono font-bold text-[11px] group-hover:bg-[#00C4AD] group-hover:text-[#003C3C] transition-colors">
                        {bm.timeFormatted}
                      </span>
                      <span className="text-[10px] text-neutral-500">{bm.createdAt}</span>
                    </div>
                    <p className="text-xs text-neutral-200 line-clamp-2">
                      {bm.note}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteBookmark(bm.id)}
                    className="text-neutral-500 hover:text-rose-400 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                    title="Delete bookmark"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
