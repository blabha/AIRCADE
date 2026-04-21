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
  // Resource accumulators
  resources: { energy: 0, water: 0, co2: 0 },
  mindfulness: 0,
  score: 0,                // cumulative score from Scoring_Logic.md (-15 to +20)
  totalScore: 0,           // alias used for icon meters
  // User info
  userName: '',
  userAge: '',
  userExpertise: '',
  userGender: '',
  // Ethics
  ethicsAnswers: [],
  currentQuestions: [],
  currentQuestionIndex: 0,
  persona: null
};

// ── DOM References ───────────────────────────
const screens = {
  idle:     document.getElementById('screen-idle'),
  userinfo: document.getElementById('screen-userinfo'),
  ethics:   document.getElementById('screen-ethics'),
  greener:  document.getElementById('screen-greener'),
  print:    document.getElementById('screen-print')
};

const loadingScreen       = document.getElementById('loading-screen');
const overlayInstructions = document.getElementById('overlay-instructions');
const errorToast          = document.getElementById('error-toast');
const errorMsg            = document.getElementById('error-msg');

// Resource bar elements
const resourceBarsEl = document.getElementById('resource-bars');

// Stamina bars are visible ONLY during the 5 ethics questions
const RESOURCE_SCREENS = new Set(['ethics']);

// ── Personalized greener tips (see Personalized_Tips.md) ──────
const GREENER_TIPS = {
  H: (scenario) => `For <strong>${scenario}</strong>: you picked the highest-impact option. Next time, try doing one step yourself before turning to AI — you'll save energy and often get a better result.`,
  B: (scenario) => `For <strong>${scenario}</strong>: nice balance! Challenge yourself to take one more step fully offline next time. You might be surprised what you can manage without AI.`,
  L: (scenario) => `For <strong>${scenario}</strong>: excellent low-impact choice! Share this habit — helping others see the footprint of their prompts multiplies your impact.`
};

function getPersonalizedGreenerTip() {
  const answers = state.ethicsAnswers;
  if (!answers || !answers.length) return null;
  const worst = answers.find(a => a.type === 'H') || answers[answers.length - 1];
  return worst;
}

// ── Per-question consumption comparisons ──────
function getQComparison(key, value) {
  if (key === 'water') {
    if (value <= 25)  return '— a small sip of water';
    if (value <= 200) return '— about half a glass of water';
    return '— like a drinking bottle';
  }
  if (key === 'energy') {
    if (value <= 3)  return '— charging your phone for 5 min';
    if (value <= 20) return '— like 3 phone charges';
    return '— running a laptop for an hour';
  }
  if (key === 'co2') {
    if (value <= 2)  return '— a single breath';
    if (value <= 8)  return '— like charging your phone';
    return '— driving about 100 meters';
  }
  return '';
}

// ── Hide / show game chrome ────────────────────
function hideGameChrome() {
  const barsEl = document.getElementById('resource-bars');
  const pathEl = document.getElementById('snake-path');
  if (barsEl) barsEl.classList.add('game-chrome-hidden');
  if (pathEl) pathEl.classList.add('game-chrome-hidden');
  document.body.classList.remove('stamina-visible');
}

function showGameChrome() {
  const barsEl = document.getElementById('resource-bars');
  const pathEl = document.getElementById('snake-path');
  if (barsEl) barsEl.classList.remove('game-chrome-hidden');
  if (pathEl) pathEl.classList.remove('game-chrome-hidden');
}

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
    fill.className = 'resource-fill res-' + color + ' bar-updated';
    setTimeout(() => fill.classList.remove('bar-updated'), 500);
    if (lblEl) lblEl.textContent = label;

    // Update dynamic icon based on totalScore
    const iconEl = document.getElementById('res-icon-' + key);
    if (iconEl) {
      const step = getIconStep(key, state.totalScore);
      if (iconEl.textContent !== step.icon) {
        iconEl.textContent = step.icon;
        iconEl.style.transform = 'scale(1.3)';
        setTimeout(() => { iconEl.style.transform = ''; }, 300);
      }
    }
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
  const age       = document.getElementById('user-age').value || '';
  const expertise = document.getElementById('user-expertise').value || '';
  const errEl     = document.getElementById('userinfo-error');

  if (!age || !expertise) {
    errEl.classList.remove('hidden');
    return;
  }
  errEl.classList.add('hidden');

  state.userName      = document.getElementById('user-name').value.trim() || 'Player';
  state.userAge       = age;
  state.userExpertise = expertise;
  state.userGender    = '';

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
  state.totalScore           = 0;
  state.currentQuestions     = selectQuestionsFromBank(state.userAge, state.userExpertise);
  state.currentQuestionIndex = 0;

  updateResourceBars(state.resources);
  updateSnakePath(0);

  // Reset resource bar icons to best state
  ['energy', 'water', 'co2'].forEach(cat => {
    const iconEl = document.getElementById('res-icon-' + cat);
    if (iconEl) iconEl.textContent = getIconStep(cat, 0).icon;
  });

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

  document.getElementById('question-text').textContent = q.question;

  // Map type to display color
  const typeColorMap = { H: 'red', B: 'yellow', L: 'green' };

  const answers = ['A', 'B', 'C'].map(letter => ({
    letter,
    text:      q[letter].text,
    energy_wh: q[letter].energy_wh,
    water_ml:  q[letter].water_ml,
    co2_g:     q[letter].co2_g,
    score:     q[letter].score,
    type:      q[letter].type,
    color:     typeColorMap[q[letter].type],
    why:       q[letter].why || ''
  }));

  // Shuffle order
  answers.sort(() => Math.random() - 0.5);

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
    btn.addEventListener('click', function () {
      playSound('click');
      handleAnswer(answer, q.scenario || '', btn);
    });
    answersEl.appendChild(btn);
  });

  renderProgressDots();
}

function handleAnswer(answer, category, clickedBtn) {
  // Sound feedback based on answer quality
  if (answer.color === 'green') playSound('goodChoice');
  else if (answer.color === 'red') playSound('damage');
  else playSound('click');

  // Accumulate resources
  const r = state.resources;
  const newResources = {
    energy: r.energy + answer.energy_wh,
    water:  r.water  + answer.water_ml,
    co2:    r.co2    + answer.co2_g
  };
  updateResourceBars(newResources);

  // Accumulate score using Scoring_Logic.md formula
  state.score      += answer.score;
  state.totalScore  = state.score;
  state.mindfulness += (answer.score > 1 ? 2 : answer.score > -1 ? 1 : 0);

  // Record answer
  state.ethicsAnswers.push({
    category,
    letter:    answer.letter,
    color:     answer.color,
    type:      answer.type,
    energy_wh: answer.energy_wh,
    water_ml:  answer.water_ml,
    co2_g:     answer.co2_g,
    score:     answer.score
  });

  // Disable all buttons, highlight selected
  const allBtns = document.querySelectorAll('.answer-btn');
  allBtns.forEach(b => b.disabled = true);
  clickedBtn.classList.add(`selected-${answer.color}`);

  // Show why card if available
  const whyCard = document.getElementById('why-card');
  if (answer.why) {
    document.getElementById('why-text').textContent = answer.why;
    whyCard.className = `why-card why-border-${answer.color}`;
  } else {
    whyCard.className = 'why-card hidden';
  }

  // Show per-question consumption feedback with real-world comparisons
  const feedbackEl = document.getElementById('answer-feedback');
  if (feedbackEl) {
    document.getElementById('fb-water').textContent      = answer.water_ml  + ' ml';
    document.getElementById('fb-water-cmp').textContent  = getQComparison('water',  answer.water_ml);
    document.getElementById('fb-energy').textContent     = answer.energy_wh + ' Wh';
    document.getElementById('fb-energy-cmp').textContent = getQComparison('energy', answer.energy_wh);
    document.getElementById('fb-co2').textContent        = answer.co2_g     + ' g';
    document.getElementById('fb-co2-cmp').textContent    = getQComparison('co2',    answer.co2_g);
    feedbackEl.classList.remove('hidden');
  }

  document.getElementById('btn-next-question').classList.remove('hidden');
}

// ── Snake & Ladders Path ─────────────────────
function updateSnakePath(position, animate) {
  const avatar = document.getElementById('snake-avatar');
  if (!avatar) return;

  // Record screen position BEFORE DOM change (for FLIP animation)
  let oldRect = null;
  if (animate) {
    oldRect = avatar.getBoundingClientRect();
    avatar.style.transition = 'none';
  }

  // Remove avatar from all nodes, reset classes
  document.querySelectorAll('.snake-node').forEach(n => {
    const existing = n.querySelector('.snake-avatar');
    if (existing) n.removeChild(existing);
    n.classList.remove('snake-node-active', 'snake-node-done');
  });

  // Update connector "done" highlight
  document.querySelectorAll('.snake-connector').forEach(function (c, i) {
    if (i < position) c.classList.add('done');
    else c.classList.remove('done');
  });

  // Mark visited nodes
  for (let i = 0; i <= Math.min(position, 5); i++) {
    const node = document.getElementById(`snake-node-${i}`);
    if (!node) continue;
    if (i < position) node.classList.add('snake-node-done');
    if (i === position) node.classList.add('snake-node-active');
  }

  // Place avatar in target node (centered via CSS)
  const targetNode = document.getElementById(`snake-node-${Math.min(position, 5)}`);
  if (!targetNode) return;
  avatar.style.transform = 'translate(-50%, -50%)';
  targetNode.appendChild(avatar);

  // FLIP: animate from old screen position to new
  if (animate && oldRect) {
    const newRect = avatar.getBoundingClientRect();
    const dx = oldRect.left - newRect.left;
    const dy = oldRect.top  - newRect.top;

    // Instantly snap avatar to old visual position
    avatar.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;

    // Force reflow so the browser registers the snapped position
    avatar.getBoundingClientRect();

    // Animate to natural (centered) position
    avatar.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)';
    avatar.style.transform  = 'translate(-50%, -50%)';
  }
}

// ── Animated path advance (called by NEXT button) ──
function animateThenAdvance() {
  const nextBtn = document.getElementById('btn-next-question');
  if (nextBtn.disabled) return;
  nextBtn.disabled = true;

  // Pump current node
  const currentNode = document.getElementById(`snake-node-${state.currentQuestionIndex}`);
  if (currentNode) currentNode.classList.add('snake-node-pump');

  playSound('coin');

  // After pump animation, move avatar to next position
  setTimeout(function () {
    if (currentNode) currentNode.classList.remove('snake-node-pump');
    const nextPos = state.currentQuestionIndex + 1;
    updateSnakePath(nextPos, true);
    playSound('levelComplete');

    // After avatar travels, advance game state
    setTimeout(function () {
      nextBtn.disabled = false;
      advanceQuestion();
    }, 580);
  }, 450);
}

// ── Icon Consumption Meters ──────────────────
function updateIconMeters(totalScore) {
  ['water', 'co2', 'energy'].forEach(cat => {
    const step    = getIconStep(cat, totalScore);
    const iconEl  = document.getElementById(`icon-${cat}`);
    const stepEl  = document.getElementById(`step-${cat}`);
    if (iconEl) {
      iconEl.textContent = step.icon;
      iconEl.classList.remove('icon-animate');
      void iconEl.offsetWidth; // force reflow for animation restart
      iconEl.classList.add('icon-animate');
    }
    if (stepEl) stepEl.textContent = step.label;
  });
}

function showPersonaScreen() {
  const persona = getPersonaFromScore(state.score);
  state.persona = persona;

  document.getElementById('persona-byte').innerHTML          = persona.byteSvg;
  document.getElementById('persona-name').textContent        = persona.title;
  document.getElementById('persona-tagline').textContent     = persona.subtitle;
  document.getElementById('persona-description').textContent = persona.description;

  const personaTipEl = document.getElementById('persona-tip-text');
  if (personaTipEl && persona.tip) personaTipEl.textContent = persona.tip;

  document.getElementById('persona-score-display').textContent = 'Score: ' + state.totalScore + '/20';

  const impactLevel = state.resources.energy < 20 ? 'Low' : state.resources.energy <= 60 ? 'Medium' : 'High';
  document.getElementById('persona-scores').textContent =
    'Impact: ' + impactLevel + '  ·  Score: ' + state.totalScore + ' (range -15 to +20)';

  const res = state.resources;
  const fmt = function (v) { return Number.isInteger(v) ? v : +v.toFixed(1); };
  document.getElementById('summary-energy').textContent = fmt(res.energy) + ' Wh';
  document.getElementById('summary-water').textContent  = fmt(res.water)  + ' ml';
  document.getElementById('summary-co2').textContent    = fmt(res.co2)    + ' g CO₂';
  document.getElementById('cmp-summary-energy').textContent = getResourceComparison('energy', res.energy);
  document.getElementById('cmp-summary-water').textContent  = getResourceComparison('water',  res.water);
  document.getElementById('cmp-summary-co2').textContent    = getResourceComparison('co2',    res.co2);

  ['energy', 'water', 'co2'].forEach(function (cat) {
    const step   = getIconStep(cat, state.totalScore);
    const iconEl = document.getElementById('final-icon-' + cat);
    if (iconEl) iconEl.textContent = step.icon;
  });

  setTimeout(function () {
    const energyPct  = Math.min(100, (res.energy / RESOURCE_MAX_DISPLAY.energy) * 100);
    const waterPct   = Math.min(100, (res.water  / RESOURCE_MAX_DISPLAY.water)  * 100);
    const co2Pct     = Math.min(100, (res.co2    / RESOURCE_MAX_DISPLAY.co2)    * 100);
    const fillEnergy = document.getElementById('final-fill-energy');
    const fillWater  = document.getElementById('final-fill-water');
    const fillCo2    = document.getElementById('final-fill-co2');
    if (fillEnergy) fillEnergy.style.width = energyPct + '%';
    if (fillWater)  fillWater.style.width  = waterPct  + '%';
    if (fillCo2)    fillCo2.style.width    = co2Pct    + '%';
  }, 400);

  document.getElementById('question-card').classList.add('hidden');
  document.getElementById('ethics-summary').classList.remove('hidden');
  renderProgressDots();

  // Play persona-specific sound based on score
  const score = state.score;
  if      (score <= -7)  playSound('turbo');
  else if (score <= 4)   playSound('casual');
  else if (score <= 14)  playSound('mindful');
  else                   playSound('green');
}

function advanceQuestion() {
  document.getElementById('btn-next-question').classList.add('hidden');
  const feedbackEl = document.getElementById('answer-feedback');
  if (feedbackEl) feedbackEl.classList.add('hidden');
  state.currentQuestionIndex++;

  if (state.currentQuestionIndex >= TOTAL_QUESTIONS) {
    // Hide game chrome (path + stamina bars) — Task 3 & 6
    hideGameChrome();

    // Show suspense screen for 2.5s — Task 4
    const suspenseEl = document.getElementById('suspense-screen');
    if (suspenseEl) suspenseEl.classList.remove('hidden');
    playSound('print');

    setTimeout(function () {
      if (suspenseEl) suspenseEl.classList.add('hidden');
      showPersonaScreen();
    }, 2500);
  } else {
    renderQuestion();
  }
}

// Next button — pumps path, animates cloud, then advances question
document.getElementById('btn-next-question').addEventListener('click', animateThenAdvance);

// Continue button — goes directly to greener tips screen
document.getElementById('btn-continue-ethics').addEventListener('click', () => {
  populateGreenerScreen();
  showScreen('greener');
  Byte.setState('greener');
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

// ── SCREEN 3: GO GREENER ─────────────────────

function populateGreenerScreen() {
  // Personalized tip based on worst-impact answer
  const worstAnswer  = getPersonalizedGreenerTip();
  const tipBoxEl     = document.getElementById('personal-tip-box');
  const tipScenario  = document.getElementById('personal-tip-scenario');
  const tipTextEl    = document.getElementById('personal-tip-text');

  if (tipBoxEl) tipBoxEl.classList.add('hidden');

  if (worstAnswer && tipBoxEl) {
    const tipFn    = GREENER_TIPS[worstAnswer.type] || GREENER_TIPS['B'];
    const scenario = worstAnswer.category || 'your last choice';
    tipScenario.textContent = '⚡ PERSONALISED FOR YOU';
    tipTextEl.innerHTML     = tipFn(scenario);
    tipBoxEl.classList.remove('hidden');
  }

  // General tips grid
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
  state.totalScore          = 0;
  state.userName            = '';
  state.userAge             = '';
  state.userExpertise       = '';
  state.userGender          = '';
  state.ethicsAnswers        = [];
  state.currentQuestions     = [];
  state.currentQuestionIndex = 0;
  state.persona              = null;

  document.getElementById('user-name').value      = '';
  document.getElementById('user-age').value       = '';
  document.getElementById('user-expertise').value = '';

  // Reset final results bar fills
  ['final-fill-energy', 'final-fill-water', 'final-fill-co2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.width = '0%';
  });

  // Reset resource bar icons
  ['energy', 'water', 'co2'].forEach(cat => {
    const iconEl = document.getElementById('res-icon-' + cat);
    if (iconEl) iconEl.textContent = getIconStep(cat, 0).icon;
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
