import { useEffect, useState } from 'react';
import QuizCard from './QuizCard';

function QuizArea({ Rate }) {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quizName, setQuizName] = useState('');

  useEffect(() => {
    try {
      const item = localStorage.getItem('quizzes');
      if (item && item !== 'undefined') {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
          setQuizzes(parsed);
        } else {
          setQuizzes([]);
          localStorage.removeItem('quizzes');
        }
      } else {
        setQuizzes([]);
      }
    } catch (error) {
      console.error('Error reading quizzes from localStorage:', error);
      setQuizzes([]);
      localStorage.removeItem('quizzes');
    }
  }, []);

  const handleAddQuiz = () => {
    if (quizName.trim() === '') return;
    const newQuiz = { name: quizName.trim(), successRate: Rate, flashcards: [] };
    const updated = [...quizzes, newQuiz];
    setQuizzes(updated);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    setQuizName('');
    setShowModal(false);
  };

  const deleteQuiz = (indexToDelete) => {
    setQuizzes((prev) => {
      const updated = prev.filter((_, i) => i !== indexToDelete);
      localStorage.setItem('quizzes', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            My Quizzes
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {quizzes.length} {quizzes.length === 1 ? 'quiz' : 'quizzes'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold rounded-lg transition"
          aria-label="Add new quiz"
        >
          <span className="text-lg leading-none">+</span>
          New quiz
        </button>
      </div>

      {/* Empty state */}
      {quizzes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-gray-700 font-medium mb-1">No quizzes yet</p>
          <p className="text-sm text-gray-400">
            Create your first quiz to start learning
          </p>
        </div>
      )}

      {/* Quiz grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz, index) => (
          <QuizCard
            key={index}
            cardName={quiz.name}
            successRate={quiz.successRate}
            onDelete={() => deleteQuiz(index)}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              New quiz
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Give your quiz a name to get started
            </p>

            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Quiz name
            </label>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddQuiz()}
              placeholder="e.g. English Words"
              className="w-full border border-gray-200 bg-gray-50 text-gray-900 px-4 py-2.5 rounded-lg mb-6 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition placeholder:text-gray-300"
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuiz}
                disabled={!quizName.trim()}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizArea;