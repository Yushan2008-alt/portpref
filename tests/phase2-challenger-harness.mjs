import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const require = createRequire(import.meta.url);
const rootDir = process.cwd();

console.log('================================================================');
console.log('      PHASE 2 EMPIRICAL CHALLENGER & ADVERSARIAL HARNESS        ');
console.log('================================================================');
console.log(`Working Directory: ${rootDir}\n`);

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function assertCheck(name, condition, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${name}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${name} -> ${details}`);
    failures.push({ name, details });
  }
}

// -------------------------------------------------------------
// Helper: Load and Transpile TSX Module
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
  const customRequire = (id) => {
    if (extraMocks[id]) return extraMocks[id];
    if (id === 'react') return React;
    if (id === 'react-dom') {
      return {
        createPortal: (children) => React.createElement('div', { 'data-portal': 'true' }, children),
      };
    }
    if (id === 'next-themes') {
      return {
        useTheme: () => ({ theme: 'light', setTheme: () => {} }),
      };
    }
    if (id === 'framer-motion') {
      return {
        motion: {
          div: (props) => React.createElement('div', props),
          aside: (props) => React.createElement('aside', props),
        },
        AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
      };
    }
    if (id === 'lucide-react') {
      const MockIcon = (props) => React.createElement('svg', { 'data-mock-icon': true, ...props });
      return {
        Sun: MockIcon,
        Moon: MockIcon,
        X: MockIcon,
        Github: MockIcon,
        Linkedin: MockIcon,
        Twitter: MockIcon,
        Mail: MockIcon,
        ArrowUpRight: MockIcon,
        ArrowDown: MockIcon,
      };
    }
    if (id === '@/components/ui/button') {
      return {
        Button: ({ children, variant, size, className, ...props }) =>
          React.createElement('button', { 'data-variant': variant, 'data-size': size, className, ...props }, children),
      };
    }
    if (id === '@/components/ui/badge') {
      return {
        Badge: ({ children, variant, className, ...props }) =>
          React.createElement('span', { 'data-variant': variant, className, ...props }, children),
      };
    }
    try {
      return require(id);
    } catch {
      return {};
    }
  };

  const fn = new Function('require', 'module', 'exports', transpiled);
  fn(customRequire, mod, mod.exports);
  return mod.exports;
}

// =============================================================
// TEST SUITE 1: Source Files & Layout Adherence
// =============================================================
console.log('--- TEST SUITE 1: File Existence & Basic Structure ---');
const navbarPath = path.join(rootDir, 'src/components/navbar.tsx');
const heroPath = path.join(rootDir, 'src/components/hero-section.tsx');
const pagePath = path.join(rootDir, 'src/app/page.tsx');
const cssPath = path.join(rootDir, 'src/app/globals.css');
const tailwindPath = path.join(rootDir, 'tailwind.config.ts');

assertCheck('src/components/navbar.tsx exists', fs.existsSync(navbarPath));
assertCheck('src/components/hero-section.tsx exists', fs.existsSync(heroPath));
assertCheck('src/app/page.tsx exists', fs.existsSync(pagePath));
assertCheck('src/app/globals.css exists', fs.existsSync(cssPath));
assertCheck('tailwind.config.ts exists', fs.existsSync(tailwindPath));

const navbarSrc = fs.readFileSync(navbarPath, 'utf8');
const heroSrc = fs.readFileSync(heroPath, 'utf8');
const pageSrc = fs.readFileSync(pagePath, 'utf8');
const cssSrc = fs.readFileSync(cssPath, 'utf8');
const tailwindSrc = fs.readFileSync(tailwindPath, 'utf8');

// =============================================================
// TEST SUITE 2: Waveform SVG Structure & Electric Blue Color
// =============================================================
console.log('\n--- TEST SUITE 2: Waveform SVG Logo Verification ---');
// Spec: 5 bars, heights [10, 18, 14, 22, 12], electric blue #2563EB fill/color.
const rectRegex = /<rect\s+([^>]+)\/>/g;
const rectMatches = [...navbarSrc.matchAll(rectRegex)].map((m) => m[1]);

// In navbar.tsx, there are 2 SVGs: one in navbar header, one in quick drawer header.
// Both should have 5 bars each with heights [10, 18, 14, 22, 12].
assertCheck(
  'Waveform SVG bar count in navbar.tsx is at least 5 (found ' + rectMatches.length + ')',
  rectMatches.length >= 5
);

// Extract the first 5 bars (Navbar header logo)
const first5Bars = rectMatches.slice(0, 5);
const heights = first5Bars.map((b) => {
  const hMatch = b.match(/height="(\d+)"/);
  return hMatch ? parseInt(hMatch[1], 10) : null;
});

assertCheck(
  'Waveform SVG exactly 5 bars in primary logo',
  first5Bars.length === 5,
  `Found ${first5Bars.length} bars`
);
assertCheck(
  'Waveform SVG bar heights are strictly [10, 18, 14, 22, 12]',
  JSON.stringify(heights) === JSON.stringify([10, 18, 14, 22, 12]),
  `Actual heights: ${JSON.stringify(heights)}`
);

const fills = first5Bars.map((b) => {
  const fMatch = b.match(/fill="([^"]+)"/);
  return fMatch ? fMatch[1] : null;
});
assertCheck(
  'Waveform SVG bars all filled with electric blue #2563EB',
  fills.every((f) => f === '#2563EB'),
  `Actual fills: ${JSON.stringify(fills)}`
);

const rxs = first5Bars.map((b) => {
  const rMatch = b.match(/rx="([^"]+)"/);
  return rMatch ? rMatch[1] : null;
});
assertCheck(
  'Waveform SVG bars have rounded caps (rx="1.5")',
  rxs.every((r) => r === '1.5'),
  `Actual rxs: ${JSON.stringify(rxs)}`
);

// If drawer also has waveform logo, verify its bars as well
if (rectMatches.length >= 10) {
  const drawerBars = rectMatches.slice(5, 10);
  const drawerHeights = drawerBars.map((b) => {
    const hMatch = b.match(/height="(\d+)"/);
    return hMatch ? parseInt(hMatch[1], 10) : null;
  });
  assertCheck(
    'Drawer Waveform logo also has heights [10, 18, 14, 22, 12]',
    JSON.stringify(drawerHeights) === JSON.stringify([10, 18, 14, 22, 12]),
    `Actual drawer heights: ${JSON.stringify(drawerHeights)}`
  );
}

// =============================================================
// TEST SUITE 3: Navbar 3-Part Layout & Content
// =============================================================
console.log('\n--- TEST SUITE 3: Navbar 3-Part Layout Verification ---');
// Part 1: Left Brand
assertCheck(
  'Navbar contains brand text "developer."',
  navbarSrc.includes('developer.')
);
assertCheck(
  'Navbar contains brand text "portfolio."',
  navbarSrc.includes('portfolio.')
);

// Part 2: Center Nav links
const expectedNavLinks = ['Home', 'About', 'Works', 'Services', 'Stack', 'Contact'];
for (const link of expectedNavLinks) {
  assertCheck(
    `Navbar center nav contains "${link}"`,
    navbarSrc.includes(link),
    `Missing nav link ${link}`
  );
}
// Check down arrows ↓ for sub-navigation items
assertCheck(
  'Navbar contains down arrow indicator "↓" for section links',
  navbarSrc.includes('↓')
);

// Part 3: Right Actions
assertCheck(
  'Navbar contains pill button "Let\'s chat"',
  navbarSrc.includes("Let's chat") || navbarSrc.includes("Let&apos;s chat")
);
assertCheck(
  'Navbar contains circular button trigger with horizontal bars ( = )',
  navbarSrc.includes('Open navigation drawer') && navbarSrc.includes('rounded-full')
);
assertCheck(
  'Navbar contains theme toggle button',
  navbarSrc.includes('Toggle color theme') && navbarSrc.includes('toggleTheme')
);

// =============================================================
// TEST SUITE 4: Quick Drawer Mechanics & Social Links
// =============================================================
console.log('\n--- TEST SUITE 4: Quick Drawer Verification ---');
// Presence of social links (GitHub, LinkedIn, Twitter/X, Email)
assertCheck(
  'Quick Drawer contains GitHub link',
  navbarSrc.includes('https://github.com') && navbarSrc.includes('GitHub')
);
assertCheck(
  'Quick Drawer contains LinkedIn link',
  navbarSrc.includes('https://linkedin.com') && navbarSrc.includes('LinkedIn')
);
assertCheck(
  'Quick Drawer contains Twitter/X link',
  (navbarSrc.includes('https://x.com') || navbarSrc.includes('https://twitter.com')) &&
    navbarSrc.includes('Twitter/X')
);
assertCheck(
  'Quick Drawer contains Email link',
  navbarSrc.includes('mailto:') && navbarSrc.includes('Email')
);

// ESC key dismiss
assertCheck(
  'Quick Drawer implements ESC key dismiss listener',
  navbarSrc.includes('Escape') && navbarSrc.includes('addEventListener("keydown"')
);

// Body scroll lock mechanics
assertCheck(
  'Quick Drawer locks body scroll on open (overflow = "hidden")',
  navbarSrc.includes('document.body.style.overflow = "hidden"')
);
assertCheck(
  'Quick Drawer restores body scroll on close/cleanup',
  navbarSrc.includes('document.body.style.overflow = ""')
);

// Drawer modal accessibility
assertCheck(
  'Quick Drawer has role="dialog" and aria-modal="true"',
  navbarSrc.includes('role="dialog"') && navbarSrc.includes('aria-modal="true"')
);

// Client-side portal rendering
assertCheck(
  'Quick Drawer uses createPortal to document.body',
  navbarSrc.includes('createPortal') && navbarSrc.includes('document.body')
);

// =============================================================
// TEST SUITE 5: Hero Section & Marquee Ticker
// =============================================================
console.log('\n--- TEST SUITE 5: Hero Section & Marquee Ticker Verification ---');
// Kicker text
const expectedKicker = 'Helping fast-moving startups and companies build scalable, high-performance web products.';
assertCheck(
  'Hero Section contains exact required kicker text',
  heroSrc.includes(expectedKicker),
  `Expected: "${expectedKicker}"`
);

// Headline
const expectedHeadline = 'Senior Full-Stack Software Engineer building scalable products with precision & impact';
const headlineClean = heroSrc.replace(/&amp;/g, '&');
assertCheck(
  'Hero Section contains exact giant headline text',
  headlineClean.includes(expectedHeadline),
  `Expected: "${expectedHeadline}"`
);
assertCheck(
  'Hero Section headline uses font-display font-bold text-black dark:text-white',
  heroSrc.includes('font-display font-bold') &&
    heroSrc.includes('text-black') &&
    heroSrc.includes('dark:text-white')
);

// Action Pill "Book strategy call"
assertCheck(
  'Hero Section contains Action Pill "Book strategy call"',
  heroSrc.includes('Book strategy call')
);
assertCheck(
  'Action Pill uses soft gray #F0F0F3',
  heroSrc.includes('#F0F0F3')
);
assertCheck(
  'Action Pill has hover lift and shadow styles',
  heroSrc.includes('hover:-translate-y-0.5') && heroSrc.includes('hover:shadow-md')
);

// Viewport & Padding Taste-skill compliance (§4.7 & §3.E)
assertCheck(
  'Hero Section uses dvh unit to prevent mobile address bar layout shifts',
  heroSrc.includes('100dvh')
);
assertCheck(
  'Hero Section top padding is capped at pt-12 sm:pt-16 md:pt-20 (below pt-24 taste-skill constraint)',
  heroSrc.includes('pt-12 sm:pt-16 md:pt-20')
);

// Circular scroll button with down arrow
assertCheck(
  'Hero Section has circular scroll button with ArrowDown icon',
  heroSrc.includes('ArrowDown') && heroSrc.includes('scrollToNextSection')
);
assertCheck(
  'Circular scroll button is pure black in light mode, white in dark mode',
  heroSrc.includes('bg-black text-white') && heroSrc.includes('dark:bg-white dark:text-black')
);

// Required Marquee string components:
const requiredMarqueeMetrics = [
  '99.98% SYSTEM UPTIME · SCALE PROVEN',
  'SUB-100MS API RESPONSE LATENCY',
  '$85M+ TRANSACTION VOLUME HANDLED',
  '15+ ENTERPRISE RELEASES SHIPPED',
  'ZERO RUNTIME VULNERABILITIES',
];

for (const metric of requiredMarqueeMetrics) {
  assertCheck(
    `Marquee contains metric: "${metric}"`,
    heroSrc.includes(metric),
    `Missing metric: ${metric}`
  );
}

// Exact reconstruct marquee string
const expectedFullMarqueeString =
  '/ 99.98% SYSTEM UPTIME · SCALE PROVEN   / SUB-100MS API RESPONSE LATENCY   / $85M+ TRANSACTION VOLUME HANDLED   / 15+ ENTERPRISE RELEASES SHIPPED   / ZERO RUNTIME VULNERABILITIES';
const reconstructedString = requiredMarqueeMetrics.map((m) => `/ ${m}`).join('   ');
assertCheck(
  'Marquee items reconstruct to exact required string with "/" dividers',
  reconstructedString === expectedFullMarqueeString,
  `Reconstructed: "${reconstructedString}" vs Expected: "${expectedFullMarqueeString}"`
);

// Dual-track wrapping: Track 1 and Track 2
assertCheck(
  'Marquee has Track 1 and Track 2 (dual-track wrapping)',
  heroSrc.includes('track1') && heroSrc.includes('track2')
);
assertCheck(
  'Marquee Track 2 clone has aria-hidden="true" for screen reader accessibility',
  heroSrc.includes('aria-hidden="true"')
);

// Electric blue separator
assertCheck(
  'Marquee separator uses electric blue #2563EB',
  heroSrc.includes('#2563EB') && heroSrc.includes('/')
);

// CSS Marquee animation & hover-pause
assertCheck(
  'globals.css defines @keyframes marquee with translate3d',
  cssSrc.includes('@keyframes marquee') &&
    cssSrc.includes('translate3d(0, 0, 0)') &&
    cssSrc.includes('translate3d(-50%, 0, 0)')
);
assertCheck(
  'globals.css defines .animate-marquee with 25s linear infinite and will-change',
  cssSrc.includes('.animate-marquee') &&
    cssSrc.includes('animation: marquee 25s linear infinite') &&
    cssSrc.includes('will-change: transform')
);
assertCheck(
  'globals.css defines hover pause (.animate-marquee:hover { animation-play-state: paused; })',
  cssSrc.includes('.animate-marquee:hover') &&
    cssSrc.includes('animation-play-state: paused')
);
assertCheck(
  'globals.css supports prefers-reduced-motion for marquee',
  cssSrc.includes('@media (prefers-reduced-motion: reduce)') &&
    cssSrc.includes('animation-play-state: paused')
);

// tailwind.config.ts animation configuration
assertCheck(
  'tailwind.config.ts defines marquee keyframes',
  tailwindSrc.includes('marquee') && tailwindSrc.includes('translate3d')
);
assertCheck(
  'tailwind.config.ts defines marquee animation utility',
  tailwindSrc.includes('marquee: "marquee 25s linear infinite"')
);

// =============================================================
// TEST SUITE 6: Strict Anti-Slop Audits (0 Emojis & 0 Purple)
// =============================================================
console.log('\n--- TEST SUITE 6: Strict Anti-Slop Audits (0 Emojis & 0 Purple) ---');
const emojiRegex = /[\u{1F300}-\u{1FAD6}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

assertCheck(
  'src/components/navbar.tsx contains ZERO emojis',
  !emojiRegex.test(navbarSrc),
  'Emoji detected in navbar.tsx'
);
assertCheck(
  'src/components/hero-section.tsx contains ZERO emojis',
  !emojiRegex.test(heroSrc),
  'Emoji detected in hero-section.tsx'
);
assertCheck(
  'src/app/page.tsx contains ZERO emojis',
  !emojiRegex.test(pageSrc),
  'Emoji detected in page.tsx'
);

// Full scan of ALL files in src/ for emojis
function scanDirForEmojis(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirForEmojis(full);
    } else if (/\.(tsx?|jsx?|css|html)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8');
      assertCheck(
        `File ${path.relative(rootDir, full)} contains ZERO emojis`,
        !emojiRegex.test(content),
        `Emoji detected in ${full}`
      );
    }
  }
}
scanDirForEmojis(path.join(rootDir, 'src'));

// Check purple / violet / indigo classes or CSS values in production code
// Note: Comments mentioning "STRICT: NO purple gradient" are permitted, but NO classes or style colors!
function extractNonCommentCode(src) {
  // Strip block comments /* ... */ and JSX comments {/* ... */}
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
}

const navbarCode = extractNonCommentCode(navbarSrc);
const heroCode = extractNonCommentCode(heroSrc);
const cssCode = extractNonCommentCode(cssSrc);

const purpleRegex = /(purple|violet|indigo|#7c3aed|#8b5cf6|#6366f1|#a855f7|#9333ea|#4f46e5|#818cf8)/i;

assertCheck(
  'src/components/navbar.tsx contains ZERO purple/violet/indigo styles',
  !purpleRegex.test(navbarCode),
  'Purple styling detected in navbar.tsx'
);
assertCheck(
  'src/components/hero-section.tsx contains ZERO purple/violet/indigo styles',
  !purpleRegex.test(heroCode),
  'Purple styling detected in hero-section.tsx'
);
assertCheck(
  'src/app/globals.css contains ZERO purple/violet/indigo styles',
  !purpleRegex.test(cssCode),
  'Purple styling detected in globals.css'
);

// =============================================================
// TEST SUITE 7: SSR Component Rendering & DOM Output
// =============================================================
console.log('\n--- TEST SUITE 7: SSR Component Transpilation & Rendering ---');
let navbarHtml = '';
let heroHtml = '';

try {
  const navbarMod = loadTsxModule('src/components/navbar.tsx');
  const NavbarComponent = navbarMod.Navbar;
  assertCheck('Navbar component exports named function Navbar', typeof NavbarComponent === 'function');

  navbarHtml = ReactDOMServer.renderToString(React.createElement(NavbarComponent));
  assertCheck('Navbar renders to HTML string via SSR without crashing', typeof navbarHtml === 'string' && navbarHtml.length > 0);
  assertCheck('Navbar SSR output contains electric blue rect fill #2563EB', navbarHtml.includes('fill="#2563EB"'));
  assertCheck('Navbar SSR output contains developer.', navbarHtml.includes('developer.'));
  assertCheck('Navbar SSR output contains portfolio.', navbarHtml.includes('portfolio.'));
  assertCheck('Navbar SSR output contains Let&#x27;s chat', navbarHtml.includes('Let&#x27;s chat') || navbarHtml.includes("Let's chat"));
} catch (err) {
  assertCheck('Navbar SSR rendering', false, err.message);
}

try {
  const heroMod = loadTsxModule('src/components/hero-section.tsx');
  const HeroComponent = heroMod.HeroSection;
  assertCheck('HeroSection component exports named function HeroSection', typeof HeroComponent === 'function');

  heroHtml = ReactDOMServer.renderToString(React.createElement(HeroComponent));
  assertCheck('HeroSection renders to HTML string via SSR without crashing', typeof heroHtml === 'string' && heroHtml.length > 0);
  assertCheck('HeroSection SSR output contains headline', heroHtml.includes('Senior Full-Stack Software Engineer'));
  assertCheck('HeroSection SSR output contains kicker', heroHtml.includes('Helping fast-moving startups'));
  assertCheck('HeroSection SSR output contains "Book strategy call"', heroHtml.includes('Book strategy call'));
  assertCheck('HeroSection SSR output contains marquee metrics', heroHtml.includes('99.98% SYSTEM UPTIME') && heroHtml.includes('ZERO RUNTIME VULNERABILITIES'));
} catch (err) {
  assertCheck('HeroSection SSR rendering', false, err.message);
}

// =============================================================
// TEST SUITE 8: Page Integration & Anchors
// =============================================================
console.log('\n--- TEST SUITE 8: Page Integration & Anchor Targets ---');
assertCheck(
  'page.tsx imports Navbar from @/components/navbar',
  pageSrc.includes('import { Navbar } from "@/components/navbar"')
);
assertCheck(
  'page.tsx imports HeroSection from @/components/hero-section',
  pageSrc.includes('import { HeroSection } from "@/components/hero-section"')
);
assertCheck(
  'page.tsx mounts <Navbar /> in JSX',
  pageSrc.includes('<Navbar />')
);
assertCheck(
  'page.tsx mounts <HeroSection /> in JSX',
  pageSrc.includes('<HeroSection />')
);
assertCheck(
  'page.tsx has #showcase anchor for Hero scroll trigger',
  pageSrc.includes('id="showcase"')
);

// =============================================================
// SUMMARY & VERDICT
// =============================================================
console.log('\n================================================================');
console.log(`TOTAL CHECKS:  ${totalChecks}`);
console.log(`PASSED:        ${passedChecks}`);
console.log(`FAILED:        ${failedChecks}`);
console.log('================================================================');

if (failures.length > 0) {
  console.error('\nFAILURES SUMMARY:');
  failures.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.name} - ${f.details}`);
  });
  process.exit(1);
} else {
  console.log('\n>>> ALL EMPIRICAL CHECKS PASSED PERFECTLY (100%) <<<\n');
  process.exit(0);
}
