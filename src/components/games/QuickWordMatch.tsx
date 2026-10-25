import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Trophy,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  X,
  Play,
  Zap,
} from 'lucide-react';
import { VOCABULARY_DECKS, VocabularyDeck } from '../../data/vocabularyDecks.ts';
import { VocabularyItem } from '../../types.ts';
import { sounds } from '../../utils/soundEffects.ts';
import { recordGameCompletion } from '../../services/studentStorage.ts';

interface CardItem {
  cardId: string;
  itemId: string;
  text: string;
  lang: 'en' | 'ar';
  isMatched: boolean;
}

interface QuickWordMatchProps {
  onGameFinished?: (points: number, newBadges: string[]) => void;
  onClose?: () => void;
}

export const QuickWordMatch: React.FC<QuickWordMatchProps> = ({
  onGameFinished,
  onClose,
}) => {
  const [selectedDeckUnit, setSelectedDeckUnit] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [mismatchedPair, setMismatchedPair] = useState<[string, string] | null>(null);

  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getMuted());
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [lastAwardedPoints, setLastAwardedPoints] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle Mute
  const toggleMute = () => {
    const next = !isMuted;
    sounds.setMuted(next);
    setIsMuted(next);
  };

  // Prepare a round of 6 pairs (12 cards)
  const initializeRound = useCallback((unitId: number) => {
    let pool: VocabularyItem[] = [];
    if (unitId === 0) {
      // Mixed deck from all units
      VOCABULARY_DECKS.forEach((d) => pool.push(...d.items));
    } else {
      const deck = VOCABULARY_DECKS.find((d) => d.unitId === unitId) || VOCABULARY_DECKS[0];
      pool = [...deck.items];
    }

    // Shuffle pool and take 6 items
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5).slice(0, 6);

    const generatedCards: CardItem[] = [];
    shuffledPool.forEach((item, index) => {
      generatedCards.push({
        cardId: `en_${item.id}_${index}`,
        itemId: item.id,
        text: item.english,
        lang: 'en',
        isMatched: false,
      });
      generatedCards.push({
        cardId: `ar_${item.id}_${index}`,
        itemId: item.id,
        text: item.arabic,
        lang: 'ar',
        isMatched: false,
      });
    });

    // Shuffle cards on the board
    setCards(generatedCards.sort(() => Math.random() - 0.5));
    setSelectedCardId(null);
    setMismatchedPair(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setIsPlaying(true);
    setEarnedBadges([]);
    setLastAwardedPoints(0);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isPlaying && !isGameOver && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isGameOver, timeLeft]);

  // Check if all matched
  useEffect(() => {
    if (isPlaying && cards.length > 0 && cards.every((c) => c.isMatched)) {
      handleVictory();
    }
  }, [cards, isPlaying]);

  const handleTimeUp = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsGameOver(true);
    finishGame(score);
  };

  const handleVictory = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    sounds.playVictoryFanfare();

    // Bonus points for fast finish
    const timeBonus = timeLeft * 3;
    const finalScore = score + 50 + timeBonus;
    setScore(finalScore);
    setIsGameOver(true);

    finishGame(finalScore);
  };

  const finishGame = (finalScore: number) => {
    const { newBadges } = recordGameCompletion(finalScore, bestStreak);
    setEarnedBadges(newBadges);
    setLastAwardedPoints(finalScore);
    if (onGameFinished) {
      onGameFinished(finalScore, newBadges);
    }
  };

  const handleCardClick = (card: CardItem) => {
    if (!isPlaying || isGameOver || card.isMatched || mismatchedPair) return;

    sounds.playCardSelect();

    // If no card selected yet, select this one
    if (!selectedCardId) {
      setSelectedCardId(card.cardId);
      return;
    }

    // Clicked same card -> deselect
    if (selectedCardId === card.cardId) {
      setSelectedCardId(null);
      return;
    }

    const firstCard = cards.find((c) => c.cardId === selectedCardId);
    if (!firstCard) {
      setSelectedCardId(card.cardId);
      return;
    }

    // Cannot pair card of same language
    if (firstCard.lang === card.lang) {
      setSelectedCardId(card.cardId);
      return;
    }

    // CHECK FOR MATCH
    if (firstCard.itemId === card.itemId) {
      // MATCH SUCCESS!
      sounds.playMatchSuccess();

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      if (newStreak >= 3) {
        sounds.playStreakBonus();
      }

      const pointsEarned = 20 + newStreak * 5;
      setScore((prev) => prev + pointsEarned);

      setCards((prev) =>
        prev.map((c) =>
          c.cardId === firstCard.cardId || c.cardId === card.cardId
            ? { ...c, isMatched: true }
            : c
        )
      );

      setSelectedCardId(null);
    } else {
      // MISMATCH
      sounds.playMismatchError();
      setStreak(0);
      setMismatchedPair([firstCard.cardId, card.cardId]);

      setTimeout(() => {
        setMismatchedPair(null);
        setSelectedCardId(null);
      }, 700);
    }
  };

  const activeDeck = VOCABULARY_DECKS.find((d) => d.unitId === selectedDeckUnit) || VOCABULARY_DECKS[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white shadow-2xl relative overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Quick Word Match</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Secondary 1
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              تحدي ربط الكلمات الإنجليزية بمعانيها الرسمية في المنهج المصري
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-slate-800 text-slate-500 border-slate-700'
                : 'bg-slate-800 text-amber-400 border-amber-400/40 hover:bg-slate-700'
            }`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Close Game if inside modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer border border-slate-700"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* GAME LOBBY: DECK SELECTION (When Not Playing) */}
      {!isPlaying && (
        <div className="relative z-10 space-y-6 py-2">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              اختر الوحدة الدراسية لبدء التحدي (Choose Vocabulary Deck):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {VOCABULARY_DECKS.map((deck) => (
                <button
                  key={deck.unitId}
                  onClick={() => setSelectedDeckUnit(deck.unitId)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedDeckUnit === deck.unitId
                      ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg shadow-blue-600/20 scale-[1.02]'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400 mb-1">
                    <span>Unit {deck.unitId}</span>
                    <span className="text-[10px] text-slate-400">{deck.items.length} words</span>
                  </div>
                  <div className="text-xs font-bold truncate text-white">{deck.unitTitle}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5" dir="rtl">
                    {deck.unitTitleAr}
                  </div>
                </button>
              ))}

              {/* All Units Mixed Challenge Deck */}
              <button
                onClick={() => setSelectedDeckUnit(0)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedDeckUnit === 0
                    ? 'bg-gradient-to-br from-amber-500/30 to-amber-600/20 border-amber-400 text-white shadow-lg shadow-amber-500/20 scale-[1.02]'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400 mb-1">
                  <span>Grand Arena</span>
                  <span className="text-[10px] text-amber-300">All Units</span>
                </div>
                <div className="text-xs font-bold truncate text-white">Full Term Mixed Deck</div>
                <div className="text-[11px] text-amber-200/80 truncate mt-0.5" dir="rtl">
                  تحدي جميع الوحدات المجمعة
                </div>
              </button>
            </div>
          </div>

          {/* Quick Rules Banner */}
          <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-xs text-slate-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>قواعد لعبة المطابقة السريعة:</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                اطابق كل كلمة إنجليزية بمعناها العربي في أسرع وقت. كل مطابقة صحيحة تمنحك +20 نقطة بالإضافة لمضاعف الـ Combo Streak!
              </p>
            </div>

            <button
              onClick={() => initializeRound(selectedDeckUnit)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>ابدأ التحدي الآن (Start Game)</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE GAMEPLAY BOARD */}
      {isPlaying && (
        <div className="relative z-10 space-y-4">
          {/* STATS STRIP: Time, Score, Streak */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-xl ${
                  timeLeft <= 15 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Time</span>
                <span
                  className={`text-sm sm:text-base font-black font-mono ${
                    timeLeft <= 15 ? 'text-red-400 font-bold' : 'text-white'
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
                <span className="text-sm sm:text-base font-black font-mono text-amber-400">{score}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <div
                className={`p-2 rounded-xl ${
                  streak >= 3 ? 'bg-orange-500/30 text-orange-400 animate-bounce' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Flame className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Streak</span>
                <span className="text-sm sm:text-base font-black font-mono text-orange-400">
                  {streak}x {streak >= 3 && '🔥'}
                </span>
              </div>
            </div>
          </div>

          {/* 12 CARDS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3 min-h-[300px]">
            {cards.map((card) => {
              const isSelected = selectedCardId === card.cardId;
              const isError =
                mismatchedPair && (mismatchedPair[0] === card.cardId || mismatchedPair[1] === card.cardId);

              return (
                <button
                  key={card.cardId}
                  onClick={() => handleCardClick(card)}
                  disabled={card.isMatched || isGameOver}
                  className={`relative p-3.5 sm:p-4 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex flex-col items-center justify-center text-center min-h-[75px] select-none cursor-pointer ${
                    card.isMatched
                      ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 opacity-60 pointer-events-none scale-95'
                      : isError
                      ? 'bg-red-950/70 border-2 border-red-500 text-red-200 animate-shake scale-100'
                      : isSelected
                      ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 text-slate-950 border-2 border-amber-300 shadow-xl shadow-amber-400/30 scale-105 z-10'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-500 text-slate-100 hover:scale-[1.02]'
                  }`}
                >
                  {/* Language pill */}
                  <span
                    className={`absolute top-1.5 right-2 text-[9px] font-mono px-1.5 py-0.2 rounded-md ${
                      isSelected
                        ? 'bg-slate-950 text-amber-300'
                        : card.lang === 'en'
                        ? 'bg-blue-900/60 text-blue-300'
                        : 'bg-emerald-900/60 text-emerald-300'
                    }`}
                  >
                    {card.lang === 'en' ? 'EN' : 'AR'}
                  </span>

                  <span className={card.lang === 'ar' ? 'font-arabic text-sm sm:text-base' : 'font-sans'}>
                    {card.text}
                  </span>

                  {card.isMatched && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute bottom-1.5 right-1.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ACTIVE GAME FOOTER CONTROLS */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setIsPlaying(false)}
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>العودة لقائمة الوحدات (Change Deck)</span>
            </button>

            <button
              onClick={() => initializeRound(selectedDeckUnit)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة الخلط (Restart)</span>
            </button>
          </div>
        </div>
      )}

      {/* GAME OVER & VICTORY MODAL OVERLAY */}
      {isGameOver && (
        <div className="absolute inset-0 z-20 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-400/20">
              <Trophy className="w-8 h-8 fill-current" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">
                {cards.every((c) => c.isMatched) ? '🎉 Amazing Match!' : '⏰ Time is Up!'}
              </h3>
              <p className="text-xs text-slate-400">
                {cards.every((c) => c.isMatched)
                  ? 'أتممت جميع بطاقات الوحدة بنجاح فائق!'
                  : 'أداء رائع! استمر في التدرب لحفظ جميع الكلمات.'}
              </p>
            </div>

            {/* Score Summary Box */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 grid grid-cols-2 gap-3 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Points Earned</span>
                <span className="text-2xl font-black text-amber-400 font-mono">+{lastAwardedPoints}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Best Streak</span>
                <span className="text-2xl font-black text-orange-400 font-mono">{bestStreak}x</span>
              </div>
            </div>

            {/* Badges notification if unlocked */}
            {earnedBadges.length > 0 && (
              <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-3 text-xs text-amber-300 font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>مبروك! تم فتح شارة تفوق جديدة في حسابك!</span>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => initializeRound(selectedDeckUnit)}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>العب جولة أخرى (Play Again)</span>
              </button>

              <button
                onClick={() => setIsPlaying(false)}
                className="w-full py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                اختيار وحدة أخرى (Select Deck)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
