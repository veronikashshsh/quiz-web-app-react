import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../config/firebase';
import { BookOpen, BarChart2, Plus, ArrowRight } from 'lucide-react';

// Статичні дані — в реальному проєкті прийдуть з БД/props
// Поки хардкод — але структура готова до заміни на реальні дані
const STATS = [
  {
    label: 'Total quizzes',
    value: '0',
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

function MainContent() {
  const navigate = useNavigate();
  const username = auth.currentUser?.displayName || '';

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Welcome back{username ? `, ${username}` : ''}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's an overview of your learning progress
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon size={16} className={stat.color} />
                  </div>
                </div>
                <p className={`text-3xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400">{stat.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Recent activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Recent activity
            </h2>
            {/* Empty state — поки немає даних з БД */}
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                <BarChart2 size={18} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No activity yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Start a quiz to see your history here
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Quick actions
            </h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(`/userquizarea/${username}`)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition text-left"
              >
                <div className="flex items-center gap-3">
                  <Plus size={16} className="text-indigo-200" />
                  <span className="text-sm font-semibold text-white">
                    Create new quiz
                  </span>
                </div>
                <ArrowRight size={14} className="text-indigo-300" />
              </button>

              <button
                onClick={() => navigate(`/userquizarea/${username}`)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition text-left"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Go to my quizzes
                  </span>
                </div>
                <ArrowRight size={14} className="text-gray-300" />
              </button>

              <button
                onClick={() => navigate(`/stats/${username}`)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition text-left"
              >
                <div className="flex items-center gap-3">
                  <BarChart2 size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    View statistics
                  </span>
                </div>
                <ArrowRight size={14} className="text-gray-300" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MainContent;