// src/app/executive/events/page.tsx
import type { Metadata } from "next";
import { ExecutiveEventsPage } from "@/features/executive/events/ExecutiveEventsPage";

export const metadata: Metadata = {
  title: "Executive Console – Events I manage | AUSTRC",
};

export default function Page() {
  return <ExecutiveEventsPage />;
}
