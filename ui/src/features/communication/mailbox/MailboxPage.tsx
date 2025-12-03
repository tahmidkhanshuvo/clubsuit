// src/features/communication/mailbox/MailboxPage.tsx
"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import {
  fetchMailboxThreadsForRole,
  MailboxThread,
} from "./api/mockMailboxApi";

type MailboxPageProps = {
  roleLabel: string; // e.g. "IT", "Admin", "Member", "Executive"
};

export function MailboxPage({ roleLabel }: MailboxPageProps) {
  const [threads, setThreads] = useState<MailboxThread[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMailboxThreadsForRole(roleLabel);
        setThreads(data);
      } catch (err: any) {
        setError(err.message ?? "Failed to load mailbox threads");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [roleLabel]);

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

      {loading && (
        <p className="text-sm text-muted-foreground">Loading threads…</p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && (
        <SimpleTable columns={["Subject", "From", "Scope", "Updated", "Status"]}>
          {threads.map((thread) => (
            <SimpleTableRow
              key={thread.id}
              // later: onClick can navigate to a thread detail/email client
              className="cursor-pointer hover:bg-slate-900/40"
            >
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
      )}
    </div>
  );
}
