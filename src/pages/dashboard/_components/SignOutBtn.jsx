'use client';

import { auth } from '../../../../config/firebase'; // Adjust the path based on your file structure
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const SignOutBtn = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
}

  return (
  <div>
    <button onClick={handleSignOut} 
    className='px-4 py-2 bg-red-500 text-white rounded
     hover:bg-red-700 hover:scale-[1.02] transition-all duration-200 ease-in-out'>
    Sign Out</button>
  </div>
  );
};

export default SignOutBtn;


