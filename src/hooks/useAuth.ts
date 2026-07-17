import { useNavigate } from "react-router-dom";

export function useAuthModal() {
  const navigate = useNavigate();

  return {
    openSignIn: () => navigate("/login"),
    openSignUp: () => navigate("/register"),
    closeModal: () => navigate("/"),
  };
}
