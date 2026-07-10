import React from 'react';
import { useNavigate } from "react-router-dom";

function BtnToMain() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      type="button"
      className="
        flex items-center justify-center
        w-10 h-10
        rounded-full
        bg-white/80 backdrop-blur
        text-gray-700
        shadow-sm
        hover:bg-white hover:shadow-md
        active:scale-95
        transition
      "
      aria-label="Return back"
    >
      ←
    </button>
  );
}

export default BtnToMain;