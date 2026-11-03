import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-xl border border-input bg-background/60 px-3.5 py-2 text-sm text-foreground shadow-sm",
          "placeholder:text-muted-foreground/60 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:border-foreground/20",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
