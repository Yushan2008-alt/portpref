import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "beacon"
  | "pill-tag"
  | "outline"
  | "secondary";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const badgeVariantStyles: Record<BadgeVariant, string> = {
  default:
    "rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1",
  beacon:
    "rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-3 py-1 gap-2",
  "pill-tag":
    "rounded-full border border-border/60 bg-pill-soft text-foreground px-3 py-1 font-mono text-[11px] tracking-wide hover:bg-pill-hover transition-colors",
  outline:
    "rounded-full border border-border text-foreground px-3 py-1",
  secondary:
    "rounded-full border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1",
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center text-xs font-medium transition-colors select-none",
          badgeVariantStyles[variant],
          className
        )}
        {...props}
      >
        {variant === "beacon" && (
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";
