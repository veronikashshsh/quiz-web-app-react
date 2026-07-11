'use client'

import React from 'react'
import { StatsData } from '../../data/statsData';
import { useStats } from '../../hooks/useStats';
import { useTranslation } from 'react-i18next';
import { StatCard } from '../../components/Stats/StatsCard';
import NavBar from '../../components/General/NavBar'; // Додано імпорт
import { auth } from '../../../config/firebase'; // Для перевірки гостя

const StatsPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Визначаємо, чи користувач гість. 
  // Якщо немає авторизованого юзера в Firebase - значить ми в режимі гостя.
  const isGuest = !auth.currentUser;
  
  // Передаємо isGuest у хук (виправляє помилку ts(2554))
  const stats = useStats(isGuest);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Бічна панель навігації */}
      <NavBar />
      
      {/* Основний контент з прокруткою */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {t('statistics.title')}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {t('statistics.subtitle')}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {StatsData.map((stat) => {
              const Icon = stat.icon;
              
              // Типізуємо доступ до ключа об'єкта stats
              // Вказуємо TS, що stat.key точно є в об'єкті, який повертає useStats
              const value = stats[stat.key as keyof typeof stats];

              return (
                <StatCard
                  key={stat.key}
                  label={t(stat.label)}
                  value={value || 0}
                  icon={Icon}
                  color={stat.color}
                  bg={stat.bg}
                />
              );
            })}
          </div>
          
          {/* Тут можна додати графіки або додаткову статистику пізніше */}
        </div>
      </main>
    </div>
  );
};

export default StatsPage;

