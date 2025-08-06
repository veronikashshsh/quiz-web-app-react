import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import MainSite from './mainPage/MainSite.jsx'
import GuestMode from './Guest/GuestMode.jsx'
import QuizEditor from './Guest/_components/QuizEditor.jsx';
import LearnCards from './Guest/_components/learnCards.jsx';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/guest" element={<GuestMode />} />
         <Route path="/quiz/edit/:quizName" element={<QuizEditor />} />
         <Route path="/quiz/:quizName" element={<LearnCards />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
