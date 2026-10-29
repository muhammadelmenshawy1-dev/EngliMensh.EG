import React from 'react';
import { Home, BookOpen, Gamepad2, Wrench, User } from 'lucide-react';
import { MainAppTab, StudentProfile } from '../types.ts';

interface BottomNavBarProps {
  activeTab: MainAppTab;
  onTabChange: (tab: MainAppTab) => void;
  student: StudentProfile | null;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: Array<{
    id: MainAppTab;
    labelAr: string;
    icon: React.FC<{ className?: string }>;
  }> = [
    {
      id: 'home',
      labelAr: 'الرئيسية',
      icon: Home,
    },
    {
      id: 'curricula',
      labelAr: 'المناهج',
      icon: BookOpen,
    },
    {
      id: 'games',
      labelAr: 'الألعاب',
      icon: Gamepad2,
    },
    {
      id: 'tools',
      labelAr: 'الأدوات',
      icon: Wrench,
    },
    {
      id: 'profile',
      labelAr: 'حسابي',
      icon: User,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0] text-[#64748B] shadow-[0_-6px_20px_rgba(15,23,42,0.08)] select-none pb-[env(safe-area-inset-bottom)]"
      aria-label="التنقل الرئيسي"
      dir="rtl"
    >
      <div className="max-w-lg mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isTabActive =
              activeTab === tab.id ||
              (tab.id === 'curricula' && (activeTab as string) === 'exams') ||
              (tab.id === 'tools' &&
                ((activeTab as string) === 'translator' ||
                  (activeTab as string) === 'dictionary')) ||
              (tab.id === 'profile' && (activeTab as string) === 'leaderboard');

            return (
              <button
                key={`bottom_nav_${tab.id}`}
                type="button"
                onClick={() => onTabChange(tab.id)}
                aria-current={isTabActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-1.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                  isTabActive
                    ? 'text-[#1E3A8A] font-black'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {isTabActive && (
                  <span className="absolute top-0 w-10 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B] rounded-full" />
                )}

                <div
                  className={`relative p-1.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                    isTabActive
                      ? 'bg-[#1E3A8A]/10 text-[#1E3A8A]'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isTabActive ? 'scale-110 stroke-[2.5]' : ''
                    }`}
                  />
                </div>

                <span
                  className={`text-[11px] sm:text-xs tracking-tight mt-0.5 ${
                    isTabActive ? 'text-[#1E3A8A] font-black' : 'text-[#64748B] font-semibold'
                  }`}
                >
                  {tab.labelAr}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
