import { useRef, useCallback } from "react";

// All sounds synthesised via Web Audio API — no external files.

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!window._arcadeAudioCtx) {
    window._arcadeAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return window._arcadeAudioCtx;
}

function resume() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") ctx.resume();
  return ctx;
}

// ── helpers ───────────────────────────────────────────────────────────────────

function playTone(ctx, freq, startTime, duration, type = "square", gainVal = 0.3) {
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

function playNoise(ctx, startTime, duration, gainVal = 0.15) {
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

// ── individual sounds ─────────────────────────────────────────────────────────

function soundClick() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  playTone(ctx, 440, t, 0.05, "square", 0.2);
  playTone(ctx, 880, t + 0.03, 0.04, "square", 0.1);
}

function soundCoin() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  playTone(ctx, 660,  t,      0.08, "square", 0.3);
  playTone(ctx, 880,  t+0.09, 0.10, "square", 0.3);
  playTone(ctx, 1320, t+0.20, 0.12, "square", 0.25);
}

function soundLevelComplete() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  [523, 659, 784].forEach((freq, i) => {
    playTone(ctx, freq, t + i * 0.15, 0.2, "square", 0.25);
  });
}

function soundPrint() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  for (let i = 0; i < 8; i++) {
    playNoise(ctx, t + i * 0.07, 0.06, 0.08);
    playTone(ctx, 80 + Math.random() * 40, t + i * 0.07, 0.06, "sawtooth", 0.05);
  }
}

// ── NEW: consequence sounds ───────────────────────────────────────────────────

/** Played when the player picks a high-impact (bad) answer */
function soundDamage() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  // Descending harsh buzz — conveys "wrong!"
  playTone(ctx, 220, t,       0.12, "sawtooth", 0.35);
  playTone(ctx, 180, t+0.10,  0.10, "sawtooth", 0.30);
  playTone(ctx, 140, t+0.18,  0.15, "sawtooth", 0.25);
  playNoise(ctx, t, 0.25, 0.1);
}

/** Played when the player picks a good/eco-conscious answer */
function soundGoodChoice() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  // Quick ascending 2-note positive chime
  playTone(ctx, 523, t,      0.1, "square",   0.22);
  playTone(ctx, 784, t+0.12, 0.15, "triangle", 0.22);
}

// ── persona end jingles ───────────────────────────────────────────────────────

/** Turbo Tapper — fast chaotic burst, discordant, energetic */
function soundPersonaTurbo() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  const freqs = [880, 660, 440, 550, 770, 990, 330, 220];
  freqs.forEach((freq, i) => {
    playTone(ctx, freq, t + i * 0.065, 0.09, "sawtooth", 0.22);
  });
  playNoise(ctx, t + 0.08, 0.4, 0.07);
  // end with a drop
  playTone(ctx, 110, t + 0.55, 0.25, "sawtooth", 0.2);
}

/** Casual Clicker — mid-tempo simple bloop melody */
function soundPersonaCasual() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  const melody = [330, 392, 440, 392, 330, 440, 330];
  melody.forEach((freq, i) => {
    playTone(ctx, freq, t + i * 0.18, 0.22, "square", 0.22);
  });
}

/** Mindful Maker — gentle ascending 5-note chime */
function soundPersonaMindful() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  const melody = [261, 294, 330, 349, 392, 440]; // C D E F G A
  melody.forEach((freq, i) => {
    playTone(ctx, freq, t + i * 0.22, 0.35, "triangle", 0.2);
  });
}

/** Green Hacker — triumphant 8-note 8-bit fanfare */
function soundPersonaGreen() {
  const ctx = resume(); if (!ctx) return;
  const t = ctx.currentTime;
  // Triumphant fanfare: C C C Ab Bb C Bb C (in 5th octave)
  const fanfare =   [523, 523, 523, 415, 466, 523, 466, 523];
  const durations = [0.1, 0.1, 0.1, 0.08, 0.08, 0.25, 0.1, 0.45];
  let cursor = t;
  fanfare.forEach((freq, i) => {
    playTone(ctx, freq, cursor, durations[i] + 0.05, "square", 0.28);
    // add harmonics for richness
    playTone(ctx, freq * 2, cursor, durations[i] * 0.6, "square", 0.1);
    cursor += durations[i] + 0.02;
  });
  // final chord
  [523, 659, 784].forEach((f) => playTone(ctx, f, cursor, 0.6, "triangle", 0.18));
}

// ── hook ──────────────────────────────────────────────────────────────────────

export function useSounds() {
  const enabled = useRef(true);

  const play = useCallback((name) => {
    if (!enabled.current) return;
    try {
      switch (name) {
        case "click":        return soundClick();
        case "coin":         return soundCoin();
        case "levelComplete":return soundLevelComplete();
        case "print":        return soundPrint();
        case "damage":       return soundDamage();
        case "goodChoice":   return soundGoodChoice();
        case "turbo":        return soundPersonaTurbo();
        case "casual":       return soundPersonaCasual();
        case "mindful":      return soundPersonaMindful();
        case "green":        return soundPersonaGreen();
        default:             return soundClick();
      }
    } catch {
      // silently fail if audio context is blocked
    }
  }, []);

  const toggleSound = useCallback(() => { enabled.current = !enabled.current; }, []);

  return { play, toggleSound };
}
