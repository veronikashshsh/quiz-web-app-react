function Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-xs text-gray-400">or</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

export default Divider