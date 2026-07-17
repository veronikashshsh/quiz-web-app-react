import { ArrowRight, BarChart2, BookOpen, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickActionsProps {
  username: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ username }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick actions</h2>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => navigate(`/userquizarea/${username}`)}
          className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition text-left"
        >
          <div className="flex items-center gap-3">
            <Plus size={16} className="text-indigo-200" />
            <span className="text-sm font-semibold text-white">Create new quiz</span>
          </div>
          <ArrowRight size={14} className="text-indigo-300" />
        </button>

        <button
          onClick={() => navigate(`/userquizarea/${username}`)}
          className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition text-left"
        >
          <div className="flex items-center gap-3">
            <BookOpen size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Go to my quizzes</span>
          </div>
          <ArrowRight size={14} className="text-gray-300" />
        </button>

        <button
          onClick={() => navigate(`/stats/${username}`)}
          className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition text-left"
        >
          <div className="flex items-center gap-3">
            <BarChart2 size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">View statistics</span>
          </div>
          <ArrowRight size={14} className="text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
