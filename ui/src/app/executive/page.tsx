// src/app/executive/page.tsx
import type { Metadata } from "next";
import {
  ExecutiveDashboardPage,
  executiveDashboardMetadata,
} from "@/features/dashboard/ExecutiveDashboardPage";

export const metadata: Metadata = executiveDashboardMetadata;

export default function Page() {
  return <ExecutiveDashboardPage />;
}
