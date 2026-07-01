import React, { useEffect } from 'react';
import './CareerRecommendation.css';
import { useNavigate } from 'react-router-dom';

const otherCareers = [
  { name:"Java Full Stack Developer", icon:"☕", grad:"linear-gradient(135deg,#2563EB,#3B82F6)", match:88, desc:"Great match for your problem-solving skills and interest in enterprise applications.", demand:"Very High", duration:"8–10 Months", salary:"₹7–16 LPA" },
  { name:"Frontend Developer", icon:"🎨", grad:"linear-gradient(135deg,#06B6D4,#2563EB)", match:82, desc:"Good match for your creativity and interest in building user interfaces.", demand:"High", duration:"6–8 Months", salary:"₹6–14 LPA" },
  { name:"Data Analyst", icon:"📊", grad:"linear-gradient(135deg,#7C3AED,#A78BFA)", match:75, desc:"Decent match for your analytical thinking and interest in working with data.", demand:"High", duration:"6–8 Months", salary:"₹5–12 LPA" },
  { name:"Cloud Engineer", icon:"☁️", grad:"linear-gradient(135deg,#7C3AED,#06B6D4)", match:72, desc:"Good potential match for your interest in cloud technologies and infrastructure.", demand:"High", duration:"8–10 Months", salary:"₹7–15 LPA" },
];

const scores = [
  { label:"Interest in Backend Development", pct:95, icon:"⚙️", grad:"linear-gradient(135deg,#2563EB,#7C3AED)" },
  { label:"Programming Skills", pct:90, icon:"💻", grad:"linear-gradient(135deg,#7C3AED,#A78BFA)" },
  { label:"Problem Solving Ability", pct:88, icon:"🧩", grad:"linear-gradient(135deg,#06B6D4,#2563EB)" },
  { label:"Database & SQL Interest", pct:85, icon:"🗄️", grad:"linear-gradient(135deg,#F59E0B,#FBBF24)" },
  { label:"Web Development Interest", pct:92, icon:"🌐", grad:"linear-gradient(135deg,#2563EB,#06B6D4)" },
];

export default function CareerRecommendation() {
  const navigate = useNavigate();

  useEffect(() => {
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
            <a href="#" className="sb-link"><span className="ic">📊</span>Dashboard</a>
            <a href="#" className="sb-link"><span className="ic">📝</span>Assessment</a>
            <a href="#" className="sb-link active"><span className="ic">🎯</span>Recommendation</a>
            <a href="#" className="sb-link"><span className="ic">🗺️</span>Roadmap</a>
            <a href="#" className="sb-link"><span className="ic">📈</span>Skill Progress</a>
            <a href="#" className="sb-link"><span className="ic">💼</span>Projects</a>
            <a href="#" className="sb-link"><span className="ic">✅</span>Mock Tests</a>
            <a href="#" className="sb-link"><span className="ic">📄</span>Resume Gap</a>
            <a href="#" className="sb-link"><span className="ic">🏆</span>Placement Readiness</a>
            <a href="#" className="sb-link"><span className="ic">🚀</span>Opportunities</a>
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
              <div className="user-chip">
                <div className="user-avatar">RS</div>
                <div className="user-meta"><div className="name">Hello, Rahul</div><div className="role">Student</div></div>
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
                  <a href="#topmatch" className="btn btn-primary">View Best Match →</a>
                  <a href="#" className="btn btn-outline" onClick={(e) => { e.preventDefault(); navigate('/assessment'); }}>Retake Assessment</a>
                </div>
              </div>

              <div className="summary-card">
                <h3>Assessment Summary</h3>
                <div className="sum-row"><span className="k">📅 Assessment Completed</span><span className="v">May 18, 2026</span></div>
                <div className="sum-row"><span className="k">❓ Questions Answered</span><span className="v">20 / 20</span></div>
                <div className="sum-row"><span className="k">⏱️ Completion Time</span><span className="v">12 min 48 sec</span></div>
                <div className="interest-label">Your Top Interests</div>
                <div className="interest-chips">
                  <span>✓ Backend Development</span>
                  <span>✓ Problem Solving</span>
                  <span>✓ APIs</span>
                  <span>✓ Cloud Computing</span>
                  <span>✓ Database Design</span>
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
                      <div className="tm-title"><h2>.NET Full Stack Developer</h2><span className="tm-excellent">✓ Excellent Match</span></div>
                      <p className="tm-desc">This role perfectly aligns with your interests in backend development, APIs, databases, and enterprise application development.</p>
                    </div>
                  </div>
                  <div className="tm-stats">
                    <div className="tm-stat"><div className="lbl">Average Salary</div><div className="val">₹8–18 LPA</div></div>
                    <div className="tm-stat"><div className="lbl">Industry Demand</div><div className="val">Very High</div></div>
                    <div className="tm-stat"><div className="lbl">Difficulty</div><div className="val">Medium</div></div>
                    <div className="tm-stat"><div className="lbl">Learning Duration</div><div className="val">8–10 Months</div></div>
                    <div className="tm-stat"><div className="lbl">Hiring Trend</div><div className="val" style={{ color: 'var(--success)' }}>↗ Growing +32%</div></div>
                  </div>
                  <div className="tm-tech-label">Required Technologies</div>
                  <div className="tm-tech">
                    <span>C#</span><span>ASP.NET Core</span><span>SQL Server</span><span>Entity Framework</span><span>REST API</span><span>JWT</span><span>React</span><span>Git</span><span>Azure</span>
                  </div>
                  <div className="tm-actions">
                    <a href="#" className="btn btn-primary">Start Learning Roadmap →</a>
                    <a href="#" className="btn btn-outline">View Career Details</a>
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
                {otherCareers.map((c, i) => {
                  const ringColor = c.match >= 85 ? '#16A34A' : c.match >= 75 ? '#2563EB' : '#7C3AED';
                  const circumference = 2 * Math.PI * 20;
                  const offset = circumference - (c.match / 100) * circumference;
                  return (
                    <div key={i} className="career-card">
                      <div className="cc-top">
                        <div className="cc-icon" style={{ background: c.grad }}>{c.icon}</div>
                        <div className="cc-ring">
                          <svg viewBox="0 0 46 46">
                            <circle className="cc-ring-track" cx="23" cy="23" r="20" />
                            <circle className="cc-ring-fill" cx="23" cy="23" r="20" stroke={ringColor} strokeDasharray={circumference} strokeDashoffset={offset} />
                          </svg>
                          <div className="cc-ring-text">{c.match}%</div>
                        </div>
                      </div>
                      <h4>{c.name}</h4>
                      <p className="cdesc">{c.desc}</p>
                      <div className="cc-meta-row"><span className="k">Demand</span><span className="v">{c.demand}</span></div>
                      <div className="cc-meta-row"><span className="k">Duration</span><span className="v">{c.duration}</span></div>
                      <div className="cc-meta-row"><span className="k">Salary</span><span className="v">{c.salary}</span></div>
                      <div className="cc-btns"><button className="cc-btn-compare">Compare</button><button className="cc-btn-roadmap">View Roadmap</button></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WHY + ROADMAP */}
            <div className="section-block" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
              <div className="why-card">
                <h3>Why These Recommendations?</h3>
                <p>Your assessment responses were analyzed across multiple factors.</p>
                <div id="scoreList">
                  {scores.map((s, i) => (
                    <div key={i} className="score-row">
                      <div className="score-ic" style={{ background: s.grad }}>{s.icon}</div>
                      <div className="score-body">
                        <div className="score-top"><span>{s.label}</span><span>{s.pct}%</span></div>
                        <div className="score-bar-track">
                          <div className="score-bar-fill" data-pct={s.pct} style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="roadmap-card">
                <h3>Learning Journey Preview</h3>
                <p>.NET Full Stack Developer roadmap</p>
                <div className="rm-timeline">
                  <div className="rm-step"><div className="rm-step-top"><div className="rm-num">1</div><span className="rm-week">Week 1–2</span></div><div className="rm-skill">C# &amp; OOP</div><p className="rm-sub">Language fundamentals</p></div>
                  <div className="rm-step"><div className="rm-step-top"><div className="rm-num">2</div><span className="rm-week">Week 3</span></div><div className="rm-skill">SQL Server</div><p className="rm-sub">Database design</p></div>
                  <div className="rm-step"><div className="rm-step-top"><div className="rm-num">3</div><span className="rm-week">Week 4–5</span></div><div className="rm-skill">ASP.NET Core + REST APIs</div><p className="rm-sub">Backend &amp; JWT auth</p></div>
                  <div className="rm-step"><div className="rm-step-top"><div className="rm-num">4</div><span className="rm-week">Week 6–8</span></div><div className="rm-skill">React + Project</div><p className="rm-sub">Frontend &amp; capstone</p></div>
                </div>
                <div className="rm-foot"><a href="#" className="btn btn-outline" style={{ width: '100%' }}>View Full Roadmap →</a></div>
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
    </div>
  );
}
