// src/features/it/users/ItUsersPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  UsersTable,
} from "@/features/users/components/UsersTable";
import { getDemoUsersForContext } from "@/features/users/demoUsers";

const itUsers = getDemoUsersForContext("it");

export function ItUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="View all AUSTRC accounts, verify new logins, and keep IT/admin access under control."
        actions={
          <Button variant="outline" disabled>
            Add user (coming soon)
          </Button>
        }
      />

      <UsersTable users={itUsers} variant="it" />
    </div>
  );
}
