// src/app/it/users/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDemoUserById } from "@/features/users/demoUsers";
import { UserDetailsPage } from "@/features/users/UserDetailsPage";

export const metadata: Metadata = {
  title: "IT Console – User details | AUSTRC",
};

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  const user = getDemoUserById(params.id);

  if (!user) {
    notFound();
  }

  return <UserDetailsPage user={user} context="it" />;
}
