// src/features/communication/messages/MessagesPage.tsx
"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";
import {
  ChannelSummary,
  DirectMessageSummary,
  fetchChannelsForRole,
  fetchDirectMessagesForRole,
} from "./api/mockMessagesApi";

type MessagesPageProps = {
  roleLabel: string; // e.g. "IT", "Admin", "Member", "Executive"
};

export function MessagesPage({ roleLabel }: MessagesPageProps) {
  const [directMessages, setDirectMessages] = useState<DirectMessageSummary[]>(
    []
  );
  const [channels, setChannels] = useState<ChannelSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [dmData, channelData] = await Promise.all([
          fetchDirectMessagesForRole(roleLabel),
          fetchChannelsForRole(roleLabel),
        ]);
        setDirectMessages(dmData);
        setChannels(channelData);
      } catch (err: any) {
        setError(err.message ?? "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [roleLabel]);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${roleLabel} messages`}
        description="Direct messages and team channels. Later this can be replaced by a real-time chat system."
      />

      {loading && (
        <p className="text-sm text-muted-foreground">Loading messages…</p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Direct messages */}
      {!loading && !error && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Direct messages
          </h2>
          <SimpleTable
            columns={["Person", "Last message", "Updated", "Status"]}
          >
            {directMessages.map((dm) => (
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
      )}

      {/* Team channels */}
      {!loading && !error && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Team channels
          </h2>
          <SimpleTable
            columns={["Channel", "Last message", "Updated", "Status"]}
          >
            {channels.map((ch) => (
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
      )}
    </div>
  );
}
