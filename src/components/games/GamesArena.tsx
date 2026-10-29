import React, { useState, useEffect } from 'react';
import { Award, ArrowRight, Trophy } from 'lucide-react';
import { StudentProfile } from '../../types.ts';
import {
  GameStage,
  GameDifficulty,
  GameFocusArea,
  SessionResult,
} from '../../types/gameQuestions.ts';
import { useGameProgress } from '../../hooks/useGameProgress.ts';
import { useGameLeaderboard } from '../../hooks/useGameLeaderboard.ts';
import { GameSelectionMenu } from './GameSelectionMenu.tsx';
import { LocalLeaderboard } from './LocalLeaderboard.tsx';
import { ClassroomLeagueGame } from './ClassroomLeagueGame.tsx';
import { TugOfWordsGame } from './TugOfWordsGame.tsx';
import { BowlingChampionshipGame } from './BowlingChampionshipGame.tsx';
import { QuickWordMatch } from './QuickWordMatch.tsx';
import { ALL_BADGES } from '../../services/studentStorage.ts';
import {
  recordGameMatchCompleted,
  loadLearningState,
} from '../../services/learningStore.ts';

export type ActiveGameId =
  | 'shoot_and_score'
  | 'tug_of_words'
  | 'bowling_championship'
  | 'quick_match';

interface GamesArenaProps {
  student: StudentProfile | null;
  onPointsEarned: (points: number, newBadges: string[]) => void;
  onNavigateToExams?: () => void;
  initialGameId?: ActiveGameId;
  initialStage?: GameStage;
  initialGrade?: number;
  initialDifficulty?: GameDifficulty;
  onBackToGamesHub?: () => void;
}

export const GamesArena: React.FC<GamesArenaProps> = ({
  student,
  onPointsEarned,
  initialGameId = 'shoot_and_score',
  initialStage = 'secondary',
  initialGrade = 1,
  initialDifficulty = 'medium',
  onBackToGamesHub,
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGameId>(initialGameId);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);

  // Curriculum & Challenge Configuration
  const [selectedStage, setSelectedStage] = useState<GameStage>(initialStage);
  const [selectedGrade, setSelectedGrade] = useState<number>(initialGrade);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<GameDifficulty>(initialDifficulty);
  const [selectedFocus, setSelectedFocus] = useState<GameFocusArea>('mixed');

  useEffect(() => {
    setActiveGame(initialGameId);
  }, [initialGameId]);

  useEffect(() => {
    setSelectedStage(initialStage);
  }, [initialStage]);

  useEffect(() => {
    setSelectedGrade(initialGrade);
  }, [initialGrade]);

  useEffect(() => {
    setSelectedDifficulty(initialDifficulty);
  }, [initialDifficulty]);

  // Progression & Leaderboard Hooks
  const { progress, recordSession } = useGameProgress();
  const {
    entries: leaderboardEntries,
    addRecord,
    clearLeaderboard,
  } = useGameLeaderboard();

  const studentBadges = new Set(student?.badges || []);

  const handleGameFinished = (points: number, newBadges: string[]) => {
    // 1. Sync global student points & centralized learningStore
    onPointsEarned(points, newBadges);
    recordGameMatchCompleted(activeGame, points);

    const ls = loadLearningState();
    const playerName = student?.name || ls.nickname || 'بطل EngliMensh';

    // 2. Generate and record session for local leaderboard & arcade progression
    const sessionRecord: SessionResult = {
      gameId: activeGame,
      gameTitle:
        activeGame === 'shoot_and_score'
          ? 'Shoot & Score (ضربات الجزاء)'
          : activeGame === 'tug_of_words'
          ? 'Tug of Words (شد الحبل)'
          : activeGame === 'bowling_championship'
          ? 'Bowling Championship (بطولة البولينج)'
          : 'Quick Word Match (مطابقة الكلمات)',
      curriculum: 'egyptian',
      stage: selectedStage,
      grade: selectedGrade,
      difficulty: selectedDifficulty,
      focus: selectedFocus,
      totalScore: points,
      basePoints: Math.round(points * 0.7),
      comboBonus: Math.round(points * 0.2),
      gamePoints: Math.round(points * 0.1),
      totalQuestions: 5,
      correctCount:
        points >= 150 ? 5 : points >= 100 ? 4 : points >= 50 ? 3 : 2,
      incorrectCount: points >= 150 ? 0 : 1,
      accuracyPercent: points >= 150 ? 100 : points >= 100 ? 80 : 60,
      highestStreak: points >= 150 ? 5 : 3,
      maxMultiplier: points >= 100 ? 3 : 2,
      starsAwarded: points >= 150 ? 3 : points >= 100 ? 2 : 1,
      durationSeconds: 45,
      answers: [],
      timestamp: new Date().toISOString(),
    };

    recordSession(sessionRecord);
    addRecord(sessionRecord, playerName);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300" dir="rtl">
      {/* Top Bar to Return to 3-Card Sports Games Hub */}
      {onBackToGamesHub && (
        <div className="max-w-lg mx-auto px-3 sm:px-4 pt-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBackToGamesHub}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-[#1E3A8A] border border-[#E2E8F0] shadow-xs text-xs font-black cursor-pointer transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى ساحة الألعاب</span>
          </button>

          <button
            type="button"
            onClick={() => setIsLeaderboardOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-[#D97706] border border-amber-200 text-xs font-black cursor-pointer transition-all"
          >
            <Trophy className="w-4 h-4" />
            <span>لوحة الصدارة ({leaderboardEntries.length})</span>
          </button>
        </div>
      )}

      {/* ACTIVE GAME BOARD FIRST FOR IMMEDIATE MOBILE PLAYABILITY */}
      <div className="transition-all duration-300">
        {activeGame === 'tug_of_words' && (
          <TugOfWordsGame
            onGameFinished={handleGameFinished}
            initialStage={selectedStage}
            initialGrade={selectedGrade}
            initialDifficulty={selectedDifficulty}
            initialFocus={selectedFocus}
          />
        )}
        {activeGame === 'shoot_and_score' && (
          <ClassroomLeagueGame
            onGameFinished={handleGameFinished}
            initialStage={selectedStage}
            initialGrade={selectedGrade}
            initialDifficulty={selectedDifficulty}
            initialFocus={selectedFocus}
          />
        )}
        {activeGame === 'bowling_championship' && (
          <BowlingChampionshipGame
            onGameFinished={handleGameFinished}
            initialStage={selectedStage}
            initialGrade={selectedGrade}
            initialDifficulty={selectedDifficulty}
            initialFocus={selectedFocus}
          />
        )}
        {activeGame === 'quick_match' && (
          <QuickWordMatch onGameFinished={handleGameFinished} />
        )}
      </div>

      {/* SELECTION MENU & STATS HUB */}
      <GameSelectionMenu
        progress={progress}
        activeGameId={activeGame}
        onSelectGame={(id) => setActiveGame(id)}
        selectedStage={selectedStage}
        onChangeStage={(stage) => {
          setSelectedStage(stage);
          setSelectedGrade(1);
        }}
        selectedGrade={selectedGrade}
        onChangeGrade={(grade) => setSelectedGrade(grade)}
        selectedDifficulty={selectedDifficulty}
        onChangeDifficulty={(diff) => setSelectedDifficulty(diff)}
        selectedFocus={selectedFocus}
        onChangeFocus={(focus) => setSelectedFocus(focus)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* LEADERBOARD MODAL / DRAWER */}
      {isLeaderboardOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <LocalLeaderboard
              entries={leaderboardEntries}
              onClear={clearLeaderboard}
              onClose={() => setIsLeaderboardOpen(false)}
            />
          </div>
        </div>
      )}

      {/* BADGES SHOWCASE SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
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

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto font-mono">
            {student?.badges?.length || 1} of {ALL_BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = studentBadges.has(badge.id);

            return (
              <div
                key={`arena_badge_${badge.id}`}
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
                      <span className="font-bold text-xs text-slate-900">
                        {badge.title}
                      </span>
                      {isUnlocked && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800">
                          مكتسبة
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-bold text-amber-800">
                      {badge.titleAr}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {badge.description}
                    </p>
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
