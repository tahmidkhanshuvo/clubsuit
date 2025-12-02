// src/features/admin/events/AdminEventsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";

const mockEvents = [
  {
    id: "ev-rc-25",
    name: "Robo Carnival 2025",
    type: "Flagship",
    status: "active" as const,
    registrations: 312,
    window: "Jan 5 – Jan 20",
  },
  {
    id: "ev-fw-25",
    name: "Freshers' Workshop",
    type: "Workshop",
    status: "upcoming" as const,
    registrations: 0,
    window: "Feb 10 – Feb 15",
  },
  {
    id: "ev-boot-24",
    name: "Internal Bootcamp",
    type: "Internal",
    status: "closed" as const,
    registrations: 87,
    window: "Nov 2024",
  },
];

export function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        description="Create and manage AUSTRC events, registration windows, and basic configuration."
        actions={
          <Button variant="outline" disabled>
            Create event (coming soon)
          </Button>
        }
      />

      <SimpleTable
        columns={[
          "Event",
          "Type",
          "Status",
          "Registration window",
          "Registrations",
        ]}
      >
        {mockEvents.map((event) => (
          <SimpleTableRow key={event.id}>
            <SimpleTableCell>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-50">
                  {event.name}
                </span>
                <span className="text-[11px] text-slate-500">
                  ID: {event.id}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {event.type}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={
                  event.status === "active"
                    ? "success"
                    : event.status === "upcoming"
                    ? "warning"
                    : "muted"
                }
              >
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </StatusPill>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {event.window}
            </SimpleTableCell>
            <SimpleTableCell align="right" className="text-slate-200">
              {event.registrations || "—"}
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
