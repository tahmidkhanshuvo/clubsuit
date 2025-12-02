// src/features/member/certificates/MemberCertificatesPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";

const mockCertificates = [
  {
    id: "cert-1",
    title: "Participation – Robo Carnival 2024",
    event: "Robo Carnival 2024",
    type: "Participation",
    status: "available" as const,
  },
  {
    id: "cert-2",
    title: "Volunteer – Freshers' Workshop",
    event: "Freshers' Workshop 2024",
    type: "Volunteer",
    status: "generating" as const,
  },
  {
    id: "cert-3",
    title: "Top 3 – Internal Contest",
    event: "Internal Contest 2023",
    type: "Award",
    status: "available" as const,
  },
];

export function MemberCertificatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates"
        description="View and download certificates you have earned through AUSTRC events."
      />

      <SimpleTable
        columns={["Certificate", "Event", "Type", "Status", ""]}
      >
        {mockCertificates.map((cert) => (
          <SimpleTableRow key={cert.id}>
            <SimpleTableCell>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-50">
                  {cert.title}
                </span>
                <span className="text-[11px] text-slate-500">
                  ID: {cert.id}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {cert.event}
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {cert.type}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={
                  cert.status === "available"
                    ? "success"
                    : cert.status === "generating"
                    ? "warning"
                    : "danger"
                }
              >
                {cert.status === "available"
                  ? "Available"
                  : cert.status === "generating"
                  ? "Generating"
                  : "Error"}
              </StatusPill>
            </SimpleTableCell>
            <SimpleTableCell align="right">
              <Button
                variant="outline"
                className="text-[11px] px-2 py-1"
                disabled={cert.status !== "available"}
              >
                Download
              </Button>
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
