/* ═══════════════════════════════════════════
   (AI)RCADE — Question Bank
   Source: Question_Bank.csv
   15 combinations: 5 age groups × 3 expertise levels, 20 questions each
   Format per question: [scenario, A_text, A_type, B_text, B_type, C_text, C_type]
   Types: H=High AI impact (-3pts), B=Balanced (+1pt), L=Low/conscious (+4pts)
═══════════════════════════════════════════ */

// Score per type (from Scoring_Logic.md)
const ANSWER_SCORES = { H: -3, B: 1, L: 4 };

// Env metric estimates per type (for resource bars)
const ANSWER_METRICS = {
  H: { energy_wh: 50, water_ml: 500, co2_g: 15 },
  B: { energy_wh: 15, water_ml: 150, co2_g:  5 },
  L: { energy_wh:  2, water_ml:  20, co2_g:  1 }
};

// CSV Mapping column → answer type
const MAPPING_TO_TYPE = {
  'High AI impact':           'H',
  'Balanced AI use':          'B',
  'Low-impact conscious use': 'L'
};

// QB populated asynchronously from CSV — QB[ageGroup][expertise] = array of 20 questions
let QB = {};

// ── CSV Parser ────────────────────────────────────────────────────────────────
// Handles quoted fields and escaped double-quotes ("") per RFC 4180
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ── CSV Loader ────────────────────────────────────────────────────────────────
async function loadQuestionBank() {
  const response = await fetch('Question_Bank.csv');
  if (!response.ok) throw new Error(`Failed to fetch Question_Bank.csv: ${response.status}`);
  const text = await response.text();

  // Strip UTF-8 BOM if present and normalise line endings
  const lines = text.replace(/^﻿/, '').split(/\r?\n/);

  // Build an intermediate structure keyed by [ageGroup][expertise][questionNumber]
  const tempBank = {};

  for (let i = 1; i < lines.length; i++) {   // i=0 is the header row
    const line = lines[i].trim();
    if (!line) continue;

    const cols = parseCSVLine(line);
    if (cols.length < 6) continue;

    const ageGroup  = cols[0].trim();
    const expertise = cols[1].trim();
    const qNum      = parseInt(cols[2].trim(), 10);
    // Strip leading "For " so QB stores e.g. "homework help"
    const scenario  = cols[3].trim().replace(/^For\s+/i, '');
    const optFull   = cols[4].trim();   // "A – option text..."
    const mapping   = cols[5].trim();

    // Split "A – text" on en-dash separator (U+2013)
    const sepIdx    = optFull.indexOf(' – ');
    const optLetter = optFull[0];
    const optText   = sepIdx !== -1 ? optFull.slice(sepIdx + 3) : optFull.slice(4);
    const type      = MAPPING_TO_TYPE[mapping] || 'B';

    if (!tempBank[ageGroup])             tempBank[ageGroup] = {};
    if (!tempBank[ageGroup][expertise])  tempBank[ageGroup][expertise] = {};
    if (!tempBank[ageGroup][expertise][qNum]) {
      tempBank[ageGroup][expertise][qNum] = { scenario, options: {} };
    }
    tempBank[ageGroup][expertise][qNum].options[optLetter] = { text: optText, type };
  }

  // Flatten to QB array format: QB[ag][exp] = [ [scenario, A_text, A_type, B_text, B_type, C_text, C_type], ... ]
  for (const ag of Object.keys(tempBank)) {
    QB[ag] = {};
    for (const exp of Object.keys(tempBank[ag])) {
      const questions = tempBank[ag][exp];
      const qNums = Object.keys(questions).map(Number).sort((a, b) => a - b);
      QB[ag][exp] = qNums.map(qNum => {
        const { scenario, options: o } = questions[qNum];
        return [
          scenario,
          o.A?.text ?? '', o.A?.type ?? 'B',
          o.B?.text ?? '', o.B?.type ?? 'B',
          o.C?.text ?? '', o.C?.type ?? 'B'
        ];
      });
    }
  }
}

// ── Lookup helpers ─────────────────────────────────────────────────────────────
function mapAgeGroup(userAge) {
  const map = { '0-12': '0-12', '13-19': '13-19', '20-39': '20-39', '40-59': '40-59', '60+': '60+' };
  return map[userAge] || '20-39';
}

function mapExpertise(userExpertise) {
  // UI dropdown uses 'Average'; CSV uses 'Intermediate'
  const map = { 'Beginner': 'Beginner', 'Average': 'Intermediate', 'Expert': 'Expert' };
  return map[userExpertise] || 'Beginner';
}

// ── Public API ─────────────────────────────────────────────────────────────────
// Select 5 random unique questions from the correct bank
function selectQuestionsFromBank(userAge, userExpertise) {
  const ageKey = mapAgeGroup(userAge);
  const expKey = mapExpertise(userExpertise);
  const pool   = QB[ageKey]?.[expKey];
  if (!pool || pool.length === 0) return [];

  // Fisher-Yates shuffle, take 5
  const arr = pool.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 5).map(raw => ({
    question: 'How do you use AI? For ' + raw[0] + '.',
    scenario: raw[0],
    A: buildOption(raw[1], raw[2]),
    B: buildOption(raw[3], raw[4]),
    C: buildOption(raw[5], raw[6])
  }));
}

function buildOption(text, type) {
  const m = ANSWER_METRICS[type];
  return {
    text,
    type,
    score:     ANSWER_SCORES[type],
    energy_wh: m.energy_wh,
    water_ml:  m.water_ml,
    co2_g:     m.co2_g
  };
}

// ── Icon steps for consumption meters (cumulative score range: -15 to +20) ──
const ICON_STEPS = {
  water: [
    { icon: '🥤', label: 'Glass of water',  threshold: 15  },
    { icon: '🍶', label: 'Bottle of water', threshold: 5   },
    { icon: '🫙', label: 'Demijohn',        threshold: -4  },
    { icon: '🛢️', label: 'Barrel',          threshold: -99 }
  ],
  co2: [
    { icon: '🌳🌲🌳', label: 'Forest',       threshold: 15  },
    { icon: '🌳',    label: 'Single tree',   threshold: 5   },
    { icon: '🌿',    label: 'Leafless tree', threshold: -4  },
    { icon: '💨',    label: 'Emissions',     threshold: -99 }
  ],
  energy: [
    { icon: '🕯️', label: 'Candle',      threshold: 15  },
    { icon: '💡', label: 'Light bulb',   threshold: 5   },
    { icon: '🪔', label: 'Lamp',         threshold: -4  },
    { icon: '🏮', label: 'Lamp post',    threshold: -99 }
  ]
};

function getIconStep(category, totalScore) {
  const steps = ICON_STEPS[category];
  for (const step of steps) {
    if (totalScore >= step.threshold) return step;
  }
  return steps[steps.length - 1];
}
