import { Construction } from 'lucide-react';

interface UnderConstructionProps {
  title?: string;
  description?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  title = 'Ця сторінка в розробці',
  description = 'Ми вже над цим працюємо. Скоро тут з’явиться щось цікаве.',
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-indigo-500" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
};

export default UnderConstruction;