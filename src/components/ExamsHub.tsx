import React, { useState, useMemo } from 'react';
import {
  BookOpen, Award, CheckCircle2, Lock, Unlock, Clock,
  Sparkles, ChevronRight, Printer, ArrowLeft, ArrowRight,
  ShieldCheck, GraduationCap, Flame, Volume2, Building2,
  Calendar, FileText, UserCheck, Star, Zap, Check, HelpCircle,
  Layers, Compass, ExternalLink, Bookmark, AlertCircle
} from 'lucide-react';
import { Exam, ExamLevel, StudentProfile, StudentProgress } from '../types.ts';
import { EducationalStage, SecondaryTrackPath, UnitCurriculum, UnitExam } from '../types/curriculum.ts';
import {
  PrimaryLessonContent,
  getPrimaryLesson,
  primaryCurriculumDatabase
} from '../data/primaryStageData.ts';
import {
  PrepLessonContent,
  getPrepLessonsByGrade,
  prepCurriculumDatabase
} from '../data/prepStageData.ts';
import { injectedPrimaryCurriculumDatabase } from '../data/primaryCurriculumInjector.ts';
import {
  allStagesCurriculumCatalog,
  getGradeCatalog,
  getStageCatalog
} from '../data/masterCurriculumDatabase.ts';
import { PrimaryLessonViewer } from './PrimaryLessonViewer.tsx';
import { CurriculumExamModal } from './CurriculumExamModal.tsx';
import { LessonViewerModal } from './LessonViewerModal.tsx';
import { HeroCover } from './HeroCover.tsx';
import { getBaccalaureateExamsByGrade } from '../data/baccalaureateExams.ts';

interface ExamsHubProps {
  student: StudentProfile | null;
  onStartExam: (exam: Exam) => void;
  onPrintExam: (exam: Exam) => void;
  onOpenRegistration: () => void;
  onOpenLesson: (unit: UnitCurriculum) => void;
  onStudentUpdated?: (updated: StudentProfile) => void;

  // Secondary State passed from parent or self-managed
  examSecondaryPath: 'general' | 'baccalaureate';
  onSelectExamPath: (path: 'general' | 'baccalaureate') => void;
  examGrade: number;
  onSelectExamGrade: (grade: number) => void;
  activeExamUnits: any[];
  currentUnit: any;
  selectedUnitId: number;
  onSelectUnitId: (unitId: number) => void;
  progress: StudentProgress;
  examsHeaderMeta: {
    badge: string;
    title: string;
    description: string;
    trackLabel: string;
    literatureNovel: string;
  };
  secondaryActiveTab: 'levels' | 'governmental' | 'term1' | 'term2';
  onChangeSecondaryTab: (tab: 'levels' | 'governmental' | 'term1' | 'term2') => void;
  governmentalExams: Exam[];
  term1RevisionExams: Exam[];
  term2RevisionExams: Exam[];
}

export const ExamsHub: React.FC<ExamsHubProps> = ({
  student,
  onStartExam,
  onPrintExam,
  onOpenRegistration,
  onOpenLesson,
  onStudentUpdated,
  examSecondaryPath,
  onSelectExamPath,
  examGrade,
  onSelectExamGrade,
  activeExamUnits,
  currentUnit,
  selectedUnitId,
  onSelectUnitId,
  progress,
  examsHeaderMeta,
  secondaryActiveTab,
  onChangeSecondaryTab,
  governmentalExams,
  term1RevisionExams,
  term2RevisionExams
}) => {
  // Master Stage Selector ('Primary' | 'Preparatory' | 'Secondary')
  const [selectedStage, setSelectedStage] = useState<EducationalStage>('Secondary');

  // Primary Stage Controls
  const [primaryGrade, setPrimaryGrade] = useState<1 | 2 | 3 | 4 | 5 | 6>(4);
  const [primaryTerm, setPrimaryTerm] = useState<1 | 2>(1);
  const [primaryTrack, setPrimaryTrack] = useState<'connect' | 'connect_plus'>('connect');
  const [activePrimaryLesson, setActivePrimaryLesson] = useState<PrimaryLessonContent | null>(null);

  // Preparatory Stage Controls
  const [prepGrade, setPrepGrade] = useState<7 | 8 | 9>(7);
  const [prepTerm, setPrepTerm] = useState<1 | 2>(1);
  const [activePrepModalExam, setActivePrepModalExam] = useState<UnitExam | null>(null);
  const [activePrepModalUnit, setActivePrepModalUnit] = useState<UnitCurriculum | null>(null);
  const [activePrepStudyLesson, setActivePrepStudyLesson] = useState<PrepLessonContent | null>(null);
  const [active5LevelPrepSuite, setActive5LevelPrepSuite] = useState<PrepLessonContent | null>(null);
  const [prepSuiteActiveLevel, setPrepSuiteActiveLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [prepSuiteAnswers, setPrepSuiteAnswers] = useState<Record<string, string>>({});
  const [prepSuiteRevealed, setPrepSuiteRevealed] = useState<Record<string, boolean>>({});

  // Query Primary Units
  const primaryLessonsForGradeAndTerm = useMemo(() => {
    const gradeKey = `primary_${primaryGrade}`;
    // Combine from injected and master
    const all = [...primaryCurriculumDatabase, ...injectedPrimaryCurriculumDatabase];
    const map = new Map<string, PrimaryLessonContent>();
    all.forEach(l => {
      if (l.grade === gradeKey && l.term === primaryTerm && l.track === primaryTrack) {
        map.set(l.unitId, l);
      }
    });
    const result = Array.from(map.values()).sort((a, b) => a.unitNumber - b.unitNumber);

    // If none found for specific track/term, fallback to connect
    if (result.length === 0) {
      all.forEach(l => {
        if (l.grade === gradeKey && l.term === primaryTerm) {
          map.set(l.unitId, l);
        }
      });
      return Array.from(map.values()).sort((a, b) => a.unitNumber - b.unitNumber);
    }
    return result;
  }, [primaryGrade, primaryTerm, primaryTrack]);

  // Query Prep Units
  const prepLessonsForGradeAndTerm = useMemo(() => {
    const gradeKey = prepGrade === 7 ? 'prep_1' : prepGrade === 8 ? 'prep_2' : 'prep_3';
    return prepCurriculumDatabase
      .filter(l => l.grade === gradeKey && l.term === prepTerm)
      .sort((a, b) => a.unitNumber - b.unitNumber);
  }, [prepGrade, prepTerm]);

  // Handle Level completion in Primary
  const handlePrimaryExamFinished = (score: number, totalMarks: number) => {
    if (student && onStudentUpdated) {
      const earned = Math.round((score / (totalMarks || 1)) * 50);
      onStudentUpdated({
        ...student,
        totalScore: (student.totalScore || 0) + earned
      });
    }
  };

  // Grade labels map
  const primaryGradesList = [
    { grade: 1, labelEn: 'Primary 1', labelAr: 'الصف الأول الابتدائي' },
    { grade: 2, labelEn: 'Primary 2', labelAr: 'الصف الثاني الابتدائي' },
    { grade: 3, labelEn: 'Primary 3', labelAr: 'الصف الثالث الابتدائي' },
    { grade: 4, labelEn: 'Primary 4', labelAr: 'الصف الرابع الابتدائي' },
    { grade: 5, labelEn: 'Primary 5', labelAr: 'الصف الخامس الابتدائي' },
    { grade: 6, labelEn: 'Primary 6', labelAr: 'الصف السادس الابتدائي' }
  ];

  const prepGradesList = [
    { grade: 7, labelEn: 'Prep 1', labelAr: 'الصف الأول الإعدادي' },
    { grade: 8, labelEn: 'Prep 2', labelAr: 'الصف الثاني الإعدادي' },
    { grade: 9, labelEn: 'Prep 3', labelAr: 'الصف الثالث الإعدادي' }
  ];

  // Native Full-Page Lesson Experience (No modal, No backdrop)
  if (activePrimaryLesson) {
    return (
      <PrimaryLessonViewer
        lesson={activePrimaryLesson}
        onBack={() => setActivePrimaryLesson(null)}
        onClose={() => setActivePrimaryLesson(null)}
        onExamComplete={(score, totalMarks) => {
          handlePrimaryExamFinished(score, totalMarks);
        }}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <HeroCover />

      {/* Active Student Status Strip */}
      {student && (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl px-5 py-3 flex items-center justify-between gap-4 text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-emerald-950">
              Student: <strong className="font-bold text-slate-900">{student.name}</strong> · School: <strong className="font-bold text-slate-900">{student.school}</strong> ({student.group})
            </span>
          </div>
          <button
            onClick={onOpenRegistration}
            className="text-blue-900 hover:underline font-semibold text-xs whitespace-nowrap cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* =========================================================================
          MASTER STAGE SWITCHER: Primary (1-6) | Prep (1-3) | Secondary (1-3)
          ========================================================================= */}
      <div className="bg-white rounded-3xl p-3 shadow-md border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Stage 1: Primary */}
        <button
          onClick={() => setSelectedStage('Primary')}
          className={`py-3.5 px-4 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-3 ${
            selectedStage === 'Primary'
              ? 'bg-[#0B397D] text-white shadow-lg ring-2 ring-[#FFC928]'
              : 'text-[#12366B] hover:bg-slate-100/80 border border-slate-100'
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="leading-tight text-sm">Primary Stage</div>
            <div className={`text-[11px] font-medium ${selectedStage === 'Primary' ? 'text-blue-200' : 'text-slate-500'}`}>
              المرحلة الابتدائية (Connect 1-6)
            </div>
          </div>
        </button>

        {/* Stage 2: Preparatory */}
        <button
          onClick={() => setSelectedStage('Preparatory')}
          className={`py-3.5 px-4 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-3 ${
            selectedStage === 'Preparatory'
              ? 'bg-[#0B397D] text-white shadow-lg ring-2 ring-[#FFC928]'
              : 'text-[#12366B] hover:bg-slate-100/80 border border-slate-100'
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-blue-400/20 text-blue-300 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="leading-tight text-sm">Preparatory Stage</div>
            <div className={`text-[11px] font-medium ${selectedStage === 'Preparatory' ? 'text-blue-200' : 'text-slate-500'}`}>
              المرحلة الإعدادية (New Hello Prep 1-3)
            </div>
          </div>
        </button>

        {/* Stage 3: Secondary */}
        <button
          onClick={() => setSelectedStage('Secondary')}
          className={`py-3.5 px-4 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-3 ${
            selectedStage === 'Secondary'
              ? 'bg-[#0B397D] text-white shadow-lg ring-2 ring-[#FFC928]'
              : 'text-[#12366B] hover:bg-slate-100/80 border border-slate-100'
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="leading-tight text-sm">Secondary &amp; Baccalaureate</div>
            <div className={`text-[11px] font-medium ${selectedStage === 'Secondary' ? 'text-blue-200' : 'text-slate-500'}`}>
              الثانوية العامة والبكالوريا (Sec 1-3)
            </div>
          </div>
        </button>
      </div>

      {/* =========================================================================
          VIEW A: PRIMARY STAGE EXAMS (GRADES 1 - 6)
          ========================================================================= */}
      {selectedStage === 'Primary' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Stage Hero Banner */}
          <div className="bg-gradient-to-r from-[#0B397D] via-[#0957B7] to-[#0878E8] text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
            <div className="max-w-3xl space-y-3 relative z-10">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Egyptian MOE Primary Curriculum · Connect &amp; Connect Plus</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                Connect Primary 5-Level Adaptive Assessment Engine
              </h2>
              <p className="text-xs md:text-sm text-blue-100 leading-relaxed">
                Calibrated phonics drills, visual vocabulary banks, functional everyday dialogues, and progressive Level 1 to Level 5 adaptive exams designed for young Egyptian primary learners.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-amber-200 pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Ministry Phonics Framework</span>
                <span className="flex items-center gap-1.5"><Volume2 className="w-4 h-4 text-amber-300" /> Native Pronunciation Audio</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-cyan-300" /> Automated Score &amp; Badges</span>
              </div>
            </div>
          </div>

          {/* Primary Filters: Grade, Term & Track */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Grade Selector */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase mr-1">Grade:</span>
                {primaryGradesList.map(g => (
                  <button
                    key={`eh_pgrade_${g.grade}`}
                    onClick={() => setPrimaryGrade(g.grade as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      primaryGrade === g.grade
                        ? 'bg-[#0B397D] text-white shadow-xs ring-2 ring-[#FFC928]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span>{g.labelEn}</span>
                    <span className="text-[10px] ml-1 opacity-80">({g.labelAr.split(' ')[1]})</span>
                  </button>
                ))}
              </div>

              {/* Term & Track */}
              <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setPrimaryTerm(1)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      primaryTerm === 1 ? 'bg-[#FFC928] text-[#0B397D] shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Term 1 (ترم 1)
                  </button>
                  <button
                    onClick={() => setPrimaryTerm(2)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      primaryTerm === 2 ? 'bg-[#FFC928] text-[#0B397D] shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Term 2 (ترم 2)
                  </button>
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setPrimaryTrack('connect')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      primaryTrack === 'connect' ? 'bg-[#0878E8] text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Connect
                  </button>
                  <button
                    onClick={() => setPrimaryTrack('connect_plus')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      primaryTrack === 'connect_plus' ? 'bg-[#0878E8] text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Connect Plus
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Units Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {primaryLessonsForGradeAndTerm.map(lesson => (
              <div
                key={lesson.unitId}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-blue-400 transition-all p-5 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0B397D] text-xs font-black uppercase tracking-wider border border-blue-200">
                      Unit {lesson.unitNumber} · Connect {primaryGrade}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Term {lesson.term}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-900">
                      {lesson.unitTitleEn}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium" dir="rtl">
                      {lesson.unitTitleAr}
                    </p>
                  </div>

                  {/* Highlights / Badges */}
                  <div className="space-y-2 text-xs">
                    {lesson.tab1_Vocabulary.phonics && lesson.tab1_Vocabulary.phonics.length > 0 && (
                      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-2.5 flex items-center gap-2 text-amber-900">
                        <Volume2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <strong className="font-bold">Phonics:</strong> {lesson.tab1_Vocabulary.phonics[0].letterSound}
                        </div>
                      </div>
                    )}

                    {lesson.tab2_Grammar.rules[0] && (
                      <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-2.5 flex items-center gap-2 text-blue-950">
                        <Bookmark className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="truncate">
                          <strong className="font-bold">Grammar:</strong> {lesson.tab2_Grammar.rules[0].title}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 5 Levels Pill Indicator */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] flex items-center justify-between text-slate-600">
                    <span className="font-bold text-[#0B397D]">5-Level Suite:</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-slate-700">
                      <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-900 flex items-center justify-center">L1</span>
                      <span className="w-5 h-5 rounded-md bg-cyan-100 text-cyan-900 flex items-center justify-center">L2</span>
                      <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-900 flex items-center justify-center">L3</span>
                      <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-900 flex items-center justify-center">L4</span>
                      <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center">L5</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setActivePrimaryLesson(lesson)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0B397D] to-[#0878E8] text-white hover:from-[#0957B7] hover:to-[#0768c9] font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-amber-300" />
                    <span>Launch 5-Level Adaptive Exam</span>
                  </button>

                  <button
                    onClick={() => setActivePrimaryLesson(lesson)}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Study 3-Tab Lesson Studio"
                  >
                    <BookOpen className="w-4 h-4 text-blue-800" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW B: PREPARATORY STAGE EXAMS (PREP 1 - 3, NEW HELLO)
          ========================================================================= */}
      {selectedStage === 'Preparatory' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Prep Stage Hero Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-[#0B397D] to-[#0957B7] text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
            <div className="max-w-3xl space-y-3 relative z-10">
              <div className="text-xs uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                <span>Egyptian MOE Official Specifications · New Hello Prep 1, 2, 3</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                Preparatory Stage Adaptive Exam Suite &amp; MOE Blueprints
              </h2>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                Standardized 30-mark official preparatory examination papers featuring Dialogue completion (5 marks), Reading comprehension passage (6 marks), Vocabulary &amp; Grammar MCQs (6 marks), Error correction rewrites (5 marks), and Guided paragraph writing (8 marks).
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-blue-200 pt-1">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 5-Part Authentic MOE Blueprint</span>
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-300" /> Level 1 Foundation to Level 5 HOTS</span>
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-cyan-300" /> Decent Life &amp; Authentic Reading Passages</span>
              </div>
            </div>
          </div>

          {/* Prep Grade & Term Switcher */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase mr-1">Grade Level:</span>
              {prepGradesList.map(g => (
                <button
                  key={g.grade}
                  onClick={() => setPrepGrade(g.grade as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                    prepGrade === g.grade
                      ? 'bg-[#0B397D] text-white shadow-xs ring-2 ring-[#FFC928]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>{g.labelEn}</span>
                  <span className="text-[11px] opacity-80">({g.labelAr})</span>
                </button>
              ))}
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-end md:self-auto">
              <button
                onClick={() => setPrepTerm(1)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  prepTerm === 1 ? 'bg-[#FFC928] text-[#0B397D] shadow-xs' : 'text-slate-600'
                }`}
              >
                Term 1 (ترم أول)
              </button>
              <button
                onClick={() => setPrepTerm(2)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  prepTerm === 2 ? 'bg-[#FFC928] text-[#0B397D] shadow-xs' : 'text-slate-600'
                }`}
              >
                Term 2 (ترم ثانٍ)
              </button>
            </div>
          </div>

          {/* Prep Units & Exam Suites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {prepLessonsForGradeAndTerm.map(lesson => (
              <div
                key={lesson.unitId}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-blue-400 transition-all p-5 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0B397D] text-xs font-black uppercase tracking-wider border border-blue-200">
                      Unit {lesson.unitNumber} · New Hello {lesson.gradeNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Term {lesson.term}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-900">
                      {lesson.unitTitleEn}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium" dir="rtl">
                      {lesson.unitTitleAr}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {lesson.theme}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-slate-700">
                      <div className="font-bold text-[#0B397D]">Grammar Core:</div>
                      <div className="text-[11px] text-slate-600 truncate mt-0.5">
                        {lesson.tab2_Grammar.rules[0]?.title || 'Grammar Rule & Sentence Building'}
                      </div>
                    </div>

                    <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200/80 text-amber-950 flex items-center justify-between text-[11px]">
                      <span>Reading: {lesson.tab3_Skills.readingPassage.title}</span>
                      <span className="font-bold text-amber-700">30 Marks</span>
                    </div>
                  </div>

                  {/* 5-Level Adaptive Breakdown Pills */}
                  <div className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-100 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-blue-900">
                      <span>5-Level Adaptive Suite:</span>
                      <span className="text-xs text-emerald-700">MOE Calibrated</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-[10px] text-center font-bold">
                      <div className="p-1 rounded-md bg-white border border-blue-200 text-blue-800">L1 Base</div>
                      <div className="p-1 rounded-md bg-white border border-blue-200 text-blue-800">L2 Context</div>
                      <div className="p-1 rounded-md bg-white border border-blue-200 text-blue-800">L3 Syntax</div>
                      <div className="p-1 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-900">L4 Mock</div>
                      <div className="p-1 rounded-md bg-amber-100 border border-amber-300 text-amber-900">L5 HOTS</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        // Find matching unit in master curriculum catalog for full exam modal
                        const masterUnit = getGradeCatalog('Preparatory', prepGrade)?.semesters
                          .find(s => s.semester === prepTerm)?.units
                          .find(u => u.unitNumber === lesson.unitNumber);

                        if (masterUnit) {
                          setActivePrepModalExam(masterUnit.unitExam);
                          setActivePrepModalUnit(masterUnit);
                        } else {
                          // Fallback to 5-level runner
                          setActive5LevelPrepSuite(lesson);
                          setPrepSuiteActiveLevel(4);
                        }
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-amber-300" />
                      <span>Launch MOE Mock (30 Min)</span>
                    </button>

                    <button
                      onClick={() => {
                        setActive5LevelPrepSuite(lesson);
                        setPrepSuiteActiveLevel(1);
                      }}
                      className="px-3 py-2.5 rounded-xl bg-blue-50 text-[#0B397D] hover:bg-blue-100 font-bold text-xs transition-colors border border-blue-200 cursor-pointer"
                      title="Take 5-Level Adaptive Exam Suite"
                    >
                      5-Levels
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const masterUnit = getGradeCatalog('Preparatory', prepGrade)?.semesters
                        .find(s => s.semester === prepTerm)?.units
                        .find(u => u.unitNumber === lesson.unitNumber);
                      if (masterUnit) {
                        onOpenLesson(masterUnit);
                      }
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0878E8]" />
                    <span>Study 3-Tab Lesson (Vocab, Grammar, Skills)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW C: SECONDARY STAGE EXAMS (GRADES 10 - 12 & BACCALAUREATE)
          ========================================================================= */}
      {selectedStage === 'Secondary' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Secondary Stage Dual Pathways Switcher (2026/2027) */}
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
                  {examSecondaryPath === 'general'
                    ? 'General Secondary Path (الثانوية العامة المصرية)'
                    : 'Egyptian Baccalaureate Path (البكالوريا المصرية)'}
                </h2>
              </div>
            </div>

            {/* Toggle buttons */}
            <div className="flex items-center bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs w-full md:w-auto">
              <button
                onClick={() => onSelectExamPath('general')}
                className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  examSecondaryPath === 'general'
                    ? 'bg-[#0B397D] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>General Secondary (الثانوية العامة)</span>
              </button>

              <button
                onClick={() => onSelectExamPath('baccalaureate')}
                className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  examSecondaryPath === 'baccalaureate'
                    ? 'bg-[#0878E8] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Egyptian Baccalaureate (البكالوريا المصرية)</span>
              </button>
            </div>
          </div>

          {/* Grade Level Selector for Exams */}
          <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <BookOpen className="w-4 h-4 text-[#0B397D]" />
              <span>Select Grade Level / الصف الدراسي:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { grade: 10, label: 'Secondary 1 (الصف الأول)', labelBac: 'Sec 1 Baccalaureate' },
                { grade: 11, label: 'Secondary 2 (الصف الثاني)', labelBac: 'Sec 2 Baccalaureate' },
                { grade: 12, label: 'Secondary 3 (الثانوية العامة)', labelBac: 'Sec 3 Baccalaureate Capstone' }
              ].map(g => (
                <button
                  key={g.grade}
                  onClick={() => onSelectExamGrade(g.grade)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    examGrade === g.grade
                      ? 'bg-[#0B397D] text-white shadow-md ring-2 ring-[#FFC928]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  <span>{examSecondaryPath === 'general' ? g.label : g.labelBac}</span>
                  {examGrade === g.grade && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC928]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 1. GENERAL SECONDARY STREAM (THANAWEYA AMMA) */}
          {examSecondaryPath === 'general' && (
            <div className="space-y-6">
              {/* Sub-Tabs: Levels, Governmental, Term 1, Term 2 */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
                <button
                  onClick={() => onChangeSecondaryTab('levels')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    secondaryActiveTab === 'levels'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white border text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Unit Levels 1-5
                </button>
                <button
                  onClick={() => onChangeSecondaryTab('governmental')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    secondaryActiveTab === 'governmental'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white border text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Gov Directorate Exams (10+ Papers)
                </button>
                <button
                  onClick={() => onChangeSecondaryTab('term1')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    secondaryActiveTab === 'term1'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white border text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Term 1 Comprehensive Revision
                </button>
                <button
                  onClick={() => onChangeSecondaryTab('term2')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    secondaryActiveTab === 'term2'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white border text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Term 2 Final Revision
                </button>
              </div>

              {/* TAB 1: 5-LEVEL PROGRESSION SYSTEM */}
              {secondaryActiveTab === 'levels' && (
                <div className="space-y-8">
                  {/* Hero / Banner */}
                  <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-2xl p-6 md:p-8 text-white shadow-md">
                    <div className="max-w-3xl space-y-3">
                      <div className="text-xs uppercase tracking-wider text-blue-300 font-semibold flex items-center gap-2">
                        <span>Egyptian MOE Official Specifications</span>
                        <span>·</span>
                        <span>{examsHeaderMeta.badge}</span>
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {examsHeaderMeta.title}
                      </h1>
                      <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                        {examsHeaderMeta.description}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-blue-200">
                        <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Authentic Textbook Sources</span>
                        <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-300" /> AI Rubric Auto-Correction</span>
                        <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-blue-300" /> {examsHeaderMeta.literatureNovel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Unit Selector */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-900" />
                        <span>Select Curriculum Unit — {examsHeaderMeta.trackLabel}</span>
                      </h2>
                      <span className="text-xs text-slate-500 font-mono">Units 1 - {activeExamUnits.length}</span>
                    </div>

                    <div className={`grid grid-cols-2 sm:grid-cols-3 ${activeExamUnits.length > 3 ? 'lg:grid-cols-6' : 'lg:grid-cols-3'} gap-3`}>
                      {activeExamUnits.map((unit: any) => {
                        const isSelected = unit.id === currentUnit.id;
                        const unitProg = progress[unit.id] || { 1: { completed: false } };
                        const completedCount = Object.values(unitProg).filter((l: any) => l.completed).length;

                        return (
                          <button
                            key={`eh_unit_${unit.id}`}
                            onClick={() => onSelectUnitId(unit.id)}
                            className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'border-blue-900 bg-blue-50/80 shadow-sm ring-1 ring-blue-900'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
                              <span>Unit {unit.id}</span>
                              <span className="text-[11px] text-blue-700">{completedCount}/{unit.exams.length} Levels</span>
                            </div>
                            <div className="font-bold text-sm text-slate-900 truncate">{unit.title}</div>
                            <div className="text-xs text-slate-500 truncate" dir="rtl">{unit.titleAr}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Current Unit Details & 5 Levels */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
                          Unit {currentUnit.id} Profile · {examsHeaderMeta.badge}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                          {currentUnit.title} — <span className="font-medium text-slate-600" dir="rtl">{currentUnit.titleAr}</span>
                        </h3>
                        <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          <span><strong>Grammar Focus:</strong> {currentUnit.grammarFocus}</span>
                          <span>·</span>
                          <span><strong>Literature:</strong> {currentUnit.novelChapter}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => {
                            // Find matching unit in master curriculum catalog
                            const u = allStagesCurriculumCatalog.find(c => c.grade === examGrade)?.semesters
                              .flatMap(s => s.units)
                              .find(u => u.unitNumber === currentUnit.id);
                            if (u) onOpenLesson(u);
                          }}
                          className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#0B397D] to-[#0878E8] text-white hover:from-[#0957B7] hover:to-[#0768c9] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4 text-[#FFC928]" />
                          <span>Explore Lessons / المفردات والقواعد</span>
                        </button>

                        <button
                          onClick={() => {
                            const exam = currentUnit.exams.find((e: Exam) => e.level === 4) || currentUnit.exams[0];
                            if (exam) onStartExam(exam);
                          }}
                          className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Award className="w-4 h-4 text-emerald-200" />
                          <span>Launch Level 4 Mock</span>
                        </button>
                      </div>
                    </div>

                    {/* The 5 Level Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentUnit.exams.map((exam: Exam) => (
                        <div
                          key={exam.id}
                          className="p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 hover:bg-white flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black uppercase text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
                                Level {exam.level}
                              </span>
                              <span className="text-xs text-slate-500 font-mono">
                                {exam.durationMinutes} Min · {exam.totalMarks} Marks
                              </span>
                            </div>

                            <h4 className="font-bold text-slate-900 text-base">
                              {exam.levelTitle}
                            </h4>
                            <p className="text-xs text-slate-500" dir="rtl">
                              {exam.levelTitleAr}
                            </p>

                            <div className="text-xs text-slate-600 space-y-1 pt-1">
                              <div>• {exam.mcqs.length} Ministry-calibrated MCQs</div>
                              {exam.reading && <div>• Reading passage comprehension</div>}
                              {exam.writingTask && <div>• Essay &amp; Composition task</div>}
                              {exam.storyQuestions && <div>• Novel literature analysis</div>}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                            <button
                              onClick={() => onStartExam(exam)}
                              className="flex-1 py-2 px-3 rounded-xl bg-[#0B397D] text-white hover:bg-blue-900 font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Award className="w-3.5 h-3.5 text-amber-300" />
                              <span>Start Exam</span>
                            </button>
                            <button
                              onClick={() => onPrintExam(exam)}
                              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Print Paper"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: GOVERNMENTAL DIRECTORATE EXAMS */}
              {secondaryActiveTab === 'governmental' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl font-bold">Official Governorate Educational Directorate Papers</h3>
                    <p className="text-xs sm:text-sm text-blue-100 mt-1">
                      Real official examination papers from Cairo, Giza, Alexandria, Dakahlia, Gharbia, and other directorates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {governmentalExams.map(exam => (
                      <div key={exam.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full">
                            {exam.governorate || 'Directorate Paper'}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{exam.durationMinutes} min · {exam.totalMarks} marks</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">{exam.levelTitle}</h4>
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                          <button
                            onClick={() => onStartExam(exam)}
                            className="flex-1 py-2 rounded-xl bg-[#0B397D] text-white hover:bg-blue-900 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-300" /> Start Exam
                          </button>
                          <button
                            onClick={() => onPrintExam(exam)}
                            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                            title="Print Paper"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TERM 1 COMPREHENSIVE REVISION */}
              {secondaryActiveTab === 'term1' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl font-bold">Term 1 Comprehensive Final Mock Exams</h3>
                    <p className="text-xs sm:text-sm text-amber-100 mt-1">
                      Covering Units 1 to 6 with full 50-mark MOE specifications.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {term1RevisionExams.map(exam => (
                      <div key={exam.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                            Term 1 Comprehensive Mock
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{exam.durationMinutes} min · {exam.totalMarks} marks</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">{exam.levelTitle}</h4>
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                          <button
                            onClick={() => onStartExam(exam)}
                            className="flex-1 py-2.5 rounded-xl bg-[#0B397D] text-white hover:bg-blue-900 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Award className="w-4 h-4 text-amber-300" /> Start Comprehensive Exam
                          </button>
                          <button
                            onClick={() => onPrintExam(exam)}
                            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                            title="Print Paper"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: TERM 2 FINAL REVISION */}
              {secondaryActiveTab === 'term2' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl font-bold">Term 2 Final Revision &amp; Year-End Mocks</h3>
                    <p className="text-xs sm:text-sm text-indigo-100 mt-1">
                      Full curriculum synthesis covering Term 1 and Term 2 topics.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {term2RevisionExams.map(exam => (
                      <div key={exam.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-indigo-900 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                            Term 2 Final Benchmark
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{exam.durationMinutes} min · {exam.totalMarks} marks</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">{exam.levelTitle}</h4>
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                          <button
                            onClick={() => onStartExam(exam)}
                            className="flex-1 py-2.5 rounded-xl bg-[#0B397D] text-white hover:bg-blue-900 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Award className="w-4 h-4 text-amber-300" /> Start Final Assessment
                          </button>
                          <button
                            onClick={() => onPrintExam(exam)}
                            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                            title="Print Paper"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. EGYPTIAN BACCALAUREATE STREAM */}
          {examSecondaryPath === 'baccalaureate' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#07224D] via-[#0957B7] to-[#0878E8] text-white rounded-2xl p-6 md:p-8 shadow-md">
                <div className="max-w-3xl space-y-2">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                    Egyptian Baccalaureate Standards (2026/2027)
                  </span>
                  <h3 className="text-2xl font-black">Academic Capstones &amp; Dual-Passage Synthesis</h3>
                  <p className="text-xs md:text-sm text-blue-100">
                    Rigorous comparative texts, argumentation defense essays, and academic lexical depth tailored to the Egyptian Baccalaureate stream.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {getBaccalaureateExamsByGrade(examGrade).map(exam => (
                  <div key={exam.id} className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
                        Baccalaureate Level {exam.level}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{exam.durationMinutes} Min · {exam.totalMarks} Marks</span>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">{exam.levelTitle}</h4>
                      <p className="text-xs text-slate-500" dir="rtl">{exam.levelTitleAr}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => onStartExam(exam)}
                        className="flex-1 py-2.5 rounded-xl bg-[#0878E8] text-white hover:bg-blue-700 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-4 h-4 text-amber-300" /> Start Baccalaureate Exam
                      </button>
                      <button
                        onClick={() => onPrintExam(exam)}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                        title="Print Paper"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODALS & EMBEDDED RUNNERS
          ========================================================================= */}

      {/* 2. Preparatory MOE Unit Exam Modal */}
      {activePrepModalExam && (
        <CurriculumExamModal
          exam={activePrepModalExam}
          student={student}
          track="general_secondary"
          grade={prepGrade}
          unitCurriculum={activePrepModalUnit}
          onClose={() => {
            setActivePrepModalExam(null);
            setActivePrepModalUnit(null);
          }}
          onStudentUpdated={onStudentUpdated}
        />
      )}

      {/* 3. Preparatory Dedicated 5-Level Exam Suite Modal */}
      {active5LevelPrepSuite && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B397D] to-[#0878E8] text-white p-5 flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                  New Hello {active5LevelPrepSuite.gradeNumber} · Unit {active5LevelPrepSuite.unitNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-black">
                  {active5LevelPrepSuite.unitTitleEn} — 5-Level Adaptive Assessment
                </h3>
              </div>
              <button
                onClick={() => {
                  setActive5LevelPrepSuite(null);
                  setPrepSuiteAnswers({});
                  setPrepSuiteRevealed({});
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Level Tabs */}
            <div className="bg-slate-100 p-2 border-b border-slate-200 grid grid-cols-5 gap-1 shrink-0 text-xs font-bold text-center">
              {[
                { lvl: 1, title: 'L1: Base' },
                { lvl: 2, title: 'L2: Context' },
                { lvl: 3, title: 'L3: Syntax' },
                { lvl: 4, title: 'L4: Mock' },
                { lvl: 5, title: 'L5: HOTS' }
              ].map(item => (
                <button
                  key={item.lvl}
                  onClick={() => setPrepSuiteActiveLevel(item.lvl as any)}
                  className={`py-2 rounded-xl transition-all cursor-pointer ${
                    prepSuiteActiveLevel === item.lvl
                      ? 'bg-[#0B397D] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Questions Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {(() => {
                const questions = prepSuiteActiveLevel === 1
                  ? active5LevelPrepSuite.examSuite.level1_Foundation
                  : prepSuiteActiveLevel === 2
                  ? active5LevelPrepSuite.examSuite.level2_Contextual
                  : prepSuiteActiveLevel === 3
                  ? active5LevelPrepSuite.examSuite.level3_AdvancedStructure
                  : prepSuiteActiveLevel === 4
                  ? active5LevelPrepSuite.examSuite.level4_MoeMockExam
                  : active5LevelPrepSuite.examSuite.level5_HigherThinking;

                return (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Level {prepSuiteActiveLevel} Target: {prepSuiteActiveLevel === 1 ? 'Core Vocabulary & Spelling Recall' : prepSuiteActiveLevel === 2 ? 'Contextual Collocations & Semantic Usage' : prepSuiteActiveLevel === 3 ? 'Grammatical Syntax & Error Corrections' : prepSuiteActiveLevel === 4 ? 'Authentic Ministry Mock Assessment' : 'Higher-Order Critical Thinking & Reflection'}</span>
                      </div>
                      <span className="font-bold text-blue-800">{questions.length} Question(s)</span>
                    </div>

                    {questions.map((q, idx) => {
                      const userAns = prepSuiteAnswers[q.id] || '';
                      const isRevealed = prepSuiteRevealed[q.id];
                      const isCorrect = userAns.trim().toLowerCase() === (typeof q.correctAnswer === 'string' ? q.correctAnswer.toLowerCase() : '');

                      return (
                        <div key={q.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                            <span>Question {idx + 1} ({q.subSkill || 'Skill Focus'})</span>
                            <span className="text-[#0878E8]">{q.marks} Mark(s)</span>
                          </div>

                          <div className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                            {q.questionPrompt}
                          </div>

                          {/* Options or Input */}
                          {q.options && q.options.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {q.options.map((opt, oIdx) => {
                                const isSelected = userAns === opt;
                                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                                if (isRevealed) {
                                  if (opt.toLowerCase() === (typeof q.correctAnswer === 'string' ? q.correctAnswer.toLowerCase() : '')) {
                                    btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                                  } else if (isSelected) {
                                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                                  }
                                } else if (isSelected) {
                                  btnStyle = 'bg-blue-100 border-blue-400 text-blue-900 font-bold';
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => {
                                      setPrepSuiteAnswers(prev => ({ ...prev, [q.id]: opt }));
                                      setPrepSuiteRevealed(prev => ({ ...prev, [q.id]: true }));
                                    }}
                                    className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${btnStyle}`}
                                  >
                                    <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                                      {String.fromCharCode(65 + oIdx)}
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <textarea
                                value={userAns}
                                onChange={(e) => setPrepSuiteAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                placeholder="Type your answer or reflection here..."
                                rows={3}
                                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                              <button
                                onClick={() => setPrepSuiteRevealed(prev => ({ ...prev, [q.id]: true }))}
                                className="px-4 py-2 rounded-xl bg-[#0B397D] text-white font-bold text-xs hover:bg-blue-900 transition-colors cursor-pointer"
                              >
                                Submit Answer &amp; Check Model Rationale
                              </button>
                            </div>
                          )}

                          {/* Feedback Explanation */}
                          {isRevealed && (
                            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 space-y-1.5 text-xs text-emerald-950 animate-in fade-in">
                              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Model Answer: {typeof q.correctAnswer === 'string' ? q.correctAnswer : q.correctAnswer.join(', ')}</span>
                              </div>
                              <div className="text-slate-700" dir="rtl">
                                <strong>توضيح مستر محمد المنشاوي:</strong> {q.explanationAr}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-bold shrink-0">
              <span className="text-slate-500">EngliMensh.EG Adaptive Engine</span>
              <button
                onClick={() => {
                  if (prepSuiteActiveLevel < 5) {
                    setPrepSuiteActiveLevel((prev: any) => prev + 1);
                  } else {
                    setActive5LevelPrepSuite(null);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0B397D] text-white hover:bg-blue-900 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{prepSuiteActiveLevel < 5 ? `Next: Level ${prepSuiteActiveLevel + 1}` : 'Finish Suite'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
