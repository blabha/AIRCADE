# (Ai)rcade

> **"Every prompt has a footprint. Leave a positive one."**

An interactive arcade-style web experience that teaches people about the environmental and ethical cost of AI usage — and how to make smarter, greener choices without guilt-tripping.

Built for a laser-cut arcade cabinet with keyboard-only controls (no mouse, no touch).

---

## What It Is

Players control **Byte**, a cloud mascot, through a Chrome Dino-style platformer. Landing on `?` blocks triggers ethics questions about AI use. After 5 questions, players receive a personalized **AI Persona** based on their answers, a tailored green tip, and a printable ticket.

**Duration:** 2–3 minutes per session  
**Audience:** General public (age 0+), no technical background assumed  
**Languages:** English, Castellano, Català

---

## Screen Flow

```
Screen −1: Language Select  →  EN / ES / CA
Screen 0:  Idle / Attract Mode  →  PRESS START
           Instructions Overlay  →  LET'S GO
Screen 0.5: User Info  →  Name, Age, Expertise, Gender  →  CONTINUE
Screen 1.1: Ethics Platformer Game  →  5 ? blocks  →  5 questions
Screen 2:  Persona Reveal  →  GO GREEN
Screen 3:  Personalized Tip  →  PRINT YOUR TICKET
Screen 4:  Ticket Download  →  🖨 PRINT / ↩ PLAY AGAIN
```

---

## Keyboard Controls

| Screen | Key | Action |
|---|---|---|
| Any | TAB | Move focus forward |
| Screen 0 | ENTER / SPACE | Press Start |
| Screen 0.5 | ENTER on Name | Focus Age selector |
| Screen 0.5 | ENTER on selector | Confirm and advance |
| Screen 0.5 | ESC | Close dropdown |
| Screen 1.1 | ← → | Move Byte |
| Screen 1.1 | ↑ or SPACE | Jump |
| Screen 1.1 (overlay) | ↑ ↓ | Navigate answer buttons |
| Screen 1.1 (overlay) | ENTER / SPACE | Select answer / CONTINUE |
| Screen 4 | ↑ / ↓ | Switch between buttons |
| Screen 4 | ENTER / SPACE | Activate button |

---

## Scoring

| Answer type | Points |
|---|---|
| H — High impact | −3 |
| B — Balanced | +1 |
| L — Low / conscious | +4 |

**Score range:** −15 to +20 across 5 questions

### Stamina HUD (Water / CO₂ / Energy bars)

| Score | Level | Display |
|---|---|---|
| ≤ −8 | 1 | ■□□□□ |
| −7 to −2 | 2 | ■■□□□ |
| −1 to 4 | 3 | ■■■□□ (start) |
| 5 to 12 | 4 | ■■■■□ |
| ≥ 13 | 5 | ■■■■■ |

---

## AI Personas

| Score | Persona |
|---|---|
| ≥ 18 | Sustainable Sage |
| 15–17 | Green Hacker |
| 10–14 | Mindful Maker |
| 5–9 | Eco Experimenter |
| −1 to 4 | Casual Clicker |
| −7 to −2 | Turbo Tapper |
| ≤ −8 | Grid Goblin |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Press Start 2P (Google Fonts) |
| Sound | Web Audio API (`sounds.js`) |
| Image export | html2canvas (CDN) |
| i18n | Built-in translation system (`translations.js`) |
| Data | Supabase REST API — fire-and-forget, no library |
| Deployment | Fully static — runs as a local HTML file, no server needed |

---

## File Structure

```
AIRCADE/
├── index.html          # All screen HTML
├── styles.css          # All styles
├── script.js           # Screen logic, state, events, game loop
├── data.js             # Personas, tips, footprint values, scoring helpers
├── questionBank.js     # 15 question sets (5 age groups × 3 expertise levels)
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

## Running Locally

Open `index.html` directly in a browser. No server, no build step, no dependencies to install.

For the arcade cabinet, the file is served locally via a browser in kiosk/fullscreen mode.

---

## Question Bank

15 combinations: 5 age groups × 3 expertise levels, 20 questions each.  
Questions are shuffled per session; 5 are selected randomly per player.

Age groups: `0–12`, `13–19`, `20–39`, `40–59`, `60+`  
Expertise levels: `Beginner`, `Average`, `Expert`

---

## Data Collection

Anonymous session data is submitted to Supabase after Screen 0.5 and again after the ticket screen.

**Fields:** `session_id`, `user_name`, `user_age`, `user_expertise`, `user_gender`, `score`, `stamina_level`, `persona`, `ethics_answers` (JSON), `language`

All errors are silent — data collection never blocks game flow.

---

## Design Principles

- **Never preachy** — facts not lectures; "you could" not "you should"
- **Playful tone** — arcade energy, Byte is a cheerful guide
- **No shame** — persona descriptions are warm even for high-impact players
- **No gaming** — answer order shuffled; impact type hidden until after selection
- **Accessible** — ARIA labels, keyboard-only operation throughout
- **Multilingual** — full UI in English, Castilian, and Catalan
