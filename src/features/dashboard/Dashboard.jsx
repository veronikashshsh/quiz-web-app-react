'use client';

import NavBar from '../../components/Navbar'
import MainContent from './components/MainContent';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <NavBar />
      <div className='flex-1 p-2'>
       <MainContent/>
       </div>
    </div>
  )
}

export default Dashboard
