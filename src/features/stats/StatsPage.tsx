"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import { auth } from "../../../config/firebase";
import QuizPerformanceChart from "../../components/Stats/QuizPerfomanceChart";
import { StatCard } from "../../components/Stats/StatsCard";
import { StatsData } from "../../data/statsData";
import { useQuizzes } from "../../hooks/useQuizzes";
import { useStats } from "../../hooks/useStats";

const StatsPage: React.FC = () => {
  const { t } = useTranslation();
  const isGuest = !auth.currentUser;
  const stats = useStats(isGuest);
  const { quizzes } = useQuizzes(isGuest);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <main className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {t("statistics.title")}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t("statistics.subtitle")}</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {StatsData.map((stat) => {
              const Icon = stat.icon;
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

          <QuizPerformanceChart quizzes={quizzes} />
        </div>
      </main>
    </div>
  );
};

export default StatsPage;
