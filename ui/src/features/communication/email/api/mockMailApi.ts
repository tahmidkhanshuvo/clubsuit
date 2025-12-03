// src/features/communication/email/api/mockMailApi.ts

export type MailIdentity = {
  id: string;
  email: string;
  displayName: string;
};

export type MailSummary = {
  id: string;
  identityId: string;
  subject: string;
  from: string;
  preview: string;
  sentAt: string;
  direction: "INCOMING" | "OUTGOING";
  isRead: boolean;
};

export type MailMessage = MailSummary & {
  to: string[];
  bodyText?: string;
};

let identities: MailIdentity[] = [
  {
    id: "id-it",
    email: "it@austrc.com",
    displayName: "IT Panel",
  },
  {
    id: "id-events",
    email: "events@austrc.com",
    displayName: "Events Panel",
  },
];

let messages: MailMessage[] = [
  {
    id: "mail-1",
    identityId: "id-it",
    subject: "Website access for new EC",
    from: "president@austrc.com",
    to: ["it@austrc.com"],
    preview:
      "Please create admin accounts for the new executive committee...",
    bodyText:
      "Hi IT Panel,\n\nPlease create admin accounts for the new executive committee members.\n\nRegards,\nPresident",
    sentAt: new Date().toISOString(),
    direction: "INCOMING",
    isRead: false,
  },
  {
    id: "mail-2",
    identityId: "id-it",
    subject: "Robo Carnival certificate engine",
    from: "it@austrc.com",
    to: ["president@austrc.com"],
    preview: "Certificate engine is ready for Robo Carnival participants...",
    bodyText:
      "Hello,\n\nThe certificate engine is ready. You can trigger batch generation from the IT dashboard.\n\nThanks,\nIT Panel",
    sentAt: new Date().toISOString(),
    direction: "OUTGOING",
    isRead: true,
  },
  {
    id: "mail-3",
    identityId: "id-events",
    subject: "Workshop room booking",
    from: "events@austrc.com",
    to: ["dept-head@aust.edu"],
    preview: "We would like to book Lab-3 for a workshop...",
    bodyText:
      "Dear Sir,\n\nWe would like to book Lab-3 for a robotics workshop on Friday.\n\nRegards,\nEvents Panel",
    sentAt: new Date().toISOString(),
    direction: "OUTGOING",
    isRead: true,
  },
];

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ---- Public API-like functions ----

export async function fetchMailIdentities(): Promise<MailIdentity[]> {
  await wait(150);
  // later: GET /api/mail/identities
  return identities;
}

export async function fetchMessagesForIdentity(
  identityId: string
): Promise<MailSummary[]> {
  await wait(150);
  // later: GET /api/mail/messages?identityId=...
  return messages.filter((m) => m.identityId === identityId);
}

export async function fetchMessageById(
  id: string
): Promise<MailMessage | null> {
  await wait(120);
  // later: GET /api/mail/messages/:id
  return messages.find((m) => m.id === id) ?? null;
}

export async function sendMail(options: {
  identityId: string;
  to: string[];
  subject: string;
  body: string;
}): Promise<MailMessage> {
  await wait(150);
  // later: POST /api/mail/send
  const fromAddress =
    identities.find((i) => i.id === options.identityId)?.email ??
    "unknown@austrc.com";

  const newMessage: MailMessage = {
    id: `mail-${Date.now()}`,
    identityId: options.identityId,
    subject: options.subject || "(no subject)",
    from: fromAddress,
    to: options.to,
    preview: options.body.slice(0, 80),
    bodyText: options.body,
    sentAt: new Date().toISOString(),
    direction: "OUTGOING",
    isRead: true,
  };

  messages = [newMessage, ...messages];

  return newMessage;
}

export async function markMailAsRead(id: string): Promise<void> {
  await wait(80);
  messages = messages.map((m) =>
    m.id === id ? { ...m, isRead: true } : m
  );
}
