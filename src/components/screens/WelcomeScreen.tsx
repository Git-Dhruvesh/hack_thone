import React from 'react';
import { ScreenType } from '../../types';
import { Sparkles, ArrowRight, BookOpen, GraduationCap, Award, Compass } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div
      id="screen-welcome"
      className="flex-1 flex flex-col justify-between items-center px-6 py-8 text-center bg-gradient-to-b from-white via-slate-50 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 text-slate-800 dark:text-slate-100 overflow-y-auto transition-colors"
    >
      <div className="w-full max-w-sm pt-3">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.16em] leading-relaxed text-center">
          INTELLIGENT LEARNING &amp; SKILL<br />DEVELOPMENT
        </p>
      </div>

      {/* Hero Illustration matching Mockup #1: Stack of Books with Graduation Cap */}
      <div className="relative my-6 w-60 h-60 flex items-center justify-center">
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="bookShadow" x="10" y="195" width="220" height="35" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="6" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.058 0 0 0 0 0.09 0 0 0 0 0.16 0 0 0 0.18 0" />
            </filter>
          </defs>

          {/* Soft blur shadow on the floor */}
          <ellipse cx="120" cy="208" rx="88" ry="8" fill="#0f172a" fillOpacity="0.14" />

          {/* 4. Bottom Cyan / Turquoise Book */}
          <rect x="38" y="177" width="164" height="25" rx="5" fill="#00b4d8" />
          <rect x="44" y="181" width="152" height="3" rx="1.5" fill="#38bdf8" />
          {/* Subtle triangle fold / badge in bottom right corner */}
          <polygon points="190,195 196,195 196,189" fill="#0891b2" />
          <circle cx="187" cy="193" r="1" fill="#0891b2" />

          {/* 3. Green Book */}
          <rect x="48" y="150" width="144" height="24" rx="4.5" fill="#10b981" />
          <rect x="54" y="154" width="132" height="3" rx="1.5" fill="#34d399" />

          {/* 2. Coral / Red Book */}
          <rect x="58" y="123" width="124" height="24" rx="4.5" fill="#f43f5e" />
          <rect x="64" y="126" width="112" height="3" rx="1.5" fill="#fb7185" />

          {/* Cyan ribbon bookmark hanging over the red book */}
          <path d="M136 123 v32 l6 -6 l6 6 v-32 Z" fill="#38bdf8" />

          {/* 1. Top Indigo / Royal Blue Book */}
          <rect x="68" y="96" width="104" height="24" rx="4.5" fill="#4338ca" />
          <rect x="74" y="99" width="92" height="3" rx="1.5" fill="#6366f1" />

          {/* Yellow Pencil leaning on the right side of the green and red books */}
          <g transform="rotate(16 182 140)">
            <rect x="178" y="126" width="7" height="48" rx="1.5" fill="#fbbf24" />
            <polygon points="178,174 185,174 181.5,182" fill="#fde68a" />
            <polygon points="180,179 183,179 181.5,182" fill="#334155" />
          </g>

          {/* Graduation Cap on top (Mortarboard) */}
          {/* Cap skull underneath */}
          <ellipse cx="120" cy="78" rx="26" ry="10" fill="#2d2994" />
          {/* Diamond top */}
          <polygon points="120,44 178,63 120,82 62,63" fill="#3b38c2" />
          {/* Cap center button */}
          <circle cx="120" cy="63" r="4.5" fill="#fbbf24" />

          {/* Golden tassel string looping right and draping down */}
          <path d="M120 63 Q148 68 152 86 v22" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Tassel fringe */}
          <rect x="150" y="108" width="5" height="13" rx="1.5" fill="#f59e0b" />
          <circle cx="152.5" cy="107" r="2" fill="#fbbf24" />
        </svg>
      </div>

      {/* Typography from Mockup #1 */}
      <div className="w-full max-w-xs space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-wider">
          EDUCATION
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed px-2">
          Personalized AI-powered skill-gap analysis, intelligent assessments, and machine learning career roadmaps.
        </p>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 pb-4">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/60">
            <Sparkles className="w-3 h-3 text-indigo-500" /> AI Skill-Gap
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/60">
            <Award className="w-3 h-3 text-emerald-500" /> Adaptive Quiz
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-pink-50 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded-full border border-pink-100 dark:border-pink-900/60">
            <Compass className="w-3 h-3 text-pink-500" /> ML Career Path
          </span>
        </div>
      </div>

      {/* Main Action Button matching Mockup #1 ("LOREM IPSUM" in mockup, here "Start Learning") */}
      <div className="w-full max-w-xs space-y-3 pb-4">
        <button
          id="welcome-get-started-btn"
          onClick={() => onNavigate('auth')}
          className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>START LEARNING</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          id="welcome-explore-link"
          onClick={() => onNavigate('explore')}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          Already have an account? <span className="text-indigo-600 dark:text-indigo-400 underline">Sign In</span>
        </button>
      </div>
    </div>
  );
};
