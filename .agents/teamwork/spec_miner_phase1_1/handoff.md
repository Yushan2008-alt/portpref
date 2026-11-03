# Specification Mining Report: Phase 1 — UI Atoms Foundation & Interactive Showcase

## 1. Observation
- **Directives & Authoritative Sources Examined**:
  - `c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\ORIGINAL_REQUEST.md` (lines 23-34)
  - `c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\orchestrator_phase1_1\SCOPE.md` (lines 1-53)
  - `docs/IPD.md` (lines 36-42: Fase 1 Design System, Tokens & Typography Setup)
  - `docs/PRD.md` (lines 31-59: F-01 through F-07)
  - `docs/TRD.md` (lines 35-48, 70-123: Dependencies, Component Hierarchy, CSS Variable Tokens)
  - `docs/DBD.md` (lines 20-112: Design tokens, button styles, beacon badge, circle-menu, circle-scroll, input & textarea)
  - `docs/AFD.md` (lines 94-104: Modal Case Study State Machine)
  - `docs/BSD.md` (lines 228-266: Seed projects & case study content)
  - `package.json`: Contains `next-themes` (0.3.0), `clsx` (2.1.1), `tailwind-merge` (2.5.4), `lucide-react` (0.454.0), `framer-motion` (11.11.0). Note: `@radix-ui/react-dialog` is **not** in `package.json`.
  - `src/app/globals.css`: Already defines `--background`, `--foreground`, `--primary`, `--border`, `--input`, `--ring`, `--pill-soft`, `--pill-hover`, `--canvas` for both `:root` (light) and `.dark` (obsidian).
  - `src/app/layout.tsx`: Currently has `<ThemeProvider defaultTheme="dark" ...>`. Must be switched to `defaultTheme="light"`.
  - `src/lib/utils.ts`: Provides `cn(...inputs: ClassValue[])` using `clsx` and `twMerge`.
  - `npm run typecheck`: Verified working, clean 0 errors.

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs / Props | Outputs / DOM | Error Behavior | Discovered Via |
|---|----------|---------|-------------|----------------|---------------|----------------|----------------|
| 1 | UI Atom: Button | Button Component (`src/components/ui/button.tsx`) | Base button supporting 6 variants & 4 sizes with Tailwind & class merging (`cn`). | `variant`: `"default" \| "pill-soft" \| "circle-menu" \| "circle-scroll" \| "outline" \| "ghost"`<br>`size`: `"default" \| "sm" \| "lg" \| "icon"`<br>`className?: string`<br>standard `React.ButtonHTMLAttributes<HTMLButtonElement>` | `<button className="...">...</button>` with active/focus/hover states | Disabled state disables pointer events (`disabled:pointer-events-none disabled:opacity-50`) | ORIGINAL_REQUEST.md #1, docs/DBD.md §2.1 & §4.1-4.2, SCOPE.md |
| 2 | UI Atom: Button Variant | `default` variant | High-contrast primary action button. In Light mode: bold black (`#0A0A0A` / primary) with white text. In Dark mode: dark luxury styling. | Standard Button props | Solid background, hover opacity/brightness transition | N/A | docs/DBD.md §2.1 |
| 3 | UI Atom: Button Variant | `pill-soft` variant | Eloqwnt signature soft gray capsule button (`rounded-full`). Background `#f0f0f3` (`bg-pill-soft`), hover `#e4e4e9` (`hover:bg-pill-hover`), text `#0a0a0a` (foreground). In Dark mode: `dark:bg-white/10 dark:hover:bg-white/15 dark:text-foreground`. | Standard Button props | Capsule button with subtle hover elevation/tint | N/A | docs/DBD.md §1(3), §2.1, §4.1 |
| 4 | UI Atom: Button Variant | `circle-menu` variant | Circular button (`rounded-full aspect-square p-0 flex items-center justify-center`). Displays minimal menu icon `( = )` with subtle border/card background. | Standard Button props | Circular button element with centered icon/content | N/A | docs/DBD.md §4.1 |
| 5 | UI Atom: Button Variant | `circle-scroll` variant | Circular scroll/down button 36px x 36px (`h-9 w-9` or `h-10 w-10 aspect-square p-0 rounded-full`). Pure black background `#000000`, white arrow `↓`, hover 1.05x or opacity. Dark mode inverse (`dark:bg-white dark:text-black`). | Standard Button props | Circular dark icon button with centered arrow | N/A | docs/DBD.md §2.1, §3, §4.2 |
| 6 | UI Atom: Button Variant | `outline` variant | Clean border outline button with transparent background. Border uses `--border`. | Standard Button props | Bordered button with subtle background hover | N/A | docs/TRD.md §4, SCOPE.md |
| 7 | UI Atom: Button Variant | `ghost` variant | Borderless transparent button with hover background highlight. | Standard Button props | Transparent button with accent background hover | N/A | docs/TRD.md §4, SCOPE.md |
| 8 | UI Atom: Button Sizes | `default`, `sm`, `lg`, `icon` | Responsive padding & height scales:<br>- `default`: `h-10 px-4 py-2 text-sm`<br>- `sm`: `h-8 px-3 text-xs`<br>- `lg`: `h-12 px-8 text-base`<br>- `icon`: `h-10 w-10 p-0` | `size` prop | Appropriate Tailwind size classes | N/A | ORIGINAL_REQUEST.md #1, SCOPE.md |
| 9 | UI Atom: Badge | Badge Component (`src/components/ui/badge.tsx`) | Status & categorization pill badge supporting 5 variants. | `variant`: `"default" \| "beacon" \| "pill-tag" \| "outline" \| "secondary"`<br>`className?: string`<br>standard `React.HTMLAttributes<HTMLDivElement>` | `<div className="...">...</div>` inline-flex item | N/A | ORIGINAL_REQUEST.md #2, docs/PRD.md F-02, docs/DBD.md §4.2, SCOPE.md |
| 10 | UI Atom: Badge Variant | `beacon` variant | Status ketersediaan / "Available for Projects" badge with live pulsing emerald indicator dot (`animate-ping` ping ring + static emerald dot). Background `bg-emerald-500/10`, border `border-emerald-500/20`, text `text-emerald-700 dark:text-emerald-400`. | Standard Badge props | Pill with embedded dual-layer pulsing green indicator dot | N/A | docs/PRD.md F-02, docs/IPD.md Fase 2, docs/AFD.md §2 |
| 11 | UI Atom: Badge Variant | `pill-tag` variant | Eloqwnt tech stack tag badge (`rounded-full px-3 py-1 text-xs font-medium border border-border bg-secondary/50 dark:bg-white/5 text-foreground`). Used in case study cards & stack ticker. | Standard Badge props | Rounded capsule tag | N/A | docs/DBD.md §4.2, docs/TRD.md §4 |
| 12 | UI Atom: Badge Variant | `default`, `outline`, `secondary` | Standard semantic badges:<br>- `default`: `bg-primary text-primary-foreground`<br>- `outline`: `border border-border text-foreground`<br>- `secondary`: `bg-secondary text-secondary-foreground` | Standard Badge props | Styled inline-flex badge | N/A | ORIGINAL_REQUEST.md #2, SCOPE.md |
| 13 | UI Atom: Dialog | Dialog Component (`src/components/ui/dialog.tsx`) | Accessible modal dialog system with backdrop blur, title, description, and close trigger. Subcomponents:<br>- `Dialog`<br>- `DialogTrigger`<br>- `DialogContent`<br>- `DialogHeader`<br>- `DialogTitle`<br>- `DialogDescription`<br>- `DialogFooter`<br>- `DialogClose` | `open?: boolean`<br>`onOpenChange?: (open: boolean) => void`<br>`children: React.ReactNode` | Accessible modal rendered via Portal to `document.body` with `fixed inset-0 z-50 bg-black/50 backdrop-blur-md` and centered card window | ESC keydown closes; clicking outside overlay closes; locks background scroll | ORIGINAL_REQUEST.md #3, docs/AFD.md §3.2, docs/TRD.md §4, docs/PRD.md F-03 |
| 14 | UI Atom: Input | Input Component (`src/components/ui/input.tsx`) | Minimalist form input field with thin subtle border, smooth focus ring, light/dark mode adaptation. | `React.InputHTMLAttributes<HTMLInputElement>`<br>`className?: string` | `<input className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ..." />` | Disabled style applied on `disabled` attribute | ORIGINAL_REQUEST.md #4, docs/DBD.md §4.4, SCOPE.md |
| 15 | UI Atom: Textarea | Textarea Component (`src/components/ui/textarea.tsx`) | Minimalist form textarea for inquiry messages with matching styling and focus rings. | `React.TextareaHTMLAttributes<HTMLTextAreaElement>`<br>`className?: string` | `<textarea className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ..." />` | Disabled style applied on `disabled` attribute | ORIGINAL_REQUEST.md #5, docs/DBD.md §4.4, SCOPE.md |
| 16 | App Configuration | Default Theme Light | `src/app/layout.tsx` must configure `defaultTheme="light"` on `<ThemeProvider>` instead of `"dark"`. | `defaultTheme="light"` | Canvas initializes in Pristine Minimalist white canvas mode by default | `suppressHydrationWarning` on `<html>` prevents FOUC hydration mismatch | ORIGINAL_REQUEST.md #6, docs/DBD.md §1(1), §2.1 |
| 17 | Showcase Page | Interactive Atoms Showcase (`src/app/page.tsx`) | Comprehensive interactive testbed and showcase page demonstrating all Phase 1 components: Theme Switcher, buttons, badges, inputs, textareas, and modal dialog. | User interactions: theme toggle, input typing, dialog open/close | Rich Eloqwnt-grade showcase interface with live state, responsive grid, and zero console errors | Graceful degradation if client JS mounting is in-progress | ORIGINAL_REQUEST.md #7, SCOPE.md |

---

## 3. Edge Cases & Constraints

| # | Feature | Input / Condition | Observed / Required Behavior |
|---|---------|-------------------|-----------------------------|
| 1 | Theme Toggle & SSR | Initial server-side render before client mount | Theme toggle component must avoid hydration mismatch by ensuring mounted state (`mounted ? currentTheme : null`) or clean client component handling. |
| 2 | Dialog Portal in Next.js SSR | Rendering `DialogContent` before `document.body` is available in SSR | Dialog must check `typeof document !== 'undefined'` and wait for client mount before calling `createPortal(content, document.body)`. |
| 3 | Dialog Body Scroll Lock | Opening dialog locks scroll (`document.body.style.overflow = "hidden"`) | When dialog is closed or unmounted, `document.body.style.overflow` must be restored to its previous value to prevent layout freeze. |
| 4 | Dialog Keyboard Trap & ESC | Pressing ESC key while dialog is open | Keydown event listener must close dialog and stop propagation, cleaning up listeners on unmount. |
| 5 | Dialog Backdrop Click | User clicks on the blurred backdrop area outside the content card | Must trigger `onOpenChange(false)` without triggering when clicking inside the content card (propagation stop on card). |
| 6 | Radix UI Dependency Absence | `@radix-ui/react-dialog` is not installed in `package.json` | The Dialog system must be implemented as a clean, self-contained accessible React component (using React Context, Portal, accessibility ARIA attributes `role="dialog"`, `aria-modal="true"`) to follow Ponytail minimal bloat guidelines without unnecessary external packages. |
| 7 | Pulsing Beacon Indicator | Beacon badge rendering with or without text | The emerald pinging dot must be positioned neatly inline (`relative flex h-2 w-2 mr-2`), with outer span `animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75` and inner span `relative inline-flex rounded-full h-2 w-2 bg-emerald-500`. |
| 8 | Button `circle-menu` and `circle-scroll` Aspect Ratio | Text or icons passed into circular buttons | Variants must enforce `rounded-full aspect-square p-0 flex items-center justify-center` so that buttons remain perfect circles regardless of content padding. |
| 9 | Disabled State for Input & Textarea | `disabled={true}` passed to Input/Textarea | Must display `disabled:cursor-not-allowed disabled:opacity-50` and not respond to focus or input events. |

---

## 4. Logic Chain
1. **Observation 1**: The user's follow-up request specifically orders Phase 1 execution for 5 UI atoms (`button.tsx`, `badge.tsx`, `dialog.tsx`, `input.tsx`, `textarea.tsx`), updating `layout.tsx` to `defaultTheme="light"`, and building an interactive showcase in `page.tsx`.
2. **Observation 2**: `docs/DBD.md` defines the exact visual identity for Eloqwnt-grade: Pristine Minimalist canvas as default, with `#ffffff` background, `#0a0a0a` text, soft pill accents (`#f0f0f3` with `#e4e4e9` hover), circular scroll button with black background and white arrow `↓`, circular menu button with double line, and pulsing green availability beacon.
3. **Observation 3**: In `package.json`, Radix UI is not installed, but `clsx`, `tailwind-merge`, `lucide-react`, and `next-themes` are installed and working. Next.js 14 App Router and TypeScript strict mode are enabled and pass `npm run typecheck` cleanly.
4. **Logic Deduction 1**: The Button component must export standard button props and implement the 6 requested variants (`default`, `pill-soft`, `circle-menu`, `circle-scroll`, `outline`, `ghost`) and 4 sizes (`default`, `sm`, `lg`, `icon`), with `circle-scroll` defaulting to dark circular background and `circle-menu` providing circular styling.
5. **Logic Deduction 2**: The Badge component must support 5 variants (`default`, `beacon`, `pill-tag`, `outline`, `secondary`), with the `beacon` variant automatically rendering the pulsing emerald dot.
6. **Logic Deduction 3**: The Dialog component must provide accessible subcomponents (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`), with backdrop blur (`backdrop-blur-md`), keyboard ESC escape listener, outside click dismiss, and body scroll locking.
7. **Logic Deduction 4**: The Input and Textarea components must feature minimalist rounded-xl styling, subtle border, smooth focus rings (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1`), and full light/dark theme CSS variable support.
8. **Logic Deduction 5**: `src/app/layout.tsx` currently has `defaultTheme="dark"`. Changing it to `defaultTheme="light"` fulfills requirement 6 and matches `docs/DBD.md` §1 (Pristine Minimalist Canvas Default).
9. **Logic Deduction 6**: `src/app/page.tsx` must be converted into a rich Interactive Design System & UI Atoms Showcase, allowing visitors to test the Theme Switcher (light/dark mode toggle), inspect all 6 button variants in all 4 sizes, inspect all 5 badge variants (including live pulsing beacon and tech stack pill-tags), interact with live input & textarea fields, and trigger the case study modal dialog with backdrop blur.

---

## 5. Caveats
- No Radix primitives were pre-installed in Phase 0. A self-contained, accessible React context-based modal dialog is the most robust, zero-bloat solution conforming to the project's Ponytail architecture guidelines.
- `next-themes` requires `useTheme()` to be called inside a Client Component (`"use client"`). The Theme Switcher in `src/app/page.tsx` will be a Client Component or use a client component wrapper.
- All components must have strict TypeScript typings (`React.forwardRef`, explicit prop interfaces) to maintain 0 errors under `tsconfig.json` `strict: true` and `noImplicitAny: true`.

---

## 6. Conclusion
The specification for Phase 1 is 100% complete, unambiguous, and aligned across `ORIGINAL_REQUEST.md`, `SCOPE.md`, `docs/DBD.md`, `docs/TRD.md`, `docs/PRD.md`, and `docs/IPD.md`.
All component prop contracts, styling tokens, variants, sizes, and edge cases are thoroughly documented above. The implementation team can immediately build the 5 UI atoms, adjust the layout theme to light, and craft the interactive showcase page in `page.tsx`.

---

## 7. Verification Method
To verify implementation:
1. **Typecheck Verification**:
   ```powershell
   npm run typecheck
   ```
   Must exit with code 0 (zero TypeScript errors).
2. **Build Verification**:
   ```powershell
   npm run build
   ```
   Must compile static shell, SSR routes, and CSS bundles without warnings or errors.
3. **Visual & Interactive Inspection**:
   - Verify `defaultTheme="light"` boots the page with clean white background.
   - Verify clicking the theme toggle changes theme seamlessly to dark obsidian luxury and back.
   - Verify all 6 button variants render correctly and respond to hover.
   - Verify the beacon badge displays a real-time pulsing green dot.
   - Verify clicking the Dialog trigger opens the modal with backdrop blur, and pressing ESC or clicking close / backdrop dismisses it cleanly.
   - Verify Input and Textarea accept typing and show ring focus states.
