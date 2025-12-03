// src/app/executive/profile/page.tsx
import type { Metadata } from "next";
import { ExecutiveProfilePage } from "@/features/member/profile/ExecutiveProfilePage";

export const metadata: Metadata = {
  title: "Executive Console – Profile | AUSTRC",
};

export default function Page() {
  return <ExecutiveProfilePage />;
}
