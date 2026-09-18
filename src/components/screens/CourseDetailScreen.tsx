import React, { useState } from 'react';
import { ScreenType, Course } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import { Atom, Star, Clock, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare, Sparkles, Send, BookOpen } from 'lucide-react';

interface CourseDetailScreenProps {
  course: Course;
  onNavigate: (screen: ScreenType) => void;
  onSelectLesson?: (lesson: any) => void;
}

export const CourseDetailScreen: React.FC<CourseDetailScreenProps> = ({
  course,
  onNavigate,
  onSelectLesson,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'ai-tutor'>('overview');
  const [tutorMessage, setTutorMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: `Hello! I am your AI Copilot for "${course.title}". Ask me any conceptual question, request a mathematical derivation, or ask for practical code examples!`,
    },
  ]);
  const [isSending, setIsSending] = useState(false);

  const handleSendTutorMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorMessage.trim() || isSending) return;

    const userText = tutorMessage.trim();
    setChatHistory((prev) => [...prev, { role: 'user', text: userText }]);
    setTutorMessage('');
    setIsSending(true);

    try {
      const res = await fetch('/api/ai/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          contextCourse: course.title,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setChatHistory((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      }
    } catch (err) {
      console.error('Error contacting AI tutor:', err);
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'I encountered an issue connecting to the reasoning server. Please retry in a moment!',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="screen-course-detail" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title={course.title}
        onBack={() => onNavigate('modules')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <button
            onClick={() => setActiveTab(activeTab === 'ai-tutor' ? 'overview' : 'ai-tutor')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'ai-tutor'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
            }`}
            title="Ask AI Tutor"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Mockup #11 Hero Container with Atom Icon */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center relative overflow-hidden transition-colors">
          {/* Atom Icon graphic matching Mockup #11 */}
          <div className="w-20 h-20 rounded-2xl bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200/80 dark:border-cyan-800/80 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-3 shadow-inner">
            <Atom className="w-12 h-12 stroke-[1.8] animate-pulse" />
          </div>

          {/* 99 HOURS and 4.9 Stars matching Mockup #11 */}
          <div className="flex items-center gap-4 text-xs font-bold text-slate-700 dark:text-slate-200 my-1">
            <span className="font-mono uppercase bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              {course.duration}
            </span>
            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-900/60">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{course.rating} Rating</span>
            </div>
          </div>

          <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
            {course.title}
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed max-w-sm">
            {course.description}
          </p>

          {/* Sub-Tabs: Overview vs AI Copilot */}
          <div className="w-full flex items-center justify-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'syllabus'
                  ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Syllabus ({course.syllabus.length})
            </button>
            <button
              onClick={() => setActiveTab('ai-tutor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'ai-tutor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
              }`}
            >
              <Sparkles className="w-3 h-3 text-pink-400" />
              AI Copilot
            </button>
          </div>
        </div>

        {/* Tab Content 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2 transition-colors">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Key Competencies Acquired
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation Tabs `< Prev` | `Next >` matching Mockup #11 */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate('modules')}
                className="py-2.5 px-3 rounded-xl bg-slate-800 dark:bg-slate-800/80 hover:bg-slate-700 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>All Modules</span>
              </button>
              <button
                onClick={() => onNavigate('lesson-quiz')}
                className="py-2.5 px-3 rounded-xl bg-slate-800 dark:bg-slate-800/80 hover:bg-slate-700 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span>Lesson #1</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab Content 2: Syllabus */}
        {activeTab === 'syllabus' && (
          <div className="space-y-2">
            {course.syllabus.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-2 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 font-mono">{item.duration}</span>
                  </div>
                </div>
                {item.completed ? (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      if (onSelectLesson) onSelectLesson(item);
                      onNavigate('lesson-quiz');
                    }}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Start Lesson
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: AI Copilot Tutor */}
        {activeTab === 'ai-tutor' && (
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                AI Engineering Copilot (Gemini)
              </span>
              <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/60">
                Active
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white ml-6 rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 mr-6 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              ))}
              {isSending && (
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs flex items-center gap-2">
                  <span className="animate-spin w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full" />
                  <span>AI Copilot is synthesizing explanation...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSendTutorMessage} className="flex gap-1.5 pt-1">
              <input
                type="text"
                value={tutorMessage}
                onChange={(e) => setTutorMessage(e.target.value)}
                placeholder="Ask about backpropagation, gradients..."
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="submit"
                disabled={isSending || !tutorMessage.trim()}
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Coral/Salmon Action Button matching Mockup #11 ("LOREM IPSUM" in mockup, here "RESUME LESSON #1") */}
        <div className="pt-2">
          <button
            id="course-start-action-btn"
            onClick={() => onNavigate('lesson-quiz')}
            className="w-full py-3.5 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-[0.98] text-white font-extrabold text-xs tracking-wider shadow-lg shadow-rose-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>START / RESUME LESSON #1</span>
          </button>
        </div>
      </div>

      <BottomNav currentScreen="modules" onNavigate={onNavigate} />
    </div>
  );
};
