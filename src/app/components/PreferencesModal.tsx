import React, { useState, useEffect } from 'react';
import {
  X,
  RefreshCw,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  Copy,
  Check,
  Calendar,
  Sliders,
  History,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  getSyncState,
  saveSyncState,
  checkAllModules,
  SyncState,
  SyncLogEntry,
  ARCHIVE_SCRIPT_CODE,
} from '../../services/syncService';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({ isOpen, onClose }) => {
  const [syncState, setSyncState] = useState<SyncState>(getSyncState);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentStatusMsg, setCurrentStatusMsg] = useState('All materials up to date');
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSyncState(getSyncState());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleAutoSync = () => {
    const updated: SyncState = {
      ...syncState,
      autoDailySync: !syncState.autoDailySync,
    };
    setSyncState(updated);
    saveSyncState(updated);
  };

  const handleRunManualSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setCurrentProgress(0);

    const newLogs = await checkAllModules((pct, mod, msg) => {
      setCurrentProgress(pct);
      setCurrentStatusMsg(msg);
    });

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated: SyncState = {
      ...syncState,
      lastChecked: nowStr,
      logs: [...newLogs, ...syncState.logs].slice(0, 50),
    };

    setSyncState(updated);
    saveSyncState(updated);
    setIsSyncing(false);
    setCurrentStatusMsg(`Sync complete at ${nowStr}. All modules verified.`);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(ARCHIVE_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleClearLogs = () => {
    const updated: SyncState = {
      ...syncState,
      logs: [],
    };
    setSyncState(updated);
    saveSyncState(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007A6B]/15 dark:bg-[#00C4AD]/15 text-[#007A6B] dark:text-[#00C4AD] flex items-center justify-center">
              <Sliders size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Preferences & Sync Manager</h2>
              <p className="text-xs text-muted-foreground">Automated daily scraper, file differential tracking & logs</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Section 1: Sync Progress & Manual Trigger */}
          <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw size={15} className={`text-[#007A6B] dark:text-[#00C4AD] ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="font-semibold text-foreground text-xs uppercase tracking-wider">
                  Differential Module Sync
                </span>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                <Clock size={12} />
                <span>Last checked: {syncState.lastChecked || 'Never'}</span>
              </span>
            </div>

            {/* Thin progress bar requested by user */}
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full bg-[#007A6B] dark:bg-[#00C4AD] transition-all duration-300 rounded-full ${
                    isSyncing ? 'animate-pulse' : ''
                  }`}
                  style={{ width: `${isSyncing ? currentProgress : 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="truncate">{isSyncing ? currentStatusMsg : 'All 14 enrolled modules verified & up to date'}</span>
                {isSyncing && <span className="font-mono font-bold text-[#007A6B] dark:text-[#00C4AD]">{currentProgress}%</span>}
              </div>
            </div>

            {/* Sync Action Button */}
            <div className="pt-1 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Compares local files against remote Moodle tiles. Only downloads what changed.
              </p>
              <button
                type="button"
                onClick={handleRunManualSync}
                disabled={isSyncing}
                className="px-3.5 py-1.5 rounded-lg bg-[#007A6B] hover:bg-[#006a5d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
                <span>{isSyncing ? 'Checking...' : 'Check for Updates'}</span>
              </button>
            </div>
          </div>

          {/* Section 2: Automation Settings */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Automation & Synchronization
            </h3>
            <div className="bg-muted/20 border border-border rounded-xl divide-y divide-border/60">
              {/* Daily Sync Toggle */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground text-xs sm:text-sm">Automated Daily Sync</p>
                  <p className="text-xs text-muted-foreground">
                    Automatically checks ELE 3 course tiles once every 24 hours when the app is launched.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleAutoSync}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    syncState.autoDailySync ? 'bg-[#007A6B] dark:bg-[#00C4AD]' : 'bg-muted border border-border'
                  }`}
                >
                  <div
                    className={`bg-white dark:bg-[#002B2B] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      syncState.autoDailySync ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Copy Console Archiver Script */}
              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground text-xs sm:text-sm">Console Archiver Script</p>
                  <p className="text-xs text-muted-foreground">
                    Copy your sorted tile archiver script with differential skip to run in DevTools console.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedScript ? <Check size={13} className="text-[#00C4AD]" /> : <Copy size={13} />}
                  <span>{copiedScript ? 'Copied Script!' : 'Copy Script'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Change Log & Activity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <History size={14} className="text-[#007A6B] dark:text-[#00C4AD]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Change Log & Recent Updates
                </h3>
              </div>
              {syncState.logs.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearLogs}
                  className="text-[11px] text-muted-foreground hover:text-foreground hover:underline cursor-pointer"
                >
                  Clear log
                </button>
              )}
            </div>

            <div className="bg-muted/15 border border-border rounded-xl overflow-hidden max-h-56 overflow-y-auto divide-y divide-border/50">
              {syncState.logs.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground">
                  No sync events recorded yet. Run a check to view updates.
                </div>
              ) : (
                syncState.logs.map(log => (
                  <div key={log.id} className="p-3 flex items-center justify-between gap-3 text-xs hover:bg-muted/30 transition-colors">
                    <div className="min-w-0 flex items-center gap-2.5">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                          log.type === 'added'
                            ? 'bg-emerald-500/15 text-emerald-500'
                            : log.type === 'updated'
                            ? 'bg-blue-500/15 text-blue-500'
                            : 'bg-[#007A6B]/15 dark:bg-[#00C4AD]/15 text-[#007A6B] dark:text-[#00C4AD]'
                        }`}
                      >
                        {log.type}
                      </span>
                      <span className="font-semibold text-foreground font-mono">{log.moduleCode}</span>
                      <span className="text-muted-foreground truncate">{log.description}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono shrink-0">{log.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
