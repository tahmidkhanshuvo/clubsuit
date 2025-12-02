// src/features/executive/teams/ExecutiveTeamsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";

const mockPanel = [
  {
    id: "panel-2025",
    name: "Executive Panel 2025",
    role: "Panel Member – Events",
    term: "2025",
    status: "active" as const,
  },
];

const mockTeams = [
  {
    id: "team-rnd",
    name: "RnD Team",
    position: "Advisor",
    members: 25,
    status: "active" as const,
  },
  {
    id: "team-msm",
    name: "Media & Social Media",
    position: "Coordinator",
    members: 18,
    status: "active" as const,
  },
];

export function ExecutiveTeamsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My teams & panel"
        description="Panels and functional teams where you hold an executive role."
      />

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Panel
        </h2>
        <SimpleTable columns={["Panel", "Your role", "Term", "Status"]}>
          {mockPanel.map((panel) => (
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
                {panel.term}
              </SimpleTableCell>
              <SimpleTableCell>
                <StatusPill tone="success">Active</StatusPill>
              </SimpleTableCell>
            </SimpleTableRow>
          ))}
        </SimpleTable>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Functional teams
        </h2>
        <SimpleTable columns={["Team", "Position", "Members", "Status"]}>
          {mockTeams.map((team) => (
            <SimpleTableRow key={team.id}>
              <SimpleTableCell>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-50">
                    {team.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ID: {team.id}
                  </span>
                </div>
              </SimpleTableCell>
              <SimpleTableCell className="text-slate-300">
                {team.position}
              </SimpleTableCell>
              <SimpleTableCell align="center">
                {team.members}
              </SimpleTableCell>
              <SimpleTableCell>
                <StatusPill tone="success">Active</StatusPill>
              </SimpleTableCell>
            </SimpleTableRow>
          ))}
        </SimpleTable>
      </div>
    </div>
  );
}
