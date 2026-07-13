import { useNavigate } from 'react-router-dom';
import { Quiz } from '../../types/quiz';
import { AlertTriangle } from 'lucide-react';

interface WeakestQuizCardProps {
  quiz: Quiz | null;
}

const WeakestQuizCard: React.FC<WeakestQuizCardProps> = ({ quiz }) => {
  const navigate = useNavigate();

  if (!quiz) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">
            Потребує уваги
          </p>
          <p className="text-sm text-gray-800">
            <span className="font-semibold">{quiz.name}</span> — {quiz.successRate}% успішності
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate(`/quiz/${quiz.id}`)}
        className="shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition"
      >
        Повторити
      </button>
    </div>
  );
};

export default WeakestQuizCard;