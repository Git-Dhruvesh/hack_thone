import React, { useState } from 'react';
import { ScreenType, Course, ModuleItem } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Atom,
  ChevronRight,
  CheckCircle2,
  Clock,
  Star,
  Play,
  Youtube,
  Sparkles,
} from 'lucide-react';

interface CourseModulesScreenProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onSelectLesson?: (lesson: ModuleItem, course: Course) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const CourseModulesScreen: React.FC<CourseModulesScreenProps> = ({
  courses,
  onSelectCourse,
  onSelectLesson,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'atom':
        return <Atom className="w-6 h-6 text-indigo-400" />;
      case 'bag':
        return <Briefcase className="w-6 h-6 text-cyan-400" />;
      case 'book':
        return <BookOpen className="w-6 h-6 text-emerald-400" />;
      default:
        return <GraduationCap className="w-6 h-6 text-pink-400" />;
    }
  };

  const handleStartLesson = (course: Course, lesson: ModuleItem) => {
    onSelectCourse(course);
    if (onSelectLesson) {
      onSelectLesson(lesson, course);
    }
    onNavigate('lesson-quiz');
  };

  const categories = ['All', 'Doctor & Medicine', 'Design & Product', 'Web & Full Stack', 'Artificial Intelligence', 'Computer Science', 'Cloud & Systems'];

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div id="screen-modules" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title="Curriculum Modules"
        onBack={() => onNavigate('explore')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full">
            {courses.length} Tracks
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5">
        {/* Banner highlighting YouTube Video Integration & Assessments */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-indigo-700 text-white p-3.5 rounded-2xl shadow-md space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
            <Youtube className="w-4 h-4 text-white" />
            <span>Interactive Video Curriculum</span>
          </div>
          <p className="text-xs font-bold text-white">
            Watch curated YouTube lessons &amp; auto-test your retention on each topic!
          </p>
          <p className="text-[10px] text-rose-100">
            Features Code With Harry React Playlist, 3Blue1Brown Neural Networks, and DSA Masterclasses.
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Modules List */}
        <div className="space-y-3">
          {filteredCourses.map((course, idx) => (
            <div
              key={course.id}
              id={`module-card-${course.id}`}
              className="bg-slate-900 dark:bg-slate-900/90 text-white p-4 rounded-2xl shadow-md border border-slate-800 dark:border-slate-800/90 transition-all hover:border-indigo-400 space-y-3"
            >
              {/* Header with Title and Channel */}
              <div
                onClick={() => {
                  onSelectCourse(course);
                  onNavigate('course-detail');
                }}
                className="flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getIcon(course.icon)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                        Track 0{idx + 1} • {course.category}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-100 truncate group-hover:text-indigo-300 transition-colors mt-0.5">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 font-medium text-slate-300">
                        {course.instructor}
                      </span>
                      <span>• {course.syllabus.length} lessons</span>
                    </div>
                  </div>
                </div>

                <div className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0">
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Sub-lessons with Direct "Start Video Lesson" Buttons */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Interactive Video Lessons &amp; Quizzes:
                </span>

                {course.syllabus.map((lesson, lIdx) => (
                  <div
                    key={lesson.id}
                    className="bg-slate-950/70 hover:bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-slate-800 text-[10px] text-slate-300 flex items-center justify-center shrink-0 font-mono font-bold">
                        {lIdx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          {lesson.youtubeChannel && (
                            <span className="text-[9px] font-bold text-rose-400 flex items-center gap-0.5">
                              <Youtube className="w-2.5 h-2.5" />
                              {lesson.youtubeChannel}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono">
                            {lesson.duration}
                          </span>
                        </div>
                        <h4 className="text-xs font-medium text-slate-200 truncate">
                          {lesson.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartLesson(course, lesson)}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-[11px] flex items-center gap-1 shrink-0 transition-all cursor-pointer shadow-sm"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Start Lesson</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Career Roadmap Link */}
        <div className="pt-2">
          <div className="bg-slate-900 dark:bg-slate-900/90 p-4 rounded-2xl border border-indigo-900/50 dark:border-indigo-800/60 text-white flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-indigo-300">Need Full Engineering Roadmaps?</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Explore comprehensive tracks with salary stats and industry skill requirements.
              </p>
            </div>
            <button
              id="modules-view-roadmaps-btn"
              onClick={() => onNavigate('roadmaps')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all cursor-pointer whitespace-nowrap ml-2"
            >
              Roadmaps
            </button>
          </div>
        </div>
      </div>

      <BottomNav currentScreen="modules" onNavigate={onNavigate} />
    </div>
  );
};
