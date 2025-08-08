'use client';
import { useState } from 'react';
import { auth, googleProvider } from '../../../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    <div className='m-5 flex flex-col items-center '>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className='border p-2 m-2'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            className='border p-2 m-2'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign In</button>
      </form>

      <div>
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  </div>
    </div>
  );
};

export default SignIn;