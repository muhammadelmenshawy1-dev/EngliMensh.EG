import { Home, BookOpen, Gamepad2, Trophy, User, ShieldCheck, Award } from 'lucide-react';
import { MainAppTab, StudentProfile } from '../types.ts';
import { isTeacherEmail } from '../services/studentStorage.ts';

interface BottomNavBarProps {
  activeTab: MainAppTab;
  onTabChange: (tab: MainAppTab) => void;
  student: StudentProfile | null;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  student,
}) => {
  const isTeacher = isTeacherEmail(student?.email) || student?.role === 'teacher';

  const tabs = [
    {
      id: 'home' as MainAppTab,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'curricula' as MainAppTab,
      label: 'Curricula',
      icon: BookOpen,
      badge: 'Sec 1',
    },
    {
      id: 'exams' as MainAppTab,
      label: 'Exams',
      icon: Award,
    },
    {
      id: 'games' as MainAppTab,
      label: 'Games',
      icon: Gamepad2,
      sparkle: true,
    },
    {
      id: 'leaderboard' as MainAppTab,
      label: 'Ranks',
      icon: Trophy,
      badge: student?.examHistory?.length ? `${student.examHistory.length}` : undefined,
    },
    {
      id: 'profile' as MainAppTab,
      label: 'Profile',
      icon: User,
    },
    ...(isTeacher
      ? [
          {
            id: 'teacher' as MainAppTab,
            label: 'Teacher',
            icon: ShieldCheck,
            badge: 'Admin',
          },
        ]
      : []),
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#07224D]/95 backdrop-blur-xl border-t border-blue-900/50 text-blue-200 shadow-2xl transition-all select-none"
      aria-label="Main Navigation"
      dir="ltr"
    >
      <div className="max-w-md mx-auto sm:max-w-xl px-2 sm:px-6">
        <div className="flex items-center justify-around h-16 sm:h-18">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-200 group cursor-pointer ${
                  isActive ? 'text-[#FFC928] font-bold scale-105' : 'text-blue-200/70 hover:text-white'
                }`}
              >
                {/* Active Indicator Top Glow Bar */}
                {isActive && (
                  <span className="absolute top-0 w-8 sm:w-10 h-1 bg-[#FFC928] rounded-full shadow-[0_0_12px_rgba(255,201,40,0.9)]" />
                )}

                {/* Icon with capsule highlight when active */}
                <div
                  className={`relative p-1.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? 'bg-[#FFC928]/20 text-[#FFC928] ring-1 ring-[#FFC928]/40'
                      : 'group-hover:bg-blue-900/40'
                  }`}
                >
                  <Icon className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform ${isActive ? 'scale-110' : ''}`} />

                  {/* Sparkle badge for Games */}
                  {tab.sparkle && !isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75" />
                  )}

                  {/* Count badge for completed exams */}
                  {tab.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[9px] font-bold shadow-xs">
                      {tab.badge}
                    </span>
                  )}
                </div>

                {/* English Label */}
                <span className="text-[10px] sm:text-xs font-semibold tracking-tight leading-tight mt-0.5">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
