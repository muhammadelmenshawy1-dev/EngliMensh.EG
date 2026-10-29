import React from 'react';
import { Trophy, Flame, Volume2, VolumeX, Pause, Play, RotateCcw } from 'lucide-react';
import { gameAudio } from '../../utils/gameAudio.ts';

interface GameScoreboardProps {
  gameTitle: string;
  gameSubtitle?: string;
  score: number;
  streak?: number;
  bestStreak?: number;
  isMuted: boolean;
  isPaused?: boolean;
  onToggleMute: () => void;
  onTogglePause?: () => void;
  onRestart?: () => void;
}

export const GameScoreboard: React.FC<GameScoreboardProps> = ({
  gameTitle,
  gameSubtitle,
  score,
  streak = 0,
  isMuted,
  isPaused = false,
  onToggleMute,
  onTogglePause,
  onRestart,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 text-white shadow-lg space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span>{gameTitle}</span>
          </h2>
          {gameSubtitle && <p className="text-xs text-slate-400 font-medium">{gameSubtitle}</p>}
        </div>

        {/* Score & Controls */}
        <div className="flex items-center gap-3">
          {/* Live Score Badge */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-2xl border border-amber-400/30">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div className="text-right">
              <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Score</span>
              <span className="text-sm font-black font-mono text-amber-400 leading-tight">{score} pts</span>
            </div>
          </div>

          {/* Streak Combo */}
          {streak > 0 && (
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-2xl border border-orange-500/30">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="text-xs font-black font-mono text-orange-400">{streak}x</span>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleMute}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isMuted
                  ? 'bg-slate-800 text-slate-500 border-slate-700'
                  : 'bg-slate-800 text-amber-400 border-amber-400/40 hover:bg-slate-700'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {onTogglePause && (
              <button
                onClick={onTogglePause}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            )}

            {onRestart && (
              <button
                onClick={onRestart}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
