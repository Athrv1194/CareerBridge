import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await loginUser(formData);
      login(response.data.token, response.data.user);
      navigate('/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {error && <div className="modern-alert" style={{position:'fixed', top:'20px', right:'20px', zIndex:999, background:'var(--danger)', color:'white', padding:'12px 24px', borderRadius:'8px'}}>{error}</div>}
      <div className="bg-field">
  <div className="grid-overlay"></div>
  <div className="blob blob1"></div>
  <div className="blob blob2"></div>
  <div className="blob blob3"></div>
</div>

<header className="mini-header">
  <div className="inner">
    <Link to="/" className="logo"><span className="logo-mark"></span>CareerBridge</Link>
    <Link to="/" className="back-link">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back to home
    </Link>
  </div>
</header>

<div className="page">

  {/*  LEFT: BRANDING  */}
  <div className="brand-side">
    <div className="brand-content">
      <span className="eyebrow"><span className="dot"></span>AI-Powered Career Guidance Platform</span>
      <h1>Welcome back to your <span className="grad">career journey.</span></h1>
      <p className="lead">Continue your personalized roadmap, track your placement readiness, and pick up exactly where you left off.</p>

      <div className="hero-visual">
        <div className="route-card">
          <svg className="route-svg" viewBox="0 0 420 280" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="routeGradientLogin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB"/>
                <stop offset="55%" stopColor="#7C3AED"/>
                <stop offset="100%" stopColor="#06B6D4"/>
              </linearGradient>
            </defs>
            <path className="route-path" stroke="#7C3AED" fill="none" strokeWidth="4" d="M 50 60 C 120 60, 90 140, 170 150 C 250 160, 220 220, 320 220" />

            <g className="route-dot" style={{'animationDelay': '.4s'}}>
              <circle className="route-node" cx="50" cy="60" r="8" fill="#2563EB"/>
              <text className="node-label" x="64" y="56" style={{'animationDelay': '.5s'}}>Your roadmap</text>
            </g>

            <g className="route-dot" style={{'animationDelay': '.9s'}}>
              <circle className="route-node" cx="170" cy="150" r="8" fill="#7C3AED"/>
              <text className="node-label" x="184" y="146" style={{'animationDelay': '1.0s'}}>In progress</text>
            </g>

            <g className="route-dot" style={{'animationDelay': '1.4s'}}>
              <circle className="route-node" cx="320" cy="220" r="12" fill="#06B6D4"/>
              <circle cx="320" cy="220" r="12" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.4">
                <animate attributeName="r" values="12;20;12" dur="2.4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite"/>
              </circle>
              <text className="node-label strong" x="282" y="248" style={{'animationDelay': '1.5s'}}>Placement ready</text>
            </g>
          </svg>

          <div className="float-card fc1"><span className="ic">📈</span>Readiness 83%</div>
          <div className="float-card fc2"><span className="ic">✓</span>3 skills verified</div>
        </div>
      </div>

      <div className="brand-stats">
        <div className="bstat"><span className="num">12K+</span><span className="lbl">Students</span></div>
        <div className="bstat"><span className="num">250+</span><span className="lbl">Roadmaps</span></div>
        <div className="bstat"><span className="num">95%</span><span className="lbl">Readiness success</span></div>
      </div>
    </div>
  </div>

  {/*  RIGHT: FORM  */}
  <div className="form-side">

    <div className="auth-card">
      <div className="auth-head">
        <h2>Welcome back 👋</h2>
        <p>Sign in to continue your learning journey.</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <div className="input-wrap">
            <span className="icon">✉️</span>
            <input id="email" type="email" placeholder="Email address" autoComplete="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <div className="input-wrap">
            <span className="icon">🔒</span>
            <input id="password" type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="current-password" value={formData.password} onChange={handleChange} required />
            <span className="toggle-pw" id="togglePw" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>
          </div>
        </div>

        <div className="field-meta">
          <label className="remember"><input type="checkbox" />Remember me</label>
          <Link to="#" className="forgot">Forgot password?</Link>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
      </form>

      <div className="divider">OR CONTINUE WITH</div>
      <div className="social-row">
        <button className="btn-social">
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button className="btn-social">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          GitHub
        </button>
      </div>

      <div className="benefits">
        <div className="benefit-chip"><div className="bi">🎯</div><div className="bt">AI Career Guidance</div></div>
        <div className="benefit-chip"><div className="bi">🗺️</div><div className="bt">Personal Roadmaps</div></div>
        <div className="benefit-chip"><div className="bi">📊</div><div className="bt">Readiness Analytics</div></div>
      </div>

      <div className="security-banner">🔒 Protected with enterprise-grade encryption &amp; secure sessions.</div>

      <div className="switch-line">
        Don't have an account? <Link to="/register">Create free account <span className="arrow">→</span></Link>
      </div>
    </div>
  </div>

</div>
    </div>
  );
};

export default Login;
