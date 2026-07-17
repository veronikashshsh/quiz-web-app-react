import { useTranslation } from "react-i18next";

import { StatsData } from "../../data/statsData";
import { StatCard } from "../Stats/StatsCard";

interface StatsGridProps {
  stats: Record<string, number>;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {StatsData.map((stat) => {
        const Icon = stat.icon;
        const statValue = stats[stat.key as keyof typeof stats];
        return (
          <StatCard
            key={stat.key}
            label={t(stat.label)}
            value={statValue || 0}
            icon={Icon}
            color={stat.color}
            bg={stat.bg}
          />
        );
      })}
    </div>
  );
};

export default StatsGrid;
