# Scope: Phase 2 — Sticky Navbar & Dynamic Hero Section

## Architecture
- Design System: Eloqwnt-grade minimalist monochromatic editorial aesthetic.
- Color Palette: Pure canvas (#FFFFFF light, #08080A dark), crisp black/white typography, neutral slate borders (#E2E8F0 light / #27272A dark), soft gray pill buttons (#F0F0F3 light / #18181B dark), electric blue accent (#2563EB) strictly for waveform logo and marquee separators. NO purple, violet, or indigo gradients.
- Typography: Space Grotesk (Display / Headlines / Ticker) & Plus Jakarta Sans (Body / Nav / Kicker).
- Components:
  - `src/components/navbar.tsx`: Sticky top navbar with 3-part layout, electric blue waveform logo, nav links, right action items, theme toggle, and slide-over quick drawer.
  - `src/components/hero-section.tsx`: Editorial hero section with kicker text, giant centered headline, action pill, circular scroll down trigger, and infinite running ticker.
- Page Integration:
  - `src/app/page.tsx`: Mount `<Navbar />` and `<HeroSection />`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Sticky Top Bar | `backdrop-blur-md bg-background/80 border-b border-border/40` sticky top navbar | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |
| 2 | Waveform Logo & Brand | 5-bar electric blue (#2563EB) waveform SVG logo + brand text `developer.` / `portfolio.` | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |
| 3 | Navigation Links | Center nav links (`Home`, `About ↓`, `Works ↓`, `Services ↓`, `Stack`, `Contact`) with subtle hover transitions | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |
| 4 | Quick Drawer Slide-over | Triggered by circular button `( = )`, sleek slide-over drawer with backdrop blur, navigation links, and social links (GitHub, LinkedIn, Twitter/X, Email) | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |
| 5 | Right Action Controls | Circular button `( = )`, Pill button `Let's chat` (NO emoji), and Theme Switcher (`☀️ / 🌙`) | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |
| 6 | Hero Kicker & Headline | Kicker text + Giant Centered Headline in Space Grotesk bold (pure black in light mode, crisp white in dark mode, STRICT: NO purple gradient) | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |
| 7 | Action Pill & Scroll Button | `Book strategy call` (NO emoji, soft gray #F0F0F3 with hover lift) + Centered circular black scroll button `( ↓ )` with smooth scroll behavior | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |
| 8 | Infinite CSS Marquee Ticker | Hardware-accelerated 60fps running ticker with `/` dividers, pause on hover, metrics: uptime, latency, transaction volume, enterprise releases, zero runtime vulnerabilities | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |
| 9 | Page Integration | Mount `<Navbar />` and `<HeroSection />` in `src/app/page.tsx` cleanly | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |
| 10 | Quality Verification | `npm run typecheck`, `npm run lint`, `npm run build` pass with 0 errors/warnings; zero emojis, zero purple | Phase 2 | ORIGINAL_REQUEST.md / IPD.md |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Phase 2 Navbar & Hero Section | Implement navbar with drawer, hero section with marquee ticker, integrate in page.tsx, verify builds | Phase 1 UI Atoms | DONE |

## Interface Contracts
### Navbar (`src/components/navbar.tsx`)
- Exports `Navbar` component.
- Client component (`"use client"`) due to interactive drawer state, scroll position, and theme switching.
- Drawer component with accessible slide-over, backdrop blur, close button, navigation links, and social media icons/links.
- Waveform logo SVG: 5 vertical bars with dynamic height profiles [10, 18, 14, 22, 12] and electric blue fill/stroke (`#2563EB`).

### HeroSection (`src/components/hero-section.tsx`)
- Exports `HeroSection` component.
- Client component (`"use client"`) for smooth scroll interaction and marquee hover-pause.
- Kicker text: "Helping fast-moving startups and companies build scalable, high-performance web products."
- Headline: "Senior Full-Stack Software Engineer building scalable products with precision & impact"
- Action Pill: "Book strategy call" (soft gray #F0F0F3, hover lift)
- Scroll down button: Smoothly scrolls viewport to next section (`#showcase`).
- Marquee ticker: Infinite CSS translateX/translate3d animation with `will-change: transform`, paused on hover.

## Code Layout
- `src/components/navbar.tsx`: Navbar and Quick Drawer implementation
- `src/components/hero-section.tsx`: Hero section and Marquee ticker implementation
- `src/app/globals.css`: Hardware-accelerated 60fps marquee keyframes & classes
- `tailwind.config.ts`: Tailwind configuration for marquee animation and dark mode
- `src/app/page.tsx`: Mount Navbar and HeroSection along with existing design showcase/future sections
