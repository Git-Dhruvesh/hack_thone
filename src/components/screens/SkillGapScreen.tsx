import React, { useState } from 'react';
import { ScreenType, StudentProfile, StudentSkill, SkillGapAnalysisResult } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import { Search, Sparkles, AlertCircle, CheckCircle2, ChevronRight, TrendingUp, Sliders, RefreshCw, Layers } from 'lucide-react';

interface SkillGapScreenProps {
  student: StudentProfile;
  onUpdateSkill: (skillId: string, currentLevel: number) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const SkillGapScreen: React.FC<SkillGapScreenProps> = ({
  student,
  onUpdateSkill,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [aiResult, setAiResult] = useState<SkillGapAnalysisResult | null>({
    readinessScore: 68,
    summary: `Your engineering fundamentals for ${student.targetCareer} are solid. Bridging deep learning architectures and production containerization will make you top-percentile ready.`,
    skillGaps: [
      { skill: 'Docker & MLOps Pipelines', currentLevel: 40, targetLevel: 80, gap: 40, priority: 'Urgent' },
      { skill: 'PyTorch & Deep Learning', currentLevel: 55, targetLevel: 90, gap: 35, priority: 'High' },
      { skill: 'Full-Stack System Design', currentLevel: 62, targetLevel: 85, gap: 23, priority: 'Medium' },
    ],
    strengths: ['Python Scientific Computing', 'Algorithmic Problem Solving', 'Linear Algebra Foundations'],
    recommendedActions: [
      'Complete the Production MLOps containerization milestone this week',
      'Deploy an end-to-end PyTorch model inference API with FastAPI',
      'Take the Dynamic Programming adaptive assessment',
    ],
    estimatedWeeksToTarget: 8,
  });

  // Call server Gemini endpoint to perform real-time skill-gap analysis
  const handleRunAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: student.targetCareer,
          currentSkills: student.skills,
          experienceLevel: 'Undergraduate / Intermediate Engineer',
          learningGoals: 'Become industry-ready AI Engineer with production deployment mastery',
        }),
      });
      const data = await res.json();
      if (data && data.readinessScore !== undefined) {
        setAiResult(data);
      }
    } catch (err) {
      console.error('Error running AI skill-gap analysis:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const tags = ['All', 'AI/ML', 'CS Core', 'Systems', 'Mathematics', 'Architecture'];

  const filteredSkills = student.skills.filter((sk) => {
    const matchesSearch =
      sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sk.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedTag === 'All') return matchesSearch;
    return matchesSearch && sk.category.toLowerCase() === selectedTag.toLowerCase();
  });

  return (
    <div id="screen-skill-gap" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title="AI Skill-Gap Matrix"
        onBack={() => onNavigate('explore')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <button
            onClick={handleRunAIAnalysis}
            disabled={isAnalyzing}
            className="p-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 cursor-pointer"
            title="Run Gemini AI Analysis"
          >
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Search Bar matching Mockup #8 */}
        <div className="relative">
          <input
            id="skill-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search engineering competencies..."
            className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          <div className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Big Teal/Cyan Expandable Skill Card matching Mockup #8 */}
        <div
          id="skill-primary-card"
          className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white p-4.5 rounded-3xl shadow-xl shadow-teal-900/20 border border-teal-500/40 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Target Role Readiness
            </span>
            <span className="text-xl font-extrabold font-mono text-white">
              {aiResult?.readinessScore ?? 68}%
            </span>
          </div>

          <h3 className="text-base font-bold mt-1 text-white">
            {student.targetCareer}
          </h3>
          <p className="text-xs text-teal-50 mt-1 leading-relaxed">
            {aiResult?.summary}
          </p>

          {/* Readiness gauge */}
          <div className="mt-3.5 space-y-1">
            <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-yellow-300 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${aiResult?.readinessScore ?? 68}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-teal-100 font-medium">
              <span>Foundation</span>
              <span>Target Benchmark: 85%</span>
              <span>Industry-Ready</span>
            </div>
          </div>

          {/* AI Trigger Button inside card */}
          <div className="mt-4 pt-3 border-t border-teal-500/40 flex items-center justify-between">
            <span className="text-[11px] text-teal-100">
              Est. {aiResult?.estimatedWeeksToTarget ?? 8} weeks to target proficiency
            </span>
            <button
              id="skill-run-ai-btn"
              onClick={handleRunAIAnalysis}
              disabled={isAnalyzing}
              className="px-3 py-1.5 rounded-xl bg-white text-teal-900 font-bold text-xs hover:bg-teal-50 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Recalibrate AI'}</span>
            </button>
          </div>
        </div>

        {/* Priority Gaps Identified by Gemini LLM */}
        {aiResult?.skillGaps && aiResult.skillGaps.length > 0 && (
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                Priority Gaps Identified by AI
              </span>
              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-100 dark:border-rose-900/50">
                Requires Study
              </span>
            </div>

            <div className="space-y-2">
              {aiResult.skillGaps.map((gap, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{gap.skill}</span>
                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-950/80 px-1.5 py-0.5 rounded">
                      -{gap.gap}% Gap
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    <span>Current: {gap.currentLevel}%</span>
                    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full"
                        style={{ width: `${gap.currentLevel}%` }}
                      />
                    </div>
                    <span>Goal: {gap.targetLevel}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPREHENSIVE SKILL-GAP DASHBOARD (Strong Skills, Needs Improvement, Priority to Improve) */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider px-1">
            Skill Diagnosis &amp; Root-Cause Analysis
          </h3>

          {/* 1. Strong Skills */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Strong Skills (Mastery Demonstrated)
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                3 Competencies
              </span>
            </div>
            <div className="space-y-2">
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Algebra (85%)</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">High Proficiency</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  <strong>Why Strong:</strong> High accuracy in linear equations and algebraic polynomial simplification assessments.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Basic Arithmetic (92%)</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Mastery</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  <strong>Why Strong:</strong> Zero incorrect attempts across ratio, fractional, and percentage baselines.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Python &amp; Scientific Computing (85%)</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">High Proficiency</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  <strong>Why Strong:</strong> Demonstrated solid NumPy array manipulations and vector operations.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Needs Improvement */}
          <div className="bg-amber-50/60 dark:bg-amber-950/30 p-3.5 rounded-2xl border border-amber-200 dark:border-amber-800/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Skills That Need Improvement
              </span>
              <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                Moderate Gaps
              </span>
            </div>
            <div className="space-y-2">
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-100 dark:border-amber-900/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Geometry (62%)</span>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">-23% Gap</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  <strong>Diagnosis:</strong> Inconsistent performance on coordinate plane transformations and trigonometric identities in quizzes.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-100 dark:border-amber-900/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Probability (48%)</span>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">-37% Gap</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  <strong>Diagnosis:</strong> Recent diagnostic flagged difficulty applying Bayes Theorem and joint distribution models.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-100 dark:border-amber-900/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Statistics (75%)</span>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">-15% Gap</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  <strong>Diagnosis:</strong> Solid comprehension of variance, but hypothesis testing p-value calculations require deeper practice.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Priority Skills to Bridge */}
          <div className="bg-rose-50/60 dark:bg-rose-950/30 p-3.5 rounded-2xl border border-rose-200 dark:border-rose-800/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                Priority Skills to Improve Immediately
              </span>
              <span className="text-[10px] font-bold bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded-full">
                High Priority
              </span>
            </div>
            <div className="space-y-2">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-rose-100 dark:border-rose-900/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white">Quadratic Equations (54%)</span>
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded-full">
                    -36% Gap
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  <strong>Why Weak:</strong> Essential prerequisite for Calculus and Optimization. Quadratic factoring and discriminant determination need revision before advancing.
                </p>
                <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onNavigate('study-resources')}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Open Quadratic Equations Notes &amp; Solved Examples →
                  </button>
                  <button
                    onClick={() => onNavigate('assessments')}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] rounded-lg cursor-pointer"
                  >
                    Take Quiz
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-rose-100 dark:border-rose-900/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white">Docker &amp; MLOps Pipelines (40%)</span>
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded-full">
                    -40% Gap
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  <strong>Why Weak:</strong> Critical for production deployment. Containerization, multi-stage builds, and deployment pipelines have lowest current coverage.
                </p>
                <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onNavigate('modules')}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    View Recommended MLOps Courses →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Connect Navigation Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onNavigate('learning-path')}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-left hover:border-indigo-400 shadow-xs transition-all cursor-pointer"
            >
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Path Sync
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">
                Personalized Path
              </span>
              <span className="text-[10px] text-slate-400">Targeted topic sequence</span>
            </button>

            <button
              onClick={() => onNavigate('skill-planner')}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-left hover:border-indigo-400 shadow-xs transition-all cursor-pointer"
            >
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Career Roadmap
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">
                Skill Development Plan
              </span>
              <span className="text-[10px] text-slate-400">8-step career milestones</span>
            </button>
          </div>
        </div>


        {/* Colorful Tag Pills Row matching Mockup #8 */}
        <div>
          <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
            Filter Competency Domain
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  id={`skill-tag-${tag}`}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200/60 dark:border-emerald-800/50'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Skills Sliders List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Adjust Your Current Proficiency
            </h4>
            <span className="text-[10px] text-slate-400 dark:text-slate-400">Drag to re-evaluate</span>
          </div>

          <div className="space-y-2">
            {filteredSkills.map((sk) => (
              <div
                key={sk.id}
                id={`skill-row-${sk.id}`}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">{sk.name}</h5>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{sk.category}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
                    {sk.currentLevel}% / {sk.targetLevel}%
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="100"
                  value={sk.currentLevel}
                  onChange={(e) => onUpdateSkill(sk.id, Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="skill-view-modules-btn"
            onClick={() => onNavigate('modules')}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold text-xs tracking-wider shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>VIEW CURATED COURSE MODULES</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <BottomNav currentScreen="skill-gap" onNavigate={onNavigate} />
    </div>
  );
};
