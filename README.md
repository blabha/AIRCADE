# (AI)RCADE

An interactive arcade game about the environmental cost of AI. Players work through 5 scenario-based questions about their daily AI use, receive a scored persona, and walk away with a personalised sustainability tip — printed on an arcade-style ticket.

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI framework | React 18 |
| Build tool | Vite 5 |
| Styling | Inline styles + `pixel.css` (custom animations) + PostCSS/Tailwind base |
| Audio | Web Audio API — all sounds synthesised in-browser, no audio files |
| Backend (optional) | Any REST endpoint at `VITE_API_URL` — game works fully offline without it |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Dev server runs at `http://localhost:5173` (or the next available port).

---

## Environment Variables

Create a `.env.local` file in the project root to enable session analytics:

```env
VITE_API_URL=http://localhost:8000
```

If `VITE_API_URL` is not set the game runs fully offline — session data is silently discarded after play.

The API receives a single `POST /sessions` with the player's choices, footprint metrics, persona, and industry. See [DESCRIPTION.md](./DESCRIPTION.md) for the full payload shape.

---

## Languages

The game supports three languages selectable at startup:

- **English** (`en`)
- **Spanish** (`es`)
- **Catalan** (`ca`)

All question text, option text, persona names, tips, and UI labels are fully localised.

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Shift + D` | Debug skip — jumps straight to the Results screen with randomised data |

---

## Project Structure

```
src/
├── App.jsx                    # Screen router
├── main.jsx                   # Entry point
├── api.js                     # Optional backend integration
│
├── components/
│   ├── LanguageSelect.jsx     # Language picker
│   ├── Welcome.jsx            # Title screen
│   ├── PlayerRegistration.jsx # Player info form
│   ├── PathMap.jsx            # Mission map with Nimbus walk animation
│   ├── QuestionScreen.jsx     # Main gameplay — question + impact panel
│   ├── TransitionScreen.jsx   # Between-question feedback
│   ├── ResultsTicket.jsx      # Final arcade ticket
│   ├── CloudCharacter.jsx     # Nimbus pixel-art mascot
│   └── MiniMap.jsx            # Progress sidebar inside QuestionScreen
│
├── data/
│   ├── questions.js           # 5 questions + industry-specific variants
│   ├── personas.js            # 4 outcome personas
│   └── industries.js          # 19 industries + persona-matched tips
│
├── hooks/
│   ├── useGameState.js        # Game state reducer + scoring logic
│   └── useSounds.js           # Web Audio synthesiser
│
├── utils/
│   └── environmentalComparisons.js  # Raw metrics → human-scale analogies
│
└── styles/
    ├── pixel.css              # Animations, buttons, CRT effects, neon text
    └── print.css              # Print layout for ticket
```

---

## Scoring

Each of the 5 questions gives a score from **−3 to +4**:

```
Combined score = clamp(envScore + moralAdj, −3, +4)
```

- **Environmental score** — driven by the option's `weight` (1 = highest impact → −3, 6 = zero footprint → +4)
- **Moral adjustment** — driven by the option's `moralScore` (0 = impulse → −1 penalty, 1 = practical → 0, 2 = conscious → +1 bonus)

**Total range over 5 questions: −15 to +20**

| Score | Persona |
|---|---|
| ≤ 0 | The Turbo Tapper |
| 1 – 7 | The Casual Clicker |
| 8 – 14 | The Mindful Maker |
| 15 – 20 | The Green Hacker |

---

## Adding Content

**New question** — add an entry to `src/data/questions.js` following the existing schema. Include `weight`, `moralScore`, and `impactLabel` for each option.

**New industry tip** — add an entry to the `TIPS` object in `src/data/industries.js` keyed by the exact industry string.

**New language** — add a key to every `T` object in each component, extend `INDUSTRIES_XX` in `industries.js`, add the language button in `LanguageSelect.jsx`, and add the `lang` option to `useSounds.js` persona jingles if needed.

---

## Deployment

The build output in `dist/` is a fully static site (`base: './'` in `vite.config.js`). Deploy to any static host (Netlify, Vercel, GitHub Pages, Lovable, etc.) by pointing the host at the `dist/` directory.

---

## License

MIT
