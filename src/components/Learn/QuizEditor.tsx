import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useQuizEditor } from "../../hooks/useQuizEditor";
import { useQuizzes } from "../../hooks/useQuizzes"; // Додаємо цей хук
import type { Flashcard, Quiz } from "../../types/quiz";
import BtnReturnToGuest from "../Guest/BtnReturnBack";

function QuizEditor() {
  const { quizName = "" } = useParams<{ quizName: string }>();
  const { t } = useTranslation();

  // Припустимо, що цей редактор для гостя.
  // Якщо ні — сюди треба передати динамічне значення isGuest
  const isGuest = true;

  // 1. Спочатку знаходимо сам квіз із загального списку
  const { quizzes } = useQuizzes(isGuest);
  const foundQuiz = quizzes.find((q) => q.name === decodeURIComponent(quizName));

  // 2. Передаємо знайдений квіз у редактор
  const { localQuiz, addFlashcard, deleteFlashcard } = useQuizEditor(
    foundQuiz as Quiz,
    isGuest,
  );

  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  // 3. Обробник став асинхронним
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      return;
    }

    const success = await addFlashcard(question, answer);
    if (success) {
      setQuestion("");
      setAnswer("");
    }
  }

  // Чекаємо, поки квіз завантажиться
  if (!localQuiz) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm tracking-widest">
        {t("quiz.loading")}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <BtnReturnToGuest />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-1">
            {t("common.editing")}
          </span>
          {localQuiz.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {localQuiz.flashcards.length}{" "}
          {t("quiz.cards", { count: localQuiz.flashcards.length })}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 border border-gray-200 rounded-xl p-6 mb-8"
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {t("quiz.editModal.question")}
            </label>
            <input
              className="px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              placeholder="e.g. What is React?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {t("quiz.editModal.answer")}
            </label>
            <input
              className="px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              placeholder="e.g. A JavaScript library..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!question.trim() || !answer.trim()}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition"
        >
          + {t("quiz.createQuiz")}
        </button>
      </form>

      {localQuiz.flashcards.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
          {t("quiz.noCardsYet")}
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {localQuiz.flashcards.map((fc: Flashcard, i: number) => (
            <li
              key={i}
              className="flex items-center gap-4 px-5 py-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-200 transition"
            >
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center justify-center mt-0.5">
                    Q
                  </span>
                  <span className="text-sm text-gray-700">{fc.question}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded bg-emerald-100 text-emerald-700 text-[11px] font-bold flex items-center justify-center mt-0.5">
                    A
                  </span>
                  <span className="text-sm text-gray-500">{fc.answer}</span>
                </div>
              </div>
              <button
                onClick={() => deleteFlashcard(i)}
                className="shrink-0 w-7 h-7 rounded-md border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-lg transition"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuizEditor;
