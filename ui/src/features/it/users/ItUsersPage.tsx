// src/features/it/users/ItUsersPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";

const mockUsers = [
  {
    id: "1",
    name: "Example IT Admin",
    email: "it.admin@austrc.com",
    systemRole: "IT",
    clubRole: "Tech Lead",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Example Admin",
    email: "admin@austrc.com",
    systemRole: "ADMIN",
    clubRole: "General Secretary",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Example Member",
    email: "member@austrc.com",
    systemRole: "USER",
    clubRole: "RnD Member",
    status: "inactive" as const,
  },
];

export function ItUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="View all AUSTRC accounts, adjust IT/Admin access, and keep the system clean."
        actions={
          <Button variant="outline" disabled>
            Add user (coming soon)
          </Button>
        }
      />

      <SimpleTable
        columns={["Name", "Email", "System role", "Club role", "Status"]}
      >
        {mockUsers.map((user) => (
          <SimpleTableRow key={user.id}>
            <SimpleTableCell>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-50">
                  {user.name}
                </span>
                <span className="text-[11px] text-slate-500">
                  ID: {user.id}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {user.email}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill tone={user.systemRole === "IT" ? "success" : "muted"}>
                {user.systemRole}
              </StatusPill>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {user.clubRole}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={
                  user.status === "active"
                    ? "success"
                    : user.status === "inactive"
                    ? "warning"
                    : "muted"
                }
              >
                {user.status === "active" ? "Active" : "Inactive"}
              </StatusPill>
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
