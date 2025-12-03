// src/app/executive/tasks/page.tsx
import type { Metadata } from "next";
import { ExecutiveTasksPage } from "@/features/events/ExecutiveTasksPage";

export const metadata: Metadata = {
  title: "Executive Console – Tasks | AUSTRC",
};

export default function Page() {
  return <ExecutiveTasksPage />;
}
