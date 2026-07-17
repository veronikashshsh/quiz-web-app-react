import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useQuizEditor } from "../../hooks/useQuizEditor";
import type { QuizEditorModalProps } from "../../types/quiz";

function QuizEditorModal({ quiz, isGuest, onClose, onQuizUpdate }: QuizEditorModalProps) {
  const { localQuiz, addFlashcard, deleteFlashcard } = useQuizEditor(
    quiz,
    isGuest,
    onQuizUpdate,
  );
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { t } = useTranslation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await addFlashcard(question, answer);
    if (success) {
      setQuestion("");
      setAnswer("");
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!localQuiz) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-7xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{localQuiz.name}</h1>
          <p className="text-sm text-gray-400">
            {localQuiz.flashcards.length}{" "}
            {localQuiz.flashcards.length === 1 ? "card" : "cards"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t("quiz.editModal.question")}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
            />
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={t("quiz.editModal.answer")}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition active:scale-95"
          >
            + {t("quiz.createQuiz")}
          </button>
        </form>

        {localQuiz.flashcards.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-6 border border-dashed rounded-lg">
            No cards yet
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
            {localQuiz.flashcards.map((fc, i) => (
              <div
                key={i}
                className="flex justify-between items-start gap-4 p-4 border border-gray-200 rounded-xl bg-white hover:shadow-sm transition"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold text-indigo-600">Q:</span>{" "}
                    {fc.question}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-emerald-600">A:</span> {fc.answer}
                  </p>
                </div>
                <button
                  onClick={() => deleteFlashcard(i)}
                  className="text-red-400 hover:text-red-600 text-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizEditorModal;
