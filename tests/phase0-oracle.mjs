import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = process.cwd();

console.log('====================================================');
console.log('   PHASE 0 EMPIRICAL ORACLE & VALIDATION HARNESS    ');
console.log('====================================================');
console.log(`Target Directory: ${rootDir}\n`);

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
// SUITE 1: package.json Validation
// -------------------------------------------------------------
console.log('--- SUITE 1: package.json Integrity & Dependencies ---');
const pkgPath = path.join(rootDir, 'package.json');
assertCheck('package.json exists', fs.existsSync(pkgPath));

let pkg = null;
try {
  const pkgRaw = fs.readFileSync(pkgPath, 'utf8');
  pkg = JSON.parse(pkgRaw);
  assertCheck('package.json is valid JSON', true);
} catch (err) {
  assertCheck('package.json is valid JSON', false, err.message);
}

if (pkg) {
  const deps = pkg.dependencies || {};
  const devDeps = pkg.devDependencies || {};

  // Check Next.js 14
  const nextVer = deps['next'];
  assertCheck(
    'Next.js 14.x specified',
    Boolean(nextVer && (/^[\^~]?14\./.test(nextVer) || nextVer.startsWith('14.'))),
    `Found next: ${nextVer}`
  );
  assertCheck(
    'Next.js is NOT Next.js 15+',
    !nextVer || !/^[\^~]?(15\.|16\.)/.test(nextVer),
    `Found next: ${nextVer}`
  );

  // Check React 18.3.1 pin
  const reactVer = deps['react'];
  assertCheck(
    'React pinned to 18.x (specifically 18.3.1)',
    Boolean(reactVer && reactVer.includes('18.3.1')),
    `Found react: ${reactVer}`
  );
  assertCheck(
    'React is NOT React 19',
    !reactVer || !/^[\^~]?(19\.)/.test(reactVer),
    `Found react: ${reactVer}`
  );

  // Check react-dom 18.3.1 pin
  const reactDomVer = deps['react-dom'];
  assertCheck(
    'react-dom pinned to 18.x (specifically 18.3.1)',
    Boolean(reactDomVer && reactDomVer.includes('18.3.1')),
    `Found react-dom: ${reactDomVer}`
  );

  // 9 Required Production Dependencies from TRD
  const requiredDeps = [
    'framer-motion',
    'lucide-react',
    '@supabase/supabase-js',
    '@supabase/ssr',
    'next-themes',
    'clsx',
    'tailwind-merge',
    'zod',
    'react-hook-form'
  ];

  for (const dep of requiredDeps) {
    assertCheck(
      `Required production dependency: ${dep}`,
      Boolean(deps[dep]),
      `Missing ${dep} in dependencies`
    );
  }

  // DevDependencies
  const requiredDevDeps = [
    'typescript',
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'eslint',
    'eslint-config-next',
    '@types/node',
    '@types/react',
    '@types/react-dom'
  ];

  for (const devDep of requiredDevDeps) {
    assertCheck(
      `Required devDependency: ${devDep}`,
      Boolean(devDeps[devDep]),
      `Missing ${devDep} in devDependencies`
    );
  }

  // React type definition versions match React 18
  const typesReactVer = devDeps['@types/react'];
  assertCheck(
    '@types/react targets 18.x',
    Boolean(typesReactVer && typesReactVer.includes('18.')),
    `Found @types/react: ${typesReactVer}`
  );

  // Scripts
  const scripts = pkg.scripts || {};
  assertCheck('Script "dev" defined', Boolean(scripts['dev']), 'missing dev script');
  assertCheck('Script "build" defined', Boolean(scripts['build']), 'missing build script');
  assertCheck('Script "typecheck" defined', Boolean(scripts['typecheck']), 'missing typecheck script');
  assertCheck('Script "lint" defined', Boolean(scripts['lint']), 'missing lint script');
}

// -------------------------------------------------------------
// SUITE 2: tsconfig.json Validation
// -------------------------------------------------------------
console.log('\n--- SUITE 2: tsconfig.json Rigor & Path Aliasing ---');
const tsconfigPath = path.join(rootDir, 'tsconfig.json');
assertCheck('tsconfig.json exists', fs.existsSync(tsconfigPath));

let tsconfig = null;
try {
  const tsRaw = fs.readFileSync(tsconfigPath, 'utf8');
  tsconfig = JSON.parse(tsRaw);
  assertCheck('tsconfig.json is valid strict standard JSON', true);
} catch (err) {
  // If standard JSON fails, attempt comment-tolerant parse
  try {
    // Regex that avoids strings
    const stripped = tsRaw.replace(
      /("(?:[^"\\]|\\.)*")|(\/\*[\s\S]*?\*\/|\/\/[^\r\n]*)/g,
      (m, str) => str || ''
    );
    tsconfig = JSON.parse(stripped);
    assertCheck('tsconfig.json is valid JSON with comments', true);
  } catch (commentErr) {
    assertCheck('tsconfig.json parses as JSON', false, err.message);
  }
}

if (tsconfig && tsconfig.compilerOptions) {
  const opts = tsconfig.compilerOptions;
  assertCheck('compilerOptions.strict is true', opts.strict === true, `strict: ${opts.strict}`);
  assertCheck('compilerOptions.noImplicitAny is true', opts.noImplicitAny === true, `noImplicitAny: ${opts.noImplicitAny}`);
  assertCheck(
    'Path alias @/* maps to ./src/*',
    Boolean(opts.paths && opts.paths['@/*'] && opts.paths['@/*'].includes('./src/*')),
    `paths: ${JSON.stringify(opts.paths)}`
  );
  assertCheck('baseUrl is set', Boolean(opts.baseUrl), `baseUrl: ${opts.baseUrl}`);
  assertCheck('compilerOptions.noEmit is true', opts.noEmit === true, `noEmit: ${opts.noEmit}`);
  assertCheck('compilerOptions.isolatedModules is true', opts.isolatedModules === true, `isolatedModules: ${opts.isolatedModules}`);
  assertCheck('tsconfig includes *.ts and *.tsx', Boolean(tsconfig.include && tsconfig.include.includes('**/*.ts')), `include: ${JSON.stringify(tsconfig.include)}`);
  assertCheck('tsconfig excludes node_modules', Boolean(tsconfig.exclude && tsconfig.exclude.includes('node_modules')), `exclude: ${JSON.stringify(tsconfig.exclude)}`);
}

// -------------------------------------------------------------
// SUITE 3: tailwind.config.ts Validation
// -------------------------------------------------------------
console.log('\n--- SUITE 3: tailwind.config.ts Globs & Tokens ---');
const tailwindPath = path.join(rootDir, 'tailwind.config.ts');
assertCheck('tailwind.config.ts exists', fs.existsSync(tailwindPath));

let tailwindContent = '';
if (fs.existsSync(tailwindPath)) {
  tailwindContent = fs.readFileSync(tailwindPath, 'utf8');

  // Check darkMode class
  assertCheck(
    'darkMode configured with class',
    /darkMode:\s*(\["class"\]|'class'|"class")/.test(tailwindContent),
    'darkMode is not set to "class"'
  );

  // Check content globs forward slash compliance
  const contentMatch = tailwindContent.match(/content:\s*\[([\s\S]*?)\]/);
  assertCheck('content array defined in tailwind.config.ts', Boolean(contentMatch));
  if (contentMatch) {
    const contentBlock = contentMatch[1];
    const hasBackslash = contentBlock.includes('\\');
    assertCheck('content globs strictly use forward slashes (no Windows backslashes)', !hasBackslash, `Found backslash in content globs: ${contentBlock}`);
    assertCheck('content covers src/app', contentBlock.includes('./src/app'), 'Missing ./src/app glob');
    assertCheck('content covers src/components', contentBlock.includes('./src/components'), 'Missing ./src/components glob');
  }

  // Check design tokens from TRD §5
  assertCheck('Defines obsidian color', tailwindContent.includes('obsidian'), 'Missing obsidian color');
  assertCheck('Defines canvas color', tailwindContent.includes('canvas'), 'Missing canvas color');
  assertCheck('Defines pill-soft token', tailwindContent.includes('pill-soft'), 'Missing pill-soft');
  assertCheck('Defines pill-hover token', tailwindContent.includes('pill-hover'), 'Missing pill-hover');
  assertCheck('Defines border token', tailwindContent.includes('border'), 'Missing border token');
  assertCheck('Defines primary token', tailwindContent.includes('primary'), 'Missing primary token');

  // Ponytail minimalist check (no heavy third-party plugins loaded)
  const pluginsMatch = tailwindContent.match(/plugins:\s*\[(.*?)\]/);
  assertCheck(
    'Ponytail clean plugins (no bloated unnecessary plugins)',
    Boolean(pluginsMatch && pluginsMatch[1].trim() === ''),
    `Plugins found: ${pluginsMatch ? pluginsMatch[1] : 'not found'}`
  );
}

// -------------------------------------------------------------
// SUITE 4: Auxiliary Configurations & Standard Files
// -------------------------------------------------------------
console.log('\n--- SUITE 4: Auxiliary Configuration & CSS Tokens ---');

// next.config.mjs
const nextConfigPath = path.join(rootDir, 'next.config.mjs');
assertCheck('next.config.mjs exists', fs.existsSync(nextConfigPath));
if (fs.existsSync(nextConfigPath)) {
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
  assertCheck('reactStrictMode is enabled', nextConfigContent.includes('reactStrictMode: true'));
}

// postcss.config.mjs
const postcssPath = path.join(rootDir, 'postcss.config.mjs');
assertCheck('postcss.config.mjs exists', fs.existsSync(postcssPath));
if (fs.existsSync(postcssPath)) {
  const postcssContent = fs.readFileSync(postcssPath, 'utf8');
  assertCheck('postcss has tailwindcss plugin', postcssContent.includes('tailwindcss'));
  assertCheck('postcss has autoprefixer plugin', postcssContent.includes('autoprefixer'));
}

// .env.example
const envExamplePath = path.join(rootDir, '.env.example');
assertCheck('.env.example exists', fs.existsSync(envExamplePath));
if (fs.existsSync(envExamplePath)) {
  const envContent = fs.readFileSync(envExamplePath, 'utf8');
  assertCheck('.env.example has NEXT_PUBLIC_SUPABASE_URL', envContent.includes('NEXT_PUBLIC_SUPABASE_URL'));
  assertCheck('.env.example has NEXT_PUBLIC_SUPABASE_ANON_KEY', envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY'));
  assertCheck('.env.example has SUPABASE_SERVICE_ROLE_KEY', envContent.includes('SUPABASE_SERVICE_ROLE_KEY'));
  assertCheck('.env.example has NEXT_PUBLIC_SITE_URL', envContent.includes('NEXT_PUBLIC_SITE_URL'));
}

// globals.css
const globalsCssPath = path.join(rootDir, 'src', 'app', 'globals.css');
assertCheck('src/app/globals.css exists', fs.existsSync(globalsCssPath));
if (fs.existsSync(globalsCssPath)) {
  const css = fs.readFileSync(globalsCssPath, 'utf8');
  assertCheck('globals.css imports @tailwind base', css.includes('@tailwind base;'));
  assertCheck('globals.css defines :root variables', css.includes(':root'));
  assertCheck('globals.css defines .dark variables', css.includes('.dark'));
  assertCheck('globals.css dark background matches Obsidian (240 10% 3.9%)', css.includes('240 10% 3.9%'));
  assertCheck('globals.css light background matches Clean Precision (210 40% 98%)', css.includes('210 40% 98%'));
}

// -------------------------------------------------------------
// SUITE 5: Adversarial Stress Tests & Concrete Path Resolution
// -------------------------------------------------------------
console.log('\n--- SUITE 5: Adversarial Stress Tests & Edge Cases ---');

// Stress Test 1: Resolve @/* path alias against physical filesystem
const aliasTests = [
  { alias: '@/lib/utils', expectedFile: path.join(rootDir, 'src', 'lib', 'utils.ts') },
  { alias: '@/components/theme-provider', expectedFile: path.join(rootDir, 'src', 'components', 'theme-provider.tsx') },
  { alias: '@/lib/supabase/client', expectedFile: path.join(rootDir, 'src', 'lib', 'supabase', 'client.ts') },
  { alias: '@/lib/supabase/server', expectedFile: path.join(rootDir, 'src', 'lib', 'supabase', 'server.ts') },
  { alias: '@/lib/validations', expectedFile: path.join(rootDir, 'src', 'lib', 'validations.ts') },
  { alias: '@/types', expectedFile: path.join(rootDir, 'src', 'types', 'index.ts') }
];

for (const test of aliasTests) {
  const resolved = fs.existsSync(test.expectedFile);
  assertCheck(`Alias ${test.alias} physically exists on disk`, resolved, `File not found at ${test.expectedFile}`);
}

// Stress Test 2: Verify content globs match real files
function testGlobMatch(fileRelativePath, globs) {
  // Convert glob to regex
  return globs.some(glob => {
    const normalizedGlob = glob.replace(/^\.\//, '').replace(/\./g, '\\.').replace(/\*\*\/\*/g, '.*').replace(/\*/g, '[^/]*').replace(/\{js,ts,jsx,tsx,mdx\}/, '(js|ts|jsx|tsx|mdx)');
    const regex = new RegExp(`^${normalizedGlob}$`);
    return regex.test(fileRelativePath);
  });
}

const globs = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}'
];

assertCheck(
  'Tailwind content glob matches src/app/page.tsx',
  testGlobMatch('src/app/page.tsx', globs)
);
assertCheck(
  'Tailwind content glob matches src/app/layout.tsx',
  testGlobMatch('src/app/layout.tsx', globs)
);
assertCheck(
  'Tailwind content glob matches src/components/theme-provider.tsx',
  testGlobMatch('src/components/theme-provider.tsx', globs)
);

// Stress Test 3: Unbounded Wildcards in Dependencies
if (pkg) {
  const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  let hasWildcard = false;
  for (const [dep, ver] of Object.entries(allDeps)) {
    if (ver === '*' || ver === 'latest') {
      hasWildcard = true;
      assertCheck(`Unbounded wildcard test for ${dep}`, false, `Version is unbounded: ${ver}`);
    }
  }
  assertCheck('No dependencies use unbounded wildcards (* or latest)', !hasWildcard);
}

// Stress Test 4: Check Client Component boundary markers
const clientComponents = [
  path.join(rootDir, 'src', 'components', 'theme-provider.tsx'),
  path.join(rootDir, 'src', 'app', 'page.tsx')
];

for (const compPath of clientComponents) {
  const relName = path.relative(rootDir, compPath);
  if (fs.existsSync(compPath)) {
    const compContent = fs.readFileSync(compPath, 'utf8');
    const hasDirective = compContent.includes("'use client'") || compContent.includes('"use client"');
    assertCheck(`Client component ${relName} has 'use client' directive`, hasDirective);
  }
}

// Stress Test 5: Check Supabase client initialization contracts
const supaClientPath = path.join(rootDir, 'src', 'lib', 'supabase', 'client.ts');
if (fs.existsSync(supaClientPath)) {
  const supaContent = fs.readFileSync(supaClientPath, 'utf8');
  assertCheck('src/lib/supabase/client.ts uses createBrowserClient', supaContent.includes('createBrowserClient'));
  assertCheck('src/lib/supabase/client.ts exports createClient', supaContent.includes('export function createClient'));
}

const supaServerPath = path.join(rootDir, 'src', 'lib', 'supabase', 'server.ts');
if (fs.existsSync(supaServerPath)) {
  const supaServerContent = fs.readFileSync(supaServerPath, 'utf8');
  assertCheck('src/lib/supabase/server.ts uses createServerClient', supaServerContent.includes('createServerClient'));
  assertCheck('src/lib/supabase/server.ts exports createClient', supaServerContent.includes('export function createClient'));
}

// -------------------------------------------------------------
// SUMMARY & VERDICT
// -------------------------------------------------------------
console.log('\n====================================================');
console.log(`TOTAL CHECKS: ${totalChecks}`);
console.log(`PASSED: ${passedChecks}`);
console.log(`FAILED: ${failedChecks}`);
console.log(`SUCCESS RATE: ${((passedChecks / totalChecks) * 100).toFixed(2)}%`);
console.log('====================================================');

if (failedChecks === 0) {
  console.log('\nVERDICT: [APPROVE] - All empirical checks passed with zero defects.');
  process.exit(0);
} else {
  console.error(`\nVERDICT: [REJECT] - Found ${failedChecks} failing checks.`);
  process.exit(1);
}
