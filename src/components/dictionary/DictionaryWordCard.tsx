import React, { useState } from 'react';
import { Volume2, Star, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { DictionaryEntry, PartOfSpeech, LexicalCategory } from '../../types/dictionary';
import { speakText, speakWord } from '../../services/dictionaryAudio';

interface DictionaryWordCardProps {
  entry: DictionaryEntry;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  preferredAccent: 'us' | 'uk';
}

export const DictionaryWordCard: React.FC<DictionaryWordCardProps> = ({
  entry,
  isFavorite,
  onToggleFavorite,
  preferredAccent,
}) => {
  const [isPlayingEn, setIsPlayingEn] = useState(false);
  const [isPlayingAr, setIsPlayingAr] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const headwordEn = entry.english || entry.word || '';
  const headwordAr = entry.arabic || '';
  const pos = entry.partOfSpeech || entry.pos || 'noun';

  const handleSpeakEn = () => {
    setIsPlayingEn(true);
    speakWord(
      headwordEn,
      preferredAccent,
      () => setIsPlayingEn(true),
      () => setIsPlayingEn(false),
      () => setIsPlayingEn(false)
    );
  };

  const handleSpeakAr = () => {
    setIsPlayingAr(true);
    speakText(
      headwordAr,
      'ar',
      'us',
      () => setIsPlayingAr(true),
      () => setIsPlayingAr(false),
      () => setIsPlayingAr(false)
    );
  };

  const getPosBadgeColor = (p: PartOfSpeech) => {
    switch (p) {
      case 'noun':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'verb':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'adjective':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'adverb':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'idiom':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'phrase':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getCategoryLabel = (cat: LexicalCategory) => {
    switch (cat) {
      case 'education':
        return 'Education • التعليم';
      case 'culture_arts':
        return 'Culture & Arts • الثقافة والفنون';
      case 'politics_law':
        return 'Politics & Law • السياسة والقانون';
      case 'economy_trade':
        return 'Economy & Trade • الاقتصاد والتجارة';
      case 'science_tech':
        return 'Science & Tech • العلوم والتكنولوجيا';
      case 'health_body':
        return 'Health & Body • الصحة والطب';
      case 'environment':
        return 'Environment • البيئة والطبيعة';
      case 'daily_life':
        return 'Daily Life • الحياة اليومية';
      default:
        return cat;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Card Header Banner */}
      <div className="bg-gradient-to-r from-[#07224D] via-[#0B397D] to-[#0878E8] p-4 sm:p-5 text-white flex items-start justify-between relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#FFC928]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-1.5 z-10 max-w-[80%]">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white capitalize flex items-center gap-2">
              {headwordEn}
            </h3>

            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold border backdrop-blur-sm bg-white/90 text-[#07224D] shadow-2xs">
              {getCategoryLabel(entry.category || 'education')}
            </span>
          </div>

          {/* Phonetics & Speech Controls */}
          {(entry.phonetics || (typeof entry.ipa === 'object' && entry.ipa?.us)) && (
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 w-fit">
              <span className="font-mono text-white/90 text-xs">{entry.phonetics || (typeof entry.ipa === 'object' ? entry.ipa?.us : entry.ipa)}</span>
              <button
                onClick={handleSpeakEn}
                className={`p-1 rounded-md transition-transform active:scale-90 cursor-pointer ${
                  isPlayingEn
                    ? 'bg-[#FFC928] text-[#07224D] animate-bounce'
                    : 'hover:bg-white/20 text-amber-300 hover:text-white'
                }`}
                title="Listen to English Pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Favorite Star Button */}
        <button
          onClick={() => onToggleFavorite(entry.id)}
          className={`p-2.5 rounded-xl transition-all duration-200 transform active:scale-90 cursor-pointer z-10 ${
            isFavorite
              ? 'bg-[#FFC928] text-[#07224D] shadow-md shadow-amber-400/30'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 space-y-3">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <span className={`text-xs px-2.5 py-0.5 rounded-md font-semibold border uppercase tracking-wider ${getPosBadgeColor(pos)}`}>
            {pos}
          </span>

          <button
            onClick={handleSpeakAr}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              isPlayingAr
                ? 'bg-[#FFC928] text-[#07224D] animate-bounce'
                : 'bg-slate-100 hover:bg-blue-100 text-slate-700'
            }`}
            title="Listen to Arabic Translation"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>استمع بالعربية</span>
          </button>
        </div>

        {/* Primary Arabic Translation */}
        <div className="pt-1">
          <h4 dir="rtl" className="text-xl sm:text-2xl font-bold text-[#07224D] leading-snug font-sans tracking-wide">
            {headwordAr}
          </h4>
        </div>

        {/* Definitions */}
        {(entry.definitionEn || entry.definitionAr) && (
          <div className="bg-slate-50 rounded-xl p-3 text-xs sm:text-sm space-y-1 text-slate-700 border border-slate-200/60">
            {entry.definitionEn && <p className="font-medium text-slate-800">{entry.definitionEn}</p>}
            {entry.definitionAr && (
              <p dir="rtl" className="text-slate-600 font-sans">
                {entry.definitionAr}
              </p>
            )}
          </div>
        )}

        {/* Contextual Example Sentences */}
        {entry.exampleSentenceEn && (
          <div className="pt-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0878E8] hover:text-[#07224D] transition-colors cursor-pointer py-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {isExpanded ? 'Hide Example Sentence' : 'Show Example Sentence'}
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {isExpanded && (
              <div className="mt-2 bg-blue-50/70 border-l-3 border-[#0878E8] p-3 rounded-r-xl space-y-1 text-xs sm:text-sm animate-fadeIn">
                <p className="text-slate-900 font-medium leading-relaxed">
                  "{entry.exampleSentenceEn}"
                </p>
                {entry.exampleSentenceAr && (
                  <p dir="rtl" className="text-blue-900/80 font-sans leading-relaxed">
                    "{entry.exampleSentenceAr}"
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Synonyms */}
        {entry.synonyms && entry.synonyms.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap text-xs pt-2">
            <span className="text-slate-400 font-semibold">Synonyms:</span>
            {entry.synonyms.map((syn: string, sIdx: number) => (
              <span key={sIdx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                {syn}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
