// src/features/admin/users/AdminUsersPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import { UsersTable } from "@/features/users/components/UsersTable";
import { getDemoUsersForContext } from "@/features/users/demoUsers";

const users = getDemoUsersForContext("admin");

export function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Admin view of AUSTRC accounts, verification, and member status."
      />
      <UsersTable users={users} variant="admin" />
    </div>
  );
}
