import React from 'react'
import { FEATURES } from '../../../data/landingData'
import { useTranslation } from 'react-i18next';

function Features() {
  const { t } = useTranslation();
  
  return (
    <section id="features" className=" py-10 md:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">{t("features.title")}</h2>
            <p className="text-gray-500 max-w-md mx-auto">{t("features.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
              <div key={f.titleKey} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-sm transition">
                <Icon size={32} className="m-2"/>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{t(f.titleKey)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(f.descKey)}</p>
              </div>
)           })}
          </div>
        </div>
      </section>
  )
}

export default Features