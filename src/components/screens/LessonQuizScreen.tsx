import React, { useState, useEffect } from 'react';
import { ScreenType, QuizQuestion, Course, ModuleItem } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import {
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  RefreshCw,
  Award,
  ChevronRight,
  Youtube,
  ListVideo,
  BookOpen,
  ArrowRight,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

interface LessonQuizScreenProps {
  course: Course;
  questions: QuizQuestion[];
  onAnswerQuestion: (isCorrect: boolean) => void;
  onNavigate: (screen: ScreenType) => void;
  activeLessonId?: string;
  allCourses?: Course[];
  onSelectCourse?: (course: Course) => void;
}

export const LessonQuizScreen: React.FC<LessonQuizScreenProps> = ({
  course,
  questions,
  onAnswerQuestion,
  onNavigate,
  activeLessonId,
  allCourses = [],
  onSelectCourse,
}) => {
  // Find currently active lesson or default to first video lesson
  const initialLesson =
    course.syllabus.find((m) => m.id === activeLessonId) ||
    course.syllabus.find((m) => m.type === 'video') ||
    course.syllabus[0];

  const [activeLesson, setActiveLesson] = useState<ModuleItem>(initialLesson);
  const [isVideoCompleted, setIsVideoCompleted] = useState<boolean>(activeLesson.completed || false);
  const [activeViewMode, setActiveViewMode] = useState<'video' | 'quiz'>('video');
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

  // Questions specific to the selected video lesson
  const [lessonQuestions, setLessonQuestions] = useState<QuizQuestion[]>(
    activeLesson.questions && activeLesson.questions.length > 0
      ? activeLesson.questions
      : questions
  );
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  // Sync questions and completion when active lesson changes
  useEffect(() => {
    if (activeLesson) {
      setLessonQuestions(
        activeLesson.questions && activeLesson.questions.length > 0
          ? activeLesson.questions
          : questions
      );
      setIsVideoCompleted(activeLesson.completed || false);
      setCurrentQIndex(0);
      setSelectedOption(null);
      setHasSubmitted(false);
    }
  }, [activeLesson, questions]);

  const activeQuestion = lessonQuestions[currentQIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (!hasSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setHasSubmitted(true);
    const isCorrect = selectedOption === activeQuestion.correctIndex;
    if (isCorrect) {
      setScoreEarned((prev) => prev + 50);
    }
    onAnswerQuestion(isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < lessonQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      onNavigate('score-result');
    }
  };

  // Mark video as finished and switch directly to topic questions
  const handleCompleteVideo = () => {
    setIsVideoCompleted(true);
    activeLesson.completed = true;
    setActiveViewMode('quiz');
    setCurrentQIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  // Generate dynamic AI questions based on the specific YouTube video topic using Gemini
  const handleGenerateAIQuestion = async () => {
    setAiGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: `${activeLesson.title} (${course.title})`,
          difficulty: 'Intermediate',
          questionCount: 2,
        }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setLessonQuestions((prev) => [...prev, ...data.questions]);
        setCurrentQIndex(lessonQuestions.length);
        setSelectedOption(null);
        setHasSubmitted(false);
      }
    } catch (err) {
      console.error('Failed to generate dynamic question:', err);
    } finally {
      setAiGenerating(false);
    }
  };

  // Default fallback YouTube video ID if none set
  const youtubeId = activeLesson.youtubeVideoId || 'RGKi6LSPDLU';

  return (
    <div id="screen-lesson-quiz" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      {/* Header bar */}
      <ScreenHeader
        title={course.title}
        onBack={() => onNavigate('modules')}
        headerColorClass="bg-slate-900 text-white"
        textColorClass="text-white"
        rightAction={
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              showPlaylist
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
            title="Toggle playlist lessons"
          >
            <ListVideo className="w-3.5 h-3.5" />
            <span>Playlist</span>
          </button>
        }
      />

      {/* Playlist Drawer / Lesson Switcher */}
      {showPlaylist && (
        <div className="bg-slate-900 border-b border-slate-800 p-3 text-white space-y-2 max-h-56 overflow-y-auto shadow-xl z-20 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Video Lessons Playlist</span>
            <span>{course.syllabus.length} Modules</span>
          </div>

          <div className="space-y-1.5">
            {course.syllabus.map((lesson, idx) => {
              const isSelected = lesson.id === activeLesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setShowPlaylist(false);
                    setActiveViewMode('video');
                  }}
                  className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="w-5 h-5 rounded-md bg-black/30 flex items-center justify-center text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] shrink-0 font-mono text-slate-400">
                    <span>{lesson.duration}</span>
                    {lesson.completed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Subject Switcher for other suggested courses */}
          {allCourses.length > 1 && onSelectCourse && (
            <div className="pt-2 border-t border-slate-800 mt-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                Switch Subject / Playlist:
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {allCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCourse(c);
                      const firstLesson = c.syllabus[0];
                      if (firstLesson) setActiveLesson(firstLesson);
                      setShowPlaylist(false);
                    }}
                    className={`text-[10px] px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                      c.id === course.id
                        ? 'bg-indigo-500 text-white font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {c.title.split('(')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode Selector Tabs (Video vs Topic Quiz) */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveViewMode('video')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeViewMode === 'video'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Youtube className="w-3.5 h-3.5 text-red-600" />
            <span>Watch Video</span>
          </button>
          <button
            onClick={() => setActiveViewMode('quiz')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeViewMode === 'quiz'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Topic Quiz ({lessonQuestions.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800">
            +{scoreEarned} XP
          </span>
        </div>
      </div>

      {/* Main Screen Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* VIEW 1: YouTube Video Player View */}
        {activeViewMode === 'video' && (
          <div className="space-y-3">
            {/* Embedded YouTube Player Container */}
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border border-slate-800 relative group">
              <iframe
                id="youtube-lesson-player"
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&enablejsapi=1`}
                title={activeLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Details Card */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 dark:text-red-400 mb-0.5">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>{activeLesson.youtubeChannel || 'CodeWithHarry'}</span>
                    <span className="text-slate-400 dark:text-slate-500 font-normal">• {activeLesson.duration}</span>
                  </div>
                  <h2 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {activeLesson.title}
                  </h2>
                </div>

                {isVideoCompleted ? (
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Finished
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full shrink-0 border border-indigo-100 dark:border-indigo-900/60">
                    In Progress
                  </span>
                )}
              </div>

              {activeLesson.videoSummary && (
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  {activeLesson.videoSummary}
                </p>
              )}

              {/* Key Concepts Taught in this Video */}
              {activeLesson.keyConcepts && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider block mb-1">
                    Key Concepts Covered in Video:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLesson.keyConcepts.map((concept) => (
                      <span
                        key={concept}
                        className="text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-100/70 dark:border-indigo-900/60"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary User Action: Complete Video & Start Topic Quiz */}
              <div className="pt-2">
                <button
                  id="complete-video-start-quiz-btn"
                  onClick={handleCompleteVideo}
                  className="w-full py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-[0.99] text-white font-extrabold text-xs tracking-wider shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>COMPLETE VIDEO &amp; START TOPIC QUIZ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Topic Quiz Mode (Triggered after completing the video or clicking tab) */}
        {activeViewMode === 'quiz' && (
          <div className="space-y-3">
            {/* Topic Banner celebrating video completion */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-3.5 rounded-2xl border border-indigo-900/50 shadow-md flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Video Verified</span>
                </div>
                <h3 className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                  Testing: {activeLesson.title}
                </h3>
                <span className="text-[10px] text-slate-400">
                  {activeLesson.youtubeChannel || 'CodeWithHarry'} Topic Questions
                </span>
              </div>

              <button
                onClick={() => setActiveViewMode('video')}
                className="text-[11px] font-bold bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer shrink-0 ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Rewatch</span>
              </button>
            </div>

            {/* Assessment Question Card */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Question {currentQIndex + 1} of {lessonQuestions.length}</span>
                </div>
                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  {activeQuestion.conceptTag}
                </span>
              </div>

              <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                {activeQuestion.question}
              </p>

              {/* Radio Options */}
              <div className="space-y-2 pt-1">
                {activeQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeQuestion.correctIndex;

                  let optionStyle = 'border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200';
                  if (isSelected) {
                    optionStyle = 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-600';
                  }
                  if (hasSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600'
                              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <span className="flex-1 leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Box on Submit */}
              {hasSubmitted && (
                <div
                  id="quiz-explanation-box"
                  className={`p-3 rounded-xl text-xs space-y-1 ${
                    selectedOption === activeQuestion.correctIndex
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    {selectedOption === activeQuestion.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Correct! (+50 XP)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>Topic Review Needed</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                    {activeQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Submit / Next Action */}
              <div className="pt-2">
                {!hasSubmitted ? (
                  <button
                    id="quiz-submit-btn"
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-xs tracking-wider shadow-md shadow-rose-500/30 transition-all disabled:opacity-40 cursor-pointer"
                  >
                    CONFIRM ANSWER
                  </button>
                ) : (
                  <button
                    id="quiz-next-btn"
                    onClick={handleNextQuestion}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs tracking-wider shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      {currentQIndex < lessonQuestions.length - 1
                        ? 'NEXT QUESTION'
                        : 'VIEW SCORE & PROGRESS'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Dynamic AI Question Generator with Gemini LLM */}
              <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Want more video questions?</span>
                <button
                  id="generate-ai-question-btn"
                  onClick={handleGenerateAIQuestion}
                  disabled={aiGenerating}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className={`w-3 h-3 text-indigo-500 dark:text-indigo-400 ${aiGenerating ? 'animate-spin' : ''}`} />
                  <span>{aiGenerating ? 'Generating...' : 'Ask AI to Generate More'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav currentScreen="lesson-quiz" onNavigate={onNavigate} />
    </div>
  );
};
