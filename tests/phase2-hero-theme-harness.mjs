import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import ts from 'typescript';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const rootDir = process.cwd();

console.log('================================================================');
console.log('      PHASE 2 EMPIRICAL CHALLENGER & ADVERSARIAL HARNESS        ');
console.log('  Hero Section, Scroll Button, Theme Switcher & Constraints      ');
console.log('================================================================');
console.log(`Working Directory: ${rootDir}`);
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
// Helper: Transpile and Load TSX module for empirical testing
// -------------------------------------------------------------
function loadTsxModule(relPath, extraMocks = {}) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  const sourceCode = fs.readFileSync(fullPath, 'utf8');
  const transpiled = ts.transpileModule(sourceCode, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
    },
  }).outputText;

  const mod = { exports: {} };

  // Mock Lucide icons
  const createMockIcon = (name) => {
    const IconComponent = (props) =>
      React.createElement('svg', {
        'data-lucide': name,
        className: props.className,
        'aria-hidden': props['aria-hidden'],
      });
    IconComponent.displayName = name;
    return IconComponent;
  };

  const lucideMock = {
    ArrowDown: createMockIcon('ArrowDown'),
    Sun: createMockIcon('Sun'),
    Moon: createMockIcon('Moon'),
    X: createMockIcon('X'),
    Github: createMockIcon('Github'),
    Linkedin: createMockIcon('Linkedin'),
    Twitter: createMockIcon('Twitter'),
    Mail: createMockIcon('Mail'),
    ArrowUpRight: createMockIcon('ArrowUpRight'),
    Sparkles: createMockIcon('Sparkles'),
    Menu: createMockIcon('Menu'),
    Send: createMockIcon('Send'),
    Layers: createMockIcon('Layers'),
    CheckCircle2: createMockIcon('CheckCircle2'),
    Sliders: createMockIcon('Sliders'),
    ExternalLink: createMockIcon('ExternalLink'),
    Code2: createMockIcon('Code2'),
    Terminal: createMockIcon('Terminal'),
  };

  // Mock framer-motion
  const motionMock = {
    motion: {
      div: (props) => React.createElement('div', { 'data-motion': 'div', ...props }),
      aside: (props) => React.createElement('aside', { 'data-motion': 'aside', ...props }),
    },
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
  };

  // Mock next-themes
  const nextThemesMock = {
    useTheme: () => ({
      theme: 'light',
      setTheme: () => {},
    }),
  };

  // Mock react-dom createPortal
  const reactDomMock = {
    createPortal: (children) => React.createElement('div', { 'data-portal': true }, children),
  };

  const customRequire = (id) => {
    if (extraMocks[id]) return extraMocks[id];
    if (id === 'react') return React;
    if (id === 'react-dom') return reactDomMock;
    if (id === 'lucide-react') return lucideMock;
    if (id === 'framer-motion') return motionMock;
    if (id === 'next-themes') return nextThemesMock;
    if (id === '@/components/ui/button') {
      return loadTsxModule('src/components/ui/button.tsx', extraMocks);
    }
    if (id === '@/components/ui/badge') {
      return loadTsxModule('src/components/ui/badge.tsx', extraMocks);
    }
    if (id === '@/components/ui/dialog') {
      return loadTsxModule('src/components/ui/dialog.tsx', extraMocks);
    }
    if (id === '@/components/ui/input') {
      return loadTsxModule('src/components/ui/input.tsx', extraMocks);
    }
    if (id === '@/components/ui/textarea') {
      return loadTsxModule('src/components/ui/textarea.tsx', extraMocks);
    }
    if (id === '@/components/navbar') {
      return loadTsxModule('src/components/navbar.tsx', extraMocks);
    }
    if (id === '@/components/hero-section') {
      return loadTsxModule('src/components/hero-section.tsx', extraMocks);
    }
    if (id === '@/lib/utils') {
      return {
        cn: (...classes) => classes.filter(Boolean).join(' '),
      };
    }
    return {};
  };

  const fn = new Function('require', 'module', 'exports', transpiled);
  fn(customRequire, mod, mod.exports);
  return mod.exports;
}

// =============================================================
// SUITE 1: Hero Section Implementation & Copy Verification
// =============================================================
console.log('\n--- SUITE 1: Hero Section Implementation & Copy Verification ---');
const heroFile = path.join(rootDir, 'src/components/hero-section.tsx');
assertCheck('SUITE 1', 'src/components/hero-section.tsx exists', fs.existsSync(heroFile));

const heroContent = fs.existsSync(heroFile) ? fs.readFileSync(heroFile, 'utf8') : '';
assertCheck('SUITE 1', 'Hero Section declares "use client"', heroContent.includes('"use client"'));

let heroModule;
try {
  heroModule = loadTsxModule('src/components/hero-section.tsx');
} catch (e) {
  console.error('Failed to load hero-section module:', e.message);
}

assertCheck('SUITE 1', 'HeroSection component is exported as function', typeof heroModule?.HeroSection === 'function');

// SSR Render HeroSection
let heroHtml = '';
try {
  heroHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(heroModule.HeroSection));
} catch (e) {
  console.error('Failed to render HeroSection to static HTML:', e.message);
}
assertCheck('SUITE 1', 'HeroSection renders to static HTML without crashing', heroHtml.length > 0);

// Kicker copy
const expectedKicker = "Helping fast-moving startups and companies build scalable, high-performance web products.";
assertCheck('SUITE 1', 'Hero Kicker copy exact match', heroHtml.includes(expectedKicker));
assertCheck('SUITE 1', 'Hero Kicker has font-sans class in heroContent', heroContent.includes('font-sans') && heroContent.includes(expectedKicker));

// Headline copy
const expectedHeadline = "Senior Full-Stack Software Engineer building scalable products with precision & impact";
const renderedHeadlineMatch = heroHtml.includes("Senior Full-Stack Software Engineer building scalable products with precision &amp; impact") || heroHtml.includes(expectedHeadline);
assertCheck('SUITE 1', 'Hero Headline copy exact match', renderedHeadlineMatch);

// Headline typography & color
assertCheck('SUITE 1', 'Headline applies Space Grotesk font-display', heroContent.includes('font-display'));
assertCheck('SUITE 1', 'Headline applies bold weight font-bold', heroContent.includes('font-bold'));
assertCheck('SUITE 1', 'Headline uses pure black text-black in light mode', heroContent.includes('text-black'));
assertCheck('SUITE 1', 'Headline uses crisp white dark:text-white in dark mode', heroContent.includes('dark:text-white'));
assertCheck('SUITE 1', 'Headline avoids purple gradients (no bg-gradient, no text-transparent, no purple)', 
  !heroContent.includes('bg-gradient-to') && !heroContent.includes('text-transparent') && !heroContent.includes('from-purple')
);

// Eyebrow Beacon Badge
assertCheck('SUITE 1', 'Hero renders eyebrow beacon badge', heroHtml.includes('Available for High-Impact Projects'));
assertCheck('SUITE 1', 'Hero eyebrow uses variant="beacon"', heroContent.includes('variant="beacon"'));

// Action Pill: "Book strategy call"
const expectedActionPill = "Book strategy call";
assertCheck('SUITE 1', 'Action Pill text exact match: "Book strategy call"', heroHtml.includes(expectedActionPill));
assertCheck('SUITE 1', 'Action Pill uses variant="pill-soft"', heroContent.includes('variant="pill-soft"'));
assertCheck('SUITE 1', 'Action Pill uses soft gray #F0F0F3 (bg-[#F0F0F3])', heroContent.includes('bg-[#F0F0F3]'));
assertCheck('SUITE 1', 'Action Pill uses dark mode #FFFFFF/10 (dark:bg-white/10)', heroContent.includes('dark:bg-white/10'));
assertCheck('SUITE 1', 'Action Pill has hover lift (-translate-y-0.5)', heroContent.includes('hover:-translate-y-0.5'));
assertCheck('SUITE 1', 'Action Pill has shadow elevation (shadow-sm hover:shadow-md)', heroContent.includes('shadow-sm') && heroContent.includes('hover:shadow-md'));
assertCheck('SUITE 1', 'Action Pill has rounded-full geometry', heroContent.includes('rounded-full'));
assertCheck('SUITE 1', 'Action Pill click triggers contact scroll or mailto', heroContent.includes('scrollToContact') && heroContent.includes('mailto:'));

// Viewport container units
assertCheck('SUITE 1', 'Hero container uses min-h-[calc(100dvh-4rem)] or dvh units', heroContent.includes('min-h-[calc(100dvh-4rem)]') || heroContent.includes('dvh'));
assertCheck('SUITE 1', 'Hero container caps top padding (pt-12 sm:pt-16 md:pt-20, well below pt-24)', heroContent.includes('pt-12 sm:pt-16 md:pt-20'));

// Marquee items
const expectedMarquee = [
  "99.98% SYSTEM UPTIME · SCALE PROVEN",
  "SUB-100MS API RESPONSE LATENCY",
  "$85M+ TRANSACTION VOLUME HANDLED",
  "15+ ENTERPRISE RELEASES SHIPPED",
  "ZERO RUNTIME VULNERABILITIES"
];
expectedMarquee.forEach((metric, idx) => {
  assertCheck('SUITE 1', `Marquee metric ${idx + 1} present: "${metric}"`, heroHtml.includes(metric));
});
assertCheck('SUITE 1', 'Marquee dividers use electric blue #2563EB', heroContent.includes('#2563EB') && heroContent.includes('/'));
assertCheck('SUITE 1', 'Marquee utilizes cloned dual tracks with aria-hidden for seamless wrap', heroContent.includes('track1') && heroContent.includes('track2') && heroContent.includes('aria-hidden="true"'));


// =============================================================
// SUITE 2: Scroll Down Button Verification
// =============================================================
console.log('\n--- SUITE 2: Scroll Down Button Verification ---');

assertCheck('SUITE 2', 'Scroll button is rendered in HeroSection', heroHtml.includes('aria-label="Scroll down to showcase section"'));
assertCheck('SUITE 2', 'Scroll button is a button element with type="button"', heroContent.includes('<button') && heroContent.includes('type="button"') && heroContent.includes('aria-label="Scroll down to showcase section"'));
assertCheck('SUITE 2', 'Scroll button has circular geometry (rounded-full aspect-square h-12 w-12)', 
  heroContent.includes('rounded-full') && heroContent.includes('aspect-square') && heroContent.includes('h-12 w-12')
);
assertCheck('SUITE 2', 'Scroll button is circular black in light mode (bg-black text-white hover:bg-neutral-800)', 
  heroContent.includes('bg-black') && heroContent.includes('text-white') && heroContent.includes('hover:bg-neutral-800')
);
assertCheck('SUITE 2', 'Scroll button adapts to white in dark mode (dark:bg-white dark:text-black dark:hover:bg-neutral-200)', 
  heroContent.includes('dark:bg-white') && heroContent.includes('dark:text-black') && heroContent.includes('dark:hover:bg-neutral-200')
);
assertCheck('SUITE 2', 'Scroll button contains Lucide ArrowDown icon (h-5 w-5)', heroContent.includes('ArrowDown') && heroContent.includes('h-5 w-5'));
assertCheck('SUITE 2', 'Scroll button icon has hover downward nudge (group-hover:translate-y-0.5)', heroContent.includes('group-hover:translate-y-0.5'));
assertCheck('SUITE 2', 'Scroll button has active press scale (active:scale-95)', heroContent.includes('active:scale-95'));
assertCheck('SUITE 2', 'Scroll button has focus ring accessibility (focus-visible:ring-2 focus-visible:ring-primary)', 
  heroContent.includes('focus-visible:ring-2') && heroContent.includes('focus-visible:ring-primary')
);
assertCheck('SUITE 2', 'Scroll button click handler targets #showcase section', 
  heroContent.includes('scrollToNextSection') && heroContent.includes('document.getElementById("showcase")')
);
assertCheck('SUITE 2', 'Scroll button uses smooth scroll behavior', heroContent.includes("behavior: \"smooth\""));

// Check target section in page.tsx
const pageFile = path.join(rootDir, 'src/app/page.tsx');
const pageContent = fs.existsSync(pageFile) ? fs.readFileSync(pageFile, 'utf8') : '';
assertCheck('SUITE 2', 'Target #showcase section exists in src/app/page.tsx', pageContent.includes('id="showcase"'));


// =============================================================
// SUITE 3: Theme Switcher & Toggle System Verification
// =============================================================
console.log('\n--- SUITE 3: Theme Switcher & Toggle System Verification ---');

const navbarFile = path.join(rootDir, 'src/components/navbar.tsx');
assertCheck('SUITE 3', 'src/components/navbar.tsx exists', fs.existsSync(navbarFile));

const navbarContent = fs.existsSync(navbarFile) ? fs.readFileSync(navbarFile, 'utf8') : '';
assertCheck('SUITE 3', 'Navbar imports useTheme from next-themes', navbarContent.includes('import { useTheme } from "next-themes";'));
assertCheck('SUITE 3', 'Navbar imports Lucide Sun and Moon icons', navbarContent.includes('Sun') && navbarContent.includes('Moon'));
assertCheck('SUITE 3', 'Navbar implements mounted state for hydration safety', navbarContent.includes('const [mounted, setMounted] = React.useState(false);'));
assertCheck('SUITE 3', 'Navbar sets mounted=true in useEffect', navbarContent.includes('setMounted(true)'));
assertCheck('SUITE 3', 'Theme toggle renders placeholder before hydration (no FOUC)', navbarContent.includes('<span className="h-4 w-4 block" />'));
assertCheck('SUITE 3', 'Theme toggle conditionally renders Sun icon for dark theme', navbarContent.includes('theme === "dark"') && navbarContent.includes('<Sun'));
assertCheck('SUITE 3', 'Theme toggle conditionally renders Moon icon for light theme', navbarContent.includes('<Moon'));
assertCheck('SUITE 3', 'Theme toggle button has aria-label="Toggle color theme"', navbarContent.includes('aria-label="Toggle color theme"'));
assertCheck('SUITE 3', 'Theme toggle uses variant="circle-menu"', navbarContent.includes('variant="circle-menu"'));
assertCheck('SUITE 3', 'Theme toggle switches between dark and light', navbarContent.includes('setTheme(theme === "dark" ? "light" : "dark")'));

// Layout theme provider checks
const layoutFile = path.join(rootDir, 'src/app/layout.tsx');
const layoutContent = fs.existsSync(layoutFile) ? fs.readFileSync(layoutFile, 'utf8') : '';
assertCheck('SUITE 3', 'Root layout configures ThemeProvider defaultTheme="light"', layoutContent.includes('defaultTheme="light"'));
assertCheck('SUITE 3', 'Root layout configures ThemeProvider attribute="class"', layoutContent.includes('attribute="class"'));
assertCheck('SUITE 3', 'Root layout configures enableSystem={false}', layoutContent.includes('enableSystem={false}'));
assertCheck('SUITE 3', 'Root layout configures disableTransitionOnChange', layoutContent.includes('disableTransitionOnChange'));
assertCheck('SUITE 3', 'Root layout html element sets suppressHydrationWarning', layoutContent.includes('suppressHydrationWarning'));

// tailwind darkMode check
const tailwindFile = path.join(rootDir, 'tailwind.config.ts');
const tailwindContent = fs.existsSync(tailwindFile) ? fs.readFileSync(tailwindFile, 'utf8') : '';
assertCheck('SUITE 3', 'tailwind.config.ts configures darkMode: ["class"]', tailwindContent.includes('darkMode: ["class"]'));


// =============================================================
// SUITE 4: Page Integration & Architecture Verification
// =============================================================
console.log('\n--- SUITE 4: Page Integration & Architecture Verification ---');

assertCheck('SUITE 4', 'src/app/page.tsx imports Navbar', pageContent.includes('import { Navbar } from "@/components/navbar";'));
assertCheck('SUITE 4', 'src/app/page.tsx imports HeroSection', pageContent.includes('import { HeroSection } from "@/components/hero-section";'));
assertCheck('SUITE 4', 'src/app/page.tsx mounts <Navbar />', pageContent.includes('<Navbar />') || pageContent.includes('<Navbar'));
assertCheck('SUITE 4', 'src/app/page.tsx mounts <HeroSection />', pageContent.includes('<HeroSection />') || pageContent.includes('<HeroSection'));

// Verify DOM tree order: Navbar before HeroSection, HeroSection before #showcase
const navbarIdx = pageContent.indexOf('<Navbar');
const heroIdx = pageContent.indexOf('<HeroSection');
const showcaseIdx = pageContent.indexOf('id="showcase"');
assertCheck('SUITE 4', 'Navbar is mounted before HeroSection in DOM order', navbarIdx !== -1 && heroIdx !== -1 && navbarIdx < heroIdx);
assertCheck('SUITE 4', 'HeroSection is mounted before #showcase in DOM order', heroIdx !== -1 && showcaseIdx !== -1 && heroIdx < showcaseIdx);

// Navigation anchor targets in page.tsx
['#about', '#works', '#services', '#stack', '#contact'].forEach((anchor) => {
  const idName = anchor.replace('#', '');
  assertCheck('SUITE 4', `Anchor target id="${idName}" exists in src/app/page.tsx`, pageContent.includes(`id="${idName}"`));
});

// SSR render of full page
let pageModule;
let pageHtml = '';
try {
  pageModule = loadTsxModule('src/app/page.tsx');
  pageHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(pageModule.default));
} catch (e) {
  console.error('Failed to render page to static HTML:', e.message);
}
assertCheck('SUITE 4', 'Full page renders to static HTML without throwing exceptions', pageHtml.length > 0);
assertCheck('SUITE 4', 'Rendered page HTML includes Navbar brand text', pageHtml.includes('developer.') && pageHtml.includes('portfolio.'));
assertCheck('SUITE 4', 'Rendered page HTML includes HeroSection headline', pageHtml.includes('Senior Full-Stack Software Engineer'));
assertCheck('SUITE 4', 'Rendered page HTML includes showcase section', pageHtml.includes('id="showcase"'));


// =============================================================
// SUITE 5: Typography, CSS Tokens, and Viewport Units
// =============================================================
console.log('\n--- SUITE 5: Typography, CSS Tokens, and Viewport Units ---');

assertCheck('SUITE 5', 'layout.tsx configures Plus_Jakarta_Sans as --font-sans', layoutContent.includes('Plus_Jakarta_Sans') && layoutContent.includes('--font-sans'));
assertCheck('SUITE 5', 'layout.tsx configures Space_Grotesk as --font-display', layoutContent.includes('Space_Grotesk') && layoutContent.includes('--font-display'));
assertCheck('SUITE 5', 'layout.tsx html element injects fontSans.variable and fontDisplay.variable', 
  layoutContent.includes('fontSans.variable') && layoutContent.includes('fontDisplay.variable')
);
assertCheck('SUITE 5', 'layout.tsx body applies font-sans', layoutContent.includes('font-sans'));

const cssFile = path.join(rootDir, 'src/app/globals.css');
const cssContent = fs.existsSync(cssFile) ? fs.readFileSync(cssFile, 'utf8') : '';
assertCheck('SUITE 5', 'globals.css applies font-sans to body in base layer', cssContent.includes('@apply bg-background text-foreground font-sans;'));
assertCheck('SUITE 5', 'globals.css defines --font-sans token with Plus Jakarta Sans', cssContent.includes("--font-sans: 'Plus Jakarta Sans'"));
assertCheck('SUITE 5', 'globals.css defines --font-display token with Space Grotesk', cssContent.includes("--font-display: 'Space Grotesk'"));
assertCheck('SUITE 5', 'tailwind.config.ts extends fontFamily.sans with var(--font-sans)', tailwindContent.includes('sans: ["var(--font-sans)"'));
assertCheck('SUITE 5', 'tailwind.config.ts extends fontFamily.display with var(--font-display)', tailwindContent.includes('display: ["var(--font-display)"'));

// Marquee CSS keyframes & classes
assertCheck('SUITE 5', 'globals.css defines @keyframes marquee translate3d(0,0,0) to translate3d(-50%,0,0)', 
  cssContent.includes('@keyframes marquee') && cssContent.includes('translate3d(0, 0, 0)') && cssContent.includes('translate3d(-50%, 0, 0)')
);
assertCheck('SUITE 5', 'globals.css defines .animate-marquee with will-change: transform', 
  cssContent.includes('.animate-marquee') && cssContent.includes('will-change: transform')
);
assertCheck('SUITE 5', 'globals.css defines .animate-marquee:hover { animation-play-state: paused; }', 
  cssContent.includes('.animate-marquee:hover') && cssContent.includes('animation-play-state: paused;')
);
assertCheck('SUITE 5', 'globals.css defines prefers-reduced-motion marquee pause', 
  cssContent.includes('@media (prefers-reduced-motion: reduce)') && cssContent.includes('animation-play-state: paused;')
);
assertCheck('SUITE 5', 'tailwind.config.ts defines marquee keyframes and animation: "marquee 25s linear infinite"', 
  tailwindContent.includes('keyframes: {') && tailwindContent.includes('marquee:') && tailwindContent.includes('"marquee 25s linear infinite"')
);


// =============================================================
// SUITE 6: Strict Anti-Pattern & Aesthetic Constraints (0 Emojis, 0 Purple)
// =============================================================
console.log('\n--- SUITE 6: Strict Anti-Pattern & Aesthetic Constraints (0 Emojis, 0 Purple) ---');

// Recursively find all files in src/
function getAllFiles(dir, exts = ['.ts', '.tsx', '.css', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else {
      if (exts.includes(path.extname(fullPath))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const srcFiles = getAllFiles(path.join(rootDir, 'src'));
console.log(`  Scanning ${srcFiles.length} source files in src/ for emojis and forbidden colors...`);

// Emoji regex: broad Unicode ranges for emoticons, symbols, pictographs
const emojiRegex = /[\u{1F300}-\u{1FAD6}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/u;

let emojiViolations = [];
let purpleClassViolations = [];

// Purple class regex targeting Tailwind classes (bg-purple, text-violet, border-indigo, etc.)
const purpleClassRegex = /\b(?:bg|text|border|ring|from|to|via)-(?:purple|violet|indigo)(?:-[0-9]+)?(?:\/[0-9]+)?\b/i;

srcFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);

  // Check emojis
  const emojiMatch = content.match(emojiRegex);
  if (emojiMatch) {
    emojiViolations.push({ file: rel, match: emojiMatch[0] });
  }

  // Check purple classes
  // Split lines to distinguish comments from actual JSX classNames
  const lines = content.split('\n');
  lines.forEach((line, lineNo) => {
    // If the line contains a purple class, check if it's inside className or style
    if (purpleClassRegex.test(line)) {
      // Exclude comments that mention purple in a strict disallowance notice
      if (line.includes('STRICT: NO purple') || line.includes('NO purple, violet')) {
        return;
      }
      purpleClassViolations.push({ file: rel, line: lineNo + 1, text: line.trim() });
    }
  });
});

assertCheck('SUITE 6', `Strict 0 Emojis in all src/ files (scanned ${srcFiles.length} files)`, 
  emojiViolations.length === 0, 
  emojiViolations.map(v => `${v.file}: ${v.match}`).join(', ')
);

assertCheck('SUITE 6', 'Zero emojis in src/components/hero-section.tsx', !emojiRegex.test(heroContent));
assertCheck('SUITE 6', 'Zero emojis in src/components/navbar.tsx', !emojiRegex.test(navbarContent));
assertCheck('SUITE 6', 'Zero emojis in src/app/page.tsx', !emojiRegex.test(pageContent));
assertCheck('SUITE 6', 'Zero emojis in src/app/layout.tsx', !emojiRegex.test(layoutContent));

assertCheck('SUITE 6', `Strict 0 Purple/Violet/Indigo CSS utility classes in all src/ files`, 
  purpleClassViolations.length === 0, 
  purpleClassViolations.map(v => `${v.file}:${v.line}: ${v.text}`).join(', ')
);

assertCheck('SUITE 6', 'Zero purple classes in src/components/hero-section.tsx', 
  !purpleClassRegex.test(heroContent.replace(/\/\*.*?\*\//gs, ''))
);
assertCheck('SUITE 6', 'Zero purple classes in src/components/navbar.tsx', 
  !purpleClassRegex.test(navbarContent.replace(/\/\*.*?\*\//gs, ''))
);
assertCheck('SUITE 6', 'Zero purple definitions in src/app/globals.css', 
  !/purple|violet|indigo/i.test(cssContent)
);
assertCheck('SUITE 6', 'Zero purple definitions in tailwind.config.ts', 
  !/purple|violet|indigo/i.test(tailwindContent)
);

// Electric blue isolation: only #2563EB allowed for waveform logo and marquee divider
assertCheck('SUITE 6', 'Electric blue #2563EB is used for 5-bar waveform logo in Navbar', navbarContent.includes('#2563EB'));
assertCheck('SUITE 6', 'Electric blue #2563EB is used for marquee dividers in HeroSection', heroContent.includes('#2563EB'));


// =============================================================
// SUITE 7: Live Build & Toolchain Integrity (Empirical Execution)
// =============================================================
console.log('\n--- SUITE 7: Live Build & Toolchain Integrity (Empirical Execution) ---');

// 1. npm run typecheck
console.log('  Executing: npm run typecheck ...');
let typecheckPassed = false;
let typecheckOutput = '';
try {
  typecheckOutput = execSync('npm run typecheck', { cwd: rootDir, encoding: 'utf8', stdio: 'pipe' });
  typecheckPassed = true;
} catch (e) {
  typecheckOutput = (e.stdout || '') + (e.stderr || '');
}
assertCheck('SUITE 7', 'TypeScript typecheck (npm run typecheck) exits with code 0', typecheckPassed, typecheckOutput.slice(0, 300));

// 2. npm run lint
console.log('  Executing: npm run lint ...');
let lintPassed = false;
let lintOutput = '';
try {
  lintOutput = execSync('npm run lint', { cwd: rootDir, encoding: 'utf8', stdio: 'pipe' });
  lintPassed = true;
} catch (e) {
  lintOutput = (e.stdout || '') + (e.stderr || '');
}
assertCheck('SUITE 7', 'Next.js lint (npm run lint) exits with code 0 and zero warnings/errors', lintPassed, lintOutput.slice(0, 300));

// 3. npm run build
console.log('  Executing: npm run build (next build) ...');
let buildPassed = false;
let buildOutput = '';
try {
  buildOutput = execSync('npm run build', { cwd: rootDir, encoding: 'utf8', stdio: 'pipe' });
  buildPassed = true;
} catch (e) {
  buildOutput = (e.stdout || '') + (e.stderr || '');
}
assertCheck('SUITE 7', 'Next.js production build (npm run build) exits with code 0', buildPassed, buildOutput.slice(0, 300));
assertCheck('SUITE 7', 'Build output confirms "Compiled successfully"', buildOutput.includes('Compiled successfully'));
assertCheck('SUITE 7', 'Build output confirms prerendering static route /', buildOutput.includes('○ /') || buildOutput.includes('Route (app)'));
assertCheck('SUITE 7', 'Build output confirms prerendering static route /_not-found', buildOutput.includes('/_not-found'));


// =============================================================
// FINAL SUMMARY & VERDICT
// =============================================================
console.log('\n================================================================');
console.log(`TOTAL EMPIRICAL CHECKS: ${totalChecks}`);
console.log(`PASSED:                 ${passedChecks}`);
console.log(`FAILED:                 ${failedChecks}`);
const rate = ((passedChecks / totalChecks) * 100).toFixed(2);
console.log(`SUCCESS RATE:           ${rate}%`);
console.log('================================================================');

if (failedChecks === 0) {
  console.log('VERDICT: [APPROVE] - All Phase 2 Hero & Theme empirical tests passed with ZERO defects.');
  process.exit(0);
} else {
  console.error(`VERDICT: [FAIL] - ${failedChecks} test check(s) failed:`);
  for (const failure of failures) {
    console.error(`  - [${failure.suite}] ${failure.name}: ${failure.details}`);
  }
  process.exit(1);
}
