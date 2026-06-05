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
  persona: null
};

// ── DOM References ───────────────────────────
const screens = {
  langselect: document.getElementById('screen-langselect'),
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
    idle:    'btn-start',
    persona: 'btn-go-green',
    greener: 'btn-print',
    print:   'btn-download',
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

  startEthicsQuestions();
  showScreen('ethics');
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
  _prevByteBottom: 0,
  _onGround:       true,
  _onBlock:        null,

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

  // Tuning constants
  GRAVITY:    0.65,
  JUMP_FORCE: -16,    // negative = upward in CSS coords
  MOVE_SPEED: 3.8,
  BYTE_W:     88,
  BYTE_H:     66,
  GROUND_H:   40,
  BLOCK_W:    52,
  BLOCK_H:    52,
  BLOCK_ELEV: 58,     // block bottom this many px above ground surface

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
    this._byteBottom = this._groundY;
    this._byteVelY   = 0;
    this._onGround   = true;
    this._onBlock    = null;
    this._worldX     = 0;
    this._questionIdx = 0;
    this._inJump     = false;
    this._animating  = false;
    this._overlayOpen = false;
    this._pendingCrushCb = null;
    this._keys = {};

    this._spawnStars();
    this._spawnClouds();
    this._spawnBlocks();
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
    this._blocks = [];
    // 5 blocks spaced ~420px apart in world space; first one ~380px from start
    [400, 900, 1400, 1900, 2400].forEach((worldX, i) => {
      const el = document.createElement('div');
      el.className = 'q-block-platform hidden';
      el.textContent = '?';
      this._worldObjEl.appendChild(el);
      this._blocks.push({ worldX, el, activated: false, used: false, screenX: worldX });
    });
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
      if ((e.key === 'ArrowUp' || e.key === ' ') && (this._onGround || this._onBlock)) {
        this._startJump();
      }
    };
    this._keyUpHandler = (e) => { this._keys[e.key] = false; };

    document.addEventListener('keydown', this._keyHandler);
    document.addEventListener('keyup',   this._keyUpHandler);
  },

  // Keyboard-only cabinet: touch and mouse handlers removed

  _startJump() {
    this._byteVelY = this.JUMP_FORCE;
    this._onGround = false;
    this._onBlock  = null;
    this._inJump   = true;
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
        }, 460);
      }
    }, 380);
  },

  _positionByte() {
    if (!this._byteEl) return;
    const screenX = Math.round(this._worldW * 0.20);
    this._byteEl.style.left = screenX + 'px';
    this._byteEl.style.top  = (this._byteBottom - this.BYTE_H) + 'px';
  },

  _updateBlocks() {
    const blockCSSTop = this._groundY - this.BLOCK_ELEV - this.BLOCK_H;
    this._blocks.forEach((b, i) => {
      b.screenX = b.worldX - this._worldX;
      // Show only current and next block (progressive reveal)
      const inProgressWindow = (i === this._questionIdx || i === this._questionIdx + 1);
      const onScreen = b.screenX > -this.BLOCK_W - 120 && b.screenX < this._worldW + 240;
      if (!inProgressWindow || !onScreen) {
        b.el.classList.add('hidden');
      } else {
        b.el.classList.remove('hidden');
        b.el.style.left = b.screenX + 'px';
        b.el.style.top  = blockCSSTop + 'px';
      }
    });
  },

  _checkBlockCollision() {
    const byteLeft  = Math.round(this._worldW * 0.20);
    const byteRight = byteLeft + this.BYTE_W;
    const blockCSSTop = this._groundY - this.BLOCK_ELEV - this.BLOCK_H;

    let foundBlock = null;
    for (const b of this._blocks) {
      if (b.used || b.activated) continue;
      const overlapX = byteRight > b.screenX + 8 && byteLeft < b.screenX + this.BLOCK_W - 8;
      if (overlapX) {
        // Landing detection — exact condition from game-test.html:
        // velY >= 0 (falling or peak), byteBottom crossed block top from above
        const byteTop = this._byteBottom - this.BYTE_H;
        if (this._byteVelY >= 0 &&
            this._byteBottom >= blockCSSTop &&
            this._byteBottom <= blockCSSTop + this.BLOCK_H + 8 &&
            byteTop < blockCSSTop) {
          this._byteBottom = blockCSSTop;
          this._byteVelY   = 0;
          this._onGround   = false;
          this._onBlock    = b;
          this._inJump     = false;
          foundBlock = b;
          if (!b.activated && b === this._blocks[this._questionIdx]) {
            console.log('BLOCK HIT');
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

  _loop() {
    if (!this._running) return;
    this._raf = requestAnimationFrame(() => this._loop());
    this._update();
  },

  _update() {
    if (this._overlayOpen) return;

    this._prevByteBottom = this._byteBottom;

    // Horizontal movement → world scroll
    const movingRight = !!this._keys.ArrowRight;
    const movingLeft  = !!this._keys.ArrowLeft;
    if (movingRight) this._worldX += this.MOVE_SPEED;
    else if (movingLeft) this._worldX = Math.max(0, this._worldX - this.MOVE_SPEED);

    // Gravity + velocity (only when airborne)
    if (!this._onGround && this._onBlock === null) {
      this._byteVelY    += this.GRAVITY;
      this._byteBottom  += this._byteVelY;
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
    }

    // Update block screen positions and collision
    this._updateBlocks();
    this._checkBlockCollision();

    // Parallax: stars at 15%, clouds at 30%
    if (this._bgStarsEl)  this._bgStarsEl.style.transform  = `translateX(${-(this._worldX * 0.15).toFixed(1)}px)`;
    if (this._bgCloudsEl) this._bgCloudsEl.style.transform = `translateX(${-(this._worldX * 0.30).toFixed(1)}px)`;

    // Byte animation state (don't override jump/react anims)
    if (!this._animating && !this._inJump) {
      const moving = movingRight || movingLeft;
      if (moving) this._setByteState('walk');
      else if (this._onGround || this._onBlock) this._setByteState('idle');
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
    // Close overlay, mark block used, resume game, then call cb
    const block = this._blocks[this._questionIdx];
    if (block) {
      block.used = true;
      block.el.classList.remove('block-activated');
      block.el.classList.add('block-used');
    }
    this._onBlock     = null;
    this._animating   = false;
    this._overlayOpen = false;
    // Blur focused element so arrow keys control Byte immediately
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    setTimeout(() => { if (cb) cb(); }, 120);
  },

  react(answerType) {
    this._animating = true;
    if (answerType === 'L') { this._setByteState('star-jump'); this._spawnCoin(); }
    else if (answerType === 'H') { this._setByteState('damage'); }
    else { this._setByteState('nod'); }
    setTimeout(() => { this._animating = false; this._setByteState('idle'); }, 950);
  },

  _spawnCoin() {
    const world = this._worldEl;
    if (!world) return;
    const coin = document.createElement('div');
    coin.className = 'fly-coin';
    coin.textContent = '★';
    const screenX = Math.round(this._worldW * 0.20);
    coin.style.left   = (screenX + this.BYTE_W / 2 - 10) + 'px';
    coin.style.bottom = (this._worldH - this._byteBottom + 10) + 'px';
    world.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
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

  updateStaminaBars(3);
  game.stop(); // cancel any previous loop before re-init
  game.init(); // defers via setTimeout if screen not yet visible
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
    `Q ${idx + 1} / ${TOTAL_QUESTIONS}`;

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

  // Accumulate score
  state.score += answer.score;

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
    score:    answer.score
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
  setTimeout(() => { nextBtn.disabled = false; }, 400);
});

function advanceQuestion() {
  document.getElementById('btn-next-question').classList.add('hidden');

  const overlay = document.getElementById('q-overlay');
  if (overlay) overlay.classList.add('hidden');

  state.currentQuestionIndex++;

  if (state.currentQuestionIndex >= TOTAL_QUESTIONS) {
    playSound('levelComplete');
    game.walkForward(() => showPersonaScreen());
  } else {
    game.walkForward(() => renderQuestion());
  }
}

// ── SCREEN 2: PERSONA REVEAL ─────────────────

function showPersonaScreen() {
  game.stop();
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

document.getElementById('btn-print').addEventListener('click', () => {
  state.sessionId = generateSessionId();
  populateTicketCard(state);
  _saveSessionToSupabase(state);
  showScreen('print');
  Byte.setState('print');
  playSound('print');
});

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
