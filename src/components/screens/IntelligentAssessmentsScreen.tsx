import React, { useState, useEffect } from 'react';
import { ScreenType, StudentProfile, AssessmentItem, AssessmentEvaluationResult } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Target,
  BarChart3,
  Flame,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface IntelligentAssessmentsScreenProps {
  student: StudentProfile;
  onNavigate: (screen: ScreenType) => void;
  onUpdateScore?: (newScore: number) => void;
}

interface Question {
  id: string;
  text: string;
  topic: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const ASSESSMENT_QUESTIONS: Record<string, Question[]> = {
  'Quadratic Equations': [
    {
      id: 'q-quad-1',
      topic: 'Quadratic Equations',
      text: 'For the equation 2x² - 4x - 6 = 0, what is the value of the discriminant (Δ = b² - 4ac)?',
      options: ['Δ = 32', 'Δ = 64', 'Δ = -32', 'Δ = 48'],
      correctIndex: 1,
      explanation: 'b² - 4ac = (-4)² - 4(2)(-6) = 16 + 48 = 64. Since Δ > 0 and is a perfect square, there are two distinct rational roots.',
    },
    {
      id: 'q-quad-2',
      topic: 'Quadratic Equations',
      text: 'What are the coordinates of the vertex of the parabola f(x) = x² - 6x + 5?',
      options: ['(3, -4)', '(-3, -4)', '(3, 4)', '(6, 5)'],
      correctIndex: 0,
      explanation: 'The x-coordinate of the vertex is x = -b / (2a) = -(-6) / (2*1) = 3. Substituting x=3: f(3) = 9 - 18 + 5 = -4. Vertex is (3, -4).',
    },
    {
      id: 'q-quad-3',
      topic: 'Quadratic Equations',
      text: 'If a quadratic equation ax² + bx + c = 0 has equal real roots, which condition must hold true?',
      options: ['b² - 4ac > 0', 'b² - 4ac = 0', 'b² - 4ac < 0', 'a + b + c = 0'],
      correctIndex: 1,
      explanation: 'Equal real roots occur if and only if the discriminant Δ = b² - 4ac equals 0.',
    },
    {
      id: 'q-quad-4',
      topic: 'Quadratic Equations',
      text: 'Which of the following polynomials factors cleanly into (2x + 1)(x - 3)?',
      options: ['2x² - 5x - 3', '2x² + 5x - 3', '2x² - 7x - 3', '2x² - 6x - 3'],
      correctIndex: 0,
      explanation: '(2x + 1)(x - 3) = 2x² - 6x + x - 3 = 2x² - 5x - 3.',
    },
  ],
  'Probability & Statistics': [
    {
      id: 'q-prob-1',
      topic: 'Probability & Statistics',
      text: 'If events A and B are independent, which equation is always mathematically true?',
      options: ['P(A ∩ B) = P(A) + P(B)', 'P(A ∩ B) = P(A) × P(B)', 'P(A | B) = 0', 'P(A ∪ B) = 1'],
      correctIndex: 1,
      explanation: 'By definition of statistical independence, P(A ∩ B) = P(A) × P(B).',
    },
    {
      id: 'q-prob-2',
      topic: 'Probability & Statistics',
      text: 'Two fair 6-sided dice are rolled. What is the probability that the sum is exactly 7?',
      options: ['1/6', '1/12', '5/36', '7/36'],
      correctIndex: 0,
      explanation: 'There are 6 combinations summing to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) out of 36 total outcomes = 6/36 = 1/6.',
    },
    {
      id: 'q-prob-3',
      topic: 'Probability & Statistics',
      text: 'In Bayes Theorem P(A|B) = [P(B|A) · P(A)] / P(B), what is P(A) called?',
      options: ['Likelihood', 'Posterior probability', 'Prior probability', 'Marginal evidence'],
      correctIndex: 2,
      explanation: 'P(A) is the prior probability of hypothesis A before observing evidence B.',
    },
    {
      id: 'q-prob-4',
      topic: 'Probability & Statistics',
      text: 'What is the variance of a dataset if its standard deviation is 5?',
      options: ['2.23', '10', '25', '50'],
      correctIndex: 2,
      explanation: 'Variance is the square of standard deviation: σ² = 5² = 25.',
    },
  ],
};

export const IntelligentAssessmentsScreen: React.FC<IntelligentAssessmentsScreenProps> = ({
  student,
  onNavigate,
  onUpdateScore,
}) => {
  const [assessmentsList, setAssessmentsList] = useState<AssessmentItem[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('Quadratic Equations');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<AssessmentEvaluationResult | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(300);

  useEffect(() => {
    fetch('/api/assessments')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.assessments) {
          setAssessmentsList(data.assessments);
        }
      })
      .catch((err) => console.error('Error fetching assessments list:', err));
  }, []);

  const currentQuestions = ASSESSMENT_QUESTIONS[selectedTopic] || ASSESSMENT_QUESTIONS['Quadratic Equations'];
  const currentQ = currentQuestions[currentQuestionIndex];

  // Timer countdown when quiz is active
  useEffect(() => {
    if (!quizActive || evaluationResult) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [quizActive, evaluationResult]);

  const handleStartQuiz = (topic: string, difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setSelectedTopic(topic);
    setSelectedDifficulty(difficulty);
    setQuizActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsAnswerSubmitted(false);
    setEvaluationResult(null);
    setTimeRemaining(240);
  };

  const handleSelectOption = (optIndex: number) => {
    if (isAnswerSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = async () => {
    setIsEvaluating(true);
    const answersPayload = currentQuestions.map((q, idx) => ({
      questionId: q.id,
      selectedIndex: userAnswers[idx] ?? -1,
      correctIndex: q.correctIndex,
      isCorrect: userAnswers[idx] === q.correctIndex,
    }));

    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId: `asm-${selectedTopic.toLowerCase().replace(/\s+/g, '-')}`,
          topic: selectedTopic,
          difficulty: selectedDifficulty,
          answers: answersPayload,
          timeSpentSeconds: 240 - timeRemaining,
        }),
      });
      const data: AssessmentEvaluationResult = await res.json();
      setEvaluationResult(data);

      // Trigger student score update if provided
      if (onUpdateScore && data.updatedSkillScore) {
        onUpdateScore(student.totalScore + 25);
      }
    } catch (err) {
      console.error('Failed to submit assessment:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div id="screen-assessments" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title={quizActive ? `${selectedTopic} Assessment` : 'Intelligent Assessments'}
        onBack={() => {
          if (quizActive) {
            setQuizActive(false);
            setEvaluationResult(null);
          } else {
            onNavigate('explore');
          }
        }}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          quizActive && !evaluationResult ? (
            <div className="flex items-center gap-1 text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              <Clock className="w-3 h-3" />
              <span>{Math.floor(timeRemaining / 60)}:{('0' + (timeRemaining % 60)).slice(-2)}</span>
            </div>
          ) : undefined
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* VIEW 1: Assessment Catalogue & Selection */}
        {!quizActive && (
          <>
            {/* Gap-Targeted Header */}
            <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white p-4.5 rounded-3xl shadow-lg shadow-indigo-700/20 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                  Adaptive Diagnostic Engine
                </span>
                <span className="text-[10px] font-bold text-amber-300 bg-black/30 px-2 py-0.5 rounded-full">
                  Real-time Skill Level Updates
                </span>
              </div>

              <h2 className="text-base font-extrabold text-white mt-2">
                Level &amp; Skill-Gap Targeted Tests
              </h2>
              <p className="text-xs text-indigo-200 mt-1 leading-relaxed max-w-sm">
                Diagnostic quizzes adapt difficulty based on your performance. Tests highlight strong areas, pinpoint gaps, and recommend remedial topics.
              </p>

              {/* Priority Callout */}
              <div className="mt-3 bg-white/10 rounded-2xl p-2.5 border border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-bold text-white">Recommended: Quadratic Equations</span>
                </div>
                <button
                  onClick={() => handleStartQuiz('Quadratic Equations', 'Intermediate')}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-[11px] rounded-xl transition-all cursor-pointer"
                >
                  Start Now
                </button>
              </div>
            </div>

            {/* Assessment Cards List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  Available Assessments
                </h3>
                <span className="text-[11px] text-slate-500">
                  {assessmentsList.length} Tests Ready
                </span>
              </div>

              {assessmentsList.map((asm) => (
                <div
                  key={asm.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80">
                        {asm.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {asm.questionCount} Questions • {asm.estimatedMinutes} Mins
                      </span>
                    </div>

                    {asm.lastScore ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        Score: {asm.lastScore}%
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Not Attempted</span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5">
                    {asm.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    {asm.description}
                  </p>

                  {asm.recommendedReason && (
                    <div className="mt-2 text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-900/60 font-medium">
                      ⚠️ {asm.recommendedReason}
                    </div>
                  )}

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Topic: <strong className="text-slate-700 dark:text-slate-300">{asm.topic}</strong>
                    </span>

                    <button
                      onClick={() => handleStartQuiz(asm.topic.includes('Probability') ? 'Probability & Statistics' : 'Quadratic Equations', asm.difficulty)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{asm.completed ? 'Retake Test' : 'Start Test'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* VIEW 2: Active Test Question Solver */}
        {quizActive && !evaluationResult && currentQ && (
          <div className="space-y-4">
            {/* Progress Header */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Question {currentQuestionIndex + 1} of {currentQuestions.length}
                </span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedTopic} • {selectedDifficulty} Level
                </h4>
              </div>
              <div className="w-24 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-slate-900 p-4.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-1">
                Question {currentQuestionIndex + 1}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.text}
              </h3>

              {/* Options */}
              <div className="mt-4 space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3 rounded-2xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-600 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-600/30 font-bold'
                          : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Next or Submit */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex((prev) => prev - 1);
                    }
                  }}
                  disabled={currentQuestionIndex === 0}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={userAnswers[currentQuestionIndex] === undefined || isEvaluating}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/20 disabled:opacity-40 transition-all cursor-pointer"
                >
                  {isEvaluating ? (
                    <span>Evaluating...</span>
                  ) : currentQuestionIndex === currentQuestions.length - 1 ? (
                    <span>Submit &amp; View Analysis</span>
                  ) : (
                    <>
                      <span>Next Question</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Detailed Post-Assessment Score & Gap Analysis */}
        {quizActive && evaluationResult && (
          <div className="space-y-4">
            {/* Score Ring Summary */}
            <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white p-5 rounded-3xl shadow-xl text-center relative overflow-hidden">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-0.5 rounded-full">
                Assessment Analysis
              </span>

              <div className="mt-3 flex justify-center items-center">
                <div className="w-24 h-24 rounded-full border-4 border-emerald-400 flex flex-col items-center justify-center bg-white/10 shadow-inner">
                  <span className="text-3xl font-black font-mono text-emerald-300">
                    {evaluationResult.scorePercentage}%
                  </span>
                  <span className="text-[9px] uppercase font-bold text-indigo-200">
                    Score
                  </span>
                </div>
              </div>

              <h3 className="text-base font-extrabold text-white mt-3">
                {evaluationResult.scorePercentage >= 75
                  ? 'Strong Conceptual Mastery!'
                  : evaluationResult.scorePercentage >= 50
                  ? 'Intermediate Baseline Reached'
                  : 'Remedial Focus Required'}
              </h3>
              <p className="text-xs text-indigo-200 mt-1 max-w-sm mx-auto">
                {evaluationResult.correctCount} of {evaluationResult.totalQuestions} questions answered correctly in {evaluationResult.timeSpentSeconds} seconds.
              </p>

              <div className="mt-4 pt-3 border-t border-indigo-500/30 flex justify-center gap-3 text-xs">
                <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 rounded-xl font-bold">
                  Skill Score: {evaluationResult.updatedSkillScore}%
                </span>
                <span className="bg-white/10 text-white px-2.5 py-1 rounded-xl font-bold">
                  Streak Maintained 🔥
                </span>
              </div>
            </div>

            {/* Strengths Card */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Identified Strengths
                </h4>
              </div>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {evaluationResult.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses & Gaps Card */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-rose-600 dark:text-rose-400">
                <XCircle className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Weak Areas / Skill Gaps
                </h4>
              </div>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {evaluationResult.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Topics to Revise Card */}
            <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400">
                <BookOpen className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Recommended Topics to Revise
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {evaluationResult.topicsToRevise.map((top, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-semibold px-2.5 py-1 rounded-xl shadow-xs"
                  >
                    {top}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onNavigate('study-resources')}
                className="mt-3 w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Personalized Study Notes &amp; Solved Examples</span>
              </button>
            </div>

            {/* Finish & Retake Controls */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setQuizActive(false);
                  setEvaluationResult(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Back to Tests
              </button>
              <button
                onClick={() => onNavigate('learning-path')}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-xs text-white shadow-md shadow-indigo-600/20 transition-colors cursor-pointer"
              >
                Go to Learning Path
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav currentScreen="explore" onNavigate={onNavigate} />
    </div>
  );
};
