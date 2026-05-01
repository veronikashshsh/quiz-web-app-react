export function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex justify-between mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase">
          {label}
        </p>
        <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
          <Icon size={16} className={color} />
        </div>
      </div>

      <p className={`text-3xl font-bold ${color}`}>
        {value ?? "—"}
      </p>
    </div>
  );
}