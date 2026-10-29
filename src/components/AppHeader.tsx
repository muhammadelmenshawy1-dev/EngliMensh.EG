import React from 'react';
import { Flame, Star, ShieldCheck, Trophy } from 'lucide-react';
import { StudentProfile } from '../types.ts';
import { loadLearningState } from '../services/learningStore.ts';

interface AppHeaderProps {
  student: StudentProfile | null;
  totalXp?: number;
  streakDays?: number;
  onOpenProfile?: () => void;
  onOpenLeaderboard?: () => void;
  onLogoClick?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  student,
  totalXp,
  streakDays,
  onOpenProfile,
  onOpenLeaderboard,
  onLogoClick,
}) => {
  const learningState = loadLearningState();
  const displayXp = totalXp ?? Math.max(learningState.xp, student?.totalScore || 0);
  const displayStreak = streakDays ?? Math.max(learningState.streakDays, student?.highStreak || 1);

  return (
    <header
      className="sticky top-0 z-30 bg-gradient-to-r from-[#1E3A8A] via-[#172E6E] to-[#0F2856] border-b border-blue-800/80 shadow-md px-3 sm:px-5 py-2.5 transition-all select-none"
      dir="rtl"
    >
      <div className="max-w-lg mx-auto flex items-center justify-between gap-2">
        {/* Right in RTL: Streak Pill */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full border border-amber-300/60 shadow-sm cursor-pointer hover:brightness-105 active:scale-95 transition-all min-h-[36px]"
          title="أيام الحماس المتتالية"
        >
          <Flame className="w-4 h-4 text-yellow-100 fill-yellow-200" />
          <span className="text-xs sm:text-sm font-black text-white tracking-wide">
            {displayStreak} أيام
          </span>
        </button>

        {/* Center: Brand Logo */}
        <button
          type="button"
          onClick={onLogoClick || onOpenProfile}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F59E0B] via-amber-400 to-yellow-200 p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0F2856] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
            </div>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-sm sm:text-base font-black tracking-tight text-white leading-none">
              EngliMensh<span className="text-[#F59E0B]">.eg</span>
            </span>
            <span className="text-[10px] text-blue-200 font-semibold mt-0.5">
              المنشاوي للغة الإنجليزية
            </span>
          </div>
        </button>

        {/* Left in RTL: XP Counter & Trophy Button */}
        <div className="flex items-center gap-1.5">
          {onOpenLeaderboard && (
            <button
              type="button"
              onClick={onOpenLeaderboard}
              className="p-2 rounded-full bg-blue-950/70 hover:bg-blue-900 text-[#F59E0B] border border-blue-700/70 transition-colors cursor-pointer"
              title="لوحة الصدارة والجوائز"
              aria-label="لوحة الصدارة والجوائز"
            >
              <Trophy className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F2856]/90 rounded-full border border-amber-400/50 shadow-xs cursor-pointer hover:border-amber-300 transition-all min-h-[36px]"
            title="إجمالي نقاط الخبرة XP"
          >
            <span className="text-xs sm:text-sm font-black text-white">
              {displayXp}
            </span>
            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
          </button>
        </div>
      </div>
    </header>
  );
};
