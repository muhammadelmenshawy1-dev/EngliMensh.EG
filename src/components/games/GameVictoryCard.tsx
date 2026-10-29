import React, { useState } from 'react';
import { Trophy, Star, RotateCcw, ArrowRight, Award, Zap, CheckCircle2, XCircle, ChevronDown, ChevronUp, Sparkles, Flame, Clock } from 'lucide-react';
import { SessionResult, AnswerRecord } from '../../types/gameQuestions.ts';

interface GameVictoryCardProps {
  session: SessionResult;
  onPlayAgain: () => void;
  onNextLevel?: () => void;
  hasNextLevel?: boolean;
  onChooseAnotherGame: () => void;
}

export const GameVictoryCard: React.FC<GameVictoryCardProps> = ({
  session,
  onPlayAgain,
  onNextLevel,
  hasNextLevel = true,
  onChooseAnotherGame,
}) => {
  const [showMistakesReview, setShowMistakesReview] = useState<boolean>(false);

  const wrongAnswers = session.answers.filter((a) => !a.isCorrect);
  const isPerfect = session.accuracyPercent === 100;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 relative overflow-hidden animate-fadeIn max-w-xl mx-auto">
      {/* Background Radiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Star Display */}
      <div className="text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{session.gameTitle}</span>
        </div>

        {/* 3 Animated Stars */}
        <div className="flex items-center justify-center gap-3 py-2">
          {[1, 2, 3].map((starNum) => {
            const isEarned = starNum <= session.starsAwarded;
            return (
              <div
                key={starNum}
                className={`transition-all duration-700 transform ${
                  isEarned
                    ? 'scale-110 text-amber-400 animate-bounce'
                    : 'scale-90 text-slate-700 opacity-40'
                }`}
                style={{ animationDelay: `${starNum * 150}ms` }}
              >
                <Star
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${
                    isEarned ? 'fill-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]' : ''
                  }`}
                />
              </div>
            );
          })}
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {isPerfect
            ? '🎉 نصر ساحق وعلامة كاملة!'
            : session.starsAwarded === 3
            ? '🏆 أداء أسطوري متميز!'
            : session.starsAwarded === 2
            ? '⭐ إنجاز رائع ومتميز!'
            : '👍 محاولة مشرفة! واصل التقدم!'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-medium">
          {session.starsAwarded === 3
            ? 'لقد أثبتّ تمكنك الكامل من مفردات وقواعد المنهج بأعلى دقة وسرعة!'
            : 'استمر في خوض التحديات والمراجعة لترقية النجوم وفتح الشارات الماسية!'}
        </p>
      </div>

      {/* Score and Stats Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center relative z-10 font-mono">
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Final Score</span>
          <span className="text-base sm:text-lg font-black text-amber-400">{session.totalScore} pts</span>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Accuracy</span>
          <span className="text-base sm:text-lg font-black text-emerald-400">{session.accuracyPercent}%</span>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Max Combo</span>
          <span className="text-base sm:text-lg font-black text-orange-400 flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-current text-orange-500" />
            <span>{session.highestStreak}x</span>
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Time</span>
          <span className="text-base sm:text-lg font-black text-blue-300 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{session.durationSeconds}s</span>
          </span>
        </div>
      </div>

      {/* Correct / Incorrect Summary Pill */}
      <div className="flex items-center justify-between text-xs bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 font-bold relative z-10">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>{session.correctCount} إجابات صحيحة</span>
        </div>
        <div className="flex items-center gap-1.5 text-rose-400">
          <XCircle className="w-4 h-4" />
          <span>{session.incorrectCount} أخطاء تحتاج مراجعة</span>
        </div>
      </div>

      {/* Mistakes Review Drawer Toggle */}
      {wrongAnswers.length > 0 && (
        <div className="space-y-3 relative z-10">
          <button
            onClick={() => setShowMistakesReview(!showMistakesReview)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-bold text-slate-300 flex items-center justify-between border border-slate-700 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px]">
                {wrongAnswers.length}
              </span>
              <span>مراجعة الأسئلة الخاطئة ونماذج الإجابة (Review Mistakes)</span>
            </div>
            {showMistakesReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showMistakesReview && (
            <div className="space-y-2.5 max-h-60 overflow-y-auto p-1 pr-2 scrollbar-thin">
              {wrongAnswers.map((w, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-rose-500/30 text-xs space-y-1.5">
                  <div className="font-bold text-white leading-snug" dir="ltr">
                    {w.question}
                  </div>
                  {w.questionAr && <p className="text-slate-400 text-[11px]" dir="rtl">{w.questionAr}</p>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-600/30">
                      ❌ إجابتك: {w.selectedChoiceText}
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-600/30">
                      ✅ الإجابة الصحيحة: {w.correctChoiceText}
                    </div>
                  </div>
                  {w.explanation && (
                    <p className="text-amber-200/90 text-[10px] leading-relaxed pt-1 border-t border-slate-800">
                      💡 {w.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Action Buttons */}
      <div className="space-y-2 relative z-10 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={onPlayAgain}
            className="py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer transition-transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>العب مجددًا (Play Again)</span>
          </button>

          {onNextLevel && hasNextLevel && (
            <button
              onClick={onNextLevel}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-transform active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>المستوى التالي (Next Level)</span>
            </button>
          )}
        </div>

        <button
          onClick={onChooseAnotherGame}
          className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors border border-slate-700"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          <span>العودة لقائمة الألعاب (Choose Another Game)</span>
        </button>
      </div>
    </div>
  );
};
