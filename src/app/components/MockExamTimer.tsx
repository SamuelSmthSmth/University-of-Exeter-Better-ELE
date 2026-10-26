import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Minimize2, Maximize2, Bell, Plus, Timer, GraduationCap } from 'lucide-react';

interface MockExamTimerProps {
  paperTitle?: string;
  initialMinutes?: number;
  onClose: () => void;
}

function playCompletionChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Exeter chime chords: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.5Hz)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + idx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.15 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 0.85);
    });
  } catch (e) {
    console.warn('Audio chime could not be played:', e);
  }
}

export const MockExamTimer: React.FC<MockExamTimerProps> = ({
  paperTitle = 'Official Past Examination',
  initialMinutes = 120, // Standard 2-hour Exeter math exam
  onClose,
}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(initialMinutes * 60);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  // Interval timer
  useEffect(() => {
    let interval: any = null;
    if (isActive && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsActive(false);
            setHasFinished(true);
            playCompletionChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSeconds]);

  const toggleTimer = () => setIsActive(prev => !prev);

  const resetTimer = (minutes: number = initialMinutes) => {
    const secs = minutes * 60;
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
    setIsActive(false);
    setHasFinished(false);
  };

  const addFiveMinutes = () => {
    setRemainingSeconds(prev => prev + 300);
    setTotalSeconds(prev => prev + 300);
    setHasFinished(false);
  };

  const formatCountdown = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const remaining = secs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const progressPercent = totalSeconds > 0 ? Math.round(((totalSeconds - remainingSeconds) / totalSeconds) * 100) : 0;

  // Minimized floating pill
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border border-[#00C4AD]/60 rounded-full px-3.5 py-2 shadow-2xl flex items-center gap-3 animate-fade-in text-white select-none">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${hasFinished ? 'bg-rose-500 animate-ping' : isActive ? 'bg-[#00C4AD] animate-pulse' : 'bg-amber-400'}`} />
          <span className="font-mono font-bold text-sm text-[#00C4AD]">
            {formatCountdown(remainingSeconds)}
          </span>
        </div>

        <button
          type="button"
          onClick={toggleTimer}
          className="p-1 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          title={isActive ? 'Pause' : 'Resume'}
        >
          {isActive ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
        </button>

        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="p-1 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          title="Expand"
        >
          <Maximize2 size={13} />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          title="Close Timer"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-[#0A0A0A]/95 backdrop-blur-md border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in select-none">
      {/* Top Header */}
      <div className="px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-white">
        <div className="flex items-center gap-2 min-w-0">
          <GraduationCap size={15} className="text-[#00C4AD] shrink-0" />
          <span className="text-xs font-semibold truncate">Timed Mock Exam Mode</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Minimize to Pill"
          >
            <Minimize2 size={13} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Close Timer"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-3.5">
        <div className="text-center">
          <p className="text-[11px] text-neutral-400 font-mono truncate mb-1">
            {paperTitle}
          </p>
          <div className={`font-mono text-4xl font-extrabold tracking-tight ${
            hasFinished
              ? 'text-rose-500 animate-pulse'
              : remainingSeconds <= 300
              ? 'text-amber-400'
              : 'text-[#00C4AD]'
          }`}>
            {formatCountdown(remainingSeconds)}
          </div>
          {hasFinished && (
            <p className="text-xs font-semibold text-rose-400 mt-1 flex items-center justify-center gap-1">
              <Bell size={13} /> Time is up! Conclude examination.
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              hasFinished ? 'bg-rose-500' : 'bg-[#00C4AD]'
            }`}
            style={{ width: `${Math.min(100, progressPercent)}%` }}
          />
        </div>

        {/* Quick presets */}
        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => resetTimer(120)}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
          >
            2 Hours
          </button>
          <button
            type="button"
            onClick={() => resetTimer(90)}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
          >
            90 Mins
          </button>
          <button
            type="button"
            onClick={() => resetTimer(60)}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
          >
            60 Mins
          </button>
          <button
            type="button"
            onClick={addFiveMinutes}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 hover:bg-neutral-700 text-[#00C4AD] flex items-center gap-0.5 cursor-pointer"
            title="Add 5 minutes reading time"
          >
            <Plus size={11} /> 5m
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={toggleTimer}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-[#007A6B] hover:bg-[#006a5d] text-white'
            }`}
          >
            {isActive ? (
              <>
                <Pause size={14} /> <span>Pause Exam</span>
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" /> <span>{remainingSeconds === 0 ? 'Restart Exam' : 'Start Exam'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => resetTimer()}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Reset to 2 Hours"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
