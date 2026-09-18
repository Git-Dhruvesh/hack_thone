/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, StudentProfile, Course, CareerTrack, ScheduleItem, QuizQuestion } from './types';
import { INITIAL_STUDENT, INITIAL_COURSES, INITIAL_CAREER_TRACKS, INITIAL_SCHEDULE, INITIAL_QUIZ } from './data/mockData';
import { MobileFrame } from './components/MobileFrame';
import { ScreenSwitcherModal } from './components/ScreenSwitcherModal';
import { ThemeProvider } from './context/ThemeContext';

// Screens from UIUX.jpg mockup
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { LessonQuizScreen } from './components/screens/LessonQuizScreen';
import { ScoreResultScreen } from './components/screens/ScoreResultScreen';
import { ExploreCoursesScreen } from './components/screens/ExploreCoursesScreen';
import { CalendarScheduleScreen } from './components/screens/CalendarScheduleScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SkillGapScreen } from './components/screens/SkillGapScreen';
import { CourseModulesScreen } from './components/screens/CourseModulesScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { CourseDetailScreen } from './components/screens/CourseDetailScreen';
import { CareerRoadmapScreen } from './components/screens/CareerRoadmapScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Application Data States
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [careerTracks] = useState<CareerTrack[]>(INITIAL_CAREER_TRACKS);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [selectedCourse, setSelectedCourse] = useState<Course>(INITIAL_COURSES[0]);
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>(undefined);
  const [quizQuestions] = useState<QuizQuestion[]>(INITIAL_QUIZ);

  const [selectedTrack, setSelectedTrack] = useState<CareerTrack>(INITIAL_CAREER_TRACKS[0]);
  const [initialRoadmapDetail, setInitialRoadmapDetail] = useState(false);
  const [initialDomainFilter, setInitialDomainFilter] = useState<'All' | 'Doctor & Medicine' | 'Engineering & Tech' | 'Design & Product'>('All');

  // Handlers
  const handleUpdateStudent = (updated: Partial<StudentProfile>) => {
    setStudent((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateSkill = (skillId: string, currentLevel: number) => {
    setStudent((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === skillId ? { ...s, currentLevel } : s)),
    }));
  };

  const handleAnswerQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setStudent((prev) => ({
        ...prev,
        totalScore: prev.totalScore + 50,
      }));
    }
  };

  const handleToggleScheduleItem = (id: string) => {
    setSchedule((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleSelectTrack = (track: CareerTrack, openDetail: boolean = false) => {
    setSelectedTrack(track);
    setInitialRoadmapDetail(openDetail);
    if (track.domainCategory) {
      setInitialDomainFilter(track.domainCategory as any);
    }
    setStudent((prev) => ({
      ...prev,
      targetCareer: track.title,
    }));
  };

  // Status Bar colors matching specific screens from UIUX.jpg
  const getStatusBarConfig = () => {
    switch (currentScreen) {
      case 'lesson-quiz':
        return { bg: 'bg-emerald-500', text: 'text-white' };
      case 'score-result':
        return { bg: 'bg-indigo-600', text: 'text-white' };
      case 'auth':
        return { bg: 'bg-rose-500', text: 'text-white' };
      case 'calendar':
        return { bg: 'bg-slate-900', text: 'text-white' };
      default:
        return { bg: 'bg-white border-b border-slate-100', text: 'text-slate-800' };
    }
  };

  const statusConfig = getStatusBarConfig();

  return (
    <ThemeProvider>
      <MobileFrame
        currentScreen={currentScreen}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === 'mobile' ? 'desktop' : 'mobile')}
        onOpenGallery={() => setIsGalleryOpen(true)}
        statusBarBg={statusConfig.bg}
        statusTextColor={statusConfig.text}
      >
      {/* Dynamic Screen Renderer */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen onNavigate={setCurrentScreen} />
      )}

      {currentScreen === 'auth' && (
        <AuthScreen
          student={student}
          onUpdateStudent={handleUpdateStudent}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'lesson-quiz' && (
        <LessonQuizScreen
          course={selectedCourse}
          activeLessonId={activeLessonId}
          questions={quizQuestions}
          allCourses={courses}
          onSelectCourse={setSelectedCourse}
          onAnswerQuestion={handleAnswerQuestion}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'score-result' && (
        <ScoreResultScreen
          student={student}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'explore' && (
        <ExploreCoursesScreen
          courses={courses}
          student={student}
          careerTracks={careerTracks}
          onSelectTrack={(track, openDetail = true) => {
            handleSelectTrack(track, openDetail);
            setCurrentScreen('roadmaps');
          }}
          onSelectCourse={(course) => {
            setSelectedCourse(course);
            setCurrentScreen('course-detail');
          }}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'calendar' && (
        <CalendarScheduleScreen
          schedule={schedule}
          onToggleScheduleItem={handleToggleScheduleItem}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen
          student={student}
          onUpdateStudent={handleUpdateStudent}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'skill-gap' && (
        <SkillGapScreen
          student={student}
          onUpdateSkill={handleUpdateSkill}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'modules' && (
        <CourseModulesScreen
          courses={courses}
          onSelectCourse={setSelectedCourse}
          onSelectLesson={(lesson, course) => {
            setSelectedCourse(course);
            setActiveLessonId(lesson.id);
          }}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'analytics' && (
        <AnalyticsScreen
          student={student}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'course-detail' && (
        <CourseDetailScreen
          course={selectedCourse}
          onSelectLesson={(lesson) => {
            setActiveLessonId(lesson.id);
          }}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'roadmaps' && (
        <CareerRoadmapScreen
          tracks={careerTracks}
          selectedTrack={selectedTrack}
          initialDetailView={initialRoadmapDetail}
          initialDomainFilter={initialDomainFilter}
          onSelectTrack={handleSelectTrack}
          onNavigate={setCurrentScreen}
          onSelectCourse={(course) => {
            setSelectedCourse(course);
            setCurrentScreen('course-detail');
          }}
        />
      )}

      {/* Screen Switcher Modal for jumping directly to any of the 12 screens from UIUX.jpg */}
      <ScreenSwitcherModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
      />
    </MobileFrame>
  </ThemeProvider>
  );
}
