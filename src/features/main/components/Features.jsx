import React from 'react'
import { FEATURES } from '../../../data/landingData'
import { useTranslation } from 'react-i18next';
import dashboardPicture from '../../../../public/dashboardPic.png'

function Features() {
  const { t } = useTranslation();
  
  return (
    <section id="features" className="relative overflow-hidden py-16 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. ЗАГОЛОВОК (Завжди зверху) */}
        <div className="mb-16 lg:mb-16 text-center lg:text-left">
          
          <h1 className="text-2xl md:text-4xl xl:text-4xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
              {t("features.title")}
            </h1>
            <p className="text-lg md:text-2xl text-gray-500 mb-10 leading-relaxed">
              {t("features.subtitle")}
            </p>
        </div>

        {/* 2. ГОЛОВНА СІТКА (Grid на 12 колонок) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* ЛІВА ЧАСТИНА: КАРТИНКА (займає 7 колонок з 12) */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            {/* Декоративне сяйво за картинкою */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>
            
            <div className="relative">
              <img 
                src={dashboardPicture} 
                alt="Dashboard Preview"
                className="w-full h-auto rounded-[2.5rem] shadow-2xl border-[10px] border-white/90 backdrop-blur-sm"
              />
    
              {/* Плаваюча картка прогресу */}
             
            </div>
          </div>

          {/* ПРАВА ЧАСТИНА: КАРТКИ ВЕРТИКАЛЬНО (займають 5 колонок з 12) */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-1 lg:order-2">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div 
                  key={f.titleKey} 
                  className="group relative bg-white border border-gray-200 rounded-[1.5rem] p-6 transition-all duration-300 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-start gap-5">
                    {/* Іконка зліва в картці */}
                    <div className="shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Icon size={24} />
                    </div>
                    
                    {/* Текст справа від іконки */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {t(f.titleKey)}
                      </h3>
                      <p className="text-md md:text-md text-gray-500 leading-relaxed">
                        {t(f.descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Features;