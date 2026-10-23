import React from 'react';
import { UserProgress } from '../types';

interface ProfilePageProps {
  progress: UserProgress;
  totalLessons: number;
  onGoBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ progress, totalLessons, onGoBack }) => {
  const accuracy = progress.totalAttempts > 0
    ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100)
    : 0;

  const completionRate = Math.round((progress.completedLessons.length / totalLessons) * 100);

  const stats = [
    { icon: '⚡', label: 'XP Total', value: progress.xp, color: 'from-yellow-400 to-orange-500' },
    { icon: '🎯', label: 'Précision', value: `${accuracy}%`, color: 'from-green-400 to-emerald-500' },
    { icon: '🔥', label: 'Série', value: `${progress.streak}j`, color: 'from-red-400 to-rose-500' },
    { icon: '📚', label: 'Leçons', value: `${progress.completedLessons.length}/${totalLessons}`, color: 'from-purple-400 to-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={onGoBack}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Mon Profil</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        {/* Avatar & Level */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-200 dark:shadow-purple-900/30">
              <span className="text-4xl">🐍</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800">
              <span className="text-white font-bold text-sm">{progress.level}</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-4">
            Apprenant Python
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Niveau {progress.level} • {progress.xp} XP total
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Progression globale</h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-300">Parcours complété</span>
                <span className="font-medium text-slate-800 dark:text-white">{completionRate}%</span>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-300">Précision globale</span>
                <span className="font-medium text-slate-800 dark:text-white">{accuracy}%</span>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-300">Prochain niveau</span>
                <span className="font-medium text-slate-800 dark:text-white">{progress.xp % 100}/100 XP</span>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-700"
                  style={{ width: `${(progress.xp % 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Badges 🏅</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '🌟', label: 'Premier pas', unlocked: progress.completedLessons.length >= 1 },
              { icon: '🔥', label: 'En feu !', unlocked: progress.streak >= 3 },
              { icon: '💯', label: 'Perfectionniste', unlocked: accuracy >= 90 },
              { icon: '🎯', label: 'Précis', unlocked: progress.totalCorrect >= 10 },
              { icon: '📖', label: 'Étudiant', unlocked: progress.completedLessons.length >= 3 },
              { icon: '🏆', label: 'Champion', unlocked: progress.completedLessons.length >= totalLessons },
            ].map((badge, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl text-center transition-all ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800'
                    : 'bg-slate-100 dark:bg-slate-700/50 opacity-40'
                }`}
              >
                <span className="text-2xl block mb-1">{badge.icon}</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
