// src/features/it/users/ItUsersPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  UsersTable,
  type UserRecord,
} from "@/features/users/components/UsersTable";

const demoUsers: UserRecord[] = [
  {
    id: "IT-001",
    name: "Example IT Admin",
    email: "it.admin@austrc.com",
    systemRole: "IT",
    clubRole: "Tech Lead",
    status: "active",
    eventsParticipated: 12,
  },
  {
    id: "AD-001",
    name: "Example Admin",
    email: "admin@austrc.com",
    systemRole: "ADMIN",
    clubRole: "General Secretary",
    status: "active",
    eventsParticipated: 18,
  },
  {
    id: "EX-001",
    name: "Executive Lead",
    email: "exec.lead@austrc.com",
    systemRole: "EXECUTIVE",
    clubRole: "Vice President",
    status: "active",
    eventsParticipated: 25,
  },
  {
    id: "MB-001",
    name: "Core RnD Member",
    email: "rnd.member@austrc.com",
    systemRole: "USER",
    clubRole: "RnD Member",
    status: "active",
    eventsParticipated: 9,
  },
  {
    id: "MB-002",
    name: "Inactive Volunteer",
    email: "volunteer.inactive@austrc.com",
    systemRole: "USER",
    clubRole: "Event Volunteer",
    status: "inactive",
    eventsParticipated: 4,
  },
  {
    id: "MB-003",
    name: "New Member (pending)",
    email: "new.member@austrc.com",
    systemRole: "USER",
    clubRole: "Unassigned",
    status: "pending",
    eventsParticipated: 0,
  },
  {
    id: "MB-004",
    name: "Workshop Participant (pending)",
    email: "pending.workshop@austrc.com",
    systemRole: "USER",
    clubRole: "Unassigned",
    status: "pending",
    eventsParticipated: 1,
  },
  {
    id: "MB-005",
    name: "Banned Member",
    email: "banned.member@austrc.com",
    systemRole: "USER",
    clubRole: "Former Volunteer",
    status: "banned",
    eventsParticipated: 2,
  },
];

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

      <UsersTable users={demoUsers} variant="it" />
    </div>
  );
}
