# CLAUDE.md — MultiplicaApp

This file provides guidance for AI assistants working on this codebase.

---

## Project Overview

**MultiplicaApp** is a Progressive Web Application (PWA) that teaches multiplication tables to second-grade primary school students (ages 7–8). It runs entirely in the browser with no backend — all data is stored locally via IndexedDB.

- **Language**: Spanish (UI, variable names, documentation)
- **Stack**: React 18 + TypeScript 5 + Vite 5
- **Database**: IndexedDB via the `idb` library
- **Styling**: Vanilla CSS3 (no CSS framework)
- **Testing**: None configured (TypeScript strict mode provides compile-time safety)
- **Deployment**: Vercel (primary), Netlify, or any static HTTPS host

---

## Repository Structure

```
multiplicapp-nueva/
├── src/
│   ├── components/          # React UI components
│   │   ├── Menu.tsx         # Main menu: stats, mode/level selectors, recent games
│   │   ├── Menu.css
│   │   ├── Game.tsx         # Core game screen: questions, feedback, scoring
│   │   ├── Game.css
│   │   ├── GameOptions.tsx  # Game parameter selection modal
│   │   ├── GameOptions.css
│   │   ├── ResponseMode.tsx # Toggle between multiple-choice and write-in answer
│   │   ├── ResponseMode.css
│   │   ├── Tables.tsx       # Printable/viewable multiplication tables reference
│   │   ├── Tables.css
│   │   ├── Learn.tsx        # Teaching tips and learning techniques
│   │   └── Learn.css
│   ├── hooks/
│   │   └── useGameLogic.ts  # All game state: scoring, streaks, lives, timer
│   ├── App.tsx              # Root component: routing between screens, SW registration
│   ├── App.css
│   ├── main.tsx             # React DOM entry point
│   ├── index.css            # Global/root styles
│   ├── db.ts                # IndexedDB schema, read/write helpers
│   ├── types.ts             # TypeScript interfaces for all shared types
│   └── questionGenerator.ts # Question creation + pedagogical technique selection
├── public/
│   ├── sw.js                # Service Worker (cache-first strategy)
│   ├── manifest.json        # PWA manifest
│   └── icon-*.png           # App icons (192x192, 512x512, maskable variants)
├── index.html               # HTML entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server at http://localhost:5173 (hot reload)
npm run build        # Production build → dist/
npm run preview      # Serve production build locally
npm run type-check   # Run tsc --noEmit (no test runner configured)
```

There is no test runner. Use `npm run type-check` to validate TypeScript before committing.

---

## Architecture & Data Flow

### Screen Routing

App state (not React Router) controls which screen is shown:

```
App.tsx  ──► "menu"       → <Menu />
         ──► "gameOptions" → <GameOptions />
         ──► "game"        → <Game />  (uses useGameLogic hook)
         ──► "tables"      → <Tables />
         ──► "learn"       → <Learn />
```

All screen transitions are handled in `App.tsx` via `currentScreen` state and callback props passed down.

### Game Logic

`src/hooks/useGameLogic.ts` owns all game state:

- `startLearningMode(level)` / `startChallengeMode(level)` — initialize a session
- `submitAnswer(userAnswer)` — validates answer, updates score/streak/lives, persists to IndexedDB
- **Learning mode**: 5 lives, no timer, shows pedagogical tips
- **Challenge mode**: 3 lives, 60-second countdown, streak multiplier (1×–3×)

### Question Generation

`src/questionGenerator.ts` maps difficulty levels to table ranges and attaches a pedagogical technique string to each question:

| Level | Tables | Symbol |
|-------|--------|--------|
| 1 | 1–5 | 🌱 |
| 2 | 6–7 | 🌿 |
| 3 | 8–9 | 🌳 |
| 4 | 1–10 | 🎯 |

### Persistence

`src/db.ts` wraps IndexedDB (`MultiplicaAppDB`) with two object stores:

- **`gameStats`** — one record per session (timestamp, mode, level, score, accuracy, time)
- **`playerProgress`** — singleton record (totalScore, badges, levelAchievements, streakDays)

Key functions: `saveGameStats()`, `getGameStats()`, `getPlayerProgress()`, `updatePlayerProgress()`, `clearAllData()`.

---

## TypeScript Conventions

- Strict mode is enabled (`"strict": true` in `tsconfig.json`).
- All shared types live in `src/types.ts` — add new interfaces there rather than inline.
- Key interfaces: `GameStats`, `PlayerProgress`, `Question`, `GameState`, `GameSession`.
- Props and callback signatures must be explicitly typed; avoid `any`.
- `noUnusedLocals` and `noUnusedParameters` are enabled — remove unused imports/variables.
- Target is ES2020; avoid ES2021+ features unless confirmed supported by the Vite/esbuild target.

---

## Styling Conventions

- Each component has its own `.css` file co-located in `src/components/`.
- Global styles: `src/index.css` (CSS variables, resets) and `src/App.css` (app shell).
- Primary brand color: `#6366f1` (indigo).
- Mobile-first. Minimum tap target size: 50px.
- No CSS framework or CSS-in-JS. Do not introduce one.
- Animations use CSS transitions and keyframes — no animation library.
- Responsive breakpoints: mobile < 768px, tablet 768–1024px, desktop > 1024px.

---

## PWA Conventions

- The Service Worker (`public/sw.js`) uses a **cache-first** strategy. When updating cached assets, bump the `CACHE_NAME` version string in `sw.js`.
- Do not import the Service Worker into the Vite bundle; it is registered manually in `App.tsx` via `navigator.serviceWorker.register('/sw.js')`.
- `public/manifest.json` is static — update it manually if app name, theme color, or icons change.
- Icons must be regenerated with `generate-icons.sh` whenever the base icon changes.

---

## Key Constraints

1. **No backend.** The app is intentionally fully static. Do not add server-side logic, API calls, or authentication.
2. **No external UI libraries.** Do not introduce Tailwind, Material UI, shadcn/ui, or similar frameworks.
3. **No analytics or tracking.** The target audience is minors; do not add any telemetry.
4. **Spanish UI.** All user-facing text must remain in Spanish. Code identifiers may use English or Spanish — the existing codebase mixes both; be consistent with the surrounding file.
5. **No breaking changes to IndexedDB schema** without a migration strategy. The schema version is set in `db.ts`; increment it and handle `onupgradeneeded` if the schema changes.
6. **No test framework is configured.** Do not assume Jest globals (`describe`, `it`, `expect`) are available. Run `npm run type-check` instead.

---

## Common Tasks

### Adding a new screen

1. Create `src/components/MyScreen.tsx` and `MyScreen.css`.
2. Add a new screen key to the `currentScreen` state type in `App.tsx`.
3. Add the render branch in `App.tsx` and a navigation callback.

### Changing difficulty levels or table ranges

Edit `src/questionGenerator.ts` — the `generateQuestion` function and the level-to-range mapping.

### Adding a new badge

Edit the badge-awarding logic in `src/hooks/useGameLogic.ts` (`submitAnswer`) and the badge display in `src/components/Game.tsx`.

### Updating the IndexedDB schema

1. Increment `DB_VERSION` in `src/db.ts`.
2. Add an `onupgradeneeded` handler branch for the new version.
3. Update the relevant TypeScript interface in `src/types.ts`.

### Deploying

```bash
npm run build          # outputs to dist/
# Vercel picks up dist/ automatically via vercel.json
# For manual deploys, serve dist/ from any HTTPS static host
```

---

## Documentation Files

These files (in Spanish) provide additional context but are not required reading for code changes:

| File | Purpose |
|------|---------|
| `README.md` | Feature overview and quick-start |
| `ARQUITECTURA.md` | Detailed architecture and data flow |
| `COMO_INSTALAR.md` | Step-by-step installation guide |
| `DEPLOYMENT.md` | Vercel, Netlify, GitHub Pages, and manual deploy instructions |
| `PRIMEROS_PASOS.md` | Quick start and troubleshooting |
| `PROYECTO_RESUMEN.md` | Executive summary |
| `RESUMEN_ENTREGA.md` | Delivery summary |

---

## Git Workflow

- The `master` branch is production.
- Feature/fix work happens on short-lived branches (e.g. `claude/...`, `fix/...`).
- Commit messages are in Spanish in this repository; match that convention.
- There are no pre-commit hooks or CI pipelines configured. Run `npm run type-check` and `npm run build` manually before pushing.
