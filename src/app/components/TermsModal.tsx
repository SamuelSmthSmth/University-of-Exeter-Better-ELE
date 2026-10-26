import React, { useEffect } from "react";
import { X, Scale, AlertTriangle, BookOpen, CheckCircle, GraduationCap, Printer } from "lucide-react";

export function TermsModal({
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
        aria-labelledby="terms-dialog-title"
        aria-modal="true"
        className="bg-card w-full max-w-3xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 print:border-none print:shadow-none print:max-h-none print:w-full"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#003C3C] text-white flex items-center justify-between shrink-0 print:bg-white print:text-black print:border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00C4AD]/20 border border-[#00C4AD]/40 flex items-center justify-center text-[#00C4AD] print:hidden">
              <Scale size={22} />
            </div>
            <div>
              <h2 id="terms-dialog-title" className="text-lg font-bold tracking-tight">Terms of Service & Academic Use</h2>
              <p className="text-xs text-white/70 print:text-gray-500">University of Exeter Programme Planner · Advisory Guidelines</p>
            </div>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={() => window.print()}
              title="Print Terms"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Printer size={18} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close terms of service"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-foreground leading-relaxed">
          {/* Important Academic Advisory Notice */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3.5">
            <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-amber-900 dark:text-amber-200 font-semibold">Advisory Educational Tool Only</strong>
              <p className="text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                The University of Exeter Programme Planner is an advisory interactive simulator. Building or saving a pathway here does <strong>not</strong> constitute official module registration. Formal module choices must be submitted via the official Exeter Student Record System (SITS/SRS) during your designated module selection window.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <GraduationCap size={16} className="text-[#00A693]" />
              1. Acceptance of Terms
            </h3>
            <p className="text-muted-foreground">
              By accessing and utilizing the University of Exeter Programme Planner, you agree to comply with these terms, the University of Exeter Student Regulations, and IT Acceptable Use Policy. If you do not agree with these guidelines, please discontinue use of this application.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <BookOpen size={16} className="text-[#00A693]" />
              2. Module Availability and Programme Constraints
            </h3>
            <p className="text-muted-foreground">
              While module descriptions, prerequisite trees, and credit requirements are mirrored from the University's 2026/27 academic syllabus:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Faculties and departments reserve the right to withdraw, adjust, or reschedule modules due to timetabling constraints, staffing changes, or cohort capacity caps.</li>
              <li>Prerequisite bypasses or co-requisite exemptions remain solely at the discretion of the respective Module Convenor and Director of Education.</li>
              <li>Students are responsible for ensuring that their combined module selections satisfy the total stage credit rules and accreditation requirements of their degree.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <CheckCircle size={16} className="text-[#00A693]" />
              3. Timetable Sync and Third-Party Data
            </h3>
            <p className="text-muted-foreground">
              The optional MyTimetable synchronization feature reads your personal iCalendar (.ics) feed directly to calculate clash probabilities and schedule alignment. You agree to use only your own calendar feed and understand that official timetable publications on Exeter MyTimetable take precedence in the event of schedule discrepancies.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Scale size={16} className="text-[#00A693]" />
              4. Intellectual Property
            </h3>
            <p className="text-muted-foreground">
              All University of Exeter heraldry, logos, module syllabi, and official curriculum data remain the intellectual property of the University of Exeter. This application is licensed for educational and personal academic planning purposes only.
            </p>
          </section>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-muted/20 border-t border-border flex items-center justify-between shrink-0 print:hidden">
          <span className="text-xs text-muted-foreground">Valid for 2026/2027 Academic Year</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#003C3C] hover:bg-[#00524d] text-white rounded-xl text-xs font-semibold transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
