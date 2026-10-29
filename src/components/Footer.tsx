import React, { useState } from 'react';
import { MessageCircle, Heart, BookOpen, FileCheck2, Languages, Gamepad2, Trophy, X } from 'lucide-react';

interface FooterProps {
  onNavigateTab?: (tab: 'home' | 'curricula' | 'exams' | 'tools' | 'games' | 'leaderboard' | 'profile') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
}) => {
  const [showCommunityInfo, setShowCommunityInfo] = useState(false);

  return (
    <footer id="footer-brand-section" className="bg-[#07224D] text-white pt-12 pb-24 md:pb-12 border-t border-[#0d346e] select-none" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-blue-900/60">
          
          {/* 1. Left: Brand Logo & Tagline */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 flex items-center justify-center border border-white/20 shadow-md">
              <img
                src="/assets/redesign/brand-icon.png"
                alt="EngliMensh.EG Logo"
                className="w-10 h-10 object-contain drop-shadow-md"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.indexOf('logo.png') === -1) target.src = '/logo.png';
                }}
              />
            </div>

            <div className="text-left">
              <div className="flex items-center text-2xl font-black tracking-tight leading-none">
                <span className="text-white">EngliMensh</span>
                <span className="text-[#FFC928]">.EG</span>
              </div>
              <p className="text-xs text-blue-200/80 font-medium tracking-wide mt-1">
                Learn <span className="text-[#FFC928]">•</span> Practice <span className="text-[#FFC928]">•</span> Succeed
              </p>
            </div>
          </div>

          {/* 2. Center: "Together for a Brighter Future" Slogan with playful curved underline */}
          <div className="text-center relative">
            <span className="text-lg sm:text-xl font-bold tracking-wide text-blue-100 font-sans italic">
              Together for a
            </span>
            <div className="text-xl sm:text-2xl font-black text-white tracking-wider flex items-center justify-center gap-1.5 mt-0.5">
              <span>Brighter Future</span>
            </div>
            {/* Yellow accent curve */}
            <div className="w-36 h-1.5 mx-auto mt-1 rounded-full bg-gradient-to-r from-transparent via-[#FFC928] to-transparent" />
            <p className="text-[11px] text-blue-300/70 mt-1" dir="rtl">
              تحت إشراف مستر محمد المنشاوي · خبير التقييم بالوزارة
            </p>
          </div>

          {/* 3. Right: Social media icons (Facebook, YouTube, WhatsApp, Community) */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0878E8] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="Follow EngliMensh on Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="Watch EngliMensh Video Lectures on YouTube"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* WhatsApp Direct Line */}
            <a
              href="https://wa.me/201099231817?text=Hello%20Mr.%20Mohammad%20El-Menshawy%2C%20I%20have%20an%20inquiry%20regarding%20EngliMensh."
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="Chat directly via WhatsApp (+20 109 923 1817)"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>

            {/* Community / Heart (Non-blocking inline banner toggle instead of alert()) */}
            <button
              type="button"
              onClick={() => setShowCommunityInfo((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-[#FFC928] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm cursor-pointer"
              title="Students & Parents Community"
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>

        {/* Dismissible Community Info Banner */}
        {showCommunityInfo && (
          <div className="my-4 p-4 rounded-2xl bg-blue-950/90 border border-[#FFC928]/40 flex items-center justify-between gap-4 text-xs sm:text-sm text-blue-100" dir="rtl">
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#FFC928] shrink-0 fill-current" />
              <span>
                مجتمع EngliMensh التعليمي: يضم آلاف الطلاب وأولياء الأمور في مختلف محافظات مصر لإتقان اللغة الإنجليزية وفق أحدث مواصفات وزارة التربية والتعليم.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowCommunityInfo(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white shrink-0 cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Platform Navigation Links */}
        {onNavigateTab && (
          <div className="py-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-b border-blue-900/40" dir="rtl">
            <button
              type="button"
              onClick={() => onNavigateTab('curricula')}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-blue-100 hover:text-[#FFC928] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#FFC928]" />
              <span>المناهج الدراسية</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('exams')}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-blue-100 hover:text-[#FFC928] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#FFC928]" />
              <span>بنك الامتحانات الشاملة</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('tools')}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-blue-100 hover:text-[#FFC928] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-[#FFC928]" />
              <span>المترجم الفوري والقاموس</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('games')}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-blue-100 hover:text-[#FFC928] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#FFC928]" />
              <span>الألعاب التعليمية</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('leaderboard')}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-blue-100 hover:text-[#FFC928] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-[#FFC928]" />
              <span>لوحة الشرف والترتيب</span>
            </button>
          </div>
        )}

        {/* Contact Strip (Teacher Direct Hotline) */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-200/90 border-b border-blue-900/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Teacher Support & Inquiries:</span>
            <span className="text-blue-300">Mr. Mohammad El-Menshawy</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/201099231817"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFC928] transition-colors flex items-center gap-1 font-mono"
            >
              <span>🇪🇬 +20 109 923 1817</span>
            </a>
            <a
              href="https://wa.me/966549697159"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFC928] transition-colors flex items-center gap-1 font-mono"
            >
              <span>🇸🇦 +966 54 969 7159</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 text-center text-xs text-blue-300/60 font-medium">
          <p>© 2026 EngliMensh.EG | Learn • Practice • Succeed</p>
        </div>
      </div>
    </footer>
  );
};
