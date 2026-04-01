import { useState } from 'react';
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

// initialModal — 'signin' | 'signup' | null
// Коли юзер заходить на /login → initialModal='signin' → модал одразу відкритий
function MainSite({ initialModal = null }) {
  const { t } = useTranslation();
  const { authModal, openSignIn, openSignUp, closeModal} = useAuthModal();
  return (
    <>
      <Header onSignIn={openSignIn} onSignUp={openSignUp} />

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeModal}
        defaultTab={authModal.tab}
      />

      {/* Hero */}
     <Hero />
      {/* Features */}
      <Features />

      {/* How it works */}
      <Steps />
      <Testimonials />

      {/* CTA Banner */}
     <BannerCTA />
      <Footer />
    </>
  );
}

export default MainSite;