// src/features/member/events/MemberEventsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";

const mockEvents = [
  {
    id: "ev-rc-25",
    name: "Robo Carnival 2025",
    type: "Flagship",
    when: "Jan 25, 2025",
    location: "AUST Campus",
    registrationStatus: "open" as const,
  },
  {
    id: "ev-fw-25",
    name: "Freshers' Workshop",
    type: "Workshop",
    when: "Feb 12, 2025",
    location: "Lab 401",
    registrationStatus: "not-open" as const,
  },
  {
    id: "ev-meet-24",
    name: "Monthly Member Meetup",
    type: "Internal",
    when: "Dec 5, 2024",
    location: "Club Room",
    registrationStatus: "closed" as const,
  },
];

export function MemberEventsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        description="Explore AUSTRC events you can join. Registration flows will be wired here later."
      />

      <SimpleTable columns={["Event", "Type", "When / where", "Status", ""]}>
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
            <SimpleTableCell className="text-slate-300">
              <div className="flex flex-col">
                <span>{event.when}</span>
                <span className="text-[11px] text-slate-500">
                  {event.location}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={
                  event.registrationStatus === "open"
                    ? "success"
                    : event.registrationStatus === "not-open"
                    ? "warning"
                    : "muted"
                }
              >
                {event.registrationStatus === "open"
                  ? "Registration open"
                  : event.registrationStatus === "not-open"
                  ? "Opens later"
                  : "Registration closed"}
              </StatusPill>
            </SimpleTableCell>
            <SimpleTableCell align="right">
              <Button
                variant="outline"
                className="text-[11px] px-2 py-1"
                disabled
              >
                Details
              </Button>
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
