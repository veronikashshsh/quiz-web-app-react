import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import Divider from "./Divider";
import Field from "./Field";
import { createUserWithEmailAndPassword, getRedirectResult, signInWithPopup, signInWithRedirect, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase";
import { FirebaseError } from "firebase/app";
import { SignUpFormProps } from "../../types/auth";

function SignUpForm({ onSuccess, onSwitchToSignIn } : SignUpFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          onSuccess();
          navigate(`/dashboard/${result.user.displayName || 'user'}`);
        }
      })
      .catch((err) => {
        console.error("Redirect error:", err);
        setError("Failed to complete Google Sign In.");
      });
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      onSuccess();
      navigate(`/dashboard/${name}`);
    } catch (err) {
      if (err instanceof FirebaseError && err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try signing in.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if(isMobile){
          await signInWithRedirect(auth, googleProvider);
        } else {
          const result = await signInWithPopup(auth, googleProvider);
          const userDisplayName = result.user.displayName || 'user';
          onSuccess();
          navigate(`/dashboard/${userDisplayName}`);
        }
    } catch (err) {
      setError('Google sign in failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GoogleButton onClick={handleGoogle} />
      <Divider />

      <Field label="Name" id="signup-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <Field label="Email" id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      <Field label="Password" id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" />
      <Field label="Confirm password" id="signup-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />

      {error && (
        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 active:scale-[0.98] rounded-lg transition mt-1"
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default SignUpForm