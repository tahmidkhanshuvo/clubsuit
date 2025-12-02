// src/features/panels/components/PanelsTeamsOverview.tsx
"use client";

import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";

export type PanelStatus = "active" | "archived";

export type PanelRecord = {
  id: string;
  name: string;
  role: string;
  members: number;
  term: string;
  status: PanelStatus;
};

export type TeamStatus = "active" | "inactive";

export type TeamRecord = {
  id: string;
  name: string;
  members: number;
  status: TeamStatus;
  lead?: string;
  keyRoles?: string[]; // e.g. ["GS", "VP", "SE", "SSE"]
};

type PanelsTeamsOverviewProps = {
  panels: PanelRecord[];
  teams: TeamRecord[];
  /**
   * "it" | "admin" – both can edit structure eventually.
   * Variant is here in case we want to differ later.
   */
  variant?: "it" | "admin";
};

export function PanelsTeamsOverview({
  panels,
  teams,
  variant = "it",
}: PanelsTeamsOverviewProps) {
  const activePanels = panels.filter((p) => p.status === "active").length;
  const activeTeams = teams.filter((t) => t.status === "active").length;
  const canEdit = variant === "it" || variant === "admin";

  return (
    <div className="space-y-6">
      {/* PANELS */}
      <section className="rounded-xl border border-slate-800 bg-slate-950/60 shadow-sm overflow-hidden">
        <div className="border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                Panels
              </h2>
              <span className="text-[11px] text-slate-500">
                {activePanels} active / {panels.length} total
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Yearly executive panels that group teams and club leadership.
            </p>
          </div>

          {canEdit && (
            <Button variant="outline" disabled className="h-7 px-2 text-[11px]">
              Manage panels (soon)
            </Button>
          )}
        </div>

        <div className="px-3 pb-3 pt-2">
          <SimpleTable
            columns={["Panel", "Role", "Members", "Term", "Status", "Actions"]}
          >
            {panels.map((panel) => (
              <SimpleTableRow key={panel.id}>
                <SimpleTableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-50">
                      {panel.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ID: {panel.id}
                    </span>
                  </div>
                </SimpleTableCell>

                <SimpleTableCell className="text-slate-300">
                  {panel.role}
                </SimpleTableCell>

                <SimpleTableCell className="text-slate-300">
                  {panel.members}
                </SimpleTableCell>

                <SimpleTableCell className="text-slate-300">
                  {panel.term}
                </SimpleTableCell>

                <SimpleTableCell>
                  <StatusPill
                    tone={panel.status === "active" ? "success" : "muted"}
                  >
                    {panel.status === "active" ? "Active" : "Archived"}
                  </StatusPill>
                </SimpleTableCell>

                <SimpleTableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      className="h-7 px-2 text-[11px]"
                    >
                      View
                    </Button>
                    {canEdit && (
                      <Button
                        variant="outline"
                        disabled
                        className="h-7 px-2 text-[11px]"
                      >
                        Edit (soon)
                      </Button>
                    )}
                  </div>
                </SimpleTableCell>
              </SimpleTableRow>
            ))}
          </SimpleTable>
        </div>
      </section>

      {/* TEAMS */}
      <section className="rounded-xl border border-slate-800 bg-slate-950/60 shadow-sm overflow-hidden">
        <div className="border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                Teams
              </h2>
              <span className="text-[11px] text-slate-500">
                {activeTeams} active / {teams.length} total
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Functional teams with internal roles like GS, VP, SE, SSE.
            </p>
          </div>

          {canEdit && (
            <Button variant="outline" disabled className="h-7 px-2 text-[11px]">
              Manage teams (soon)
            </Button>
          )}
        </div>

        <div className="px-3 pb-3 pt-2">
          <SimpleTable columns={["Team", "Members", "Status", "Actions"]}>
            {teams.map((team) => (
              <SimpleTableRow key={team.id}>
                <SimpleTableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-50">
                      {team.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ID: {team.id}
                    </span>
                    {(team.lead || team.keyRoles?.length) && (
                      <span className="mt-0.5 text-[11px] text-slate-500">
                        {team.lead && <>Lead: {team.lead}</>}
                        {team.lead && team.keyRoles?.length ? " • " : null}
                        {team.keyRoles?.length
                          ? `Roles: ${team.keyRoles.join(", ")}`
                          : null}
                      </span>
                    )}
                  </div>
                </SimpleTableCell>

                <SimpleTableCell className="text-slate-300">
                  {team.members}
                </SimpleTableCell>

                <SimpleTableCell>
                  <StatusPill
                    tone={team.status === "active" ? "success" : "muted"}
                  >
                    {team.status === "active" ? "Active" : "Inactive"}
                  </StatusPill>
                </SimpleTableCell>

                <SimpleTableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      className="h-7 px-2 text-[11px]"
                    >
                      View
                    </Button>
                    {canEdit && (
                      <Button
                        variant="outline"
                        disabled
                        className="h-7 px-2 text-[11px]"
                      >
                        Edit (soon)
                      </Button>
                    )}
                  </div>
                </SimpleTableCell>
              </SimpleTableRow>
            ))}
          </SimpleTable>
        </div>
      </section>
    </div>
  );
}
