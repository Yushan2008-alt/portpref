"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  X,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // Prevent SSR hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock when drawer is open
  React.useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // ESC key dismissal
  React.useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToSection = (id: string) => {
    setIsDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/40 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: 5-bar electric blue waveform logo SVG + brand text */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 select-none"
            aria-label="developer.portfolio. homepage"
          >
            {/* 5-bar electric blue waveform logo SVG (#2563EB) */}
            <svg
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-7 shrink-0"
              aria-hidden="true"
            >
              <rect x="2" y="7" width="3" height="10" rx="1.5" fill="#2563EB" />
              <rect x="7" y="3" width="3" height="18" rx="1.5" fill="#2563EB" />
              <rect x="12" y="5" width="3" height="14" rx="1.5" fill="#2563EB" />
              <rect x="17" y="1" width="3" height="22" rx="1.5" fill="#2563EB" />
              <rect x="22" y="6" width="3" height="12" rx="1.5" fill="#2563EB" />
            </svg>
            <div className="flex items-baseline gap-1 font-display tracking-tight text-base sm:text-lg">
              <span className="font-bold text-foreground">yushan.</span>
              <span className="text-muted-foreground font-normal">portfolio.</span>
            </div>
          </a>

          {/* Center: Nav links with subtle hover transitions */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium"
            aria-label="Main navigation"
          >
            <a
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
            >
              <span>About</span>
              <span className="text-xs transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#works"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
            >
              <span>Works</span>
              <span className="text-xs transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#services"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
            >
              <span>Services</span>
              <span className="text-xs transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#stack"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Stack
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right: Circular button ( = ) + Pill button "Let's chat" + Theme Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher (Hydration-safe with Lucide Sun/Moon) */}
            <Button
              variant="circle-menu"
              size="default"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="text-foreground"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-foreground" />
                )
              ) : (
                <span className="h-4 w-4 block" />
              )}
            </Button>

            {/* Pill button Let's chat (STRICT: NO emoji) */}
            <Button
              variant="pill-soft"
              size="default"
              onClick={() => scrollToSection("contact")}
              className="font-medium px-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Let&apos;s chat
            </Button>

            {/* Circular button ( = ) -> Quick Drawer Trigger */}
            <Button
              variant="circle-menu"
              size="default"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation drawer"
              aria-expanded={isDrawerOpen}
              className="text-foreground"
            >
              <span className="sr-only">Open navigation menu</span>
              <div
                className="flex flex-col gap-1 w-3.5 items-center justify-center"
                aria-hidden="true"
              >
                <span className="h-0.5 w-full bg-foreground rounded-full" />
                <span className="h-0.5 w-full bg-foreground rounded-full" />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Slide-over Quick Drawer */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isDrawerOpen && (
              <div className="fixed inset-0 z-50 overflow-hidden">
                {/* Backdrop blur overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-hidden="true"
                />

                {/* Slide-in panel from right */}
                <motion.aside
                  role="dialog"
                  aria-modal="true"
                  aria-label="Quick Navigation Drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 300 }}
                  className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm sm:max-w-md bg-background border-l border-border/40 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto"
                >
                  {/* Drawer Header */}
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-border/40">
                      <div className="flex items-center gap-2.5">
                        <svg
                          viewBox="0 0 28 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-6 shrink-0"
                          aria-hidden="true"
                        >
                          <rect x="2" y="7" width="3" height="10" rx="1.5" fill="#2563EB" />
                          <rect x="7" y="3" width="3" height="18" rx="1.5" fill="#2563EB" />
                          <rect x="12" y="5" width="3" height="14" rx="1.5" fill="#2563EB" />
                          <rect x="17" y="1" width="3" height="22" rx="1.5" fill="#2563EB" />
                          <rect x="22" y="6" width="3" height="12" rx="1.5" fill="#2563EB" />
                        </svg>
                        <span className="font-display font-bold text-base tracking-tight text-foreground">
                          navigation.
                        </span>
                      </div>

                      {/* Close circular button */}
                      <Button
                        variant="circle-menu"
                        size="default"
                        onClick={() => setIsDrawerOpen(false)}
                        aria-label="Close navigation drawer"
                        className="text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="mt-8 flex flex-col space-y-4" aria-label="Drawer navigation">
                      {[
                        { label: "Home", id: "" },
                        { label: "About", id: "about" },
                        { label: "Works", id: "works" },
                        { label: "Services", id: "services" },
                        { label: "Stack", id: "stack" },
                        { label: "Contact", id: "contact" },
                      ].map((item, index) => (
                        <a
                          key={item.label}
                          href={item.id ? `#${item.id}` : "#"}
                          onClick={(e) => {
                            if (item.id) {
                              e.preventDefault();
                              scrollToSection(item.id);
                            } else {
                              setIsDrawerOpen(false);
                            }
                          }}
                          className="group flex items-center justify-between py-2 text-2xl font-display font-bold tracking-tight text-foreground hover:text-[#2563EB] transition-colors"
                        >
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono text-xs text-muted-foreground font-normal">
                              0{index + 1}
                            </span>
                            <span>{item.label}</span>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-[#2563EB] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ))}
                    </nav>

                    <div className="mt-8 pt-6 border-t border-border/40">
                      <Badge variant="beacon" className="text-xs">
                        Available for Projects
                      </Badge>
                    </div>
                  </div>

                  {/* Drawer Footer: Social Links & CTA */}
                  <div className="pt-8 border-t border-border/40 mt-8 space-y-6">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                        Social & Connect
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-pill-soft transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-pill-soft transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href="https://x.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-pill-soft transition-colors"
                        >
                          <Twitter className="h-4 w-4" />
                          <span>Twitter/X</span>
                        </a>
                        <a
                          href="mailto:contact@developer.portfolio"
                          className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-pill-soft transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </a>
                      </div>
                    </div>

                    <Button
                      variant="pill-soft"
                      size="lg"
                      onClick={() => scrollToSection("contact")}
                      className="w-full justify-center font-medium"
                    >
                      Let&apos;s chat
                    </Button>
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
