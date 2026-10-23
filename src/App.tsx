import React, { useState, useEffect } from 'react';
import { Page, UserProgress, Lesson } from './types';
import { lessons } from './data/lessons';
import HomePage from './components/HomePage';
import LessonPage from './components/LessonPage';
import ProfilePage from './components/ProfilePage';
import ResultPage from './components/ResultPage';

const STORAGE_KEY = 'pylearn_progress';

const defaultProgress: UserProgress = {
  xp: 0,
  level: 1,
  hearts: 5,
  maxHearts: 5,
  completedLessons: [],
  currentLesson: null,
  streak: 1,
  totalCorrect: 0,
  totalAttempts: 0,
};

function loadProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultProgress, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return defaultProgress;
}

function saveProgress(progress: UserProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [lessonScore, setLessonScore] = useState(0);
  const [lessonTotal, setLessonTotal] = useState(0);
  const [lessonXpEarned, setLessonXpEarned] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('pylearn_dark') === 'true';
  });

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('pylearn_dark', String(darkMode));
  }, [darkMode]);

  const handleStartLesson = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
      setPage('lesson');
    }
  };

  const handleAnswer = (correct: boolean, xp: number) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      newProgress.totalAttempts += 1;
      if (correct) {
        newProgress.totalCorrect += 1;
        newProgress.xp += xp;
        newProgress.level = Math.floor(newProgress.xp / 100) + 1;
      } else {
        newProgress.hearts = Math.max(0, newProgress.hearts - 1);
      }
      return newProgress;
    });
  };

  const handleFinishLesson = (score: number, total: number) => {
    const xpEarned = score * 10;
    setLessonScore(score);
    setLessonTotal(total);
    setLessonXpEarned(xpEarned);

    setProgress(prev => {
      const newProgress = { ...prev };
      if (currentLesson && !newProgress.completedLessons.includes(currentLesson.id)) {
        if (Math.round((score / total) * 100) >= 60) {
          newProgress.completedLessons = [...newProgress.completedLessons, currentLesson.id];
        }
      }
      // Restore hearts if lesson completed
      if (Math.round((score / total) * 100) >= 60) {
        newProgress.hearts = newProgress.maxHearts;
      }
      return newProgress;
    });

    setPage('result');
  };

  const handleQuitLesson = () => {
    setPage('home');
    setCurrentLesson(null);
  };

  const handleContinueFromResult = () => {
    setPage('home');
    setCurrentLesson(null);
  };

  const handleRetryLesson = () => {
    if (currentLesson) {
      setProgress(prev => ({ ...prev, hearts: prev.maxHearts }));
      setPage('lesson');
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Es-tu sûr de vouloir réinitialiser toute ta progression ?')) {
      setProgress(defaultProgress);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      {/* Dark mode toggle - floating */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:scale-110 transition-all"
        title={darkMode ? 'Mode clair' : 'Mode sombre'}
      >
        <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
      </button>

      {/* Pages */}
      {page === 'home' && (
        <HomePage
          lessons={lessons}
          progress={progress}
          onStartLesson={handleStartLesson}
          onGoToProfile={() => setPage('profile')}
        />
      )}

      {page === 'lesson' && currentLesson && (
        <LessonPage
          lesson={currentLesson}
          hearts={progress.hearts}
          onAnswer={handleAnswer}
          onQuit={handleQuitLesson}
          onFinish={handleFinishLesson}
        />
      )}

      {page === 'profile' && (
        <ProfilePage
          progress={progress}
          totalLessons={lessons.length}
          onGoBack={() => setPage('home')}
        />
      )}

      {page === 'result' && currentLesson && (
        <ResultPage
          lesson={currentLesson}
          score={lessonScore}
          total={lessonTotal}
          xpEarned={lessonXpEarned}
          onContinue={handleContinueFromResult}
          onRetry={handleRetryLesson}
        />
      )}

      {/* Reset button on profile */}
      {page === 'profile' && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={handleResetProgress}
            className="px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
          >
            🗑️ Réinitialiser
          </button>
        </div>
      )}

      {/* Game Over Modal */}
      {page === 'lesson' && progress.hearts <= 0 && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <span className="text-5xl block mb-4">💔</span>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Plus de vies !
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Tu as utilisé tous tes cœurs. Réinitialise-les pour continuer à apprendre !
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setProgress(prev => ({ ...prev, hearts: prev.maxHearts }));
                }}
                className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                ❤️ Récupérer mes vies
              </button>
              <button
                onClick={handleQuitLesson}
                className="w-full py-3 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
