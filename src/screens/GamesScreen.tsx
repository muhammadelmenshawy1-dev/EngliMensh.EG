import React, { useState, useEffect } from 'react';
import { Gamepad2, Rocket } from 'lucide-react';
import { EducationalStage } from '../types/curriculum.ts';
import {
  ArcadeDifficulty,
  ArcadeGameType,
  GameDifficulty,
  GameStage,
} from '../types/gameQuestions.ts';
import { GamesArena, ActiveGameId } from '../components/games/GamesArena.tsx';
import { StudentProfile } from '../types.ts';
import { registerBackNavigationHandler } from '../utils/navigationHistory.ts';

interface GamesScreenProps {
  student?: StudentProfile | null;
  onPointsEarned?: (points: number, newBadges: string[]) => void;
  initialStage?: EducationalStage;
  initialGrade?: number;
  activeLaunchedGame?: ArcadeGameType | null;
  onGameClosed?: () => void;
}

export const GamesScreen: React.FC<GamesScreenProps> = ({
  student = null,
  onPointsEarned = () => {},
  initialStage = 'Secondary',
  initialGrade = 10,
  activeLaunchedGame,
  onGameClosed,
}) => {
  const [selectedStage, setSelectedStage] =
    useState<EducationalStage>(initialStage);
  const [selectedGrade, setSelectedGrade] = useState<number>(initialGrade);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<ArcadeDifficulty>('standard');
  const [activeGame, setActiveGame] = useState<ArcadeGameType | null>(
    activeLaunchedGame || null
  );

  useEffect(() => {
    if (activeLaunchedGame) {
      setActiveGame(activeLaunchedGame);
    }
  }, [activeLaunchedGame]);

  // Register back navigation handler when an arcade game is active
  useEffect(() => {
    if (!activeGame) return;
    const unregister = registerBackNavigationHandler('games-arena-active', () => {
      setActiveGame(null);
      onGameClosed?.();
      return true;
    });
    return unregister;
  }, [activeGame, onGameClosed]);

  const getGradesForStage = (stage: EducationalStage): number[] => {
    if (stage === 'Primary') return [1, 2, 3, 4, 5, 6];
    if (stage === 'Preparatory') return [7, 8, 9];
    return [10, 11, 12];
  };

  const availableGrades = getGradesForStage(selectedStage);
  const currentGrade = availableGrades.includes(selectedGrade)
    ? selectedGrade
    : availableGrades[0];

  const mapToGameStage = (stage: EducationalStage): GameStage => {
    if (stage === 'Primary') return 'primary';
    if (stage === 'Preparatory') return 'intermediate';
    return 'secondary';
  };

  const mapToRelativeGrade = (stage: EducationalStage, grade: number): number => {
    if (stage === 'Primary') return Math.max(1, Math.min(6, grade));
    if (stage === 'Preparatory') return Math.max(1, Math.min(3, grade - 6));
    return Math.max(1, Math.min(3, grade - 9));
  };

  const mapToGameDifficulty = (diff: ArcadeDifficulty): GameDifficulty => {
    if (diff === 'easy') return 'easy';
    if (diff === 'advanced' || diff === 'hots') return 'hard';
    return 'medium';
  };

  const mapToArenaGameId = (gameType: ArcadeGameType): ActiveGameId => {
    if (gameType === 'shootout') return 'shoot_and_score';
    if (gameType === 'tug_of_war') return 'tug_of_words';
    return 'bowling_championship';
  };

  // If a game is active, render GamesArena with the selected game, stage, grade, and difficulty
  if (activeGame) {
    return (
      <div className="pb-24">
        <GamesArena
          student={student}
          onPointsEarned={onPointsEarned}
          initialGameId={mapToArenaGameId(activeGame)}
          initialStage={mapToGameStage(selectedStage)}
          initialGrade={mapToRelativeGrade(selectedStage, currentGrade)}
          initialDifficulty={mapToGameDifficulty(selectedDifficulty)}
          onBackToGamesHub={() => {
            setActiveGame(null);
            onGameClosed?.();
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="space-y-4 pb-24 pt-3 px-3 sm:px-4 max-w-lg mx-auto text-[#0F172A]"
      dir="rtl"
    >
      {/* 1. Header & Stage/Difficulty Selector Bar (Matches Screen 3 Mockup) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#0F172A]">
                ساحة الألعاب التفاعلية
              </h1>
              <p className="text-[11px] text-[#64748B] font-semibold">
                اختر المرحلة ومستوى الصعوبة ثم ابدأ التحدي
              </p>
            </div>
          </div>

          <span className="text-xs font-black text-[#D97706] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            3 ألعاب
          </span>
        </div>

        {/* Selectors Row: اختر المرحلة + الصف + الصعوبة */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {/* Stage Select */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#64748B] block">
              اختر المرحلة
            </label>
            <select
              value={selectedStage}
              onChange={(e) => {
                const nextStage = e.target.value as EducationalStage;
                setSelectedStage(nextStage);
                setSelectedGrade(getGradesForStage(nextStage)[0]);
              }}
              aria-label="اختر المرحلة الدراسية"
              className="w-full min-h-[40px] bg-slate-50 border border-[#E2E8F0] text-[#0F172A] text-xs font-black rounded-xl px-2.5 py-2 focus:outline-none focus:border-[#1E3A8A] cursor-pointer"
            >
              <option value="Primary">الابتدائي</option>
              <option value="Preparatory">المتوسط / الإعدادي</option>
              <option value="Secondary">الثانوي</option>
            </select>
          </div>

          {/* Grade Select */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#64748B] block">
              الصف الدراسي
            </label>
            <select
              value={currentGrade}
              onChange={(e) => setSelectedGrade(Number(e.target.value))}
              aria-label="اختر الصف الدراسي"
              className="w-full min-h-[40px] bg-slate-50 border border-[#E2E8F0] text-[#0F172A] text-xs font-black rounded-xl px-2.5 py-2 focus:outline-none focus:border-[#1E3A8A] cursor-pointer"
            >
              {availableGrades.map((g) => (
                <option key={`game_grade_opt_${g}`} value={g}>
                  {selectedStage === 'Primary'
                    ? `الصف ${g} ابتدائي`
                    : selectedStage === 'Preparatory'
                    ? `الصف ${g - 6} إعدادي`
                    : `الصف ${g - 9} ثانوي`}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Select */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#64748B] block">
              • الصعوبة
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) =>
                setSelectedDifficulty(e.target.value as ArcadeDifficulty)
              }
              aria-label="اختر مستوى الصعوبة"
              className="w-full min-h-[40px] bg-amber-50 border border-amber-300 text-[#B45309] text-xs font-black rounded-xl px-2.5 py-2 focus:outline-none focus:border-[#D97706] cursor-pointer"
            >
              <option value="easy">سهل</option>
              <option value="standard">متوسط</option>
              <option value="advanced">صعب</option>
              <option value="hots">تحدي الوزارة</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Three Illustrated Sports Game Cards (Matches Screen 3 Mockup) */}
      <div className="space-y-4">
        {/* GAME CARD 1: ضربات الجزاء (Shoot & Score) */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-3.5 shadow-sm space-y-3 overflow-hidden">
          <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-500 border border-emerald-200">
            {/* Stadium Grass & Penalty Box Lines */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-emerald-500 to-emerald-600" />
            <div className="absolute inset-x-8 bottom-0 h-20 border-t-2 border-x-2 border-white/70 rounded-t-sm" />
            {/* Goal Post & Net */}
            <div className="absolute top-6 left-6 w-28 h-20 border-t-4 border-x-4 border-white bg-white/15 backdrop-blur-[1px]">
              <div
                className="w-full h-full opacity-40"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                  backgroundSize: '8px 8px',
                }}
              />
            </div>

            {/* Badge 1 & Title Overlay */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
                <span className="text-base">⚽</span>
                <span className="text-sm font-black text-[#0F172A]">
                  ضربات الجزاء
                </span>
              </div>
              <span className="w-7 h-7 rounded-lg bg-slate-800/80 text-white font-black text-xs flex items-center justify-center shadow-xs">
                1
              </span>
            </div>

            {/* Players & Flying Soccer Ball Illustration */}
            <div className="absolute bottom-3 right-10 text-4xl select-none drop-shadow-md">
              🏃‍♂️
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-2xl animate-bounce select-none drop-shadow-md">
              ⚽
            </div>
            <div className="absolute bottom-5 left-14 text-4xl select-none drop-shadow-md">
              🧤
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveGame('shootout')}
            className="w-full min-h-[46px] py-3 px-4 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0F2856] hover:from-[#172E6E] hover:to-[#0A1D40] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99] transition-all"
          >
            <span>العب الآن</span>
            <Rocket className="w-4 h-4 text-[#F59E0B]" />
          </button>
        </div>

        {/* GAME CARD 2: شد الحبل (Tug of Words) */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-3.5 shadow-sm space-y-3 overflow-hidden">
          <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-200 via-teal-100 to-lime-500 border border-lime-300">
            {/* Outdoor Grass & Center Mud Pit */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-lime-500 to-emerald-600" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-7 rounded-full bg-amber-900/80 border-2 border-amber-700" />

            {/* Rope Across Screen */}
            <div className="absolute bottom-11 inset-x-6 h-1.5 bg-amber-600 rounded-full shadow-xs" />
            {/* Center Red Ribbon on Rope */}
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-2 h-5 bg-red-500 rounded-xs" />

            {/* Badge 2 & Title Overlay */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
                <span className="text-base">🪢</span>
                <span className="text-sm font-black text-[#0F172A]">
                  شد الحبل
                </span>
              </div>
              <span className="w-7 h-7 rounded-lg bg-slate-800/80 text-white font-black text-xs flex items-center justify-center shadow-xs">
                2
              </span>
            </div>

            {/* Two Teams Pulling Rope */}
            <div className="absolute bottom-5 right-8 flex items-center gap-1 text-3xl select-none drop-shadow-md">
              <span>🏃</span>
              <span>🏃‍♀️</span>
            </div>
            <div className="absolute bottom-5 left-8 flex items-center gap-1 text-3xl select-none drop-shadow-md">
              <span>🏃‍♂️</span>
              <span>🏃</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveGame('tug_of_war')}
            className="w-full min-h-[46px] py-3 px-4 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0F2856] hover:from-[#172E6E] hover:to-[#0A1D40] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99] transition-all"
          >
            <span>العب الآن</span>
            <Rocket className="w-4 h-4 text-[#F59E0B]" />
          </button>
        </div>

        {/* GAME CARD 3: بطولة البولينج (Bowling Championship) */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-3.5 shadow-sm space-y-3 overflow-hidden">
          <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0F2856] via-[#1E3A8A] to-amber-700 border border-amber-300">
            {/* Wooden Bowling Lane Perspective */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 border-t-2 border-amber-300"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 14px, transparent 14px, transparent 28px)',
              }}
            />

            {/* Badge 3 & Title Overlay */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
                <span className="text-base">🎳</span>
                <span className="text-sm font-black text-[#0F172A]">
                  بطولة البولينج
                </span>
              </div>
              <span className="w-7 h-7 rounded-lg bg-slate-800/80 text-white font-black text-xs flex items-center justify-center shadow-xs">
                3
              </span>
            </div>

            {/* Bowling Pins Formation */}
            <div className="absolute top-11 left-1/2 -translate-x-1/2 flex items-end gap-1.5 select-none">
              {[1, 2, 3, 4, 5].map((pin) => (
                <div
                  key={`bowling_pin_illust_${pin}`}
                  className="w-3.5 h-9 rounded-full bg-white border border-slate-300 flex flex-col justify-center items-center shadow-xs"
                >
                  <div className="w-full h-1 bg-red-500 my-0.5" />
                  <div className="w-full h-1 bg-red-500" />
                </div>
              ))}
            </div>

            {/* Rolling Blue Bowling Ball */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-blue-900 via-blue-600 to-sky-400 border-2 border-blue-300 shadow-xl flex items-center justify-center">
              <div className="flex gap-1 -mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveGame('bowling')}
            className="w-full min-h-[46px] py-3 px-4 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0F2856] hover:from-[#172E6E] hover:to-[#0A1D40] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99] transition-all"
          >
            <span>العب الآن</span>
            <Rocket className="w-4 h-4 text-[#F59E0B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
