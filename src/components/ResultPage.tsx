import React from 'react';
import { Lesson } from '../types';

interface ResultPageProps {
  lesson: Lesson;
  score: number;
  total: number;
  xpEarned: number;
  onContinue: () => void;
  onRetry: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ lesson, score, total, xpEarned, onContinue, onRetry }) => {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center px-4 transition-colors duration-300">
      {/* Result Card */}
      <div className="w-full max-w-sm text-center">
        {/* Icon */}
        <div className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-6 ${
          passed
            ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-xl shadow-green-200 dark:shadow-green-900/30'
            : 'bg-gradient-to-br from-orange-400 to-red-500 shadow-xl shadow-orange-200 dark:shadow-orange-900/30'
        }`}>
          <span className="text-5xl">{passed ? '🏆' : '💪'}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          {passed ? 'Leçon terminée !' : 'Presque...'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          {passed
            ? `Bravo ! Tu as maîtrisé "${lesson.title}" !`
            : 'Continue de pratiquer, tu y es presque !'
          }
        </p>

        {/* Stats */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{percentage}%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Score</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{score}/{total}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Correct</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">+{xpEarned}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">XP</p>
            </div>
          </div>

          {/* Score Bar */}
          <div className="mt-4">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  passed
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : 'bg-gradient-to-r from-orange-400 to-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {passed && (
            <button
              onClick={onContinue}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Continuer →
            </button>
          )}
          <button
            onClick={onRetry}
            className={`w-full py-4 rounded-xl font-bold text-lg border-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
              passed
                ? 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                : 'border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
            }`}
          >
            {passed ? 'Refaire la leçon' : 'Réessayer 💪'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
