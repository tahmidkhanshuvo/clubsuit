// src/features/communication/chat/PanelChatPage.tsx
"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ChatGroup,
  ChatMessage,
  fetchMyChatGroups,
  fetchGroupMessages,
  sendChatMessage,
} from "../api/mockChatApi";

type PanelChatPageProps = {
  roleLabel?: string;
};

export function PanelChatPage({ roleLabel }: PanelChatPageProps) {
  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  // load groups on mount
  useEffect(() => {
    const load = async () => {
      try {
        setGroupsLoading(true);
        setGroupsError(null);
        const data = await fetchMyChatGroups();
        setGroups(data);
        if (!activeGroupId && data.length > 0) {
          setActiveGroupId(data[0].id);
        }
      } catch (err: any) {
        setGroupsError(err.message ?? "Failed to load chat groups");
      } finally {
        setGroupsLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load messages when active group changes
  useEffect(() => {
    if (!activeGroupId) return;

    const load = async () => {
      try {
        setMessagesLoading(true);
        setMessagesError(null);
        const data = await fetchGroupMessages(activeGroupId);
        setMessages(data);
      } catch (err: any) {
        setMessagesError(err.message ?? "Failed to load messages");
      } finally {
        setMessagesLoading(false);
      }
    };

    load();
  }, [activeGroupId]);

  const handleSend = async () => {
    if (!activeGroupId || !newMessage.trim()) return;

    try {
      setSending(true);
      const created = await sendChatMessage(activeGroupId, newMessage.trim());
      setMessages((prev) => [...prev, created]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const activeGroup = groups.find((g) => g.id === activeGroupId) ?? null;

  return (
    <div className="space-y-4">
      <PageHeader
        title={roleLabel ? `${roleLabel} chat` : "Panel Chat"}
        description="Chat with your team, executive committee, and custom groups."
      />

      <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-4 h-[70vh]">
        {/* Groups list */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Your Groups</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-2">
            {groupsLoading && (
              <p className="text-sm text-muted-foreground">Loading groups…</p>
            )}
            {groupsError && (
              <p className="text-sm text-destructive">{groupsError}</p>
            )}
            {!groupsLoading && groups.length === 0 && (
              <p className="text-sm text-muted-foreground">
                You don&apos;t have any chat groups yet.
              </p>
            )}

            <div className="space-y-1">
              {groups.map((group) => {
                const isActive = group.id === activeGroupId;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveGroupId(group.id)}
                    className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition 
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <span>{group.name}</span>
                    {group.unreadCount && group.unreadCount > 0 && (
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-2 text-xs ${
                          isActive
                            ? "bg-primary-foreground text-primary"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {group.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">
              {activeGroup ? activeGroup.name : "No group selected"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3">
            <div className="flex-1 overflow-y-auto border rounded-md p-3 space-y-2 bg-muted/30">
              {messagesLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading messages…
                </p>
              )}
              {messagesError && (
                <p className="text-sm text-destructive">{messagesError}</p>
              )}
              {!messagesLoading && !activeGroup && (
                <p className="text-sm text-muted-foreground">
                  Select a group to start chatting.
                </p>
              )}
              {!messagesLoading && activeGroup && messages.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No messages yet. Start the conversation!
                </p>
              )}

              {messages.map((msg) => {
                const mine = msg.isMine ?? false;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] mb-1 ${
                      mine ? "ml-auto items-end" : "items-start"
                    }`}
                  >
                    <div className="text-[11px] text-muted-foreground mb-1">
                      {msg.senderName} •{" "}
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm ${
                        mine
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex flex-col gap-2"
            >
              <Textarea
                placeholder={
                  activeGroup
                    ? `Message ${activeGroup.name}…`
                    : "Select a group to start chatting…"
                }
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={!activeGroup || sending}
                className="min-h-[60px]"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="submit"
                  disabled={!activeGroup || !newMessage.trim() || sending}
                >
                  {sending ? "Sending…" : "Send"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
