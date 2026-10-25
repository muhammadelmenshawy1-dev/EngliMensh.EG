import React, { useState } from 'react';
import {
  Lightbulb,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  X,
  Sparkles,
  AlertTriangle,
  Flame,
  ShieldAlert,
} from 'lucide-react';
import { QuestionMCQ } from '../types.ts';

interface QuestionCardProps {
  question: QuestionMCQ;
  index: number;
  selectedAnswers: number[];
  onSelectOption?: (questionId: string, optionIndex: number, isMrq: boolean) => void;
  isReviewMode?: boolean;
  onSpeakText?: (text: string) => void;
  showPoints?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  selectedAnswers = [],
  onSelectOption,
  isReviewMode = false,
  onSpeakText,
  showPoints = true,
}) => {
  // Requirement 2: All hints MUST be hidden by default (disabled automatically)
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);
  const [showTrapDetails, setShowTrapDetails] = useState<boolean>(isReviewMode);

  const isMrq = question.type === 'mrq';

  // Determine correctness for review mode
  const isCorrect = isMrq
    ? selectedAnswers.length === 2 && selectedAnswers.every((ans) => question.correctAnswers.includes(ans))
    : selectedAnswers.length > 0 && selectedAnswers[0] === question.correctAnswers[0];

  // Helper to extract Arabic content for the hint
  const getArabicHint = (): string | null => {
    if (question.explanationAr && question.explanationAr.trim().length > 0) {
      return question.explanationAr;
    }

    if (question.explanation) {
      const arabicMatch = question.explanation.match(/[\u0600-\u06FF].+/);
      if (arabicMatch) {
        return question.explanation;
      }
    }

    if (question.questionAr && question.questionAr.trim().length > 0) {
      return question.questionAr;
    }

    return question.explanation || 'توضيح القاعدة والمفردات الوزارية';
  };

  const arabicHintContent = getArabicHint();

  // Generate or read exam trap rationale
  const trapRationale = question.exam_trap_explanation || question.examTrapExplanationAr || (
    question.difficulty === 'hots'
      ? 'Beware of deceptive surface keywords: this high-order question tests syntactic structure rather than simple vocabulary matching.'
      : 'Avoid impulsive choice based on common collocations without analyzing clause tense and subject-verb inversion.'
  );

  return (
    <div
      id={`q_card_${question.id}`}
      className={`rounded-2xl border transition-all duration-200 p-5 sm:p-6 space-y-4 ${
        isReviewMode
          ? isCorrect
            ? 'bg-emerald-50/40 border-emerald-200'
            : 'bg-rose-50/40 border-rose-200'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
      }`}
    >
      {/* Category & Difficulty Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {question.skill && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
            {question.skill}
          </span>
        )}
        {question.difficulty === 'hots' ? (
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1">
            <Flame className="w-3 h-3 text-purple-600" />
            <span>HOTS · مستويات عليا</span>
          </span>
        ) : (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
            Official MOE Standard
          </span>
        )}
        {question.question_type && (
          <span className="text-[10px] font-mono text-slate-400">
            [{question.question_type.toUpperCase()}]
          </span>
        )}
      </div>

      {/* Question Header: Number, Text, Audio, Hint Trigger, and Points */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Question Index Badge */}
          <span
            className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${
              isReviewMode
                ? isCorrect
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 text-white'
                : 'bg-blue-900 text-white'
            }`}
          >
            {index + 1}
          </span>

          <div className="space-y-1.5 flex-1">
            <div className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
              {question.question}
            </div>

            {isMrq && (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Choose the TWO correct answers out of five options</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls: Pronunciation, Bilingual Hint Trigger, Marks */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Text-to-Speech Pronunciation Button */}
          {onSpeakText && (
            <button
              type="button"
              onClick={() => onSpeakText(question.question)}
              title="Listen to English pronunciation"
              className="p-2 text-slate-400 hover:text-blue-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}

          {/* Bilingual Arabic Hint Button (Toggle Accordion / Popup) */}
          <button
            type="button"
            onClick={() => setIsHintOpen((prev) => !prev)}
            aria-expanded={isHintOpen}
            title={isHintOpen ? 'Hide Arabic hint' : 'Show on-demand Arabic learning hint (💡 تلميح بالعربية)'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              isHintOpen
                ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs scale-105'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
            }`}
          >
            <Lightbulb
              className={`w-3.5 h-3.5 ${
                isHintOpen ? 'fill-slate-950 text-slate-950 animate-bounce' : 'text-amber-600'
              }`}
            />
            <span className="text-[11px] font-extrabold hidden sm:inline">
              {isHintOpen ? 'Close Hint' : 'Hint'}
            </span>
          </button>

          {/* Points / Marks Badge */}
          {showPoints && (
            <span className="text-xs font-bold text-slate-500 font-mono px-2 py-1 rounded-lg bg-slate-100 border border-slate-200">
              {question.points} {question.points === 1 ? 'mark' : 'marks'}
            </span>
          )}

          {/* Review Mode Outcome Badge */}
          {isReviewMode && (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                isCorrect
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Correct</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Incorrect</span>
                </>
              )}
            </span>
          )}
        </div>
      </div>

      {/* REQUIREMENT 2: BILINGUAL ARABIC HINT (ON-DEMAND ACCORDION) */}
      {isHintOpen && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/70 border border-amber-300 p-4 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-amber-400 text-slate-950">
                <Lightbulb className="w-4 h-4 fill-slate-950" />
              </span>
              <span className="text-xs font-bold text-amber-950">
                Bilingual Learning Hint · إضاءة تعليمية وتوضيح
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsHintOpen(false)}
              className="p-1 rounded-lg text-amber-800 hover:text-amber-950 hover:bg-amber-200/60 transition-colors"
              title="Close hint"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed" dir="rtl">
            {arabicHintContent}
          </div>

          {question.sourceExam && (
            <div className="mt-2 pt-2 border-t border-amber-200/60 text-[11px] text-amber-900/80 flex items-center gap-1.5 font-sans">
              <HelpCircle className="w-3 h-3 text-amber-700" />
              <span>Ministerial Reference: {question.sourceExam}</span>
            </div>
          )}
        </div>
      )}

      {/* Options List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {question.options.map((optionText, oIdx) => {
          const letter = String.fromCharCode(97 + oIdx); // 'a', 'b', 'c', 'd', 'e'
          const isSelected = selectedAnswers.includes(oIdx);
          const isModelAnswer = question.correctAnswers.includes(oIdx);

          let optionStyle = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
          let letterStyle = 'bg-slate-100 text-slate-600';

          if (isReviewMode) {
            if (isModelAnswer) {
              optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
              letterStyle = 'bg-emerald-600 text-white';
            } else if (isSelected && !isModelAnswer) {
              optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
              letterStyle = 'bg-rose-600 text-white';
            } else {
              optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400';
              letterStyle = 'bg-slate-200 text-slate-500';
            }
          } else if (isSelected) {
            optionStyle = 'border-blue-900 bg-blue-50 text-blue-950 font-bold ring-2 ring-blue-900/20';
            letterStyle = 'bg-blue-900 text-white';
          }

          return (
            <button
              key={oIdx}
              type="button"
              disabled={isReviewMode}
              onClick={() => onSelectOption && onSelectOption(question.id, oIdx, isMrq)}
              className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-150 flex items-center gap-3 cursor-pointer ${optionStyle} ${
                isReviewMode ? 'cursor-default' : 'active:scale-[0.99]'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black uppercase shrink-0 transition-colors ${letterStyle}`}
              >
                {letter}
              </span>
              <span className="flex-1 leading-snug">{optionText}</span>

              {isReviewMode && isModelAnswer && (
                <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                  ✓ Model Answer
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Review Mode Ministerial Explanation Section */}
      {isReviewMode && (
        <div className="space-y-3 pt-2">
          {question.explanation && (
            <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-blue-900 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-900" />
                <span>Official Explanation & Grammar Logic:</span>
              </div>
              <p className="leading-relaxed">{question.explanation}</p>
              {question.sourceExam && (
                <span className="block text-slate-400 font-mono text-[11px] pt-1">
                  Exam Reference: {question.sourceExam}
                </span>
              )}
            </div>
          )}

          {/* High-Yield Exam Trap Warning & Rationale */}
          <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center justify-between text-amber-950">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Exam Trap Warning & Distractor Analysis (فخ الامتحان الوزاري):</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200/70 text-amber-900">
                Beware of Traps
              </span>
            </div>
            <p className="leading-relaxed font-medium text-amber-900">
              {trapRationale}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
