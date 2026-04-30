import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { getRedirectResult } from 'firebase/auth';
import { auth } from '../../config/firebase.js';
import MainSite from '../features/main/MainSite.jsx';
import GuestMode from '../features/guest/GuestMode.jsx';
import QuizEditor from '../features/learn/components/QuizEditor.jsx';
import LearnCards from '../features/learn/components/LearnCards.jsx';
import Dashboard from '../features/dashboard/Dashboard.jsx';
import LearnPage from '../features/learn/LearnPage.jsx';
import StatsPage from '../features/stats/StatsPage.jsx';
import SettingsPage from '../features/settings/SettingsPage.jsx';

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          navigate(`/dashboard/${result.user.displayName}`);
        }
      })
      .catch((err) => {
        console.error('Redirect result error:', err);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/guest" element={<GuestMode />} />
      <Route path="/login" element={<MainSite initialModal="signin" />} />
      <Route path="/register" element={<MainSite initialModal="signup" />} />
      <Route path="/dashboard/:name" element={<Dashboard />} />
      <Route path="/quiz/edit/:quizName" element={<QuizEditor />} />
      <Route path="/quiz/:quizName" element={<LearnCards />} />
      <Route path="/userquizarea/:name" element={<LearnPage />} />
      <Route path="/stats/:name" element={<StatsPage />} />
      <Route path="/settings/:name" element={<SettingsPage />} />
    </Routes>
  );
}

export default AppRoutes;