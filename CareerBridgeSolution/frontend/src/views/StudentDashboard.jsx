import React, { useEffect, useState } from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="dashboard-wrapper shell-wrapper">
            <div className="bg-field"><div className="grid-overlay"></div><div className="blob blob1"></div><div className="blob blob2"></div><div className="blob blob3"></div></div>

<div className="app">

  {/* SIDEBAR */}
  <aside className="sidebar" id="sidebar">
    <div className="sb-logo">
      <span className="logo-mark"></span>
      <div>
        <div className="name">CareerBridge</div>
        <div className="tag">Your Bridge to Success</div>
      </div>
    </div>

    <nav className="sb-nav">
      <a className="sb-link active" href="#"><span className="ic">🏠</span>Dashboard</a>
      <a className="sb-link" href="#"><span className="ic">📋</span>Career Assessment</a>
      <a className="sb-link" href="#"><span className="ic">🎯</span>Career Recommendation</a>
      <a className="sb-link" href="#"><span className="ic">🛣️</span>Learning Roadmap</a>
      <a className="sb-link" href="#"><span className="ic">🧠</span>Skills</a>
      <a className="sb-link" href="#"><span className="ic">💼</span>Projects<span className="sb-badge">Coming Soon</span></a>
      <a className="sb-link" href="#"><span className="ic">📝</span>Assessments<span className="sb-badge">Coming Soon</span></a>
      <a className="sb-link" href="#"><span className="ic">📄</span>Resume Builder<span className="sb-badge">Coming Soon</span></a>
      <a className="sb-link" href="#"><span className="ic">🎯</span>Opportunities<span className="sb-badge">Coming Soon</span></a>
      <a className="sb-link" href="#"><span className="ic">👨‍🏫</span>Mentor Connect<span className="sb-badge">Coming Soon</span></a>
      <a className="sb-link" href="#"><span className="ic">👤</span>Profile</a>
      <a className="sb-link" href="#"><span className="ic">⚙️</span>Settings</a>
    </nav>

    <div className="sb-promo">
      <span className="close">✕</span>
      <div className="ic-circle">🎓</div>
      <h5>Upgrade to Pro</h5>
      <p>Unlock advanced learning tools, mentorship, and placement support.</p>
      <button className="btn-promo btn" style={{ background: 'linear-gradient(135deg,var(--primary),var(--secondary))', color: '#fff' }}>Upgrade Now</button>
    </div>

    <div className="sb-help">
      <div className="ic-circle">🎧</div>
      <p>Need Help? We're here to help you in your career journey.</p>
    </div>
  </aside>

  {/* MAIN */}
  <div className="main-col">

    {/* TOPBAR */}
    <div className="topbar">
      <button className="mobile-toggle" id="mobileToggle">☰</button>
      <div className="search-box">
        <span>🔍</span>
        <input type="text" placeholder="Search anything..." />
        <span className="kbd">⌘K</span>
      </div>
      <div className="topbar-right">
        <button className="icon-btn" id="themeToggle">🌙</button>
        <button className="icon-btn">🔔<span className="badge">3</span></button>
        <div className="profile-chip">
          <div className="avatar">AK</div>
          <div>
            <div className="pname">Hi, Akash 👋</div>
            <div className="prole">Student</div>
          </div>
          <span className="chev">▾</span>
        </div>
      </div>
    </div>

    <div className="content">

      {/* HERO */}
      <div className="hero-card fade-in">
        <div className="hero-text">
          <h1>Welcome back, Akash 👋</h1>
          <p>Keep learning, keep growing. You're one step closer to your dream career — continue your journey toward becoming a <strong style={{ color: '#fff' }}>.NET Full Stack Developer</strong>.</p>
        </div>
        <div className="hero-visual">
          <svg viewBox="0 0 240 140">
            <defs>
              <linearGradient id="cityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED"/>
                <stop offset="100%" stopColor="#06B6D4"/>
              </linearGradient>
            </defs>
            <rect x="150" y="40" width="18" height="100" fill="url(#cityGrad)" opacity="0.5"/>
            <rect x="172" y="60" width="14" height="80" fill="url(#cityGrad)" opacity="0.4"/>
            <rect x="190" y="25" width="20" height="115" fill="url(#cityGrad)" opacity="0.6"/>
            <rect x="214" y="50" width="16" height="90" fill="url(#cityGrad)" opacity="0.45"/>
            <path d="M0 140 L120 95 L240 140 Z" fill="rgba(124,58,237,0.18)"/>
            <line x1="0" y1="140" x2="120" y2="95" stroke="#A78BFA" strokeWidth="2" opacity="0.7"/>
            <line x1="240" y1="140" x2="120" y2="95" stroke="#A78BFA" strokeWidth="2" opacity="0.7"/>
            <circle cx="120" cy="95" r="5" fill="#fff"><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="80" cy="118" r="11" fill="#312E81"/>
            <circle cx="80" cy="106" r="7" fill="#FBCFE8"/>
            <rect x="73" y="111" width="14" height="16" rx="5" fill="#7C3AED"/>
          </svg>
        </div>
      </div>

      <div className="content-grid">
        {/* LEFT */}
        <div className="left-stack">

          {/* STAT CARDS */}
          <div className="stat-grid">
            <div className="glass-card stat-card fade-in">
              <div className="stat-title">Recommended Career</div>
              <span className="pill pill-success">🏆 Best Match</span>
              <div className="big">.NET Full Stack Developer</div>
              <div className="sub">High Demand · Great Salary · Future Proof</div>
              <button className="btn btn-primary">View Career Details</button>
            </div>

            <div className="glass-card stat-card fade-in">
              <div className="stat-title">Roadmap Progress</div>
              <div className="ring">
                <svg viewBox="0 0 80 80" width="78" height="78">
                  <circle className="ring-bg" cx="40" cy="40" r="33"/>
                  <circle className="ring-fg" cx="40" cy="40" r="33" stroke="url(#gradBlue)" strokeDasharray="68 207"/>
                  <defs><linearGradient id="gradBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563EB"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient></defs>
                </svg>
                <div className="ring-pct"><span className="n">32%</span><span className="l">Completed</span></div>
              </div>
              <button className="btn btn-soft">View Roadmap</button>
            </div>

            <div className="glass-card stat-card fade-in">
              <div className="stat-title">Current Learning</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0 14px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: 'linear-gradient(135deg,var(--secondary),var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#fff', flexShrink: '0' }}>📘</div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Object-Oriented Programming</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--ink-faint)' }}>Estimated time: 2h 30m</div>
                </div>
              </div>
              <button className="btn btn-primary">Continue Learning</button>
            </div>

            <div className="glass-card stat-card fade-in">
              <div className="stat-title">Profile Completion</div>
              <div className="ring">
                <svg viewBox="0 0 80 80" width="78" height="78">
                  <circle className="ring-bg" cx="40" cy="40" r="33"/>
                  <circle className="ring-fg" cx="40" cy="40" r="33" stroke="url(#gradGreen)" strokeDasharray="190 207"/>
                  <defs><linearGradient id="gradGreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#22C55E"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient></defs>
                </svg>
                <div className="ring-pct"><span className="n">92%</span><span className="l">Completed</span></div>
              </div>
              <button className="btn btn-outline">Complete Profile</button>
            </div>
          </div>

          {/* ROADMAP TIMELINE */}
          <div className="section-card fade-in">
            <div className="section-head">
              <h3>Your Learning Roadmap</h3>
              <a className="link-sm" href="#">View Full Roadmap →</a>
            </div>
            <div className="timeline">
              <div className="tl-row">
                <div className="tl-marker-wrap"><div className="tl-marker done">✓</div><div className="tl-line done"></div></div>
                <div className="tl-content"><div><div className="tl-name">Programming Fundamentals</div><div className="tl-desc">Basics of programming, variables, loops, functions</div></div><span className="tl-status done">Completed</span></div>
              </div>
              <div className="tl-row">
                <div className="tl-marker-wrap"><div className="tl-marker done">✓</div><div className="tl-line done"></div></div>
                <div className="tl-content"><div><div className="tl-name">C# Programming</div><div className="tl-desc">Learn C# syntax, OOP concepts, collections</div></div><span className="tl-status done">Completed</span></div>
              </div>
              <div className="tl-row">
                <div className="tl-marker-wrap"><div className="tl-marker active">3</div><div className="tl-line"></div></div>
                <div className="tl-content"><div><div className="tl-name">Object-Oriented Programming</div><div className="tl-desc">Classes, objects, inheritance, polymorphism</div></div><span className="tl-status active">In Progress</span></div>
              </div>
              <div className="tl-row">
                <div className="tl-marker-wrap"><div className="tl-marker locked">4</div><div className="tl-line"></div></div>
                <div className="tl-content locked"><div><div className="tl-name">Collections &amp; LINQ</div><div className="tl-desc">List, Dictionary, LINQ queries</div></div><span className="tl-status locked">Locked</span></div>
              </div>
              <div className="tl-row">
                <div className="tl-marker-wrap"><div className="tl-marker locked">5</div></div>
                <div className="tl-content locked"><div><div className="tl-name">SQL Server</div><div className="tl-desc">T-SQL, Joins, Stored Procedures</div></div><span className="tl-status locked">Locked</span></div>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY + CAREER SUMMARY */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
            <div className="section-card fade-in">
              <div className="section-head"><h3>Recent Activity</h3><a className="link-sm" href="#">View All →</a></div>
              <div className="activity-list">
                <div className="activity-row"><div className="act-ic" style={{ background: 'var(--success)' }}>✓</div><div className="act-name">Profile Completed</div><div className="act-time">2 days ago</div></div>
                <div className="activity-row"><div className="act-ic" style={{ background: 'var(--primary)' }}>📋</div><div className="act-name">Assessment Submitted</div><div className="act-time">2 days ago</div></div>
                <div className="activity-row"><div className="act-ic" style={{ background: 'var(--secondary)' }}>🎯</div><div className="act-name">Career Recommended</div><div className="act-time">2 days ago</div></div>
                <div className="activity-row"><div className="act-ic" style={{ background: 'var(--warning)' }}>🛣️</div><div className="act-name">Roadmap Generated</div><div className="act-time">2 days ago</div></div>
                <div className="activity-row"><div className="act-ic" style={{ background: 'var(--accent)' }}>📘</div><div className="act-name">Started Learning C#</div><div className="act-time">1 day ago</div></div>
              </div>
            </div>

            <div className="section-card fade-in">
              <div className="section-head"><h3>Career Summary</h3></div>
              <div className="summary-list">
                <div className="summary-row"><span className="k"><span className="ic">💼</span>Career</span><span className="v">.NET Full Stack Developer</span></div>
                <div className="summary-row"><span className="k"><span className="ic">📈</span>Current Stage</span><span className="v">Intermediate</span></div>
                <div className="summary-row"><span className="k"><span className="ic">✅</span>Completed Skills</span><span className="v">5</span></div>
                <div className="summary-row"><span className="k"><span className="ic">⏳</span>Remaining Skills</span><span className="v">18</span></div>
                <div className="summary-row"><span className="k"><span className="ic">📅</span>Est. Completion</span><span className="v">7 Months</span></div>
              </div>
              <button className="btn btn-outline">View Details</button>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="right-stack">

          {/* NEXT UP */}
          <div className="nextup-card fade-in">
            <div className="section-head" style={{ marginBottom: '2px' }}><h3 style={{ fontSize: '14.5px' }}>Next Up</h3></div>
            <div className="nextup-top">
              <div className="nextup-icon">📦</div>
              <div>
                <div style={{ fontSize: '14.5px', fontWeight: '700' }}>LINQ</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-faint)' }}>Language Integrated Query</div>
              </div>
            </div>
            <div className="nextup-meta-grid">
              <div><div className="l">Estimated Time</div><div className="v">⏱️ 5 Hours</div></div>
              <div><div className="l">Difficulty</div><div className="v">📶 Intermediate</div></div>
            </div>
            <button className="btn btn-primary">Start Learning →</button>
          </div>

          {/* PLACEMENT READINESS */}
          <div className="glass-card gauge-card fade-in">
            <div className="section-head" style={{ width: '100%', marginBottom: '4px' }}><h3 style={{ fontSize: '14.5px' }}>Placement Readiness</h3><span className="preview-tag">Preview</span></div>
            <div className="gauge-wrap">
              <svg viewBox="0 0 110 110" width="110" height="110" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="55" cy="55" r="46" fill="none" stroke="var(--line)" strokeWidth="9"/>
                <circle cx="55" cy="55" r="46" fill="none" stroke="url(#gaugeGrad)" strokeWidth="9" strokeLinecap="round" strokeDasharray="226 289"/>
                <defs><linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#22C55E"/><stop offset="55%" stopColor="#F59E0B"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
              </svg>
              <div className="ring-pct" style={{ inset: '0' }}><span className="n" style={{ fontSize: '22px' }}>78%</span><span className="l">Your Score</span></div>
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700' }}>You're doing great! 🎉</div>
            <p style={{ fontSize: '12px' }}>Keep learning and building projects to improve your score.</p>
            <p className="gauge-note">This is a preview score. Full placement readiness calculation will be available in the Major Project. <a href="#" style={{ color: 'var(--primary)', fontWeight: '700' }}>Learn More</a></p>
          </div>

          {/* UPCOMING MODULES */}
          <div className="section-card fade-in">
            <div className="section-head"><h3>Upcoming Modules</h3><a className="link-sm" href="#">View All →</a></div>
            <div className="upcoming-grid">
              <div className="upc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,#EF4444,#F87171)' }}>💼</div><div className="nm">Projects</div><span className="bd">Coming Soon</span></div>
              <div className="upc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,var(--secondary),#A78BFA)' }}>📝</div><div className="nm">Mock Assessments</div><span className="bd">Coming Soon</span></div>
              <div className="upc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,var(--accent),#22D3EE)' }}>📄</div><div className="nm">Resume Builder</div><span className="bd">Coming Soon</span></div>
              <div className="upc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,var(--primary),#3B82F6)' }}>👨‍🏫</div><div className="nm">Mentor Connect</div><span className="bd">Coming Soon</span></div>
              <div className="upc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,var(--warning),#FBBF24)' }}>🎯</div><div className="nm">Opportunities</div><span className="bd">Coming Soon</span></div>
              <div className="upc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,#0EA5E9,var(--accent))' }}>📊</div><div className="nm">Analytics</div><span className="bd">Coming Soon</span></div>
            </div>
          </div>

        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="section-card fade-in" style={{ marginTop: '22px' }}>
        <div className="section-head"><h3>Quick Actions</h3></div>
        <div className="qa-grid">
          <button className="qa-btn qa1"><span className="ic">▶️</span>Continue Roadmap</button>
          <button className="qa-btn qa2"><span className="ic">🔄</span>Retake Assessment</button>
          <button className="qa-btn qa3"><span className="ic">👤</span>Edit Profile</button>
          <button className="qa-btn qa4"><span className="ic">🧭</span>Explore Careers</button>
        </div>
      </div>

      {/* MAJOR PROJECT SHOWCASE */}
      <div className="showcase-band fade-in">
        <div className="showcase-top">
          <div>
            <div className="showcase-title">✨ CareerBridge Major Project Features</div>
            <div className="showcase-sub">Advanced features coming in the full version of CareerBridge.</div>
          </div>
          <a className="showcase-link" href="#">Explore All Features →</a>
        </div>
        <div className="showcase-grid">
          <div className="sc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,var(--secondary),#A78BFA)' }}>📄</div><div className="nm">Resume Builder</div><div className="bd">Coming Soon</div></div>
          <div className="sc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,var(--accent),#22D3EE)' }}>🧠</div><div className="nm">AI Career Guidance</div><div className="bd">Coming Soon</div></div>
          <div className="sc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,var(--primary),#3B82F6)' }}>📝</div><div className="nm">Mock Assessments</div><div className="bd">Coming Soon</div></div>
          <div className="sc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,#0EA5E9,var(--accent))' }}>📈</div><div className="nm">Student Analytics</div><div className="bd">Coming Soon</div></div>
          <div className="sc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,var(--warning),#FBBF24)' }}>🧑‍🏫</div><div className="nm">Mentor Dashboard</div><div className="bd">Coming Soon</div></div>
          <div className="sc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,#EF4444,#F87171)' }}>🏢</div><div className="nm">Recruiter Portal</div><div className="bd">Coming Soon</div></div>
          <div className="sc-card"><div className="ic" style={{ background: 'linear-gradient(135deg,var(--secondary),var(--primary))' }}>🔔</div><div className="nm">Notifications</div><div className="bd">Coming Soon</div></div>
        </div>
      </div>

    </div>

    {/* FOOTER */}
    <div className="dash-footer">
      <span>© 2026 CareerBridge — Version 1.0 · Mini Project. All rights reserved.</span>
      <div className="links">
        <a href="#">Privacy</a><a href="#">About</a><a href="#">GitHub</a><a href="#">Contact</a>
      </div>
    </div>

  </div>
</div>


        </div>
    );
};

export default StudentDashboard;
