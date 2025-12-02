// src/features/it/panels/ItPanelsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";

const mockPanels = [
  {
    id: "panel-2025",
    name: "Executive Panel 2025",
    role: "Executive",
    members: 14,
    term: "2025",
    status: "active" as const,
  },
  {
    id: "panel-2024",
    name: "Executive Panel 2024",
    role: "Executive",
    members: 13,
    term: "2024",
    status: "archived" as const,
  },
];

const mockTeams = [
  { id: "team-rnd", name: "RnD Team", members: 28, status: "active" as const },
  {
    id: "team-msm",
    name: "Media & Social Media Team",
    members: 18,
    status: "active" as const,
  },
];

export function ItPanelsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Panels & Teams"
        description="Keep the AUSTRC hierarchy clean: panels, roles, and functional teams."
        actions={
          <Button variant="outline" disabled>
            Edit structure (coming soon)
          </Button>
        }
      />

      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Panels
        </h2>
        <SimpleTable
          columns={["Panel", "Role", "Members", "Term", "Status"]}
        >
          {mockPanels.map((panel) => (
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
              <SimpleTableCell align="center">
                {panel.members}
              </SimpleTableCell>
              <SimpleTableCell>{panel.term}</SimpleTableCell>
              <SimpleTableCell>
                <StatusPill
                  tone={panel.status === "active" ? "success" : "muted"}
                >
                  {panel.status === "active" ? "Active" : "Archived"}
                </StatusPill>
              </SimpleTableCell>
            </SimpleTableRow>
          ))}
        </SimpleTable>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Teams
        </h2>
        <SimpleTable columns={["Team", "Members", "Status"]}>
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
