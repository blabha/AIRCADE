/**
 * api.js — thin wrapper around the (AI)RCADE backend.
 *
 * Base URL is read from the Vite env variable VITE_API_URL.
 * If it's not set (e.g. running without a backend) all calls
 * silently no-op so the game still works offline.
 *
 * Set it in a .env.local file:
 *   VITE_API_URL=http://localhost:8000
 */

const BASE = import.meta.env.VITE_API_URL || "";

async function post(path, body) {
  if (!BASE) return null;
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.warn(`[api] POST ${path} → ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn("[api] unreachable — running offline", err.message);
    return null;
  }
}

/**
 * saveSession — called once when the Results screen mounts.
 *
 * @param {object} state   — full game state from useGameState
 * @param {string} lang    — "en" | "es"
 * @param {Array}  answers — array of chosen option objects
 */
export async function saveSession({ state, lang, answers }) {
  const { player, score, totalEnergy, totalWater, totalCo2, sessionId, persona } = state;

  const payload = {
    session_id:   sessionId,
    lang,
    player_name:  player.name,
    age:          player.age ? parseInt(player.age, 10) : null,
    gender:       player.gender || null,
    industry:     player.industry || null,
    score,
    persona_id:   persona.id,
    persona_name: lang === "es" ? persona.es.name : persona.en.name,
    total_energy: totalEnergy,
    total_water:  totalWater,
    total_co2:    totalCo2,
    answers: answers.map((opt, i) => ({
      question_num: i + 1,
      option_label: opt.label,
      option_text:  lang === "es" ? opt.es : opt.en,
      energy_wh:    opt.energyWh,
      water_ml:     opt.waterMl,
      co2_g:        opt.co2g,
      weight:       opt.weight,
    })),
  };

  return post("/sessions", payload);
}
