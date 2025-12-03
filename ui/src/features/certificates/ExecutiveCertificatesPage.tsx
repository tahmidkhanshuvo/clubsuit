// src/features/executive/certificates/ExecutiveCertificatesPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";

const mockExecCerts = [
  {
    id: "cert-batch-1",
    event: "Robo Carnival 2024",
    type: "Participation",
    count: 250,
    status: "completed" as const,
  },
  {
    id: "cert-batch-2",
    event: "Robotics Showcase 2024",
    type: "Winner",
    count: 10,
    status: "pending" as const,
  },
];

export function ExecutiveCertificatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates (events you manage)"
        description="See certificate batches related to events where you are an executive."
      />

      <SimpleTable
        columns={["Event", "Type", "Certificates", "Status"]}
      >
        {mockExecCerts.map((row) => (
          <SimpleTableRow key={row.id}>
            <SimpleTableCell>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-50">
                  {row.event}
                </span>
                <span className="text-[11px] text-slate-500">
                  Batch ID: {row.id}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {row.type}
            </SimpleTableCell>
            <SimpleTableCell align="right">{row.count}</SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={
                  row.status === "completed"
                    ? "success"
                    : row.status === "pending"
                    ? "warning"
                    : "danger"
                }
              >
                {row.status === "completed"
                  ? "Completed"
                  : row.status === "pending"
                  ? "Pending"
                  : "Error"}
              </StatusPill>
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
