/* ═══════════════════════════════════════════
   A(I)RCADE — Byte the Cloud Mascot
   Handles speech bubbles and state changes
═══════════════════════════════════════════ */

const Byte = {
  speechEl: document.getElementById('byte-speech'),

  speeches: {
    idle:       ['Hi! I\'m Byte! ⚡', 'Ready to play? 🎮', 'Every prompt has a footprint!'],
    generating: ['On it! ⚡', 'Almost there... ⚡', 'Thinking hard! 🧠', 'Using energy right now!'],
    impact:     ['That\'s what I used! 🌍', 'Interesting, right? 🤔', 'Knowledge is power! 💡'],
    greener:    ['Smart choices add up! 🌱', 'You\'ve got this! ✨', 'Is there a smarter way? 🔍'],
    print:      ['Great job today! 👋', 'See you next time! 🌱', 'Share your card! 📄']
  },

  _speechInterval: null,
  _currentState: 'idle',

  setState(state) {
    if (this._currentState === state) return;
    this._currentState = state;

    // Rotate speech bubbles
    clearInterval(this._speechInterval);
    this._speakRandom(state);
    this._speechInterval = setInterval(() => {
      this._speakRandom(state);
    }, 4000);
  },

  _speakRandom(state) {
    if (!this.speechEl) return;
    const translated = (typeof t === 'function') ? t('byte.' + state) : null;
    const lines = (Array.isArray(translated) && translated.length)
      ? translated
      : (this.speeches[state] || this.speeches.idle);
    const line = lines[Math.floor(Math.random() * lines.length)];
    this.speechEl.textContent = line;
    // Small pop animation
    this.speechEl.style.transform = 'scale(1.08)';
    setTimeout(() => { this.speechEl.style.transform = ''; }, 200);
  },

  say(text) {
    if (!this.speechEl) return;
    this.speechEl.textContent = text;
  }
};
