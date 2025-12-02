// src/features/communication/mailbox/MailboxPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";

type MailboxPageProps = {
  roleLabel: string; // e.g. "IT", "Admin", "Member", "Executive"
};

const mockThreads = [
  {
    id: "th-1",
    subject: "Robo Carnival 2025 – coordination",
    from: "IT Team",
    scope: "Club-wide",
    unread: true,
    updatedAt: "Just now",
  },
  {
    id: "th-2",
    subject: "Volunteer briefing schedule",
    from: "Admin Team",
    scope: "Event",
    unread: true,
    updatedAt: "10 min ago",
  },
  {
    id: "th-3",
    subject: "Monthly internal meet-up",
    from: "Executive Panel",
    scope: "Announcement",
    unread: false,
    updatedAt: "Yesterday",
  },
];

export function MailboxPage({ roleLabel }: MailboxPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={`${roleLabel} mailbox`}
        description="Internal AUSTRC mailbox for announcements and structured messages. Later this will be wired to real message threads and filters."
        actions={
          <Button variant="outline" disabled>
            Compose (coming soon)
          </Button>
        }
      />

      <SimpleTable columns={["Subject", "From", "Scope", "Updated", "Status"]}>
        {mockThreads.map((thread) => (
          <SimpleTableRow key={thread.id}>
            <SimpleTableCell>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-50">
                  {thread.subject}
                </span>
                <span className="text-[11px] text-slate-500">
                  Thread ID: {thread.id}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {thread.from}
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {thread.scope}
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {thread.updatedAt}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill tone={thread.unread ? "success" : "muted"}>
                {thread.unread ? "Unread" : "Read"}
              </StatusPill>
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
