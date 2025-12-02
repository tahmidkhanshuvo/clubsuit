// src/app/executive/mailbox/page.tsx
import type { Metadata } from "next";
import { MailboxPage } from "@/features/communication/mailbox/MailboxPage";

export const metadata: Metadata = {
  title: "Executive Console – Mailbox | AUSTRC",
};

export default function Page() {
  return <MailboxPage roleLabel="Executive" />;
}
