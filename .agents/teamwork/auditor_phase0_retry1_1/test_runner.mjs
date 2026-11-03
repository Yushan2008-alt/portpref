import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

// Test 1: CSS Token Consistency
const tailwindConfigPath = path.join(rootDir, 'tailwind.config.ts');
const globalsCssPath = path.join(rootDir, 'src', 'app', 'globals.css');

const tailwindContent = fs.readFileSync(tailwindConfigPath, 'utf8');
const globalsContent = fs.readFileSync(globalsCssPath, 'utf8');

const varMatches = [...tailwindContent.matchAll(/var\((--[a-zA-Z0-9_-]+)\)/g)];
const tailwindVars = Array.from(new Set(varMatches.map(m => m[1]))).sort();

const rootBlockMatch = globalsContent.match(/:root\s*\{([^}]+)\}/s);
const darkBlockMatch = globalsContent.match(/\.dark\s*\{([^}]+)\}/s);

const rootVars = new Set();
if (rootBlockMatch) {
  const decls = [...rootBlockMatch[1].matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)];
  decls.forEach(d => rootVars.add(d[1]));
}

const darkVars = new Set();
if (darkBlockMatch) {
  const decls = [...darkBlockMatch[1].matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)];
  decls.forEach(d => darkVars.add(d[1]));
}

const missingInRoot = tailwindVars.filter(v => !rootVars.has(v));
const missingInDark = tailwindVars.filter(v => !darkVars.has(v));
const rootOnly = Array.from(rootVars).filter(v => !darkVars.has(v));
const darkOnly = Array.from(darkVars).filter(v => !rootVars.has(v));

console.log('Test 1 (CSS Tokens Parity):', (missingInRoot.length === 0 && missingInDark.length === 0) ? 'PASS' : 'FAIL');
console.log('Details:', { missingInRoot, missingInDark, rootOnly, darkOnly });

// Test 2: Layout Google Font Integration
const layoutPath = path.join(rootDir, 'src', 'app', 'layout.tsx');
const layout = fs.readFileSync(layoutPath, 'utf8');
const hasGoogleFonts = layout.includes('next/font/google') && layout.includes('Plus_Jakarta_Sans') && layout.includes('Space_Grotesk');
const hasHtmlVars = /<html[^>]*className=[^>]*fontSans\.variable[^>]*fontDisplay\.variable/.test(layout);
console.log('Test 2 (Layout Google Fonts):', (hasGoogleFonts && hasHtmlVars) ? 'PASS' : 'FAIL', { hasGoogleFonts, hasHtmlVars });

// Test 3: Static Type Safety / cookiesToSet annotation
const serverTsPath = path.join(rootDir, 'src', 'lib', 'supabase', 'server.ts');
const serverContent = fs.readFileSync(serverTsPath, 'utf8');
const isUntypedCookiesToSet = /setAll\s*\(\s*cookiesToSet\s*\)/.test(serverContent);
const isExplicitlyTyped = /setAll\s*\(\s*cookiesToSet\s*:\s*Array<\{/.test(serverContent) && serverContent.includes('CookieOptions');
console.log('Test 3 (cookiesToSet typing):', (!isUntypedCookiesToSet && isExplicitlyTyped) ? 'PASS' : 'FAIL', { isUntypedCookiesToSet, isExplicitlyTyped });

// Test 4: Generic client types
const clientTsPath = path.join(rootDir, 'src', 'lib', 'supabase', 'client.ts');
const clientContent = fs.readFileSync(clientTsPath, 'utf8');
const clientGeneric = /createClient<Database\s*=\s*any>/.test(clientContent);
const serverGeneric = /createClient<Database\s*=\s*any>/.test(serverContent);
console.log('Test 4 (Generic Database parameters):', (clientGeneric && serverGeneric) ? 'PASS' : 'FAIL', { clientGeneric, serverGeneric });

// Test 5: Validations service_type enum
const valPath = path.join(rootDir, 'src', 'lib', 'validations.ts');
const valContent = fs.readFileSync(valPath, 'utf8');
const hasServiceType = valContent.includes('service_type') && valContent.includes('web_development');
console.log('Test 5 (service_type in validations):', hasServiceType ? 'PASS' : 'FAIL');

// Test 6: Project types enrichment
const typesPath = path.join(rootDir, 'src', 'types', 'index.ts');
const typesContent = fs.readFileSync(typesPath, 'utf8');
const hasInquiry = typesContent.includes('export interface Inquiry');
const hasAnalytics = typesContent.includes('export interface SiteAnalyticsEvent');
const hasProjectCategory = typesContent.includes('export type ProjectCategory');
console.log('Test 6 (Types index.ts enrichment):', (hasInquiry && hasAnalytics && hasProjectCategory) ? 'PASS' : 'FAIL');

// Test 7: next.config.mjs remote patterns
const nextConfPath = path.join(rootDir, 'next.config.mjs');
const nextConfContent = fs.readFileSync(nextConfPath, 'utf8');
const hasRemotePatterns = nextConfContent.includes('remotePatterns') && nextConfContent.includes('*.supabase.co');
console.log('Test 7 (next.config remote patterns):', hasRemotePatterns ? 'PASS' : 'FAIL');
