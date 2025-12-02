// src/features/executive/events/ExecutiveEventsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";

const mockManagedEvents = [
  {
    id: "ev-rc-25",
    name: "Robo Carnival 2025",
    role: "Event coordinator",
    sectors: 4,
    status: "active" as const,
    nextDate: "Jan 25, 2025",
  },
  {
    id: "ev-show-24",
    name: "Robotics Showcase 2024",
    role: "Sector lead – Registration",
    sectors: 1,
    status: "prep" as const,
    nextDate: "Dec 20, 2024",
  },
];

export function ExecutiveEventsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Events I manage"
        description="Events where you are an executive, coordinator, or sector lead."
      />

      <SimpleTable
        columns={["Event", "Your role", "Sectors", "Next date", "Status"]}
      >
        {mockManagedEvents.map((event) => (
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
              {event.role}
            </SimpleTableCell>
            <SimpleTableCell align="center">{event.sectors}</SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {event.nextDate}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={
                  event.status === "active"
                    ? "success"
                    : event.status === "prep"
                    ? "warning"
                    : "muted"
                }
              >
                {event.status === "active"
                  ? "Active"
                  : event.status === "prep"
                  ? "In preparation"
                  : "Inactive"}
              </StatusPill>
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
