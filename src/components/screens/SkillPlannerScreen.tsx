import React, { useState, useEffect } from 'react';
import { ScreenType, StudentProfile, SkillPlanData, SkillPlanStepItem } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import {
  Target,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  TrendingUp,
  Sliders,
  RotateCcw,
  CheckSquare,
  BarChart2,
  ExternalLink,
} from 'lucide-react';

interface SkillPlannerScreenProps {
  student: StudentProfile;
  onNavigate: (screen: ScreenType) => void;
}

export const SkillPlannerScreen: React.FC<SkillPlannerScreenProps> = ({
  student,
  onNavigate,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('Data Analyst');
  const [planData, setPlanData] = useState<SkillPlanData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const targetRoles = [
    'Data Analyst',
    'AI/ML Engineer',
    'Software Developer',
    'Web Developer',
    'Cybersecurity Analyst',
  ];

  const fetchPlan = async (target: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/skill-plan?target=${encodeURIComponent(target)}`);
      const data = await res.json();
      if (data && data.steps) {
        setPlanData(data);
      }
    } catch (err) {
      console.error('Failed to fetch skill plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan(selectedTarget);
  }, [selectedTarget]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/80';
      case 'High':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/80';
      case 'Medium':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/80';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div id="screen-skill-planner" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title="Skill Development Planner"
        onBack={() => onNavigate('explore')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <button
            onClick={() => fetchPlan(selectedTarget)}
            className="p-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors cursor-pointer"
            title="Recalculate Roadmap"
          >
            <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Target Career Selection Dropdown / Badges */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              TARGET CAREER GOAL
            </span>
            <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800/60">
              8-Step Milestone
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {targetRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedTarget(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedTarget === role
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Goal Progress Bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Preparation Readiness:
              </span>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {planData?.overallPlanProgress ?? 35}%
              </span>
            </div>
            <div className="w-28 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${planData?.overallPlanProgress ?? 35}%` }}
              />
            </div>
          </div>
        </div>

        {/* Plan Steps List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Step-by-Step Curriculum
            </h3>
            <span className="text-[11px] text-slate-500">
              {planData?.steps.length ?? 8} Steps
            </span>
          </div>

          <div className="space-y-3">
            {planData?.steps.map((item) => {
              const isCompleted = item.status === 'completed';
              const isInProgress = item.status === 'in-progress';

              return (
                <div
                  key={item.step}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-900/40 shadow-sm'
                      : isInProgress
                      ? 'bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-500 shadow-md ring-1 ring-indigo-400/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-90'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isInProgress
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md border ${getPriorityBadge(item.priority)}`}>
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.skill}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 block">
                        {item.currentLevel}% → {item.targetLevel}%
                      </span>
                      <span className="text-[9px] text-slate-400">
                        {isCompleted ? 'Verified' : `${item.targetLevel - item.currentLevel}% to bridge`}
                      </span>
                    </div>
                  </div>

                  {/* Level Slider / Progress */}
                  <div className="mt-2.5 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${item.currentLevel}%` }}
                    />
                  </div>

                  {/* Recommendation Details */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Recommended Resource
                      </span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 truncate block mt-0.5">
                        {item.recommendedResources}
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Recommended Practice
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 truncate block mt-0.5">
                        {item.practice}
                      </span>
                    </div>
                  </div>

                  {/* Direct Link to Learning Path or Quiz */}
                  <div className="mt-2.5 flex items-center justify-end gap-2">
                    <button
                      onClick={() => onNavigate('learning-path')}
                      className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Sync to Learning Path</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav currentScreen="explore" onNavigate={onNavigate} />
    </div>
  );
};
