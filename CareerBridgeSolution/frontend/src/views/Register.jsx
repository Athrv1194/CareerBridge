import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/dataService';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };
      
      const response = await registerUser(payload);
      // Route the user to login to proceed
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 register-container fluid-bg">
      <Card className="p-5 shadow-lg glass-card" style={{ width: '100%', maxWidth: '550px' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="register-title">Create Account</h2>
            <p className="text-muted">Join CareerBridge to kickstart your journey.</p>
          </div>
          
          {error && <Alert variant="danger" className="modern-alert">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 form-floating" controlId="formName">
              <Form.Control 
                type="text" 
                placeholder="John Doe" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="modern-input"
              />
              <label htmlFor="formName">Full Name</label>
            </Form.Group>

            <Form.Group className="mb-3 form-floating" controlId="formEmail">
              <Form.Control 
                type="email" 
                placeholder="name@example.com" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="modern-input"
              />
              <label htmlFor="formEmail">Email address</label>
            </Form.Group>

            <Form.Group className="mb-3 form-floating" controlId="formPassword">
              <Form.Control 
                type="password" 
                placeholder="Password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="modern-input"
              />
              <label htmlFor="formPassword">Password</label>
            </Form.Group>

            <Form.Group className="mb-4 form-floating" controlId="formRole">
              <Form.Select 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="modern-input"
              >
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
              </Form.Select>
              <label htmlFor="formRole">I am a...</label>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 register-btn mb-4" disabled={loading}>
              {loading ? 'Creating...' : 'Register Now'}
            </Button>
            
            <div className="text-center">
              <span className="text-muted">Already have an account? </span>
              <a href="/login" className="login-link">Sign In</a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
