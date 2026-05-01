import Header from '../main/components/Header';
import QuizArea from '../learn/components/QuizArea';
import BtnToMain from '../components/BtnToMain';
import { useAuthModal } from '../../hooks/useAuth';

function GuestMode({ initialModal = null }) {
   const { openSignIn, openSignUp} = useAuthModal(initialModal);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSignIn={openSignIn} onSignUp={openSignUp}/>

      {/* Banner */}
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