export type ThemeMode = 'light' | 'dark';

export type ScreenType =
  | 'welcome'
  | 'auth'
  | 'lesson-quiz'
  | 'score-result'
  | 'explore'
  | 'calendar'
  | 'profile'
  | 'skill-gap'
  | 'modules'
  | 'analytics'
  | 'course-detail'
  | 'roadmaps'
  | 'learning-path'
  | 'study-resources'
  | 'skill-planner'
  | 'assessments';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university: string;
  degree: string;
  targetCareer: string;
  learningPaceHours: number;
  totalScore: number;
  completedCoursesCount: number;
  currentStreakDays: number;
  skills: StudentSkill[];
}

export interface StudentSkill {
  id: string;
  name: string;
  category: string;
  currentLevel: number; // 0 - 100
  targetLevel: number; // 0 - 100
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  lastPracticed?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  hoursCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  reviewCount: number;
  studentsCount: string;
  description: string;
  instructor: string;
  syllabus: ModuleItem[];
  tags: string[];
  icon: string;
  themeColor: string;
  matchPercentage?: number;
  recommendationReason?: string;
  isEnrolled?: boolean;
  progressPercentage?: number;
}

export interface ModuleItem {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'quiz' | 'project' | 'reading';
  youtubeVideoId?: string;
  youtubeChannel?: string;
  videoSummary?: string;
  keyConcepts?: string[];
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  conceptTag: string;
}

export interface SkillGapAnalysisResult {
  readinessScore: number;
  summary: string;
  skillGaps: {
    skill: string;
    currentLevel: number;
    targetLevel: number;
    gap: number;
    priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  }[];
  strengths: string[];
  recommendedActions: string[];
  estimatedWeeksToTarget: number;
}

export interface TrackPhase {
  phaseNumber: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
}

export interface TrackPrerequisite {
  text: string;
  detail?: string;
  isImportant?: boolean;
}

export interface TrackMistake {
  title: string;
  description: string;
}

export interface CareerTrack {
  id: string;
  title: string;
  domainCategory?: 'Doctor & Medicine' | 'Engineering & Tech' | 'Design & Product';
  coursesCount: number;
  estimatedMonths: number;
  icon: string;
  themeColor: string;
  avgSalary: string;
  salaryRangeIndia?: string;
  recommendedCourse?: string;
  marketDemand: 'Very High' | 'High' | 'Moderate';
  description: string;
  requiredSkills: string[];
  whatIsAndWhyLearn?: string;
  careerOutcome?: string;
  jobRoles?: string[];
  prerequisites?: TrackPrerequisite[];
  phases?: TrackPhase[];
  commonMistakes?: TrackMistake[];
  timeCalculatorPresets?: { hoursPerDay: number; months: number }[];
  marketDemandStats?: {
    openJobsIndia: string;
    yoyGrowth: string;
    remoteRoles: string;
    source: string;
    freePathNote: string;
  };
  cheatsheetsAndTools?: {
    category: string;
    icon?: string;
    items: { name: string; desc: string; url?: string }[];
  }[];
}

export interface ScheduleItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  title: string;
  courseTitle: string;
  type: 'lecture' | 'quiz' | 'revision' | 'project';
  completed: boolean;
}

export interface LearningPathTopic {
  id: string;
  title: string;
  category: string;
  tier: 'Beginner' | 'Intermediate' | 'Advanced';
  order: number;
  status: 'completed' | 'current' | 'next' | 'locked';
  estimatedMinutes: number;
  score?: number;
  completedAt?: string;
  prerequisites: string[];
  conceptsCovered: string[];
  connectedSkill: string;
}

export interface LearningPathData {
  trackTitle: string;
  experienceLevel: string;
  totalTopics: number;
  completedTopics: number;
  progressPercentage: number;
  estimatedRemainingHours: number;
  currentTopic?: LearningPathTopic;
  nextRecommendedTopic?: LearningPathTopic;
  topics: LearningPathTopic[];
}

export interface SkillGapItem {
  skill: string;
  category?: string;
  score: number;
  gap?: number;
  masteryLevel?: string;
  urgency?: string;
  reason: string;
  recommendedAction?: string;
}

export interface SkillGapComprehensive {
  readinessScore: number;
  overallDiagnosis: string;
  strongSkills: SkillGapItem[];
  needsImprovement: SkillGapItem[];
  priorityToImprove: SkillGapItem[];
}

export interface CareerRecommendationItem {
  id: string;
  career: string;
  whyRecommended: string;
  requiredSkills: string[];
  studentCurrentSkillLevel: number;
  missingSkills: string[];
  recommendedLearningPath: string[];
  estimatedPreparationLevel: number;
  averageSalaryRange: string;
  marketDemand: string;
}

export interface AssessmentItem {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topic: string;
  questionCount: number;
  estimatedMinutes: number;
  completed: boolean;
  lastScore?: number | null;
  recommendedReason?: string;
  description: string;
}

export interface AssessmentEvaluationResult {
  assessmentId: string;
  topic: string;
  difficulty: string;
  scorePercentage: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  timeSpentSeconds: number;
  strengths: string[];
  weaknesses: string[];
  topicsToRevise: string[];
  recommendedNextTopics: string[];
  updatedSkillScore: number;
  message: string;
}

export interface StudyResourceItem {
  id: string;
  topic: string;
  category: 'Notes' | 'Solved Examples' | 'Practice Questions' | 'Tutorials' | 'Videos' | 'Revision Material' | 'Topic Summaries';
  title: string;
  description: string;
  estimatedReadMinutes: number;
  badge: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  keyPoints?: string[];
  examples?: {
    problem: string;
    step1?: string;
    step2?: string;
    step3?: string;
    solution: string;
  }[];
  questionsCount?: number;
  connectedSkill: string;
}

export interface SkillPlanStepItem {
  step: number;
  title: string;
  skill: string;
  currentLevel: number;
  targetLevel: number;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'completed' | 'in-progress' | 'not-started';
  recommendedResources: string;
  practice: string;
}

export interface SkillPlanData {
  targetCareer: string;
  totalSteps: number;
  completedSteps: number;
  overallPlanProgress: number;
  steps: SkillPlanStepItem[];
}

export interface PerformanceAnalyticsData {
  overallAverageScore: number;
  improvementPercentage: string;
  completedTopicsCount: number;
  currentOverallSkillLevel: string;
  topicPerformance: {
    topic: string;
    score: number;
    benchmark: number;
    status: string;
  }[];
  strengths: {
    name: string;
    score: number;
    comment: string;
  }[];
  weaknesses: {
    name: string;
    score: number;
    comment: string;
  }[];
  assessmentComparison: {
    olderAssessment: { date: string; score: number; title: string };
    recentAssessment: { date: string; score: number; title: string };
    netGain: string;
  };
}

