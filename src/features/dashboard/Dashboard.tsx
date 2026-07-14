import { useStats } from '../../hooks/useStats';
import { useQuizzes } from '../../hooks/useQuizzes';
import { auth } from '../../../config/firebase';
import { getWeakestQuiz } from '../../selectors/quizSelectors';
import { QuizAreaProps } from '../../types/quiz';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import StatsGrid from '../../components/Dashboard/StatsGrid';
import WeakestQuizCard from '../../components/Dashboard/WeakestQuizCard';
import RecentActivity from '../../components/Dashboard/RecentActivity';
import QuickActions from '../../components/Dashboard/QuickActions';
import { getQuoteOfTheDay, getRandomQuote } from '../../selectors/quoteSelectors';
import DailyQuoteCard from '../../components/Dashboard/DailyQuoteCard';
import { useState } from 'react';

const Dashboard = ({ isGuest }: QuizAreaProps) =>{
  const stats = useStats(isGuest);
  const { quizzes } = useQuizzes(isGuest);
  const username = auth.currentUser?.displayName || '';
  const [quote] = useState(() => getRandomQuote());

  const weakestQuiz = getWeakestQuiz(quizzes);

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <DashboardHeader username={username} />

        <DailyQuoteCard quote={quote} />
        <StatsGrid stats={stats} />
        <WeakestQuizCard quiz={weakestQuiz} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentActivity />
          <QuickActions username={username} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;