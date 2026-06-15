/* ═══════════════════════════════════════════
   A(I)RCADE — Ticket Download / Print
   Uses html2canvas to capture ticket card as PNG,
   then POSTs to local print server (localhost:5000)
   with PNG download as fallback.
═══════════════════════════════════════════ */

async function printOrDownloadCard(sessionId, onSuccess) {
  const card = document.getElementById('ticket-card');
  const btn  = document.getElementById('btn-download');

  if (!card) {
    showError('Could not find the ticket to print.');
    return;
  }

  btn.textContent = 'PRINTING... ⏳';
  btn.disabled = true;

  let dataURL;
  try {
    const canvas = await html2canvas(card, {
      backgroundColor: '#ffffff',
      scale: 3,
      width: 384,
      height: 576,
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    dataURL = canvas.toDataURL('image/png');
  } catch (err) {
    console.error('html2canvas failed:', err);
    btn.textContent = 'ERROR — TRY AGAIN';
    btn.disabled = false;
    return;
  }

  // Try the local print server first
  let printedViaServer = false;
  try {
    const res = await fetch('http://localhost:5000/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataURL })
    });
    if (res.ok) {
      printedViaServer = true;
    }
  } catch (_) {
    // Server not running — fall back to download
  }

  if (printedViaServer) {
    btn.textContent = 'PRINTED! ✅';
    setTimeout(() => {
      if (typeof onSuccess === 'function') onSuccess();
    }, 2000);
  } else {
    // Fallback: download the PNG
    const link = document.createElement('a');
    link.download = `aircade-${sessionId || 'ticket'}.png`;
    link.href = dataURL;
    link.click();

    btn.textContent = 'PRINTED! ✅';
    setTimeout(() => {
      if (typeof onSuccess === 'function') onSuccess();
    }, 2000);
  }
}

// Keep old name as alias so any legacy calls still work
async function downloadCard(sessionId) {
  await printOrDownloadCard(sessionId);
}

function generateTicketQR(sessionId) {
  const canvas = document.getElementById('ticket-qr-canvas');
  if (!canvas || typeof qrcode === 'undefined') return;
  // 64×64 — sized to fit within the QR zone
  canvas.width  = 64;
  canvas.height = 64;
  const url = 'https://ai-rcade.lovable.app/session?id=' + (sessionId || '');
  const qr = qrcode(0, 'M');
  qr.addData(url);
  qr.make();
  const ctx   = canvas.getContext('2d');
  const size  = canvas.width;
  const count = qr.getModuleCount();
  const cell  = size / count;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#0a0a2e';
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        ctx.fillRect(Math.floor(c * cell), Math.floor(r * cell),
                     Math.ceil(cell), Math.ceil(cell));
      }
    }
  }
}

function _svgToImgEl(svgEl, size) {
  // Serialize SVG → data URL → <img> so html2canvas can capture it
  try {
    const serialized = new XMLSerializer().serializeToString(svgEl);
    const encoded    = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(serialized);
    const img = document.createElement('img');
    img.src    = encoded;
    img.width  = size;
    img.height = size;
    img.style.cssText = 'display:block;width:' + size + 'px;height:' + size + 'px;';
    return img;
  } catch (_) {
    return null;
  }
}

function _pixelFace() {
  // Fallback: simple CSS pixel-art face that html2canvas can always capture
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:40px;height:40px;background:#c8e8f5;border-radius:4px;position:relative;display:flex;align-items:center;justify-content:center;gap:6px;';
  const eye = () => {
    const e = document.createElement('div');
    e.style.cssText = 'width:8px;height:8px;background:#1a1a2e;border-radius:1px;';
    return e;
  };
  wrap.appendChild(eye());
  wrap.appendChild(eye());
  return wrap;
}

function populateTicketCard(state) {
  const { sessionId, userName, userAge, ethicsAnswers, score, staminaLevel, persona } = state;

  // Session ID hidden on ticket (still used for QR URL and Supabase)
  const sessionEl = document.getElementById('ticket-session');
  if (sessionEl) sessionEl.textContent = '';

  // Player name
  const playerEl = document.getElementById('ticket-player');
  if (playerEl) playerEl.textContent = userName || 'Anonymous';

  // Persona (name + mini Byte avatar)
  if (persona) {
    const nameEl = document.getElementById('ticket-persona-name');
    if (nameEl) nameEl.textContent = persona.title;

    const byteEl = document.getElementById('ticket-persona-byte');
    if (byteEl) {
      byteEl.innerHTML = '';
      if (persona.byteSvg) {
        // Parse byteSvg string into a real SVG element
        const tmp = document.createElement('div');
        tmp.innerHTML = persona.byteSvg;
        const svgEl = tmp.querySelector('svg');
        if (svgEl) {
          const img = _svgToImgEl(svgEl, 40);
          if (img) {
            byteEl.appendChild(img);
          } else {
            byteEl.appendChild(svgEl); // fallback: use SVG directly
          }
        } else {
          byteEl.appendChild(_pixelFace());
        }
      } else {
        byteEl.appendChild(_pixelFace());
      }
    }
  }

  // Score + stamina level
  const scoreEl   = document.getElementById('ticket-score');
  const staminaEl = document.getElementById('ticket-stamina');
  if (scoreEl)   scoreEl.textContent   = (score || 0) + '/35';
  if (staminaEl) staminaEl.textContent = 'Final Stamina: ' + (staminaLevel || 3) + '/5';

  // Daily footprint per stamina level
  const footprint = DAILY_FOOTPRINT[staminaLevel] || DAILY_FOOTPRINT[3];
  const waterEl   = document.getElementById('ticket-water');
  const co2El     = document.getElementById('ticket-co2');
  const energyEl  = document.getElementById('ticket-energy');
  if (waterEl)   waterEl.textContent  = footprint.water  + '/day';
  if (co2El)     co2El.textContent    = footprint.co2    + '/day';
  if (energyEl)  energyEl.textContent = footprint.energy + '/day';

  // Personalized tip (condensed for ticket)
  const tipEl = document.getElementById('ticket-tip');
  if (tipEl) {
    const tipText = getPersonalizedTip(ethicsAnswers || [], persona);
    tipEl.textContent = tipText.length > 110 ? tipText.slice(0, 107) + '…' : tipText;
  }

  generateTicketQR(sessionId);
}
