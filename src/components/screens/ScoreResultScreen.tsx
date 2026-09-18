import React from 'react';
import { ScreenType, StudentProfile } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import { Star, Play, CheckCircle2, Award, Zap, TrendingUp, ArrowRight, BookOpen } from 'lucide-react';

interface ScoreResultScreenProps {
  student: StudentProfile;
  onNavigate: (screen: ScreenType) => void;
}

export const ScoreResultScreen: React.FC<ScoreResultScreenProps> = ({
  student,
  onNavigate,
}) => {
  const completedLessons = [
    {
      id: 'l1',
      title: 'Empirical Risk & Loss Function Geometries',
      duration: '24 min',
      score: 95,
      completed: true,
      desc: 'Mastery verified in convex optimization and gradient updates.',
    },
    {
      id: 'l2',
      title: 'Stochastic Gradient Descent & Mini-Batching',
      duration: '32 min',
      score: 92,
      completed: true,
      desc: 'Applied adaptive learning rates (AdamW, RMSprop) to avoid local minima.',
    },
    {
      id: 'l3',
      title: 'Neural Regularization & Early Stopping',
      duration: '28 min',
      score: 88,
      completed: true,
      desc: 'L1/L2 weight decay and dropout mechanisms configured.',
    },
    {
      id: 'l4',
      title: 'Model Validation & Cross-Validation Bounds',
      duration: '30 min',
      score: 90,
      completed: false,
      desc: 'Next recommended milestone in your personalized learning sequence.',
    },
  ];

  return (
    <div id="screen-score-result" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      {/* Mockup #4 Blue / Indigo Header */}
      <ScreenHeader
        title="Assessment Results"
        onBack={() => onNavigate('lesson-quiz')}
        headerColorClass="bg-indigo-600 text-white"
        textColorClass="text-white"
        rightAction={
          <button
            onClick={() => onNavigate('analytics')}
            className="text-xs font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full hover:bg-white/30 transition-all cursor-pointer"
          >
            Analytics
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Mockup #4 Dark Score Card */}
        <div
          id="score-hero-card"
          className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-4.5 rounded-3xl shadow-xl shadow-indigo-950/40 border border-indigo-900/50 overflow-hidden"
        >
          {/* Subtle background ring effects */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />

          <div className="flex items-center gap-3.5">
            {/* Avatar matching Mockup #4 */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full ring-2 ring-indigo-400/80 p-0.5 bg-slate-800 flex items-center justify-center overflow-hidden">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // Fallback to avatar graphic if image is offline
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-slate-900">
                <CheckCircle2 className="w-3 h-3 stroke-[3]" />
              </div>
            </div>

            {/* Score & Stars matching Mockup #4 */}
            <div className="flex-1">
              <span className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">
                Your Cumulative Score
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
                  {student.totalScore}
                </span>
                <div className="flex items-center gap-1 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Top 5%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                {student.targetCareer} Milestone Path
              </p>
            </div>
          </div>

          {/* Progress Bar in Mockup #4 Card */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+142 pts this week</span>
            </div>
            <span className="text-slate-400 text-[11px]">Next rank at 1,200</span>
          </div>
        </div>

        {/* Milestone Lessons List with Play indicators matching Mockup #4 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Module Lessons &amp; Checkpoints
            </h2>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">3 Completed</span>
          </div>

          <div className="space-y-2">
            {completedLessons.map((item, idx) => (
              <div
                key={item.id}
                id={`lesson-item-${item.id}`}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-800/80 transition-all flex items-center gap-3 group"
              >
                {/* Play icon button matching Mockup #4 */}
                <button
                  onClick={() => onNavigate('lesson-quiz')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    item.completed
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
                      : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
                  }`}
                  title={item.completed ? 'Review Lesson' : 'Start Lesson'}
                >
                  <Play className="w-4 h-4 fill-current translate-x-0.5" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.completed ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md flex items-center gap-0.5 ml-2 shrink-0 border border-emerald-100 dark:border-emerald-800/60">
                        <CheckCircle2 className="w-3 h-3" /> {item.score}%
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md ml-2 shrink-0">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Continue to Skill-Gap Matrix */}
        <div className="pt-2">
          <button
            id="score-continue-skill-gap-btn"
            onClick={() => onNavigate('skill-gap')}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs tracking-wider shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ANALYZE AI SKILL-GAPS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <BottomNav currentScreen="score-result" onNavigate={onNavigate} />
    </div>
  );
};
