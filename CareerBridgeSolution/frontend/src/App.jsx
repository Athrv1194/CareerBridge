import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './views/Login';
import Register from './views/Register';
import Onboarding from './views/Onboarding';
import CareerAssessment from './views/CareerAssessment';
import CareerRecommendation from './views/CareerRecommendation';
import CareerRoadmap from './views/CareerRoadmap';
import Dashboard from './views/Dashboard';
import StudentDashboard from './views/StudentDashboard';
import LandingPage from './views/LandingPage';
import AppNavbar from './components/Navbar';
import FeaturesPage from './views/FeaturesPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/assessment" element={<CareerAssessment />} />
        <Route path="/recommendation" element={<CareerRecommendation />} />
        <Route path="/roadmap" element={<CareerRoadmap />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
