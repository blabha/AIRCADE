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
| **Installation** | Laser-cut arcade cabinet with keyboard-only controls (no mouse, no touch) |

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
| **QR code** | qrcode-generator@1.4.4 (CDN) — renders session-specific QR to canvas |
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
├── print.js            # Ticket card population + QR generation + download
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
    ↓ Press Start → Instructions Overlay
    ↓ Let's Go
[Screen 0.5: User Info]
    ↓ Continue
[Screen 1.05: How To Play]
    ↓ Let's Go
[Screen 1.1: Ethics Questions × 5]  ← Chrome Dino-style platformer
    ↓ After Q5
[Screen 2: Persona Reveal]
    ↓ Go Green → session saved to Supabase
[Screen 3: Ticket Download]
    ↓ Print Ticket → thank-you overlay (3 s) → Screen −1
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

**On PRESS START:** Instructions overlay appears. Step text is set dynamically by JS (overrides `data-i18n` text at runtime).

---

## Instructions Overlay

**Steps shown (4 steps, set dynamically in `btn-start` click handler):**
1. **DODGE!** — Jump over data centers!
2. **HIT ?** — Hit ? blocks to answer questions
3. **ANSWER** — Answer 5 questions
4. **PERSONA** — Discover your AI persona

All step elements use `data-i18n` attributes but their text is overwritten by JS on overlay open.

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
- Navigates to Screen 1.05 (How To Play)

---

## Screen 1.05: HOW TO PLAY

Static instruction screen. Shows jump controls and object key. Includes a lives section (`howtoplay-lives`) and a "scroll off screen" row — both are hidden at runtime by JS (no lives system, no scroll-off penalty).

**CTA:** `LET'S GO! →` — starts the demo game sequence.

---

## Screen 1.1: ETHICS QUESTIONS (Platformer Game)

Screen 1.1 is a Chrome Dino-style DOM platformer. The world auto-scrolls left; Byte stays near the left side of the screen. Five zones (one per question) each contain 5 datacenter obstacles and 3 `?` blocks. Hitting a `?` block triggers a question overlay. After answering all 5 questions the game ends and the app moves to Screen 2. **The game never stops or shows game over — the player always completes all 5 questions.**

### Zone System

- 5 zones, one per question, each `ZONE_WIDTH = 4000` px wide in world-space
- Pattern per zone: `[dc, dc, block, dc, block, dc, block, dc]` — 5 datacenters + 3 `?` blocks
- After answering, camera jumps to the start of the next zone; Byte resets to ground at home X
- Blocks that scroll past the left edge are silently retired — no penalty

### Datacenter Obstacles

- Canvas-drawn pixel-art buildings (80×55 px) — decorative, non-blocking
- Collision: OUCH! flash + damage sound + 60-frame cooldown only. No life loss, no game stop.

### Physics & Speed Constants

| Constant | Value | Notes |
|---|---|---|
| `GRAVITY` | 0.6 | px/frame² |
| `JUMP_FORCE` | −14 | upward velocity on jump |
| `JUMP_VX` | 6.0 | horizontal velocity on arc jump |
| `BASE_SCROLL_SPEED` | 5.0 | px/frame at Q1 |
| `SPEED_MULTIPLIERS` | [1.0, 1.1, 1.2, 1.3, 1.5] | per question index (Q1–Q5) |
| `ZONE_WIDTH` | 4000 | world-space px per question zone |

### Game Engine (`game` object in `script.js`)

- `requestAnimationFrame` loop — `game.init()` starts it, `game.stop()` cancels it
- Physics: gravity, jump force, ground collision, block top-landing and hit-from-below detection
- Byte jumps with ↑ or SPACE; ↑+→ held together gives a horizontal arc jump
- A `_keyHandler` on `document` is added by `game.init()` and removed by `game.stop()`
- Screen guard inside `_keyHandler`: `if (state.screen !== 'ethics') return;` — prevents the handler from consuming key events on any other screen
- When overlay is open: `_overlayOpen = true`, `_update()` returns immediately, overlay receives all key events natively

### Demo Mode

Before `startEthicsQuestions()` runs, a scripted demo plays:
1. **act1_scroll** — datacenter scrolls to center; bubble: "Jump over these! ↑+→ to arc jump"
2. **act1_bubble** — 90-frame pause, bubble visible
3. **act1_resume** — datacenter scrolls off-screen
4. **act2_scroll** — `?` block scrolls to center; bubble: "Hit these to open question!"
5. **act2_bubble** — 90-frame pause
6. **act2_question** — player can hit the block; demo question overlay opens (score NOT recorded)
7. **ready** — "PRESS ↑ TO START" panel shown; any movement key starts the real game

Demo question uses a real question from the bank; any answer continues the demo (no scoring).

### Layout (top to bottom)

1. **Mario HUD** — full-width dark header strip; shows 3 pixel-segment bars (Water / CO₂ / Energy)
2. **Game World** — scrolling platformer canvas with stars, moon, clouds parallax background
3. **Controls hint** — bottom-right glass panel: `←→ MOVE` and `↑ JUMP` (CRUSH BLOCK row removed at runtime)
4. **Question Overlay** — glass panel pair: left = question + answers, right = WHY card + CONTINUE

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

### Stamina HUD

| Score | Level | Bars filled |
|---|---|---|
| ≤ −8 | 1 | ■□□□□ |
| −7 to −2 | 2 | ■■□□□ |
| −1 to 4 | 3 | ■■■□□ |
| 5 to 12 | 4 | ■■■■□ |
| ≥ 13 | 5 | ■■■■■ |

All three bars (Water, CO₂, Energy) update together to the same level after each answer. Level starts at 3. Pop animation on change. Per-answer: H → −1 bar, B → neutral, L → +1 bar.

### Question Overlay Timing

| Event | Delay |
|---|---|
| `_crushBlock` shows overlay after block collision | 150 ms |
| First answer button auto-focus after overlay appears | 300 ms |
| `btn-next-question` re-enable debounce | 200 ms |
| `react()` Byte animation (star-jump / damage / nod) | 500 ms |
| Demo speech bubble display | 90 frames (~1.5 s at 60 fps) |

### Overlay Close (CONTINUE)
- `advanceQuestion()` adds CSS class `.fade-out` on `#q-overlay` — 150 ms fade animation
- `_overlayOpen` remains `true` during the fade — game loop stays paused
- After 150 ms: overlay hidden, `game.walkForward()` called
- `walkForward()` resets Byte to ground at home X position and jumps the camera to the next zone start; then calls the provided callback
- `_overlayOpen` is set to `false` inside `walkForward()`

### After Answer Selection
- All answer buttons disabled. Non-selected buttons dim to 60% opacity.
- **WHY card** appears with a generic explanation per type (H / B / L).
- **CONTINUE →** button appears. On click: coin sound plays, overlay fades out, next question loads.

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
- Persona-variant Byte avatar (floating animation)
- Persona name (pixel font, neon cyan)
- Persona tagline (italic, neon yellow)
- Glass panel with persona description + `Score: X/35`
- `GO GREEN →` button

**On GO GREEN:** regenerates `sessionId`, populates ticket card, saves session to Supabase, navigates to Screen 3.

### Persona Mapping (`getPersonaFromScore` in `data.js`)

| Score | Persona |
|---|---|
| ≥ 18 | Sustainable Sage |
| 15–17 | Green Hacker |
| 10–14 | Mindful Maker |
| 5–9 | Eco Experimenter |
| −1 to 4 | Casual Clicker |
| −7 to −2 | Turbo Tapper |
| ≤ −8 | Grid Goblin |

### Persona Sound

| Score threshold | Sound |
|---|---|
| ≤ 7 | `turbo` |
| 8–19 | `casual` |
| 20–29 | `mindful` |
| ≥ 30 | `green` |

---

## Screen 3: TICKET DOWNLOAD

**Elements:**
- Header: "YOUR TICKET IS READY! 🖨️"
- Byte (small, waving + leaf accessory)
- White ticket card (captured by html2canvas)
- `🖨 PRINT TICKET` button (auto-focused on screen load)

**On PRINT TICKET:** `downloadCard()` runs, then `showThankYouAndReset()` — a thank-you overlay appears for 3 seconds, then full state reset and navigation to Screen −1 (Language Select).

### Keyboard Navigation (Screen 3)
- Screen loads → `PRINT TICKET` button auto-focused (neon cyan glow via `:focus` CSS)
- ENTER or SPACE activates the button

### Ticket Card Content

| Field | Source |
|---|---|
| Session ID | `SESSION: #XXXXXX` (regenerated on GO GREEN click) |
| Player | `state.userName` (or "Anonymous") |
| Persona byte | Mini Byte SVG (persona variant) |
| Persona name | `state.persona.title` |
| Score | `state.score + '/35'` |
| Final Stamina | `state.staminaLevel + '/5'` |
| Est. Daily AI Footprint | Water / CO₂ / Energy per stamina level (see table below) |
| Go Green Tip | From `getPersonalizedTip()` (truncated to 140 chars) |
| Quote | "Every prompt has a footprint. Leave a positive one." |
| QR code | Real scannable QR (80×80 px canvas, `qrcode-generator` library) |
| QR URL | `https://ai-rcade.lovable.app/session?id=SESSION_ID` (unique per session) |
| URL label | `ai-rcade.lovable.app` |

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
| Obstacle (datacenter) hit | `damage` |
| CONTINUE pressed | `coin` |
| After Q5 | `levelComplete` |
| Ticket screen opens | `print` |
| Persona: score ≤ 7 | `turbo` |
| Persona: score 8–19 | `casual` |
| Persona: score 20–29 | `mindful` |
| Persona: score ≥ 30 | `green` |

---

## Keyboard Controls

| Screen | Key | Action |
|---|---|---|
| Any | TAB | Move focus forward |
| Screen 0 | ENTER / SPACE | Press Start |
| Screen 0.5 | ENTER on Name field | Focus Age selector, open dropdown |
| Screen 0.5 | ENTER / SPACE on open dropdown | Confirm selection, advance to next field |
| Screen 0.5 | ESC on open dropdown | Close dropdown, keep focus on selector |
| Screen 0.5 | TAB | Advance through Name → Age → Expertise → Gender → CONTINUE |
| Screen 1.1 | ← → | Move Byte left / right |
| Screen 1.1 | ↑ or SPACE | Jump straight up |
| Screen 1.1 | ↑ + → | Arc jump forward |
| Screen 1.1 (overlay) | ↑ ↓ | Navigate answer buttons |
| Screen 1.1 (overlay) | ENTER / SPACE | Select answer / press CONTINUE |
| Screen 1.1 (demo ready) | ↑ / SPACE / ← / → / ENTER | Start real game |
| Screen 3 | ENTER / SPACE | Print ticket |

---

## Data Collection

Session data is submitted to Supabase when the player clicks **GO GREEN** on Screen 2 (not on CONTINUE — the full score and persona are only known after Q5).

**Endpoint:** `https://tpacbxkobtekehqrgodd.supabase.co/rest/v1/aircade_sessions`
**Method:** POST (direct `fetch`, no Supabase client library)
**Auth:** `apikey` header with publishable key

**Fields collected:**

| Field | Value |
|---|---|
| `session_id` | `state.sessionId` (regenerated just before save) |
| `player_name` | `state.userName` (may be empty → "Anonymous") |
| `age_group` | `state.userAge` |
| `expertise` | `state.userExpertise` |
| `gender` | `state.userGender` (may be empty) |
| `language` | active language code |
| `score` | `state.score` |
| `persona` | `state.persona.title` |
| `stamina_level` | `state.staminaLevel` |
| `answer_1_category` … `answer_5_score` | per-answer category, type, score (15 fields) |

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
| Session URL landing page | Deferred | QR points to `ai-rcade.lovable.app/session?id=X`; page not yet built |

---

## Design Principles

- **Never preachy** — facts not lectures; "you could" not "you should"
- **Playful tone** — arcade energy, Byte is a cheerful guide
- **No shame** — persona descriptions are warm even for high-impact players
- **No gaming** — answer order shuffled; impact type hidden until after selection; no color coding on selected answer
- **Accessible** — ARIA labels, keyboard-only operation throughout
- **Multilingual** — full UI in English, Castilian, and Catalan
- **Always completes** — no game over, no lives system; every player answers all 5 questions
