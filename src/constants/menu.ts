import { BarChart2, BookOpen, LayoutDashboard, Settings } from "lucide-react";

export const MENU_ITEMS = [
  {
    key: 'dashboard',
    label: 'navbar.dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    key: 'quizzes',
    label: 'navbar.quizzes',
    icon: BookOpen,
    path: '/userquizarea',
  },
  {
    key: 'statistics',
    label: 'navbar.statistics',
    icon: BarChart2,
    path: '/stats',
  },
  {
    key: 'settings',
    label: 'navbar.settings',
    icon: Settings,
    path: '/settings',
  },
];