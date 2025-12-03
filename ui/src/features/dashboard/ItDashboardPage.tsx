// src/features/dashboard/ItDashboardPage.tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { StatGrid, StatItem } from "@/components/layout/stat-grid";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileBadge2, Settings2, Users } from "lucide-react";

export const itDashboardMetadata: Metadata = {
  title: "IT Console – Dashboard | AUSTRC",
  description:
    "Internal IT dashboard for managing AUSTRC system users, events, certificates, and low-level configuration.",
};

const stats = [
  {
    label: "Total Users",
    value: "—",
    hint: "Later: connect to /api/it/users/stats for live counts.",
  },
  {
    label: "Active Events",
    value: "—",
    hint: "Later: connect to /api/it/events/active to show running events.",
  },
  {
    label: "Pending Certificates",
    value: "—",
    hint: "Later: connect to /api/it/certificates/pending for backlog size.",
  },
  {
    label: "System Health",
    value: "OK",
    hint: "Later: integrate with health checks / monitoring.",
  },
];

const quickLinks = [
  {
    title: "User Management",
    description: "Inspect all users, manage IT/Admin roles and bans.",
    icon: Users,
    href: "/it/users",
  },
  {
    title: "Events & Registrations",
    description: "Configure events, scanning access and registration limits.",
    icon: CalendarDays,
    href: "/it/events",
  },
  {
    title: "Certificates Engine",
    description: "Configure templates, debug certificate generation jobs.",
    icon: FileBadge2,
    href: "/it/certificates",
  },
  {
    title: "System Settings",
    description: "Branding, email providers, storage and feature toggles.",
    icon: Settings2,
    href: "/it/settings",
  },
];

export function ItDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <PageHeader
        title="IT Dashboard"
        description="Control center for the AUSTRC platform. The IT team can supervise users, events, certificates and low-level system configuration without touching the codebase."
        actions={<Button>Open quick actions</Button>}
      />

      {/* Stats row */}
      <StatGrid>
        {stats.map((stat) => (
          <StatItem
            key={stat.label}
            label={stat.label}
            value={stat.value}
            hint={stat.hint}
          />
        ))}
      </StatGrid>

      {/* Quick access section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-200">Quick access</h2>
          <p className="text-[11px] text-slate-500">
            Most frequently used IT areas.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.href}
                className="group cursor-pointer hover:border-slate-700 hover:bg-slate-900/90 transition-colors"
              >
                <CardHeader className="items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80">
                    <Icon className="h-4 w-4 text-slate-200" />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {item.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Open {item.title}</span>
                  <span className="group-hover:text-slate-300">Go →</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Placeholder for logs / recent activity */}
      <section>
        <Card className="border-dashed border-slate-800 bg-slate-950/50">
          <CardHeader>
            <CardTitle>Upcoming IT widgets</CardTitle>
            <CardDescription>
              Later we can plug in audit log snapshots, recent role changes,
              failing jobs, or system metrics here.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
