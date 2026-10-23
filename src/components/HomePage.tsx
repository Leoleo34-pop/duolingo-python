import React from 'react';
import { Lesson, UserProgress } from '../types';

interface HomePageProps {
  lessons: Lesson[];
  progress: UserProgress;
  onStartLesson: (lessonId: string) => void;
  onGoToProfile: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ lessons, progress, onStartLesson, onGoToProfile }) => {
  const isLessonUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    return progress.completedLessons.includes(lessons[index - 1].id);
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress.completedLessons.includes(lessonId);
  };

  const xpForNextLevel = progress.level * 100;
  const xpProgress = ((progress.xp % 100) / 100) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐍</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              PyLearn
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-red-500">❤️</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{progress.hearts}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">🔥</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{progress.streak}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-500">⚡</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{progress.xp}</span>
            </div>
            <button
              onClick={onGoToProfile}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-200 dark:shadow-purple-900/30 hover:scale-110 transition-transform"
            >
              {progress.level}
            </button>
          </div>
        </div>
        {/* XP Bar */}
        <div className="max-w-lg mx-auto px-4 pb-2">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">
            Niveau {progress.level} — {progress.xp % 100}/{100} XP
          </p>
        </div>
      </header>

      {/* Learning Path */}
      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Parcours Python 🎓
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Complète les leçons dans l'ordre pour débloquer la suite !
          </p>
        </div>

        {/* Path */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-700 -translate-x-1/2 rounded-full" />

          {lessons.map((lesson, index) => {
            const unlocked = isLessonUnlocked(index);
            const completed = isLessonCompleted(lesson.id);
            const isEven = index % 2 === 0;

            return (
              <div
                key={lesson.id}
                className={`relative flex items-center mb-8 ${isEven ? 'justify-start' : 'justify-end'}`}
              >
                {/* Node on the path */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                      completed
                        ? 'bg-green-500 border-green-300 dark:border-green-700'
                        : unlocked
                        ? 'bg-white dark:bg-slate-800 border-purple-400 dark:border-purple-500'
                        : 'bg-slate-300 dark:bg-slate-600 border-slate-400 dark:border-slate-500'
                    }`}
                  >
                    {completed && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs">✓</span>
                    )}
                  </div>
                </div>

                {/* Lesson Card */}
                <button
                  onClick={() => unlocked && onStartLesson(lesson.id)}
                  disabled={!unlocked}
                  className={`relative w-[45%] p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                    completed
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 shadow-lg shadow-green-100 dark:shadow-green-900/20'
                      : unlocked
                      ? 'bg-white dark:bg-slate-800 border-purple-300 dark:border-purple-600 shadow-lg shadow-purple-100 dark:shadow-purple-900/20 hover:scale-105 hover:shadow-xl cursor-pointer'
                      : 'bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{lesson.icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                  {completed && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  {!unlocked && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🔒</span>
                    </div>
                  )}
                  {unlocked && !completed && (
                    <div className="mt-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${lesson.color} text-white`}>
                        Commencer →
                      </span>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
