import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FeaturesPage.css';

const FeaturesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Header scroll effect
        const handleScroll = () => {
            const header = document.getElementById('siteHeader');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 20);
            }
            
            // Fade-in animation
            const fadeElems = document.querySelectorAll('.fade-in');
            fadeElems.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isVisible = (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85);
                if (isVisible) {
                    el.classList.add('in-view');
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll);
        // Initial trigger
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
        }
    };

    return (
        <div className="features-wrapper shell-wrapper">


<div className="bg-field"><div className="grid-overlay"></div><div className="blob blob1"></div><div className="blob blob2"></div><div className="blob blob3"></div><div className="blob blob4"></div></div>

{/* HEADER */}
<header id="siteHeader">
  <div className="container nav-row">
    <Link to="#" className="logo"><span className="logo-mark"></span>CareerBridge</Link>
    <nav className="main-nav">
      <Link to="/">Home</Link>
      <Link to="/features" className="active">Features</Link>
      <a href="/#paths">Career Paths</a>
      <a href="/#showcase">Projects</a>
      <a href="/#how">Assessments</a>
      <a href="/#mentors">Mentors</a>
      <a href="/#footer">About</a>
      <Link to="/features#final-cta">Contact</Link>
    </nav>
    <div className="nav-right">
      <button className="icon-btn" id="themeToggle" onClick={toggleTheme}>🌙</button>
      <Link to="#" className="btn btn-ghost">Login</Link>
      <Link to="/features#final-cta" className="btn btn-primary">Start Free</Link>
    </div>
  </div>
</header>

{/* SECTION 1: HERO */}
<section className="hero" id="hero">
  <div className="container hero-grid">
    <div className="fade-in">
      <span className="eyebrow">✨ Features</span>
      <h1>Everything You Need to Become <span className="grad">Placement Ready.</span></h1>
      <p className="lead">CareerBridge combines career guidance, AI, roadmaps, projects, assessments, and analytics into one intelligent platform.</p>
      <div className="hero-ctas">
        <Link to="/features#final-cta" className="btn btn-primary">Start Free →</Link>
        <Link to="/features#ai-assistant" className="btn btn-ghost">▶ Watch Demo</Link>
      </div>
      <div className="avatar-row">
        <div className="avatar-stack">
          <span style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)" }}>A</span>
          <span style={{ background: "linear-gradient(135deg,#7C3AED,#A78BFA)" }}>S</span>
          <span style={{ background: "linear-gradient(135deg,#06B6D4,#22D3EE)" }}>R</span>
          <span style={{ background: "linear-gradient(135deg,#F59E0B,#FBBF24)" }}>+</span>
        </div>
        <span className="txt">Join 10,000+ students building their future</span>
      </div>
    </div>

    <div className="hero-visual fade-in">
      <div className="float-chip c1"><div className="l">AI Score</div><div className="v">82/100</div></div>
      <div className="float-chip c2"><div className="l">Skills Tracked</div><div className="v">120+</div></div>
      <div className="mock-window">
        <div className="mock-topbar"><div className="mock-dots"><span></span><span></span><span></span></div><div className="mock-title">Welcome back, Akash 👋</div><div></div></div>
        <div className="mock-stats">
          <div className="mock-stat"><div className="n" style={{ color: "var(--success)" }}>82%</div><div className="l">Placement</div></div>
          <div className="mock-stat"><div className="n" style={{ color: "var(--primary)" }}>68%</div><div className="l">Roadmap</div></div>
          <div className="mock-stat"><div className="n" style={{ color: "var(--warning)" }}>24</div><div className="l">Day Streak</div></div>
        </div>
        <div className="mock-row"><div className="ic" style={{ background: "linear-gradient(135deg,var(--primary),var(--secondary))" }}>💻</div><div className="txt"><div className="t1">Recommended Project</div><div className="t2">E-commerce Web App</div></div></div>
        <div className="mock-row"><div className="ic" style={{ background: "linear-gradient(135deg,var(--accent),#22D3EE)" }}>📝</div><div className="txt"><div className="t1">Upcoming Assessment</div><div className="t2">React Advanced Test</div></div></div>
      </div>
    </div>
  </div>
</section>

{/* SECTION 2: WHY CAREERBRIDGE */}
<section className="why-sec" id="why">
  <div className="container">
    <div className="sec-head fade-in">
      <span className="sec-tag">The Problem</span>
      <h2>Stop Learning Randomly</h2>
      <p>Most students juggle dozens of tutorials with no clear direction. CareerBridge solves all of that with one personalized platform.</p>
    </div>
    <div className="why-grid">
      <div className="why-card why-bad fade-in">
        <h3>😵 Students Struggle With</h3>
        <div className="sub">Scattered learning, no clarity, no outcomes.</div>
        <div className="why-list">
          <div className="why-item"><span className="mk">✕</span>No learning direction</div>
          <div className="why-item"><span className="mk">✕</span>No structured roadmap</div>
          <div className="why-item"><span className="mk">✕</span>No project guidance</div>
          <div className="why-item"><span className="mk">✕</span>No progress tracking</div>
          <div className="why-item"><span className="mk">✕</span>No placement preparation</div>
        </div>
      </div>
      <div className="why-card why-good fade-in">
        <h3>✅ We Solve All of These</h3>
        <div className="sub">One personalized platform for your entire journey.</div>
        <div className="why-list">
          <div className="why-item"><span className="mk">✓</span>Personalized learning paths</div>
          <div className="why-item"><span className="mk">✓</span>Structured roadmaps</div>
          <div className="why-item"><span className="mk">✓</span>Industry projects</div>
          <div className="why-item"><span className="mk">✓</span>Progress tracking</div>
          <div className="why-item"><span className="mk">✓</span>Placement preparation</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* SECTION 3: CORE FEATURES */}
<section className="features-sec" id="core-features">
  <div className="container">
    <div className="sec-head fade-in">
      <span className="sec-tag">Core Features</span>
      <h2>Built for Every Step of Your Journey</h2>
      <p>Every module works together — from your first assessment to your first offer letter.</p>
    </div>
    <div className="feat-grid">
      <Link to="/features#hero" className="feat-card fade-in" data-target="hero">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,var(--primary),var(--secondary))" }}>🧠</div>
        <h4>AI Career Recommendation</h4><p>Get AI-powered career suggestions based on your skills, interests &amp; goals.</p>
      </Link>
      <Link to="/features#dashboard-preview" className="feat-card fade-in">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,#3B82F6,var(--primary))" }}>🛣️</div>
        <h4>Personalized Learning Roadmap</h4><p>A step-by-step roadmap tailored to your current skill level.</p>
      </Link>
      <Link to="/features#dashboard-preview" className="feat-card fade-in">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,var(--success),#16A34A)" }}>📈</div>
        <h4>Skill Progress Tracking</h4><p>Track your learning progress with smart analytics and verification.</p>
      </Link>
      <Link to="/features#workflow" className="feat-card fade-in">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,var(--warning),#D97706)" }}>💼</div>
        <h4>Industry Projects</h4><p>Build real-world projects and strengthen your portfolio.</p>
      </Link>
      <Link to="/features#workflow" className="feat-card fade-in">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,var(--secondary),#A78BFA)" }}>📝</div>
        <h4>Mock Assessments</h4><p>Take role-based mock tests and identify your weak areas.</p>
      </Link>
      <Link to="/features#resume-analysis" className="feat-card fade-in">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,var(--accent),#22D3EE)" }}>📄</div>
        <h4>Resume Gap Analysis</h4><p>Find missing skills in your resume and get suggestions.</p>
      </Link>
      <Link to="/features#placement-readiness" className="feat-card fade-in">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,#F59E0B,#FBBF24)" }}>🎯</div>
        <h4>Placement Readiness Score</h4><p>A real-time score that shows how ready you are for placements.</p>
      </Link>
      <Link to="/features#workflow" className="feat-card fade-in">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,#EF4444,#F87171)" }}>🏢</div>
        <h4>Internship Recommendations</h4><p>Get personalized internship recommendations matching your profile.</p>
      </Link>
      <Link to="/features#hero" className="feat-card fade-in">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,var(--primary),#3B82F6)" }}>👨‍🏫</div>
        <h4>Mentor Guidance</h4><p>Connect with mentors and get expert career guidance and feedback.</p>
      </Link>
      <Link to="/features#ai-assistant" className="feat-card fade-in">
        <div className="feat-ic" style={{ background: "linear-gradient(135deg,var(--secondary),var(--accent))" }}>🤖</div>
        <h4>AI Career Assistant</h4><p>Your 24/7 AI assistant for doubts, guidance &amp; career advice.</p>
      </Link>
    </div>
  </div>
</section>

{/* SECTION 4: WORKFLOW */}
<section className="flow-sec" id="workflow">
  <div className="container">
    <div className="sec-head fade-in">
      <span className="sec-tag">The Journey</span>
      <h2>Your Journey With CareerBridge</h2>
      <p>One connected path from profile to placement.</p>
    </div>
    <div className="flow-track fade-in">
      <div className="flow-node"><div className="flow-dot" style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)" }}>1</div><div className="lbl">Profile</div></div>
      <div className="flow-node"><div className="flow-dot" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)" }}>📋</div><div className="lbl">Assessment</div></div>
      <div className="flow-node"><div className="flow-dot" style={{ background: "linear-gradient(135deg,var(--success),#16A34A)" }}>🎯</div><div className="lbl">Career Match</div></div>
      <div className="flow-node"><div className="flow-dot" style={{ background: "linear-gradient(135deg,var(--accent),#22D3EE)" }}>🛣️</div><div className="lbl">Roadmap</div></div>
      <div className="flow-node"><div className="flow-dot" style={{ background: "linear-gradient(135deg,var(--warning),#D97706)" }}>💼</div><div className="lbl">Projects</div></div>
      <div className="flow-node"><div className="flow-dot" style={{ background: "linear-gradient(135deg,var(--secondary),#A78BFA)" }}>📝</div><div className="lbl">Mock Test</div></div>
      <div className="flow-node"><div className="flow-dot" style={{ background: "linear-gradient(135deg,#7C3AED,#2563EB)" }}>📄</div><div className="lbl">Resume</div></div>
      <div className="flow-node"><div className="flow-dot" style={{ background: "linear-gradient(135deg,#EC4899,#7C3AED)" }}>🏆</div><div className="lbl">Placement Ready</div></div>
    </div>
  </div>
</section>

{/* SECTION 5: DASHBOARD PREVIEW */}
<section className="dash-sec" id="dashboard-preview">
  <div className="container">
    <div className="sec-head fade-in">
      <span className="sec-tag">Product Preview</span>
      <h2>Smart Dashboard Preview</h2>
      <p>Everything you need, visualized in one clean, live-updating dashboard.</p>
    </div>
    <div className="dash-mock fade-in">
      <div className="dash-grid">
        <div className="dm-card">
          <h5>Placement Readiness</h5>
          <div className="dm-ring">
            <svg viewBox="0 0 70 70" width="64" height="64">
              <circle cx="35" cy="35" r="29" fill="none" stroke="var(--line)" strokeWidth="6"/>
              <circle cx="35" cy="35" r="29" fill="none" stroke="url(#gA)" strokeWidth="6" strokeLinecap="round" strokeDasharray="150 182"/>
              <defs><linearGradient id="gA" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#22C55E"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient></defs>
            </svg>
            <div className="dm-ring-pct">82%</div>
          </div>
          <p style={{ textAlign: "center", fontSize: "11.5px" }}>Learning Streak: 🔥 24 days</p>
        </div>
        <div className="dm-card">
          <h5>Skill Progress</h5>
          <div className="dm-bar-row"><span>React</span><span>85%</span></div>
          <div className="dm-bar-track"><div className="dm-bar-fill" style={{ width: "85%", background: "linear-gradient(90deg,var(--primary),var(--accent))" }}></div></div>
          <div className="dm-bar-row"><span>Node.js</span><span>60%</span></div>
          <div className="dm-bar-track"><div className="dm-bar-fill" style={{ width: "60%", background: "linear-gradient(90deg,var(--secondary),var(--primary))" }}></div></div>
          <div className="dm-bar-row"><span>SQL</span><span>90%</span></div>
          <div className="dm-bar-track"><div className="dm-bar-fill" style={{ width: "90%", background: "linear-gradient(90deg,var(--success),var(--accent))" }}></div></div>
        </div>
        <div className="dm-card">
          <h5>Upcoming Assessment</h5>
          <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--ink)" }}>React Advanced Test</p>
          <p style={{ fontSize: "11.5px", marginBottom: "14px" }}>Tomorrow, 10:00 AM</p>
          <h5 style={{ marginTop: "16px" }}>Recommended Project</h5>
          <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--ink)" }}>E-commerce Web App</p>
          <p style={{ fontSize: "11.5px" }}>React, Node.js, MongoDB</p>
        </div>
        <div className="dm-card">
          <h5>Recent Achievements</h5>
          <div className="dm-achieve"><span className="ic">✓</span>React Basics Completed</div>
          <div className="dm-achieve"><span className="ic">✓</span>Find Project Completed</div>
          <div className="dm-achieve"><span className="ic">✓</span>SQL Mastery Badge</div>
          <div className="dm-achieve"><span className="ic">✓</span>Assessment Score 90%</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* SECTION 6: AI ASSISTANT */}
<section className="ai-sec" id="ai-assistant">
  <div className="container">
    <div className="sec-head fade-in">
      <span className="sec-tag">AI Career Assistant</span>
      <h2>Your 24/7 Career Companion</h2>
      <p>Ask anything about your roadmap, skills, or next steps — get instant, personalized guidance.</p>
    </div>
    <div className="ai-chat fade-in">
      <div className="ai-chat-head"><div className="ai-orb-sm">✨</div><div><div style={{ fontWeight: "700", fontSize: "13.5px" }}>CareerBridge AI</div><div style={{ fontSize: "11px", color: "var(--ink-faint)" }}>Always online</div></div></div>
      <div className="bubble user">What should I learn after React?</div>
      <div className="bubble ai">
        You've completed React fundamentals 🎉 Here's what I'd recommend next:
        <ul>
          <li>Redux Toolkit</li>
          <li>Authentication</li>
          <li>API Integration</li>
          <li>Performance Optimization</li>
        </ul>
        Estimated completion: <strong>3 weeks</strong>.
      </div>
    </div>
  </div>
</section>

{/* SECTION 7: RESUME ANALYSIS */}
<section className="resume-sec" id="resume-analysis">
  <div className="container">
    <div className="sec-head fade-in">
      <span className="sec-tag">Resume Intelligence</span>
      <h2>Resume Gap Analysis</h2>
      <p>Upload your resume and instantly see what's working — and what's missing.</p>
    </div>
    <div className="resume-grid fade-in">
      <div className="resume-doc">
        <div className="rname">John Doe</div>
        <div className="rrole">Full Stack Developer</div>
        <div className="resume-line" style={{ width: "90%" }}></div>
        <div className="resume-line" style={{ width: "75%" }}></div>
        <div className="resume-line" style={{ width: "95%" }}></div>
        <div className="resume-line" style={{ width: "60%" }}></div>
        <div className="resume-line" style={{ width: "80%" }}></div>
        <div className="resume-line" style={{ width: "70%" }}></div>
        <div className="resume-line" style={{ width: "50%" }}></div>
      </div>
      <div className="resume-analysis">
        <div className="ats-row">
          <div><div style={{ fontSize: "13px", fontWeight: "700", color: "var(--ink-soft)" }}>ATS Score</div></div>
          <div className="ats-score">
            <div className="dm-ring" style={{ width: "56px", height: "56px" }}>
              <svg viewBox="0 0 70 70" width="56" height="56">
                <circle cx="35" cy="35" r="29" fill="none" stroke="var(--line)" strokeWidth="6"/>
                <circle cx="35" cy="35" r="29" fill="none" stroke="url(#gB)" strokeWidth="6" strokeLinecap="round" strokeDasharray="150 182"/>
                <defs><linearGradient id="gB" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563EB"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
              </svg>
              <div className="dm-ring-pct">82</div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "12.5px", fontWeight: "700", marginBottom: "8px" }}>✓ Good Skills</div>
          <div className="skill-tag-row"><span className="skill-tag good">React</span><span className="skill-tag good">JavaScript</span><span className="skill-tag good">HTML</span><span className="skill-tag good">CSS</span></div>
        </div>
        <div>
          <div style={{ fontSize: "12.5px", fontWeight: "700", marginBottom: "8px", color: "var(--danger)" }}>✕ Missing Skills</div>
          <div className="skill-tag-row"><span className="skill-tag miss">TypeScript</span><span className="skill-tag miss">Docker</span><span className="skill-tag miss">AWS</span><span className="skill-tag miss">CI/CD</span></div>
        </div>
        <div>
          <div style={{ fontSize: "12.5px", fontWeight: "700", marginBottom: "8px" }}>Suggestions</div>
          <div className="sugg-item"><span className="ic">✓</span>Add more backend projects</div>
          <div className="sugg-item"><span className="ic">✓</span>Include cloud technologies</div>
          <div className="sugg-item"><span className="ic">✓</span>Improve achievement metrics</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* SECTION 8: PLACEMENT READINESS */}
<section className="placement-sec" id="placement-readiness">
  <div className="container">
    <div className="sec-head fade-in">
      <span className="sec-tag">Placement Readiness</span>
      <h2>Know Exactly How Ready You Are</h2>
      <p>A single score built from everything you've done — roadmap, projects, tests, resume &amp; profile.</p>
    </div>
    <div className="placement-wrap fade-in">
      <div className="big-gauge">
        <svg viewBox="0 0 190 190" width="190" height="190">
          <circle cx="95" cy="95" r="80" fill="none" stroke="var(--line)" strokeWidth="14"/>
          <circle cx="95" cy="95" r="80" fill="none" stroke="url(#gC)" strokeWidth="14" strokeLinecap="round" strokeDasharray="412 503"/>
          <defs><linearGradient id="gC" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#22C55E"/><stop offset="55%" stopColor="#F59E0B"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
        </svg>
        <div className="big-gauge-pct"><span className="n">82%</span><span className="l">Ready</span></div>
      </div>
      <div className="breakdown-list">
        <div className="bd-row"><span className="k">Roadmap</span><div className="track"><div className="fill" style={{ width: "85%", background: "linear-gradient(90deg,var(--primary),var(--accent))" }}></div></div><span className="pct">85%</span></div>
        <div className="bd-row"><span className="k">Projects</span><div className="track"><div className="fill" style={{ width: "75%", background: "linear-gradient(90deg,var(--secondary),#A78BFA)" }}></div></div><span className="pct">75%</span></div>
        <div className="bd-row"><span className="k">Mock Tests</span><div className="track"><div className="fill" style={{ width: "80%", background: "linear-gradient(90deg,var(--warning),#FBBF24)" }}></div></div><span className="pct">80%</span></div>
        <div className="bd-row"><span className="k">Resume</span><div className="track"><div className="fill" style={{ width: "85%", background: "linear-gradient(90deg,var(--accent),#22D3EE)" }}></div></div><span className="pct">85%</span></div>
        <div className="bd-row"><span className="k">Profile</span><div className="track"><div className="fill" style={{ width: "90%", background: "linear-gradient(90deg,var(--success),var(--accent))" }}></div></div><span className="pct">90%</span></div>
      </div>
    </div>
  </div>
</section>

{/* SECTION 9: JOURNEY TIMELINE */}
<section className="journey-sec" id="journey">
  <div className="container">
    <div className="sec-head fade-in">
      <span className="sec-tag">Student Journey</span>
      <h2>From Sign-Up to Success</h2>
      <p>A clear, guided path — every student follows the same proven journey.</p>
    </div>
    <div className="journey-track fade-in">
      <div className="journey-node"><div className="journey-dot">1</div><div className="lbl">Registration</div></div>
      <div className="journey-node"><div className="journey-dot">2</div><div className="lbl">Profile</div></div>
      <div className="journey-node"><div className="journey-dot">3</div><div className="lbl">Roadmap</div></div>
      <div className="journey-node"><div className="journey-dot">4</div><div className="lbl">Projects</div></div>
      <div className="journey-node"><div className="journey-dot">5</div><div className="lbl">Assessment</div></div>
      <div className="journey-node"><div className="journey-dot">6</div><div className="lbl">Placement</div></div>
    </div>
  </div>
</section>

{/* SECTION 10: STATS */}
<section className="stats-sec" id="stats">
  <div className="container">
    <div className="stats-grid fade-in">
      <div className="stat-box"><div className="n">10,000+</div><div className="l">Students</div></div>
      <div className="stat-box"><div className="n">250+</div><div className="l">Roadmaps</div></div>
      <div className="stat-box"><div className="n">95%</div><div className="l">Completion Rate</div></div>
      <div className="stat-box"><div className="n">500+</div><div className="l">Projects</div></div>
      <div className="stat-box"><div className="n">100+</div><div className="l">Mentors</div></div>
    </div>
  </div>
</section>

{/* SECTION 11: FINAL CTA */}
<section className="cta-sec" id="final-cta">
  <div className="container">
    <div className="cta-band fade-in">
      <h2>Your Dream Career Starts Here.</h2>
      <p>Join thousands of students who are already building their future with CareerBridge.</p>
      <div className="ctas">
        <Link to="/features#hero" className="btn btn-primary" style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,0.4)" }}>Start Learning Now</Link>
        <Link to="/features#core-features" className="btn btn-outline">Explore Career Paths</Link>
      </div>
    </div>
  </div>
</section>

{/* FOOTER */}
<footer>
  <div className="container">
    <div className="footer-grid">
      <div className="footer-brand">
        <Link to="#" className="logo"><span className="logo-mark"></span>CareerBridge</Link>
        <p>Your AI-powered companion for career guidance and placement success.</p>
        <div className="footer-social">
          <Link to="#" className="icon-btn">🐙</Link><Link to="#" className="icon-btn">💼</Link><Link to="#" className="icon-btn">🐦</Link>
        </div>
      </div>
      <div className="footer-col">
        <h5>Product</h5>
        <Link to="/features#core-features">Features</Link>
        <Link to="/features#hero">Career Paths</Link>
        <Link to="/features#workflow">Projects</Link>
        <Link to="/features#dashboard-preview">Assessments</Link>
      </div>
      <div className="footer-col">
        <h5>Company</h5>
        <Link to="#">About Us</Link><Link to="#">Careers</Link><Link to="#">Blog</Link><Link to="#">Contact Us</Link>
      </div>
      <div className="footer-col">
        <h5>Resources</h5>
        <Link to="#">Help Center</Link><Link to="#">Roadmap</Link><Link to="#">Guides</Link><Link to="#">API</Link>
      </div>
      <div className="footer-col">
        <h5>Newsletter</h5>
        <p style={{ fontSize: "12.5px", marginBottom: "4px" }}>Get the latest updates and career tips in your inbox.</p>
        <div className="newsletter-input"><input type="email" placeholder="Enter your email" /><button>→</button></div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 CareerBridge. All rights reserved.</span>
      <span>Privacy Policy · Terms of Service</span>
    </div>
  </div>
</footer>


        </div>
    );
};

export default FeaturesPage;
