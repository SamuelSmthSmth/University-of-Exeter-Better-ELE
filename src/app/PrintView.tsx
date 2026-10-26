import React, { useMemo } from "react";
import { type Module, type Programme, type StageReq } from "../api/timeedit";
import { getStageCreditDetails } from "./App";
import { CheckCircle2 } from "lucide-react";
import { buildNodePos, NW, NH } from "./App";

export function PrintView({
  programme,
  modules,
  stageReqs,
  selected,
  printMode,
}: {
  programme: Programme;
  modules: Module[];
  stageReqs: StageReq[];
  selected: Set<string>;
  printMode: "eco" | "full" | null;
}) {
  const selectedModules = modules.filter(
    (m) => m.type === "compulsory" || selected.has(m.code)
  );

  const totalDetails = stageReqs.reduce(
    (acc, req) => {
      const d = getStageCreditDetails(req.stage, selected, modules);
      return {
        total: acc.total + d.total,
        required: acc.required + req.totalRequired,
        term1: acc.term1 + d.term1,
        term2: acc.term2 + d.term2,
        other: acc.other + d.other,
      };
    },
    { total: 0, required: 0, term1: 0, term2: 0, other: 0 }
  );

  const masteryPct = totalDetails.required > 0
    ? Math.round((totalDetails.total / totalDetails.required) * 100)
    : 0;

  const dateStr = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const isEco = printMode === "eco";

  // Build node positions for the constellation map
  const { nodePos, svgWidth, svgHeight } = useMemo(() => {
    // Only map selected modules
    const mapped = buildNodePos(selectedModules, "standard");
    let maxX = 0, maxY = 0;
    for (const pos of Object.values(mapped)) {
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y > maxY) maxY = pos.y;
    }
    return {
      nodePos: mapped,
      svgWidth: Math.max(800, maxX + NW),
      svgHeight: Math.max(400, maxY + NH),
    };
  }, [selectedModules]);

  return (
    <div className="hidden print:block bg-white text-[#111A19] font-sans antialiased print:w-full print:p-0">
      {/* ── PAGE 1: COVER PAGE ── */}
      <div 
        className={`min-h-screen flex flex-col justify-between p-16 break-after-page ${isEco ? "bg-white text-[#003C3C]" : "bg-[#00A693] text-white"}`}
        style={!isEco ? {
          backgroundColor: "#00A693",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        } : {}}
      >
        {/* Top Branding */}
        <div className="flex items-center justify-between">
          <img 
            src={isEco ? "https://www.exeter.ac.uk/v8media/global/images/UOE-green.svg" : "https://www.exeter.ac.uk/v8media/recruitmentsites/images/homepage/uoe-logo.svg"}
            alt="University of Exeter"
            className="h-14"
          />
          <span className="text-xs font-bold tracking-widest uppercase opacity-75">
            Degree Plan Report
          </span>
        </div>

        {/* Central Info Block */}
        <div className="my-auto space-y-8">
          <p className={`${isEco ? "text-[#00A693]" : "text-white/70"} tracking-[0.25em] text-xs font-bold uppercase`}>
            Official Programme Syllabus Pathway
          </p>
          
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight max-w-4xl">
            {programme.title}
          </h1>

          <div className={`inline-flex items-center gap-3 px-3 py-1.5 rounded-full border ${isEco ? "bg-gray-50 border-gray-200" : "bg-white/10 border-white/20"} backdrop-blur-sm`}>
            <span className={`w-2 h-2 rounded-full ${isEco ? "bg-[#00A693]" : "bg-white"} animate-pulse`} />
            <span className="text-xs font-bold uppercase tracking-wider">{programme.code}</span>
          </div>

          {/* Large Stats Display */}
          <div className="pt-8 flex items-center gap-8">
            <div className="w-24 h-24 flex items-center justify-center relative">
              <svg viewBox="0 0 96 96" className="absolute inset-0 w-full h-full -rotate-90 overflow-visible">
                {/* Background Ring */}
                <circle 
                  cx="48" 
                  cy="48" 
                  r="44" 
                  fill="none" 
                  stroke={isEco ? "#e5e7eb" : "rgba(255,255,255,0.3)"} 
                  strokeWidth="6" 
                />
                {/* Progress Ring */}
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke={isEco ? "#00A693" : "#ffffff"}
                  strokeWidth="6"
                  strokeDasharray={276.46}
                  strokeDashoffset={276.46 * (1 - masteryPct / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-2xl font-black relative z-10">
                {masteryPct}%
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold uppercase tracking-wider">Degree Progression</p>
              <p className={`text-xs ${isEco ? "text-gray-500" : "text-white/75"}`}>
                {totalDetails.total} / {totalDetails.required} credits planned across all stages
              </p>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className={`border-t ${isEco ? "border-gray-200 text-gray-500" : "border-white/20 text-white/80"} pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs`}>
          <p className="font-semibold">Generated on {dateStr}</p>
          <p className="font-mono">University of Exeter Official Syllabus</p>
        </div>
      </div>

      {/* ── PAGE 2: SUMMARY DASHBOARD & CONSTELLATION MAP ── */}
      <div className="min-h-screen flex flex-col p-16">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003C3C] tracking-tight">
              Progression Summary
            </h2>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A693] mt-1">
              <CheckCircle2 size={14} /> Ready for Review
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 shrink-0">
          {/* Card 1: Credit Distribution */}
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3">
            <h3 className="text-xs font-bold text-[#003C3C] uppercase tracking-wider">
              Workload Balancer
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-semibold">
                <span>Term 1 (Autumn)</span>
                <span className="text-[#007A6B]">{totalDetails.term1} credits</span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold">
                <span>Term 2 (Spring)</span>
                <span className="text-[#00C4AD]">{totalDetails.term2} credits</span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                <span>Full Year / Other</span>
                <span>{totalDetails.other} credits</span>
              </div>
              
              {/* Stacked Workload Bar */}
              <div className="flex h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-[#007A6B]" style={{ width: `${(totalDetails.term1 / Math.max(1, totalDetails.total)) * 100}%` }} />
                <div className="h-full bg-[#00C4AD]" style={{ width: `${(totalDetails.term2 / Math.max(1, totalDetails.total)) * 100}%` }} />
                <div className="h-full bg-[#00A693]" style={{ width: `${(totalDetails.other / Math.max(1, totalDetails.total)) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Card 2: Compulsory vs Optional Ratio */}
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3">
            <h3 className="text-xs font-bold text-[#003C3C] uppercase tracking-wider">
              Degree Path Ratio
            </h3>
            <div className="space-y-2">
              {(() => {
                const comp = selectedModules.filter(m => m.type === "compulsory").reduce((s, m) => s + m.credits, 0);
                const opt = selectedModules.filter(m => m.type === "optional").reduce((s, m) => s + m.credits, 0);
                const total = Math.max(1, comp + opt);
                return (
                  <>
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span>Compulsory Modules</span>
                      <span className="text-[#003C3C]">{comp} credits ({Math.round((comp / total) * 100)}%)</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span>Optional Modules</span>
                      <span className="text-[#00A693]">{opt} credits ({Math.round((opt / total) * 100)}%)</span>
                    </div>
                    <div className="flex h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-[#003C3C]" style={{ width: `${(comp / total) * 100}%` }} />
                      <div className="h-full bg-[#00A693]" style={{ width: `${(opt / total) * 100}%` }} />
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Stage Table */}
        <table className="w-full text-xs border-collapse shrink-0 mb-6">
          <thead>
            <tr className="border-b border-gray-200 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-2 px-2">Stage</th>
              <th className="py-2 px-2">Term 1</th>
              <th className="py-2 px-2">Term 2</th>
              <th className="py-2 px-2">Total Credits</th>
              <th className="py-2 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {stageReqs.map((req) => {
              const d = getStageCreditDetails(req.stage, selected, modules);
              const isMet = d.total >= req.totalRequired;
              return (
                <tr key={req.stage} className="border-b border-gray-100 last:border-none">
                  <td className="py-2 px-2 font-bold text-[#003C3C]">{req.label}</td>
                  <td className="py-2 px-2">{d.term1} cr</td>
                  <td className="py-2 px-2">{d.term2} cr</td>
                  <td className="py-2 px-2 font-bold">
                    {d.total} <span className="text-gray-400 font-normal">/ {req.totalRequired}</span>
                  </td>
                  <td className="py-2 px-2 text-right">
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isMet ? "bg-[#E0EFED] text-[#007A6B]" : "bg-red-50 text-red-600"
                    }`}>
                      {isMet ? "Completed" : `${req.totalRequired - d.total} cr remaining`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Dual Column: Nebula Path & Celestial Constellation */}
        <div className="flex-1 min-h-0 border-t border-gray-200 pt-6 flex gap-6">
          {/* Left: Nebula Timeline */}
          <div className="w-[35%] flex flex-col">
            <h3 className="text-sm font-bold text-[#003C3C] uppercase tracking-wider mb-6">Academic Journey</h3>
            <div className="flex-1 overflow-hidden relative pl-4 border-l-[3px] border-[#00A693]/20 ml-2 space-y-6">
              {[1, 2, 3, 4].map(stage => {
                const stageMods = selectedModules.filter(m => m.stage === stage);
                if (stageMods.length === 0) return null;
                return (
                  <div key={stage} className="relative">
                    <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#00A693] ring-4 ring-white" />
                    <h4 className="text-[11px] font-extrabold text-[#003C3C] uppercase tracking-wider mb-2">Stage {stage}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {stageMods.map(m => (
                        <span key={m.code} className={`px-2 py-0.5 rounded text-[9px] font-bold ${m.type === "compulsory" ? "bg-gray-100 text-gray-700" : "bg-[#E0EFED] text-[#007A6B]"}`}>
                          {m.code}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Extra Stats, Notes, and Abstract Graphic */}
          <div className="w-[65%] flex flex-col gap-6">
            <h3 className="text-sm font-bold text-[#003C3C] uppercase tracking-wider text-right">Pathway Analysis</h3>
            
            <div className="flex gap-6">
              {/* Extra Stats */}
              <div className="flex-1 flex gap-4">
                <div className="flex-1 p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Modules</span>
                  <span className="text-2xl font-black text-[#003C3C]">{selectedModules.length}</span>
                </div>
                <div className="flex-1 p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Avg Credits / Mod</span>
                  <span className="text-2xl font-black text-[#00A693]">
                    {Math.round(totalDetails.total / Math.max(1, selectedModules.length))}
                  </span>
                </div>
              </div>
            </div>

            {/* Advanced Metrics & Signature */}
            <div className="flex-1 p-5 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">Advanced Metrics</span>
              
              <div className="flex-1 space-y-4">
                {/* Metric 1: Condonability Profile */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1.5">
                    <span>Condonable Credits</span>
                    <span className="text-[#00A693]">
                      {selectedModules.filter(m => m.condonable).reduce((s, m) => s + m.credits, 0)} cr
                    </span>
                  </div>
                  <div className="flex h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00A693]" style={{ width: `${(selectedModules.filter(m => m.condonable).reduce((s, m) => s + m.credits, 0) / Math.max(1, totalDetails.total)) * 100}%` }} />
                  </div>
                </div>

                {/* Metric 2: Stage Distribution */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1.5">
                    <span>Stage Credit Spread</span>
                  </div>
                  <div className="flex items-end gap-2 h-8 w-full px-1">
                    {[1, 2, 3, 4].map(stg => {
                      const stgCredits = selectedModules.filter(m => m.stage === stg).reduce((s, m) => s + m.credits, 0);
                      const heightPct = (stgCredits / Math.max(1, totalDetails.total)) * 100;
                      return (
                        <div key={stg} className="flex-1 flex flex-col justify-end gap-1 h-full">
                          <div className={`w-full rounded-sm ${isEco ? "bg-[#003C3C]" : "bg-[#00C4AD]"}`} style={{ height: `${Math.max(4, heightPct)}%`, minHeight: "4px" }} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[8px] font-bold text-gray-400 mt-1 px-2">
                    <span>S1</span><span>S2</span><span>S3</span><span>S4</span>
                  </div>
                </div>

                {/* Metric 3: Workload Trajectory (Line Graph) */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold mb-1 block">Term Workload Trajectory</span>
                  <div className="w-full h-12 relative mt-2">
                    {(() => {
                      const pts = [];
                      for (let s = 1; s <= 4; s++) {
                        pts.push(selectedModules.filter(m => m.stage === s && m.term.includes("AUT")).reduce((sum, m) => sum + m.credits, 0));
                        pts.push(selectedModules.filter(m => m.stage === s && m.term.includes("SPR")).reduce((sum, m) => sum + m.credits, 0));
                      }
                      const maxVal = Math.max(30, ...pts);
                      const coords = pts.map((val, i) => {
                        const x = (i / 7) * 100;
                        const y = 28 - ((val / maxVal) * 26);
                        return { x, y };
                      });
                      
                      let pathD = `M ${coords[0].x},${coords[0].y} `;
                      let fillPathD = `M ${coords[0].x},30 L ${coords[0].x},${coords[0].y} `;
                      for (let i = 1; i < coords.length; i++) {
                        const prev = coords[i-1];
                        const curr = coords[i];
                        const midX = prev.x + (curr.x - prev.x) / 2;
                        const curve = `C ${midX},${prev.y} ${midX},${curr.y} ${curr.x},${curr.y} `;
                        pathD += curve;
                        fillPathD += curve;
                      }
                      fillPathD += `L ${coords[coords.length - 1].x},30 Z`;
                      
                      return (
                        <>
                          <svg viewBox="0 0 100 30" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={isEco ? "#00A693" : "#00C4AD"} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={isEco ? "#00A693" : "#00C4AD"} stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <line x1="0" y1="15" x2="100" y2="15" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 4" className="text-gray-200" />
                            <path d={fillPathD} fill="url(#curveGradient)" />
                            <path d={pathD} fill="none" stroke={isEco ? "#00A693" : "#00C4AD"} strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
                          </svg>
                          {/* HTML-based Dots to ensure perfect circles regardless of container stretch */}
                          {coords.map((c, i) => (
                            <div 
                              key={i}
                              className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-white flex items-center justify-center shadow-sm"
                              style={{ left: `${c.x}%`, top: `${(c.y / 30) * 100}%`, width: '5px', height: '5px' }}
                            >
                              <div className={`w-1 h-1 rounded-full ${isEco ? "bg-[#003C3C]" : "bg-[#00C4AD]"}`} />
                            </div>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 flex justify-between items-end">
                <div className="w-1/2">
                  <div className="border-b border-gray-400 w-full h-px mb-2"></div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Advisor Signature</span>
                </div>
                
                {/* Tiny Dispersed Dots Graphic in Bottom Right */}
                <div className="w-16 h-16 relative bg-white border border-gray-100 rounded shadow-sm overflow-hidden flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2" preserveAspectRatio="xMidYMid meet">
                    {selectedModules.map((m, i) => {
                      // Deterministic pseudo-random positions
                      const x = (i * 137.5) % 90 + 5;
                      const y = (i * 93.1) % 90 + 5;
                      const isTerm1 = m.term.includes("AUT");
                      return (
                        <circle 
                          key={m.code}
                          cx={x} 
                          cy={y} 
                          r={isEco ? "2.5" : "3"} 
                          fill={isTerm1 ? (isEco ? "#003C3C" : "#003C3C") : (isEco ? "#00A693" : "#00C4AD")} 
                          opacity={0.8}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
