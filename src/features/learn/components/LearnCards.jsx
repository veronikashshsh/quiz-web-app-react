import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BtnReturnToGuest from '../../guest/components/BtnReturnToGuest';

function LearnCards() {
  const { quizName } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('quizzes')) || [];
    const found = all.find((q) => q.name === quizName);
    setQuiz(found);
    setCurrentIndex(0); // Скидуємо індекс при зміні вікторини
    setIsVisible(false)
  }, [quizName]);

 if (!quiz) {
    return <p>Loading or quiz not found...</p>;
  }

  if (!quiz.flashcards || quiz.flashcards.length === 0) {
    return <p>No flashcards found for this quiz.</p>;
  }

  const currentCard = quiz.flashcards[currentIndex];

  if (!quiz || !quiz.flashcards || quiz.flashcards.length === 0) {
  return <p>No flashcards found for this quiz.</p>;
}

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % quiz.flashcards.length);
    setIsVisible(false);
  };

 return (
  <>
    {/* Header */}
    <div className="flex items-center gap-4 bg-white/80 backdrop-blur border-b px-6 py-3 shadow-sm">
      <BtnReturnToGuest />
      <h1 className="text-xl font-semibold text-gray-800">
        {quiz.name}
      </h1>
    </div>

    {/* Main */}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-6">
      
      <div className="w-full max-w-2xl">

        {/* Progress */}
        <div className="text-center text-white mb-4 text-sm opacity-80">
          Card {currentIndex + 1} / {quiz.flashcards.length}
        </div>

        {/* Card */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-10 text-center transition-all duration-300">

          {/* Question */}
          <p className="text-xl font-semibold text-gray-800 mb-6">
            {currentCard.question}
          </p>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-4" />

          {/* Answer */}
          <p
            className={`text-gray-600 transition-all duration-300 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2 h-0 overflow-hidden'
            }`}
          >
            {currentCard.answer}
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={() => setIsVisible(prev => !prev)}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition"
            >
              {isVisible ? 'Hide' : 'Show'}
            </button>

            <button
              onClick={nextCard}
              className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-md transition"
            >
              Next →
            </button>
          </div>
        </div>

      </div>
    </div>
  </>
  )}
  

export default LearnCards;
