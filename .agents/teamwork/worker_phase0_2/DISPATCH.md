# Task Assignment: Phase 0 Remediation Implementation (Worker 2 - Iteration 2)

## 2026-11-01T12:27:37Z
You are worker_phase0_2, a teamwork_worker agent.
Your working directory is: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_2
Please read your task assignment at: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_2\DISPATCH.md
MANDATORY: Read the original user request at c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\ORIGINAL_REQUEST.md before starting work.
Also review:
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\orchestrator\SCOPE.md
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\challenger_phase0_2\stress_report.md
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase0_retry1_1\remediation_strategy.md
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase0_retry1_2\remediation_strategy.md
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\explorer_phase0_retry1_3\scan_report.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Execute the fixes:
1. Update src/app/globals.css with missing CSS tokens (--radius in .dark, --font-sans and --font-display in :root and .dark, font-sans on body).
2. Update src/app/layout.tsx with Plus_Jakarta_Sans and Space_Grotesk from next/font/google.
3. Update src/lib/supabase/server.ts with explicit CookieOptions typing on cookiesToSet, and generic <Database = any>.
4. Update src/lib/supabase/client.ts with generic <Database = any>.
5. Update src/lib/validations.ts, src/types/index.ts, next.config.mjs, and next-env.d.ts.
6. Verify fixes (CSS token check, tsc --noEmit, and node tests/phase0-oracle.mjs).
7. Write implementation_report.md and handoff.md in your working directory.
Communicate completion to your parent with send_message.
