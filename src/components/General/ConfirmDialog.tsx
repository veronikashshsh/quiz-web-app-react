import type { ConfirmDialogProps } from "../../types/dialog";

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  confirmLabel = "Видалити",
  cancelLabel = "Скасувати",
  onConfirm,
  onCancel,
  isDangerous = true,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
        {description && <p className="text-sm text-gray-500 mb-6">{description}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2.5 text-sm font-semibold text-white rounded-lg transition active:scale-95 ${
              isDangerous
                ? "bg-red-500 hover:bg-red-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
