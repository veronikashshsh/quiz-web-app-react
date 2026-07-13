import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Quiz } from '../../types/quiz';

interface QuizPerformanceChartProps {
  quizzes: Quiz[];
}

function getBarColor(rate: number): string {
  if (rate >= 80) return '#10b981'; 
  if (rate >= 40) return '#f59e0b';
  return '#ef4444';
}

const QuizPerformanceChart: React.FC<QuizPerformanceChartProps> = ({ quizzes }) => {
  const data = quizzes.map(q => ({
    name: q.name.length > 12 ? q.name.slice(0, 12) + '…' : q.name,
    successRate: q.successRate ?? 0,
  }));

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-400 text-sm py-12 border border-dashed rounded-xl">
        No data yet
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Success rate by quiz</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`${Number(value) || 0}%`, 'Success rate']}
          />
          <Bar dataKey="successRate" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.successRate)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuizPerformanceChart;