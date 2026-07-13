import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { QuizCardProps } from '../../types/quiz';
import { getRateStatus } from '../../utils/quizUtils';

const QuizCard: React.FC<QuizCardProps> = ({ quiz, isGuest, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { name, successRate = 0 } = quiz;
  
  const status = getRateStatus(successRate);

  const handleStart = () => {
  if (isGuest) {
    navigate(`/guest/quiz/${encodeURIComponent(quiz.name)}`);
  } else {
    navigate(`/quiz/${quiz.id}`);
  }
};

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4 hover:border-indigo-200 hover:shadow-sm transition group">

      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900 leading-tight">
          {name}
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
          <span className="text-xs text-gray-400 font-medium"> {t('quiz.successRate')}</span>
          <span className={`text-xs font-semibold ${status.text}`}>
            {successRate}%
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${status.bg}`}
            style={{ width: `${successRate}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onEdit(quiz)}
          aria-label="Edit quiz"
          className="flex-1 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
        >
           {t('quiz.editQuiz')}
        </button>
        <button
         onClick={() => handleStart()}
          aria-label="Start quiz"
          className="flex-1 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg transition"
        >
          {t('quiz.startLearning')}
        </button>
      </div>

    </div>

    
  );
}

export default QuizCard;