// src/features/communication/chat/api/mockChatApi.ts

export type ChatGroup = {
  id: string;
  name: string;
  type: "TEAM" | "EXEC_PANEL" | "CORE_PANEL" | "CUSTOM";
  unreadCount?: number;
};

export type ChatMessage = {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isMine?: boolean;
};

// ---- Mock data store ----

// In a real app, these would come from your backend / chat provider.
let groups: ChatGroup[] = [
  {
    id: "group-core",
    name: "Core Panel",
    type: "CORE_PANEL",
    unreadCount: 2,
  },
  {
    id: "group-exec",
    name: "Executive Panel",
    type: "EXEC_PANEL",
    unreadCount: 0,
  },
  {
    id: "group-rnd",
    name: "RnD Team",
    type: "TEAM",
    unreadCount: 4,
  },
];

let messagesByGroup: Record<string, ChatMessage[]> = {
  "group-core": [
    {
      id: "m1",
      groupId: "group-core",
      senderId: "u1",
      senderName: "President",
      content: "Reminder: meeting at 8 PM tonight.",
      createdAt: new Date().toISOString(),
      isMine: false,
    },
    {
      id: "m2",
      groupId: "group-core",
      senderId: "u2",
      senderName: "You",
      content: "Got it, I will be there.",
      createdAt: new Date().toISOString(),
      isMine: true,
    },
  ],
  "group-exec": [
    {
      id: "m3",
      groupId: "group-exec",
      senderId: "u3",
      senderName: "General Secretary",
      content: "Please update the volunteer list for Robo Carnival.",
      createdAt: new Date().toISOString(),
      isMine: false,
    },
  ],
  "group-rnd": [
    {
      id: "m4",
      groupId: "group-rnd",
      senderId: "u4",
      senderName: "RnD Lead",
      content: "New line follower bot design is ready!",
      createdAt: new Date().toISOString(),
      isMine: false,
    },
  ],
};

// Simulate network delay
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ---- Public API-like functions ----

export async function fetchMyChatGroups(): Promise<ChatGroup[]> {
  await wait(150);
  // later: fetch("/api/chat/groups/mine")
  return groups;
}

export async function fetchGroupMessages(
  groupId: string
): Promise<ChatMessage[]> {
  await wait(150);
  // later: fetch(`/api/chat/groups/${groupId}/messages`)
  return messagesByGroup[groupId] ?? [];
}

export async function sendChatMessage(
  groupId: string,
  content: string
): Promise<ChatMessage> {
  await wait(120);
  // later: POST to backend, which returns the created message
  const msg: ChatMessage = {
    id: `local-${Date.now()}`,
    groupId,
    senderId: "current-user",
    senderName: "You",
    content,
    createdAt: new Date().toISOString(),
    isMine: true,
  };

  messagesByGroup[groupId] = [...(messagesByGroup[groupId] ?? []), msg];

  // reduce unread count locally
  groups = groups.map((g) =>
    g.id === groupId ? { ...g, unreadCount: 0 } : g
  );

  return msg;
}
