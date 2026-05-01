import { BarChart2, BookOpen } from "lucide-react";
import { useQuizzes } from "./useQuizzes";


export const useStats = () => {
  const { quizzesCount, cardsStudied, averageSuccessRate } = useQuizzes();

  return {
     quizzesCount,
    cardsStudied,
    averageSuccessRate
  }};