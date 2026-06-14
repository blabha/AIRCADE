/* ═══════════════════════════════════════════
   (Ai)rcade — Main App Logic
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
  persona: null,
  livesRemaining:    3,
  isFirstGameOver:   false,
  savedSessionData:  null,
  resumeFromQuestion: 0
};

// ── DOM References ───────────────────────────
const screens = {
  langselect: document.getElementById('screen-langselect'),
  idle:       document.getElementById('screen-idle'),
  userinfo:   document.getElementById('screen-userinfo'),
  howtoplay:  document.getElementById('screen-howtoplay'),
  ethics:     document.getElementById('screen-ethics'),
  persona:    document.getElementById('screen-persona'),
  print:      document.getElementById('screen-print')
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
    _focusScreen(name);
  }, 320);
}

// Reset function assigned by initCustomSelects IIFE — used when userinfo screen loads
let _resetCustomSelects = null;

// Auto-focus the primary action element when a screen becomes active
function _focusScreen(name) {
  if (name === 'userinfo') {
    setTimeout(() => {
      if (typeof _resetCustomSelects === 'function') _resetCustomSelects();
      const el = document.getElementById('user-name');
      if (el) el.focus();
    }, 60);
    return;
  }
  if (name === 'ethics') {
    setTimeout(() => {
      if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
      }
    }, 60);
    return;
  }
  const focusMap = {
    langselect: 'btn-lang-en',
    idle:       'btn-start',
    howtoplay:  'btn-howtoplay-start',
    persona:    'btn-go-green',
    print:      'btn-download',
  };
  const id = focusMap[name];
  if (id) {
    setTimeout(() => { const el = document.getElementById(id); if (el) el.focus(); }, 60);
  }
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
  state.livesRemaining       = 3;
  state.isFirstGameOver      = false;
  state.savedSessionData     = null;
  state.resumeFromQuestion   = 0;
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
  setTimeout(() => document.getElementById('btn-lets-go').focus(), 60);
});

document.getElementById('btn-lets-go').addEventListener('click', () => {
  overlayInstructions.classList.add('hidden');
  resetGameState();
  showScreen('userinfo');
  Byte.setState('idle');
});

Byte.setState('idle');

// ── SCREEN -1: LANGUAGE SELECTION ───────────
(function initLangSelect() {
  const LANG_BTNS = ['btn-lang-en', 'btn-lang-es', 'btn-lang-ca'];

  LANG_BTNS.forEach((id, i) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      showScreen('idle');
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = document.getElementById(LANG_BTNS[Math.min(i + 1, LANG_BTNS.length - 1)]);
        if (next) next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = document.getElementById(LANG_BTNS[Math.max(i - 1, 0)]);
        if (prev) prev.focus();
      }
    });
  });

  // Auto-focus first button on initial load — screen-langselect is pre-active
  setTimeout(() => { const el = document.getElementById('btn-lang-en'); if (el) el.focus(); }, 120);
})();

// ── SCREEN 0.5: USER INFO ───────────────────

// Custom keyboard-navigable selectors replacing native <select> elements
(function initCustomSelects() {
  const SELECTS = [
    {
      id: 'cs-user-age',
      hiddenId: 'user-age',
      nextId: 'cs-user-expertise',
      placeholder: 'Select age range...',
      options: [
        { value: '0-12',  label: '0-12'  },
        { value: '13-19', label: '13-19' },
        { value: '20-39', label: '20-39' },
        { value: '40-59', label: '40-59' },
        { value: '60+',   label: '60+'   },
      ],
    },
    {
      id: 'cs-user-expertise',
      hiddenId: 'user-expertise',
      nextId: 'cs-user-gender',
      placeholder: 'Select expertise level...',
      options: [
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Average',  label: 'Average'  },
        { value: 'Expert',   label: 'Expert'   },
      ],
    },
    {
      id: 'cs-user-gender',
      hiddenId: 'user-gender',
      nextId: 'btn-userinfo-continue',
      placeholder: 'Prefer not to say',
      options: [
        { value: 'Female',     label: 'Female'            },
        { value: 'Male',       label: 'Male'              },
        { value: 'Non-binary', label: 'Non-binary'        },
        { value: 'Other',      label: 'Other'             },
        { value: '',           label: 'Prefer not to say' },
      ],
    },
  ];

  // Per-selector mutable state stored here so resetAll can reach it
  const states = {};

  let currentlyOpen = null;

  function closeAll() {
    SELECTS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('cs-open');
      const dd = el.querySelector('.custom-sel-dropdown');
      if (dd) dd.classList.add('hidden');
    });
    currentlyOpen = null;
  }

  SELECTS.forEach(({ id, hiddenId, nextId, placeholder, options }) => {
    const el     = document.getElementById(id);
    const hidden = document.getElementById(hiddenId);
    if (!el || !hidden) return;

    const valSpan = el.querySelector('.custom-sel-value');

    // Build the dropdown list (injected once into the DOM)
    const dropdown = document.createElement('div');
    dropdown.className = 'custom-sel-dropdown hidden';
    options.forEach((opt, i) => {
      const item = document.createElement('div');
      item.className = 'custom-sel-option';
      item.textContent = opt.label;
      item.dataset.idx = i;
      dropdown.appendChild(item);
    });
    el.appendChild(dropdown);

    const state = { selectedIdx: -1, highlightedIdx: -1 };
    states[id] = { el, hidden, valSpan, placeholder, options, dropdown, state };

    // Auto-open whenever this selector receives focus (handles keyboard chain and TAB)
    el.addEventListener('focus', () => {
      if (!el.classList.contains('cs-open')) openDropdown();
    });

    function getItems() {
      return [...dropdown.querySelectorAll('.custom-sel-option')];
    }

    function setHighlight(idx) {
      const items = getItems();
      items.forEach(it => it.classList.remove('cs-highlighted'));
      if (idx >= 0 && idx < items.length) {
        items[idx].classList.add('cs-highlighted');
        items[idx].scrollIntoView({ block: 'nearest' });
      }
      state.highlightedIdx = idx;
    }

    function openDropdown() {
      closeAll();
      currentlyOpen = id;
      el.classList.add('cs-open');
      dropdown.classList.remove('hidden');
      // Start highlight on currently selected option, else first
      setHighlight(state.selectedIdx >= 0 ? state.selectedIdx : 0);
    }

    function closeDropdown() {
      el.classList.remove('cs-open');
      dropdown.classList.add('hidden');
      if (currentlyOpen === id) currentlyOpen = null;
      state.highlightedIdx = -1;
    }

    function confirmSelection(idx) {
      const items = getItems();
      if (idx < 0 || idx >= items.length) return;
      state.selectedIdx = idx;
      const opt = options[idx];
      hidden.value = opt.value;
      valSpan.textContent = opt.label;
      valSpan.classList.remove('custom-sel-placeholder');
      items.forEach(it => it.classList.remove('cs-selected'));
      items[idx].classList.add('cs-selected');
      closeDropdown();
      // Advance focus to the next field in the linear form flow
      const next = document.getElementById(nextId);
      if (next) next.focus();
    }

    el.addEventListener('keydown', (e) => {
      const isOpen = el.classList.contains('cs-open');

      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          openDropdown();
        }
        // TAB and SHIFT+TAB: natural browser navigation, no intercept
      } else {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const items = getItems();
          setHighlight(Math.min(state.highlightedIdx + 1, items.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlight(Math.max(state.highlightedIdx - 1, 0));
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (state.highlightedIdx >= 0) confirmSelection(state.highlightedIdx);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeDropdown();
        } else if (e.key === 'Tab') {
          // Close dropdown and let browser handle TAB focus movement naturally
          closeDropdown();
        }
      }
    });

    // Option click (mouse/touch fallback)
    getItems().forEach((item, i) => {
      item.addEventListener('mousedown', (e) => {
        e.preventDefault(); // prevent blur on the selector
        confirmSelection(i);
      });
    });

    // Close when focus leaves the selector entirely
    el.addEventListener('blur', () => {
      setTimeout(() => {
        if (document.activeElement !== el) closeDropdown();
      }, 80);
    });
  });

  // Close open dropdown on any outside click
  document.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.custom-sel')) closeAll();
  });

  // Expose reset function so _focusScreen can call it when userinfo loads
  _resetCustomSelects = function () {
    closeAll();
    Object.values(states).forEach(({ el, hidden, valSpan, placeholder, dropdown, state }) => {
      state.selectedIdx    = -1;
      state.highlightedIdx = -1;
      hidden.value = '';
      valSpan.textContent = placeholder;
      valSpan.classList.add('custom-sel-placeholder');
      el.classList.remove('cs-open');
      dropdown.classList.add('hidden');
      dropdown.querySelectorAll('.custom-sel-option').forEach(opt => {
        opt.classList.remove('cs-highlighted', 'cs-selected');
      });
    });
  };
})();

// ENTER on Name input advances to Age selector (which auto-opens on focus)
(function initNameEnter() {
  const nameInput = document.getElementById('user-name');
  if (!nameInput) return;
  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const age = document.getElementById('cs-user-age');
      if (age) age.focus();
    }
  });
})();

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

  showScreen('howtoplay');
});

document.getElementById('btn-howtoplay-start').addEventListener('click', () => {
  showScreen('ethics');
  setTimeout(() => startDemo(), 400);
});

// ── SCREEN 1.1: ETHICS QUESTIONS ─────────────

// ── Platformer game controller ────────────────
const game = {
  // DOM refs
  _byteEl:        null,
  _worldEl:       null,
  _worldObjEl:    null,
  _bgStarsEl:     null,
  _bgCloudsEl:    null,

  // World dimensions (set in init)
  _worldH: 0,
  _worldW: 0,
  _groundY: 0,      // CSS Y of ground surface (top of 40px strip)

  // Physics — CSS coords (Y increases downward)
  _byteBottom:     0,   // CSS Y of Byte's bottom edge
  _byteVelY:       0,   // positive = falling, negative = rising
  _byteX:          0,   // screen X of Byte's left edge
  _homeX:          0,   // home screen X (set in init, ~20% of worldW)
  _byteVelX:       0,   // horizontal velocity (arc jump)
  _prevByteBottom: 0,
  _onGround:       true,
  _onBlock:        null,

  // Arc-jump input tracking
  _rightHeld:      false,
  _rightPressedAt: 0,

  // World state
  _worldX:   0,         // how far world has scrolled (px)
  _blocks:   [],        // { worldX, el, activated, used, screenX }
  _questionIdx: 0,

  // Input
  _keys: {},
  _keyHandler:   null,
  _keyUpHandler: null,

  // Animation flags
  _inJump:    false,
  _animating: false,

  // Loop
  _raf:         null,
  _running:     false,
  _overlayOpen: false,
  _pendingCrushCb: null,

  // Demo mode
  _demoMode:  false,
  _demoPhase: null,   // 'act1_scroll'|'act1_bubble'|'act1_resume'|'act2_scroll'|'act2_bubble'|'act2_question'|'ready'
  _demoBubbleFrames: 0,
  _demoDCEl:  null,
  _demoBlockEl: null,
  _demoDone:  false,  // never replay after first run

  // Tuning constants
  GRAVITY:    0.6,
  JUMP_FORCE: -14,    // negative = upward in CSS coords
  JUMP_VX:    6.0,    // horizontal velocity for arc jump
  BASE_SCROLL_SPEED: 5.0,
  SPEED_MULTIPLIERS: [1.0, 1.1, 1.2, 1.3, 1.5],
  ZONE_WIDTH: 8000,   // world-space width allocated per question (14 objects × avg 500px gap)
  BYTE_W:     88,
  BYTE_H:     66,
  GROUND_H:   40,
  BLOCK_W:    52,
  BLOCK_H:    52,
  DC_W:       80,
  DC_H:       55,
  BLOCK_ELEV: 58,     // low-height block: bottom this many px above ground

  init() {
    this._byteEl     = document.getElementById('byte-player');
    this._worldEl    = document.getElementById('game-world');
    this._worldObjEl = document.getElementById('game-world-objects');
    this._bgStarsEl  = document.getElementById('game-stars');
    this._bgCloudsEl = document.getElementById('game-clouds');

    // If screen not yet visible (transition pending), retry after transition
    if (!this._worldEl || this._worldEl.getBoundingClientRect().height < 50) {
      setTimeout(() => this.init(), 400);
      return;
    }

    const rect       = this._worldEl.getBoundingClientRect();
    this._worldH     = rect.height;
    this._worldW     = rect.width;
    this._groundY    = this._worldH - this.GROUND_H;

    // Reset physics
    this._homeX       = Math.round(this._worldW * 0.20);
    this._byteX       = this._homeX;
    this._byteVelX    = 0;
    this._byteBottom  = this._groundY;
    this._byteVelY    = 0;
    this._onGround    = true;
    this._onBlock     = null;
    this._rightHeld      = false;
    this._rightPressedAt = 0;
    this._questionIdx = state.currentQuestionIndex || 0;
    this._worldX      = this._questionIdx * this.ZONE_WIDTH;
    this._inJump     = false;
    this._animating  = false;
    this._overlayOpen = false;
    this._pendingCrushCb = null;
    this._obstacles  = [];
    this._obstacleHitCooldown = 0;
    this._keys = {};

    this._spawnStars();
    this._spawnClouds();
    if (this._demoMode) {
      this._spawnDemoObjects();
    } else {
      this._spawnBlocks();
    }
    this._bindInput();
    this._positionByte();
    this._setByteState('idle');

    this._running = true;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._loop();
  },

  _spawnStars() {
    const el = this._bgStarsEl;
    if (!el) return;
    el.innerHTML = '';
    const COLORS = ['0,245,255', '255,0,110', '255,255,240', '255,255,240', '255,255,240'];
    for (let i = 0; i < 45; i++) {
      const s = document.createElement('div');
      s.className = 'game-star';
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size  = Math.random() < 0.25 ? 3 : 2;
      const op    = (0.3 + Math.random() * 0.55).toFixed(2);
      const dur   = (2 + Math.random() * 3).toFixed(1);
      const del   = -(Math.random() * 4).toFixed(1);
      s.style.cssText = `left:${(Math.random()*100).toFixed(1)}%;top:${(5+Math.random()*70).toFixed(1)}%;width:${size}px;height:${size}px;background:rgba(${color},1);--star-op:${op};animation-duration:${dur}s;animation-delay:${del}s`;
      el.appendChild(s);
    }
  },

  _spawnClouds() {
    const el = this._bgCloudsEl;
    if (!el) return;
    el.innerHTML = '';
    const clouds = [
      { l:5,  t:10, w:90,  dur:28, del:0  },
      { l:25, t:22, w:70,  dur:22, del:8  },
      { l:50, t:7,  w:110, dur:32, del:4  },
      { l:70, t:18, w:80,  dur:26, del:14 },
      { l:88, t:13, w:65,  dur:20, del:20 },
    ];
    const SVG = (w) => {
      const h = Math.round(w * 0.6);
      const s = w / 80;
      return `<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block" width="${w}" height="${h}">
        <rect x="20" y="20" width="40" height="18" rx="3" fill="rgba(200,232,245,0.09)"/>
        <rect x="10" y="26" width="60" height="14" rx="3" fill="rgba(200,232,245,0.09)"/>
        <rect x="14" y="12" width="18" height="16" rx="2" fill="rgba(200,232,245,0.08)"/>
        <rect x="28" y="6"  width="22" height="18" rx="2" fill="rgba(200,232,245,0.08)"/>
        <rect x="48" y="12" width="16" height="16" rx="2" fill="rgba(200,232,245,0.08)"/>
      </svg>`;
    };
    clouds.forEach(c => {
      const d = document.createElement('div');
      d.className = 'game-cloud';
      d.style.cssText = `left:${c.l}%;top:${c.t}%;animation-duration:${c.dur}s;animation-delay:-${c.del}s`;
      d.innerHTML = SVG(c.w);
      el.appendChild(d);
    });
  },

  _spawnBlocks() {
    if (!this._worldObjEl) return;
    this._worldObjEl.innerHTML = '';
    this._blocks    = [];
    this._obstacles = [];

    // answerIds for 5 non-decoy blocks per question (cycles A→B→C→A→B)
    const ANSWER_IDS = ['A', 'B', 'C', 'A', 'B'];

    for (let qi = 0; qi < 5; qi++) {
      // Items start just off the right edge when this question's zone begins
      let curX = qi * this.ZONE_WIDTH + this._worldW + 220;

      // 7 ? blocks: pick 2 random decoy indices
      const bidx = [0,1,2,3,4,5,6];
      for (let i = bidx.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bidx[i], bidx[j]] = [bidx[j], bidx[i]];
      }
      const decoySet = new Set([bidx[0], bidx[1]]);

      let nonDecoyCount = 0;
      const blockItems = [];
      for (let i = 0; i < 7; i++) {
        const isDecoy     = decoySet.has(i);
        const highBlock   = Math.random() < 0.5;
        const blockCSSTop = highBlock
          ? this._groundY - this.BLOCK_H - 110
          : this._groundY - this.BLOCK_H;
        const answerId = isDecoy ? null : ANSWER_IDS[nonDecoyCount++];
        blockItems.push({ isDecoy, answerId, blockCSSTop });
      }

      // Strictly alternating: dc, block, dc, block ... (first = dc)
      // 7 blocks → 7 DCs interspersed
      const PATTERN = ['dc', 'block'];
      let patIdx = 0;
      let blockIdx = 0;

      const totalItems = 14; // 7 dc + 7 block
      for (let i = 0; i < totalItems; i++) {
        const kind = PATTERN[patIdx % 2];
        patIdx++;

        const x = curX;
        curX += 300 + Math.random() * 350;

        if (kind === 'block') {
          const item = blockItems[blockIdx++];
          const el = document.createElement('div');
          el.className = 'q-block-platform hidden';
          el.textContent = '?';
          this._worldObjEl.appendChild(el);
          this._blocks.push({
            worldX:      x,
            screenX:     x,
            el,
            activated:   false,
            used:        false,
            questionIdx: qi,
            isDecoy:     item.isDecoy,
            answerId:    item.answerId,
            blockCSSTop: item.blockCSSTop,
          });
        } else {
          const canvas = document.createElement('canvas');
          canvas.width  = this.DC_W;
          canvas.height = this.DC_H;
          canvas.className = 'hidden';
          canvas.style.position = 'absolute';
          canvas.style.imageRendering = 'pixelated';
          this._drawDatacenterCanvas(canvas);
          this._worldObjEl.appendChild(canvas);
          this._obstacles.push({
            worldX:      x,
            screenX:     x,
            el:          canvas,
            used:        false,
            questionIdx: qi,
            obsTop:      this._groundY - this.DC_H,
            obsH:        this.DC_H,
          });
        }
      }
    }
  },

  _bindInput() {
    if (this._keyHandler)   document.removeEventListener('keydown', this._keyHandler);
    if (this._keyUpHandler) document.removeEventListener('keyup',   this._keyUpHandler);

    this._keyHandler = (e) => {
      if (!this._running) return;
      // Only active on the ethics screen — never consume events on other screens
      if (state.screen !== 'ethics') return;
      // When overlay is open let the overlay handle its own keyboard navigation
      if (this._overlayOpen) return;
      const nav = ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '];
      if (nav.includes(e.key)) e.preventDefault();
      this._keys[e.key] = true;
      // Track → timestamp before jump decision so 150ms co-press window works in any order
      if (e.key === 'ArrowRight') {
        this._rightHeld = true;
        this._rightPressedAt = performance.now();
      }
      if ((e.key === 'ArrowUp' || e.key === ' ') && this._demoMode && this._demoPhase === 'ready') {
        this._hideDemoReady();
        this._demoMode  = false;
        this._demoDone  = true;
        this._demoPhase = null;
        this.stop();
        startEthicsQuestions();
        return;
      }
      if ((e.key === 'ArrowUp' || e.key === ' ') && (this._onGround || this._onBlock)) {
        const timeSinceRight = performance.now() - this._rightPressedAt;
        const isArcJump = this._rightHeld || timeSinceRight < 150;
        this._startJump(isArcJump);
      }
    };
    this._keyUpHandler = (e) => {
      this._keys[e.key] = false;
      if (e.key === 'ArrowRight') this._rightHeld = false;
    };

    document.addEventListener('keydown', this._keyHandler);
    document.addEventListener('keyup',   this._keyUpHandler);
  },

  // Keyboard-only cabinet: touch and mouse handlers removed

  _startJump(isArcJump) {
    this._byteVelY  = this.JUMP_FORCE;
    this._byteVelX  = isArcJump ? this.JUMP_VX : 0;
    this._onGround  = false;
    this._onBlock   = null;
    this._inJump    = true;
    this._setByteState('jump');
  },

  _crushBlock(block) {
    block.activated = true;
    block.el.classList.add('block-activated');
    block.el.textContent = '';
    this._overlayOpen = true;
    playSound('coin');
    setTimeout(() => {
      const overlay = document.getElementById('q-overlay');
      if (overlay) {
        overlay.classList.remove('hidden');
        void overlay.offsetWidth;
        overlay.classList.add('overlay-burst-in');
        // Focus first answer button after burst-in animation completes
        setTimeout(() => {
          const firstAnswer = document.querySelector('#answer-options .answer-btn:not(:disabled)');
          if (firstAnswer) firstAnswer.focus();
        }, 200);
      }
    }, 150);
  },

  _positionByte() {
    if (!this._byteEl) return;
    this._byteEl.style.left = Math.round(this._byteX) + 'px';
    this._byteEl.style.top  = (this._byteBottom - this.BYTE_H) + 'px';
  },

  _updateBlocks() {
    this._blocks.forEach(b => {
      b.screenX = b.worldX - this._worldX;
      const inCluster = b.questionIdx === this._questionIdx;
      const onScreen  = b.screenX > -this.BLOCK_W - 60 && b.screenX < this._worldW + 200;
      if (!inCluster || !onScreen || b.used) {
        b.el.classList.add('hidden');
      } else {
        b.el.classList.remove('hidden');
        b.el.style.left = b.screenX + 'px';
        b.el.style.top  = b.blockCSSTop + 'px';
      }
    });
  },

  _updateObstacles() {
    if (!this._obstacles) return;
    this._obstacles.forEach(b => {
      b.screenX = b.worldX - this._worldX;
      const inZone   = b.questionIdx === this._questionIdx;
      const onScreen = b.screenX > -this.DC_W - 60 && b.screenX < this._worldW + 200;
      if (!inZone || !onScreen || b.used) {
        b.el.classList.add('hidden');
      } else {
        b.el.classList.remove('hidden');
        b.el.style.left = b.screenX + 'px';
        b.el.style.top  = b.obsTop + 'px';
      }
    });
  },

  _checkBlockCollision() {
    const byteLeft    = Math.round(this._byteX);
    const byteRight   = byteLeft + this.BYTE_W;
    const byteTop     = this._byteBottom - this.BYTE_H;
    const prevByteTop = this._prevByteBottom - this.BYTE_H;

    let foundBlock = null;
    for (const b of this._blocks) {
      if (b.used || b.activated) continue;
      const blockCSSTop = b.blockCSSTop;
      const blockBottom = blockCSSTop + this.BLOCK_H;
      const overlapX    = byteRight > b.screenX + 8 && byteLeft < b.screenX + this.BLOCK_W - 8;

      if (overlapX) {
        // Hit-from-below: player rising (velY < 0 in CSS), head enters block from below.
        // Condition 1: velY < 0 (moving upward in CSS coords where negative = up)
        // Condition 2: player head is within the block's vertical range
        if (this._byteVelY < 0 &&
            byteTop <= blockBottom &&
            byteTop >= blockCSSTop) {
          this._byteVelY = 1.0;  // stop upward movement, gravity takes over
          if (b.isDecoy) {
            this._crushDecoy(b);
          } else if (b.questionIdx === this._questionIdx) {
            this._crushBlock(b);
          }
          break;
        }

        // Landing on top: player falling, land on block surface + trigger question
        if (this._byteVelY >= 0 &&
            this._byteBottom >= blockCSSTop &&
            this._byteBottom <= blockCSSTop + this.BLOCK_H + 8 &&
            byteTop < blockCSSTop) {
          this._byteBottom = blockCSSTop;
          this._byteVelY   = 0;
          this._byteVelX   = 0;
          this._onGround   = false;
          this._onBlock    = b;
          this._inJump     = false;
          foundBlock = b;
          if (b.isDecoy) {
            this._crushDecoy(b);
          } else if (b.questionIdx === this._questionIdx) {
            this._crushBlock(b);
          }
          break;
        }

        // Already standing on this block: keep locked
        if (this._onBlock === b) {
          this._byteBottom = blockCSSTop;
          foundBlock = b;
        }
      }
    }

    // Walked off block edge
    if (this._onBlock && this._onBlock !== foundBlock) {
      this._onBlock = null;
    }
  },

  _checkObstacleCollision() {
    if (!this._obstacles || this._obstacleHitCooldown > 0) {
      if (this._obstacleHitCooldown > 0) this._obstacleHitCooldown--;
      return;
    }
    const byteLeft   = Math.round(this._byteX) + 6;
    const byteRight  = Math.round(this._byteX) + this.BYTE_W - 6;
    const byteTop    = this._byteBottom - this.BYTE_H + 4;
    const byteBottom = this._byteBottom;

    for (const b of this._obstacles) {
      if (b.used || b.questionIdx !== this._questionIdx) continue;
      if (byteBottom <= b.obsTop) continue;  // player cleared the top — no collision
      const ol  = b.screenX;
      const or_ = b.screenX + this.DC_W;
      const ot  = b.obsTop;
      const ob  = this._groundY;
      if (byteRight > ol && byteLeft < or_ && byteBottom > ot && byteTop < ob) {
        b.used = true;
        b.el.classList.add('hidden');
        this._obstacleHitCooldown = 60;
        this._showFlash('OUCH!');
        playSound('damage');
        this._setByteState('damage');
        this._animating = true;
        setTimeout(() => { this._animating = false; }, 650);
        this._loseLife();
        if (!this._running) return;
        break;
      }
    }
  },

  _loop() {
    if (!this._running) return;
    this._raf = requestAnimationFrame(() => this._loop());
    this._update();
  },

  _update() {
    if (this._overlayOpen) return;
    if (this._demoMode) { this._updateDemo(); return; }

    this._prevByteBottom = this._byteBottom;

    // Auto-scroll: world moves left at per-question speed
    const mult = this.SPEED_MULTIPLIERS[this._questionIdx] || 1.0;
    this._worldX += this.BASE_SCROLL_SPEED * mult;

    // Gravity + velocity (only when airborne)
    if (!this._onGround && this._onBlock === null) {
      this._byteVelY   += this.GRAVITY;
      this._byteBottom += this._byteVelY;
      this._byteX      += this._byteVelX;
      // Hard clamp: Byte never goes past 45% of screen width while airborne
      if (this._byteX > this._worldW * 0.45) this._byteX = this._worldW * 0.45;
    }

    // Ground clamp
    if (this._byteBottom >= this._groundY) {
      if (!this._onGround) {
        this._onGround = true;
        this._onBlock  = null;
        this._inJump   = false;
      }
      this._byteBottom = this._groundY;
      this._byteVelY   = 0;
      this._byteVelX   = 0;
    }

    // Drift back to home X after arc jump — 2px per frame, no snap
    if (this._onGround && this._byteX > this._homeX) {
      this._byteX -= 2;
      if (this._byteX < this._homeX) this._byteX = this._homeX;
    }

    // Update block and obstacle screen positions
    this._updateBlocks();
    this._updateObstacles();

    // Scroll-off penalty: lose a life for each uncrushed ? block that exits left edge
    for (const b of this._blocks) {
      if (b.questionIdx !== this._questionIdx) continue;
      if (b.used || b.activated) continue;
      if (b.screenX + this.BLOCK_W < 0) {
        b.used = true;
        b.el.classList.add('hidden');
        this._loseLife();
        if (!this._running) return;
      }
    }

    this._checkBlockCollision();
    this._checkObstacleCollision();

    // Parallax: stars at 15%, clouds at 30%
    if (this._bgStarsEl)  this._bgStarsEl.style.transform  = `translateX(${-(this._worldX * 0.15).toFixed(1)}px)`;
    if (this._bgCloudsEl) this._bgCloudsEl.style.transform = `translateX(${-(this._worldX * 0.30).toFixed(1)}px)`;

    // Byte animation state (don't override jump/react anims)
    if (!this._animating && !this._inJump) {
      if (this._onGround || this._onBlock) this._setByteState('idle');
    }

    // Position Byte on screen
    this._positionByte();
  },

  _setByteState(s) {
    if (!this._byteEl) return;
    ['byte-idle','byte-walk','byte-jump','byte-star-jump','byte-damage','byte-nod']
      .forEach(c => this._byteEl.classList.remove(c));
    if (s) this._byteEl.classList.add('byte-' + s);
  },

  // ── Public API (called from renderQuestion / handleAnswer / advanceQuestion) ──

  showBlock() { /* blocks are pre-placed; no-op */ },

  walkAndHit(cb) {
    // Set pending callback — fires when player crushes next block
    this._pendingCrushCb = cb;
    this._questionIdx = state.currentQuestionIndex;
  },

  walkForward(cb) {
    // Close overlay, mark all blocks/obstacles in current zone used, resume game, then call cb
    const qi = this._questionIdx;
    this._blocks.forEach(b => {
      if (b.questionIdx === qi) {
        b.used = true;
        b.el.classList.remove('block-activated');
        b.el.classList.add('block-used');
        b.el.classList.add('hidden');
      }
    });
    if (this._obstacles) {
      this._obstacles.forEach(b => {
        if (b.questionIdx === qi) {
          b.used = true;
          b.el.classList.add('hidden');
        }
      });
    }
    this._onBlock     = null;
    this._animating   = false;
    this._overlayOpen = false;
    // Blur focused element so arrow keys control Byte immediately
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    if (cb) cb();
  },

  react(answerType) {
    this._animating = true;
    if (answerType === 'L') { this._setByteState('star-jump'); this._spawnCoin(); }
    else if (answerType === 'H') { this._setByteState('damage'); }
    else { this._setByteState('nod'); }
    setTimeout(() => { this._animating = false; this._setByteState('idle'); }, 500);
  },

  _spawnCoin() {
    const world = this._worldEl;
    if (!world) return;
    const coin = document.createElement('div');
    coin.className = 'fly-coin';
    coin.textContent = '★';
    const screenX = Math.round(this._byteX);
    coin.style.left   = (screenX + this.BYTE_W / 2 - 10) + 'px';
    coin.style.bottom = (this._worldH - this._byteBottom + 10) + 'px';
    world.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
  },

  _showFlash(text) {
    const world = this._worldEl;
    if (!world) return;
    const el = document.createElement('div');
    el.className = 'game-flash';
    el.textContent = text;
    world.appendChild(el);
    setTimeout(() => el.remove(), 900);
  },

  _drawDatacenterCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const GY  = this.DC_H;  // local ground = canvas bottom
    const buildings = [
      { bx: 0,  bw: 17, bh: 38 },
      { bx: 18, bw: 44, bh: 55 },
      { bx: 63, bw: 17, bh: 38 },
    ];
    buildings.forEach(b => {
      const by = GY - b.bh;
      ctx.fillStyle = '#1a2744';
      ctx.fillRect(b.bx, by, b.bw, b.bh);
      ctx.strokeStyle = '#6b7fa3';
      ctx.lineWidth = 1;
      ctx.strokeRect(b.bx + 0.5, by + 0.5, b.bw - 1, b.bh - 1);
      ctx.fillStyle = '#6b7fa3';
      ctx.fillRect(b.bx, by, b.bw, 3);
      ctx.fillStyle = '#3a4f72';
      ctx.fillRect(b.bx, by + 4, b.bw, 2);
      ctx.shadowColor = '#00FFFF';
      ctx.shadowBlur  = 6;
      ctx.fillStyle   = '#00FFFF';
      const cols = 2, rowH = 10;
      const colW = Math.floor((b.bw - 8) / cols);
      const winW = colW - 3, winH = 5;
      for (let row = 0; by + 10 + row * rowH + winH < GY - 4; row++) {
        for (let col = 0; col < cols; col++) {
          ctx.fillRect(b.bx + 4 + col * colW, by + 10 + row * rowH, winW, winH);
        }
      }
      ctx.shadowBlur = 0;
    });
    ctx.fillStyle = 'rgba(0,255,255,0.06)';
    ctx.fillRect(2, GY - 2, this.DC_W - 4, 4);
  },

  _crushDecoy(block) {
    block.activated = true;
    block.used      = true;
    block.el.classList.add('block-activated');
    setTimeout(() => {
      block.el.classList.remove('block-activated');
      block.el.classList.add('hidden');
    }, 400);
    playSound('damage');
    this._showFlash('WRONG!');
    this._setByteState('damage');
    this._animating = true;
    setTimeout(() => { this._animating = false; }, 650);
    this._loseLife();
  },

  _loseLife() {
    state.livesRemaining = Math.max(0, state.livesRemaining - 1);
    updateLivesDisplay();
    if (state.livesRemaining <= 0) {
      this._running = false;
      if (this._raf) cancelAnimationFrame(this._raf);
      setTimeout(() => showGameOver(), 350);
    }
  },

  // ── Demo mode ──────────────────────────────────
  _spawnDemoObjects() {
    if (!this._worldObjEl) return;
    this._worldObjEl.innerHTML = '';
    this._blocks = [];
    this._obstacles = [];

    // Demo DC — appears at world X = worldW + 100 (scrolls in from right)
    const canvas = document.createElement('canvas');
    canvas.width  = this.DC_W;
    canvas.height = this.DC_H;
    canvas.className = 'hidden';
    canvas.style.position = 'absolute';
    canvas.style.imageRendering = 'pixelated';
    this._drawDatacenterCanvas(canvas);
    this._worldObjEl.appendChild(canvas);
    this._demoDCEl = { worldX: this._worldW + 100, screenX: this._worldW + 100,
      el: canvas, used: false, questionIdx: 0, obsTop: this._groundY - this.DC_H, obsH: this.DC_H };
    this._obstacles = [this._demoDCEl];

    // Demo block — placed 2 screen-widths out so it appears just after DC clears
    const blockEl = document.createElement('div');
    blockEl.className = 'q-block-platform hidden';
    blockEl.textContent = '?';
    this._worldObjEl.appendChild(blockEl);
    const blockCSSTop = this._groundY - this.BLOCK_H - 110;
    this._demoBlockEl = { worldX: this._worldW * 2 + 200, screenX: this._worldW * 2 + 200,
      el: blockEl, activated: false, used: false, questionIdx: 0, isDecoy: false,
      answerId: 'A', blockCSSTop };
    this._blocks = [this._demoBlockEl];
  },

  _showDemoBubble(text) {
    let el = document.getElementById('demo-bubble');
    if (!el) return;
    el.innerHTML = text;
    el.classList.remove('hidden');
  },

  _hideDemoBubble() {
    const el = document.getElementById('demo-bubble');
    if (el) el.classList.add('hidden');
  },

  _showDemoReady() {
    const el = document.getElementById('demo-ready');
    if (el) el.classList.remove('hidden');
  },

  _hideDemoReady() {
    const el = document.getElementById('demo-ready');
    if (el) el.classList.add('hidden');
  },

  _openDemoQuestion() {
    this._overlayOpen = true;
    const overlay = document.getElementById('q-overlay');
    if (!overlay) return;

    // Populate with first question from bank (score NOT recorded)
    const q = state.currentQuestions[0];
    if (!q) return;

    document.getElementById('question-text').textContent = q.question;
    const catEl = document.getElementById('question-category');
    if (catEl) catEl.textContent = q.scenario ? '🤖 ' + q.scenario.toUpperCase() : '';

    const answers = ['A', 'B', 'C'].map(letter => ({
      letter, text: q[letter].text, type: q[letter].type,
      color: ANSWER_TYPE_COLOR[q[letter].type]
    }));
    answers.sort(() => Math.random() - 0.5);

    const whyCard = document.getElementById('why-card');
    if (whyCard) whyCard.className = 'why-card hidden';

    const answersEl = document.getElementById('answer-options');
    answersEl.innerHTML = '';
    const dispLetters = ['A','B','C'];
    answers.forEach((answer, ai) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.innerHTML = `<span class="answer-letter">${dispLetters[ai]})</span><span class="answer-text">${answer.text}</span>`;
      btn.addEventListener('click', () => this._demoQuestionContinue());
      answersEl.appendChild(btn);
    });

    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) nextBtn.classList.add('hidden');

    // Add CONTINUE banner inside overlay
    let contBanner = document.getElementById('demo-continue-banner');
    if (!contBanner) {
      contBanner = document.createElement('div');
      contBanner.id = 'demo-continue-banner';
      contBanner.className = 'demo-continue-banner pixel-font hidden';
      contBanner.innerHTML = '↩ ANY ANSWER → CONTINUE DEMO';
      overlay.appendChild(contBanner);
    }
    contBanner.classList.remove('hidden');

    overlay.classList.remove('hidden');
    void overlay.offsetWidth;
    overlay.classList.add('overlay-burst-in');
    const placeholder = document.getElementById('q-panel-placeholder');
    if (placeholder) placeholder.classList.add('hidden');
  },

  _demoQuestionContinue() {
    const overlay = document.getElementById('q-overlay');
    if (overlay) { overlay.classList.add('hidden'); overlay.classList.remove('overlay-burst-in'); }
    const contBanner = document.getElementById('demo-continue-banner');
    if (contBanner) contBanner.classList.add('hidden');
    const placeholder = document.getElementById('q-panel-placeholder');
    if (placeholder) placeholder.classList.remove('hidden');
    this._overlayOpen = false;
    this._demoPhase = 'ready';
    this._showDemoReady();
  },

  _updateDemo() {
    const HALF_SCROLL = this.BASE_SCROLL_SPEED * 0.5;
    const CENTER_X    = Math.round(this._worldW * 0.6);
    const BUBBLE_FRAMES = 90; // 1.5 seconds at 60fps

    // Physics always runs in demo (player can jump)
    this._prevByteBottom = this._byteBottom;
    if (!this._onGround && this._onBlock === null) {
      this._byteVelY   += this.GRAVITY;
      this._byteBottom += this._byteVelY;
      this._byteX      += this._byteVelX;
      if (this._byteX > this._worldW * 0.45) this._byteX = this._worldW * 0.45;
    }
    if (this._byteBottom >= this._groundY) {
      this._onGround   = true;
      this._onBlock    = null;
      this._inJump     = false;
      this._byteBottom = this._groundY;
      this._byteVelY   = 0;
      this._byteVelX   = 0;
    }
    if (this._onGround && this._byteX > this._homeX) {
      this._byteX -= 2;
      if (this._byteX < this._homeX) this._byteX = this._homeX;
    }

    if (this._demoPhase === 'act1_scroll') {
      this._worldX += HALF_SCROLL;
      const dc = this._demoDCEl;
      dc.screenX = dc.worldX - this._worldX;
      dc.el.classList.remove('hidden');
      dc.el.style.left = dc.screenX + 'px';
      dc.el.style.top  = dc.obsTop + 'px';

      // Check obstacle collision — flash only, no life loss
      const byteLeft   = Math.round(this._byteX) + 6;
      const byteRight  = Math.round(this._byteX) + this.BYTE_W - 6;
      const byteBottom = this._byteBottom;
      const byteTop    = byteBottom - this.BYTE_H + 4;
      if (byteBottom > dc.obsTop && byteRight > dc.screenX && byteLeft < dc.screenX + this.DC_W && byteTop < this._groundY) {
        this._showFlash('OUCH!');
        playSound('damage');
        // push player back
        this._byteVelX = -3;
      }

      if (dc.screenX <= CENTER_X) {
        this._demoPhase = 'act1_bubble';
        this._demoBubbleFrames = 0;
        this._showDemoBubble('Jump over these!<br>↑+→ to arc jump');
      }
    } else if (this._demoPhase === 'act1_bubble') {
      this._demoBubbleFrames++;
      const dc = this._demoDCEl;
      dc.screenX = dc.worldX - this._worldX;
      dc.el.style.left = dc.screenX + 'px';
      if (this._demoBubbleFrames >= BUBBLE_FRAMES) {
        this._hideDemoBubble();
        this._demoPhase = 'act1_resume';
      }
    } else if (this._demoPhase === 'act1_resume') {
      this._worldX += HALF_SCROLL;
      const dc = this._demoDCEl;
      dc.screenX = dc.worldX - this._worldX;
      dc.el.style.left = dc.screenX + 'px';
      if (dc.screenX < -this.DC_W) {
        dc.el.classList.add('hidden');
        dc.used = true;
        this._demoPhase = 'act2_scroll';
      }
    } else if (this._demoPhase === 'act2_scroll') {
      this._worldX += HALF_SCROLL;
      const blk = this._demoBlockEl;
      blk.screenX = blk.worldX - this._worldX;
      blk.el.classList.remove('hidden');
      blk.el.style.left = blk.screenX + 'px';
      blk.el.style.top  = blk.blockCSSTop + 'px';

      if (blk.screenX <= CENTER_X) {
        this._demoPhase = 'act2_bubble';
        this._demoBubbleFrames = 0;
        this._showDemoBubble('Hit these to open question!<br>↑ from below / ↑+→ land on top');
      }

      // Check block collision while scrolling
      this._checkDemoBlockCollision();
    } else if (this._demoPhase === 'act2_bubble') {
      this._demoBubbleFrames++;
      const blk = this._demoBlockEl;
      blk.screenX = blk.worldX - this._worldX;
      blk.el.style.left = blk.screenX + 'px';
      if (this._demoBubbleFrames >= BUBBLE_FRAMES) {
        this._hideDemoBubble();
        this._demoPhase = 'act2_resume';
      }
      this._checkDemoBlockCollision();
    } else if (this._demoPhase === 'act2_resume') {
      this._worldX += HALF_SCROLL;
      const blk = this._demoBlockEl;
      blk.screenX = blk.worldX - this._worldX;
      blk.el.style.left = blk.screenX + 'px';
      this._checkDemoBlockCollision();
      // If block scrolled off without being hit — go to ready
      if (blk.screenX < -this.BLOCK_W && !blk.activated) {
        blk.el.classList.add('hidden');
        blk.used = true;
        this._demoPhase = 'ready';
        this._showDemoReady();
      }
    } else if (this._demoPhase === 'act2_question') {
      // Waiting for player to dismiss demo question — handled by _demoQuestionContinue
    } else if (this._demoPhase === 'ready') {
      // Waiting for ↑ press — handled in _keyHandler
    }

    // Parallax
    if (this._bgStarsEl)  this._bgStarsEl.style.transform  = `translateX(${-(this._worldX * 0.15).toFixed(1)}px)`;
    if (this._bgCloudsEl) this._bgCloudsEl.style.transform = `translateX(${-(this._worldX * 0.30).toFixed(1)}px)`;
    if (!this._animating && !this._inJump) {
      if (this._onGround || this._onBlock) this._setByteState('idle');
    }
    this._positionByte();
  },

  _checkDemoBlockCollision() {
    const blk = this._demoBlockEl;
    if (!blk || blk.activated || blk.used) return;
    const byteLeft    = Math.round(this._byteX);
    const byteRight   = byteLeft + this.BYTE_W;
    const byteTop     = this._byteBottom - this.BYTE_H;
    const blockBottom = blk.blockCSSTop + this.BLOCK_H;
    const overlapX    = byteRight > blk.screenX + 8 && byteLeft < blk.screenX + this.BLOCK_W - 8;
    if (!overlapX) return;
    if (this._byteVelY < 0 && byteTop <= blockBottom && byteTop >= blk.blockCSSTop) {
      this._byteVelY = 1.0;
      blk.activated = true;
      blk.el.classList.add('block-activated');
      blk.el.textContent = '';
      this._hideDemoBubble();
      this._demoPhase = 'act2_question';
      this._overlayOpen = true;
      playSound('coin');
      setTimeout(() => this._openDemoQuestion(), 150);
      return;
    }
    if (this._byteVelY >= 0 && this._byteBottom >= blk.blockCSSTop &&
        this._byteBottom <= blk.blockCSSTop + this.BLOCK_H + 8 && byteTop < blk.blockCSSTop) {
      this._byteBottom = blk.blockCSSTop;
      this._byteVelY   = 0;
      this._byteVelX   = 0;
      this._onBlock    = blk;
      this._inJump     = false;
      blk.activated    = true;
      blk.el.classList.add('block-activated');
      blk.el.textContent = '';
      this._hideDemoBubble();
      this._demoPhase = 'act2_question';
      this._overlayOpen = true;
      playSound('coin');
      setTimeout(() => this._openDemoQuestion(), 150);
    }
  },

  stop() {
    this._running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._keyHandler)   document.removeEventListener('keydown', this._keyHandler);
    if (this._keyUpHandler) document.removeEventListener('keyup',   this._keyUpHandler);
  }
};

function startEthicsQuestions() {
  state.ethicsAnswers        = [];
  state.score                = 0;
  state.staminaLevel         = 3;
  state.currentQuestions     = selectQuestionsFromBank(state.userAge, state.userExpertise);
  state.currentQuestionIndex = 0;
  state.livesRemaining       = 3;
  state.isFirstGameOver      = false;
  state.savedSessionData     = null;
  state.resumeFromQuestion   = 0;

  updateStaminaBars(3);
  updateLivesDisplay();
  game.stop();
  game.init();
  renderQuestion();
}

function startDemo() {
  if (game._demoDone) {
    // Already played the demo — go straight to game
    startEthicsQuestions();
    return;
  }
  // Pre-select questions so demo question can come from real bank
  state.currentQuestions = selectQuestionsFromBank(state.userAge, state.userExpertise);
  state.currentQuestionIndex = 0;
  state.ethicsAnswers = [];
  state.score = 0;
  state.staminaLevel = 3;
  state.livesRemaining = 3;
  state.isFirstGameOver = false;
  state.savedSessionData = null;
  state.resumeFromQuestion = 0;

  updateStaminaBars(3);
  updateLivesDisplay();
  game.stop();
  game._demoMode = true;
  game._demoPhase = 'act1_scroll';
  game._demoBubbleFrames = 0;
  game.init();
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
    `Q ${idx + 1} / ${TOTAL_QUESTIONS}`;

  // Category badge (scenario)
  const catEl = document.getElementById('question-category');
  if (catEl) catEl.textContent = q.scenario ? '🤖 ' + q.scenario.toUpperCase() : '';

  document.getElementById('question-text').textContent = q.question;

  const answers = ['A', 'B', 'C'].map(letter => ({
    letter,
    text:       q[letter].text,
    score:      q[letter].score,
    envWeight:  q[letter].envWeight,
    moralScore: q[letter].moralScore,
    type:       q[letter].type,
    color:      ANSWER_TYPE_COLOR[q[letter].type]
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
    // Arrow key navigation between answer buttons
    btn.addEventListener('keydown', function (e) {
      const all = [...document.querySelectorAll('#answer-options .answer-btn:not(:disabled)')];
      const idx = all.indexOf(this);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = all[idx + 1];
        if (next) next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = all[idx - 1];
        if (prev) prev.focus();
      }
    });
    answersEl.appendChild(btn);
  });

  document.getElementById('btn-next-question').classList.add('hidden');
  renderProgressDots();

  // ── Reset overlay for new question ──
  const overlay     = document.getElementById('q-overlay');
  const placeholder = document.getElementById('q-panel-placeholder');

  if (overlay) {
    overlay.classList.add('hidden');
    overlay.classList.remove('overlay-burst-in');
  }
  if (placeholder) placeholder.classList.remove('hidden');
  if (whyCard) whyCard.className = 'why-card hidden';

  game.showBlock();
  game.walkAndHit(() => {
    if (overlay) {
      overlay.classList.remove('hidden');
      void overlay.offsetWidth;
      overlay.classList.add('overlay-burst-in');
    }
  });
}

function handleAnswer(answer, clickedBtn) {
  // Sound feedback
  if (answer.type === 'L')      playSound('goodChoice');
  else if (answer.type === 'H') playSound('damage');
  else                          playSound('click');

  // Accumulate score using calcQuestionScore
  const qScore = GameLogic.calcQuestionScore(answer.envWeight, answer.moralScore);
  state.score += qScore;

  // Update stamina bars
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
    score:    qScore
  });

  // Disable all buttons, highlight selected
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
  clickedBtn.classList.add(`selected-${answer.color}`);

  // Byte reacts to answer type
  game.react(answer.type);

  // Reveal right panel: hide placeholder, show why card
  const placeholder = document.getElementById('q-panel-placeholder');
  if (placeholder) placeholder.classList.add('hidden');

  // Show WHY card with generic text per type
  const whyCard = document.getElementById('why-card');
  document.getElementById('why-text').textContent = WHY_TEXT[answer.type] || WHY_TEXT.B;
  whyCard.className = `why-card why-border-${answer.color}`;

  const nextBtn = document.getElementById('btn-next-question');
  nextBtn.classList.remove('hidden');
  // Auto-focus CONTINUE so player can press ENTER immediately
  setTimeout(() => nextBtn.focus(), 50);
}

// ── Next button ──────────────────────────────
document.getElementById('btn-next-question').addEventListener('click', () => {
  const nextBtn = document.getElementById('btn-next-question');
  if (nextBtn.disabled) return;
  nextBtn.disabled = true;
  playSound('coin');
  advanceQuestion();
  setTimeout(() => { nextBtn.disabled = false; }, 200);
});

function advanceQuestion() {
  document.getElementById('btn-next-question').classList.add('hidden');

  state.currentQuestionIndex++;
  const afterFade = state.currentQuestionIndex >= TOTAL_QUESTIONS
    ? () => { playSound('levelComplete'); game.walkForward(() => showPersonaScreen()); }
    : () => { game.walkForward(() => renderQuestion()); };

  const overlay = document.getElementById('q-overlay');
  if (overlay) {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.classList.add('hidden');
      overlay.classList.remove('fade-out', 'overlay-burst-in');
      afterFade();
    }, 150);
  } else {
    afterFade();
  }
}

// ── SCREEN 2: PERSONA REVEAL ─────────────────

function showPersonaScreen() {
  game.stop();
  const p = GameLogic.getPersona(state.score);
  // Build persona object compatible with print.js (expects .title, .byteSvg)
  const visualKey = state.score <= 13 ? 'the_turbo_tapper' :
                    state.score <= 19 ? 'the_sleepwalker'  :
                    state.score <= 29 ? 'the_balanced_byte' :
                                        'the_zen_prompter';
  const visual = (typeof PERSONALITY_TYPES !== 'undefined') ? PERSONALITY_TYPES[visualKey] : null;
  state.persona = { title: p.name, subtitle: p.desc, description: p.desc, byteSvg: visual ? visual.byteSvg : '' };

  document.getElementById('persona-byte').innerHTML          = state.persona.byteSvg;
  document.getElementById('persona-name').textContent        = p.name;
  document.getElementById('persona-tagline').textContent     = p.desc;
  document.getElementById('persona-description').textContent = '';
  document.getElementById('persona-score-display').textContent = 'Score: ' + state.score + '/35';

  // Persona sound
  if      (state.score <= 7)   playSound('turbo');
  else if (state.score <= 19)  playSound('casual');
  else if (state.score <= 29)  playSound('mindful');
  else                         playSound('green');

  showScreen('persona');
}

document.getElementById('btn-go-green').addEventListener('click', () => {
  state.sessionId = generateSessionId();
  populateTicketCard(state);
  _saveSessionToSupabase(state);
  showScreen('print');
  Byte.setState('print');
  playSound('print');
});

// ── Lives display ────────────────────────────
function updateLivesDisplay() {
  const hearts = document.querySelectorAll('#screen-ethics .game-heart');
  hearts.forEach((h, i) => {
    h.classList.toggle('heart-lost', i >= state.livesRemaining);
  });
}

// ── Game Over overlay ────────────────────────
function showGameOver() {
  state.resumeFromQuestion = state.currentQuestionIndex;
  state.savedSessionData = {
    ethicsAnswers: [...state.ethicsAnswers],
    score:         state.score,
    staminaLevel:  state.staminaLevel
  };

  const overlay = document.getElementById('gameover-overlay');
  if (!overlay) return;

  const qEl = document.getElementById('gameover-question');
  if (qEl) qEl.textContent = state.currentQuestionIndex + 1;

  const playAgainBtn   = document.getElementById('btn-gameover-playagain');
  const retryCaption   = document.getElementById('gameover-retry-caption');
  if (state.isFirstGameOver) {
    if (playAgainBtn)  playAgainBtn.classList.add('hidden');
    if (retryCaption)  retryCaption.classList.remove('hidden');
  } else {
    if (playAgainBtn)  playAgainBtn.classList.remove('hidden');
    if (retryCaption)  retryCaption.classList.add('hidden');
  }

  overlay.classList.remove('hidden');
  if (playAgainBtn && !state.isFirstGameOver) playAgainBtn.focus();
}

document.getElementById('btn-gameover-playagain').addEventListener('click', () => {
  document.getElementById('gameover-overlay').classList.add('hidden');

  state.isFirstGameOver      = true;
  state.livesRemaining       = 3;
  state.currentQuestionIndex = state.resumeFromQuestion;

  if (state.savedSessionData) {
    state.ethicsAnswers = [...state.savedSessionData.ethicsAnswers];
    state.score         = state.savedSessionData.score;
    state.staminaLevel  = state.savedSessionData.staminaLevel;
  }

  updateStaminaBars(state.staminaLevel);
  updateLivesDisplay();

  game.stop();
  game.init();
  renderQuestion();
});

document.getElementById('btn-gameover-backtostart').addEventListener('click', () => {
  document.getElementById('gameover-overlay').classList.add('hidden');
  game.stop();
  resetGameState();
  state.prompt        = '';
  state.taskType      = 'text-short';
  state.metrics       = null;
  state.sessionId     = generateSessionId();
  state.userName      = '';
  state.userAge       = '';
  state.userExpertise = '';
  state.userGender    = '';
  document.getElementById('user-name').value      = '';
  document.getElementById('user-age').value       = '';
  document.getElementById('user-expertise').value = '';
  document.getElementById('user-gender').value    = '';
  updateBytePosition(0);
  showScreen('idle');
  Byte.setState('idle');
});

function _saveSessionToSupabase(state) {
  const ans = (i) => (state.ethicsAnswers && state.ethicsAnswers[i]) || {};
  const payload = {
    session_id:       state.sessionId,
    player_name:      state.userName || 'Anonymous',
    age_group:        state.userAge    || null,
    expertise:        state.userExpertise || null,
    gender:           state.userGender   || null,
    language:         (typeof currentLang !== 'undefined') ? currentLang : 'en',
    score:            state.score        ?? null,
    persona:          state.persona ? state.persona.title : null,
    stamina_level:    state.staminaLevel ?? null,
    answer_1_category: ans(0).category ?? null,
    answer_1_type:     ans(0).type     ?? null,
    answer_1_score:    ans(0).score    ?? null,
    answer_2_category: ans(1).category ?? null,
    answer_2_type:     ans(1).type     ?? null,
    answer_2_score:    ans(1).score    ?? null,
    answer_3_category: ans(2).category ?? null,
    answer_3_type:     ans(2).type     ?? null,
    answer_3_score:    ans(2).score    ?? null,
    answer_4_category: ans(3).category ?? null,
    answer_4_type:     ans(3).type     ?? null,
    answer_4_score:    ans(3).score    ?? null,
    answer_5_category: ans(4).category ?? null,
    answer_5_type:     ans(4).type     ?? null,
    answer_5_score:    ans(4).score    ?? null,
  };
  fetch('https://tpacbxkobtekehqrgodd.supabase.co/rest/v1/aircade_sessions', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        'sb_publishable_qSeNNoQsnXbfNFWc-a8Bxg_0Y2LgLYx',
      'Authorization': 'Bearer sb_publishable_qSeNNoQsnXbfNFWc-a8Bxg_0Y2LgLYx',
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify(payload),
  })
    .then(res => {
      if (!res.ok) return res.text().then(t => { throw new Error(`${res.status}: ${t}`); });
      console.log('SESSION SAVED', state.sessionId);
    })
    .catch(err => console.error('Supabase save failed:', err));
}

// ── SCREEN 4: TICKET DOWNLOAD ────────────────

document.getElementById('btn-download').addEventListener('click', () => {
  downloadCard(state.sessionId);
  showThankYouAndReset();
});

function showThankYouAndReset() {
  const overlay = document.getElementById('thankyou-overlay');
  const msgEl   = document.getElementById('thankyou-msg');
  const cntEl   = document.getElementById('thankyou-countdown');
  if (!overlay || !msgEl || !cntEl) return;

  msgEl.textContent = t('ui.thankYouMsg');
  overlay.classList.remove('hidden');

  let count = 3;
  cntEl.textContent = t('ui.resettingIn').replace('{n}', count);

  const interval = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(interval);
      overlay.classList.add('hidden');
      // Full state reset
      resetGameState();
      state.prompt        = '';
      state.taskType      = 'text-short';
      state.metrics       = null;
      state.sessionId     = generateSessionId();
      state.userName      = '';
      state.userAge       = '';
      state.userExpertise = '';
      state.userGender    = '';
      document.getElementById('user-name').value      = '';
      document.getElementById('user-age').value       = '';
      document.getElementById('user-expertise').value = '';
      document.getElementById('user-gender').value    = '';
      updateBytePosition(0);
      showScreen('langselect');
      Byte.setState('idle');
    } else {
      cntEl.textContent = t('ui.resettingIn').replace('{n}', count);
    }
  }, 1000);
}

// ── Keyboard Navigation ──────────────────────
document.addEventListener('keydown', e => {
  // Escape closes instructions overlay
  if (e.key === 'Escape' && !overlayInstructions.classList.contains('hidden')) {
    overlayInstructions.classList.add('hidden');
    document.getElementById('btn-start').focus();
    return;
  }

  // Focus trap inside the question overlay
  const qOverlay = document.getElementById('q-overlay');
  if (qOverlay && !qOverlay.classList.contains('hidden') && e.key === 'Tab') {
    const focusable = [...qOverlay.querySelectorAll(
      'button:not(:disabled), [tabindex]:not([tabindex="-1"])'
    )].filter(el => !el.classList.contains('hidden') && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }
});
