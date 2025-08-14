'use client';
import { useState } from 'react';
import { auth, googleProvider } from '../../../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import BtnToMain from '../_components/BtnToMain';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const navigateToRegister = () => {
      navigate("/register")
    }

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      console.log('Signing in with email:', email, 'password:', password ? '***' : '(empty)');

      await signInWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully');

      navigate(`/dashboard/${auth.currentUser.displayName}`);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    alert('Signed in successfully with Google');

    navigate(`/dashboard/${auth.currentUser.displayName}`);
  } catch (error) {
    console.error('Error signing in with Google', error);
  }
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
  
  <div className="hidden md:block md:w-1/2">
    <img
      src="/register.jpg" // use correct public path or import accordingly
      alt="Register illustration"
      className="object-cover w-full h-screen"
    />
  </div>

<div className='m-5'>
  <BtnToMain className="m-7"/>
  </div>

  <div className="w-full md:w-1/2 flex items-center justify-center p-6">
    <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8'>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        Sign In
      </h2>
      <form onSubmit={handleSignIn} className='space-y-4'>
        <div className='flex flex-col'>
          <label htmlFor="email" className='mb-1 font-semibold text-gray-700 dark:text-gray-300'>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:text-gray-100 transition"
          />
        </div>

        <div className='flex flex-col'>
          <label 
          htmlFor="password"
          className="mb-1 font-semibold text-gray-700 dark:text-gray-300"
          >Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:text-gray-100 transition"
          />
        </div>

        <button 
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Sign In
        </button>
      </form>

      <div>
    <button onClick={signInWithGoogle}><img href="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"/></button>
  </div>

  <div className='cursor-pointer text-center m-5 text-slate-400 '>
      <a onClick={navigateToRegister} > Already have an account? <br/> Sign in</a>
      </div>
    </div>

    </div>
    </div>
  );
};

export default SignIn;