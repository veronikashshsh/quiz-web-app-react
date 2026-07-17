import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { auth } from "../../../config/firebase";
import { getQuizById, learnQuiz } from "../../services/quizService";
import type { Quiz } from "../../types/quiz";
import BtnReturnBack from "../Guest/BtnReturnBack";

interface LearnCardsProps {
  forcedGuest?: boolean;
}

function LearnCards({ forcedGuest = false }: LearnCardsProps) {
  const { quizName, quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [status, setStatus] = useState<"loading" | "found" | "not-found">("loading");

  const isGuest = forcedGuest;

  useEffect(() => {
    setStatus("loading");

    if (isGuest) {
      const decodedName = decodeURIComponent(quizName || "");
      const localQuizzes: Quiz[] = JSON.parse(localStorage.getItem("quizzes") || "[]");
      const localFound = localQuizzes.find(
        (q) => q.name.trim().toLowerCase() === decodedName.trim().toLowerCase(),
      );

      if (localFound && localFound.flashcards?.length > 0) {
        setQuiz(localFound);
        setStatus("found");
      } else {
        setStatus("not-found");
      }
      return;
    }

    async function loadQuiz(user: typeof auth.currentUser) {
      console.log("Auth user:", user, "quizId:", quizId); // тимчасовий лог

      if (!user || !quizId) {
        setStatus("not-found");
        return;
      }
      try {
        const data = await getQuizById(quizId);
        console.log("Loaded quiz:", data);
        if (data && data.flashcards?.length > 0) {
          setQuiz(data);
          setStatus("found");
        } else {
          setStatus("not-found");
        }
      } catch (err) {
        console.error("Quiz not found in DB", err);
        setStatus("not-found");
      }
    }

    if (auth.currentUser) {
      loadQuiz(auth.currentUser);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      loadQuiz(user);
    });

    return () => unsubscribe();
  }, [isGuest, quizName, quizId]);
  const handleBack = () => {
    if (isGuest) {
      navigate("/guest");
    } else {
      navigate(`/userquizarea/${auth.currentUser?.displayName}`);
    }
  };

  const handleAnswer = async (isCorrect: boolean) => {
    if (!quiz) {
      return;
    }

    const newResults = [...results, isCorrect];
    setResults(newResults);

    if (currentIndex < quiz.flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
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

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (
    status === "not-found" ||
    !quiz ||
    !quiz.flashcards ||
    quiz.flashcards.length === 0
  ) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <p>No cards found for: {decodeURIComponent(quizName || quizId || "")}</p>
        <button onClick={handleBack} className="text-indigo-600 underline">
          Go back
        </button>
      </div>
    );
  }

  if (isFinished) {
    const score = results.filter((r) => r).length;
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white p-6 text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">Quiz Finished!</h1>
        <p className="text-xl text-gray-600 mb-8">
          You knew {score} out of {quiz.flashcards.length} cards.
        </p>
        <button
          onClick={handleBack}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold"
        >
          Back to My Quizzes
        </button>
      </div>
    );
  }

  const currentCard = quiz?.flashcards?.[currentIndex];
  if (!currentCard) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-[#f3f4f6] flex flex-col overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-300 rounded-full blur-[120px] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-between bg-white/70 backdrop-blur-md border-b px-8 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <BtnReturnBack />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
              Deck: {quiz.name}
            </p>
            <p className="text-sm font-medium text-gray-700">
              Card: {currentIndex + 1} / {quiz.flashcards.length}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden min-h-[450px] flex flex-col border border-gray-100">
            <div className="h-12 bg-indigo-600 flex items-center justify-end px-4"></div>
            <div className="relative flex-1 p-12 flex flex-col">
              <span className="absolute top-6 left-8 text-6xl font-black text-gray-100 select-none">
                Q
              </span>
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <h2 className="text-3xl text-gray-800 font-light leading-relaxed text-center">
                  {currentCard.question}
                </h2>
                <div
                  className={`mt-10 pt-10 border-t border-gray-100 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
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
              <div className="flex gap-4">
                <button
                  onClick={() => handleAnswer(false)}
                  className="w-40 py-4 bg-red-500 text-white rounded-full font-bold shadow-lg uppercase text-xs"
                >
                  I missed it
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  className="w-40 py-4 bg-green-500 text-white rounded-full font-bold shadow-lg uppercase text-xs"
                >
                  I knew it
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
