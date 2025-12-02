// src/features/admin/panels/AdminPanelsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  PanelsTeamsOverview,
  type PanelRecord,
  type TeamRecord,
} from "@/features/panels/components/PanelsTeamsOverview";

const demoPanels: PanelRecord[] = [
  {
    id: "panel-2025",
    name: "Executive Panel 2025",
    role: "Executive",
    members: 14,
    term: "2025",
    status: "active",
  },
  {
    id: "panel-2024",
    name: "Executive Panel 2024",
    role: "Executive",
    members: 13,
    term: "2024",
    status: "archived",
  },
];

const demoTeams: TeamRecord[] = [
  {
    id: "team-rnd",
    name: "RnD Team",
    members: 28,
    status: "active",
    lead: "GS – General Secretary",
    keyRoles: ["GS", "SSE", "SE"],
  },
  {
    id: "team-msm",
    name: "Media & Social Media Team",
    members: 18,
    status: "active",
    lead: "VP – Vice President",
    keyRoles: ["VP", "Coordinator", "Designer"],
  },
  {
    id: "team-ops",
    name: "Operations & Logistics Team",
    members: 16,
    status: "inactive",
    lead: "SE – Senior Executive",
    keyRoles: ["SE", "Exec", "Volunteer"],
  },
];

export function AdminPanelsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Panels & Teams"
        description="Keep the AUSTRC hierarchy clean: panels, executive roles, and functional teams."
        actions={
          <Button variant="outline" disabled>
            Edit structure (coming soon)
          </Button>
        }
      />

      <PanelsTeamsOverview
        panels={demoPanels}
        teams={demoTeams}
        variant="admin"
      />
    </div>
  );
}
