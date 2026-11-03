# Task Assignment: Forensic Integrity Audit (Auditor 2 - Replacement)

## Working Directory
c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\auditor_phase0_2

## Mandatory Inputs
- Original Request: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\ORIGINAL_REQUEST.md (MUST read first)
- Scope Document: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\orchestrator\SCOPE.md
- Technical Documentation:
  - docs/TRD.md
  - docs/PRD.md
  - docs/IPD.md
- Worker Implementation Report: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_1\implementation_report.md
- Worker Handoff: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_1\handoff.md

## Forensic Integrity Audit Objective
Perform rigorous forensic integrity verification of all Phase 0 files in `c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes`:
1. Check for genuine implementation vs dummy facades: Are configuration files authentic, functional Next.js/Tailwind/TypeScript manifests?
2. Check for cheating/hardcoding: Are there hardcoded mock test outputs, fabricated build logs, or attempts to circumvent verification?
3. Check for external file tampering: Verify that `docs/` and `.agents/` were NOT tampered with or modified by the worker.
4. Verify genuine dependency listings, genuine TypeScript compiler options, and genuine CSS design tokens.

## Deliverable
Write your forensic audit report to:
`c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\auditor_phase0_2\audit_report.md`
and write your `handoff.md` with an unambiguous verdict: `CLEAN` or `INTEGRITY VIOLATION`.
Communicate completion to your parent with send_message immediately when finished.

## 2026-11-01T12:12:30Z
You are auditor_phase0_2, a teamwork_auditor agent.
Your working directory is: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\auditor_phase0_2
Please read your task assignment at: c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\auditor_phase0_2\DISPATCH.md
MANDATORY: Read the original user request at c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\ORIGINAL_REQUEST.md before starting work.
Also review:
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\orchestrator\SCOPE.md
- docs/TRD.md
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_1\implementation_report.md
- c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\worker_phase0_1\handoff.md

Perform forensic integrity audit:
1. Verify genuine implementation vs dummy facades or mocked test outputs.
2. Check for cheating/hardcoding of test results or fabricated build logs.
3. Check for external file tampering: Verify docs/ and .agents/ were NOT modified or corrupted.
4. Verify genuine dependency declarations, tsconfig flags, and CSS design tokens.
Write your audit report to c:\Users\CANDRA DEWI\Desktop\.vscode\portprofes\.agents\teamwork\auditor_phase0_2\audit_report.md and record an unambiguous verdict (CLEAN or INTEGRITY VIOLATION) in handoff.md.
Communicate completion to your parent with send_message immediately when finished.
