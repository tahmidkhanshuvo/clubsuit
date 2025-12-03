// src/app/executive/teams/page.tsx
import type { Metadata } from "next";
import { ExecutiveTeamsPage } from "@/features/panels/ExecutiveTeamsPage";

export const metadata: Metadata = {
  title: "Executive Console – My teams | AUSTRC",
};

export default function Page() {
  return <ExecutiveTeamsPage />;
}
