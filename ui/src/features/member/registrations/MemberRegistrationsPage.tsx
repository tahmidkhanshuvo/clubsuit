// src/features/member/registrations/MemberRegistrationsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";

const mockRegistrations = [
  {
    id: "reg-1",
    event: "Robo Carnival 2025",
    role: "Participant",
    status: "confirmed" as const,
    registeredAt: "Dec 10, 2024",
  },
  {
    id: "reg-2",
    event: "Freshers' Workshop",
    role: "Volunteer",
    status: "pending" as const,
    registeredAt: "Dec 20, 2024",
  },
  {
    id: "reg-3",
    event: "Monthly Member Meetup",
    role: "Participant",
    status: "cancelled" as const,
    registeredAt: "Nov 1, 2024",
  },
];

export function MemberRegistrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My registrations"
        description="Track which events you’ve registered for and see their current status."
      />

      <SimpleTable
        columns={[
          "Event",
          "Role",
          "Registration date",
          "Status",
        ]}
      >
        {mockRegistrations.map((reg) => (
          <SimpleTableRow key={reg.id}>
            <SimpleTableCell>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-50">
                  {reg.event}
                </span>
                <span className="text-[11px] text-slate-500">
                  Registration ID: {reg.id}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {reg.role}
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {reg.registeredAt}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={
                  reg.status === "confirmed"
                    ? "success"
                    : reg.status === "pending"
                    ? "warning"
                    : "danger"
                }
              >
                {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
              </StatusPill>
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
