import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../config/firebase";
import { getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useSignIn } from "../../hooks/useSignIn";
import { SignInFormData, signInSchema } from "../../schemas/signInSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleButton from "./GoogleButton";
import Divider from "./Divider";
import Field from "./Field";
import { SignInFormProps } from "../../types/auth";

function SignInForm({ onSuccess, onSwitchToSignUp }: SignInFormProps) {
  const { loginWithEmail, loginWithGoogle, error: authError, loading } = useSignIn({ onSuccess });
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

   // for ios redirect
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

  const onSubmit = async (data: SignInFormData) => {
  try {
    await loginWithEmail(data.email, data.password);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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