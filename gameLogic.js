// (AI)RCADE — pure game logic, no rendering, no physics, no DOM
const GameLogic = (() => {
  let _state = { lives: 3, scrolling: true, currentQuestion: null, score: 0 };
  let _cb = {};

  // ── Scoring constants ──────────────────────────────────────────────────────
  const ENV_SCORES = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 6, 6: 7 };
  const MORAL_ADJ  = { 0: -1, 1: 0, 2: 1 };

  function calcQuestionScore(envWeight, moralScore) {
    const raw = ENV_SCORES[envWeight] + MORAL_ADJ[moralScore];
    return Math.max(0, Math.min(7, raw));
  }

  function getPersona(totalScore) {
    if (totalScore <= 7)  return { name: 'Grid Goblin',      desc: 'Maximum consumption, zero awareness — draining the planet one click at a time' };
    if (totalScore <= 13) return { name: 'Turbo Tapper',     desc: 'Fast and reckless; convenience wins every time, consequences be damned' };
    if (totalScore <= 19) return { name: 'Casual Clicker',   desc: 'Convenience-first with occasional good instincts, but not yet connecting the dots' };
    if (totalScore <= 24) return { name: 'Eco Experimenter', desc: 'Starting to connect the dots between choices and impact — curious, inconsistent' };
    if (totalScore <= 29) return { name: 'Mindful Maker',    desc: 'Thoughtful and intentional — balancing usefulness with care for the planet' };
    if (totalScore <= 32) return { name: 'Green Hacker',     desc: 'Deliberately sustainable; optimizing the right things with skill and intention' };
    return                       { name: 'Sustainable Sage', desc: 'Near-perfect alignment of impact and intent — a model for conscious AI use' };
  }

  // ── State transitions ──────────────────────────────────────────────────────
  function init(callbacks) { _cb = callbacks || {}; }

  function _deductLife() {
    _state.lives = Math.max(0, _state.lives - 1);
    if (_cb.updateLives) _cb.updateLives(_state.lives);
    if (_state.lives === 0) onGameOver();
  }

  function onQuestionBlockHit(block) {
    if (!_state.scrolling) return;
    _state.scrolling       = false;
    _state.currentQuestion = block;
    if (_cb.pauseScroll)  _cb.pauseScroll();
    if (_cb.openQuestion) _cb.openQuestion(block);
  }

  function onTreeHit() {
    if (_cb.flash) _cb.flash();
    _deductLife();
  }

  function onBlockMissed() {
    _deductLife();
  }

  // answerId: 'A'|'B'|'C', envWeight: 1-6, moralScore: 0-2
  function onAnswerSelected(answerId, envWeight, moralScore) {
    _state.score          += calcQuestionScore(envWeight, moralScore);
    _state.currentQuestion = null;
    _state.scrolling       = true;
    if (_cb.closeQuestion) _cb.closeQuestion();
    if (_cb.scoreAnswer)   _cb.scoreAnswer(answerId, _state.score);
    if (_cb.resumeScroll)  _cb.resumeScroll();
  }

  function onGameOver() {
    _state.scrolling = false;
    if (_cb.pauseScroll) _cb.pauseScroll();
    if (_cb.gameOver)    _cb.gameOver(_state.score, getPersona(_state.score));
  }

  function getState() { return { ..._state }; }

  function reset() {
    _state = { lives: 3, scrolling: true, currentQuestion: null, score: 0 };
  }

  return {
    init, reset, getState,
    onQuestionBlockHit, onTreeHit, onBlockMissed, onAnswerSelected, onGameOver,
    calcQuestionScore, getPersona,
  };
})();
