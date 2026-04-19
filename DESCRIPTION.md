# (AI)RCADE — Game Architecture & Design

This document explains how the game is built: how state flows, how scoring works, how components talk to each other, and how to extend each part of the system.

---

## Overview

(AI)RCADE is a single-page React application with no routing library. The entire game is a linear state machine: a single `screen` value in the global reducer determines which component renders. Players move forward through seven distinct screens and cannot go back.

---

## Screen Flow

```
LANGUAGE_SELECT
      ↓
    WELCOME
      ↓
PLAYER_REGISTRATION
      ↓
  PATH_MAP  ←──────────────────────────┐
      ↓                                │
  QUESTION  → (auto after 2.4s) ───────┘
      ↓ (after 5th question)
   RESULTS
```

Each screen is a full-viewport React component. `App.jsx` is a `switch` on `state.screen` that renders the right component and passes it only the props it needs.

---

## State Machine — `useGameState`

All game state lives in a single `useReducer` in `src/hooks/useGameState.js`.

### State shape

```js
{
  screen:             0–6,           // SCREENS enum
  lang:               "en"|"es"|"ca",
  player: {
    name, age, gender, industry
  },
  currentQuestion:    0–4,           // index of next question to play
  answers:            Option[],      // one per completed question
  score:              -15 to +20,
  totalEnergy:        number,        // cumulative Wh
  totalWater:         number,        // cumulative ml
  totalCo2:           number,        // cumulative g CO₂
  sessionId:          string,        // random 6-char uppercase, generated on START_GAME
  persona:            Persona|null,  // set on last question answer
  smartTip:           string,        // set on last question answer
  lastDelta:          number|null,   // score change from most recent answer
  prevCompletedCount: number,        // answers.length before most recent answer (PathMap walk)
}
```

### Actions

| Action | Trigger | Effect |
|---|---|---|
| `SET_LANG` | Language selected | Sets `lang` |
| `GO_TO_SCREEN` | Manual navigation | Sets `screen` |
| `SET_PLAYER` | Form field change | Merges into `player` |
| `START_GAME` | Registration submit | Resets all metrics, generates `sessionId`, goes to `PATH_MAP` |
| `ANSWER_QUESTION` | Player selects option | Scores the answer, accumulates metrics, increments `currentQuestion`, sets `prevCompletedCount`, goes to `PATH_MAP` (or computes persona on last question) |
| `NEXT_QUESTION` | Unused in main flow | Legacy — kept for compatibility |
| `DEBUG_SKIP` | Ctrl+Shift+D | Jumps to `RESULTS` with random data |
| `RESET` | Play Again | Returns to `INITIAL_STATE` |

### Key behaviour: ANSWER_QUESTION

When the player picks an option, `ANSWER_QUESTION` does everything in one dispatch:

1. Calculates `delta = scoreForOption(option)` (see Scoring below)
2. Accumulates `totalEnergy`, `totalWater`, `totalCo2`
3. Saves the option to `answers[]`
4. Sets `prevCompletedCount = answers.length` (before this answer) — used by PathMap to know where to animate Nimbus *from*
5. Increments `currentQuestion` (unless this was the last question)
6. If last question: computes `persona` and `smartTip` immediately
7. Sets `screen = PATH_MAP`

The QuestionScreen auto-calls `onAnswer(option)` 2.4 seconds after selection (giving the player time to read the ImpactPanel). There is no separate TRANSITION screen in the main flow.

---

## Scoring System

### Formula

```
scoreForOption(option) = clamp(-3, +4, envScore + moralAdj)
```

**Environmental score** — from `option.weight`:

| weight | meaning | envScore |
|---|---|---|
| 1 | Highest AI impact | −3 |
| 2 | High AI use | −1 |
| 3 | Moderate | +1 |
| 4 | Good choice | +2 |
| 5 | Great choice | +3 |
| 6 | Zero footprint | +4 |

**Moral adjustment** — from `option.moralScore`:

| moralScore | meaning | moralAdj |
|---|---|---|
| 0 | Impulse / convenience | −1 |
| 1 | Practical | 0 |
| 2 | Conscious choice | +1 |

The moral layer rewards intentionality: someone who picks a moderate option *consciously* scores higher than someone who picks the same option by default. Choosing the most harmful option mindlessly incurs an extra penalty.

Both scores are clamped so the per-question range stays −3 to +4 and the 5-question total stays **−15 to +20** — consistent with all persona thresholds.

### Personas

| Score | Persona | Colour | Cloud mood |
|---|---|---|---|
| ≤ 0 | The Turbo Tapper | `#FF3A20` red | sad |
| 1–7 | The Casual Clicker | `#FF00FF` magenta | neutral |
| 8–14 | The Mindful Maker | `#0099FF` cyan | happy |
| 15–20 | The Green Hacker | `#39FF14` lime | celebrating |

`getPersona(score)` in `src/data/personas.js` resolves the persona. The persona object carries the colour for the results screen, the cloud mood for the mascot, and the sound key for the results jingle.

---

## Questions & Industry Personalisation

### Question structure

Each question in `src/data/questions.js`:

```js
{
  id: 1–5,
  en: "Default English scenario",
  es: "...", ca: "...",
  options: [
    {
      label: "A" | "B" | "C",
      en: "Option text", es: "...", ca: "...",
      energyWh: number,    // electricity consumed
      waterMl:  number,    // water used in cooling
      co2g:     number,    // CO₂ emitted
      weight:   1–6,       // environmental severity
      moralScore: 0–2,     // intentionality
      impactLabel: string  // one-line human description
    }
  ]
}
```

Options are always ordered: A = most impactful, B = moderate, C = least impactful. This is intentional — players never know which option is "correct" until they see the ImpactPanel.

### Industry-specific question text

12 of the 19 industries map to one of six content groups:

| Group | Industries |
|---|---|
| `creative` | Art & Design, Marketing & Advertising, Media & Entertainment |
| `tech` | Technology & Software, Engineering |
| `health` | Healthcare & Medicine |
| `edu` | Education, Research & Science |
| `architecture` | Architecture & Construction |
| `professional` | Finance & Banking, Legal, Government & Public Sector |

For each group × each question × each language, `INDUSTRY_CONTEXTS` in `questions.js` holds a personalised scenario preamble (e.g. "You're debugging code and hit a wall…" for tech, Q2). The remaining 7 industries get the default question text.

`getQuestionText(questionId, industry, lang)` is called in `QuestionScreen` and returns the personalised text or `null` (which triggers a fallback to the default).

---

## Component Architecture

### Data flow

```
App.jsx
  └── useGameState()        ← single source of truth
  └── useSounds()           ← play() function passed down as prop
       │
       ├── LanguageSelect   props: onSelect, play
       ├── Welcome          props: lang, onStart, play
       ├── PlayerRegistration props: lang, player, setPlayer, onStart, play
       │
       ├── PathMap          props: lang, completedCount, prevCompletedCount,
       │                           score, lastDelta, onGo
       │     └── CloudCharacter (mood, message, size, animate)
       │
       ├── QuestionScreen   props: lang, industry, questionIndex,
       │                           totalEnergy/Water/Co2, score, onAnswer, play
       │     ├── MiniMap    (completedCount, currentIdx, score, lang)
       │     ├── ImpactPanel (option, t) — shown after selection
       │     └── FootprintBars (energy, water, co2, animate, isBad, lang)
       │
       ├── TransitionScreen props: lang, completedCount, lastDelta, onContinue, play
       │     └── CloudCharacter
       │
       └── ResultsTicket    props: lang, player, persona, score,
                                   totalEnergy/Water/Co2, sessionId,
                                   smartTip, answers, onPlayAgain, play
             └── CloudCharacter
```

No component holds game state — they all receive data via props and call callbacks to advance the game.

### CloudCharacter — Nimbus

`src/components/CloudCharacter.jsx` renders a pixel-art cloud as a grid of `position: absolute` divs.

- **Grid**: 14 columns × 12 rows; base pixel size 7px, scaled by `size` prop
- **Body**: 70+ pixel coordinates defining the cloud shape + a 3-pixel physical tail at the bottom centre
- **Face**: Per-mood pixel coordinates for eyes (normal/wide/squint), mouth (smile/flat/frown/O-shape), brows, cheeks, and tear drops
- **Smile rule**: In a downward-increasing row grid, a **smile** has corners at a *smaller* row number (higher on screen) with the centre pixels at a *larger* row number (lower on screen) — forming a U shape
- **Sizes**: `sm` (scale 0.6, 59×50px), `md` (scale 1.0, 98×84px), `lg` (scale 1.4, 137×118px)
- **Animations**: CSS class `cloud-float` / `cloud-shake` / `cloud-bounce` applied to the wrapper div
- **Speech bubble**: Separate `SpeechBubble` sub-component with a two-layer CSS triangle tail; colour is mood-driven

### PathMap — Nimbus walking animation

After each answered question, PathMap receives both `prevCompletedCount` (where Nimbus was) and `completedCount` (where Nimbus should be). A `useEffect` drives a two-step animation:

1. Nimbus is placed at `NODES[prevCompletedCount]` immediately
2. After 350ms, the target node index changes to `completedCount` — a CSS transition on `left` and `top` smoothly walks Nimbus across the map over 750ms
3. After 1200ms total, `walkDone = true` and the GO button appears

The GO button is hidden during the walk so the player cannot skip the animation.

### QuestionScreen — ImpactPanel

After the player selects an option, `selected` state is set and `ImpactPanel` slides in via the `pop-in` CSS animation. It shows:

- **Tier label** — qualitative verdict ("ZERO FOOTPRINT ★", "HIGH IMPACT") in the tier colour
- **Moral verdict** — "IMPULSE USE" (red), "PRACTICAL USE" (magenta), or "CONSCIOUS CHOICE" (green)
- **Per-option environmental numbers** — exact Wh / ml / g with a human-scale analogy on the same row (from `environmentalComparisons.js`) and a mini fill-bar
- **Zero-impact celebration** — if all metrics are 0, shows a green "⚡ 0 Wh  💧 0 ml  🌫️ 0 g"

Raw score deltas ("+2 PTS") are intentionally not shown — feedback is qualitative to focus attention on environmental meaning rather than game mechanics.

---

## Sound System — `useSounds`

`src/hooks/useSounds.js` uses the Web Audio API to synthesise all sounds procedurally — no audio files are loaded.

```js
const { play } = useSounds();
play("coin");       // any of the 10 sound names
```

A singleton `window._arcadeAudioCtx` is created on first call and reused. Sounds are composed from:
- **Oscillators** — `square`, `triangle`, `sawtooth` waveforms with frequency envelopes
- **Gain nodes** — attack/decay/release envelopes via `linearRampToValueAtTime`
- **Noise** — `BufferSourceNode` with random float32 samples for damage/click sounds

Available sounds: `click`, `coin`, `levelComplete`, `print`, `damage`, `goodChoice`, `turbo`, `casual`, `mindful`, `green` (the last four play on results reveal based on the player's persona).

---

## Environmental Comparisons

`src/utils/environmentalComparisons.js` converts raw numbers into human-readable analogies:

| Utility | Input | Example output |
|---|---|---|
| `energyToHuman(wh)` | Wh | "charges your phone by 10.3%" |
| `waterToHuman(ml)` | ml | "≈ half a teacup" |
| `co2ToHuman(g)` | g | "a tree needs 13 hrs to absorb this" |
| `buildComparisons(wh, ml, g)` | all three | `{ energy, water, co2 }` objects |

These are used in both the per-question `ImpactPanel` and the final `ResultsTicket` to contextualise abstract numbers.

---

## Backend API

`src/api.js` posts one event at game end:

```
POST {VITE_API_URL}/sessions
Content-Type: application/json

{
  "session_id":   "ABC123",
  "lang":         "en",
  "player_name":  "string",
  "age":          number | null,
  "gender":       "string | null",
  "industry":     "string | null",
  "score":        -15 to 20,
  "persona_id":   "turbo" | "casual" | "mindful" | "green",
  "persona_name": "string",
  "total_energy": number,
  "total_water":  number,
  "total_co2":    number,
  "answers": [
    {
      "question_num":  1–5,
      "option_label":  "A" | "B" | "C",
      "option_text":   "string",
      "energy_wh":     number,
      "water_ml":      number,
      "co2_g":         number,
      "weight":        1–6
    }
  ]
}
```

The call is fire-and-forget. If `VITE_API_URL` is unset, or if the request fails, the game continues without error.

---

## Styling Conventions

All component styles are **inline** — no Tailwind utility classes in component files. `pixel.css` provides:

- **`.pixel-btn`** — base arcade button with 4px border, pixel-shift on active
- **`.pixel-input` / `.pixel-select`** — cyan-bordered form fields
- **`.crt-overlay`** — CRT scanline overlay via `::after` pseudo-element
- **`.crt-flicker`** — subtle opacity flicker on an 8s loop
- **`.pop-in`** — 0.3s scale-from-zero entrance animation
- **`.screen-enter`** — quick horizontal wipe-in on screen change
- **`.zone-pulse`** — border glow pulse for the GO button
- **`.bar-animate`** — smooth width expansion for progress bars
- **`.bar-danger`** — red pulse for cumulative bars when a bad choice is made
- **`.cloud-float` / `.cloud-bounce` / `.cloud-shake`** — Nimbus animations using `steps()` for discrete retro movement

The `Press Start 2P` Google Font is loaded in `index.html` and applied globally. `image-rendering: pixelated` is set globally so scaled pixel art elements stay sharp.

---

## Extending the Game

### Add a new question
1. Add an entry to `QUESTIONS` in `src/data/questions.js` (id, en/es/ca text, 3 options with all fields)
2. Update `MAX_SCORE` in `useGameState.js` if changing the total question count (currently `5 × 4 = 20`)
3. Add a node position to `NODES` in `PathMap.jsx` and a theme entry in `LEVEL_THEMES`

### Add a new industry tip
Add a key to `TIPS` in `src/data/industries.js` matching the exact industry string from `INDUSTRIES[]`.

### Add industry-specific question text
Add an entry to `INDUSTRY_CONTEXTS` in `questions.js` under the relevant question key (`q1`–`q5`) and group name. Map the industry to a group in `INDUSTRY_GROUP_MAP`.

### Add a new language
1. Add a `lang` key to every `T = { en:…, es:…, ca:… }` object in each component
2. Add `INDUSTRIES_XX` and update `getSmartTip` in `industries.js`
3. Add the language button in `LanguageSelect.jsx`
4. Update the language selector condition checks throughout (currently `lang === "es" ? … : lang === "ca" ? … : …`)

### Change Nimbus's appearance
Edit the pixel coordinate arrays in `CloudCharacter.jsx`:
- `BODY` — the cloud silhouette (14×12 grid)
- `FACES[mood].eyes/mouth/brows/cheeks` — per-mood face features
- Remember: **smaller row = higher on screen**; a smile has corners at a smaller row and centre at a larger row
