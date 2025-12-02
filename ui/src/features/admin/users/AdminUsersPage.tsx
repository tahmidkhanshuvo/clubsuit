// src/features/admin/users/AdminUsersPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";

const mockUsers = [
  {
    id: "user-1",
    name: "Example Member",
    email: "member@austrc.com",
    role: "Member",
    participatedEvents: 3,
    status: "active" as const,
  },
  {
    id: "user-2",
    name: "Example Volunteer",
    email: "volunteer@austrc.com",
    role: "Volunteer",
    participatedEvents: 5,
    status: "active" as const,
  },
  {
    id: "user-3",
    name: "Example Alumni",
    email: "alumni@austrc.com",
    role: "Alumni",
    participatedEvents: 7,
    status: "inactive" as const,
  },
];

export function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users (admin view)"
        description="See members in the context of events and content. IT has deeper control over system roles; this view is focused on operations."
      />

      <SimpleTable
        columns={[
          "Name",
          "Email",
          "Role",
          "Events participated",
          "Status",
        ]}
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
            <SimpleTableCell className="text-slate-300">
              {user.role}
            </SimpleTableCell>
            <SimpleTableCell align="center">
              {user.participatedEvents}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={user.status === "active" ? "success" : "warning"}
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
