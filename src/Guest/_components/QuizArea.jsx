import React, {useState, useEffect} from 'react'
import QuizCard from './QuizCard'

function QuizArea() {

    const [quizzes, setQuizzes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [quizName, setQuizName] = useState('');

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('quizzes')) || [];
        setQuizzes(stored)
    }, [])

  const handleAddQuiz = () => {
    if (quizName.trim() === '') return;
    const newQuiz = { name: quizName.trim(), successRate: 0, flashcards: [] };
    const updated = [...quizzes, newQuiz];
    setQuizzes(updated);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    setQuizName('');
    setShowModal(false);
  };


   return (
  <div className="p-8 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
      My Quizzes
    </h1>

    <button
      onClick={() => setShowModal(true)}
      className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-colors duration-200 focus:outline-none"
      aria-label="Add new quiz"
    >
      Додати новий тест
    </button>

    {/* Modal Window */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transition-transform transform scale-100 md:scale-105">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Введіть назву тесту
          </h2>

          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            placeholder="Наприклад: English Words"
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            autoFocus
          />

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Скасувати
            </button>

            <button
              onClick={handleAddQuiz}
              className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white px-5 py-2 rounded-md shadow-md font-semibold transition-colors duration-150 focus:outline-none"
              disabled={!quizName.trim()}
            >
              Створити
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="flex flex-wrap gap-6 mt-8">
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={index}
          cardName={quiz.name}
          successRate={quiz.successRate}
          className="w-full sm:w-1/2 lg:w-1/3"
        />
      ))}
    </div>
  </div>
);
}
export default QuizArea;
