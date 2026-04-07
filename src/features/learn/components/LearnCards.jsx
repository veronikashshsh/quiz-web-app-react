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
    setCurrentIndex(0);
    setIsVisible(false);
  }, [quizName]);

  if (!quiz || !quiz.flashcards || quiz.flashcards.length === 0) {
    return <div className="flex h-screen items-center justify-center">Loading or no cards...</div>;
  }

  const currentCard = quiz.flashcards[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % quiz.flashcards.length);
    setIsVisible(false);
  };

  return (
    <div className="relative min-h-screen bg-[#f3f4f6] flex flex-col overflow-hidden">
      
      {/* --- Елементи фону (Блоби) --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-300 rounded-full blur-[120px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-200 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between bg-white/70 backdrop-blur-md border-b px-8 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <BtnReturnToGuest />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Deck: {quiz.name}</p>
            <p className="text-sm font-medium text-gray-700">Card: {currentIndex + 1} / {quiz.flashcards.length}</p>
          </div>
        </div>
        <div className="text-indigo-600 font-bold text-sm cursor-pointer hover:underline">SEE ALL</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        
        <div className="w-full max-w-3xl">
          
          {/* Main Card Container */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden min-h-[450px] flex flex-col border border-gray-100">
            
            {/* Card Header (як у референсі) */}
            <div className="h-12 bg-indigo-600 flex items-center justify-end px-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                 </svg>
               
            </div>

            {/* Card Body */}
            <div className="relative flex-1 p-12 flex flex-col">
              
              {/* Watermark "Q" */}
              <span className="absolute top-6 left-8 text-6xl font-black text-gray-100 select-none">Q</span>

              {/* Question */}
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <h2 className="text-3xl text-gray-800 font-light leading-relaxed text-center">
                  {currentCard.question}
                </h2>

                {/* Answer Area */}
                <div className={`mt-10 pt-10 border-t border-gray-100 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                   <p className="text-2xl text-indigo-600 font-medium text-center">
                     {currentCard.answer}
                   </p>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons (Зробили їх великими під карткою) */}
          <div className="mt-8 flex flex-col items-center gap-4">
            {!isVisible ? (
              <button
                onClick={() => setIsVisible(true)}
                className="w-64 py-4 bg-slate-500 hover:bg-slate-600 text-white rounded-full font-bold shadow-lg transform transition active:scale-95 uppercase tracking-widest text-sm"
              >
                Reveal Answer
              </button>
            ) : (
              <button
                onClick={nextCard}
                className="w-64 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold shadow-lg transform transition active:scale-95 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                Next Card <span className="text-xl">→</span>
              </button>
            )}
            
            {isVisible && (
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-tighter transition"
                >
                    Hide Answer
                </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default LearnCards;