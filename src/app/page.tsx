"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Code2, Sparkles, Terminal, Layers } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full text-center space-y-8"
      >
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Phase 0 Initialized — Next.js 14 App Router</span>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Full-Stack Developer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-purple-400">
              Executive Portfolio
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Engineered with Next.js 14, React 18, TypeScript strict mode, and Obsidian design tokens following Ponytail guidelines.
          </p>
        </div>

        {/* Tech Stack Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left"
        >
          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="font-semibold text-sm text-foreground">TypeScript Strict</div>
            <div className="text-xs text-muted-foreground">Zero implicit any, strict null checks enabled.</div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div className="font-semibold text-sm text-foreground">Tailwind CSS</div>
            <div className="text-xs text-muted-foreground">Dual-theme CSS variables & Obsidian luxury dark mode.</div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="font-semibold text-sm text-foreground">Ponytail Architecture</div>
            <div className="text-xs text-muted-foreground">Minimal, clean, zero unnecessary abstraction.</div>
          </div>
        </motion.div>

        {/* Verification Check Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Core dependencies & baseline shell verified</span>
        </div>
      </motion.div>
    </main>
  );
}
