import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
} from 'lucide-react';
import SignOutBtn from '../features/auth/components/SignOutBtn';

// Дані винесені окремо — той самий патерн що FEATURES і STEPS
// Щоб додати пункт меню — додаєш один об'єкт, не чіпаєш JSX
const getMenuItems = (navigate, username) => [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    onClick: () => navigate(`/dashboard/${username}`),
  },
  {
    name: 'Quizzes',
    icon: BookOpen,
    onClick: () => navigate(`/userquizarea/${username}`),
  },
  {
    name: 'Statistics',
    icon: BarChart2,
    onClick: () => navigate(`/stats/${username}`),
  },
  {
    name: 'Settings',
    icon: Settings,
    onClick: () => navigate(`/settings/${username}`),
  },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // username береться з user — не потрібен окремий useState
  const username = user?.displayName || '';
  const menuItems = getMenuItems(navigate, username);

  // Ініціали для аватара — першa літера імені
  const initials = username ? username[0].toUpperCase() : '?';

  return (
    <>
      {/* Кнопка бургера — тільки мобільний */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg border border-gray-200 shadow-sm"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-600" />
      </button>

      {/* Overlay — затемнення за навбаром на мобільному */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Сайдбар */}
      <aside
        className={`
          fixed md:relative z-40 h-screen w-64 flex flex-col
          bg-white border-r border-gray-100
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Логотип */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">EL</span>
            </div>
            <span className="text-base font-bold text-gray-900">EFFLearn</span>
          </div>
        </div>

        {/* Меню */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveItem(item.name);
                  item.onClick();
                  setIsOpen(false); // закриває на мобільному після кліку
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1
                  text-sm font-medium transition-all duration-150 text-left
                  ${isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-indigo-600' : 'text-gray-400'}
                />
                {item.name}
                {/* Активний індикатор — тонка смужка зліва */}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Профіль + вихід */}
        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
            {/* Аватар з ініціалами */}
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-indigo-700">
                {initials}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {username || 'Loading...'}
              </p>
              <p className="text-xs text-gray-400">Authorized</p>
            </div>
            <SignOutBtn />
          </div>
        </div>
      </aside>
    </>
  );
}

export default NavBar;