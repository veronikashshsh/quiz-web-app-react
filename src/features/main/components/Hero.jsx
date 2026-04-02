import { useTranslation } from 'react-i18next';
import { useNavigate, useNavigation } from 'react-router-dom';

function Hero({onSignUp}) {
     const { t } = useTranslation();
    const navigate = useNavigate()
  return (
     <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
          {t("hero.badge")}
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5 max-w-2xl mx-auto">
          {t("hero.title")}
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onSignUp}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl transition"
          >
            {t("hero.cta.primary")}
          </button>
          <button
            onClick={() => navigate("/guest")}
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-95 rounded-xl transition"
          >
            {t("hero.cta.secondary")}
          </button>
        </div>
      </section>

  )
}

export default Hero