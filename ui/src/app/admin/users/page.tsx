// src/app/admin/users/page.tsx
import type { Metadata } from "next";
import { AdminUsersPage } from "@/features/admin/users/AdminUsersPage";

export const metadata: Metadata = {
  title: "Admin Console – Users | AUSTRC",
};

export default function Page() {
  return <AdminUsersPage />;
}
