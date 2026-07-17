import { useTranslation } from "react-i18next";
import { useNavigate, useNavigation } from "react-router-dom";

import accPicture from "../../../../public/accountPicture.png";

function Hero({ onSignUp }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-36 lg:gap-8 items-center">
          <div className="lg:col-span-5 text-center lg:text-left order-2 lg:order-1 relative z-10">
            <h1 className="text-3xl md:text-5xl xl:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-2xl text-gray-500 mb-10 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onSignUp}
                className="w-3/4 sm:w-auto px-8 py-4 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95 rounded-2xl transition-all"
              >
                {t("hero.cta.primary")}
              </button>
              <button
                onClick={() => navigate("/guest")}
                className="w-3/4 sm:w-auto px-8 py-4 text-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 active:scale-95 rounded-2xl transition-all"
              >
                {t("hero.cta.secondary")}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-100 rounded-full blur-[100px] opacity-50"></div>

            <div className="relative lg:scale-110 lg:translate-x-10 transition-transform duration-700 ease-out">
              <img
                src={accPicture}
                alt="Product Preview"
                className="w-full h-auto object-cover rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.2)] border-[12px] border-white/80 backdrop-blur-sm transform -rotate-1 lg:-rotate-2 hover:rotate-0 transition-all duration-500"
              />

              <div className="absolute -bottom-6 -left-1 hidden md:block bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      {t("hero.progress")}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {t("hero.quizCompleted")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
