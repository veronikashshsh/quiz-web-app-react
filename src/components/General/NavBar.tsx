import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { auth } from "../../../config/firebase";
import { MENU_ITEMS } from "../../constants/menu";
import type { MenuItem } from "../../types/menu";
import SignOutBtn from "../Auth/SignOutBtn";
import NavButton from "./NavButton";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const username = user?.displayName || "User";

  const initials = username[0].charAt(0).toUpperCase();

  function isActive(path: string) {
    return location.pathname.includes(path);
  }

  function handleNavigate(path: string) {
    navigate(`${path}/${username}`);
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="md:hidden fixed top-1 left-4 z-40 p-2 bg-white rounded-lg border border-gray-200 shadow-sm"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-600" />
      </button>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky md:top-0 z-40 h-screen w-64 flex flex-col shrink-0
          bg-white border-r border-gray-100
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">EL</span>
            </div>
            <span className="text-base font-bold text-gray-900">EFFLearn</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {t("navbar.menu")}
          </p>
          <div className="flex flex-col gap-1">
            {MENU_ITEMS.map((item: MenuItem) => (
              <NavButton
                key={item.key}
                item={item}
                active={isActive(item.path)}
                onClick={() => handleNavigate(item.path)}
                label={t(item.label)}
              />
            ))}
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-indigo-700">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {username || "Loading..."}
              </p>
              <p className="text-xs text-gray-400">{t("navbar.authorized")}</p>
            </div>
            <SignOutBtn />
          </div>
        </div>
      </aside>
    </>
  );
}

export default NavBar;
