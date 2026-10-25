import React from 'react';

interface EngliMenshLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const EngliMenshLogo: React.FC<EngliMenshLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: {
      container: 'w-9 h-9',
      title: 'text-base sm:text-lg',
      subtitle: 'text-[10px]',
      badge: 'text-[9px] px-1.5 py-0.2',
    },
    md: {
      container: 'w-12 h-12 sm:w-14 sm:h-14',
      title: 'text-xl sm:text-2xl',
      subtitle: 'text-xs',
      badge: 'text-[10px] px-2 py-0.5',
    },
    lg: {
      container: 'w-16 h-16 sm:w-20 sm:h-20',
      title: 'text-2xl sm:text-3xl',
      subtitle: 'text-sm',
      badge: 'text-xs px-2.5 py-0.5',
    },
    xl: {
      container: 'w-24 h-24 sm:w-28 sm:h-28',
      title: 'text-3xl sm:text-4xl',
      subtitle: 'text-base',
      badge: 'text-sm px-3 py-1',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Official App Icon Container with Smooth Rounded Corners & Gold Glow */}
      <div
        id="app-logo-container"
        className={`relative ${currentSize.container} rounded-2xl sm:rounded-3xl overflow-hidden p-0.5 bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0 transition-transform hover:scale-105 duration-200 border border-amber-300/60`}
      >
        <div className="w-full h-full rounded-[14px] sm:rounded-[22px] overflow-hidden bg-slate-950 flex items-center justify-center">
          <img
            id="app-logo"
            src="/pwa-192x192.png"
            onError={(e) => {
              // Fallback to logo.png if pwa icon has issues
              const target = e.currentTarget;
              if (target.src.indexOf('logo.png') === -1) {
                target.src = '/logo.png';
              }
            }}
            alt="English - EngliMensh Official Icon"
            className="w-full h-full object-contain p-1 drop-shadow-md"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span
              className={`${currentSize.title} font-black tracking-tight bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 bg-clip-text text-transparent`}
            >
              English
            </span>
            <span
              className={`${currentSize.badge} font-bold rounded-full bg-blue-100 text-blue-900 border border-blue-200/80 uppercase tracking-wider`}
            >
              Sec 1
            </span>
          </div>

          <div className="flex items-center gap-1.5" dir="rtl">
            <span className={`${currentSize.subtitle} text-slate-500 font-medium`}>
              مستر محمد المنشاوي · EngliMensh
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
