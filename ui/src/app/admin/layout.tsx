"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { adminNavItems } from "@/config/dashboard-nav";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <DashboardShell
      navItems={adminNavItems}
      appLabel="Admin Console"
      appSubtitle="Event, content, and certificate management tools for the AUSTRC admin team."
      appShortName="AUSTRC"
      roleLabel="Admin Team"
      roleDescription="Operations & event management"
    >
      {children}
    </DashboardShell>
  );
}
