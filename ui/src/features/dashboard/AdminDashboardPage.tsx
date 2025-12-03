// src/features/admin/dashboard/AdminDashboardPage.tsx
import type { Metadata } from "next";
import Link from "next/link";
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
import { CalendarDays, FileBadge2, Users, Newspaper } from "lucide-react";

export const adminDashboardMetadata: Metadata = {
  title: "Admin Console – Dashboard | AUSTRC",
  description:
    "Admin dashboard for managing AUSTRC events, content, certificates, and members.",
};

const stats = [
  {
    label: "Active events",
    value: "—",
    hint: "Later: connect to /api/admin/events/active for live counts.",
  },
  {
    label: "Draft events",
    value: "—",
    hint: "Later: connect to /api/admin/events/drafts.",
  },
  {
    label: "Pending certificates",
    value: "—",
    hint: "Later: connect to /api/admin/certificates/pending.",
  },
  {
    label: "Content in review",
    value: "—",
    hint: "Later: connect to /api/admin/content/review.",
  },
];

const quickLinks = [
  {
    title: "Events",
    description: "Create and manage events, schedules, and registrations.",
    href: "/admin/events",
    icon: CalendarDays,
  },
  {
    title: "Content",
    description: "Projects, activities, and news shown on the public site.",
    href: "/admin/content",
    icon: Newspaper,
  },
  {
    title: "Certificates",
    description: "Trigger certificate generation and monitor status.",
    href: "/admin/certificates",
    icon: FileBadge2,
  },
  {
    title: "Users",
    description: "View members involved in events and content.",
    href: "/admin/users",
    icon: Users,
  },
];

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Admin Dashboard"
        description="Home for AUSTRC admin operations: events, content, and certificates. Focused on day-to-day club management, not system-level IT configuration."
        actions={
          <Button variant="outline" disabled>
            New quick action (coming soon)
          </Button>
        }
      />

      {/* Stats */}
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

      {/* Quick access */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-200">Quick access</h2>
          <p className="text-[11px] text-slate-500 max-w-xs">
            Direct links into the main admin workflows you will use most often.
          </p>
        </div>

        {/* NOTE: 2 cols on medium, 4 cols on large screens */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="block h-full">
                <Card className="group h-full cursor-pointer hover:border-slate-700 hover:bg-slate-900/90 transition-colors flex flex-col">
                  <CardHeader className="flex items-start gap-3 pb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80">
                      <Icon className="h-4 w-4 text-slate-200" />
                    </div>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {item.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 mt-auto flex items-center justify-between text-[11px] text-slate-500">
                    <span>Open {item.title}</span>
                    <span className="group-hover:text-slate-300">Go →</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Upcoming admin widgets */}
      <section>
        <Card className="border-dashed border-slate-800 bg-slate-950/60">
          <CardHeader>
            <CardTitle>Upcoming admin widgets</CardTitle>
            <CardDescription>
              Later we can plug in things like event reminders, content
              requiring approval, and recent actions performed by admins.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
