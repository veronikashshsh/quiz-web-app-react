import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface BannerCTAProps {
  onSignUp: () => void;
}

const BannerCTA: React.FC<BannerCTAProps> = ({ onSignUp }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-indigo-600 rounded-3xl px-8 py-14 text-center">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            {t("cta.title")}
          </h2>
          <p className="text-indigo-200 mb-8 max-w-md mx-auto">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onSignUp}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-indigo-600 bg-white hover:bg-indigo-50 active:scale-95 rounded-xl transition"
            >
              {t("cta.primary")}
            </button>
            <button
              onClick={() => navigate("/guest")}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-indigo-200 border border-indigo-400 hover:border-white hover:text-white active:scale-95 rounded-xl transition"
            >
              {t("cta.secondary")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerCTA;
