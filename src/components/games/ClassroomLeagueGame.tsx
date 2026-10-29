import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX, ArrowRight, Shield, Award, Target, Pause, RotateCcw, Volume1 } from 'lucide-react';
import { GameQuestion, getGameQuestions } from '../../services/gameQuestionBank.ts';
import { gameAudio } from '../../utils/gameAudio.ts';
import { triggerConfetti } from '../../utils/gameParticles.ts';
import { GameQuestionPanel } from './GameQuestionPanel.tsx';
import { GameResultsScreen } from './GameResultsScreen.tsx';

interface ClassroomLeagueGameProps {
  onGameFinished?: (points: number, newBadges: string[]) => void;
  onClose?: () => void;
  initialStage?: 'primary' | 'intermediate' | 'secondary';
  initialGrade?: number;
  initialDifficulty?: 'easy' | 'medium' | 'hard';
  initialFocus?: 'vocabulary' | 'grammar' | 'spelling' | 'mixed';
}

// Five Core Target Shooting Zones
export type ShootingZone = 'TL' | 'TR' | 'CENTER' | 'BL' | 'BR';

export const ClassroomLeagueGame: React.FC<ClassroomLeagueGameProps> = ({
  onGameFinished,
  onClose,
  initialStage,
  initialGrade,
  initialDifficulty,
  initialFocus,
}) => {
  const mapStageProp = (s?: 'primary' | 'intermediate' | 'secondary'): 'All' | 'Primary' | 'Preparatory' | 'Secondary' => {
    if (s === 'primary') return 'Primary';
    if (s === 'intermediate') return 'Preparatory';
    if (s === 'secondary') return 'Secondary';
    return 'All';
  };

  const [selectedUnitId, setSelectedUnitId] = useState<number>(0);
  const [selectedStage, setSelectedStage] = useState<'All' | 'Primary' | 'Preparatory' | 'Secondary'>(
    mapStageProp(initialStage)
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(gameAudio.getMuted());
  const [isAmbienceEnabled, setIsAmbienceEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (initialStage) {
      setSelectedStage(mapStageProp(initialStage));
    }
  }, [initialStage]);

  // Game Stage: 'question' | 'shooting' | 'animation'
  const [gameStage, setGameStage] = useState<'question' | 'shooting' | 'animation'>('question');

  // Question & Match State
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // Shootout Results State
  const [score, setScore] = useState<number>(0);
  const [goalsScored, setGoalsScored] = useState<number>(0);
  const [savesCount, setSavesCount] = useState<number>(0);
  const [shotsAttempted, setShotsAttempted] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Shot Animation Mechanics
  const [targetZone, setTargetZone] = useState<ShootingZone | null>(null);
  const [keeperDiveZone, setKeeperDiveZone] = useState<ShootingZone | null>(null);
  const [lastShotResult, setLastShotResult] = useState<'goal' | 'saved' | 'missed' | null>(null);
  const [isScreenShaking, setIsScreenShaking] = useState<boolean>(false);
  const [isNetDeformed, setIsNetDeformed] = useState<boolean>(false);

  // Confetti Canvas Ref
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    return () => {
      gameAudio.stopAmbience();
    };
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    gameAudio.setMuted(next);
    setIsMuted(next);
  };

  const toggleAmbience = () => {
    const next = !isAmbienceEnabled;
    setIsAmbienceEnabled(next);
    if (!next) {
      gameAudio.stopAmbience();
    } else if (isPlaying && !isMuted) {
      gameAudio.startAmbience('stadium');
    }
  };

  const startNewMatch = useCallback(() => {
    gameAudio.unlockAudio();
    gameAudio.playGameStart();
    if (isAmbienceEnabled && !isMuted) {
      gameAudio.startAmbience('stadium');
    }

    const fetched = getGameQuestions({
      stage: selectedStage === 'All' ? undefined : selectedStage,
      grade: initialGrade,
      unitId: selectedUnitId,
      difficulty: initialDifficulty,
      focus: initialFocus,
      limit: 5,
    });
    setQuestions(fetched);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setGoalsScored(0);
    setSavesCount(0);
    setShotsAttempted(0);
    setCorrectCount(0);
    setGameStage('question');
    setLastShotResult(null);
    setIsGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  }, [selectedStage, initialGrade, selectedUnitId, initialDifficulty, initialFocus, isAmbienceEnabled, isMuted]);

  const handleSelectOption = (optionIdx: number) => {
    if (isAnswered || gameStage !== 'question' || isPaused) return;

    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      gameAudio.playCorrect();
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + 25);

      // Transition to penalty kick phase
      setTimeout(() => {
        setGameStage('shooting');
      }, 1100);
    } else {
      gameAudio.playWrong();
      gameAudio.playCrowdDisappointment();
      setLastShotResult('missed');

      // Missed opportunity due to wrong answer, advance
      setTimeout(() => {
        advanceNextRound();
      }, 2000);
    }
  };

  // Deterministic Goalkeeper AI Reaction Logic
  const handleShootAtZone = (zone: ShootingZone) => {
    if (gameStage !== 'shooting' || isPaused) return;

    setTargetZone(zone);
    setGameStage('animation');
    setShotsAttempted((prev) => prev + 1);

    gameAudio.playBallKick();

    // Deterministic Goalkeeper Reaction:
    // Keeper dives towards one of the 5 zones. Top corners (TL, TR) have slightly higher beating chance.
    const allZones: ShootingZone[] = ['TL', 'TR', 'CENTER', 'BL', 'BR'];
    const randomDive = allZones[Math.floor(Math.random() * allZones.length)];
    setKeeperDiveZone(randomDive);

    // Goal occurs if shot zone does not intersect keeper dive zone
    const isGoal = zone !== randomDive;

    setTimeout(() => {
      if (isGoal) {
        setLastShotResult('goal');
        setGoalsScored((prev) => prev + 1);
        setScore((prev) => prev + 50);

        gameAudio.playGoalScored();
        setIsNetDeformed(true);

        // Check prefers-reduced-motion for screen shake
        if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setIsScreenShaking(true);
          setTimeout(() => setIsScreenShaking(false), 500);
        }

        // Trigger Canvas Confetti
        if (confettiCanvasRef.current) {
          triggerConfetti(confettiCanvasRef.current, 1800);
        }

        setTimeout(() => {
          setIsNetDeformed(false);
        }, 1200);
      } else {
        setLastShotResult('saved');
        setSavesCount((prev) => prev + 1);
        gameAudio.playGoalSave();
        gameAudio.playCrowdDisappointment();
      }

      setTimeout(() => {
        advanceNextRound();
      }, 2400);
    }, 650);
  };

  const advanceNextRound = () => {
    if (currentIndex >= questions.length - 1) {
      finishMatch();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTargetZone(null);
      setKeeperDiveZone(null);
      setLastShotResult(null);
      setGameStage('question');
    }
  };

  const finishMatch = () => {
    setIsGameOver(true);
    gameAudio.stopAmbience();

    const finalScore = score + goalsScored * 30;
    setScore(finalScore);

    if (goalsScored >= 3) {
      gameAudio.playVictory();
    } else {
      gameAudio.playCrowdCheer(false);
    }

    if (onGameFinished) {
      onGameFinished(finalScore, []);
    }
  };

  const currentQ = questions[currentIndex];
  const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white shadow-2xl space-y-6 relative overflow-hidden transition-transform duration-100 ${
        isScreenShaking ? 'translate-x-1 -translate-y-1' : ''
      }`}
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar with Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-md">
            ⚽
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>Shoot & Score • ركلات الترجيح</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Classroom League
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              أجب عن السؤال التعليمي لفتح ضربة الجزاء وسدد الكرة في شباك حارس المرمى
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Ambience Control */}
          <button
            onClick={toggleAmbience}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
              isAmbienceEnabled ? 'bg-slate-800 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
            title="أجواء الملعب الصوتية (Ambience)"
          >
            <Volume1 className="w-4 h-4" />
            <span className="hidden sm:inline text-[10px]">{isAmbienceEnabled ? 'Ambience ON' : 'OFF'}</span>
          </button>

          {/* Sound FX Control */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isMuted ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-slate-800 text-amber-400 border-amber-400/40'
            }`}
            title="كتم / تشغيل المؤثرات الصوتية"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Pause / Resume Button */}
          {isPlaying && !isGameOver && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              title={isPaused ? 'استئناف' : 'إيقاف مؤقت'}
            >
              <Pause className="w-4 h-4" />
            </button>
          )}

          {/* Restart Button */}
          {isPlaying && (
            <button
              onClick={startNewMatch}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              title="إعادة بدء المباراة"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {onClose && (
            <button
              onClick={() => {
                gameAudio.stopAmbience();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              title="خروج"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          )}
        </div>
      </div>

      {/* LOBBY / SETUP SCREEN */}
      {!isPlaying && (
        <div className="relative z-10 space-y-6 py-2">
          {/* Stage & Unit Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                اختر المرحلة الدراسية (Educational Stage):
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'All', label: '🌟 جميع المراحل' },
                  { id: 'Primary', label: '🏫 الابتدائية' },
                  { id: 'Preparatory', label: '🎒 الإعدادية' },
                  { id: 'Secondary', label: '🎓 الثانوية' },
                ].map((stg) => (
                  <button
                    key={stg.id}
                    onClick={() => setSelectedStage(stg.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedStage === stg.id
                        ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                        : 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white'
                    }`}
                  >
                    {stg.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                اختر الوحدة الدراسية:
              </label>
              <select
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer mt-1"
              >
                <option value={0}>🌟 جميع الوحدات والمراجعات الوزارية</option>
                <option value={1}>Unit 1: Vocabulary & Grammar Drills</option>
                <option value={2}>Unit 2: Supporting the Family</option>
                <option value={3}>Unit 3: Improving Lives</option>
                <option value={4}>Unit 4: Making New Friends</option>
                <option value={5}>Unit 5: Communication Systems</option>
                <option value={6}>Unit 6: Learning from Nature</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 text-xs space-y-2">
            <span className="font-bold text-white block">⚽ قواعد بطولة ركلات الترجيح:</span>
            <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
              <li>لديك 5 ركلات جزاء دراسية في المباراة.</li>
              <li>الإجابة الصحيحة تمنحك +25 نقطة وتفتح منصة التسديد المباشر.</li>
              <li>اختر زاوية التسديد المناسبة لتجاوز حارس المرمى وتسجيل هدف بـ +50 نقطة واحتفال ناري!</li>
            </ul>
          </div>

          <button
            onClick={startNewMatch}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>ابدأ ركلات الترجيح الآن (Start Penalty Shootout)</span>
          </button>
        </div>
      )}

      {/* PAUSE OVERLAY */}
      {isPaused && isPlaying && !isGameOver && (
        <div className="relative z-30 p-8 bg-slate-950/90 rounded-2xl border border-slate-800 text-center space-y-4">
          <div className="text-2xl font-black text-amber-400">⏸️ اللعبة متوقفة مؤقتًا</div>
          <p className="text-xs text-slate-300">اضغط على زر الاستئناف لمتابعة ركلات الترجيح</p>
          <button
            onClick={() => setIsPaused(false)}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm cursor-pointer shadow-md hover:bg-emerald-400"
          >
            استئناف اللعب
          </button>
        </div>
      )}

      {/* ACTIVE GAMEPLAY */}
      {isPlaying && !isGameOver && !isPaused && (
        <div className="relative z-10 space-y-5">
          {/* STATS HUD */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Penalty Kick</span>
              <span className="text-sm sm:text-base font-black text-white font-mono">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Goals Scored</span>
              <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">⚽ {goalsScored}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Score Points</span>
              <span className="text-sm sm:text-base font-black text-amber-400 font-mono">{score} pts</span>
            </div>
          </div>

          {/* STAGE 1: QUESTION PHASE */}
          {gameStage === 'question' && currentQ && (
            <GameQuestionPanel
              question={currentQ}
              questionIndex={currentIndex}
              totalQuestions={questions.length}
              selectedOptionIndex={selectedOption}
              isAnswered={isAnswered}
              onSelectOption={handleSelectOption}
            />
          )}

          {/* STAGE 2: SHOOTING PHASE / GOAL CANVAS */}
          {(gameStage === 'shooting' || gameStage === 'animation') && (
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 p-5 rounded-3xl border border-emerald-500/30 space-y-4 text-center relative overflow-hidden shadow-2xl">
              {/* Confetti Overlay Canvas */}
              <canvas
                ref={confettiCanvasRef}
                className="absolute inset-0 pointer-events-none z-40 w-full h-full"
              />

              <div className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                {gameStage === 'shooting' ? '🎯 اختر زاوية التسديد المباشر نحو المرمى!' : '⚡ تسديدة صاروخية!'}
              </div>

              {/* Interactive Goal Post Arena */}
              <div
                className={`relative w-full max-w-md mx-auto aspect-[16/9] bg-gradient-to-b from-[#021f10] to-[#043d20] rounded-2xl border-4 border-white shadow-2xl p-3 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isNetDeformed ? 'scale-[1.02] border-amber-300 ring-4 ring-amber-400/40' : ''
                }`}
              >
                {/* Net Grid Background Pattern */}
                <div
                  className={`absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] transition-transform duration-200 ${
                    isNetDeformed ? 'scale-105' : ''
                  }`}
                />

                {/* Animated Goalkeeper */}
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl transition-all duration-500 z-10 ${
                    keeperDiveZone === 'TL'
                      ? '-translate-x-32 -translate-y-12 rotate-[-25deg]'
                      : keeperDiveZone === 'TR'
                      ? 'translate-x-20 -translate-y-12 rotate-[25deg]'
                      : keeperDiveZone === 'BL'
                      ? '-translate-x-32 translate-y-6 rotate-[-45deg]'
                      : keeperDiveZone === 'BR'
                      ? 'translate-x-20 translate-y-6 rotate-[45deg]'
                      : keeperDiveZone === 'CENTER'
                      ? '-translate-x-1/2 -translate-y-8'
                      : ''
                  }`}
                >
                  🧤
                </div>

                {/* Animated Football */}
                <div
                  className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl transition-all duration-500 z-20 ${
                    targetZone === 'TL'
                      ? '-translate-x-28 -translate-y-24 scale-75'
                      : targetZone === 'TR'
                      ? 'translate-x-20 -translate-y-24 scale-75'
                      : targetZone === 'CENTER'
                      ? '-translate-x-1/2 -translate-y-20 scale-75'
                      : targetZone === 'BL'
                      ? '-translate-x-28 -translate-y-10 scale-90'
                      : targetZone === 'BR'
                      ? 'translate-x-20 -translate-y-10 scale-90'
                      : ''
                  }`}
                >
                  ⚽
                </div>

                {/* 5 Selectable Shooting Zones Grid */}
                {gameStage === 'shooting' && (
                  <div className="relative z-30 grid grid-cols-3 gap-2 h-full w-full">
                    <button
                      onClick={() => handleShootAtZone('TL')}
                      className="border-2 border-dashed border-emerald-400/60 hover:border-amber-400 bg-emerald-500/10 hover:bg-amber-400/20 rounded-xl text-[10px] font-black text-emerald-200 hover:text-amber-300 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                    >
                      🎯 أعلى يسار (Top-Left)
                    </button>
                    <button
                      onClick={() => handleShootAtZone('CENTER')}
                      className="border-2 border-dashed border-emerald-400/60 hover:border-amber-400 bg-emerald-500/10 hover:bg-amber-400/20 rounded-xl text-[10px] font-black text-emerald-200 hover:text-amber-300 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                    >
                      🎯 المنتصف (Center)
                    </button>
                    <button
                      onClick={() => handleShootAtZone('TR')}
                      className="border-2 border-dashed border-emerald-400/60 hover:border-amber-400 bg-emerald-500/10 hover:bg-amber-400/20 rounded-xl text-[10px] font-black text-emerald-200 hover:text-amber-300 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                    >
                      🎯 أعلى يمين (Top-Right)
                    </button>
                    <button
                      onClick={() => handleShootAtZone('BL')}
                      className="border-2 border-dashed border-emerald-400/60 hover:border-amber-400 bg-emerald-500/10 hover:bg-amber-400/20 rounded-xl text-[10px] font-black text-emerald-200 hover:text-amber-300 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow-sm col-span-1"
                    >
                      🎯 أسفل يسار (Bottom-Left)
                    </button>
                    <div className="flex items-center justify-center text-[10px] text-emerald-400/60 font-mono font-bold">
                      PENALTY
                    </div>
                    <button
                      onClick={() => handleShootAtZone('BR')}
                      className="border-2 border-dashed border-emerald-400/60 hover:border-amber-400 bg-emerald-500/10 hover:bg-amber-400/20 rounded-xl text-[10px] font-black text-emerald-200 hover:text-amber-300 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow-sm col-span-1"
                    >
                      🎯 أسفل يمين (Bottom-Right)
                    </button>
                  </div>
                )}
              </div>

              {/* Shot Result Banner Overlay */}
              {lastShotResult && (
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center animate-fadeIn">
                  {lastShotResult === 'goal' && (
                    <div className="text-xl sm:text-2xl font-black text-amber-400 animate-bounce">
                      ⚽ GOAL! هدف رائع في الشباك! (+50 pts)
                    </div>
                  )}
                  {lastShotResult === 'saved' && (
                    <div className="text-lg font-black text-rose-400">
                      🧤 SAVED! تصدٍ بارع من حارس المرمى!
                    </div>
                  )}
                  {lastShotResult === 'missed' && (
                    <div className="text-sm font-bold text-slate-400">
                      ❌ إجابة غير صحيحة — ضاعت الفرصة
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* RESULTS SCREEN */}
      {isGameOver && (
        <GameResultsScreen
          gameTitle="Shoot & Score • دوري ركلات الترجيح"
          isVictory={goalsScored >= 3}
          score={score}
          accuracyPercent={accuracy}
          totalQuestions={questions.length}
          correctCount={correctCount}
          onPlayAgain={startNewMatch}
          onChangeGame={() => setIsPlaying(false)}
          customStat={{
            label: 'Penalty Kicks Record',
            value: `⚽ ${goalsScored} Goals Scored / 🧤 ${savesCount} Saved`,
          }}
        />
      )}
    </div>
  );
};
