import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header({ onSignIn, onSignUp }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); 
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          <button onClick={() => navigate("/")} className="flex items-center gap-1 shrink-0">
            <span className="text-base font-bold text-gray-900 tracking-tight">LearnApp</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => scrollTo("features")} className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 transition">{t("nav.features")}</button>
            <button onClick={() => scrollTo("how-it-works")} className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 transition">{t("nav.howItWorks")}</button>
            <button onClick={() => navigate("/guest")} className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 transition">{t("nav.tryFree")}</button>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={onSignIn} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition">{t("auth.logIn")}</button>
              <button onClick={onSignUp} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg transition">{t("auth.createAccount")}</button>
            </div>
            
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
            <button onClick={() => scrollTo("features")} className="text-left py-2 text-gray-600">{t("nav.features")}</button>
            <button onClick={() => scrollTo("how-it-works")} className="text-left py-2 text-gray-600">{t("nav.howItWorks")}</button>
            <button onClick={() => navigate("/guest")} className="text-left py-2 text-gray-600 font-medium">{t("nav.tryFree")}</button>
            <hr border-gray-50 />
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { onSignIn(); setIsMenuOpen(false); }} className="py-3 text-sm font-medium text-gray-600 bg-gray-50 rounded-xl">{t("auth.logIn")}</button>
              <button onClick={() => { onSignUp(); setIsMenuOpen(false); }} className="py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl">{t("auth.createAccount")}</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header