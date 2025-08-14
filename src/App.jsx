import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import MainSite from './pages/mainPage/MainSite.jsx'
import GuestMode from './pages/Guest/GuestMode.jsx'
import QuizEditor from './pages/Guest/_components/QuizEditor.jsx';
import LearnCards from './pages/Guest/_components/learnCards.jsx';
import SignIn from './pages/auth/SignIn.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import UserQuizArea from './pages/dashboard/_components/UserQuizArea.jsx';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/guest" element={<GuestMode />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard/:name" element={< Dashboard/>} />
         <Route path="/quiz/edit/:quizName" element={<QuizEditor />} />
         <Route path="/quiz/:quizName" element={<LearnCards />} />

        <Route path="/userquizarea/:name" element={<UserQuizArea />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
