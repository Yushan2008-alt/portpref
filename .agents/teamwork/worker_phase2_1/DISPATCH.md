## 2026-11-05T14:25:23Z
You are worker_phase2_1 (teamwork_worker).
Your working directory is: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase2_1\
The project root is: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY INSTRUCTIONS:
1. You MUST read ORIGINAL_REQUEST.md at c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\ORIGINAL_REQUEST.md.
2. Read the handoff reports from the explorers:
   - c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\spec_miner_phase2_1\handoff.md
   - c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase2_1\handoff.md
   - c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase2_2\handoff.md
3. Read the taste-skill instructions at c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\skills\taste-skill\SKILL.md.

FILE OWNERSHIP (Exclusive write access):
- `src/components/navbar.tsx`
- `src/components/hero-section.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`

YOUR TASK — Implement Phase 2:
1. Create `src/components/navbar.tsx`:
   - Sticky top bar with `backdrop-blur-md bg-background/80 border-b border-border/40`.
   - 3-part layout:
     - Left: 5-bar electric blue waveform logo SVG/icon (#2563EB) + brand text `developer.` / `portfolio.`
     - Center: Nav links (`Home`, `About ↓`, `Works ↓`, `Services ↓`, `Stack`, `Contact`) with subtle hover transitions.
     - Right: Circular button `( = )` + Pill button `Let's chat` (STRICT: NO emoji) + Theme Switcher (`☀️ / 🌙` using Lucide Sun/Moon icons, hydration-safe).
   - Quick Drawer:
     - Triggered by clicking circular button `( = )`.
     - Sleek Slide-over Quick Drawer with backdrop blur overlay, smooth slide-in transition from right, ESC key dismissal, backdrop click dismissal, and body scroll lock.
     - Contains navigation links and social links (`GitHub`, `LinkedIn`, `Twitter/X`, `Email`).
2. Create `src/components/hero-section.tsx`:
   - Kicker text: "Helping fast-moving startups and companies build scalable, high-performance web products."
   - Giant Centered Headline: "Senior Full-Stack Software Engineer building scalable products with precision & impact" (Space Grotesk, bold, pure black in light mode, crisp white in dark mode, STRICT: NO purple gradient).
   - Action Pill: `Book strategy call` (STRICT: NO emoji, soft gray #F0F0F3 with hover lift).
   - Centered circular black scroll button with white down arrow `( ↓ )` that smoothly scrolls down to the next section.
   - Infinite Smooth CSS Marquee Running Ticker:
     `/ 99.98% SYSTEM UPTIME · SCALE PROVEN   / SUB-100MS API RESPONSE LATENCY   / $85M+ TRANSACTION VOLUME HANDLED   / 15+ ENTERPRISE RELEASES SHIPPED   / ZERO RUNTIME VULNERABILITIES` (with `/` dividers, pause on hover, 60fps hardware acceleration via `translate3d`).
3. In `src/app/globals.css` (or `tailwind.config.ts`):
   - Add `@keyframes marquee` and `.animate-marquee` for smooth infinite scrolling with `translate3d(0,0,0)` to `translate3d(-50%,0,0)`, `animation-play-state: paused` on hover.
4. Update `src/app/page.tsx`:
   - Mount `<Navbar />` and `<HeroSection />`.
   - Wrap the existing showcase section in `<section id="showcase">` (or similar) so the scroll button `( ↓ )` targets it smoothly.
5. Verification (RUN EACH COMMAND AND DOCUMENT IN HANDOFF):
   - `npm run typecheck` (must pass with 0 errors)
   - `npm run lint` (must pass with 0 warnings)
   - `npm run build` (must pass clean static generation)
   - Verify zero emojis across all code/UI.
   - Verify zero purple color across all styling.
