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

  return(
<>
 <div className='flex justify-start bg-slate-100 p-3'>
 <BtnReturnToGuest/> 
  <h1 className="text-2xl mb-8 text-gray-900 text-center pl-6">
    Learn Flashcards: {quiz.name}
  </h1>
 </div>
<div className="min-h-screen bg-indigo-300 flex flex-col items-center justify-center p-6">
  <div 
    className="
      border border-gray-300
      p-8 
      rounded-lg 
      shadow-lg 
      bg-white 
      text-center 
      max-w-3xl 
      w-full 
      max-h-screen
      transition-colors
    "
  >
    <p className="text-lg font-semibold mb-6 text-gray-800">
      <span className="font-bold">Question:</span><br/> {currentCard.question}
    </p> 
    <p className={`text-gray-600 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
      <strong>Answer:</strong><br/> {currentCard.answer}
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
