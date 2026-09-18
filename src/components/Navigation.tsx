import React from 'react';
import { Home, BookOpen, Calendar, BarChart2, User } from 'lucide-react';
import { ScreenType } from '../types';
import { ThemeToggle } from '../context/ThemeContext';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'explore' as ScreenType, label: 'Explore', icon: Home },
    { id: 'modules' as ScreenType, label: 'Courses', icon: BookOpen },
    { id: 'calendar' as ScreenType, label: 'Schedule', icon: Calendar },
    { id: 'skill-gap' as ScreenType, label: 'AI Skills', icon: BarChart2 },
    { id: 'profile' as ScreenType, label: 'Profile', icon: User },
  ];

  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label="Bottom Navigation"
      className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-3 py-2 flex items-center justify-around z-30 shadow-lg shadow-slate-200/40 dark:shadow-black/60 select-none transition-colors"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentScreen === item.id ||
          (item.id === 'explore' && (currentScreen === 'welcome' || currentScreen === 'auth')) ||
          (item.id === 'modules' && (currentScreen === 'course-detail' || currentScreen === 'roadmaps')) ||
          (item.id === 'skill-gap' && (currentScreen === 'analytics' || currentScreen === 'score-result' || currentScreen === 'lesson-quiz'));

        return (
          <button
            key={item.id}
            id={`nav-btn-${item.id}`}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 relative cursor-pointer ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 scale-110'
                  : ''
              }`}
            >
              <Icon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">{item.label}</span>
            {isActive && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

interface TopBarProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  headerColorClass?: string;
  textColorClass?: string;
  showThemeToggle?: boolean;
}

export const ScreenHeader: React.FC<TopBarProps> = ({
  title,
  onBack,
  showBack = true,
  rightAction,
  headerColorClass = 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800',
  textColorClass = 'text-slate-800 dark:text-slate-100',
  showThemeToggle = true,
}) => {
  return (
    <header
      id="screen-top-header"
      className={`px-4 py-3 flex items-center justify-between z-20 transition-colors ${headerColorClass}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {showBack ? (
          <button
            id="header-back-button"
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-current cursor-pointer"
            title="Go back"
            aria-label="Back"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div className="w-6" />
        )}
        <h1 className={`text-base font-bold tracking-tight truncate max-w-[180px] sm:max-w-[240px] ${textColorClass}`}>
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {showThemeToggle && (
          <ThemeToggle
            variant="icon"
            className="w-7 h-7 p-1 text-xs border-0 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
          />
        )}
        {rightAction}
      </div>
    </header>
  );
};
