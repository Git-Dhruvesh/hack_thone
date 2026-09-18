import React, { useState } from 'react';
import { ScreenType, Course, StudentProfile, CareerTrack } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import {
  Search,
  Shield,
  Cpu,
  BookOpen,
  Briefcase,
  Sparkles,
  Star,
  Clock,
  ArrowRight,
  Filter,
  HeartPulse,
  Palette,
  Atom,
  Database,
  User,
  Calendar,
  Compass,
  PlayCircle,
  GraduationCap,
  TrendingUp,
  BarChart2,
  CheckCircle2
} from 'lucide-react';

interface ExploreCoursesScreenProps {
  courses: Course[];
  student: StudentProfile;
  careerTracks: CareerTrack[];
  onSelectTrack: (track: CareerTrack, openDetail?: boolean) => void;
  onSelectCourse: (course: Course) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ExploreCoursesScreen: React.FC<ExploreCoursesScreenProps> = ({
  courses,
  student,
  careerTracks,
  onSelectTrack,
  onSelectCourse,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainTab, setSelectedDomainTab] = useState<'All' | 'Engineering & Tech' | 'Doctor & Medicine' | 'Design & Product'>('All');

  // Engineering & Career Domain items mapped to tracks and courses
  const domainCards = [
    {
      id: 'ai-ml',
      trackId: 'track-ai-ml',
      courseId: 'course-ml-foundations',
      title: 'AI & Machine Learning',
      subtitle: 'Deep Learning & Neural Networks',
      domainCategory: 'Engineering & Tech',
      salary: '₹14–45 LPA',
      duration: '6 Months',
      badge: 'High Demand',
      color: 'bg-indigo-600',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      icon: Atom,
      skills: ['Python', 'PyTorch', 'Vector DBs'],
    },
    {
      id: 'cloud-devops',
      trackId: 'track-cloud-systems',
      courseId: 'course-cloud-devops',
      title: 'Cloud & Distributed Systems',
      subtitle: 'Docker, Kubernetes & AWS',
      domainCategory: 'Engineering & Tech',
      salary: '₹12–40 LPA',
      duration: '7 Months',
      badge: 'Enterprise',
      color: 'bg-sky-600',
      textColor: 'text-sky-600 dark:text-sky-400',
      icon: Cpu,
      skills: ['Docker', 'Kubernetes', 'AWS'],
    },
    {
      id: 'web-react',
      trackId: 'track-web-dev',
      courseId: 'course-react-cwh',
      title: 'Web & Full-Stack',
      subtitle: 'React, Node & TypeScript',
      domainCategory: 'Engineering & Tech',
      salary: '₹8–30 LPA',
      duration: '5 Months',
      badge: 'Code With Harry',
      color: 'bg-blue-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      icon: BookOpen,
      skills: ['React.js', 'Node.js', 'PostgreSQL'],
    },
    {
      id: 'cs-dsa',
      trackId: 'track-dsa',
      courseId: 'course-dsa-algorithms',
      title: 'Algorithms & Core CS (DSA)',
      subtitle: 'Trees, Graphs & Complexity',
      domainCategory: 'Engineering & Tech',
      salary: '₹10–35 LPA',
      duration: '4 Months',
      badge: 'FAANG / Tier-1',
      color: 'bg-emerald-600',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      icon: TrendingUp,
      skills: ['Big O', 'Graphs', 'Dynamic Prog'],
    },
    {
      id: 'data-science',
      trackId: 'track-data-science',
      courseId: 'course-data-science',
      title: 'Data Science & Big Data',
      subtitle: 'Pandas, SQL & Analytics',
      domainCategory: 'Engineering & Tech',
      salary: '₹10–32 LPA',
      duration: '5 Months',
      badge: 'Analytics',
      color: 'bg-amber-600',
      textColor: 'text-amber-600 dark:text-amber-400',
      icon: Database,
      skills: ['Pandas', 'SQL', 'Statistics'],
    },
    {
      id: 'cybersecurity',
      trackId: 'track-cybersecurity',
      courseId: 'course-cybersecurity',
      title: 'Cybersecurity & Defense',
      subtitle: 'Network Defense & Cryptography',
      domainCategory: 'Engineering & Tech',
      salary: '₹12–38 LPA',
      duration: '6 Months',
      badge: 'Critical',
      color: 'bg-purple-600',
      textColor: 'text-purple-600 dark:text-purple-400',
      icon: Shield,
      skills: ['Network Protocols', 'Wireshark', 'Crypto'],
    },
    {
      id: 'doctor-med',
      trackId: 'track-gynecologist',
      courseId: 'course-doctor-clinical-foundations',
      title: 'Doctor & Medicine',
      subtitle: 'Gynecology, Cardio & Derma',
      domainCategory: 'Doctor & Medicine',
      salary: '₹12.5–60 LPA',
      duration: '36 Months',
      badge: 'Clinical MD',
      color: 'bg-rose-600',
      textColor: 'text-rose-600 dark:text-rose-400',
      icon: HeartPulse,
      skills: ['Obstetrics', 'Cardiology', 'Dermatology'],
    },
    {
      id: 'ui-ux-design',
      trackId: 'track-ui-ux',
      courseId: 'course-uiux-foundations',
      title: 'UI/UX Design Systems',
      subtitle: 'Figma & Product Research',
      domainCategory: 'Design & Product',
      salary: '₹4–35 LPA',
      duration: '6 Months',
      badge: 'Zero Code',
      color: 'bg-pink-600',
      textColor: 'text-pink-600 dark:text-pink-400',
      icon: Palette,
      skills: ['Figma', 'UX Research', 'Design Systems'],
    },
  ];

  // Filtering domain cards
  const filteredDomainCards = domainCards.filter((card) => {
    const matchesTab =
      selectedDomainTab === 'All' ? true : card.domainCategory === selectedDomainTab;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  // Filter courses based on tab and search
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedDomainTab === 'All') return matchesSearch;
    if (selectedDomainTab === 'Doctor & Medicine') {
      return (
        matchesSearch &&
        (course.category.includes('Doctor') ||
          course.category.includes('Medicine') ||
          course.tags.some((t) => ['Medicine', 'Gynecology', 'Cardiology', 'Dermatology'].includes(t)))
      );
    }
    if (selectedDomainTab === 'Design & Product') {
      return (
        matchesSearch &&
        (course.category.includes('Design') ||
          course.tags.some((t) => ['UI/UX', 'Figma', 'Design'].includes(t)))
      );
    }
    if (selectedDomainTab === 'Engineering & Tech') {
      return (
        matchesSearch &&
        (course.category.includes('Engineering') ||
          course.tags.some((t) =>
            ['Cloud', 'Docker', 'Kubernetes', 'Algorithms', 'DSA', 'Machine Learning', 'Data Science', 'Cybersecurity', 'React.js'].includes(t)
          ))
      );
    }
    return matchesSearch;
  });

  // Handle clicking a domain card: redirect to its Career Roadmap with detail view open
  const handleDomainClick = (domain: typeof domainCards[0]) => {
    const track = careerTracks.find((t) => t.id === domain.trackId) || careerTracks[0];
    onSelectTrack(track, true);
    onNavigate('roadmaps');
  };

  // Handle clicking a domain's course: redirect to course detail
  const handleDomainCourseClick = (domain: typeof domainCards[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const course = courses.find((c) => c.id === domain.courseId) || courses[0];
    onSelectCourse(course);
    onNavigate('course-detail');
  };

  return (
    <div id="screen-explore" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      {/* Top Header */}
      <ScreenHeader
        title="Explore Learning"
        showBack={false}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <div className="flex items-center gap-1.5">
            <button
              id="header-profile-btn"
              onClick={() => onNavigate('profile')}
              title="View Student Profile"
              className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
            </button>
            <button
              id="header-roadmaps-btn"
              onClick={() => onNavigate('roadmaps')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-900/50 px-2.5 py-1 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all cursor-pointer flex items-center gap-1"
            >
              <Compass className="w-3 h-3" />
              <span>Roadmaps</span>
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* 1. Interactive Student Person Profile Component (Click to redirect to Profile Page) */}
        <div
          id="student-profile-banner"
          onClick={() => onNavigate('profile')}
          className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30 group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {student.name}
                </span>
                <span className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/40">
                  Student Profile
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                {student.degree}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 block font-medium">Score</span>
              <span className="text-xs font-bold text-amber-500">{student.totalScore} pts</span>
            </div>
            <span className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              View <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* 2. Interactive Search Bar */}
        <div className="relative">
          <input
            id="explore-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search engineering domains, courses, instructors, skills..."
            className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <div className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* 3. Quick Navigation Hub 4x2 Pill Grid matching reference design */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* 1. Learning Path */}
          <button
            id="quick-nav-learning-path"
            onClick={() => onNavigate('learning-path')}
            className="group py-3 px-1.5 min-h-[92px] rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
          >
            <div className="h-7 flex items-center justify-center">
              <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-[1.15] text-center tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Learning<br />Path
            </span>
          </button>

          {/* 2. Skill Gap */}
          <button
            id="quick-nav-skillgap"
            onClick={() => onNavigate('skill-gap')}
            className="group py-3 px-1.5 min-h-[92px] rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
          >
            <div className="h-7 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-500 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-[1.15] text-center tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Skill<br />Gap
            </span>
          </button>

          {/* 3. Assessment */}
          <button
            id="quick-nav-assessments"
            onClick={() => onNavigate('assessments')}
            className="group py-3 px-1.5 min-h-[92px] rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-500 hover:shadow-md flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
          >
            <div className="h-7 flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-rose-500 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-[1.15] text-center tracking-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              Assessment
            </span>
          </button>

          {/* 4. Study Notes */}
          <button
            id="quick-nav-study-resources"
            onClick={() => onNavigate('study-resources')}
            className="group py-3 px-1.5 min-h-[92px] rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
          >
            <div className="h-7 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-sky-500 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-[1.15] text-center tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              Study<br />Notes
            </span>
          </button>

          {/* 5. Roadmaps */}
          <button
            id="quick-nav-roadmaps"
            onClick={() => onNavigate('roadmaps')}
            className="group py-3 px-1.5 min-h-[92px] rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
          >
            <div className="h-7 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-indigo-500 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-[1.15] text-center tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Roadmaps
            </span>
          </button>

          {/* 6. Skill Plan */}
          <button
            id="quick-nav-skill-planner"
            onClick={() => onNavigate('skill-planner')}
            className="group py-3 px-1.5 min-h-[92px] rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
          >
            <div className="h-7 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-emerald-500 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-[1.15] text-center tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Skill<br />Plan
            </span>
          </button>

          {/* 7. Analytics */}
          <button
            id="quick-nav-analytics"
            onClick={() => onNavigate('analytics')}
            className="group py-3 px-1.5 min-h-[92px] rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-md flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
          >
            <div className="h-7 flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-violet-500 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-[1.15] text-center tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              Analytics
            </span>
          </button>

          {/* 8. Schedule */}
          <button
            id="quick-nav-calendar"
            onClick={() => onNavigate('calendar')}
            className="group py-3 px-1.5 min-h-[92px] rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-md flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
          >
            <div className="h-7 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-500 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-[1.15] text-center tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Schedule
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* MATHPATH AI COMPLETE STUDENT DASHBOARD INTEGRATION (10 REQUIRED MODULES)  */}
        {/* ========================================================================= */}

        {/* 1. OVERALL PROGRESS CARD */}
        <div
          id="dashboard-overall-progress"
          onClick={() => onNavigate('analytics')}
          className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white p-4.5 rounded-3xl shadow-xl shadow-indigo-700/20 cursor-pointer hover:shadow-2xl transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
              Student Dashboard • Overall Progress
            </span>
            <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
              70% Track Completed
            </span>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2 text-center">
            <div className="bg-white/10 p-2 rounded-2xl">
              <span className="text-xs font-extrabold font-mono block">14 / 18</span>
              <span className="text-[9px] text-indigo-200">Courses Done</span>
            </div>
            <div className="bg-white/10 p-2 rounded-2xl">
              <span className="text-xs font-extrabold font-mono block">42 / 60</span>
              <span className="text-[9px] text-indigo-200">Topics Mastered</span>
            </div>
            <div className="bg-white/10 p-2 rounded-2xl">
              <span className="text-xs font-extrabold font-mono block text-amber-300">9 Days 🔥</span>
              <span className="text-[9px] text-indigo-200">Learning Streak</span>
            </div>
            <div className="bg-white/10 p-2 rounded-2xl">
              <span className="text-xs font-extrabold font-mono block text-emerald-300">82%</span>
              <span className="text-[9px] text-indigo-200">Latest Test</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-indigo-500/30 flex items-center justify-between text-xs text-indigo-200">
            <span>Score improved from 62% to 82% (+20% gain)</span>
            <span className="text-white font-bold flex items-center gap-1">
              View Analytics <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* 2. CURRENT LEARNING PATH PREVIEW */}
        <div
          id="dashboard-learning-path-preview"
          onClick={() => onNavigate('learning-path')}
          className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Current Learning Path: {student.targetCareer}
                </h3>
                <p className="text-[10px] text-slate-400">Step 3 of 8 • Intermediate Tier</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
              In Progress
            </span>
          </div>

          <div className="mt-3 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200 dark:border-amber-900/60 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider">
                Current Active Topic
              </span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                Quadratic Equations &amp; Parabolic Functions
              </h4>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                120 mins estimated • Bridges priority skill gap
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('study-resources');
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Learn Now
            </button>
          </div>
        </div>

        {/* 3. SKILL-GAP ANALYSIS SUMMARY & 4. UPCOMING ASSESSMENT (2-Column Responsive Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Skill-Gap Analysis Widget */}
          <div
            id="dashboard-skill-gap-widget"
            onClick={() => onNavigate('skill-gap')}
            className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-amber-400 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                AI Skill-Gap Analysis
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                71% Ready
              </span>
            </div>

            <div className="mt-2.5 space-y-2 text-xs">
              <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 flex justify-between items-center">
                <span className="font-semibold text-emerald-900 dark:text-emerald-200">Strong: Algebra (85%) &amp; Arithmetic (92%)</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>

              <div className="p-2 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 flex justify-between items-center">
                <span className="font-semibold text-rose-900 dark:text-rose-200">Priority Gap: Quadratic Equations (54%)</span>
                <span className="text-[10px] font-bold text-rose-600">-36%</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
              <span>View Full Diagnostic Matrix</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Upcoming Assessment Widget */}
          <div
            id="dashboard-upcoming-assessment"
            onClick={() => onNavigate('assessments')}
            className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-rose-400 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <PlayCircle className="w-3.5 h-3.5 text-rose-500" />
                Upcoming / Recommended Assessment
              </span>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                Targeted Test
              </span>
            </div>

            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Quadratic Equations &amp; Vertex Diagnostic
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                4 adaptive questions • 10 minutes • Updates your skill proficiency in real time upon completion.
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400">Adaptive Scoring Enabled</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('assessments');
                }}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>

        {/* 5. CAREER & COURSE RECOMMENDATIONS BANNER */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                CAREER &amp; COURSE RECOMMENDATIONS
              </span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                Personalized Career Paths for Your Skills
              </h3>
            </div>
            <button
              onClick={() => onNavigate('roadmaps')}
              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Explore All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { role: 'Data Analyst', salary: '₹6–18 LPA', readiness: 82, badge: 'High Match' },
              { role: 'Software Developer', salary: '₹8–24 LPA', readiness: 76, badge: 'Top Choice' },
              { role: 'AI/ML Engineer', salary: '₹14–45 LPA', readiness: 70, badge: 'Goal Career' },
            ].map((rec) => (
              <div
                key={rec.role}
                onClick={() => onNavigate('roadmaps')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-400 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded-full">
                    {rec.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">{rec.readiness}%</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5">{rec.role}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{rec.salary} avg package</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 dark:text-slate-500 italic pt-1">
            Career and course recommendations represent educational guidance based on real-time skills and assessment progress.
          </p>
        </div>

        {/* 6. PERSONALIZED STUDY RESOURCES PREVIEW & 7. SKILL DEVELOPMENT PLAN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Study Resources */}
          <div
            id="dashboard-study-resources-widget"
            onClick={() => onNavigate('study-resources')}
            className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-sky-400 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                Personalized Study Resources
              </span>
              <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-full">
                Curated
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Targeted notes, step-by-step solved examples, and concept maps for <strong>Quadratic Equations</strong> &amp; <strong>Probability</strong>.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] font-bold text-sky-600 dark:text-sky-400">
              <span>Open Study Material</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Skill Development Plan */}
          <div
            id="dashboard-skill-plan-widget"
            onClick={() => onNavigate('skill-planner')}
            className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-400 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                Skill Development Plan
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                8 Milestones
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Step-by-step curriculum with level targets, practice drills, and completion tracking for <strong>Data Analyst</strong> &amp; <strong>AI Roles</strong>.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <span>View Milestone Plan</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* 8. RECENT LEARNING ACTIVITY LOG */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Recent Learning Activity
            </h4>
            <span className="text-[10px] text-slate-400">Latest Sync</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Completed Lesson #1: React SPA Architecture</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">+50 pts</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Finished Diagnostic Assessment: Linear Algebra</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-600 font-bold">+85 pts</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Reviewed Study Notes: Quadratic Formula Derivation</span>
              </div>
              <span className="text-[10px] font-mono text-amber-600 font-bold">+20 pts</span>
            </div>
          </div>
        </div>

        {/* 4. Domain Category Filter Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
              <span>Engineering & Career Domains</span>
              <span className="text-[10px] font-semibold text-slate-400">({filteredDomainCards.length})</span>
            </h2>
            <button
              onClick={() => {
                setSelectedDomainTab('All');
                setSearchQuery('');
              }}
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 cursor-pointer"
            >
              Show All
            </button>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'All', label: 'All Domains' },
              { id: 'Engineering & Tech', label: '💻 Engineering & Tech' },
              { id: 'Doctor & Medicine', label: '🩺 Doctor & Medicine' },
              { id: 'Design & Product', label: '🎨 Design & Product' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedDomainTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDomainTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Engineering Domains Grid (Click card or buttons to redirect to dedicated pages) */}
        <div className="grid grid-cols-2 gap-3">
          {filteredDomainCards.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                id={`domain-card-${domain.id}`}
                onClick={() => handleDomainClick(domain)}
                className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Colorful Domain Banner */}
                  <div
                    className={`w-full aspect-[4/3] rounded-xl ${domain.color} mb-2 flex flex-col items-center justify-center text-white shadow-sm group-hover:scale-[1.02] transition-transform relative p-2`}
                  >
                    <Icon className="w-8 h-8 stroke-[2.2] drop-shadow-sm mb-1" />
                    <span className="text-[9px] font-extrabold bg-black/25 px-2 py-0.5 rounded-full backdrop-blur-xs text-white uppercase tracking-wider">
                      {domain.badge}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {domain.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {domain.subtitle}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {domain.salary}
                    </span>
                    <span className="text-slate-400">
                      {domain.duration}
                    </span>
                  </div>
                </div>

                {/* Direct Action Inner Redirect Buttons */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-1">
                  <button
                    id={`btn-roadmap-${domain.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDomainClick(domain);
                    }}
                    className="w-full py-1 px-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Compass className="w-3 h-3" />
                    <span>View Roadmap</span>
                  </button>
                  <button
                    id={`btn-course-${domain.id}`}
                    onClick={(e) => handleDomainCourseClick(domain, e)}
                    className="w-full py-1 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <PlayCircle className="w-3 h-3 text-slate-400" />
                    <span>Courses & Video</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 6. ML Personalized Recommendations Banner (Clickable inner component to redirect to Skill Gap) */}
        <div
          id="explore-ml-match-banner"
          onClick={() => onNavigate('skill-gap')}
          className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 text-white p-3.5 rounded-2xl shadow-md flex items-center justify-between cursor-pointer hover:shadow-lg transition-all group"
        >
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>Machine Learning Match</span>
            </div>
            <p className="text-xs font-bold leading-tight">
              Calibrated for {student.targetCareer}
            </p>
            <p className="text-[10px] text-indigo-200">
              Click to evaluate your readiness and skill gap breakdown
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('skill-gap');
            }}
            className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 font-bold text-xs hover:bg-indigo-50 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap group-hover:bg-indigo-50"
          >
            Run ML Check →
          </button>
        </div>

        {/* 7. Recommended Courses Section with Instructor Person Detail */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Courses & Interactive Curriculum ({filteredCourses.length})
            </h2>
            <span className="text-[10px] text-slate-400 font-medium">Click any card to start</span>
          </div>

          <div className="space-y-2.5">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                id={`explore-course-${course.id}`}
                onClick={() => {
                  onSelectCourse(course);
                  onNavigate('course-detail');
                }}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: course.themeColor }}
                    />
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {course.category}
                    </span>
                  </div>
                  {course.matchPercentage && (
                    <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {course.matchPercentage}% ML Match
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                  {course.description}
                </p>

                {/* Instructor Person Inner Component (Clickable) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCourse(course);
                    onNavigate('course-detail');
                  }}
                  className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                      <GraduationCap className="w-3 h-3 text-indigo-500" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                      Instructor: <span className="text-indigo-600 dark:text-indigo-400 underline decoration-dotted">{course.instructor}</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {course.studentsCount} learners
                  </span>
                </div>

                {/* Course Bottom Bar & Direct Action Buttons */}
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Clock className="w-3 h-3 text-slate-400" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-amber-500">
                      <Star className="w-3 h-3 fill-current" /> {course.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCourse(course);
                        onNavigate('modules');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold hover:bg-slate-200 transition-colors"
                    >
                      Syllabus
                    </button>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform text-[11px]">
                      Start <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav currentScreen="explore" onNavigate={onNavigate} />
    </div>
  );
};
export default ExploreCoursesScreen;
