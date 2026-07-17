import { FirebaseError } from "firebase/app";
import {
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../../config/firebase";
import { ROUTES } from "../constants/routes";

interface UseSignInProps {
  onSuccess: () => void;
}

export function useSignIn({ onSuccess }: UseSignInProps) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Обробка повернення користувача після редіректу (iOS/Android)
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          onSuccess();
          navigate(ROUTES.DASHBOARD(result.user.displayName || "user"));
        }
      })
      .catch((err) => {
        if (err instanceof FirebaseError) {
          console.error("Firebase code:", err.code);
          console.error("Firebase message:", err.message);
          setError(err.message);
        } else {
          console.error(err);
          setError("Unknown error");
        }
      });
  }, [navigate, onSuccess]);

  // Вхід через Email / Password
  const loginWithEmail = async (email: string, password: string) => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
      navigate(ROUTES.DASHBOARD(result.user.displayName || "user"));
    } catch (err) {
      console.error("Email auth error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Вхід через Google (з урахуванням платформи)
  const loginWithGoogle = async () => {
    setError("");
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        onSuccess();
        navigate(ROUTES.DASHBOARD(result.user.displayName || "user"));
      }
    } catch (err) {
      console.error("Google auth error:", err);
      setError("Google sign in failed. Please try again.");
    }
  };

  return {
    loginWithEmail,
    loginWithGoogle,
    error,
    loading,
  };
}
