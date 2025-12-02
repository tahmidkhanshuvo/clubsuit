// src/app/admin/panels/page.tsx
import type { Metadata } from "next";
import { AdminPanelsPage } from "@/features/admin/panels/AdminPanelsPage";

export const metadata: Metadata = {
  title: "Admin Console – Panels & Teams | AUSTRC",
};

export default function Page() {
  return <AdminPanelsPage />;
}
