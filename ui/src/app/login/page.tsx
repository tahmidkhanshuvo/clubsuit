// src/app/login/page.tsx
import type { Metadata } from "next";
import { PublicShell } from "@/components/public/public-shell";
import { LoginPage } from "@/features/auth/LoginPage";

export const metadata: Metadata = {
  title: "Login | AUSTRC",
  description: "Login page for AUSTRC internal consoles.",
};

export default function Page() {
  return (
    <PublicShell>
      <LoginPage />
    </PublicShell>
  );
}
