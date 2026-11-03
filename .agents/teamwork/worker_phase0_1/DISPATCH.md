# Task Assignment: Phase 0 Implementation — Next.js 14 Project Setup

## Working Directory
c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_1

## Mandatory Inputs & References
- Original Request: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\ORIGINAL_REQUEST.md (MUST read first)
- Scope Document: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\orchestrator\SCOPE.md
- Spec Miner Requirements: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\spec_miner_phase0_1\spec_requirements.md
- Explorer 1 Architecture & Templates: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase0_1\report.md
- Explorer 2 Compatibility & Pitfalls: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase0_2\compatibility_analysis.md

## Exclusive File Ownership
You own and can create/modify:
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `next.config.mjs`
- `.gitignore`
- `.eslintrc.json`
- `.env.example`
- `.env.local`
- All files under `src/` (e.g. `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/components/theme-provider.tsx`, `src/lib/utils.ts`, etc.)

DO NOT modify or delete:
- `docs/**`
- `.agents/**` (except your own working directory: `.agents/teamwork/worker_phase0_1/`)

## Implementation Instructions
1. Scaffold `package.json` with Next.js 14 (pin `"react": "^18.3.1"`, `"react-dom": "^18.3.1"`, `"next": "^14.2.24"`) and all required dependencies from TRD:
   - `framer-motion` (^11.0.0)
   - `lucide-react`
   - `@supabase/supabase-js`
   - `@supabase/ssr`
   - `next-themes`
   - `clsx`
   - `tailwind-merge`
   - `zod`
   - `react-hook-form`
   - DevDependencies: `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint`, `eslint-config-next`.
2. Scaffold `tsconfig.json` with strict typing (`"strict": true`, `"noImplicitAny": true`, etc.) and path alias `"@/*": ["./src/*"]`.
3. Scaffold `tailwind.config.ts` per Ponytail guidelines (clean, minimal, no bloat; dark mode class; POSIX `/` forward slashes in content globs: `"./src/**/*.{js,ts,jsx,tsx,mdx}"`; CSS custom properties for Obsidian dark and minimalist light).
4. Scaffold `postcss.config.mjs`, `next.config.mjs`, `.gitignore`, `.eslintrc.json`.
5. Scaffold baseline `src/`:
   - `src/app/globals.css` with Tailwind directives and CSS theme variables.
   - `src/components/theme-provider.tsx` (Client component wrapping `next-themes`).
   - `src/lib/utils.ts` (defining `cn` helper with `clsx` and `tailwind-merge`).
   - `src/app/layout.tsx` (root layout with `suppressHydrationWarning`, `ThemeProvider`, font/metadata).
   - `src/app/page.tsx` (clean initial landing page demonstrating Tailwind, Lucide React icon, and Framer Motion animation).
   - `.env.example` and `.env.local` templates for Supabase URL and anon key.
6. Run `npm install` to install all dependencies and create `package-lock.json`.
7. Verify build and typecheck:
   - Run `npx tsc --noEmit` (must succeed with exit code 0).
   - Run `npm run lint` (must succeed with exit code 0).
   - Run `npm run build` (must succeed with exit code 0).
8. Write detailed results and verification output to `c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_1\implementation_report.md` and complete `handoff.md`.



## 2026-11-01T11:20:01Z
You are worker_phase0_1, a teamwork_worker agent.
Your working directory is: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_1
Please read your task assignment at: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_1\DISPATCH.md
MANDATORY: Read the original user request at c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\ORIGINAL_REQUEST.md before starting work.
Also review:
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\orchestrator\SCOPE.md
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\spec_miner_phase0_1\spec_requirements.md
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase0_1\report.md
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase0_2\compatibility_analysis.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Execute Phase 0 Implementation:
1. Scaffold package.json with Next.js 14, React 18.3.1 pinned, and all TRD dependencies.
2. Scaffold tsconfig.json with strict typing and @/* alias.
3. Scaffold tailwind.config.ts per ponytail guidelines, postcss.config.mjs, next.config.mjs, .gitignore, .eslintrc.json.
4. Scaffold baseline src/ (globals.css, layout.tsx, page.tsx, theme-provider.tsx, utils.ts).
5. Run npm install.
6. Run build & typecheck verification (npx tsc --noEmit, npm run lint, npm run build).
7. Document commands, outputs, and status in c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_1\implementation_report.md and write handoff.md in your working directory.


## 2026-11-01T11:42:34Z
**Context**: Phase 0 Implementation Liveness Check
**Content**: Heartbeat check iteration 4: checking in on the progress of `npm install`, typecheck (`npx tsc --noEmit`), and build verification (`npm run build`). Please report your current status or if any step is waiting for input or permission.
**Action**: Provide a status update and update your `progress.md`.
