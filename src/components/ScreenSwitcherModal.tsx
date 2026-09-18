import React from 'react';
import { ScreenType } from '../types';
import { X, BookOpen, User, CheckSquare, Award, Search, Calendar, UserCheck, BarChart2, Folder, PieChart, Atom, Map } from 'lucide-react';

interface ScreenSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export const ScreenSwitcherModal: React.FC<ScreenSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onSelectScreen,
}) => {
  if (!isOpen) return null;

  const screens: { id: ScreenType; num: number; title: string; desc: string; icon: React.ElementType; color: string }[] = [
    { id: 'welcome', num: 1, title: 'Splash / Welcome', desc: 'Hero books illustration & start button', icon: BookOpen, color: 'bg-indigo-500' },
    { id: 'auth', num: 2, title: 'Onboarding & Auth', desc: 'Student profile creation & career selection', icon: User, color: 'bg-rose-500' },
    { id: 'lesson-quiz', num: 3, title: 'Lesson #1 & Quiz', desc: 'Interactive player & multiple-choice quiz', icon: CheckSquare, color: 'bg-emerald-500' },
    { id: 'score-result', num: 4, title: 'Assessment Score', desc: 'Your score 1,028 & lesson checkpoints', icon: Award, color: 'bg-indigo-600' },
    { id: 'explore', num: 5, title: 'Search & Categories', desc: 'Category grid (Shield, Audio, Code, Bag)', icon: Search, color: 'bg-pink-500' },
    { id: 'calendar', num: 6, title: 'Schedule & Calendar', desc: 'March 2026 calendar & streak highlights', icon: Calendar, color: 'bg-teal-500' },
    { id: 'profile', num: 7, title: 'Profile & Settings', desc: '5-star student rating & telemetry preferences', icon: UserCheck, color: 'bg-sky-500' },
    { id: 'skill-gap', num: 8, title: 'AI Skill-Gap Matrix', desc: 'Gemini LLM skill analysis & priority gaps', icon: BarChart2, color: 'bg-emerald-600' },
    { id: 'modules', num: 9, title: 'Course Modules', desc: 'Dark syllabus cards (Cap, Bag, Notebook, Atom)', icon: Folder, color: 'bg-slate-700' },
    { id: 'analytics', num: 10, title: 'Retention Analytics', desc: '30% vs 70% retention index & metrics', icon: PieChart, color: 'bg-indigo-700' },
    { id: 'course-detail', num: 11, title: 'Course Detail & AI Tutor', desc: '99 Hours, 4.9 rating & live Gemini Copilot', icon: Atom, color: 'bg-cyan-600' },
    { id: 'roadmaps', num: 12, title: 'Career Roadmaps', desc: '24, 32, 26 course tracks with salary stats', icon: Map, color: 'bg-purple-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-5 text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>All 12 UI/UX Mockup Screens</span>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any screen from the UIUX design mockup to test components and view responsive layouts.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 overflow-y-auto py-4 pr-1">
          {screens.map((item) => {
            const Icon = item.icon;
            const isCurrent = currentScreen === item.id;
            return (
              <button
                key={item.id}
                id={`modal-screen-nav-${item.id}`}
                onClick={() => {
                  onSelectScreen(item.id);
                  onClose();
                }}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3 group ${
                  isCurrent
                    ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/30 text-white'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300 hover:text-white'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl ${item.color} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-indigo-400">
                      #{item.num}
                    </span>
                    <h3 className="text-xs font-bold truncate leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
          >
            Close Navigator
          </button>
        </div>
      </div>
    </div>
  );
};
