// src/app/member/mailbox/page.tsx
import type { Metadata } from "next";
import { MailboxPage } from "@/features/communication/mailbox/MailboxPage";

export const metadata: Metadata = {
  title: "Member Console – Mailbox | AUSTRC",
};

export default function Page() {
  return <MailboxPage roleLabel="Member" />;
}
