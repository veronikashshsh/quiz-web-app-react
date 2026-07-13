import { Quiz } from '../types/quiz';

export const getQuizzesCount = (quizzes: Quiz[]): number =>
  quizzes.length;

export const getCardsStudied = (quizzes: Quiz[]): number =>
  quizzes.reduce((sum, q) => sum + q.flashcards.length, 0);

export const getAverageSuccessRate = (quizzes: Quiz[]): number => {
  if (!quizzes.length) return 0;

  const totalRate = quizzes.reduce(
    (sum, q) => sum + (q.successRate ?? 0),
    0
  );

  return Number((totalRate / quizzes.length).toFixed(2));
};

export const getWeakestQuiz = (quizzes: Quiz[]): Quiz | null => {
  const quizzesWithCards = quizzes.filter(q => q.flashcards.length > 0);

  if (!quizzesWithCards.length) return null;

  return quizzesWithCards.reduce((weakest, current) =>
    (current.successRate ?? 0) < (weakest.successRate ?? 0)
      ? current
      : weakest
  );
};