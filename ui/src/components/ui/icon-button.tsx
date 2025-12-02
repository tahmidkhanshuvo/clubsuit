// src/components/ui/icon-button.tsx
"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-50 transition-colors",
        className,
      )}
      {...props}
    />
  );
}
