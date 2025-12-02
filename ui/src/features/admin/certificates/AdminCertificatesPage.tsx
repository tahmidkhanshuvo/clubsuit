// src/features/admin/certificates/AdminCertificatesPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";

const mockBatches = [
  {
    id: "batch-1",
    event: "Robo Carnival 2025",
    type: "Participation",
    count: 312,
    status: "completed" as const,
    triggeredBy: "admin@austrc.com",
  },
  {
    id: "batch-2",
    event: "Freshers' Workshop",
    type: "Volunteer",
    count: 45,
    status: "queued" as const,
    triggeredBy: "it.admin@austrc.com",
  },
];

const mockTemplates = [
  {
    id: "tpl-1",
    name: "Participation – Robo Carnival 2025",
    scope: "Event",
    status: "ok" as const,
  },
  {
    id: "tpl-2",
    name: "Volunteer Appreciation 2024",
    scope: "Global",
    status: "warning" as const,
  },
];

export function AdminCertificatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates"
        description="Operational view of certificate templates and generation batches."
        actions={
          <Button variant="outline" disabled>
            New batch (coming soon)
          </Button>
        }
      />

      {/* Overview row */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            High-level picture of the certificate system. Later this will be
            powered by real job queues and error tracking.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3 text-xs text-slate-300">
          <div>
            <div className="text-[11px] text-slate-400">Templates</div>
            <div className="mt-1 text-base font-semibold text-slate-50">
              {mockTemplates.length}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">
              Batches (recent)
            </div>
            <div className="mt-1 text-base font-semibold text-slate-50">
              {mockBatches.length}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Pending issues</div>
            <div className="mt-1 text-xs text-emerald-300">None detected</div>
          </div>
        </CardContent>
      </Card>

      {/* Recent batches */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Recent batches
        </h2>
        <SimpleTable
          columns={[
            "Event",
            "Type",
            "Certificates",
            "Status",
            "Triggered by",
          ]}
        >
          {mockBatches.map((batch) => (
            <SimpleTableRow key={batch.id}>
              <SimpleTableCell>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-50">
                    {batch.event}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Batch ID: {batch.id}
                  </span>
                </div>
              </SimpleTableCell>
              <SimpleTableCell className="text-slate-300">
                {batch.type}
              </SimpleTableCell>
              <SimpleTableCell align="right">
                {batch.count}
              </SimpleTableCell>
              <SimpleTableCell>
                <StatusPill
                  tone={
                    batch.status === "completed"
                      ? "success"
                      : batch.status === "queued"
                      ? "warning"
                      : "danger"
                  }
                >
                  {batch.status.charAt(0).toUpperCase() +
                    batch.status.slice(1)}
                </StatusPill>
              </SimpleTableCell>
              <SimpleTableCell className="text-slate-300">
                {batch.triggeredBy}
              </SimpleTableCell>
            </SimpleTableRow>
          ))}
        </SimpleTable>
      </div>

      {/* Templates */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Templates
        </h2>
        <SimpleTable columns={["Template", "Scope", "Status"]}>
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
    </div>
  );
}
