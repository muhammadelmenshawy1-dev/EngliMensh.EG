import React from 'react';
import { Sparkles, ShieldCheck, GraduationCap } from 'lucide-react';

export const HeroCover: React.FC = () => {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-amber-500/30 shadow-xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white mb-6 select-none"
      dir="ltr"
    >
      {/* Background Illustration Artwork */}
      <div className="absolute inset-0 opacity-40 md:opacity-50 pointer-events-none overflow-hidden">
        <img
          src="/app-cover.svg"
          alt="EngliMensh Scholarly Mascot"
          className="w-full h-full object-cover object-right md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
      </div>

      {/* Structured Content Container: explicit flex flex-col gap-[10px] for pristine natural flow */}
      <div
        className="relative z-10 p-5 sm:p-7 md:p-8 flex flex-col gap-[10px] max-w-2xl"
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        {/* Row 1: Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/90 text-blue-200 text-xs font-bold border border-blue-400/40 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
            <span>MOE 2026 Official Specs</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40 shadow-xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Supervised by Mr. Mohammad El-Menshawy</span>
          </span>
        </div>

        {/* Row 2: Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-md leading-tight">
          EngliMensh <span className="text-amber-400">•</span> Master English, The Mensh Way
        </h1>

        {/* Row 3: Teacher Subtitle */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300/90">
          <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Secondary Stage English Center · 1st Secondary Ministry Exam Engine</span>
        </div>

        {/* Row 4: Description */}
        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed drop-shadow-xs max-w-xl">
          Comprehensive Secondary Stage English platform featuring progressive unit levels, authentic governorate papers, novel critical thinking, and teacher-guided evaluations.
        </p>
      </div>
    </div>
  );
};
