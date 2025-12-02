// src/app/it/mailbox/page.tsx
import type { Metadata } from "next";
import { MailboxPage } from "@/features/communication/mailbox/MailboxPage";

export const metadata: Metadata = {
  title: "IT Console – Mailbox | AUSTRC",
};

export default function Page() {
  return <MailboxPage roleLabel="IT" />;
}
