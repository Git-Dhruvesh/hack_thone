import React, { useState } from 'react';
import { Course, StudentProfile, CareerTrack, QuizQuestion } from '../types';
import {
  ENGINEERING_TRACKS_CONFIG,
  EngineeringCareerTrackConfig,
  TrackTopicSuggestion,
} from '../data/engineeringTrackData';
import {
  Sparkles,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Youtube,
  BookOpen,
  Award,
  ChevronRight,
  ExternalLink,
  Filter,
  Check,
  RotateCcw,
  Clock,
  Layers,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

interface TargetEngineeringTrackSectionProps {
  student: StudentProfile;
  courses: Course[];
  careerTracks: CareerTrack[];
  selectedTrackId: string;
  onSelectTrackId: (trackId: string) => void;
  onSelectCourse: (course: Course) => void;
  onSelectLesson?: (course: Course, lessonId: string) => void;
  onAnswerQuestion?: (isCorrect: boolean) => void;
  isOnlyTrackFilterActive: boolean;
  onToggleOnlyTrackFilter: () => void;
}

export const TargetEngineeringTrackSection: React.FC<TargetEngineeringTrackSectionProps> = ({
  student,
  courses,
  careerTracks,
  selectedTrackId,
  onSelectTrackId,
  onSelectCourse,
  onSelectLesson,
  onAnswerQuestion,
  isOnlyTrackFilterActive,
  onToggleOnlyTrackFilter,
}) => {
  // Active engineering track configuration
  const activeConfig: EngineeringCareerTrackConfig =
    ENGINEERING_TRACKS_CONFIG[selectedTrackId] ||
    ENGINEERING_TRACKS_CONFIG['track-ai-ml'];

  // Active video modal state
  const [activeVideoModal, setActiveVideoModal] = useState<{
    isOpen: boolean;
    videoId: string;
    title: string;
    channel: string;
  } | null>(null);

  // Practice question state: { [questionId: string]: { selectedIndex: number; isSubmitted: boolean } }
  const [practiceAnswers, setPracticeAnswers] = useState<
    Record<string, { selectedIndex: number; isSubmitted: boolean }>
  >({});

  // Active topic tab inside suggested topics
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  const currentTopic: TrackTopicSuggestion | undefined =
    activeConfig.suggestedTopics[selectedTopicIndex] || activeConfig.suggestedTopics[0];

  const handleSelectOption = (question: QuizQuestion, optionIndex: number) => {
    const isAlreadyAnswered = practiceAnswers[question.id]?.isSubmitted;
    if (isAlreadyAnswered) return;

    const isCorrect = optionIndex === question.correctIndex;

    setPracticeAnswers((prev) => ({
      ...prev,
      [question.id]: {
        selectedIndex: optionIndex,
        isSubmitted: true,
      },
    }));

    if (onAnswerQuestion) {
      onAnswerQuestion(isCorrect);
    }
  };

  const handleResetQuestion = (questionId: string) => {
    setPracticeAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  // Find course matching this track
  const matchedCourse = courses.find((c) =>
    activeConfig.courseIds.includes(c.id)
  );

  return (
    <div id="target-engineering-track-section" className="space-y-4">
      {/* 1. Track Selector Header & Pill Navigation */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-indigo-100 dark:border-slate-800 shadow-sm transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Target Engineering Career Track</span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
              {activeConfig.title}
            </h2>
          </div>

          {/* Filter Toggle: Show ONLY Courses Particularly for this Track */}
          <button
            id="btn-toggle-track-filter"
            onClick={onToggleOnlyTrackFilter}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isOnlyTrackFilterActive
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>
              {isOnlyTrackFilterActive
                ? 'Filtered to Track Courses'
                : 'Show All Courses'}
            </span>
            {isOnlyTrackFilterActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5" />
            )}
          </button>
        </div>

        {/* Engineering Track Pill Selector */}
        <div className="pt-3">
          <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider block mb-1.5">
            Switch Target Track:
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Object.values(ENGINEERING_TRACKS_CONFIG).map((track) => {
              const isSelected = selectedTrackId === track.id;
              return (
                <button
                  key={track.id}
                  id={`select-track-${track.id}`}
                  onClick={() => {
                    onSelectTrackId(track.id);
                    setSelectedTopicIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-700'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  <span>{track.shortTitle}</span>
                  <span className="text-[9px] opacity-75 font-normal">
                    {track.avgSalary.split('–')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Track Highlight Details */}
        <div className="mt-3 p-3 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 dark:from-slate-800/60 dark:via-slate-900 dark:to-slate-950 border border-indigo-100/80 dark:border-indigo-900/40">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {activeConfig.description}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-2 pt-2 border-t border-indigo-100/60 dark:border-slate-800 text-[11px]">
            <span className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
              💰 Salary: <strong className="text-indigo-600 dark:text-indigo-400">{activeConfig.avgSalary}</strong>
            </span>
            <span className="font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
              📈 Demand: <strong className="text-emerald-600 dark:text-emerald-400">{activeConfig.marketDemand}</strong>
            </span>
            <span className="font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
              🎯 Match: <strong className="text-indigo-600 dark:text-indigo-400">96% Calibrated</strong>
            </span>
          </div>

          {/* Targeted Core Skills */}
          <div className="mt-2 flex flex-wrap gap-1 items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mr-1">
              Required Skills:
            </span>
            {activeConfig.targetSkills.map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-700/60"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SUGGEST TOPICS ACCORDING TO VIDEOS & PRACTICE QUESTIONS */}
      <div id="suggested-topics-container" className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>Recommended Topics, Videos &amp; Practice</span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              Suggested Topics for {activeConfig.shortTitle}
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full w-fit">
            {activeConfig.suggestedTopics.length} Curated Topics
          </span>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
          {activeConfig.suggestedTopics.map((topic, idx) => (
            <button
              key={topic.id}
              id={`tab-suggested-topic-${topic.id}`}
              onClick={() => setSelectedTopicIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedTopicIndex === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>Topic #{idx + 1}: {topic.title.split('&')[0]}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                selectedTopicIndex === idx ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {topic.difficulty}
              </span>
            </button>
          ))}
        </div>

        {/* Topic Details: Video Lecture & Practice Questions */}
        {currentTopic && (
          <div className="space-y-3">
            {/* Topic Header Summary */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  {currentTopic.title}
                </h4>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {currentTopic.category} • ~{currentTopic.estimatedMinutes} mins estimated
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                {currentTopic.importance}
              </span>
            </div>

            {/* A. Recommended Video Lecture Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400">
                  <Youtube className="w-4 h-4 text-red-600" />
                  <span>Recommended Video Lecture</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {currentTopic.video.duration}
                </span>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  {currentTopic.video.title}
                </h5>
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                  Channel: {currentTopic.video.youtubeChannel}
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {currentTopic.video.videoSummary}
                </p>
              </div>

              {/* Key Concepts Tags */}
              <div className="flex flex-wrap gap-1 items-center pt-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase mr-1">
                  Concepts Covered:
                </span>
                {currentTopic.video.keyConcepts.map((concept) => (
                  <span
                    key={concept}
                    className="text-[9px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {concept}
                  </span>
                ))}
              </div>

              {/* Action: Watch Video Lecture */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  id={`btn-watch-video-${currentTopic.id}`}
                  onClick={() =>
                    setActiveVideoModal({
                      isOpen: true,
                      videoId: currentTopic.video.youtubeVideoId,
                      title: currentTopic.video.title,
                      channel: currentTopic.video.youtubeChannel,
                    })
                  }
                  className="flex-1 py-1.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Video Lecture</span>
                </button>

                {matchedCourse && (
                  <button
                    onClick={() => {
                      if (onSelectLesson) {
                        onSelectLesson(matchedCourse, matchedCourse.syllabus[0]?.id || '');
                      } else {
                        onSelectCourse(matchedCourse);
                      }
                    }}
                    className="py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    Course Syllabus →
                  </button>
                )}
              </div>
            </div>

            {/* B. Topic Practice-Based Questions */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Practice Questions ({currentTopic.practiceQuestions.length})</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100/70 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">
                  +50 Pts per Correct
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {currentTopic.practiceQuestions.map((q, qIndex) => {
                  const answerState = practiceAnswers[q.id];
                  const isSubmitted = answerState?.isSubmitted;
                  const isCorrect = answerState?.selectedIndex === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      id={`practice-question-card-${q.id}`}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                          Q{qIndex + 1}: {q.question}
                        </span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 whitespace-nowrap">
                          {q.conceptTag}
                        </span>
                      </div>

                      {/* Options */}
                      <div className="space-y-1.5 pt-1">
                        {q.options.map((option, optIdx) => {
                          const isChosen = answerState?.selectedIndex === optIdx;
                          const isThisOptionCorrect = optIdx === q.correctIndex;

                          let optionStyle =
                            'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300';

                          if (isSubmitted) {
                            if (isThisOptionCorrect) {
                              optionStyle =
                                'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border-emerald-400 dark:border-emerald-600 font-bold';
                            } else if (isChosen && !isThisOptionCorrect) {
                              optionStyle =
                                'bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 border-rose-400 dark:border-rose-600';
                            } else {
                              optionStyle =
                                'opacity-50 bg-slate-50 dark:bg-slate-800/40 text-slate-500 border-slate-200 dark:border-slate-800';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isSubmitted}
                              onClick={() => handleSelectOption(q, optIdx)}
                              className={`w-full text-left p-2 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between gap-2 ${optionStyle}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300 shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="leading-tight">{option}</span>
                              </div>

                              {isSubmitted && isThisOptionCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {isSubmitted && isChosen && !isThisOptionCorrect && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Reveal */}
                      {isSubmitted && (
                        <div
                          className={`mt-2 p-2.5 rounded-xl text-xs space-y-1 ${
                            isCorrect
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/60'
                              : 'bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800/60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center gap-1">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  Correct! +50 Points
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                  Incorrect — Review Explanation:
                                </>
                              )}
                            </span>
                            <button
                              onClick={() => handleResetQuestion(q.id)}
                              className="text-[10px] underline font-semibold cursor-pointer opacity-75 hover:opacity-100 flex items-center gap-0.5"
                            >
                              <RotateCcw className="w-2.5 h-2.5" /> Retry
                            </button>
                          </div>
                          <p className="text-[11px] leading-relaxed pt-0.5 opacity-90">
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. In-App Video Modal */}
      {activeVideoModal && activeVideoModal.isOpen && (
        <div
          id="video-player-modal"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="bg-slate-900 text-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 flex items-center justify-between border-b border-slate-800">
              <div className="pr-2">
                <span className="text-[10px] font-bold uppercase text-red-400 tracking-wider flex items-center gap-1">
                  <Youtube className="w-3 h-3 text-red-400" />
                  {activeVideoModal.channel}
                </span>
                <h3 className="text-xs font-bold truncate mt-0.5">
                  {activeVideoModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* YouTube Iframe Embed */}
            <div className="aspect-video w-full bg-black relative">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoModal.videoId}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-3 bg-slate-950 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Watch and take practice questions above
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${activeVideoModal.videoId}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-[11px] flex items-center gap-1"
              >
                <span>YouTube App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
