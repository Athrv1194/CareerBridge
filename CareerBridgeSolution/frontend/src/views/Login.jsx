import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/dataService';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Update application context

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
        email: formData.email,
        password: formData.password
      };
      
      const response = await loginUser(payload);
      
      // Extract valid JWT token string (handling both typical .NET property names)
      const token = response.data?.token || response.data?.tokenString; 
      
      if (token) {
        // Pass it directly to AuthContext to update the user's status
        login(token);
        // Trigger a route transition to /dashboard
        navigate('/dashboard');
      } else {
        throw new Error('Invalid authentication token received from Alpha endpoint.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 login-container">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="p-4 p-sm-5 shadow-lg glass-card login-card">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="login-title">Welcome Back</h2>
                <p className="text-muted">Sign in to continue your progress.</p>
              </div>
              
              {error && <Alert variant="danger" className="modern-alert">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4 form-floating" controlId="formEmail">
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

                <Form.Group className="mb-4 form-floating" controlId="formPassword">
                  <Form.Control 
                    type="password" 
                    placeholder="Password mask string" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="modern-input"
                  />
                  <label htmlFor="formPassword">Password</label>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 login-btn mb-4" disabled={loading}>
                  {loading ? 'Authenticating...' : 'Sign In'}
                </Button>
                
                <div className="text-center mt-2">
                  <span className="text-muted">New here? </span>
                  <a href="/register" className="register-link">Create an account</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
