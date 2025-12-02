// src/app/it/events/page.tsx
import type { Metadata } from "next";
import { ItEventsPage } from "@/features/it/events/ItEventsPage";

export const metadata: Metadata = {
  title: "IT Console – Events | AUSTRC",
};

export default function Page() {
  return <ItEventsPage />;
}
