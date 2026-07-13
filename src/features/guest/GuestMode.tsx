import Header from '../main/components/Header';
import { useAuthModal } from '../../hooks/useAuth';
import BtnToMain from '../../components/General/BtnToMain';
import QuizArea from '../../components/Learn/QuizArea';

const GuestMode = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
  
      <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
           <BtnToMain />
          <div>
            <p className="text-sm font-semibold text-indigo-800">
              You are in Guest Mode
            </p>
            <p className="text-xs text-indigo-500">
              Progress is saved locally. Create an account to sync across devices.
            </p>
          </div>
         
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <QuizArea isGuest={true}/>
      </div>
    </div>
  );
}

export default GuestMode;