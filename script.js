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
  score: 0,
  staminaLevel: 3,          // 1–5, starts at 3 (medium tree)
  personalizedTip: '',      // cached after Screen 3, reused for ticket
  userName: '',
  userAge: '',
  userExpertise: '',
  userGender: '',
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
  persona:  document.getElementById('screen-persona'),
  greener:  document.getElementById('screen-greener'),
  print:    document.getElementById('screen-print')
};

const overlayInstructions = document.getElementById('overlay-instructions');
const errorToast          = document.getElementById('error-toast');
const errorMsg            = document.getElementById('error-msg');

// WHY_TEXT and ANSWER_TYPE_COLOR are defined in data.js

// ── 3-bar stamina HUD (Water / CO₂ / Energy) ─
function updateStaminaBars(level) {
  state.staminaLevel = level;
  ['bar-water', 'bar-co2', 'bar-energy'].forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;
    container.querySelectorAll('.mario-seg').forEach((seg, i) => {
      seg.classList.toggle('filled', i < level);
    });
    container.classList.remove('bar-pop');
    void container.offsetWidth;
    container.classList.add('bar-pop');
  });
}

// ── Byte cloud traveler position ─────────────
function updateBytePosition(questionIndex) {
  const traveler = document.getElementById('byte-traveler');
  if (!traveler) return;
  // 0 = left edge, 5 = right edge (85% max to avoid overflow)
  const pct = Math.round((questionIndex / 5) * 85);
  traveler.style.left = pct + '%';
}

// ── Screen Navigation ────────────────────────
function showScreen(name) {
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

// ── State Reset ──────────────────────────────
function resetGameState() {
  state.score                = 0;
  state.staminaLevel         = 3;
  state.personalizedTip      = '';
  state.ethicsAnswers        = [];
  state.currentQuestions     = [];
  state.currentQuestionIndex = 0;
  state.persona              = null;
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

// ── SCREEN 0: IDLE ──────────────────────────
document.getElementById('btn-start').addEventListener('click', () => {
  overlayInstructions.classList.remove('hidden');
  Byte.say('Here\'s how to play! 🎮');
});

document.getElementById('btn-lets-go').addEventListener('click', () => {
  overlayInstructions.classList.add('hidden');
  resetGameState();
  showScreen('userinfo');
  Byte.setState('idle');
});

Byte.setState('idle');

// ── SCREEN 0.5: USER INFO ───────────────────

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
  state.userGender    = document.getElementById('user-gender').value || '';

  // Randomly assign prompt
  const pick     = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  state.prompt   = pick.prompt;
  state.taskType = pick.taskType;

  startEthicsQuestions();
  showScreen('ethics');
});

// ── SCREEN 1.1: ETHICS QUESTIONS ─────────────

function startEthicsQuestions() {
  state.ethicsAnswers        = [];
  state.score                = 0;
  state.staminaLevel         = 3;
  state.currentQuestions     = selectQuestionsFromBank(state.userAge, state.userExpertise);
  state.currentQuestionIndex = 0;

  updateStaminaBars(3);
  updateBytePosition(0);

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
    t('ui.questionOf') || `Question ${idx + 1} of ${TOTAL_QUESTIONS}`;

  // Category badge (scenario)
  const catEl = document.getElementById('question-category');
  if (catEl) catEl.textContent = q.scenario ? '🤖 ' + q.scenario.toUpperCase() : '';

  document.getElementById('question-text').textContent = q.question;

  const answers = ['A', 'B', 'C'].map(letter => ({
    letter,
    text:  q[letter].text,
    score: q[letter].score,
    type:  q[letter].type,
    color: ANSWER_TYPE_COLOR[q[letter].type]
  }));

  // Shuffle order (no answer-position hints)
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
      handleAnswer(answer, btn);
    });
    answersEl.appendChild(btn);
  });

  document.getElementById('btn-next-question').classList.add('hidden');
  renderProgressDots();
}

function handleAnswer(answer, clickedBtn) {
  // Sound feedback
  if (answer.type === 'L')      playSound('goodChoice');
  else if (answer.type === 'H') playSound('damage');
  else                          playSound('click');

  // Accumulate score
  state.score += answer.score;

  // Update stamina tree
  const newLevel = calculateStaminaLevel(state.score);
  if (newLevel !== state.staminaLevel) {
    updateStaminaBars(newLevel);
  }

  // Record answer
  state.ethicsAnswers.push({
    category: state.currentQuestions[state.currentQuestionIndex].scenario || '',
    letter:   answer.letter,
    color:    answer.color,
    type:     answer.type,
    score:    answer.score
  });

  // Disable all buttons, highlight selected
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
  clickedBtn.classList.add(`selected-${answer.color}`);

  // Show WHY card with generic text per type
  const whyCard = document.getElementById('why-card');
  document.getElementById('why-text').textContent = WHY_TEXT[answer.type] || WHY_TEXT.B;
  whyCard.className = `why-card why-border-${answer.color}`;

  document.getElementById('btn-next-question').classList.remove('hidden');
}

// ── Next button ──────────────────────────────
document.getElementById('btn-next-question').addEventListener('click', () => {
  const nextBtn = document.getElementById('btn-next-question');
  if (nextBtn.disabled) return;
  nextBtn.disabled = true;
  playSound('coin');

  // Advance byte traveler
  updateBytePosition(state.currentQuestionIndex + 1);

  setTimeout(() => {
    nextBtn.disabled = false;
    advanceQuestion();
  }, 650);
});

function advanceQuestion() {
  const whyCard  = document.getElementById('why-card');
  if (whyCard) whyCard.className = 'why-card hidden';
  document.getElementById('btn-next-question').classList.add('hidden');
  state.currentQuestionIndex++;

  if (state.currentQuestionIndex >= TOTAL_QUESTIONS) {
    playSound('levelComplete');
    // Navigate to persona screen
    showPersonaScreen();
  } else {
    renderQuestion();
  }
}

// ── SCREEN 2: PERSONA REVEAL ─────────────────

function showPersonaScreen() {
  const persona = getPersonaFromScore(state.score);
  state.persona = persona;

  document.getElementById('persona-byte').innerHTML          = persona.byteSvg;
  document.getElementById('persona-name').textContent        = persona.title;
  document.getElementById('persona-tagline').textContent     = persona.subtitle;
  document.getElementById('persona-description').textContent = persona.description;
  document.getElementById('persona-score-display').textContent = 'Score: ' + state.score + '/20';

  // Persona sound
  if      (state.score <= -7)  playSound('turbo');
  else if (state.score <= 4)   playSound('casual');
  else if (state.score <= 14)  playSound('mindful');
  else                         playSound('green');

  showScreen('persona');
}

document.getElementById('btn-go-green').addEventListener('click', () => {
  populateGreenerScreen();
  showScreen('greener');
  Byte.setState('greener');
});

// ── SCREEN 3: PERSONALIZED TIP ───────────────

function populateGreenerScreen() {
  state.personalizedTip = getPersonalizedTip(state.ethicsAnswers, state.persona);
  const tipEl = document.getElementById('tip-text');
  if (tipEl) tipEl.textContent = state.personalizedTip;
}

document.getElementById('btn-print').addEventListener('click', () => {
  state.sessionId = generateSessionId();
  populateTicketCard(state);
  showScreen('print');
  Byte.setState('print');
  playSound('print');
});

// ── SCREEN 4: TICKET DOWNLOAD ────────────────

document.getElementById('btn-download').addEventListener('click', () => {
  downloadCard(state.sessionId);
});

document.getElementById('btn-play-again').addEventListener('click', () => {
  resetGameState();
  state.prompt      = '';
  state.taskType    = 'text-short';
  state.metrics     = null;
  state.sessionId   = generateSessionId();
  state.userName    = '';
  state.userAge     = '';
  state.userExpertise = '';
  state.userGender  = '';

  document.getElementById('user-name').value      = '';
  document.getElementById('user-age').value       = '';
  document.getElementById('user-expertise').value = '';
  document.getElementById('user-gender').value    = '';

  updateBytePosition(0);
  showScreen('idle');
  Byte.setState('idle');
});

// ── Keyboard Navigation ──────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !overlayInstructions.classList.contains('hidden')) {
    overlayInstructions.classList.add('hidden');
  }
});
