// src/app/it/settings/page.tsx
import type { Metadata } from "next";
import { ItSettingsPage } from "@/features/it/settings/ItSettingsPage";

export const metadata: Metadata = {
  title: "IT Console – System settings | AUSTRC",
};

export default function Page() {
  return <ItSettingsPage />;
}
