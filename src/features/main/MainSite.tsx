import { getRedirectResult } from "firebase/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../config/firebase";
import { useAuthModal } from "../../hooks/useAuth";
import type { MainSiteProps } from "../../types/main";
import AuthModal from "../auth/AuthModal";
import BannerCTA from "./components/BannerCTA";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Steps from "./components/Steps";
import Testimonials from "./components/Testimonials";

const MainSite: React.FC<MainSiteProps> = ({ initialModal = null }) => {
  const { t } = useTranslation();
  const { openSignIn, openSignUp, closeModal } = useAuthModal();
  const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          console.log("Success redirect:", result.user);
          navigate(`/dashboard/${result.user.displayName || "user"}`);
        }
      })
      .catch((error) => {
        console.error("Error redirect:", error);
      });
  }, [navigate]);

  return (
    <>
      <div className="relative overflow-hidden min-h-screen">
        <div className="absolute -top-[10%] -right-[0%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

        <AuthModal
          isOpen={initialModal !== null}
          defaultTab={initialModal ?? "signin"}
          onClose={closeModal}
        />

        <Hero onSignUp={openSignUp} />
        <Features />
        <Steps />
        <Testimonials />
        <BannerCTA onSignUp={openSignUp} />
        <Footer />
      </div>
    </>
  );
};

export default MainSite;
