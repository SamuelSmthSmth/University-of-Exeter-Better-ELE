import React, { useEffect } from "react";
import { X, ShieldCheck, Lock, Database, Eye, Globe, Building2, Mail, Download, Printer, Trash2 } from "lucide-react";

export function PrivacyPolicyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 print:p-0 print:bg-white print:fixed">
      <div 
        role="dialog"
        aria-labelledby="privacy-dialog-title"
        aria-modal="true"
        className="bg-card w-full max-w-3xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 print:border-none print:shadow-none print:max-h-none print:w-full"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#003C3C] text-white flex items-center justify-between shrink-0 print:bg-white print:text-black print:border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00C4AD]/20 border border-[#00C4AD]/40 flex items-center justify-center text-[#00C4AD] print:hidden">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 id="privacy-dialog-title" className="text-lg font-bold tracking-tight">University of Exeter Privacy Notice</h2>
              <p className="text-xs text-white/70 print:text-gray-500">Programme Planner & Academic Path Exploration · UK GDPR Compliance</p>
            </div>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={() => window.print()}
              title="Print Policy"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Printer size={18} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close privacy notice"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-foreground leading-relaxed">
          <div className="p-4 bg-muted/40 rounded-xl border border-border flex items-start gap-3.5">
            <Lock size={20} className="text-[#00A693] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-foreground font-semibold">Privacy First & Local Storage Model</strong>
              <p className="text-muted-foreground mt-0.5">
                The University of Exeter Programme Planner is designed with privacy by default. Your drafted module selections, comparison items, timetable sync links, and plan profiles are stored <strong>strictly locally within your web browser</strong> (`localStorage`). They are not transmitted or stored on any central analytics database.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Building2 size={16} className="text-[#00A693]" />
              1. Data Controller
            </h3>
            <p className="text-muted-foreground">
              The University of Exeter is the Data Controller for student educational systems under the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018. For enquiries regarding this application, contact the Information Governance Office at Northcote House, The Queen's Drive, Exeter, EX4 4QJ.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Database size={16} className="text-[#00A693]" />
              2. Data We Collect and Process
            </h3>
            <p className="text-muted-foreground">
              When utilizing the Programme Planner, the following data points may be processed:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><strong>Module Planning Data:</strong> Selected courses, prerequisites, stage credits, and created plan profiles saved directly to your local device.</li>
              <li><strong>Timetable Integration:</strong> If you synchronize your personal Exeter MyTimetable via iCalendar (.ics) URL, that webcal address is stored in local storage to pull your timetable events. No login credentials or university SSO passwords are required or requested.</li>
              <li><strong>Interface Preferences:</strong> Theme setting (Dark/Light mode) and accessibility customizations (text scaling, high contrast, reduced motion).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Globe size={16} className="text-[#00A693]" />
              3. External Academic Data Sources
            </h3>
            <p className="text-muted-foreground">
              Course information and module structures are populated dynamically via read-only requests to the University of Exeter's public TimeEdit API (Academic Year 2026/2027) and Exeter Learning Environment (ELE) course registries. These calls are completely anonymous and transmit no personally identifiable data.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Eye size={16} className="text-[#00A693]" />
              4. Cookies and Web Storage
            </h3>
            <p className="text-muted-foreground">
              We do not use third-party advertising cookies. We utilize essential client-side web storage mechanisms strictly to keep your session alive, remember which programme you are viewing, and preserve your customized module combinations between browser restarts.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Mail size={16} className="text-[#00A693]" />
              5. Your Rights and Contact Details
            </h3>
            <p className="text-muted-foreground">
              Under UK GDPR, you have the right to request access to, rectification of, or erasure of your personal data. Because data is stored locally on your device, you can completely erase all stored preferences at any time by clearing your browser cache or clicking "Reset" within the planner.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (confirm("Are you sure you want to erase all locally stored data, saved plans, calendar feeds, and preferences? This action cannot be undone.")) {
                    try {
                      localStorage.clear();
                      sessionStorage.clear();
                    } catch {}
                    window.location.href = window.location.origin + window.location.pathname;
                  }
                }}
                className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-700 dark:text-red-300 border border-red-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Trash2 size={15} />
                <span>Erase All Local Storage & Reset App</span>
              </button>
            </div>
            <div className="text-xs bg-muted/30 p-3 rounded-lg border border-border mt-2">
              <p><strong>Exeter Data Protection Officer:</strong> <a href="mailto:dataprotection@exeter.ac.uk" className="text-[#00A693] underline">dataprotection@exeter.ac.uk</a></p>
              <p className="mt-1"><strong>Official University Information Governance:</strong> <a href="https://www.exeter.ac.uk/about/oursite/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#00A693] underline">exeter.ac.uk/about/oursite/privacy</a></p>
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-muted/20 border-t border-border flex items-center justify-between shrink-0 print:hidden">
          <span className="text-xs text-muted-foreground">Last updated: September 2026</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#003C3C] hover:bg-[#00524d] text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
