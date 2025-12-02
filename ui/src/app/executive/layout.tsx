"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { executiveNavItems } from "@/config/dashboard-nav";

type ExecutiveLayoutProps = {
  children: ReactNode;
};

export default function ExecutiveLayout({ children }: ExecutiveLayoutProps) {
  return (
    <DashboardShell
      navItems={executiveNavItems}
      appLabel="Executive Console"
      appSubtitle="Workspace for AUSTRC executive / panel members to manage events, teams, and tasks."
      appShortName="AUSTRC"
      roleLabel="Executive Member"
      roleDescription="Panel / sub-executive role"
    >
      {children}
    </DashboardShell>
  );
}
