// src/features/executive/dashboard/ExecutiveDashboardPage.tsx
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
import { CalendarDays, Users, ScrollText, FileBadge2, IdCard } from "lucide-react";

export const executiveDashboardMetadata: Metadata = {
  title: "Executive Console – Dashboard | AUSTRC",
  description:
    "Dashboard for AUSTRC executive and panel members: manage events, teams, tasks, and certificates.",
};

const stats = [
  {
    label: "Events I manage",
    value: "—",
    hint: "Later: connect to /api/executive/events for assigned events.",
  },
  {
    label: "Upcoming sessions",
    value: "—",
    hint: "Later: show upcoming event days or meetings.",
  },
  {
    label: "Open tasks",
    value: "—",
    hint: "Later: connect to /api/executive/tasks?status=open.",
  },
  {
    label: "Teams involved",
    value: "—",
    hint: "Later: show teams where you are coordinator or lead.",
  },
];

const quickLinks = [
  {
    title: "Events I manage",
    description: "See events you are responsible for and their sectors.",
    href: "/executive/events",
    icon: CalendarDays,
  },
  {
    title: "My teams",
    description: "Check your teams, members, and responsibilities.",
    href: "/executive/teams",
    icon: Users,
  },
  {
    title: "Tasks",
    description: "Track tasks assigned to you as executive.",
    href: "/executive/tasks",
    icon: ScrollText,
  },
  {
    title: "Certificates",
    description: "View certificate status for your events.",
    href: "/executive/certificates",
    icon: FileBadge2,
  },
];

export function ExecutiveDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Executive Dashboard"
        description="Central place for your AUSTRC executive work: events you manage, teams you coordinate, and tasks assigned to you."
        actions={
          <Button variant="outline" disabled>
            View profile
          </Button>
        }
      />

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

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-200">
            Quick access
          </h2>
          <p className="text-[11px] text-slate-500 max-w-xs">
            Shortcuts into the areas you’ll use the most as an executive member.
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

      <section>
        <Card className="border-dashed border-slate-800 bg-slate-950/60">
          <CardHeader>
            <CardTitle>Profile & role</CardTitle>
            <CardDescription>
              Your detailed executive role info (panel, term, teams) will live
              under the profile page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-xs text-slate-300">
            <div>
              <div className="text-slate-400 text-[11px]">Next step</div>
              <div>Review your executive profile & responsibilities.</div>
            </div>
            <Link href="/executive/profile">
              <Button variant="outline" className="text-[11px] px-3 py-2">
                Open profile
                <IdCard className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
