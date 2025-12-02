// src/app/contact/page.tsx
import type { Metadata } from "next";
import { PublicShell } from "@/components/public/public-shell";
import { ContactPage } from "@/features/public/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | AUSTRC",
  description: "Contact information for AUSTRC.",
};

export default function Page() {
  return (
    <PublicShell>
      <ContactPage />
    </PublicShell>
  );
}
