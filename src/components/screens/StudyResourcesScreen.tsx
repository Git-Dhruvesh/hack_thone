import React, { useState, useEffect } from 'react';
import { ScreenType, StudentProfile, StudyResourceItem } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import {
  BookOpen,
  HelpCircle,
  FileText,
  Video,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Flame,
  Search,
  Filter,
  Eye,
  CheckSquare,
  Bookmark,
  Zap,
} from 'lucide-react';

interface StudyResourcesScreenProps {
  student: StudentProfile;
  initialTopic?: string;
  onNavigate: (screen: ScreenType) => void;
}

export const StudyResourcesScreen: React.FC<StudyResourcesScreenProps> = ({
  student,
  initialTopic = 'Quadratic Equations',
  onNavigate,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [resources, setResources] = useState<StudyResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeExampleIndex, setActiveExampleIndex] = useState<number | null>(0);
  const [revealedHintIndex, setRevealedHintIndex] = useState<number | null>(null);

  const topicsList = ['All', 'Quadratic Equations', 'Probability', 'Geometry', 'Algebra'];

  const categoriesList = ['All', 'Notes', 'Solved Examples', 'Practice Questions', 'Topic Summaries', 'Revision Material'];

  const fetchResources = async (topic: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/study-resources?topic=${encodeURIComponent(topic === 'All' ? 'all' : topic)}`);
      const data = await res.json();
      if (data && data.resources) {
        setResources(data.resources);
      }
    } catch (err) {
      console.error('Error fetching study resources:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources(selectedTopic);
  }, [selectedTopic]);

  const filteredResources = resources.filter((res) => {
    if (selectedCategory === 'All') return true;
    return res.category === selectedCategory;
  });

  return (
    <div id="screen-study-resources" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title="Personalized Study Resources"
        onBack={() => onNavigate('explore')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <button
            onClick={() => onNavigate('assessments')}
            className="text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 px-2.5 py-1 rounded-full hover:bg-indigo-100 cursor-pointer"
          >
            Take Quiz
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Gap Alert Banner for Weak Topic (e.g. Quadratic Equations) */}
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-slate-900 text-white p-4.5 rounded-3xl shadow-lg shadow-amber-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-black/20 px-2.5 py-0.5 rounded-full">
              🎯 Priority Skill-Gap Focus
            </span>
            <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
              Current Mastery: 54%
            </span>
          </div>

          <h2 className="text-base font-black text-white mt-2">
            Targeted Remedial: {selectedTopic === 'All' ? 'Foundational Mathematics' : selectedTopic}
          </h2>
          <p className="text-xs text-amber-100 mt-1 leading-relaxed max-w-sm">
            Based on your recent assessment, revising {selectedTopic} will immediately unlock Calculus and Neural Optimization prerequisites.
          </p>

          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-amber-400/30">
            <button
              onClick={() => onNavigate('assessments')}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-amber-50 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Launch Revision Quiz</span>
            </button>
            <button
              onClick={() => onNavigate('learning-path')}
              className="px-3 py-1.5 rounded-xl bg-white/20 text-white text-xs font-medium hover:bg-white/30 transition-all cursor-pointer"
            >
              View Learning Path
            </button>
          </div>
        </div>

        {/* Topic Selector Pills */}
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block mb-1.5">
            Select Competency / Topic
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {topicsList.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedTopic === t
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills (Notes, Solved Examples, Practice, Summaries) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource Cards Feed */}
        <div className="space-y-3.5">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 px-2 py-0.5 rounded-full">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {res.estimatedReadMinutes} min read
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                  {res.badge}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                {res.title}
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {res.description}
              </p>

              {/* Solved Examples Interactive Walkthrough */}
              {res.examples && res.examples.length > 0 && (
                <div className="mt-3 bg-slate-50 dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                      Worked Step-by-Step Problem
                    </span>
                    <span className="text-[10px] text-slate-400">Step 1 to 3</span>
                  </div>

                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {res.examples[0].problem}
                  </p>

                  <div className="mt-2 space-y-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    <p>• {res.examples[0].step1}</p>
                    <p>• {res.examples[0].step2}</p>
                    <p>• {res.examples[0].step3}</p>
                  </div>

                  <div className="mt-2.5 p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                      Solution: {res.examples[0].solution}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Verified</span>
                  </div>
                </div>
              )}

              {/* Key Bullet Points if available */}
              {res.keyPoints && res.keyPoints.length > 0 && (
                <div className="mt-3 bg-slate-50 dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider block mb-1">
                    Key Concept Takeaways
                  </span>
                  {res.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Topic: <strong className="text-slate-700 dark:text-slate-300">{res.connectedSkill}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('assessments')}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    Practice Questions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav currentScreen="explore" onNavigate={onNavigate} />
    </div>
  );
};
