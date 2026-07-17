import { useEffect, useState } from "react";

import {
  getAverageSuccessRate,
  getCardsStudied,
  getQuizzesCount,
} from "../selectors/quizSelectors";
import {
  createQuiz,
  deleteQuiz as deleteQuizFromDB,
  getQuizzes,
} from "../services/quizService";
import type { Quiz } from "../types/quiz";

export function useQuizzes(isGuest: boolean) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isGuest) {
      loadFromLocalStorage();
    } else {
      loadFromFirebase();
    }
  }, [isGuest]);

  function loadFromLocalStorage(): void {
    try {
      const item = localStorage.getItem("quizzes");
      if (item && item !== "undefined") {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
          setQuizzes(parsed);
        }
      }
    } catch (error) {
      console.error("Error reading quizzes from localStorage:", error);
      setQuizzes([]);
    }
  }

  async function loadFromFirebase(): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error("Error while loading quizzes", err);
      setError("Failed to load quizzes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function addQuiz(name: string): Promise<void> {
    if (isGuest) {
      const newQuiz: Quiz = {
        id: `local-${Date.now()}`,
        name,
        successRate: 0,
        flashcards: [],
      };
      setQuizzes((prev) => {
        const updated = [newQuiz, ...prev];
        localStorage.setItem("quizzes", JSON.stringify(updated));
        return updated;
      });
    } else {
      const tempId = `temp-${Date.now()}`;
      const tempQuiz: Quiz = { id: tempId, name, successRate: 0, flashcards: [] };

      setQuizzes((prev) => [tempQuiz, ...prev]); // optimistic, без loading

      try {
        const created = await createQuiz(name); // Quiz з реальним id
        setQuizzes((prev) => prev.map((q) => (q.id === tempId ? created : q)));
      } catch (err) {
        console.error("Error while creating quiz", err);
        setError("Failed to create quiz. Please try again.");
        setQuizzes((prev) => prev.filter((q) => q.id !== tempId)); // rollback
      }
    }
  }

  async function deleteQuiz(quizId: string | undefined, index: number): Promise<void> {
    if (isGuest) {
      setQuizzes((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        localStorage.setItem("quizzes", JSON.stringify(updated));
        return updated;
      });
      return;
    }

    if (!quizId || quizId.startsWith("temp-")) {
      // немає реального id — нема що видаляти на бекенді
      return;
    }

    let removedQuiz: Quiz | undefined;
    setQuizzes((prev) => {
      removedQuiz = prev.find((q) => q.id === quizId);
      return prev.filter((q) => q.id !== quizId);
    });

    try {
      await deleteQuizFromDB(quizId);
    } catch (err) {
      console.error("Error while deleting quiz", err);
      setError("Failed to delete quiz. Please try again.");
      if (removedQuiz) {
        setQuizzes((prev) => [removedQuiz!, ...prev]); // rollback
      }
    }
  }

  function updateQuizLocally(updatedQuiz: Quiz): void {
    setQuizzes((prev) => prev.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q)));
  }

  return {
    quizzes,
    isLoading,
    error,
    addQuiz,
    deleteQuiz,
    updateQuizLocally,
    quizzesCount: getQuizzesCount(quizzes),
    cardsStudied: getCardsStudied(quizzes),
    averageSuccessRate: getAverageSuccessRate(quizzes),
  };
}
