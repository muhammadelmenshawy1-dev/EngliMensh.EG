import React, { useState } from 'react';
import { Menu, X, Rocket, ShieldCheck, User, Key, BookOpen, Trophy, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { StudentProfile, MainAppTab } from '../types.ts';
import { isTeacherEmail, getStudentAvatar } from '../services/studentStorage.ts';

interface HeaderProps {
  student: StudentProfile | null;
  studentName?: string;
  currentTab?: MainAppTab;
  onLogoClick: () => void;
  onNavigateTab?: (tab: MainAppTab) => void;
  onOpenProfile: () => void;
  onOpenSettings?: () => void;
  onOpenTeacherDashboard?: () => void;
  onOpenTeacherLogin?: () => void;
  onStartNow?: () => void;
  onOpenAbout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  studentName,
  currentTab = 'home',
  onLogoClick,
  onNavigateTab,
  onOpenProfile,
  onOpenSettings,
  onOpenTeacherDashboard,
  onOpenTeacherLogin,
  onStartNow,
  onOpenAbout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTeacher = isTeacherEmail(student?.email) || student?.role === 'teacher';
  const displayName = isTeacher
    ? 'Mr. Mohammad'
    : (student?.name || studentName || 'Student');
  const totalScore = student?.totalScore || 0;
  const avatar = student?.avatarUrl || (student?.id ? getStudentAvatar(student.id) : null);

  const handleNav = (tab: MainAppTab, action?: () => void) => {
    setMobileMenuOpen(false);
    if (action) {
      action();
    } else if (onNavigateTab) {
      onNavigateTab(tab);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* A. Left: Brand Logo & Tagline */}
        <div
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          title="EngliMensh.EG • Return to Home"
        >
          <div className="w-12 h-12 flex items-center justify-center relative transition-transform duration-200 group-hover:scale-105">
            <img
              src="/assets/redesign/brand-icon.png"
              alt="EngliMensh.EG Logo"
              className="w-11 h-11 object-contain drop-shadow-xs"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.indexOf('logo.png') === -1) target.src = '/logo.png';
              }}
            />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center text-2xl font-black tracking-tight leading-none">
              <span className="text-[#0B397D]">EngliMensh</span>
              <span className="text-[#FFC928]">.EG</span>
            </div>
            <span className="text-[11px] font-semibold text-[#5A6E85] tracking-wide mt-1">
              Learn <span className="text-[#FFC928]">•</span> Practice <span className="text-[#FFC928]">•</span> Succeed
            </span>
          </div>
        </div>

        {/* B. Center Links (Desktop View - 1024px+) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {/* 1. Home Link (Active Yellow Pill) */}
          <button
            onClick={() => handleNav('home')}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
              currentTab === 'home'
                ? 'bg-[#FFC928] text-[#0B397D] shadow-xs'
                : 'text-[#12366B] hover:text-[#0878E8] hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          {/* 2. Curricula Link */}
          <button
            onClick={() => handleNav('curricula')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'curricula'
                ? 'bg-[#0878E8] text-white shadow-xs'
                : 'text-[#12366B] hover:text-[#0878E8] hover:bg-slate-50'
            }`}
          >
            Curricula
          </button>

          {/* 3. Exams Link */}
          <button
            onClick={() => handleNav('exams')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'exams'
                ? 'bg-[#0878E8] text-white shadow-xs'
                : 'text-[#12366B] hover:text-[#0878E8] hover:bg-slate-50'
            }`}
          >
            Exams
          </button>

          {/* 4. Learning Games Link */}
          <button
            onClick={() => handleNav('games')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'games'
                ? 'bg-[#0878E8] text-white shadow-xs'
                : 'text-[#12366B] hover:text-[#0878E8] hover:bg-slate-50'
            }`}
          >
            Learning Games
          </button>

          {/* 5. Vocabulary & Grammar Link */}
          <button
            onClick={() => handleNav('games')}
            className="px-3.5 py-1.5 rounded-full text-sm font-semibold text-[#12366B] hover:text-[#0878E8] hover:bg-slate-50 transition-all cursor-pointer"
          >
            Vocabulary & Grammar
          </button>

          {/* 6. About Link */}
          <button
            onClick={() => {
              if (onOpenAbout) onOpenAbout();
              else {
                const el = document.getElementById('footer-brand-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-3.5 py-1.5 rounded-full text-sm font-semibold text-[#12366B] hover:text-[#0878E8] hover:bg-slate-50 transition-all cursor-pointer"
          >
            About
          </button>
        </nav>

        {/* C. Right CTA & Account Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Main Hero Rocket CTA Button */}
          <button
            onClick={() => {
              if (onStartNow) onStartNow();
              else handleNav('exams');
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFC928] hover:bg-[#ffbe0b] text-[#0B397D] text-sm font-bold shadow-md shadow-amber-400/20 hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
            title="Start your English learning adventure now"
          >
            <Rocket className="w-4 h-4 text-[#0B397D] fill-current" />
            <span>Start Now</span>
          </button>

          {/* Teacher Portal Badge (if active teacher) */}
          {isTeacher && onOpenTeacherDashboard && (
            <button
              onClick={onOpenTeacherDashboard}
              className="px-3 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
              title="Teacher Management & Manual Grading Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Teacher Dashboard</span>
              <span className="md:hidden">معلم</span>
            </button>
          )}

          {/* Teacher Login Shortcut (if not authenticated) */}
          {!isTeacher && onOpenTeacherLogin && (
            <button
              onClick={onOpenTeacherLogin}
              className="p-2 sm:px-2.5 sm:py-2 rounded-full border border-slate-200 hover:border-amber-400 text-slate-500 hover:text-amber-800 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              title="Teacher Access Portal"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="hidden xl:inline">Teacher</span>
            </button>
          )}

          {/* Student Profile Quick Badge */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-95 max-w-[160px] sm:max-w-[200px]"
            title="View Student Profile & Badges"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-6 h-6 rounded-full object-cover shrink-0 border border-amber-400"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0B397D] flex items-center justify-center font-bold text-xs shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="truncate font-bold text-[#12366B]">{displayName}</span>
            <span className="hidden sm:inline font-mono text-[#0878E8] font-bold shrink-0">
              {totalScore}p
            </span>
          </button>

          {/* AI Settings Trigger */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-[#0B397D] hover:bg-slate-50 transition-colors cursor-pointer hidden md:flex"
              title="AI Auto-Correction & Settings"
            >
              <Key className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#0B397D] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* D. Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => {
                if (onStartNow) onStartNow();
                else handleNav('exams');
              }}
              className="col-span-2 py-3 rounded-2xl bg-[#FFC928] text-[#0B397D] text-sm font-black flex items-center justify-center gap-2 shadow-sm"
            >
              <Rocket className="w-4 h-4 fill-current" />
              <span>🚀 Start Learning Now</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm ${
                currentTab === 'home'
                  ? 'bg-[#FFC928]/25 text-[#0B397D]'
                  : 'text-[#12366B] hover:bg-slate-50'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('curricula')}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm ${
                currentTab === 'curricula'
                  ? 'bg-[#0878E8] text-white'
                  : 'text-[#12366B] hover:bg-slate-50'
              }`}
            >
              <span>Curricula</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('exams')}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm ${
                currentTab === 'exams'
                  ? 'bg-[#0878E8] text-white'
                  : 'text-[#12366B] hover:bg-slate-50'
              }`}
            >
              <span>Exams & Quizzes</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('games')}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm ${
                currentTab === 'games'
                  ? 'bg-[#0878E8] text-white'
                  : 'text-[#12366B] hover:bg-slate-50'
              }`}
            >
              <span>Learning Games</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('games')}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm text-[#12366B] hover:bg-slate-50"
            >
              <span>Vocabulary & Grammar</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('footer-brand-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm text-[#12366B] hover:bg-slate-50"
            >
              <span>About EngliMensh</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
