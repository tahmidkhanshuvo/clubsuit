// src/features/it/certificates/ItCertificatesPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const mockTemplates = [
  {
    id: "tpl-1",
    name: "Participation – Robo Carnival 2025",
    scope: "Event",
    lastRun: "Just now",
    status: "ok" as const,
  },
  {
    id: "tpl-2",
    name: "Volunteer Appreciation 2024",
    scope: "Global",
    lastRun: "3 days ago",
    status: "warning" as const,
  },
];

export function ItCertificatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates"
        description="Monitor templates and generation jobs for certificates."
      />

      <Card>
        <CardHeader>
          <CardTitle>Engine overview</CardTitle>
          <CardDescription>
            High-level status of the certificate generation system. This is a
            placeholder – later connect to actual job queues and logs.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3 text-xs text-slate-300">
          <div>
            <div className="text-[11px] text-slate-400">Templates</div>
            <div className="mt-1 text-base font-semibold text-slate-50">2</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">
              Pending generation jobs
            </div>
            <div className="mt-1 text-base font-semibold text-slate-50">0</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Last error</div>
            <div className="mt-1 text-xs text-emerald-300">None detected</div>
          </div>
        </CardContent>
      </Card>

      <SimpleTable
        columns={["Template", "Scope", "Last run", "Status"]}
      >
        {mockTemplates.map((tpl) => (
          <SimpleTableRow key={tpl.id}>
            <SimpleTableCell>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-50">
                  {tpl.name}
                </span>
                <span className="text-[11px] text-slate-500">
                  ID: {tpl.id}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {tpl.scope}
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {tpl.lastRun}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={
                  tpl.status === "ok"
                    ? "success"
                    : tpl.status === "warning"
                    ? "warning"
                    : "danger"
                }
              >
                {tpl.status === "ok"
                  ? "OK"
                  : tpl.status === "warning"
                  ? "Needs attention"
                  : "Error"}
              </StatusPill>
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
