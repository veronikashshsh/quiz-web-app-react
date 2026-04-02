import React from 'react'
import NavBar from '../../components/Navbar'
import MainContent from '../dashboard/components/MainContent'
import QuizArea from './components/QuizArea'

const LearnPage = () => {
  return (
    <div className='flex'>
      <div className='w-64'>
        <NavBar />
        </div>
        <div className='flex-1'>
       <QuizArea isGuest={false}/>
       </div>
    </div>
  )
}

export default LearnPage