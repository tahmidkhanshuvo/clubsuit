// src/app/member/page.tsx
import type { Metadata } from "next";
import {
  MemberDashboardPage,
  memberDashboardMetadata,
} from "@/features/dashboard/MemberDashboardPage";

export const metadata: Metadata = memberDashboardMetadata;

export default function Page() {
  return <MemberDashboardPage />;
}
