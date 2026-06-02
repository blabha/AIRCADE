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

A playful, educational arcade-style experience that teaches people about the environmental cost of AI usage and the ethical implications of AI use — showing them how to make greener and smarter choices without guilt-tripping.

**Core Takeaway:**
> *"AI is an amazing tool — and like any tool, using it thoughtfully makes all the difference for our planet."*

---

## Technical Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (no framework) |
| **Fonts** | Press Start 2P (Google Fonts) — pixel/arcade aesthetic |
| **Image capture** | html2canvas (CDN) — for ticket card download |
| **AI generation** | Pre-generated offline (no live API) |
| **Backend** | None — fully static, runs as local HTML file |
| **Deployment** | Static file, no server required |
| **i18n** | Built-in translation system (English, Castilian, Catalan) |
| **Sound** | Web Audio API via `sounds.js` |

### File Structure
```
AIRCADE/
├── index.html          # All screen HTML
├── styles.css          # All styles
├── script.js           # Screen logic, state, events
├── data.js             # Resource thresholds, metrics, tips, DYK, personas, getPersonalizedTip
├── questionBank.js     # Age × expertise question bank (15 sets × 20 questions)
├── translations.js     # i18n strings (en / es / ca)
├── sounds.js           # Sound effects (Web Audio API)
├── api.js              # Mock AI responses (offline)
├── byte.js             # Byte mascot speech logic
├── print.js            # Ticket card population + download
└── assets/
    ├── cat-astronaut.jpg
    └── bakery-logo.jpg
```

---

## App State

```javascript
const state = {
  screen: 'idle',
  prompt: '',            // randomly assigned on CONTINUE
  taskType: 'text-short',
  metrics: null,
  sessionId: generateSessionId(),
  score: 0,              // cumulative score from ethics answers (-15 to +20)
  staminaLevel: 3,       // 1–5, starts at 3 (medium tree), updates after each answer
  userName: '',
  userAge: '',           // e.g. '13-19'
  userExpertise: '',     // 'Beginner' | 'Average' | 'Expert'
  ethicsAnswers: [],     // [{ category, letter, color, type, score }]
  currentQuestions: [],  // 5 selected for this session
  currentQuestionIndex: 0,
  persona: null          // assigned after all 5 ethics questions
};
```

---

## Screen Flow

```
[Screen 0: Idle]
    ↓ Press Start
[Instructions Overlay]
    ↓ Let's Go
[Screen 0.5: User Info]
    ↓ Continue
[Screen 1.1: Ethics Questions × 5]
    ↓ After Q5
[Screen 2: Persona Reveal]
    ↓ Go Green
[Screen 3: Personalized Tip]
    ↓ Print Your Ticket
[Screen 4: Ticket Download]
    ↓ Play Again → Screen 0
```

> **Removed from previous version:** Prompt Selection screen (Screen 1), Stamina bar (3-bar resource system), Snake & Ladders progress path, Ethics Summary inside ethics screen, Suspense screen, Loading screen, Impact screen (Screen 2), Tips grid (3 tips). All replaced by the new flow above.

---

## Screen 0: IDLE / ATTRACT MODE

**Elements:**
- Language switcher (top right): English / Castilian / Catalan dropdown
- Game title: `A(I)RCADE` (center, large pixel font)
- Subtitle: `INSERT COIN TO PLAY` (blinking)
- Tagline: `Every prompt has a footprint.`
- Byte mascot (floating cloud SVG) with rotating speech bubbles every 4s
- `▶ PRESS START` button (blinking)
- Footer: `© A(I)RCADE 2025 | ☁ FREE PLAY ☁`

**On PRESS START:** Instructions overlay appears

---

## Instructions Overlay

**Steps:**
1. Tell us about you — Quick optional profile
2. Answer 5 ethics questions — Shape your AI profile & watch your stamina tree grow
3. Discover your persona — See what kind of AI user you are
4. Get your personalized tip — Learn how to go greener
5. Print your ticket — Take home your journey card

**CTA:** `LET'S GO! →` — resets game state, navigates to Screen 0.5

---

## Screen 0.5: USER INFORMATION

**Form fields:**

| Field | Type | Required |
|---|---|---|
| Name | Text input (max 30 chars) | No |
| Age | Dropdown: 0–12, 13–19, 20–39, 40–59, 60+ | Yes |
| AI Expertise Level | Dropdown: Beginner, Average, Expert | Yes |

**Validation:** Both Age and Expertise must be selected (inline error shown).

**On CONTINUE:**
- Stores `userName`, `userAge`, `userExpertise` in state
- Randomly assigns one of the 5 prompts from the prompt pool
- Calls `selectQuestionsFromBank(userAge, userExpertise)` → 5 questions
- Navigates to Screen 1.1

---

## Screen 1.1: ETHICS QUESTIONS

### Layout
- **Cloud path** — horizontal band at top of screen with three drifting decorative clouds; Byte cloud mascot travels from left to right along the path, advancing 20% per question
- **Stamina tree bar** — fixed top-left position; shows tree emoji (🌱→🌿→🌲→🌳→🌳✨) and "Stamina: X/5"
- **Question card** — glass panel (frosted blur effect) with category badge, question text, and answer buttons
- **Answer buttons** — glass panels stacked vertically, shuffled per question

### Question Bank (`questionBank.js`)
15 combinations: 5 age groups × 3 expertise levels, 20 questions each.

**Selection:** `selectQuestionsFromBank(userAge, userExpertise)` — Fisher-Yates shuffle, pick 5.

**Question format:**
```
How do you use AI? For [scenario].
  A: [text]  type: H/B/L
  B: [text]  type: H/B/L
  C: [text]  type: H/B/L
```

### Scoring (`Scoring_Logic.md`)

| Answer type | Score |
|---|---|
| H (High impact) | −3 |
| B (Balanced) | +1 |
| L (Low / conscious) | +4 |

**Total score range:** −15 to +20

### Stamina Tree (`calculateStaminaLevel`)

| Score | Level | Emoji |
|---|---|---|
| ≤−8 | 1 | 🌱 |
| −7 to −2 | 2 | 🌿 |
| −1 to 4 | 3 | 🌲 |
| 5 to 12 | 4 | 🌳 |
| ≥13 | 5 | 🌳✨ |

Tree starts at level 3. Updates with a pop animation after each answer.

### After Answer Selection
- Selected button highlights: green (L), yellow (B), red (H) border glow
- **WHY card** appears below buttons with generic explanation per type:
  - H: "This option relies heavily on AI, which uses significantly more energy and water…"
  - B: "This is a balanced approach — using AI where it helps…"
  - L: "Great choice! Doing tasks yourself or minimising AI use has a much lighter footprint…"
- **NEXT →** button appears; on click, plays coin sound, advances Byte traveler, loads next question

### After Q5
- Plays `levelComplete` sound
- Navigates directly to Screen 2 (Persona Reveal)

---

## Screen 2: PERSONA REVEAL

Shows the player's AI persona based on cumulative score.

**Elements:**
- Large Byte avatar (persona variant, 200×150px, floating animation)
- Persona name (pixel font, neon cyan)
- Persona tagline
- Glass panel with persona description + "Score: X/20"
- `GO GREEN →` button

### Persona Mapping (`Scoring_Logic.md`)

| Score | Persona | Byte Accessory | Sound |
|---|---|---|---|
| ≥18 | Sustainable Sage | Crown + gems | green |
| 15–17 | Green Hacker | Sunglasses (green) | green |
| 10–14 | Mindful Maker | Sprout / leaf | mindful |
| 5–9 | Eco Experimenter | Compass ring | mindful |
| −1 to 4 | Casual Clicker | Neutral (~) | casual |
| −7 to −2 | Turbo Tapper | Lightning bolts | casual |
| ≤−8 | Grid Goblin | Skull crown | turbo |

---

## Screen 3: PERSONALIZED TIP

**Elements:**
- Greener hero row: Byte with sunglasses + thumbs up + "GO GREENER! 🌱" heading
- Single tip card (glass panel, neon-green border):
  - Badge: "⚡ PERSONALIZED FOR YOU"
  - Tip text (2–4 sentences)
- `PRINT YOUR TICKET →` button

### Tip Selection (`Personalized_Tips.md`)

**Algorithm:**
1. Find the answer with the highest negative impact (type H with lowest score)
2. If no H answers, use last answer
3. Match scenario keyword → specific tip text:
   - `homework` → study-first tip
   - `read/stor/writ` → write-yourself tip
   - `draw/art/image/creat` → sketch-first tip
   - `research/science/project` → sources-first tip
   - `cod/website/app` → debug-only tip
   - fallback → generic H tip
4. Type B → balanced challenge tip
5. Type L → share-your-habit tip

---

## Screen 4: TICKET DOWNLOAD

**Elements:**
- Header: "YOUR TICKET IS READY! 🖨️"
- Byte (small, waving + leaf accessory)
- Ticket card (white, ticket-stub aesthetic with perforated top/bottom edges)
- Download + Play Again buttons

### Ticket Card Content

| Field | Source |
|---|---|
| Session ID | `#XXXXXX` |
| Player | `state.userName` (or "Anonymous") |
| Persona byte | Mini Byte SVG (persona variant) |
| Persona name | `state.persona.title` |
| Score | `state.score + '/20'` |
| Final Stamina | `state.staminaLevel + '/5'` |
| Go Green Tip | `getPersonalizedTip(ethicsAnswers, persona)` (truncated to 140 chars) |
| Quote | "Every prompt has a footprint. Leave a positive one." |
| QR placeholder | Mock pixel grid |
| URL | `aircade.app` |

**Download:** `html2canvas` at 2× scale → `aircade-{sessionId}.png`

---

## Stamina Tree System

Replaces the previous 3-bar resource accumulator.

- Single tree graphic updates after each ethics answer
- Starts at level 3 (medium tree) every session
- Score range −15 → +20 maps to levels 1–5
- Pop animation (`tree-pop` CSS class) on each change
- Shown only during Screen 1.1 (top-left, fixed position)

---

## Byte Cloud Traveler

Replaces the Snake & Ladders path from the previous version.

- Small Byte cloud SVG slides horizontally across a cloud-path band at the top of Screen 1.1
- Position: `left: 0%` at Q1, increments by ~17% per question, reaches ~85% at Q5
- Animated with CSS `transition: left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`
- Three decorative background clouds drift slowly with CSS animation

---

## Multilingual Support

Language switcher on idle screen.

| Code | Language |
|---|---|
| `en` | English (default) |
| `es` | Castilian |
| `ca` | Catalan |

All UI strings use `data-i18n` attributes and `t('key.path')` helper. Falls back to English.

---

## Sound Effects (`sounds.js`)

| Event | Sound |
|---|---|
| Any button click | `click` |
| L (low-impact) answer selected | `goodChoice` |
| H (high-impact) answer selected | `damage` |
| NEXT → pressed | `coin` |
| After Q5 → persona reveal | `levelComplete` |
| Ticket screen opens | `print` |
| Persona: score ≤−7 | `turbo` |
| Persona: score −1 to 4 | `casual` |
| Persona: score 5–14 | `mindful` |
| Persona: score ≥15 | `green` |

---

## Reference Files (Do Not Modify)

| File | Purpose |
|---|---|
| `Question_Bank.md` | Source of truth for ethics questions by age × expertise |
| `Scoring_Logic.md` | Score formula, persona table, ethical scoring layer |
| `Personalized_Tips.md` | Tip text by scenario + answer type |

---

## Not Yet Implemented / Deferred

| Feature | Status | Notes |
|---|---|---|
| Live Claude API | Deferred | Mock responses used instead |
| Idle timeout (30s reset) | Deferred | Low priority for installation |
| Thermal printer integration | Out of scope (hardware) | — |
| PWA / offline caching | Not implemented | Runs fine as local file |

---

## Design Principles

- **Never preachy** — facts not lectures; "you could" not "you should"
- **Playful tone** — arcade energy, Byte is a cheerful guide
- **No shame** — persona descriptions are warm even for high-impact players
- **No gaming** — answer order shuffled; impact hidden until after selection
- **Accessible** — ARIA labels on progress elements, error toast for failures
- **Multilingual** — full UI in English, Castilian, and Catalan
