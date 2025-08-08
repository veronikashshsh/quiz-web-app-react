import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BtnReturnToGuest from './BtnReturnToGuest';

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

  return(
<>
 <div className='flex justify-start dark:bg-gray-700 p-3'>
 <BtnReturnToGuest/>
 </div>
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
  <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white text-center">
    Learn Flashcards: {quiz.name}
  </h1>

 
  <div 
    className="
      border border-gray-300 dark:border-gray-700 
      p-8 
      rounded-lg 
      shadow-lg 
      bg-white dark:bg-gray-800 
      text-center 
      max-w-3xl 
      w-full 
      transition-colors
    "
  >
    <p className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">
      <span className="font-bold">Question:</span> {currentCard.question}
    </p>
    <p className={`text-gray-600 dark:text-gray-400 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
      <strong>Answer:</strong> {currentCard.answer}
    </p>

    <div className="flex justify-center gap-8 mt-10">
      <button
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold rounded-md transition-colors"
        onClick={() => setIsVisible(prev => !prev)}
        aria-pressed={isVisible}
        aria-label={isVisible ? "Hide answer" : "Show answer"}
      >
        {isVisible ? 'Hide Answer' : 'Show Answer'}
      </button>

      <button
        className="px-6 py-3 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white font-semibold rounded-md transition-colors"
        onClick={nextCard}
        aria-label="Next flashcard"
      >
        Next Card
      </button>
    </div>
  </div>
</div>
</>
  )}
  

export default LearnCards;
