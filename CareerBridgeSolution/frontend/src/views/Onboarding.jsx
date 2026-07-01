import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const skillGroups = [
  { label:"Languages", items:["Java","Python","JavaScript","TypeScript","C#","C++"] },
  { label:"Frontend", items:["React","Angular","Vue","HTML/CSS","Tailwind CSS"] },
  { label:"Backend", items:["Node.js",".NET","Spring Boot","Express.js","REST API"] },
  { label:"Data & Cloud", items:["SQL","MongoDB","AWS","Azure","Docker"] },
  { label:"Tools", items:["Git","GitHub","Postman","Figma"] },
  { label:"Mobile", items:["Flutter","React Native","Kotlin"] },
];

const careers = [
  { name:"Java Full Stack Developer", icon:"☕", grad:"linear-gradient(135deg,#2563EB,#3B82F6)", salary:"₹8–18 LPA", demand:"Very High", skills:"Java, Spring Boot, React, SQL" },
  { name:".NET Developer", icon:"🔷", grad:"linear-gradient(135deg,#7C3AED,#A78BFA)", salary:"₹6–16 LPA", demand:"High", skills:".NET, C#, Azure, SQL" },
  { name:"Frontend Developer", icon:"🎨", grad:"linear-gradient(135deg,#06B6D4,#2563EB)", salary:"₹5–14 LPA", demand:"High", skills:"React, JavaScript, CSS" },
  { name:"Backend Developer", icon:"⚙️", grad:"linear-gradient(135deg,#2563EB,#7C3AED)", salary:"₹6–15 LPA", demand:"High", skills:"Node.js, SQL, REST API" },
  { name:"Data Analyst", icon:"📊", grad:"linear-gradient(135deg,#06B6D4,#3B82F6)", salary:"₹4–11 LPA", demand:"High", skills:"SQL, Python, Excel" },
  { name:"AI Engineer", icon:"🤖", grad:"linear-gradient(135deg,#7C3AED,#06B6D4)", salary:"₹10–24 LPA", demand:"Very High", skills:"Python, ML, AI APIs" },
  { name:"Cloud Engineer", icon:"☁️", grad:"linear-gradient(135deg,#7C3AED,#A78BFA)", salary:"₹8–20 LPA", demand:"Very High", skills:"AWS, Azure, Docker" },
  { name:"DevOps Engineer", icon:"🔁", grad:"linear-gradient(135deg,#2563EB,#06B6D4)", salary:"₹9–20 LPA", demand:"High", skills:"Docker, CI/CD, Cloud" },
  { name:"Cyber Security", icon:"🛡️", grad:"linear-gradient(135deg,#0F172A,#2563EB)", salary:"₹7–18 LPA", demand:"High", skills:"Networking, Security tools" },
  { name:"Mobile App Developer", icon:"📱", grad:"linear-gradient(135deg,#06B6D4,#7C3AED)", salary:"₹5–13 LPA", demand:"Medium", skills:"Flutter, Kotlin, APIs" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [skillSearch, setSkillSearch] = useState("");
  const [successFlow, setSuccessFlow] = useState(false);
  const [successSteps, setSuccessSteps] = useState(0);

  const [state, setState] = useState({
    basic: { fullName: "", city: "" },
    education: { eduLevel: "", college: "" },
    skills: [],
    careers: [],
    goals: { primaryGoal: null, learningStyle: [], timeAvail: null, difficulty: null }
  });

  const updateState = (category, field, value) => {
    setState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const toggleSkill = (skill) => {
    setState(prev => {
      const skills = prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill) 
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const toggleCareer = (careerName) => {
    setState(prev => {
      const careers = prev.careers.includes(careerName)
        ? prev.careers.filter(c => c !== careerName)
        : [...prev.careers, careerName];
      return { ...prev, careers };
    });
  };

  const handleGoalSelect = (group, value, multi) => {
    setState(prev => {
      let currentVal = prev.goals[group];
      if (multi) {
        currentVal = currentVal.includes(value) 
          ? currentVal.filter(v => v !== value) 
          : [...currentVal, value];
      } else {
        currentVal = value;
      }
      return {
        ...prev,
        goals: { ...prev.goals, [group]: currentVal }
      };
    });
  };

  // Next and Prev handlers
  const nextStep = () => {
    if(currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      runSuccessFlow();
    }
  };

  const prevStep = () => {
    if(currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const runSuccessFlow = () => {
    setSuccessFlow(true);
    let i = 0;
    const interval = setInterval(() => {
      if(i < 3) {
        setSuccessSteps(prev => prev + 1);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => navigate('/assessment'), 1000); // Redirect to assessment
      }
    }, 650);
  };

  const renderSkills = () => {
    const f = skillSearch.trim().toLowerCase();
    return skillGroups.map((group, i) => {
      const items = group.items.filter(s => s.toLowerCase().includes(f));
      if(!items.length) return null;
      return (
        <React.Fragment key={i}>
          <div className="chip-group-label">{group.label}</div>
          <div className="chip-grid">
            {items.map(skill => (
              <div 
                key={skill} 
                className={`chip ${state.skills.includes(skill) ? 'selected' : ''}`} 
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    });
  };

  const renderCareers = () => {
    return careers.map(c => (
      <div 
        key={c.name} 
        className={`career-card ${state.careers.includes(c.name) ? 'selected' : ''}`}
        onClick={() => toggleCareer(c.name)}
      >
        <div className="cc-check">✓</div>
        <div className="cc-top">
          <div className="cc-icon" style={{background: c.grad}}>{c.icon}</div>
          <h4>{c.name}</h4>
        </div>
        <div className="cc-meta">
          <span>{c.salary}</span>
          <span>{c.demand} demand</span>
        </div>
        <div className="cc-skills">{c.skills}</div>
      </div>
    ));
  };

  // Summary computations
  const basicCount = Object.values(state.basic).filter(v => v.trim() !== '').length;
  const basicDone = basicCount >= 2; // Assuming 2 fields
  
  const eduCount = Object.values(state.education).filter(v => v.trim() !== '').length;
  const eduDone = eduCount >= 2;

  const goalsFilled = !!state.goals.primaryGoal || state.goals.learningStyle.length > 0 || !!state.goals.timeAvail || !!state.goals.difficulty;

  const sections = [basicDone, eduDone, state.skills.length > 0, state.careers.length > 0, goalsFilled];
  const completePct = Math.round((sections.filter(Boolean).length / sections.length) * 100);
  const readiness = Math.min(95, Math.round(completePct * 0.6 + state.skills.length * 1.2 + state.careers.length * 2));
  
  const strokeDashoffset = 326.7 - (completePct/100) * 326.7;

  return (
    <>
      <div className="bg-field">
  <div className="grid-overlay"></div>
  <div className="blob blob1"></div>
  <div className="blob blob2"></div>
</div>

      <header>
        <div className="container nav-row">
          <div className="logo" style={{cursor: 'pointer'}} onClick={() => navigate('/dashboard')}><span className="logo-mark"></span>CareerBridge</div>
          
          <div className="stepper" id="stepper">
            <div className="step active"><span className="step-dot">1</span><span className="step-label">Profile Setup</span></div>
            <div className="step-line"></div>
            <div className="step"><span className="step-dot">2</span><span className="step-label">Career Assessment</span></div>
            <div className="step-line"></div>
            <div className="step"><span className="step-dot">3</span><span className="step-label">Recommendation</span></div>
            <div className="step-line"></div>
            <div className="step"><span className="step-dot">4</span><span className="step-label">Roadmap</span></div>
            <div className="step-line"></div>
            <div className="step"><span className="step-dot">5</span><span className="step-label">Placement</span></div>
          </div>

          <div className="nav-right">
            <button className="icon-btn">🌙</button>
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">❓</button>
          </div>
        </div>
      </header>

<div className="container" style={{position: 'relative', zIndex: 10, marginTop: '2rem'}}>

  {/* STEP TRACKER */}
  <div className="step-tracker" id="stepTracker">
    <div className={`step-node ${currentStep === 1 ? "active" : currentStep > 1 ? "done" : ""}`} data-step="1">
      <div className="step-circle">1</div>
      <span className="step-label">Basic Info</span>
      <div className="step-connector"></div>
    </div>
    <div className={`step-node ${currentStep === 2 ? "active" : currentStep > 2 ? "done" : ""}`} data-step="2">
      <div className="step-circle">2</div>
      <span className="step-label">Education</span>
      <div className="step-connector"></div>
    </div>
    <div className={`step-node ${currentStep === 3 ? "active" : currentStep > 3 ? "done" : ""}`} data-step="3">
      <div className="step-circle">3</div>
      <span className="step-label">Skills</span>
      <div className="step-connector"></div>
    </div>
    <div className={`step-node ${currentStep === 4 ? "active" : currentStep > 4 ? "done" : ""}`} data-step="4">
      <div className="step-circle">4</div>
      <span className="step-label">Interests</span>
      <div className="step-connector"></div>
    </div>
    <div className={`step-node ${currentStep === 5 ? "active" : currentStep > 5 ? "done" : ""}`} data-step="5">
      <div className="step-circle">5</div>
      <span className="step-label">Goals</span>
      <div className="step-connector"></div>
    </div>
  </div>
  <div className="progress-rail"><div className="progress-fill" id="progressFill" style={{ width: "20%" }}></div></div>
  <div className="step-of" id="stepOf">Step {currentStep} of 5</div>

  <div className="wizard-shell">

    {/* WIZARD CARD */}
    <div className="wizard-card">

      {/* STEP 1: BASIC INFO */}
      <div className="step-panel" data-panel="1" style={{ display: currentStep === 1 ? "block" : "none" }}>
        <div className="step-head">
          <h2>Let's personalize your career journey</h2>
          <p>Tell us a little about yourself so we can build the perfect roadmap.</p>
        </div>
        <div className="fields-grid">
          <div className="field"><label>Full Name</label><input type="text" data-field="fullName" placeholder="e.g. Rahul Sharma" /></div>
          <div className="field"><label>Email <span className="opt">(from registration)</span></label><input type="email" value="you@example.com" readonly /></div>
          <div className="field"><label>Phone Number</label><input type="tel" data-field="phone" placeholder="+91 98765 43210" /></div>
          <div className="field"><label>Date of Birth</label><input type="date" data-field="dob" /></div>
          <div className="field"><label>Gender</label>
            <select data-field="gender">
              <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
            </select>
          </div>
          <div className="field"><label>Country</label><input type="text" data-field="country" placeholder="India" /></div>
          <div className="field"><label>State</label><input type="text" data-field="state" placeholder="Maharashtra" /></div>
          <div className="field"><label>City</label><input type="text" data-field="city" placeholder="Mumbai" /></div>
          <div className="field full"><label>Preferred Job Location</label><input type="text" data-field="prefLocation" placeholder="Mumbai, Pune, Remote..." /></div>
          <div className="field"><label>LinkedIn <span className="opt">(optional)</span></label><input type="url" data-field="linkedin" placeholder="linkedin.com/in/..." /></div>
          <div className="field"><label>GitHub <span className="opt">(optional)</span></label><input type="url" data-field="github" placeholder="github.com/..." /></div>
          <div className="field full"><label>Portfolio Website <span className="opt">(optional)</span></label><input type="url" data-field="portfolio" placeholder="yourname.dev" /></div>
        </div>
      </div>

      {/* STEP 2: EDUCATION */}
      <div className="step-panel" data-panel="2" style={{ display: currentStep === 2 ? "block" : "none" }}>
        <div className="step-head">
          <h2>Tell us about your education</h2>
          <p>This helps us recommend the right career path and roadmap for you.</p>
        </div>
        <div className="fields-grid">
          <div className="field"><label>Education Level</label>
            <select data-field="eduLevel">
              <option value="">Select</option><option>Diploma</option><option>B.Tech</option><option>B.E.</option><option>MCA</option><option>BCA</option><option>B.Sc IT</option><option>M.Tech</option><option>Other</option>
            </select>
          </div>
          <div className="field"><label>College Name</label><input type="text" data-field="college" placeholder="Your college" /></div>
          <div className="field"><label>University</label><input type="text" data-field="university" placeholder="Your university" /></div>
          <div className="field"><label>Current Academic Year</label>
            <select data-field="year">
              <option value="">Select</option><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>Final Year</option><option>Graduated</option>
            </select>
          </div>
          <div className="field"><label>CGPA (Current)</label><input type="text" data-field="cgpa" placeholder="e.g. 8.5" /></div>
          <div className="field"><label>Expected Graduation Year</label><input type="text" data-field="gradYear" placeholder="e.g. 2026" /></div>
        </div>
        <div className="info-banner">
          <div className="ib-icon">🎓</div>
          <div className="ib-text"><strong>Your education details help us</strong> create a personalized roadmap that matches your level and goals.</div>
        </div>
      </div>

      {/* STEP 3: SKILLS */}
      <div className="step-panel" data-panel="3" style={{ display: currentStep === 3 ? "block" : "none" }}>
        <div className="step-head">
          <h2>What skills do you already know?</h2>
          <p>Select everything you're comfortable with — we'll skip what you already know in your roadmap.</p>
        </div>
        <div className="skill-search">
          <span className="sicon">🔍</span>
          <input type="text" id="skillSearch" value={skillSearch} onChange={e => setSkillSearch(e.target.value)} placeholder="Search skills (e.g. React, SQL, Docker)..." />
        </div>
        <div id="skillGroups">
          {skillGroups.map(group => {
            const filteredItems = skillSearch ? group.items.filter(item => item.toLowerCase().includes(skillSearch.toLowerCase())) : group.items;
            if (filteredItems.length === 0) return null;
            return (
              <React.Fragment key={group.label}>
                <div className="chip-group-label">{group.label.toUpperCase()}</div>
                <div className="chip-grid">
                  {filteredItems.map(item => (
                    <div 
                      key={item} 
                      className={`chip ${state.skills.includes(item) ? 'selected' : ''}`}
                      onClick={() => toggleSkill(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="selected-bar"><span className="count" id="skillCount">{state.skills.length}</span> skills selected</div>
      </div>

      {/* STEP 4: CAREER INTERESTS */}
      <div className="step-panel" data-panel="4" style={{ display: currentStep === 4 ? "block" : "none" }}>
        <div className="step-head">
          <h2>Which careers interest you?</h2>
          <p>Select one or more — your assessment will fine-tune the final recommendation.</p>
        </div>
        <div className="career-grid" id="careerGrid">
          {careers.map((career, idx) => (
            <div 
              key={idx}
              className={`career-card ${state.careers.includes(career.name) ? 'selected' : ''}`}
              onClick={() => toggleCareer(career.name)}
            >
              <div className="cc-check">✓</div>
              <div className="cc-top">
                <div className="cc-icon" style={{ background: career.grad }}>{career.icon}</div>
                <h4>{career.name}</h4>
              </div>
              <div className="cc-meta">
                <span>{career.salary}</span>
                <span>{career.demand} demand</span>
              </div>
              <div className="cc-skills">{career.skills}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 5: GOALS */}
      <div className="step-panel" data-panel="5" style={{ display: currentStep === 5 ? "block" : "none" }}>
        <div className="step-head">
          <h2>What are you working toward?</h2>
          <p>This shapes how we pace your roadmap and what we prioritize first.</p>
        </div>

        <div className="goal-section">
          <h4>Primary goal</h4>
          <div className="goal-options" data-group="primaryGoal" data-multi="false">
            <div className={`goal-pill ${state.goals.primaryGoal === "Internship" ? "selected" : ""}`} onClick={() => handleGoalSelect("primaryGoal", "Internship", false)}>Get Internship</div>
            <div className={`goal-pill ${state.goals.primaryGoal === "Placement" ? "selected" : ""}`} onClick={() => handleGoalSelect("primaryGoal", "Placement", false)}>Get Placement</div>
            <div className={`goal-pill ${state.goals.primaryGoal === "FullStack" ? "selected" : ""}`} onClick={() => handleGoalSelect("primaryGoal", "FullStack", false)}>Become Full Stack Developer</div>
            <div className={`goal-pill ${state.goals.primaryGoal === "Product" ? "selected" : ""}`} onClick={() => handleGoalSelect("primaryGoal", "Product", false)}>Crack Product Company</div>
            <div className={`goal-pill ${state.goals.primaryGoal === "Switch" ? "selected" : ""}`} onClick={() => handleGoalSelect("primaryGoal", "Switch", false)}>Switch Career</div>
            <div className="goal-pill" data-value="HigherStudies">Higher Studies</div>
</div>
        </div>

        <div className="goal-section">
          <h4>Preferred learning style</h4>
          <div className="goal-options" data-group="learningStyle" data-multi="true">
            <div className={`goal-pill ${state.goals.learningStyle.includes("Video") ? "selected" : ""}`} onClick={() => handleGoalSelect("learningStyle", "Video", true)}>Video</div>
            <div className={`goal-pill ${state.goals.learningStyle.includes("Reading") ? "selected" : ""}`} onClick={() => handleGoalSelect("learningStyle", "Reading", true)}>Reading</div>
            <div className={`goal-pill ${state.goals.learningStyle.includes("Projects") ? "selected" : ""}`} onClick={() => handleGoalSelect("learningStyle", "Projects", true)}>Projects</div>
            <div className={`goal-pill ${state.goals.learningStyle.includes("Practice") ? "selected" : ""}`} onClick={() => handleGoalSelect("learningStyle", "Practice", true)}>Practice</div>
            <div className="goal-pill" data-value="Mentor">Mentor Guidance</div>
</div>
        </div>

        <div className="goal-section">
          <h4>Time available per day</h4>
          <div className="goal-options" data-group="timeAvail" data-multi="false">
            <div className={`goal-pill ${state.goals.timeAvail === "30m" ? "selected" : ""}`} onClick={() => handleGoalSelect("timeAvail", "30m", false)}>30 Minutes</div>
            <div className={`goal-pill ${state.goals.timeAvail === "1h" ? "selected" : ""}`} onClick={() => handleGoalSelect("timeAvail", "1h", false)}>1 Hour</div>
            <div className={`goal-pill ${state.goals.timeAvail === "2h" ? "selected" : ""}`} onClick={() => handleGoalSelect("timeAvail", "2h", false)}>2 Hours</div>
            <div className="goal-pill" data-value="3h+">3+ Hours</div>
</div>
        </div>

        <div className="goal-section">
          <h4>Preferred difficulty</h4>
          <div className="goal-options" data-group="difficulty" data-multi="false">
            <div className={`goal-pill ${state.goals.difficulty === "Beginner" ? "selected" : ""}`} onClick={() => handleGoalSelect("difficulty", "Beginner", false)}>Beginner</div>
            <div className={`goal-pill ${state.goals.difficulty === "Intermediate" ? "selected" : ""}`} onClick={() => handleGoalSelect("difficulty", "Intermediate", false)}>Intermediate</div>
            <div className={`goal-pill ${state.goals.difficulty === "Advanced" ? "selected" : ""}`} onClick={() => handleGoalSelect("difficulty", "Advanced", false)}>Advanced</div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div className="wizard-nav">
        <button className="btn btn-prev" id="prevBtn" disabled={currentStep === 1} onClick={prevStep}>← Previous</button>
        <div className="nav-right">
          <a href="#" className="skip-link" id="skipLink" onClick={(e) => { e.preventDefault(); nextStep(); }}>Skip for now</a>
          <button className="btn btn-next" id="nextBtn" onClick={nextStep}>{currentStep === 5 ? "Finish →" : "Next Step →"}</button>
        </div>
      </div>
    </div>

    {/* RIGHT SUMMARY */}
    <div className="summary-card">
      <h3>Your Profile Summary</h3>
      <div className="ring-wrap">
        <div className="ring">
          <svg viewBox="0 0 120 120">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB"/><stop offset="60%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#06B6D4"/>
              </linearGradient>
            </defs>
            <circle className="ring-track" cx="60" cy="60" r="52"/>
            <circle 
              className="ring-fill" 
              id="ringFill" 
              cx="60" cy="60" r="52" 
              strokeDasharray="326.7" 
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
            />
          </svg>
          <div className="ring-text"><span className="pct" >{completePct}%</span><span className="lbl">Complete</span></div>
        </div>
      </div>

      <div className="sum-list">
        <div className="sum-item">
          <div className={`sum-ic ${basicCount > 0 ? "on" : ""}`}>👤</div>
          <div className="sum-body">
            <div className="sb-top"><span className="sb-title">Basic Information</span><span className="sb-status" id="sumStatus1">Pending</span></div>
            <div className="sb-detail" id="sumDetail1">Not started yet</div>
          </div>
        </div>
        <div className="sum-item">
          <div className={`sum-ic ${eduCount > 0 ? "on" : ""}`}>🎓</div>
          <div className="sum-body">
            <div className="sb-top"><span className="sb-title">Education</span><span className="sb-status" id="sumStatus2">Pending</span></div>
            <div className="sb-detail" id="sumDetail2">Not started yet</div>
          </div>
        </div>
        <div className="sum-item">
          <div className={`sum-ic ${state.skills.length > 0 ? "on" : ""}`}>⚡</div>
          <div className="sum-body">
            <div className="sb-top"><span className="sb-title">Skills</span><span className="sb-status" id="sumStatus3">Pending</span></div>
            <div className="sb-detail" id="sumDetail3">No skills selected</div>
          </div>
        </div>
        <div className="sum-item">
          <div className={`sum-ic ${state.careers.length > 0 ? "on" : ""}`}>💼</div>
          <div className="sum-body">
            <div className="sb-top"><span className="sb-title">Career Interests</span><span className="sb-status" id="sumStatus4">Pending</span></div>
            <div className="sb-detail" id="sumDetail4">No interests selected</div>
          </div>
        </div>
        <div className="sum-item">
          <div className={`sum-ic ${goalsFilled > 0 ? "on" : ""}`}>🎯</div>
          <div className="sum-body">
            <div className="sb-top"><span className="sb-title">Goals</span><span className="sb-status" id="sumStatus5">Pending</span></div>
            <div className="sb-detail" id="sumDetail5">Not set yet</div>
          </div>
        </div>
      </div>

      <div className="readiness-preview">
        <div className="rp-top">📊 Placement Readiness Preview</div>
        <div className="rp-score" ><div dangerouslySetInnerHTML={{__html: `${readiness}<span>${readiness < 30 ? "Just starting" : readiness < 60 ? "Building up" : "Looking good"}</span>`}}></div></div>
        <p>This will improve as you complete your profile, roadmap, and assessments.</p>
      </div>
    </div>
  </div>

  <div className="trust-bar">
    <span>🔒 Your data is 100% secure</span>
    <span>🛡️ Encrypted &amp; protected</span>
    <span>👥 Trusted by 12,000+ students</span>
    <span>✨ AI-powered platform</span>
  </div>
</div>

{/* SUCCESS OVERLAY */}
<div className="success-overlay" id="successOverlay">
  <div className="success-card">
    <div className="success-icon">✓</div>
    <h2>Awesome!</h2>
    <p>We're building your personalized career roadmap...</p>
    <div className="load-steps" id="loadSteps">
      <div className={`load-step ${successSteps > 0 ? "active" : ""}`}><span className="ls-dot"></span>Analyzing profile</div>
      <div className={`load-step ${successSteps > 1 ? "active" : ""}`}><span className="ls-dot"></span>Matching skills</div>
      <div className={`load-step ${successSteps > 2 ? "active" : ""}`}><span className="ls-dot"></span>Finding career path</div>
      <div className="load-step"><span className="ls-dot"></span>Preparing roadmap</div>
      <div className="load-step"><span className="ls-dot"></span>Calculating placement readiness</div>
    </div>
  </div>
</div>
    </>
  );
};

export default Onboarding;
