# (AI)RCADE — Scoring Logic Specification

## Overview
This document defines the scoring logic for the (AI)RCADE game. The system evaluates player choices based on environmental impact and ethical intent.

---

## Core Formula

score = clamp(-3, +4, envScore + moralAdj)

---

## Environmental Score (envScore)

| Weight | Description | envScore |
|--------|------------|----------|
| 1 | Highest impact | -3 |
| 2 | High impact | -1 |
| 3 | Moderate | +1 |
| 4 | Good | +2 |
| 5 | Very good | +3 |
| 6 | Zero/Minimal impact | +4 |

---

## Moral Adjustment (moralAdj)

| moralScore | Meaning | moralAdj |
|------------|--------|----------|
| 0 | Impulsive / convenience | -1 |
| 1 | Practical | 0 |
| 2 | Conscious / intentional | +1 |

---

## Per Question Score Range
- Minimum: -3
- Maximum: +4

---

## Total Score Range (5 Questions)
- Minimum: -15
- Maximum: +20

---

## Personas

| Score Range | Persona | Description |
|-------------|---------|-------------|
| -15 to -8 | Grid Goblin | Maximum consumption, zero awareness — draining the planet one click at a time |
| -7 to -2 | Turbo Tapper | Fast and reckless; convenience wins every time, consequences be damned |
| -1 to 4 | Casual Clicker | Convenience-first with occasional good instincts, but not thinking it through |
| 5 to 9 | Eco Experimenter | Starting to connect the dots between choices and impact |
| 10 to 14 | Mindful Maker | Thoughtful and intentional — balancing usefulness with environmental care |
| 15 to 17 | Green Hacker | Deliberately sustainable; earns the hacker badge for optimizing the right things |
| 18 to 20 | Sustainable Sage | Near-perfect alignment of impact and intent — the rarest unlock |

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

- Clamping ensures stability of scoring
- MoralScore introduces ethical nuance
- Environmental metrics are cumulative, not part of score calculation directly
