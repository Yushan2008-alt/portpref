"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MARQUEE_ITEMS = [
  "99.98% SYSTEM UPTIME · SCALE PROVEN",
  "SUB-100MS API RESPONSE LATENCY",
  "$85M+ TRANSACTION VOLUME HANDLED",
  "15+ ENTERPRISE RELEASES SHIPPED",
  "ZERO RUNTIME VULNERABILITIES",
];

export function HeroSection() {
  const scrollToNextSection = () => {
    const target =
      document.getElementById("showcase") ||
      document.getElementById("works") ||
      document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "mailto:contact@developer.portfolio";
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100dvh-4rem)] flex flex-col justify-between overflow-hidden pt-12 sm:pt-16 md:pt-20 select-none">
      {/* Centered Editorial Value Proposition (Taste-Skill §4.7 Max 4 text elements) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center text-center">
        {/* Availability Beacon Eyebrow */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-neutral-700 mb-3 font-sans font-normal tracking-wide max-w-2xl mx-auto leading-relaxed">
          Available for new opportunities and collaborations.
        </p>

        {/* Giant Centered Headline (Pure black in light, crisp white in dark, STRICT: NO purple gradient) */}
        <h1 className="font-medium font-sans text-2xl sm:text-4xl md:text-6xl lg:text-6xl whitespace-nowrap tracking-tight text-neutral-900 dark:text-white text-center max-w-5xl mx-auto leading-[1.08] pb-1">
          Junior FullStack Software Engineer
        </h1>

        {/* Action Cluster */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Action Pill: Book strategy call (STRICT: NO emoji, soft gray #F0F0F3 with hover lift) */}
          <Button
            variant="pill-soft"
            size="lg"
            onClick={scrollToContact}
            className="bg-[#F0F0F3] text-foreground hover:bg-[#E4E4E9] dark:bg-white/10 dark:text-white dark:hover:bg-white/15 border border-border/40 font-medium rounded-full px-8 py-3 text-sm sm:text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            Book strategy call
          </Button>
        </div>

        {/* Centered circular black scroll button with white down arrow ( ↓ ) */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            type="button"
            onClick={scrollToNextSection}
            aria-label="Scroll down to showcase section"
            className="group h-12 w-12 rounded-full bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 aspect-square flex items-center justify-center shadow-md active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ArrowDown className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Infinite Smooth CSS Marquee Running Ticker (60fps hardware accelerated via translate3d, pause on hover) */}
      <div className="w-full border-y border-border/40 py-4 bg-background/50 backdrop-blur-sm overflow-hidden mt-12 sm:mt-16 group">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {/* Track 1 (Screen reader accessible) */}
          <div className="flex items-center shrink-0">
            {MARQUEE_ITEMS.map((item, index) => (
              <div key={`track1-${index}`} className="flex items-center">
                <span className="text-[#2563EB] font-bold mx-4 sm:mx-6 text-sm" aria-hidden="true">
                  /
                </span>
                <span className="font-display font-medium text-xs sm:text-sm tracking-widest uppercase text-foreground/90">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Track 2 (Clone for infinite seamless loop, hidden from screen readers) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {MARQUEE_ITEMS.map((item, index) => (
              <div key={`track2-${index}`} className="flex items-center">
                <span className="text-[#2563EB] font-bold mx-4 sm:mx-6 text-sm">
                  /
                </span>
                <span className="font-display font-medium text-xs sm:text-sm tracking-widest uppercase text-foreground/90">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
