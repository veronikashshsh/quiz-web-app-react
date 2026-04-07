import React from 'react'
import { STEPS } from '../../../data/landingData'
import { useTranslation } from 'react-i18next';

function Steps() {
    const { t } = useTranslation();
  return (
    <section id="how-it-works" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">{t("steps.title")}</h2>
            <p className="text-gray-500 max-w-md mx-auto">{t("steps.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="flex flex-col items-start">
                <span className="text-4xl font-extrabold text-indigo-100 mb-4 select-none">{s.step}</span>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{t(s.titleKey)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(s.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}

export default Steps