// src/features/users/UserDetailsPage.tsx
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import type { UserDetails } from "@/features/users/demoUsers";
import { UserDetailsView } from "@/features/users/components/UserDetailsView";

type UserDetailsPageProps = {
  user: UserDetails;
  context: "it" | "admin";
};

export function UserDetailsPage({ user, context }: UserDetailsPageProps) {
  const backHref = context === "it" ? "/it/users" : "/admin/users";

  return (
    <div className="space-y-6">
      <PageHeader
        title="User details"
        description="Review account information, AUSTRC roles, and activity for this user."
        actions={
          <div className="flex gap-2">
            <Link href={backHref}>
              <Button variant="outline">Back to users</Button>
            </Link>
            <Button variant="outline" disabled>
              Edit details (soon)
            </Button>
          </div>
        }
      />
      <UserDetailsView user={user} context={context} />
    </div>
  );
}
