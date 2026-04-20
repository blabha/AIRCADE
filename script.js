/* ═══════════════════════════════════════════
   A(I)RCADE — Main App Logic
   Screen transitions, state management, events
═══════════════════════════════════════════ */

// ── App State ────────────────────────────────
const state = {
  screen: 'idle',
  prompt: '',
  taskType: 'text-short',
  metrics: null,
  sessionId: generateSessionId(),
  // Resource accumulators (replaces stamina)
  resources: { energy: 0, water: 0, co2: 0 },
  mindfulness: 0,          // cumulative mindfulness score across 5 answers (range 5-15)
  score: 0,                // energy-rank score: 1/3/5 per question, total range 5-25
  // User info
  userName: '',
  userAge: '',
  userGender: '',
  // Ethics
  ethicsAnswers: [],       // {category, letter, color, energy_wh, water_ml, co2_g, mindfulness}
  currentQuestions: [],
  currentQuestionIndex: 0,
  persona: null
};

// ── DOM References ───────────────────────────
const screens = {
  idle:     document.getElementById('screen-idle'),
  userinfo: document.getElementById('screen-userinfo'),
  ethics:   document.getElementById('screen-ethics'),
  impact:   document.getElementById('screen-impact'),
  greener:  document.getElementById('screen-greener'),
  print:    document.getElementById('screen-print')
};

const loadingScreen       = document.getElementById('loading-screen');
const overlayInstructions = document.getElementById('overlay-instructions');
const errorToast          = document.getElementById('error-toast');
const errorMsg            = document.getElementById('error-msg');

// Resource bar elements
const resourceBarsEl = document.getElementById('resource-bars');

// Screens that show the resource bars
const RESOURCE_SCREENS = new Set(['userinfo', 'ethics', 'impact', 'greener', 'print']);

// ── Resource Bar Management ───────────────────
function updateResourceBars(resources) {
  state.resources = resources;

  const defs = [
    { key: 'energy', fillId: 'fill-energy', valId: 'val-energy-bar', lblId: 'lbl-energy', unit: 'Wh' },
    { key: 'water',  fillId: 'fill-water',  valId: 'val-water-bar',  lblId: 'lbl-water',  unit: 'ml' },
    { key: 'co2',    fillId: 'fill-co2',    valId: 'val-co2-bar',    lblId: 'lbl-co2',    unit: 'g'  }
  ];

  defs.forEach(({ key, fillId, valId, lblId, unit }) => {
    const val  = resources[key];
    const max  = RESOURCE_MAX_DISPLAY[key];
    const pct  = Math.min(100, (val / max) * 100);
    const { color, label } = getResourceColorLabel(key, val);

    const fill  = document.getElementById(fillId);
    const valEl = document.getElementById(valId);
    const lblEl = document.getElementById(lblId);
    if (!fill || !valEl) return;

    fill.style.width = pct + '%';
    valEl.textContent = (Number.isInteger(val) ? val : +val.toFixed(1)) + ' ' + unit;
    fill.className = 'resource-fill res-' + color;
    if (lblEl) lblEl.textContent = label;
  });
}

// ── Screen Navigation ────────────────────────
function showScreen(name) {
  if (RESOURCE_SCREENS.has(name)) {
    resourceBarsEl.classList.remove('hidden');
    document.body.classList.add('stamina-visible'); // keeps existing padding offset
  } else {
    resourceBarsEl.classList.add('hidden');
    document.body.classList.remove('stamina-visible');
  }

  Object.values(screens).forEach(s => {
    if (s && !s.classList.contains('hidden')) {
      s.classList.add('slide-out');
      setTimeout(() => {
        s.classList.add('hidden');
        s.classList.remove('active', 'slide-out');
      }, 300);
    }
  });

  setTimeout(() => {
    const target = screens[name];
    if (!target) return;
    target.classList.remove('hidden');
    target.offsetWidth;
    target.classList.add('active');
    target.scrollTop = 0;
    state.screen = name;
  }, 320);
}

// ── Error Handling ───────────────────────────
function showError(msg) {
  errorMsg.textContent = msg;
  errorToast.classList.remove('hidden');
  setTimeout(() => errorToast.classList.add('hidden'), 6000);
}

document.getElementById('error-close').addEventListener('click', () => {
  errorToast.classList.add('hidden');
});

// ── SCREEN IDLE ──────────────────────────────
document.getElementById('btn-start').addEventListener('click', () => {
  overlayInstructions.classList.remove('hidden');
  Byte.say('Here\'s how to play! 🎮');
});

document.getElementById('btn-lets-go').addEventListener('click', () => {
  overlayInstructions.classList.add('hidden');
  updateResourceBars({ energy: 0, water: 0, co2: 0 });
  showScreen('userinfo');
  Byte.setState('idle');
});

Byte.setState('idle');

// ── SCREEN 0.5: USER INFO ────────────────────

const PROMPTS = [
  { prompt: 'A cat astronaut on Mars',                                taskType: 'image'      },
  { prompt: 'Birthday poem for my friend turning 30',                taskType: 'text-short' },
  { prompt: 'Design ideas for a modern bakery logo with a croissant', taskType: 'image'     },
  { prompt: 'How to make tiramisu step by step',                     taskType: 'text-short' },
  { prompt: 'Plan a dream beach vacation for two weeks',             taskType: 'text-long'  }
];

document.getElementById('btn-userinfo-continue').addEventListener('click', () => {
  state.userName   = document.getElementById('user-name').value.trim() || 'Player';
  state.userAge    = document.getElementById('user-age').value || '';
  state.userGender = document.getElementById('user-gender').value || '';

  const pick = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  state.prompt   = pick.prompt;
  state.taskType = pick.taskType;

  startEthicsQuestions();
  showScreen('ethics');
});

// ── SCREEN 1.1: ETHICS QUESTIONS ─────────────

function startEthicsQuestions() {
  state.ethicsAnswers        = [];
  state.resources            = { energy: 0, water: 0, co2: 0 };
  state.mindfulness          = 0;
  state.score                = 0;
  state.currentQuestions     = selectQuestions(state.userAge);
  state.currentQuestionIndex = 0;

  updateResourceBars(state.resources);

  document.getElementById('ethics-summary').classList.add('hidden');
  document.getElementById('question-card').classList.remove('hidden');

  renderQuestion();
}

const TOTAL_QUESTIONS = 5;

function renderProgressDots() {
  const container = document.getElementById('ethics-dots');
  container.innerHTML = '';
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const dot = document.createElement('div');
    dot.className = 'ethics-dot';
    if (i < state.currentQuestionIndex)        dot.classList.add('done');
    else if (i === state.currentQuestionIndex) dot.classList.add('active');
    container.appendChild(dot);
  }
}

function renderQuestion() {
  const idx = state.currentQuestionIndex;
  const q   = state.currentQuestions[idx];

  document.getElementById('ethics-progress-text').textContent =
    `Question ${idx + 1} of ${TOTAL_QUESTIONS}`;

  // Question text — always use the DB field directly
  document.getElementById('question-text').textContent = q.question;

  // Build answers from A/B/C keys; A=green, B=yellow, C=red
  const colorMap = { A: 'green', B: 'yellow', C: 'red' };

  const answers = ['A', 'B', 'C'].map(letter => ({
    letter,
    text:        q[letter].text,
    energy_wh:   q[letter].energy_wh,
    water_ml:    q[letter].water_ml,
    co2_g:       q[letter].co2_g,
    mindfulness: q[letter].mindfulness,
    why:         q[letter].why,
    color:       colorMap[letter]
  }));

  // Assign energy-rank score: lowest energy_wh = 1 pt, middle = 3 pts, highest = 5 pts
  const byEnergy = [...answers].sort((a, b) => a.energy_wh - b.energy_wh);
  byEnergy[0].score = 1;
  byEnergy[1].score = 3;
  byEnergy[2].score = 5;

  // Shuffle order so position doesn't hint at best answer
  answers.sort(() => Math.random() - 0.5);

  // Reset why-card for the new question
  const whyCard = document.getElementById('why-card');
  whyCard.className = 'why-card hidden';
  document.getElementById('why-text').textContent = '';

  const answersEl = document.getElementById('answer-options');
  answersEl.innerHTML = '';

  const dispLetters = ['A', 'B', 'C'];
  answers.forEach((answer, ai) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';

    btn.innerHTML = `
      <span class="answer-letter">${dispLetters[ai]})</span>
      <span class="answer-text">${answer.text}</span>
    `;
    btn.addEventListener('click', () => handleAnswer(answer, q.category, btn));
    answersEl.appendChild(btn);
  });

  renderProgressDots();
}

function handleAnswer(answer, category, clickedBtn) {
  // Accumulate resources
  const r = state.resources;
  const newResources = {
    energy: r.energy + answer.energy_wh,
    water:  r.water  + answer.water_ml,
    co2:    r.co2    + answer.co2_g
  };
  updateResourceBars(newResources);

  // Accumulate mindfulness and score
  state.mindfulness += (answer.mindfulness || 1);
  state.score       += (answer.score       || 3);

  // Record answer
  state.ethicsAnswers.push({
    category,
    letter:      answer.letter,
    color:       answer.color,
    energy_wh:   answer.energy_wh,
    water_ml:    answer.water_ml,
    co2_g:       answer.co2_g,
    mindfulness: answer.mindfulness
  });

  // Disable all buttons, highlight selected — button content stays unchanged
  const allBtns = document.querySelectorAll('.answer-btn');
  allBtns.forEach(b => b.disabled = true);
  clickedBtn.classList.add(`selected-${answer.color}`);

  // Show "why" in the separate card below the options
  const whyCard = document.getElementById('why-card');
  document.getElementById('why-text').textContent = answer.why;
  whyCard.className = `why-card why-border-${answer.color}`;

  // Show Next button — player controls when to advance
  document.getElementById('btn-next-question').classList.remove('hidden');
}

function advanceQuestion() {
  document.getElementById('btn-next-question').classList.add('hidden');
  state.currentQuestionIndex++;

  if (state.currentQuestionIndex >= TOTAL_QUESTIONS) {
    const persona = getPersonality(state.resources.energy, state.mindfulness);
    state.persona = persona;

    document.getElementById('persona-byte').innerHTML      = persona.byteSvg;
    document.getElementById('persona-name').textContent    = persona.title;
    document.getElementById('persona-tagline').textContent = persona.subtitle;
    document.getElementById('persona-description').textContent = persona.description;

    document.getElementById('persona-score-display').textContent = `Score: ${state.score}/25`;

    const impactLevel = state.resources.energy < 20 ? 'Low' : state.resources.energy <= 60 ? 'Medium' : 'High';
    const mindLevel   = state.mindfulness >= 11 ? 'High' : state.mindfulness >= 9 ? 'Medium' : 'Low';
    document.getElementById('persona-scores').textContent =
      `Impact: ${impactLevel}  ·  Mindfulness: ${mindLevel} (${state.mindfulness}/15)`;

    const res = state.resources;
    const fmt = v => Number.isInteger(v) ? v : +v.toFixed(1);
    document.getElementById('summary-energy').textContent = fmt(res.energy) + ' Wh';
    document.getElementById('summary-water').textContent  = fmt(res.water)  + ' ml';
    document.getElementById('summary-co2').textContent    = fmt(res.co2)    + ' g CO₂';
    document.getElementById('cmp-summary-energy').textContent = getResourceComparison('energy', res.energy);
    document.getElementById('cmp-summary-water').textContent  = getResourceComparison('water',  res.water);
    document.getElementById('cmp-summary-co2').textContent    = getResourceComparison('co2',    res.co2);

    document.getElementById('question-card').classList.add('hidden');
    document.getElementById('ethics-summary').classList.remove('hidden');
    renderProgressDots();
  } else {
    renderQuestion();
  }
}

// Next button — advances to next question after player reads the why explanation
document.getElementById('btn-next-question').addEventListener('click', advanceQuestion);

// Continue button — goes to impact screen after player reads personality
document.getElementById('btn-continue-ethics').addEventListener('click', () => {
  populateImpactScreen();
  showScreen('impact');
  Byte.setState('impact');
});

// ── SCREEN 2: IMPACT ─────────────────────────

function populateImpactScreen() {
  const res = state.resources;
  const fmt = v => Number.isInteger(v) ? v : +v.toFixed(1);

  document.getElementById('val-water').textContent  = fmt(res.water)  + ' ml';
  document.getElementById('val-energy').textContent = fmt(res.energy) + ' Wh';
  document.getElementById('val-co2').textContent    = fmt(res.co2)    + ' g';

  document.getElementById('cmp-water').textContent  = getResourceComparison('water',  res.water);
  document.getElementById('cmp-energy').textContent = getResourceComparison('energy', res.energy);
  document.getElementById('cmp-co2').textContent    = getResourceComparison('co2',    res.co2);

  const waterPct  = Math.min(100, (res.water  / RESOURCE_MAX_DISPLAY.water)  * 100);
  const energyPct = Math.min(100, (res.energy / RESOURCE_MAX_DISPLAY.energy) * 100);
  const co2Pct    = Math.min(100, (res.co2    / RESOURCE_MAX_DISPLAY.co2)    * 100);

  setTimeout(() => {
    document.getElementById('meter-water').style.width  = waterPct  + '%';
    document.getElementById('meter-energy').style.width = energyPct + '%';
    document.getElementById('meter-co2').style.width    = co2Pct    + '%';
    document.getElementById('meter-water').setAttribute('aria-valuenow',  waterPct);
    document.getElementById('meter-energy').setAttribute('aria-valuenow', energyPct);
    document.getElementById('meter-co2').setAttribute('aria-valuenow',    co2Pct);
  }, 400);

  setTimeout(() => {
    document.getElementById('metric-water').classList.add('highlight-water');
    document.getElementById('metric-energy').classList.add('highlight-energy');
    document.getElementById('metric-co2').classList.add('highlight-co2');
  }, 600);

  const dykId = selectDidYouKnow(state.taskType, state.resources, state.ethicsAnswers);
  document.getElementById('dyk-text').textContent =
    t('dyk.' + dykId) || DYK_FACTS[dykId];
}

document.getElementById('btn-go-greener').addEventListener('click', () => {
  populateGreenerScreen();
  showScreen('greener');
  Byte.setState('greener');
});

// ── SCREEN 3: GO GREENER ─────────────────────

function populateGreenerScreen() {
  const tips = selectPersonalizedTips(state.taskType, state.resources, state.ethicsAnswers);
  const grid = document.getElementById('tips-grid');
  grid.innerHTML = '';

  tips.forEach(tip => {
    const card = document.createElement('div');
    card.className = 'tip-card';
    card.setAttribute('role', 'listitem');
    const tipTitle   = t('tips.' + tip.id + '.title')       || tip.title;
    const tipDesc    = t('tips.' + tip.id + '.description')  || tip.description;
    const tipSavings = t('tips.' + tip.id + '.savingsLabel') || tip.savingsLabel;
    card.innerHTML = `
      <div class="tip-title">
        <span class="tip-icon">${tip.icon}</span>
        ${tipTitle}
      </div>
      <p class="tip-description">${tipDesc}</p>
      <span class="tip-savings">${tipSavings}</span>
    `;
    grid.appendChild(card);
  });
}

document.getElementById('btn-print').addEventListener('click', () => {
  state.sessionId = generateSessionId();
  populateReceiptCard(state);
  showScreen('print');
  Byte.setState('print');
});

// ── SCREEN 4: PRINT ──────────────────────────

document.getElementById('btn-download').addEventListener('click', () => {
  downloadCard(state.sessionId);
});

document.getElementById('btn-play-again').addEventListener('click', () => {
  state.prompt              = '';
  state.taskType            = 'text-short';
  state.metrics             = null;
  state.sessionId           = generateSessionId();
  state.resources           = { energy: 0, water: 0, co2: 0 };
  state.mindfulness         = 0;
  state.score               = 0;
  state.userName            = '';
  state.userAge             = '';
  state.userGender          = '';
  state.ethicsAnswers        = [];
  state.currentQuestions     = [];
  state.currentQuestionIndex = 0;
  state.persona              = null;

  document.getElementById('user-name').value   = '';
  document.getElementById('user-age').value    = '';
  document.getElementById('user-gender').value = '';

  ['meter-water', 'meter-energy', 'meter-co2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.width = '0%';
  });

  ['metric-water', 'metric-energy', 'metric-co2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('highlight-water', 'highlight-energy', 'highlight-co2');
  });

  showScreen('idle');
  Byte.setState('idle');
});

// ── Keyboard Navigation ──────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !overlayInstructions.classList.contains('hidden')) {
    overlayInstructions.classList.add('hidden');
  }
});
