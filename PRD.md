# A(I)RCADE — Product Requirements Document
### Status: **IMPLEMENTED** — Last updated March 2026

---

## Project Overview

| Field | Value |
|---|---|
| **Product Name** | A(I)RCADE |
| **Tagline** | "Every prompt has a footprint. Leave a positive one." |
| **Format** | Interactive web application (tablet-optimized) |
| **Duration** | 2–3 minutes per session |
| **Audience** | General public (age 14+), no technical background assumed |
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

### File Structure
```
AI-for-ALL-main/
├── index.html                    # All screen HTML
├── styles.css                    # All styles
├── script.js                     # Screen logic, state, events
├── data.js                       # Questions, tips, personas, metrics, DYK
├── api.js                        # Mock AI responses (offline)
├── byte.js                       # Byte mascot speech logic
├── print.js                      # Receipt card population + download
├── assets/
│   ├── cat-astronaut.jpg         # Pre-generated image (cat prompt)
│   └── bakery-logo.jpg           # Pre-generated image (bakery prompt)
├── questions-database.json       # Source of truth for ethics questions
├── personalized-tips-database.json
├── did-you-know-database.json
└── prompt-results-examples.json
```

---

## App State

```javascript
const state = {
  screen: 'idle',
  prompt: '',
  taskType: 'text-short',       // 'image' | 'text-short' | 'text-long'
  generatedText: '',             // text content OR image file path
  metrics: null,
  sessionId: generateSessionId(),
  stamina: 100,
  userName: '',
  userAge: '',
  userGender: '',
  ethicsAnswers: [],             // [{ category, color, impact }]
  currentQuestions: [],          // 5 selected for this session
  currentQuestionIndex: 0,
  persona: null                  // assigned after ethics questions
};
```

---

## Stamina Bar System

**Visual:** Fixed bar at top of screen, retro game health bar style
**Range:** 0–100%
**Visibility:** Hidden on idle screen; shown on all other screens via `body.stamina-visible` class

| Range | Color | Meaning |
|---|---|---|
| 80–100% | Green | Healthy AI usage |
| 50–79% | Yellow | Moderate impact |
| 0–49% | Red | High impact |

**Stamina impacts:**

| Event | Impact |
|---|---|
| Select image prompt | −15 |
| Select text-long prompt | −8 |
| Select text-short prompt | −3 |
| Green ethics answer | +8 |
| Yellow ethics answer | 0 |
| Red ethics answer | −8 |

Stamina is clamped to 0–100 at all times.

---

## Screen Flow

```
[Idle] → [Instructions overlay] → [Screen 0.5: User Info]
       → [Screen 1: Prompt Select] → [Screen 1.1: Ethics × 5]
       → [Ethics Summary + Persona] → [Loading]
       → [Screen 2: Impact] → [Screen 3: Go Greener]
       → [Screen 4: Print/Download]
```

---

## Screen 0: IDLE / ATTRACT MODE

**State:** No user interaction
**Elements:**
- Game title: `A(I)RCADE`
- Subtitle: `INSERT COIN TO PLAY`
- Tagline: `Every prompt has a footprint.`
- Byte mascot (floating cloud SVG) with rotating speech bubbles
- `▶ PRESS START` button (blink animation)
- `© A(I)RCADE 2025 | ☁ FREE PLAY ☁`

**On PRESS START:** Instructions overlay appears
**Stamina bar:** Hidden

---

## Instructions Overlay

Appears over the idle screen after pressing Start.

**Steps shown:**
1. Tell us about you — quick optional profile
2. Pick a task — choose what AI creates
3. Answer 5 ethics questions — shape your AI profile & watch stamina
4. See the footprint — water, energy & CO₂ used
5. Go greener! — personalized tips & downloadable card

**CTA:** `LET'S GO! →` → closes overlay, shows Screen 0.5, resets stamina to 100%

---

## Screen 0.5: USER INFORMATION

**Purpose:** Personalize the experience; data used only in-session, never stored

**Form fields:**

| Field | Type | Options |
|---|---|---|
| Name | Text input | Optional, max 30 chars |
| Age | Dropdown | Under 18, 18–25, 26–35, 36–50, 51–65, 66+ |
| Gender | Dropdown | Prefer not to say, Female, Male, Non-binary |

**Privacy note:** "🔒 Your information is used only for this session and is not stored or shared."

**CTA:** `CONTINUE →` → navigates to Screen 1
**Stamina bar:** Visible at 100% (green)

---

## Screen 1: PROMPT SELECTION

**Header:** "What should AI create for you?"
**Subheader:** "Pick one — your choice affects your AI Stamina!"

**5 prompt buttons** (no custom input):

| # | Icon | Label | Prompt text | Task type |
|---|---|---|---|---|
| 1 | 🎨 | A cat astronaut on Mars | "A cat astronaut on Mars" | image |
| 2 | ✍️ | Birthday poem for my friend turning 30 | "Birthday poem for my friend turning 30" | text-short |
| 3 | 🎨 | Modern bakery logo with a croissant | "Design ideas for a modern bakery logo with a croissant" | image |
| 4 | 📖 | How to make tiramisu | "How to make tiramisu step by step" | text-short |
| 5 | 📝 | Dream beach vacation for two weeks | "Plan a dream beach vacation for two weeks" | text-long |

**On select:**
1. Button highlights briefly
2. Stamina drops by task type impact (see table above)
3. After 500ms → navigates to Screen 1.1 (Ethics)

**No stamina delta shown on buttons** — prevents gaming the quiz

---

## Screen 1.1: ETHICS QUESTIONS

**Header:** "AI ETHICS CHECK"
**Total questions:** 5 (one per category, randomly selected per session)

### Question Pool

**Source:** `questions-database.json` — 40 questions total
**Categories (8 questions each):**

| Category key | Theme |
|---|---|
| `everyday_use` | Practical habits, efficiency, resource sharing |
| `privacy` | Personal data, consent, surveillance |
| `environmental` | Energy use, sustainability, water consumption |
| `critical_thinking` | Verification, learning vs copying, media literacy |
| `social_ethics` | Fairness, authorship, community impact |

**Selection:** 1 question randomly picked per category → 5 questions, shuffled

**Answer format (each question):**
- 3 options shuffled randomly (so position never reveals correct answer)
- Green = +8 stamina | Yellow = 0 | Red = −8
- Impact NOT shown on buttons — color revealed only after selection
- All hover states use uniform neon cyan (no color hints)

**Progress:** 5 dots indicator + "Question X of 5" text

### After Question 5: Persona Summary

Displays the player's **AI User Persona** (see Personas section) with:
- Byte cloud SVG variant for the persona
- Persona name, tagline, description
- Current stamina score
- `🚀 CREATE IT!` button → triggers loading + Screen 2

---

## AI User Personas

6 MBTI-style personas assigned based on ethics answers. Each has a unique Byte cloud SVG accessory.

**Assignment logic:**

| Condition | Persona |
|---|---|
| ≥4 green answers | The AI Guardian |
| ≥3 red answers | The Speed Seeker |
| ≥2 green AND `environmental` category green | The Conscious Creator |
| ≥2 green AND `social_ethics` category green | The Fairness Advocate |
| ≥2 green AND `privacy` category green | The Privacy Champion |
| 1 green with `environmental` | The Conscious Creator |
| 1 green with `social_ethics` | The Fairness Advocate |
| 1 green with `privacy` | The Privacy Champion |
| Default (mixed/low) | The Pragmatic Explorer |

| Persona | SVG Accessory | Tagline |
|---|---|---|
| The AI Guardian | Crown (cyan + gems) | Thoughtful, responsible, planet-aware |
| The Conscious Creator | Sprout / plant | Creative and growing in awareness |
| The Fairness Advocate | Scales of justice | Champion of equal and fair AI |
| The Privacy Champion | Shield + padlock | Data-savvy and rights-aware |
| The Pragmatic Explorer | Compass | Practical, curious, finding the way |
| The Speed Seeker | Lightning bolts | Full throttle and loving it |

---

## Loading Screen

**Appears between:** Ethics summary → Screen 2
**Content:** Animated Byte with wide excited eyes + lightning bolt, "Byte is working! ⚡", prompt preview text
**Duration:** ~1.2 seconds (mock delay)

---

## Screen 2: IMPACT INFOGRAPHIC

**Header:** "WHAT IT COST THE PLANET"

### Generated Result Card

Displays the AI output above the metrics:

| Task type | Display |
|---|---|
| `image` | `<img>` tag showing actual pre-generated image file |
| `text-short` / `text-long` | Full text, `white-space: pre-wrap`, no truncation |

Type badge shown: `🎨 IMAGE` / `📝 LONG TEXT` / `✍️ SHORT TEXT`

### Environmental Metrics

| Task type | Water | Energy | CO₂ |
|---|---|---|---|
| image | 0.5 L | 35 Wh | 15 g |
| text-long | 0.05 L | 8 Wh | 3.5 g |
| text-short | 0.01 L | 2 Wh | 0.8 g |

Each metric shows:
- Value + human comparison (dynamically computed)
- Animated horizontal fill bar (animates in 400ms after screen loads)
- Highlight pulse animation on each row (600ms delay)

**Meter fill % (relative to image = 100%):**

| | Water | Energy | CO₂ |
|---|---|---|---|
| image | 95% | 95% | 95% |
| text-long | 28% | 40% | 35% |
| text-short | 12% | 18% | 15% |

### Did You Know? Box

**Source:** `did-you-know-database.json` — 21 facts
**Selection:** Personalised by ethics answers + prompt type + stamina (see below)
**Display:** One fact per session, randomly picked from a matching pool of 3

**Selection logic:**
1. Check green answer categories (overrides prompt-type defaults):
   - `privacy` green → facts about privacy + planet (16, 12, 20)
   - `environmental` green → collective impact facts (20, 12, 21)
   - `critical_thinking` green → learning/verification facts (17, 14, 18)
   - `social_ethics` or `everyday_use` green → creative teamwork facts (19, 8, 15)
   - ≥3 red answers → "good enough" / reuse facts (13, 9, 10)
2. Else → prompt type × stamina matrix:

| | High stamina (≥80%) | Medium (50–79%) | Low (<50%) |
|---|---|---|---|
| image | 1, 4, 20 | 1, 3, 11 | 2, 3, 13 |
| text-short | 6, 12, 20 | 5, 8, 15 | 5, 9, 14 |
| text-long | 7, 12, 21 | 7, 10, 15 | 7, 9, 13 |

**CTA:** `HOW CAN I DO BETTER? →` → Screen 3

---

## Screen 3: GO GREENER

**Header:** "GO GREENER! 🌱"
**Byte variant:** Sunglasses + thumbs up + big smile

**Shows 3 personalised tip cards** from `personalized-tips-database.json` (21 tips total)

### Tip Selection Logic

**Priority 1 — Ethics category overrides:**

| Category with ≥2 red answers | Tips shown |
|---|---|
| `privacy` | 12, 18, 20 — privacy protection tips |
| `critical_thinking` | 13, 14, 19 — verification & learning tips |
| `social_ethics` | 15, 18, 21 — responsibility & community tips |
| `environmental` | 7, 8, 9 — energy timing & efficiency tips |

**Priority 2 — Prompt type × stamina matrix:**

| | High (≥80%) | Medium (50–79%) | Low (<50%) |
|---|---|---|---|
| image | 2, 4, 10 | 2, 3, 8 | 2, 8, 11 |
| text-short | 5, 6, 9 | 4, 6, 11 | 3, 6, 11 |
| text-long | 5, 9, 10 | 4, 9, 11 | 3, 9, 11 |

Each tip card shows: icon, title, description, savings label

**CTA:** `📄 PRINT MY CARD →` → Screen 4

---

## Screen 4: PRINT / DOWNLOAD

**Header:** "YOUR CARD IS READY! 🖨️"
**Byte variant:** Waving arm + leaf accessory

### Receipt Card (downloadable)

| Field | Source |
|---|---|
| Session ID | Random 6-char alphanumeric |
| Player | `userName | userAge` |
| AI Persona | `state.persona.name` |
| Prompt used | `state.prompt` |
| Water / Energy / CO₂ | Formatted metrics |
| AI Stamina score | `state.stamina + '%'` |
| Smart tip | First tip from `selectPersonalizedTips()` |
| Quote | *"Every prompt has a footprint. Leave a positive one."* |
| QR placeholder | Mock QR grid |

**Download:** `html2canvas` captures `#receipt-card` as PNG at 2× scale
**Filename:** `aircade-{sessionId}.png`

**CTAs:**
- `⬇ DOWNLOAD AS IMAGE` — triggers html2canvas capture
- `↩ PLAY AGAIN` — full state reset, returns to idle

---

## Byte Mascot

**Character:** Pixel cloud SVG (`160×120` viewBox)
**Base shape:** Cloud body with puffs, two square eyes with shine, smile path
**States:** idle, generating, impact, greener, print
**Speech:** Rotating phrases per state, 4-second interval, pop scale animation

**Persona variants** (unique SVG accessories in upper-right):
- Guardian: cyan pixel crown
- Conscious Creator: sprouting plant
- Fairness Advocate: balance scales
- Privacy Champion: shield + padlock
- Pragmatic Explorer: compass
- Speed Seeker: double lightning bolts + excited wide eyes

---

## Pre-Generated AI Content

All responses are offline/hardcoded in `api.js`. No API key required.

| Prompt | Response type | File/content |
|---|---|---|
| Cat astronaut on Mars | Image | `assets/cat-astronaut.jpg` |
| Birthday poem | Text | Pre-written poem |
| Bakery logo | Image | `assets/bakery-logo.jpg` |
| Tiramisu recipe | Text | Pre-written recipe |
| Dream vacation | Text | Pre-written description |

Mock delay: 1.2 seconds (theatrical loading experience)

---

## Data Files

| File | Purpose | Records |
|---|---|---|
| `questions-database.json` | Ethics question pool | 40 questions, 5 categories |
| `personalized-tips-database.json` | Go Greener tips | 21 tips |
| `did-you-know-database.json` | Impact screen facts | 21 facts |
| `prompt-results-examples.json` | Reference for mock content | 5 prompts |
| `screen2-visual-mockups.md` | Design reference for Screen 2 | — |

---

## Not Yet Implemented / Deferred

| Feature | Status | Notes |
|---|---|---|
| Live Claude API | Deferred | Mock responses used instead |
| Idle timeout (30s reset) | Deferred | Low priority for installation |
| Thermal printer integration | Out of scope (hardware) | — |
| PWA / offline caching | Not implemented | Runs fine as local file |
| Repeat-question prevention | Not implemented | 5 questions from 40 makes repeats rare |

---

## Design Principles

- **Never preachy** — facts not lectures; "you could" not "you should"
- **Playful tone** — arcade energy, Byte is a cheerful guide
- **No shame** — persona descriptions are warm even for high-impact players
- **No gaming** — stamina impacts hidden until answer selected; answer order shuffled
- **Accessible** — ARIA roles on progress bars, error toast for failures
