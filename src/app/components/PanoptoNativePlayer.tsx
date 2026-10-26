import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Hls from 'hls.js';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  ArrowLeftRight, Grid2X2, Square, Layers,
  ExternalLink, X, RotateCcw, RotateCw
} from 'lucide-react';
import { PanoptoRecording, PanoptoCaption } from '../../types';

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
  hasCaptions?: boolean;
  captions?: PanoptoCaption[];
  streams: StreamInfo[];
  error?: string;
}

interface PanoptoNativePlayerProps {
  recording: PanoptoRecording;
  onClose: () => void;
}

const SPEED_PRESETS = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  // Stream state
  const [loading, setLoading] = useState<boolean>(true);
  const [delivery, setDelivery] = useState<DeliveryResponse | null>(null);
  const [useFallbackEmbed, setUseFallbackEmbed] = useState<boolean>(false);
  const [secondarySourceIdx, setSecondarySourceIdx] = useState<number>(0);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ele3_cc_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  // Persist CC toggle
  const toggleCaptions = useCallback(() => {
    setShowCaptions(prev => {
      const next = !prev;
      try { localStorage.setItem('ele3_cc_enabled', String(next)); } catch {}
      return next;
    });
  }, []);

  // Compute active caption for current playback time
  const activeCaptionText = useMemo(() => {
    if (!showCaptions || !delivery?.captions || delivery.captions.length === 0) return null;
    const current = currentTime;
    const found = delivery.captions.find(c => {
      const start = c.time;
      const end = c.time + Math.max(c.duration, 2.0);
      return current >= start && current <= end;
    });
    return found ? found.text : null;
  }, [showCaptions, delivery?.captions, currentTime]);

  // Layout & swap states
  const [layout, setLayout] = useState<'side-by-side' | 'pip' | 'focus'>('side-by-side');
  const [isSwapped, setIsSwapped] = useState<boolean>(false);

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
  const secondaryStream = secondaryStreams[secondarySourceIdx] || secondaryStreams[0];

  // Initialize and attach HLS to persistent video elements
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
        hls1.on(Hls.Events.MANIFEST_PARSED, () => {
          v1.play().catch(() => {});
        });
        hls1Ref.current = hls1;
      } else if (v1.canPlayType('application/vnd.apple.mpegurl')) {
        v1.src = primaryStream.m3u8;
        v1.play().catch(() => {});
      }
    }

    // Stream 2 (Secondary - Visualiser/Screen, Muted)
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
        hls2.on(Hls.Events.MANIFEST_PARSED, () => {
          v2.play().catch(() => {});
        });
        hls2Ref.current = hls2;
      } else if (v2.canPlayType('application/vnd.apple.mpegurl')) {
        v2.src = secondaryStream.m3u8;
        v2.play().catch(() => {});
      }
    }

    // Auto-resume from saved position
    try {
      const savedPos = localStorage.getItem(`panopto_pos_${recording.id}`);
      if (savedPos) {
        const pos = parseFloat(savedPos);
        if (pos > 5 && v1) {
          v1.currentTime = pos;
          if (v2) v2.currentTime = pos;
          setCurrentTime(pos);
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

  // Toggle Play / Pause without pausing unintentionally
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

  // Stream Swap handler (swaps visual layout only, keeps audio and video playing uninterrupted)
  const toggleSwap = useCallback(() => {
    setIsSwapped(prev => !prev);
    // Ensure playback continues uninterrupted
    const v1 = videoRef1.current;
    if (v1 && v1.paused && isPlaying) {
      v1.play().catch(() => {});
    }
  }, [isPlaying]);

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
        case 'c':
        case 'C':
          e.preventDefault();
          toggleCaptions();
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

  // Tap-to-seek progress bar click handler
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = ratio * duration;
    handleSeek(targetTime);
  };

  // Cycle secondary feed if multiple exist
  const cycleSecondaryFeed = () => {
    if (secondaryStreams.length <= 1) return;
    setSecondarySourceIdx(prev => (prev + 1) % secondaryStreams.length);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl transition-all relative flex flex-col font-sans select-none"
    >
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <div className="px-4 py-2.5 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2.5 z-20">
        <div className="flex items-center gap-2.5 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate max-w-lg">
            {recording.title}
          </h3>
          <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">
            · {recording.date}
          </span>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Secondary source cycle icon button (if 2+ content feeds exist) */}
          {!useFallbackEmbed && secondaryStreams.length > 1 && (
            <button
              type="button"
              onClick={cycleSecondaryFeed}
              title={`Switch Content Source (${secondarySourceIdx + 1}/${secondaryStreams.length})`}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer border border-neutral-700 text-xs flex items-center gap-1"
            >
              <Layers size={13} className="text-[#00C4AD]" />
              <span className="text-[10px] font-mono font-bold text-neutral-300">
                {secondarySourceIdx + 1}/{secondaryStreams.length}
              </span>
            </button>
          )}

          {/* Layout switchers */}
          {!useFallbackEmbed && (
            <div className="flex items-center bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
              <button
                type="button"
                onClick={() => setLayout('side-by-side')}
                title="Side by Side [3]"
                className={`p-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  layout === 'side-by-side'
                    ? 'bg-[#007A6B] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Grid2X2 size={13} />
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
                <Layers size={13} />
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
                <Square size={13} />
              </button>
            </div>
          )}

          {/* Swap Stream Button (Icon only) */}
          {!useFallbackEmbed && (
            <button
              type="button"
              onClick={toggleSwap}
              title="Swap Streams (S)"
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors border border-neutral-700 cursor-pointer"
            >
              <ArrowLeftRight size={13} className={isSwapped ? 'text-[#00C4AD]' : ''} />
            </button>
          )}

          {/* Panopto Portal link (Icon only) */}
          <a
            href={recording.panoptoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors border border-neutral-700 cursor-pointer"
            title="Open official Panopto portal"
          >
            <ExternalLink size={13} />
          </a>

          {/* Close Player Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Close Player"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* ── Main Viewport Area (PERMANENT VIDEO ELEMENTS NEVER UNMOUNT) ──────── */}
      <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center select-none">
        {loading && (
          <div className="flex flex-col items-center gap-3 text-neutral-400 z-30">
            <div className="w-8 h-8 rounded-full border-2 border-[#00C4AD] border-t-transparent animate-spin" />
            <p className="text-xs font-mono">Loading streams...</p>
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

        {/* Native Multi-Stream Video Layout (Persistent DOM Video Nodes) */}
        {!useFallbackEmbed && (
          <div className="w-full h-full relative">
            {/* Wrapper for Video 1 (Primary: Camera & Audio) */}
            <div
              className={`transition-all duration-200 flex items-center justify-center bg-black ${
                layout === 'side-by-side'
                  ? `absolute top-0 bottom-0 ${isSwapped ? 'left-1/2 right-0' : 'left-0 right-1/2'} p-1`
                  : layout === 'pip'
                  ? !isSwapped
                    ? 'absolute inset-0 z-0'
                    : 'absolute bottom-4 right-4 w-52 sm:w-64 aspect-video z-20 rounded-xl border-2 border-[#00C4AD] shadow-2xl overflow-hidden cursor-pointer hover:scale-105'
                  : !isSwapped
                  ? 'absolute inset-0 z-10'
                  : 'absolute inset-0 z-0 opacity-0 pointer-events-none'
              }`}
              onClick={layout === 'pip' && isSwapped ? toggleSwap : undefined}
            >
              <video
                ref={videoRef1}
                className="w-full h-full object-contain cursor-pointer"
                onClick={layout === 'pip' && isSwapped ? undefined : togglePlay}
                playsInline
              />
            </div>

            {/* Wrapper for Video 2 (Secondary: Screen / Visualiser) */}
            <div
              className={`transition-all duration-200 flex items-center justify-center bg-black ${
                layout === 'side-by-side'
                  ? `absolute top-0 bottom-0 ${isSwapped ? 'left-0 right-1/2' : 'left-1/2 right-0'} p-1`
                  : layout === 'pip'
                  ? isSwapped
                    ? 'absolute inset-0 z-0'
                    : 'absolute bottom-4 right-4 w-52 sm:w-64 aspect-video z-20 rounded-xl border-2 border-[#00C4AD] shadow-2xl overflow-hidden cursor-pointer hover:scale-105'
                  : isSwapped
                  ? 'absolute inset-0 z-10'
                  : 'absolute inset-0 z-0 opacity-0 pointer-events-none'
              }`}
              onClick={layout === 'pip' && !isSwapped ? toggleSwap : undefined}
            >
              <video
                ref={videoRef2}
                className="w-full h-full object-contain cursor-pointer"
                onClick={layout === 'pip' && !isSwapped ? undefined : togglePlay}
                playsInline
              />
            </div>
          </div>
        )}

        {/* Floating Translucent Subtitle Overlay */}
        {!useFallbackEmbed && showCaptions && activeCaptionText && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6 animate-in fade-in duration-150">
            <div className="max-w-[85%] sm:max-w-[75%] px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-white text-center text-sm sm:text-base font-medium shadow-2xl leading-relaxed tracking-wide select-none drop-shadow-md">
              {activeCaptionText}
            </div>
          </div>
        )}
      </div>

      {/* ── Native Control Bar ─────────────────────────────────────────────── */}
      {!useFallbackEmbed && (
        <div className="px-4 py-3 bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 flex flex-col gap-2.5 z-20">
          {/* Custom Tap-to-Seek Scrubber with Green Progress Bar */}
          <div
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            className="w-full h-2 bg-neutral-800 hover:h-2.5 rounded-full cursor-pointer relative transition-all group overflow-visible"
            title="Tap to seek"
          >
            {/* Green Progress Fill */}
            <div
              className="h-full bg-[#00C4AD] rounded-full transition-all duration-75 relative"
              style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
            >
              {/* Small, unobtrusive green playhead thumb */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#00C4AD] ring-2 ring-black absolute right-0 top-1/2 -translate-y-1/2 shadow-sm pointer-events-none" />
            </div>
          </div>

          {/* Bottom Action Row: Left (Time) | Center (Controls) | Right (Preferences) */}
          <div className="flex items-center justify-between gap-4 pt-0.5">
            {/* LEFT: Timestamp Display */}
            <div className="flex items-center gap-1.5 min-w-[90px]">
              <span className="text-xs font-mono font-bold text-white">
                {formatTime(currentTime)}
              </span>
              <span className="text-xs font-mono text-neutral-500">/</span>
              <span className="text-xs font-mono text-neutral-400">
                {formatTime(duration)}
              </span>
            </div>

            {/* CENTER: Player Controls (Flipped Symmetrical Jump Buttons) */}
            <div className="flex items-center gap-2">
              {/* Rewind 5s */}
              <button
                type="button"
                onClick={() => handleRelativeSeek(-5)}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Rewind 5s (←)"
              >
                <RotateCcw size={15} />
              </button>

              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 rounded-xl bg-[#007A6B] hover:bg-[#006a5d] text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm active:scale-95"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
              </button>

              {/* Forward 5s (Identical flipped icon) */}
              <button
                type="button"
                onClick={() => handleRelativeSeek(5)}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Forward 5s (→)"
              >
                <RotateCw size={15} />
              </button>

              {/* Volume & Mute */}
              <button
                type="button"
                onClick={toggleMute}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-1"
                title="Mute / Unmute (M)"
              >
                {isMuted ? <VolumeX size={15} className="text-rose-400" /> : <Volume2 size={15} />}
              </button>
            </div>

            {/* RIGHT: CC Toggle, Speed Preferences & Fullscreen */}
            <div className="flex items-center gap-2">
              {/* Closed Captions Button */}
              {delivery?.hasCaptions && (
                <button
                  type="button"
                  onClick={toggleCaptions}
                  className={`h-7 px-2.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                    showCaptions
                      ? 'bg-[#00C4AD] text-[#003C3C] border-[#00C4AD] shadow-xs'
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700/80 hover:text-white hover:bg-neutral-700'
                  }`}
                  title={showCaptions ? 'Disable Closed Captions (C)' : 'Enable Closed Captions (C)'}
                >
                  CC
                </button>
              )}

              <div className="flex items-center gap-0.5 bg-neutral-800/90 p-0.5 rounded-lg border border-neutral-700/80">
                {SPEED_PRESETS.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSpeedChange(s)}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      playbackSpeed === s
                        ? 'bg-[#00C4AD] text-[#003C3C] shadow-xs'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
