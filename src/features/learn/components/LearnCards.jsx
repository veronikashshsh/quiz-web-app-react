import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BtnReturnToGuest from '../../guest/components/BtnReturnToGuest';
import { auth } from '../../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth'; // Додали для надійності
import { getQuizById, learnQuiz } from '../../../services/quizService';

function LearnCards() {
  const { quizName } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [results, setResults] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true); // Додали стан завантаження

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsGuest(true);
        const all = JSON.parse(localStorage.getItem('quizzes')) || [];
        // Декодуємо назву з URL (щоб Test%20Quiz стало Test Quiz)
        const decodedName = decodeURIComponent(quizName);
        const found = all.find((q) => q.name === decodedName);
        setQuiz(found);
        setLoading(false);
      } else {
        setIsGuest(false);
        getQuizById(quizName).then((data) => {
          setQuiz(data);
          setLoading(false);
        });
      }
    });

    return () => unsubscribe();
  }, [quizName]);

  const handleAnswer = async (isCorrect) => {
    const newResults = [...results, isCorrect];
    setResults(newResults);

    if (currentIndex < quiz.flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsVisible(false);
    } else {
      setIsFinished(true);
      if (!isGuest && quiz.id) {
        try {
          await learnQuiz(quiz.id, newResults);
        } catch (error) {
          console.error("Error saving results:", error);
        }
      }
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!quiz || !quiz.flashcards || quiz.flashcards.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <p>No cards found for: {decodeURIComponent(quizName)}</p>
        <button onClick={() => navigate(-1)} className="text-indigo-600 underline">Go back</button>
      </div>
    );
  }

  if (isFinished) {
    const score = results.filter(r => r).length;
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white p-6 text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">Quiz Finished!</h1>
        <p className="text-xl text-gray-600 mb-8">
          You knew {score} out of {quiz.flashcards.length} cards.
        </p>
        <button 
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold"
        >
          Back to My Quizzes
        </button>
      </div>
    );
  }

  const currentCard = quiz.flashcards[currentIndex];

  return (
    <div className="relative min-h-screen bg-[#f3f4f6] flex flex-col overflow-hidden">
      {/* Декоративні фони */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-300 rounded-full blur-[120px] opacity-30 pointer-events-none"></div>
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between bg-white/70 backdrop-blur-md border-b px-8 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <BtnReturnToGuest />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Deck: {quiz.name}</p>
            <p className="text-sm font-medium text-gray-700">Card: {currentIndex + 1} / {quiz.flashcards.length}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden min-h-[450px] flex flex-col border border-gray-100">
            <div className="h-12 bg-indigo-600 flex items-center justify-end px-4"></div>
            <div className="relative flex-1 p-12 flex flex-col">
              <span className="absolute top-6 left-8 text-6xl font-black text-gray-100 select-none">Q</span>
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <h2 className="text-3xl text-gray-800 font-light leading-relaxed text-center">
                  {currentCard.question}
                </h2>
                <div className={`mt-10 pt-10 border-t border-gray-100 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                   <p className="text-2xl text-indigo-600 font-medium text-center">
                     {currentCard.answer}
                   </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            {!isVisible ? (
              <button
                onClick={() => setIsVisible(true)}
                className="w-64 py-4 bg-slate-500 hover:bg-slate-600 text-white rounded-full font-bold shadow-lg uppercase tracking-widest text-sm"
              >
                Reveal Answer
              </button>
            ) : (
              <div className='flex gap-4'>
                <button onClick={() => handleAnswer(false)} className="w-40 py-4 bg-red-500 text-white rounded-full font-bold shadow-lg uppercase text-xs">
                  I missed it ❌
                </button>
                <button onClick={() => handleAnswer(true)} className="w-40 py-4 bg-green-500 text-white rounded-full font-bold shadow-lg uppercase text-xs">
                  I knew it ✅
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnCards;