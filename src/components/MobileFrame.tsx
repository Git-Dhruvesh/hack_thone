import React from 'react';
import { Wifi, BatteryMedium, Sparkles, Smartphone, Monitor, Layers } from 'lucide-react';
import { ScreenType } from '../types';
import { ThemeToggle, useTheme } from '../context/ThemeContext';

interface MobileFrameProps {
  children: React.ReactNode;
  currentScreen: ScreenType;
  viewMode: 'mobile' | 'desktop';
  onToggleViewMode: () => void;
  onOpenGallery: () => void;
  statusBarBg?: string;
  statusTextColor?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  currentScreen,
  viewMode,
  onToggleViewMode,
  onOpenGallery,
  statusBarBg = 'bg-slate-900',
  statusTextColor = 'text-white',
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 text-slate-100">
      {/* Global Top Application Control Bar */}
      <header
        id="global-control-bar"
        className="w-full max-w-5xl bg-[#0d1222]/95 backdrop-blur-md border border-[#1e2538] rounded-2xl px-4 py-3 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xl shadow-black/40 z-40"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-sm tracking-tight sm:text-base">
                EduSkill AI
              </span>
              <span className="bg-[#1c2140] text-[#818cf8] border border-[#2b3360] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Smart Education &amp; Skill Dev
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Machine Learning &amp; LLM-Powered Adaptive Engineering Learning System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Global Theme Toggle matching Screenshot Pill Style */}
          <button
            type="button"
            id="global-theme-toggle-btn"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e2e8f0] hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <svg className="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {/* Quick Mockup Screen Switcher */}
          <button
            id="open-screen-gallery-btn"
            onClick={onOpenGallery}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171d31] hover:bg-[#1f2640] text-xs font-semibold text-slate-200 border border-[#283252] transition-all active:scale-95 cursor-pointer"
            title="Browse all 12 mockup screens"
          >
            <Layers className="w-4 h-4 text-pink-500" />
            <span className="hidden sm:inline">Screens</span>
            <span className="bg-[#3f1e3c] text-pink-300 text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold">12</span>
          </button>

          {/* Viewport mode toggle: Mobile Mockup vs Desktop Responsive */}
          <button
            id="toggle-view-mode-btn"
            onClick={onToggleViewMode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
          >
            {viewMode === 'mobile' ? (
              <>
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile Mockup</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container: either Phone frame or Responsive Desktop */}
      <main className="w-full flex justify-center items-center flex-1">
        {viewMode === 'mobile' ? (
          <div
            id="phone-device-wrapper"
            className="relative w-full max-w-[390px] h-[820px] bg-slate-950 rounded-[48px] p-2.5 shadow-2xl shadow-indigo-950/60 ring-1 ring-white/10 border-4 border-slate-800 flex flex-col overflow-hidden transition-all duration-300"
          >
            {/* Phone Screen Viewport */}
            <div
              id="phone-screen-viewport"
              className={`relative flex-1 w-full rounded-[38px] overflow-hidden flex flex-col shadow-inner transition-colors duration-200 ${
                isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-800'
              }`}
            >
              {/* Mockup Status Bar matching screenshot_1.png (10:30 AM, Centered Dynamic Island, 100% Wifi Battery) */}
              <div
                id="phone-status-bar"
                className={`w-full pt-3 pb-2 px-6 flex items-center justify-between text-xs font-semibold z-40 select-none transition-colors ${
                  isDark ? 'bg-slate-950 text-slate-200' : `${statusBarBg} ${statusTextColor}`
                }`}
              >
                {/* Left: Time */}
                <div className="w-20 text-left">
                  <span className="font-semibold text-xs tracking-tight">10:30 AM</span>
                </div>

                {/* Center: Dynamic Island notch */}
                <div className="w-28 h-5 bg-slate-950 rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Right: Wifi, 100%, Battery */}
                <div className="w-20 flex items-center justify-end gap-1.5">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="text-[10px] tracking-tight">100%</span>
                  <BatteryMedium className="w-4 h-4" />
                </div>
              </div>

              {/* Active Screen Body */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {children}
              </div>
            </div>

            {/* Bottom Home Indicator bar */}
            <div className="w-full py-1 flex justify-center items-center bg-slate-950 z-40">
              <div className="w-32 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        ) : (
          /* Desktop Responsive View */
          <div
            id="desktop-device-wrapper"
            className={`w-full max-w-5xl h-[840px] rounded-3xl overflow-hidden shadow-2xl border transition-colors duration-200 flex flex-col ${
              isDark
                ? 'dark bg-slate-950 text-slate-100 border-slate-800'
                : 'bg-slate-50 text-slate-800 border-slate-300'
            }`}
          >
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
