import { NavButtonProps } from "../../types/menu";

function NavButton({ item, active, onClick, label }: NavButtonProps) {
  const Icon = item.icon;
  
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl
        text-sm font-semibold transition-all duration-200 text-left
        ${active
          ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }
      `}
    >
      <Icon
        size={19}
        className={`transition-colors ${active ? 'text-indigo-600' : 'text-gray-400'}`}
      />
      <span className="flex-1">{label}</span>
      {active && (
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
      )}
    </button>
  );
}

export default NavButton;