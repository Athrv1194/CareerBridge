import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id === 'fullName' ? 'name' : id;
    if (fieldName in formData) {
      setFormData(prevState => ({
        ...prevState,
        [fieldName]: value
      }));
    }
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
      
      await registerUser(payload);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      {error && <div className="modern-alert" style={{position:'fixed', top:'20px', right:'20px', zIndex:999, background:'var(--danger)', color:'white', padding:'12px 24px', borderRadius:'8px'}}>{error}</div>}
      <div className="bg-field">
  <div className="grid-overlay"></div>
  <div className="blob blob1"></div>
  <div className="blob blob2"></div>
  <div className="blob blob3"></div>
</div>

<div className="page">

<header className="mini-header">
  <div className="inner">
    <Link to="/" className="logo"><span className="logo-mark"></span>CareerBridge</Link>
    <Link to="/" className="back-link">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back to home
    </Link>
  </div>
</header>

<div className="shell">

  {/*  ================= LEFT PANEL =================  */}
  <div className="left-panel">
    <span className="eyebrow"><span className="dot"></span>Join 12,000+ students</span>
    <h1>Build your future with <span className="grad">CareerBridge.</span></h1>
    <p className="lead">Join thousands of students building personalized career roadmaps, completing industry projects, and becoming placement ready through AI-powered guidance.</p>

    {/*  signature element: live readiness mockup  */}
    <div className="mockup-wrap">
      <div className="mockup-card">
        <div className="mockup-top">
          <div className="who">
            <div className="mockup-avatar">RP</div>
            <div>
              <div className="name">Riya Patil</div>
              <div className="role">B.Tech · Final Year</div>
            </div>
          </div>
          <div className="mockup-badge"><span className="pulse"></span>Live tracking</div>
        </div>

        <div className="mockup-score-row">
          <div className="score-ring">
            <svg width="74" height="74" viewBox="0 0 74 74">
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB"/>
                  <stop offset="100%" stopColor="#7C3AED"/>
                </linearGradient>
              </defs>
              <circle className="track" cx="37" cy="37" r="32" fill="none" stroke="var(--line)" strokeWidth="7"/>
              <circle className="fill" cx="37" cy="37" r="32" fill="none" stroke="url(#scoreGrad)" strokeWidth="7" strokeLinecap="round" strokeDasharray="201" strokeDashoffset="201" style={{transformOrigin: "center", transform: "rotate(-90deg)"}}/>
            </svg>
            <div className="pct">78%</div>
          </div>
          <div className="score-text">
            <div className="label">Placement Readiness</div>
            <div className="val">.NET Full Stack Developer</div>
            <div className="sub">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              +6% this week
            </div>
          </div>
        </div>

        <div className="mockup-bars">
          <div className="mbar-row"><span className="mlbl">Roadmap</span><div className="mbar-track"><div className="mbar-fill" style={{'width': '85%'}}></div></div><span className="mval">85%</span></div>
          <div className="mbar-row"><span className="mlbl">Projects</span><div className="mbar-track"><div className="mbar-fill" style={{'width': '60%'}}></div></div><span className="mval">60%</span></div>
          <div className="mbar-row"><span className="mlbl">Resume</span><div className="mbar-track"><div className="mbar-fill" style={{'width': '90%'}}></div></div><span className="mval">90%</span></div>
          <div className="mbar-row"><span className="mlbl">Mock Tests</span><div className="mbar-track"><div className="mbar-fill" style={{'width': '75%'}}></div></div><span className="mval">75%</span></div>
        </div>
      </div>

      <div className="float-chip fchip1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
        AI Match 93%
      </div>
      <div className="float-chip fchip2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Resume verified
      </div>
    </div>

    {/*  compact feature row  */}
    <div className="feature-row">
      <div className="feature-mini">
        <div className="fm-icon fi-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
        </div>
        <div>
          <div className="fm-text">AI Guidance</div>
          <div className="fm-sub">Personalized paths</div>
        </div>
      </div>
      <div className="feature-mini">
        <div className="fm-icon fi-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
        </div>
        <div>
          <div className="fm-text">Roadmaps</div>
          <div className="fm-sub">Step by step</div>
        </div>
      </div>
      <div className="feature-mini">
        <div className="fm-icon fi-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <div>
          <div className="fm-text">Placement Ready</div>
          <div className="fm-sub">Track readiness</div>
        </div>
      </div>
    </div>

    {/*  testimonial  */}
    <div className="testi-block">
      <span className="quote-mark">"</span>
      <div>
        <p>The readiness score finally gave me something concrete to chase — I knew exactly what to fix before placement season.</p>
        <div className="attrib">
          <div className="t-avatar">SD</div>
          <div>
            <div className="t-name">Sneha Deshmukh</div>
            <div className="t-role">MCA Student, placed at Infosys</div>
          </div>
        </div>
      </div>
    </div>

    <div className="stats-row">
      <div className="stat-mini"><div className="num">12,000+</div><div className="lbl">Students</div></div>
      <div className="stat-mini"><div className="num">250+</div><div className="lbl">Roadmaps</div></div>
      <div className="stat-mini"><div className="num">500+</div><div className="lbl">Projects</div></div>
      <div className="stat-mini"><div className="num">95%</div><div className="lbl">Placement Success</div></div>
    </div>

    <div className="companies-block">
      <div className="ctitle">Students working at</div>
      <div className="logo-scroll">
        <div className="logo-track">
          <span className="logo-chip">Microsoft</span>
          <span className="logo-chip">Google</span>
          <span className="logo-chip">Amazon</span>
          <span className="logo-chip">Infosys</span>
          <span className="logo-chip">TCS</span>
          <span className="logo-chip">Accenture</span>
          <span className="logo-chip">Oracle</span>
          <span className="logo-chip">Capgemini</span>
          <span className="logo-chip">Microsoft</span>
          <span className="logo-chip">Google</span>
          <span className="logo-chip">Amazon</span>
          <span className="logo-chip">Infosys</span>
          <span className="logo-chip">TCS</span>
          <span className="logo-chip">Accenture</span>
          <span className="logo-chip">Oracle</span>
          <span className="logo-chip">Capgemini</span>
        </div>
      </div>
    </div>
  </div>

  {/*  ================= RIGHT PANEL =================  */}
  <div className="right-panel">
    <div className="reg-card">
      <div className="reg-card-inner">

        {/*  FORM SCREEN  */}
        <div id="formScreen">
          <div className="form-head">
            <h2>Create your account</h2>
            <p>Let's begin your personalized career journey.</p>
          </div>

          <form id="regForm" noValidate onSubmit={handleSubmit}>

            {/*  Full Name  */}
            <div className="field">
              <div className="input-wrap">
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input type="text" id="fullName" placeholder=" " autoComplete="name" value={formData.name} onChange={handleChange} required />
                <label htmlFor="fullName">Full Name</label>
              </div>
              <div className="err-msg" id="err-fullName"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>Please enter your full name</span></div>
            </div>

            {/*  Email  */}
            <div className="field">
              <div className="input-wrap">
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                </span>
                <input type="email" id="email" placeholder=" " autoComplete="email" value={formData.email} onChange={handleChange} required />
                <label htmlFor="email">Email Address</label>
                <span className="field-right-ic"><span className="check-ok" id="emailCheck"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></span>
              </div>
              <div className="err-msg" id="err-email"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>Enter a valid email address</span></div>
            </div>

            {/*  Password  */}
            <div className="field">
              <div className="input-wrap">
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input type={showPassword ? "text" : "password"} id="password" placeholder=" " autoComplete="new-password" value={formData.password} onChange={handleChange} required />
                <label htmlFor="password">Password</label>
                <span className="field-right-ic">
                  <span className="toggle-pass" id="togglePass1" tabIndex="0" role="button" aria-label="Show password" onClick={() => setShowPassword(!showPassword)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </span>
                </span>
              </div>
              <div className="pass-meter" id="passMeter">
                <div className="meter-bar"><div className="meter-seg"></div><div className="meter-seg"></div><div className="meter-seg"></div><div className="meter-seg"></div></div>
                <div className="meter-label"><span id="strengthText">Weak</span><span className="req-hint">8+ chars, A-z, 0-9, symbol</span></div>
              </div>
              <div className="err-msg" id="err-password"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>Password is too weak</span></div>
            </div>

            {/*  Confirm Password  */}
            <div className="field">
              <div className="input-wrap">
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input type="password" id="confirmPassword" placeholder=" " autoComplete="new-password" />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <span className="field-right-ic">
                  <span className="check-ok" id="matchCheck"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                  <span className="toggle-pass" id="togglePass2" tabIndex="0" role="button" aria-label="Show password">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </span>
                </span>
              </div>
              <div className="err-msg" id="err-confirmPassword"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>Passwords don't match</span></div>
            </div>

            {/*  Education  */}
            <div className="field">
              <div className="input-wrap">
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>
                </span>
                <select id="education">
                  <option value="" disabled selected></option>
                  <option>BCA</option>
                  <option>BSc IT</option>
                  <option>BE</option>
                  <option>B.Tech</option>
                  <option>MCA</option>
                  <option>Diploma</option>
                  <option>Other</option>
                </select>
                <label htmlFor="education">Education</label>
                <svg className="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div className="err-msg" id="err-education"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>Please select your education</span></div>
            </div>

            {/*  Academic Year  */}
            <div className="field">
              <div className="input-wrap">
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <select id="academicYear">
                  <option value="" disabled selected></option>
                  <option>First Year</option>
                  <option>Second Year</option>
                  <option>Third Year</option>
                  <option>Final Year</option>
                  <option>Graduate</option>
                </select>
                <label htmlFor="academicYear">Current Academic Year</label>
                <svg className="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            {/*  Career Interest  */}
            <div className="field">
              <span className="field-label-static">Career Interest</span>
              <div className="career-grid" id="careerGrid">
                <div className={`career-card ${formData.careerInterest === 'dotnet' ? 'selected' : ''}`} onClick={() => setFormData({...formData, careerInterest: 'dotnet'})}>
                  <div className="cc-icon">🔷</div><div className="cc-title">.NET Developer</div>
                  <div className="cc-meta">6 mo · 32 skills<br />18 projects</div>
                </div>
                <div className={`career-card ${formData.careerInterest === 'java' ? 'selected' : ''}`} onClick={() => setFormData({...formData, careerInterest: 'java'})}>
                  <div className="cc-icon">☕</div><div className="cc-title">Java Full Stack</div>
                  <div className="cc-meta">7 mo · 38 skills<br />20 projects</div>
                </div>
                <div className={`career-card ${formData.careerInterest === 'frontend' ? 'selected' : ''}`} onClick={() => setFormData({...formData, careerInterest: 'frontend'})}>
                  <div className="cc-icon">🎨</div><div className="cc-title">Frontend Dev</div>
                  <div className="cc-meta">5 mo · 26 skills<br />16 projects</div>
                </div>
                <div className={`career-card ${formData.careerInterest === 'backend' ? 'selected' : ''}`} onClick={() => setFormData({...formData, careerInterest: 'backend'})}>
                  <div className="cc-icon">⚙️</div><div className="cc-title">Backend Dev</div>
                  <div className="cc-meta">6 mo · 30 skills<br />17 projects</div>
                </div>
                <div className={`career-card ${formData.careerInterest === 'data' ? 'selected' : ''}`} onClick={() => setFormData({...formData, careerInterest: 'data'})}>
                  <div className="cc-icon">📊</div><div className="cc-title">Data Analyst</div>
                  <div className="cc-meta">4 mo · 22 skills<br />12 projects</div>
                </div>
                <div className={`career-card ${formData.careerInterest === 'ai' ? 'selected' : ''}`} onClick={() => setFormData({...formData, careerInterest: 'ai'})}>
                  <div className="cc-icon">🤖</div><div className="cc-title">AI Engineer</div>
                  <div className="cc-meta">8 mo · 40 skills<br />22 projects</div>
                </div>
                <div className={`career-card ${formData.careerInterest === 'cloud' ? 'selected' : ''}`} onClick={() => setFormData({...formData, careerInterest: 'cloud'})}>
                  <div className="cc-icon">☁️</div><div className="cc-title">Cloud Engineer</div>
                  <div className="cc-meta">7 mo · 28 skills<br />15 projects</div>
                </div>
                <div className={`career-card ${formData.careerInterest === 'security' ? 'selected' : ''}`} onClick={() => setFormData({...formData, careerInterest: 'security'})}>
                  <div className="cc-icon">🛡️</div><div className="cc-title">Cyber Security</div>
                  <div className="cc-meta">6 mo · 25 skills<br />14 projects</div>
                </div>
                <div className={`career-card ${formData.careerInterest === 'devops' ? 'selected' : ''}`} onClick={() => setFormData({...formData, careerInterest: 'devops'})}>
                  <div className="cc-icon">🔁</div><div className="cc-title">DevOps</div>
                  <div className="cc-meta">6 mo · 27 skills<br />15 projects</div>
                </div>
              </div>
              <div className="err-msg" id="err-career"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>Pick a career interest to continue</span></div>
            </div>

            {/*  Location  */}
            <div className="field">
              <div className="input-wrap">
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <input type="text" id="location" placeholder=" " autoComplete="off" />
                <label htmlFor="location">Preferred Job Location</label>
                <div className="autoComplete-list" id="acList"></div>
              </div>
              <div className="err-msg" id="err-location"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>Tell us your preferred location</span></div>
            </div>

            {/*  Terms  */}
            <div className="terms-block">
              <label className="chk-row">
                <input type="checkbox" id="agreeTerms" />
                <span className="chk-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span className="chk-text">I agree to the <Link to="#">Terms &amp; Conditions</Link> and <Link to="#">Privacy Policy</Link></span>
              </label>
              <label className="chk-row">
                <input type="checkbox" id="agreeUpdates" checked />
                <span className="chk-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span className="chk-text">Send me career guidance updates and placement opportunities</span>
              </label>
              <div className="err-msg" id="err-terms"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>You must accept the Terms &amp; Conditions</span></div>
            </div>

            <button type="submit" className={`btn-submit ${loading ? "loading" : ""}`} id="submitBtn" disabled={loading}>
              <span className="btn-label">Create Free Account</span>
              <span className="spinner"></span>
            </button>
          </form>

          <div className="divider"><span>OR</span></div>

          <div className="social-row-form">
            <button className="btn-social" type="button">
              <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
              Continue with Google
            </button>
            <button className="btn-social" type="button">
              <svg viewBox="0 0 24 24" fill="#0F172A"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.74.11 3.03.74.8 1.18 1.83 1.18 3.08 0 4.4-2.69 5.37-5.25 5.66.41.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z"/></svg>
              Continue with GitHub
            </button>
          </div>

          <div className="signin-row">Already have an account? <Link to="#">Sign In</Link></div>
        </div>

        {/*  SUCCESS SCREEN  */}
        <div className="success-screen" id="successScreen">
          <div className="success-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2>🎉 Welcome to CareerBridge!</h2>
          <p>Your personalized career journey starts today. Let's find out exactly where you stand.</p>
          <Link to="#" className="btn-continue">
            Continue to Career Assessment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

      </div>
    </div>
  </div>

</div>
</div>
    </div>
  );
};

export default Register;
