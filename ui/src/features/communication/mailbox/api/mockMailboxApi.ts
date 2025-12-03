// src/features/communication/mailbox/api/mockMailboxApi.ts

export type MailboxThread = {
  id: string;
  subject: string;
  from: string;
  scope: string;
  unread: boolean;
  updatedAt: string;
};

const mockThreads: MailboxThread[] = [
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

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Later this will call your real backend:
 *   GET /api/mailbox?roleLabel=IT
 */
export async function fetchMailboxThreadsForRole(
  roleLabel: string
): Promise<MailboxThread[]> {
  await wait(150);

  // You can filter per role here if you want:
  // for now, just return all mock threads
  return mockThreads;
}
