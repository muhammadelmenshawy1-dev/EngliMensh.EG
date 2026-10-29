import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Volume2, VolumeX, RotateCcw, ArrowRight, Zap, Shield, User, Bot, Sparkles, Award, Pause, Volume1 } from 'lucide-react';
import { GameQuestion, getGameQuestions } from '../../services/gameQuestionBank.ts';
import { gameAudio } from '../../utils/gameAudio.ts';
import { triggerConfetti, triggerMudSplash } from '../../utils/gameParticles.ts';
import { GameQuestionPanel } from './GameQuestionPanel.tsx';
import { GameResultsScreen } from './GameResultsScreen.tsx';

interface TugOfWordsGameProps {
  onGameFinished?: (points: number, newBadges: string[]) => void;
  onClose?: () => void;
  initialStage?: 'primary' | 'intermediate' | 'secondary';
  initialGrade?: number;
  initialDifficulty?: 'easy' | 'medium' | 'hard';
  initialFocus?: 'vocabulary' | 'grammar' | 'spelling' | 'mixed';
}

export const TugOfWordsGame: React.FC<TugOfWordsGameProps> = ({
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

  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>(
    initialDifficulty === 'easy' ? 'easy' : initialDifficulty === 'hard' ? 'hard' : 'normal'
  );
  const [selectedStage, setSelectedStage] = useState<'All' | 'Primary' | 'Preparatory' | 'Secondary'>(
    mapStageProp(initialStage)
  );
  const [selectedUnitId, setSelectedUnitId] = useState<number>(0);
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

  useEffect(() => {
    if (initialDifficulty) {
      setDifficulty(initialDifficulty === 'easy' ? 'easy' : initialDifficulty === 'hard' ? 'hard' : 'normal');
    }
  }, [initialDifficulty]);

  // Game State
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // Rope Position (-8 to +8, 0 = center, +8 = Player Wins, -8 = AI Wins)
  const [ropePosition, setRopePosition] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Character Poses: 'idle' | 'pulling' | 'stumble' | 'fell_in_mud'
  const [playerPose, setPlayerPose] = useState<'idle' | 'pulling' | 'stumble' | 'fell_in_mud'>('idle');
  const [aiPose, setAiPose] = useState<'idle' | 'pulling' | 'stumble' | 'fell_in_mud'>('idle');

  // Canvas Refs for Mud Splash & Confetti
  const mudCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    return () => {
      gameAudio.stopAmbience();
    };
  }, []);

  // AI Opponent Info
  const aiNames = {
    easy: 'Rookie Bot 🤖',
    normal: 'Professor Menshawy AI 🎓',
    hard: 'Grammar Titan ⚡',
  };

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

  const startNewGame = useCallback(() => {
    gameAudio.unlockAudio();
    gameAudio.playGameStart();
    if (isAmbienceEnabled && !isMuted) {
      gameAudio.startAmbience('arcade');
    }

    const fetched = getGameQuestions({
      stage: selectedStage === 'All' ? undefined : selectedStage,
      grade: initialGrade,
      unitId: selectedUnitId,
      difficulty: difficulty === 'easy' ? 'easy' : difficulty === 'hard' ? 'hard' : 'medium',
      focus: initialFocus,
      limit: 10,
    });
    setQuestions(fetched);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setRopePosition(0); // center
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setPlayerPose('idle');
    setAiPose('idle');
    setIsGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  }, [selectedStage, initialGrade, selectedUnitId, difficulty, initialFocus, isAmbienceEnabled, isMuted]);

  const handleSelectOption = (optionIdx: number) => {
    if (isAnswered || isGameOver || isPaused) return;

    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = optionIdx === currentQ.correctIndex;

    let deltaRope = 0;

    if (isCorrect) {
      gameAudio.playCorrect();
      gameAudio.playRopePull();
      gameAudio.playCrowdCheer(false);

      setPlayerPose('pulling');
      setAiPose('stumble');

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + 30 + newStreak * 10);
      deltaRope = +2; // Pull towards student
    } else {
      gameAudio.playWrong();
      gameAudio.playRopeSlip();
      gameAudio.playCrowdDisappointment();

      setPlayerPose('stumble');
      setAiPose('pulling');

      setStreak(0);
      deltaRope = -2; // Move towards AI
    }

    // Deterministic AI pull calculation based on chosen difficulty
    const aiAccuracy = difficulty === 'easy' ? 0.35 : difficulty === 'normal' ? 0.6 : 0.8;
    const aiSuccess = Math.random() < aiAccuracy;

    if (aiSuccess && !isCorrect) {
      deltaRope -= 1; // Extra AI pull
    } else if (!aiSuccess && isCorrect) {
      deltaRope += 1; // Extra player bonus pull
    }

    const newPosition = Math.max(-8, Math.min(8, ropePosition + deltaRope));
    setRopePosition(newPosition);

    // Reset poses after pull animation
    setTimeout(() => {
      if (newPosition >= 8) {
        // AI falls in mud!
        setAiPose('fell_in_mud');
        setPlayerPose('pulling');
        gameAudio.playMudSplash();
        if (mudCanvasRef.current) triggerMudSplash(mudCanvasRef.current, 900);
        if (confettiCanvasRef.current) triggerConfetti(confettiCanvasRef.current, 2000);
      } else if (newPosition <= -8) {
        // Player falls in mud!
        setPlayerPose('fell_in_mud');
        setAiPose('pulling');
        gameAudio.playMudSplash();
        if (mudCanvasRef.current) triggerMudSplash(mudCanvasRef.current, 900);
      } else {
        setPlayerPose('idle');
        setAiPose('idle');
      }
    }, 600);

    // Check Win/Loss threshold or Advance to next question
    setTimeout(() => {
      if (newPosition >= 8 || newPosition <= -8 || currentIndex >= questions.length - 1) {
        finishGame(newPosition >= 0);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      }
    }, 1800);
  };

  const finishGame = (isStudentWin: boolean) => {
    setIsGameOver(true);
    gameAudio.stopAmbience();

    if (isStudentWin) {
      gameAudio.playVictory();
    } else {
      gameAudio.playDefeat();
    }

    const finalScore = score + (isStudentWin ? 100 : 20);
    setScore(finalScore);

    if (onGameFinished) {
      onGameFinished(finalScore, []);
    }
  };

  const currentQ = questions[currentIndex];
  const isStudentWin = ropePosition >= 0;
  const accuracy = questions.length > 0 ? Math.round((correctCount / (currentIndex + 1)) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white shadow-2xl space-y-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
            🪢
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>Tug of Words • شد الحبل اللغوي</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                1 vs 1 Arena
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              أجب عن أسئلة المنهج بمهارة لسحب الحبل نحو فريقك وإسقاط المنافس في بركة الوحل!
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
            title="أجواء الحلبة الصوتية"
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
              onClick={startNewGame}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              title="إعادة بدء التحدي"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Stage Selector */}
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                المرحلة الدراسية:
              </label>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'All', label: '🌟 جميع المراحل' },
                  { id: 'Primary', label: '🏫 الابتدائية' },
                  { id: 'Preparatory', label: '🎒 الإعدادية' },
                  { id: 'Secondary', label: '🎓 الثانوية' },
                ].map((stg) => (
                  <button
                    key={stg.id}
                    onClick={() => setSelectedStage(stg.id as any)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
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

            {/* Unit Selector */}
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                اختر الوحدة الدراسية:
              </label>
              <select
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer mt-1"
              >
                <option value={0}>🌟 جميع الوحدات والمراجعات</option>
                <option value={1}>Unit 1: Getting Away & Vocabulary</option>
                <option value={2}>Unit 2: Supporting the Family</option>
                <option value={3}>Unit 3: Improving Lives</option>
                <option value={4}>Unit 4: Making New Friends</option>
                <option value={5}>Unit 5: Communication Systems</option>
                <option value={6}>Unit 6: Learning from Nature</option>
              </select>
            </div>

            {/* AI Difficulty Selector */}
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                مستوى منافس الذكاء الاصطناعي:
              </label>
              <div className="grid grid-cols-3 gap-1.5 mt-1">
                {(['easy', 'normal', 'hard'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`py-2 rounded-xl border text-[11px] font-bold capitalize transition-all cursor-pointer ${
                      difficulty === d
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-extrabold shadow-md'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startNewGame}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-base transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>ابدأ تحدي شد الحبل (Start Tug Match)</span>
          </button>
        </div>
      )}

      {/* PAUSE OVERLAY */}
      {isPaused && isPlaying && !isGameOver && (
        <div className="relative z-30 p-8 bg-slate-950/90 rounded-2xl border border-slate-800 text-center space-y-4">
          <div className="text-2xl font-black text-amber-400">⏸️ اللعبة متوقفة مؤقتًا</div>
          <p className="text-xs text-slate-300">اضغط على زر الاستئناف لمتابعة التحدي</p>
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
        <div className="relative z-10 space-y-6">
          {/* 1. TUG-OF-WAR ARENA BATTLEFIELD */}
          <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 space-y-4 shadow-inner relative overflow-hidden">
            {/* Mud & Confetti Particle Overlay Canvas */}
            <canvas ref={mudCanvasRef} className="absolute inset-0 pointer-events-none z-30 w-full h-full" />
            <canvas ref={confettiCanvasRef} className="absolute inset-0 pointer-events-none z-40 w-full h-full" />

            {/* Team Info Header */}
            <div className="flex items-center justify-between text-xs font-bold relative z-10">
              <div className="flex items-center gap-2 text-blue-400">
                <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center font-bold">
                  👨‍🎓
                </div>
                <div>
                  <span className="block font-black text-white">فريق الطالب (You)</span>
                  <span className="text-[10px] text-blue-300 font-mono">Score: {score}</span>
                </div>
              </div>

              <div className="text-center font-mono text-xs font-black text-amber-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Tug Position: {ropePosition > 0 ? `+${ropePosition}` : ropePosition} / 8
              </div>

              <div className="flex items-center gap-2 text-rose-400">
                <div className="text-right">
                  <span className="block font-black text-white">{aiNames[difficulty]}</span>
                  <span className="text-[10px] text-rose-300 font-mono">Difficulty: {difficulty}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-600/30 border border-rose-400 flex items-center justify-center font-bold">
                  🤖
                </div>
              </div>
            </div>

            {/* Battlefield Side-View Canvas with Central Mud Pit */}
            <div className="relative h-44 bg-gradient-to-b from-slate-900 via-slate-950 to-[#2c1d11] rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-between px-6">
              {/* Central Mud Pit */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 sm:w-60 h-20 bg-gradient-to-t from-[#3d2411] via-[#5c3719] to-[#804f24] rounded-t-3xl border-t-4 border-[#a66a33] shadow-inner flex flex-col items-center justify-center">
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-200/60 font-mono">
                  ⚠️ DANGER: MUD PIT ⚠️
                </span>
                <div className="flex gap-4 opacity-40 text-xs">
                  <span>🫧</span>
                  <span>🫧</span>
                  <span>🫧</span>
                </div>
              </div>

              {/* Student Character on Left */}
              <div
                className={`flex flex-col items-center transition-all duration-500 z-20 ${
                  playerPose === 'pulling'
                    ? '-translate-x-4 rotate-[-12deg]'
                    : playerPose === 'stumble'
                    ? 'translate-x-4 rotate-[12deg]'
                    : playerPose === 'fell_in_mud'
                    ? 'translate-x-28 translate-y-8 rotate-[45deg] scale-90'
                    : ''
                }`}
              >
                <div className="text-4xl sm:text-5xl filter drop-shadow-md">
                  {playerPose === 'fell_in_mud' ? '😵' : playerPose === 'pulling' ? '😤' : '🧑‍🎓'}
                </div>
                <span className="text-[10px] font-black text-blue-300 bg-slate-900/80 px-2 py-0.5 rounded-full border border-blue-500/30 mt-1">
                  Student Team
                </span>
              </div>

              {/* Tense Rope with Moving Ribbon Marker */}
              <div className="flex-1 mx-4 relative flex items-center justify-center">
                {/* Thick Rope Texture */}
                <div className="w-full h-3 bg-gradient-to-r from-amber-700 via-[#e0a96d] to-amber-700 rounded-full border-t border-b border-amber-900 shadow-md relative">
                  {/* Rope Center Marker (moves along with ropePosition) */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 flex flex-col items-center"
                    style={{ left: `calc(50% + ${ropePosition * 5.5}%)` }}
                  >
                    <div className="w-4 h-6 bg-red-600 rounded-sm shadow-md animate-bounce border border-white" />
                  </div>
                </div>
              </div>

              {/* AI Opponent Character on Right */}
              <div
                className={`flex flex-col items-center transition-all duration-500 z-20 ${
                  aiPose === 'pulling'
                    ? 'translate-x-4 rotate-[12deg]'
                    : aiPose === 'stumble'
                    ? '-translate-x-4 rotate-[-12deg]'
                    : aiPose === 'fell_in_mud'
                    ? '-translate-x-28 translate-y-8 rotate-[-45deg] scale-90'
                    : ''
                }`}
              >
                <div className="text-4xl sm:text-5xl filter drop-shadow-md">
                  {aiPose === 'fell_in_mud' ? '💥' : aiPose === 'pulling' ? '😈' : '🤖'}
                </div>
                <span className="text-[10px] font-black text-rose-300 bg-slate-900/80 px-2 py-0.5 rounded-full border border-rose-500/30 mt-1">
                  AI Titan
                </span>
              </div>
            </div>

            {/* Dynamic Tug Status Indicator Banner */}
            <div className="text-center text-xs font-bold text-slate-300 pt-1">
              {ropePosition > 3 ? (
                <span className="text-emerald-400 font-black">🔥 ممتاز! الحبل يندفع نحو حافتك الفائزة! المنافس يقترب من الوحل!</span>
              ) : ropePosition < -3 ? (
                <span className="text-rose-400 font-black">⚠️ انتبه! منافس الذكاء الاصطناعي يسحب الحبل لصالحه! تجنب الوقوع في الوحل!</span>
              ) : (
                <span className="text-amber-300 font-bold">⚔️ المعركة متكافئة بين الطرفين! أجب بدقة للتقدم!</span>
              )}
            </div>
          </div>

          {/* 2. CURRICULUM QUESTION PANEL */}
          {currentQ && (
            <GameQuestionPanel
              question={currentQ}
              questionIndex={currentIndex}
              totalQuestions={questions.length}
              selectedOptionIndex={selectedOption}
              isAnswered={isAnswered}
              onSelectOption={handleSelectOption}
            />
          )}
        </div>
      )}

      {/* RESULTS SCREEN */}
      {isGameOver && (
        <GameResultsScreen
          gameTitle="Tug of Words • شد الحبل"
          isVictory={isStudentWin}
          score={score}
          accuracyPercent={accuracy}
          totalQuestions={questions.length}
          correctCount={correctCount}
          bestStreak={bestStreak}
          onPlayAgain={startNewGame}
          onChangeGame={() => setIsPlaying(false)}
          customStat={{
            label: 'Final Rope Position',
            value: isStudentWin ? `Student Win (+${ropePosition})` : `AI Win (${ropePosition})`,
          }}
        />
      )}
    </div>
  );
};
