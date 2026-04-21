# Personalized Tips by Persona

Each persona receives a tailored tip shown at the bottom of the persona card (ethics-summary screen).

---

## Grid Goblin
**Score range:** -15 to -8
**Mascot:** 🔴 Heavy-eyed cloud with red controller — drained and draining
**Short Description:** Maximum consumption, zero awareness — draining the planet one click at a time
**Tip:** Start small: pick one task this week where you'll solve it yourself before turning to AI. One conscious choice per day adds up to real change.

---

## Turbo Tapper
**Score range:** -7 to -2
**Mascot:** ⚡ Cloud with lightning bolt — fast and reckless
**Short Description:** Fast and reckless — convenience wins every time, consequences be damned
**Tip:** Speed is great, but pause for two seconds before hitting generate. Ask yourself: "Do I actually need AI for this, or am I just in a hurry?"

---

## Casual Clicker
**Score range:** -1 to 4
**Mascot:** 😐 Neutral-expression cloud — going through the motions
**Short Description:** Convenience-first with occasional good instincts, but not thinking it through
**Tip:** Your instincts are good — trust them more. Before your next AI prompt, spend 30 seconds trying it yourself. You'll save energy and often get a better result.

---

## Eco Experimenter
**Score range:** 5 to 9
**Mascot:** 🔬 Cloud with compass/target — curious and learning
**Short Description:** Starting to connect the dots between choices and impact
**Tip:** You're connecting the dots — keep going. Start asking "what's the lowest-impact way to get this result?" before every AI session. The habit will become automatic.

---

## Mindful Maker
**Score range:** 10 to 14
**Mascot:** 🌿 Cloud with leaf — balanced and thoughtful
**Short Description:** Thoughtful and intentional — balancing usefulness with environmental care
**Tip:** You're already doing great. Level up by tracking how often you skip AI entirely for tasks you'd have prompted last year. That gap is your real impact.

---

## Green Hacker
**Score range:** 15 to 17
**Mascot:** 😎 Cloud with green sunglasses — deliberately sustainable
**Short Description:** Deliberately sustainable — earns the hacker badge for optimising the right things
**Tip:** You've found the cheat codes. Now teach someone else. Sharing sustainable AI habits multiplies your impact far beyond your own sessions.

---

## Sustainable Sage
**Score range:** 18 to 20
**Mascot:** 👑 Cloud with green crown — the rarest unlock
**Short Description:** Near-perfect alignment of impact and intent — the rarest unlock
**Tip:** You've unlocked the top tier. The next challenge: help design the systems that make low-impact AI the default, not the exception. You're ready for that conversation.

---

## Implementation Notes

- Persona is determined by `getPersonaFromScore(state.score)` in `data.js`
- Tip is stored in each `SCORE_PERSONAS` entry as a `tip` field
- Displayed in a `persona-tip` div appended to the `.persona-card` section
- The tip uses the same pixel-font aesthetic as the rest of the card
