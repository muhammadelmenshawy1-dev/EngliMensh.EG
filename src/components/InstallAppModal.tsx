import React, { useState } from 'react';
import { Smartphone, Apple, Download, CheckCircle2, Share, PlusSquare, Sparkles, X } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  onInstall: () => Promise<boolean>;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isIOS,
  isAndroid,
  onInstall,
}) => {
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios'>(isIOS ? 'ios' : 'android');
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDirectInstall = async () => {
    const success = await onInstall();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
        setInstallSuccess(false);
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Modal Header with App Cover Theme */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
              <img src="logo.png" alt="EngliMensh Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">EngliMensh App</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  PWA Mobile
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                تثبيت التطبيق على هواتف الأندرويد والآيفون (Install on Android & iPhone)
              </p>
            </div>
          </div>

          {/* OS Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
            <button
              onClick={() => setActivePlatform('android')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                activePlatform === 'android'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Android (أندرويد)</span>
            </button>
            <button
              onClick={() => setActivePlatform('ios')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                activePlatform === 'ios'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>iPhone / iOS (آيفون)</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {installSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Installed Successfully!</h3>
              <p className="text-xs text-slate-600">
                تم تثبيت تطبيق EngliMensh بنجاح على جهازك! ستجده الآن متاحاً على شاشتك الرئيسية كأي تطبيق رسمي.
              </p>
            </div>
          ) : activePlatform === 'android' ? (
            /* ANDROID INSTRUCTIONS */
            <div className="space-y-4">
              {isInstallable ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-3">
                  <div className="text-xs font-semibold text-emerald-900">
                    جهازك جاهز للتثبيت الفوري بنقرة واحدة!
                  </div>
                  <button
                    onClick={handleDirectInstall}
                    className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download & Install on Android Now (تثبيت الآن)</span>
                  </button>
                </div>
              ) : null}

              <div className="space-y-3 text-xs text-slate-700">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>خطوات التثبيت السريعة لمتصفح Chrome على هواتف أندرويد:</span>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">افتح قائمة المتصفح (⋮)</span>
                    <span className="text-slate-500">
                      اضغط على أيقونة الثلاث نقاط الرأسية (⋮) أعلى يمين أو يسار شاشة متصفح Google Chrome.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">اختر "تثبيت التطبيق" أو "Install App"</span>
                    <span className="text-slate-500">
                      أو انقر على <strong>"إضافة إلى الشاشة الرئيسية" (Add to Home screen)</strong>.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">تأكيد التثبيت</span>
                    <span className="text-slate-500">
                      اضغط <strong>"تثبيت" (Install)</strong> وسيظهر التطبيق بأيقونته الرسمية وشاشته الكاملة بدون شريط المتصفح!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* IPHONE / IOS INSTRUCTIONS */
            <div className="space-y-4">
              <div className="space-y-3 text-xs text-slate-700">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Apple className="w-4 h-4 text-slate-900" />
                  <span>طريقة تثبيت التطبيق على أجهزة iPhone و iPad عبر Safari:</span>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>اضغط على زر المشاركة (Share) في Safari</span>
                      <Share className="w-4 h-4 text-blue-600" />
                    </span>
                    <span className="text-slate-500 block">
                      في شريط الأدوات أسفل شاشة Safari، اضغط على أيقونة المربع الذي يحتوي على سهم لأعلى.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>اختر "إضافة إلى الصفحة الرئيسية"</span>
                      <PlusSquare className="w-4 h-4 text-blue-600" />
                    </span>
                    <span className="text-slate-500 block">
                      مرر القائمة لأسفل ثم اضغط على <strong>"Add to Home Screen"</strong> (إضافة إلى الصفحة الرئيسية).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">اضغط "إضافة" (Add) في الزاوية العلوية</span>
                    <span className="text-slate-500 block">
                      سيتم تثبيت التطبيق فوراً والعمل بملء الشاشة مع حفظ بياناتك تلقائياً وبدون أي اتصال إنترنت مطلوب للتصفح!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Benefits strip */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>أداء فائق السرعة وتجربة تطبيق أصلي (Standalone)</span>
            </span>
            <span className="font-bold text-blue-900">100% Free</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
          >
            إغلاق (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
