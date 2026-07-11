// hooks/useAuthModal.js
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function useAuthModal(initialModal: 'signin' | 'signup' | null = null) {
  const navigate = useNavigate();

  const [authModal, setAuthModal] = useState({
    isOpen: initialModal != null,
    tab: initialModal ?? 'signin',
  });

  const openSignIn = () => {
    navigate('/login');
    setAuthModal({ isOpen: true, tab: 'signin' });
  };

  const openSignUp = () => {
    navigate('/register');
    setAuthModal({ isOpen: true, tab: 'signup' });
  };

  const closeModal = () => {
    navigate('/');
    setAuthModal({ isOpen: false, tab: 'signin' });
  };

  return { authModal, openSignIn, openSignUp, closeModal };
}