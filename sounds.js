/* ═══════════════════════════════════════════
   A(I)RCADE — Sound Effects + Background Music (Web Audio API)
   Extracted from src/hooks/useSounds.js for vanilla JS use
═══════════════════════════════════════════ */

(function () {

  // ── Shared audio context ───────────────────────────────────────
  function getAudioContext() {
    if (!window._arcadeAudioCtx) {
      window._arcadeAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return window._arcadeAudioCtx;
  }

  function resume() {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // ── Helpers used by click sound effects ───────────────────────
  function playTone(ctx, freq, startTime, duration, type, gainVal) {
    type    = type    || 'square';
    gainVal = gainVal || 0.3;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.01);
  }

  function playNoise(ctx, startTime, duration, gainVal) {
    gainVal = gainVal || 0.15;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data   = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(startTime);
    source.stop(startTime + duration + 0.01);
  }

  // ── Click sound effects (unchanged) ───────────────────────────
  function soundClick() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    playTone(ctx, 440, t,        0.05, 'square',   0.2);
    playTone(ctx, 880, t + 0.03, 0.04, 'square',   0.1);
  }

  function soundCoin() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    playTone(ctx, 660,  t,       0.08, 'square', 0.3);
    playTone(ctx, 880,  t+0.09,  0.10, 'square', 0.3);
    playTone(ctx, 1320, t+0.20,  0.12, 'square', 0.25);
  }

  function soundLevelComplete() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    [523, 659, 784].forEach(function (freq, i) {
      playTone(ctx, freq, t + i * 0.15, 0.2, 'square', 0.25);
    });
  }

  function soundPrint() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    for (let i = 0; i < 8; i++) {
      playNoise(ctx, t + i * 0.07, 0.06, 0.08);
      playTone(ctx, 80 + Math.random() * 40, t + i * 0.07, 0.06, 'sawtooth', 0.05);
    }
  }

  function soundDamage() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    playTone(ctx, 220, t,       0.12, 'sawtooth', 0.35);
    playTone(ctx, 180, t+0.10,  0.10, 'sawtooth', 0.30);
    playTone(ctx, 140, t+0.18,  0.15, 'sawtooth', 0.25);
    playNoise(ctx, t, 0.25, 0.1);
  }

  function soundGoodChoice() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    playTone(ctx, 523, t,       0.1,  'square',   0.22);
    playTone(ctx, 784, t+0.12,  0.15, 'triangle', 0.22);
  }

  function soundPersonaTurbo() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    [880, 660, 440, 550, 770, 990, 330, 220].forEach(function (freq, i) {
      playTone(ctx, freq, t + i * 0.065, 0.09, 'sawtooth', 0.22);
    });
    playNoise(ctx, t + 0.08, 0.4, 0.07);
    playTone(ctx, 110, t + 0.55, 0.25, 'sawtooth', 0.2);
  }

  function soundPersonaCasual() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    [330, 392, 440, 392, 330, 440, 330].forEach(function (freq, i) {
      playTone(ctx, freq, t + i * 0.18, 0.22, 'square', 0.22);
    });
  }

  function soundPersonaMindful() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    [261, 294, 330, 349, 392, 440].forEach(function (freq, i) {
      playTone(ctx, freq, t + i * 0.22, 0.35, 'triangle', 0.2);
    });
  }

  function soundPersonaGreen() {
    const ctx = resume(); if (!ctx) return;
    const t = ctx.currentTime;
    const fanfare   = [523, 523, 523, 415, 466, 523, 466, 523];
    const durations = [0.1, 0.1, 0.1, 0.08, 0.08, 0.25, 0.1, 0.45];
    let cursor = t;
    fanfare.forEach(function (freq, i) {
      playTone(ctx, freq,     cursor, durations[i] + 0.05, 'square',   0.28);
      playTone(ctx, freq * 2, cursor, durations[i] * 0.6,  'square',   0.1);
      cursor += durations[i] + 0.02;
    });
    [523, 659, 784].forEach(function (f) {
      playTone(ctx, f, cursor, 0.6, 'triangle', 0.18);
    });
  }

  window.playSound = function (name) {
    try {
      switch (name) {
        case 'click':        return soundClick();
        case 'coin':         return soundCoin();
        case 'levelComplete':return soundLevelComplete();
        case 'print':        return soundPrint();
        case 'damage':       return soundDamage();
        case 'goodChoice':   return soundGoodChoice();
        case 'turbo':        return soundPersonaTurbo();
        case 'casual':       return soundPersonaCasual();
        case 'mindful':      return soundPersonaMindful();
        case 'green':        return soundPersonaGreen();
        default:             return soundClick();
      }
    } catch (e) { /* silently fail if audio context is blocked */ }
  };

  // ═══════════════════════════════════════════════════════════════
  // BACKGROUND MUSIC
  // Chiptune loop — A minor, 128 BPM, 8 bars (64 eighth-note steps ≈ 15 s)
  // Layers: square melody · sawtooth bass · triangle chord pads · sine kick
  // All routed through a shared master gain (soft, fades in over 2 s)
  // Triggered by screen-ethics becoming active; stops when gameplay ends
  // so persona reveal sounds play cleanly without BGM competition.
  // ═══════════════════════════════════════════════════════════════

  var BGM = {
    playing:    false,
    ctx:        null,
    masterGain: null,
    nextTime:   0,
    step:       0,
    timer:      null
  };

  // 128 BPM → eighth note ≈ 0.234 s
  var S = 60 / 128 / 2;

  // ── Musical data ───────────────────────────────────────────────

  // Melody: one frequency per eighth-note step (0 = rest), 64 steps = 8 bars
  // Key: A minor. Loop: last note (E5=659) leads seamlessly into bar 1 (E5).
  var MEL = [
    // ── Phrase 1 (bars 1–4) — question & answer ─────────────────
    659,  0,  659, 587,  523,  0,  440,  0,   // bar 1: descending E→A question motif
    659, 784,  659,  0,  587, 523,  440, 494,  // bar 2: G5 peak, resolve to B4
    523,  0,  523, 659,  784,  0,  659,  0,   // bar 3: rising C→G arpeggio phrase
    587, 523,  440,  0,  523, 587,  659,  0,  // bar 4: step down, climb back to E5

    // ── Phrase 2 (bars 5–8) — variation & bridge ────────────────
    659, 784,  659, 587,  523,  0,  440, 523,  // bar 5: bar 1 with G5 punch + C5 tail
    440, 494,  523, 587,  659,  0,  587, 523,  // bar 6: ascending answer phrase
    784,  0,  784, 698,  659, 698,  659, 587,  // bar 7: bridge — F5 tension
    523, 587,  659,  0,  784, 659,  587, 659   // bar 8: resolution → E5 loops to bar 1
  ];

  // Bass: one frequency per quarter-note (fires every 2 steps), 32 entries = 8 bars
  var BASS = [
    // bars 1–4
    110, 110, 131, 131,  // bar 1: A2 A2 C3 C3
    165, 165,  98,  98,  // bar 2: E3 E3 G2 G2
    110, 110, 147, 147,  // bar 3: A2 A2 D3 D3
    165, 165, 110, 110,  // bar 4: E3 E3 A2 A2
    // bars 5–8
    110, 131, 165, 110,  // bar 5: walk up Am
    147, 165, 110, 131,  // bar 6: Dm → Am
    196, 165, 147, 196,  // bar 7: G3 drive for bridge
    131, 147, 165, 110   // bar 8: C→D→E→A resolution
  ];

  // Chord pads: [trigger_step, freqs[]] — triangle wave, sustained ~14 steps
  var PADS = [
    [ 0, [110, 165, 220]],  // Am  (A2 E3 A3) — dark, space-like root
    [16, [ 98, 147, 196]],  // G   (G2 D3 G3) — tension lift mid-loop
    [32, [110, 165, 220]],  // Am  (A2 E3 A3) — return to root
    [48, [165, 247, 330]]   // Em  (E3 B3 E4) — bridge tension
  ];

  // Kick on every quarter-note downbeat across 8 bars
  var KICKS = [0, 8, 16, 24, 32, 40, 48, 56];

  // ── BGM note schedulers ────────────────────────────────────────

  function bgNote(freq, t, dur, type, g) {
    if (!freq || !BGM.masterGain) return;
    var ctx  = BGM.ctx;
    var osc  = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(g, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain);
    gain.connect(BGM.masterGain);
    osc.start(t);
    osc.stop(t + dur + 0.01);
  }

  function bgKick(t) {
    if (!BGM.masterGain) return;
    var ctx  = BGM.ctx;
    var osc  = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.06);
    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.connect(gain);
    gain.connect(BGM.masterGain);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  // ── Scheduler loop (Web Audio lookahead pattern) ───────────────

  function bgScheduler() {
    if (!BGM.playing) return;
    var ctx = BGM.ctx;

    while (BGM.nextTime < ctx.currentTime + 0.15) {
      var i = BGM.step;
      var t = BGM.nextTime;

      // Melody (square, staccato 80 % of step)
      if (MEL[i] > 0) bgNote(MEL[i], t, S * 0.80, 'square',   0.32);

      // Bass (sawtooth, fires on even steps, legato 70 % of 2 steps)
      if (i % 2 === 0) {
        var b = BASS[i >> 1];
        if (b > 0) bgNote(b, t, S * 1.4, 'sawtooth', 0.22);
      }

      // Chord pads (triangle, long sustain for space atmosphere)
      PADS.forEach(function (pad) {
        if (i === pad[0]) {
          pad[1].forEach(function (f) {
            bgNote(f, t, S * 14, 'triangle', 0.15);
          });
        }
      });

      // Kick drum
      if (KICKS.indexOf(i) !== -1) bgKick(t);

      BGM.nextTime += S;
      BGM.step = (i + 1) % 64;
    }

    BGM.timer = setTimeout(bgScheduler, 25);
  }

  // ── Public BGM controls ────────────────────────────────────────

  function startBGM() {
    if (BGM.playing) return;
    var ctx = resume();
    if (!ctx) return;

    BGM.ctx        = ctx;
    BGM.masterGain = ctx.createGain();
    BGM.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    BGM.masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.0);
    BGM.masterGain.connect(ctx.destination);

    BGM.playing  = true;
    BGM.step     = 0;
    BGM.nextTime = ctx.currentTime + 0.05;
    bgScheduler();
  }

  function stopBGM() {
    if (!BGM.playing) return;
    BGM.playing = false;
    clearTimeout(BGM.timer);

    if (BGM.masterGain) {
      var ctx = BGM.ctx;
      var g   = BGM.masterGain;
      g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      setTimeout(function () { try { g.disconnect(); } catch (e) {} }, 900);
      BGM.masterGain = null;
    }
  }

  // Start BGM on first user gesture (browsers block audio until then).
  // Music plays through all screens — intro, gameplay, and results.
  (function () {
    function onFirst() {
      document.removeEventListener('click',   onFirst);
      document.removeEventListener('keydown', onFirst);
      startBGM();
    }
    document.addEventListener('click',   onFirst);
    document.addEventListener('keydown', onFirst);
  }());

  // Click sounds for intro screens via event delegation.
  // The ethics screen manages its own per-button sounds, so we skip it.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    if (btn.closest('#screen-langselect, #screen-idle, #screen-userinfo')) {
      try { soundClick(); } catch (err) {}
    }
  });

  window.startBGM     = startBGM;
  window.stopBGM      = stopBGM;
  window.toggleBGM    = function () { BGM.playing ? stopBGM() : startBGM(); };
  window.isBGMPlaying = function () { return BGM.playing; };

})();
