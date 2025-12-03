// src/app/it/content/page.tsx
import type { Metadata } from "next";
import { ItContentPage } from "@/features/content/ItContentPage";

export const metadata: Metadata = {
  title: "IT Console – Content | AUSTRC",
};

export default function Page() {
  return <ItContentPage />;
}
