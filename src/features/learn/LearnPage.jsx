import React from 'react'
import NavBar from '../../components/Navbar'
import MainContent from '../dashboard/components/MainContent'
import QuizArea from './components/QuizArea'

const LearnPage = () => {
  return (
    <div className='flex h-screen bg-gray-100'>
        <NavBar />
        <div className='flex-1 p-2'>
       <QuizArea isGuest={false}/>
       </div>
    </div>
  )
}

export default LearnPage