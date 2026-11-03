import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-sm text-foreground shadow-sm",
          "placeholder:text-muted-foreground/60 transition-all duration-200 resize-y",
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

Textarea.displayName = "Textarea";
