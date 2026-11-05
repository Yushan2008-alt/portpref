# Phase 2 Motion, Interaction & Responsive Architecture Analysis

## Executive Summary
This document provides the definitive technical specification and architectural blueprint for **Phase 2: Sticky Navbar & Dynamic Hero Section** in accordance with `ORIGINAL_REQUEST.md`, `SCOPE.md`, `docs/DBD.md`, and the `taste-skill` anti-slop guidelines.

Core focus areas investigated:
1. **Quick Drawer slide-over mechanics**: Accessible overlay, Framer Motion spring physics, keyboard/click outside dismiss, and scroll lock.
2. **Infinite 60fps CSS Marquee running ticker**: Hardware-accelerated GPU translation (`transform: translate3d`), pause on hover, seamless dual-track loop.
3. **Responsive design & layout hierarchy**: Desktop (1280px/1024px) down to mobile (375px), 3-part navbar layout, centered giant headline, and action pill.
4. **Waveform SVG logo**: 5-bar dynamic acoustic profile in electric blue `#2563EB`.
5. **Theme toggle**: Zero-flicker hydration-safe implementation via `next-themes`.

---

## 1. Quick Drawer Mechanics & Architecture

### 1.1 Trigger & State Flow
- **Trigger Element**: The circular button `( = )` in `Navbar` (right action cluster).
- **Component variant**: Uses existing `<Button variant="circle-menu" size="default">` from `src/components/ui/button.tsx`.
- **State**: `const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);`
- **Trigger Rendering**:
  ```tsx
  <Button
    variant="circle-menu"
    size="default"
    onClick={() => setIsDrawerOpen(true)}
    aria-label="Open navigation menu drawer"
    aria-expanded={isDrawerOpen}
    className="group"
  >
    {/* Minimalist monospace glyph matching Eloqwnt design */}
    <span className="font-mono text-xs font-bold tracking-tighter select-none">( = )</span>
  </Button>
  ```

### 1.2 Modal Slide-Over Architecture
- **Rendering via Portal**: Rendered directly into `document.body` using `createPortal` to avoid stacking context traps or z-index collisions with sticky parents.
- **SSR Guard**: Gated by `mounted` state (`React.useEffect(() => setMounted(true), [])`).
- **Motion & Physics Engine**: Powered by `framer-motion` (`^11.11.0` already installed):
  - **Backdrop Overlay**:
    - Tag: `<motion.div>`
    - Classes: `fixed inset-0 z-50 bg-black/50 backdrop-blur-sm`
    - Animation:
      - `initial={{ opacity: 0 }}`
      - `animate={{ opacity: 1 }}`
      - `exit={{ opacity: 0 }}`
      - `transition={{ duration: 0.25, ease: "easeOut" }}`
  - **Drawer Container**:
    - Tag: `<motion.aside>`
    - Role: `role="dialog" aria-modal="true" aria-label="Navigation drawer"`
    - Placement: `fixed top-0 right-0 z-50 h-full w-full max-w-[360px] sm:max-w-md bg-background/95 backdrop-blur-xl border-l border-border/60 shadow-2xl flex flex-col justify-between p-6 sm:p-8`
    - Spring Physics:
      - `initial={{ x: "100%" }}`
      - `animate={{ x: 0 }}`
      - `exit={{ x: "100%" }}`
      - `transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}`

### 1.3 Event Listeners & Scroll Locking
- **ESC Key Dismissal**:
  ```tsx
  React.useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);
  ```
- **Outside Click Dismissal**: Handled inherently by clicking the `<motion.div className="fixed inset-0 ...">` backdrop.
- **Body Scroll Lock**:
  ```tsx
  React.useEffect(() => {
    if (!isDrawerOpen) return;
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isDrawerOpen]);
  ```

### 1.4 Navigation Links & Social Links Structure
- **Navigation Links**:
  ```ts
  export const DRAWER_NAV_ITEMS = [
    { label: "Home", href: "#", subtitle: "Top of canvas" },
    { label: "About", href: "#about", subtitle: "Background & philosophy" },
    { label: "Works", href: "#works", subtitle: "Featured enterprise case studies" },
    { label: "Services", href: "#services", subtitle: "Architecture & full-stack development" },
    { label: "Stack", href: "#stack", subtitle: "Core technologies & proficiencies" },
    { label: "Contact", href: "#contact", subtitle: "Start a conversation" },
  ];
  ```
  - Item styling: `text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground hover:text-primary transition-all duration-200 py-3 border-b border-border/20 flex items-center justify-between group`
  - Subtle interactive chevron / arrow on hover: `<ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />`
- **Social Links**:
  ```ts
  export const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "Twitter/X", href: "https://x.com", icon: Twitter },
    { label: "Email", href: "mailto:contact@developer.io", icon: Mail },
  ];
  ```
  - Displayed at the bottom drawer footer with circular capsule icons (`h-10 w-10 rounded-full border border-border/60 bg-muted/40 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105`).

---

## 2. Infinite Smooth CSS Marquee Running Ticker Architecture

### 2.1 The Required Content & Editorial Structure
- Exact metric text required:
  `/ 99.98% SYSTEM UPTIME · SCALE PROVEN   / SUB-100MS API RESPONSE LATENCY   / $85M+ TRANSACTION VOLUME HANDLED   / 15+ ENTERPRISE RELEASES SHIPPED   / ZERO RUNTIME VULNERABILITIES`
- Data representation:
  ```ts
  export const MARQUEE_METRICS = [
    "99.98% SYSTEM UPTIME · SCALE PROVEN",
    "SUB-100MS API RESPONSE LATENCY",
    "$85M+ TRANSACTION VOLUME HANDLED",
    "15+ ENTERPRISE RELEASES SHIPPED",
    "ZERO RUNTIME VULNERABILITIES",
  ];
  ```

### 2.2 Why Hardware-Accelerated CSS Outperforms JS for Tickers
1. **Compositor Thread Execution**: CSS `transform: translate3d()` operations run on the browser's GPU Compositor Thread, completely isolated from JavaScript's main UI thread.
2. **Zero Render Latency**: React state updates, hydration events, or garbage collection pauses will never cause micro-stutters or frame drops.
3. **60fps Guaranteed**: Utilizing `will-change: transform` informs the browser rendering engine to promote the marquee track to a dedicated GPU layer.
4. **Pause on Hover**: Seamlessly handled via CSS `group-hover:[animation-play-state:paused]` with zero JavaScript overhead.

### 2.3 Mathematical Seamless Looping Pattern
To guarantee an imperceptible loop wrap without glitches:
- Let $W$ be the total rendered width of the 5 metrics items.
- We render two identical tracks side-by-side inside a flex wrapper:
  - Track 1 (Original items 1..5)
  - Track 2 (Cloned items 1..5 with `aria-hidden="true"`)
- The flex wrapper has width $2W$.
- We animate the flex wrapper from `transform: translate3d(0, 0, 0)` to `transform: translate3d(-50%, 0, 0)`.
- At $-50\%$, Track 1 has translated by $-W$ (offscreen left), and Track 2 occupies the exact spatial pixels Track 1 started at.
- The browser restarts the cycle at $0\%$ without any perceptible visual shift.

### 2.4 Complete CSS & Tailwind Implementation
In `tailwind.config.ts` or `src/app/globals.css`:
```css
@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: marquee 35s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation-play-state: paused;
  }
}
```

Component Markup:
```tsx
<section
  aria-label="Engineering metrics ticker"
  className="group relative w-full overflow-hidden border-y border-border/60 bg-muted/20 py-4 select-none"
>
  {/* Left & Right Luxury Vignette Mask */}
  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-background to-transparent" />
  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-background to-transparent" />

  <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
    {/* Set 1 */}
    <div className="flex items-center shrink-0">
      {MARQUEE_METRICS.map((metric, idx) => (
        <div key={`m1-${idx}`} className="flex items-center">
          <span className="mx-6 sm:mx-8 text-base font-bold font-mono text-muted-foreground/40 select-none">
            /
          </span>
          <span className="text-xs sm:text-sm md:text-base font-bold font-display uppercase tracking-widest text-foreground whitespace-nowrap">
            {metric}
          </span>
        </div>
      ))}
    </div>

    {/* Set 2 (Cloned for infinite seamless loop) */}
    <div className="flex items-center shrink-0" aria-hidden="true">
      {MARQUEE_METRICS.map((metric, idx) => (
        <div key={`m2-${idx}`} className="flex items-center">
          <span className="mx-6 sm:mx-8 text-base font-bold font-mono text-muted-foreground/40 select-none">
            /
          </span>
          <span className="text-xs sm:text-sm md:text-base font-bold font-display uppercase tracking-widest text-foreground whitespace-nowrap">
            {metric}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 3. Responsive Design & Layout Hierarchy

### 3.1 Breakpoint System Matrix
| Breakpoint | Target Screen Width | Navbar Adaptation | HeroSection Adaptation |
| :--- | :--- | :--- | :--- |
| **Mobile (`< 640px`)** | 375px - 639px | Center links hidden; brand logo left; `( = )` + theme toggle right; drawer slides 100% width | Kicker 13px; Headline 36px - 42px bold; CTA pill full-width or auto; circular scroll 40px |
| **Tablet (`640px - 767px`)** | 640px - 767px | Center links hidden; brand logo left; `( = )` + `Let's chat` + theme toggle; drawer 360px | Kicker 14px; Headline 48px - 54px; CTA pill auto width; circular scroll 44px |
| **Desktop (`768px - 1023px`)** | 768px - 1023px | Center links visible (`gap-1 text-xs`); right action buttons compact | Kicker 15px; Headline 60px; CTA pill soft hover lift; circular scroll 48px |
| **Large Desktop (`>= 1024px`)** | 1024px - 1440px+ | Full 3-part layout; nav links with dropdown indicators; max container 1280px (`max-w-7xl`) | Kicker 16px; Headline 72px bold leading-[1.08]; max-w-4xl headline container; 60fps marquee |

### 3.2 3-Part Navbar Specification
- **Sticky Configuration**: `sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/40 transition-colors`
- **Left Cluster**:
  - Waveform SVG (27x24px, #2563EB)
  - Brand text: `developer.` or `portfolio.` in `font-display font-bold text-base tracking-tight`
- **Center Cluster**:
  - Hidden on mobile (`hidden md:flex items-center gap-1.5`)
  - Items: `Home`, `About ↓`, `Works ↓`, `Services ↓`, `Stack`, `Contact`
  - Style: `px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors`
- **Right Cluster**:
  - `flex items-center gap-2 sm:gap-3`
  - Circular button: `( = )` (`Button variant="circle-menu"`)
  - Pill button: `Let's chat` (`Button variant="pill-soft"` with `rounded-full bg-pill-soft text-foreground hover:bg-pill-hover font-medium px-4 py-2 border border-border/40 shadow-sm`)
  - Theme Switcher: `☀️ / 🌙` (`ThemeToggle`)

### 3.3 HeroSection Specification
- **Padding & Container**: `pt-20 pb-12 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 sm:space-y-10`
- **Kicker**:
  - Text: *"Helping fast-moving startups and companies build scalable, high-performance web products."*
  - Style: `text-xs sm:text-sm md:text-base font-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed`
- **Giant Headline**:
  - Text: *"Senior Full-Stack Software Engineer building scalable products with precision & impact"*
  - Style: `font-display font-extrabold tracking-tight text-foreground text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.06] max-w-4xl mx-auto`
  - Strict Rule: Pure black in light mode, crisp white in dark mode (`text-zinc-950 dark:text-zinc-50`). STRICT: NO purple gradient, NO multicolored fills.
- **Action Pill**:
  - Text: `Book strategy call` (STRICT: NO emoji).
  - Style: `Button variant="pill-soft" size="lg"` with `#F0F0F3` light mode / `#18181B` dark mode, hover elevation lift (`hover:-translate-y-0.5 transition-transform`).
- **Centered Scroll Down Button**:
  - Variant: `Button variant="circle-scroll"`
  - Dimensions: `h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-foreground text-background shadow-md hover:scale-105 active:scale-95 transition-all`
  - Icon: `<ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />`
  - Interaction: Smooth scroll down to next section (`document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })`).
- **Linear Running Marquee**:
  - Mounted directly under the hero interaction area spanning the entire viewport width.

---

## 4. Waveform SVG Design Specification

### 4.1 Acoustic Geometry & Coordinates
- **Aesthetic**: Dynamic equalizer/acoustic sound wave, expressing precision, signal clarity, and real-time computation.
- **Bar Count**: Exactly 5 vertical bars.
- **Color**: `#2563EB` (Electric Blue).
- **ViewBox**: `0 0 27 24`
- **Bar Parameters**:
  - Bar 1: `x="1"  y="7" width="3" height="10" rx="1.5"`
  - Bar 2: `x="7"  y="3" width="3" height="18" rx="1.5"`
  - Bar 3: `x="13" y="5" width="3" height="14" rx="1.5"`
  - Bar 4: `x="19" y="1" width="3" height="22" rx="1.5"`
  - Bar 5: `x="25" y="6" width="3" height="12" rx="1.5"`
- **Component Code**:
  ```tsx
  export function WaveformLogo({ className }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 29 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-5 w-auto text-[#2563EB]", className)}
        aria-hidden="true"
      >
        <rect x="1" y="7" width="3" height="10" rx="1.5" fill="#2563EB" />
        <rect x="7" y="3" width="3" height="18" rx="1.5" fill="#2563EB" />
        <rect x="13" y="5" width="3" height="14" rx="1.5" fill="#2563EB" />
        <rect x="19" y="1" width="3" height="22" rx="1.5" fill="#2563EB" />
        <rect x="25" y="6" width="3" height="12" rx="1.5" fill="#2563EB" />
      </svg>
    );
  }
  ```

---

## 5. Theme Toggle Implementation without Hydration Flicker

### 5.1 Hydration Challenge in Next.js 14 App Router
- During Server-Side Rendering (SSR), `useTheme()` returns `theme = undefined` or the default theme because client `localStorage` is not accessible on the server.
- If the server renders `<Moon />` and the client rehydrates with `<Sun />`, React triggers Hydration Mismatch Error (Error #418 / #425).

### 5.2 The Robust Zero-Flicker Architecture
1. In `src/app/layout.tsx`:
   - `html` element contains `suppressHydrationWarning`.
   - `ThemeProvider` has `attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange`.
2. In `ThemeToggle` component:
   - Use a `mounted` boolean flag initialized to `false` and set to `true` in `React.useEffect`.
   - Before `mounted` is true, render a structural placeholder with exact same dimensions (`h-9 px-3 gap-2`) or neutral icon to prevent layout shifts.
3. Component Code:
   ```tsx
   "use client";

   import * as React from "react";
   import { useTheme } from "next-themes";
   import { Sun, Moon } from "lucide-react";
   import { Button } from "@/components/ui/button";

   export function ThemeToggle({ className }: { className?: string }) {
     const { theme, setTheme } = useTheme();
     const [mounted, setMounted] = React.useState(false);

     React.useEffect(() => {
       setMounted(true);
     }, []);

     const toggleTheme = () => {
       setTheme(theme === "dark" ? "light" : "dark");
     };

     return (
       <Button
         variant="pill-soft"
         size="sm"
         onClick={toggleTheme}
         className={cn("h-9 px-3 gap-2 text-xs font-mono select-none", className)}
         aria-label="Toggle color theme"
       >
         {mounted ? (
           theme === "dark" ? (
            <>
              <Sun className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
           ) : (
            <>
              <Moon className="h-3.5 w-3.5 text-zinc-700" />
              <span className="hidden sm:inline">Dark</span>
            </>
           )
         ) : (
           <>
             <span className="h-3.5 w-3.5 rounded-full bg-muted-foreground/30 animate-pulse" />
             <span className="hidden sm:inline">Theme</span>
           </>
         )}
       </Button>
     );
   }
   ```

---

## 6. Synthesis & Implementation Checklist for Worker

1. `src/components/navbar.tsx`:
   - Include `WaveformLogo`, navigation links, quick action buttons, theme toggle, and `<QuickDrawer>`.
2. `src/components/hero-section.tsx`:
   - Include kicker text, Space Grotesk headline, action pill, circular scroll button with smooth scroll handler, and `<MarqueeTicker>`.
3. `src/app/page.tsx`:
   - Replace or precede existing Phase 1 showcase with `<Navbar />` and `<HeroSection />`.
4. Verification:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run build`
