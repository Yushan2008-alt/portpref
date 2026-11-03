# Scope: Phase 0 — Next.js 14 Initialization & Core Setup

## Architecture
- Framework: Next.js 14 with App Router
- Language: TypeScript with strict typing
- Styling: Tailwind CSS (clean, minimal, ponytail compliant)
- Path Aliasing: `@/*`
- Libraries: framer-motion, lucide-react, @supabase/supabase-js, @supabase/ssr, next-themes, clsx, tailwind-merge, zod, react-hook-form

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Next.js 14 Project Initialization | Initialize Next.js 14 App Router project with TypeScript and Tailwind CSS | Phase 0 | docs/TRD.md |
| 2 | Dependencies Installation | framer-motion, lucide-react, @supabase/supabase-js, @supabase/ssr, next-themes, clsx, tailwind-merge, zod, react-hook-form | Phase 0 | docs/TRD.md |
| 3 | TypeScript Configuration | Strict typing, path alias `@/*` configured in tsconfig.json | Phase 0 | docs/TRD.md |
| 4 | Tailwind Configuration | Minimal, clean tailwind.config.ts following ponytail guidelines | Phase 0 | docs/TRD.md |
| 5 | Build and Typecheck Verification | `npm run build` and typecheck pass with zero errors | Phase 0 | docs/TRD.md |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 0 | Phase 0: Project Setup | Next.js 14 init, dependencies, tsconfig, tailwind, build check | none | DONE |

## Code Layout
- Root directory contains `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.mjs`, `.eslintrc.json`, `.env.example`, `next-env.d.ts`
- Source code in `src/app/`, `src/components/`, `src/lib/`, `src/types/`
- Configured path alias: `@/*` mapped to `./src/*`
