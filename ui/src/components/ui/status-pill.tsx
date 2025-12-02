// src/components/ui/status-pill.tsx
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "muted";

type StatusPillProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
};

const toneClass: Record<Tone, string> = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  danger: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  muted: "border-slate-600/60 bg-slate-800 text-slate-200",
};

export function StatusPill({
  tone = "muted",
  className,
  ...props
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-[2px] text-[10px] font-medium",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}
