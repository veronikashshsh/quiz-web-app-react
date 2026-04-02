import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizCard({ cardName, successRate = 0, onDelete, onEdit }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  function getRateColor(rate) {
    if (rate >= 70) return 'bg-emerald-500';
    if (rate >= 40) return 'bg-amber-400';
    return 'bg-red-400';
  }

  function getRateTextColor(rate) {
    if (rate >= 70) return 'text-emerald-600';
    if (rate >= 40) return 'text-amber-500';
    return 'text-red-500';
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4 hover:border-indigo-200 hover:shadow-sm transition group">

      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900 leading-tight">
          {cardName}
        </h2>
        <button
          onClick={onDelete}
          aria-label="Delete quiz"
          className="shrink-0 w-6 h-6 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center text-lg leading-none transition"
        >
          ×
        </button>
      </div>

      {/* Success rate */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">Success rate</span>
          <span className={`text-xs font-semibold ${getRateTextColor(successRate)}`}>
            {successRate}%
          </span>
        </div>
        {/* Прогрес-бар — набагато наочніше ніж просто текст */}
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getRateColor(successRate)}`}
            style={{ width: `${successRate}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onEdit(cardName)}
          aria-label="Edit quiz"
          className="flex-1 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
        >
          Edit
        </button>
        <button
          onClick={() => navigate(`/quiz/${cardName}`)}
          aria-label="Start quiz"
          className="flex-1 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg transition"
        >
          Start
        </button>
      </div>

      {isLoading && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-32 bg-gray-100 rounded-2xl animate-pulse"
      />
    ))}
  </div>
)}
    </div>

    
  );
}

export default QuizCard;