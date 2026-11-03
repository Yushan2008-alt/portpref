# CSS Token & Typography Remediation Strategy

**Agent**: `explorer_phase0_retry1_1`  
**Role**: Teamwork Explorer (Read-Only Investigation & Synthesis)  
**Target Milestone**: Phase 0 — Next.js 14 Initialization & Core Setup  
**Date**: 2026-11-01  
**Status**: Recommendation Only (Non-Destructive / Zero Code Modified)

---

## 1. Executive Summary

Empirical testing performed by `challenger_phase0_2` revealed that the Phase 0 baseline has CSS variable discrepancies between `tailwind.config.ts` and `src/app/globals.css`:
1. CSS variables `--font-sans` and `--font-display` are configured in `tailwind.config.ts` under `fontFamily`, but are entirely absent from both `:root` and `.dark` blocks in `src/app/globals.css`.
2. `src/app/layout.tsx` does not instantiate or map Google Fonts (`Plus Jakarta Sans` and `Space Grotesk`) via `next/font/google`, causing typography tokens to remain uninitialized in the DOM and violating TRD §6 and DBD §3.
3. CSS variable `--radius` is defined in `:root` (`0.75rem`) but omitted from `.dark`, breaking token parity and potentially causing isolated dark-themed elements or shadow trees to revert `--radius` to `initial` (0px).

This report presents an exact, comprehensive remediation strategy to guarantee **100% token consistency and symmetry** across `:root` and `.dark`, while fulfilling all architectural specifications from TRD §5, TRD §6, and DBD §3.

---

## 2. Complete Design Token Audit & Inventory

A cross-reference of all `var(--xxx)` references in `tailwind.config.ts` against declarations in `src/app/globals.css` identifies exactly **25 unique CSS variables**:

| # | CSS Variable | Used In (`tailwind.config.ts`) | `:root` Status | `.dark` Status | Parity Gap |
|---|---|---|---|---|---|
| 1 | `--background` | `colors.background` | `210 40% 98%` | `240 10% 3.9%` | None (Matched) |
| 2 | `--foreground` | `colors.foreground` | `222.2 84% 4.9%` | `0 0% 98%` | None (Matched) |
| 3 | `--card` | `colors.card.DEFAULT` | `0 0% 100%` | `240 10% 4.5%` | None (Matched) |
| 4 | `--card-foreground` | `colors.card.foreground` | `222.2 84% 4.9%` | `0 0% 98%` | None (Matched) |
| 5 | `--popover` | `colors.popover.DEFAULT` | `0 0% 100%` | `240 10% 3.9%` | None (Matched) |
| 6 | `--popover-foreground` | `colors.popover.foreground` | `222.2 84% 4.9%` | `0 0% 98%` | None (Matched) |
| 7 | `--primary` | `colors.primary.DEFAULT` | `238 84% 59%` | `238 84% 67%` | None (Matched) |
| 8 | `--primary-foreground` | `colors.primary.foreground` | `210 40% 98%` | `222.2 47.4% 11.2%` | None (Matched) |
| 9 | `--secondary` | `colors.secondary.DEFAULT` | `240 4.8% 95.9%` | `240 3.7% 15.9%` | None (Matched) |
| 10 | `--secondary-foreground` | `colors.secondary.foreground` | `240 5.9% 10%` | `0 0% 98%` | None (Matched) |
| 11 | `--muted` | `colors.muted.DEFAULT` | `240 4.8% 95.9%` | `240 3.7% 15.9%` | None (Matched) |
| 12 | `--muted-foreground` | `colors.muted.foreground` | `240 3.8% 46.1%` | `240 5% 64.9%` | None (Matched) |
| 13 | `--accent` | `colors.accent.DEFAULT` | `240 4.8% 95.9%` | `240 3.7% 15.9%` | None (Matched) |
| 14 | `--accent-foreground` | `colors.accent.foreground` | `240 5.9% 10%` | `0 0% 98%` | None (Matched) |
| 15 | `--destructive` | `colors.destructive.DEFAULT` | `0 84.2% 60.2%` | `0 62.8% 30.6%` | None (Matched) |
| 16 | `--destructive-foreground` | `colors.destructive.foreground` | `210 40% 98%` | `0 0% 98%` | None (Matched) |
| 17 | `--border` | `colors.border` | `214.3 31.8% 91.4%` | `240 3.7% 15.9%` | None (Matched) |
| 18 | `--input` | `colors.input` | `214.3 31.8% 91.4%` | `240 3.7% 15.9%` | None (Matched) |
| 19 | `--ring` | `colors.ring` | `238 84% 59%` | `238 84% 67%` | None (Matched) |
| 20 | `--canvas` | `colors.canvas` | `0 0% 100%` | `240 10% 3.9%` | None (Matched) |
| 21 | `--pill-soft` | `colors.pill-soft` | `240 10% 95%` | `240 3.7% 15.9%` | None (Matched) |
| 22 | `--pill-hover` | `colors.pill-hover` | `240 10% 91%` | `240 3.7% 20%` | None (Matched) |
| 23 | `--radius` | `borderRadius.lg / md / sm` | `0.75rem` | ❌ **MISSING** | **Asymmetry in `.dark`** |
| 24 | `--font-sans` | `fontFamily.sans` | ❌ **MISSING** | ❌ **MISSING** | **Absent in both** |
| 25 | `--font-display` | `fontFamily.display` | ❌ **MISSING** | ❌ **MISSING** | **Absent in both** |

### Summary of Counts:
- Total Tailwind Variables: **25**
- `:root` Declared Variables: **23** (Missing 2: `--font-sans`, `--font-display`)
- `.dark` Declared Variables: **22** (Missing 3: `--font-sans`, `--font-display`, `--radius`)

---

## 3. Root Cause & Architectural Impact Analysis

### 3.1 The Missing Font Tokens (`--font-sans`, `--font-display`)
- **Root Cause**: `src/app/layout.tsx` was generated without font loader declarations (`next/font/google`). Additionally, `src/app/globals.css` did not define static fallback declarations in `:root` and `.dark`.
- **Impact**: 
  - When the browser or automated test parses `globals.css` or the DOM, `var(--font-sans)` and `var(--font-display)` resolve to `undefined`.
  - The browser falls back to the generic system fonts (`system-ui`, `-apple-system`, `sans-serif`), preventing the portfolio from rendering `Plus Jakarta Sans` (for clean, legible body text) and `Space Grotesk` (for executive display headlines) as required by TRD §6 and DBD §3.
  - Automated test harnesses (such as `challenger_phase0_2/stress_report.md` Suite 1) statically analyze `globals.css` for all tokens referenced by `tailwind.config.ts`, directly rejecting the codebase.

### 3.2 The Missing `--radius` in `.dark`
- **Root Cause**: The `.dark` theme block in `globals.css` defines color tokens but failed to re-declare `--radius: 0.75rem;`.
- **Impact**:
  - While CSS variables usually inherit from `:root`, if a container or web component has `.dark` applied in an isolated scope or when CSS token validators test each selector block independently, `--radius` is missing.
  - Symmetrical token parity is a fundamental best practice in enterprise design systems to prevent unintended fallback cascades.

---

## 4. Remediation Strategy

To achieve 100% token consistency, zero regressions, and full compliance with project specifications, the fix requires a **two-tier complementary approach**:

### Tier 1: Static Parity in `src/app/globals.css`
Declare `--radius`, `--font-sans`, and `--font-display` directly inside both `:root` and `.dark` in `src/app/globals.css`.
- **`--radius`**: `0.75rem;` in both `:root` and `.dark`.
- **`--font-sans`**: `'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`
- **`--font-display`**: `'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;`
- **Body rule**: Add `font-sans` to the `@layer base` `body` declaration (`@apply bg-background text-foreground font-sans;`) to ensure default inheritance.

*Benefit*: Any static CSS scanner, test harness, or offline browser environment will find 25/25 tokens in `:root` and 25/25 tokens in `.dark` (0 missing, 0 asymmetry).

### Tier 2: Next.js Font Optimization in `src/app/layout.tsx`
Import `Plus_Jakarta_Sans` and `Space_Grotesk` from `next/font/google` in `src/app/layout.tsx` per TRD §6:
- Subset: `['latin']`
- Display: `'swap'`
- Variables: `--font-sans` and `--font-display`
- Apply the generated CSS variables onto `<html>`:
  ```tsx
  <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable}`} suppressHydrationWarning>
  ```

*Benefit*: Next.js automatically downloads, self-hosts, and optimizes the fonts at build time with zero Cumulative Layout Shift (CLS = 0). When the Next.js layout mounts, the injected CSS font classes take precedence and deliver the exact Eloqwnt-grade visual identity.

---

## 5. Exact Code Snippets & Modifications

### 5.1 Target File 1: `src/app/globals.css`

#### Before (Lines 26–34 and 54–62):
```css
    --ring: 238 84% 59%;
    --radius: 0.75rem;

    /* Pill Tokens */
    --canvas: 0 0% 100%;
    --pill-soft: 240 10% 95%;
    --pill-hover: 240 10% 91%;
  }

  .dark {
    ...
    --ring: 238 84% 67%;

    /* Dark Pill Tokens */
    --canvas: 240 10% 3.9%;
    --pill-soft: 240 3.7% 15.9%;
    --pill-hover: 240 3.7% 20%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

#### Proposed After (`src/app/globals.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Pristine Minimalist Light Mode (DBD §2.1 & TRD §5) */
    --background: 210 40% 98%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 238 84% 59%;
    --primary-foreground: 210 40% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 238 84% 59%;
    --radius: 0.75rem;

    /* Typography Fallback Tokens (TRD §6 & DBD §3) */
    --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-display: 'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

    /* Pill Tokens */
    --canvas: 0 0% 100%;
    --pill-soft: 240 10% 95%;
    --pill-hover: 240 10% 91%;
  }

  .dark {
    /* Obsidian Luxury Dark Mode (TRD §5 & DBD §2.2) */
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 4.5%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 238 84% 67%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 238 84% 67%;
    --radius: 0.75rem;

    /* Typography Fallback Tokens (TRD §6 & DBD §3) */
    --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-display: 'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

    /* Dark Pill Tokens */
    --canvas: 240 10% 3.9%;
    --pill-soft: 240 3.7% 15.9%;
    --pill-hover: 240 3.7% 20%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
}
```

---

### 5.2 Target File 2: `src/app/layout.tsx`

#### Before (`src/app/layout.tsx`):
```tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Professional Portfolio | Full-Stack Developer",
  description: "Executive-grade full-stack developer portfolio showcasing modern web architecture, engineering capabilities, and case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### Proposed After (`src/app/layout.tsx`):
```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Professional Portfolio | Full-Stack Developer",
  description: "Executive-grade full-stack developer portfolio showcasing modern web architecture, engineering capabilities, and case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### 5.3 Target File 3: `tailwind.config.ts`

#### Assessment:
`tailwind.config.ts` already correctly defines:
```typescript
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
      },
```
**Conclusion for `tailwind.config.ts`**: **No modifications needed**. It is completely Ponytail-compliant and correctly references `var(--radius)`, `var(--font-sans)`, and `var(--font-display)`. The proposed changes to `globals.css` and `layout.tsx` satisfy 100% of `tailwind.config.ts`'s requirements.

---

### 5.4 Complementary Recommendation: `src/lib/supabase/server.ts`

While the primary prompt focuses on CSS tokens, Challenger 2's `stress_report.md` also noted a latent `noImplicitAny` TypeScript failure in `src/lib/supabase/server.ts` line 18:
```typescript
// Line 18: Untyped parameter 'cookiesToSet'
setAll(cookiesToSet) {
```
To ensure the implementing worker passes both Suite 1 (CSS Tokens) and Suite 5 (Strict TypeScript Compliance), the worker should also update `src/lib/supabase/server.ts`:
```typescript
<<<< BEFORE:
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
==== AFTER:
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
>>>>
```

---

## 6. Verification and Validation Harness

The implementing agent or reviewer can verify the resolution using the following commands:

### Test 1: Automated CSS Token Parity Check
Run via PowerShell:
```powershell
node -e "const fs = require('fs'); const tailwind = fs.readFileSync('tailwind.config.ts', 'utf8'); const css = fs.readFileSync('src/app/globals.css', 'utf8'); const tv = Array.from(new Set([...tailwind.matchAll(/var\((--[a-zA-Z0-9_-]+)\)/g)].map(m => m[1]))).sort(); const rv = new Set([...css.match(/:root\s*\{([^}]+)\}/s)[1].matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)].map(m => m[1])); const dv = new Set([...css.match(/\.dark\s*\{([^}]+)\}/s)[1].matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)].map(m => m[1])); const missingRoot = tv.filter(v => !rv.has(v)); const missingDark = tv.filter(v => !dv.has(v)); const rootOnly = [...rv].filter(v => !dv.has(v)); const darkOnly = [...dv].filter(v => !rv.has(v)); console.log('Tailwind tokens:', tv.length); console.log('Root tokens:', rv.size); console.log('Dark tokens:', dv.size); console.log('Missing in :root:', missingRoot); console.log('Missing in .dark:', missingDark); console.log('Root only:', rootOnly); console.log('Dark only:', darkOnly); if (missingRoot.length === 0 && missingDark.length === 0 && rootOnly.length === 0 && darkOnly.length === 0) { console.log('RESULT: 100% TOKEN PARITY PASS'); } else { console.error('RESULT: FAIL'); process.exit(1); }"
```
*Expected Result After Implementation*:
```
Tailwind tokens: 25
Root tokens: 25
Dark tokens: 25
Missing in :root: []
Missing in .dark: []
Root only: []
Dark only: []
RESULT: 100% TOKEN PARITY PASS
```

### Test 2: Next.js Layout Font Integration Check
Run via PowerShell:
```powershell
node -e "const fs = require('fs'); const layout = fs.readFileSync('src/app/layout.tsx', 'utf8'); const hasGoogleFonts = layout.includes('next/font/google') && layout.includes('Plus_Jakarta_Sans') && layout.includes('Space_Grotesk'); const hasHtmlVars = /<html[^>]*className=[^>]*fontSans\.variable[^>]*fontDisplay\.variable/.test(layout); console.log('Google Fonts imported:', hasGoogleFonts); console.log('HTML variables bound:', hasHtmlVars);"
```
*Expected Result After Implementation*:
```
Google Fonts imported: true
HTML variables bound: true
```

---

## 7. Next Steps for Implementer
1. Apply the edits to `src/app/globals.css`.
2. Apply the edits to `src/app/layout.tsx`.
3. Apply the type annotation to `src/lib/supabase/server.ts`.
4. Re-run `node tests/phase0-oracle.mjs` and Challenger 2's empirical test harness to confirm all suites achieve `PASS`.
