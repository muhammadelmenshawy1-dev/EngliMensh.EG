import React from 'react';
import { MessageCircle, Heart, Phone } from 'lucide-react';

interface FooterProps {
  onOpenTeacherLogin?: () => void;
  onNavigateTab?: (tab: 'home' | 'exams' | 'games' | 'leaderboard' | 'profile') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTeacherLogin,
  onNavigateTab,
}) => {
  return (
    <footer id="footer-brand-section" className="bg-[#07224D] text-white pt-12 pb-24 md:pb-12 border-t border-[#0d346e] select-none" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-blue-900/60">
          
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

            {/* Community / Heart */}
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                alert('EngliMensh Community: Over 15,000 students across Egyptian Governorates mastering English with authentic ministerial standards.');
              }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-[#FFC928] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              title="Students & Parents Community"
            >
              <Heart className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>

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
            {onOpenTeacherLogin && (
              <button
                onClick={onOpenTeacherLogin}
                className="text-amber-400 hover:text-amber-300 underline font-semibold ml-2 cursor-pointer"
              >
                Teacher Portal Login
              </button>
            )}
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
