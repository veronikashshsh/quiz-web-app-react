import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { getRedirectResult } from 'firebase/auth';
import { auth } from '../../config/firebase.js';
import MainSite from '../features/main/MainSite.tsx';
import GuestMode from '../features/guest/GuestMode.tsx';
import Dashboard from '../features/dashboard/Dashboard.tsx';
import QuizEditor from '../components/Learn/QuizEditor.tsx';
import LearnCards from '../components/Learn/LearnCards.tsx';
import LearnPage from '../features/learn/LearnPage.tsx';
import StatsPage from '../features/stats/StatsPage.tsx';
import SettingsPage from '../features/settings/SettingsPage.tsx';
import AppLayout from '../layouts/AppLayout.tsx';
import GuestLayout from '../layouts/GuestLayout.tsx';


const AppRoutes: React.FC = () => {
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
      <Route element={<GuestLayout />} >
        <Route path="/" element={<MainSite />} />
        <Route path="/login" element={<MainSite initialModal="signin" />} />
        <Route path="/register" element={<MainSite initialModal="signup" />} />
      
        <Route path="/guest" element={<GuestMode />} />
        <Route path="/guest/quiz/:quizName" element={<LearnCards forcedGuest />} />
      </Route>

       <Route element={<AppLayout />}>
        <Route path="/dashboard/:name" element={<Dashboard  isGuest={false}/>} />
        <Route path="/quiz/edit/:quizName" element={<QuizEditor />} />
        <Route path="/quiz/:quizId" element={<LearnCards />} />
        <Route path="/userquizarea/:name" element={<LearnPage />} />
        <Route path="/stats/:name" element={<StatsPage />} />
        <Route path="/settings/:name" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;