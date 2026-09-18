import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types';
import { Sun, Moon } from 'lucide-react';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'eduskill_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, isDark]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeToggleProps {
  variant?: 'pill' | 'icon' | 'switch';
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'pill',
  className = '',
  showLabel = true,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  if (variant === 'icon') {
    return (
      <button
        type="button"
        id="theme-toggle-icon-btn"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className={`p-2 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
          isDark
            ? 'bg-slate-800 text-amber-300 hover:bg-slate-700 hover:text-amber-200 border border-slate-700 shadow-sm'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 shadow-sm'
        } ${className}`}
      >
        {isDark ? <Sun className="w-4 h-4 stroke-[2.2]" /> : <Moon className="w-4 h-4 stroke-[2.2]" />}
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <button
        type="button"
        id="theme-toggle-switch-btn"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer relative flex items-center ${
          isDark ? 'bg-indigo-600' : 'bg-slate-300'
        } ${className}`}
        title={`Toggle theme: currently ${theme}`}
      >
        <span
          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center text-[10px] ${
            isDark ? 'translate-x-5.5 text-indigo-700' : 'translate-x-0.5 text-amber-500'
          }`}
        >
          {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
        </span>
      </button>
    );
  }

  // Default 'pill' variant
  return (
    <button
      type="button"
      id="global-theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer border shadow-sm ${
        isDark
          ? 'bg-slate-800 hover:bg-slate-750 text-amber-300 border-slate-700'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 stroke-[2.2]" />
        )}
      </div>
      {showLabel && (
        <span className="capitalize font-bold text-[11px] tracking-wide">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
