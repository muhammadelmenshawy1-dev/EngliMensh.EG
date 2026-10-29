import React from 'react';
import { Trophy, Sparkles, RotateCcw, ArrowRight, Award, Flame, CheckCircle2, Target } from 'lucide-react';

interface GameResultsScreenProps {
  gameTitle: string;
  isVictory: boolean;
  score: number;
  accuracyPercent: number;
  totalQuestions: number;
  correctCount: number;
  bestStreak?: number;
  earnedBadges?: string[];
  onPlayAgain: () => void;
  onChangeGame?: () => void;
  customStat?: { label: string; value: string };
}

export const GameResultsScreen: React.FC<GameResultsScreenProps> = ({
  gameTitle,
  isVictory,
  score,
  accuracyPercent,
  totalQuestions,
  correctCount,
  bestStreak = 0,
  earnedBadges = [],
  onPlayAgain,
  onChangeGame,
  customStat,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 text-white text-center space-y-6 shadow-2xl animate-fadeIn max-w-lg mx-auto">
      {/* Trophy / Result Header */}
      <div
        className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-xl ${
          isVictory
            ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-slate-950 shadow-amber-400/20'
            : 'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-300'
        }`}
      >
        <Trophy className="w-10 h-10 fill-current" />
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-black text-white">
          {isVictory ? '🎉 النصر والتميز الفائق!' : '🎮 محاولة ممتازة!'}
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          {gameTitle} — {isVictory ? 'حققت أداءً استثنائياً في التحدي' : 'واصل التدريب لترقية نقاطك وتصدر الترتيب'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Final Score</span>
          <span className="text-xl font-black text-amber-400 font-mono">+{score} pts</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Accuracy</span>
          <span className="text-xl font-black text-emerald-400 font-mono">{accuracyPercent}%</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Best Streak</span>
          <span className="text-xl font-black text-orange-400 font-mono">{bestStreak}x 🔥</span>
        </div>

        {customStat && (
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">{customStat.label}</span>
            <span className="text-base font-black text-blue-400 font-mono">{customStat.value}</span>
          </div>
        )}
      </div>

      {/* Unlocked Badges Notification */}
      {earnedBadges.length > 0 && (
        <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-xs text-amber-300 font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>مبروك! تم فتح شارة تميز جديدة في ملفك الشخصي!</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-2">
        <button
          onClick={onPlayAgain}
          className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>العب جولة جديدة (Play Again)</span>
        </button>

        {onChangeGame && (
          <button
            onClick={onChangeGame}
            className="w-full py-3 rounded-2xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>العودة لساحة الألعاب (Back to Games Arena)</span>
          </button>
        )}
      </div>
    </div>
  );
};
