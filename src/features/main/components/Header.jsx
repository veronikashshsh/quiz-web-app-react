import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher"

function Header({onSignIn, onSignUp}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-6">

        {/* Логотип + назва */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition"
        >
          <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
          <span className="text-base font-bold text-gray-900 tracking-tight">
            LearnApp
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scrollTo("features")}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition"
          >
            {t("nav.features")}
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition"
          >
            {t("nav.howItWorks")}
          </button>
          <button
            onClick={() => navigate("/guest")}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition"
          >
            {t("nav.tryFree")}
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="w-px h-5 bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <button
              onClick={onSignIn}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition"
            >
              {t("auth.logIn")}
            </button>
            <button
              onClick={onSignUp}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg transition"
            >
              {t("auth.createAccount")}
            </button>
          </div>
        </div>

      </nav>
    </header>
  );
}

export default Header;