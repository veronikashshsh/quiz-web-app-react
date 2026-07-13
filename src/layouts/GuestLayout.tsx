import { Outlet } from 'react-router-dom';
import Header from '../features/main/components/Header';
import { useAuthModal } from '../hooks/useAuth';
import { MainSiteProps } from '../types/main';

const GuestLayout: React.FC<MainSiteProps> = ({ initialModal = null}) => {
      const { openSignIn, openSignUp} = useAuthModal();
  return (
    <div className='min-h-screen flex flex-col'>
      <Header onSignIn={openSignIn} onSignUp={openSignUp} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;