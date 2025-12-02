// src/components/layout/dashboard-shell.tsx
import type { ReactNode } from "react";
import type { NavItem } from "@/types/nav";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: ReactNode;
  navItems: NavItem[];
  appLabel: string;         // e.g. "IT Console"
  appSubtitle?: string;
  appShortName?: string;    // e.g. "AUSTRC"
  roleLabel: string;        // e.g. "IT Team"
  roleDescription?: string;
  className?: string;
};

export function DashboardShell({
  children,
  navItems,
  appLabel,
  appSubtitle,
  appShortName,
  roleLabel,
  roleDescription,
  className,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      <Sidebar
        appShortName={appShortName}
        appLabel={appLabel}
        appSubtitle={appSubtitle}
        navItems={navItems}
      />
      <main className="flex-1 min-h-screen flex flex-col">
        <Topbar roleLabel={roleLabel} roleDescription={roleDescription} />
        <section
          className={cn(
            "flex-1 px-4 md:px-6 py-5 md:py-6 bg-slate-950",
            className,
          )}
        >
          {children}
        </section>
      </main>
    </div>
  );
}
