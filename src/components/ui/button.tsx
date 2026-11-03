import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "pill-soft"
  | "circle-menu"
  | "circle-scroll"
  | "outline"
  | "ghost";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-xl",
  "pill-soft":
    "rounded-full bg-pill-soft text-foreground hover:bg-pill-hover font-medium border border-border/40 shadow-sm",
  "circle-menu":
    "rounded-full bg-pill-soft text-foreground hover:bg-pill-hover border border-border/40 aspect-square flex items-center justify-center shadow-sm",
  "circle-scroll":
    "rounded-full bg-foreground text-background hover:bg-foreground/85 aspect-square flex items-center justify-center shadow-md",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-xl shadow-sm",
  ghost:
    "hover:bg-accent hover:text-accent-foreground rounded-xl",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-11 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const isCircular = variant === "circle-menu" || variant === "circle-scroll";
    const circularSizeClass =
      size === "sm" ? "h-8 w-8 p-0" : size === "lg" ? "h-12 w-12 p-0" : "h-10 w-10 p-0";

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          variantStyles[variant],
          isCircular ? circularSizeClass : sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
