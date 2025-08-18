'use client';

import MainContent from './_components/MainContent';
import NavBar from './_components/NavBar';
import SignOutBtn from './_components/SignOutBtn';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <NavBar />
       <MainContent/>
    </div>
  )
}

export default Dashboard