// src/app/member/profile/page.tsx
import type { Metadata } from "next";
import { MemberProfilePage } from "@/features/member/profile/MemberProfilePage";

export const metadata: Metadata = {
  title: "Member Console – Profile | AUSTRC",
};

export default function Page() {
  return <MemberProfilePage />;
}
