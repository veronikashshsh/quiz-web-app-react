import { Loader, SquareLibrary } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useQuizzes } from "../../hooks/useQuizzes";
import type { Quiz, QuizAreaProps } from "../../types/quiz";
import ConfirmDialog from "../General/ConfirmDialog";
import CreateQuizModal from "./CreateQuizModal";
import QuizCard from "./QuizCard";
import QuizEditorModal from "./QuizEditorModal";

const QuizArea: React.FC<QuizAreaProps> = ({ isGuest }) => {
  const {
    quizzes,
    isLoading,
    error,
    addQuiz,
    deleteQuiz,
    quizzesCount,
    updateQuizLocally,
  } = useQuizzes(isGuest);
  const [showModal, setShowModal] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);
  const { t } = useTranslation();

  function handleEdit(quiz: Quiz) {
    setSelectedQuiz(quiz);
    setIsEditorOpen(true);
  }

  async function handleAddQuiz() {
    if (quizName.trim() === "") {
      return;
    }
    await addQuiz(quizName.trim());
    setQuizName("");
    setShowModal(false);
  }

  function handleQuizUpdate(updatedQuiz: Quiz) {
    updateQuizLocally(updatedQuiz);
    setSelectedQuiz(updatedQuiz);
  }

  function handleDeleteRequest(quiz: Quiz) {
    setQuizToDelete(quiz);
  }

  function handleConfirmDelete() {
    if (quizToDelete?.id) {
      const index = quizzes.findIndex((q) => q.id === quizToDelete.id);
      deleteQuiz(quizToDelete.id, index);
    }
    setQuizToDelete(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {t("quiz.myQuizzes")}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {quizzesCount} {quizzesCount === 1 ? "quiz" : "quizzes"}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold rounded-lg transition"
          aria-label="Add new quiz"
        >
          <span className="text-lg leading-none">+</span>
          {t("quiz.createQuiz")}
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl">
              <Loader />
            </span>
          </div>
          <p className="text-gray-700 font-medium mb-1">{t("quiz.noQuizzes")}</p>
          <p className="text-sm text-gray-400">{t("quiz.noQuizzesDesc")}</p>
        </div>
      )}

      {error && <div className="text-center py-10 text-red-500 text-sm">{error}</div>}

      {!isLoading && !error && quizzes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl">
              <SquareLibrary />
            </span>
          </div>
          <p className="text-gray-700 font-medium mb-1">{t("quiz.noQuizzes")}</p>
          <p className="text-sm text-gray-400">{t("quiz.noQuizzesDesc")}</p>
        </div>
      )}

      {/* Quiz grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes?.map((quiz, index) => (
            <QuizCard
              key={quiz.id || index}
              isGuest={isGuest}
              quiz={quiz}
              onDelete={() => handleDeleteRequest(quiz)}
              onEdit={() => handleEdit(quiz)}
            />
          ))}
        </div>
      )}

      {isEditorOpen && selectedQuiz && (
        <QuizEditorModal
          quiz={selectedQuiz}
          isGuest={isGuest}
          onClose={() => setIsEditorOpen(false)}
          onQuizUpdate={handleQuizUpdate}
        />
      )}

      {quizToDelete && (
        <ConfirmDialog
          title={`Видалити квіз "${quizToDelete.name}"?`}
          description="Цю дію не можна скасувати. Усі картки квізу буде втрачено."
          onConfirm={handleConfirmDelete}
          onCancel={() => setQuizToDelete(null)}
        />
      )}

      {showModal && (
        <CreateQuizModal
          isOpen={showModal}
          quizName={quizName}
          onQuizNameChange={setQuizName}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddQuiz}
        />
      )}
    </div>
  );
};

export default QuizArea;
