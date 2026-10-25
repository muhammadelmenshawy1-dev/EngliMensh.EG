import React from 'react';
import { Trophy, Sparkles, Flame, Gamepad2, Award, ArrowRight } from 'lucide-react';
import { StudentProfile } from '../../types.ts';
import { QuickWordMatch } from './QuickWordMatch.tsx';
import { ALL_BADGES } from '../../services/studentStorage.ts';

interface GamesArenaProps {
  student: StudentProfile | null;
  onPointsEarned: (points: number, newBadges: string[]) => void;
  onNavigateToExams?: () => void;
}

export const GamesArena: React.FC<GamesArenaProps> = ({
  student,
  onPointsEarned,
  onNavigateToExams,
}) => {
  const studentBadges = new Set(student?.badges || []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ARENA HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border border-indigo-900/50 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Interactive Games Arena</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-600/60 border border-blue-400/40 text-blue-200 text-xs font-bold">
              Secondary 1 Vocabulary & Grammar
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            الألعاب التعليمية التفاعلية
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            اكتسب المفردات وتدرب على القواعد بطرق ممتعة وسريعة. احصل على نقاط لترقية تصنيفك وفتح شارات التميز في حسابك الشخصي!
          </p>
        </div>

        {/* Quick Stats Pill Strip */}
        <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-indigo-900/40">
          <div className="bg-slate-900/70 p-3 rounded-2xl border border-indigo-800/40">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Points</span>
            <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">
              {student?.totalScore || 0} pts
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-indigo-800/40">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Best Streak</span>
            <span className="text-lg sm:text-xl font-black text-orange-400 font-mono">
              {student?.highStreak || 0}x 🔥
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-indigo-800/40">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Games Played</span>
            <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
              {student?.gamesPlayed || 0}
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-indigo-800/40">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Badges Unlocked</span>
            <span className="text-lg sm:text-xl font-black text-blue-400 font-mono">
              {student?.badges?.length || 1} / {ALL_BADGES.length}
            </span>
          </div>
        </div>
      </div>

      {/* PRIMARY GAME: QUICK WORD MATCH */}
      <QuickWordMatch onGameFinished={onPointsEarned} />

      {/* BADGES SHOWCASE SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                شارات التميز والإنجاز (Badges Showcase)
              </h3>
              <p className="text-xs text-slate-500">
                شارات تفتح تلقائياً عند حل الامتحانات وتفوقك في الألعاب التفاعلية
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto">
            {student?.badges?.length || 1} of {ALL_BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = studentBadges.has(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/60 border-amber-200/90 shadow-xs'
                    : 'bg-slate-50 border-slate-200/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`text-2xl p-2 rounded-2xl shrink-0 ${
                      isUnlocked ? 'bg-amber-200/60' : 'bg-slate-200 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{badge.title}</span>
                      {isUnlocked && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800">
                          مكتسبة
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-bold text-amber-800">{badge.titleAr}</div>
                    <p className="text-[10px] text-slate-500 leading-tight">{badge.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
