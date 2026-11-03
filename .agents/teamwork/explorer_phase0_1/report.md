# Workspace Environment & Initialization Strategy Exploration Report

**Agent**: `explorer_phase0_1`  
**Date**: 2026-11-01  
**Target Workspace**: `c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes`  
**Milestone**: Phase 0 — Next.js 14 Initialization & Core Setup  

---

## 1. Executive Summary

This investigation analyzed the workspace state, local development tooling, and package manager environments to formulate a safe, robust initialization strategy for **Next.js 14 (App Router)** with **TypeScript**, **Tailwind CSS**, and required dependencies without clobbering existing documentation or metadata directories.

**Key Findings:**
1. The workspace currently contains only two directories: `docs/` (containing 6 approved architectural specs) and `.agents/` (containing teamwork metadata). There is no root `package.json`, `tsconfig.json`, `.git/`, or existing code files.
2. The runtime environment on Windows provides **Node.js v22.17.1**, **npm 10.9.2**, **pnpm 10.32.1**, **git 2.51.2.windows.1**, and global **TypeScript 5.9.3**. Yarn is not installed.
3. Because the directory is non-empty (`docs/` and `.agents/`), running `create-next-app .` directly risks aborting due to conflict detection. 
4. **Primary Recommended Strategy**: Direct, deterministic file scaffolding of `package.json`, `tsconfig.json` (strict + `@/*`), `tailwind.config.ts` (ponytail minimal), `postcss.config.mjs`, `next.config.mjs`, and initial `src/` app shell, followed by package installation via `npm install` (or `pnpm install`). This completely eliminates non-empty directory errors and avoids clobbering `docs/`.

---

## 2. Workspace File & Directory Inventory

A thorough inspection of `c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes` was performed using PowerShell `Get-ChildItem -Force`:

### Root Directory Structure
```
c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes/
├── .agents/                    # Teamwork agent metadata & dispatch tracking
└── docs/                       # Project specifications (Fully approved)
    ├── AFD.md                  # Application Flow Documentation (6,743 bytes)
    ├── BSD.md                  # Backend Schema Documentation (8,344 bytes)
    ├── DBD.md                  # Design Brief Documentation (8,175 bytes)
    ├── IPD.md                  # Implementation Plan Documentation (5,944 bytes)
    ├── PRD.md                  # Product Requirement Documentation (6,532 bytes)
    └── TRD.md                  # Technical Requirement Documentation (7,896 bytes)
```

### Safety & Isolation Notes
- **Docs Directory**: `docs/` must remain untouched. All new frontend code will reside in `src/` as outlined in `TRD.md` Section 4.
- **Teamwork Directory**: `.agents/teamwork/` must only hold metadata; no source code or node packages will be placed here.
- **Git State**: No `.git/` folder currently exists in the root. Git 2.51.2 is installed if git initialization is desired.

---

## 3. Toolchain & Environment Verification

Environment tools were probed directly on the Windows host:

| Tool | Version / Status | Path / Source | Assessment |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v22.17.1` | `C:\Program Files\nodejs\node.exe` | ✅ Excellent; fully compatible with Next.js 14.2+ |
| **npm** | `10.9.2` | `C:\Program Files\nodejs\npm.cmd` | ✅ Active and supported package manager |
| **pnpm** | `10.32.1` | Global npm bin | ✅ Installed and functional |
| **yarn** | `Not installed` | N/A | ⚠️ Do not use `yarn` commands |
| **TypeScript** | `5.9.3` (Global) | Global npm bin | ✅ TS 5.0+ requirement met |
| **Git** | `2.51.2.windows.1` | System PATH | ✅ Modern git available |
| **Shell** | PowerShell 5.1/Core | Windows OS | Standard Windows path delimiters and PS syntax |

### Cache & Storage Paths
- npm cache: `C:\Users\CANDRA DEWI\AppData\Local\npm-cache`
- pnpm store: `C:\Users\CANDRA DEWI\AppData\Local\pnpm\store\v10`

---

## 4. Next.js 14 App Router Initialization Analysis

### The Non-Empty Directory Challenge
Standard `create-next-app` has an internal validation check (`isFolderEmpty`) that inspects the destination directory. When it detects existing subdirectories (`docs` and `.agents`), it either:
1. Throws an error: `The directory ... contains files that could conflict: docs, .agents. Either try using a new directory name, or remove the files listed above.`
2. Prompts interactively, which can cause automation tasks in background sessions to hang waiting on stdin.

### Evaluation of Approaches

| Approach | Description | Pros | Cons / Risks | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Strategy 1: Direct Deterministic Scaffolding** | Directly write clean `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.mjs`, and initial `src/app/` files, then run `npm install`. | • Zero conflict errors<br>• Zero clobber risk for `docs/`<br>• Exact version control (Next 14.2.15, React 18.3, etc.)<br>• Fully follows ponytail guidelines (no boilerplate bloat)<br>• 100% deterministic | Requires creating initial 5-6 config/shell files | **PRIMARY RECOMMENDATION (Best Practice)** |
| **Strategy 2: Temp Directory & File Move** | Run `npx create-next-app@14 _temp_app` then copy files to root and delete `_temp_app`. | Uses official generator | • Potential file lock issues during Windows file move<br>• Generates boilerplate styles that need immediate pruning<br>• Two-step installation process | Acceptable fallback |

---

## 5. Concrete Phase 0 Implementation Plan for Worker

The worker agent should execute Phase 0 following the direct scaffolding method:

### Step 1: Create `package.json`
Define the exact dependencies specified in `docs/TRD.md`:
```json
{
  "name": "portprofes",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.48.1",
    "clsx": "^2.1.1",
    "framer-motion": "^11.18.2",
    "lucide-react": "^0.475.0",
    "next": "^14.2.24",
    "next-themes": "^0.4.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "tailwind-merge": "^3.0.1",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20.17.19",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-config-next": "^14.2.24",
    "postcss": "^8.5.2",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  }
}
```

### Step 2: Create `tsconfig.json` (Strict typing & Path alias `@/*`)
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 3: Create `tailwind.config.ts` (Clean, Ponytail-Compliant)
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        obsidian: "#08080a",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
```

### Step 4: Create `postcss.config.mjs`
```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

### Step 5: Create `next.config.mjs`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

### Step 6: Create `.gitignore`
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### Step 7: Create Base App Shell in `src/`
1. `src/app/globals.css`:
   Tailwind directives `@tailwind base; @tailwind components; @tailwind utilities;` plus root CSS variables for light/dark mode as specified in `TRD.md` Section 5.
2. `src/app/layout.tsx`:
   Root layout importing `globals.css` and setting up html/body with viewport metadata.
3. `src/app/page.tsx`:
   Clean initial placeholder confirming Next.js 14 App Router is active.
4. `src/lib/utils.ts`:
   Standard `cn` class helper using `clsx` and `tailwind-merge`.

### Step 8: Install Packages & Run Verification
Run:
```powershell
npm install
npm run typecheck
npm run build
```
Verification criteria:
- `npm install` completes with 0 fatal errors.
- `tsc --noEmit` exits with code 0.
- `npm run build` generates `.next/` directory cleanly with zero compile/type errors.

---

## 6. Risk Assessment & Mitigations

1. **Network Access / Sandboxing**:
   - Running `npm install` requires network access to npm registry.
   - Mitigate by using standard `npm install` without hanging flags. If sandboxing blocks network, provide clear notification for permissions.
2. **Directory Conflicts**:
   - Zero conflicts occur because `src/` does not collide with `docs/` or `.agents/`.
3. **React 19 vs Next 14 Incompatibility**:
   - Next.js 14 requires React 18 (`^18.3.1`). The pinned `package.json` guarantees React 18 is installed rather than React 19, avoiding peer dependency breakages with `framer-motion` and `next-themes`.
