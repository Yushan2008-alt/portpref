"use client";

import * as React from "react";
import {
  Sparkles,
  ArrowDown,
  Menu,
  Send,
  Layers,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Code2,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { BentoGrid } from "@/components/bento-grid";

export default function Home() {
  // Interactive Form Controls State
  const [inputVal, setInputVal] = React.useState("Jane Developer");
  const [textareaVal, setTextareaVal] = React.useState(
    "Architecting minimalist, high-performance web applications with Next.js 14."
  );

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sticky Navbar (Phase 2) */}
      <Navbar />

      {/* Dynamic Hero Section (Phase 2) */}
      <HeroSection />

      {/* Bento Grid Capabilities & Architecture Showcase (Phase 3) */}
      <section id="about" className="scroll-mt-20">
        <div id="services" className="scroll-mt-24" />
        <div id="stack" className="scroll-mt-24" />
        <BentoGrid />
      </section>

      {/* Main Interactive Showcase Section */}
      <section id="showcase" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        <div id="works" className="sr-only" aria-hidden="true" />

        {/* Hero Introduction */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="default" className="gap-1.5">
            <Sparkles className="h-3 w-3" />
            <span>Phase 1 Baseline Reference</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-foreground">
            Design System &amp; UI Atoms Reference (Phase 1 Baseline)
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Minimalist editorial and neo-brutalist Light Canvas design system. Engineered strictly with
            Next.js 14, React 18, Tailwind CSS tokens, and zero-bloat Ponytail architecture.
          </p>
        </div>

        {/* SECTION 1: BUTTON MATRIX */}
        <section id="atoms-buttons" className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
              1. Button Component Matrix
            </h2>
            <p className="text-sm text-muted-foreground">
              6 distinct variants, 4 standard sizes, icon integrations, and disabled styling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Variant: default */}
            <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Variant: default</span>
                <Badge variant="outline">Primary</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                High-contrast primary action button with bold focus and active depression.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button variant="default" size="sm">Small</Button>
                <Button variant="default" size="default">Default</Button>
                <Button variant="default" size="lg">Large</Button>
                <Button variant="default" size="icon" aria-label="Icon default">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Variant: pill-soft */}
            <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Variant: pill-soft</span>
                <Badge variant="outline">Signature</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Eloqwnt signature soft gray capsule button with rounded-full styling.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button variant="pill-soft" size="sm">Explore</Button>
                <Button variant="pill-soft" size="default">View Projects</Button>
                <Button variant="pill-soft" size="lg">Get Started</Button>
                <Button variant="pill-soft" size="icon" aria-label="Icon pill-soft">
                  <Sliders className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Variant: circle-menu */}
            <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Variant: circle-menu</span>
                <Badge variant="outline">Header Action</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Header right circular hamburger/menu action button with aspect-square.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Button variant="circle-menu" size="sm" aria-label="Menu small">
                  <Menu className="h-3.5 w-3.5" />
                </Button>
                <Button variant="circle-menu" size="default" aria-label="Menu default">
                  <Menu className="h-4 w-4" />
                </Button>
                <Button variant="circle-menu" size="lg" aria-label="Menu large">
                  <Menu className="h-5 w-5" />
                </Button>
                <span className="text-xs text-muted-foreground ml-2">(sm / default / lg)</span>
              </div>
            </div>

            {/* Variant: circle-scroll */}
            <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Variant: circle-scroll</span>
                <Badge variant="outline">Hero Scroller</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Dark circular arrow button for navigating to case studies.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Button variant="circle-scroll" size="sm" aria-label="Scroll small">
                  <ArrowDown className="h-3.5 w-3.5" />
                </Button>
                <Button variant="circle-scroll" size="default" aria-label="Scroll default">
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button variant="circle-scroll" size="lg" aria-label="Scroll large">
                  <ArrowDown className="h-5 w-5" />
                </Button>
                <span className="text-xs text-muted-foreground ml-2">(sm / default / lg)</span>
              </div>
            </div>

            {/* Variant: outline */}
            <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Variant: outline</span>
                <Badge variant="outline">Bordered</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimalist bordered button matching theme input/card borders.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button variant="outline" size="sm">Details</Button>
                <Button variant="outline" size="default">Read Case Study</Button>
                <Button variant="outline" size="icon" aria-label="Icon outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Variant: ghost & disabled */}
            <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Ghost & Disabled States</span>
                <Badge variant="secondary">Utility</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Transparent hover-only background and disabled pointer-events-none states.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button variant="ghost" size="default">Ghost Action</Button>
                <Button variant="default" size="default" disabled>
                  Disabled
                </Button>
                <Button variant="pill-soft" size="default" disabled>
                  Disabled Pill
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BADGE MATRIX */}
        <section id="atoms-badges" className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
              2. Badge Component Matrix
            </h2>
            <p className="text-sm text-muted-foreground">
              Status indicators, tech tags, and live pulsing emerald availability badge.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card text-card-foreground space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Beacon Badge */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Variant: beacon
                </div>
                <div>
                  <Badge variant="beacon">Available for Projects</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Embedded dual-layer pulsing emerald dot with real-time CSS animation.
                </p>
              </div>

              {/* Default Badge */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Variant: default
                </div>
                <div>
                  <Badge variant="default">Primary Badge</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Solid primary accent tint for high-priority status items.
                </p>
              </div>

              {/* Pill-Tag Badge */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Variant: pill-tag (Tech Stacks)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="pill-tag">Next.js 14</Badge>
                  <Badge variant="pill-tag">React 18</Badge>
                  <Badge variant="pill-tag">TypeScript</Badge>
                  <Badge variant="pill-tag">Tailwind CSS</Badge>
                  <Badge variant="pill-tag">Supabase</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Monospace metadata tags for project case studies and skills ticker.
                </p>
              </div>

              {/* Outline Badge */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Variant: outline
                </div>
                <div>
                  <Badge variant="outline">Clean Outline</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Subtle border badge matching theme border lines.
                </p>
              </div>

              {/* Secondary Badge */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Variant: secondary
                </div>
                <div>
                  <Badge variant="secondary">Secondary Muted</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Muted background badge for supplementary categorization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FORM CONTROLS */}
        <section id="atoms-forms" className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
              3. Minimalist Form Controls
            </h2>
            <p className="text-sm text-muted-foreground">
              Minimalist Input and Textarea components featuring smooth ring-focus states and subtle borders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Showcase */}
            <div className="p-6 rounded-2xl border border-border bg-card text-card-foreground space-y-4">
              <h3 className="text-base font-semibold font-display">Input Field</h3>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
                  Interactive Input (Live Typing)
                </label>
                <Input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Enter client name..."
                />
                <p className="text-xs text-muted-foreground">
                  Live value: <span className="font-mono text-foreground font-semibold">{inputVal}</span>
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
                  Email Input with Placeholder
                </label>
                <Input type="email" placeholder="client@enterprise.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Disabled Input
                </label>
                <Input disabled value="readonly_system_id: #89201" />
              </div>
            </div>

            {/* Textarea Showcase */}
            <div className="p-6 rounded-2xl border border-border bg-card text-card-foreground space-y-4">
              <h3 className="text-base font-semibold font-display">Textarea Field</h3>

              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
                  Interactive Project Scope
                </label>
                <Textarea
                  value={textareaVal}
                  onChange={(e) => setTextareaVal(e.target.value)}
                  placeholder="Describe your technical requirements..."
                />
                <p className="text-xs text-muted-foreground">
                  Characters: <span className="font-mono text-foreground font-semibold">{textareaVal.length}</span>
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Disabled Textarea
                </label>
                <Textarea disabled value="Inquiry submission locked during maintenance window." />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: MODAL DIALOG */}
        <section id="contact" className="space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
              4. Modal Dialog Component
            </h2>
            <p className="text-sm text-muted-foreground">
              Accessible compound modal dialog system with backdrop blur, keyboard ESC dismissal, outside click dismissal, body scroll locking, and React Portal rendering.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-border bg-card text-card-foreground flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <Badge variant="beacon">Compound Component</Badge>
                <span className="text-xs text-muted-foreground font-mono">Dialog, DialogContent, DialogTrigger</span>
              </div>
              <h3 className="text-xl font-bold font-display text-foreground">
                Interactive Case Study Modal Dialog
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Click the button to open the modal dialog preview. Test keyboard navigation (<kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border">ESC</kbd> to dismiss), outside click handling, and backdrop blur.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="lg" className="gap-2 shadow-lg hover:shadow-xl">
                  <Sparkles className="h-4 w-4" />
                  <span>Open Modal Dialog</span>
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="beacon">Case Study Preview</Badge>
                    <Badge variant="pill-tag">Next.js 14</Badge>
                  </div>
                  <DialogTitle>Enterprise Design System & Platform</DialogTitle>
                  <DialogDescription>
                    Architecture breakdown, design tokens, and technical implementation specifications.
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4 text-sm text-foreground/90 border-y border-border/60 my-2">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/40 space-y-2">
                    <div className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Key Highlights
                    </div>
                    <ul className="space-y-1.5 text-xs list-disc list-inside text-muted-foreground">
                      <li>Rendered via safe client-side <code className="text-foreground">createPortal</code> to body</li>
                      <li>Locks background body scrolling while active (<code className="text-foreground">overflow: hidden</code>)</li>
                      <li>Dismisses seamlessly on <kbd className="px-1 py-0.5 text-[10px] bg-background rounded border">ESC</kbd> keydown or outside click</li>
                      <li>High-fidelity backdrop blur: <code className="text-foreground">bg-black/60 backdrop-blur-sm</code></li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="pill-tag">React 18.3.1</Badge>
                    <Badge variant="pill-tag">TypeScript Strict</Badge>
                    <Badge variant="pill-tag">Tailwind CSS</Badge>
                    <Badge variant="pill-tag">Zero Bloat</Badge>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Close Preview</Button>
                  </DialogClose>
                  <Button variant="default" onClick={() => alert("Action triggered from modal!")}>
                    Confirm Action
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* SECTION 5: VERIFICATION & STATUS */}
        <section className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            <CheckCircle2 className="h-5 w-5" />
            <span>Phase 1 Implementation Complete & Operational</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All 5 UI primitives (`button.tsx`, `badge.tsx`, `dialog.tsx`, `input.tsx`, `textarea.tsx`) are genuinely
            implemented with type-safe props and active styles. Default theme set to Light mode in root layout.
          </p>
        </section>
      </section>
    </main>
  );
}
