// src/app/it/page.tsx
import type { Metadata } from "next";
import {
  ItDashboardPage,
  itDashboardMetadata,
} from "@/features/dashboard/ItDashboardPage";

export const metadata: Metadata = itDashboardMetadata;

export default function Page() {
  return <ItDashboardPage />;
}
