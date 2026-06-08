# (AI)RCADE — Scoring Logic Specification

## Overview
This document defines the scoring logic for the (AI)RCADE game. The system evaluates player choices based on environmental impact and ethical intent.

---

## Core Formula

score = clamp(0, +7, envScore + moralAdj)

> All scores are shifted by +3 relative to the original design (minimum anchored at 0).

---

## Environmental Score (envScore)

| Weight | Description | envScore |
|--------|------------|----------|
| 1 | Highest impact | 0 |
| 2 | High impact | 2 |
| 3 | Moderate | 4 |
| 4 | Good | 5 |
| 5 | Very good | 6 |
| 6 | Zero/Minimal impact | 7 |

---

## Moral Adjustment (moralAdj)

| moralScore | Meaning | moralAdj |
|------------|--------|----------|
| 0 | Impulsive / convenience | -1 |
| 1 | Practical | 0 |
| 2 | Conscious / intentional | +1 |

> Note: moralAdj still shifts ±1 relative to the envScore. The clamp(0, 7) prevents the final per-question score from going below 0 or above 7.

---

## Per Question Score Range
- Minimum: 0
- Maximum: 7

---

## Total Score Range (5 Questions)
- Minimum: 0
- Maximum: 35

---

## Personas

| Score Range | Persona | Description |
|-------------|---------|-------------|
| 0 to 7 | Grid Goblin | Maximum consumption, zero awareness — draining the planet one click at a time |
| 8 to 13 | Turbo Tapper | Fast and reckless; convenience wins every time, consequences be damned |
| 14 to 19 | Casual Clicker | Convenience-first with occasional good instincts, but not thinking it through |
| 20 to 24 | Eco Experimenter | Starting to connect the dots between choices and impact |
| 25 to 29 | Mindful Maker | Thoughtful and intentional — balancing usefulness with environmental care |
| 30 to 32 | Green Hacker | Deliberately sustainable; earns the hacker badge for optimizing the right things |
| 33 to 35 | Sustainable Sage | Near-perfect alignment of impact and intent — the rarest unlock |

---

## Environmental Metrics (Tracked Separately)

Each option includes:
- energyWh (electricity consumption)
- waterMl (cooling water usage)
- co2g (carbon emissions)

These are accumulated across all questions.

---

## Ethical Scoring Layer (0–10)

Final ethical score:

Ethical Score = 
0.30 * Environmental Burden +
0.15 * Lifecycle Completeness +
0.20 * Necessity & Proportionality +
0.20 * Net Benefit +
0.10 * Justice & Distribution +
0.05 * Transparency

Each category scored from 0–10.

---

## Interpretation Bands

| Score | Meaning |
|------|--------|
| 8.5–10 | Strong ethical use |
| 7–8.4 | Good, with improvements possible |
| 5–6.9 | Weak justification |
| 3–4.9 | Problematic |
| 0–2.9 | Unjustified |

---

## Design Principles

1. No obvious correct answer
2. Trade-offs between impact and usefulness
3. Intent matters alongside impact
4. Relative differences more important than absolute values

---

## Notes

- Clamping ensures stability of scoring — per-question scores are bounded to [0, 7]
- The entire scoring system is shifted by +3 per question (+15 total) relative to the original design; all relative differences and persona tiers are preserved
- moralAdj (−1 / 0 / +1) still applies before clamping, so intent continues to influence final score
- Environmental metrics are cumulative, not part of score calculation directly