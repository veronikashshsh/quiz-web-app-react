import { useQuizzes } from "./useQuizzes";

export const useStats = (isGuest: boolean) => {
  const { quizzesCount, cardsStudied, averageSuccessRate } = useQuizzes(isGuest);

  return {
     quizzesCount,
    cardsStudied,
    averageSuccessRate
  }};