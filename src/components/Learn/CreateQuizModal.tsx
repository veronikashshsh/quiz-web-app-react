import React from "react";
import { useTranslation } from "react-i18next";

interface CreateQuizModalProps {
  isOpen: boolean;
  quizName: string;
  onQuizNameChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({
  isOpen,
  quizName,
  onQuizNameChange,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{t("quiz.createQuiz")}</h2>

        <p className="text-sm text-gray-400 mb-6">{t("quiz.addQuiz.title")}</p>

        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {t("quiz.addQuiz.nameLabel")}
        </label>

        <input
          type="text"
          value={quizName}
          onChange={(e) => onQuizNameChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder={t("quiz.addQuiz.namePlaceholder")}
          className="w-full border border-gray-200 bg-gray-50 text-gray-900 px-4 py-2.5 rounded-lg mb-6 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition placeholder:text-gray-300"
          autoFocus
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            {t("quiz.cancel")}
          </button>

          <button
            onClick={onSubmit}
            disabled={!quizName.trim()}
            className="px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition"
          >
            {t("quiz.add")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;
