# Phase 2 Specification & Architecture Mining Analysis
**Document Version:** 1.0.0  
**Phase:** Phase 2 — Sticky Navbar with Quick Drawer & Dynamic Hero Section with Infinite Marquee  
**Author:** `spec_miner_phase2_1` (Specification Miner)  
**Date:** 2026-11-05  

---

## 1. Executive Summary & Design Read
Per **taste-skill §0.B**, our one-line Design Read is:
> **"Reading this as: Senior Full-Stack Software Engineer portfolio for engineering leaders, tech recruiters, and startup founders, with an Eloqwnt-grade monochromatic editorial language, leaning toward Tailwind tokens + Space Grotesk/Plus Jakarta Sans typography + 60fps hardware-accelerated micro-motion."**

- **Dials Set (taste-skill §1.B)**:
  - `DESIGN_VARIANCE: 6` (Precision, editorial restraint)
  - `MOTION_INTENSITY: 5` (Subtle hover physics, smooth drawer slide, 60fps infinite marquee ticker, smooth scroll)
  - `VISUAL_DENSITY: 4` (Generous negative space, comfortable eye-level reading)
- **Aesthetic DNA (docs/DBD.md §1 & §2)**:
  - Default: Pristine Minimalist Canvas (`#FFFFFF` background, `#08080A` high-contrast typography, soft gray `#F0F0F3` pill buttons, subtle `#E5E7EB` borders).
  - Dark Mode: Obsidian Luxury (`#08080A` background, `#F8FAFC` crisp typography, `rgba(255,255,255,0.08)` borders).
  - Waveform Logo Accent: Electric Blue `#2563EB` (strictly reserved for the 5-bar waveform logo SVG).
  - **STRICT ANTI-DEFAULTS**: Zero emojis across the entire surface; zero purple/violet/indigo-purple gradients; zero layout shift on mobile (`min-h-[100dvh]`); single-line desktop navigation; max 1 marquee ticker on page.

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error / Fallback Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|---------------------------|----------------|
| 1 | Navbar | Sticky Glassmorphic Top Bar | Full-width sticky navbar pinned at viewport top (`top-0 z-40 w-full`) with `backdrop-blur-md bg-background/80 border-b border-border/40`. Height capped at 64px-72px (max 80px). | Scroll position | Visual anchor on scroll | Solid background fallback on `prefers-reduced-transparency` | `ORIGINAL_REQUEST.md`, `docs/DBD.md §4.1`, `taste-skill §4.7` |
| 2 | Navbar | 5-Bar Electric Blue Waveform Logo | Dynamic 5-bar soundwave/waveform SVG logo in electric blue (`#2563EB`) with varying heights (e.g. 8px, 18px, 24px, 14px, 10px) paired with lowercase brand wordmark `developer.` / `portfolio.` in `font-display`. | Click event | Smooth scroll to top / page reload | Fallbacks to static SVG with rounded bar caps (`rx="1.5"`) | `ORIGINAL_REQUEST.md`, `docs/DBD.md §2.1 & §4.1` |
| 3 | Navbar | Center Nav Links with Arrow Indicators | Desktop horizontal navigation links: `Home`, `About ↓`, `Works ↓`, `Services ↓`, `Stack`, `Contact`. Items with subsections carry subtle downward arrow `↓`. Subtle hover color transitions (`text-muted-foreground hover:text-foreground`). | Click event / hover | Smooth scroll to anchor (`#about`, `#projects`, `#services`, `#stack`, `#contact`) | Hidden on mobile (`< 768px`), accessible via Quick Drawer | `ORIGINAL_REQUEST.md`, `docs/DBD.md §4.1` |
| 4 | Navbar | Circular Menu Button `( = )` | Aspect-square circular button with double horizontal lines `( = )` matching Eloqwnt signature style. Triggers slide-over Quick Drawer. | Click event, keyboard Enter/Space | Opens Quick Drawer (`isDrawerOpen: true`) | Accessible ARIA attributes (`aria-label`, `aria-expanded`) | `ORIGINAL_REQUEST.md`, `docs/DBD.md §4.1`, `src/components/ui/button.tsx` |
| 5 | Navbar | Action Pill `Let's chat` | Soft gray `#F0F0F3` pill button (`bg-pill-soft text-foreground hover:bg-pill-hover`) with rounded-full styling, subtle border, and tactile hover lift. Single-line label without wrapping. STRICT: NO emoji! | Click event | Smooth scroll to contact / inquiry section | Single-line wrap protection (`whitespace-nowrap`) | `ORIGINAL_REQUEST.md`, `taste-skill §3.D & §4.5`, `docs/DBD.md §2.1` |
| 6 | Navbar | Hydration-Safe Theme Switcher | Interactive button to toggle between Light Mode and Dark Mode via `next-themes` (`useTheme()`). Displays `Moon` in Light mode and `Sun` in Dark mode with subtle rotation on hover. | Click event | Cycles `theme` class on `<html>` without flicker (FOUC = 0) | Renders placeholder during SSR/pre-hydration to prevent CLS | `docs/PRD.md §4 F-06`, `docs/TRD.md §5`, `docs/AFD.md §3.3` |
| 7 | Quick Drawer | Slide-over Overlay & Backdrop Blur | Fullscreen modal overlay (`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm`) with right-aligned slide-out drawer panel (`max-w-sm sm:max-w-md bg-background border-l border-border/60 shadow-2xl`). | Triggered by `( = )` | Slides into view from right (`x: 0`) | Closes on backdrop click or ESC key press | `ORIGINAL_REQUEST.md`, `docs/AFD.md §3.2`, `taste-skill §3.A` |
| 8 | Quick Drawer | Drawer Navigation & Status Badge | Large typography nav items (`01 / Home`, `02 / About`, `03 / Works & Case Studies`, `04 / Services & Solutions`, `05 / System Architecture`, `06 / Contact`) + embedded live pulsing emerald badge `<Badge variant="beacon">Available for Projects</Badge>`. | Click event | Smooth scrolls to target and closes drawer | Body scroll locked while drawer is active (`overflow: hidden`) | `ORIGINAL_REQUEST.md`, `docs/IPD.md §2 Fase 2`, `src/components/ui/badge.tsx` |
| 9 | Quick Drawer | Direct Contact CTA & Social Links | Drawer bottom card: direct email contact + clean external social media links (GitHub, LinkedIn, Twitter/X, Email) with icon + text pairing. STRICT: NO emojis! | Click / external navigation | Opens external tab (`target="_blank" rel="noopener noreferrer"`) or mailto | Valid rel attributes for security | `ORIGINAL_REQUEST.md`, `docs/PRD.md §4 F-07` |
| 10 | Hero Section | Viewport-Stabilized Editorial Layout | Centered editorial layout with generous negative space, viewport-safe sizing (`min-h-[calc(100dvh-5rem)]` or `min-h-[85vh]`), and top padding capped at `pt-16` / `pt-20` (taste-skill §4.7). | Viewport resize | Stable hero height without iOS Safari address bar jitter | Strictly max 4 text elements in hero stack | `taste-skill §3.E & §4.7`, `docs/DBD.md §4.2` |
| 11 | Hero Section | Kicker Text | Concise value-proposition kicker above headline: *"Helping fast-moving startups and companies build scalable, high-performance web products."* Set in `Plus Jakarta Sans` Medium, text-muted-foreground. STRICT: NO emojis! | None | Rendered text | Text max 20 words / 2 lines | `ORIGINAL_REQUEST.md`, `docs/DBD.md §4.2`, `taste-skill §4.7` |
| 12 | Hero Section | Giant Centered Monochromatic Headline | High-contrast headline: *"Senior Full-Stack Software Engineer building scalable products with precision & impact"*. Set in `Space Grotesk` bold (`text-4xl sm:text-6xl md:text-7xl lg:text-7xl tracking-tighter`). Pure black in light mode, crisp white in dark mode. STRICT: NO purple gradient! | Theme state | High-contrast pure black / crisp white | Fits within 2 lines on desktop, leading-[1.08] | `ORIGINAL_REQUEST.md`, `docs/DBD.md §4.2`, `taste-skill §4.1 & §4.2` |
| 13 | Hero Section | Action Pill `Book strategy call` | Eloqwnt-grade soft gray `#F0F0F3` action pill button (`bg-pill-soft text-foreground hover:bg-pill-hover`) with tactile hover lift (`hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]`). STRICT: NO emoji! | Click event | Smooth scrolls to inquiry form | Fits on single line on desktop (`whitespace-nowrap`) | `ORIGINAL_REQUEST.md`, `docs/DBD.md §2.1 & §4.2`, `taste-skill §4.5` |
| 14 | Hero Section | Centered Circular Black Scroll Button `( ↓ )` | 36px-44px circular black button (`bg-foreground text-background hover:bg-foreground/85`) with centered white down arrow `↓`. Centered directly below the action pill. | Click event | Smoothly scrolls down to next section (`showcase` / `projects`) | `aria-label="Scroll to next section"`, keyboard accessible | `ORIGINAL_REQUEST.md`, `docs/DBD.md §4.2`, `src/components/ui/button.tsx` |
| 15 | Hero Section | Infinite Smooth CSS Marquee Ticker | Continuous 60fps hardware-accelerated horizontal running ticker with `/` dividers: `/ 99.98% SYSTEM UPTIME · SCALE PROVEN   / SUB-100MS API RESPONSE LATENCY   / $85M+ TRANSACTION VOLUME HANDLED   / 15+ ENTERPRISE RELEASES SHIPPED   / ZERO RUNTIME VULNERABILITIES`. Pauses smoothly on hover. Max 1 marquee on page. | Pointer hover / CSS loop | Continuous seamless scroll | Pauses on `:hover`, disables animation on `prefers-reduced-motion` | `ORIGINAL_REQUEST.md`, `docs/DBD.md §4.2`, `taste-skill §5 & §6.A` |
| 16 | Page Shell | Page Integration in `src/app/page.tsx` | Mount `<Navbar />` and `<HeroSection />` directly at top of `src/app/page.tsx`. House existing Phase 1 UI Atoms Showcase under `<section id="showcase">` (or `<section id="atoms">`) to receive smooth scroll target. | Render cycle | Complete, unified single-page application | Zero console errors, zero hydration errors | `ORIGINAL_REQUEST.md`, `orchestrator_phase2_1/SCOPE.md` |

---

## 3. Edge Cases & Handling Matrix

| # | Feature | Input / Condition | Observed / Required Behavior | Mitigating Architecture |
|---|---------|-------------------|-----------------------------|-------------------------|
| 1 | Navbar | Mobile Viewport (< 640px) | Center navigation links would overflow single line | Center links hidden on mobile (`hidden md:flex`); Quick Drawer button `( = )` stays visible and accessible. |
| 2 | Navbar | Theme Switcher Hydration | SSR HTML rendered before client theme is resolved | Implement `mounted` guard (`useState(false)` + `useEffect(() => setMounted(true))`); render exact-size placeholder button during SSR to guarantee CLS = 0. |
| 3 | Quick Drawer | User presses `Escape` key | Drawer should close immediately and return focus | Global `keydown` event listener attached when drawer is open; dispatches `close()` on `e.key === "Escape"`. Listener removed on unmount. |
| 4 | Quick Drawer | User clicks outside drawer on blurred backdrop | Drawer should close immediately | Backdrop overlay has `onClick={onClose}` handler. |
| 5 | Quick Drawer | Document background scrolling while drawer open | Background content scrolls behind drawer causing visual disorientation | Set `document.body.style.overflow = "hidden"` on drawer open; restore to `""` on close and on unmount cleanup. |
| 6 | Quick Drawer | User clicks a navigation link inside drawer | Target section is scrolled to, but drawer remains open covering viewport | Nav link `onClick` handler executes `onClose()` first, then smoothly scrolls to the target anchor. |
| 7 | Hero Section | Mobile Viewport (< 480px) headline scaling | `text-7xl` would cause 5-6 lines and massive vertical overflow | Responsive font scale: `text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]` ensuring headline fits neatly within 2-3 lines on mobile and 2 lines on desktop. |
| 8 | Hero Section | Initial Viewport Overflow on iOS Safari | `100vh` ignores mobile bottom browser bar and causes layout jump | Use `min-h-[calc(100dvh-5rem)]` with `dvh` units (taste-skill §3.E). Top padding capped at `pt-12 sm:pt-16` (taste-skill §4.7). |
| 9 | Hero Section | Marquee Ticker seam / gap glitch | After one cycle of translateX, blank space appears before second cycle begins | Duplicate the metric ticker array (e.g. `[...metrics, ...metrics]`), set container to `flex whitespace-nowrap`, and animate `translateX(0)` to `translateX(-50%)` in an infinite linear loop. |
| 10 | Hero Section | Marquee Ticker on CPU / Low-Power Device | Layout thrashing from animating non-GPU properties | Strictly animate `transform: translate3d(...)` with `will-change: transform` and `transform-gpu` utility. Zero changes to `left`, `margin`, or `width`. |
| 11 | Hero Section | Accessibility: User prefers reduced motion | Marquee motion causes vestibular discomfort | Add `@media (prefers-reduced-motion: reduce)` rule or `motion-reduce:animate-none` with horizontal scrollable or static wrapped view. |
| 12 | Action Buttons | CTA Button Text Wrapping | Responsive shrinking causes "Book strategy call" to wrap into 2 lines | Apply `whitespace-nowrap` on all CTA buttons (`Book strategy call`, `Let's chat`). |
| 13 | Color System | Accidental Purple / Lila Ingestion | Generic AI prompts often inject `from-purple-500` or `indigo-600` | Strict ban: Audit all CSS classes. Color tokens strictly confined to `#FFFFFF`, `#08080A`, neutral slate (`#E2E8F0` / `#27272A`), soft gray `#F0F0F3`, and electric blue `#2563EB` accent ONLY for the waveform logo. |
| 14 | Typography | Descender clipping on italic/display type | Display font clipping `g`, `y`, `p` under tight leading | Space Grotesk headline uses `leading-[1.1]` with adequate bottom padding (`pb-1`) to clear descenders (taste-skill §4.1). |

---

## 4. Technical Specifications & Interface Contracts

### 4.1 Navbar (`src/components/navbar.tsx`)
```typescript
export interface NavItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
}

export interface NavbarProps {
  brandName?: string;
  onContactClick?: () => void;
  className?: string;
}
```
- **Structure**:
  - `<header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">`
    - `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">`
      - **Left**:
        - Waveform Icon: `<svg>` containing 5 vertical rounded rectangles with fill `#2563EB`.
        - Wordmark: `<span className="font-display font-bold text-base sm:text-lg tracking-tight text-foreground">developer.</span>`
      - **Center**:
        - `<nav className="hidden md:flex items-center gap-6 lg:gap-8">`
        - Nav links with subtle arrow indicator: `Home`, `About ↓`, `Works ↓`, `Services ↓`, `Stack`, `Contact`.
      - **Right**:
        - Menu button: `<Button variant="circle-menu" size="sm" onClick={() => setDrawerOpen(true)} aria-label="Open menu">`
          - Custom double bar icon `( = )`
        - Chat button: `<Button variant="pill-soft" size="sm" className="whitespace-nowrap font-medium" onClick={handleChatClick}>Let's chat</Button>`
        - Theme switcher: `<Button variant="ghost" size="icon" onClick={toggleTheme}>` with `<Sun />` or `<Moon />`.

### 4.2 Quick Drawer (Integrated in `src/components/navbar.tsx` or Sub-Component)
```typescript
export interface QuickDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}
```
- **States & Handlers**:
  - `isOpen: boolean`
  - Keyboard listener: `Escape` -> `onClose()`
  - Document lock: `document.body.style.overflow = isOpen ? "hidden" : ""`
  - Backdrop click -> `onClose()`
  - Social Links:
    - GitHub (`https://github.com`), LinkedIn (`https://linkedin.com`), Twitter/X (`https://x.com`), Email (`mailto:hello@developer.com`).

### 4.3 Hero Section (`src/components/hero-section.tsx`)
```typescript
export interface HeroSectionProps {
  onStrategyCallClick?: () => void;
  onScrollNextClick?: () => void;
  className?: string;
}
```
- **Structure**:
  - `<section className="relative min-h-[calc(100dvh-5rem)] flex flex-col justify-between pt-12 sm:pt-16 pb-6 overflow-hidden">`
    - `<div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8 flex-1 flex flex-col justify-center items-center">`
      - **Kicker**: `<p className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground tracking-wide max-w-2xl leading-relaxed">Helping fast-moving startups and companies build scalable, high-performance web products.</p>`
      - **Giant Headline**: `<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tighter text-foreground leading-[1.08] max-w-4xl">Senior Full-Stack Software Engineer building scalable products with precision & impact</h1>`
      - **Action Pill**: `<Button variant="pill-soft" size="lg" className="rounded-full px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap" onClick={handleStrategyClick}>Book strategy call</Button>`
      - **Centered Circular Scroll Button**: `<button onClick={handleScrollNext} className="mt-4 h-10 w-10 sm:h-11 sm:w-11 rounded-full aspect-square bg-foreground text-background hover:bg-foreground/85 active:scale-95 transition-all shadow-md flex items-center justify-center" aria-label="Scroll to next section"><ArrowDown className="h-4 w-4" /></button>`
    - **Infinite Marquee Ticker**:
      - Wrapper: `<div className="w-full border-y border-border/40 py-3.5 sm:py-4 bg-muted/10 overflow-hidden select-none group">`
      - Track: `<div className="flex whitespace-nowrap will-change-transform transform-gpu animate-marquee group-hover:[animation-play-state:paused]">`
      - Ticker Items with `/` dividers:
        - `/ 99.98% SYSTEM UPTIME · SCALE PROVEN`
        - `/ SUB-100MS API RESPONSE LATENCY`
        - `/ $85M+ TRANSACTION VOLUME HANDLED`
        - `/ 15+ ENTERPRISE RELEASES SHIPPED`
        - `/ ZERO RUNTIME VULNERABILITIES`
      - Repeated 2x or 3x for continuous seamless loop.

### 4.4 Page Shell (`src/app/page.tsx`)
- Mount `<Navbar />` at top.
- Mount `<HeroSection onScrollNextClick={scrollToShowcase} />`.
- Existing Phase 1 UI Atoms showcase housed in `<section id="showcase" className="...">` so scrolling works smoothly.
- Zero duplicate headers or banners.

---

## 5. CSS & Styling Specifications

### 5.1 Keyframe Animation (`src/app/globals.css` or Tailwind config)
```css
@keyframes marquee {
  0% {
    transform: translate3d(0%, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

### 5.2 Color Tokens Cross-Reference
- Light Background: `hsl(var(--background))` (`#F8FAFC` / `#FFFFFF`)
- Light Foreground: `hsl(var(--foreground))` (`#0F172A` / `#08080A`)
- Dark Background: `hsl(var(--background))` (`#08080A`)
- Dark Foreground: `hsl(var(--foreground))` (`#F8FAFC`)
- Pill Soft Background: `hsl(var(--pill-soft))` (`#F0F0F3` light / `rgba(255,255,255,0.08)` dark)
- Pill Hover Background: `hsl(var(--pill-hover))` (`#E4E4E9` light / `rgba(255,255,255,0.15)` dark)
- Waveform Accent Brand: `#2563EB` (Electric Blue)
- Muted Dividers: `hsl(var(--border))` (`#E2E8F0` light / `#27272A` dark)
