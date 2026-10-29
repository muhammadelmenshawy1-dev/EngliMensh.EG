import React from 'react';
import { Sparkles, CheckCircle2, XCircle, Lightbulb, Clock } from 'lucide-react';
import { GameQuestion } from '../../services/gameQuestionBank.ts';

interface GameQuestionPanelProps {
  question: GameQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedOptionIndex: number | null;
  isAnswered: boolean;
  onSelectOption: (optionIndex: number) => void;
  timeLeft?: number;
  maxTime?: number;
  disabled?: boolean;
}

export const GameQuestionPanel: React.FC<GameQuestionPanelProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedOptionIndex,
  isAnswered,
  onSelectOption,
  timeLeft,
  maxTime = 20,
  disabled = false,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4 backdrop-blur-md">
      {/* Header Info: Progress, Skill Badge, Timer */}
      <div className="flex items-center justify-between gap-2 text-xs border-b border-slate-800/80 pb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
            السؤال {questionIndex + 1} من {totalQuestions}
          </span>
          {question.skill && (
            <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[11px] border border-amber-400/30">
              {question.skill}
            </span>
          )}
        </div>

        {typeof timeLeft === 'number' && (
          <div
            className={`flex items-center gap-1.5 font-mono font-bold px-3 py-1 rounded-full border ${
              timeLeft <= 5
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </div>
        )}
      </div>

      {/* Question Prompt */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed font-sans" dir="ltr">
          {question.question}
        </h3>
        {question.questionAr && (
          <p className="text-xs text-slate-400 font-medium leading-normal" dir="rtl">
            {question.questionAr}
          </p>
        )}
      </div>

      {/* Options Grid (4 Choices) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;
          const isCorrect = idx === question.correctIndex;

          let btnStyle = 'bg-slate-800/90 border-slate-700 text-slate-100 hover:bg-slate-750 hover:border-slate-500';

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-rose-950/80 border-2 border-rose-500 text-rose-200 shadow-lg shadow-rose-500/20 animate-shake';
            } else {
              btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-50';
            }
          } else if (isSelected) {
            btnStyle = 'bg-amber-500 border-2 border-amber-400 text-slate-950 font-extrabold shadow-md shadow-amber-500/30';
          }

          return (
            <button
              key={idx}
              onClick={() => !isAnswered && !disabled && onSelectOption(idx)}
              disabled={isAnswered || disabled}
              className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all duration-200 text-left flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5 flex-1">
                <span className="w-6 h-6 rounded-xl bg-slate-950/60 border border-slate-700/60 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{option}</span>
              </div>

              {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation & Ministry Exam Trap Rationale */}
      {isAnswered && (question.explanation || question.examTrapExplanation) && (
        <div className="p-3.5 bg-slate-950/90 rounded-2xl border border-slate-800 text-xs space-y-2 animate-fadeIn">
          <div className="flex items-start gap-2 text-amber-300 font-bold">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>الشرح والعلة الامتحان المصيرية:</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]" dir="rtl">
            {question.examTrapExplanation || question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
