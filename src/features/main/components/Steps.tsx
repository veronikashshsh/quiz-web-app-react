import React from "react";
import { useTranslation } from "react-i18next";

import { STEPS } from "../../../data/landingData";

function Steps() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl xl:text-4xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
            {t("steps.title")}
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 mb-10 leading-relaxed">
            {t("steps.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-dashed-gradient -z-0 opacity-20"></div>

          {STEPS.map((s, index) => (
            <div key={s.step} className="group relative h-full">
              <div className="relative z-10 bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                <span className="absolute -top-6 -right-4 text-9xl font-black text-indigo-50/50 select-none group-hover:text-indigo-100 transition-colors duration-500">
                  {s.step}
                </span>

                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-black mb-8 shadow-lg shadow-indigo-200 shrink-0">
                  {s.step}
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-4 relative z-10">
                  {t(s.titleKey)}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed relative z-10 flex-1">
                  {t(s.descKey)}
                </p>
                <div className="mt-8 flex items-center gap-2">
                  <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
                  <div className="h-1 w-2 bg-indigo-200 rounded-full"></div>
                </div>
              </div>

              {index !== STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 text-indigo-200">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Steps;
