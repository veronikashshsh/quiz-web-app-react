import { BarChart2, BookOpen } from "lucide-react";
import { useQuizzes } from "../hooks/useQuizzes";

export const STATS = [
  {
    label: 'Total quizzes',
    value: 0,
    sub: 'Create your first quiz',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    icon: BookOpen,
  },
  {
    label: 'Cards studied',
    value: '0',
    sub: 'Start studying to see progress',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    icon: BarChart2,
  },
  {
    label: 'Avg. success rate',
    value: '—',
    sub: 'No data yet',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    icon: BarChart2,
  },
];