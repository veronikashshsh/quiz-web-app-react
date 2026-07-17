import { BarChart2 } from "lucide-react";

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent activity</h2>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
          <BarChart2 size={18} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">No activity yet</p>
        <p className="text-xs text-gray-400 mt-1">
          Start a quiz to see your history here
        </p>
      </div>
    </div>
  );
};

export default RecentActivity;
