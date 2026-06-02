/* ═══════════════════════════════════════════
   A(I)RCADE — Ticket Download
   Uses html2canvas to capture ticket card as PNG
═══════════════════════════════════════════ */

async function downloadCard(sessionId) {
  const card = document.getElementById('ticket-card');

  if (!card) {
    showError('Could not find the ticket to download.');
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
      width:  card.offsetWidth,
      height: card.offsetHeight
    });

    const link = document.createElement('a');
    link.download = `aircade-${sessionId || 'ticket'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    btn.textContent = tFn('ui.downloadDone') || '✅ Downloaded!';
    setTimeout(() => {
      btn.textContent = tFn('ui.downloadBtn') || '⬇ DOWNLOAD TICKET';
      btn.disabled = false;
    }, 2000);
  } catch (err) {
    console.error('Download failed:', err);
    showError('Download failed — try right-clicking the ticket and saving as image.');
    btn.textContent = tFn('ui.downloadBtn') || '⬇ DOWNLOAD TICKET';
    btn.disabled = false;
  }
}

function populateTicketCard(state) {
  const { sessionId, userName, userAge, ethicsAnswers, score, staminaLevel, persona } = state;

  // Session ID
  const sessionEl = document.getElementById('ticket-session');
  if (sessionEl) sessionEl.textContent = `SESSION: #${sessionId}`;

  // Player name
  const playerEl = document.getElementById('ticket-player');
  if (playerEl) playerEl.textContent = userName || 'Anonymous';

  // Persona (name + mini Byte avatar)
  if (persona) {
    const nameEl = document.getElementById('ticket-persona-name');
    if (nameEl) nameEl.textContent = persona.title;

    const byteEl = document.getElementById('ticket-persona-byte');
    if (byteEl) byteEl.innerHTML = persona.byteSvg || '';
  }

  // Score + stamina level
  const scoreEl   = document.getElementById('ticket-score');
  const staminaEl = document.getElementById('ticket-stamina');
  if (scoreEl)   scoreEl.textContent   = (score || 0) + '/20';
  if (staminaEl) staminaEl.textContent = 'Final Stamina: ' + (staminaLevel || 3) + '/5';

  // Daily footprint per stamina level
  const footprint = DAILY_FOOTPRINT[staminaLevel] || DAILY_FOOTPRINT[3];
  const waterEl   = document.getElementById('ticket-water');
  const co2El     = document.getElementById('ticket-co2');
  const energyEl  = document.getElementById('ticket-energy');
  if (waterEl)   waterEl.textContent  = footprint.water  + '/day';
  if (co2El)     co2El.textContent    = footprint.co2    + '/day';
  if (energyEl)  energyEl.textContent = footprint.energy + '/day';

  // Personalized tip (condensed to 2 lines on ticket)
  const tipEl = document.getElementById('ticket-tip');
  if (tipEl) {
    const tipText = getPersonalizedTip(ethicsAnswers || [], persona);
    // Truncate for ticket readability
    tipEl.textContent = tipText.length > 140 ? tipText.slice(0, 137) + '…' : tipText;
  }
}
