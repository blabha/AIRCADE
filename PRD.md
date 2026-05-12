# A(I)RCADE — Product Requirements Document
### Status: **IMPLEMENTED** — Last updated May 2026

---

## Project Overview

| Field | Value |
|---|---|
| **Product Name** | A(I)RCADE |
| **Tagline** | "Every prompt has a footprint. Leave a positive one." |
| **Format** | Interactive web application (tablet-optimized) |
| **Duration** | 2–3 minutes per session |
| **Audience** | General public (age 0+), no technical background assumed |
| **Installation** | Laser-cut arcade cabinet with touchscreen |

---

## Core Objective

A playful, educational arcade-style experience that teaches people about the environmental cost of AI usage (water, energy, CO₂) and the ethical implications of AI use — showing them how to make greener and smarter choices without guilt-tripping.

**Core Takeaway:**
> *"AI is an amazing tool — and like any tool, using it thoughtfully makes all the difference for our planet."*

---

## Technical Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (no framework) |
| **Fonts** | Press Start 2P (Google Fonts) — pixel/arcade aesthetic |
| **Image capture** | html2canvas (CDN) — for receipt card download |
| **AI generation** | Pre-generated offline (no live API) |
| **Backend** | None — fully static, runs as local HTML file |
| **Deployment** | Static file, no server required |
| **i18n** | Built-in translation system (English, Castilian, Catalan) |
| **Sound** | Web Audio API via `sounds.js` |

### File Structure
```
AIRCADE/
├── index.html                    # All screen HTML
├── styles.css                    # All styles
├── script.js                     # Screen logic, state, events
├── data.js                       # Resource thresholds, metrics, tips, DYK facts
├── questionBank.js               # Age × expertise question bank (15 sets × 20 questions)
├── translations.js               # i18n strings (en / es / ca)
├── sounds.js                     # Sound effects (Web Audio API)
├── api.js                        # Mock AI responses (offline)
├── byte.js                       # Byte mascot speech logic
├── print.js                      # Receipt card population + download
└── assets/
    ├── cat-astronaut.jpg         # Pre-generated image (cat prompt)
    └── bakery-logo.jpg           # Pre-generated image (bakery prompt)
```

> **Removed from earlier design:** `questions-database.json`, `personalized-tips-database.json`, `did-you-know-database.json`, `prompt-results-examples.json`. All question and tips data is now inline in `questionBank.js` and `data.js`.

---

## App State

```javascript
const state = {
  screen: 'idle',
  prompt: '',                    // randomly assigned after user info
  taskType: 'text-short',        // 'image' | 'text-short' | 'text-long'
  metrics: null,
  sessionId: generateSessionId(),
  // Resource accumulators (grow with each ethics answer)
  resources: { energy: 0, water: 0, co2: 0 },
  mindfulness: 0,
  score: 0,                      // cumulative score (-15 to +20)
  totalScore: 0,                 // alias used for icon meters
  // User info
  userName: '',
  userAge: '',                   // e.g. '13-19'
  userExpertise: '',             // 'Beginner' | 'Average' | 'Expert'
  userGender: '',                // kept for legacy, not collected
  // Ethics
  ethicsAnswers: [],             // [{ category, letter, color, type, energy_wh, water_ml, co2_g, score }]
  currentQuestions: [],          // 5 selected for this session
  currentQuestionIndex: 0,
  persona: null                  // assigned after ethics questions
};
```

---

## Resource Bar System (replaces old Stamina bar)

**Visual:** 3 fixed bars at top of screen — Energy (Wh), Water (ml), CO₂ (g)
**Behaviour:** Bars accumulate as the player answers ethics questions. Each answer adds resource values based on its type (H/B/L).
**Visibility:** Hidden on idle, userinfo, greener, and print screens. Shown only during the 5 ethics questions via `RESOURCE_SCREENS = new Set(['ethics'])`.

### Resource Thresholds (4-tier)

| Resource | Green | Yellow | Orange | Red |
|---|---|---|---|---|
| Energy (Wh) | ≤15 | 15–50 | 50–120 | >120 |
| Water (ml) | ≤75 | 75–300 | 300–800 | >800 |
| CO₂ (g) | ≤5 | 5–20 | 20–60 | >60 |

Labels: Light footprint / Notable usage / Heavy usage / Very heavy usage

### Max display scale (bar fill %)

| Resource | Max |
|---|---|
| Energy | 250 Wh |
| Water | 1500 ml |
| CO₂ | 75 g |

### Per-answer resource costs

| Answer type | Energy (Wh) | Water (ml) | CO₂ (g) |
|---|---|---|---|
| H (High impact) | 50 | 500 | 15 |
| B (Balanced) | 15 | 150 | 5 |
| L (Low / conscious) | 2 | 20 | 1 |

Icons on each resource bar are dynamic — they update based on `totalScore` via `getIconStep()`.

---

## Screen Flow

```
[Idle] → [Instructions overlay] → [Screen 0.5: User Info]
       → [Screen 1.1: Ethics × 5] → [Suspense screen (2.5s)]
       → [Ethics Summary + Persona] → [Screen 3: Go Greener]
       → [Screen 4: Print/Download]
```

> **Removed:** Screen 1 (Prompt Selection) no longer exists. The prompt is randomly assigned when the user clicks CONTINUE on the User Info screen.

---

## Screen 0: IDLE / ATTRACT MODE

**State:** No user interaction
**Elements:**
- Language switcher (English / Castilian / Catalan) — top right dropdown
- Game title: `(AI)RCADE`
- Subtitle: `INSERT COIN TO PLAY`
- Tagline: `Every prompt has a footprint.`
- Byte mascot (floating cloud SVG) with rotating speech bubbles
- `▶ PRESS START` button (blink animation)
- `© A(I)RCADE 2025 | ☁ FREE PLAY ☁`

**On PRESS START:** Instructions overlay appears
**Resource bars:** Hidden

---

## Instructions Overlay

Appears over the idle screen after pressing Start.

**Steps shown:**
1. Tell us about you — quick optional profile
2. Pick a task — choose what AI creates
3. Answer 5 ethics questions — shape your AI profile & watch stamina
4. See the footprint — water, energy & CO₂ used
5. Go greener! — personalized tips & downloadable card

**CTA:** `LET'S GO! →` → closes overlay, resets resources to 0, shows Screen 0.5

---

## Screen 0.5: USER INFORMATION

**Purpose:** Personalize the experience; data used only in-session, never stored

**Form fields:**

| Field | Type | Options | Required |
|---|---|---|---|
| Name | Text input | Optional, max 30 chars | No |
| Age | Dropdown | 0–12, 13–19, 20–39, 40–59, 60+ | Yes |
| AI Expertise Level | Dropdown | Beginner, Average, Expert | Yes |

> **Changed from earlier design:** Gender field removed. AI Expertise Level added. Age ranges updated (previously: Under 18, 18–25, 26–35, 36–50, 51–65, 66+).

**Validation:** Both Age and Expertise Level must be selected. Error shown inline: "Please select your age range and expertise level."

**Privacy note:** "🔒 Your information is used only for this session and is not stored or shared."

**On CONTINUE:** A prompt is randomly selected from the 5-prompt pool. The player goes directly to the ethics screen (no prompt selection step).

---

## Screen 1.1: ETHICS QUESTIONS

**Header:** "AI ETHICS CHECK"
**Total questions:** 5 (randomly selected per session from the age × expertise bank)

### Question Bank

**Source:** `questionBank.js`
**Structure:** 15 combinations — 5 age groups × 3 expertise levels, 20 questions each

| Age group | Expertise levels |
|---|---|
| 0–12 | Beginner, Average, Expert |
| 13–19 | Beginner, Average, Expert |
| 20–39 | Beginner, Average, Expert |
| 40–59 | Beginner, Average, Expert |
| 60+ | Beginner, Average, Expert |

**Selection:** `selectQuestionsFromBank(userAge, userExpertise)` picks 5 random questions from the matching bank.

**Answer format (each question):**
- 3 options (A/B/C) shuffled randomly before display
- Each option has type H, B, or L
- Resource costs and score are hidden until after selection
- After selection: color highlight on clicked button, "WHY" card explanation shown, per-question resource feedback panel shown

### Scoring

| Answer type | Score | Meaning |
|---|---|---|
| H (High impact) | −3 | Uncritical / high-resource AI use |
| B (Balanced) | +1 | Moderate / thoughtful use |
| L (Low / conscious) | +4 | Minimal AI use, independent effort |

**Total score range:** −15 to +20 (5 questions × max spread)

### Progress UI

- 5-node Snake & Ladders path on the left side — Byte cloud avatar moves along the path after each answer with FLIP animation
- Dot indicator + "Question X of 5" text
- HP stamina bars (3 bars, top-left) visible during ethics only

### After Question 5

1. Snake path and stamina bars hidden
2. **Suspense screen** shown for 2.5 seconds: Byte with thinking eyes, "CALCULATING YOUR IMPACT..." and animated dots
3. Suspense screen dismissed → Ethics Summary + Persona card revealed

---

## Ethics Summary + Persona

Shown within the ethics screen after Q5. Contains:

### Persona Card

- Persona-specific Byte SVG (with accessory)
- Persona name and tagline
- Score display: `Score: X/20`
- Impact level + score range: `Impact: Low/Medium/High · Score: X (range -15 to +20)`
- Persona description
- Persona-specific tip box

### AI Footprint Summary

Animated fill bars for Energy, Water, CO₂ (using accumulated resource values). Each bar shows: value, reference comparison.

**CTA:** `GET TIPS →` → Screen 3

---

## AI User Personas

6 personas assigned based on cumulative score via `getPersonaFromScore(score)`. Each has a unique Byte cloud SVG accessory.

> **Changed from earlier design:** Persona assignment is now purely score-based, not category-based.

| Score range | Persona | SVG Accessory |
|---|---|---|
| ≥15 | The AI Guardian | Crown (cyan + gems) |
| 10–14 | The Conscious Creator | Sprout / plant |
| 5–9 | The Fairness Advocate | Scales of justice |
| 0–4 | The Privacy Champion | Shield + padlock |
| −5 to −1 | The Pragmatic Explorer | Compass |
| ≤−6 | The Speed Seeker | Lightning bolts + excited eyes |

---

## Loading Screen

**Appears between:** Greener tips → (not used in current flow for mock content; mock delay in `api.js`)
**Content:** Animated Byte with wide excited eyes + lightning bolt, "Byte is working! ⚡", animated dots, prompt preview text
**Duration:** ~1.2 seconds (mock delay)

---

## Screen 3: GO GREENER

**Header:** "GO GREENER! 🌱"
**Byte variant:** Sunglasses + thumbs up + big smile

### Personalized tip (based on worst-impact answer)

Box shown at top: scenario label "⚡ PERSONALISED FOR YOU" + dynamically generated tip text based on answer type:
- H: encourages doing one step offline next time
- B: challenges player to go one step further
- L: encourages sharing the habit

### General Tips Grid

3 tip cards from `data.js` selected by `selectPersonalizedTips(taskType, resources, ethicsAnswers)`.

Each tip card shows: icon, title, description, savings label.

**CTA:** `📄 PRINT MY CARD →` → Screen 4

---

## Screen 4: PRINT / DOWNLOAD

**Header:** "YOUR CARD IS READY! 🖨️"
**Byte variant:** Waving arm + leaf accessory

### Receipt Card (downloadable)

| Field | Source |
|---|---|
| Session ID | Random 6-char alphanumeric |
| Player | `userName` |
| AI Persona | `state.persona.name` |
| Energy / Water / CO₂ | Accumulated from ethics answers |
| Score | `state.totalScore` |
| Smart tip | First tip from `selectPersonalizedTips()` |
| Quote | *"Every prompt has a footprint. Leave a positive one."* |
| QR placeholder | Mock QR grid |
| URL | `aircade.app` |

**Download:** `html2canvas` captures `#receipt-card` as PNG at 2× scale
**Filename:** `aircade-{sessionId}.png`

**CTAs:**
- `⬇ DOWNLOAD AS IMAGE` — triggers html2canvas capture
- `↩ PLAY AGAIN` — full state reset, returns to idle

---

## Multilingual Support

**New feature.** Language switcher on idle screen.

| Code | Language |
|---|---|
| `en` | English (default) |
| `es` | Castilian |
| `ca` | Catalan |

Implemented via `translations.js`. All UI strings use `data-i18n` attributes and `t('key.path')` helper. Falls back to English if a key is missing in the target language.

---

## Sound Effects

**New feature.** `sounds.js` uses Web Audio API (no audio files required — synthesized tones).

| Event | Sound |
|---|---|
| Any button click | `click` |
| Green (L) answer selected | `goodChoice` |
| Red (H) answer selected | `damage` |
| NEXT → pressed (path advance) | `coin` + `levelComplete` |
| After Q5 results | `print` |
| Persona revealed (score ≤−7) | `turbo` |
| Persona revealed (score 1–4) | `casual` |
| Persona revealed (score 5–14) | `mindful` |
| Persona revealed (score ≥15) | `green` |

---

## Byte Mascot

**Character:** Pixel cloud SVG (`160×120` viewBox)
**Base shape:** Cloud body with puffs, two square eyes with shine, smile path
**States:** idle, generating, impact, greener, print
**Speech:** Rotating phrases per state, 4-second interval, pop scale animation

**Persona variants** (unique SVG accessories):
- Guardian: cyan pixel crown
- Conscious Creator: sprouting plant
- Fairness Advocate: balance scales
- Privacy Champion: shield + padlock
- Pragmatic Explorer: compass
- Speed Seeker: double lightning bolts + excited wide eyes

---

## Pre-Generated AI Content

All responses are offline/hardcoded in `api.js`. No API key required.
The prompt is randomly assigned — players do not choose their prompt.

| Prompt | Response type | File/content |
|---|---|---|
| A cat astronaut on Mars | Image | `assets/cat-astronaut.jpg` |
| Birthday poem for my friend turning 30 | Text | Pre-written poem |
| Design ideas for a modern bakery logo with a croissant | Image | `assets/bakery-logo.jpg` |
| How to make tiramisu step by step | Text | Pre-written recipe |
| Plan a dream beach vacation for two weeks | Text | Pre-written description |

Mock delay: 1.2 seconds (theatrical loading experience)

---

## Data Files (inline in JS)

| Module | Purpose | Records |
|---|---|---|
| `questionBank.js` | Age × expertise ethics question bank | 15 sets × 20 questions = 300 questions |
| `data.js` | Resource thresholds, metrics, tips, DYK facts, comparisons | — |
| `translations.js` | All UI strings in en / es / ca | — |

---

## Not Yet Implemented / Deferred

| Feature | Status | Notes |
|---|---|---|
| Live Claude API | Deferred | Mock responses used instead |
| Idle timeout (30s reset) | Deferred | Low priority for installation |
| Thermal printer integration | Out of scope (hardware) | — |
| PWA / offline caching | Not implemented | Runs fine as local file |
| Repeat-question prevention | Not implemented | 5 questions from 20 makes repeats rare |

---

## Design Principles

- **Never preachy** — facts not lectures; "you could" not "you should"
- **Playful tone** — arcade energy, Byte is a cheerful guide
- **No shame** — persona descriptions are warm even for high-impact players
- **No gaming** — resource costs hidden until answer selected; answer order shuffled
- **Accessible** — ARIA roles on progress bars, error toast for failures
- **Multilingual** — full UI available in English, Castilian, and Catalan
