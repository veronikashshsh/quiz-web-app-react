import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';


function AuthModal({ isOpen, onClose, defaultTab = 'signin' }) {
  const [tab, setTab] = useState(defaultTab);

  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">

        {/* Кнопка закрити */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
              tab === 'signin'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
              tab === 'signup'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Create account
          </button>
        </div>

        {tab === 'signin' ? (
          <SignInForm onSuccess={onClose} onSwitchToSignUp={() => setTab('signup')} />
        ) : (
          <SignUpForm onSuccess={onClose} onSwitchToSignIn={() => setTab('signin')} />
        )}
      </div>
    </div>
  );
}

export default AuthModal;