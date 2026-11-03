# Handoff Report: CSS Token Remediation Strategy

**Agent**: `explorer_phase0_retry1_1`  
**Role**: Teamwork Explorer (Read-Only Investigation & Synthesis)  
**Milestone**: Phase 0 — Next.js 14 Initialization & Core Setup (Retry 1)  
**Date**: 2026-11-01  
**Handoff Type**: Hard (Task complete)  

---

## 1. Observation

1. **`tailwind.config.ts` Token References**:
   - Lines 58–62:
     ```typescript
     borderRadius: {
       lg: "var(--radius)",
       md: "calc(var(--radius) - 2px)",
       sm: "calc(var(--radius) - 4px)",
     },
     ```
   - Lines 63–66:
     ```typescript
     fontFamily: {
       sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
       display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
     },
     ```
   - Total CSS variables referenced across `tailwind.config.ts`: exactly 25.

2. **`src/app/globals.css` Token Declarations**:
   - `:root` (lines 6–33): Declares 23 variables. Omitted: `--font-sans` and `--font-display`.
   - `.dark` (lines 35–61): Declares 22 variables. Omitted: `--font-sans`, `--font-display`, and `--radius` (which was defined in `:root` at line 27 as `0.75rem`).
   - Line 68–70:
     ```css
     body {
       @apply bg-background text-foreground;
     }
     ```
     `font-sans` is not explicitly declared on `body`.

3. **`src/app/layout.tsx` Font Configuration**:
   - Lines 1–30: Contains no import from `next/font/google`. Neither `Plus Jakarta Sans` nor `Space Grotesk` is configured, despite TRD §6 ("Font Optimization: Penggunaan `next/font/google` dengan `subsets: ['latin']` dan `display: 'swap'` untuk font `Space Grotesk` dan `Plus Jakarta Sans`") and DBD §3 ("Display & Headline Font: Space Grotesk ... Body & Subtitle Font: Plus Jakarta Sans").
   - Line 16: `<html lang="en" suppressHydrationWarning>` lacks the font variable classes.

4. **Empirical Reproduction via Node Script**:
   - Running the token extractor script against the codebase:
     ```
     tailwindVars count: 25
     missingInRoot: [ '--font-display', '--font-sans' ]
     missingInDark: [ '--font-display', '--font-sans', '--radius' ]
     rootOnly: [ '--radius' ]
     ```

5. **`src/lib/supabase/server.ts` TypeScript `noImplicitAny` Error**:
   - Line 18: `setAll(cookiesToSet) {` has an unannotated parameter, which causes `TS7006` and `TS7031` under `strict: true` and `noImplicitAny: true`.

---

## 2. Logic Chain

1. **From Observation 1 and 2**: `tailwind.config.ts` creates utilities (`rounded-*`, `font-sans`, `font-display`) that expect `--radius`, `--font-sans`, and `--font-display` to exist in CSS custom property scopes.
2. **From Observation 2 and 4**: In `globals.css`, `:root` has 23/25 tokens and `.dark` has 22/25 tokens. The absence of `--radius` in `.dark` creates asymmetry and failure under isolated dark mode rendering or static theme parity checks. The absence of `--font-sans` and `--font-display` leaves typography fallback unanchored.
3. **From Observation 3**: Without `next/font/google` in `layout.tsx`, the browser cannot resolve the custom webfonts at runtime, falling back to generic system fonts and violating TRD §6 and DBD §3.
4. **Synthesis**: To guarantee 100% token consistency across both static CSS checks and runtime DOM execution:
   - `src/app/globals.css` must declare `--radius: 0.75rem;`, `--font-sans: 'Plus Jakarta Sans', ...;`, and `--font-display: 'Space Grotesk', ...;` in both `:root` and `.dark`.
   - `src/app/layout.tsx` must configure `Plus_Jakarta_Sans` and `Space_Grotesk` with `variable: "--font-sans"` and `variable: "--font-display"`, and bind their class names to `<html>`.
   - `tailwind.config.ts` requires no changes.
   - Complementary: `src/lib/supabase/server.ts` line 18 must be typed (`cookiesToSet: Array<{ name: string; value: string; options?: any }>`) to clear `TS7006`.

---

## 3. Caveats

- **Sandbox Network Limitation**: External npm packages cannot be installed dynamically in this environment. All validations rely on local static AST/AST-regex parsing and type analysis.
- **Font Overriding Precedence**: The static fallbacks in `globals.css` provide immediate CSS-level resilience. When Next.js boots in a live environment, `next/font/google` will inject class-level CSS properties on `<html>` that seamlessly take precedence.

---

## 4. Conclusion

The exact remediation strategy is documented in:
`c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase0_retry1_1\remediation_strategy.md`

### Required Changes for Implementing Worker:
1. **`src/app/globals.css`**:
   - In `:root`: Add fallback declarations for `--font-sans` and `--font-display`.
   - In `.dark`: Add `--radius: 0.75rem;` along with `--font-sans` and `--font-display`.
   - In `@layer base`: Add `font-sans` to the `body` `@apply` rule.
2. **`src/app/layout.tsx`**:
   - Import `Plus_Jakarta_Sans` and `Space_Grotesk` from `next/font/google`.
   - Bind `${fontSans.variable} ${fontDisplay.variable}` to `<html>`.
3. **`src/lib/supabase/server.ts`**:
   - Add explicit typing to parameter `cookiesToSet: Array<{ name: string; value: string; options?: any }>`.

---

## 5. Verification Method

To verify that the remediation produces 100% token consistency:

1. **Run CSS Token Parity Assertion**:
   ```powershell
   node -e "const fs = require('fs'); const tailwind = fs.readFileSync('tailwind.config.ts', 'utf8'); const css = fs.readFileSync('src/app/globals.css', 'utf8'); const tv = Array.from(new Set([...tailwind.matchAll(/var\((--[a-zA-Z0-9_-]+)\)/g)].map(m => m[1]))).sort(); const rv = new Set([...css.match(/:root\s*\{([^}]+)\}/s)[1].matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)].map(m => m[1])); const dv = new Set([...css.match(/\.dark\s*\{([^}]+)\}/s)[1].matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)].map(m => m[1])); const missingRoot = tv.filter(v => !rv.has(v)); const missingDark = tv.filter(v => !dv.has(v)); const rootOnly = [...rv].filter(v => !dv.has(v)); const darkOnly = [...dv].filter(v => !rootVars.has(v)); console.log('Missing root:', missingRoot); console.log('Missing dark:', missingDark); if (missingRoot.length === 0 && missingDark.length === 0) console.log('ALL TOKENS 100% PASS');"
   ```
   *Pass Criteria*: `missingRoot: []`, `missingDark: []`, and output `ALL TOKENS 100% PASS`.

2. **Run Layout Font Verification**:
   ```powershell
   node -e "const fs = require('fs'); const layout = fs.readFileSync('src/app/layout.tsx', 'utf8'); console.log('Google Fonts imported:', layout.includes('next/font/google')); console.log('Variable classes bound to html:', /<html[^>]*fontSans\.variable/.test(layout));"
   ```
   *Pass Criteria*: Both checks print `true`.

3. **Invalidation Condition**:
   - The remediation is invalidated if any of the 25 `var(--xxx)` tokens present in `tailwind.config.ts` cannot be found in both `:root` and `.dark` in `globals.css`, or if `layout.tsx` fails to bind `--font-sans` and `--font-display`.
