import React, { useState, useEffect } from 'react';
import { ScreenType, StudentProfile, LearningPathData, LearningPathTopic } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import {
  Compass,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Lock,
  Play,
  RotateCcw,
  Target,
  BarChart3,
  Layers,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface PersonalizedLearningPathScreenProps {
  student: StudentProfile;
  onNavigate: (screen: ScreenType) => void;
  onSelectTopicForStudy?: (topicName: string) => void;
}

export const PersonalizedLearningPathScreen: React.FC<PersonalizedLearningPathScreenProps> = ({
  student,
  onNavigate,
  onSelectTopicForStudy,
}) => {
  const [learningPath, setLearningPath] = useState<LearningPathData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTier, setSelectedTier] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [activeTopic, setActiveTopic] = useState<LearningPathTopic | null>(null);

  const fetchLearningPath = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/learning-path?targetCareer=${encodeURIComponent(student.targetCareer)}`);
      const data = await res.json();
      if (data && data.topics) {
        setLearningPath(data);
        setActiveTopic(data.currentTopic || data.topics[0]);
      }
    } catch (err) {
      console.error('Failed to fetch learning path from API, using fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningPath();
  }, [student.targetCareer, student.totalScore]);

  const filteredTopics = learningPath?.topics.filter((t) => {
    if (selectedTier === 'All') return true;
    return t.tier === selectedTier;
  }) || [];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Beginner':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/80';
      case 'Intermediate':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/80';
      case 'Advanced':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/80';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div id="screen-learning-path" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title="Personalized Learning Path"
        onBack={() => onNavigate('explore')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <button
            onClick={fetchLearningPath}
            className="p-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"
            title="Recalculate path based on latest score"
          >
            <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Hero Path Banner with Progress Ring */}
        <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white p-4.5 rounded-3xl shadow-xl shadow-indigo-700/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
              AI Adapted Progression
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>Tailored for {student.targetCareer.split(' ')[0]}</span>
            </div>
          </div>

          <div className="mt-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-white">
                {learningPath?.trackTitle || 'Foundational to Production Roadmap'}
              </h2>
              <p className="text-xs text-indigo-200 mt-1 max-w-xs leading-relaxed">
                Curated progression based on your high Algebra accuracy (85%) and priority focus on Quadratic Equations &amp; Probability.
              </p>
            </div>

            {/* Circular Progress Indicator */}
            <div className="flex flex-col items-center shrink-0 bg-white/10 p-2.5 rounded-2xl border border-white/10">
              <span className="text-2xl font-black font-mono text-emerald-300">
                {learningPath?.progressPercentage ?? 35}%
              </span>
              <span className="text-[9px] uppercase font-bold text-indigo-200 tracking-wider mt-0.5">
                Path Progress
              </span>
            </div>
          </div>

          {/* Stat Badges */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-indigo-500/30 text-center">
            <div className="bg-white/10 rounded-xl p-2">
              <span className="text-xs font-extrabold font-mono block">
                {learningPath?.completedTopics ?? 2} / {learningPath?.totalTopics ?? 8}
              </span>
              <span className="text-[9px] text-indigo-200">Topics Done</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <span className="text-xs font-extrabold font-mono block">
                {learningPath?.estimatedRemainingHours ?? 12.5} hrs
              </span>
              <span className="text-[9px] text-indigo-200">Remaining</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <span className="text-xs font-extrabold font-mono block text-amber-300">
                {student.currentStreakDays} Days
              </span>
              <span className="text-[9px] text-indigo-200">Active Streak</span>
            </div>
          </div>
        </div>

        {/* Current Focus Highlight Card */}
        {learningPath?.currentTopic && (
          <div className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-400/40 dark:border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider">
                  Current Active Topic
                </span>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                  Skill Gap Focus
                </span>
              </div>
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5 truncate">
                {learningPath.currentTopic.title}
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                Identified as your highest-yield priority to reach calculus and ML readiness. Includes notes and 5 worked examples.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => {
                    if (onSelectTopicForStudy) onSelectTopicForStudy('Quadratic Equations');
                    onNavigate('study-resources');
                  }}
                  className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Study Notes</span>
                </button>
                <button
                  onClick={() => onNavigate('assessments')}
                  className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Practice Quiz</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tier Filter Tabs: All, Beginner, Intermediate, Advanced */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTier === tier
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {tier === 'All' ? 'All Progression Tiers' : `${tier} Tier`}
            </button>
          ))}
        </div>

        {/* Visual Topic Stepper / Roadmap */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Step-by-Step Learning Sequence
            </h3>
            <span className="text-[11px] text-slate-500">
              {filteredTopics.length} steps shown
            </span>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-4 py-1">
            {filteredTopics.map((topic, idx) => {
              const isCompleted = topic.status === 'completed';
              const isCurrent = topic.status === 'current';
              const isNext = topic.status === 'next';
              const isLocked = topic.status === 'locked';

              return (
                <div key={topic.id} className="relative pl-6 group">
                  {/* Stepper Node Bullet */}
                  <div
                    className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-amber-500 border-amber-300 text-slate-950 ring-4 ring-amber-500/20 animate-pulse'
                        : isNext
                        ? 'bg-indigo-600 border-indigo-400 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    ) : isLocked ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-xs font-mono font-black">{topic.order}</span>
                    )}
                  </div>

                  {/* Topic Card */}
                  <div
                    onClick={() => {
                      if (!isLocked) {
                        setActiveTopic(topic);
                        if (topic.connectedSkill) {
                          if (onSelectTopicForStudy) onSelectTopicForStudy(topic.connectedSkill);
                        }
                      }
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-white dark:bg-slate-900 border-amber-400 dark:border-amber-500/50 shadow-md ring-1 ring-amber-400/30'
                        : isCompleted
                        ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-900/50 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getTierColor(topic.tier)}`}>
                          {topic.tier}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {topic.category}
                        </span>
                      </div>

                      {/* Status Tag */}
                      {isCompleted && (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                          Mastered ({topic.score}%)
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                      )}
                      {isNext && (
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                          Next Recommended
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5">
                      {topic.title}
                    </h4>

                    {/* Concepts Pill List */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {topic.conceptsCovered.map((c, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded-md"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions & Duration */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{topic.estimatedMinutes} min</span>
                      </div>

                      {!isLocked ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (topic.connectedSkill && onSelectTopicForStudy) {
                              onSelectTopicForStudy(topic.connectedSkill);
                            }
                            onNavigate('study-resources');
                          }}
                          className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>{isCompleted ? 'Review Notes' : 'Continue Learning'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">
                          Requires: {topic.prerequisites[0] || 'Prior Level'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Action Navigation Bar */}
        <div className="bg-slate-900 dark:bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <h4 className="text-xs font-bold text-white">Need to bridge a specific skill gap?</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Explore personalized study sheets and solved examples.</p>
          </div>
          <button
            onClick={() => onNavigate('study-resources')}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
          >
            <span>Study Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <BottomNav currentScreen="explore" onNavigate={onNavigate} />
    </div>
  );
};
