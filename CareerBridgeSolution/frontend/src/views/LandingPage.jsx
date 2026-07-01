import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const constraintsRef = useRef(null);
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    // sticky header blur on scroll
    const header = document.getElementById('siteHeader');
    const handleScroll = () => {
      if (window.scrollY > 12) header?.classList.add('scrolled');
      else header?.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll);

    // scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));

    // animated counters
    const counters = document.querySelectorAll('.num[data-count]');
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.parentElement.querySelector('.lbl').textContent.includes('K+') ? 'K+' : '+';
          let cur = 0;
          const step = Math.max(1, Math.ceil(target / 50));
          const tick = () => {
            cur += step;
            if (cur >= target) { el.textContent = target + suffix; return; }
            el.textContent = cur + suffix;
            requestAnimationFrame(tick);
          };
          tick();
          counterIO.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => counterIO.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
      counterIO.disconnect();
    };
  }, []);

  return (
    <div className="landing-page-root">
      <div className="bg-field">
  <div className="grid-overlay"></div>
  <div className="blob blob1"></div>
  <div className="blob blob2"></div>
  <div className="blob blob3"></div>
</div>

{/* HEADER */}
<header id="siteHeader">
  <div className="container nav-row">
    <a href="#!" className="logo"><span className="logo-mark"></span>CareerBridge</a>
    <nav className="center-links">
      <Link to="/features">Features</Link>
      <a href="#paths">Career Paths</a>
      <a href="#showcase">Projects</a>
      <a href="#how">Assessments</a>
      <a href="#mentors">Mentors</a>
      <a href="#footer">About</a>
    </nav>
    <div className="nav-right">
      <button className="theme-toggle" aria-label="Toggle dark mode" title="Dark mode (coming soon)">🌙</button>
      {isAuthenticated ? (
        <>
          <button className="btn btn-ghost" onClick={() => logout()}>Log out</button>
          <button className="btn btn-primary" onClick={() => navigate('/student-dashboard')}>Dashboard</button>
        </>
      ) : (
        <>
          <button className="btn btn-ghost" onClick={() => navigate('/login')}>Log in</button>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
        </>
      )}
      <button className="mobile-toggle" aria-label="Menu"><span></span></button>
    </div>
  </div>
</header>

{/* HERO */}
<section className="hero">
  <div className="container hero-grid">
    <div>
      <span className="eyebrow"><span className="dot"></span>From confusion to career confidence</span>
      <h1>Bridge your skills to your <span className="grad">dream career.</span></h1>
      <p className="lead">Personalized roadmaps, project-based proof of skill, mock assessments, and a placement readiness score that tells you exactly how close you are — all in one connected platform.</p>
      <div className="hero-ctas">
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>Get Started Free</button>
        <a href="#paths" className="btn btn-outline btn-lg">Explore Career Paths</a>
      </div>
      <div className="trust-row">
        <div className="trust-item"><span className="num">1,000+</span><span className="lbl">Students guided</span></div>
        <div className="trust-item"><span className="num">50+</span><span className="lbl">Career paths</span></div>
        <div className="trust-item"><span className="num">300+</span><span className="lbl">Skills tracked</span></div>
        <div className="trust-item"><span className="num">100+</span><span className="lbl">Real projects</span></div>
      </div>
    </div>

    <div className="hero-visual">
      <div className="route-card" ref={constraintsRef}>
        <svg className="route-svg" viewBox="0 0 420 460" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB"/>
              <stop offset="55%" stopColor="#7C3AED"/>
              <stop offset="100%" stopColor="#06B6D4"/>
            </linearGradient>
          </defs>
          <path className="route-path" d="M 60 80 C 140 80, 100 180, 190 200 C 280 220, 230 300, 310 320 C 360 332, 330 380, 360 400" />

          <g className="route-dot" style={{animationDelay: '.5s'}}>
            <circle className="route-node" cx="60" cy="80" r="9" fill="#94A3B8"/>
            <text className="node-label" x="76" y="76" style={{animationDelay: '.6s'}}>You are here</text>
            <text className="node-label" x="76" y="90" style={{animationDelay: '.6s'}}>Confused about path</text>
          </g>

          <g className="route-dot" style={{animationDelay: '1.0s'}}>
            <circle className="route-node" cx="190" cy="200" r="9" fill="#2563EB"/>
            <text className="node-label" x="206" y="196" style={{animationDelay: '1.1s'}}>Skill assessment</text>
          </g>

          <g className="route-dot" style={{animationDelay: '1.5s'}}>
            <circle className="route-node" cx="310" cy="320" r="9" fill="#7C3AED"/>
            <text className="node-label" x="240" y="345" style={{animationDelay: '1.6s'}}>Guided roadmap</text>
          </g>

          <g className="route-dot" style={{animationDelay: '2.0s'}}>
            <circle className="route-node" cx="360" cy="400" r="13" fill="#06B6D4"/>
            <circle cx="360" cy="400" r="13" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.4">
              <animate attributeName="r" values="13;22;13" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <text className="node-label strong" x="318" y="430" style={{animationDelay: '2.1s'}}>Placement ready</text>
          </g>
        </svg>

        <motion.div className="float-card fc1" drag dragConstraints={constraintsRef} dragElastic={0.2} whileDrag={{ scale: 1.05, cursor: "grabbing" }} whileHover={{ cursor: "grab" }}><span className="ic">📈</span>Readiness 83%</motion.div>
        <motion.div className="float-card fc2" drag dragConstraints={constraintsRef} dragElastic={0.2} whileDrag={{ scale: 1.05, cursor: "grabbing" }} whileHover={{ cursor: "grab" }}><span className="ic">✓</span>Spring Boot verified</motion.div>
        <motion.div className="float-card fc3" drag dragConstraints={constraintsRef} dragElastic={0.2} whileDrag={{ scale: 1.05, cursor: "grabbing" }} whileHover={{ cursor: "grab" }}><span className="ic">🎯</span>93% role match</motion.div>
      </div>
    </div>
  </div>
</section>

{/* WHY CAREERBRIDGE */}
<section id="why">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow"><span className="dot"></span>Why CareerBridge</span>
      <h2>One platform, not a pile of bookmarks</h2>
      <p>YouTube and Coursera teach you. CareerBridge tells you what to learn next, why, and how close you are to being hired for it.</p>
    </div>
    <div className="why-grid">
      <div className="why-card reveal" style={{'--card-glow': 'rgba(37,99,235,0.18)'}}>
        <div className="why-icon" style={{background: 'linear-gradient(135deg,#2563EB,#3B82F6)'}}>🧭</div>
        <h3>AI Career Guidance</h3>
        <p>Recommendations built from your actual skills and interests, not a generic quiz result.</p>
      </div>
      <div className="why-card reveal" style={{'--card-glow': 'rgba(124,58,237,0.18)'}}>
        <div className="why-icon" style={{background: 'linear-gradient(135deg,#7C3AED,#A78BFA)'}}>🗺️</div>
        <h3>Structured Learning Roadmaps</h3>
        <p>A sequenced path that starts from what you already know — never repeats a skill you've mastered.</p>
      </div>
      <div className="why-card reveal" style={{'--card-glow': 'rgba(6,182,212,0.18)'}}>
        <div className="why-icon" style={{background: 'linear-gradient(135deg,#06B6D4,#22D3EE)'}}>⚙️</div>
        <h3>Industry Projects</h3>
        <p>Build proof of skill, not just certificates — projects mapped directly to your target role.</p>
      </div>
      <div className="why-card reveal" style={{'--card-glow': 'rgba(37,99,235,0.18)'}}>
        <div className="why-icon" style={{background: 'linear-gradient(135deg,#2563EB,#7C3AED)'}}>📊</div>
        <h3>Placement Readiness Score</h3>
        <p>One measurable number combining your roadmap, projects, resume, and assessments.</p>
      </div>
      <div className="why-card reveal" style={{'--card-glow': 'rgba(124,58,237,0.18)'}}>
        <div className="why-icon" style={{background: 'linear-gradient(135deg,#7C3AED,#06B6D4)'}}>📝</div>
        <h3>Mock Assessments</h3>
        <p>Role-based tests that surface weak areas automatically — not generic trivia.</p>
      </div>
      <div className="why-card reveal" style={{'--card-glow': 'rgba(6,182,212,0.18)'}}>
        <div className="why-icon" style={{background: 'linear-gradient(135deg,#06B6D4,#2563EB)'}}>📄</div>
        <h3>Resume Builder</h3>
        <p>ATS-friendly resumes that highlight verified skills, exported as a polished PDF.</p>
      </div>
    </div>
  </div>
</section>

{/* HOW IT WORKS */}
<section id="how">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow"><span className="dot"></span>How it works</span>
      <h2>Six steps from confusion to confidence</h2>
      <p>Each step builds on the last — your roadmap, projects, and readiness score all stay in sync.</p>
    </div>
    <div className="timeline-wrap reveal">
      <div className="timeline">
        <div className="tl-step"><div className="tl-num">1</div><h4>Create Profile</h4><p>Background, branch, skills</p></div>
        <div className="tl-step"><div className="tl-num">2</div><h4>Skill Assessment</h4><p>What excites you, what you know</p></div>
        <div className="tl-step"><div className="tl-num">3</div><h4>Career Match</h4><p>Ranked roles by fit</p></div>
        <div className="tl-step"><div className="tl-num">4</div><h4>Learning Roadmap</h4><p>Personalized, not generic</p></div>
        <div className="tl-step"><div className="tl-num">5</div><h4>Projects</h4><p>Evidence of real skill</p></div>
        <div className="tl-step"><div className="tl-num">6</div><h4>Placement Ready</h4><p>Measured, not guessed</p></div>
      </div>
    </div>
  </div>
</section>

{/* FEATURE SHOWCASE */}
<section id="showcase">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow"><span className="dot"></span>Inside the platform</span>
      <h2>Built around your progress, not a course catalog</h2>
    </div>

    <div className="showcase-row reveal">
      <div className="sc-text">
        <div className="sc-tag">Recommendation engine</div>
        <h3>A roadmap that knows what you already know</h3>
        <p>Already comfortable with Java and SQL? CareerBridge starts your roadmap at Spring Boot — it never wastes your time repeating skills you've proven.</p>
        <ul className="sc-list">
          <li><span className="check">✓</span>Scored from your real assessment answers</li>
          <li><span className="check">✓</span>Skips skills you've already verified</li>
          <li><span className="check">✓</span>Updates as your progress changes</li>
        </ul>
      </div>
      <div className="sc-visual">
        <div className="sc-visual-inner mv-roadmap" style={{display: 'flex', flexDirection: 'column', gap: '18px', justifyContent: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><div style={{width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg,#2563EB,#7C3AED)'}}></div><div style={{flex: '1', height: '8px', borderRadius: '5px', background: 'linear-gradient(90deg,var(--primary),var(--accent))', width: '100%'}}></div></div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><div style={{width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg,#7C3AED,#06B6D4)'}}></div><div style={{flex: '1', height: '8px', borderRadius: '5px', background: 'linear-gradient(90deg,var(--secondary),var(--accent))', width: '72%'}}></div></div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><div style={{width: '34px', height: '34px', borderRadius: '9px', background: '#E2E8F0'}}></div><div style={{flex: '1', height: '8px', borderRadius: '5px', background: '#E2E8F0', width: '40%'}}></div></div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}><div style={{width: '34px', height: '34px', borderRadius: '9px', background: '#E2E8F0'}}></div><div style={{flex: '1', height: '8px', borderRadius: '5px', background: '#E2E8F0', width: '22%'}}></div></div>
        </div>
      </div>
    </div>

    <div className="showcase-row reverse reveal">
      <div className="sc-text">
        <div className="sc-tag">Interactive dashboard</div>
        <h3>Everything you need on one screen</h3>
        <p>Readiness score, current roadmap step, weak skills, and recommended next project — surfaced the moment you log in.</p>
        <ul className="sc-list">
          <li><span className="check">✓</span>Live placement readiness tracking</li>
          <li><span className="check">✓</span>Weak-area detection from assessments</li>
          <li><span className="check">✓</span>Daily goals that actually move the score</li>
        </ul>
      </div>
      <div className="sc-visual">
        <div className="sc-visual-inner mv-bars">
          <div className="bar" style={{height: '38%'}}></div>
          <div className="bar" style={{height: '62%'}}></div>
          <div className="bar" style={{height: '48%'}}></div>
          <div className="bar" style={{height: '85%'}}></div>
          <div className="bar" style={{height: '55%'}}></div>
          <div className="bar" style={{height: '70%'}}></div>
        </div>
      </div>
    </div>

    <div className="showcase-row reveal">
      <div className="sc-text">
        <div className="sc-tag">Industry projects</div>
        <h3>Projects that prove the skill, not just the course</h3>
        <p>Finished Spring Boot and React? You'll be matched to something like a hospital management system — intermediate difficulty, REST API, JWT, real stack.</p>
        <ul className="sc-list">
          <li><span className="check">✓</span>Matched to skills you've actually completed</li>
          <li><span className="check">✓</span>GitHub-ready with a live demo link</li>
          <li><span className="check">✓</span>Counts directly toward readiness score</li>
        </ul>
      </div>
      <div className="sc-visual">
        <div className="sc-visual-inner mv-code">
          <div><span className="c1">class</span> <span className="c2">HospitalController</span> {"{"}</div>
          <div>&nbsp;&nbsp;<span className="c1">@PostMapping</span>(<span className="c3">"/patients"</span>)</div>
          <div>&nbsp;&nbsp;ResponseEntity&lt;Patient&gt; create(...)</div>
          <div>&nbsp;&nbsp;<span className="c3">// JWT secured · REST · SQL</span></div>
          <div>{"}"}</div>
        </div>
      </div>
    </div>

    <div className="showcase-row reverse reveal">
      <div className="sc-text">
        <div className="sc-tag">Mock assessments</div>
        <h3>Role-based tests, not generic trivia</h3>
        <p>A Java Developer assessment tests Java, SQL, Spring Boot, and REST API specifically — and tells you exactly which one is dragging your score down.</p>
        <ul className="sc-list">
          <li><span className="check">✓</span>Weak areas identified automatically</li>
          <li><span className="check">✓</span>Timed, scored, role-specific</li>
          <li><span className="check">✓</span>Feeds directly into readiness score</li>
        </ul>
      </div>
      <div className="sc-visual">
        <div className="sc-visual-inner mv-test">
          <div className="q"><span>Java</span><span>92%</span></div>
          <div className="q"><span>Spring Boot</span><span style={{color: '#EF4444'}}>48%</span></div>
          <div className="q"><span>SQL</span><span>81%</span></div>
        </div>
      </div>
    </div>

    <div className="showcase-row reveal">
      <div className="sc-text">
        <div className="sc-tag">Resume builder</div>
        <h3>A resume built from what you've actually verified</h3>
        <p>No guesswork on what to include — CareerBridge pulls from your completed roadmap, verified skills, and finished projects.</p>
        <ul className="sc-list">
          <li><span className="check">✓</span>ATS-friendly formatting</li>
          <li><span className="check">✓</span>One-click PDF export</li>
          <li><span className="check">✓</span>Flags missing skills before recruiters do</li>
        </ul>
      </div>
      <div className="sc-visual">
        <div className="sc-visual-inner mv-resume">
          <div className="ln accent"></div>
          <div className="ln short"></div>
          <div style={{height: '6px'}}></div>
          <div className="ln" style={{width: '90%'}}></div>
          <div className="ln" style={{width: '75%'}}></div>
          <div className="ln" style={{width: '85%'}}></div>
          <div style={{height: '6px'}}></div>
          <div className="ln short" style={{background: 'var(--accent)'}}></div>
          <div className="ln" style={{width: '60%'}}></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* CAREER PATHS */}
<section id="paths">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow"><span className="dot"></span>Career paths</span>
      <h2>Pick a destination, or let us recommend one</h2>
    </div>
    <div className="paths-grid">
      <div className="path-card reveal">
        <div className="path-icon" style={{background: 'linear-gradient(135deg,#2563EB,#3B82F6)'}}>☕</div>
        <h4>Java Full Stack Developer</h4>
        <div className="path-meta"><span>Intermediate</span><span>6 months</span></div>
        <div className="path-meta"><span>₹6–16 LPA</span></div>
        <a className="view" href="#!">View Roadmap →</a>
      </div>
      <div className="path-card reveal">
        <div className="path-icon" style={{background: 'linear-gradient(135deg,#7C3AED,#A78BFA)'}}>🧩</div>
        <h4>.NET Developer</h4>
        <div className="path-meta"><span>Intermediate</span><span>5 months</span></div>
        <div className="path-meta"><span>₹8–18 LPA</span></div>
        <a className="view" href="#!">View Roadmap →</a>
      </div>
      <div className="path-card reveal">
        <div className="path-icon" style={{background: 'linear-gradient(135deg,#06B6D4,#22D3EE)'}}>🎨</div>
        <h4>Frontend Developer</h4>
        <div className="path-meta"><span>Beginner</span><span>4 months</span></div>
        <div className="path-meta"><span>₹5–12 LPA</span></div>
        <a className="view" href="#!">View Roadmap →</a>
      </div>
      <div className="path-card reveal">
        <div className="path-icon" style={{background: 'linear-gradient(135deg,#2563EB,#7C3AED)'}}>🛠️</div>
        <h4>Backend Developer</h4>
        <div className="path-meta"><span>Intermediate</span><span>5 months</span></div>
        <div className="path-meta"><span>₹6–14 LPA</span></div>
        <a className="view" href="#!">View Roadmap →</a>
      </div>
      <div className="path-card reveal">
        <div className="path-icon" style={{background: 'linear-gradient(135deg,#7C3AED,#06B6D4)'}}>⚛️</div>
        <h4>React Developer</h4>
        <div className="path-meta"><span>Beginner</span><span>4 months</span></div>
        <div className="path-meta"><span>₹5–13 LPA</span></div>
        <a className="view" href="#!">View Roadmap →</a>
      </div>
      <div className="path-card reveal">
        <div className="path-icon" style={{background: 'linear-gradient(135deg,#06B6D4,#2563EB)'}}>🐍</div>
        <h4>Python Developer</h4>
        <div className="path-meta"><span>Beginner</span><span>5 months</span></div>
        <div className="path-meta"><span>₹5–14 LPA</span></div>
        <a className="view" href="#!">View Roadmap →</a>
      </div>
      <div className="path-card reveal">
        <div className="path-icon" style={{background: 'linear-gradient(135deg,#2563EB,#3B82F6)'}}>📊</div>
        <h4>Data Analyst</h4>
        <div className="path-meta"><span>Beginner</span><span>4 months</span></div>
        <div className="path-meta"><span>₹4–11 LPA</span></div>
        <a className="view" href="#!">View Roadmap →</a>
      </div>
      <div className="path-card reveal">
        <div className="path-icon" style={{background: 'linear-gradient(135deg,#7C3AED,#A78BFA)'}}>☁️</div>
        <h4>Cloud Engineer</h4>
        <div className="path-meta"><span>Advanced</span><span>7 months</span></div>
        <div className="path-meta"><span>₹8–20 LPA</span></div>
        <a className="view" href="#!">View Roadmap →</a>
      </div>
    </div>
  </div>
</section>

{/* STATISTICS */}
<section id="stats">
  <div className="container">
    <div className="stats-band reveal">
      <div className="stats-grid">
        <div className="stat-item"><div className="num" data-count="50">0</div><div className="lbl">Career Paths</div></div>
        <div className="stat-item"><div className="num" data-count="300">0</div><div className="lbl">Skills</div></div>
        <div className="stat-item"><div className="num" data-count="150">0</div><div className="lbl">Projects</div></div>
        <div className="stat-item"><div className="num" data-count="25">0</div><div className="lbl">Assessments</div></div>
        <div className="stat-item"><div className="num" data-count="10">0</div><div className="lbl">K+ Students</div></div>
      </div>
    </div>
  </div>
</section>

{/* TESTIMONIALS */}
<section id="testimonials">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow"><span className="dot"></span>Testimonials</span>
      <h2>Students who found their path</h2>
    </div>
    <div className="testi-track">
      <div className="testi-card reveal">
        <div className="testi-stars">★★★★★</div>
        <p className="quote">I had no idea if I was learning the right things. The readiness score finally gave me something concrete to chase.</p>
        <div className="testi-person">
          <div className="testi-avatar">RP</div>
          <div><div className="name">Riya Patil</div><div className="role">CDAC Student</div></div>
        </div>
      </div>
      <div className="testi-card reveal">
        <div className="testi-stars">★★★★★</div>
        <p className="quote">The roadmap skipped everything I already knew. First platform that didn't waste my time.</p>
        <div className="testi-person">
          <div className="testi-avatar">AK</div>
          <div><div className="name">Aman Kulkarni</div><div className="role">B.E. Computer Engineering</div></div>
        </div>
      </div>
      <div className="testi-card reveal">
        <div className="testi-stars">★★★★★</div>
        <p className="quote">The mock assessment found a gap in Spring Boot I didn't even know I had. Fixed it before the interview.</p>
        <div className="testi-person">
          <div className="testi-avatar">SD</div>
          <div><div className="name">Sneha Deshmukh</div><div className="role">MCA Student</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* MENTORS */}
<section id="mentors">
  <div className="container">
    <div className="section-head reveal">
      <span className="eyebrow"><span className="dot"></span>Mentors</span>
      <h2>Guidance from people who've shipped real software</h2>
    </div>
    <div className="mentor-grid">
      <div className="mentor-card reveal">
        <div className="mentor-avatar">VK</div>
        <h4>Vikram Kale</h4>
        <div className="role">Senior Backend Engineer · 8 yrs</div>
        <div className="mentor-tags"><span>Java</span><span>Spring Boot</span></div>
        <a className="mentor-li" href="#!">in Connect</a>
      </div>
      <div className="mentor-card reveal">
        <div className="mentor-avatar">PN</div>
        <h4>Priya Nair</h4>
        <div className="role">Frontend Lead · 6 yrs</div>
        <div className="mentor-tags"><span>React</span><span>UI/UX</span></div>
        <a className="mentor-li" href="#!">in Connect</a>
      </div>
      <div className="mentor-card reveal">
        <div className="mentor-avatar">RS</div>
        <h4>Rohan Shah</h4>
        <div className="role">.NET Architect · 10 yrs</div>
        <div className="mentor-tags"><span>.NET</span><span>Azure</span></div>
        <a className="mentor-li" href="#!">in Connect</a>
      </div>
      <div className="mentor-card reveal">
        <div className="mentor-avatar">MJ</div>
        <h4>Meera Joshi</h4>
        <div className="role">Data Analyst Lead · 7 yrs</div>
        <div className="mentor-tags"><span>SQL</span><span>Python</span></div>
        <a className="mentor-li" href="#!">in Connect</a>
      </div>
    </div>
  </div>
</section>

{/* FINAL CTA */}
<section>
  <div className="container">
    <div className="cta-band reveal">
      <h2>Ready to build your dream career?</h2>
      <p>Stop guessing what to learn next. Get a roadmap, a readiness score, and a clear next step.</p>
      <div className="cta-buttons">
        <button className="btn btn-lg btn-white" onClick={() => navigate('/register')}>Start Free</button>
        <a href="#!" className="btn btn-lg btn-outline-light">Book a Demo</a>
      </div>
    </div>
  </div>
</section>

{/* FOOTER */}
<footer id="footer">
  <div className="container">
    <div className="footer-top">
      <div className="footer-brand">
        <a href="#!" className="logo"><span className="logo-mark"></span>CareerBridge</a>
        <p>From confusion to career confidence — a career operating system, not another course platform.</p>
      </div>
      <div className="footer-col">
        <h5>Product</h5>
        <ul>
          <li><a href="#why">Features</a></li>
          <li><a href="#paths">Career Paths</a></li>
          <li><a href="#showcase">Projects</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="#!">About</a></li>
          <li><a href="#!">Contact</a></li>
          <li><a href="#!">Support</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Legal</h5>
        <ul>
          <li><a href="#!">Privacy</a></li>
          <li><a href="#!">Terms</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 CareerBridge. All rights reserved.</span>
      <div className="social-row">
        <a href="#!" aria-label="LinkedIn">in</a>
        <a href="#!" aria-label="GitHub">gh</a>
        <a href="#!" aria-label="Twitter">tw</a>
        <a href="#!" aria-label="Instagram">ig</a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;
