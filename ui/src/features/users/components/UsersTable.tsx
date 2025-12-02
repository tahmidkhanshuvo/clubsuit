// src/features/users/components/UsersTable.tsx
"use client";

import { useMemo, useState, ChangeEvent } from "react";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export type UserStatus = "pending" | "active" | "inactive" | "banned";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  systemRole: "IT" | "ADMIN" | "USER" | "EXECUTIVE";
  clubRole?: string;
  status: UserStatus;
  eventsParticipated?: number;
};

type UsersTableProps = {
  users: UserRecord[];
  /**
   * Controls which actions are visible.
   * - "it": can see Reset password.
   * - "admin": no Reset password.
   */
  variant?: "it" | "admin";
};

const statusFilters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "banned", label: "Banned" },
] as const;

type StatusFilterValue = (typeof statusFilters)[number]["value"];

function getStatusLabel(status: UserStatus) {
  switch (status) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "pending":
      return "Pending verification";
    case "banned":
      return "Banned";
  }
}

function getStatusTone(status: UserStatus): "success" | "warning" | "muted" {
  switch (status) {
    case "active":
      return "success";
    case "pending":
    case "banned":
      return "warning";
    case "inactive":
    default:
      return "muted";
  }
}

function getRoleTone(
  role: UserRecord["systemRole"]
): "success" | "warning" | "muted" {
  switch (role) {
    case "IT":
      return "success";
    case "ADMIN":
    case "EXECUTIVE":
      return "warning";
    case "USER":
    default:
      return "muted";
  }
}

export function UsersTable({ users, variant = "it" }: UsersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilterValue>("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        q.length === 0 ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ? true : user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const total = users.length;
  const filteredCount = filteredUsers.length;
  const showResetPassword = variant === "it";

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60 shadow-sm overflow-hidden">
      {/* Header / summary */}
      <div className="border-b border-slate-800 px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-xs font-semibold text-slate-100 tracking-wide">
              All users
            </h2>
            <span className="text-[11px] text-slate-500">
              {filteredCount}/{total}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Verify new logins, review roles, and keep AUSTRC accounts healthy.
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-2">
            <Search className="h-3.5 w-3.5 text-slate-500" />
            <input
              value={search}
              onChange={handleSearchChange}
              placeholder="Search name or email"
              className="h-7 w-full border-0 bg-transparent px-1 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Status filter chips */}
      <div className="border-b border-slate-800 px-4 py-2 flex flex-wrap gap-1.5">
        {statusFilters.map((filter) => {
          const isActive = statusFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] border transition",
                isActive
                  ? "border-slate-300 bg-slate-100 text-slate-900"
                  : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="px-3 py-3">
        <SimpleTable
          columns={[
            "Name",
            "Email",
            "System role",
            "Club role",
            "Events",
            "Status",
            "Actions",
          ]}
        >
          {filteredUsers.map((user) => (
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
                <StatusPill tone={getRoleTone(user.systemRole)}>
                  {user.systemRole}
                </StatusPill>
              </SimpleTableCell>

              <SimpleTableCell className="text-slate-300">
                {user.clubRole ?? <span className="text-slate-500">—</span>}
              </SimpleTableCell>

              <SimpleTableCell className="text-slate-300">
                {typeof user.eventsParticipated === "number" ? (
                  <span className="text-xs">
                    {user.eventsParticipated}{" "}
                    <span className="text-[10px] text-slate-500">
                      events
                    </span>
                  </span>
                ) : (
                  <span className="text-slate-500 text-xs">N/A</span>
                )}
              </SimpleTableCell>

              <SimpleTableCell>
                <StatusPill tone={getStatusTone(user.status)}>
                  {getStatusLabel(user.status)}
                </StatusPill>
              </SimpleTableCell>

              <SimpleTableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {/* Details always available */}
                  <Button
                    variant="ghost"
                    className="h-7 px-2 text-[11px]"
                  >
                    Details
                  </Button>

                  {/* Verify / Ban / Unban – wired later */}
                  {user.status === "pending" && (
                    <Button
                      variant="outline"
                      disabled
                      className="h-7 px-2 text-[11px]"
                    >
                      Verify (soon)
                    </Button>
                  )}

                  {user.status === "active" && (
                    <Button
                      variant="outline"
                      disabled
                      className="h-7 px-2 text-[11px]"
                    >
                      Ban (soon)
                    </Button>
                  )}

                  {user.status === "banned" && (
                    <Button
                      variant="outline"
                      disabled
                      className="h-7 px-2 text-[11px]"
                    >
                      Unban (soon)
                    </Button>
                  )}

                  {/* IT-only */}
                  {showResetPassword && (
                    <Button
                      variant="ghost"
                      disabled
                      className="h-7 px-2 text-[11px] text-slate-400 hover:text-slate-300"
                    >
                      Reset password
                    </Button>
                  )}
                </div>
              </SimpleTableCell>
            </SimpleTableRow>
          ))}
        </SimpleTable>
      </div>
    </section>
  );
}
