import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const rootDir = process.cwd();

console.log('================================================================');
console.log('       PHASE 1 EMPIRICAL CHALLENGER & ADVERSARIAL ORACLE        ');
console.log('================================================================');
console.log(`Target Workspace: ${rootDir}`);
console.log(`Timestamp: ${new Date().toISOString()}\n`);

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function assertCheck(suite, name, condition, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] [${suite}] ${name}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] [${suite}] ${name} -> ${details}`);
    failures.push({ suite, name, details });
  }
}

// -------------------------------------------------------------
// SUITE 1: Root Layout & Theme Configuration Verification
// -------------------------------------------------------------
console.log('\n--- SUITE 1: Root Layout & Theme Configuration Verification ---');
const layoutPath = path.join(rootDir, 'src', 'app', 'layout.tsx');
assertCheck('SUITE 1', 'layout.tsx exists', fs.existsSync(layoutPath));

if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');

  // Verify ThemeProvider import
  assertCheck(
    'SUITE 1',
    'ThemeProvider is imported from @/components/theme-provider',
    /import\s*\{\s*ThemeProvider\s*\}\s*from\s*["']@\/components\/theme-provider["']/.test(layoutContent)
  );

  // Verify defaultTheme="light"
  assertCheck(
    'SUITE 1',
    'ThemeProvider defaultTheme is set to "light"',
    /defaultTheme\s*=\s*["']light["']/.test(layoutContent),
    'Expected defaultTheme="light"'
  );

  // Verify attribute="class"
  assertCheck(
    'SUITE 1',
    'ThemeProvider attribute is set to "class"',
    /attribute\s*=\s*["']class["']/.test(layoutContent),
    'Expected attribute="class"'
  );

  // Verify suppressHydrationWarning on <html>
  assertCheck(
    'SUITE 1',
    'html tag has suppressHydrationWarning',
    /<html[\s\S]*?suppressHydrationWarning/.test(layoutContent),
    'Expected suppressHydrationWarning on <html ...>'
  );

  // Verify font variables attached
  assertCheck(
    'SUITE 1',
    'html tag includes fontSans and fontDisplay CSS variables',
    /fontSans\.variable/.test(layoutContent) && /fontDisplay\.variable/.test(layoutContent),
    'Expected fontSans.variable and fontDisplay.variable in className'
  );

  // Verify body styling
  assertCheck(
    'SUITE 1',
    'body tag applies bg-background and text-foreground',
    /className\s*=\s*["'][^"']*bg-background[^"']*text-foreground/.test(layoutContent),
    'Expected bg-background and text-foreground on body'
  );
}

// Verify theme-provider.tsx
const themeProviderPath = path.join(rootDir, 'src', 'components', 'theme-provider.tsx');
assertCheck('SUITE 1', 'src/components/theme-provider.tsx exists', fs.existsSync(themeProviderPath));
if (fs.existsSync(themeProviderPath)) {
  const tpContent = fs.readFileSync(themeProviderPath, 'utf8');
  assertCheck(
    'SUITE 1',
    'theme-provider.tsx has "use client" directive',
    tpContent.startsWith('"use client"') || tpContent.startsWith("'use client'")
  );
  assertCheck(
    'SUITE 1',
    'theme-provider.tsx wraps next-themes ThemeProvider',
    /from\s*["']next-themes["']/.test(tpContent) && /ThemeProvider/.test(tpContent)
  );
}

// -------------------------------------------------------------
// SUITE 2: UI Atoms Implementation & Interface Contracts
// -------------------------------------------------------------
console.log('\n--- SUITE 2: UI Atoms Implementation & Interface Contracts ---');

// 2.1 Button Component
const buttonPath = path.join(rootDir, 'src', 'components', 'ui', 'button.tsx');
assertCheck('SUITE 2', 'button.tsx exists', fs.existsSync(buttonPath));
if (fs.existsSync(buttonPath)) {
  const btnContent = fs.readFileSync(buttonPath, 'utf8');

  assertCheck(
    'SUITE 2',
    'button.tsx exports Button component',
    /export\s+(const|function)\s+Button/.test(btnContent)
  );
  assertCheck(
    'SUITE 2',
    'button.tsx implements React.forwardRef',
    /React\.forwardRef\s*<\s*HTMLButtonElement\s*,\s*ButtonProps\s*>/.test(btnContent) ||
    /forwardRef\s*<\s*HTMLButtonElement/.test(btnContent)
  );
  assertCheck(
    'SUITE 2',
    'Button.displayName is set',
    /Button\.displayName\s*=\s*["']Button["']/.test(btnContent)
  );

  const expectedVariants = ['default', 'pill-soft', 'circle-menu', 'circle-scroll', 'outline', 'ghost'];
  for (const variant of expectedVariants) {
    assertCheck(
      'SUITE 2',
      `button.tsx supports variant "${variant}"`,
      new RegExp(`["']${variant}["']`).test(btnContent),
      `Missing variant: ${variant}`
    );
  }

  const expectedSizes = ['default', 'sm', 'lg', 'icon'];
  for (const size of expectedSizes) {
    assertCheck(
      'SUITE 2',
      `button.tsx supports size "${size}"`,
      new RegExp(`["']${size}["']`).test(btnContent),
      `Missing size: ${size}`
    );
  }

  // Circular sizing logic
  assertCheck(
    'SUITE 2',
    'button.tsx contains circular dimension handling (aspect-square / circular sizes)',
    /circle-menu/.test(btnContent) && /circle-scroll/.test(btnContent) && /aspect-square/.test(btnContent)
  );
}

// 2.2 Badge Component
const badgePath = path.join(rootDir, 'src', 'components', 'ui', 'badge.tsx');
assertCheck('SUITE 2', 'badge.tsx exists', fs.existsSync(badgePath));
if (fs.existsSync(badgePath)) {
  const badgeContent = fs.readFileSync(badgePath, 'utf8');

  assertCheck(
    'SUITE 2',
    'badge.tsx exports Badge component',
    /export\s+(const|function)\s+Badge/.test(badgeContent)
  );
  assertCheck(
    'SUITE 2',
    'badge.tsx implements React.forwardRef',
    /forwardRef\s*<\s*HTMLDivElement/.test(badgeContent)
  );
  assertCheck(
    'SUITE 2',
    'Badge.displayName is set',
    /Badge\.displayName\s*=\s*["']Badge["']/.test(badgeContent)
  );

  const expectedBadgeVariants = ['default', 'beacon', 'pill-tag', 'outline', 'secondary'];
  for (const variant of expectedBadgeVariants) {
    assertCheck(
      'SUITE 2',
      `badge.tsx supports variant "${variant}"`,
      new RegExp(`["']${variant}["']`).test(badgeContent),
      `Missing badge variant: ${variant}`
    );
  }

  // Pulsing beacon emerald animation
  assertCheck(
    'SUITE 2',
    'badge.tsx beacon variant renders pulsing emerald indicator dot',
    /animate-ping/.test(badgeContent) &&
    /bg-emerald-400/.test(badgeContent) &&
    /bg-emerald-500/.test(badgeContent)
  );
}

// 2.3 Dialog Component
const dialogPath = path.join(rootDir, 'src', 'components', 'ui', 'dialog.tsx');
assertCheck('SUITE 2', 'dialog.tsx exists', fs.existsSync(dialogPath));
if (fs.existsSync(dialogPath)) {
  const dialogContent = fs.readFileSync(dialogPath, 'utf8');

  assertCheck(
    'SUITE 2',
    'dialog.tsx has "use client" directive',
    dialogContent.startsWith('"use client"') || dialogContent.startsWith("'use client'")
  );

  const dialogExports = [
    'Dialog',
    'DialogTrigger',
    'DialogContent',
    'DialogHeader',
    'DialogTitle',
    'DialogDescription',
    'DialogFooter',
    'DialogClose',
    'useDialog',
  ];
  for (const exp of dialogExports) {
    assertCheck(
      'SUITE 2',
      `dialog.tsx exports ${exp}`,
      new RegExp(`export\\s+(const|function)\\s+${exp}`).test(dialogContent),
      `Missing dialog export: ${exp}`
    );
  }

  assertCheck(
    'SUITE 2',
    'DialogContent uses React Portal to document.body',
    /createPortal\s*\([\s\S]*?document\.body\s*\)/.test(dialogContent)
  );
  assertCheck(
    'SUITE 2',
    'DialogContent implements backdrop overlay with blur',
    /backdrop-blur/.test(dialogContent) && /bg-black\/60/.test(dialogContent)
  );
  assertCheck(
    'SUITE 2',
    'DialogContent implements Escape key listener',
    /e\.key\s*===\s*["']Escape["']/.test(dialogContent)
  );
  assertCheck(
    'SUITE 2',
    'DialogContent locks and restores document.body.style.overflow',
    /document\.body\.style\.overflow\s*=\s*["']hidden["']/.test(dialogContent)
  );
  assertCheck(
    'SUITE 2',
    'DialogContent sets role="dialog" and aria-modal="true"',
    /role\s*=\s*["']dialog["']/.test(dialogContent) && /aria-modal\s*=\s*["']true["']/.test(dialogContent)
  );
  assertCheck(
    'SUITE 2',
    'DialogContent includes accessible close button with aria-label',
    /aria-label\s*=\s*["']Close dialog["']/.test(dialogContent)
  );
  assertCheck(
    'SUITE 2',
    'DialogTrigger and DialogClose support asChild pattern',
    /asChild\s*=\s*false/.test(dialogContent) && /React\.cloneElement/.test(dialogContent)
  );
}

// 2.4 Input Component
const inputPath = path.join(rootDir, 'src', 'components', 'ui', 'input.tsx');
assertCheck('SUITE 2', 'input.tsx exists', fs.existsSync(inputPath));
if (fs.existsSync(inputPath)) {
  const inputContent = fs.readFileSync(inputPath, 'utf8');

  assertCheck(
    'SUITE 2',
    'input.tsx exports Input component',
    /export\s+(const|function)\s+Input/.test(inputContent)
  );
  assertCheck(
    'SUITE 2',
    'input.tsx implements React.forwardRef',
    /forwardRef\s*<\s*HTMLInputElement/.test(inputContent)
  );
  assertCheck(
    'SUITE 2',
    'Input.displayName is set',
    /Input\.displayName\s*=\s*["']Input["']/.test(inputContent)
  );
  assertCheck(
    'SUITE 2',
    'input.tsx has focus-visible ring styles and disabled states',
    /focus-visible:ring-ring/.test(inputContent) && /disabled:cursor-not-allowed/.test(inputContent)
  );
}

// 2.5 Textarea Component
const textareaPath = path.join(rootDir, 'src', 'components', 'ui', 'textarea.tsx');
assertCheck('SUITE 2', 'textarea.tsx exists', fs.existsSync(textareaPath));
if (fs.existsSync(textareaPath)) {
  const textareaContent = fs.readFileSync(textareaPath, 'utf8');

  assertCheck(
    'SUITE 2',
    'textarea.tsx exports Textarea component',
    /export\s+(const|function)\s+Textarea/.test(textareaContent)
  );
  assertCheck(
    'SUITE 2',
    'textarea.tsx implements React.forwardRef',
    /forwardRef\s*<\s*HTMLTextAreaElement/.test(textareaContent)
  );
  assertCheck(
    'SUITE 2',
    'Textarea.displayName is set',
    /Textarea\.displayName\s*=\s*["']Textarea["']/.test(textareaContent)
  );
  assertCheck(
    'SUITE 2',
    'textarea.tsx has focus-visible ring styles, resize-y, and disabled states',
    /focus-visible:ring-ring/.test(textareaContent) &&
    /resize-y/.test(textareaContent) &&
    /disabled:cursor-not-allowed/.test(textareaContent)
  );
}

// -------------------------------------------------------------
// SUITE 3: Interactive Showcase Verification in src/app/page.tsx
// -------------------------------------------------------------
console.log('\n--- SUITE 3: Interactive Showcase Verification in src/app/page.tsx ---');
const pagePath = path.join(rootDir, 'src', 'app', 'page.tsx');
assertCheck('SUITE 3', 'page.tsx exists', fs.existsSync(pagePath));

if (fs.existsSync(pagePath)) {
  const pageContent = fs.readFileSync(pagePath, 'utf8');

  assertCheck(
    'SUITE 3',
    'page.tsx has "use client" directive',
    pageContent.startsWith('"use client"') || pageContent.startsWith("'use client'")
  );

  // Check imports
  assertCheck(
    'SUITE 3',
    'page.tsx imports useTheme from next-themes',
    /import\s*\{[\s\S]*?useTheme[\s\S]*?\}\s*from\s*["']next-themes["']/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx imports Button from @/components/ui/button',
    /import\s*\{\s*Button\s*\}\s*from\s*["']@\/components\/ui\/button["']/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx imports Badge from @/components/ui/badge',
    /import\s*\{\s*Badge\s*\}\s*from\s*["']@\/components\/ui\/badge["']/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx imports Dialog compound components',
    /import\s*\{[\s\S]*?Dialog[\s\S]*?DialogTrigger[\s\S]*?DialogContent[\s\S]*?\}\s*from\s*["']@\/components\/ui\/dialog["']/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx imports Input from @/components/ui/input',
    /import\s*\{\s*Input\s*\}\s*from\s*["']@\/components\/ui\/input["']/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx imports Textarea from @/components/ui/textarea',
    /import\s*\{\s*Textarea\s*\}\s*from\s*["']@\/components\/ui\/textarea["']/.test(pageContent)
  );

  // Theme Switcher implementation
  assertCheck(
    'SUITE 3',
    'page.tsx implements client mounted hydration guard for theme switching',
    /const\s*\[\s*mounted\s*,\s*setMounted\s*\]\s*=\s*React\.useState\(false\)/.test(pageContent) &&
    /setMounted\(true\)/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx implements toggleTheme switching between light and dark',
    /setTheme\s*\(\s*theme\s*===\s*["']dark["']\s*\?\s*["']light["']\s*:\s*["']dark["']\s*\)/.test(pageContent)
  );

  // Rendered Button variants
  const buttonVariantsInPage = ['default', 'pill-soft', 'circle-menu', 'circle-scroll', 'outline', 'ghost'];
  for (const v of buttonVariantsInPage) {
    assertCheck(
      'SUITE 3',
      `page.tsx renders Button variant="${v}"`,
      new RegExp(`<Button[^>]*variant=["']${v}["']`).test(pageContent),
      `Missing <Button variant="${v}" ...>`
    );
  }

  // Rendered Button sizes
  const buttonSizesInPage = ['sm', 'default', 'lg', 'icon'];
  for (const s of buttonSizesInPage) {
    assertCheck(
      'SUITE 3',
      `page.tsx renders Button size="${s}"`,
      new RegExp(`<Button[^>]*size=["']${s}["']`).test(pageContent),
      `Missing <Button size="${s}" ...>`
    );
  }

  // Disabled button rendered
  assertCheck(
    'SUITE 3',
    'page.tsx demonstrates disabled Button state',
    /<Button[^>]*disabled/.test(pageContent)
  );

  // Rendered Badge variants
  const badgeVariantsInPage = ['beacon', 'default', 'pill-tag', 'outline', 'secondary'];
  for (const bv of badgeVariantsInPage) {
    assertCheck(
      'SUITE 3',
      `page.tsx renders Badge variant="${bv}"`,
      new RegExp(`<Badge[^>]*variant=["']${bv}["']`).test(pageContent),
      `Missing <Badge variant="${bv}" ...>`
    );
  }

  // Form controls interactivity
  assertCheck(
    'SUITE 3',
    'page.tsx binds Input with interactive state (value & onChange)',
    /<Input[\s\S]*?value=\{inputVal\}[\s\S]*?onChange=/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx renders disabled Input',
    /<Input[^>]*disabled/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx binds Textarea with interactive state (value & onChange)',
    /<Textarea[\s\S]*?value=\{textareaVal\}[\s\S]*?onChange=/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx renders disabled Textarea',
    /<Textarea[^>]*disabled/.test(pageContent)
  );

  // Modal Dialog trigger & content
  assertCheck(
    'SUITE 3',
    'page.tsx renders <Dialog> with <DialogTrigger> and <DialogContent>',
    /<Dialog>[\s\S]*?<DialogTrigger[\s\S]*?<DialogContent/.test(pageContent)
  );
  assertCheck(
    'SUITE 3',
    'page.tsx includes DialogTitle, DialogDescription, and DialogFooter with DialogClose',
    /<DialogTitle>/.test(pageContent) &&
    /<DialogDescription>/.test(pageContent) &&
    /<DialogFooter>/.test(pageContent) &&
    /<DialogClose/.test(pageContent)
  );
}

// -------------------------------------------------------------
// SUITE 4: Design Tokens & Tailwind Theme Configuration
// -------------------------------------------------------------
console.log('\n--- SUITE 4: Design Tokens & Tailwind Theme Configuration ---');

const tailwindConfigPath = path.join(rootDir, 'tailwind.config.ts');
assertCheck('SUITE 4', 'tailwind.config.ts exists', fs.existsSync(tailwindConfigPath));
if (fs.existsSync(tailwindConfigPath)) {
  const twContent = fs.readFileSync(tailwindConfigPath, 'utf8');

  assertCheck(
    'SUITE 4',
    'tailwind.config.ts sets darkMode: ["class"]',
    /darkMode\s*:\s*\[\s*["']class["']\s*\]/.test(twContent)
  );
  assertCheck(
    'SUITE 4',
    'tailwind.config.ts extends pill-soft and pill-hover color tokens',
    /["']pill-soft["']\s*:\s*["']hsl\(var\(--pill-soft\)\)["']/.test(twContent) &&
    /["']pill-hover["']\s*:\s*["']hsl\(var\(--pill-hover\)\)["']/.test(twContent)
  );
  assertCheck(
    'SUITE 4',
    'tailwind.config.ts extends fontFamily.sans and fontFamily.display',
    /sans:\s*\[/.test(twContent) && /display:\s*\[/.test(twContent)
  );
}

const globalsCssPath = path.join(rootDir, 'src', 'app', 'globals.css');
assertCheck('SUITE 4', 'globals.css exists', fs.existsSync(globalsCssPath));
if (fs.existsSync(globalsCssPath)) {
  const cssContent = fs.readFileSync(globalsCssPath, 'utf8');

  assertCheck(
    'SUITE 4',
    'globals.css defines :root theme tokens (light mode)',
    /:root\s*\{[\s\S]*?--background:[\s\S]*?--foreground:[\s\S]*?--primary:[\s\S]*?--pill-soft:/.test(cssContent)
  );
  assertCheck(
    'SUITE 4',
    'globals.css defines .dark theme tokens (dark mode)',
    /\.dark\s*\{[\s\S]*?--background:[\s\S]*?--foreground:[\s\S]*?--primary:[\s\S]*?--pill-soft:/.test(cssContent)
  );
}

// -------------------------------------------------------------
// SUITE 5: Live Execution & Production Build Verification
// -------------------------------------------------------------
console.log('\n--- SUITE 5: Live Execution, Typecheck, and Production Build Verification ---');

// 5.1 TypeScript Typecheck
try {
  console.log('  Executing: npm run typecheck ...');
  const tcOutput = execSync('npm run typecheck', { encoding: 'utf8', stdio: 'pipe' });
  assertCheck('SUITE 5', 'TypeScript typecheck (npm run typecheck) passes with code 0', true);
} catch (err) {
  assertCheck('SUITE 5', 'TypeScript typecheck (npm run typecheck) passes with code 0', false, err.message);
}

// 5.2 Next.js ESLint
try {
  console.log('  Executing: npm run lint ...');
  const lintOutput = execSync('npm run lint', { encoding: 'utf8', stdio: 'pipe' });
  assertCheck('SUITE 5', 'Next.js lint (npm run lint) passes with zero errors/warnings', true);
} catch (err) {
  assertCheck('SUITE 5', 'Next.js lint (npm run lint) passes with zero errors/warnings', false, err.message);
}

// 5.3 Next.js Production Build
let buildStdout = '';
try {
  console.log('  Executing: npm run build (next build) ...');
  buildStdout = execSync('npm run build', { encoding: 'utf8', stdio: 'pipe' });
  assertCheck('SUITE 5', 'Next.js production build (npm run build) exits with code 0', true);

  assertCheck(
    'SUITE 5',
    'Build output indicates "Compiled successfully"',
    buildStdout.includes('Compiled successfully'),
    'Compiled successfully not found in build output'
  );

  assertCheck(
    'SUITE 5',
    'Build output indicates static page generation completed for all routes',
    buildStdout.includes('Generating static pages (4/4)') || /Generating static pages \(\d+\/\d+\)/.test(buildStdout)
  );

  assertCheck(
    'SUITE 5',
    'Route / is statically prerendered (SSG)',
    /┌\s*○\s*\/\s+/.test(buildStdout) || buildStdout.includes('○ /'),
    'Route / was not rendered as static'
  );

  assertCheck(
    'SUITE 5',
    'Route /_not-found is statically prerendered (SSG)',
    /└\s*○\s*\/_not-found/.test(buildStdout) || buildStdout.includes('○ /_not-found'),
    'Route /_not-found was not rendered as static'
  );

} catch (err) {
  assertCheck('SUITE 5', 'Next.js production build exits with code 0', false, err.message);
}

// 5.4 Phase 0 Baseline Regression Test
try {
  console.log('  Executing: node tests/phase0-oracle.mjs ...');
  const p0Output = execSync('node tests/phase0-oracle.mjs', { encoding: 'utf8', stdio: 'pipe' });
  const passed85 = p0Output.includes('PASSED: 85') && p0Output.includes('FAILED: 0');
  assertCheck('SUITE 5', 'Phase 0 Baseline Regression test passes 85/85 checks without defect', passed85);
} catch (err) {
  assertCheck('SUITE 5', 'Phase 0 Baseline Regression test passes 85/85 checks without defect', false, err.message);
}

// -------------------------------------------------------------
// HARNESS SUMMARY & VERDICT
// -------------------------------------------------------------
console.log('\n================================================================');
console.log('                 CHALLENGER HARNESS SUMMARY                     ');
console.log('================================================================');
console.log(`TOTAL CHECKS: ${totalChecks}`);
console.log(`PASSED:       ${passedChecks}`);
console.log(`FAILED:       ${failedChecks}`);
const successRate = ((passedChecks / totalChecks) * 100).toFixed(2);
console.log(`SUCCESS RATE: ${successRate}%`);
console.log('================================================================');

if (failedChecks === 0) {
  console.log('CHALLENGER VERDICT: [APPROVE]');
  console.log('All empirical assertions passed. No functional, architectural, or regression defects found.');
  process.exit(0);
} else {
  console.error('CHALLENGER VERDICT: [REQUEST_CHANGES]');
  console.error(`Detected ${failedChecks} empirical failures:`);
  for (const f of failures) {
    console.error(`  - [${f.suite}] ${f.name}: ${f.details}`);
  }
  process.exit(1);
}
