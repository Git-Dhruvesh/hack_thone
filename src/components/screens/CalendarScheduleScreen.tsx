import React, { useState } from 'react';
import { ScreenType, ScheduleItem } from '../../types';
import { ScreenHeader, BottomNav } from '../Navigation';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Clock, Flame, Calendar as CalendarIcon, Plus } from 'lucide-react';

interface CalendarScheduleScreenProps {
  schedule: ScheduleItem[];
  onToggleScheduleItem: (id: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const CalendarScheduleScreen: React.FC<CalendarScheduleScreenProps> = ({
  schedule,
  onToggleScheduleItem,
  onNavigate,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(18);
  const [currentMonth, setCurrentMonth] = useState('MARCH 2026');

  // Days of the week header
  const weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  // Calendar dates for March 2026 (exact representation matching Mockup #6)
  // March 1, 2026 was Sunday. So rows:
  // Row 1: 1, 2, 3, 4, 5, 6, 7
  // Row 2: 8, 9, 10, 11, 12, 13, 14
  // Row 3: 15, 16, 17, 18, 19, 20, 21
  // Row 4: 22, 23, 24, 25, 26, 27, 28
  // Row 5: 29, 30, 31, 1, 2, 3, 4
  const calendarCells = [
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true, hasActivity: true, color: 'bg-emerald-500' },
    { day: 3, isCurrentMonth: true, hasActivity: true, color: 'bg-indigo-500' },
    { day: 4, isCurrentMonth: true, hasActivity: true, color: 'bg-cyan-500' },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },

    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true, hasActivity: true, color: 'bg-emerald-500' },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true, hasActivity: true, color: 'bg-cyan-500' },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },

    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true, hasActivity: true, color: 'bg-indigo-500' },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true, isSelected: true, hasActivity: true, color: 'bg-rose-500' },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true, hasActivity: true, color: 'bg-emerald-500' },

    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true, hasActivity: true, color: 'bg-cyan-500' },
    { day: 25, isCurrentMonth: true, hasActivity: true, color: 'bg-emerald-500' },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },

    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
  ];

  return (
    <div id="screen-calendar" className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <ScreenHeader
        title="Learning Schedule"
        onBack={() => onNavigate('explore')}
        headerColorClass="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
        textColorClass="text-slate-800 dark:text-slate-100"
        rightAction={
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/80">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>9 Days Streak</span>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Calendar Widget matching Mockup #6 */}
        <div className="bg-slate-900 dark:bg-slate-900/90 text-white p-4 rounded-3xl shadow-xl shadow-slate-900/20 border border-slate-800">
          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-bold tracking-widest text-slate-200 uppercase">
              {currentMonth}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentMonth('FEBRUARY 2026')}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentMonth('MARCH 2026')}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {weekDays.map((wd) => (
              <span key={wd} className="text-[10px] font-bold text-slate-500">
                {wd}
              </span>
            ))}
          </div>

          {/* Calendar Day Grid matching Mockup #6 with colored badges */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarCells.map((cell, idx) => {
              const isSelected = cell.day === selectedDay && cell.isCurrentMonth;
              return (
                <button
                  key={idx}
                  onClick={() => cell.isCurrentMonth && setSelectedDay(cell.day)}
                  disabled={!cell.isCurrentMonth}
                  className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center text-[11px] font-semibold transition-all relative cursor-pointer ${
                    !cell.isCurrentMonth
                      ? 'text-slate-600 opacity-40 cursor-default'
                      : isSelected
                      ? 'bg-rose-500 text-white font-bold ring-2 ring-rose-400 shadow-md shadow-rose-500/50'
                      : cell.hasActivity
                      ? `${cell.color} text-white shadow-sm hover:scale-110`
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Activity Legend matching colors in Mockup #6 */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-around text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500" /> Quiz / Lab
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> Lecture
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Selected
            </span>
          </div>
        </div>

        {/* Schedule / Milestone List matching Mockup #6 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Planned Sessions (March {selectedDay})
            </h2>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/50">
              Adaptive Pace: 2 hrs/day
            </span>
          </div>

          <div className="space-y-2">
            {schedule.map((item) => (
              <div
                key={item.id}
                id={`schedule-item-${item.id}`}
                onClick={() => onToggleScheduleItem(item.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  item.completed
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-sm text-slate-900 dark:text-slate-100 hover:border-indigo-300 dark:hover:border-indigo-500'
                }`}
              >
                <button
                  type="button"
                  className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  aria-label={item.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-indigo-400" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-xs font-bold truncate ${
                        item.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono ml-2 shrink-0">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {item.courseTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action to jump to Quiz */}
        <div className="pt-2">
          <button
            id="calendar-launch-lesson-btn"
            onClick={() => onNavigate('lesson-quiz')}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-xs tracking-wider shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>RESUME TODAY'S LESSON #1</span>
          </button>
        </div>
      </div>

      <BottomNav currentScreen="calendar" onNavigate={onNavigate} />
    </div>
  );
};
