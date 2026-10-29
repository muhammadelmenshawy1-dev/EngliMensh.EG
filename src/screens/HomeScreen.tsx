import React, { useState, useEffect } from 'react';
import {
  Zap,
  Target,
  BookOpen,
  ChevronLeft,
  Gamepad2,
  Trophy,
  Play,
  CheckCircle2,
  Sparkles,
  Volume2,
  X,
  FileCheck2,
} from 'lucide-react';
import { StudentProfile, MainAppTab } from '../types.ts';
import { ArcadeGameType } from '../types/gameQuestions.ts';
import { UnitCurriculum } from '../types/curriculum.ts';
import { allCurriculaUnits } from '../data/masterCurriculumDatabase.ts';
import {
  loadLearningState,
  calculateUnitPercentage,
  awardProtectedXP,
  LearningStoreState,
} from '../services/learningStore.ts';
import { useGameLeaderboard } from '../hooks/useGameLeaderboard.ts';
import { speakText } from '../utils/speechService.ts';

interface HomeScreenProps {
  student: StudentProfile | null;
  onNavigateTab: (tab: MainAppTab) => void;
  onLaunchGame: (gameType: ArcadeGameType) => void;
  onStartDailyQuest: () => void;
  onContinueLesson: (unit?: UnitCurriculum) => void;
  onStateUpdated?: () => void;
}

interface DailyQuizItem {
  id: string;
  questionEn: string;
  questionAr: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

const DAILY_CHALLENGE_QUESTIONS: DailyQuizItem[] = [
  {
    id: 'dq_1',
    questionEn: 'Yesterday, my family ______ to Alexandria by train.',
    questionAr: 'اختر الفعل الصحيح في زمن الماضي البسيط (Past Simple):',
    options: ['travel', 'traveled', 'travels', 'traveling'],
    correctIndex: 1,
    explanationAr: 'كلمة Yesterday تدل على الماضي البسيط، لذلك نختار التصريف الثاني traveled.',
  },
  {
    id: 'dq_2',
    questionEn: 'She ______ her English homework right now.',
    questionAr: 'اختر الصيغة الصحيحة للمضارع المستمر (Present Continuous):',
    options: ['is doing', 'does', 'did', 'done'],
    correctIndex: 0,
    explanationAr: 'عبارة right now تدل على حدث يقع الآن، فنستخدم is + verb-ing.',
  },
  {
    id: 'dq_3',
    questionEn: 'A true ______ always helps you in difficult times.',
    questionAr: 'اختر المفردة المناسبة لإكمال المعنى:',
    options: ['stranger', 'friend', 'planet', 'machine'],
    correctIndex: 1,
    explanationAr: 'كلمة friend تعني صديق، وهي الكلمة المناسبة لسياق الجملة.',
  },
  {
    id: 'dq_4',
    questionEn: 'If you study hard, you ______ high marks in the exam.',
    questionAr: 'اختر جواب الشرط الصحيح في الحالة الأولى (First Conditional):',
    options: ['got', 'would get', 'will get', 'getting'],
    correctIndex: 2,
    explanationAr: 'في الحالة الشرطية الأولى (If + Present Simple)، نستخدم will + المصدر في الجملة الثانية.',
  },
  {
    id: 'dq_5',
    questionEn: 'We have lived in Cairo ______ ten years.',
    questionAr: 'اختر حرف الجر الزمني الصحيح مع المضارع التام:',
    options: ['since', 'for', 'ago', 'yet'],
    correctIndex: 1,
    explanationAr: 'نستخدم for قبل المدة الزمنية المحددة بعدد (ten years)، بينما since تأتي قبل بداية المدة.',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  student,
  onNavigateTab,
  onLaunchGame,
  onContinueLesson,
  onStateUpdated,
}) => {
  const [learningState, setLearningState] = useState<LearningStoreState>(() =>
    loadLearningState()
  );
  const { entries: leaderboardEntries } = useGameLeaderboard();

  // Interactive Daily Quest Modal State
  const [isQuestModalOpen, setIsQuestModalOpen] = useState<boolean>(false);
  const [questStepIndex, setQuestStepIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [questSessionScore, setQuestSessionScore] = useState<number>(0);
  const [questFinished, setQuestFinished] = useState<boolean>(false);

  useEffect(() => {
    setLearningState(loadLearningState());
  }, [student]);

  const studentName = student?.name || learningState.nickname || 'بطل EngliMensh';

  // Daily Quest real calculations
  const quest = learningState.dailyQuest;
  const questPercentage = Math.min(
    100,
    Math.round((quest.currentCount / Math.max(1, quest.targetCount)) * 100)
  );

  // Resolve "Continue Learning" Unit from learningState
  const resolveActiveUnit = (): {
    unit: UnitCurriculum;
    unitKey: string;
    percent: number;
  } => {
    const lastKey = learningState.lastActiveUnitKey;
    if (lastKey) {
      const parts = lastKey.split('_');
      const stagePart = parts[0];
      const gradePart = Number(parts[1]);
      const unitNumPart = Number(parts[parts.length - 1]);
      const found = allCurriculaUnits.find(
        (u) =>
          u.stage === stagePart &&
          u.grade === gradePart &&
          u.unitNumber === unitNumPart
      );
      if (found) {
        const prog = learningState.unitProgress[lastKey];
        return {
          unit: found,
          unitKey: lastKey,
          percent: calculateUnitPercentage(prog),
        };
      }
    }

    // Fallback to student's preferred stage & grade Unit 1 (or Primary Grade 3 Unit 3 / Secondary Grade 10 Unit 1)
    const fallbackUnit =
      allCurriculaUnits.find(
        (u) =>
          u.stage === learningState.preferredStage &&
          u.grade === learningState.preferredGrade
      ) || allCurriculaUnits[0];

    const fallbackKey = `${fallbackUnit.stage}_${fallbackUnit.grade}_${fallbackUnit.unitNumber}`;
    const prog = learningState.unitProgress[fallbackKey];
    return {
      unit: fallbackUnit,
      unitKey: fallbackKey,
      percent: calculateUnitPercentage(prog),
    };
  };

  const { unit: activeUnit, percent: activeUnitPercent } = resolveActiveUnit();

  const handleOpenQuestChallenge = () => {
    setQuestStepIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setQuestSessionScore(0);
    setQuestFinished(false);
    setIsQuestModalOpen(true);
  };

  const handleCheckQuestAnswer = () => {
    if (selectedOption === null || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const currentQ = DAILY_CHALLENGE_QUESTIONS[questStepIndex];
    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setQuestSessionScore((prev) => prev + 1);
      // Award protected XP for today's daily quest question and advance quest counter
      const todayKey = new Date().toISOString().split('T')[0];
      const updated = awardProtectedXP(
        `daily_quest_${todayKey}_${currentQ.id}`,
        10,
        true
      );
      setLearningState(updated);
      onStateUpdated?.();
    }
  };

  const handleNextQuestQuestion = () => {
    if (questStepIndex + 1 < DAILY_CHALLENGE_QUESTIONS.length) {
      setQuestStepIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setQuestFinished(true);
      setLearningState(loadLearningState());
      onStateUpdated?.();
    }
  };

  return (
    <div
      className="space-y-4 pb-24 pt-3 px-3 sm:px-4 max-w-lg mx-auto text-[#0F172A]"
      dir="rtl"
    >
      {/* 1. Welcome Hero Header (Matches Screen 1 Mockup) */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-[#D97706] border border-amber-200/80 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>مرحباً يا بطل! 👋</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            أهلاً {studentName}!
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-semibold">
            جاهز لتحدي اليوم في اللغة الإنجليزية؟
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('profile')}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1E3A8A] to-[#2563EB] p-1 shadow-md shrink-0 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          title="ملف الطالب"
        >
          <div className="w-full h-full bg-amber-50 rounded-xl flex items-center justify-center text-3xl">
            {learningState.avatar || '🧑‍🎓'}
          </div>
        </button>
      </div>

      {/* 2. Daily Quest Card (المهمة اليومية — Matches Screen 1 Mockup) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/60 to-[#FFF7ED] border-2 border-[#F59E0B]/40 p-5 shadow-sm space-y-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#D97706] shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-[#0F172A]">المهمة اليومية</h2>
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#B45309]">
                  +{quest.rewardXp} XP
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-semibold mt-0.5">
                {quest.titleAr} ({quest.currentCount}/{quest.targetCount})
              </p>
            </div>
          </div>

          <span
            className={`text-xs font-black px-3 py-1 rounded-full border shrink-0 ${
              quest.completed
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-white text-[#D97706] border-amber-300'
            }`}
          >
            {questPercentage}% مكتمل
          </span>
        </div>

        {/* Multi-color Progress Bar (Matches Screen 1 Mockup) */}
        <div className="w-full bg-white/90 rounded-full h-3.5 p-0.5 border border-amber-200 shadow-inner overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#F59E0B] via-pink-500 to-[#1E3A8A] h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(questPercentage, 6)}%` }}
          />
        </div>

        {/* Royal Blue Action Button */}
        <button
          type="button"
          onClick={handleOpenQuestChallenge}
          className="w-full min-h-[46px] py-3 px-4 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0F2856] hover:from-[#172E6E] hover:to-[#0A1D40] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99] transition-all"
        >
          <Zap className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
          <span>
            {quest.completed ? 'مراجعة تحدي اليوم المكتمل ✅' : 'متابعة التحدي الآن'}
          </span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Continue Learning Card (تابع من حيث توقفت — Matches Screen 1 Mockup) */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#1E3A8A]">
                  تابع من حيث توقفت
                </span>
                <span className="text-[11px] font-bold text-[#64748B] bg-slate-100 px-2 py-0.5 rounded-md">
                  Unit {activeUnit.unitNumber}
                </span>
              </div>
              <h3 className="text-base font-black text-[#0F172A] mt-0.5">
                {activeUnit.grammarModule?.ruleName || activeUnit.unitTitle}
              </h3>
              <p className="text-xs text-[#64748B] font-medium">
                {activeUnit.unitTitleAr || activeUnit.unitTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onContinueLesson(activeUnit)}
            className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-[#1E3A8A] border border-slate-200 transition-colors cursor-pointer"
            title="إكمال الدرس"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#64748B]">
              تقدم الوحدة: {activeUnitPercent}%
            </span>
            <button
              type="button"
              onClick={() => onContinueLesson(activeUnit)}
              className="font-black text-[#1E3A8A] hover:text-[#D97706] flex items-center gap-1 cursor-pointer"
            >
              <span>إكمال الدرس</span>
              <Play className="w-3 h-3 fill-current" />
            </button>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/80">
            <div
              className="bg-gradient-to-r from-[#1E3A8A] to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(activeUnitPercent, 8)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3b. Official Exams Hub Card (بنك الامتحانات الشاملة والاختبارات الوزارية) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1E3A8A] via-[#172E6E] to-[#0F2856] text-white p-4 sm:p-5 shadow-md border border-blue-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F59E0B] shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-white">
                بنك الامتحانات الشاملة
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#F59E0B] text-slate-950">
                وزاري
              </span>
            </div>
            <p className="text-xs text-blue-100/90 font-medium">
              اختبارات الوحدات ونماذج الوزارة للابتدائي والإعدادي والثانوي والبكالوريا
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('exams')}
          className="px-3.5 py-2.5 rounded-2xl bg-[#F59E0B] hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 flex items-center gap-1 shadow-sm cursor-pointer active:scale-95 transition-all"
        >
          <span>ابدأ اختباراً</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* 4. Two-Column Split: Featured Games & Mini Leaderboard (Matches Screen 1 Bottom Split) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Right Column in RTL: الألعاب الحالية */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] p-4 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-[#0F172A]">الألعاب</h3>
              <p className="text-[11px] text-[#64748B] font-semibold">الألعاب الحالية</p>
            </div>
            <Gamepad2 className="w-5 h-5 text-[#1E3A8A]" />
          </div>

          {/* Illustrated Mini Soccer Field Preview */}
          <div
            onClick={() => onLaunchGame('shootout')}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-sky-400 via-emerald-500 to-emerald-700 p-3 text-white cursor-pointer group shadow-xs border border-emerald-600/30"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl group-hover:scale-110 transition-transform">⚽</span>
              <span className="text-[10px] font-black bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full">
                العب الآن
              </span>
            </div>
            <div className="text-xs font-black">ضربات الجزاء</div>
            <div className="text-[10px] text-emerald-50">Shoot & Score</div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => onLaunchGame('tug_of_war')}
              className="py-1.5 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#B45309] text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <span>🪢</span>
              <span>شد الحبل</span>
            </button>
            <button
              type="button"
              onClick={() => onLaunchGame('bowling')}
              className="py-1.5 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#1E3A8A] text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <span>🎳</span>
              <span>البولينج</span>
            </button>
          </div>
        </div>

        {/* Left Column in RTL: لوحة أوائل مصغرة */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] p-4 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-[#0F172A]">لوحة الصدارة</h3>
              <p className="text-[11px] text-[#64748B] font-semibold">أوائل مصغرة</p>
            </div>
            <Trophy className="w-5 h-5 text-[#F59E0B]" />
          </div>

          {/* Mini Trophy Podium Graphic */}
          <div
            onClick={() => onNavigateTab('leaderboard')}
            className="rounded-2xl bg-gradient-to-b from-slate-50 to-amber-50/60 border border-amber-200/60 p-2.5 cursor-pointer hover:border-amber-300 transition-all"
          >
            <div className="flex items-end justify-center gap-2 h-16 pt-2">
              <div className="flex flex-col items-center">
                <span className="text-xs">🥈</span>
                <div className="w-7 h-7 rounded-t-lg bg-slate-300 text-slate-800 text-[10px] font-black flex items-center justify-center">
                  2
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base">🏆</span>
                <div className="w-8 h-10 rounded-t-lg bg-gradient-to-t from-[#D97706] to-[#F59E0B] text-white text-xs font-black flex items-center justify-center shadow-xs">
                  1
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs">🥉</span>
                <div className="w-7 h-5 rounded-t-lg bg-amber-700 text-white text-[10px] font-black flex items-center justify-center">
                  3
                </div>
              </div>
            </div>
          </div>

          {/* Real Device Top Score or Student Rank */}
          {leaderboardEntries.length > 0 ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] bg-amber-50/80 px-2.5 py-1.5 rounded-xl border border-amber-200/70">
                <span className="font-black text-[#0F172A] truncate">
                  1. {leaderboardEntries[0].studentName}
                </span>
                <span className="font-black text-[#D97706] shrink-0">
                  {leaderboardEntries[0].score} XP
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[11px] bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
              <span className="font-bold text-[#0F172A] truncate">{studentName}</span>
              <span className="font-black text-[#1E3A8A] shrink-0">
                {learningState.xp} XP
              </span>
            </div>
          )}
        </div>
      </div>

      {/* INTERACTIVE DAILY QUEST MODAL */}
      {isQuestModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          dir="rtl"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0F172A]">تحدي المهمة اليومية</h3>
                  <p className="text-[11px] text-[#64748B]">
                    سؤال {questStepIndex + 1} من {DAILY_CHALLENGE_QUESTIONS.length}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuestModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!questFinished ? (
              <div className="space-y-4">
                {(() => {
                  const q = DAILY_CHALLENGE_QUESTIONS[questStepIndex];
                  return (
                    <>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <p className="text-xs font-bold text-[#1E3A8A]">{q.questionAr}</p>
                        <div className="flex items-center justify-between gap-2" dir="ltr">
                          <p className="text-sm sm:text-base font-black text-[#0F172A]">
                            {q.questionEn}
                          </p>
                          <button
                            type="button"
                            onClick={() => speakText(q.questionEn.replace('______', ''), 'en')}
                            className="p-2 rounded-xl bg-blue-50 text-[#1E3A8A] hover:bg-blue-100 shrink-0 cursor-pointer"
                            title="استمع للجملة"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5" dir="ltr">
                        {q.options.map((opt, idx) => {
                          const isSelected = selectedOption === idx;
                          const isCorrect = idx === q.correctIndex;
                          let btnStyle =
                            'bg-white border-slate-200 text-[#0F172A] hover:border-[#1E3A8A]';

                          if (isAnswerChecked) {
                            if (isCorrect) {
                              btnStyle =
                                'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20';
                            } else if (isSelected) {
                              btnStyle = 'bg-red-50 border-red-400 text-red-900';
                            }
                          } else if (isSelected) {
                            btnStyle =
                              'bg-blue-50 border-[#1E3A8A] text-[#1E3A8A] ring-2 ring-[#1E3A8A]/20';
                          }

                          return (
                            <button
                              key={`dq_opt_${q.id}_${idx}`}
                              type="button"
                              disabled={isAnswerChecked}
                              onClick={() => setSelectedOption(idx)}
                              className={`min-h-[46px] p-3 rounded-2xl border-2 font-black text-sm transition-all cursor-pointer ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswerChecked && (
                        <div
                          className={`p-3 rounded-2xl text-xs font-bold border ${
                            selectedOption === q.correctIndex
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-amber-50 border-amber-200 text-amber-900'
                          }`}
                        >
                          {selectedOption === q.correctIndex ? '✅ إجابة صحيحة! ' : '💡 ملاحظة: '}
                          {q.explanationAr}
                        </div>
                      )}

                      <div className="pt-1">
                        {!isAnswerChecked ? (
                          <button
                            type="button"
                            disabled={selectedOption === null}
                            onClick={handleCheckQuestAnswer}
                            className="w-full min-h-[46px] py-3 rounded-2xl bg-[#1E3A8A] hover:bg-[#0F2856] disabled:opacity-40 text-white font-black text-sm cursor-pointer transition-all"
                          >
                            تحقق من الإجابة
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleNextQuestQuestion}
                            className="w-full min-h-[46px] py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-black text-sm cursor-pointer transition-all"
                          >
                            {questStepIndex + 1 < DAILY_CHALLENGE_QUESTIONS.length
                              ? 'السؤال التالي ⬅'
                              : 'عرض النتيجة النهائية 🏆'}
                          </button>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center space-y-4 py-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-[#0F172A]">
                    أحسنت يا {studentName}! 🎉
                  </h4>
                  <p className="text-xs text-[#64748B] font-bold">
                    أجبت بشكل صحيح عن {questSessionScore} من {DAILY_CHALLENGE_QUESTIONS.length}{' '}
                    أسئلة في تحدي اليوم.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-[#D97706] font-black text-sm">
                  <Trophy className="w-4 h-4" />
                  <span>رصيدك الحالي: {learningState.xp} XP</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuestModalOpen(false)}
                  className="w-full min-h-[46px] py-3 rounded-2xl bg-[#1E3A8A] text-white font-black text-sm cursor-pointer"
                >
                  العودة للرئيسية
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
