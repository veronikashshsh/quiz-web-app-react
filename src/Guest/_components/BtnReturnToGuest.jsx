import React from 'react'
import { useNavigate } from "react-router-dom";


function BtnReturnToGuest() {
    let navigateToGuestMode = useNavigate(); 
     const routeChangeToGuest = () =>{ 
       navigateToGuestMode("/guest"); 
  }

  return (
   
      <button
        onClick={routeChangeToGuest}
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
        {/* Символ стрілки */}
        ←
      </button>
  )
}

export default BtnReturnToGuest