// src/app/member/certificates/page.tsx
import type { Metadata } from "next";
import { MemberCertificatesPage } from "@/features/member/certificates/MemberCertificatesPage";

export const metadata: Metadata = {
  title: "Member Console – Certificates | AUSTRC",
};

export default function Page() {
  return <MemberCertificatesPage />;
}
