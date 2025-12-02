// src/app/it/users/page.tsx
import type { Metadata } from "next";
import { ItUsersPage } from "@/features/it/users/ItUsersPage";

export const metadata: Metadata = {
  title: "IT Console – Users | AUSTRC",
};

export default function Page() {
  return <ItUsersPage />;
}
