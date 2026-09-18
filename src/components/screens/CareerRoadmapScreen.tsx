import React, { useState, useEffect } from 'react';
import { ScreenType, CareerTrack, Course } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import {
  Atom,
  Cpu,
  Database,
  Shield,
  Palette,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Clock,
  TrendingUp,
  ExternalLink,
  BookOpen,
  Layers,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Briefcase,
  Compass,
  Check,
  Zap,
  HeartPulse,
  Stethoscope,
  Activity,
  GraduationCap,
} from 'lucide-react';

interface CareerRoadmapScreenProps {
  tracks: CareerTrack[];
  onSelectTrack: (track: CareerTrack) => void;
  onNavigate: (screen: ScreenType) => void;
  onSelectCourse?: (course: Course) => void;
  selectedTrack?: CareerTrack | null;
  initialDetailView?: boolean;
  initialDomainFilter?: 'All' | 'Doctor & Medicine' | 'Engineering & Tech' | 'Design & Product';
}

export const CareerRoadmapScreen: React.FC<CareerRoadmapScreenProps> = ({
  tracks,
  onSelectTrack,
  onNavigate,
  onSelectCourse,
  selectedTrack: propSelectedTrack,
  initialDetailView = false,
  initialDomainFilter = 'All',
}) => {
  const [selectedTrack, setSelectedTrack] = useState<CareerTrack | null>(
    propSelectedTrack ||
      tracks.find((t) => t.id === 'track-ai-ml') ||
      tracks.find((t) => t.id === 'track-gynecologist') ||
      tracks.find((t) => t.id === 'track-ui-ux') ||
      tracks[0] ||
      null
  );
  const [isDetailView, setIsDetailView] = useState(initialDetailView);
  const [domainFilter, setDomainFilter] = useState<'All' | 'Doctor & Medicine' | 'Engineering & Tech' | 'Design & Product'>(
    initialDomainFilter !== 'All' ? initialDomainFilter : (propSelectedTrack?.domainCategory as any) || 'All'
  );

  useEffect(() => {
    if (propSelectedTrack) {
      setSelectedTrack(propSelectedTrack);
      if (propSelectedTrack.domainCategory) {
        setDomainFilter(propSelectedTrack.domainCategory as any);
      }
    }
  }, [propSelectedTrack]);

  useEffect(() => {
    if (initialDetailView !== undefined) {
      setIsDetailView(initialDetailView);
    }
  }, [initialDetailView]);

  useEffect(() => {
    if (initialDomainFilter && initialDomainFilter !== 'All') {
      setDomainFilter(initialDomainFilter);
    }
  }, [initialDomainFilter]);

  // Interactive state for domain prerequisites
  const [checkedPrereqs, setCheckedPrereqs] = useState<Record<string, boolean>>({
    'MBBS Degree + NEET PG / NEXT Qualification': true,
    'Diploma in Gynecology and Obstetrics (DGO) or MD/MS': true,
    'No Prior Design Experience Needed': true,
    'Basic computer skills and comfort using design tools': true,
    'An eye for visual detail': true,
  });

  // Interactive Time Calculator state (hours per day)
  const [hoursPerDay, setHoursPerDay] = useState<number>(4);

  // Active tab in domain detail
  const [activeTab, setActiveTab] = useState<'overview' | 'prereqs' | 'difficulty' | 'mistakes' | 'tools'>('overview');

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'atom':
        return <Atom className="w-5 h-5 text-indigo-500" />;
      case 'bag':
        return <Cpu className="w-5 h-5 text-cyan-500" />;
      case 'chart':
        return <Database className="w-5 h-5 text-amber-500" />;
      case 'figma':
      case 'palette':
        return <Palette className="w-5 h-5 text-pink-500" />;
      case 'heart-pulse':
      case 'stethoscope':
        return <HeartPulse className="w-5 h-5 text-rose-500" />;
      default:
        return <Shield className="w-5 h-5 text-purple-500" />;
    }
  };

  const calculateMonths = (hours: number, track?: CareerTrack | null) => {
    if (track?.timeCalculatorPresets && track.timeCalculatorPresets.length > 0) {
      const matched = track.timeCalculatorPresets.find((p) => p.hoursPerDay === hours);
      if (matched) {
        return { months: matched.months, label: `${matched.months} months` };
      }
    }
    switch (hours) {
      case 1:
        return { months: 10, label: '10 months' };
      case 2:
        return { months: 5, label: '5 months' };
      case 3:
        return { months: 3.5, label: '3.5 months' };
      case 4:
        return { months: 24, label: '24–36 months' };
      case 6:
        return { months: 20, label: '20–24 months' };
      case 8:
        return { months: 18, label: '18 months' };
      default:
        return { months: 12, label: '12 months' };
    }
  };

  const togglePrereq = (title: string) => {
    setCheckedPrereqs((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const currentCalculatorResult = calculateMonths(hoursPerDay, selectedTrack);

  const filteredTracks =
    domainFilter === 'All'
      ? tracks
      : tracks.filter((t) => t.domainCategory === domainFilter);

  // Render Detailed Domain Roadmap View
  if (isDetailView && selectedTrack) {
    const isDoctor = selectedTrack.domainCategory === 'Doctor & Medicine';
    const isUiUx = selectedTrack.id === 'track-ui-ux';
    const totalPrereqs = selectedTrack.prerequisites?.length || 4;
    const completedPrereqsCount = selectedTrack.prerequisites
      ? selectedTrack.prerequisites.filter((p) => checkedPrereqs[p.text]).length
      : 2;
    const readinessPercentage = Math.min(100, Math.max(25, Math.round((completedPrereqsCount / totalPrereqs) * 100)));

    const gradientClass = isDoctor
      ? 'from-rose-600 via-pink-600 to-red-800 shadow-rose-600/25'
      : isUiUx
      ? 'from-pink-600 via-rose-600 to-indigo-700 shadow-pink-600/20'
      : 'from-indigo-600 via-blue-600 to-slate-900 shadow-indigo-600/20';

    return (
      <div id="screen-domain-detail" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
        <ScreenHeader
          title={selectedTrack.title}
          onBack={() => setIsDetailView(false)}
          headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
          textColorClass="text-slate-800 dark:text-slate-100"
          rightAction={
            <button
              onClick={() => {
                onSelectTrack(selectedTrack);
                onNavigate('skill-gap');
              }}
              className="text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70 border border-rose-100 dark:border-rose-900/60 px-2.5 py-1 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/80 transition-all cursor-pointer"
            >
              Skill Gap
            </button>
          }
        />

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* Hero Banner for Domain */}
          <div className={`bg-gradient-to-br ${gradientClass} text-white p-4.5 rounded-3xl shadow-lg relative overflow-hidden`}>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                {selectedTrack.domainCategory || 'Specialization Domain'}
              </span>
              <span className="text-[10px] font-bold bg-amber-400/95 text-slate-950 px-2.5 py-0.5 rounded-full">
                {selectedTrack.salaryRangeIndia || selectedTrack.avgSalary}
              </span>
            </div>

            <h1 className="text-lg font-extrabold leading-snug">
              {selectedTrack.title}
            </h1>

            {/* Recommended Qualification Highlight */}
            {selectedTrack.recommendedCourse && (
              <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-amber-200 border border-white/25">
                <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                <span>Recommended: {selectedTrack.recommendedCourse}</span>
              </div>
            )}

            <p className="text-xs text-rose-100 mt-2 leading-relaxed">
              {selectedTrack.careerOutcome || selectedTrack.description}
            </p>

            {/* Target Roles Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/20">
              {(selectedTrack.jobRoles || selectedTrack.requiredSkills.slice(0, 4)).map((role) => (
                <span
                  key={role}
                  className="text-[10px] font-semibold bg-white/15 text-white border border-white/20 px-2 py-0.5 rounded-lg backdrop-blur-xs flex items-center gap-1"
                >
                  <Briefcase className="w-2.5 h-2.5 opacity-80" />
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'prereqs', label: isDoctor ? 'Clinical Prerequisites' : 'Prerequisites' },
              { id: 'difficulty', label: isDoctor ? 'Residency & Phases' : 'Difficulty Curve' },
              { id: 'mistakes', label: isDoctor ? 'Clinical Pitfalls' : 'Common Mistakes' },
              { id: 'tools', label: isDoctor ? 'Clinical Guidelines' : 'Cheatsheets & Tools' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? isDoctor
                      ? 'bg-rose-600 text-white font-bold shadow-sm shadow-rose-600/30'
                      : isUiUx
                      ? 'bg-pink-600 text-white font-bold shadow-sm shadow-pink-600/30'
                      : 'bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-600/30'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-rose-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW & TIME CALCULATOR & MARKET DEMAND */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Core Roadmap Statement */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${isDoctor ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400' : 'bg-pink-50 dark:bg-pink-950/70 text-pink-600 dark:text-pink-400'} flex items-center justify-center`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    {isDoctor ? 'Clinical Specialization Scope & Insight' : 'Core Capability Blueprint'}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedTrack.whatIsAndWhyLearn || selectedTrack.description}
                </p>

                {selectedTrack.recommendedCourse && (
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 flex items-start gap-2.5 mt-2">
                    <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 tracking-wider">
                        Official Recommended Course
                      </span>
                      <p className="text-xs font-extrabold text-amber-950 dark:text-amber-100">
                        {selectedTrack.recommendedCourse}
                      </p>
                      <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                        Recognized by the National Medical Commission (NMC) / respective boards with standard hospital residencies.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60 text-center">
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 uppercase font-semibold">
                      Salary Benchmark (PayScale)
                    </span>
                    <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                      {selectedTrack.salaryRangeIndia || selectedTrack.avgSalary}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60 text-center">
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 uppercase font-semibold">
                      {isDoctor ? 'Primary Domain' : 'Tech Stack'}
                    </span>
                    <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                      {isDoctor ? 'Clinical Healthcare' : isUiUx ? 'Figma & Design Systems' : 'Production Systems'}
                    </p>
                  </div>
                </div>
              </div>

              {/* ⏱️ Interactive Time Calculator */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${isDoctor ? 'text-rose-500' : 'text-pink-500'}`} />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                      ⏱️ Time &amp; Residency Calculator
                    </h3>
                  </div>
                  <span className={`text-[10px] font-extrabold ${isDoctor ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60' : 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60'} px-2 py-0.5 rounded-md`}>
                    Interactive
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isDoctor
                    ? 'Select your daily clinical ward commitment to compute your residency timeline:'
                    : 'Select your daily learning commitment to calculate your timeline to become portfolio-ready:'}
                </p>

                {/* Buttons for Hours per day */}
                <div className="grid grid-cols-4 gap-2">
                  {(selectedTrack.timeCalculatorPresets
                    ? selectedTrack.timeCalculatorPresets.map((p) => p.hoursPerDay)
                    : isDoctor
                    ? [4, 6, 8, 10]
                    : [1, 2, 3, 4]
                  ).map((h) => (
                    <button
                      key={h}
                      onClick={() => setHoursPerDay(h)}
                      className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                        hoursPerDay === h
                          ? isDoctor
                            ? 'bg-rose-600 text-white border-rose-600 font-bold shadow-sm'
                            : 'bg-pink-600 text-white border-pink-600 font-bold shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                      }`}
                    >
                      <span className="text-xs block font-bold">{h} hr</span>
                      <span className="text-[9px] opacity-80">/day</span>
                    </button>
                  ))}
                </div>

                {/* Result Callout */}
                <div className={`p-3 rounded-xl ${isDoctor ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/60' : 'bg-pink-50/70 dark:bg-pink-950/40 border-pink-100 dark:border-pink-900/60'} border flex items-center justify-between`}>
                  <div>
                    <span className={`text-[10px] font-bold ${isDoctor ? 'text-rose-700 dark:text-rose-300' : 'text-pink-700 dark:text-pink-300'} uppercase tracking-wider`}>
                      Target Horizon
                    </span>
                    <p className={`text-xs font-extrabold ${isDoctor ? 'text-rose-900 dark:text-rose-100' : 'text-pink-900 dark:text-pink-100'} mt-0.5`}>
                      {hoursPerDay} hours/day → {currentCalculatorResult.label}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 text-right">
                    {isDoctor ? 'to clinical readiness' : 'to portfolio-ready'}
                  </span>
                </div>
              </div>

              {/* 📈 Market Demand & Stipends */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                      📈 Market Demand &amp; Compensation
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
                    {selectedTrack.marketDemand} Demand
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-700/60">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">
                      {isDoctor ? 'Hospital Openings' : 'Open Jobs (India)'}
                    </span>
                    <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                      {selectedTrack.marketDemandStats?.openJobsIndia || '30,000+'}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-700/60">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Growth Rate</span>
                    <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {selectedTrack.marketDemandStats?.yoyGrowth || '+22%'}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-700/60">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">
                      {isDoctor ? 'Tele-Medicine' : 'Remote Roles'}
                    </span>
                    <p className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {selectedTrack.marketDemandStats?.remoteRoles || 'High'}
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 dark:text-slate-500 italic text-right">
                  Source: {selectedTrack.marketDemandStats?.source || 'PayScale & Medical Trends 2024'}
                </p>

                {/* Free / Stipend Callout */}
                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isDoctor ? 'Paid Clinical Stipends Throughout PG Training' : '₹ 100% Free Path Available (Zero Budget Needed)'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 leading-relaxed">
                    {selectedTrack.marketDemandStats?.freePathNote ||
                      'Figma free plan, Google UX Certificate (financial aid via Coursera), YouTube tutorials and Maze free tier cover 100% of this roadmap at zero cost.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PREREQUISITES CHECKLIST */}
          {activeTab === 'prereqs' && (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-indigo-950/60 dark:to-pink-950/60 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {isDoctor ? 'NMC & Clinical Qualification Standards' : 'No Prior Design Experience Needed'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {isDoctor
                    ? 'Clinical doctor tracks require structured accreditation under the National Medical Commission (NMC), followed by postgraduate clinical residency (MD/MS/DGO) and hands-on ward rotations.'
                    : 'UI/UX is a design field, not purely a technical one. While CSE students have an advantage in understanding technical constraints, the primary skills are observation, empathy and visual communication — not coding.'}
                </p>
              </div>

              {/* Checklist Items */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Prerequisites Checklist ({completedPrereqsCount}/{totalPrereqs})
                  </h3>
                  <span className={`text-[10px] font-bold ${isDoctor ? 'text-rose-600 dark:text-rose-400' : 'text-pink-600 dark:text-pink-400'}`}>
                    {readinessPercentage}% Ready
                  </span>
                </div>

                <div className="space-y-2.5">
                  {(selectedTrack.prerequisites || [
                    { text: 'Basic medical or design foundations', detail: 'General aptitude and domain interest' },
                  ]).map((item, idx) => {
                    const isChecked = !!checkedPrereqs[item.text];
                    return (
                      <div
                        key={idx}
                        onClick={() => togglePrereq(item.text)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-rose-200'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-emerald-600 text-white'
                              : 'border-2 border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${isChecked ? 'text-emerald-950 dark:text-emerald-200' : 'text-slate-800 dark:text-slate-200'}`}>
                            {item.text}
                          </p>
                          {item.detail && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                              {item.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIFFICULTY CURVE — PHASE BY PHASE */}
          {activeTab === 'difficulty' && (
            <div className="space-y-3">
              <div className="px-1">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                  {isDoctor ? 'Residency & Clinical Progression Phases' : 'Difficulty Curve — Phase by Phase'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isDoctor
                    ? 'Structured clinical progression from pre-clinical theory to bedside rounds, intensive diagnostics, and senior consultant practice.'
                    : 'Structured progression from visual principles to UX research, interactive systems, and case study defense.'}
                </p>
              </div>

              <div className="space-y-2.5">
                {(selectedTrack.phases || [
                  { phaseNumber: 1, title: 'Phase 1: Foundations', difficulty: 'Easy', description: 'Core principles and fundamental mechanisms.' },
                  { phaseNumber: 2, title: 'Phase 2: Applied Diagnostics', difficulty: 'Medium', description: 'Real-world problem solving and hands-on practice.' },
                  { phaseNumber: 3, title: 'Phase 3: Advanced Specialization', difficulty: 'Hard', description: 'High-stake procedures and complex edge cases.' },
                  { phaseNumber: 4, title: 'Phase 4: Independent Practice', difficulty: 'Medium', description: 'Leading teams and consulting independently.' },
                ]).map((phase) => (
                  <div
                    key={phase.phaseNumber}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                        Stage 0{phase.phaseNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          phase.difficulty === 'Easy'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60'
                            : phase.difficulty === 'Medium'
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60'
                            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60'
                        }`}
                      >
                        {phase.difficulty}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {phase.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COMMON MISTAKES */}
          {activeTab === 'mistakes' && (
            <div className="space-y-3">
              <div className="px-1">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                  {isDoctor ? 'Critical Clinical Pitfalls & Warnings' : 'Common Beginner Mistakes'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isDoctor
                    ? 'Protocol lapses and diagnostic biases to actively prevent during clinical patient care.'
                    : 'The habits that waste time and result in weak portfolios.'}
                </p>
              </div>

              <div className="space-y-2.5">
                {(selectedTrack.commonMistakes || [
                  {
                    title: 'Rushing diagnostics without proper baseline tests',
                    description: 'Systematic observation and patient history prevent misdiagnosis.',
                  },
                ]).map((mistake, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 shadow-sm space-y-1"
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {mistake.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                      {mistake.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHEATSHEETS & TOOLS */}
          {activeTab === 'tools' && (
            <div className="space-y-4">
              {(selectedTrack.cheatsheetsAndTools || [
                {
                  category: '📋 Clinical & Reference Portals',
                  items: [
                    { name: 'National Health Guidelines', desc: 'Government clinical protocols', url: 'https://nhm.gov.in' },
                    { name: 'PubMed / Medline Central', desc: 'Peer-reviewed clinical trial literature', url: 'https://pubmed.ncbi.nlm.nih.gov' },
                  ],
                },
              ]).map((section, sIdx) => (
                <div key={sIdx} className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide px-1">
                    {section.category}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {section.items.map((tool, tIdx) => (
                      <div
                        key={tIdx}
                        className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between hover:border-rose-300 dark:hover:border-rose-800 transition-colors"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {tool.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {tool.desc}
                          </p>
                        </div>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 shrink-0 ml-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onSelectTrack(selectedTrack);
                onNavigate('modules');
              }}
              className={`w-full py-3 px-4 rounded-xl ${isDoctor ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/30' : isUiUx ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-600/30' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'} active:scale-98 text-white font-bold text-xs tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer`}
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {isDoctor
                  ? 'START CLINICAL CURRICULUM LESSONS'
                  : isUiUx
                  ? 'START UI/UX CURRICULUM LESSONS'
                  : 'START CURRICULUM LESSONS'}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectTrack(selectedTrack);
                onNavigate('skill-gap');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50"
            >
              <span>ANALYZE SKILL GAP FOR THIS DOMAIN</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <BottomNav currentScreen="roadmaps" onNavigate={onNavigate} />
      </div>
    );
  }

  // DEFAULT VIEW: LIST OF DOMAINS WITH CATEGORY FILTER
  const doctorTracksCount = tracks.filter((t) => t.domainCategory === 'Doctor & Medicine').length;
  const techTracksCount = tracks.filter((t) => t.domainCategory === 'Engineering & Tech').length;
  const designTracksCount = tracks.filter((t) => t.domainCategory === 'Design & Product').length;

  return (
    <div id="screen-roadmaps" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title="Career & Specialization Domains"
        onBack={() => onNavigate('explore')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70 border border-rose-100 dark:border-rose-900/60 px-2 py-0.5 rounded-full">
            {tracks.length} Domains
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5">
        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          {[
            { id: 'All', label: `All (${tracks.length})` },
            { id: 'Doctor & Medicine', label: `🩺 Doctor & Medicine (${doctorTracksCount})` },
            { id: 'Engineering & Tech', label: `💻 Engineering (${techTracksCount})` },
            { id: 'Design & Product', label: `🎨 Design (${designTracksCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDomainFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                domainFilter === tab.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Featured Doctor Domains Banner */}
        {(domainFilter === 'All' || domainFilter === 'Doctor & Medicine') && (
          <div
            onClick={() => {
              const gynTrack = tracks.find((t) => t.id === 'track-gynecologist') || tracks[0];
              setSelectedTrack(gynTrack);
              setIsDetailView(true);
            }}
            className="bg-gradient-to-br from-rose-600 via-pink-600 to-red-800 text-white p-4 rounded-2xl shadow-lg shadow-rose-600/20 cursor-pointer group hover:scale-[1.01] transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                🩺 Doctor &amp; Clinical Medicine
              </span>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                INR 3.6–60 LPA
              </span>
            </div>
            <h3 className="text-sm font-extrabold flex items-center gap-1.5">
              Doctor Specializations: Gynecology, Child Psychiatry, Dermatology &amp; Cardiology
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </h3>
            <p className="text-[11px] text-rose-100 mt-1 line-clamp-2">
              Explore clinical roadmaps, recommended diplomas (DGO, MD, DM), PayScale compensation ranges, and NMC hospital residency milestones.
            </p>
            <div className="mt-2.5 flex items-center gap-2 text-[10px] text-white/90">
              <span className="bg-white/15 px-2 py-0.5 rounded-md">50,000+ Hospital Roles</span>
              <span className="bg-white/15 px-2 py-0.5 rounded-md">Paid Residency Stipends</span>
            </div>
          </div>
        )}

        {/* Featured UI/UX Banner when relevant */}
        {(domainFilter === 'All' || domainFilter === 'Design & Product') && (
          <div
            onClick={() => {
              const uiuxTrack = tracks.find((t) => t.id === 'track-ui-ux') || tracks[0];
              setSelectedTrack(uiuxTrack);
              setIsDetailView(true);
            }}
            className="bg-gradient-to-br from-pink-600 via-rose-600 to-indigo-700 text-white p-4 rounded-2xl shadow-lg shadow-pink-600/20 cursor-pointer group hover:scale-[1.01] transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                🎨 Design &amp; Product
              </span>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                ₹4–35 LPA
              </span>
            </div>
            <h3 className="text-sm font-extrabold flex items-center gap-1.5">
              What is UI/UX Design and Why Learn It?
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </h3>
            <p className="text-[11px] text-pink-100 mt-1 line-clamp-2">
              User research, wireframing, high-fidelity Figma prototypes, design systems, usability testing, and Android 360×800 baseline.
            </p>
          </div>
        )}

        {/* Featured Engineering & Tech Banner when relevant */}
        {(domainFilter === 'All' || domainFilter === 'Engineering & Tech') && (
          <div
            onClick={() => {
              const aimlTrack = tracks.find((t) => t.id === 'track-ai-ml') || tracks[0];
              setSelectedTrack(aimlTrack);
              setIsDetailView(true);
            }}
            className="bg-gradient-to-br from-indigo-700 via-blue-700 to-slate-900 text-white p-4 rounded-2xl shadow-lg shadow-indigo-700/20 cursor-pointer group hover:scale-[1.01] transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                💻 Engineering &amp; Technology
              </span>
              <span className="text-[10px] font-bold bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full">
                ₹8–45 LPA
              </span>
            </div>
            <h3 className="text-sm font-extrabold flex items-center gap-1.5">
              Engineering Domains: AI/ML, Cloud DevOps, Full-Stack, DSA &amp; Cyber
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </h3>
            <p className="text-[11px] text-indigo-100 mt-1 line-clamp-2">
              Deep curriculum roadmaps for Machine Learning, Cloud Architecture, Docker/K8s, Algorithms, Big Data and Secure Systems with Indian market salaries.
            </p>
          </div>
        )}

        <div className="px-1 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
            {domainFilter === 'All' ? 'All Specialization Tracks' : `${domainFilter} Tracks`}
          </h2>
          <span className="text-[11px] text-slate-400">{filteredTracks.length} available</span>
        </div>

        {/* Roadmaps List */}
        <div className="space-y-3">
          {filteredTracks.map((track) => {
            const isDoctorTrack = track.domainCategory === 'Doctor & Medicine';
            return (
              <div
                key={track.id}
                id={`roadmap-card-${track.id}`}
                onClick={() => {
                  setSelectedTrack(track);
                  setIsDetailView(true);
                }}
                className={`bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm ${
                  isDoctorTrack
                    ? 'hover:border-rose-300 dark:hover:border-rose-500'
                    : 'hover:border-indigo-300 dark:hover:border-indigo-500'
                } hover:shadow-md transition-all cursor-pointer group`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getTrackIcon(track.icon)}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {track.domainCategory || 'Domain'}
                        </span>
                        {track.recommendedCourse && (
                          <span className="text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200/50 dark:border-amber-900/40">
                            Recommended Course
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mt-0.5">
                        {track.title}
                      </h3>
                      <span className="text-[10px] uppercase font-mono font-extrabold text-slate-500 dark:text-slate-400 tracking-wider block">
                        {track.coursesCount} MODULES • {track.estimatedMonths} MONTHS
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800/60">
                      {track.marketDemand} Demand
                    </span>
                  </div>
                </div>

                {/* Recommended course text callout */}
                {track.recommendedCourse && (
                  <div className="mt-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                    <GraduationCap className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span><b>Recommended:</b> {track.recommendedCourse}</span>
                  </div>
                )}

                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {track.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {track.requiredSkills.slice(0, 4).map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                  {track.requiredSkills.length > 4 && (
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700 px-1.5 py-0.5 rounded-md">
                      +{track.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>

                {/* Bottom stats row */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {track.salaryRangeIndia ? `Avg. ${track.salaryRangeIndia}` : `Avg. ${track.avgSalary}`}
                  </span>
                  <span className={`${isDoctorTrack ? 'text-rose-600 dark:text-rose-400' : 'text-pink-600 dark:text-pink-400'} font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform`}>
                    View Full Roadmap <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Custom Career Track Generator Callout */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-4 rounded-2xl border border-indigo-900/60 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              Specialized Career Planner
            </span>
            <h4 className="text-xs font-bold">Have a specialized medicine or engineering goal?</h4>
            <p className="text-[11px] text-slate-300">Let Gemini generate a tailored multi-phase syllabus.</p>
          </div>
          <button
            onClick={() => onNavigate('skill-gap')}
            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap ml-2"
          >
            Custom Path
          </button>
        </div>
      </div>

      <BottomNav currentScreen="roadmaps" onNavigate={onNavigate} />
    </div>
  );
};
