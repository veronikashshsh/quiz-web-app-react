function Field({ label, id, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition placeholder:text-gray-300"
        required
      />
    </div>
  );
}

export default Field