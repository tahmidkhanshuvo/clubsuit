// src/features/users/components/UserDetailsView.tsx
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail, Phone, Shield, Users, Layers } from "lucide-react";
import type { UserDetails } from "@/features/users/demoUsers";

type UserDetailsViewProps = {
  user: UserDetails;
  context: "it" | "admin";
};

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-BD", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

export function UserDetailsView({ user, context }: UserDetailsViewProps) {
  const canResetPassword = context === "it";
  const canBan = context === "it" || context === "admin";
  const isBanned = user.status === "banned";

  return (
    <div className="space-y-4">
      {/* Top layout: identity + account summary */}
      <section className="grid gap-4 md:grid-cols-[minmax(0,2.2fr),minmax(0,2fr)]">
        {/* Identity card */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100">
            {getInitials(user.name)}
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                {user.name}
              </h2>
              <div className="mt-0.5 flex flex-wrap gap-2 text-[11px] text-slate-500">
                <span>ID: {user.id}</span>
                {user.memberType && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2 py-[2px]">
                    <Users className="h-3 w-3" />
                    <span>{user.memberType}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-500" />
                  <span>{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
                <span>Joined: {formatDate(user.joinedAt)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <StatusPill tone="success">
                <span className="inline-flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  {user.systemRole}
                </span>
              </StatusPill>
              {user.clubRole && (
                <StatusPill tone="muted">{user.clubRole}</StatusPill>
              )}
              <StatusPill
                tone={
                  user.status === "active"
                    ? "success"
                    : user.status === "pending"
                    ? "warning"
                    : "muted"
                }
              >
                {user.status === "pending"
                  ? "Pending verification"
                  : user.status === "banned"
                  ? "Banned"
                  : user.status === "inactive"
                  ? "Inactive"
                  : "Active"}
              </StatusPill>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              {canBan && (
                <Button
                  variant="outline"
                  disabled
                  className="h-7 px-2 text-[11px]"
                >
                  {isBanned ? "Unban (soon)" : "Ban (soon)"}
                </Button>
              )}
              {canResetPassword && (
                <Button
                  variant="outline"
                  disabled
                  className="h-7 px-2 text-[11px]"
                >
                  Reset password (IT only)
                </Button>
              )}
              {user.status === "pending" && (
                <Button
                  variant="outline"
                  disabled
                  className="h-7 px-2 text-[11px]"
                >
                  Verify account (soon)
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Account summary */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Account & access
            </h3>
            <div className="mt-2 space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">System role</span>
                <span>{user.systemRole}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Member type</span>
                <span>{user.memberType ?? "—"}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Status</span>
                <span>{user.status}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Last login</span>
                <span>{formatDate(user.lastLoginAt)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Activity snapshot
            </h3>
            <div className="mt-2 space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Events participated</span>
                <span>{user.eventsParticipated ?? 0}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Teams</span>
                <span>{user.teams?.length ?? 0}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Panels</span>
                <span>{user.panels?.length ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teams & panels */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-slate-500" />
            Teams
          </h3>
          <div className="mt-2 space-y-1.5 text-[11px] text-slate-300">
            {user.teams && user.teams.length > 0 ? (
              user.teams.map((team) => (
                <div
                  key={team.id}
                  className="flex flex-col rounded-lg border border-slate-800 bg-slate-950/80 px-2 py-1.5"
                >
                  <span className="font-medium text-slate-50">
                    {team.name}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    ID: {team.id}
                  </span>
                  {team.role && (
                    <span className="mt-0.5 text-[10px] text-slate-400">
                      Role: {team.role}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-[11px] text-slate-500">
                Not assigned to any team yet.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-slate-500" />
            Panels
          </h3>
          <div className="mt-2 space-y-1.5 text-[11px] text-slate-300">
            {user.panels && user.panels.length > 0 ? (
              user.panels.map((panel) => (
                <div
                  key={panel.id}
                  className="flex flex-col rounded-lg border border-slate-800 bg-slate-950/80 px-2 py-1.5"
                >
                  <span className="font-medium text-slate-50">
                    {panel.name}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    ID: {panel.id}
                  </span>
                  <span className="mt-0.5 text-[10px] text-slate-400">
                    {panel.role ?? "Executive"}{" "}
                    {panel.term ? `• Term ${panel.term}` : null}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-slate-500">
                Not part of any panel.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
