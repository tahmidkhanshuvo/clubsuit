// src/app/admin/messages/page.tsx
import type { Metadata } from "next";
import { MessagesPage } from "@/features/communication/messages/MessagesPage";

export const metadata: Metadata = {
  title: "Admin Console – Messages | AUSTRC",
};

export default function Page() {
  return <MessagesPage roleLabel="Admin" />;
}
