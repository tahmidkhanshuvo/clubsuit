// src/components/public/public-shell.tsx
import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

type PublicShellProps = {
  children: ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
