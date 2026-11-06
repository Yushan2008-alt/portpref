import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import ts from 'typescript';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const rootDir = process.cwd();

console.log('================================================================');
console.log('      PHASE 3 EMPIRICAL CHALLENGER & ADVERSARIAL HARNESS        ');
console.log('      Bento Grid Capabilities, Architecture & WebMCP Tools      ');
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
// Helper: Transpile and Load TS/TSX module for empirical testing
// -------------------------------------------------------------
function loadTsModule(relPath, extraMocks = {}) {
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
    Layers: createMockIcon('Layers'),
    ShieldCheck: createMockIcon('ShieldCheck'),
    Cpu: createMockIcon('Cpu'),
    Database: createMockIcon('Database'),
    Activity: createMockIcon('Activity'),
    Zap: createMockIcon('Zap'),
    Sliders: createMockIcon('Sliders'),
    Workflow: createMockIcon('Workflow'),
    GitBranch: createMockIcon('GitBranch'),
    CheckCircle2: createMockIcon('CheckCircle2'),
    Lock: createMockIcon('Lock'),
    Server: createMockIcon('Server'),
    ArrowUpRight: createMockIcon('ArrowUpRight'),
    ArrowDown: createMockIcon('ArrowDown'),
    Sun: createMockIcon('Sun'),
    Moon: createMockIcon('Moon'),
    X: createMockIcon('X'),
    Github: createMockIcon('Github'),
    Linkedin: createMockIcon('Linkedin'),
    Twitter: createMockIcon('Twitter'),
    Mail: createMockIcon('Mail'),
    Sparkles: createMockIcon('Sparkles'),
    Menu: createMockIcon('Menu'),
    Send: createMockIcon('Send'),
    ExternalLink: createMockIcon('ExternalLink'),
    Code2: createMockIcon('Code2'),
    Terminal: createMockIcon('Terminal'),
  };

  const reactDomMock = {
    createPortal: (children) => React.createElement('div', { 'data-portal': true }, children),
  };

  const nextThemesMock = {
    useTheme: () => ({ theme: 'light', setTheme: () => {} }),
  };

  const motionMock = {
    motion: {
      div: (props) => React.createElement('div', props),
      aside: (props) => React.createElement('aside', props),
    },
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
  };

  const customRequire = (id) => {
    if (extraMocks[id]) return extraMocks[id];
    if (id === 'react') return React;
    if (id === 'react-dom') return reactDomMock;
    if (id === 'next-themes') return nextThemesMock;
    if (id === 'framer-motion') return motionMock;
    if (id === 'lucide-react') return lucideMock;
    if (id === '@/components/ui/badge') {
      return loadTsModule('src/components/ui/badge.tsx', extraMocks);
    }
    if (id === '@/components/ui/button') {
      return loadTsModule('src/components/ui/button.tsx', extraMocks);
    }
    if (id === '@/components/ui/dialog') {
      return loadTsModule('src/components/ui/dialog.tsx', extraMocks);
    }
    if (id === '@/components/ui/input') {
      return loadTsModule('src/components/ui/input.tsx', extraMocks);
    }
    if (id === '@/components/ui/textarea') {
      return loadTsModule('src/components/ui/textarea.tsx', extraMocks);
    }
    if (id === '@/components/navbar') {
      return loadTsModule('src/components/navbar.tsx', extraMocks);
    }
    if (id === '@/components/hero-section') {
      return loadTsModule('src/components/hero-section.tsx', extraMocks);
    }
    if (id === '@/lib/webmcp') {
      return loadTsModule('src/lib/webmcp.ts', extraMocks);
    }
    if (id === '@/components/bento-grid') {
      return loadTsModule('src/components/bento-grid.tsx', extraMocks);
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
// SUITE 1: File Existence & Basic Structure
// =============================================================
console.log('\n--- SUITE 1: File Existence & Basic Structure ---');
const webmcpPath = path.join(rootDir, 'src/lib/webmcp.ts');
const bentoPath = path.join(rootDir, 'src/components/bento-grid.tsx');
const pagePath = path.join(rootDir, 'src/app/page.tsx');

assertCheck('SUITE 1', 'src/lib/webmcp.ts exists', fs.existsSync(webmcpPath));
assertCheck('SUITE 1', 'src/components/bento-grid.tsx exists', fs.existsSync(bentoPath));
assertCheck('SUITE 1', 'src/app/page.tsx exists', fs.existsSync(pagePath));

const webmcpSrc = fs.existsSync(webmcpPath) ? fs.readFileSync(webmcpPath, 'utf8') : '';
const bentoSrc = fs.existsSync(bentoPath) ? fs.readFileSync(bentoPath, 'utf8') : '';
const pageSrc = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';

// =============================================================
// SUITE 2: WebMCP Tools Specifications & Non-Negotiables
// =============================================================
console.log('\n--- SUITE 2: WebMCP Tools Specifications & Non-Negotiables ---');
let webmcpModule;
try {
  webmcpModule = loadTsModule('src/lib/webmcp.ts');
} catch (e) {
  console.error('Failed to load webmcp module:', e.message);
}

const capTool = webmcpModule?.CAPABILITIES_TOOL;
const archTool = webmcpModule?.ARCHITECTURE_TOOL;

assertCheck('SUITE 2', 'CAPABILITIES_TOOL is defined and exported', !!capTool);
assertCheck('SUITE 2', 'ARCHITECTURE_TOOL is defined and exported', !!archTool);

// Tool 1: get_capabilities
assertCheck('SUITE 2', 'Tool 1 name is "get_capabilities"', capTool?.name === 'get_capabilities');
assertCheck('SUITE 2', 'Tool 1 name length <= 30 chars', (capTool?.name?.length || 0) <= 30);
assertCheck('SUITE 2', 'Tool 1 description length <= 500 chars', (capTool?.description?.length || 0) <= 500);
assertCheck('SUITE 2', 'Tool 1 description has "What + When"', 
  capTool?.description?.includes('Retrieves') && capTool?.description?.includes('Call when')
);
assertCheck('SUITE 2', 'Tool 1 has annotations.readOnlyHint === true', capTool?.annotations?.readOnlyHint === true);
assertCheck('SUITE 2', 'Tool 1 does not specify false hints (no consequentialHint: false)', 
  capTool?.annotations?.consequentialHint === undefined
);
const catProp = capTool?.inputSchema?.properties?.category;
assertCheck('SUITE 2', 'Tool 1 parameter category description <= 150 chars', (catProp?.description?.length || 0) <= 150);

// Tool 2: get_architecture_overview
assertCheck('SUITE 2', 'Tool 2 name is "get_architecture_overview"', archTool?.name === 'get_architecture_overview');
assertCheck('SUITE 2', 'Tool 2 name length <= 30 chars', (archTool?.name?.length || 0) <= 30);
assertCheck('SUITE 2', 'Tool 2 description length <= 500 chars', (archTool?.description?.length || 0) <= 500);
assertCheck('SUITE 2', 'Tool 2 description has "What + When"', 
  archTool?.description?.includes('Returns') && archTool?.description?.includes('Call when')
);
assertCheck('SUITE 2', 'Tool 2 has annotations.readOnlyHint === true', archTool?.annotations?.readOnlyHint === true);

// Async Execution & Output Budget (<= 1500 chars)
const capResult = await capTool.execute({});
const archResult = await archTool.execute({});

assertCheck('SUITE 2', 'Tool 1 executes and returns string', typeof capResult === 'string');
assertCheck('SUITE 2', 'Tool 1 output length <= 1500 chars budget (~400 tokens)', (capResult?.length || 0) <= 1500, `Length: ${capResult?.length}`);
assertCheck('SUITE 2', 'Tool 1 output contains Next.js 14, Supabase, 99.98%', 
  capResult?.includes('Next.js 14') && capResult?.includes('Supabase') && capResult?.includes('99.98%')
);

// Test category filtering in Tool 1
const frontendResult = await capTool.execute({ category: 'frontend' });
assertCheck('SUITE 2', 'Tool 1 supports category filtering', typeof frontendResult === 'string' && frontendResult.includes('frontend'));

// Test invalid argument handling in Tool 1 (structured error resolution)
const invalidResult = await capTool.execute({ category: 'invalid_domain' });
assertCheck('SUITE 2', 'Tool 1 resolves structured error for invalid arguments', 
  invalidResult?.code === 'INVALID_ARGUMENT' && invalidResult?.retryable === true
);

assertCheck('SUITE 2', 'Tool 2 executes and returns string', typeof archResult === 'string');
assertCheck('SUITE 2', 'Tool 2 output length <= 1500 chars budget', (archResult?.length || 0) <= 1500, `Length: ${archResult?.length}`);
assertCheck('SUITE 2', 'Tool 2 output contains security model (RLS) and architecture specs', 
  archResult?.includes('Row-Level Security') && archResult?.includes('Next.js 14')
);

// Execution with AbortSignal cancellation
const acAbort = new AbortController();
acAbort.abort();
const abortedResult = await capTool.execute({}, { signal: acAbort.signal });
assertCheck('SUITE 2', 'Tool 1 respects execution signal abort', abortedResult?.code === 'ABORTED');
const archAbortedResult = await archTool.execute({}, { signal: acAbort.signal });
assertCheck('SUITE 2', 'Tool 2 respects execution signal abort', archAbortedResult?.code === 'ABORTED');

// Lifecycle Registration with mock document.modelContext
let registeredTools = [];
let mockRegisteredCount = 0;
const mockModelContext = {
  registerTool: (tool, opts) => {
    mockRegisteredCount++;
    registeredTools.push({ tool, opts });
  },
};

global.window = {};
global.document = { modelContext: mockModelContext };

const unregisterFn = webmcpModule.registerWebMcpTools();
assertCheck('SUITE 2', 'registerWebMcpTools registers exactly 2 tools', mockRegisteredCount === 2);
assertCheck('SUITE 2', 'registerWebMcpTools passes AbortSignal to each tool', 
  registeredTools.every(r => r.opts?.signal instanceof AbortSignal)
);
assertCheck('SUITE 2', 'registerWebMcpTools returns unregister cleanup function', typeof unregisterFn === 'function');

// Unregister test
let abortTriggered = false;
registeredTools[0].opts.signal.addEventListener('abort', () => {
  abortTriggered = true;
});
unregisterFn();
assertCheck('SUITE 2', 'Invoking cleanup unregisters tools via AbortSignal', abortTriggered === true);

// Clean up globals
delete global.window;
delete global.document;

// =============================================================
// SUITE 3: Bento Grid Layout & Content Verification
// =============================================================
console.log('\n--- SUITE 3: Bento Grid Layout & Content Verification ---');
assertCheck('SUITE 3', 'bento-grid.tsx declares "use client"', bentoSrc.includes('"use client"'));
assertCheck('SUITE 3', 'bento-grid.tsx has editorial badge "System Architecture & Capabilities"', 
  bentoSrc.includes('System Architecture &amp; Capabilities') || bentoSrc.includes('System Architecture & Capabilities')
);
assertCheck('SUITE 3', 'bento-grid.tsx has headline "Engineered for resilience, velocity, and scale."', 
  bentoSrc.includes('Engineered for resilience, velocity, and scale.')
);
assertCheck('SUITE 3', 'Headline uses font-display font-bold', bentoSrc.includes('font-display'));

// Asymmetric 4-Card Layout
assertCheck('SUITE 3', 'Bento grid uses responsive grid-cols-1 md:grid-cols-3', 
  bentoSrc.includes('grid grid-cols-1 md:grid-cols-3 gap-6')
);

// Card 1: Span 2 col, Next.js 14 & Supabase RLS
assertCheck('SUITE 3', 'Card 1 spans 2 cols (md:col-span-2)', bentoSrc.includes('md:col-span-2'));
assertCheck('SUITE 3', 'Card 1 title: Hybrid Rendering & Distributed Data Layer', 
  bentoSrc.includes('Hybrid Rendering &amp; Distributed Data Layer') || bentoSrc.includes('Hybrid Rendering & Distributed Data Layer')
);
assertCheck('SUITE 3', 'Card 1 highlights React Server Components (RSC)', bentoSrc.includes('React Server Components (RSC)'));
assertCheck('SUITE 3', 'Card 1 highlights Server Actions with Zod schemas', bentoSrc.includes('Server Actions') && bentoSrc.includes('Zod'));
assertCheck('SUITE 3', 'Card 1 highlights PostgreSQL with Row-Level Security (RLS)', bentoSrc.includes('Row-Level Security (RLS)'));
assertCheck('SUITE 3', 'Card 1 includes tech stack chips (Next.js 14, Supabase, PostgreSQL RLS)', 
  bentoSrc.includes('Next.js 14') && bentoSrc.includes('Supabase') && bentoSrc.includes('PostgreSQL RLS')
);

// Card 2: Span 1 col, Uptime 99.98% & Latency < 100ms
assertCheck('SUITE 3', 'Card 2 spans 1 col (md:col-span-1)', bentoSrc.includes('md:col-span-1'));
assertCheck('SUITE 3', 'Card 2 title: Production Reliability', bentoSrc.includes('Production Reliability'));
assertCheck('SUITE 3', 'Card 2 displays 99.98% Uptime SLA', bentoSrc.includes('99.98%'));
assertCheck('SUITE 3', 'Card 2 displays Latency < 100ms', bentoSrc.includes('&lt; 100ms') || bentoSrc.includes('< 100ms'));
assertCheck('SUITE 3', 'Card 2 displays Lighthouse Score 98/100', bentoSrc.includes('98/100'));
assertCheck('SUITE 3', 'Card 2 has operational status beacon', bentoSrc.includes('variant="beacon"'));

// Card 3: Span 1 col, Zero-Slop UI & 60fps Motion
assertCheck('SUITE 3', 'Card 3 title: Zero-Slop UI & 60fps Motion', 
  bentoSrc.includes('Zero-Slop UI &amp; 60fps Motion') || bentoSrc.includes('Zero-Slop UI & 60fps Motion')
);
assertCheck('SUITE 3', 'Card 3 displays 21:1 WCAG AAA Contrast Ratio', bentoSrc.includes('21:1 (AAA)'));
assertCheck('SUITE 3', 'Card 3 displays 60fps GPU hardware acceleration', bentoSrc.includes('60fps GPU'));
assertCheck('SUITE 3', 'Card 3 highlights translate3d transform optimization', bentoSrc.includes('translate3d'));

// Card 4: Span 2 col, 4-Stage Production Delivery Pipeline
assertCheck('SUITE 3', 'Card 4 title: 4-Stage Production Delivery Pipeline', bentoSrc.includes('4-Stage Production Delivery Pipeline'));
assertCheck('SUITE 3', 'Card 4 has Stage 01: Discovery & RFC', bentoSrc.includes('Discovery &amp; RFC') || bentoSrc.includes('Discovery & RFC'));
assertCheck('SUITE 3', 'Card 4 has Stage 02: Architecture Design', bentoSrc.includes('Architecture Design'));
assertCheck('SUITE 3', 'Card 4 has Stage 03: TDD & Clean Build', bentoSrc.includes('TDD &amp; Clean Build') || bentoSrc.includes('TDD & Clean Build'));
assertCheck('SUITE 3', 'Card 4 has Stage 04: CI/CD & Production Handoff', 
  bentoSrc.includes('CI/CD &amp; Production Handoff') || bentoSrc.includes('CI/CD & Production Handoff')
);

// Micro-Interactions & Styling Tokens
assertCheck('SUITE 3', 'Cards implement tactile 3px hover lift (hover:-translate-y-1)', bentoSrc.includes('hover:-translate-y-1'));
assertCheck('SUITE 3', 'Cards implement smooth 200ms transitions (transition-all duration-200)', bentoSrc.includes('transition-all duration-200'));
assertCheck('SUITE 3', 'Cards implement soft shadow elevation (hover:shadow-)', bentoSrc.includes('hover:shadow-'));
assertCheck('SUITE 3', 'Cards implement GPU hardware acceleration (transform-gpu)', bentoSrc.includes('transform-gpu'));
assertCheck('SUITE 3', 'BentoGrid content is user-selectable (no select-none)', !bentoSrc.includes('select-none'));
assertCheck('SUITE 3', 'Cards implement dark mode background #121217', bentoSrc.includes('dark:bg-[#121217]'));
assertCheck('SUITE 3', 'Cards implement clean 1px border (border border-border/60)', bentoSrc.includes('border-border/60'));
assertCheck('SUITE 3', 'BentoGrid invokes registerWebMcpTools on mount', bentoSrc.includes('registerWebMcpTools()'));

// =============================================================
// SUITE 4: Strict Anti-Slop Audits (0 Emojis & 0 Purple)
// =============================================================
console.log('\n--- SUITE 4: Strict Anti-Slop Audits (0 Emojis & 0 Purple) ---');
const emojiRegex = /[\u{1F300}-\u{1FAD6}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/u;

function getAllSourceFiles(dir, exts = ['.ts', '.tsx', '.css', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllSourceFiles(fullPath, exts));
    } else if (exts.includes(path.extname(fullPath))) {
      results.push(fullPath);
    }
  });
  return results;
}

const allSrcFiles = getAllSourceFiles(path.join(rootDir, 'src'));
console.log(`  Scanning ${allSrcFiles.length} source files in src/ for emojis and forbidden colors...`);

let emojiViolations = [];
let purpleViolations = [];
const purpleClassRegex = /\b(?:bg|text|border|ring|from|to|via)-(?:purple|violet|indigo)(?:-[0-9]+)?(?:\/[0-9]+)?\b/i;

allSrcFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);

  const emojiMatch = content.match(emojiRegex);
  if (emojiMatch) {
    emojiViolations.push({ file: rel, match: emojiMatch[0] });
  }

  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (purpleClassRegex.test(line)) {
      if (line.includes('STRICT: NO purple') || line.includes('NO purple, violet')) return;
      purpleViolations.push({ file: rel, line: idx + 1, text: line.trim() });
    }
  });
});

assertCheck('SUITE 4', 'Strict 0 Emojis across all src/ files', emojiViolations.length === 0, 
  emojiViolations.map(v => `${v.file}: ${v.match}`).join(', ')
);
assertCheck('SUITE 4', 'Zero emojis in src/lib/webmcp.ts', !emojiRegex.test(webmcpSrc));
assertCheck('SUITE 4', 'Zero emojis in src/components/bento-grid.tsx', !emojiRegex.test(bentoSrc));
assertCheck('SUITE 4', 'Zero emojis in src/app/page.tsx', !emojiRegex.test(pageSrc));

assertCheck('SUITE 4', 'Strict 0 Purple/Violet/Indigo classes across all src/ files', purpleViolations.length === 0,
  purpleViolations.map(v => `${v.file}:${v.line}: ${v.text}`).join(', ')
);
assertCheck('SUITE 4', 'Zero purple in src/lib/webmcp.ts', !purpleClassRegex.test(webmcpSrc));
assertCheck('SUITE 4', 'Zero purple in src/components/bento-grid.tsx', !purpleClassRegex.test(bentoSrc));

// =============================================================
// SUITE 5: SSR Component Transpilation & Rendering
// =============================================================
console.log('\n--- SUITE 5: SSR Component Transpilation & Rendering ---');
let bentoModule;
let bentoHtml = '';

try {
  bentoModule = loadTsModule('src/components/bento-grid.tsx');
  const BentoComponent = bentoModule.BentoGrid;
  assertCheck('SUITE 5', 'BentoGrid component is exported as function', typeof BentoComponent === 'function');

  bentoHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(BentoComponent));
} catch (e) {
  console.error('Failed to SSR render BentoGrid:', e.message);
}

assertCheck('SUITE 5', 'BentoGrid renders to static HTML without crashing', bentoHtml.length > 0);
assertCheck('SUITE 5', 'SSR output contains section header', bentoHtml.includes('Engineered for resilience, velocity, and scale.'));
assertCheck('SUITE 5', 'SSR output contains Card 1 title', bentoHtml.includes('Hybrid Rendering &amp; Distributed Data Layer') || bentoHtml.includes('Hybrid Rendering & Distributed Data Layer'));
assertCheck('SUITE 5', 'SSR output contains Card 2 metric 99.98%', bentoHtml.includes('99.98%'));
assertCheck('SUITE 5', 'SSR output contains Card 3 contrast 21:1 (AAA)', bentoHtml.includes('21:1 (AAA)'));
assertCheck('SUITE 5', 'SSR output contains Card 4 pipeline stages', bentoHtml.includes('Discovery &amp; RFC') || bentoHtml.includes('Discovery & RFC'));
assertCheck('SUITE 5', 'SSR output contains Card 4 Stage 04 Production Handoff', bentoHtml.includes('CI/CD &amp; Production Handoff') || bentoHtml.includes('CI/CD & Production Handoff'));
assertCheck('SUITE 5', 'SSR output uses electric blue accent #2563EB', bentoHtml.includes('#2563EB'));

// =============================================================
// SUITE 6: Page Integration & Anchor Targets
// =============================================================
console.log('\n--- SUITE 6: Page Integration & Anchor Targets ---');
assertCheck('SUITE 6', 'page.tsx imports BentoGrid', pageSrc.includes('import { BentoGrid } from "@/components/bento-grid";'));
assertCheck('SUITE 6', 'page.tsx mounts <BentoGrid />', pageSrc.includes('<BentoGrid />'));

const heroMountIdx = pageSrc.indexOf('<HeroSection');
const bentoMountIdx = pageSrc.indexOf('<BentoGrid');
const showcaseMountIdx = pageSrc.indexOf('id="showcase"');

assertCheck('SUITE 6', 'HeroSection is mounted before BentoGrid in DOM order', 
  heroMountIdx !== -1 && bentoMountIdx !== -1 && heroMountIdx < bentoMountIdx
);
assertCheck('SUITE 6', 'BentoGrid is mounted before #showcase in DOM order', 
  bentoMountIdx !== -1 && showcaseMountIdx !== -1 && bentoMountIdx < showcaseMountIdx
);

// Anchor targets in page.tsx for smooth navbar scrolling
['#about', '#services', '#stack', '#works', '#contact', '#showcase'].forEach((anchor) => {
  const idName = anchor.replace('#', '');
  assertCheck('SUITE 6', `Anchor target id="${idName}" exists in src/app/page.tsx`, pageSrc.includes(`id="${idName}"`));
});

assertCheck('SUITE 6', 'Phase 1 showcase title updated to "Design System & UI Atoms Reference (Phase 1 Baseline)"', 
  pageSrc.includes('Design System &amp; UI Atoms Reference (Phase 1 Baseline)') ||
  pageSrc.includes('Design System & UI Atoms Reference (Phase 1 Baseline)')
);

// SSR render of full page
let pageModule;
let pageHtml = '';
try {
  pageModule = loadTsModule('src/app/page.tsx');
  pageHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(pageModule.default));
} catch (e) {
  console.error('Failed to render page to static HTML:', e.message);
}

assertCheck('SUITE 6', 'Full page renders to static HTML without crashing', pageHtml.length > 0);
assertCheck('SUITE 6', 'Rendered page HTML includes BentoGrid headline', pageHtml.includes('Engineered for resilience, velocity, and scale.'));
assertCheck('SUITE 6', 'Rendered page HTML includes UI atoms reference', pageHtml.includes('Design System &amp; UI Atoms Reference') || pageHtml.includes('Design System & UI Atoms Reference'));

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
assertCheck('SUITE 7', 'Build output confirms static route /', buildOutput.includes('○ /') || buildOutput.includes('Route (app)'));

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
  console.log('VERDICT: [APPROVE] - All Phase 3 Bento Grid & WebMCP empirical tests passed with ZERO defects.');
  process.exit(0);
} else {
  console.error(`VERDICT: [FAIL] - ${failedChecks} test check(s) failed:`);
  for (const failure of failures) {
    console.error(`  - [${failure.suite}] ${failure.name}: ${failure.details}`);
  }
  process.exit(1);
}
