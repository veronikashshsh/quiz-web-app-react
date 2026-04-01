import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import Divider from "./Divider";
import Field from "./Field";

function SignInForm({ onSuccess, onSwitchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
      navigate(`/dashboard/${auth.currentUser.displayName}`);
    } catch (err) {
      // Firebase повертає технічні повідомлення — замінюємо на зрозумілі
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onSuccess();
      navigate(`/dashboard/${auth.currentUser.displayName}`);
    } catch (err) {
      setError('Google sign in failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GoogleButton onClick={handleGoogle} />
      <Divider />

      <Field
        label="Email"
        id="signin-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <Field
        label="Password"
        id="signin-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

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
        {loading ? 'Signing in...' : 'Sign in'}
      </button>

      <p className="text-center text-xs text-gray-400">
        No account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-indigo-600 font-medium hover:underline"
        >
          Create one
        </button>
      </p>
    </form>
  );
}

export default SignInForm