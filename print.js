/* ═══════════════════════════════════════════
   A(I)RCADE — Print / Download Card
   Uses html2canvas to capture receipt as PNG
═══════════════════════════════════════════ */

async function downloadCard(sessionId) {
  const card = document.getElementById('receipt-card');

  if (!card) {
    showError('Could not find the card to download.');
    return;
  }

  const btn = document.getElementById('btn-download');
  const tFn = (typeof t === 'function') ? t : () => null;
  btn.textContent = tFn('ui.downloading') || '⏳ Generating...';
  btn.disabled = true;

  try {
    const canvas = await html2canvas(card, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      logging: false,
      // Clip to the visible area of the card
      width: card.offsetWidth,
      height: card.offsetHeight
    });

    const link = document.createElement('a');
    link.download = `aircade-${sessionId || 'card'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    btn.textContent = tFn('ui.downloadDone') || '✅ Downloaded!';
    setTimeout(() => {
      btn.textContent = tFn('ui.downloadBtn') || '⬇ DOWNLOAD AS IMAGE';
      btn.disabled = false;
    }, 2000);
  } catch (err) {
    console.error('Download failed:', err);
    showError('Download failed — try right-clicking the card and saving as image.');
    btn.textContent = tFn('ui.downloadBtn') || '⬇ DOWNLOAD AS IMAGE';
    btn.disabled = false;
  }
}

function populateReceiptCard(state) {
  const { prompt, taskType, metrics, sessionId, userName, userAge, resources, ethicsAnswers, score } = state;

  // Session ID
  const sessionEl = document.getElementById('receipt-session');
  if (sessionEl) sessionEl.textContent = `SESSION: #${sessionId}`;

  // Player info
  const playerEl = document.getElementById('receipt-player');
  if (playerEl) {
    const parts = [userName || 'Player'];
    if (userAge) parts.push(userAge);
    playerEl.textContent = parts.join(' | ');
  }

  // Persona
  const personaEl = document.getElementById('receipt-persona');
  if (personaEl && state.persona) {
    personaEl.textContent = state.persona.title + ' — ' + state.persona.subtitle;
  }

  // Prompt
  const promptEl = document.getElementById('receipt-prompt');
  if (promptEl) promptEl.textContent = prompt;

  // Ethics resource totals
  if (resources) {
    const fmt = v => (Number.isInteger(v) ? v : +v.toFixed(1));
    const ethEnergyEl = document.getElementById('r-ethics-energy');
    const ethWaterEl  = document.getElementById('r-ethics-water');
    const ethCo2El    = document.getElementById('r-ethics-co2');
    if (ethEnergyEl) ethEnergyEl.textContent = fmt(resources.energy) + ' Wh';
    if (ethWaterEl)  ethWaterEl.textContent  = fmt(resources.water)  + ' ml';
    if (ethCo2El)    ethCo2El.textContent    = fmt(resources.co2)    + ' g';
  }

  // Score
  const scoreEl = document.getElementById('r-score');
  if (scoreEl) scoreEl.textContent = (score || 0) + '/25';

  // Personalized tip (first of the 3)
  const tipEl = document.getElementById('receipt-tip');
  if (tipEl) {
    const tips = selectPersonalizedTips(taskType, resources || { energy: 0, water: 0, co2: 0 }, ethicsAnswers || []);
    if (tips && tips.length > 0) {
      const tip     = tips[0];
      const tipTitle = (typeof t === 'function') ? (t('tips.' + tip.id + '.title') || tip.title) : tip.title;
      const tipDesc  = (typeof t === 'function') ? (t('tips.' + tip.id + '.description') || tip.description) : tip.description;
      tipEl.textContent = tipTitle + ': ' + tipDesc;
    }
  }
}
