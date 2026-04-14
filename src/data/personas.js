/**
 * Personas — matched to the new scoring system.
 *
 * Score range per 5 questions: -15 to +20
 *   ≤  0  → Turbo Tapper  (heavy AI user, negative impact)
 *   1–7   → Casual Clicker (average, not intentional)
 *   8–14  → Mindful Maker  (thoughtful user)
 *   15–20 → Green Hacker   (exemplary sustainable AI use)
 */

export const PERSONAS = {
  turbo: {
    id: "turbo",
    en: {
      name: "The Turbo Tapper",
      tagline: "Full throttle, zero regrets — every pixel counts against you.",
    },
    es: {
      name: "El Tapeador Turbo",
      tagline: "A toda velocidad, sin remordimientos — cada píxel cuenta en tu contra.",
    },
    scoreRange: [-15, 0],
    color: "#FF3A20",
    glowColor: "#FF3A2088",
    sound: "turbo",
    cloudMood: "sad",
  },
  casual: {
    id: "casual",
    en: {
      name: "The Casual Clicker",
      tagline: "You're not the problem — but you're not the solution either.",
    },
    es: {
      name: "El Clicker Casual",
      tagline: "No eres el problema — pero tampoco eres la solución.",
    },
    scoreRange: [1, 7],
    color: "#FFE600",
    glowColor: "#FFE60088",
    sound: "casual",
    cloudMood: "neutral",
  },
  mindful: {
    id: "mindful",
    en: {
      name: "The Mindful Maker",
      tagline: "You pause before you prompt. The planet notices.",
    },
    es: {
      name: "El Creador Consciente",
      tagline: "Pausas antes de preguntar. El planeta lo nota.",
    },
    scoreRange: [8, 14],
    color: "#0099FF",
    glowColor: "#0099FF88",
    sound: "mindful",
    cloudMood: "happy",
  },
  green: {
    id: "green",
    en: {
      name: "The Green Hacker",
      tagline: "Low footprint, high impact. You play the long game.",
    },
    es: {
      name: "El Hacker Verde",
      tagline: "Huella baja, alto impacto. Juegas a largo plazo.",
    },
    scoreRange: [15, 20],
    color: "#39FF14",
    glowColor: "#39FF1488",
    sound: "green",
    cloudMood: "celebrating",
  },
};

export function getPersona(score) {
  if (score <= 0)  return PERSONAS.turbo;
  if (score <= 7)  return PERSONAS.casual;
  if (score <= 14) return PERSONAS.mindful;
  return PERSONAS.green;
}
