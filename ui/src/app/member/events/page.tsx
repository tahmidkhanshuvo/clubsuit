// src/app/member/events/page.tsx
import type { Metadata } from "next";
import { MemberEventsPage } from "@/features/member/events/MemberEventsPage";

export const metadata: Metadata = {
  title: "Member Console – Events | AUSTRC",
};

export default function Page() {
  return <MemberEventsPage />;
}
