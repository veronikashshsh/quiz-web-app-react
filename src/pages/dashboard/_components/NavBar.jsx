import React, { useState, useEffect } from 'react'
import BtnToMain from '../../_components/BtnToMain'
import SignOutBtn from './SignOutBtn'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
     const [user, setUser] = useState(null);
    const navigate = useNavigate();

useEffect(() => {
  console.log("Current user:", user);
}, [user]);

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

    const navigateToLearnPage = () => {
       if (user && user.displayName) {
            navigate(`/userquizarea/${user.displayName}`);
        } else {
        console.log("User not logged in yet or displayName missing");
        }
    }



  return (
    <div className='flex flex-col bg-slate-600 w-64 p-5 h-screen justify-between'>
        <button 
          className="md:hidden text-slate-200 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >

          <span className="text-3xl">&#9776;</span>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} md:block !mb-0`}>
            <h1 className="text-2xl font-bold mb-4 text-slate-200">Dashboard</h1>
            <p className='text-slate-200'>Welcome to your dashboard!</p>
            <p>Here you can manage your quizzes, view statistics, and more.</p>

            <div className='pt-10'>
                <h3 className=''>Main Menu</h3>

                <div className='ml-5'>
                    <div className='flex flex-row items-center mt-5 p-2 rounded-lg 
                         hover:bg-slate-200 hover:scale-[1.02] transition-all duration-200 ease-in-out'>
                        <img 
                        src="https://img.icons8.com/?size=100&id=101374&format=png&color=000000" 
                        alt="Learn icon" 
                        className='w-5 h-5 mr-3'
                        />
                        <a href='#'>Dashboard</a>
                    </div>

                    <div className='flex flex-row items-center mt-5 p-2 rounded-lg cursor-pointer
                         hover:bg-slate-200 hover:scale-[1.02] transition-all duration-200 ease-in-out'>
                       <button 
                        onClick={navigateToLearnPage} 
                        className="flex items-center mt-5 p-2 rounded-lg hover:bg-slate-200 hover:scale-[1.02] transition-all duration-200 ease-in-out"
                        >
                        <img src="" alt="Learn icon" className='w-5 h-5 mr-3'/>
                            Learn
                        </button>

                    </div>

                    <div className='flex flex-row items-center mt-5 p-2 rounded-lg 
                         hover:bg-slate-200 hover:scale-[1.02] transition-all duration-200 ease-in-out'>
                        <img 
                        src="https://img.icons8.com/?size=100&id=8309&format=png&color=000000" 
                        alt="Learn icon" 
                        className='w-5 h-5 mr-3'
                        />
                        <button href='#'>Review progress</button>
                    </div>
                </div>
            </div>
        </div>

        <div className='text-center m-5'>
            <SignOutBtn />
        </div>
    </div>

  )
}

export default NavBar