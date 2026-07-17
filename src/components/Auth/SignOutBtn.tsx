"use client";

import { signOut } from "firebase/auth";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../config/firebase";

const SignOutBtn = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleSignOut}
        className="px-2 py-2  text-white rounded
     hover:bg-red-700 hover:scale-[1.02] transition-all duration-200 ease-in-out"
      >
        <LogOutIcon color="black" />
      </button>
    </div>
  );
};

export default SignOutBtn;
