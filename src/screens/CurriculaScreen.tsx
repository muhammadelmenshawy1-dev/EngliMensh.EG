import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  GraduationCap,
  Play,
  Volume2,
  Bookmark,
  Check,
  ArrowRight,
  Award,
  FileText,
  Headphones,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { EducationalStage, UnitCurriculum } from '../types/curriculum.ts';
import { allCurriculaUnits } from '../data/masterCurriculumDatabase.ts';
import {
  loadLearningState,
  recordUnitModuleCompletion,
  setLastActiveUnit,
  calculateUnitPercentage,
  saveWordToBank,
  loadWordBank,
  updateStudentProfileMetadata,
  getUnitKey as buildCanonicalUnitKey,
  getLegacyUnitKey,
  LearningStoreState,
} from '../services/learningStore.ts';
import { speakText, stopSpeaking } from '../utils/speechService.ts';
import { registerBackNavigationHandler } from '../utils/navigationHistory.ts';

interface CurriculaScreenProps {
  currentStage: EducationalStage;
  currentGrade: number;
  onSelectStage: (stage: EducationalStage) => void;
  onSelectGrade: (grade: number) => void;
  onOpenUnit: (unit: UnitCurriculum) => void;
  onOpenExamsHub?: () => void;
  onStateUpdated?: () => void;
}

type LessonModuleTab = 'vocab' | 'grammar' | 'reading' | 'listening' | 'exam';

export const CurriculaScreen: React.FC<CurriculaScreenProps> = ({
  currentStage,
  currentGrade,
  onSelectStage,
  onSelectGrade,
  onOpenUnit,
  onOpenExamsHub,
  onStateUpdated,
}) => {
  const [learningState, setLearningState] = useState<LearningStoreState>(() =>
    loadLearningState()
  );
  const [savedWordsSet, setSavedWordsSet] = useState<Set<string>>(() => {
    const wb = loadWordBank();
    return new Set(wb.map((w) => w.english.toLowerCase()));
  });

  const [selectedStageTab, setSelectedStageTab] = useState<
    'Primary' | 'Preparatory' | 'Secondary'
  >(
    currentStage === 'Primary'
      ? 'Primary'
      : currentStage === 'Preparatory'
      ? 'Preparatory'
      : 'Secondary'
  );
  const [selectedSemester, setSelectedSemester] = useState<1 | 2 | 'all'>('all');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>('all');

  // In-screen Lesson View State
  const [activeLessonUnit, setActiveLessonUnit] = useState<UnitCurriculum | null>(null);
  const [activeModuleTab, setActiveModuleTab] = useState<LessonModuleTab>('vocab');
  const [lockedNoticeMessage, setLockedNoticeMessage] = useState<string>('');

  // Interactive Quiz State inside Lesson View
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setLearningState(loadLearningState());
  }, [currentStage, currentGrade]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Register Android/Browser Back navigation handler when an in-screen lesson is open
  useEffect(() => {
    if (!activeLessonUnit) return;
    const unregister = registerBackNavigationHandler('curricula-in-screen-lesson', () => {
      stopSpeaking();
      setActiveLessonUnit(null);
      return true;
    });
    return unregister;
  }, [activeLessonUnit]);

  const getGradesForStage = (stage: 'Primary' | 'Preparatory' | 'Secondary') => {
    if (stage === 'Primary') return [1, 2, 3, 4, 5, 6];
    if (stage === 'Preparatory') return [7, 8, 9];
    return [10, 11, 12];
  };

  const getStageLabelAr = (stage: 'Primary' | 'Preparatory' | 'Secondary') => {
    if (stage === 'Primary') return 'الابتدائي';
    if (stage === 'Preparatory') return 'المتوسط';
    return 'الثانوي';
  };

  const getStageIcon = (stage: 'Primary' | 'Preparatory' | 'Secondary') => {
    if (stage === 'Primary') return '🎒';
    if (stage === 'Preparatory') return '🏫';
    return '🎓';
  };

  const availableGrades = getGradesForStage(selectedStageTab);
  const activeGrade = availableGrades.includes(currentGrade)
    ? currentGrade
    : availableGrades[0];

  // Filter units for active grade, semester, and track
  const gradeUnits = allCurriculaUnits.filter((u) => u.grade === activeGrade);

  const availableTracks = Array.from(
    new Set(gradeUnits.map((u) => u.track).filter(Boolean))
  );

  const filteredUnits = gradeUnits.filter((u) => {
    if (selectedSemester !== 'all' && u.semester && u.semester !== selectedSemester) {
      return false;
    }
    if (
      selectedTrackFilter !== 'all' &&
      u.track &&
      u.track !== selectedTrackFilter
    ) {
      return false;
    }
    return true;
  });

  const activeUnits = filteredUnits.length > 0 ? filteredUnits : gradeUnits;

  const getUnitKey = (unit: UnitCurriculum): string => {
    return buildCanonicalUnitKey(
      unit.stage,
      unit.grade,
      unit.semester || 1,
      unit.unitNumber,
      unit.track
    );
  };

  const getLegacyOrCurrentUnitProgress = (unit: UnitCurriculum) => {
    const canonicalKey = getUnitKey(unit);
    const legacyFullKey = `${unit.stage}_${unit.grade}_${unit.unitNumber}_${unit.track || 'std'}_${unit.semester || 1}`;
    const simpleKey = getLegacyUnitKey(unit.stage, unit.grade, unit.unitNumber);
    return (
      learningState.unitProgress[canonicalKey] ||
      learningState.unitProgress[legacyFullKey] ||
      learningState.unitProgress[simpleKey]
    );
  };

  const handleOpenInScreenLesson = (
    unit: UnitCurriculum,
    initialTab: LessonModuleTab = 'vocab'
  ) => {
    const canonicalKey = getUnitKey(unit);
    const updated = setLastActiveUnit(canonicalKey);
    setLearningState(updated);
    setActiveLessonUnit(unit);
    setActiveModuleTab(initialTab);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setLockedNoticeMessage('');
    onStateUpdated?.();
  };

  const handleCompleteModule = (
    unit: UnitCurriculum,
    moduleType: LessonModuleTab,
    xpAmount = 20
  ) => {
    const canonicalKey = getUnitKey(unit);
    const updated = recordUnitModuleCompletion(canonicalKey, moduleType, xpAmount);
    setLearningState(updated);
    onStateUpdated?.();
  };

  const handleSaveVocabWord = (en: string, ar: string) => {
    saveWordToBank(en, ar);
    const wb = loadWordBank();
    setSavedWordsSet(new Set(wb.map((w) => w.english.toLowerCase())));
    onStateUpdated?.();
  };

  // Determine which unit on the trail is the current active milestone
  const firstIncompleteIdx = activeUnits.findIndex(
    (u) => calculateUnitPercentage(getLegacyOrCurrentUnitProgress(u)) < 100
  );
  const activeUnitIndex =
    firstIncompleteIdx === -1 ? Math.max(0, activeUnits.length - 1) : firstIncompleteIdx;

  // ============================================================================
  // IN-SCREEN INTERACTIVE LESSON VIEW (When a unit is selected)
  // ============================================================================
  if (activeLessonUnit) {
    const unitProg = getLegacyOrCurrentUnitProgress(activeLessonUnit);
    const unitPercent = calculateUnitPercentage(unitProg);
    const keyWords = activeLessonUnit.vocabularyModule?.keyWords || [];
    const grammarRules = activeLessonUnit.grammarModule?.detailedRules || [];
    const quizPool = [
      ...(activeLessonUnit.vocabularyModule?.exercises || []),
      ...(activeLessonUnit.grammarModule?.exercises || []),
      ...(activeLessonUnit.unitExam?.questions || []),
    ].slice(0, 6);

    return (
      <div
        className="space-y-4 pb-24 pt-2 px-3 sm:px-4 max-w-lg mx-auto text-[#0F172A]"
        dir="rtl"
      >
        {/* Top Back Navigation & Unit Progress Header */}
        <div className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                setActiveLessonUnit(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-black cursor-pointer transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>خريطة الوحدات</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenUnit(activeLessonUnit)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] border border-blue-200 text-xs font-black cursor-pointer transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>العارض المتقدم والبطاقات</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div>
              <span className="text-[11px] font-black text-[#D97706] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Unit {activeLessonUnit.unitNumber} · {activeLessonUnit.track || activeLessonUnit.stage}
              </span>
              <h2 className="text-base sm:text-lg font-black text-[#0F172A] mt-1">
                {activeLessonUnit.unitTitle}
              </h2>
              {activeLessonUnit.unitTitleAr && (
                <p className="text-xs text-[#64748B] font-bold">
                  {activeLessonUnit.unitTitleAr}
                </p>
              )}
            </div>

            <div className="text-center shrink-0 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-2xl">
              <span className="text-base font-black text-emerald-700 block">
                {unitPercent}%
              </span>
              <span className="text-[10px] font-bold text-emerald-600">مكتمل</span>
            </div>
          </div>

          {/* 5 Module Switcher Pills */}
          <div className="grid grid-cols-5 gap-1 pt-1">
            {[
              { id: 'vocab' as LessonModuleTab, label: 'المفردات', done: unitProg?.vocabCompleted },
              { id: 'grammar' as LessonModuleTab, label: 'القواعد', done: unitProg?.grammarCompleted },
              { id: 'reading' as LessonModuleTab, label: 'القراءة', done: unitProg?.readingCompleted },
              { id: 'listening' as LessonModuleTab, label: 'الاستماع', done: unitProg?.listeningCompleted },
              { id: 'exam' as LessonModuleTab, label: 'التدريب', done: unitProg?.examCompleted },
            ].map((mod) => {
              const isCurrent = activeModuleTab === mod.id;
              return (
                <button
                  key={`lesson_mod_tab_${mod.id}`}
                  type="button"
                  onClick={() => setActiveModuleTab(mod.id)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-black flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                      : mod.done
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-slate-50 text-[#64748B] border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{mod.label}</span>
                  {mod.done && (
                    <span
                      className={`text-[9px] ${
                        isCurrent ? 'text-amber-300' : 'text-emerald-600'
                      }`}
                    >
                      ✓ مكتمل
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MODULE 1: VOCABULARY */}
        {activeModuleTab === 'vocab' && (
          <div className="space-y-3">
            <div className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-[#0F172A]">
                  المفردات الأساسية (Key Vocabulary)
                </h3>
                <p className="text-xs text-[#64748B]">
                  استمع للنطق الصحيح واحفظ الكلمات المهمة في بنك كلماتك
                </p>
              </div>
              <span className="text-xs font-black text-[#1E3A8A] bg-blue-50 px-2.5 py-1 rounded-full">
                {keyWords.length} كلمة
              </span>
            </div>

            {keyWords.map((item, idx) => {
              const isSaved = savedWordsSet.has(item.word.toLowerCase());
              return (
                <div
                  key={`vocab_card_${activeLessonUnit.unitNumber}_${idx}`}
                  className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakText(item.word, 'en')}
                        className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] flex items-center justify-center cursor-pointer transition-colors"
                        title="استمع للنطق"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <span className="text-base font-black text-[#0F172A]" dir="ltr">
                          {item.word}
                        </span>
                        {item.partOfSpeech && (
                          <span className="mr-2 text-[10px] font-bold text-[#64748B] bg-slate-100 px-2 py-0.5 rounded-md">
                            {item.partOfSpeech}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleSaveVocabWord(
                          item.word,
                          item.meaningAr || item.ar || item.meaningEn || item.word
                        )
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer transition-all ${
                        isSaved
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 hover:bg-amber-100 text-[#D97706] border border-amber-200'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>محفوظة</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>+ بنك الكلمات</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm font-black text-[#1E3A8A]">{item.meaningAr}</p>
                  {item.exampleSentence && (
                    <p
                      className="text-xs text-[#64748B] bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                      dir="ltr"
                    >
                      "{item.exampleSentence}"
                    </p>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => {
                handleCompleteModule(activeLessonUnit, 'vocab', 20);
                setActiveModuleTab('grammar');
              }}
              className="w-full min-h-[48px] py-3 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0F2856] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
              <span>
                {unitProg?.vocabCompleted
                  ? 'تم إكمال المفردات — انتقل للقواعد ⬅'
                  : 'إتمام مراجعة المفردات (+20 XP) والانتقال للقواعد ⬅'}
              </span>
            </button>
          </div>
        )}

        {/* MODULE 2: GRAMMAR */}
        {activeModuleTab === 'grammar' && (
          <div className="space-y-3">
            <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#D97706] border border-amber-200 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5" />
                <span>قاعدة الوحدة الأساسية</span>
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">
                {activeLessonUnit.grammarModule?.ruleName || 'Grammar Focus'}
              </h3>
              {activeLessonUnit.grammarModule?.ruleNameAr && (
                <p className="text-xs font-bold text-[#1E3A8A]">
                  {activeLessonUnit.grammarModule.ruleNameAr}
                </p>
              )}
              <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                {activeLessonUnit.grammarModule?.explanationSummary}
              </p>
            </div>

            {grammarRules.map((rule, rIdx) => (
              <div
                key={`grammar_rule_${activeLessonUnit.unitNumber}_${rIdx}`}
                className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs space-y-2.5"
              >
                <h4 className="text-sm font-black text-[#1E3A8A]">{rule.title}</h4>
                <p className="text-xs text-[#0F172A] leading-relaxed">{rule.explanation}</p>
                {rule.examples && rule.examples.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {rule.examples.map((ex, exIdx) => (
                      <div
                        key={`gram_ex_${rIdx}_${exIdx}`}
                        className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-[#0F172A]"
                        dir="ltr"
                      >
                        <span>• {ex}</span>
                        <button
                          type="button"
                          onClick={() => speakText(ex, 'en')}
                          className="p-1.5 rounded-lg bg-blue-50 text-[#1E3A8A] hover:bg-blue-100 shrink-0 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                handleCompleteModule(activeLessonUnit, 'grammar', 20);
                setActiveModuleTab('reading');
              }}
              className="w-full min-h-[48px] py-3 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0F2856] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
              <span>
                {unitProg?.grammarCompleted
                  ? 'تم إكمال القواعد — انتقل للقراءة ⬅'
                  : 'إتمام درس القواعد (+20 XP) والانتقال للقراءة ⬅'}
              </span>
            </button>
          </div>
        )}

        {/* MODULE 3: READING */}
        {activeModuleTab === 'reading' && (
          <div className="space-y-3">
            <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#1E3A8A]" />
                  <h3 className="text-base font-black text-[#0F172A]">
                    {activeLessonUnit.readingModule?.passageTitle || 'نص القراءة للوحدة'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      activeLessonUnit.readingModule?.passage ||
                        activeLessonUnit.unitTitle,
                      'en'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#1E3A8A] text-xs font-black border border-blue-200 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>استمع للنص</span>
                </button>
              </div>

              <div
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-[#0F172A] leading-relaxed whitespace-pre-line font-medium"
                dir="ltr"
              >
                {activeLessonUnit.readingModule?.passage ||
                  `In Unit ${activeLessonUnit.unitNumber} (${activeLessonUnit.unitTitle}), students explore essential vocabulary and grammar structures in context.`}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                handleCompleteModule(activeLessonUnit, 'reading', 20);
                setActiveModuleTab('listening');
              }}
              className="w-full min-h-[48px] py-3 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0F2856] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
              <span>
                {unitProg?.readingCompleted
                  ? 'تم إكمال القراءة — انتقل للاستماع ⬅'
                  : 'إتمام درس القراءة (+20 XP) والانتقال للاستماع ⬅'}
              </span>
            </button>
          </div>
        )}

        {/* MODULE 4: LISTENING */}
        {activeModuleTab === 'listening' && (
          <div className="space-y-3">
            <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <h3 className="text-base font-black text-[#0F172A]">
                      {activeLessonUnit.listeningModule?.audioTitle || 'نص الاستماع والمحادثة'}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {activeLessonUnit.listeningModule?.speakerRoles || 'حوار تدريبي'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      activeLessonUnit.listeningModule?.transcript ||
                        activeLessonUnit.readingModule?.passage ||
                        activeLessonUnit.unitTitle,
                      'en'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-xs font-black shadow-xs cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>تشغيل الصوت</span>
                </button>
              </div>

              <div
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-[#0F172A] leading-relaxed whitespace-pre-line font-medium"
                dir="ltr"
              >
                {activeLessonUnit.listeningModule?.transcript ||
                  activeLessonUnit.readingModule?.passage ||
                  `Audio script for ${activeLessonUnit.unitTitle}. Press play above to listen to the native English pronunciation.`}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                handleCompleteModule(activeLessonUnit, 'listening', 20);
                setActiveModuleTab('exam');
              }}
              className="w-full min-h-[48px] py-3 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0F2856] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
              <span>
                {unitProg?.listeningCompleted
                  ? 'تم إكمال الاستماع — انتقل لتدريب الوحدة ⬅'
                  : 'إتمام درس الاستماع (+20 XP) والانتقال للتدريب ⬅'}
              </span>
            </button>
          </div>
        )}

        {/* MODULE 5: INTERACTIVE PRACTICE / UNIT EXAM */}
        {activeModuleTab === 'exam' && (
          <div className="space-y-3">
            <div className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#1E3A8A]" />
                <div>
                  <h3 className="text-sm font-black text-[#0F172A]">
                    تدريب وتقييم الوحدة {activeLessonUnit.unitNumber}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    أجب عن الأسئلة التالية لإتمام الوحدة بنسبة 100%
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                +30 XP
              </span>
            </div>

            {quizPool.length === 0 ? (
              <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] text-center space-y-3">
                <p className="text-xs text-[#64748B] font-bold">
                  أحسنت مراجعة دروس هذه الوحدة! اضغط أدناه لتسجيل إتمام تقييم الوحدة.
                </p>
                <button
                  type="button"
                  onClick={() => handleCompleteModule(activeLessonUnit, 'exam', 30)}
                  className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-black text-xs cursor-pointer"
                >
                  تأكيد إتمام الوحدة (+30 XP)
                </button>
              </div>
            ) : (
              <>
                {quizPool.map((q, qIdx) => {
                  const selected = quizAnswers[q.id];
                  const optionLabels: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
                  return (
                    <div
                      key={`unit_quiz_q_${q.id}_${qIdx}`}
                      className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2" dir="ltr">
                        <p className="text-sm font-black text-[#0F172A]">
                          {qIdx + 1}. {q.question}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" dir="ltr">
                        {q.options.map((optText, optIdx) => {
                          const optLabel = optionLabels[optIdx] || 'A';
                          const isChosen = selected === optLabel;
                          const isRight = optLabel === q.correctAnswer;
                          let style =
                            'bg-slate-50 border-slate-200 text-[#0F172A] hover:border-[#1E3A8A]';

                          if (quizSubmitted) {
                            if (isRight) {
                              style =
                                'bg-emerald-50 border-emerald-500 text-emerald-900 font-black';
                            } else if (isChosen) {
                              style = 'bg-red-50 border-red-400 text-red-900';
                            }
                          } else if (isChosen) {
                            style =
                              'bg-blue-50 border-[#1E3A8A] text-[#1E3A8A] ring-2 ring-[#1E3A8A]/20 font-black';
                          }

                          return (
                            <button
                              key={`uq_opt_${q.id}_${optLabel}`}
                              type="button"
                              disabled={quizSubmitted}
                              onClick={() =>
                                setQuizAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: optLabel,
                                }))
                              }
                              className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${style}`}
                            >
                              <span className="font-black mr-1.5">{optLabel})</span>
                              <span>{optText}</span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 font-semibold">
                          💡 {q.explanationAr || q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}

                {!quizSubmitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuizSubmitted(true);
                      handleCompleteModule(activeLessonUnit, 'exam', 30);
                    }}
                    className="w-full min-h-[48px] py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-black text-sm shadow-md cursor-pointer"
                  >
                    تصحيح الإجابات وحصد نقاط الوحدة (+30 XP) 🏆
                  </button>
                ) : (
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-center space-y-2">
                    <div className="text-sm font-black text-emerald-900">
                      🎉 تم تسجيل إتمام تقييم الوحدة بنجاح! نسبة إنجاز الوحدة الآن:{' '}
                      {calculateUnitPercentage(
                        getLegacyOrCurrentUnitProgress(activeLessonUnit)
                      )}
                      %
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveLessonUnit(null)}
                      className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-black cursor-pointer"
                    >
                      العودة إلى خريطة الوحدات
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // DEFAULT VIEW: CURRICULA MAP & STAGE/GRADE SELECTOR (Matches Screen 2 Mockup)
  // ============================================================================
  return (
    <div
      className="space-y-4 pb-24 pt-3 px-3 sm:px-4 max-w-lg mx-auto text-[#0F172A]"
      dir="rtl"
    >
      {/* 1. Stage & Grade Selection Header Card (Matches Screen 2 Mockup) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-0.5 text-right">
            <h1 className="text-lg sm:text-xl font-black text-[#0F172A]">
              رحلتك التعليمية - اختر صفك
            </h1>
            <p className="text-xs text-[#64748B] font-semibold">
              منهج وزارة التربية والتعليم المصرية (Connect · New Hello · Secondary)
            </p>
          </div>
          {onOpenExamsHub && (
            <button
              type="button"
              onClick={onOpenExamsHub}
              className="px-3 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-[#B45309] border border-amber-300 text-xs font-black shrink-0 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Award className="w-4 h-4 text-[#D97706]" />
              <span>بنك الامتحانات</span>
            </button>
          )}
        </div>

        {/* Stage Pills (الابتدائي | المتوسط | الثانوي) */}
        <div className="grid grid-cols-3 gap-2">
          {(['Primary', 'Preparatory', 'Secondary'] as const).map((stage) => {
            const isActive = selectedStageTab === stage;
            return (
              <button
                key={`curricula_stage_${stage}`}
                type="button"
                onClick={() => {
                  setSelectedStageTab(stage);
                  setSelectedTrackFilter('all');
                  onSelectStage(stage);
                  const newGrades = getGradesForStage(stage);
                  onSelectGrade(newGrades[0]);
                  updateStudentProfileMetadata({
                    preferredStage: stage,
                    preferredGrade: newGrades[0],
                  });
                }}
                className={`min-h-[44px] py-2 px-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md scale-[1.02]'
                    : 'bg-slate-50 text-[#0F172A] border-[#E2E8F0] hover:bg-slate-100'
                }`}
              >
                <span>{getStageIcon(stage)}</span>
                <span>{getStageLabelAr(stage)}</span>
              </button>
            );
          })}
        </div>

        {/* Grade Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {availableGrades.map((g) => {
            const isSelected = activeGrade === g;
            const displayGradeLabel =
              selectedStageTab === 'Primary'
                ? `الصف ${g} ابتدائي`
                : selectedStageTab === 'Preparatory'
                ? `الصف ${g - 6} إعدادي`
                : `الصف ${g - 9} ثانوي`;

            return (
              <button
                key={`curricula_grade_${g}`}
                type="button"
                onClick={() => {
                  onSelectGrade(g);
                  setSelectedTrackFilter('all');
                  updateStudentProfileMetadata({
                    preferredStage: selectedStageTab,
                    preferredGrade: g,
                  });
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white border-amber-400 shadow-xs'
                    : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                {displayGradeLabel}
              </button>
            );
          })}
        </div>

        {/* Track & Semester Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedTrackFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                selectedTrackFilter === 'all'
                  ? 'bg-[#1E3A8A]/10 text-[#1E3A8A] font-black'
                  : 'text-[#64748B] hover:bg-slate-100'
              }`}
            >
              كل المسارات ({gradeUnits.length})
            </button>
            {availableTracks.map((trk) => (
              <button
                key={`track_filter_${trk}`}
                type="button"
                onClick={() => setSelectedTrackFilter(trk)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap cursor-pointer ${
                  selectedTrackFilter === trk
                    ? 'bg-[#1E3A8A]/10 text-[#1E3A8A] font-black'
                    : 'text-[#64748B] hover:bg-slate-100'
                }`}
              >
                {trk}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
            {(
              [
                { id: 'all', label: 'الكل' },
                { id: 1, label: 'الترم 1' },
                { id: 2, label: 'الترم 2' },
              ] as const
            ).map((sem) => (
              <button
                key={`sem_btn_${sem.id}`}
                type="button"
                onClick={() => setSelectedSemester(sem.id)}
                className={`px-2 py-1 rounded-md text-[10px] font-black cursor-pointer ${
                  selectedSemester === sem.id
                    ? 'bg-white text-[#1E3A8A] shadow-2xs'
                    : 'text-[#64748B]'
                }`}
              >
                {sem.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prerequisite Notice Banner when a locked unit is tapped */}
      {lockedNoticeMessage && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold flex items-center justify-between gap-2">
          <span>🔒 {lockedNoticeMessage}</span>
          <button
            type="button"
            onClick={() => setLockedNoticeMessage('')}
            className="text-amber-700 font-black px-2 py-0.5 rounded-lg hover:bg-amber-100"
          >
            حسناً
          </button>
        </div>
      )}

      {/* 2. Vertical Duolingo-style Learning Path Trail (Matches Screen 2 Mockup) */}
      <div className="relative py-6 px-3 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col items-center space-y-7 overflow-hidden">
        {/* Background Vertical Trail Line */}
        <div className="absolute top-10 bottom-10 w-1.5 bg-gradient-to-b from-purple-400 via-[#F59E0B] to-slate-200 rounded-full" />

        {activeUnits.length === 0 ? (
          <div className="relative z-10 p-6 text-center space-y-2">
            <BookOpen className="w-8 h-8 text-[#1E3A8A] mx-auto" />
            <h3 className="text-sm font-black text-[#0F172A]">
              لا توجد وحدات مطابقة لهذا الفلتر
            </h3>
            <button
              type="button"
              onClick={() => {
                setSelectedSemester('all');
                setSelectedTrackFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white text-xs font-black cursor-pointer"
            >
              عرض جميع وحدات الصف
            </button>
          </div>
        ) : (
          activeUnits.map((unit, index) => {
            const unitProg = getLegacyOrCurrentUnitProgress(unit);
            const unitPercent = calculateUnitPercentage(unitProg);
            const isCompleted = unitPercent === 100;
            const isActive = index === activeUnitIndex;

            // Sequential unlocking: Unit 0 is always unlocked, or if previous unit has >= 20% progress, or if already started
            const prevUnit = index > 0 ? activeUnits[index - 1] : null;
            const prevPercent = prevUnit
              ? calculateUnitPercentage(getLegacyOrCurrentUnitProgress(prevUnit))
              : 100;
            const isUnlocked =
              index === 0 ||
              index <= activeUnitIndex ||
              prevPercent >= 20 ||
              unitPercent > 0;
            const isLocked = !isUnlocked;

            return (
              <div
                key={`curricula_unit_${unit.grade}_${unit.semester || 1}_${unit.track || 'std'}_${unit.unitNumber}_${index}`}
                className="relative z-10 w-full flex flex-col items-center gap-3"
              >
                {/* Trail Circular Milestone Node */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (isLocked && prevUnit) {
                        setLockedNoticeMessage(
                          `لفتح الوحدة ${unit.unitNumber} (${unit.unitTitle})، أكمل نشاطاً واحداً على الأقل في الوحدة ${prevUnit.unitNumber} أولاً!`
                        );
                        return;
                      }
                      handleOpenInScreenLesson(unit, 'vocab');
                    }}
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-md transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-200 text-white hover:scale-105'
                        : isActive
                        ? 'bg-gradient-to-tr from-purple-600 to-indigo-500 border-amber-300 text-white scale-110 ring-4 ring-amber-400/30'
                        : isUnlocked
                        ? 'bg-[#1E3A8A] border-blue-200 text-white hover:scale-105'
                        : 'bg-slate-200 border-slate-300 text-slate-500 hover:bg-slate-300'
                    }`}
                    title={`Unit ${unit.unitNumber}: ${unit.unitTitle}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    ) : isActive ? (
                      <Sparkles className="w-7 h-7 text-amber-300" />
                    ) : isUnlocked ? (
                      <BookOpen className="w-6 h-6 text-white" />
                    ) : (
                      <Lock className="w-6 h-6 text-slate-500" />
                    )}

                    <span
                      className={`absolute -bottom-5 text-[10px] font-black px-2 py-0.5 rounded-full border whitespace-nowrap ${
                        isActive
                          ? 'bg-[#F59E0B] text-white border-amber-300'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-white text-[#0F172A] border-slate-200'
                      }`}
                    >
                      Unit {unit.unitNumber} · {unitPercent}%
                    </span>
                  </button>
                </div>

                {/* Anchored Active Unit Royal Blue Banner Card (Matches Screen 2 Mockup Castle Card) */}
                {isActive && (
                  <div className="w-full max-w-sm mt-3 rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#172E6E] to-[#0F2856] border-2 border-[#F59E0B] shadow-xl p-4 sm:p-5 text-white space-y-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="inline-block text-[11px] font-black text-[#F59E0B] bg-white/10 px-2.5 py-0.5 rounded-full border border-[#F59E0B]/40">
                          الوحدة النشطة
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-white">
                          Unit {unit.unitNumber}: {unit.unitTitle}
                        </h3>
                        <p className="text-xs text-blue-200 font-semibold">
                          {unit.unitTitleAr || unit.grammarModule?.ruleName}
                        </p>
                      </div>

                      {/* Illustrated Castle / Milestone Emblem */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-sky-300/20 to-emerald-400/20 border border-white/20 flex items-center justify-center text-4xl shrink-0 shadow-inner">
                        🏰
                      </div>
                    </div>

                    {/* Real Unit Completion Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-black text-amber-300">
                        <span>نسبة إنجاز الوحدة</span>
                        <span>{unitPercent}%</span>
                      </div>
                      <div className="w-full bg-blue-950/90 rounded-full h-2.5 p-0.5 border border-blue-700">
                        <div
                          className="bg-gradient-to-r from-[#F59E0B] to-yellow-300 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(unitPercent, 6)}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Module Launch Pills */}
                    <div className="grid grid-cols-5 gap-1 pt-0.5">
                      {[
                        { id: 'vocab' as LessonModuleTab, label: 'كلمات', done: unitProg?.vocabCompleted },
                        { id: 'grammar' as LessonModuleTab, label: 'قواعد', done: unitProg?.grammarCompleted },
                        { id: 'reading' as LessonModuleTab, label: 'قراءة', done: unitProg?.readingCompleted },
                        { id: 'listening' as LessonModuleTab, label: 'استماع', done: unitProg?.listeningCompleted },
                        { id: 'exam' as LessonModuleTab, label: 'اختبار', done: unitProg?.examCompleted },
                      ].map((m) => (
                        <button
                          key={`active_card_mod_${unit.unitNumber}_${m.id}`}
                          type="button"
                          onClick={() => handleOpenInScreenLesson(unit, m.id)}
                          className={`py-1.5 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                            m.done
                              ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                          }`}
                        >
                          {m.done ? `✓ ${m.label}` : m.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenInScreenLesson(unit, 'vocab')}
                      className="w-full min-h-[44px] py-2.5 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-105 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>ابدأ أو أكمل دروس الوحدة الآن</span>
                    </button>
                  </div>
                )}

                {/* Compact Title Card for non-active units */}
                {!isActive && (
                  <button
                    type="button"
                    onClick={() => {
                      if (isLocked && prevUnit) {
                        setLockedNoticeMessage(
                          `لفتح الوحدة ${unit.unitNumber} (${unit.unitTitle})، أكمل نشاطاً واحداً على الأقل في الوحدة ${prevUnit.unitNumber} أولاً!`
                        );
                        return;
                      }
                      handleOpenInScreenLesson(unit, 'vocab');
                    }}
                    className={`mt-2 px-4 py-2 rounded-2xl border text-center transition-all cursor-pointer max-w-xs w-full ${
                      isLocked
                        ? 'bg-slate-50 border-slate-200 text-slate-500'
                        : 'bg-slate-50 hover:bg-blue-50/50 border-slate-200 text-[#0F172A]'
                    }`}
                  >
                    <div className="text-xs font-black truncate">
                      Unit {unit.unitNumber}: {unit.unitTitle}
                    </div>
                    <div className="text-[11px] text-[#64748B] truncate">
                      {unit.unitTitleAr || unit.grammarModule?.ruleName}
                    </div>
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
