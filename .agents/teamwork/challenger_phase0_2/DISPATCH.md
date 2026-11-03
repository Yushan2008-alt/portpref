# Task Assignment: Empirical Layout, CSS Token & Code Integrity Stress Testing (Challenger 2)

## Working Directory
c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\challenger_phase0_2

## Mandatory Inputs
- Original Request: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\ORIGINAL_REQUEST.md (MUST read first)
- Scope Document: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\orchestrator\SCOPE.md
- Technical Documentation:
  - docs/TRD.md
  - docs/PRD.md
  - docs/IPD.md

## Objective
Empirically stress-test the Phase 0 codebase in `c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes`:
1. Write and execute a validation script to verify:
   - CSS token consistency: Every CSS variable referenced in `tailwind.config.ts` (`--background`, `--foreground`, `--primary`, `--card`, `--border`, etc.) is declared in `src/app/globals.css` in both `:root` and `.dark`.
   - File path and import resolution: All imports across `src/` (e.g. `@/lib/utils`, `@/components/theme-provider`, `@/lib/validations`, `@/types`) point to real, existing files on disk.
   - Component export/import integrity: Verify that exported symbols match imported symbols.
   - App Router rules: Verify `suppressHydrationWarning` on `<html>` in `src/app/layout.tsx` and `'use client'` on client components.
2. Report empirical pass/fail metrics.

## Deliverable
Write your empirical test script and results to:
`c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\challenger_phase0_2\stress_report.md`
and write your `handoff.md` with an explicit verdict: `APPROVE` or `REJECT`.
Communicate completion to your parent with send_message.


## 2026-11-01T11:52:25Z
You are challenger_phase0_2, a teamwork_challenger agent.
Your working directory is: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\challenger_phase0_2
Please read your task assignment at: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\challenger_phase0_2\DISPATCH.md
MANDATORY: Read the original user request at c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\ORIGINAL_REQUEST.md before starting work.
Also review:
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\orchestrator\SCOPE.md
- docs/TRD.md

Objective:
Write and execute an empirical validation script to verify:
1. CSS token consistency: Every CSS variable referenced in tailwind.config.ts is defined in src/app/globals.css for both :root and .dark.
2. File path and import resolution: All imports across src/ point to existing files on disk and exported symbols match.
3. App Router boundaries: suppressHydrationWarning on <html> in layout.tsx and 'use client' on client components.
Write your script, output, and analysis to c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\challenger_phase0_2\stress_report.md and record your verdict (APPROVE or REJECT) in handoff.md.
Communicate completion to your parent with send_message.
