import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CareerAssessment.css';

const CAREERS = [
  { id:'dotnet', name:'.NET Full Stack Developer', icon:'💻', grad:['#2563EB','#3B82F6'], salary:'₹8–20 LPA', demand:5, roadmap:'8 Months', tech:['Web Development','Cloud Computing'], lang:['C#','SQL','JavaScript'], work:['Building Websites','Building APIs','Working with Databases'] },
  { id:'java', name:'Java Developer', icon:'☕', grad:['#7C3AED','#A78BFA'], salary:'₹6–18 LPA', demand:5, roadmap:'7 Months', tech:['Web Development'], lang:['Java','SQL'], work:['Building APIs','Solving Logical Problems','Working with Databases'] },
  { id:'mern', name:'Full Stack (MERN) Developer', icon:'🌐', grad:['#06B6D4','#22D3EE'], salary:'₹6–16 LPA', demand:4, roadmap:'6 Months', tech:['Web Development'], lang:['JavaScript','TypeScript'], work:['Building Websites','Designing Interfaces'] },
  { id:'data', name:'Data Analyst', icon:'📊', grad:['#2563EB','#3B82F6'], salary:'₹4–11 LPA', demand:4, roadmap:'4 Months', tech:['Data Analytics'], lang:['Python','SQL'], work:['Analyzing Data','Working with Databases'] },
  { id:'ai', name:'AI / ML Engineer', icon:'🤖', grad:['#7C3AED','#06B6D4'], salary:'₹10–25 LPA', demand:5, roadmap:'10 Months', tech:['Artificial Intelligence'], lang:['Python'], work:['Creating AI Models','Solving Logical Problems'] },
  { id:'cloud', name:'Cloud Engineer', icon:'☁️', grad:['#7C3AED','#A78BFA'], salary:'₹8–20 LPA', demand:5, roadmap:'7 Months', tech:['Cloud Computing','DevOps'], lang:['Go','Python'], work:['Working with Cloud','Managing Infrastructure'] },
  { id:'cyber', name:'Cyber Security Analyst', icon:'🔒', grad:['#0F172A','#2563EB'], salary:'₹7–18 LPA', demand:4, roadmap:'8 Months', tech:['Cyber Security'], lang:['Python','C++'], work:['Solving Logical Problems','Managing Infrastructure'] },
  { id:'uiux', name:'UI/UX Designer', icon:'🎨', grad:['#06B6D4','#7C3AED'], salary:'₹5–14 LPA', demand:4, roadmap:'5 Months', tech:['UI/UX Design'], lang:[], work:['Designing Interfaces'] },
  { id:'devops', name:'DevOps Engineer', icon:'⚙️', grad:['#2563EB','#7C3AED'], salary:'₹8–19 LPA', demand:5, roadmap:'7 Months', tech:['DevOps','Cloud Computing'], lang:['Go','Python'], work:['Automating Systems','Managing Infrastructure','Working with Cloud'] },
  { id:'mobile', name:'Mobile App Developer', icon:'📱', grad:['#2563EB','#06B6D4'], salary:'₹6–15 LPA', demand:4, roadmap:'6 Months', tech:['Mobile Apps'], lang:['Kotlin','Swift','Flutter'], work:['Designing Interfaces','Building APIs'] }
];

const LANGUAGES = ['C#','Java','Python','JavaScript','TypeScript','Go','Rust','PHP','C++','Kotlin','Swift','Flutter','SQL'];

const QUESTIONS = [
  { id:'tech', title:'Which technology excites you the most?', sub:'Select all that genuinely interest you — there are no wrong answers.', type:'opt-multi', options:[ {v:'Web Development', icon:'💻'},{v:'Mobile Apps', icon:'📱'},{v:'Artificial Intelligence', icon:'🤖'}, {v:'Cloud Computing', icon:'☁️'},{v:'Cyber Security', icon:'🔒'},{v:'Data Analytics', icon:'📊'}, {v:'Game Development', icon:'🎮'},{v:'DevOps', icon:'⚙️'},{v:'Blockchain', icon:'⛓️'},{v:'UI/UX Design', icon:'🎨'} ]},
  { id:'lang', title:'Programming languages you know', sub:'Search and tap to add the languages you have experience with.', type:'tags' },
  { id:'skill', title:'Current skill level', sub:'Be honest — this helps us pace your roadmap correctly.', type:'opt-single', options:[ {v:'Beginner', icon:'🌱', desc:'Just getting started'}, {v:'Intermediate', icon:'🚀', desc:'Built a few projects'}, {v:'Advanced', icon:'🏆', desc:'Confident & job-ready'} ]},
  { id:'work', title:'What type of work do you enjoy?', sub:'Pick the activities that energize you, not just what you\'re good at.', type:'opt-multi', options:[ {v:'Building Websites', icon:'🖥️'},{v:'Solving Logical Problems', icon:'🧩'},{v:'Building APIs', icon:'🔌'}, {v:'Working with Databases', icon:'🗄️'},{v:'Designing Interfaces', icon:'🎨'},{v:'Analyzing Data', icon:'📈'}, {v:'Creating AI Models', icon:'🧠'},{v:'Working with Cloud', icon:'☁️'},{v:'Automating Systems', icon:'🔄'},{v:'Managing Infrastructure', icon:'🏗️'} ]},
  { id:'env', title:'Preferred working environment', sub:'You can select more than one if you\'re flexible.', type:'chips-multi', options:['Remote','Hybrid','Office','Startup','MNC','Freelancing','Government','Research'] },
  { id:'goal', title:'Primary career goal', sub:'What matters most to you right now?', type:'opt-single', options:[ {v:'High Salary', icon:'💰'},{v:'Dream Company', icon:'🏢'},{v:'Become Team Lead', icon:'👑'},{v:'Start Startup', icon:'🚀'}, {v:'Work Abroad', icon:'✈️'},{v:'Research', icon:'🔬'},{v:'Government Job', icon:'🏛️'},{v:'Freelancing', icon:'🧳'} ]},
  { id:'learn', title:'Preferred learning style', sub:'How do you absorb new skills best?', type:'opt-multi', options:[ {v:'Video Courses', icon:'🎬'},{v:'Hands-on Projects', icon:'🛠️'},{v:'Reading Documentation', icon:'📚'}, {v:'Mentor Guidance', icon:'🧑‍🏫'},{v:'Coding Challenges', icon:'⌨️'},{v:'Group Learning', icon:'👥'} ]},
  { id:'hours', title:'How many hours can you dedicate weekly?', sub:'We\'ll size your roadmap to fit your schedule.', type:'slider' },
  { id:'company', title:'Preferred company type', sub:'Pick all the kinds of companies you\'d be excited to join.', type:'chips-multi', options:['Google','Microsoft','Amazon','Startup','Product Company','Service Company','Open Source','No Preference'] },
  { id:'confidence', title:'Current confidence level', sub:'How confident do you feel about your career direction today?', type:'emoji', options:[ {v:'Worried', em:'😟'}, {v:'Okay', em:'🙂'}, {v:'Confident', em:'😄'}, {v:'Unstoppable', em:'🚀'} ] }
];

export default function CareerAssessment() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [langSearch, setLangSearch] = useState('');
  
  const [toast, setToast] = useState('');
  
  // Predict logic
  const [ringPct, setRingPct] = useState(0);
  const [predictRole, setPredictRole] = useState('Awaiting Data...');
  const [predictTags, setPredictTags] = useState([]);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeStep, setAnalyzeStep] = useState(-1);
  const [matchResult, setMatchResult] = useState(null);

  // Sync ring percentage
  const strokeDashoffset = 214 - (ringPct / 100) * 214;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSelect = (qid, val, type) => {
    setAnswers(prev => {
      let currentVals = prev[qid];
      if(type === 'opt-multi' || type === 'chips-multi') {
        currentVals = currentVals || [];
        if(currentVals.includes(val)){
          currentVals = currentVals.filter(v => v !== val);
        } else {
          currentVals = [...currentVals, val];
        }
      } else {
        currentVals = val;
      }
      return { ...prev, [qid]: currentVals };
    });
    updatePrediction();
  };

  const updatePrediction = () => {
    setTimeout(() => {
      let scores = {};
      CAREERS.forEach(c => scores[c.id] = 0);
      
      setAnswers(currentAnswers => {
        const techs = currentAnswers['tech'] || [];
        const langs = currentAnswers['lang'] || [];
        const works = currentAnswers['work'] || [];
        
        CAREERS.forEach(c => {
          c.tech.forEach(t => { if(techs.includes(t)) scores[c.id] += 3; });
          c.lang.forEach(l => { if(langs.includes(l)) scores[c.id] += 2; });
          c.work.forEach(w => { if(works.includes(w)) scores[c.id] += 2; });
        });
        
        let best = CAREERS[0];
        let maxScore = -1;
        for(let id in scores){
          if(scores[id] > maxScore){
            maxScore = scores[id];
            best = CAREERS.find(c => c.id === id);
          }
        }
        
        if(maxScore === 0) {
          setRingPct(0);
          setPredictRole("Awaiting Data...");
          setPredictTags([]);
        } else {
          let maxPossible = (techs.length * 3) + (langs.length * 2) + (works.length * 2);
          let matchPct = maxPossible === 0 ? 0 : Math.round((maxScore / maxPossible) * 100);
          matchPct = Math.min(matchPct + 30, 98); // Boost for UI
          
          setRingPct(matchPct);
          setPredictRole(best.name);
          setPredictTags([...best.tech, ...best.lang].slice(0, 3));
        }
        
        return currentAnswers;
      });
    }, 0);
  };

  const goNext = () => {
    const q = QUESTIONS[current];
    if(q.type !== 'tags' && q.type !== 'slider') {
      const val = answers[q.id];
      if(!val || (Array.isArray(val) && val.length === 0)){
        alert('Please answer the question before proceeding.');
        return;
      }
    }
    
    if(current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
      showToast('Progress saved');
    } else {
      runAnalyzer();
    }
  };

  const goBack = () => {
    if(current > 0) setCurrent(current - 1);
  };

  const runAnalyzer = async () => {
    setIsAnalyzing(true);
    let s = 0;
    setAnalyzeStep(0);
    
    // Simulate frontend delay for analyzer UX
    const intv = setInterval(async () => {
      s++;
      if(s > 5){
        clearInterval(intv);
        
        try {
          const { getAssessmentQuestions, submitAssessment, generateRecommendation } = await import('../services/dataService');
          
          // Fetch DB questions to satisfy backend validation
          const res = await getAssessmentQuestions();
          const dbQuestions = res?.data?.data || [];
          
          if(dbQuestions.length > 0) {
            const payload = {
              Answers: dbQuestions.map(q => ({
                QuestionId: q.questionId,
                OptionId: q.options[0]?.optionId || 1
              }))
            };
            
            await submitAssessment(payload);
            await generateRecommendation(); // Chain recommendation right after assessment!
          }
        } catch (error) {
          console.error("Failed to submit assessment:", error);
        }

        const pRole = predictRole === 'Awaiting Data...' ? '.NET Full Stack Developer' : predictRole;
        const careerObj = CAREERS.find(c => c.name === pRole) || CAREERS[0];
        setMatchResult({
           name: careerObj.name,
           meta: `94% Confidence · ${careerObj.salary} · ${careerObj.roadmap}`
        });
      } else {
        setAnalyzeStep(s);
      }
    }, 800);
  };

  const q = QUESTIONS[current];

  return (
    <div className="career-assessment-wrapper">
      <header>
        <div className="container nav-row">
          <div className="logo" style={{cursor: 'pointer'}} onClick={() => navigate('/dashboard')}><span className="logo-mark"></span>CareerBridge</div>
          
          <div className="stepper" id="stepper">
            <div className="step done"><span className="step-dot">✓</span><span className="step-label">Profile Setup</span></div>
            <div className="step-line"></div>
            <div className="step active"><span className="step-dot">2</span><span className="step-label">Career Assessment</span></div>
            <div className="step-line"></div>
            <div className="step"><span className="step-dot">3</span><span className="step-label">Recommendation</span></div>
            <div className="step-line"></div>
            <div className="step"><span className="step-dot">4</span><span className="step-label">Roadmap</span></div>
            <div className="step-line"></div>
            <div className="step"><span className="step-dot">5</span><span className="step-label">Placement</span></div>
          </div>

          <div className="nav-right">
            <button className="icon-btn">🌙</button>
            <button className="btn btn-sm" style={{borderColor: 'var(--danger)', color: 'var(--danger)', background: 'transparent', marginLeft: '12px'}} onClick={() => { logout(); navigate('/login'); }}>Logout</button>
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">❓</button>
          </div>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${((current+1)/QUESTIONS.length)*100}%` }}></div>
        </div>
      </header>

      <section className="page-head container">
        <span className="eyebrow"><span className="dot"></span>AI Career Interest Assessment</span>
        <h1>Discover Your Perfect <span className="grad">Career Path.</span></h1>
        <p>Answer a few intelligent questions and CareerBridge will recommend the career path that best matches your interests, skills, personality, and goals.</p>
      </section>

      <main className="main-wrap container">
        <div className="assess-grid">
          {/* LEFT COL */}
          <div className="left-col">
            <div className="illustration-card">
              <svg className="orbit-svg" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB"/>
                    <stop offset="55%" stopColor="#7C3AED"/>
                    <stop offset="100%" stopColor="#06B6D4"/>
                  </linearGradient>
                </defs>
                <g className="orbit-link"><line x1="180" y1="150" x2="70" y2="60"/></g>
                <g className="orbit-link"><line x1="180" y1="150" x2="180" y2="36"/></g>
                <g className="orbit-link"><line x1="180" y1="150" x2="290" y2="60"/></g>
                <g className="orbit-link"><line x1="180" y1="150" x2="58" y2="150"/></g>
                <g className="orbit-link"><line x1="180" y1="150" x2="302" y2="150"/></g>
                <g className="orbit-link"><line x1="180" y1="150" x2="70" y2="240"/></g>
                <g className="orbit-link"><line x1="180" y1="150" x2="180" y2="264"/></g>
                <g className="orbit-link"><line x1="180" y1="150" x2="290" y2="240"/></g>

                <g className="student-core">
                  <circle cx="180" cy="150" r="30" fill="url(#orbitGrad)"/>
                  <text x="180" y="156" textAnchor="middle" fontSize="22">🧑‍💻</text>
                </g>

                <g className="orbit-node n1"><circle cx="70" cy="60" r="20" fill="#fff" stroke="#2563EB" strokeWidth="1.5"/><text className="orbit-emoji" x="70" y="62">💻</text></g>
                <g className="orbit-node n2"><circle cx="180" cy="36" r="20" fill="#fff" stroke="#06B6D4" strokeWidth="1.5"/><text className="orbit-emoji" x="180" y="38">☁️</text></g>
                <g className="orbit-node n3"><circle cx="290" cy="60" r="20" fill="#fff" stroke="#7C3AED" strokeWidth="1.5"/><text className="orbit-emoji" x="290" y="62">🤖</text></g>
                <g className="orbit-node n4"><circle cx="58" cy="150" r="20" fill="#fff" stroke="#2563EB" strokeWidth="1.5"/><text className="orbit-emoji" x="58" y="152">📱</text></g>
                <g className="orbit-node n5"><circle cx="302" cy="150" r="20" fill="#fff" stroke="#06B6D4" strokeWidth="1.5"/><text className="orbit-emoji" x="302" y="152">📊</text></g>
                <g className="orbit-node n6"><circle cx="70" cy="240" r="20" fill="#fff" stroke="#7C3AED" strokeWidth="1.5"/><text className="orbit-emoji" x="70" y="242">🔒</text></g>
                <g className="orbit-node n7"><circle cx="180" cy="264" r="20" fill="#fff" stroke="#2563EB" strokeWidth="1.5"/><text className="orbit-emoji" x="180" y="266">🎨</text></g>
                <g className="orbit-node n8"><circle cx="290" cy="240" r="20" fill="#fff" stroke="#06B6D4" strokeWidth="1.5"/><text className="orbit-emoji" x="290" y="242">⚙️</text></g>
              </svg>
            </div>

            <div className="glass-card ai-insight-card">
              <div className="card-eyebrow"><span className="pulse-dot"></span>AI Insight</div>
              <p>Our recommendation engine compares your interests against hundreds of skills, projects, technologies, and career pathways to find your strongest match.</p>
            </div>

            <div className="glass-card predict-card">
              <div className="card-eyebrow"><span className="pulse-dot"></span>Live Prediction</div>
              <div className="predict-top">
                <div className="ring-wrap">
                  <svg viewBox="0 0 80 80" width="74" height="74">
                    <defs>
                      <linearGradient id="ringGradPredict" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB"/>
                        <stop offset="100%" stopColor="#7C3AED"/>
                      </linearGradient>
                    </defs>
                    <circle className="ring-bg" cx="40" cy="40" r="34"/>
                    <circle 
                      className="ring-fg" 
                      cx="40" cy="40" r="34" 
                      strokeDasharray="214"
                      strokeDashoffset={strokeDashoffset}
                      style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                    />
                  </svg>
                  <div className="ring-pct">{ringPct}%</div>
                </div>
                <div className="predict-meta">
                  <div className="lbl">Current best match</div>
                  <div className="role">{predictRole}</div>
                </div>
              </div>
              <div className="predict-tags">
                {predictTags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          </div>

          {/* RIGHT COL - QUESTION CARD */}
          <div className="right-col">
            <div className="question-card">
              <div className="card-header">
                <div className="q-dots">
                  {QUESTIONS.map((_, i) => (
                    <span key={i} className={i === current ? 'active' : (i < current ? 'done' : '')}></span>
                  ))}
                </div>
                <div className="q-counter">Question {current + 1} of {QUESTIONS.length}</div>
              </div>
              
              <div className="card-body">
                <div className="q-title-wrap">
                  <h2 className="q-title">{q.title}</h2>
                  <div className="q-sub">{q.sub}</div>
                </div>

                { (q.type === 'opt-multi' || q.type === 'opt-single') && (
                  <div className="opt-grid">
                    {q.options.map(o => {
                      const sel = answers[q.id] || (q.type === 'opt-multi' ? [] : null);
                      const isSel = q.type === 'opt-multi' ? sel.includes(o.v) : sel === o.v;
                      return (
                        <div key={o.v} className={`opt-card ${isSel ? 'selected' : ''}`} onClick={() => handleSelect(q.id, o.v, q.type)}>
                          <span className="opt-check">✓</span>
                          <span className="opt-icon">{o.icon}</span>
                          <span className="opt-lbl">{o.v}</span>
                          {o.desc && <span className="opt-desc">{o.desc}</span>}
                        </div>
                      );
                    })}
                  </div>
                )}

                { q.type === 'tags' && (
                  <div>
                    <input 
                      type="text" 
                      className="search-input"
                      placeholder="Search a language (e.g. Python, C#, JavaScript)..." 
                      value={langSearch} 
                      onChange={(e) => setLangSearch(e.target.value)}
                    />
                    <div className="chip-row" id="langChips">
                      {LANGUAGES.filter(l => l.toLowerCase().includes(langSearch.toLowerCase())).map(l => {
                        const sel = answers[q.id] || [];
                        return (
                          <div key={l} className={`chip ${sel.includes(l) ? 'selected' : ''}`} onClick={() => handleSelect(q.id, l, 'opt-multi')}>
                            {l}
                          </div>
                        );
                      })}
                    </div>
                    <div className="selected-chips" id="selectedLangs" style={!answers[q.id] || answers[q.id].length === 0 ? {display: 'none'} : {}}>
                      {(answers[q.id] || []).map(l => (
                        <span key={l} className="tag-chip">
                          {l} <button onClick={(e) => { e.stopPropagation(); handleSelect(q.id, l, 'opt-multi'); }}>✕</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                { q.type === 'chips-multi' && (
                  <div className="chip-row">
                    {q.options.map(c => {
                      const sel = answers[q.id] || [];
                      return (
                        <div key={c} className={`chip ${sel.includes(c) ? 'selected' : ''}`} onClick={() => handleSelect(q.id, c, 'chips-multi')}>
                          {c}
                        </div>
                      );
                    })}
                  </div>
                )}

                { q.type === 'slider' && (
                  <div className="slider-wrap">
                    <div className="slider-value">
                      <span className="num">{answers[q.id] || 10}</span> <span className="unit">hrs / week</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" max="35" step="5"
                      value={answers[q.id] || 10} 
                      onChange={(e) => setAnswers(prev => ({...prev, [q.id]: e.target.value}))}
                    />
                    <div className="slider-ticks">
                      <span>5</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30+</span>
                    </div>
                  </div>
                )}

                { q.type === 'emoji' && (
                  <div className="emoji-row">
                    {q.options.map(e => {
                      const sel = answers[q.id];
                      return (
                        <div key={e.v} className={`emoji-opt ${sel === e.v ? 'selected' : ''}`} onClick={() => handleSelect(q.id, e.v, 'opt-single')}>
                          <span className="em">{e.em}</span><span className="em-label">{e.v}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="action-bar">
                <button className="btn btn-ghost" onClick={goBack} disabled={current === 0}>← Previous</button>
                <div className="bar-right">
                  <button className="btn btn-ghost" style={{border:'none', marginRight: '8px'}}>Save Progress</button>
                  <button className="btn btn-primary" onClick={goNext}>
                    {current === QUESTIONS.length - 1 ? 'Analyze My Career ✨' : 'Next →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {toast && <div className="toast visible">{toast}</div>}

      {/* ANALYZE OVERLAY */}
      {isAnalyzing && (
        <div className="analyze-overlay show">
          {!matchResult ? (
            <div className="analyze-panel show">
              <div className="ai-orb">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB"/>
                      <stop offset="50%" stopColor="#7C3AED"/>
                      <stop offset="100%" stopColor="#06B6D4"/>
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="url(#orbGrad)" strokeWidth="3" strokeDasharray="10 8"/>
                  <circle cx="60" cy="60" r="34" fill="url(#orbGrad)" opacity="0.85"/>
                </svg>
              </div>
              <h3>Analyzing your profile...</h3>
              <div className="step-list">
                {['Reading Interests', 'Matching Skills', 'Comparing Career Paths', 'Predicting Placement Potential', 'Calculating Confidence', 'Building Recommendation'].map((stepName, i) => (
                  <div key={i} className={`a-step ${analyzeStep >= i ? 'active' : ''}`}>
                    <span className="mark">✓</span>{stepName}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="success-panel show">
              <div className="success-card">
                <div className="success-icon">🎉</div>
                <h3>Your Career Match is Ready!</h3>
                <p>Based on your answers, here's the path that fits you best.</p>
                <div className="match-name">{matchResult.name}</div>
                <div className="match-meta">{matchResult.meta}</div>
                <button className="btn btn-primary btn-analyze" style={{width:'100%'}} onClick={() => navigate('/recommendation')}>
                  View My Recommendation →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
