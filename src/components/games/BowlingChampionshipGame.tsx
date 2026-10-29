import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX, ArrowRight, Trophy, Flame, Pause, RotateCcw, Volume1, Crosshair, Zap } from 'lucide-react';
import { GameQuestion, getGameQuestions } from '../../services/gameQuestionBank.ts';
import { gameAudio } from '../../utils/gameAudio.ts';
import { triggerConfetti } from '../../utils/gameParticles.ts';
import { GameQuestionPanel } from './GameQuestionPanel.tsx';
import { GameResultsScreen } from './GameResultsScreen.tsx';

interface BowlingChampionshipGameProps {
  onGameFinished?: (points: number, newBadges: string[]) => void;
  onClose?: () => void;
  initialStage?: 'primary' | 'intermediate' | 'secondary';
  initialGrade?: number;
  initialDifficulty?: 'easy' | 'medium' | 'hard';
  initialFocus?: 'vocabulary' | 'grammar' | 'spelling' | 'mixed';
}

type AimDirection = -2 | -1 | 0 | 1 | 2; // -2 = Far Left, 0 = Center, +2 = Far Right

export const BowlingChampionshipGame: React.FC<BowlingChampionshipGameProps> = ({
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

  // Game Stage: 'question' | 'aiming' | 'power' | 'rolling'
  const [gameStage, setGameStage] = useState<'question' | 'aiming' | 'power' | 'rolling'>('question');

  // Question & Frame State
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // Bowling Physics & Pinfall State
  const [aimDirection, setAimDirection] = useState<AimDirection>(0);
  const [oscillatingAimAngle, setOscillatingAimAngle] = useState<number>(0);
  const [launchPower, setLaunchPower] = useState<number>(85); // 40-100
  const [standingPins, setStandingPins] = useState<boolean[]>(new Array(10).fill(true));
  const [lastPinfallCount, setLastPinfallCount] = useState<number>(0);
  const [lastResultType, setLastResultType] = useState<'strike' | 'spare' | 'open' | 'gutter' | null>(null);

  // Match Scoring
  const [score, setScore] = useState<number>(0);
  const [strikesCount, setStrikesCount] = useState<number>(0);
  const [sparesCount, setSparesCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Confetti Canvas Ref
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      gameAudio.stopAmbience();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Oscillating Aim Needle Animation during 'aiming' phase
  useEffect(() => {
    if (gameStage === 'aiming' && !isPaused) {
      let angle = -30;
      let step = 1.5;

      const loop = () => {
        angle += step;
        if (angle > 30 || angle < -30) step = -step;
        setOscillatingAimAngle(angle);

        // Map angle [-30, 30] to AimDirection [-2, 2]
        if (angle < -18) setAimDirection(-2);
        else if (angle < -6) setAimDirection(-1);
        else if (angle <= 6) setAimDirection(0);
        else if (angle <= 18) setAimDirection(1);
        else setAimDirection(2);

        animFrameRef.current = requestAnimationFrame(loop);
      };

      animFrameRef.current = requestAnimationFrame(loop);

      return () => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    }
  }, [gameStage, isPaused]);

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
      gameAudio.startAmbience('arcade');
    }
  };

  const startNewMatch = useCallback(() => {
    gameAudio.unlockAudio();
    gameAudio.playGameStart();
    if (isAmbienceEnabled && !isMuted) {
      gameAudio.startAmbience('arcade');
    }

    const fetched = getGameQuestions({
      stage: selectedStage === 'All' ? undefined : selectedStage,
      grade: initialGrade,
      unitId: selectedUnitId,
      difficulty: initialDifficulty,
      focus: initialFocus,
      limit: 10,
    });
    setQuestions(fetched);
    setCurrentFrame(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStrikesCount(0);
    setSparesCount(0);
    setCorrectCount(0);
    setStandingPins(new Array(10).fill(true));
    setLastResultType(null);
    setGameStage('question');
    setIsGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  }, [selectedStage, selectedUnitId, isAmbienceEnabled, isMuted]);

  const handleSelectOption = (optionIdx: number) => {
    if (isAnswered || gameStage !== 'question' || isPaused) return;

    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = questions[currentFrame];
    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      gameAudio.playCorrect();
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + 20);

      // Transition to Bowling Aiming Phase!
      setTimeout(() => {
        setGameStage('aiming');
      }, 1100);
    } else {
      gameAudio.playWrong();
      gameAudio.playGutter();
      setLastResultType('gutter');

      // Gutter ball automatically on incorrect question
      setTimeout(() => {
        advanceNextFrame();
      }, 2000);
    }
  };

  const handleLockAim = () => {
    if (gameStage !== 'aiming') return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setGameStage('power');
  };

  const handleLaunchBall = () => {
    if (gameStage !== 'power' && gameStage !== 'aiming') return;

    setGameStage('rolling');
    gameAudio.playBowlingRoll();

    // Calculate Pinfall physics simulation after ball rolls (850ms)
    setTimeout(() => {
      let knocked = 0;
      const newPins = [...standingPins];

      // Exact Center (0) + High Power (>=80) = Perfect STRIKE (10 pins)
      if (aimDirection === 0 && launchPower >= 80) {
        knocked = 10;
        newPins.fill(false);
      } else {
        // Calculate pins knocked based on off-center deviation and power level
        const deviation = Math.abs(aimDirection);
        if (deviation === 0) {
          knocked = Math.floor(7 + Math.random() * 3); // 7-9 pins
        } else if (deviation === 1) {
          knocked = Math.floor(5 + Math.random() * 4); // 5-8 pins
        } else {
          knocked = Math.floor(1 + Math.random() * 3); // 1-3 pins
        }

        let count = 0;
        for (let i = 0; i < 10; i++) {
          if (newPins[i] && count < knocked) {
            newPins[i] = false;
            count++;
          }
        }
      }

      setStandingPins(newPins);
      setLastPinfallCount(knocked);

      if (knocked === 10) {
        setLastResultType('strike');
        setStrikesCount((prev) => prev + 1);
        setScore((prev) => prev + 60);
        gameAudio.playStrike();
        if (confettiCanvasRef.current) triggerConfetti(confettiCanvasRef.current, 2000);
      } else if (knocked >= 7) {
        setLastResultType('spare');
        setSparesCount((prev) => prev + 1);
        setScore((prev) => prev + 35);
        gameAudio.playSpare();
        if (confettiCanvasRef.current) triggerConfetti(confettiCanvasRef.current, 1400);
      } else if (knocked > 0) {
        setLastResultType('open');
        setScore((prev) => prev + knocked * 5);
        gameAudio.playPinHit(0.9);
      } else {
        setLastResultType('gutter');
        gameAudio.playGutter();
      }

      setTimeout(() => {
        advanceNextFrame();
      }, 2400);
    }, 850);
  };

  const advanceNextFrame = () => {
    if (currentFrame >= questions.length - 1) {
      finishMatch();
    } else {
      setCurrentFrame((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setStandingPins(new Array(10).fill(true));
      setLastResultType(null);
      setGameStage('question');
    }
  };

  const finishMatch = () => {
    setIsGameOver(true);
    gameAudio.stopAmbience();

    const finalScore = score + strikesCount * 40;
    setScore(finalScore);

    if (strikesCount >= 3 || finalScore >= 350) {
      gameAudio.playVictory();
    } else {
      gameAudio.playCrowdCheer(false);
    }

    if (onGameFinished) {
      onGameFinished(finalScore, []);
    }
  };

  const currentQ = questions[currentFrame];
  const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white shadow-2xl space-y-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
            🎳
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>Bowling Championship • بطولة البولينج</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                10-Frame Alley
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              أجب عن السؤال التعليمي ثم اضبط مؤشر الزاوية والقوة لإسقاط 10 دبابيس وتحقيق STRIKE!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Ambience Control */}
          <button
            onClick={toggleAmbience}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
              isAmbienceEnabled ? 'bg-slate-800 text-amber-400 border-amber-400/30' : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
            title="أجواء صالة البولينج الصوتية"
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

          {/* Pause / Resume */}
          {isPlaying && !isGameOver && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              title={isPaused ? 'استئناف' : 'إيقاف مؤقت'}
            >
              <Pause className="w-4 h-4" />
            </button>
          )}

          {/* Restart */}
          {isPlaying && (
            <button
              onClick={startNewMatch}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              title="إعادة بدء البطولة"
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
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                اختر المرحلة الدراسية:
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
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md'
                        : 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white'
                    }`}
                  >
                    {stg.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                اختر الوحدة الدراسية:
              </label>
              <select
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer mt-1"
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
            <span className="font-bold text-white block">🎳 قواعد لعبة البولينج التعليمية:</span>
            <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
              <li>تتكون البطولة من 10 إطارات امتحانية متتالية.</li>
              <li>الإجابة الصحيحة تمنحك +20 نقطة وتفتح منصة إطلاق الكرة.</li>
              <li>ثبت مؤشر الزاوية المتأرجح في المنتصف واختر أقصى قوة لتحقيق 🎳 STRIKE مذهل بـ +60 نقطة!</li>
            </ul>
          </div>

          <button
            onClick={startNewMatch}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-base transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>ابدأ بطولة البولينج (Start Alley Match)</span>
          </button>
        </div>
      )}

      {/* PAUSE OVERLAY */}
      {isPaused && isPlaying && !isGameOver && (
        <div className="relative z-30 p-8 bg-slate-950/90 rounded-2xl border border-slate-800 text-center space-y-4">
          <div className="text-2xl font-black text-amber-400">⏸️ اللعبة متوقفة مؤقتًا</div>
          <p className="text-xs text-slate-300">اضغط على زر الاستئناف لمتابعة الإطار الحالي</p>
          <button
            onClick={() => setIsPaused(false)}
            className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-sm cursor-pointer shadow-md hover:bg-amber-300"
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
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Frame</span>
              <span className="text-sm sm:text-base font-black text-white font-mono">
                {currentFrame + 1} / {questions.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Strikes</span>
              <span className="text-sm sm:text-base font-black text-amber-400 font-mono">🎳 {strikesCount}</span>
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
              questionIndex={currentFrame}
              totalQuestions={questions.length}
              selectedOptionIndex={selectedOption}
              isAnswered={isAnswered}
              onSelectOption={handleSelectOption}
            />
          )}

          {/* STAGE 2: AIMING, POWER & ROLLING PHASE */}
          {(gameStage === 'aiming' || gameStage === 'power' || gameStage === 'rolling') && (
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/40 p-5 rounded-3xl border border-amber-400/30 space-y-5 text-center relative overflow-hidden shadow-2xl">
              {/* Confetti Overlay Canvas */}
              <canvas ref={confettiCanvasRef} className="absolute inset-0 pointer-events-none z-40 w-full h-full" />

              <div className="text-xs font-black text-amber-300 uppercase tracking-wider">
                {gameStage === 'aiming'
                  ? '🎯 اضغط لتثبيت زاوية الرمية!'
                  : gameStage === 'power'
                  ? '⚡ حدد القوة ثم اطلق الكرة!'
                  : '🔮 الكرة تتدحرج بسرعة نحو الدبابيس!'}
              </div>

              {/* 2.5D Bowling Lane Perspective Visual Box */}
              <div className="relative w-full max-w-sm mx-auto h-64 bg-gradient-to-b from-[#110e08] via-[#241c10] to-[#3a2e1c] rounded-2xl border-2 border-amber-400/60 shadow-2xl p-4 flex flex-col justify-between items-center overflow-hidden">
                {/* Wood Lane Perspective Lines */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:100%_20px]" />

                {/* 10 Pin Formation at top of lane */}
                <div className="relative z-10 space-y-1 pt-2">
                  {/* Row 4: 4 Pins */}
                  <div className="flex justify-center gap-2">
                    {[6, 7, 8, 9].map((pIdx) => (
                      <div
                        key={`bowling_pin_${pIdx}`}
                        className={`text-lg transition-all duration-300 ${
                          standingPins[pIdx] ? 'scale-100 opacity-100' : 'scale-0 opacity-0 rotate-45 translate-y-4'
                        }`}
                      >
                        🎳
                      </div>
                    ))}
                  </div>
                  {/* Row 3: 3 Pins */}
                  <div className="flex justify-center gap-2">
                    {[3, 4, 5].map((pIdx) => (
                      <div
                        key={`bowling_pin_${pIdx}`}
                        className={`text-lg transition-all duration-300 ${
                          standingPins[pIdx] ? 'scale-100 opacity-100' : 'scale-0 opacity-0 rotate-45 translate-y-4'
                        }`}
                      >
                        🎳
                      </div>
                    ))}
                  </div>
                  {/* Row 2: 2 Pins */}
                  <div className="flex justify-center gap-2">
                    {[1, 2].map((pIdx) => (
                      <div
                        key={`bowling_pin_${pIdx}`}
                        className={`text-lg transition-all duration-300 ${
                          standingPins[pIdx] ? 'scale-100 opacity-100' : 'scale-0 opacity-0 rotate-45 translate-y-4'
                        }`}
                      >
                        🎳
                      </div>
                    ))}
                  </div>
                  {/* Row 1: 1 Pin */}
                  <div className="flex justify-center">
                    <div
                      key="bowling_pin_0"
                      className={`text-xl transition-all duration-300 ${
                        standingPins[0] ? 'scale-100 opacity-100' : 'scale-0 opacity-0 rotate-45 translate-y-4'
                      }`}
                    >
                      🎳
                    </div>
                  </div>
                </div>

                {/* Oscillating Aim Arrow Needle (during aiming phase) */}
                {gameStage === 'aiming' && (
                  <div
                    className="w-1 h-16 bg-amber-400 rounded-full origin-bottom shadow-lg transition-transform duration-75 relative z-25"
                    style={{ transform: `rotate(${oscillatingAimAngle}deg)` }}
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1 -left-1" />
                  </div>
                )}

                {/* Animated Ball Rolling Up Lane */}
                <div
                  className={`text-3xl transition-all duration-700 z-20 ${
                    gameStage === 'rolling'
                      ? `-translate-y-36 scale-50 ${
                          aimDirection === -2
                            ? '-translate-x-20'
                            : aimDirection === -1
                            ? '-translate-x-10'
                            : aimDirection === 1
                            ? 'translate-x-10'
                            : aimDirection === 2
                            ? 'translate-x-20'
                            : ''
                        }`
                      : 'translate-y-0 scale-100'
                  }`}
                >
                  🔮
                </div>
              </div>

              {/* Aiming Phase Button */}
              {gameStage === 'aiming' && (
                <button
                  onClick={handleLockAim}
                  className="w-full max-w-sm mx-auto py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Crosshair className="w-4 h-4" />
                  <span>تثبيت زاوية الرمي (Lock Aim Angle)</span>
                </button>
              )}

              {/* Power Phase Slider & Roll Button */}
              {gameStage === 'power' && (
                <div className="space-y-4 max-w-sm mx-auto bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-300 text-[11px]">
                      <span>قوة الإطلاق (Launch Power):</span>
                      <span className="text-amber-400 font-mono font-black">{launchPower}%</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      value={launchPower}
                      onChange={(e) => setLaunchPower(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={handleLaunchBall}
                    className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>اطلق الكرة الآن! (Roll Bowling Ball)</span>
                  </button>
                </div>
              )}

              {/* Pinfall Result Banner */}
              {lastResultType && (
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center animate-fadeIn">
                  {lastResultType === 'strike' && (
                    <div className="text-xl font-black text-amber-400 animate-bounce">
                      🎳 STRIKE! إسقاط كامل بـ 10 دبابيس! (+60 pts)
                    </div>
                  )}
                  {lastResultType === 'spare' && (
                    <div className="text-lg font-black text-emerald-400">
                      ⚡ SPARE! رمية ممتازة أسقطت {lastPinfallCount} دبابيس! (+35 pts)
                    </div>
                  )}
                  {lastResultType === 'open' && (
                    <div className="text-sm font-bold text-blue-300">
                      🎳 أسقطت {lastPinfallCount} دبابيس!
                    </div>
                  )}
                  {lastResultType === 'gutter' && (
                    <div className="text-xs font-bold text-rose-400">
                      ❌ Gutter / إجابة غير صحيحة
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
          gameTitle="Bowling Championship • بطولة البولينج"
          isVictory={strikesCount >= 3 || score >= 350}
          score={score}
          accuracyPercent={accuracy}
          totalQuestions={questions.length}
          correctCount={correctCount}
          onPlayAgain={startNewMatch}
          onChangeGame={() => setIsPlaying(false)}
          customStat={{
            label: 'Strikes & Spares Record',
            value: `🎳 ${strikesCount} Strikes / ⚡ ${sparesCount} Spares`,
          }}
        />
      )}
    </div>
  );
};
