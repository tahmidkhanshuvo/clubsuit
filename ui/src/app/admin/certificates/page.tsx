// src/app/admin/certificates/page.tsx
import type { Metadata } from "next";
import { AdminCertificatesPage } from "@/features/admin/certificates/AdminCertificatesPage";

export const metadata: Metadata = {
  title: "Admin Console – Certificates | AUSTRC",
};

export default function Page() {
  return <AdminCertificatesPage />;
}
