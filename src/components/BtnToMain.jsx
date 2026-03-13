import React from 'react'
import { useNavigate } from "react-router-dom";

function BtnToMain() {
    let navigateToMainPage = useNavigate(); 
     const routeChangeToMain = () =>{ 
       navigateToMainPage("/"); 
  }


  return (
    <div>
        <button
        onClick={routeChangeToMain}
        type="button"
        className="
          flex items-center justify-center
          w-12 h-12
          bg-white dark:bg-gray-800
          text-[#959EC9]
          rounded-full
          shadow-md
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition 
          duration-300 
          ease-in-out
          transform
          hover:-translate-y-1 hover:scale-105
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
          "
        aria-label="Return to main page"
      >
        ←
      </button>
    </div>
  )
}

export default BtnToMain