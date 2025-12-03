// src/features/member/dashboard/MemberDashboardPage.tsx
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
import { CalendarDays, FileBadge2, Ticket, IdCard } from "lucide-react";

export const memberDashboardMetadata: Metadata = {
  title: "Member Console – Dashboard | AUSTRC",
  description:
    "Dashboard for AUSTRC general members: see events, registrations, certificates, and profile at a glance.",
};

const stats = [
  {
    label: "Upcoming events",
    value: "—",
    hint: "Later: connect to /api/member/events/upcoming.",
  },
  {
    label: "Active registrations",
    value: "—",
    hint: "Later: connect to /api/member/registrations/active.",
  },
  {
    label: "Certificates available",
    value: "—",
    hint: "Later: connect to /api/member/certificates.",
  },
  {
    label: "Teams / groups",
    value: "—",
    hint: "Later: show member teams / internal groups.",
  },
];

const quickLinks = [
  {
    title: "Events",
    description: "Browse current AUSTRC events and register.",
    href: "/member/events",
    icon: CalendarDays,
  },
  {
    title: "My registrations",
    description: "See where you’ve registered and check status.",
    href: "/member/registrations",
    icon: Ticket,
  },
  {
    title: "Certificates",
    description: "View and download your certificates.",
    href: "/member/certificates",
    icon: FileBadge2,
  },
  {
    title: "Profile",
    description: "Update your basic info and membership details.",
    href: "/member/profile",
    icon: IdCard,
  },
];

export function MemberDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Member Dashboard"
        description="Welcome to your AUSTRC member console. From here you can explore events, track your registrations, access certificates, and manage your profile."
        actions={
          <Button variant="outline" disabled>
            Edit profile (coming soon)
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
          <h2 className="text-sm font-semibold text-slate-200">
            Quick access
          </h2>
          <p className="text-[11px] text-slate-500 max-w-xs">
            Shortcuts into the areas you’ll use most often as a member.
          </p>
        </div>

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

      {/* Placeholder for future widgets */}
      <section>
        <Card className="border-dashed border-slate-800 bg-slate-950/60">
          <CardHeader>
            <CardTitle>Upcoming member widgets</CardTitle>
            <CardDescription>
              Later this section can show your next event, unread messages, or
              tasks assigned in AUSTRC teams.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
