# (Ai)rcade — Product Requirements Document
### Status: **IMPLEMENTED** — Last updated 2026-06-14

---

## Project Overview

| Field | Value |
|---|---|
| **Product Name** | (Ai)rcade |
| **Tagline** | "Every prompt has a footprint. Leave a positive one." |
| **Format** | Interactive web application (laptop/tablet, full-viewport) |
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
| **Data collection** | Supabase REST API (direct fetch, no library) — fire-and-forget, silent on error |

### File Structure
```
AIRCADE/
├── index.html          # All screen HTML
├── styles.css          # All styles
├── script.js           # Screen logic, state, events, game loop
├── data.js             # Personas, tips, DAILY_FOOTPRINT, calculateStaminaLevel, getPersonalizedTip
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
  score: 0,              // cumulative score from ethics answers (−15 to +20)
  staminaLevel: 3,       // 1–5, starts at 3, updates after each answer
  personalizedTip: '',   // cached after Screen 3, reused for ticket
  userName: '',
  userAge: '',           // '0-12' | '13-19' | '20-39' | '40-59' | '60+'
  userExpertise: '',     // 'Beginner' | 'Average' | 'Expert'
  userGender: '',        // 'Female' | 'Male' | 'Non-binary' | 'Other' | '' (optional)
  ethicsAnswers: [],     // [{ category, letter, color, type, score }]
  currentQuestions: [],  // 5 selected for this session
  currentQuestionIndex: 0,
  persona: null          // assigned after all 5 ethics questions
};
```

---

## Screen Flow

```
[Screen −1: Language Select]
    ↓ Choose language (EN / ES / CA)
[Screen 0: Idle / Attract Mode]
    ↓ Press Start
[Instructions Overlay]
    ↓ Let's Go
[Screen 0.5: User Info]
    ↓ Continue
[Screen 1.1: Ethics Questions × 5]  ← platformer game (Chrome Dino style)
    ↓ After Q5
[Screen 2: Persona Reveal]
    ↓ Go Green
[Screen 3: Personalized Tip]
    ↓ Print Your Ticket
[Screen 4: Ticket Download]
    ↓ Play Again → Screen 0
```

---

## Screen −1: LANGUAGE SELECT

**Shown first, before Idle.** Full-screen card with three language buttons:
- English
- Castellano
- Català

Calls `setLanguage(lang)` (defined in `translations.js`), then navigates to Idle. Language persists for the entire session; can be changed only by reloading.

---

## Screen 0: IDLE / ATTRACT MODE

**Elements:**
- Game title: `(Ai)rcade` (center, large pixel font; "(Ai)" in hot pink, "rcade" in neon cyan)
- Subtitle: `INSERT COIN TO PLAY` (blinking yellow)
- Tagline: `Every prompt has a footprint.`
- Byte mascot (floating cloud SVG) with rotating speech bubbles every 4 s
- `▶ PRESS START` button (blinking)
- Footer: `© (Ai)rcade 2025 | ☁ FREE PLAY ☁`

**On PRESS START:** Instructions overlay appears.

---

## Instructions Overlay

**Steps shown (4 steps, describing the platformer game itself):**
1. **MOVE** — Use ← → arrow keys to move Byte
2. **JUMP** — Press ↑ or SPACE to jump onto ? blocks
3. **CRUSH** — Land on a ? block to trigger a question
4. **ANSWER** — Answer 5 questions to discover your AI persona

All step text is translated via the `data-i18n` system (`ui.step1title`, `ui.step1desc` … `ui.step4title`, `ui.step4desc`).

**CTA:** `LET'S GO! →` — resets game state, navigates to Screen 0.5.

---

## Screen 0.5: USER INFORMATION

**Form fields:**

| Field | Type | Required |
|---|---|---|
| Name | Text input (max 30 chars) | No |
| Age | Custom selector: 0–12, 13–19, 20–39, 40–59, 60+ | Yes |
| AI Expertise Level | Custom selector: Beginner, Average, Expert | Yes |
| Gender | Custom selector: Female, Male, Non-binary, Other, Prefer not to say | No |

**Custom selectors:** All three dropdowns are implemented as custom DOM components (`.custom-sel` divs with `tabindex="0"` and injected `.custom-sel-dropdown`). No native `<select>` elements. Each selector:
- Opens its dropdown automatically when it receives focus
- Closes on ESC (focus stays on the selector)
- Closes on click-outside

**Keyboard flow (linear, no TAB jumping):**
1. ENTER on Name → focuses Age selector → dropdown opens automatically
2. Confirm Age → focuses Expertise selector → dropdown opens automatically
3. Confirm Expertise → focuses Gender selector → dropdown opens automatically
4. Confirm Gender → focuses CONTINUE button
5. TAB also works (same auto-open behavior via focus event)

**Validation:** Age and Expertise must be selected; inline error shown if not.

**On CONTINUE:**
- Stores `userName`, `userAge`, `userExpertise`, `userGender` in state
- Randomly assigns one of 5 prompts from the prompt pool
- Calls `selectQuestionsFromBank(userAge, userExpertise)` → 5 questions
- Submits session data to Supabase (fire-and-forget)
- Navigates to Screen 1.1

---

## Screen 1.1: ETHICS QUESTIONS (Platformer Game)

Screen 1.1 is a Chrome Dino-style DOM platformer. The player controls **Byte** (a character sprite) across a scrolling world. Five `?` blocks are placed at increasing horizontal distances. Landing on a `?` block triggers a question overlay. After answering all 5 questions the game ends and the app moves to Screen 2.

### Game Engine (`game` object in `script.js`)

- `requestAnimationFrame` loop with `game.start()` / `game.stop()`
- Physics: gravity, jump force, ground collision, block top-landing detection
- Byte moves left/right with arrow keys; jumps with ↑ or SPACE
- A `_keyHandler` on `document` is added by `game.start()` and removed by `game.stop()`
- Screen guard inside `_keyHandler`: `if (state.screen !== 'ethics') return;` — prevents the handler from consuming key events on any other screen

### Layout (top to bottom)

1. **Mario HUD** — full-width dark header strip with scanline overlay; shows 3 pixel-segment bars:
   - 💧 WATER — 5 blue pixel blocks
   - 🌿 CO₂ — 5 green pixel blocks
   - ⚡ ENERGY — 5 yellow pixel blocks
   - Each bar starts at 3/5 filled. Updates with a pop animation after every answer.

2. **Cloud path** — 64 px sky band; Byte cloud SVG travels left → right across it. START label at left, FINISH at right. Three decorative clouds drift in background.

3. **Progress indicator** — "Question X of 5" text + 5 dot indicators (pending / active / done).

4. **Question card** — frosted glass panel (`backdrop-filter: blur`), fills remaining screen height. Contains:
   - Category badge (scenario name, pixel font)
   - Question text
   - 3 answer buttons (shuffled order each question)
   - WHY card (hidden until answer selected)
   - NEXT → button (hidden until answer selected)

A scrolling dashed ground line animates at the bottom of the screen (Mario runner aesthetic).

### Question Bank (`questionBank.js`)
15 combinations: 5 age groups × 3 expertise levels, 20 questions each.

**Selection:** `selectQuestionsFromBank(userAge, userExpertise)` — Fisher-Yates shuffle, pick 5.

### Scoring

| Answer type | Score |
|---|---|
| H — High impact | −3 |
| B — Balanced | +1 |
| L — Low / conscious | +4 |

**Total score range:** −15 to +20

### Stamina HUD (`calculateStaminaLevel`)

| Score | Level | Bars filled |
|---|---|---|
| ≤ −8 | 1 | ■□□□□ |
| −7 to −2 | 2 | ■■□□□ |
| −1 to 4 | 3 | ■■■□□ |
| 5 to 12 | 4 | ■■■■□ |
| ≥ 13 | 5 | ■■■■■ |

All three bars (Water, CO₂, Energy) update together to the same level after each answer. Level starts at 3. Pop animation on change.

### After Answer Selection
- All answer buttons disabled. Selected button stays visually identical (no color reveal). Non-selected buttons dim to 60% opacity.
- **WHY card** appears below buttons with a neon-cyan left border and generic explanation per type (H / B / L).
- **NEXT →** button appears. On click: coin sound plays, Byte advances along cloud path, next question loads.

### Sound on answer
- L answer → `goodChoice` sound
- H answer → `damage` sound
- B answer → `click` sound

### After Q5
- `levelComplete` sound plays
- Navigates to Screen 2 (Persona Reveal)

---

## Screen 2: PERSONA REVEAL

**Elements:**
- Persona-variant Byte avatar (200×150 px, floating animation)
- Persona name (pixel font, neon cyan)
- Persona tagline (italic, neon yellow)
- Glass panel with persona description + "Score: X/20"
- `GO GREEN →` button

### Persona Mapping

| Score | Persona | Sound |
|---|---|---|
| ≥ 18 | Sustainable Sage | green |
| 15–17 | Green Hacker | green |
| 10–14 | Mindful Maker | mindful |
| 5–9 | Eco Experimenter | mindful |
| −1 to 4 | Casual Clicker | casual |
| −7 to −2 | Turbo Tapper | casual |
| ≤ −8 | Grid Goblin | turbo |

---

## Screen 3: PERSONALIZED TIP

**Elements:**
- Hero row: Byte with sunglasses + thumbs up + "GO GREENER! 🌱" heading
- Single tip card (frosted glass, neon-green border):
  - Badge: "⚡ PERSONALIZED FOR YOU"
  - Tip text (2–4 sentences, cached in `state.personalizedTip`)
- `PRINT YOUR TICKET →` button

### Tip Algorithm (`getPersonalizedTip` in `data.js`)
1. Find the worst H answer (lowest score among type-H answers)
2. If no H answers, use the last answer
3. Match `answer.category` keyword → specific tip:
   - `homework` → study-first tip
   - `learn / read / stor / writ` → write-yourself tip
   - `draw / art / image / creat` → sketch-first tip
   - `research / science / project` → sources-first tip
   - `cod / website / app` → debug-only tip
   - fallback → generic H tip
4. Type B → balanced challenge tip
5. Type L → share-your-habit tip

---

## Screen 4: TICKET DOWNLOAD

**Elements:**
- Header: "YOUR TICKET IS READY! 🖨️"
- Byte (small, waving + leaf accessory)
- White ticket card with perforated-edge aesthetic (captured by html2canvas)
- `🖨 PRINT TICKET` button (auto-focused on load)
- `↩ PLAY AGAIN` button

### Keyboard Navigation (Screen 4)
- Screen loads → `PRINT TICKET` auto-focused (neon cyan glow)
- ↑ / ↓ arrow keys (or TAB / SHIFT+TAB) move focus between the two buttons
- ENTER or SPACE activates the focused button
- Focused button shows neon cyan outline glow via `:focus` CSS

### Ticket Card Content

| Field | Source |
|---|---|
| Session ID | `#XXXXXX` (random, regenerated on each ticket print) |
| Player | `state.userName` (or "Anonymous") |
| Persona byte | Mini Byte SVG (persona variant) |
| Persona name | `state.persona.title` |
| Score | `state.score + '/20'` |
| Final Stamina | `state.staminaLevel + '/5'` |
| Est. Daily AI Footprint | Water / CO₂ / Energy per stamina level (see table below) |
| Go Green Tip | `state.personalizedTip` (truncated to 140 chars) |
| Quote | "Every prompt has a footprint. Leave a positive one." |
| QR placeholder | Mock 3×3 pixel grid |
| URL | `aircade.app` |

### Daily Footprint Values (`DAILY_FOOTPRINT` in `data.js`)

| Stamina Level | 💧 Water | 🌿 CO₂ | ⚡ Energy |
|---|---|---|---|
| 1 (heaviest) | 3.5 L/day | 520 g/day | 0.80 kWh/day |
| 2 | 2.5 L/day | 380 g/day | 0.58 kWh/day |
| 3 (default) | 1.5 L/day | 230 g/day | 0.35 kWh/day |
| 4 | 0.8 L/day | 110 g/day | 0.18 kWh/day |
| 5 (lightest) | 0.3 L/day | 35 g/day | 0.06 kWh/day |

**Download:** `html2canvas` at 2× scale → `aircade-{sessionId}.png`

---

## Mario HUD — Stamina Bar System

- Three pixel-segment bars (Water, CO₂, Energy), each with 5 blocks
- All three bars represent the same stamina level (score-derived) — they move in sync
- Level 3 (centre) at session start; increases toward 5 with ethical answers, decreases toward 1 with high-impact answers
- Pop animation (`segPop` keyframe) on every level change
- Visible only on Screen 1.1, inside the top HUD strip

---

## Byte Cloud Traveler

- Small Byte cloud SVG on the cloud-path band (Screen 1.1 only)
- Position: `left: 0%` at Q1, advances ~17% per question, reaches ~85% at Q5
- CSS transition: `left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`
- Three decorative background clouds drift slowly via CSS animation

---

## Multilingual Support

Language selected on Screen −1 before Idle.

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
| L answer selected | `goodChoice` |
| H answer selected | `damage` |
| NEXT → pressed | `coin` |
| After Q5 | `levelComplete` |
| Ticket screen opens | `print` |
| Persona: score ≤ −8 | `turbo` |
| Persona: score −7 to 4 | `casual` |
| Persona: score 5–14 | `mindful` |
| Persona: score ≥ 15 | `green` |

---

## Keyboard Controls

| Screen | Key | Action |
|---|---|---|
| Any | TAB | Move focus forward |
| Screen 0 | ENTER / SPACE | Press Start |
| Screen 0.5 | ENTER on Name field | Focus Age selector, open dropdown |
| Screen 0.5 | ENTER on open dropdown | Confirm selection, advance to next field |
| Screen 0.5 | ESC on open dropdown | Close dropdown, keep focus on selector |
| Screen 0.5 | TAB | Advance through Name → Age → Expertise → Gender → CONTINUE |
| Screen 1.1 | ← → | Move Byte left / right |
| Screen 1.1 | ↑ or SPACE | Jump |
| Screen 4 | ↑ / ↓ | Move focus between PRINT TICKET and PLAY AGAIN |
| Screen 4 | ENTER / SPACE | Activate focused button |

---

## Data Collection

Session data is submitted to Supabase after the user clicks CONTINUE on Screen 0.5.

**Endpoint:** `https://tpacbxkobtekehqrgodd.supabase.co/rest/v1/aircade_sessions`
**Method:** POST (direct `fetch`, no Supabase client library)
**Auth:** `apikey` header with publishable key

**Fields collected:**

| Field | Value |
|---|---|
| `session_id` | `state.sessionId` |
| `user_name` | `state.userName` (may be empty) |
| `user_age` | `state.userAge` |
| `user_expertise` | `state.userExpertise` |
| `user_gender` | `state.userGender` (may be empty) |
| `score` | `state.score` |
| `stamina_level` | `state.staminaLevel` |
| `persona` | `state.persona.title` |
| `ethics_answers` | JSON array of answer objects |
| `language` | active language code |
| `created_at` | server timestamp |

**Error handling:** All errors are silent to the player. The POST is fire-and-forget and does not block the game flow.

---

## Reference Files (Do Not Modify)

| File | Purpose |
|---|---|
| `Question_Bank.md` | Source of truth for ethics questions by age × expertise |
| `Scoring_Logic.md` | Score formula, persona table |
| `Personalized_Tips.md` | Tip text by scenario + answer type |
| `Persona_Tips.md` | Per-persona tip text and mascot descriptions |

---

## Not Yet Implemented / Deferred

| Feature | Status | Notes |
|---|---|---|
| Live Claude API | Deferred | Mock responses used instead |
| Idle timeout (30 s reset) | Deferred | Low priority for installation |
| Thermal printer integration | Out of scope (hardware) | — |
| PWA / offline caching | Not implemented | Runs fine as local file |
| Supabase schema enforcement | Not implemented | Table accepts arbitrary JSON fields |

---

## Design Principles

- **Never preachy** — facts not lectures; "you could" not "you should"
- **Playful tone** — arcade energy, Byte is a cheerful guide
- **No shame** — persona descriptions are warm even for high-impact players
- **No gaming** — answer order shuffled; impact type hidden until after selection; no color coding on selected answer
- **Accessible** — ARIA labels on progress elements, error toast for failures
- **Multilingual** — full UI in English, Castilian, and Catalan
