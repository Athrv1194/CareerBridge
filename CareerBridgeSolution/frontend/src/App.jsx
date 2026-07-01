import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './views/Login';
import Register from './views/Register';
import Onboarding from './views/Onboarding';
import CareerAssessment from './views/CareerAssessment';
import Dashboard from './views/Dashboard';
import LandingPage from './views/LandingPage';
import AppNavbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/assessment" element={<CareerAssessment />} />
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
