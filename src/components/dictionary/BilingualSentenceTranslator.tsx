import React, { useState } from 'react';
import {
  Languages,
  ArrowRightLeft,
  Copy,
  Check,
  Volume2,
  Sparkles,
  Loader2,
  AlertCircle,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { translateSentence } from '../../services/translationService';
import { detectLanguage } from '../../services/dictionarySearch';
import { speakText } from '../../services/dictionaryAudio';

export const BilingualSentenceTranslator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState<'ar' | 'en'>('ar');
  const [manualDirection, setManualDirection] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const autoDetectedLang = detectLanguage(inputText);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    if (!manualDirection && val.trim()) {
      const detected = detectLanguage(val);
      setTargetLang(detected === 'ar' ? 'en' : 'ar');
    }
  };

  const handleSwapLanguages = () => {
    setManualDirection(true);
    const newTarget = targetLang === 'ar' ? 'en' : 'ar';
    setTargetLang(newTarget);
    if (resultText) {
      setInputText(resultText);
      setResultText(inputText);
    }
  };

  const handleTranslate = async () => {
    const cleanText = inputText.trim();
    if (!cleanText) return;

    setIsLoading(true);
    setErrorMessage('');

    const fromLang = targetLang === 'ar' ? 'en' : 'ar';
    const toLang = targetLang;

    try {
      const response = await translateSentence(cleanText, fromLang, toLang);
      if (response.success && response.translation) {
        setResultText(response.translation);
      } else {
        setErrorMessage(response.error || 'تعذر إتمام الترجمة مؤقتاً.');
      }
    } catch (err: any) {
      console.error('Translation error:', err);
      setErrorMessage(err.message || 'تعذر إتمام الترجمة مؤقتاً، يرجى التحقق من اتصال الإنترنت.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResultText('');
    setErrorMessage('');
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!resultText) return;
    setIsSpeaking(true);
    speakText(
      resultText,
      targetLang,
      'us',
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-blue-100 shadow-xl p-5 sm:p-7 space-y-5 animate-fadeIn">
      {/* Workbench Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-blue-50 text-[#0878E8]">
            <Languages className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#07224D]">
              🌐 مترجم الجمل والنصوص ثنائي اللغة (Sentence Translator)
            </h3>
            <p className="text-xs text-[#0878E8] font-bold">
              ترجمة فورية عالية الدقة بين العربية والإنجليزية
            </p>
          </div>
        </div>

        {/* Language Swap Controls */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold text-slate-700">
          <span className={targetLang === 'ar' ? 'text-[#0878E8]' : 'text-slate-600'}>
            English
          </span>
          <button
            onClick={handleSwapLanguages}
            className="p-1.5 rounded-xl bg-white hover:bg-blue-50 text-[#0878E8] shadow-2xs transition-transform active:scale-90 cursor-pointer"
            title="Swap source & target languages"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
          <span className={targetLang === 'en' ? 'text-[#0878E8]' : 'text-slate-600'}>
            العربية (Arabic)
          </span>
        </div>
      </div>

      {/* Grid: Source Textarea & Target Translation Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Source Input Box */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>
              نص المصدر ({autoDetectedLang === 'ar' ? 'العربية' : 'English'})
            </span>
            <span className="text-[11px] text-slate-400">
              {inputText.length} حروف
            </span>
          </div>

          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder={
              targetLang === 'ar'
                ? 'Type or paste English sentences, short paragraphs, or instructions...'
                : 'أدخل الجمل العربية أو النص المُراد ترجمته فورياً...'
            }
            dir={autoDetectedLang === 'ar' ? 'rtl' : 'ltr'}
            rows={6}
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0878E8] focus:bg-white transition-all resize-none font-sans"
          />

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleClear}
              disabled={!inputText && !resultText}
              className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer disabled:opacity-40"
            >
              مسح النص (Clear)
            </button>

            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="px-6 py-2.5 rounded-xl bg-[#0878E8] hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>جارٍ تجهيز الترجمة...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#FFC928]" />
                  <span>ترجمة الآن (Translate)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Target Translation Result Box */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>الترجمة المترجمة ({targetLang === 'ar' ? 'العربية' : 'English'})</span>
          </div>

          <div
            dir={targetLang === 'ar' ? 'rtl' : 'ltr'}
            className="w-full p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-900 text-sm min-h-[140px] flex-1 flex flex-col justify-between font-sans relative"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400 space-y-2 my-auto">
                <Loader2 className="w-6 h-6 animate-spin text-[#0878E8]" />
                <span className="text-xs font-medium text-[#0878E8]">جارٍ تجهيز الترجمة...</span>
              </div>
            ) : errorMessage ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs space-y-1.5 my-auto" dir="ltr">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Notice</span>
                </div>
                <p>{errorMessage}</p>
                <button
                  onClick={handleTranslate}
                  className="mt-2 px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة المحاولة (Retry)</span>
                </button>
              </div>
            ) : resultText ? (
              <div className="space-y-2">
                <p className="text-base font-semibold leading-relaxed text-[#07224D]">
                  {resultText}
                </p>
              </div>
            ) : (
              <div className="my-auto text-center py-6 text-slate-400 text-xs space-y-1">
                <FileText className="w-8 h-8 mx-auto text-blue-200" />
                <p>ستظهر نتائج الترجمة الفورية هنا فور الضغط على "ترجمة الآن".</p>
              </div>
            )}

            {/* Action Bar */}
            {resultText && !isLoading && (
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-blue-100/80" dir="ltr">
                <button
                  onClick={handleSpeak}
                  className={`p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    isSpeaking ? 'bg-[#FFC928] text-[#07224D]' : 'bg-white hover:bg-blue-100 text-slate-700 border border-slate-200'
                  }`}
                  title="Listen to translation speech"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>نطق الصوتي</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-xl text-xs font-bold bg-white hover:bg-blue-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ النص</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
