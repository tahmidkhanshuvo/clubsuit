// src/app/events/page.tsx
import type { Metadata } from "next";
import { PublicShell } from "@/components/public/public-shell";
import { EventsListPage } from "@/features/public/events/EventsListPage";

export const metadata: Metadata = {
  title: "Events | AUSTRC",
  description: "See public events organized by AUSTRC.",
};

export default function Page() {
  return (
    <PublicShell>
      <EventsListPage />
    </PublicShell>
  );
}
