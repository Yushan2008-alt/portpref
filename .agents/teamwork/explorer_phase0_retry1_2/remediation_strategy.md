# Remediation Strategy: Strict TypeScript Typing in `src/lib/supabase/server.ts`

**Agent**: `explorer_phase0_retry1_2`  
**Milestone**: Phase 0 — Next.js 14 Initialization & Core Setup  
**Date**: 2026-11-01  
**Target File**: `src/lib/supabase/server.ts` (lines 1–28)  

---

## 1. Executive Summary

Challenger 2 (`challenger_phase0_2`) identified that `src/lib/supabase/server.ts` line 15 triggers compiler errors under strict TypeScript settings (`strict: true`, `noImplicitAny: true`):
- `error TS7006: Parameter 'cookiesToSet' implicitly has an 'any' type.`
- `error TS7031: Binding element 'name' implicitly has an 'any' type.`
- `error TS7031: Binding element 'value' implicitly has an 'any' type.`
- `error TS7031: Binding element 'options' implicitly has an 'any' type.`

This investigation analyzed the contract of `@supabase/ssr@0.5.2`, TypeScript's overload resolution mechanisms, and Next.js 14 App Router cookie handling. This document provides the exact type definitions and code recommendations to eliminate `TS7006` and `TS7031` while maintaining 100% alignment with Supabase SSR architecture.

---

## 2. Root Cause Analysis

### 2.1 Current Implementation in `src/lib/supabase/server.ts`
```typescript
 1: import { createServerClient } from "@supabase/ssr";
 2: import { cookies } from "next/headers";
 3: 
 4: export function createClient() {
 5:   const cookieStore = cookies();
 6: 
 7:   return createServerClient(
 8:     process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
 9:     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key",
10:     {
11:       cookies: {
12:         getAll() {
13:           return cookieStore.getAll();
14:         },
15:         setAll(cookiesToSet) { // <-- UNTYPED PARAMETER
16:           try {
17:             cookiesToSet.forEach(({ name, value, options }) =>
18:               cookieStore.set(name, value, options)
19:             );
20:           } catch {
21:             // The `setAll` method was called from a Server Component.
22:             // This can be safely ignored when middleware refreshes sessions.
23:           }
24:         },
25:       },
26:     }
27:   );
28: }
```

### 2.2 Why TypeScript Fails Contextual Typing
1. **The Official Boilerplate Flaw**: The official Supabase guide for Next.js SSR provides `setAll(cookiesToSet)` without explicit type annotations, relying on contextual typing from `createServerClient`.
2. **Function Overloading in `@supabase/ssr`**:
   The package `@supabase/ssr` exports overloaded definitions for `createServerClient`:
   - Overload 1: `cookies: CookieMethodsServerDeprecated` (exposing `get`, `set`, `remove`)
   - Overload 2: `cookies: CookieMethodsServer` (exposing `getAll`, `setAll`)
   When an object literal is passed to an overloaded function in TypeScript, contextual inference across overloads can fail or degrade to `any` unless explicit hints are present.
3. **Missing Module Declarations in Sandboxed/Pre-Install Environments**:
   When `@supabase/ssr` is unresolved (e.g. before `npm install` or under offline sandbox analysis), `createServerClient` defaults to `any`. When a function is `any`, TypeScript provides **no contextual typing** to callback/method parameters. Consequently, `cookiesToSet` is treated as an unannotated parameter with an implicit `any` type, immediately triggering `TS7006`.
4. **Cascading Binding Errors (`TS7031`)**:
   Because `cookiesToSet` is inferred as `any`, destructuring its members in `.forEach(({ name, value, options }) => ...)` causes each extracted property (`name`, `value`, `options`) to trigger `TS7031` ("Binding element '...' implicitly has an 'any' type").

---

## 3. Deep Dive into `@supabase/ssr` Contract

Analysis of `@supabase/ssr@0.5.2` (`dist/module/types.d.ts` and `dist/module/createServerClient.d.ts`) reveals the exact internal types:

```typescript
// From @supabase/ssr/dist/module/types.d.ts:
import type { CookieSerializeOptions } from "cookie";

export type CookieOptions = Partial<CookieSerializeOptions>;

export type GetAllCookies = () => Promise<{
    name: string;
    value: string;
}[] | null> | {
    name: string;
    value: string;
}[] | null;

export type SetAllCookies = (cookies: {
    name: string;
    value: string;
    options: CookieOptions;
}[]) => Promise<void> | void;

export type CookieMethodsServer = {
    getAll: GetAllCookies;
    setAll?: SetAllCookies;
};
```

Key Observations:
1. `@supabase/ssr` **explicitly exports `type CookieOptions`**.
2. The parameter to `SetAllCookies` is an array of objects matching:
   `{ name: string; value: string; options: CookieOptions }[]`.
3. In Next.js 14 (`next/headers`), `cookieStore.set(name, value, options)` accepts `options?: Partial<ResponseCookie>`. Because `ResponseCookie` aligns with `CookieSerializeOptions` (`domain`, `path`, `maxAge`, `expires`, `sameSite`, `secure`, `httpOnly`), `@supabase/ssr`'s `CookieOptions` is fully compatible with Next.js's `cookieStore.set`.

---

## 4. Evaluation of Remediation Alternatives

| Option | Implementation Pattern | Strengths | Trade-offs | Recommendation |
| :--- | :--- | :--- | :--- | :---: |
| **Option 1: Official & Idiomatic** | `import { createServerClient, type CookieOptions } from "@supabase/ssr"`<br>`setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[])` | • 100% type parity with `@supabase/ssr`<br>• Autocomplete for `options`<br>• Completely solves TS7006 and TS7031 | Requires `@supabase/ssr` module to be resolvable for full type expansion | **PRIMARY RECOMMENDED** |
| **Option 2: Standalone Local Interface** | `type CookieToSet = { name: string; value: string; options?: Record<string, unknown> }`<br>`setAll(cookiesToSet: CookieToSet[])` | • Decoupled from `@supabase/ssr` internal type exports<br>• Fully self-contained | Adds 5 lines of local type definition | **STRONG ALTERNATIVE** |
| **Option 3: Loose Inline Typing** | `setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>)` | • Quickest 1-line change<br>• Solves TS7006/TS7031 | Uses `any` for `options`, which is contrary to strict typing discipline | **NOT RECOMMENDED** |

---

## 5. Recommended Implementation Detail (Option 1)

### 5.1 Proposed Code for `src/lib/supabase/server.ts`

```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be safely ignored when middleware refreshes sessions.
          }
        },
      },
    }
  );
}
```

### 5.2 Line-by-Line Diff

```diff
--- a/src/lib/supabase/server.ts
+++ b/src/lib/supabase/server.ts
@@ -1,4 +1,4 @@
-import { createServerClient } from "@supabase/ssr";
+import { createServerClient, type CookieOptions } from "@supabase/ssr";
 import { cookies } from "next/headers";
 
 export function createClient() {
@@ -12,7 +12,7 @@ export function createClient() {
         getAll() {
           return cookieStore.getAll();
         },
-        setAll(cookiesToSet) {
+        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
           try {
             cookiesToSet.forEach(({ name, value, options }) =>
               cookieStore.set(name, value, options)
```

---

## 6. Next.js 14 App Router Compatibility Notes

1. **Synchronous `cookies()`**: In Next.js 14 (`"next": "^14.2.24"`), `cookies()` from `next/headers` is synchronous (`const cookieStore = cookies()`). Async `cookies()` is only introduced in Next.js 15. The current invocation in `server.ts` is strictly compliant with Next.js 14.
2. **Server Component Mutation Guard**: In Next.js App Router, calling `cookieStore.set()` during Server Component rendering throws an unhandled exception (`Cookies can only be modified in a Server Action or Route Handler`). The `try/catch` block inside `setAll` is the documented Supabase SSR pattern that prevents Server Component crashes while allowing middleware and Server Actions to mutate cookies seamlessly.
3. **Zero Runtime Overhead**: The addition of `: { name: string; value: string; options: CookieOptions }[]` is purely compile-time TypeScript typing. It emits zero additional JavaScript bytecode and introduces zero runtime performance cost.

---

## 7. Verification Method

To verify that `TS7006` and `TS7031` are completely resolved:

1. **Verify parameter typing**:
   Once implemented by the worker, inspect `src/lib/supabase/server.ts` line 15 to confirm `cookiesToSet: { name: string; value: string; options: CookieOptions }[]`.
2. **Run TypeScript Check**:
   ```powershell
   npx tsc --noEmit
   ```
   Filter specifically for `server.ts`:
   ```powershell
   tsc --noEmit | Select-String "server.ts"
   ```
   *Expected outcome*: Zero errors reported for `server.ts` regarding `TS7006` or `TS7031`.
