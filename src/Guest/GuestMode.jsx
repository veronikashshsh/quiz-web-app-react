import React from 'react'
import Header from '../mainPage/_components/Header'
import { useNavigate } from "react-router-dom";
import QuizArea from './_components/QuizArea';

function GuestMode() {
     let navigateToMainPage = useNavigate(); 
     const routeChangeToMain = () =>{ 
       navigateToMainPage("/"); 
  }



  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
    <Header />

    <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-0 m-6 md:m-10 px-4 md:px-0">
      
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

      <div className="flex flex-col items-center md:items-start space-y-1 max-w-xl text-center md:text-left">
        <h3 className="text-lg font-semibold">
          You are in Guest Mode
        </h3>
        <h4 className="text-sm text-gray-600 dark:text-gray-400">
          To save all your progress create an account
        </h4>
      </div>
    </div>
   <hr className="border-t border-gray-600 my-4" />


    {/* Основна зона з вікториною */}
    <div className="flex-grow px-4 md:px-10">
      <QuizArea />
    </div>
  </div>
)
}

export default GuestMode