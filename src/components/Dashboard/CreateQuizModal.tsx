import type { CreateQuizModalProps } from "../../types/quiz";

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({
  isOpen,
  value,
  onChange,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      onClick={(e) => {
        e.target === e.currentTarget && onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transition-transform transform scale-100 md:scale-105">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Введіть назву тесту
        </h2>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Example: English Words"
          className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          autoFocus
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Скасувати
          </button>

          <button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white px-5 py-2 rounded-md shadow-md font-semibold transition-colors duration-150 focus:outline-none"
            disabled={!value.trim()}
          >
            Створити
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;
