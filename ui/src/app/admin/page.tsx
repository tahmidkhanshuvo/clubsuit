// src/app/admin/page.tsx
import type { Metadata } from "next";
import { AdminDashboardPage, adminDashboardMetadata } from "@/features/dashboard/AdminDashboardPage";

export const metadata: Metadata = adminDashboardMetadata;

export default function Page() {
  return <AdminDashboardPage />;
}
