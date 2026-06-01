# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:5173
npm run build      # Production build (outputs to dist/)
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run deploy     # Build + publish to GitHub Pages (gh-pages)
```

No test framework is configured.

## Architecture Overview

Premium React marketing website for **Elcardo Industries** — a diversified industrial group. Stack: **React 19 + Vite 7**, vanilla CSS with CSS variables, **React Router v7 with HashRouter** (required for GitHub Pages static hosting), **Three.js / React Three Fiber** for 3D product viewers, **Framer Motion** + **GSAP** + **Lenis** for animations/smooth scroll.

Deployed to GitHub Pages at `/Elcardo-Website/` — the `base` in `vite.config.js` must stay as-is.

## Project Structure

```
src/
  App.jsx             # Route definitions (HashRouter, 8 routes, lazy-loaded pages)
  main.jsx            # Entry point — wraps app in HashRouter
  index.css           # Global design tokens (colors, typography, spacing, easing)
  components/         # Homepage section components + shared UI
  pages/              # Full-page route components
  data/               # Static JS data files (productsData.js, companiesData.js)
  hooks/              # Custom hooks (useMediaQuery.js)
```

**Routing:** 8 routes — `/`, `/about`, `/companies`, `/products`, `/projects`, `/roller-gates`, `/roller-doors`, `/contact`. Hash fragment scrolling (`#companies`, `#materials`, etc.) navigates within the homepage.

**Data:** Entirely static — `companiesData.js` and `productsData.js` are imported directly into components. No API, no global state library.

**State:** Local `useState` + `useRef` only. No Redux, Zustand, or Context API.

## Design System

Defined as CSS variables in `src/index.css`:

- **Colors:** Navy `#041562`, mid-blue `#0A3D7A`, accent red `#DA1212`
- **Typography:** Inter (body), Playfair Display (display/headings)
- **Effects:** Glass-morphism tokens for navbar/cards; premium easing curves (expo/quart)

## 3D & Animation Patterns

- `Scene3D.jsx` uses React Three Fiber with **IntersectionObserver to pause rendering when offscreen** — preserve this pattern on all 3D components.
- Framer Motion handles scroll-triggered reveals and slide animations.
- GSAP integrates with Lenis smooth scroll via a ticker in `SmoothScroll.jsx` — do not mix raw `window.scroll` listeners with Lenis.
- Hero parallax uses `requestAnimationFrame` directly.

## Performance Conventions

- Pages are **lazy-loaded** with `React.lazy` + `Suspense` in `App.jsx` — add new pages the same way.
- `vite.config.js` defines manual chunks: `vendor-three`, `vendor-motion`, `vendor-scroll`, `vendor-react` — place new heavy dependencies in the appropriate chunk or add a new one.
- Use **passive event listeners** for scroll/touch handlers.

## ESLint Config

ESLint 9 flat config (`eslint.config.js`). Unused variable warnings are suppressed for `UPPER_CASE` names (constants pattern). React Hooks rules enforced.
