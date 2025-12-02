"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { memberNavItems } from "@/config/dashboard-nav";

type MemberLayoutProps = {
  children: ReactNode;
};

export default function MemberLayout({ children }: MemberLayoutProps) {
  return (
    <DashboardShell
      navItems={memberNavItems}
      appLabel="Member Console"
      appSubtitle="Personal space for AUSTRC general members: events, registrations, certificates, and profile."
      appShortName="AUSTRC"
      roleLabel="Member"
      roleDescription="General AUSTRC member"
    >
      {children}
    </DashboardShell>
  );
}
