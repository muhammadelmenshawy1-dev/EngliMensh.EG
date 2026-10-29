import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ChevronRight,
  ArrowLeft,
  Clock,
  Layers,
  FileText,
  Headphones,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Search,
  Flame,
  Bookmark
} from 'lucide-react';
import {
  EducationalStage,
  UnitCurriculum,
  GradeCurriculumCatalog,
  UnitExam,
  CurriculumQuestion,
  SecondaryTrackPath
} from '../types/curriculum.ts';
import {
  allStagesCurriculumCatalog,
  getGradeCatalog,
  getStageCatalog
} from '../data/masterCurriculumDatabase.ts';
import { StudentProfile } from '../types.ts';
import { CurriculumExamModal } from './CurriculumExamModal.tsx';
import { LessonViewerModal } from './LessonViewerModal.tsx';
import { PrimaryLessonViewer } from './PrimaryLessonViewer.tsx';
import { getPrimaryLesson, PrimaryLessonContent } from '../data/primaryStageData.ts';
import '../data/primaryCurriculumInjector.ts';

interface CurriculumExplorerProps {
  student: StudentProfile | null;
  initialStage?: EducationalStage;
  initialGrade?: number;
  initialPath?: SecondaryTrackPath;
  onNavigateTab?: (tab: 'home' | 'exams' | 'games') => void;
  onStudentUpdated?: (updated: StudentProfile) => void;
}

export const CurriculumExplorer: React.FC<CurriculumExplorerProps> = ({
  student,
  initialStage = 'Secondary',
  initialGrade = 10,
  initialPath = 'general_secondary',
  onNavigateTab,
  onStudentUpdated,
}) => {
  // Navigation filters
  const [selectedStage, setSelectedStage] = useState<EducationalStage>(initialStage);
  const [secondaryPath, setSecondaryPath] = useState<SecondaryTrackPath>(initialPath);
  const [selectedGrade, setSelectedGrade] = useState<number>(initialGrade);
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);
  const [selectedUnit, setSelectedUnit] = useState<UnitCurriculum | null>(null);

  // Active module tab inside a unit ('vocab' | 'grammar' | 'reading' | 'listening')
  const [activeModuleTab, setActiveModuleTab] = useState<'vocab' | 'grammar' | 'reading' | 'listening'>('vocab');

  // Interactive Quiz Answers state for in-module exercises
  const [exerciseAnswers, setExerciseAnswers] = useState<{ [qId: string]: 'A' | 'B' | 'C' | 'D' }>({});
  const [exerciseRevealed, setExerciseRevealed] = useState<{ [qId: string]: boolean }>({});

  // Active Exam Modal
  const [activeExamModal, setActiveExamModal] = useState<UnitExam | null>(null);

  // Dedicated Interactive Lesson Viewer Modal / Study Drawer
  const [lessonViewerUnit, setLessonViewerUnit] = useState<UnitCurriculum | null>(null);
  const [lessonViewerInitialTab, setLessonViewerInitialTab] = useState<'vocab' | 'grammar' | 'literature' | 'skills'>('vocab');

  // Primary Interactive Studio Lesson
  const [activePrimaryLesson, setActivePrimaryLesson] = useState<PrimaryLessonContent | null>(null);

  // Audio Speech state
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [isDialoguePlaying, setIsDialoguePlaying] = useState<boolean>(false);

  // Available grade catalogs for current stage & path
  const availableGrades = selectedStage === 'Secondary'
    ? getStageCatalog('Secondary', secondaryPath)
    : getStageCatalog(selectedStage);
  const currentCatalog = (selectedStage === 'Secondary'
    ? getGradeCatalog('Secondary', selectedGrade, secondaryPath)
    : getGradeCatalog(selectedStage, selectedGrade)) || availableGrades[0];
  const currentSemesterData = currentCatalog?.semesters.find(s => s.semester === selectedSemester);

  // If initialStage or initialGrade changes from outside
  useEffect(() => {
    setSelectedStage(initialStage);
    setSelectedGrade(initialGrade);
    if (initialPath) setSecondaryPath(initialPath);
  }, [initialStage, initialGrade, initialPath]);

  // Handle stage change
  const handleStageSelect = (stage: EducationalStage) => {
    setSelectedStage(stage);
    if (stage === 'Secondary') {
      setSelectedGrade(10);
    } else {
      const firstForStage = allStagesCurriculumCatalog.find(c => c.stage === stage);
      if (firstForStage) {
        setSelectedGrade(firstForStage.grade);
      }
    }
    setSelectedUnit(null);
  };

  // Text to Speech for words
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    setPlayingWord(text);
    utterance.onend = () => setPlayingWord(null);
    utterance.onerror = () => setPlayingWord(null);
    window.speechSynthesis.speak(utterance);
  };

  // Text to Speech for dialogue
  const handleToggleDialogueSpeech = (transcript: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isDialoguePlaying) {
      window.speechSynthesis.cancel();
      setIsDialoguePlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = 'en-GB';
    utterance.rate = 0.95;
    setIsDialoguePlaying(true);
    utterance.onend = () => setIsDialoguePlaying(false);
    utterance.onerror = () => setIsDialoguePlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleExerciseOptionClick = (qId: string, choice: 'A' | 'B' | 'C' | 'D') => {
    setExerciseAnswers(prev => ({ ...prev, [qId]: choice }));
    setExerciseRevealed(prev => ({ ...prev, [qId]: true }));
  };

  const optionLetters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  // Native Full-Page Lesson Experience (No modal, No backdrop)
  if (activePrimaryLesson) {
    return (
      <PrimaryLessonViewer
        lesson={activePrimaryLesson}
        onBack={() => setActivePrimaryLesson(null)}
        onClose={() => setActivePrimaryLesson(null)}
        onExamComplete={(score) => {
          if (student && onStudentUpdated) {
            onStudentUpdated({
              ...student,
              totalScore: (student.totalScore || 0) + score * 10
            });
          }
        }}
      />
    );
  }

  if (lessonViewerUnit) {
    return (
      <LessonViewerModal
        unit={lessonViewerUnit}
        isOpen={Boolean(lessonViewerUnit)}
        initialTab={lessonViewerInitialTab}
        onClose={() => setLessonViewerUnit(null)}
        onTakeExam={(exam) => {
          setLessonViewerUnit(null);
          setActiveExamModal(exam);
        }}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300 select-none" dir="ltr">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#0B397D] via-[#0957B7] to-[#0878E8] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-400/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-amber-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Egyptian Ministry of Education &amp; Egyptian Baccalaureate Standards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              EngliMensh Curriculum Explorer
            </h1>
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl">
              Explore calibrated English lessons across Primary, Preparatory, and Secondary stages. Study comprehensive vocabulary lexical sets, structural grammar guides, reading passages with HOTS questions, listening transcripts, and official 30-minute unit exams.
            </p>
          </div>

          {/* Quick Stats or Home link */}
          <div className="shrink-0 flex items-center gap-3">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('home')}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Stage Selection Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Stage 1: Primary */}
        <button
          onClick={() => handleStageSelect('Primary')}
          className={`py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            selectedStage === 'Primary'
              ? 'bg-[#0B397D] text-white shadow-md'
              : 'text-[#12366B] hover:bg-slate-50'
          }`}
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <div className="text-left">
            <div className="leading-tight">Primary Stage</div>
            <div className={`text-[11px] font-normal ${selectedStage === 'Primary' ? 'text-blue-200' : 'text-slate-400'}`}>
              المرحلة الابتدائية (Grades 1-6)
            </div>
          </div>
        </button>

        {/* Stage 2: Preparatory */}
        <button
          onClick={() => handleStageSelect('Preparatory')}
          className={`py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            selectedStage === 'Preparatory'
              ? 'bg-[#0B397D] text-white shadow-md'
              : 'text-[#12366B] hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <div className="text-left">
            <div className="leading-tight">Preparatory Stage</div>
            <div className={`text-[11px] font-normal ${selectedStage === 'Preparatory' ? 'text-blue-200' : 'text-slate-400'}`}>
              المرحلة الإعدادية (Prep 1-3)
            </div>
          </div>
        </button>

        {/* Stage 3: Secondary */}
        <button
          onClick={() => handleStageSelect('Secondary')}
          className={`py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            selectedStage === 'Secondary'
              ? 'bg-[#0B397D] text-white shadow-md'
              : 'text-[#12366B] hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <div className="text-left">
            <div className="leading-tight">Secondary &amp; Baccalaureate</div>
            <div className={`text-[11px] font-normal ${selectedStage === 'Secondary' ? 'text-blue-200' : 'text-slate-400'}`}>
              المرحلة الثانوية والبكالوريا (Sec 1-3)
            </div>
          </div>
        </button>
      </div>

      {/* Secondary Stage Dual Pathways Switcher (2026/2027) */}
      {selectedStage === 'Secondary' && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/80 border-2 border-blue-200/90 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B397D] text-[#FFC928] flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              26/27
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                  Egyptian MOE Syllabus
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Select Educational Track
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#0B397D] mt-0.5">
                {secondaryPath === 'general_secondary'
                  ? 'General Secondary Path (الثانوية العامة المصرية)'
                  : 'Egyptian Baccalaureate Path (البكالوريا المصرية)'}
              </h2>
            </div>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs w-full md:w-auto">
            <button
              onClick={() => {
                setSecondaryPath('general_secondary');
                setSelectedUnit(null);
              }}
              className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                secondaryPath === 'general_secondary'
                  ? 'bg-[#0B397D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>General Secondary (الثانوية العامة)</span>
            </button>

            <button
              onClick={() => {
                setSecondaryPath('egyptian_baccalaureate');
                setSelectedUnit(null);
              }}
              className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                secondaryPath === 'egyptian_baccalaureate'
                  ? 'bg-[#0878E8] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Egyptian Baccalaureate (البكالوريا المصرية)</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Grade & Semester Filters Bar */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Grade Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1">Grade:</span>
          {availableGrades.map(catalog => (
            <button
              key={`ce_grade_${catalog.grade}`}
              onClick={() => {
                setSelectedGrade(catalog.grade);
                setSelectedUnit(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === catalog.grade
                  ? 'bg-[#0878E8] text-white shadow-sm ring-2 ring-[#0878E8]/20'
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {catalog.gradeLabel.split(' - ')[0]}
            </button>
          ))}
        </div>

        {/* Semester Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1">Term:</span>
          <button
            onClick={() => {
              setSelectedSemester(1);
              setSelectedUnit(null);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedSemester === 1
                ? 'bg-[#FFC928] text-[#0B397D] shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            Term 1 (ترم أول)
          </button>
          <button
            onClick={() => {
              setSelectedSemester(2);
              setSelectedUnit(null);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedSemester === 2
                ? 'bg-[#FFC928] text-[#0B397D] shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            Term 2 (ترم ثانٍ)
          </button>
        </div>
      </div>

      {/* 4. MAIN VIEW: Either Unit Hub (if selected) or Units Catalog */}
      {selectedUnit ? (
        /* ==========================================================
           VIEW A: UNIT LEARNING HUB (Detailed Interactive Modules)
           ========================================================== */
        <div className="space-y-6">
          {/* Top Unit Banner & Back Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedUnit(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                title="Back to units list"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-xs font-bold text-[#0878E8] uppercase tracking-wider">
                  Unit {selectedUnit.unitNumber} • {selectedUnit.gradeLabel}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0B397D]">
                  {selectedUnit.unitTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">{selectedUnit.unitTitleAr}</p>
              </div>
            </div>

            {/* Launch Standalone Exam Button */}
            <button
              onClick={() => setActiveExamModal(selectedUnit.unitExam)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Take 30-Min Unit Exam</span>
            </button>
          </div>

          {/* Module Navigation Tabs */}
          <div className="bg-slate-100 p-1.5 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              onClick={() => setActiveModuleTab('vocab')}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeModuleTab === 'vocab'
                  ? 'bg-white text-[#0B397D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-4 h-4 text-[#0878E8]" />
              <span>Vocabulary</span>
            </button>

            <button
              onClick={() => setActiveModuleTab('grammar')}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeModuleTab === 'grammar'
                  ? 'bg-white text-[#0B397D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-[#0878E8]" />
              <span>Grammar</span>
            </button>

            <button
              onClick={() => setActiveModuleTab('reading')}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeModuleTab === 'reading'
                  ? 'bg-white text-[#0B397D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#0878E8]" />
              <span>Reading (HOTS)</span>
            </button>

            <button
              onClick={() => setActiveModuleTab('listening')}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeModuleTab === 'listening'
                  ? 'bg-white text-[#0B397D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Headphones className="w-4 h-4 text-[#0878E8]" />
              <span>Listening &amp; Audio</span>
            </button>
          </div>

          {/* ACTIVE MODULE CONTAINER */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100 space-y-8">
            
            {/* MODULE 1: VOCABULARY */}
            {activeModuleTab === 'vocab' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-black text-[#0B397D] flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-[#FFC928]" />
                    <span>Target Lexical Set &amp; Expressions</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Click the speaker icon to listen to native pronunciation.
                  </p>
                </div>

                {/* Vocabulary Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedUnit.vocabularyModule.keyWords.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-blue-300 transition-all shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-black text-[#0B397D]">{item.word}</h4>
                            <button
                              onClick={() => speakText(item.word)}
                              className={`p-1.5 rounded-full hover:bg-blue-100 text-[#0878E8] transition-colors cursor-pointer ${
                                playingWord === item.word ? 'bg-amber-100 text-amber-700 animate-bounce' : ''
                              }`}
                              title="Listen to pronunciation"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-400 italic">
                            {item.partOfSpeech}
                          </span>
                        </div>

                        <span className="text-base font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          {item.meaningAr}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {item.meaningEn}
                      </p>

                      {item.exampleSentence && (
                        <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700 italic">
                          "{item.exampleSentence}"
                        </div>
                      )}

                      {(item.collocation || item.synonym || item.antonym) && (
                        <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                          {item.collocation && (
                            <span className="bg-blue-50 text-[#0878E8] px-2 py-0.5 rounded-md font-semibold">
                              Collocation: {item.collocation}
                            </span>
                          )}
                          {item.synonym && (
                            <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-semibold">
                              Syn: {item.synonym}
                            </span>
                          )}
                          {item.antonym && (
                            <span className="bg-rose-50 text-rose-800 px-2 py-0.5 rounded-md font-semibold">
                              Ant: {item.antonym}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Collocations & Idioms */}
                {selectedUnit.vocabularyModule.collocations && selectedUnit.vocabularyModule.collocations.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-base font-bold text-[#0B397D]">Key Collocations &amp; Phrases</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedUnit.vocabularyModule.collocations.map((col, cIdx) => (
                        <div key={cIdx} className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span className="text-[#0878E8]">{col.phrase}</span>
                            <span className="text-slate-600">{col.meaningAr}</span>
                          </div>
                          <p className="text-slate-500 italic">"{col.example}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practice Questions for Vocabulary */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-base font-bold text-[#0B397D] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0878E8]" />
                    <span>Vocabulary Practice Drills</span>
                  </h4>

                  <div className="space-y-4">
                    {selectedUnit.vocabularyModule.exercises.map((q, qIdx) => {
                      const userChoice = exerciseAnswers[q.id];
                      const isRevealed = exerciseRevealed[q.id];
                      const isCorrect = userChoice === q.correctAnswer;

                      return (
                        <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm">
                          <div className="font-bold text-slate-900">
                            {qIdx + 1}. {q.question}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const letter = optionLetters[optIdx];
                              const isSelected = userChoice === letter;
                              const isAnswer = q.correctAnswer === letter;

                              let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                              if (isRevealed) {
                                if (isAnswer) {
                                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                                } else if (isSelected && !isAnswer) {
                                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleExerciseOptionClick(q.id, letter)}
                                  className={`p-2.5 rounded-lg border text-left font-medium transition-all cursor-pointer flex items-center gap-2 ${btnStyle}`}
                                >
                                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                                    {letter}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {isRevealed && (
                            <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                              isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                            }`}>
                              <span className="font-bold block mb-0.5">
                                {isCorrect ? '✓ Correct!' : `✗ Incorrect (Correct Answer: ${q.correctAnswer})`}
                              </span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 2: GRAMMAR */}
            {activeModuleTab === 'grammar' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0878E8] text-xs font-bold uppercase">
                      Grammar Focus
                    </span>
                    {selectedUnit.grammarModule.ruleNameAr && (
                      <span className="text-xs font-bold text-slate-500">
                        {selectedUnit.grammarModule.ruleNameAr}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-[#0B397D] mt-2">
                    {selectedUnit.grammarModule.ruleName}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {selectedUnit.grammarModule.explanationSummary}
                  </p>
                </div>

                {/* Detailed Rules */}
                <div className="space-y-4">
                  {selectedUnit.grammarModule.detailedRules.map((rule, rIdx) => (
                    <div key={rIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <h4 className="text-base font-bold text-[#0B397D] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-200 text-[#0B397D] text-xs font-black flex items-center justify-center">
                          {rIdx + 1}
                        </span>
                        <span>{rule.title}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {rule.explanation}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Examples:
                        </span>
                        {rule.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="bg-white p-2.5 rounded-xl border border-slate-200/60 text-xs sm:text-sm font-semibold text-slate-800">
                            • {ex}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Practice Questions for Grammar */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-base font-bold text-[#0B397D] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0878E8]" />
                    <span>Grammar Practice Drills</span>
                  </h4>

                  <div className="space-y-4">
                    {selectedUnit.grammarModule.exercises.map((q, qIdx) => {
                      const userChoice = exerciseAnswers[q.id];
                      const isRevealed = exerciseRevealed[q.id];
                      const isCorrect = userChoice === q.correctAnswer;

                      return (
                        <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm">
                          <div className="font-bold text-slate-900">
                            {qIdx + 1}. {q.question}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const letter = optionLetters[optIdx];
                              const isSelected = userChoice === letter;
                              const isAnswer = q.correctAnswer === letter;

                              let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                              if (isRevealed) {
                                if (isAnswer) {
                                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                                } else if (isSelected && !isAnswer) {
                                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleExerciseOptionClick(q.id, letter)}
                                  className={`p-2.5 rounded-lg border text-left font-medium transition-all cursor-pointer flex items-center gap-2 ${btnStyle}`}
                                >
                                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                                    {letter}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {isRevealed && (
                            <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                              isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                            }`}>
                              <span className="font-bold block mb-0.5">
                                {isCorrect ? '✓ Correct!' : `✗ Incorrect (Correct Answer: ${q.correctAnswer})`}
                              </span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 3: READING */}
            {activeModuleTab === 'reading' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                    Academic Reading Comprehension
                  </span>
                  <h3 className="text-2xl font-black text-[#0B397D] mt-2">
                    {selectedUnit.readingModule.passageTitle}
                  </h3>
                  {selectedUnit.readingModule.criticalThinkingFocus && (
                    <div className="mt-2 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0878E8] shrink-0" />
                      <span>Critical Thinking Focus: {selectedUnit.readingModule.criticalThinkingFocus}</span>
                    </div>
                  )}
                </div>

                {/* The Reading Text */}
                <div className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200/80 text-sm sm:text-base leading-relaxed text-slate-800 space-y-4 font-serif">
                  {selectedUnit.readingModule.passage.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* 5 Higher-Order Thinking (HOTS) Questions */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-[#0B397D] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#0878E8]" />
                      <span>5 Higher-Order Thinking (HOTS) Questions</span>
                    </h4>
                    <span className="text-xs text-slate-400">Aligned with MOE exam standards</span>
                  </div>

                  <div className="space-y-4">
                    {selectedUnit.readingModule.questions.map((q, qIdx) => {
                      const userChoice = exerciseAnswers[q.id];
                      const isRevealed = exerciseRevealed[q.id];
                      const isCorrect = userChoice === q.correctAnswer;

                      return (
                        <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm">
                          <div className="font-bold text-slate-900">
                            {qIdx + 1}. {q.question}
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const letter = optionLetters[optIdx];
                              const isSelected = userChoice === letter;
                              const isAnswer = q.correctAnswer === letter;

                              let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                              if (isRevealed) {
                                if (isAnswer) {
                                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                                } else if (isSelected && !isAnswer) {
                                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleExerciseOptionClick(q.id, letter)}
                                  className={`p-3 rounded-lg border text-left font-medium transition-all cursor-pointer flex items-center gap-3 ${btnStyle}`}
                                >
                                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                                    {letter}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {isRevealed && (
                            <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                              isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                            }`}>
                              <span className="font-bold block mb-0.5">
                                {isCorrect ? '✓ Correct!' : `✗ Incorrect (Correct Answer: ${q.correctAnswer})`}
                              </span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 4: LISTENING */}
            {activeModuleTab === 'listening' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                      Listening Comprehension
                    </span>
                    <h3 className="text-2xl font-black text-[#0B397D] mt-2">
                      {selectedUnit.listeningModule.audioTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Speakers: {selectedUnit.listeningModule.speakerRoles} • Approx: {selectedUnit.listeningModule.durationApprox}
                    </p>
                  </div>

                  {/* Audio Speech Player Button */}
                  <button
                    onClick={() => handleToggleDialogueSpeech(selectedUnit.listeningModule.transcript)}
                    className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      isDialoguePlaying
                        ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                        : 'bg-[#0878E8] hover:bg-[#0768c9] text-white'
                    }`}
                  >
                    {isDialoguePlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" /> Stop Audio
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" /> Play Dialogue Audio
                      </>
                    )}
                  </button>
                </div>

                {/* Dialogue Transcript Card */}
                <div className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200/80 space-y-3 font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <div className="font-bold text-[#0B397D] uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
                    Official Dialogue Transcript
                  </div>
                  {selectedUnit.listeningModule.transcript.split('\n').map((line, lIdx) => (
                    <p key={lIdx} className="p-1">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Listening Questions */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-base font-bold text-[#0B397D] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0878E8]" />
                    <span>Listening Evaluation Questions</span>
                  </h4>

                  <div className="space-y-4">
                    {(selectedUnit.listeningModule.questions || selectedUnit.listeningModule.exercises || []).map((q, qIdx) => {
                      const userChoice = exerciseAnswers[q.id];
                      const isRevealed = exerciseRevealed[q.id];
                      const isCorrect = userChoice === q.correctAnswer;

                      return (
                        <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm">
                          <div className="font-bold text-slate-900">
                            {qIdx + 1}. {q.question}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const letter = optionLetters[optIdx];
                              const isSelected = userChoice === letter;
                              const isAnswer = q.correctAnswer === letter;

                              let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                              if (isRevealed) {
                                if (isAnswer) {
                                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                                } else if (isSelected && !isAnswer) {
                                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleExerciseOptionClick(q.id, letter)}
                                  className={`p-2.5 rounded-lg border text-left font-medium transition-all cursor-pointer flex items-center gap-2 ${btnStyle}`}
                                >
                                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                                    {letter}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {isRevealed && (
                            <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                              isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                            }`}>
                              <span className="font-bold block mb-0.5">
                                {isCorrect ? '✓ Correct!' : `✗ Incorrect (Correct Answer: ${q.correctAnswer})`}
                              </span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ==========================================================
           VIEW B: UNITS CATALOG (Grid of Units & Revision Assessments)
           ========================================================== */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B397D]">
                {currentCatalog?.gradeLabel} • Term {selectedSemester}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {currentCatalog?.description}
              </p>
            </div>
            
            <span className="hidden sm:inline-block text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
              Track: {currentCatalog?.track}
            </span>
          </div>

          {/* Units Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentSemesterData?.units.map(unit => (
              <div
                key={unit.unitNumber}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-[#0878E8]/50 p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0878E8] text-xs font-black">
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Term {unit.semester}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#0B397D] group-hover:text-[#0878E8] transition-colors">
                      {unit.unitTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{unit.unitTitleAr}</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    <strong className="text-slate-800">Theme:</strong> {unit.theme}
                  </p>

                  <div
                    onClick={() => {
                      setLessonViewerUnit(unit);
                      setLessonViewerInitialTab('grammar');
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 hover:border-blue-200 text-xs text-slate-700 cursor-pointer transition-all group/g"
                    title="Click to view Grammar Masterclass & Exam Traps"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-[#0B397D] block mb-0.5">Grammar Rule:</strong>
                      <span className="text-[10px] text-amber-800 font-bold bg-amber-100/80 px-2 py-0.5 rounded-md">
                        Exam Traps ⚠️
                      </span>
                    </div>
                    <span className="group-hover/g:text-[#0878E8] transition-colors font-medium">
                      {unit.grammarModule.ruleName}
                    </span>
                  </div>

                  {unit.literatureModule && (
                    <div
                      onClick={() => {
                        setLessonViewerUnit(unit);
                        setLessonViewerInitialTab('literature');
                      }}
                      className="p-2.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200/80 text-xs text-amber-950 cursor-pointer transition-all flex items-center justify-between group/lit"
                      title="Click to view Prescribed Literature & HOTS Analysis"
                    >
                      <div className="flex items-center gap-1.5 font-bold truncate">
                        <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate group-hover/lit:text-[#0B397D] transition-colors">{unit.literatureModule.workTitle}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200/90 px-2 py-0.5 rounded shrink-0">
                        Novel / HOTS
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary Dedicated Studio Pill if Primary */}
                {unit.stage === 'Primary' && (
                  <button
                    type="button"
                    onClick={() => {
                      const priLesson = getPrimaryLesson(`primary_${unit.grade}`, unit.unitNumber, 'connect', unit.semester);
                      if (priLesson) {
                        setActivePrimaryLesson(priLesson);
                      } else {
                        setLessonViewerUnit(unit);
                        setLessonViewerInitialTab('vocab');
                      }
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-[11px] shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <span>✨ Connect 3-Tab Studio &amp; 5-Level Adaptive Exam</span>
                  </button>
                )}

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (unit.stage === 'Primary') {
                        const priLesson = getPrimaryLesson(`primary_${unit.grade}`, unit.unitNumber, 'connect', unit.semester);
                        if (priLesson) {
                          setActivePrimaryLesson(priLesson);
                          return;
                        }
                      }
                      setLessonViewerUnit(unit);
                      setLessonViewerInitialTab('vocab');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0B397D]/10 hover:bg-[#0B397D]/20 text-[#0B397D] font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    title="Open Interactive Lesson Study Drawer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0878E8]" />
                    <span>Explore Lessons / المفردات والقواعد</span>
                  </button>

                  <button
                    onClick={() => setActiveExamModal(unit.unitExam)}
                    className="py-2 px-3 rounded-xl bg-[#0878E8] hover:bg-[#0768c9] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                    title="Take 30-Min Standalone Unit Exam"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>Exam</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comprehensive Revision Exam Card (if present) */}
          {currentSemesterData?.revisionExam && (
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase text-amber-100 tracking-wider">
                  Official Ministry Benchmark
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {currentSemesterData.revisionTitle || 'Comprehensive Term Assessment'}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                  Test your mastery across all units in Term {selectedSemester}. 16 balanced multi-skill questions with 45-minute timing, detailed score calculation, and certification.
                </p>
              </div>

              <button
                onClick={() => setActiveExamModal(currentSemesterData.revisionExam!)}
                className="px-6 py-3 rounded-full bg-white text-[#0B397D] hover:bg-amber-50 font-black text-sm shadow-xl transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Award className="w-4 h-4 text-amber-500 fill-current" />
                <span>Launch Final Assessment</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 6. Exam Modal */}
      {activeExamModal && (
        <CurriculumExamModal
          exam={activeExamModal}
          student={student}
          track={selectedStage === 'Secondary' ? secondaryPath : 'general_secondary'}
          grade={selectedGrade}
          unitCurriculum={
            selectedUnit ||
            currentSemesterData?.units?.find(u => u.unitExam?.examId === activeExamModal.examId) ||
            null
          }
          onClose={() => setActiveExamModal(null)}
          onStudentUpdated={onStudentUpdated}
        />
      )}
    </div>
  );
};
