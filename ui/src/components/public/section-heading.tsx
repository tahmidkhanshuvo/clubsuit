// src/components/public/section-heading.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <div className="space-y-1">
        {eyebrow ? (
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm text-slate-400">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex-shrink-0">{actions}</div> : null}
    </div>
  );
}
