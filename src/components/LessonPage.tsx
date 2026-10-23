import React, { useState, useEffect } from 'react';
import { Lesson, Exercise } from '../types';

interface LessonPageProps {
  lesson: Lesson;
  hearts: number;
  onAnswer: (correct: boolean, xp: number) => void;
  onQuit: () => void;
  onFinish: (score: number, total: number) => void;
}

const LessonPage: React.FC<LessonPageProps> = ({ lesson, hearts, onAnswer, onQuit, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [reorderItems, setReorderItems] = useState<string[]>([]);
  const [codeInput, setCodeInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const exercise = lesson.exercises[currentIndex];
  const progress = ((currentIndex) / lesson.exercises.length) * 100;

  useEffect(() => {
    if (exercise.type === 'reorder') {
      const shuffled = [...(exercise.options || [])].sort(() => Math.random() - 0.5);
      setReorderItems(shuffled);
    }
    setSelectedAnswer(null);
    setCodeInput('');
    setFeedback(null);
    setShake(false);
    setCelebrate(false);
  }, [currentIndex, exercise]);

  const handleCheck = () => {
    let isCorrect = false;

    if (exercise.type === 'qcm') {
      isCorrect = selectedAnswer === exercise.correctAnswer;
    } else if (exercise.type === 'truefalse') {
      isCorrect = selectedAnswer === exercise.correctAnswer;
    } else if (exercise.type === 'reorder') {
      isCorrect = JSON.stringify(reorderItems) === JSON.stringify(exercise.correctAnswer);
    } else if (exercise.type === 'code') {
      const normalizedInput = codeInput.trim().replace(/\s+/g, ' ');
      const normalizedAnswer = (exercise.correctAnswer as string).trim().replace(/\s+/g, ' ');
      isCorrect = normalizedInput === normalizedAnswer ||
        codeInput.trim().toLowerCase().includes('print') &&
        codeInput.trim().toLowerCase().includes('def') ||
        normalizedInput.includes(normalizedAnswer.split('\n')[0].trim());
    }

    if (isCorrect) {
      setFeedback('correct');
      setCelebrate(true);
      setScore(s => s + exercise.xp);
      onAnswer(true, exercise.xp);
    } else {
      setFeedback('wrong');
      setShake(true);
      onAnswer(false, 0);
    }

    setTimeout(() => {
      setShake(false);
      setCelebrate(false);
    }, 1000);
  };

  const handleNext = () => {
    if (currentIndex < lesson.exercises.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      onFinish(score + (feedback === 'correct' ? exercise.xp : 0), lesson.exercises.length);
    }
  };

  const canCheck = (): boolean => {
    if (exercise.type === 'qcm' || exercise.type === 'truefalse') {
      return selectedAnswer !== null;
    } else if (exercise.type === 'reorder') {
      return reorderItems.length > 0;
    } else if (exercise.type === 'code') {
      return codeInput.trim().length > 0;
    }
    return false;
  };

  const moveItem = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= reorderItems.length) return;
    const newItems = [...reorderItems];
    [newItems[fromIndex], newItems[toIndex]] = [newItems[toIndex], newItems[fromIndex]];
    setReorderItems(newItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col transition-colors duration-300">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button
            onClick={onQuit}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Progress Bar */}
          <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1">
            <span className="text-lg">❤️</span>
            <span className="font-bold text-red-500">{hearts}</span>
          </div>
        </div>
      </div>

      {/* Exercise Content */}
      <div className={`flex-1 max-w-lg mx-auto w-full px-4 py-6 flex flex-col ${shake ? 'animate-shake' : ''}`}>
        {/* Celebration overlay */}
        {celebrate && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}

        {/* Question Type Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
            exercise.type === 'qcm' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
            exercise.type === 'truefalse' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
            exercise.type === 'reorder' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
          }`}>
            {exercise.type === 'qcm' && '🎯 QCM'}
            {exercise.type === 'truefalse' && '✅ Vrai ou Faux'}
            {exercise.type === 'reorder' && '🧩 Réarranger'}
            {exercise.type === 'code' && '💻 Code'}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 leading-relaxed">
          {exercise.question}
        </h2>

        {/* Exercise Types */}
        {exercise.type === 'qcm' && (
          <div className="space-y-3 flex-1">
            {exercise.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => !feedback && setSelectedAnswer(index)}
                disabled={!!feedback}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  feedback
                    ? index === exercise.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : index === selectedAnswer
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      : 'border-slate-200 dark:border-slate-700 opacity-50'
                    : selectedAnswer === index
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg shadow-purple-100 dark:shadow-purple-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    feedback
                      ? index === exercise.correctAnswer
                        ? 'bg-green-500 text-white'
                        : index === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      : selectedAnswer === index
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{option}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {exercise.type === 'truefalse' && (
          <div className="flex gap-4 flex-1">
            {['Vrai', 'Faux'].map((label, index) => (
              <button
                key={index}
                onClick={() => !feedback && setSelectedAnswer(index)}
                disabled={!!feedback}
                className={`flex-1 p-6 rounded-2xl border-2 text-center transition-all duration-200 ${
                  feedback
                    ? index === exercise.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : index === selectedAnswer
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-slate-200 dark:border-slate-700 opacity-50'
                    : selectedAnswer === index
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <span className="text-4xl mb-2 block">{index === 0 ? '✅' : '❌'}</span>
                <span className="font-bold text-lg text-slate-700 dark:text-slate-200">{label}</span>
              </button>
            ))}
          </div>
        )}

        {exercise.type === 'reorder' && (
          <div className="space-y-2 flex-1">
            {reorderItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="text-slate-400 hover:text-purple-500 disabled:opacity-30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === reorderItems.length - 1}
                    className="text-slate-400 hover:text-purple-500 disabled:opacity-30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <code className="flex-1 text-sm font-mono text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-lg">
                  {item}
                </code>
              </div>
            ))}
          </div>
        )}

        {exercise.type === 'code' && (
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1">
              <textarea
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                disabled={!!feedback}
                placeholder="Écris ton code Python ici..."
                className="w-full h-48 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-900 text-green-400 font-mono text-sm resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-all placeholder-slate-500"
                spellCheck={false}
              />
              <div className="absolute top-2 right-2 text-xs text-slate-500">Python</div>
            </div>
            {exercise.codeTemplate && !feedback && (
              <p className="text-xs text-slate-400 mt-2 italic">
                💡 Astuce : {exercise.codeTemplate.replace('#', '').trim().substring(0, 60)}...
              </p>
            )}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`mt-4 p-4 rounded-xl border-2 ${
            feedback === 'correct'
              ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700'
              : 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{feedback === 'correct' ? '🎉' : '😅'}</span>
              <span className={`font-bold ${feedback === 'correct' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {feedback === 'correct' ? 'Excellent !' : 'Pas tout à fait...'}
              </span>
              {feedback === 'correct' && <span className="ml-auto text-sm font-medium text-green-600 dark:text-green-400">+{exercise.xp} XP</span>}
            </div>
            <p className={`text-sm ${feedback === 'correct' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {exercise.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 px-4 py-4">
        <div className="max-w-lg mx-auto">
          {!feedback ? (
            <button
              onClick={handleCheck}
              disabled={!canCheck()}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                canCheck()
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              Vérifier
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                feedback === 'correct'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {currentIndex < lesson.exercises.length - 1 ? 'Continuer →' : 'Terminer 🏆'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
