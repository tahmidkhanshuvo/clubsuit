// src/app/page.tsx
import type { Metadata } from "next";
import { PublicShell } from "@/components/public/public-shell";
import { HomePage, homeMetadata } from "@/features/public/home/HomePage";

export const metadata: Metadata = homeMetadata;

export default function Page() {
  return (
    <PublicShell>
      <HomePage />
    </PublicShell>
  );
}
