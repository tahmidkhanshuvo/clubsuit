// src/app/executive/certificates/page.tsx
import type { Metadata } from "next";
import { ExecutiveCertificatesPage } from "@/features/executive/certificates/ExecutiveCertificatesPage";

export const metadata: Metadata = {
  title: "Executive Console – Certificates | AUSTRC",
};

export default function Page() {
  return <ExecutiveCertificatesPage />;
}
