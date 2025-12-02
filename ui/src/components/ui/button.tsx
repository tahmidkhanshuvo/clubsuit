// src/components/ui/button.tsx
"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-slate-500 disabled:opacity-60 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 text-slate-50 hover:bg-slate-800 border border-slate-700",
  outline:
    "bg-transparent text-slate-100 border border-slate-700 hover:bg-slate-900/60",
  ghost:
    "bg-transparent text-slate-300 hover:bg-slate-900/60 border border-transparent",
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], "px-3 py-2", className)}
      {...props}
    />
  );
}
