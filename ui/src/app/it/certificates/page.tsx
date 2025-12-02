// src/app/it/certificates/page.tsx
import type { Metadata } from "next";
import { ItCertificatesPage } from "@/features/it/certificates/ItCertificatesPage";

export const metadata: Metadata = {
  title: "IT Console – Certificates | AUSTRC",
};

export default function Page() {
  return <ItCertificatesPage />;
}
