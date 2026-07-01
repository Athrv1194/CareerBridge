import React, { useState, useEffect } from 'react';
import './CareerRoadmap.css';
import { useNavigate } from 'react-router-dom';

const modules = [
  {id:1,icon:'🎮',title:'Programming Basics',desc:'Learn the fundamentals of programming.',hours:8,diff:'Beginner',status:'done',
   obj:'Build a solid foundation in programming logic and thinking.',
   topics:['Variables & Data Types','Control Flow','Loops','Functions','Arrays','Debugging'],
   prereqs:[],
   resources:[{i:'📖',n:'W3Schools',s:'Beginner Guide'},{i:'▶️',n:'YouTube',s:'CS50 Playlist'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'🔢',title:'Number Guessing Game',diff:'Beginner',time:'2-3 Hours',skills:'Logic, Loops, Functions'}},
  {id:2,icon:'#️⃣',title:'C# Fundamentals',desc:'Syntax, data types, operators and more.',hours:10,diff:'Beginner',status:'done',
   obj:'Master C# syntax and core language concepts.',
   topics:['C# Syntax','Data Types','Operators','String Methods','Type Casting','Input/Output'],
   prereqs:['Programming Basics'],
   resources:[{i:'🔷',n:'Microsoft Learn',s:'Official Docs'},{i:'▶️',n:'YouTube',s:'C# Tutorial'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'🧮',title:'Console Calculator',diff:'Beginner',time:'3-4 Hours',skills:'C#, OOP, Logic'}},
  {id:3,icon:'📦',title:'Object-Oriented Programming',desc:'Learn OOP concepts in C#.',hours:5,diff:'Intermediate',status:'learning',
   obj:'Apply OOP principles to design maintainable, scalable C# applications.',
   topics:['Classes & Objects','Constructors','Inheritance','Polymorphism','Encapsulation','Abstraction','Interfaces','Access Modifiers'],
   prereqs:['C# Fundamentals'],
   resources:[{i:'🔷',n:'Microsoft Learn',s:'Official Documentation'},{i:'▶️',n:'YouTube',s:'OOP in C# Tutorial'},{i:'📝',n:'PDF Notes',s:'Download Notes'},{i:'🌐',n:'Practice Website',s:'Online Exercises'}],
   project:{icon:'📋',title:'Student Management System',diff:'Beginner',time:'3-4 Hours',skills:'OOP, Classes, Lists'}},
  {id:4,icon:'📚',title:'Collections & LINQ',desc:'Working with collections and LINQ queries.',hours:6,diff:'Intermediate',status:'upcoming',
   obj:'Use generic collections and write efficient LINQ queries.',
   topics:['List<T>','Dictionary','LINQ Queries','Lambda Expressions','Extension Methods','IEnumerable'],
   prereqs:['OOP'],
   resources:[{i:'🔷',n:'Microsoft Learn',s:'LINQ Docs'},{i:'▶️',n:'YouTube',s:'LINQ Tutorial'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'📊',title:'Employee Data Filter',diff:'Intermediate',time:'4-5 Hours',skills:'LINQ, Collections, Lambda'}},
  {id:5,icon:'🗄️',title:'SQL Server',desc:'Database concepts and SQL queries.',hours:8,diff:'Intermediate',status:'upcoming',
   obj:'Design relational databases and write complex SQL queries.',
   topics:['DDL/DML','SELECT Queries','Joins','Stored Procedures','Indexes','Transactions'],
   prereqs:['C# Fundamentals'],
   resources:[{i:'🗄️',n:'SQL Docs',s:'Official Guide'},{i:'▶️',n:'YouTube',s:'SQL Server Tutorial'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'🏪',title:'Library Management DB',diff:'Intermediate',time:'5-6 Hours',skills:'SQL, DB Design, Queries'}},
  {id:6,icon:'🔗',title:'Entity Framework Core',desc:'Data access using EF Core.',hours:6,diff:'Intermediate',status:'locked',
   obj:'Use EF Core as an ORM to interact with SQL Server from C#.',
   topics:['DbContext','Migrations','CRUD','Relationships','Fluent API','Code First'],
   prereqs:['SQL Server','OOP'],
   resources:[{i:'🔷',n:'EF Core Docs',s:'Official Guide'},{i:'▶️',n:'YouTube',s:'EF Core Tutorial'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'🛍️',title:'Product Catalog API',diff:'Intermediate',time:'6-7 Hours',skills:'EF Core, SQL, OOP'}},
  {id:7,icon:'🌐',title:'ASP.NET Core Web API',desc:'Building RESTful APIs with ASP.NET Core.',hours:10,diff:'Intermediate',status:'locked',
   obj:'Build production-ready REST APIs using ASP.NET Core.',
   topics:['Controllers','Routing','HTTP Methods','Middleware','Dependency Injection','Model Binding','Swagger'],
   prereqs:['EF Core','C# OOP'],
   resources:[{i:'🔷',n:'Microsoft Learn',s:'ASP.NET Docs'},{i:'▶️',n:'YouTube',s:'ASP.NET Tutorial'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'📡',title:'Library API',diff:'Advanced',time:'8-10 Hours',skills:'ASP.NET, REST, EF Core'}},
  {id:8,icon:'🔐',title:'Authentication & JWT',desc:'Secure APIs using JWT and Identity.',hours:5,diff:'Intermediate',status:'locked',
   obj:'Implement secure authentication and authorization in ASP.NET Core.',
   topics:['JWT Tokens','ASP.NET Identity','Claims','Roles','Refresh Tokens','OAuth basics'],
   prereqs:['ASP.NET Core Web API'],
   resources:[{i:'🔷',n:'Microsoft Learn',s:'Auth Docs'},{i:'▶️',n:'YouTube',s:'JWT Tutorial'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'🔒',title:'Auth System',diff:'Advanced',time:'6-8 Hours',skills:'JWT, Identity, Security'}},
  {id:9,icon:'⚛️',title:'React Fundamentals',desc:'Introduction to React library.',hours:8,diff:'Beginner',status:'locked',
   obj:'Build interactive UIs with React functional components and hooks.',
   topics:['JSX','Props','State','useEffect','Event Handling','Conditional Rendering','Lists'],
   prereqs:['JavaScript basics'],
   resources:[{i:'⚛️',n:'React Docs',s:'Official Guide'},{i:'▶️',n:'YouTube',s:'React Tutorial'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'📝',title:'Todo App',diff:'Beginner',time:'4-5 Hours',skills:'React, Hooks, State'}},
  {id:10,icon:'🔄',title:'React + API Integration',desc:'Integrate React with ASP.NET Core APIs.',hours:8,diff:'Intermediate',status:'locked',
   obj:'Connect React frontend with ASP.NET Core REST APIs.',
   topics:['Axios / Fetch','CORS','JWT in React','React Router','Error Handling','State Management'],
   prereqs:['React Fundamentals','ASP.NET Core API'],
   resources:[{i:'⚛️',n:'React Docs',s:'Advanced Guide'},{i:'▶️',n:'YouTube',s:'Full Stack Tutorial'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'🏥',title:'Hospital Management App',diff:'Advanced',time:'12-15 Hours',skills:'React, ASP.NET, JWT, EF Core'}},
  {id:11,icon:'🚀',title:'Deployment',desc:'Deploy full stack application.',hours:6,diff:'Advanced',status:'locked',
   obj:'Deploy a production-ready .NET + React app to the cloud.',
   topics:['Azure App Service','CI/CD basics','Docker intro','Environment Variables','SSL/HTTPS','Performance tips'],
   prereqs:['React + API Integration'],
   resources:[{i:'☁️',n:'Azure Docs',s:'Deployment Guide'},{i:'▶️',n:'YouTube',s:'Azure Tutorial'},{i:'📝',n:'PDF Notes',s:'Download'}],
   project:{icon:'☁️',title:'Full Stack Deployment',diff:'Advanced',time:'5-6 Hours',skills:'Azure, Docker, CI/CD'}},
];

const statusMap = {
  done: { cls: 'status-done', label: 'Completed', nodeCls: 'done' },
  learning: { cls: 'status-learning', label: 'Learning', nodeCls: 'learning' },
  upcoming: { cls: 'status-upcoming', label: 'Not Started', nodeCls: 'upcoming' },
  locked: { cls: 'status-locked', label: 'Locked', nodeCls: 'locked' }
};

const diffColors = {
  Beginner: 'rgba(22,163,74,.1)',
  Intermediate: 'rgba(245,158,11,.1)',
  Advanced: 'rgba(220,38,38,.1)'
};

const diffText = {
  Beginner: '#16A34A',
  Intermediate: '#D97706',
  Advanced: '#DC2626'
};

export default function CareerRoadmap() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(3);

  const activeModule = modules.find(m => m.id === activeId);
  const sm = activeModule ? statusMap[activeModule.status] : null;

  useEffect(() => {
    // animate progress fills and ring 
    const timer1 = setTimeout(() => {
      document.querySelectorAll('[data-target]').forEach(el => {
        el.style.width = el.getAttribute('data-target');
      });
    }, 200);

    const timer2 = setTimeout(() => {
      const ring = document.getElementById('heroRing');
      if(ring){
        const c = 163.4;
        ring.style.transition = 'stroke-dashoffset 1.3s ease';
        ring.style.strokeDashoffset = c - (0.68 * c);
      }
    }, 300);

    return () => { clearTimeout(timer1); clearTimeout(timer2); }
  }, []);

  return (
    <div className="roadmap-wrapper shell-wrapper">
      <div className="bg-field">
        <div className="grid-ov"></div>
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>

      <div className="shell">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-logo">
            <span className="lm"></span>
            <span>CareerBridge<span className="sub">Your Bridge to Success</span></span>
          </div>
          <nav className="sb-nav">
            <a href="#" className="sb-link"><span className="ic">📊</span>Dashboard</a>
            <a href="#" className="sb-link"><span className="ic">📝</span>Career Assessment</a>
            <a href="#" className="sb-link"><span className="ic">🎯</span>Career Recommendation</a>
            <a href="#" className="sb-link active"><span className="ic">🗺️</span>Learning Roadmap</a>
            <a href="#" className="sb-link"><span className="ic">⚡</span>Skills</a>
            <a href="#" className="sb-link"><span className="ic">💼</span>Projects<span className="cs">Soon</span></a>
            <a href="#" className="sb-link"><span className="ic">✅</span>Assessments<span className="cs">Soon</span></a>
            <a href="#" className="sb-link"><span className="ic">📄</span>Resume Builder<span className="cs">Soon</span></a>
            <a href="#" className="sb-link"><span className="ic">👨‍💼</span>Mentor Connect<span className="cs">Soon</span></a>
            <a href="#" className="sb-link"><span className="ic">🚀</span>Opportunities<span className="cs">Soon</span></a>
            <a href="#" className="sb-link"><span className="ic">👤</span>Profile</a>
            <a href="#" className="sb-link"><span className="ic">⚙️</span>Settings</a>
          </nav>
          <div className="sb-promo">
            <div className="pi">🏆</div>
            <h5>Keep going, Akash! 🚀</h5>
            <p>You're doing great. Stay consistent and achieve your goals.</p>
            <a href="#" className="sb-btn">View Achievements</a>
          </div>
        </aside>

        {/* RIGHT AREA */}
        <div className="right-area">
          {/* TOPBAR */}
          <header className="topbar">
            <div className="search-bar">
              <span>🔍</span>Search skills, courses, topics…
              <span style={{ marginLeft: 'auto', fontSize: '11px', border: '1px solid var(--line)', padding: '2px 7px', borderRadius: '5px' }}>⌘K</span>
            </div>
            <div className="tb-right">
              <div className="streak-chip">🔥 <span>7</span><span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--ink-soft)' }}>Day Streak</span></div>
              <button className="icon-btn">🔔<span className="badge">3</span></button>
              <button className="icon-btn">🌙</button>
              <div className="user-chip">
                <div className="uav">AK</div>
                <div className="umeta"><div className="name">Hi, Akash 👋</div><div className="role">Student</div></div>
              </div>
            </div>
          </header>

          {/* HERO STRIP */}
          <div className="hero-strip">
            <div className="hs-title">
              <h1>My Learning Roadmap</h1>
              <p>Your personalized learning journey based on your selected career path.</p>
              <div className="hs-career">
                <div className="cc-ic">🔷</div>
                <div><div className="cc-lbl">Career Path</div><div className="cc-val">.NET Full Stack Developer</div></div>
              </div>
            </div>
            <div className="hs-stat">
              <div className="lbl">Roadmap Progress</div>
              <div className="val">42%</div>
              <div className="rail"><div className="fill" style={{ width: '0%' }} data-target="42%"></div></div>
            </div>
            <div className="hs-stat">
              <div className="lbl">Estimated Completion</div>
              <div className="val" style={{ fontSize: '18px' }}>5 Months</div>
              <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--ink-soft)' }}>📅 8 completed · 12 remaining</div>
            </div>
            <div className="hs-ring-card">
              <div className="hs-ring">
                <svg viewBox="0 0 62 62">
                  <defs>
                    <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB"/>
                      <stop offset="60%" stopColor="#7C3AED"/>
                      <stop offset="100%" stopColor="#06B6D4"/>
                    </linearGradient>
                  </defs>
                  <circle className="hr-track" cx="31" cy="31" r="26"/>
                  <circle className="hr-fill" id="heroRing" cx="31" cy="31" r="26" strokeDasharray="163.4" strokeDashoffset="163.4"/>
                </svg>
                <div className="hs-ring-text"><span className="pct">68%</span><span className="lbl2">Placement</span></div>
              </div>
              <div className="hs-ring-info"><div className="rl">Placement Progress</div><div className="rv">Looking good!</div></div>
            </div>
          </div>

          {/* 3-COL BODY */}
          <div className="body3">

            {/* ROADMAP LIST */}
            <div className="roadmap-col">
              <div className="rm-col-head">
                <h3>Your Roadmap</h3>
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '11px' }}>Expand All ↗</button>
              </div>
              <div className="rm-legend">
                <span><span className="dot" style={{ background: 'var(--success)' }}></span>Completed</span>
                <span><span className="dot" style={{ background: 'var(--primary)' }}></span>Learning</span>
                <span><span className="dot" style={{ background: '#94A3B8' }}></span>Not Started</span>
                <span><span className="dot" style={{ background: '#CBD5E1' }}></span>Locked</span>
              </div>
              <div id="rmList">
                {modules.map((m) => {
                  const sMap = statusMap[m.status];
                  const isActive = m.id === activeId;
                  const isLocked = m.status === 'locked';
                  return (
                    <div 
                      key={m.id}
                      className={`rm-item ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                      onClick={() => { if (!isLocked) setActiveId(m.id); }}
                    >
                      <div className={`rm-node ${sMap.nodeCls}`}>
                        {m.status === 'done' ? '✓' : m.status === 'learning' ? m.id : m.status === 'locked' ? '🔒' : m.id}
                      </div>
                      <div className="rm-connector"></div>
                      <div className="rm-content">
                        <div className="rm-top">
                          <span className="rm-title">{m.icon} {m.title}</span>
                          <span className={`rm-status ${sMap.cls}`}>{sMap.label}</span>
                        </div>
                        <div className="rm-desc">{m.desc}</div>
                        <div className="rm-meta">
                          <span>⏱ {m.hours} Hours</span>
                          <span>📊 {m.diff}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DETAIL PANEL */}
            <div className="detail-col" id="detailCol">
              {activeModule && (
                <>
                  <div className="detail-card">
                    <div className="dc-toprow">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                        <div className="dc-icon">{activeModule.icon}</div>
                        <div>
                          <h2 className="dc-title">{activeModule.title}</h2>
                          <p style={{ fontSize: '12.5px', marginTop: '4px' }}>{activeModule.obj}</p>
                        </div>
                      </div>
                      <span className={`dc-status-tag ${sm.cls}`}>{sm.label}</span>
                    </div>
                    <div className="dc-meta-row">
                      <div className="dc-meta-item">
                        <div className="dm-l">Estimated Time</div>
                        <div className="dm-v">{activeModule.hours} Hours</div>
                      </div>
                      <div className="dc-meta-item">
                        <div className="dm-l">Difficulty</div>
                        <div className="dm-v" style={{ color: diffText[activeModule.diff] }}>{activeModule.diff}</div>
                      </div>
                      {activeModule.prereqs.length > 0 && (
                        <div className="dc-meta-item">
                          <div className="dm-l">Prerequisites</div>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '3px' }}>
                            {activeModule.prereqs.map((p, i) => (
                              <span key={i} className="prereq-chip">{p}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="dc-section-label">Topics Covered</div>
                    <div className="topics-grid">
                      {activeModule.topics.map((t, i) => (
                        <div key={i} className="topic-chip">✦ {t}</div>
                      ))}
                    </div>

                    <div className="dc-section-label">Learning Resources</div>
                    <div className="resources-grid">
                      {activeModule.resources.map((r, i) => (
                        <div key={i} className="res-card">
                          <div className="ri">{r.i}</div>
                          <div className="rn">{r.n}</div>
                          <div className="rs">{r.s}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-card">
                    <div className="dc-section-label">Practice Project</div>
                    <div className="practice-card">
                      <div className="pc-icon">{activeModule.project.icon}</div>
                      <div className="pc-body">
                        <div className="pc-title">{activeModule.project.title}</div>
                        <div className="pc-meta">{activeModule.project.skills}</div>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '11px', color: 'var(--ink-soft)' }}>
                          <span>⏱ {activeModule.project.time}</span>
                        </div>
                      </div>
                      <span className="pc-diff" style={{ background: diffColors[activeModule.project.diff], color: diffText[activeModule.project.diff] }}>
                        {activeModule.project.diff}
                      </span>
                    </div>
                    
                    <div className="dc-btns">
                      {activeModule.status === 'done' && (
                        <>
                          <button className="btn btn-outline" style={{ flex: 1 }}>Review Module</button>
                          <button className="btn btn-success" style={{ flex: 1 }}>✓ Completed</button>
                        </>
                      )}
                      {activeModule.status === 'learning' && (
                        <>
                          <button className="btn btn-primary" style={{ flex: 1 }}>Continue Learning →</button>
                          <button className="btn btn-outline" style={{ flex: 1 }}>View Notes</button>
                          <button className="btn btn-success" style={{ flex: 1 }}>✓ Mark Complete</button>
                        </>
                      )}
                      {activeModule.status === 'upcoming' && (
                        <>
                          <button className="btn btn-primary" style={{ flex: 1 }}>Start Module →</button>
                          <button className="btn btn-outline">View Details</button>
                        </>
                      )}
                      {activeModule.status === 'locked' && (
                        <button className="btn btn-outline" disabled style={{ flex: 1, opacity: 0.5, cursor: 'not-allowed' }}>
                          🔒 Locked — Complete prerequisites first
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* STATS COL */}
            <div className="stats-col">
              {/* Stats */}
              <div className="sc-card">
                <h4>Roadmap Statistics</h4>
                <div className="stats-grid">
                  <div className="stat-chip"><div className="si">📚</div><div className="sv">8</div><div className="sl">Completed Modules</div></div>
                  <div className="stat-chip"><div className="si">⏰</div><div className="sv">32</div><div className="sl">Learning Hours</div></div>
                  <div className="stat-chip"><div className="si">⚡</div><div className="sv">8</div><div className="sl">Skills Learned</div></div>
                  <div className="stat-chip"><div className="si">🔥</div><div className="sv">7</div><div className="sl">Day Streak</div></div>
                </div>
                <div style={{ marginTop: '14px' }}>
                  <div className="prog-row"><span>Overall Progress</span><span>42%</span></div>
                  <div className="prog-rail"><div className="prog-fill" style={{ width: '0%' }} data-target="42%"></div></div>
                  <p style={{ fontSize: '10.5px', marginTop: '6px' }}>Keep going! You're making great progress.</p>
                </div>
              </div>

              {/* Next Milestone */}
              <div className="milestone-card">
                <h4>🏔️ Next Milestone</h4>
                <p>Complete <b>"Object-Oriented Programming"</b> to unlock your first major project module.</p>
                <div className="milestone-unlocks">
                  <div className="mu-item"><div className="mu-ic">🔒</div>Collections &amp; LINQ</div>
                  <div className="mu-item"><div className="mu-ic">🔒</div>SQL Server Basics</div>
                </div>
                <div className="ms-prog-row"><span>Milestone Progress</span><span>2/4</span></div>
                <div className="prog-rail"><div className="prog-fill" style={{ width: '0%' }} data-target="50%"></div></div>
              </div>

              {/* Achievements */}
              <div className="sc-card">
                <div className="sc-card-head">
                  <h4>Achievements</h4>
                  <a href="#">View All</a>
                </div>
                <div className="ach-grid">
                  <div className="ach-item"><div className="ai">👶</div><div className="an">First Steps</div></div>
                  <div className="ach-item"><div className="ai">🔥</div><div className="an">3 Day Streak</div></div>
                  <div className="ach-item locked-ach"><div className="ai">🎓</div><div className="an">Module Master</div></div>
                  <div className="ach-item locked-ach"><div className="ai">🧩</div><div className="an">Logic Pro</div></div>
                  <div className="ach-item locked-ach"><div className="ai">🛠️</div><div className="an">Builder</div></div>
                  <div className="ach-item locked-ach"><div className="ai">🌟</div><div className="an">Top 10%</div></div>
                </div>
              </div>

              {/* Career Insight */}
              <div className="sc-card" style={{ marginBottom: 0 }}>
                <h4>Career Insights</h4>
                <p style={{ fontSize: '11px', marginBottom: '12px' }}>Skills you are learning match perfectly with these roles:</p>
                <div className="insight-items">
                  <div className="ii"><div className="iic">✓</div>Backend Developer</div>
                  <div className="ii"><div className="iic">✓</div>Software Engineer</div>
                  <div className="ii"><div className="iic">✓</div>API Developer</div>
                </div>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(226,232,240,0.5)' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--ink-soft)', marginBottom: '6px' }}>Recommended Alternate Roles</div>
                  <div className="role-chips">
                    <span className="role-chip">Cloud Engineer</span>
                    <span className="role-chip">DevOps</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
