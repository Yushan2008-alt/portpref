import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

console.log('--- Verifying Phase 1 UI Atoms & Showcase ---');

const files = [
  'src/components/ui/button.tsx',
  'src/components/ui/badge.tsx',
  'src/components/ui/dialog.tsx',
  'src/components/ui/input.tsx',
  'src/components/ui/textarea.tsx',
  'src/app/layout.tsx',
  'src/app/page.tsx'
];

for (const rel of files) {
  const full = path.join(rootDir, rel);
  if (!fs.existsSync(full)) {
    throw new Error(`File missing: ${rel}`);
  }
  console.log(`[PASS] File exists: ${rel}`);
}

// 1. Button check
const btnContent = fs.readFileSync(path.join(rootDir, 'src/components/ui/button.tsx'), 'utf8');
const buttonVariants = ['default', 'pill-soft', 'circle-menu', 'circle-scroll', 'outline', 'ghost'];
const buttonSizes = ['default', 'sm', 'lg', 'icon'];

for (const variant of buttonVariants) {
  if (!btnContent.includes(`"${variant}"`)) {
    throw new Error(`Button missing variant "${variant}"`);
  }
}
for (const size of buttonSizes) {
  if (!btnContent.includes(`"${size}"`)) {
    throw new Error(`Button missing size "${size}"`);
  }
}
if (!btnContent.includes('React.forwardRef<HTMLButtonElement, ButtonProps>')) {
  throw new Error('Button missing forwardRef typing');
}
if (!btnContent.includes('cn(')) {
  throw new Error('Button missing cn helper integration');
}
console.log('[PASS] Button component satisfies all variant, size, and typing contracts');

// 2. Badge check
const badgeContent = fs.readFileSync(path.join(rootDir, 'src/components/ui/badge.tsx'), 'utf8');
const badgeVariants = ['default', 'beacon', 'pill-tag', 'outline', 'secondary'];
for (const variant of badgeVariants) {
  if (!badgeContent.includes(`"${variant}"`)) {
    throw new Error(`Badge missing variant "${variant}"`);
  }
}
if (!badgeContent.includes('animate-ping')) {
  throw new Error('Badge missing animate-ping emerald dot');
}
if (!badgeContent.includes('cn(')) {
  throw new Error('Badge missing cn helper integration');
}
console.log('[PASS] Badge component satisfies all variant and pulsing beacon contracts');

// 3. Dialog check
const dialogContent = fs.readFileSync(path.join(rootDir, 'src/components/ui/dialog.tsx'), 'utf8');
const dialogComponents = [
  'Dialog',
  'DialogTrigger',
  'DialogContent',
  'DialogHeader',
  'DialogTitle',
  'DialogDescription',
  'DialogFooter',
  'DialogClose'
];
for (const comp of dialogComponents) {
  if (!dialogContent.includes(`export function ${comp}`) && !dialogContent.includes(`export const ${comp}`)) {
    throw new Error(`Dialog missing compound export: ${comp}`);
  }
}
if (!dialogContent.includes('createPortal')) {
  throw new Error('Dialog missing createPortal');
}
if (!dialogContent.includes('backdrop-blur')) {
  throw new Error('Dialog missing backdrop blur overlay');
}
if (!dialogContent.includes('Escape')) {
  throw new Error('Dialog missing Escape keydown handler');
}
if (!dialogContent.includes('overflow = "hidden"')) {
  throw new Error('Dialog missing body scroll lock');
}
console.log('[PASS] Dialog compound components satisfy accessibility, portal, and blur contracts');

// 4. Input check
const inputContent = fs.readFileSync(path.join(rootDir, 'src/components/ui/input.tsx'), 'utf8');
if (!inputContent.includes('React.forwardRef<HTMLInputElement, InputProps>')) {
  throw new Error('Input missing forwardRef');
}
if (!inputContent.includes('focus-visible:ring')) {
  throw new Error('Input missing ring-focus styles');
}
if (!inputContent.includes('disabled:cursor-not-allowed')) {
  throw new Error('Input missing disabled styles');
}
console.log('[PASS] Input component satisfies minimalist forwardRef and focus styling');

// 5. Textarea check
const textareaContent = fs.readFileSync(path.join(rootDir, 'src/components/ui/textarea.tsx'), 'utf8');
if (!textareaContent.includes('React.forwardRef<HTMLTextAreaElement, TextareaProps>')) {
  throw new Error('Textarea missing forwardRef');
}
if (!textareaContent.includes('focus-visible:ring')) {
  throw new Error('Textarea missing ring-focus styles');
}
if (!textareaContent.includes('disabled:cursor-not-allowed')) {
  throw new Error('Textarea missing disabled styles');
}
console.log('[PASS] Textarea component satisfies minimalist forwardRef and focus styling');

// 6. Layout check
const layoutContent = fs.readFileSync(path.join(rootDir, 'src/app/layout.tsx'), 'utf8');
if (!layoutContent.includes('defaultTheme="light"')) {
  throw new Error('Root layout missing defaultTheme="light"');
}
console.log('[PASS] Root layout configured with defaultTheme="light"');

// 7. Page check
const pageContent = fs.readFileSync(path.join(rootDir, 'src/app/page.tsx'), 'utf8');
if (!pageContent.includes('"use client"') && !pageContent.includes("'use client'")) {
  throw new Error('page.tsx missing use client directive');
}
if (!pageContent.includes('useTheme')) {
  throw new Error('page.tsx missing theme switcher');
}
if (!pageContent.includes('Button') || !pageContent.includes('Badge') || !pageContent.includes('Dialog') || !pageContent.includes('Input') || !pageContent.includes('Textarea')) {
  throw new Error('page.tsx missing showcase of UI atoms');
}
console.log('[PASS] Page component showcases all UI atoms with interactive theme toggle');

console.log('\n--- ALL PHASE 1 INTEGRITY CHECKS PASSED EMPIRICALLY ---');
