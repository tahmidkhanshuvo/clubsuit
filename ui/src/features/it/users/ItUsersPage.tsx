// src/features/it/users/ItUsersPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import { UsersTable } from "@/features/users/components/UsersTable";
import { getDemoUsersForContext } from "@/features/users/demoUsers";

const users = getDemoUsersForContext("it");

export function ItUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="View all AUSTRC accounts, verify logins, and manage IT/Admin access."
      />
      <UsersTable users={users} variant="it" />
    </div>
  );
}
