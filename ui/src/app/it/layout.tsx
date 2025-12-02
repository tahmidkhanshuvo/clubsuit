"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { itNavItems } from "@/config/dashboard-nav";

type ItLayoutProps = {
  children: ReactNode;
};

export default function ItLayout({ children }: ItLayoutProps) {
  return (
    <DashboardShell
      navItems={itNavItems}
      appLabel="IT Console"
      appSubtitle="Internal tools and configuration panel for the AUSTRC IT team."
      appShortName="AUSTRC"
      roleLabel="IT Team"
      roleDescription="System & infrastructure access"
    >
      {children}
    </DashboardShell>
  );
}
