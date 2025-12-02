// src/app/member/registrations/page.tsx
import type { Metadata } from "next";
import { MemberRegistrationsPage } from "@/features/member/registrations/MemberRegistrationsPage";

export const metadata: Metadata = {
  title: "Member Console – My registrations | AUSTRC",
};

export default function Page() {
  return <MemberRegistrationsPage />;
}
