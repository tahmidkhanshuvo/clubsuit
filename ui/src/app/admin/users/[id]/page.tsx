// src/app/admin/users/[id]/page.tsx
import type { Metadata } from "next";
import { getDemoUserById } from "@/features/users/demoUsers";
import { UserDetailsPage } from "@/features/users/UserDetailsPage";

export const metadata: Metadata = {
  title: "Admin Console – User details | AUSTRC",
};

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  const user = getDemoUserById(params.id);

  if (!user) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <h1 className="text-sm font-semibold text-slate-100">
            User not found
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            No demo account exists with ID{" "}
            <span className="font-mono text-slate-200">{params.id}</span>.
            <br />
            Open this page by clicking a user from the Admin “Users” tab.
          </p>
        </div>
      </div>
    );
  }

  return <UserDetailsPage user={user} context="admin" />;
}
