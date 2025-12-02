// src/features/admin/users/AdminUsersPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  UsersTable,
} from "@/features/users/components/UsersTable";
import { getDemoUsersForContext } from "@/features/users/demoUsers";

const adminUsers = getDemoUsersForContext("admin");

export function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users (admin view)"
        description="See members, volunteers, alumni, and executives. Admins manage operations; IT controls system access."
        actions={
          <Button variant="outline" disabled>
            Add user (coming soon)
          </Button>
        }
      />

      <UsersTable users={adminUsers} variant="admin" />
    </div>
  );
}
