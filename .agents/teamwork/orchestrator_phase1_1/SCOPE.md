# Scope: Phase 1 — UI Atoms Foundation & Interactive Showcase

## Architecture
- Design System: Minimalist Editorial / Neo-Brutalist Light, Tailwind CSS, Lucide icons, Framer Motion (if needed).
- Components:
  - `src/components/ui/button.tsx`
  - `src/components/ui/badge.tsx`
  - `src/components/ui/dialog.tsx`
  - `src/components/ui/input.tsx`
  - `src/components/ui/textarea.tsx`
- App Integration:
  - `src/app/layout.tsx` updated with `defaultTheme="light"`
  - `src/app/page.tsx` updated with Interactive Design System & UI Atoms Showcase

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Button Component | Button with variants (default, pill-soft, circle-menu, circle-scroll, outline, ghost) and sizes (default, sm, lg, icon) | Phase 1 | ORIGINAL_REQUEST.md / IPD.md |
| 2 | Badge Component | Badge with variants (default, beacon with pulsing emerald dot, pill-tag, outline, secondary) | Phase 1 | ORIGINAL_REQUEST.md / IPD.md |
| 3 | Dialog Component | Accessible modal dialog with backdrop blur, title, description, close trigger | Phase 1 | ORIGINAL_REQUEST.md / IPD.md |
| 4 | Input Component | Minimalist input field | Phase 1 | ORIGINAL_REQUEST.md / IPD.md |
| 5 | Textarea Component | Minimalist textarea | Phase 1 | ORIGINAL_REQUEST.md / IPD.md |
| 6 | Layout Default Theme | Set defaultTheme="light" in layout.tsx | Phase 1 | ORIGINAL_REQUEST.md / IPD.md |
| 7 | Showcase Page | Interactive Design System & UI Atoms Showcase in page.tsx with Theme Switcher, buttons, badges, inputs, textareas, modal trigger | Phase 1 | ORIGINAL_REQUEST.md / IPD.md |
| 8 | Quality Verification | npm run typecheck & npm run build pass with zero errors | Phase 1 | ORIGINAL_REQUEST.md / IPD.md |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Phase 1 UI Atoms & Showcase | Create UI atoms, update layout & page, verify typecheck/build | Phase 0 | DONE |

## Interface Contracts
### Button
- Props: `variant`: "default" | "pill-soft" | "circle-menu" | "circle-scroll" | "outline" | "ghost"
- `size`: "default" | "sm" | "lg" | "icon"
- Extends standard React button HTML attributes + forwardRef or standard React 18/19 patterns

### Badge
- Props: `variant`: "default" | "beacon" | "pill-tag" | "outline" | "secondary"
- Beacon variant includes a pulsing emerald indicator dot

### Dialog
- Components: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose
- Features backdrop blur, accessible keyboard/focus handling or clean React state handling, accessible ARIA attributes

### Input & Textarea
- Clean, minimalist styling matching Tailwind theme, proper focus rings, disabled states

## Code Layout
- `src/components/ui/` for primitive UI atoms
- `src/app/layout.tsx` for root layout & theme configuration
- `src/app/page.tsx` for showcase page
