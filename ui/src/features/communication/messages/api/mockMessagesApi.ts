// src/features/communication/messages/api/mockMessagesApi.ts

export type DirectMessageSummary = {
  id: string;
  name: string;
  lastMessage: string;
  updatedAt: string;
  unread: boolean;
};

export type ChannelSummary = {
  id: string;
  name: string;
  lastMessage: string;
  updatedAt: string;
  unread: boolean;
};

const mockDirectMessages: DirectMessageSummary[] = [
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

const mockTeamChannels: ChannelSummary[] = [
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

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Later: GET /api/messages/direct?role=IT
 */
export async function fetchDirectMessagesForRole(
  roleLabel: string
): Promise<DirectMessageSummary[]> {
  await wait(120);
  return mockDirectMessages;
}

/**
 * Later: GET /api/messages/channels?role=IT
 */
export async function fetchChannelsForRole(
  roleLabel: string
): Promise<ChannelSummary[]> {
  await wait(120);
  return mockTeamChannels;
}
