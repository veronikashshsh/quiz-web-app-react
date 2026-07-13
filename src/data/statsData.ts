import { BarChart2, BookOpen } from "lucide-react";

export const StatsData = [
  {
    key: "quizzesCount",
    label: "Total quizzes",
    icon: BookOpen,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    key: "cardsStudied",
    label: "Cards studied",
    icon: BarChart2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    key: "averageSuccessRate",
    label: "Avg. success rate",
    icon: BarChart2,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];