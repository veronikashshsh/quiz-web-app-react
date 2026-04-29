import { useState } from 'react';
import QuizCard from './QuizCard';
import QuizEditorModal from './QuizEditorModal';
import { Loader, SquareLibrary } from 'lucide-react';
import { useQuizzes } from '../../../hooks/useQuizzes';
import { useTranslation } from 'react-i18next';

function QuizArea({isGuest, quiz }) {
  const { quizzes, isLoading, error, addQuiz, deleteQuiz, quizzesCount } = useQuizzes(isGuest);
  const [showModal, setShowModal] = useState(false);
  const [quizName, setQuizName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedQuiz, setSelectedQuiz] = useState(null);
const { t } = useTranslation();

function handleEdit(quiz) {
  setSelectedQuiz(quiz);
  setIsModalOpen(true);
}

async function handleAddQuiz(){
  if(quizName.trim() === '') return;
  await addQuiz(quizName.trim());
  setQuizName('');
  setShowModal(false);
}

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
           {t('quiz.myQuizzes')}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {quizzesCount} {quizzesCount === 1 ? 'quiz' : 'quizzes'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold rounded-lg transition"
          aria-label="Add new quiz"
        >
          <span className="text-lg leading-none">+</span>
         {t('quiz.createQuiz')}
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl"><Loader/></span>
          </div>
          <p className="text-gray-700 font-medium mb-1">{t('quiz.noQuizzes')}</p>
          <p className="text-sm text-gray-400">
            {t('quiz.noQuizzesDesc')}
          </p>
        </div>
      )}

       {error && (
        <div className="text-center py-10 text-red-500 text-sm">{error}</div>
      )}

      {!isLoading && !error && quizzes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl"><SquareLibrary/></span>
          </div>
          <p className="text-gray-700 font-medium mb-1">{t('quiz.noQuizzes')}</p>
          <p className="text-sm text-gray-400">{t('quiz.noQuizzesDesc')}</p>
        </div>
      )}

      {/* Quiz grid */}
      {!isLoading && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes?.map((quiz, index) => (
          <QuizCard
             key={quiz.id ?? index}
              isGuest={isGuest}  
             cardName={quiz.name}
             quiz={quiz}           
             onDelete={() => deleteQuiz(quiz.id, index)}
             onEdit={() => handleEdit(quiz)} 
              successRate={quiz.successRate || 0} 
          />
        ))}
      </div>
      )}

      {isModalOpen && (
        <QuizEditorModal
        quiz={selectedQuiz}
         isGuest={isGuest}  
        onClose={() => setIsModalOpen(false)}

      />
      )}


      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {t('quiz.createQuiz')}
            </h2>
            <p className="text-sm text-gray-400 mb-6">
               {t('quiz.addQuiz.title')}
            </p>

            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
               {t('quiz.addQuiz.nameLabel')}
            </label>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddQuiz()}
              placeholder={t('quiz.addQuiz.namePlaceholder')}
              className="w-full border border-gray-200 bg-gray-50 text-gray-900 px-4 py-2.5 rounded-lg mb-6 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition placeholder:text-gray-300"
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                 {t('quiz.cancel')}
              </button>
              <button
                onClick={handleAddQuiz}
                disabled={!quizName.trim()}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition"
              >
                 {t('quiz.add')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizArea;