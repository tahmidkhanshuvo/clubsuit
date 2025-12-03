// src/app/admin/content/page.tsx
import type { Metadata } from "next";
import { AdminContentPage } from "@/features/content/AdminContentPage";

export const metadata: Metadata = {
  title: "Admin Console – Content | AUSTRC",
};

export default function Page() {
  return <AdminContentPage />;
}
