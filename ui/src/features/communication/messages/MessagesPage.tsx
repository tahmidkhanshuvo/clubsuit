// src/features/communication/messages/MessagesPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";

type MessagesPageProps = {
  roleLabel: string; // e.g. "IT", "Admin", "Member", "Executive"
};

const mockDirectMessages = [
  {
    id: "dm-1",
    name: "IT Lead",
    lastMessage: "Please confirm the event QR configs.",
    updatedAt: "5 min ago",
    unread: true,
  },
  {
    id: "dm-2",
    name: "Admin Coordinator",
    lastMessage: "We finalized the room bookings.",
    updatedAt: "1 hr ago",
    unread: false,
  },
];

const mockTeamChannels = [
  {
    id: "ch-1",
    name: "Robo Carnival 2025 – Core",
    lastMessage: "Reminder: sector sync at 8PM.",
    updatedAt: "Just now",
    unread: true,
  },
  {
    id: "ch-2",
    name: "RnD Team",
    lastMessage: "Next demo run scheduled.",
    updatedAt: "Yesterday",
    unread: false,
  },
];

export function MessagesPage({ roleLabel }: MessagesPageProps) {
  return (
    <div className="space-y-8">
      <PageHeader
        title={`${roleLabel} messages`}
        description="Direct messages and team channels. Later this can be replaced by a real-time chat system."
      />

      {/* Direct messages */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Direct messages
        </h2>
        <SimpleTable columns={["Person", "Last message", "Updated", "Status"]}>
          {mockDirectMessages.map((dm) => (
            <SimpleTableRow key={dm.id}>
              <SimpleTableCell className="text-slate-50">
                {dm.name}
              </SimpleTableCell>
              <SimpleTableCell className="text-slate-300">
                {dm.lastMessage}
              </SimpleTableCell>
              <SimpleTableCell className="text-slate-300">
                {dm.updatedAt}
              </SimpleTableCell>
              <SimpleTableCell>
                <StatusPill tone={dm.unread ? "success" : "muted"}>
                  {dm.unread ? "Unread" : "Read"}
                </StatusPill>
              </SimpleTableCell>
            </SimpleTableRow>
          ))}
        </SimpleTable>
      </section>

      {/* Team channels */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Team channels
        </h2>
        <SimpleTable columns={["Channel", "Last message", "Updated", "Status"]}>
          {mockTeamChannels.map((ch) => (
            <SimpleTableRow key={ch.id}>
              <SimpleTableCell className="text-slate-50">
                {ch.name}
              </SimpleTableCell>
              <SimpleTableCell className="text-slate-300">
                {ch.lastMessage}
              </SimpleTableCell>
              <SimpleTableCell className="text-slate-300">
                {ch.updatedAt}
              </SimpleTableCell>
              <SimpleTableCell>
                <StatusPill tone={ch.unread ? "success" : "muted"}>
                  {ch.unread ? "Unread" : "Read"}
                </StatusPill>
              </SimpleTableCell>
            </SimpleTableRow>
          ))}
        </SimpleTable>
      </section>
    </div>
  );
}
