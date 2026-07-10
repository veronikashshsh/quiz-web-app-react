'use client';

import MainContent from '../../components/Dashboard/MainContent';
import NavBar from '../../components/General/NavBar';


const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <NavBar />
      <div className='flex-1 p-2'>
       <MainContent isGuest={false}/>
       </div>
    </div>
  )
}

export default Dashboard
