import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const location = useLocation();
  if (['/', '/login', '/register', '/onboarding', '/assessment', '/recommendation', '/roadmap', '/student-dashboard', '/features'].includes(location.pathname)) {
    return null;
  }

  // Check if token exists to render the logout button
  const isAuthenticated = !!localStorage.getItem('token') || !!user;

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <span className="logo-mark"></span>CareerBridge
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {isAuthenticated && (
            <Button variant="outline-danger" onClick={handleLogout} className="fw-semibold px-4 rounded-pill">
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
