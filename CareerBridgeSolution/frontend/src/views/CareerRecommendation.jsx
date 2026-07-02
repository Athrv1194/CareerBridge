import React, { useEffect, useState } from 'react';
import './CareerRecommendation.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRecommendation, startRoadmap } from '../services/dataService';

// Removed mock arrays

export default function CareerRecommendation() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };
  
  const userName = user?.fullName || "User";
  const userRole = user?.role || "Student";
  const [rec, setRec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch recommendation
    getRecommendation().then(res => {
      if (res.data?.data) {
        setRec(res.data.data);
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
    
    // Animate on load
    const timer = setTimeout(() => {
      const topRing = document.getElementById('topRing');
      if (topRing) {
        topRing.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)';
        topRing.style.strokeDashoffset = 402.1 - (0.94 * 402.1);
      }
      
      document.querySelectorAll('.score-bar-fill').forEach(el => {
        el.style.width = el.getAttribute('data-pct') + '%';
      });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleStartRoadmap = async (e) => {
      if(e) e.preventDefault();
      try {
          await startRoadmap();
          navigate('/roadmap');
      } catch (err) {
          console.error("Failed to start roadmap", err);
          // navigate anyway in case it was already started
          navigate('/roadmap');
      }
  };

  return (
    <div className="career-recommendation-wrapper">
      <div className="bg-field">
        <div className="grid-overlay"></div>
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>

      <div className="app-shell">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-logo">
            <span className="sb-logo-mark"></span>
            <span>CareerBridge<span className="sub">Your Bridge to a Better Career</span></span>
          </div>
          <nav className="sb-nav">
            <a href="#" className="sb-link" onClick={(e) => { e.preventDefault(); navigate('/student-dashboard'); }}><span className="ic">📊</span>Dashboard</a>
            <a href="#" className="sb-link" onClick={(e) => e.preventDefault()}><span className="ic">📝</span>Assessment<span className="sb-badge">Coming Soon</span></a>
            <a href="#" className="sb-link active" onClick={(e) => { e.preventDefault(); navigate('/recommendation'); }}><span className="ic">🎯</span>Recommendation</a>
            <a href="#" className="sb-link" onClick={(e) => { e.preventDefault(); navigate('/roadmap'); }}><span className="ic">🗺️</span>Roadmap</a>
            <a href="#" className="sb-link" onClick={(e) => e.preventDefault()}><span className="ic">📈</span>Skill Progress<span className="sb-badge">Coming Soon</span></a>
            <a href="#" className="sb-link" onClick={(e) => e.preventDefault()}><span className="ic">💼</span>Projects<span className="sb-badge">Coming Soon</span></a>
            <a href="#" className="sb-link" onClick={(e) => e.preventDefault()}><span className="ic">✅</span>Mock Tests<span className="sb-badge">Coming Soon</span></a>
            <a href="#" className="sb-link" onClick={(e) => e.preventDefault()}><span className="ic">📄</span>Resume Gap<span className="sb-badge">Coming Soon</span></a>
            <a href="#" className="sb-link" onClick={(e) => e.preventDefault()}><span className="ic">🏆</span>Placement Readiness<span className="sb-badge">Coming Soon</span></a>
            <a href="#" className="sb-link" onClick={(e) => e.preventDefault()}><span className="ic">🚀</span>Opportunities<span className="sb-badge">Coming Soon</span></a>
          </nav>
          <div className="sb-promo">
            <div className="pi">🚀</div>
            <h5>Keep Learning, Keep Growing</h5>
            <p>Your future is built one skill at a time.</p>
          </div>
        </aside>

        {/* MAIN */}
        <div>
          <header className="topbar">
            <span className="tb-title">Career Recommendation</span>
            <div className="tb-right">
              <button className="icon-btn">🌙</button>
              <button className="icon-btn">🔔<span className="badge">1</span></button>
              <button className="btn btn-sm" style={{borderColor: 'var(--danger)', color: 'var(--danger)', background: 'transparent', marginLeft: '12px', marginRight: '12px'}} onClick={() => { logout(); navigate('/login'); }}>Logout</button>
              <div className="user-chip">
                <div className="user-avatar">{getInitials(userName)}</div>
                <div className="user-meta"><div className="name">Hello, {userName}</div><div className="role">{userRole}</div></div>
              </div>
            </div>
          </header>

          <main className="main">
            {/* HERO + SUMMARY */}
            <div className="hero-rec">
              <div className="hero-text-card">
                <h1>Your Career <span className="grad">Recommendations</span> Are Ready 🎉</h1>
                <p>Based on your interests, technical preferences, and assessment responses, we've identified the career paths that best match your profile.</p>
                <div className="hero-actions">
                  <a href="#topmatch" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('topmatch')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>View Best Match →</a>
                  <a href="#" className="btn btn-outline" onClick={(e) => { e.preventDefault(); navigate('/assessment'); }}>Retake Assessment</a>
                </div>
              </div>

              <div className="summary-card">
                <h3>Assessment Summary</h3>
                <div className="sum-row"><span className="k">📅 Assessment Completed</span><span className="v">{rec ? new Date(rec.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Loading...'}</span></div>
                <div className="sum-row"><span className="k">❓ Questions Answered</span><span className="v">10 / 10</span></div>
                <div className="interest-label">Your Top Interests</div>
                <div className="interest-chips">
                  {rec?.strengths ? rec.strengths.map((strength, i) => (
                    <span key={i}>✓ {strength}</span>
                  )) : <span>Loading...</span>}
                </div>
              </div>
            </div>

            {/* TOP MATCH */}
            <div className="top-match" id="topmatch">
              <span className="tm-badge">⭐ Top Career Match</span>
              <div className="tm-body">
                <div>
                  <div className="tm-top">
                    <div className="tm-icon">🔷</div>
                    <div>
                      <div className="tm-title"><h2>{rec ? rec.careerTitle : 'Loading...'}</h2><span className="tm-excellent">✓ Excellent Match</span></div>
                      <p className="tm-desc">{rec ? rec.recommendationReason : 'Loading description...'}</p>
                    </div>
                  </div>
                  <div className="tm-stats">
                    <div className="tm-stat"><div className="lbl">Average Salary</div><div className="val">{rec ? rec.averageSalary : '-'}</div></div>
                    <div className="tm-stat"><div className="lbl">Industry Demand</div><div className="val">{rec ? rec.industryDemand : '-'}</div></div>
                    <div className="tm-stat"><div className="lbl">Learning Duration</div><div className="val">{rec ? rec.estimatedDuration : '-'}</div></div>
                  </div>
                  <div className="tm-tech-label">Required Technologies</div>
                  <div className="tm-tech">
                    {rec?.recommendedSkills ? rec.recommendedSkills.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    )) : <span>Loading...</span>}
                  </div>
                    <div className="tm-actions">
                      <a href="#" className="btn btn-primary" onClick={handleStartRoadmap}>Start Learning Roadmap →</a>
                      <a href="#" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById('alternatives')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore Alternatives</a>
                    </div>
                </div>

                <div className="match-ring">
                  <div className="ring">
                    <svg viewBox="0 0 150 150">
                      <defs><linearGradient id="ringGradTop" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2563EB"/><stop offset="60%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient></defs>
                      <circle className="ring-track" cx="75" cy="75" r="64"/>
                      <circle className="ring-fill" cx="75" cy="75" r="64" strokeDasharray="402.1" strokeDashoffset="402.1" id="topRing"/>
                    </svg>
                    <div className="ring-text"><span className="pct">94%</span><span className="lbl">Match Score</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* OTHER CAREERS */}
            <div className="section-block">
              <div className="section-block-head"><h3>Other Recommended Careers</h3><a href="#">View All Careers →</a></div>
              <div className="career-row" id="careerRow">
                {rec?.alternatives?.length > 0 ? rec.alternatives.map((c, i) => {
                  const match = c.matchPercentage;
                  const ringColor = match >= 85 ? '#16A34A' : match >= 75 ? '#2563EB' : '#7C3AED';
                  const circumference = 2 * Math.PI * 20;
                  const offset = circumference - (match / 100) * circumference;
                  
                  // Keep dynamic icons/gradients
                  const grads = ["linear-gradient(135deg,#2563EB,#3B82F6)", "linear-gradient(135deg,#06B6D4,#2563EB)", "linear-gradient(135deg,#7C3AED,#A78BFA)"];
                  const icons = ["☕", "🎨", "📊"];
                  
                  return (
                    <div key={i} className="career-card">
                      <div className="cc-top">
                        <div className="cc-icon" style={{ background: grads[i % 3] }}>{icons[i % 3]}</div>
                        <div className="cc-ring">
                          <svg viewBox="0 0 46 46">
                            <circle className="cc-ring-track" cx="23" cy="23" r="20" />
                            <circle className="cc-ring-fill" cx="23" cy="23" r="20" stroke={ringColor} strokeDasharray={circumference} strokeDashoffset={offset} />
                          </svg>
                          <div className="cc-ring-text">{match}%</div>
                        </div>
                      </div>
                      <h4>{c.title}</h4>
                      <p className="cdesc">{c.description}</p>
                      <div className="cc-meta-row"><span className="k">Demand</span><span className="v">{c.industryDemand}</span></div>
                      <div className="cc-meta-row"><span className="k">Duration</span><span className="v">{c.estimatedDuration}</span></div>
                      <div className="cc-meta-row"><span className="k">Salary</span><span className="v">{c.averageSalary}</span></div>
                      <div className="cc-btns"><button className="cc-btn-compare">Compare</button><button className="cc-btn-roadmap" onClick={() => navigate('/roadmap')}>View Roadmap</button></div>
                    </div>
                  );
                }) : <div style={{ padding: '20px', color: 'var(--ink-soft)' }}>Loading alternative careers...</div>}
              </div>
            </div>

            {/* WHY + ROADMAP */}
            <div className="section-block" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
              <div className="why-card">
                <h3>Why These Recommendations?</h3>
                <p>Your assessment responses were analyzed across multiple factors.</p>
                <div id="scoreList">
                  {rec?.categoryScores?.length > 0 ? rec.categoryScores.map((s, i) => {
                    const grads = [
                        "linear-gradient(135deg,#2563EB,#7C3AED)",
                        "linear-gradient(135deg,#7C3AED,#A78BFA)",
                        "linear-gradient(135deg,#06B6D4,#2563EB)",
                        "linear-gradient(135deg,#F59E0B,#FBBF24)",
                        "linear-gradient(135deg,#2563EB,#06B6D4)"
                    ];
                    const icons = ["⚙️", "💻", "🧩", "📱", "🌐"];
                    return (
                      <div key={i} className="score-row">
                        <div className="score-ic" style={{ background: grads[i % grads.length] }}>{icons[i % icons.length]}</div>
                        <div className="score-body">
                          <div className="score-top"><span>{s.label}</span><span>{s.percentage}%</span></div>
                          <div className="score-bar-track">
                            <div className="score-bar-fill" data-pct={s.percentage} style={{ width: `${s.percentage}%` }}></div>
                          </div>
                        </div>
                      </div>
                    );
                  }) : <div style={{ padding: '20px', color: 'var(--ink-soft)' }}>Loading insights...</div>}
                </div>
              </div>

              <div className="roadmap-card">
                <h3>Learning Journey Preview</h3>
                <p>{rec?.careerTitle || 'Career'} roadmap</p>
                <div className="rm-timeline">
                  {rec?.roadmapSteps?.length > 0 ? rec.roadmapSteps.map((step, i) => (
                    <div key={i} className="rm-step">
                      <div className="rm-step-top">
                        <div className="rm-num">{step.stepNumber}</div>
                        <span className="rm-week">{step.duration}</span>
                      </div>
                      <div className="rm-skill">{step.title}</div>
                      <p className="rm-sub">{step.subtitle}</p>
                    </div>
                  )) : <div style={{ padding: '20px', color: 'var(--ink-soft)' }}>Loading roadmap preview...</div>}
                </div>
                <div className="rm-foot"><button onClick={() => navigate('/roadmap')} className="btn btn-outline" style={{ width: '100%' }}>View Full Roadmap →</button></div>
              </div>
            </div>

            {/* NEXT STEPS */}
            <div className="section-block">
              <div className="next-steps-card">
                <h3>Next Steps in Your Journey</h3>
                <div className="ns-track">
                  <div className="ns-connector"><div className="ns-connector-fill" style={{ width: '25%' }}></div></div>
                  <div className="ns-step done"><div className="ns-circle">✓</div><span className="ns-label">Assessment</span><span className="ns-status">Completed</span></div>
                  <div className="ns-step done"><div className="ns-circle">✓</div><span className="ns-label">Recommendation</span><span className="ns-status">Completed</span></div>
                  <div className="ns-step current"><div className="ns-circle">3</div><span className="ns-label">Career Selection</span><span className="ns-status">Current Step</span></div>
                  <div className="ns-step"><div className="ns-circle">4</div><span className="ns-label">Learning Roadmap</span><span className="ns-status">Upcoming</span></div>
                  <div className="ns-step"><div className="ns-circle">5</div><span className="ns-label">Projects</span><span className="ns-status">Upcoming</span></div>
                  <div className="ns-step"><div className="ns-circle">6</div><span className="ns-label">Mock Assessment</span><span className="ns-status">Upcoming</span></div>
                  <div className="ns-step"><div className="ns-circle">7</div><span className="ns-label">Placement Ready</span><span className="ns-status">Upcoming</span></div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-band">
              <h2>Choose Your Career Path</h2>
              <div className="cta-buttons">
                <a href="#" className="btn btn-lg btn-white">Start Learning</a>
                <a href="#" className="btn btn-lg btn-outline-light">Compare Careers</a>
                <a href="#" className="btn btn-lg btn-outline-light" onClick={(e) => { e.preventDefault(); navigate('/assessment'); }}>Retake Assessment</a>
              </div>
            </div>

          </main>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="modal-content" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', maxWidth: '600px', width: '90%', position: 'relative' }}>
            <button style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>✕</button>
            <h2 style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>{rec?.careerTitle}</h2>
            <p style={{ marginBottom: '20px', color: 'var(--ink-soft)', lineHeight: '1.5' }}>{rec?.careerDescription}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', padding: '15px', background: 'var(--bg)', borderRadius: '8px' }}>
              <div><strong>💰 Salary:</strong> {rec?.averageSalary}</div>
              <div><strong>📈 Demand:</strong> {rec?.industryDemand}</div>
              <div><strong>⏱️ Duration:</strong> {rec?.estimatedDuration}</div>
              <div><strong>🎯 Match Score:</strong> {rec?.matchPercentage}%</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <strong style={{ display: 'block', marginBottom: '10px' }}>Key Strengths Validated:</strong>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {rec?.strengths?.map(s => <span key={s} style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '5px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: '600' }}>✓ {s}</span>)}
              </div>
            </div>
            <a href="#" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%', boxSizing: 'border-box' }} onClick={(e) => { e.preventDefault(); navigate('/roadmap'); }}>Proceed to Learning Roadmap</a>
          </div>
        </div>
      )}

    </div>
  );
}
