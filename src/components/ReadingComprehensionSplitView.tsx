import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  FileText,
  Split,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  HelpCircle,
  Eye,
  X
} from 'lucide-react';
import { ReadingSection, QuestionMCQ } from '../types.ts';
import { QuestionCard } from './QuestionCard.tsx';

interface ReadingComprehensionSplitViewProps {
  reading: ReadingSection;
  allReadingPassages?: ReadingSection[];
  selectedAnswers: { [qId: string]: number[] };
  onSelectOption?: (questionId: string, optionIndex: number, isMrq: boolean) => void;
  onSpeakText?: (text: string) => void;
  isReviewMode?: boolean;
}

export const ReadingComprehensionSplitView: React.FC<ReadingComprehensionSplitViewProps> = ({
  reading,
  allReadingPassages,
  selectedAnswers,
  onSelectOption,
  onSpeakText,
  isReviewMode = false,
}) => {
  // Mobile tab state: 'passage' or 'questions'
  const [mobileTab, setMobileTab] = useState<'passage' | 'questions'>('passage');
  // Secondary passage tab index if multiple passages exist
  const [activePassageIndex, setActivePassageIndex] = useState<number>(0);
  // Floating passage drawer for mobile screens
  const [showMobilePassageDrawer, setShowMobilePassageDrawer] = useState<boolean>(false);

  const passagesList = (allReadingPassages && allReadingPassages.length > 0)
    ? allReadingPassages
    : [reading];

  const currentPassage = passagesList[activePassageIndex] || reading;
  const questionsToDisplay = currentPassage.questions?.length > 0
    ? currentPassage.questions
    : reading.questions;

  // Approximate word count
  const wordCount = currentPassage.wordCount || currentPassage.passageText.split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Mobile Tab Switcher (< lg) */}
      <div className="flex lg:hidden items-center justify-between bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => setMobileTab('passage')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'passage'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>📖 Reading Passage</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('questions')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'questions'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>📝 Questions ({questionsToDisplay.length})</span>
        </button>
      </div>

      {/* Split-View Container (Side-by-Side on Desktop, Tabbed on Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================
            LEFT COLUMN: PASSAGE PANEL (Sticky on Desktop)
           ======================================================== */}
        <div
          className={`lg:col-span-6 xl:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col ${
            mobileTab === 'passage' ? 'block' : 'hidden lg:flex'
          } lg:sticky lg:top-20 max-h-[82vh] overflow-hidden`}
        >
          {/* Passage Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 space-y-3 shrink-0">
            {/* Multiple Passages Navigation Tabs (if dual passages) */}
            {passagesList.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {passagesList.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePassageIndex(idx)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activePassageIndex === idx
                        ? 'bg-blue-900 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>Passage {idx + 1}: {p.passageType === 'factual' ? 'Factual / Narrative' : 'Analytical'}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-blue-900">
                    {currentPassage.passageType === 'analytical'
                      ? 'Analytical Expository'
                      : currentPassage.passageType === 'dual_synthesis'
                        ? 'Dual-Text Synthesis'
                        : 'MOE Standard Passage'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {wordCount} words
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentPassage.passageTitle}
                </h3>
                {currentPassage.passageTitleAr && (
                  <div className="text-xs text-slate-500 font-medium" dir="rtl">
                    {currentPassage.passageTitleAr}
                  </div>
                )}
              </div>

              {/* Text-to-speech listener button */}
              {onSpeakText && (
                <button
                  type="button"
                  onClick={() => onSpeakText(currentPassage.passageText)}
                  className="px-3 py-1.5 text-xs text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 flex items-center gap-1.5 font-bold transition-colors cursor-pointer shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              )}
            </div>
          </div>

          {/* Passage Scrollable Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-800 leading-relaxed font-serif text-sm sm:text-base">
            <div className="whitespace-pre-line border-l-2 border-blue-900/30 pl-4 py-1">
              {currentPassage.passageText}
            </div>

            {/* Baccalaureate Dual Perspective (Passage B) if present */}
            {currentPassage.secondaryPassage && (
              <div className="mt-6 pt-5 border-t border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                    {currentPassage.secondaryPassage.perspective}
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {currentPassage.secondaryPassage.title}
                  </span>
                </div>
                <div className="text-sm font-serif leading-relaxed text-slate-700 bg-purple-50/40 p-4 rounded-xl border border-purple-200/50 whitespace-pre-line">
                  {currentPassage.secondaryPassage.text}
                </div>
              </div>
            )}
          </div>

          {/* Quick jump to questions on mobile */}
          <div className="p-3 border-t border-slate-100 bg-slate-50 flex lg:hidden justify-end">
            <button
              type="button"
              onClick={() => setMobileTab('questions')}
              className="text-xs font-bold text-blue-900 flex items-center gap-1 hover:underline"
            >
              <span>Proceed to Questions</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: QUESTIONS STREAM
           ======================================================== */}
        <div
          className={`lg:col-span-6 xl:col-span-5 space-y-4 ${
            mobileTab === 'questions' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-900" />
              <span>Passage Analytical Questions ({questionsToDisplay.length})</span>
            </div>
            
            {/* Mobile "Open Passage Drawer" Trigger */}
            <button
              type="button"
              onClick={() => setShowMobilePassageDrawer(true)}
              className="lg:hidden text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View Passage</span>
            </button>
          </div>

          {questionsToDisplay.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              selectedAnswers={selectedAnswers[q.id] || []}
              onSelectOption={onSelectOption}
              onSpeakText={onSpeakText}
              isReviewMode={isReviewMode}
            />
          ))}
        </div>
      </div>

      {/* Floating Bottom Drawer for Mobile Quick Passage Reference */}
      {showMobilePassageDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end lg:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl max-h-[75vh] flex flex-col shadow-2xl border-t border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-3xl">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-900" />
                <span>Reference Passage</span>
              </div>
              <button
                type="button"
                onClick={() => setShowMobilePassageDrawer(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto text-sm text-slate-800 leading-relaxed font-serif whitespace-pre-line space-y-3">
              <h4 className="font-bold font-sans text-blue-950 text-base">{currentPassage.passageTitle}</h4>
              <p>{currentPassage.passageText}</p>
              {currentPassage.secondaryPassage && (
                <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200 text-xs">
                  <div className="font-bold text-purple-900 pb-1">{currentPassage.secondaryPassage.title}</div>
                  <p>{currentPassage.secondaryPassage.text}</p>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowMobilePassageDrawer(false)}
                className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
              >
                Back to Questions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
