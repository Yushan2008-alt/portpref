import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
console.log('=== RUNNING ADVERSARIAL STRESS-TEST SUITE FOR PHASE 1 ===');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failCount++;
  } else {
    console.log(`[PASS] ${message}`);
    passCount++;
  }
}

// 1. Check Button: All variants must have valid CSS definitions
const btnFile = fs.readFileSync(path.join(rootDir, 'src/components/ui/button.tsx'), 'utf8');
const variants = ['default', 'pill-soft', 'circle-menu', 'circle-scroll', 'outline', 'ghost'];
for (const v of variants) {
  assert(btnFile.includes(`"${v}"`) || btnFile.includes(`'${v}'`) || btnFile.includes(`${v}:`), `Button defines variant "${v}"`);
}
assert(btnFile.includes('focus-visible:ring-2'), 'Button includes keyboard focus visible ring');
assert(btnFile.includes('disabled:pointer-events-none'), 'Button includes disabled pointer-events-none');
assert(btnFile.includes('forwardRef'), 'Button forwards ref');

// 2. Check Badge: Beacon must have both ping animation and solid dot
const badgeFile = fs.readFileSync(path.join(rootDir, 'src/components/ui/badge.tsx'), 'utf8');
assert(badgeFile.includes('animate-ping'), 'Badge beacon includes animate-ping');
assert(badgeFile.includes('bg-emerald-500'), 'Badge beacon includes solid emerald dot');
assert(badgeFile.includes('aria-hidden="true"'), 'Badge animation dot is marked aria-hidden');
assert(badgeFile.includes('forwardRef'), 'Badge forwards ref');

// 3. Check Dialog: Portal, SSR hydration protection, cleanup, keyboard
const dialogFile = fs.readFileSync(path.join(rootDir, 'src/components/ui/dialog.tsx'), 'utf8');
assert(dialogFile.includes('createPortal'), 'Dialog renders via createPortal');
assert(dialogFile.includes('document.body'), 'Dialog portals to document.body');
assert(dialogFile.includes('mounted') && dialogFile.includes('setMounted(true)'), 'Dialog guards against SSR hydration mismatch via mounted state');
assert(dialogFile.includes('document.body.style.overflow = "hidden"'), 'Dialog locks body scroll on open');
assert(dialogFile.includes('document.body.style.overflow = originalOverflow'), 'Dialog restores original body overflow on unmount/close');
assert(dialogFile.includes('Escape'), 'Dialog dismisses on Escape key');
assert(dialogFile.includes('role="dialog"'), 'Dialog sets role="dialog"');
assert(dialogFile.includes('aria-modal="true"'), 'Dialog sets aria-modal="true"');
assert(dialogFile.includes('aria-label="Close dialog"'), 'Dialog close button has accessible aria-label');
assert(dialogFile.includes('asChild'), 'DialogTrigger and DialogClose support asChild prop');

// 4. Check Input & Textarea
const inputFile = fs.readFileSync(path.join(rootDir, 'src/components/ui/input.tsx'), 'utf8');
assert(inputFile.includes('focus-visible:ring-1'), 'Input has focus-visible ring');
assert(inputFile.includes('disabled:cursor-not-allowed'), 'Input handles disabled state');
assert(inputFile.includes('forwardRef'), 'Input forwards ref');

const textareaFile = fs.readFileSync(path.join(rootDir, 'src/components/ui/textarea.tsx'), 'utf8');
assert(textareaFile.includes('focus-visible:ring-1'), 'Textarea has focus-visible ring');
assert(textareaFile.includes('disabled:cursor-not-allowed'), 'Textarea handles disabled state');
assert(textareaFile.includes('forwardRef'), 'Textarea forwards ref');

// 5. Check layout.tsx & page.tsx
const layoutFile = fs.readFileSync(path.join(rootDir, 'src/app/layout.tsx'), 'utf8');
assert(layoutFile.includes('defaultTheme="light"'), 'Root layout enforces defaultTheme="light"');
assert(layoutFile.includes('suppressHydrationWarning'), 'html element suppresses hydration warning for next-themes');

const pageFile = fs.readFileSync(path.join(rootDir, 'src/app/page.tsx'), 'utf8');
assert(pageFile.includes('useTheme()'), 'Page uses next-themes useTheme hook');
assert(pageFile.includes('mounted') && pageFile.includes('setMounted(true)'), 'Theme toggle in page.tsx prevents SSR hydration flicker');
assert(pageFile.includes('DialogContent'), 'Page includes interactive DialogContent');
assert(pageFile.includes('inputVal'), 'Page includes interactive Input with state');
assert(pageFile.includes('textareaVal'), 'Page includes interactive Textarea with state');

// 6. Check Integrity: Ensure no fake bypasses or mock files
assert(!btnFile.includes('// mock') && !btnFile.includes('/* dummy */'), 'Button has genuine implementation');
assert(!dialogFile.includes('// mock') && !dialogFile.includes('/* dummy */'), 'Dialog has genuine implementation');

console.log(`\nADVERSARIAL TESTS COMPLETED: ${passCount} PASSED, ${failCount} FAILED.`);
if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
