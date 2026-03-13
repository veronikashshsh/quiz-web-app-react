import React, { useState, useEffect } from 'react'
import BtnToMain from './BtnToMain'
import SignOutBtn from '../features/auth/SignOutBtn'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LogOut } from 'lucide-react';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
     const [activeItem, setActiveItem] = useState('Dashboard')
    const navigate = useNavigate();

    const navigateToLearnPage = () => {
       if (user && user.displayName) {
            navigate(`/userquizarea/${auth.currentUser.displayName}`);
        } else {
        console.log("User not logged in yet or displayName missing");
        }
    }

    const navigateToDashboard = () => {
       if (user && user.displayName) {
           navigate(`/dashboard/${auth.currentUser.displayName}`);
        } else {
        console.log("User not logged in yet or displayName missing");
        }
    }


      const menuItems = [
    {
      name: 'Dashboard',
      icon: 'https://img.icons8.com/?size=100&id=101374&format=png&color=000000',
      onClick: navigateToDashboard
    },
    {
      name: 'Quizzes',
      icon: 'https://img.icons8.com/?size=100&id=85500&format=png&color=000000',
      onClick: navigateToLearnPage
    },
    {
      name: 'Statistics',
      icon: 'https://img.icons8.com/?size=100&id=43623&format=png&color=000000',
      onClick: navigateToLearnPage
    },
    {
      name: 'Settings',
      icon: 'https://img.icons8.com/?size=100&id=2969&format=png&color=000000',
      onClick: navigateToLearnPage
    }
  ]

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if (currentUser) {
        setUsername(currentUser.displayName || " ");
      } else {
        setUsername("");
      }
  });
  return () => unsubscribe();
}, []);







  return (
    <div>
      <button 
             className={`md:hidden text-gray-900 focus:outline-none mb-4 ${isOpen ? 'hidden' : ''}`}
             onClick={()=> setIsOpen(true)}
          >
            <span className="text-3xl">&#9776;</span>
          </button>
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-30 transition-transform duration-300 ease-in-out`}>
      <div className='flex flex-col bg-slate-600 w-64 p-5 h-screen justify-between'>
        <div>
          <button 
            className="md:hidden text-slate-200 focus:outline-none mb-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-3xl">&#9776;</span>
          </button>

          <div className="mb-0">
            <h1 className="text-2xl font-bold mb-4 text-slate-200">Dashboard</h1>
            <p className='text-slate-200 mb-2'>Welcome to your dashboard!</p>
            <p className='text-slate-300 text-sm mb-8'>Here you can manage your quizzes, view statistics, and more.</p>

            <div className='pt-2'>
              <h3 className='text-slate-300 font-semibold mb-4'>Main Menu</h3>

              <div className='ml-2'>
                {menuItems.map((item) => (
                  <div 
                    key={item.name}
                    className={`flex flex-row items-center mt-3 p-3 rounded-lg cursor-pointer
                             hover:bg-slate-500 hover:scale-[1.02] transition-all duration-200 ease-in-out
                             ${activeItem === item.name ? 'bg-slate-500 scale-[1.02]' : ''}`}
                    onClick={item.onClick} 
                  >
                    <img 
                      src={item.icon} 
                      alt={`${item.name} icon`} 
                      className='w-5 h-5 mr-3 filter brightness-0 invert'
                    />
                    <a href={item.href} className='text-slate-200 hover:text-white font-medium'>
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-slate-500 pt-4 flex flex-row gap-10'>
         
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-slate-400 rounded-full mr-3'></div>
            <div>
              <p className='text-slate-200 text-sm font-medium'>User: {username}</p>
              
            </div>
          </div>
           <SignOutBtn />
        </div>
        
      </div>
    </div>
</div>
  )
}

export default NavBar