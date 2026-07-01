/* ============================================================
   DATA: career profiles (rule-based scoring engine — mirrors
   the .NET 8 backend's weighted scoring rules in this mini project)
   ============================================================ */
const CAREERS = [
  { id:'dotnet', name:'.NET Full Stack Developer', icon:'💻', grad:['#2563EB','#3B82F6'], salary:'₹8–20 LPA', demand:5, roadmap:'8 Months',
    tech:['Web Development','Cloud Computing'], lang:['C#','SQL','JavaScript'], work:['Building Websites','Building APIs','Working with Databases'] },
  { id:'java', name:'Java Developer', icon:'☕', grad:['#7C3AED','#A78BFA'], salary:'₹6–18 LPA', demand:5, roadmap:'7 Months',
    tech:['Web Development'], lang:['Java','SQL'], work:['Building APIs','Solving Logical Problems','Working with Databases'] },
  { id:'mern', name:'Full Stack (MERN) Developer', icon:'🌐', grad:['#06B6D4','#22D3EE'], salary:'₹6–16 LPA', demand:4, roadmap:'6 Months',
    tech:['Web Development'], lang:['JavaScript','TypeScript'], work:['Building Websites','Designing Interfaces'] },
  { id:'data', name:'Data Analyst', icon:'📊', grad:['#2563EB','#3B82F6'], salary:'₹4–11 LPA', demand:4, roadmap:'4 Months',
    tech:['Data Analytics'], lang:['Python','SQL'], work:['Analyzing Data','Working with Databases'] },
  { id:'ai', name:'AI / ML Engineer', icon:'🤖', grad:['#7C3AED','#06B6D4'], salary:'₹10–25 LPA', demand:5, roadmap:'10 Months',
    tech:['Artificial Intelligence'], lang:['Python'], work:['Creating AI Models','Solving Logical Problems'] },
  { id:'cloud', name:'Cloud Engineer', icon:'☁️', grad:['#7C3AED','#A78BFA'], salary:'₹8–20 LPA', demand:5, roadmap:'7 Months',
    tech:['Cloud Computing','DevOps'], lang:['Go','Python'], work:['Working with Cloud','Managing Infrastructure'] },
  { id:'cyber', name:'Cyber Security Analyst', icon:'🔒', grad:['#0F172A','#2563EB'], salary:'₹7–18 LPA', demand:4, roadmap:'8 Months',
    tech:['Cyber Security'], lang:['Python','C++'], work:['Solving Logical Problems','Managing Infrastructure'] },
  { id:'uiux', name:'UI/UX Designer', icon:'🎨', grad:['#06B6D4','#7C3AED'], salary:'₹5–14 LPA', demand:4, roadmap:'5 Months',
    tech:['UI/UX Design'], lang:[], work:['Designing Interfaces'] },
  { id:'devops', name:'DevOps Engineer', icon:'⚙️', grad:['#2563EB','#7C3AED'], salary:'₹8–19 LPA', demand:5, roadmap:'7 Months',
    tech:['DevOps','Cloud Computing'], lang:['Go','Python'], work:['Automating Systems','Managing Infrastructure','Working with Cloud'] },
  { id:'mobile', name:'Mobile App Developer', icon:'📱', grad:['#2563EB','#06B6D4'], salary:'₹6–15 LPA', demand:4, roadmap:'6 Months',
    tech:['Mobile Apps'], lang:['Kotlin','Swift','Flutter'], work:['Designing Interfaces','Building APIs'] },
];

const LANGUAGES = ['C#','Java','Python','JavaScript','TypeScript','Go','Rust','PHP','C++','Kotlin','Swift','Flutter','SQL'];

/* ============================================================
   QUESTIONS
   ============================================================ */
const QUESTIONS = [
  { id:'tech', title:'Which technology excites you the most?', sub:'Select all that genuinely interest you — there are no wrong answers.', type:'opt-multi',
    options:[
      {v:'Web Development', icon:'💻'},{v:'Mobile Apps', icon:'📱'},{v:'Artificial Intelligence', icon:'🤖'},
      {v:'Cloud Computing', icon:'☁️'},{v:'Cyber Security', icon:'🔒'},{v:'Data Analytics', icon:'📊'},
      {v:'Game Development', icon:'🎮'},{v:'DevOps', icon:'⚙️'},{v:'Blockchain', icon:'⛓️'},{v:'UI/UX Design', icon:'🎨'},
    ]},
  { id:'lang', title:'Programming languages you know', sub:'Search and tap to add the languages you have experience with.', type:'tags' },
  { id:'skill', title:'Current skill level', sub:'Be honest — this helps us pace your roadmap correctly.', type:'opt-single',
    options:[
      {v:'Beginner', icon:'🌱', desc:'Just getting started'},
      {v:'Intermediate', icon:'🚀', desc:'Built a few projects'},
      {v:'Advanced', icon:'🏆', desc:'Confident & job-ready'},
    ]},
  { id:'work', title:'What type of work do you enjoy?', sub:'Pick the activities that energize you, not just what you\'re good at.', type:'opt-multi',
    options:[
      {v:'Building Websites', icon:'🖥️'},{v:'Solving Logical Problems', icon:'🧩'},{v:'Building APIs', icon:'🔌'},
      {v:'Working with Databases', icon:'🗄️'},{v:'Designing Interfaces', icon:'🎨'},{v:'Analyzing Data', icon:'📈'},
      {v:'Creating AI Models', icon:'🧠'},{v:'Working with Cloud', icon:'☁️'},{v:'Automating Systems', icon:'🔁'},{v:'Managing Infrastructure', icon:'🏗️'},
    ]},
  { id:'env', title:'Preferred working environment', sub:'You can select more than one if you\'re flexible.', type:'chips-multi',
    options:['Remote','Hybrid','Office','Startup','MNC','Freelancing','Government','Research'] },
  { id:'goal', title:'Primary career goal', sub:'What matters most to you right now?', type:'opt-single',
    options:[
      {v:'High Salary', icon:'💰'},{v:'Dream Company', icon:'🏢'},{v:'Become Team Lead', icon:'👑'},{v:'Start Startup', icon:'🚀'},
      {v:'Work Abroad', icon:'✈️'},{v:'Research', icon:'🔬'},{v:'Government Job', icon:'🏛️'},{v:'Freelancing', icon:'🧳'},
    ]},
  { id:'learn', title:'Preferred learning style', sub:'How do you absorb new skills best?', type:'opt-multi',
    options:[
      {v:'Video Courses', icon:'🎬'},{v:'Hands-on Projects', icon:'🛠️'},{v:'Reading Documentation', icon:'📚'},
      {v:'Mentor Guidance', icon:'🧑‍🏫'},{v:'Coding Challenges', icon:'⌨️'},{v:'Group Learning', icon:'👥'},
    ]},
  { id:'hours', title:'How many hours can you dedicate weekly?', sub:'We\'ll size your roadmap to fit your schedule.', type:'slider' },
  { id:'company', title:'Preferred company type', sub:'Pick all the kinds of companies you\'d be excited to join.', type:'chips-multi',
    options:['Google','Microsoft','Amazon','Startup','Product Company','Service Company','Open Source','No Preference'] },
  { id:'confidence', title:'Current confidence level', sub:'How confident do you feel about your career direction today?', type:'emoji',
    options:[ {v:'Worried', em:'😟'}, {v:'Okay', em:'🙂'}, {v:'Confident', em:'😄'}, {v:'Unstoppable', em:'🚀'} ] },
];

/* ============================================================
   STATE
   ============================================================ */
let current = 0;
const answers = {}; // qid -> value(s)

/* ============================================================
   RENDER QUESTION CARD
   ============================================================ */
const card = document.getElementById('questionCard');

function dotsHTML(){
  return QUESTIONS.map((q,i)=>{
    const cls = i===current ? 'active' : (i<current ? 'done' : '');
    return `<span class="${cls}"></span>`;
  }).join('');
}

function render(){
  const q = QUESTIONS[current];
  let bodyHTML = '';

  if(q.type==='opt-multi' || q.type==='opt-single'){
    const sel = answers[q.id] || (q.type==='opt-multi' ? [] : null);
    bodyHTML = `<div class="opt-grid">` + q.options.map(o=>{
      const isSel = q.type==='opt-multi' ? sel.includes(o.v) : sel===o.v;
      return `<div class="opt-card ${isSel?'selected':''}" data-val="${o.v}">
        <span class="opt-check">✓</span>
        <span class="opt-icon">${o.icon}</span>
        <span class="opt-name">${o.v}</span>
        ${o.desc?`<span class="opt-desc">${o.desc}</span>`:''}
      </div>`;
    }).join('') + `</div>`;
  }

  else if(q.type==='tags'){
    const sel = answers[q.id] || [];
    bodyHTML = `
      <input type="text" class="search-input" id="langSearch" placeholder="Search a language (e.g. Python, C#, JavaScript)...">
      <div class="chip-row" id="langChips">
        ${LANGUAGES.map(l=>`<div class="chip ${sel.includes(l)?'selected':''}" data-val="${l}">${l}</div>`).join('')}
      </div>
      <div class="selected-chips" id="selectedLangs">
        ${sel.map(l=>`<span class="tag-chip">${l}<button data-val="${l}">✕</button></span>`).join('')}
      </div>`;
  }

  else if(q.type==='chips-multi'){
    const sel = answers[q.id] || [];
    bodyHTML = `<div class="chip-row">` + q.options.map(o=>
      `<div class="chip ${sel.includes(o)?'selected':''}" data-val="${o}">${o}</div>`
    ).join('') + `</div>`;
  }

  else if(q.type==='slider'){
    const val = answers[q.id] || 10;
    bodyHTML = `
      <div class="slider-wrap">
        <div class="slider-value"><span class="num" id="sliderNum">${val}</span> <span class="unit">hrs / week</span></div>
        <input type="range" min="5" max="35" step="5" value="${val}" id="hoursSlider">
        <div class="slider-ticks"><span>5</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30+</span></div>
      </div>`;
  }

  else if(q.type==='emoji'){
    const sel = answers[q.id] || null;
    bodyHTML = `<div class="emoji-row">` + q.options.map(o=>
      `<div class="emoji-opt ${sel===o.v?'selected':''}" data-val="${o.v}">
        <span class="em">${o.em}</span><span class="em-label">${o.v}</span>
      </div>`
    ).join('') + `</div>`;
  }

  card.innerHTML = `
    <div class="q-top">
      <span class="q-count">QUESTION ${current+1} OF ${QUESTIONS.length}</span>
      <div class="q-dots">${dotsHTML()}</div>
    </div>
    <div class="q-body">
      <h2 class="q-title">${q.title}</h2>
      <p class="q-sub">${q.sub}</p>
      ${bodyHTML}
    </div>
    <div class="action-bar">
      <button class="btn btn-ghost" id="prevBtn" ${current===0?'disabled':''}>← Previous</button>
      <div class="bar-right">
        <button class="btn btn-text" id="saveBtn">Save Progress</button>
        ${current===QUESTIONS.length-1
          ? `<button class="btn btn-primary btn-analyze" id="nextBtn">Analyze My Career ✨</button>`
          : `<button class="btn btn-primary" id="nextBtn">Next →</button>`}
      </div>
    </div>
  `;

  attachHandlers(q);
  updateProgress();
  updatePrediction();
}

/* ============================================================
   HANDLERS
   ============================================================ */
function attachHandlers(q){
  document.getElementById('prevBtn').onclick = ()=>{ if(current>0){ current--; render(); } };
  document.getElementById('saveBtn').onclick = ()=> showToast('✓ Progress saved');
  document.getElementById('nextBtn').onclick = ()=>{
    if(current === QUESTIONS.length-1){ runAnalysis(); }
    else { current++; render(); }
  };

  if(q.type==='opt-multi'){
    card.querySelectorAll('.opt-card').forEach(el=>{
      el.onclick = ()=>{
        const v = el.dataset.val;
        const arr = answers[q.id] || [];
        const idx = arr.indexOf(v);
        if(idx>-1) arr.splice(idx,1); else arr.push(v);
        answers[q.id] = arr;
        el.classList.toggle('selected');
        updatePrediction();
      };
    });
  }
  if(q.type==='opt-single'){
    card.querySelectorAll('.opt-card').forEach(el=>{
      el.onclick = ()=>{
        answers[q.id] = el.dataset.val;
        card.querySelectorAll('.opt-card').forEach(c=>c.classList.remove('selected'));
        el.classList.add('selected');
        updatePrediction();
      };
    });
  }
  if(q.type==='chips-multi'){
    card.querySelectorAll('.chip').forEach(el=>{
      el.onclick = ()=>{
        const v = el.dataset.val;
        const arr = answers[q.id] || [];
        const idx = arr.indexOf(v);
        if(idx>-1) arr.splice(idx,1); else arr.push(v);
        answers[q.id] = arr;
        el.classList.toggle('selected');
        updatePrediction();
      };
    });
  }
  if(q.type==='tags'){
    const sync = ()=>{
      const sel = answers[q.id] || [];
      card.querySelectorAll('#langChips .chip').forEach(c=> c.classList.toggle('selected', sel.includes(c.dataset.val)));
      document.getElementById('selectedLangs').innerHTML = sel.map(l=>`<span class="tag-chip">${l}<button data-val="${l}">✕</button></span>`).join('');
      card.querySelectorAll('#selectedLangs button').forEach(b=>{
        b.onclick = ()=>{
          const arr = answers[q.id] || [];
          answers[q.id] = arr.filter(x=>x!==b.dataset.val);
          sync(); updatePrediction();
        };
      });
    };
    card.querySelectorAll('#langChips .chip').forEach(el=>{
      el.onclick = ()=>{
        const v = el.dataset.val;
        const arr = answers[q.id] || [];
        const idx = arr.indexOf(v);
        if(idx>-1) arr.splice(idx,1); else arr.push(v);
        answers[q.id] = arr;
        sync(); updatePrediction();
      };
    });
    document.getElementById('langSearch').oninput = (e)=>{
      const term = e.target.value.toLowerCase();
      card.querySelectorAll('#langChips .chip').forEach(c=>{
        c.style.display = c.dataset.val.toLowerCase().includes(term) ? 'inline-flex' : 'none';
      });
    };
  }
  if(q.type==='slider'){
    const slider = document.getElementById('hoursSlider');
    const num = document.getElementById('sliderNum');
    answers[q.id] = answers[q.id] || parseInt(slider.value,10);
    slider.oninput = ()=>{ num.textContent = slider.value; answers[q.id] = parseInt(slider.value,10); updatePrediction(); };
  }
  if(q.type==='emoji'){
    card.querySelectorAll('.emoji-opt').forEach(el=>{
      el.onclick = ()=>{
        answers[q.id] = el.dataset.val;
        card.querySelectorAll('.emoji-opt').forEach(c=>c.classList.remove('selected'));
        el.classList.add('selected');
        updatePrediction();
      };
    });
  }
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> t.classList.remove('show'), 2200);
}

function updateProgress(){
  const pct = Math.round(((current+1)/QUESTIONS.length)*20 + 40); // stage 2 of 5 -> 40-60% overall
  document.getElementById('progressFill').style.width = pct + '%';
}

/* ============================================================
   LIVE SCORING ENGINE (client-side mirror of backend rules)
   ============================================================ */
function scoreCareer(c){
  let matched = 0, total = 0;
  const tech = answers.tech || [];
  const lang = answers.lang || [];
  const work = answers.work || [];

  c.tech.forEach(t=>{ total++; if(tech.includes(t)) matched++; });
  c.lang.forEach(l=>{ total++; if(lang.includes(l)) matched++; });
  c.work.forEach(w=>{ total++; if(work.includes(w)) matched++; });

  if(total===0) return { pct:0, matchedSkills:[] };
  const pct = matched/total;
  const matchedSkills = [
    ...c.tech.filter(t=>tech.includes(t)),
    ...c.lang.filter(l=>lang.includes(l)),
    ...c.work.filter(w=>work.includes(w)),
  ];
  return { pct, matchedSkills };
}

function getBestMatch(){
  let best = null, bestScore = -1;
  CAREERS.forEach(c=>{
    const { pct, matchedSkills } = scoreCareer(c);
    if(pct > bestScore){ bestScore = pct; best = { career:c, pct, matchedSkills }; }
  });
  // baseline so the panel never looks "empty" before answers are given
  const hasAnswers = (answers.tech&&answers.tech.length) || (answers.lang&&answers.lang.length) || (answers.work&&answers.work.length);
  if(!hasAnswers){ best = { career:CAREERS[2], pct:0.65, matchedSkills:['Web Development','Problem Solving'] }; }
  const confidence = Math.round(Math.min(0.97, Math.max(0.42, best.pct*0.65 + 0.34)) * 100);
  return { ...best, confidence };
}

function updatePrediction(){
  const { career, matchedSkills, confidence } = getBestMatch();
  document.getElementById('predictRole').style.opacity = 0;
  setTimeout(()=>{
    document.getElementById('predictRole').textContent = career.name;
    document.getElementById('predictRole').style.opacity = 1;
  }, 120);
  document.getElementById('ringPct').textContent = confidence + '%';
  const circumference = 2*Math.PI*34;
  const offset = circumference * (confidence/100);
  document.getElementById('ringFg').setAttribute('stroke-dasharray', `${offset} ${circumference}`);
  const tags = matchedSkills.length ? matchedSkills.slice(0,3) : ['Web Development','Problem Solving'];
  document.getElementById('predictTags').innerHTML = tags.map(t=>`<span>${t}</span>`).join('');
}

/* ============================================================
   ANALYZE FLOW
   ============================================================ */
function runAnalysis(){
  const overlay = document.getElementById('analyzeOverlay');
  const panel = document.getElementById('analyzePanel');
  const success = document.getElementById('successPanel');
  success.classList.remove('show');
  panel.style.display = 'block';
  overlay.classList.add('show');

  const steps = card => document.querySelectorAll('.a-step');
  document.querySelectorAll('.a-step').forEach(s=> s.classList.remove('active','done'));

  /* In production this payload POSTs to the ASP.NET Core (.NET 8)
     backend: POST /api/assessment/analyze
     The backend evaluates weighted scoring rules against stored
     career paths, persists the result to the user's profile, and
     returns { careerPath, confidence, matchedSkills, reason, roadmapDuration }. */
  const payload = { answers, submittedAt: new Date().toISOString() };

  const stepEls = document.querySelectorAll('.a-step');
  let i = 0;
  function tick(){
    if(i>0) stepEls[i-1].classList.remove('active');
    if(i>0) stepEls[i-1].classList.add('done');
    if(i < stepEls.length){
      stepEls[i].classList.add('active');
      i++;
      setTimeout(tick, 520);
    } else {
      setTimeout(showSuccess, 450);
    }
  }
  tick();
}

function showSuccess(){
  const panel = document.getElementById('analyzePanel');
  const success = document.getElementById('successPanel');
  panel.style.display = 'none';

  const { career, confidence } = getBestMatch();
  document.getElementById('resultRole').textContent = career.name;
  document.getElementById('resultMeta').textContent = `${confidence}% Confidence · ${career.salary} · ${career.roadmap} Roadmap`;

  success.classList.add('show');
  fireConfetti();
}

function fireConfetti(){
  const host = document.getElementById('confettiHost');
  const colors = ['#2563EB','#7C3AED','#06B6D4','#22C55E','#F59E0B'];
  for(let i=0;i<28;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + '%';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDuration = (1.6 + Math.random()*1.2) + 's';
    c.style.animationDelay = (Math.random()*0.4) + 's';
    c.style.borderRadius = Math.random()>0.5 ? '50%' : '2px';
    host.appendChild(c);
    setTimeout(()=> c.remove(), 3200);
  }
}

document.getElementById('viewRecBtn').onclick = ()=>{
  document.getElementById('analyzeOverlay').classList.remove('show');
  document.querySelector('.step.active').classList.remove('active');
  document.querySelector('.step.active') /* no-op guard */;
  showToast('Redirecting to your Career Recommendation →');
};

/* ============================================================
   THEME TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
themeToggle.onclick = ()=>{
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
};

/* ============================================================
   AMBIENT PARTICLES
   ============================================================ */
(function spawnParticles(){
  const field = document.getElementById('bgField');
  for(let i=0;i<18;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 2 + Math.random()*3;
    p.style.width = size+'px'; p.style.height = size+'px';
    p.style.left = Math.random()*100+'%';
    p.style.top = (60+Math.random()*40)+'%';
    p.style.animationDuration = (14+Math.random()*14)+'s';
    p.style.animationDelay = (Math.random()*14)+'s';
    field.appendChild(p);
  }
})();

/* INIT */
render();