import React, { useState } from 'react';
import { Trophy, Medal, Star, Clock, Target, Trash2, X, Filter } from 'lucide-react';
import { LeaderboardRecord, GameStage, GameDifficulty } from '../../types/gameQuestions.ts';

interface LocalLeaderboardProps {
  entries: LeaderboardRecord[];
  onClear: () => void;
  onClose?: () => void;
}

export const LocalLeaderboard: React.FC<LocalLeaderboardProps> = ({ entries, onClear, onClose }) => {
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<GameStage | 'all'>('all');
  const [showConfirmClear, setShowConfirmClear] = useState<boolean>(false);

  const filteredEntries = entries.filter((e) => {
    if (selectedGame !== 'all' && e.gameId !== selectedGame) return false;
    if (selectedStage !== 'all' && e.stage !== selectedStage) return false;
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6 relative overflow-hidden animate-fadeIn">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
            <Trophy className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>لوحة المتصدرين المحلية (Classroom Leaderboard)</span>
            </h2>
            <p className="text-xs text-slate-400">
              سجل البطولات والأرقام القياسية المحفوظة على هذا الجهاز
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {entries.length > 0 && (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="text-xs text-slate-400 hover:text-rose-400 font-bold transition-colors cursor-pointer flex items-center gap-1 p-2 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-rose-500/40"
              title="مسح لوحة المتصدرين"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">مسح السجل</span>
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog for Clearing */}
      {showConfirmClear && (
        <div className="p-4 bg-rose-950/80 border border-rose-600/50 rounded-2xl text-xs space-y-3 relative z-20">
          <p className="font-bold text-rose-200">
            ⚠️ هل أنت متأكد من رغبتك في مسح جميع نتائج لوحة الصدارة المحفوظة على هذا الجهاز؟
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClear();
                setShowConfirmClear(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
            >
              تأكيد المسح
            </button>
            <button
              onClick={() => setShowConfirmClear(false)}
              className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-bold cursor-pointer hover:bg-slate-700"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>اللعبة:</span>
          </span>
          {[
            { id: 'all', label: '🏆 جميع الألعاب' },
            { id: 'shoot_and_score', label: '⚽ Shoot & Score' },
            { id: 'tug_of_words', label: '🪢 Tug of Words' },
            { id: 'bowling_championship', label: '🎳 Bowling' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedGame(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedGame === tab.id
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="relative z-10 space-y-2.5">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <Trophy className="w-12 h-12 mx-auto text-slate-700" />
            <p className="text-sm font-bold text-slate-400">لا توجد نتائج مسجلة لهذه الفئة حتى الآن.</p>
            <p className="text-xs text-slate-500">
              العب مباراة جديدة وتفوق في إجابات المنهج لتسجيل اسمك بالصدارة!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredEntries.map((entry, index) => {
              const isTop1 = index === 0;
              const isTop2 = index === 1;
              const isTop3 = index === 2;

              return (
                <div
                  key={entry.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                    isTop1
                      ? 'bg-amber-500/10 border-amber-400/50 shadow-md ring-1 ring-amber-400/30'
                      : isTop2
                      ? 'bg-slate-800/80 border-slate-600'
                      : isTop3
                      ? 'bg-amber-900/20 border-amber-700/40'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  {/* Left: Rank & Player */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs font-mono shadow-inner ${
                        isTop1
                          ? 'bg-amber-400 text-slate-950'
                          : isTop2
                          ? 'bg-slate-300 text-slate-950'
                          : isTop3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isTop1 ? '🥇' : isTop2 ? '🥈' : isTop3 ? '🥉' : `#${index + 1}`}
                    </div>

                    <div>
                      <span className="font-black text-sm text-white block">{entry.studentName}</span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="text-amber-300 font-bold">{entry.gameTitle}</span>
                        <span>•</span>
                        <span className="capitalize">{entry.difficulty}</span>
                        <span>•</span>
                        <span>{entry.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Score, Stars, Accuracy */}
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= entry.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-right">
                      <span className="font-black text-sm text-amber-400 block">{entry.score} pts</span>
                      <span className="text-[10px] text-slate-400 font-sans">{entry.accuracy}% دقة</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Classroom Device Disclaimer */}
      <div className="relative z-10 pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 text-center font-medium">
        💡 لوحة صدارة محلية خاصة بهذا الجهاز والمتصفح. لا تتطلب اتصالاً بالإنترنت ولا تشارك بيانات الطلاب الشخصية.
      </div>
    </div>
  );
};
