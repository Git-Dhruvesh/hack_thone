import React, { useState } from 'react';
import { ScreenType, StudentProfile } from '../../types';
import { ScreenHeader } from '../Navigation';
import { User, Mail, Lock, Target, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
  student: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  student,
  onUpdateStudent,
  onNavigate,
}) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [password, setPassword] = useState('••••••••••••');
  const [targetCareer, setTargetCareer] = useState(student.targetCareer);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onUpdateStudent({
        name: name || 'Student Engineer',
        email: email || 'student@university.edu',
        targetCareer,
      });
      setIsLoading(false);
      onNavigate('explore');
    }, 400);
  };

  return (
    <div id="screen-auth" className="flex-1 flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-y-auto transition-colors">
      <ScreenHeader
        title={isSignUp ? 'Student Onboarding' : 'Student Login'}
        onBack={() => onNavigate('welcome')}
        headerColorClass="bg-gradient-to-r from-rose-500 to-pink-500 text-white"
        textColorClass="text-white"
      />

      <div className="flex-1 px-6 py-4 flex flex-col justify-between max-w-md mx-auto w-full">
        {/* Mockup #2 Avatar Illustration with Graduation Cap */}
        <div className="flex flex-col items-center justify-center my-3">
          <div className="relative w-24 h-24 rounded-full bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-800/80 flex items-center justify-center shadow-inner">
            <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none">
              {/* Person head */}
              <circle cx="50" cy="55" r="20" fill="#fbcfe8" />
              <circle cx="50" cy="55" r="18" fill="#fda4af" />
              {/* Hair */}
              <path d="M32 50 C32 35 68 35 68 50 C68 45 60 40 50 40 C40 40 32 45 32 50 Z" fill="#1e293b" />
              {/* Graduation Cap */}
              <polygon points="50,22 84,33 50,44 16,33" fill="#312e81" />
              <ellipse cx="50" cy="40" rx="16" ry="6" fill="#1e1b4b" />
              <circle cx="50" cy="33" r="2.5" fill="#fbbf24" />
              <path d="M50 33 Q68 38 72 48" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" fill="none" />
              <rect x="71" y="48" width="3" height="6" rx="1" fill="#f59e0b" />
            </svg>

            <span className="absolute -bottom-1 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white dark:border-slate-900">
              AI Student
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-3 text-center">
            {isSignUp ? 'Empower Your Career' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-xs mt-1">
            Personalized learning path calibrated by Machine Learning and AI skill assessment.
          </p>
        </div>

        {/* Input Form matching Mockup #2 */}
        <form onSubmit={handleSubmit} className="space-y-3.5 my-2">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  id="auth-input-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="auth-input-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="auth-input-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Target Engineering Career Track
              </label>
              <div className="relative">
                <Target className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  id="auth-select-career"
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all cursor-pointer"
                >
                  <option value="AI & Machine Learning Engineer">AI & Machine Learning Engineer</option>
                  <option value="UI/UX Design & Product Engineering">UI/UX Design & Product Engineering (₹4–35 LPA)</option>
                  <option value="Gynecologist & Obstetrician (Doctor)">Gynecologist & Obstetrician (Doctor, ₹12.5–30 LPA)</option>
                  <option value="Cardiologist & Heart Specialist (Doctor)">Cardiologist & Heart Specialist (Doctor, ₹15.2–60 LPA)</option>
                  <option value="Dermatologist & Cosmetologist (Doctor)">Dermatologist & Cosmetologist (Doctor, ₹3.6–30 LPA)</option>
                  <option value="Child Psychologist / Psychiatrist (Doctor)">Child Psychologist / Psychiatrist (Doctor, ₹8–15 LPA)</option>
                  <option value="Cloud & Distributed Systems">Cloud & Distributed Systems</option>
                  <option value="Data Science & Big Data Analytics">Data Science & Big Data Analytics</option>
                  <option value="Cybersecurity & Secure Systems">Cybersecurity & Secure Systems</option>
                  <option value="Fullstack Software Architect">Fullstack Software Architect</option>
                </select>
              </div>
            </div>
          )}

          {/* Terms checkbox matching Mockup #2 */}
          <div className="flex items-start gap-2 pt-1">
            <input
              id="auth-checkbox-terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-rose-500 focus:ring-rose-400 cursor-pointer"
            />
            <label htmlFor="auth-checkbox-terms" className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug cursor-pointer">
              I agree to allow AI Skill-Gap profiling and personalized study telemetry.
            </label>
          </div>

          {/* Coral/Salmon Submit Button matching Mockup #2 */}
          <button
            id="auth-submit-btn"
            type="submit"
            disabled={isLoading || (isSignUp && !agreeTerms)}
            className="w-full mt-3 py-3 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-[0.98] text-white font-bold text-xs tracking-wider shadow-lg shadow-rose-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>{isSignUp ? 'CREATE SMART PROFILE' : 'SIGN IN'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Login / Sign Up */}
        <div className="text-center pt-2 pb-4">
          <button
            id="auth-toggle-mode-btn"
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium"
          >
            {isSignUp ? (
              <span>Already enrolled? <b className="text-rose-500 dark:text-rose-400">Sign in here</b></span>
            ) : (
              <span>Need an intelligent study account? <b className="text-rose-500 dark:text-rose-400">Register</b></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
