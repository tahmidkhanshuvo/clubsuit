// src/app/about/page.tsx
import type { Metadata } from "next";
import { PublicShell } from "@/components/public/public-shell";
import { AboutPage } from "@/features/public/about/AboutPage";

export const metadata: Metadata = {
  title: "About AUSTRC | AUST Robotics Club",
  description:
    "Learn about Ahsanullah University of Science & Technology Robotics Club (AUSTRC).",
};

export default function Page() {
  return (
    <PublicShell>
      <AboutPage />
    </PublicShell>
  );
}
