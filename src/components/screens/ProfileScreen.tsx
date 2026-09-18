import React, { useState } from 'react';
import { ScreenType, StudentProfile } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import { Star, Mail, MapPin, ShieldCheck, Award, Settings, Sparkles, LogOut, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ProfileScreenProps {
  student: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  student,
  onUpdateStudent,
  onNavigate,
}) => {
  const [aiTelemetryEnabled, setAiTelemetryEnabled] = useState(true);
  const [adaptivePace, setAdaptivePace] = useState(student.learningPaceHours);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div id="screen-profile" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title="Student Profile"
        onBack={() => onNavigate('explore')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <button
            onClick={() => onNavigate('auth')}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
            title="Switch Profile"
          >
            <LogOut className="w-4 h-4" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Profile Header matching Mockup #7 */}
        <div className="bg-white dark:bg-slate-900 p-4.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center relative overflow-hidden transition-colors">
          <div className="relative mb-2">
            <div className="w-20 h-20 rounded-full ring-4 ring-indigo-50 dark:ring-indigo-950/80 overflow-hidden bg-slate-150 dark:bg-slate-800 flex items-center justify-center">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full ring-2 ring-white dark:ring-slate-900">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 5-Star Rating matching Mockup #7 */}
          <div className="flex items-center gap-1 my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-sky-400 text-sky-400" />
            ))}
          </div>

          <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            {student.name}
          </h2>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
            {student.targetCareer}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-xs">
            {student.degree} • {student.university}
          </p>

          {/* Stats Badges */}
          <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="block text-sm font-extrabold text-slate-900 dark:text-slate-100">{student.totalScore}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">XP Points</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="block text-sm font-extrabold text-indigo-600 dark:text-indigo-400">{student.completedCoursesCount}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Completed</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="block text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{student.currentStreakDays}d</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Streak</span>
            </div>
          </div>
        </div>

        {/* Profile Field Rows matching Mockup #7 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800/80 overflow-hidden transition-colors">
          {/* Email */}
          <div className="p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider">Email Address</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{student.email}</p>
            </div>
          </div>

          {/* University / Department */}
          <div className="p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider">University Campus</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{student.university}</p>
            </div>
          </div>

          {/* Theme Mode Toggle Row */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Appearance Mode</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {isDark ? 'Dark Theme (OLED High Contrast)' : 'Light Theme (Clean Daylight)'}
                </span>
              </div>
            </div>
            <button
              type="button"
              id="profile-theme-toggle-btn"
              onClick={toggleTheme}
              className={`w-12 h-6.5 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                isDark ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center text-[10px] ${
                  isDark ? 'translate-x-5.5 text-indigo-700' : 'translate-x-0.5 text-amber-500'
                }`}
              >
                {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
              </span>
            </button>
          </div>

          {/* Adaptive Learning Hours Setting */}
          <div className="p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider">Weekly Commitment</span>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{adaptivePace} hrs/wk</span>
              </div>
              <input
                type="range"
                min="4"
                max="25"
                value={adaptivePace}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setAdaptivePace(val);
                  onUpdateStudent({ learningPaceHours: val });
                }}
                className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* AI Telemetry & Skill Assessment Toggle */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">AI Skill-Gap Telemetry</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Continuous model optimization</span>
              </div>
            </div>
            <button
              onClick={() => setAiTelemetryEnabled(!aiTelemetryEnabled)}
              className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                aiTelemetryEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  aiTelemetryEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Action Button: Skill-Gap Matrix */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate('skill-gap')}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-bold text-xs tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-400 dark:text-white" />
            <span>VIEW AI SKILL MATRIX</span>
          </button>
        </div>
      </div>

      <BottomNav currentScreen="profile" onNavigate={onNavigate} />
    </div>
  );
};
