import React, { useState } from 'react';
import {
  Volume2,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Award,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  FileText,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Quote,
  Star,
  RotateCw,
  Shuffle,
  PenTool,
  Check,
  Copy,
  CheckCheck
} from 'lucide-react';
import { UnitCurriculum, UnitExam, CurriculumQuestion } from '../types/curriculum.ts';
import {
  secondaryPunctuationRules,
  secondaryEssayGuide,
  secondaryTranslationExercises
} from '../data/skillsBoosterData.ts';

interface LessonViewerModalProps {
  unit: UnitCurriculum | null;
  isOpen: boolean;
  onClose: () => void;
  onTakeExam?: (exam: UnitExam) => void;
  initialTab?: 'vocab' | 'grammar' | 'literature' | 'skills';
}

interface VocabQuizQuestion {
  word: string;
  pos: string;
  questionText: string;
  questionTextAr?: string;
  options: { text: string; isCorrect: boolean }[];
  correctExplanation: string;
}

export const LessonViewerModal: React.FC<LessonViewerModalProps> = ({
  unit,
  isOpen,
  onClose,
  onTakeExam,
  initialTab = 'grammar',
}) => {
  const isPrepStage = unit?.stage === 'Preparatory' || (unit?.grade !== undefined && unit.grade >= 7 && unit.grade <= 9);
  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar' | 'literature' | 'skills'>(
    isPrepStage && initialTab === 'literature' ? 'skills' : initialTab
  );
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [exerciseAnswers, setExerciseAnswers] = useState<{ [qId: string]: 'A' | 'B' | 'C' | 'D' }>({});
  const [exerciseRevealed, setExerciseRevealed] = useState<{ [qId: string]: boolean }>({});
  const [vocabFilter, setVocabFilter] = useState<'all' | 'words' | 'collocations' | 'saved'>('all');
  const [revealedHots, setRevealedHots] = useState<{ [qId: string]: boolean }>({});

  // Vocabulary Practice Suite State
  const [vocabPracticeMode, setVocabPracticeMode] = useState<'list' | 'flashcards' | 'quiz'>('list');
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [bookmarkedWords, setBookmarkedWords] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('englimensh_bookmarked_words_v1');
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Quick Quiz (5 Qs) State
  const [quizQuestions, setQuizQuestions] = useState<VocabQuizQuestion[]>([]);
  const [quizCurrentIdx, setQuizCurrentIdx] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<{ [qIdx: number]: number }>({});
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Skills & Translation State
  const [skillsSubTab, setSkillsSubTab] = useState<'punctuation' | 'essay' | 'translation'>('punctuation');
  const [revealedTranslations, setRevealedTranslations] = useState<{ [id: string]: boolean }>({});
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [expandedTraps, setExpandedTraps] = useState<{ [trapId: string]: boolean }>({});

  const toggleBookmark = (word: string) => {
    setBookmarkedWords(prev => {
      const next = new Set(prev);
      if (next.has(word)) {
        next.delete(word);
      } else {
        next.add(word);
      }
      try {
        localStorage.setItem('englimensh_bookmarked_words_v1', JSON.stringify(Array.from(next)));
      } catch (err) {
        console.warn('Could not persist bookmarked words:', err);
      }
      return next;
    });
  };

  const generateQuickQuiz = () => {
    if (!unit || !unit.vocabularyModule.keyWords || unit.vocabularyModule.keyWords.length === 0) return;
    const words = [...unit.vocabularyModule.keyWords];
    const shuffled = words.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(5, shuffled.length));

    const generated: VocabQuizQuestion[] = selected.map((target, idx) => {
      const otherWords = words.filter(w => w.word !== target.word);
      const shuffledOthers = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const targetAr = target.ar || target.meaningAr || '';
      const targetDef = target.def || target.meaningEn || '';
      const targetPos = target.pos || target.partOfSpeech || 'n.';

      const isArabicTarget = idx % 2 === 0;

      if (isArabicTarget && targetAr) {
        const distractors = shuffledOthers.map(o => ({
          text: o.ar || o.meaningAr || o.word,
          isCorrect: false
        }));
        const options = [{ text: targetAr, isCorrect: true }, ...distractors].sort(() => 0.5 - Math.random());
        return {
          word: target.word,
          pos: targetPos,
          questionText: `What is the accurate meaning of "${target.word}" (${targetPos})?`,
          questionTextAr: `ما هو المعنى الصحيح لكلمة "${target.word}"؟`,
          options,
          correctExplanation: `"${target.word}" (${targetPos}) means "${targetAr}". Definition: ${targetDef}`
        };
      } else {
        const distractors = shuffledOthers.map(o => ({
          text: o.word,
          isCorrect: false
        }));
        const options = [{ text: target.word, isCorrect: true }, ...distractors].sort(() => 0.5 - Math.random());
        return {
          word: target.word,
          pos: targetPos,
          questionText: `Which vocabulary item means: "${targetDef || targetAr}"?`,
          questionTextAr: `أي كلمة تتطابق مع هذا التعريف والسياق؟`,
          options,
          correctExplanation: `"${target.word}" (${targetPos}) translates to "${targetAr}". Context: ${target.ex || ''}`
        };
      }
    });

    setQuizQuestions(generated);
    setQuizCurrentIdx(0);
    setQuizSelectedOption({});
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const handleQuizChoice = (optionIdx: number) => {
    if (quizSelectedOption[quizCurrentIdx] !== undefined) return;
    const currentQ = quizQuestions[quizCurrentIdx];
    const isCorrect = currentQ.options[optionIdx]?.isCorrect;

    setQuizSelectedOption(prev => ({ ...prev, [quizCurrentIdx]: optionIdx }));
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const toggleTranslationReveal = (id: string) => {
    setRevealedTranslations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isOpen || !unit) return null;

  const toggleHots = (qId: string) => {
    setRevealedHots(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Text-to-speech for vocabulary words
  const speakWord = (word: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    setPlayingWord(word);
    utterance.onend = () => setPlayingWord(null);
    utterance.onerror = () => setPlayingWord(null);
    window.speechSynthesis.speak(utterance);
  };

  const handleExerciseOptionClick = (qId: string, choice: 'A' | 'B' | 'C' | 'D') => {
    setExerciseAnswers(prev => ({ ...prev, [qId]: choice }));
    setExerciseRevealed(prev => ({ ...prev, [qId]: true }));
  };

  const optionLetters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-50 flex flex-col w-screen h-screen overflow-hidden animate-in fade-in duration-200"
      dir="ltr"
    >
      {/* ========================================================
          1. TOP STICKY BAR (EngliMensh Blue & Yellow Branding)
         ======================================================== */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-[#0B397D] via-[#0957B7] to-[#0878E8] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-blue-400/20 shadow-md shrink-0">
        {/* Left: Back Button */}
        <button
          onClick={onClose}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2 cursor-pointer group active:scale-95 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-[#FFC928] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Units / العودة للوحدات</span>
        </button>

        {/* Center: Grade & Unit Badge */}
        <div className="text-center px-2 min-w-0">
          <div className="flex items-center justify-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFC928] text-[#0B397D] text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-xs">
              Unit {unit.unitNumber}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-blue-200 truncate">
              {unit.gradeLabel.split(' - ')[0]} • Term {unit.semester}
            </span>
          </div>
          <h1 className="text-sm sm:text-lg font-black text-white leading-tight mt-0.5 truncate">
            {unit.unitTitle} <span className="font-medium text-blue-200 text-xs sm:text-sm" dir="rtl">({unit.unitTitleAr})</span>
          </h1>
        </div>

        {/* Right: Quick Action / Take Exam Shortcut */}
        <div className="shrink-0 flex items-center gap-2">
          {onTakeExam && unit.unitExam && (
            <button
              onClick={() => {
                onClose();
                onTakeExam(unit.unitExam);
              }}
              className="hidden md:flex px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-sm transition-all items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Award className="w-4 h-4 text-amber-300 fill-current" />
              <span>Take 30-Min Exam</span>
            </button>
          )}
        </div>
      </header>

      {/* ========================================================
          2. FULL-WIDTH SEGMENTED TAB NAVIGATION (3-Tab for Prep / 4-Tab for Sec)
         ======================================================== */}
      <nav className="sticky top-[57px] z-20 bg-white border-b border-slate-200 shadow-xs px-2 sm:px-6 py-2 shrink-0">
        <div className={`max-w-5xl mx-auto grid gap-2 p-1.5 bg-slate-100 rounded-2xl ${
          isPrepStage ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'
        }`}>
          {/* Tab 1: Vocabulary Bank */}
          <button
            onClick={() => setActiveTab('vocab')}
            className={`py-2 px-2.5 sm:px-3 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'vocab'
                ? 'bg-white text-[#0B397D] shadow-sm ring-2 ring-[#FFC928] border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Bookmark className={`w-4 h-4 shrink-0 ${activeTab === 'vocab' ? 'text-[#0878E8]' : 'text-slate-400'}`} />
            <div className="text-left min-w-0">
              <div className="leading-tight font-extrabold truncate">[Tab 1] Vocabulary Bank</div>
              <div className={`text-[10px] font-normal truncate ${activeTab === 'vocab' ? 'text-blue-800' : 'text-slate-500'}`} dir="rtl">
                المفردات والتعبيرات الأساسية
              </div>
            </div>
          </button>

          {/* Tab 2: Grammar Masterclass */}
          <button
            onClick={() => setActiveTab('grammar')}
            className={`py-2 px-2.5 sm:px-3 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'grammar'
                ? 'bg-white text-[#0B397D] shadow-sm ring-2 ring-[#FFC928] border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <GraduationCap className={`w-4 h-4 shrink-0 ${activeTab === 'grammar' ? 'text-[#0878E8]' : 'text-slate-400'}`} />
            <div className="text-left min-w-0">
              <div className="leading-tight font-extrabold truncate">[Tab 2] Grammar Masterclass</div>
              <div className={`text-[10px] font-normal truncate ${activeTab === 'grammar' ? 'text-blue-800' : 'text-slate-500'}`} dir="rtl">
                القواعد وفخاخ الامتحانات (HOTS)
              </div>
            </div>
          </button>

          {/* Tab 3 for Secondary: Prescribed Literature */}
          {!isPrepStage && (
            <button
              onClick={() => setActiveTab('literature')}
              className={`py-2 px-2.5 sm:px-3 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'literature'
                  ? 'bg-white text-[#0B397D] shadow-sm ring-2 ring-[#FFC928] border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className={`w-4 h-4 shrink-0 ${activeTab === 'literature' ? 'text-[#0878E8]' : 'text-slate-400'}`} />
              <div className="text-left min-w-0">
                <div className="leading-tight font-extrabold truncate">[Tab 3] Literature</div>
                <div className={`text-[10px] font-normal truncate ${activeTab === 'literature' ? 'text-blue-800' : 'text-slate-500'}`} dir="rtl">
                  القصة المقررة
                </div>
              </div>
            </button>
          )}

          {/* Tab 3 (Prep) / Tab 4 (Sec): Skills Builder */}
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-2 px-2.5 sm:px-3 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'skills'
                ? 'bg-white text-[#0B397D] shadow-sm ring-2 ring-[#FFC928] border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <PenTool className={`w-4 h-4 shrink-0 ${activeTab === 'skills' ? 'text-[#0878E8]' : 'text-slate-400'}`} />
            <div className="text-left min-w-0">
              <div className="leading-tight font-extrabold truncate">
                {isPrepStage ? '[Tab 3] Skills Builder' : '[Tab 4] Skills & Translation'}
              </div>
              <div className={`text-[10px] font-normal truncate ${activeTab === 'skills' ? 'text-blue-800' : 'text-slate-500'}`} dir="rtl">
                {isPrepStage ? 'المحادثة والفقرة 90-110 كلمة' : 'المهارات والترجمة'}
              </div>
            </div>
          </button>
        </div>
      </nav>

      {/* ========================================================
          3. MAIN DEDICATED FULL-SCREEN BODY (SCROLLABLE)
         ======================================================== */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-8 max-w-5xl mx-auto w-full space-y-8 text-slate-800">
        
        {/* ======================================================
            TAB 1: VOCABULARY BANK & INTERACTIVE PRACTICE SUITE
           ====================================================== */}
        {activeTab === 'vocab' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Target Lexical Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-[#0B397D] to-[#0878E8] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  Target Vocabulary &amp; Phrasal Lexis
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Unit {unit.unitNumber} Core Lexical Bank
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                  Master the essential vocabulary, academic collocations, and idiomatic expressions calibrated for the 2026/2027 Egyptian Ministry of Education examinations. Click the audio button 🔊 for native pronunciation.
                </p>
              </div>
            </div>

            {/* Interactive Modes Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setVocabPracticeMode('list')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    vocabPracticeMode === 'list'
                      ? 'bg-white text-[#0B397D] shadow-xs ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#0878E8]" />
                  <span>List View / القائمة</span>
                </button>
                <button
                  onClick={() => {
                    setVocabPracticeMode('flashcards');
                    setIsCardFlipped(false);
                    setFlashcardIndex(0);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    vocabPracticeMode === 'flashcards'
                      ? 'bg-white text-[#0B397D] shadow-xs ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5 text-amber-500" />
                  <span>Flashcards (Flip) / بطاقات التقليب</span>
                </button>
                <button
                  onClick={() => {
                    setVocabPracticeMode('quiz');
                    generateQuickQuiz();
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    vocabPracticeMode === 'quiz'
                      ? 'bg-white text-[#0B397D] shadow-xs ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Quick Quiz (5 Qs) / اختبار سريع</span>
                </button>
              </div>

              {/* Bookmark Stats Pill */}
              <button
                onClick={() => {
                  setVocabPracticeMode('list');
                  setVocabFilter('saved');
                }}
                className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                  vocabFilter === 'saved' && vocabPracticeMode === 'list'
                    ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
                title="View your saved / bookmarked words"
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>Saved Words: {bookmarkedWords.size}</span>
              </button>
            </div>

            {/* ========================================================
                MODE 1: LIST VIEW
               ======================================================== */}
            {vocabPracticeMode === 'list' && (
              <div className="space-y-6">
                {/* Filter Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B397D]">
                    <Bookmark className="w-4 h-4 text-[#0878E8]" />
                    <span>Total Items: {unit.vocabularyModule.keyWords.length} Words + {unit.vocabularyModule.collocations.length} Collocations</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setVocabFilter('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        vocabFilter === 'all'
                          ? 'bg-[#0B397D] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      All / الكل
                    </button>
                    <button
                      onClick={() => setVocabFilter('words')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        vocabFilter === 'words'
                          ? 'bg-[#0B397D] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Words / المفردات
                    </button>
                    <button
                      onClick={() => setVocabFilter('collocations')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        vocabFilter === 'collocations'
                          ? 'bg-[#0B397D] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Collocations / المتلازمات
                    </button>
                    <button
                      onClick={() => setVocabFilter('saved')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        vocabFilter === 'saved'
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${vocabFilter === 'saved' ? 'fill-current' : 'text-amber-500'}`} />
                      <span>Saved ({bookmarkedWords.size})</span>
                    </button>
                  </div>
                </div>

                {/* Key Words Grid */}
                {(vocabFilter === 'all' || vocabFilter === 'words' || vocabFilter === 'saved') && (
                  <div className="space-y-4">
                    <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                      <h3 className="text-lg font-black text-[#0B397D] flex items-center gap-2">
                        <Bookmark className="w-5 h-5 text-[#0878E8]" />
                        <span>
                          {vocabFilter === 'saved' ? 'Saved Revision Words' : 'Target Lexical Items'}
                        </span>
                        <span className="text-xs font-normal text-slate-500" dir="rtl">
                          {vocabFilter === 'saved' ? '/ الكلمات المحفوظة للمراجعة' : '/ المفردات والكلمات المستهدفة'}
                        </span>
                      </h3>
                      <span className="text-xs text-slate-400">Click 🔊 for audio • ⭐ to save</span>
                    </div>

                    {/* Empty State for Saved Words Filter */}
                    {vocabFilter === 'saved' && unit.vocabularyModule.keyWords.filter(kw => bookmarkedWords.has(kw.word)).length === 0 ? (
                      <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3 shadow-xs">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                          <Star className="w-6 h-6 fill-current" />
                        </div>
                        <h4 className="font-black text-slate-800 text-base">No Saved Words Yet</h4>
                        <p className="text-xs text-slate-500 max-w-md mx-auto">
                          Click the star (⭐) icon on any word card in this unit to bookmark it for focused revision and flashcards!
                        </p>
                        <button
                          onClick={() => setVocabFilter('all')}
                          className="px-4 py-2 rounded-xl bg-[#0B397D] text-white font-bold text-xs hover:bg-[#0878E8] cursor-pointer"
                        >
                          View All Words
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {unit.vocabularyModule.keyWords
                          .filter(kw => vocabFilter !== 'saved' || bookmarkedWords.has(kw.word))
                          .map((kw, idx) => {
                            const pos = kw.pos || kw.partOfSpeech || 'n.';
                            const ar = kw.ar || kw.meaningAr || '';
                            const def = kw.def || kw.meaningEn || '';
                            const ex = kw.ex || kw.exampleSentence || '';
                            const exAr = kw.exAr;
                            const isSaved = bookmarkedWords.has(kw.word);

                            return (
                              <div
                                key={idx}
                                className={`bg-white rounded-2xl border p-5 space-y-3 shadow-2xs hover:shadow-sm transition-all group ${
                                  isSaved ? 'border-amber-300 ring-1 ring-amber-300/50 bg-amber-50/20' : 'border-slate-200 hover:border-[#0878E8]/50'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-lg font-black text-[#0B397D] group-hover:text-[#0878E8] transition-colors">
                                      {kw.word}
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                                      {pos}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    {ar && (
                                      <span className="text-xs font-bold text-slate-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg" dir="rtl">
                                        {ar}
                                      </span>
                                    )}
                                    <button
                                      onClick={() => speakWord(kw.word)}
                                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                                        playingWord === kw.word
                                          ? 'bg-amber-400 text-[#0B397D] scale-110 shadow-xs'
                                          : 'bg-slate-100 hover:bg-blue-100 text-[#0878E8]'
                                      }`}
                                      title={`Listen to "${kw.word}"`}
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => toggleBookmark(kw.word)}
                                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                                        isSaved
                                          ? 'bg-amber-400 text-slate-950 scale-105 shadow-xs'
                                          : 'bg-slate-100 hover:bg-amber-100 text-slate-400 hover:text-amber-600'
                                      }`}
                                      title={isSaved ? 'Remove from Saved Words' : 'Save Word for Revision'}
                                    >
                                      <Star className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                                    </button>
                                  </div>
                                </div>

                                {def && (
                                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    {def}
                                  </p>
                                )}

                                {ex && (
                                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 italic">
                                    <strong className="text-[#0B397D] not-italic mr-1">Context:</strong>
                                    "{ex}"
                                  </div>
                                )}

                                {exAr && (
                                  <div className="bg-blue-50/70 p-2.5 rounded-xl border border-blue-100/80 text-xs text-blue-900 flex items-start gap-1.5" dir="rtl">
                                    <span className="font-bold text-[#0B397D] shrink-0 text-[11px]">ترجمة السياق:</span>
                                    <span className="italic">"{exAr}"</span>
                                  </div>
                                )}

                                {(kw.collocation || kw.synonym) && (
                                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                                    {kw.collocation && (
                                      <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 font-semibold border border-blue-100">
                                        <strong>Colloc:</strong> {kw.collocation}
                                      </span>
                                    )}
                                    {kw.synonym && (
                                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                                        <strong>Syn:</strong> {kw.synonym}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}

                {/* Collocations Section */}
                {(vocabFilter === 'all' || vocabFilter === 'collocations') && (
                  <div className="space-y-4 pt-4">
                    <div className="border-b border-slate-200 pb-2">
                      <h3 className="text-lg font-black text-[#0B397D] flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#FFC928]" />
                        <span>Academic Collocations &amp; Expressions</span>
                        <span className="text-xs font-normal text-slate-500" dir="rtl">/ المتلازمات اللفظية والتعبيرات</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {unit.vocabularyModule.collocations.map((col, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2.5 shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-black text-sm text-[#0B397D]">
                              {col.phrase}
                            </span>
                            <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200" dir="rtl">
                              {col.meaningAr}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                            "{col.example}"
                          </p>
                        </div>
                      ))}
                    </div>

                    {unit.vocabularyModule.idiomsAndExpressions && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Idiomatic Nuances (المصطلحات وتراكيب التعبير)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {unit.vocabularyModule.idiomsAndExpressions.map((idm, iIdx) => (
                            <div key={iIdx} className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-[#0B397D]">{idm.idiom}</span>
                                <span className="text-xs font-semibold text-amber-900" dir="rtl">{idm.meaningAr}</span>
                              </div>
                              <p className="text-xs text-slate-600 italic">"{idm.example}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================
                MODE 2: FLASHCARD FLIP PRACTICE
               ======================================================== */}
            {vocabPracticeMode === 'flashcards' && (() => {
              const wordsList = unit.vocabularyModule.keyWords;
              const currentWord = wordsList[flashcardIndex] || wordsList[0];
              if (!currentWord) return null;

              const pos = currentWord.pos || currentWord.partOfSpeech || 'n.';
              const ar = currentWord.ar || currentWord.meaningAr || '';
              const def = currentWord.def || currentWord.meaningEn || '';
              const ex = currentWord.ex || currentWord.exampleSentence || '';
              const exAr = currentWord.exAr;
              const isSaved = bookmarkedWords.has(currentWord.word);

              return (
                <div className="space-y-6 max-w-2xl mx-auto">
                  {/* Top Flashcard Controls Bar */}
                  <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#0B397D] text-[#FFC928] font-black text-xs flex items-center justify-center shadow-xs">
                        {flashcardIndex + 1}/{wordsList.length}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        Card Progress ({Math.round(((flashcardIndex + 1) / wordsList.length) * 100)}%)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setFlashcardIndex(Math.floor(Math.random() * wordsList.length));
                          setIsCardFlipped(false);
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        title="Random Shuffle Card"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Shuffle</span>
                      </button>

                      <button
                        onClick={() => speakWord(currentWord.word)}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          playingWord === currentWord.word
                            ? 'bg-amber-400 text-[#0B397D] scale-105'
                            : 'bg-blue-50 text-[#0878E8] hover:bg-blue-100'
                        }`}
                        title="Pronounce Word"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleBookmark(currentWord.word)}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-amber-400 text-slate-950 scale-105 shadow-xs'
                            : 'bg-slate-100 hover:bg-amber-100 text-slate-400 hover:text-amber-600'
                        }`}
                        title={isSaved ? 'Remove Bookmark' : 'Bookmark Word'}
                      >
                        <Star className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#0B397D] to-[#0878E8] h-full transition-all duration-300"
                      style={{ width: `${((flashcardIndex + 1) / wordsList.length) * 100}%` }}
                    />
                  </div>

                  {/* The Interactive Flipping Card */}
                  <div
                    onClick={() => setIsCardFlipped(prev => !prev)}
                    className="relative min-h-[320px] rounded-3xl bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border-2 border-blue-200/80 shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center justify-center text-center cursor-pointer select-none group"
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 group-hover:text-[#0878E8] transition-colors">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{isCardFlipped ? 'Click to show front' : 'Click to flip'}</span>
                    </div>

                    {!isCardFlipped ? (
                      /* FRONT SIDE: WORD & POS */
                      <div className="space-y-4 animate-in zoom-in-95 duration-200">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#0B397D] text-xs font-black uppercase tracking-wider">
                          {pos}
                        </span>
                        <h3 className="text-3xl sm:text-5xl font-black text-[#0B397D] tracking-tight">
                          {currentWord.word}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          Tap card or click button below to reveal Arabic meaning &amp; context
                        </p>
                      </div>
                    ) : (
                      /* BACK SIDE: MEANING, DEF & CONTEXT */
                      <div className="space-y-4 animate-in zoom-in-95 duration-200 w-full max-w-lg">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl sm:text-3xl font-black text-amber-950 bg-amber-100/90 px-4 py-1.5 rounded-2xl border border-amber-300 shadow-2xs" dir="rtl">
                            {ar}
                          </span>
                        </div>

                        {def && (
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-white/80 p-3 rounded-2xl border border-slate-200">
                            {def}
                          </p>
                        )}

                        {ex && (
                          <div className="bg-slate-100/80 p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 italic text-left">
                            <strong className="text-[#0B397D] not-italic mr-1">Context:</strong>
                            "{ex}"
                          </div>
                        )}

                        {exAr && (
                          <div className="text-xs text-blue-900 bg-blue-50 p-2.5 rounded-xl border border-blue-100 text-right font-medium" dir="rtl">
                            "{exAr}"
                          </div>
                        )}

                        {currentWord.collocation && (
                          <div className="text-[11px] font-bold text-blue-800">
                            <strong>Collocation:</strong> {currentWord.collocation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        setFlashcardIndex(prev => Math.max(0, prev - 1));
                        setIsCardFlipped(false);
                      }}
                      disabled={flashcardIndex === 0}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous / السابق</span>
                    </button>

                    <button
                      onClick={() => setIsCardFlipped(prev => !prev)}
                      className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>{isCardFlipped ? 'Show Front' : 'Flip Card / اقلب'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setFlashcardIndex(prev => Math.min(wordsList.length - 1, prev + 1));
                        setIsCardFlipped(false);
                      }}
                      disabled={flashcardIndex === wordsList.length - 1}
                      className="px-5 py-2.5 rounded-xl bg-[#0B397D] hover:bg-[#0878E8] disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Next / التالي</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* ========================================================
                MODE 3: AUTO-GENERATED 5-QUESTION QUICK QUIZ
               ======================================================== */}
            {vocabPracticeMode === 'quiz' && (
              <div className="space-y-6 max-w-2xl mx-auto">
                {quizQuestions.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-[#0B397D]">Unit {unit.unitNumber} Vocabulary Quick Quiz</h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Test your lexical retention with 5 instant multiple-choice questions dynamically sampled from this unit's 20 core words.
                    </p>
                    <button
                      onClick={generateQuickQuiz}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm transition-all cursor-pointer"
                    >
                      Start 5-Question Quiz Now
                    </button>
                  </div>
                ) : quizCompleted ? (
                  /* QUIZ RESULT SUMMARY */
                  <div className="bg-white rounded-3xl border-2 border-emerald-300 p-8 text-center space-y-5 shadow-md animate-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl shadow-xs">
                      🏆
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                        Quiz Completed!
                      </span>
                      <h3 className="text-2xl font-black text-[#0B397D]">
                        Your Score: {quizScore} / {quizQuestions.length} ({Math.round((quizScore / quizQuestions.length) * 100)}%)
                      </h3>
                      <p className="text-xs text-slate-600">
                        {quizScore >= 4
                          ? '🌟 Excellent lexical mastery! You are well-prepared for Ministry exam specifications.'
                          : 'Keep practicing! Review flashcards or retake the quiz to solidify these vocabulary items.'}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={generateQuickQuiz}
                        className="px-6 py-2.5 rounded-xl bg-[#0B397D] hover:bg-[#0878E8] text-white font-black text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <RotateCw className="w-4 h-4" />
                        <span>Retake New 5-Question Quiz (إعادة الاختبار)</span>
                      </button>

                      <button
                        onClick={() => setVocabPracticeMode('list')}
                        className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                      >
                        Back to Vocabulary Bank
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ACTIVE QUIZ QUESTION */
                  (() => {
                    const currentQ = quizQuestions[quizCurrentIdx];
                    const selectedIdx = quizSelectedOption[quizCurrentIdx];
                    const hasAnswered = selectedIdx !== undefined;

                    return (
                      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
                        {/* Quiz Header Bar */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-xl bg-[#0B397D] text-[#FFC928] font-black text-xs flex items-center justify-center shadow-xs">
                              Q{quizCurrentIdx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-500">
                              Question {quizCurrentIdx + 1} of {quizQuestions.length}
                            </span>
                          </div>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            Current Score: {quizScore} pts
                          </span>
                        </div>

                        {/* Question Prompt */}
                        <div className="space-y-1">
                          <h4 className="text-base sm:text-lg font-black text-[#0B397D] leading-snug">
                            {currentQ.questionText}
                          </h4>
                          {currentQ.questionTextAr && (
                            <p className="text-xs text-slate-500 font-medium" dir="rtl">
                              {currentQ.questionTextAr}
                            </p>
                          )}
                        </div>

                        {/* Multiple Choice Options Grid */}
                        <div className="grid grid-cols-1 gap-2.5">
                          {currentQ.options.map((opt, optIdx) => {
                            const isChosen = selectedIdx === optIdx;
                            let btnStyle = 'bg-slate-50 hover:bg-blue-50/60 border-slate-200 text-slate-800';

                            if (hasAnswered) {
                              if (opt.isCorrect) {
                                btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300 font-bold';
                              } else if (isChosen && !opt.isCorrect) {
                                btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-300 font-bold';
                              } else {
                                btnStyle = 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleQuizChoice(optIdx)}
                                disabled={hasAnswered}
                                className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                              >
                                <span>{opt.text}</span>
                                {hasAnswered && opt.isCorrect && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                                {hasAnswered && isChosen && !opt.isCorrect && (
                                  <span className="text-rose-600 font-black text-xs">✗</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Box on Answer */}
                        {hasAnswered && (
                          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 space-y-1 animate-in fade-in duration-200">
                            <div className="flex items-center gap-1.5 font-black text-[#0B397D]">
                              <Lightbulb className="w-4 h-4 text-amber-500" />
                              <span>Lexical Explanation &amp; Context:</span>
                            </div>
                            <p className="font-normal leading-relaxed">{currentQ.correctExplanation}</p>
                          </div>
                        )}

                        {/* Next Question / Finish Button */}
                        {hasAnswered && (
                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={() => {
                                if (quizCurrentIdx < quizQuestions.length - 1) {
                                  setQuizCurrentIdx(prev => prev + 1);
                                } else {
                                  setQuizCompleted(true);
                                }
                              }}
                              className="px-6 py-2.5 rounded-xl bg-[#0B397D] hover:bg-[#0878E8] text-white font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
                            >
                              <span>
                                {quizCurrentIdx < quizQuestions.length - 1 ? 'Next Question / السؤال التالي' : 'View Final Score / عرض النتيجة'}
                              </span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================================================
            TAB 2: COMPREHENSIVE IN-DEPTH GRAMMAR MASTERCLASS
           ====================================================== */}
        {activeTab === 'grammar' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            
            {/* Header Hero Banner */}
            <div className="bg-gradient-to-r from-[#0B397D] via-[#0957B7] to-[#0878E8] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-amber-300 border border-white/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Official 2026/2027 Egyptian Ministry of Education Syllabus</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Grammar Masterclass: {unit.grammarModule.ruleName}
                </h2>
                {unit.grammarModule.ruleNameAr && (
                  <p className="text-sm sm:text-base text-blue-100 font-medium" dir="rtl">
                    {unit.grammarModule.ruleNameAr}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-3xl">
                  {unit.grammarModule.explanationSummary}
                </p>
              </div>
            </div>

            {/* Conditional Grammar Content: Sec 1 Unit 1 Dedicated Masterclass vs. Dynamic Unit Rules */}
            {unit.grade === 10 && unit.unitNumber === 1 && unit.track === 'General Secondary' ? (
              <>
                {/* SECTION A: PAST SIMPLE VS. PAST CONTINUOUS */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0878E8]">
                  <span>Module Section A</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B397D] mt-1">
                  A. Past Simple vs. Past Continuous (Narratives &amp; Interruptions)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium" dir="rtl">
                  الماضي البسيط في مواجهة الماضي المستمر: التكوين، الفارق الزمني، وأدوات الربط
                </p>
              </div>

              {/* Form & Syntax Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Past Simple Box */}
                <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#0B397D]">Past Simple (الماضي البسيط)</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">Completed Actions</span>
                  </div>
                  <div className="text-xs space-y-1.5 text-slate-700">
                    <div><strong>Affirmative Form:</strong> Regular (Verb + ed / d / ied) or Irregular Second Form (V2).</div>
                    <div><strong>Negative Form:</strong> Subject + didn’t + bare infinitive.</div>
                    <div><strong>Interrogative:</strong> Did + subject + bare infinitive?</div>
                    <div className="p-2.5 rounded-xl bg-white border border-blue-200/80 mt-2">
                      <strong className="text-[#0B397D] block mb-1">Key Signal Words (الكلمات الدالة):</strong>
                      yesterday, ago, in 1922, once, the other day, in ancient times, last (week/year).
                    </div>
                  </div>
                </div>

                {/* Past Continuous Box */}
                <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-amber-950">Past Continuous (الماضي المستمر)</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-950">Ongoing in Past</span>
                  </div>
                  <div className="text-xs space-y-1.5 text-slate-700">
                    <div><strong>Affirmative Form:</strong> Subject (I, he, she, it) + was + V-ing / (we, you, they) + were + V-ing.</div>
                    <div><strong>Negative Form:</strong> wasn’t / weren’t + V-ing.</div>
                    <div><strong>Interrogative:</strong> Was / Were + subject + V-ing?</div>
                    <div className="p-2.5 rounded-xl bg-white border border-amber-200 mt-2">
                      <strong className="text-amber-900 block mb-1">Key Signal Words (الكلمات الدالة):</strong>
                      while, as, just as, when, all day yesterday, at 7 PM last night, between 4 and 6 yesterday.
                    </div>
                  </div>
                </div>
              </div>

              {/* Interrupted vs. Parallel Actions */}
              <div className="space-y-3 pt-2">
                <h4 className="font-black text-sm text-[#0B397D] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0878E8]" />
                  <span>Interrupted Actions vs. Parallel Simultaneous Actions</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-[#0B397D] block">
                      1. Interrupted Action (حدث كان مستمراً وقطعه حدث آخر):
                    </span>
                    <div className="font-mono text-[11px] bg-white p-2 rounded-lg border border-slate-200 text-blue-900">
                      While / As / Just as + Past Continuous, Past Simple
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      "While the archaeological team <strong>were dusting</strong> the sarcophagus, they <strong>noticed</strong> an intact hieroglyphic seal."
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-[#0B397D] block">
                      2. Parallel Simultaneous Actions (حدثان مستمران في نفس الوقت):
                    </span>
                    <div className="font-mono text-[11px] bg-white p-2 rounded-lg border border-slate-200 text-blue-900">
                      While + Past Continuous, Past Continuous
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      "While Nada <strong>was reading</strong> about Hatshepsut, her brother <strong>was sketching</strong> the Karnak Temple pylons."
                    </p>
                  </div>
                </div>
              </div>

              {/* STATIVE VERBS RESTRICTION WARNING */}
              <div className="bg-gradient-to-r from-rose-50 via-red-50/50 to-rose-50 rounded-2xl border-2 border-rose-300 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                    !
                  </div>
                  <div>
                    <h5 className="font-black text-sm text-rose-950">
                      Strict Stative Verbs Restriction (أفعال الحالة والشعور والملكية)
                    </h5>
                    <p className="text-xs font-bold text-rose-800" dir="rtl">
                      أفعال لا تُستخدم إطلاقاً في الأزمنة المستمرة وتأتي في الماضي البسيط دائماً
                    </p>
                  </div>
                </div>

                <p className="text-xs text-rose-950 leading-relaxed">
                  Stative verbs (verbs of feeling, senses, emotion, cognition, possession, and being) <strong>CANNOT</strong> take continuous aspect (-ing), even when an action was ongoing or interrupted!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-white/90 p-3 rounded-xl border border-rose-200 space-y-1">
                    <span className="font-bold text-rose-700 block">✗ Common Mistakes in Exams:</span>
                    <div>✗ "While I was being at the museum..."</div>
                    <div>✗ "When he explained, I was understanding..."</div>
                    <div>✗ "Ancient Egyptians were possessing great astronomy..."</div>
                  </div>
                  <div className="bg-white/90 p-3 rounded-xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-700 block">✓ Official Correct Ministry Usage:</span>
                    <div>✓ "While I <strong>was</strong> at the museum, I met the curator."</div>
                    <div>✓ "When he explained, I <strong>understood</strong> the inscription."</div>
                    <div>✓ "Ancient Egyptians <strong>possessed</strong> immense knowledge."</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION B: HABITUAL PAST FORMATIONS */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0878E8]">
                  <span>Module Section B</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B397D] mt-1">
                  B. Habitual Past Formations (Crucial Differences: used to vs. would vs. be/get used to)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium" dir="rtl">
                  صيغ التعبير عن العادات السابقة والفروق الدقيقة بين used to و would و be used to
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. used to */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#0B397D]">1. used to + inf</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">Habits &amp; States</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Used for past habits or <strong>permanent past states</strong> that are NO LONGER true today.
                  </p>
                  <div className="text-xs space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                    <div>• <strong>Neg:</strong> didn’t use to + inf / never used to + inf.</div>
                    <div>• <strong>Q:</strong> Did you use to + inf?</div>
                    <div className="italic text-slate-700 pt-1">"My grandfather used to live near Luxor Temple, but now he lives in Giza."</div>
                  </div>
                </div>

                {/* 2. would */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-amber-950">2. would + inf</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-950">Actions ONLY</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Used for <strong>repeated past actions ONLY</strong>. It CANNOT be used with stative verbs (have, be, live, own, know).
                  </p>
                  <div className="text-xs space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                    <div>• <strong>Valid:</strong> "In summer, he would swim in the Nile."</div>
                    <div className="text-rose-700 font-semibold">• <strong>Trap:</strong> ✗ He would have a boat. (Incorrect: have is stative!)</div>
                    <div className="text-emerald-700 font-semibold">• <strong>Correct:</strong> ✓ He used to have a boat.</div>
                  </div>
                </div>

                {/* 3. be / get used to */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-emerald-950">3. be / get used to</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-950">+ Noun / V-ing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Expresses <strong>present familiarity</strong> (be used to) or <strong>adapting to a new routine</strong> (get used to).
                  </p>
                  <div className="text-xs space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                    <div>• "Egyptian farmers <strong>are used to working</strong> in hot weather."</div>
                    <div>• "The archaeologists soon <strong>got used to the desert climate</strong>."</div>
                    <div className="text-slate-500 text-[11px] pt-1">Notice: Followed by V-ing or noun!</div>
                  </div>
                </div>
              </div>

              {/* Tool Utility Contrast */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-[#0B397D]">Passive Utility Rule (الاستخدام كأداة):</span>
                <span><strong>be used to + inf</strong> OR <strong>be used for + V-ing</strong>: "Papyrus was used to record / for recording sacred texts."</span>
              </div>
            </section>

            {/* SECTION C: UNREAL PAST & SUBJUNCTIVE PATTERNS */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0878E8]">
                  <span>Module Section C</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B397D] mt-1">
                  C. Unreal Past &amp; Subjunctive Patterns (Wish / It’s time / Would rather)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium" dir="rtl">
                  الماضي غير الحقيقي: التعبير عن التمني في الحاضر والندم والتفضيل
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. It's time */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-black text-[#0B397D] text-sm block">1. It’s (high/about) time</span>
                  <div className="font-mono text-[11px] bg-white p-2 rounded-lg border border-slate-200 text-blue-900">
                    It’s time + Subject + Past Simple
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Means an action is overdue and should be happening right now.
                  </p>
                  <div className="italic text-slate-800 bg-white p-2 rounded-lg border border-slate-100">
                    "It’s high time we <strong>restored</strong> the old historic houses in Islamic Cairo."
                  </div>
                </div>

                {/* 2. I'd rather */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-black text-[#0B397D] text-sm block">2. I’d rather (Preference)</span>
                  <div className="font-mono text-[11px] bg-white p-2 rounded-lg border border-slate-200 text-blue-900">
                    I’d rather + Subject + Past Simple
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Expresses preference about another person's current behavior.
                  </p>
                  <div className="italic text-slate-800 bg-white p-2 rounded-lg border border-slate-100">
                    "I’d rather you <strong>didn’t touch</strong> the ancient pottery without gloves."
                  </div>
                  <div className="text-[10px] text-amber-800 font-bold">
                    No second subject: I’d rather <strong>visit</strong> the museum. (Bare infinitive)
                  </div>
                </div>

                {/* 3. I wish / If only */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-black text-[#0B397D] text-sm block">3. I wish / If only</span>
                  <div className="font-mono text-[11px] bg-white p-2 rounded-lg border border-slate-200 text-blue-900">
                    Wish + Subject + Past Simple
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Expresses a wish contrary to present reality.
                  </p>
                  <div className="italic text-slate-800 bg-white p-2 rounded-lg border border-slate-100">
                    "I wish I <strong>knew</strong> how to read ancient hieroglyphics." (Present wish)
                  </div>
                  <div className="text-[10px] text-blue-700 font-bold">
                    Past regret: Wish + <strong>had + P.P.</strong> ("I wish I had studied harder").
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION D: HIGH-ORDER EXAM TRAPS (HOTS & MINISTRY PATTERNS) */}
            <section className="bg-gradient-to-r from-amber-50/90 via-orange-50/40 to-amber-50/90 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-6">
              <div className="border-b border-amber-300/80 pb-4 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-[#0B397D] flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                    ⚠️
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0B397D]">
                      D. High-Order Exam Traps (HOTS &amp; Tricky Ministry Patterns)
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-amber-900" dir="rtl">
                      أهم التريكات ونقاط الامتحانات الوزارية لطلاب الثانوية المتميزين
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-amber-950 bg-amber-200 px-3 py-1 rounded-full border border-amber-300">
                  Guaranteed Ministerial Questions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Trap 1: During vs. While */}
                <div className="bg-white rounded-2xl p-5 border border-amber-200 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#0B397D]">Trap 1: During vs. While + V-ing</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Preposition vs Conjunction</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>"During"</strong> is strictly followed by a <strong>Noun Phrase</strong>, never a verb or V-ing! <strong>"While"</strong> can take V-ing without a subject ONLY when the subjects of both clauses are identical.
                  </p>
                  <div className="text-xs space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
                    <div>✓ "<strong>During the match</strong>, it started raining." (NOT: While the match...)</div>
                    <div>✓ "<strong>While watching</strong> the match, Ali ate popcorn." (Ali is doing both!)</div>
                    <div className="text-rose-700">✗ "While driving home, a dog barked." (Faulty dangling participle!)</div>
                  </div>
                </div>

                {/* Trap 2: On + V-ing */}
                <div className="bg-white rounded-2xl p-5 border border-amber-200 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#0B397D]">Trap 2: On + V-ing (Instant Actions)</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Sudden Reaction</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>"On + V-ing"</strong> indicates an instantaneous, immediate reaction, meaning <em>"As soon as + subject + Past Simple"</em>.
                  </p>
                  <div className="text-xs space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
                    <div>✓ "<strong>On seeing</strong> the golden funeral mask, the visitors gasped in awe."</div>
                    <div className="text-slate-500">= "As soon as they saw the golden mask..."</div>
                  </div>
                </div>

                {/* Trap 3: Negative Inversions */}
                <div className="bg-white rounded-2xl p-5 border border-amber-200 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#0B397D]">Trap 3: Negative Inversions (Hardly / No sooner)</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Inverted Question Order</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    When starting with negative adverbs, invert the subject and auxiliary verb into question form:
                  </p>
                  <div className="text-xs space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200 font-mono text-[11px]">
                    <div>• <strong>No sooner had</strong> + Subj + P.P. ... <strong>THAN</strong> ...</div>
                    <div>• <strong>Hardly / Scarcely had</strong> + Subj + P.P. ... <strong>WHEN</strong> ...</div>
                    <div className="font-sans italic text-slate-800 pt-1">"No sooner <strong>had the museum opened</strong> than tourists crowded in."</div>
                  </div>
                </div>

                {/* Trap 4: Subject-Verb Agreement */}
                <div className="bg-white rounded-2xl p-5 border border-amber-200 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#0B397D]">Trap 4: Compound Subjects &amp; Modifiers</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">First Subject Concord</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Phrases like <em>"as well as", "together with", "along with"</em> match the <strong>FIRST</strong> subject only!
                  </p>
                  <div className="text-xs space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
                    <div>✓ "The professor, as well as his students, <strong>was</strong> attending the lecture."</div>
                    <div className="text-rose-700">✗ "The professor, as well as his students, were attending..." (Incorrect!)</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Dynamic Grammar Masterclass for All Other Stages and Units */
          <div className="space-y-6">
            {unit.grammarModule.detailedRules && unit.grammarModule.detailedRules.length > 0 ? (
              unit.grammarModule.detailedRules.map((section, sIdx) => (
                <section key={sIdx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#0B397D] text-[#FFC928] font-black text-xs flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-[#0B397D]">
                        {section.title}
                      </h3>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0878E8] border border-blue-100">
                      {unit.stage} • {unit.gradeLabel.split(' - ')[0]}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0B397D] flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>Rule Framework &amp; Pedagogical Strategy (القاعدة والشرح):</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                      {section.explanation}
                    </p>
                  </div>

                  {section.examples && section.examples.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Curriculum Models &amp; Practical Applications (أمثلة وتطبيقات تفاعلية):</span>
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {section.examples.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-[#0878E8] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {exIdx + 1}
                            </span>
                            <span className="leading-relaxed">{ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))
            ) : (
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-black text-[#0B397D]">
                  {unit.grammarModule.ruleName}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {unit.grammarModule.explanationSummary}
                </p>
              </section>
            )}
          </div>
        )}

            {/* INTERACTIVE HOTS GRAMMAR WORKOUT */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B397D] flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#0878E8]" />
                    <span>Comprehensive HOTS Grammar Workout ({unit.grammarModule.exercises.length} Questions)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium" dir="rtl">
                    تدريبات تفاعلية وتطبيقية على كافة نقاط القاعدة مع التقييم الفوري والشرح
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Instant Feedback Active
                </span>
              </div>

              <div className="space-y-4">
                {unit.grammarModule.exercises.map((q, qIdx) => {
                  const userChoice = exerciseAnswers[q.id];
                  const isRevealed = exerciseRevealed[q.id];
                  const isCorrect = userChoice === q.correctAnswer;

                  return (
                    <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 text-xs sm:text-sm">
                      <div className="font-bold text-slate-900 leading-relaxed">
                        <span className="inline-block w-6 h-6 rounded-lg bg-blue-100 text-[#0B397D] font-black text-xs text-center leading-6 mr-2 shrink-0">
                          {qIdx + 1}
                        </span>
                        {q.question}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                              className={`p-3 rounded-xl border text-left font-medium transition-all cursor-pointer flex items-center gap-2.5 ${btnStyle}`}
                            >
                              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                                {letter}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {isRevealed && (
                        <div className={`p-4 rounded-xl text-xs leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                            : 'bg-rose-50 text-rose-900 border border-rose-200'
                        }`}>
                          <span className="font-black text-sm block mb-1">
                            {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect (Correct Answer: Option ${q.correctAnswer})`}
                          </span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ======================================================
            TAB 3: PRESCRIBED LITERATURE & CRITICAL THINKING (HOTS)
           ====================================================== */}
        {activeTab === 'literature' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* If literature module is not available for this unit */}
            {!unit.literatureModule ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-[#0B397D]">
                  Prescribed Literature Module
                </h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  The prescribed literature study guide is mapped to General Secondary (Term 1):
                  <br />
                  <strong className="text-slate-800">• Secondary 1:</strong> Ernest Hemingway’s <em>The Old Man and the Sea</em>
                  <br />
                  <strong className="text-slate-800">• Secondary 2:</strong> William Shakespeare’s <em>King Lear</em>
                  <br />
                  <strong className="text-slate-800">• Secondary 3:</strong> Charles Dickens’ <em>Great Expectations</em>
                </p>
              </div>
            ) : (
              <>
                {/* 1. Header Banner */}
                <div className="bg-gradient-to-r from-[#07224D] via-[#0B397D] to-[#0878E8] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                  <div className="relative z-10 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC928] text-[#0B397D] text-xs font-black uppercase tracking-wider shadow-xs">
                        <BookOpen className="w-3.5 h-3.5" />
                        Official Prescribed Literature Reader
                      </span>
                      <span className="text-xs text-blue-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                        {unit.literatureModule.author}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                      <h2 className="text-2xl sm:text-3xl font-black text-white">
                        {unit.literatureModule.workTitle}
                      </h2>
                      <span className="text-lg sm:text-xl font-bold text-[#FFC928]" dir="rtl">
                        {unit.literatureModule.workTitleAr}
                      </span>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15">
                      <div className="text-sm sm:text-base font-extrabold text-white">
                        {unit.literatureModule.chapterTitle}
                      </div>
                      <div className="text-xs sm:text-sm text-blue-200 mt-0.5" dir="rtl">
                        {unit.literatureModule.chapterTitleAr}
                      </div>
                    </div>

                    {/* Central Themes Badges */}
                    {unit.literatureModule.centralThemes && unit.literatureModule.centralThemes.length > 0 && (
                      <div className="pt-2">
                        <div className="text-xs font-bold text-amber-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Central Themes &amp; Philosophical Conflict (المحاور الدرامية)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {unit.literatureModule.centralThemes.map((thm, tIdx) => (
                            <div key={tIdx} className="bg-black/20 p-3 rounded-xl border border-white/10 space-y-1">
                              <div className="flex items-center justify-between text-xs font-bold text-white">
                                <span>{thm.theme}</span>
                                <span className="text-amber-300" dir="rtl">{thm.themeAr}</span>
                              </div>
                              <p className="text-[11px] text-blue-100 leading-relaxed font-light">
                                {thm.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Key Literary Vocabulary (8-10 items) */}
                <section className="space-y-4">
                  <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                    <h3 className="text-lg font-black text-[#0B397D] flex items-center gap-2">
                      <Bookmark className="w-5 h-5 text-[#0878E8]" />
                      <span>Key Chapter Lexis &amp; Literary Terms</span>
                      <span className="text-xs font-normal text-slate-500" dir="rtl">/ معجم النص الأدبي والمصطلحات المقررة</span>
                    </h3>
                    <span className="text-xs text-slate-400">({unit.literatureModule.keyVocabulary.length} Terms)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {unit.literatureModule.keyVocabulary.map((wordObj, wIdx) => (
                      <div
                        key={wIdx}
                        className="bg-white rounded-2xl border border-slate-200 hover:border-[#0878E8]/50 p-4.5 space-y-2.5 shadow-2xs hover:shadow-xs transition-all group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-[#0B397D] group-hover:text-[#0878E8] transition-colors">
                              {wordObj.word}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                              {wordObj.pos}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg" dir="rtl">
                              {wordObj.meaningAr}
                            </span>
                            <button
                              onClick={() => speakWord(wordObj.word)}
                              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                playingWord === wordObj.word
                                  ? 'bg-amber-400 text-[#0B397D] scale-110'
                                  : 'bg-slate-100 hover:bg-blue-100 text-[#0878E8]'
                              }`}
                              title={`Listen to "${wordObj.word}"`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {wordObj.meaningEn}
                        </p>

                        {wordObj.contextSentence && (
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700 italic">
                            <strong className="text-[#0B397D] not-italic mr-1">Literary Context:</strong>
                            "{wordObj.contextSentence}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Chapter Synopsis & Deep Thematic Analysis */}
                <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
                  <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                    <h3 className="text-lg font-black text-[#0B397D] flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#0878E8]" />
                      <span>Chapter Synopsis &amp; Narrative Dynamics</span>
                      <span className="text-xs font-normal text-slate-500" dir="rtl">/ الملخص والتحليل الدرامي للأحداث</span>
                    </h3>
                    <span className="text-xs text-[#0878E8] font-bold bg-blue-50 px-2.5 py-1 rounded-lg">
                      Egyptian MOE Focus
                    </span>
                  </div>

                  <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <span className="text-xs font-extrabold text-[#0B397D] uppercase tracking-wide">
                        English Synopsis &amp; Plot Trajectory:
                      </span>
                      <p className="font-normal">{unit.literatureModule.synopsis}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-1.5 text-right" dir="rtl">
                      <span className="text-xs font-extrabold text-[#0B397D] uppercase tracking-wide block">
                        ملخص الأحداث والدلالات الدرامية بالعربية:
                      </span>
                      <p className="font-medium text-slate-800 leading-relaxed">
                        {unit.literatureModule.synopsisAr}
                      </p>
                    </div>
                  </div>
                </section>

                {/* 4. Critical Thinking HOTS Questions (Ministry Exam Specifications) */}
                <section className="space-y-4">
                  <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-[#0B397D] flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#FFC928]" />
                        <span>Critical Thinking Questions (HOTS)</span>
                        <span className="text-xs font-normal text-slate-500" dir="rtl">/ أسئلة التفكير النقدي والتحليل الأدبي</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Aligned with Egyptian Ministry Thanaweya Amma rubrics: requires quotation evaluation, thematic reasoning, and personal judgment.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full shrink-0">
                      High-Stakes Specs
                    </span>
                  </div>

                  <div className="space-y-5">
                    {unit.literatureModule.hotsQuestions.map((hq, qIndex) => {
                      const isOpened = revealedHots[hq.id];

                      return (
                        <div
                          key={hq.id}
                          className="bg-white rounded-3xl border border-slate-200 hover:border-blue-300 p-6 space-y-4 shadow-xs transition-all"
                        >
                          {/* Top Badges */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-xl bg-[#0B397D] text-[#FFC928] font-black text-xs flex items-center justify-center shadow-xs">
                                Q{qIndex + 1}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-[#0B397D] font-bold text-xs border border-blue-100">
                                Focus: {hq.focusTheme}
                              </span>
                            </div>
                            <span className="text-[11px] font-bold text-slate-400 font-mono">
                              Ministry Rubric Criteria: {hq.rubricCriteria.length} Points
                            </span>
                          </div>

                          {/* Quotation Box if available */}
                          {hq.quotation && (
                            <div className="bg-amber-50/70 border-l-4 border-[#FFC928] p-4 rounded-r-2xl space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 uppercase tracking-wide">
                                <Quote className="w-3.5 h-3.5 text-amber-600" />
                                <span>Key Dramatic Quotation / اقتباس من النص:</span>
                              </div>
                              <blockquote className="text-xs sm:text-sm text-slate-800 font-serif italic leading-relaxed">
                                “{hq.quotation}”
                              </blockquote>
                            </div>
                          )}

                          {/* Question Prompt */}
                          <div className="space-y-1.5">
                            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                              {hq.question}
                            </h4>
                            {hq.questionAr && (
                              <div className="text-xs sm:text-sm text-slate-600 font-medium text-right leading-relaxed" dir="rtl">
                                {hq.questionAr}
                              </div>
                            )}
                          </div>

                          {/* Toggle Button for Model Answer & Rubric */}
                          <div className="pt-2">
                            <button
                              onClick={() => toggleHots(hq.id)}
                              className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-between cursor-pointer ${
                                isOpened
                                  ? 'bg-[#0B397D] text-white shadow-sm'
                                  : 'bg-slate-100 text-[#0B397D] hover:bg-blue-50 hover:text-blue-900 border border-slate-200'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <Lightbulb className={`w-4 h-4 ${isOpened ? 'text-[#FFC928]' : 'text-amber-500'}`} />
                                <span>{isOpened ? 'Hide Model Answer & Rubric' : 'Reveal Model Answer & Ministry Rubric / عرض الإجابة النموذجية ومعايير التصحيح'}</span>
                              </span>
                              {isOpened ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>

                            {/* Collapsible Model Answer & Rubric */}
                            {isOpened && (
                              <div className="mt-3 bg-gradient-to-br from-blue-50/80 to-slate-50 p-5 rounded-2xl border border-blue-200 space-y-4 animate-in fade-in duration-200">
                                {/* English Model Answer */}
                                <div className="space-y-1">
                                  <div className="text-xs font-black text-[#0B397D] uppercase tracking-wide flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    <span>Model Analytical Answer (High-Distinction Standard):</span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal bg-white p-3.5 rounded-xl border border-slate-200/70">
                                    {hq.modelAnswer}
                                  </p>
                                </div>

                                {/* Arabic Model Answer */}
                                {hq.modelAnswerAr && (
                                  <div className="space-y-1 text-right" dir="rtl">
                                    <span className="text-xs font-bold text-blue-950 block">
                                      صياغة الإجابة النموذجية بالعربية:
                                    </span>
                                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/70">
                                      {hq.modelAnswerAr}
                                    </p>
                                  </div>
                                )}

                                {/* Rubric Criteria Checklist */}
                                <div className="pt-2 border-t border-blue-200/60 space-y-2">
                                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-[#0878E8]" />
                                    <span>Ministry Examination Assessment Rubric (معايير توزيع الدرجات):</span>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {hq.rubricCriteria.map((crit, cIdx) => (
                                      <div
                                        key={cIdx}
                                        className="flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200"
                                      >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                        <span>{crit}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </>
            )}
          </div>
        )}

        {/* ======================================================
            TAB 4: WRITING, TRANSLATION & SKILLS BOOSTER
           ====================================================== */}
        {activeTab === 'skills' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header Hero Banner */}
            <div className="bg-gradient-to-r from-[#07224D] via-[#0B397D] to-[#0878E8] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-amber-300 border border-white/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isPrepStage
                      ? 'Official Preparatory MOE Skills Guide (New Hello 2026/2027)'
                      : 'Official Ministry Examination Specifications (2026/2027)'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {isPrepStage
                    ? 'Preparatory Skills Builder: Dialogue & Paragraph Writing'
                    : 'Writing, Translation & High-Order Skills Booster'}
                </h2>
                <p className="text-sm sm:text-base text-blue-100 font-medium" dir="rtl">
                  {isPrepStage
                    ? 'دليل إتقان المهارات الإعدادية: حل سؤال المحادثة، المواقف اللغوية، وصياغة الفقرة والإيميل (90-110 كلمة)'
                    : 'دليل إتقان المهارات: علامات الترقيم وأفخاخ الامتحانات، هيكل المقال الأكاديمي (14 درجة)، والترجمة السياقية'}
                </p>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-3xl">
                  {isPrepStage
                    ? 'Targeted preparatory competencies covering dialogue turn-taking (forming Wh-questions and Yes/No responses), situational expressions, and structured 90-110 word paragraph formulation.'
                    : 'Essential ministerial skill competencies covering punctuation mechanics, the PEEL essay construction framework, and 5 contextual translations with official grading criteria.'}
                </p>
              </div>
            </div>

            {/* Skills Segmented Sub-Navbar */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => setSkillsSubTab('punctuation')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  skillsSubTab === 'punctuation'
                    ? 'bg-white text-[#0B397D] shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#0878E8]" />
                <span>
                  {isPrepStage
                    ? '1. Dialogue & Punctuation (المحادثة والترقيم)'
                    : '1. Punctuation Rules & Traps (علامات الترقيم)'}
                </span>
              </button>

              <button
                onClick={() => setSkillsSubTab('essay')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  skillsSubTab === 'essay'
                    ? 'bg-white text-[#0B397D] shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {isPrepStage
                    ? '2. Paragraph / Email Blueprint (فقرة 90-110 كلمة)'
                    : '2. Essay Structure Blueprint (هيكل المقال)'}
                </span>
              </button>

              <button
                onClick={() => setSkillsSubTab('translation')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  skillsSubTab === 'translation'
                    ? 'bg-white text-[#0B397D] shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                  {isPrepStage
                    ? '3. Language Functions & Context (المواقف اللغوية)'
                    : '3. Contextual Translation (الترجمة السياقية)'}
                </span>
              </button>
            </div>

            {/* ========================================================
                SUBTAB 1: PUNCTUATION MARKS & EXAM TRAPS
               ======================================================== */}
            {skillsSubTab === 'punctuation' && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#0B397D] flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#0878E8]" />
                      <span>Punctuation Mechanics &amp; Common Exam Traps</span>
                    </h3>
                    <p className="text-xs text-slate-500" dir="rtl">
                      القواعد الرسمية لعلامات الترقيم مع التركيز على الأسئلة الخداعية في امتحانات البوكليت
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                    High-Stakes Specs
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {secondaryPunctuationRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4"
                    >
                      {/* Rule Header */}
                      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0B397D] to-[#0878E8] text-white font-mono font-black text-lg flex items-center justify-center shadow-xs">
                            {rule.symbol}
                          </span>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-[#0B397D]">
                              {rule.name}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium" dir="rtl">
                              {rule.nameAr}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Usage Rules */}
                      <div className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                          Official Ministry Usage Rules:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {rule.usageRules.map((usage, uIdx) => (
                            <li key={uIdx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{usage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Exam Traps Box */}
                      {rule.examTraps && rule.examTraps.length > 0 && (
                        <div className="pt-2 space-y-3">
                          <span className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            <span>High-Frequency Ministerial Exam Traps (أفخاخ الامتحانات):</span>
                          </span>

                          <div className="grid grid-cols-1 gap-3">
                            {rule.examTraps.map((trap, tIdx) => (
                              <div
                                key={tIdx}
                                className="bg-rose-50/40 border border-rose-200 rounded-2xl p-4 space-y-2.5"
                              >
                                <span className="font-bold text-xs text-rose-950 block">
                                  ⚠️ {trap.trapTitle}
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                  <div className="bg-white p-2.5 rounded-xl border border-rose-200 text-rose-900 space-y-1">
                                    <span className="font-black text-[10px] uppercase text-rose-700 block">✗ Common Student Error:</span>
                                    <p className="font-mono text-[11px]">{trap.incorrect}</p>
                                  </div>
                                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                                    <span className="font-black text-[10px] uppercase text-emerald-700 block">✓ Correct Ministerial Form:</span>
                                    <p className="font-mono text-[11px] font-bold">{trap.correct}</p>
                                  </div>
                                </div>

                                <p className="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                                  <strong className="text-[#0B397D]">Examiner's Rule:</strong> {trap.explanation}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================
                SUBTAB 2: ESSAY STRUCTURE BLUEPRINT (14 MARKS)
               ======================================================== */}
            {skillsSubTab === 'essay' && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#0B397D] flex items-center gap-2">
                      <PenTool className="w-5 h-5 text-amber-500" />
                      <span>{secondaryEssayGuide.sectionTitle}</span>
                    </h3>
                    <p className="text-xs text-slate-500" dir="rtl">
                      {secondaryEssayGuide.sectionTitleAr}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    14 Marks Allocated
                  </span>
                </div>

                {/* 1. Hook Strategies */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-xs">
                      1
                    </span>
                    <div>
                      <h4 className="text-base font-black text-[#0B397D]">
                        The Essay Hook / Lead (جملة جذب الانتباه في المقدمة)
                      </h4>
                      <p className="text-xs text-slate-500">The first sentence must captivate the examiner's interest immediately.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {secondaryEssayGuide.hookStrategies.map((hook, hIdx) => (
                      <div key={hIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <span className="font-bold text-xs text-[#0B397D] block">
                          {hook.type}
                        </span>
                        <span className="text-[10px] text-slate-500 block font-medium" dir="rtl">
                          ({hook.typeAr})
                        </span>
                        <div className="text-xs text-slate-800 font-serif italic bg-white p-2.5 rounded-xl border border-slate-200">
                          {hook.example}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-light">
                          💡 {hook.tips}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Thesis Statement Formula */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50/70 rounded-3xl border-2 border-blue-200 p-6 sm:p-7 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#0B397D] text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2
                    </span>
                    <div>
                      <h4 className="text-base font-black text-[#0B397D]">
                        The Thesis Statement Formula (الجملة الخبرية المحورية)
                      </h4>
                      <p className="text-xs text-slate-600">The most important sentence in the entire essay, placed at the end of Paragraph 1.</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {secondaryEssayGuide.thesisFormula.description}
                  </p>

                  <div className="bg-white p-3 rounded-xl border border-blue-200 font-mono text-xs text-blue-900 font-bold">
                    Formula: {secondaryEssayGuide.thesisFormula.formula}
                  </div>

                  <div className="bg-blue-100/60 p-3 rounded-xl border border-blue-200 text-xs text-blue-950 font-serif italic">
                    <strong className="not-italic font-sans font-bold text-[#0B397D] mr-1">Model Example:</strong>
                    {secondaryEssayGuide.thesisFormula.example}
                  </div>
                </div>

                {/* 3. PEEL Body Paragraph Framework */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3
                    </span>
                    <div>
                      <h4 className="text-base font-black text-[#0B397D]">
                        The PEEL Body Paragraph Model (بناء الفقرات الأساسية)
                      </h4>
                      <p className="text-xs text-slate-500">Ministry graders award top marks for paragraphs adhering to the PEEL cohesion formula.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {secondaryEssayGuide.paragraphPEEL.map((item, pIdx) => (
                      <div key={pIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="w-7 h-7 rounded-xl bg-[#0B397D] text-[#FFC928] font-black text-xs flex items-center justify-center">
                            {item.letter}
                          </span>
                          <span className="font-bold text-xs text-slate-800">
                            {item.meaning} <span className="font-medium text-slate-500" dir="rtl">({item.meaningAr})</span>
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.explanation}
                        </p>
                        <div className="text-xs text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200 italic">
                          <strong className="text-[#0B397D] not-italic mr-1">Example:</strong>
                          "{item.example}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Categorized Transition Words */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#0878E8] text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4
                    </span>
                    <div>
                      <h4 className="text-base font-black text-[#0B397D]">
                        Academic Transition Words Catalog (أدوات الربط والتماسك اللغوي)
                      </h4>
                      <p className="text-xs text-slate-500">Essential for achieving the highest score (4/4) in cohesion and organization.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {secondaryEssayGuide.transitionCategories.map((cat, cIdx) => (
                      <div key={cIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <span className="font-bold text-xs text-[#0B397D] block">
                          {cat.category}
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {cat.words.map((w, wIdx) => (
                            <span
                              key={wIdx}
                              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-medium"
                            >
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                SUBTAB 3: CONTEXTUAL TRANSLATION (5 SENTENCES)
               ======================================================== */}
            {skillsSubTab === 'translation' && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#0B397D] flex items-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-500" />
                      <span>Contextual Translation Masterclass (5 High-Stakes Sentences)</span>
                    </h3>
                    <p className="text-xs text-slate-500" dir="rtl">
                      نماذج امتحانية معتمدة تغطي التحول الأخضر، الذكاء الاصطناعي، المشروعات القومية، وحفظ التراث
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    5 Ministerial Pairs
                  </span>
                </div>

                <div className="space-y-5">
                  {secondaryTranslationExercises.map((item, idx) => {
                    const isRevealed = revealedTranslations[item.id];
                    const isCopied = copiedText === item.id;

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-3xl border border-slate-200 hover:border-blue-300 p-6 space-y-4 shadow-xs transition-all"
                      >
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-xl bg-[#0B397D] text-[#FFC928] font-black text-xs flex items-center justify-center shadow-xs">
                              #{idx + 1}
                            </span>
                            <span
                              className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                                item.direction === 'en_to_ar'
                                  ? 'bg-blue-100 text-[#0B397D] border border-blue-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              {item.direction === 'en_to_ar' ? 'English ➔ Arabic (ترجم إلى العربية)' : 'Arabic ➔ English (ترجم إلى الإنجليزية)'}
                            </span>
                          </div>

                          <button
                            onClick={() => copyToClipboard(item.sourceText, item.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                            title="Copy sentence"
                          >
                            {isCopied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span className="text-[10px] hidden sm:inline">{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Source Sentence Box */}
                        <div
                          className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 leading-relaxed"
                          dir={item.direction === 'ar_to_en' ? 'rtl' : 'ltr'}
                        >
                          “{item.sourceText}”
                        </div>

                        {/* Key Vocabulary Chips */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            Key Vocabulary Aids (المفردات المفتاحية للترجمة):
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {item.keyVocabulary.map((kv, kvIdx) => (
                              <span
                                key={kvIdx}
                                className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center gap-1.5"
                              >
                                <strong className="font-bold">{kv.en}:</strong>
                                <span className="text-amber-800" dir="rtl">{kv.ar}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Reveal Toggle Button */}
                        <button
                          onClick={() => toggleTranslationReveal(item.id)}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                            isRevealed
                              ? 'bg-[#0B397D] text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-blue-50 text-[#0B397D] border border-slate-200'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <Lightbulb className={`w-4 h-4 ${isRevealed ? 'text-[#FFC928]' : 'text-amber-500'}`} />
                            <span>{isRevealed ? 'Hide Model Answer' : 'Reveal Model Answer & Grammar Notes (عرض الإجابة النموذجية)'}</span>
                          </span>
                          {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {/* Model Answer & Grammar Analysis Box */}
                        {isRevealed && (
                          <div className="bg-gradient-to-br from-emerald-50/70 via-blue-50/50 to-slate-50 p-5 rounded-2xl border border-emerald-200 space-y-3 animate-in fade-in duration-200">
                            <div>
                              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block mb-1">
                                ✓ Official Model Translation (الترجمة النموذجية):
                              </span>
                              <div
                                className="bg-white p-3.5 rounded-xl border border-emerald-200 text-sm font-bold text-slate-900 leading-relaxed shadow-2xs"
                                dir={item.direction === 'en_to_ar' ? 'rtl' : 'ltr'}
                              >
                                {item.modelAnswer}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                              <div className="bg-white p-3 rounded-xl border border-blue-200 text-blue-950 space-y-1">
                                <span className="font-bold text-[#0B397D] block">Syntactic &amp; Grammatical Notes:</span>
                                <p className="leading-relaxed">{item.grammaticalNotes}</p>
                              </div>
                              <div className="bg-white p-3 rounded-xl border border-rose-200 text-rose-950 space-y-1">
                                <span className="font-bold text-rose-700 block">⚠️ Common Exam Pitfall to Avoid:</span>
                                <p className="leading-relaxed">{item.commonPitfall}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================
          4. BOTTOM STICKY ACTION BAR (Full-Screen Bottom Fixed)
         ======================================================== */}
      <footer className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg shrink-0">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
          <span>Back to Units / العودة للوحدات</span>
        </button>

        {onTakeExam && unit.unitExam && (
          <button
            onClick={() => {
              onClose();
              onTakeExam(unit.unitExam);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Award className="w-4 h-4 text-amber-300 fill-current" />
            <span>Take 30-Min Unit Exam (بدء امتحان الوحدة)</span>
          </button>
        )}
      </footer>
    </div>
  );
};
