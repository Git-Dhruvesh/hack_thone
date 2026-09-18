import React from 'react';
import { ScreenType, StudentProfile } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import { Award, TrendingUp, CheckCircle, BarChart3, PieChart, ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react';

interface AnalyticsScreenProps {
  student: StudentProfile;
  onNavigate: (screen: ScreenType) => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  student,
  onNavigate,
}) => {
  return (
    <div id="screen-analytics" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title="Performance Analytics"
        onBack={() => onNavigate('explore')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-0.5 rounded-full">
            Active Term
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Mockup #10 Hero Box with Question/Quiz Icon */}
        <div className="bg-white dark:bg-slate-900 p-4.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center relative transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2 shadow-inner">
            <Award className="w-8 h-8 stroke-[2]" />
          </div>

          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider">
            Comparative Benchmark
          </span>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
            ENGINEERING RETENTION INDEX
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xs leading-relaxed">
            Evaluation of your problem-solving retention versus national peer average across 14 modules.
          </p>

          {/* 30% / 70% Progress Badges matching Mockup #10 */}
          <div className="w-full grid grid-cols-2 gap-3 mt-4">
            {/* 30% Green Badge matching Mockup #10 */}
            <div className="bg-emerald-600 dark:bg-emerald-650 text-white p-3.5 rounded-2xl shadow-md shadow-emerald-500/20 text-left relative overflow-hidden border border-emerald-500/30">
              <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider block">
                Average Baseline
              </span>
              <span className="text-3xl font-extrabold font-mono tracking-tight block mt-1">
                30%
              </span>
              <p className="text-[10px] text-emerald-100 mt-1 line-clamp-1">
                Typical course retention
              </p>
            </div>

            {/* 70% Blue/Indigo Badge matching Mockup #10 */}
            <div className="bg-indigo-600 dark:bg-indigo-650 text-white p-3.5 rounded-2xl shadow-md shadow-indigo-600/20 text-left relative overflow-hidden border border-indigo-500/30">
              <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider block">
                Your AI Adaptive
              </span>
              <span className="text-3xl font-extrabold font-mono tracking-tight block mt-1">
                70%
              </span>
              <p className="text-[10px] text-indigo-100 mt-1 line-clamp-1">
                Active recall mastery
              </p>
            </div>
          </div>
        </div>

        {/* Analytic Breakdown Rows matching Mockup #10 with Icons */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800/80 overflow-hidden transition-colors">
          {/* Row 1 */}
          <div className="p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-900/40 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">Concept Mastery Rate</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">84%</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">High proficiency in algorithmic complexity</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">Time to Target Milestone</span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">6.4 wks</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Projected completion for AI Engineer track</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">Assessment Consistency</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">92%</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Scored in top decile in consecutive checks</p>
            </div>
          </div>
        </div>

        {/* AI Recommendations based on analytics */}
        <div className="bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 p-3.5 rounded-2xl space-y-1.5 transition-colors">
          <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            AI Diagnostic Recommendation
          </span>
          <p className="text-[11px] text-indigo-800/90 dark:text-indigo-300 leading-relaxed">
            Your retention in Deep Learning jumped from 45% to 70% after completing interactive quizzes. Revisit Lesson #2 in MLOps and Quadratic Equations notes to reach 85%+ readiness.
          </p>
        </div>

        {/* LEARNING PROGRESS TRACKING METRICS GRID */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-100 tracking-wider">
              Learning Progress Tracking
            </h3>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
              Real-Time Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Courses Completed</span>
              <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white mt-0.5 block">14 / 18</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">78% track completed</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Topics Completed</span>
              <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white mt-0.5 block">42 / 60</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">70% concepts mastered</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Lessons Finished</span>
              <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white mt-0.5 block">118 Lessons</span>
              <span className="text-[10px] text-slate-400 font-medium">64.5 study hours</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Learning Streak</span>
              <span className="text-base font-extrabold font-mono text-amber-500 mt-0.5 block">9 Days 🔥</span>
              <span className="text-[10px] text-slate-400 font-medium">Active daily study</span>
            </div>
          </div>
        </div>

        {/* TOPIC-WISE PERFORMANCE BREAKDOWN */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-100 tracking-wider">
              Topic-Wise Scores &amp; Benchmarks
            </h3>
            <span className="text-[10px] text-slate-400">Score vs. Benchmark</span>
          </div>

          <div className="space-y-2.5">
            {[
              { topic: 'Algebra', score: 85, benchmark: 70, status: 'Strong', color: 'bg-emerald-500' },
              { topic: 'Geometry', score: 62, benchmark: 65, status: 'Needs Improvement', color: 'bg-amber-500' },
              { topic: 'Probability', score: 48, benchmark: 60, status: 'Needs Improvement', color: 'bg-rose-500' },
              { topic: 'Statistics', score: 75, benchmark: 68, status: 'Proficient', color: 'bg-indigo-500' },
              { topic: 'Quadratic Equations', score: 54, benchmark: 65, status: 'Needs Attention', color: 'bg-amber-500' },
              { topic: 'Python Programming', score: 85, benchmark: 72, status: 'Strong', color: 'bg-emerald-500' },
            ].map((tp) => (
              <div key={tp.topic} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{tp.topic}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">Benchmark: {tp.benchmark}%</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{tp.score}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${tp.color}`}
                    style={{ width: `${tp.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SCORE IMPROVEMENT OVER TIME */}
        <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white p-4.5 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
              Progress Trajectory
            </span>
            <span className="text-xs font-bold text-emerald-300 font-mono bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
              +20% Net Gain
            </span>
          </div>

          <h3 className="text-sm font-bold mt-2 text-white">Score Improvement: 62% → 82%</h3>
          <p className="text-xs text-indigo-200 mt-0.5 leading-relaxed">
            Your comprehensive test scores have increased consistently over the last 30 days due to adaptive practice loops.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-indigo-500/30 text-xs">
            <div className="bg-white/10 p-2.5 rounded-xl">
              <span className="text-[9px] text-indigo-200 block uppercase font-bold">Diagnostic Entry Test</span>
              <span className="text-base font-black font-mono mt-0.5 block">62%</span>
              <span className="text-[9px] text-indigo-200">Feb 15, 2026</span>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-400/30 p-2.5 rounded-xl">
              <span className="text-[9px] text-emerald-200 block uppercase font-bold">Latest Evaluation</span>
              <span className="text-base font-black font-mono text-emerald-300 mt-0.5 block">82%</span>
              <span className="text-[9px] text-emerald-200">Mar 10, 2026</span>
            </div>
          </div>
        </div>

        {/* STRENGTHS & WEAKNESSES COMPARISON */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              Top Strengths
            </span>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Algebra &amp; Equations (85%)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Arithmetic Mastery (92%)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Python Scripting (85%)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1">
              Key Weaknesses
            </span>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>Probability Bayes (48%)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>Quadratic Factoring (54%)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>Coordinate Geometry (62%)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="analytics-continue-btn"
            onClick={() => onNavigate('lesson-quiz')}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold text-xs tracking-wider shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>TAKE NEXT ADAPTIVE ASSESSMENT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <BottomNav currentScreen="analytics" onNavigate={onNavigate} />
    </div>
  );
};
