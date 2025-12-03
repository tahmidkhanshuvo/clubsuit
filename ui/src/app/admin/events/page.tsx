// src/app/admin/events/page.tsx
import type { Metadata } from "next";
import { AdminEventsPage } from "@/features/events/AdminEventsPage";

export const metadata: Metadata = {
  title: "Admin Console – Events | AUSTRC",
};

export default function Page() {
  return <AdminEventsPage />;
}
