import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AuthModal from '../auth/AuthModal';
import Features from './components/Features';
import Hero from './components/Hero';
import Steps from './components/Steps';
import { useAuthModal } from '../../hooks/useAuth';
import BannerCTA from './components/BannerCTA';
import { getRedirectResult } from 'firebase/auth';
import { auth } from '../../../config/firebase';

interface MainSiteProps {
  initialModal?: 'signin' | 'signup';
}

const MainSite: React.FC<MainSiteProps> = ({ initialModal }) => {
  const { t } = useTranslation();
  const { authModal, openSignIn, openSignUp, closeModal} = useAuthModal(initialModal);
   const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          console.log("Success redirect:", result.user);
          navigate(`/dashboard/${result.user.displayName || 'user'}`);
        }
      })
      .catch((error) => {
        console.error("Error redirect:", error);
      });
  }, [navigate]);

  
  return (
    <>
    <div className='relative overflow-hidden min-h-screen'>
     <div className="absolute -top-[10%] -right-[0%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
  
      <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      <Header onSignIn={openSignIn} onSignUp={openSignUp} />

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeModal}
        defaultTab={authModal.tab}
      />
      
     <Hero onSignUp={openSignUp}/>
      <Features />
      <Steps />
      <Testimonials />
     <BannerCTA onSignUp={openSignUp} />
      <Footer />
      </div>
    </>
  );
}

export default MainSite;