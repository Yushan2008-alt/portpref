import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const require = createRequire(import.meta.url);
const rootDir = process.cwd();

console.log('================================================================');
console.log('      PHASE 1 EMPIRICAL CHALLENGER & ADVERSARIAL HARNESS        ');
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
// Component Loader via TypeScript transpilation
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
    if (id === '@/lib/utils') return utilsMod.exports;
    if (id === 'react') return React;
    if (id === 'react-dom') return mockReactDOM;
    if (id === 'lucide-react') {
      const MockIcon = (props) => React.createElement('svg', { 'data-mock-icon': true, ...props });
      return {
        X: MockIcon,
        Sun: MockIcon,
        Moon: MockIcon,
        Sparkles: MockIcon,
        ArrowDown: MockIcon,
        Menu: MockIcon,
        Send: MockIcon,
        Layers: MockIcon,
        CheckCircle2: MockIcon,
        Sliders: MockIcon,
        ExternalLink: MockIcon,
        Code2: MockIcon,
        Terminal: MockIcon,
        Laptop: MockIcon,
      };
    }
    return require(id);
  };

  new Function('require', 'module', 'exports', transpiled)(customRequire, mod, mod.exports);
  return mod.exports;
}

// -------------------------------------------------------------
// Mock Environment
// -------------------------------------------------------------
const mockBodyStyle = { overflow: '' };
const mockDocumentListeners = {};
const mockBodyChildren = [];

const mockBody = {
  nodeType: 1,
  nodeName: 'BODY',
  style: mockBodyStyle,
  appendChild: (child) => { mockBodyChildren.push(child); return child; },
  removeChild: (child) => {
    const idx = mockBodyChildren.indexOf(child);
    if (idx !== -1) mockBodyChildren.splice(idx, 1);
    return child;
  },
};

const mockDocument = {
  body: mockBody,
  addEventListener: (event, handler) => {
    if (!mockDocumentListeners[event]) mockDocumentListeners[event] = [];
    mockDocumentListeners[event].push(handler);
  },
  removeEventListener: (event, handler) => {
    if (!mockDocumentListeners[event]) return;
    mockDocumentListeners[event] = mockDocumentListeners[event].filter(h => h !== handler);
  },
  dispatchEvent: (event) => {
    const handlers = mockDocumentListeners[event.type] || [];
    for (const handler of handlers) {
      handler(event);
    }
  },
};

const mockReactDOM = {
  createPortal: (children, container) => {
    return React.createElement('div', { 'data-portal-container': container?.nodeName || 'PORTAL' }, children);
  },
};

global.document = mockDocument;
global.window = {
  document: mockDocument,
  addEventListener: mockDocument.addEventListener,
  removeEventListener: mockDocument.removeEventListener,
};

// Load utils module
const utilsMod = { exports: {} };
const utilsCode = fs.readFileSync(path.join(rootDir, 'src/lib/utils.ts'), 'utf8');
const utilsJs = ts.transpileModule(utilsCode, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;
new Function('require', 'module', 'exports', utilsJs)(require, utilsMod, utilsMod.exports);

// Load target components
const { Button } = loadTsxModule('src/components/ui/button.tsx');
const { Badge } = loadTsxModule('src/components/ui/badge.tsx');
const DialogModule = loadTsxModule('src/components/ui/dialog.tsx');
const { Input } = loadTsxModule('src/components/ui/input.tsx');
const { Textarea } = loadTsxModule('src/components/ui/textarea.tsx');


// =============================================================
// SUITE 1: Button Component Verification & Stress Testing
// =============================================================
console.log('\n--- SUITE 1: Button Component Empirical Verification ---');

// 1. Variant class validation
const expectedVariants = {
  default: ['bg-primary', 'text-primary-foreground', 'shadow', 'hover:bg-primary/90', 'rounded-xl'],
  'pill-soft': ['rounded-full', 'bg-pill-soft', 'text-foreground', 'hover:bg-pill-hover', 'font-medium', 'border-border/40'],
  'circle-menu': ['rounded-full', 'bg-pill-soft', 'text-foreground', 'hover:bg-pill-hover', 'aspect-square', 'flex', 'items-center', 'justify-center'],
  'circle-scroll': ['rounded-full', 'bg-foreground', 'text-background', 'hover:bg-foreground/85', 'aspect-square', 'flex', 'items-center', 'justify-center'],
  outline: ['border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground', 'rounded-xl'],
  ghost: ['hover:bg-accent', 'hover:text-accent-foreground', 'rounded-xl'],
};

for (const [variant, requiredClasses] of Object.entries(expectedVariants)) {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Button, { variant }, 'Test'));
  const allPresent = requiredClasses.every(cls => html.includes(cls));
  assertCheck(
    `Button variant="${variant}" includes required styles (${requiredClasses.join(', ')})`,
    allPresent,
    `Rendered HTML: ${html}`
  );
}

// 2. Standard Size validation
const expectedSizes = {
  default: ['h-10', 'px-4', 'py-2', 'text-sm'],
  sm: ['h-8', 'px-3', 'text-xs'],
  lg: ['h-11', 'px-6', 'text-base'],
  icon: ['h-10', 'w-10', 'p-0'],
};

for (const [size, requiredClasses] of Object.entries(expectedSizes)) {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Button, { size }, 'Test'));
  const allPresent = requiredClasses.every(cls => html.includes(cls));
  assertCheck(
    `Button size="${size}" includes required dimensions (${requiredClasses.join(', ')})`,
    allPresent,
    `Rendered HTML: ${html}`
  );
}

// 3. Circular sizing adaptation
const circularSizeTests = [
  { variant: 'circle-menu', size: 'sm', expected: 'h-8 w-8 p-0' },
  { variant: 'circle-menu', size: 'lg', expected: 'h-12 w-12 p-0' },
  { variant: 'circle-menu', size: 'default', expected: 'h-10 w-10 p-0' },
  { variant: 'circle-menu', size: 'icon', expected: 'h-10 w-10 p-0' },
  { variant: 'circle-scroll', size: 'sm', expected: 'h-8 w-8 p-0' },
  { variant: 'circle-scroll', size: 'lg', expected: 'h-12 w-12 p-0' },
  { variant: 'circle-scroll', size: 'default', expected: 'h-10 w-10 p-0' },
  { variant: 'circle-scroll', size: 'icon', expected: 'h-10 w-10 p-0' },
];

for (const { variant, size, expected } of circularSizeTests) {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Button, { variant, size }, 'C'));
  assertCheck(
    `Circular button variant="${variant}" size="${size}" adapts to square "${expected}"`,
    html.includes(expected),
    `Rendered HTML: ${html}`
  );
}

// 4. Base classes and interaction classes
const baseHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(Button, null, 'Click'));
assertCheck(
  'Button includes focus ring styling (focus-visible:ring-2 focus-visible:ring-ring)',
  baseHtml.includes('focus-visible:ring-2') && baseHtml.includes('focus-visible:ring-ring')
);
assertCheck(
  'Button includes active press feedback class (active:scale-[0.98])',
  baseHtml.includes('active:scale-[0.98]')
);
assertCheck(
  'Button includes disabled classes (disabled:pointer-events-none disabled:opacity-50)',
  baseHtml.includes('disabled:pointer-events-none') && baseHtml.includes('disabled:opacity-50')
);

// 5. Ref passing
const testButtonRef = React.createRef();
const renderedButtonElement = Button.render({ children: 'Ref Test' }, testButtonRef);
assertCheck(
  'Button forwardRef attaches ref object to underlying <button>',
  renderedButtonElement.ref === testButtonRef && renderedButtonElement.type === 'button',
  `Type: ${renderedButtonElement.type}, Ref: ${renderedButtonElement.ref}`
);

// Callback ref test
let callbackRefValue = null;
const callbackRef = (el) => { callbackRefValue = el; };
const renderedButtonCallback = Button.render({ children: 'Callback Ref' }, callbackRef);
assertCheck(
  'Button forwardRef attaches callback ref',
  renderedButtonCallback.ref === callbackRef
);

// 6. Disabled state & click behavior
const disabledHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(Button, { disabled: true }, 'Disabled'));
assertCheck('Button with disabled={true} renders HTML disabled attribute', disabledHtml.includes('disabled=""'));

let clickCount = 0;
const clickBtn = Button.render({ onClick: () => { clickCount++; } }, null);
clickBtn.props.onClick();
assertCheck('Button onClick event listener executes handler', clickCount === 1);

// 7. Custom className merging
const customClassHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(Button, { className: 'custom-extra-class' }, 'Merged'));
assertCheck(
  'Button merges custom className alongside variant classes',
  customClassHtml.includes('custom-extra-class') && customClassHtml.includes('bg-primary')
);


// =============================================================
// SUITE 2: Badge Component Verification & Beacon Dot
// =============================================================
console.log('\n--- SUITE 2: Badge Component Empirical Verification ---');

// 1. Variant class validation
const expectedBadgeVariants = {
  default: ['rounded-full', 'border-primary/20', 'bg-primary/10', 'text-primary'],
  beacon: ['rounded-full', 'border-emerald-500/20', 'bg-emerald-500/10', 'text-emerald-700', 'gap-2'],
  'pill-tag': ['rounded-full', 'border-border/60', 'bg-pill-soft', 'text-foreground', 'font-mono', 'text-[11px]'],
  outline: ['rounded-full', 'border-border', 'text-foreground'],
  secondary: ['rounded-full', 'bg-secondary', 'text-secondary-foreground'],
};

for (const [variant, requiredClasses] of Object.entries(expectedBadgeVariants)) {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Badge, { variant }, 'Badge'));
  const allPresent = requiredClasses.every(cls => html.includes(cls));
  assertCheck(
    `Badge variant="${variant}" includes required styles (${requiredClasses.join(', ')})`,
    allPresent,
    `Rendered HTML: ${html}`
  );
}

// 2. Beacon variant pulsing emerald dot presence
const beaconHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(Badge, { variant: 'beacon' }, 'Available'));
assertCheck(
  'Badge variant="beacon" renders pulsing emerald dot with animate-ping',
  beaconHtml.includes('animate-ping') && beaconHtml.includes('bg-emerald-400')
);
assertCheck(
  'Badge variant="beacon" renders solid emerald inner dot (bg-emerald-500)',
  beaconHtml.includes('bg-emerald-500')
);
assertCheck(
  'Badge variant="beacon" pulsing dot container has aria-hidden="true"',
  beaconHtml.includes('aria-hidden="true"')
);

// 3. Non-beacon variants MUST NOT render the pulsing emerald dot
const nonBeaconVariants = ['default', 'pill-tag', 'outline', 'secondary'];
for (const variant of nonBeaconVariants) {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Badge, { variant }, 'No Beacon'));
  assertCheck(
    `Badge variant="${variant}" does NOT render animate-ping or emerald dot`,
    !html.includes('animate-ping') && !html.includes('bg-emerald-500'),
    `Rendered HTML: ${html}`
  );
}

// 4. Ref passing & Children
const testBadgeRef = React.createRef();
const renderedBadgeElement = Badge.render({ children: 'Badge Ref' }, testBadgeRef);
assertCheck(
  'Badge forwardRef attaches ref object to underlying <div>',
  renderedBadgeElement.ref === testBadgeRef && renderedBadgeElement.type === 'div'
);

assertCheck(
  'Badge renders children text content',
  beaconHtml.includes('Available')
);


// =============================================================
// SUITE 3: Dialog Compound Component Verification
// =============================================================
console.log('\n--- SUITE 3: Dialog Compound Component Empirical Verification ---');

const {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  useDialog,
} = DialogModule;

// 1. Export checks
assertCheck('Dialog component is exported', typeof Dialog === 'function');
assertCheck('DialogTrigger is exported and forwardRef wrapped', typeof DialogTrigger === 'object');
assertCheck('DialogContent is exported and forwardRef wrapped', typeof DialogContent === 'object');
assertCheck('DialogClose is exported and forwardRef wrapped', typeof DialogClose === 'object');
assertCheck('DialogHeader is exported', typeof DialogHeader === 'function');
assertCheck('DialogFooter is exported', typeof DialogFooter === 'function');
assertCheck('DialogTitle is exported', typeof DialogTitle === 'function');
assertCheck('DialogDescription is exported', typeof DialogDescription === 'function');
assertCheck('useDialog hook is exported', typeof useDialog === 'function');

// 2. Context guard check: calling useDialog() outside <Dialog /> throws error
let thrownError = null;
function NakedHookConsumer() {
  useDialog();
  return null;
}
try {
  ReactDOMServer.renderToStaticMarkup(React.createElement(NakedHookConsumer));
} catch (err) {
  thrownError = err;
}
assertCheck(
  'useDialog throws error when used outside <Dialog /> provider',
  Boolean(thrownError && thrownError.message.includes('Dialog components must be used within a <Dialog />')),
  `Thrown: ${thrownError?.message}`
);

// 3. State Machine simulation: Uncontrolled and Controlled
let contextCaptured = null;
function ContextCapture() {
  contextCaptured = useDialog();
  return null;
}

// Default state: defaultOpen=false -> open=false
ReactDOMServer.renderToStaticMarkup(
  React.createElement(Dialog, { defaultOpen: false }, React.createElement(ContextCapture))
);
assertCheck('Dialog uncontrolled defaultOpen={false} initializes open=false', contextCaptured.open === false);

// Default state: defaultOpen=true -> open=true
ReactDOMServer.renderToStaticMarkup(
  React.createElement(Dialog, { defaultOpen: true }, React.createElement(ContextCapture))
);
assertCheck('Dialog uncontrolled defaultOpen={true} initializes open=true', contextCaptured.open === true);

// Controlled mode: open=false
ReactDOMServer.renderToStaticMarkup(
  React.createElement(Dialog, { open: false }, React.createElement(ContextCapture))
);
assertCheck('Dialog controlled open={false} reflects open=false', contextCaptured.open === false);

// Controlled mode: open=true
ReactDOMServer.renderToStaticMarkup(
  React.createElement(Dialog, { open: true }, React.createElement(ContextCapture))
);
assertCheck('Dialog controlled open={true} reflects open=true', contextCaptured.open === true);

// Controlled mode: calling setOpen(newOpen) invokes onOpenChange
let callbackVal = null;
ReactDOMServer.renderToStaticMarkup(
  React.createElement(Dialog, {
    open: false,
    onOpenChange: (val) => { callbackVal = val; }
  }, React.createElement(ContextCapture))
);
contextCaptured.setOpen(true);
assertCheck('Calling setOpen(true) triggers onOpenChange(true) callback', callbackVal === true);

// 4. DialogTrigger rendering and asChild delegation
// Standard Trigger render inside Dialog
const triggerMarkup = ReactDOMServer.renderToStaticMarkup(
  React.createElement(Dialog, null,
    React.createElement(DialogTrigger, { id: 'test-trigger' }, 'Open Modal')
  )
);
assertCheck(
  'DialogTrigger renders a button with type="button"',
  triggerMarkup.includes('<button') && triggerMarkup.includes('type="button"') && triggerMarkup.includes('Open Modal')
);

// Trigger with asChild=true
const triggerAsChildMarkup = ReactDOMServer.renderToStaticMarkup(
  React.createElement(Dialog, null,
    React.createElement(DialogTrigger, { asChild: true },
      React.createElement('span', { id: 'custom-trigger-span' }, 'Custom Trigger')
    )
  )
);
assertCheck(
  'DialogTrigger with asChild=true clones child element preserving child tag and id',
  triggerAsChildMarkup.includes('<span') && triggerAsChildMarkup.includes('id="custom-trigger-span"') && triggerAsChildMarkup.includes('Custom Trigger')
);

// 5. DialogClose rendering and asChild delegation
// Standard DialogClose render inside Dialog
const closeMarkup = ReactDOMServer.renderToStaticMarkup(
  React.createElement(Dialog, null,
    React.createElement(DialogClose, { id: 'test-close' }, 'Dismiss')
  )
);
assertCheck(
  'DialogClose renders a button with type="button"',
  closeMarkup.includes('<button') && closeMarkup.includes('type="button"') && closeMarkup.includes('Dismiss')
);

// DialogClose with asChild=true
const closeAsChildMarkup = ReactDOMServer.renderToStaticMarkup(
  React.createElement(Dialog, null,
    React.createElement(DialogClose, { asChild: true },
      React.createElement('a', { id: 'custom-close-link', href: '#' }, 'Cancel Link')
    )
  )
);
assertCheck(
  'DialogClose with asChild=true clones child element preserving child tag and href',
  closeAsChildMarkup.includes('<a') && closeAsChildMarkup.includes('id="custom-close-link"') && closeAsChildMarkup.includes('Cancel Link')
);

// 6. Direct inspection of Dialog file contracts (Portal, Backdrop, Blur, Roles, ARIA, ESC, Scroll Lock)
const dialogFileContent = fs.readFileSync(path.join(rootDir, 'src/components/ui/dialog.tsx'), 'utf8');

assertCheck(
  'DialogContent contains createPortal(..., document.body)',
  dialogFileContent.includes('createPortal(') && dialogFileContent.includes('document.body')
);
assertCheck(
  'DialogContent includes backdrop with blur (backdrop-blur-sm bg-black/60)',
  dialogFileContent.includes('backdrop-blur-sm') && dialogFileContent.includes('bg-black/60')
);
assertCheck(
  'DialogContent assigns role="dialog" and aria-modal="true"',
  dialogFileContent.includes('role="dialog"') && dialogFileContent.includes('aria-modal="true"')
);
assertCheck(
  'DialogContent includes accessible Close X button with aria-label="Close dialog"',
  dialogFileContent.includes('aria-label="Close dialog"')
);
assertCheck(
  'DialogContent handles keyboard "Escape" keydown listener',
  dialogFileContent.includes('e.key === "Escape"') && dialogFileContent.includes('setOpen(false)')
);
assertCheck(
  'DialogContent prevents click propagation on modal card (e.stopPropagation())',
  dialogFileContent.includes('e.stopPropagation()')
);
assertCheck(
  'DialogContent locks body scroll (document.body.style.overflow = "hidden") and restores on cleanup',
  dialogFileContent.includes('document.body.style.overflow = "hidden"') &&
  dialogFileContent.includes('document.body.style.overflow = originalOverflow')
);

// 7. Dialog Subcomponent typography & styling
const titleHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(DialogTitle, null, 'Test Heading')
);
assertCheck(
  'DialogTitle applies font-display and tracking-tight styling',
  titleHtml.includes('font-display') && titleHtml.includes('font-semibold') && titleHtml.includes('tracking-tight')
);

const descHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(DialogDescription, null, 'Test Description')
);
assertCheck(
  'DialogDescription applies text-sm and text-muted-foreground styling',
  descHtml.includes('text-sm') && descHtml.includes('text-muted-foreground')
);

const footerHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(DialogFooter, null, React.createElement('button', null, 'OK'))
);
assertCheck(
  'DialogFooter applies responsive layout (sm:flex-row sm:justify-end gap-2)',
  footerHtml.includes('sm:flex-row') && footerHtml.includes('sm:justify-end')
);


// =============================================================
// SUITE 4: Input & Textarea Verification
// =============================================================
console.log('\n--- SUITE 4: Input & Textarea Component Verification ---');

// 1. Input assertions
const testInputRef = React.createRef();
const renderedInputElement = Input.render(
  {
    placeholder: 'Enter email...',
    disabled: true,
    className: 'custom-input-class',
  },
  testInputRef
);

assertCheck(
  'Input forwardRef attaches ref object to underlying <input>',
  renderedInputElement.ref === testInputRef && renderedInputElement.type === 'input'
);

const inputHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(Input, { placeholder: 'Type here', disabled: true })
);

assertCheck(
  'Input default type="text" attribute is set',
  inputHtml.includes('type="text"')
);
assertCheck(
  'Input includes minimalist styling (rounded-xl border border-input bg-background/60)',
  inputHtml.includes('rounded-xl') && inputHtml.includes('border-input') && inputHtml.includes('bg-background/60')
);
assertCheck(
  'Input includes focus ring styling (focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring)',
  inputHtml.includes('focus-visible:ring-1') && inputHtml.includes('focus-visible:ring-ring') && inputHtml.includes('focus-visible:border-ring')
);
assertCheck(
  'Input includes disabled styling (disabled:cursor-not-allowed disabled:opacity-50)',
  inputHtml.includes('disabled:cursor-not-allowed') && inputHtml.includes('disabled:opacity-50')
);
assertCheck(
  'Input with disabled={true} outputs disabled="" attribute',
  inputHtml.includes('disabled=""')
);

// 2. Textarea assertions
const testTextareaRef = React.createRef();
const renderedTextareaElement = Textarea.render(
  {
    placeholder: 'Enter notes...',
    disabled: true,
    className: 'custom-textarea-class',
  },
  testTextareaRef
);

assertCheck(
  'Textarea forwardRef attaches ref object to underlying <textarea>',
  renderedTextareaElement.ref === testTextareaRef && renderedTextareaElement.type === 'textarea'
);

const textareaHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(Textarea, { placeholder: 'Write message', disabled: true })
);

assertCheck(
  'Textarea includes min-h-[100px] and resize-y styling',
  textareaHtml.includes('min-h-[100px]') && textareaHtml.includes('resize-y')
);
assertCheck(
  'Textarea includes minimalist styling (rounded-xl border border-input bg-background/60)',
  textareaHtml.includes('rounded-xl') && textareaHtml.includes('border-input') && textareaHtml.includes('bg-background/60')
);
assertCheck(
  'Textarea includes focus ring styling (focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring)',
  textareaHtml.includes('focus-visible:ring-1') && textareaHtml.includes('focus-visible:ring-ring') && textareaHtml.includes('focus-visible:border-ring')
);
assertCheck(
  'Textarea includes disabled styling (disabled:cursor-not-allowed disabled:opacity-50)',
  textareaHtml.includes('disabled:cursor-not-allowed') && textareaHtml.includes('disabled:opacity-50')
);
assertCheck(
  'Textarea with disabled={true} outputs disabled="" attribute',
  textareaHtml.includes('disabled=""')
);


// =============================================================
// SUITE 5: Layout & Interactive Showcase Page Integration
// =============================================================
console.log('\n--- SUITE 5: Layout & Showcase Page Integration ---');

// 1. Root Layout inspection
const layoutPath = path.join(rootDir, 'src/app/layout.tsx');
assertCheck('src/app/layout.tsx exists', fs.existsSync(layoutPath));

const layoutContent = fs.readFileSync(layoutPath, 'utf8');
assertCheck(
  'src/app/layout.tsx configures defaultTheme="light"',
  layoutContent.includes('defaultTheme="light"')
);
assertCheck(
  'src/app/layout.tsx configures Plus_Jakarta_Sans and Space_Grotesk font variables',
  layoutContent.includes('--font-sans') && layoutContent.includes('--font-display')
);

// 2. Showcase Page inspection
const pagePath = path.join(rootDir, 'src/app/page.tsx');
assertCheck('src/app/page.tsx exists', fs.existsSync(pagePath));

const pageContent = fs.readFileSync(pagePath, 'utf8');
assertCheck(
  'src/app/page.tsx declares "use client"',
  pageContent.startsWith('"use client"') || pageContent.includes('"use client"')
);
assertCheck(
  'src/app/page.tsx imports and integrates Button',
  pageContent.includes('import { Button }') && pageContent.includes('<Button')
);
assertCheck(
  'src/app/page.tsx imports and integrates Badge',
  pageContent.includes('import { Badge }') && pageContent.includes('<Badge')
);
assertCheck(
  'src/app/page.tsx imports and integrates Dialog compound components',
  pageContent.includes('Dialog') && pageContent.includes('DialogTrigger') && pageContent.includes('DialogContent')
);
assertCheck(
  'src/app/page.tsx imports and integrates Input and Textarea',
  pageContent.includes('import { Input }') && pageContent.includes('import { Textarea }') &&
  pageContent.includes('<Input') && pageContent.includes('<Textarea')
);
assertCheck(
  'src/app/page.tsx includes live theme switcher via next-themes (useTheme)',
  pageContent.includes('useTheme()') && (pageContent.includes('setTheme') || pageContent.includes('toggleTheme'))
);
assertCheck(
  'src/app/page.tsx showcases the pulsing emerald beacon badge',
  pageContent.includes('variant="beacon"')
);


// =============================================================
// SUMMARY & VERDICT CALCULATION
// =============================================================
console.log('\n================================================================');
console.log(`TOTAL EMPIRICAL CHECKS: ${totalChecks}`);
console.log(`PASSED: ${passedChecks}`);
console.log(`FAILED: ${failedChecks}`);
const rate = ((passedChecks / totalChecks) * 100).toFixed(2);
console.log(`SUCCESS RATE: ${rate}%`);
console.log('================================================================');

if (failedChecks === 0) {
  console.log('VERDICT: [APPROVE] - All empirical challenger tests passed with zero defects.');
  process.exit(0);
} else {
  console.error(`VERDICT: [REQUEST_CHANGES] - ${failedChecks} test check(s) failed.`);
  for (const failure of failures) {
    console.error(`  - ${failure.name}: ${failure.details}`);
  }
  process.exit(1);
}
