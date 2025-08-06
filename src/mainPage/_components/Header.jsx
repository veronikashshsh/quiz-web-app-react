function Header() {
  return (
    <div className="dark:bg-gray-900  text-sm p-4">
      <nav className="flex items-center justify-between">
        <img src="public/logo.png" alt="logo" className="h-8" />
        
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-slate-300 rounded text-gray-900  hover:bg-gray-100 transition">
            + create an account
          </button>
          <button className="px-4 py-2 border border-white rounded text-white hover:bg-slate-300 hover:text-[#959EC9] transition">
            Log into
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
