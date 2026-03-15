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
          w-8 h-8
         px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold rounded-lg transition
          "
        aria-label="Return to main page"
      >
        ←
      </button>
    </div>
  )
}

export default BtnToMain