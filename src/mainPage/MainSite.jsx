import React from 'react'
import Header from './_components/Header'
import { useNavigate } from "react-router-dom";

function MainSite() {

    let navigateToGuestMode = useNavigate(); 
     const routeChangeToGuest = () =>{ 
       navigateToGuestMode("/guest"); 
  }


  return (
   <>
   <Header/>
   <div className='m-10 flex items-center flex-col p-10'>
    <h1 className="text-[#4E5174] text-[48px] text-center">Learn effictinelly with EFFLearn<br/>
    Structure, remind, do best</h1>

   <button
  onClick={routeChangeToGuest}
  type="button"
  className="
    px-6 py-3
    my-10
    bg-white dark:bg-gray-800
    text-[#959EC9] dark:text-[#b0b8d6]
    rounded-lg
    shadow-md
    hover:bg-gray-200 dark:hover:bg-gray-700
    transition-colors duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
    active:scale-95
    "
  aria-label="Use as a Guest"
>
  Use as a Guest
</button>
   </div>

   <div className=''>

   </div>
   <footer>

   </footer>
   </>
  )
  }

export default MainSite