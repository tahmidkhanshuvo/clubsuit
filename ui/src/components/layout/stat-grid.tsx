// src/components/layout/stat-grid.tsx
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type StatItemProps = {
  label: string;
  value: ReactNode;
  hint?: string;
};

export function StatItem({ label, value, hint }: StatItemProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardContent className="space-y-3">
        <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400">
          {label}
        </div>
        <div className="text-2xl font-semibold text-slate-50">{value}</div>
        {hint ? (
          <p className="text-[11px] text-slate-500 leading-relaxed">{hint}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

type StatGridProps = {
  children: ReactNode;
};

export function StatGrid({ children }: StatGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
