"use client";

import * as React from "react";
import {
  Layers,
  Cpu,
  Activity,
  Sliders,
  Workflow,
  GitBranch,
  CheckCircle2,
  Lock,
  Server,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { registerWebMcpTools } from "@/lib/webmcp";

export function BentoGrid() {
  // Client-side WebMCP Tool Registration with lifecycle cleanup
  React.useEffect(() => {
    const unregister = registerWebMcpTools();
    return () => {
      if (unregister) unregister();
    };
  }, []);

  return (
    <section
      id="capabilities"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 space-y-12 scroll-mt-20"
    >
      {/* Editorial Section Header */}
      <div className="space-y-4 max-w-3xl">
        <Badge variant="default" className="gap-1.5 font-mono text-xs uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>System Architecture &amp; Capabilities</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-foreground leading-[1.12]">
          Engineered for resilience, velocity, and scale.
        </h2>
        <p className="text-muted-foreground font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
          A deep-dive into the architectural pillars, performance benchmarks, and delivery standards driving every web product.
        </p>
      </div>

      {/* Asymmetric 4-Card Bento Grid (grid-cols-1 md:grid-cols-3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: Full-Stack Architecture (Span 2 col) */}
        <div className="md:col-span-2 group relative rounded-2xl border border-border/60 bg-white dark:bg-[#121217] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transform-gpu">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-white/10 flex items-center justify-center text-foreground">
                  <Cpu className="h-4 w-4 text-[#2563EB]" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Full-Stack Architecture
                </span>
              </div>
              <Badge variant="outline" className="text-xs font-mono">
                RSC + Edge
              </Badge>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground tracking-tight">
                Hybrid Rendering &amp; Distributed Data Layer
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
                Next.js 14 App Router with React Server Components (RSC) eliminates client waterfalls. Server Actions validate mutations via Zod schemas, persisted to PostgreSQL with strict Row-Level Security (RLS) policies.
              </p>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="pt-2">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-border/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border/40 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Server className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>Data Flow &amp; Security Boundary</span>
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Zero Waterfall
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#18181f] border border-border/60">
                    <div className="font-semibold text-foreground">01. App Router</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Streaming RSC &amp; Suspense</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#18181f] border border-border/60">
                    <div className="font-semibold text-foreground">02. Server Actions</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Zod Schema Validation</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#18181f] border border-border/60">
                    <div className="font-semibold text-foreground flex items-center gap-1">
                      <Lock className="h-3 w-3 text-[#2563EB]" />
                      <span>03. Supabase RLS</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Row-Level Security Enforcement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Monochrome Tech Stack Chips */}
          <div className="pt-6 mt-4 border-t border-border/40 flex flex-wrap items-center gap-2">
            {[
              "Next.js 14",
              "React 18 RSC",
              "TypeScript",
              "Supabase",
              "PostgreSQL RLS",
              "Tailwind CSS",
              "Zod",
            ].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-border/60 text-foreground font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CARD 2: Production Reliability (Span 1 col) */}
        <div className="md:col-span-1 group relative rounded-2xl border border-border/60 bg-white dark:bg-[#121217] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transform-gpu">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-white/10 flex items-center justify-center text-foreground">
                  <Activity className="h-4 w-4 text-[#2563EB]" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Reliability &amp; SLA
                </span>
              </div>
              <Badge variant="beacon" className="text-[11px]">
                Operational
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-bold font-display text-foreground tracking-tight">
                Production Reliability
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Deterministic SLA benchmarks backed by automated health checks and distributed edge cache.
              </p>
            </div>

            {/* Core Metrics */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-border/40">
                <div className="text-xs font-mono text-muted-foreground">SYSTEM UPTIME SLA</div>
                <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-foreground mt-1">
                  99.98%
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>365-day verified benchmark</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-border/40">
                  <div className="font-mono text-[11px] text-muted-foreground">LATENCY p95</div>
                  <div className="text-lg font-bold font-display text-foreground mt-0.5">
                    &lt; 100ms
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-border/40">
                  <div className="font-mono text-[11px] text-muted-foreground">LIGHTHOUSE</div>
                  <div className="text-lg font-bold font-display text-foreground mt-0.5">
                    98/100
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono">Global Edge CDN</span>
            <span className="font-medium text-foreground">Zero Downtime</span>
          </div>
        </div>

        {/* CARD 3: Design System & Motion (Span 1 col) */}
        <div className="md:col-span-1 group relative rounded-2xl border border-border/60 bg-white dark:bg-[#121217] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transform-gpu">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-white/10 flex items-center justify-center text-foreground">
                  <Sliders className="h-4 w-4 text-[#2563EB]" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Design System
                </span>
              </div>
              <Badge variant="outline" className="text-xs font-mono">
                WCAG AAA
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-bold font-display text-foreground tracking-tight">
                Zero-Slop UI &amp; 60fps Motion
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Disciplined typography scales, semantic tokens, and GPU-accelerated micro-interactions.
              </p>
            </div>

            {/* Visual Micro Details */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-border/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-muted-foreground">CONTRAST RATIO</span>
                  <span className="font-mono font-bold text-foreground">21:1 (AAA)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-foreground rounded-full w-full" />
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Pure monochromatic light &amp; dark canvas calibration.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-border/40 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-muted-foreground">HARDWARE ACCEL</span>
                  <span className="font-mono font-bold text-[#2563EB]">60fps GPU</span>
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Hardware-accelerated CSS transforms utilizing translate3d.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono">Reduced Motion Safe</span>
            <span className="font-medium text-foreground">WAI-ARIA Compliant</span>
          </div>
        </div>

        {/* CARD 4: Engineering Delivery Pipeline (Span 2 col) */}
        <div className="md:col-span-2 group relative rounded-2xl border border-border/60 bg-white dark:bg-[#121217] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transform-gpu">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-white/10 flex items-center justify-center text-foreground">
                  <Workflow className="h-4 w-4 text-[#2563EB]" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Delivery Framework
                </span>
              </div>
              <Badge variant="outline" className="text-xs font-mono">
                CI/CD Automation
              </Badge>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground tracking-tight">
                4-Stage Production Delivery Pipeline
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
                A disciplined engineering lifecycle transforming strategic requirements into zero-vulnerability production software.
              </p>
            </div>

            {/* 4 Pipeline Stages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {[
                {
                  step: "01",
                  title: "Discovery & RFC",
                  desc: "Requirements specification & architectural risk mitigation",
                  status: "Strategic",
                },
                {
                  step: "02",
                  title: "Architecture Design",
                  desc: "Database modeling & type-safe API contract definition",
                  status: "Systemic",
                },
                {
                  step: "03",
                  title: "TDD & Clean Build",
                  desc: "Automated regression testing & zero runtime vulnerability",
                  status: "Rigorous",
                },
                {
                  step: "04",
                  title: "CI/CD & Production Handoff",
                  desc: "Automated deployment, telemetry & zero-downtime release",
                  status: "Automated",
                },
              ].map((stage) => (
                <div
                  key={stage.step}
                  className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-border/40 flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#2563EB]">
                        {stage.step}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-muted-foreground">
                        {stage.status}
                      </span>
                    </div>
                    <div className="font-semibold text-xs text-foreground mt-2 font-display">
                      {stage.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1 leading-snug">
                      {stage.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GitBranch className="h-4 w-4 text-[#2563EB]" />
              <span className="font-mono">Git Trunk-Based Development with Semantic Releases</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium font-mono text-[11px]">
              Zero Technical Debt
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
