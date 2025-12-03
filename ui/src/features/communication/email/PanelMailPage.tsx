// src/features/communication/email/PanelMailPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MailIdentity,
  MailMessage,
  MailSummary,
  fetchMailIdentities,
  fetchMessageById,
  fetchMessagesForIdentity,
  markMailAsRead,
  sendMail,
} from "../api/mockMailApi";

type PanelMailPageProps = {
  roleLabel?: string;
};

export function PanelMailPage({ roleLabel }: PanelMailPageProps) {
  const [identities, setIdentities] = useState<MailIdentity[]>([]);
  const [identitiesLoading, setIdentitiesLoading] = useState(false);
  const [identitiesError, setIdentitiesError] = useState<string | null>(null);

  const [activeIdentityId, setActiveIdentityId] = useState<string | null>(null);

  const [messages, setMessages] = useState<MailSummary[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);

  const [selectedMessage, setSelectedMessage] = useState<MailMessage | null>(
    null
  );
  const [selectedMessageLoading, setSelectedMessageLoading] = useState(false);

  // compose state
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [sending, setSending] = useState(false);

  // load identities on mount
  useEffect(() => {
    const load = async () => {
      try {
        setIdentitiesLoading(true);
        setIdentitiesError(null);
        const data = await fetchMailIdentities();
        setIdentities(data);
        if (!activeIdentityId && data.length > 0) {
          setActiveIdentityId(data[0].id);
        }
      } catch (err: any) {
        setIdentitiesError(err.message ?? "Failed to load mail identities");
      } finally {
        setIdentitiesLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load messages when identity changes
  useEffect(() => {
    if (!activeIdentityId) return;

    const load = async () => {
      try {
        setMessagesLoading(true);
        setMessagesError(null);
        const list = await fetchMessagesForIdentity(activeIdentityId);
        // newest first
        list.sort(
          (a, b) =>
            new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
        );
        setMessages(list);
        setSelectedMessage(null);
      } catch (err: any) {
        setMessagesError(err.message ?? "Failed to load messages");
      } finally {
        setMessagesLoading(false);
      }
    };

    load();
  }, [activeIdentityId]);

  const activeIdentity = useMemo(
    () => identities.find((i) => i.id === activeIdentityId) ?? null,
    [identities, activeIdentityId]
  );

  const openMessage = async (id: string) => {
    try {
      setSelectedMessageLoading(true);
      const full = await fetchMessageById(id);
      if (!full) return;

      setSelectedMessage(full);
      await markMailAsRead(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedMessageLoading(false);
    }
  };

  const handleSend = async () => {
    if (!activeIdentityId || !composeTo.trim()) return;

    try {
      setSending(true);
      const to = composeTo
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const created = await sendMail({
        identityId: activeIdentityId,
        to,
        subject: composeSubject,
        body: composeBody,
      });

      // update list for current identity
      setMessages((prev) =>
        [{ ...created }, ...prev].sort(
          (a, b) =>
            new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
        )
      );

      // clear compose
      setComposeTo("");
      setComposeSubject("");
      setComposeBody("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title={roleLabel ? `${roleLabel} mailbox` : "Panel Mailbox"}
        description="Send and receive club emails using your AUSTRC identity."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1.4fr)_minmax(0,1.2fr)] gap-4 h-[70vh]">
        {/* Identities */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">From addresses</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-2">
            {identitiesLoading && (
              <p className="text-sm text-muted-foreground">
                Loading identities…
              </p>
            )}
            {identitiesError && (
              <p className="text-sm text-destructive">{identitiesError}</p>
            )}
            {!identitiesLoading && identities.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No mailbox configured for your account.
              </p>
            )}

            <div className="space-y-1">
              {identities.map((identity) => {
                const isActive = identity.id === activeIdentityId;
                return (
                  <button
                    key={identity.id}
                    type="button"
                    onClick={() => {
                      setActiveIdentityId(identity.id);
                      setSelectedMessage(null);
                    }}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="font-medium">{identity.displayName}</div>
                    <div className="text-xs opacity-80">{identity.email}</div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Message list */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">
              {activeIdentity
                ? `Messages (${activeIdentity.email})`
                : "Messages"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-2">
            {messagesLoading && (
              <p className="text-sm text-muted-foreground">
                Loading messages…
              </p>
            )}
            {messagesError && (
              <p className="text-sm text-destructive">{messagesError}</p>
            )}
            {!messagesLoading &&
              activeIdentity &&
              messages.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No messages yet for this identity.
                </p>
              )}

            <div className="space-y-1">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => openMessage(msg.id)}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm transition border ${
                    selectedMessage?.id === msg.id
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      {!msg.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                      <div className="font-medium line-clamp-1">
                        {msg.subject || "(no subject)"}
                      </div>
                    </div>
                    <div className="text-[11px] text-muted-foreground whitespace-nowrap ml-2">
                      {new Date(msg.sentAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {msg.from} • {msg.preview}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message details + compose */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">
              {selectedMessage ? "Message" : "Compose"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3 overflow-y-auto">
            {/* Selected message */}
            {selectedMessage && (
              <div className="border rounded-md p-3 mb-3 bg-muted/30">
                {selectedMessageLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Loading message…
                  </p>
                ) : (
                  <>
                    <div className="text-sm font-semibold mb-1">
                      {selectedMessage.subject || "(no subject)"}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2 space-y-1">
                      <div>From: {selectedMessage.from}</div>
                      <div>To: {selectedMessage.to.join(", ")}</div>
                      <div>
                        Sent:{" "}
                        {new Date(selectedMessage.sentAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-sm whitespace-pre-wrap">
                      {selectedMessage.bodyText ||
                        "No plain text body available."}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Compose area */}
            <div className="border rounded-md p-3 flex-1 flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <div className="font-semibold text-sm">Compose new email</div>
                {activeIdentity && (
                  <div className="text-[11px] text-muted-foreground">
                    From: {activeIdentity.email}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  To (comma-separated)
                </label>
                <Input
                  placeholder="someone@example.com, another@example.com"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  disabled={!activeIdentity || sending}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  Subject
                </label>
                <Input
                  placeholder="Subject"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  disabled={!activeIdentity || sending}
                />
              </div>

              <div className="space-y-1 flex-1 flex flex-col">
                <label className="text-xs text-muted-foreground">Body</label>
                <Textarea
                  className="flex-1 min-h-[120px]"
                  placeholder="Write your email…"
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  disabled={!activeIdentity || sending}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleSend}
                  disabled={
                    !activeIdentity || !composeTo.trim() || sending
                  }
                >
                  {sending ? "Sending…" : "Send email"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
