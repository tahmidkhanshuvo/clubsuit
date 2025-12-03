// src/app/it/panels/page.tsx
import type { Metadata } from "next";
import { ItPanelsPage } from "@/features/panels/ItPanelsPage";

export const metadata: Metadata = {
  title: "IT Console – Panels & Teams | AUSTRC",
};

export default function Page() {
  return <ItPanelsPage />;
}
