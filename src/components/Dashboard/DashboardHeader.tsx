import { useTranslation } from 'react-i18next';

interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        {t('dashboard.welcome')}{username ? `, ${username}` : ''}
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        {t('dashboard.description')}
      </p>
    </div>
  );
};

export default DashboardHeader;