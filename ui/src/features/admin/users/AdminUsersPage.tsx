// src/features/admin/users/AdminUsersPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  UsersTable,
  type UserRecord,
} from "@/features/users/components/UsersTable";

const demoAdminUsers: UserRecord[] = [
  {
    id: "MB-101",
    name: "Example Member",
    email: "member@austrc.com",
    systemRole: "USER",
    clubRole: "Member",
    status: "active",
    eventsParticipated: 3,
  },
  {
    id: "VL-201",
    name: "Example Volunteer",
    email: "volunteer@austrc.com",
    systemRole: "USER",
    clubRole: "Volunteer",
    status: "active",
    eventsParticipated: 5,
  },
  {
    id: "AL-301",
    name: "Example Alumni",
    email: "alumni@austrc.com",
    systemRole: "USER",
    clubRole: "Alumni",
    status: "inactive",
    eventsParticipated: 7,
  },
  {
    id: "MB-102",
    name: "New Member (pending)",
    email: "new.member@austrc.com",
    systemRole: "USER",
    clubRole: "Unassigned",
    status: "pending",
    eventsParticipated: 0,
  },
  {
    id: "MB-103",
    name: "Banned User",
    email: "banned.user@austrc.com",
    systemRole: "USER",
    clubRole: "Former Volunteer",
    status: "banned",
    eventsParticipated: 4,
  },
];

export function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users (admin view)"
        description="See members in the context of events and content. Admins manage operations, while IT controls system access."
        actions={
          <Button variant="outline" disabled>
            Add user (coming soon)
          </Button>
        }
      />

      {/* Admin view: no reset-password action */}
      <UsersTable users={demoAdminUsers} variant="admin" />
    </div>
  );
}
