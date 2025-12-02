// src/features/it/panels/ItPanelsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  PanelsTeamsOverview,
  type PanelRecord,
  type TeamRecord,
} from "@/features/panels/components/PanelsTeamsOverview";
import { PanelsStructureEditor } from "@/features/panels/components/PanelsStructureEditor";

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
    lead: "General Secretary (GS)",
    keyRoles: ["General Secretary (GS)", "Senior Executive (SSE)", "Executive (SE)"],
    panelId: "panel-2025",
  },
  {
    id: "team-msm",
    name: "Media & Social Media Team",
    members: 18,
    status: "active",
    lead: "Vice President (VP)",
    keyRoles: ["Vice President (VP)", "Executive (SE)", "Volunteer"],
    panelId: "panel-2025",
  },
  {
    id: "team-ops",
    name: "Operations & Logistics Team",
    members: 16,
    status: "inactive",
    lead: "Senior Executive (SSE)",
    keyRoles: ["Senior Executive (SSE)", "Executive (SE)", "Volunteer"],
    panelId: "panel-2024",
  },
];

export function ItPanelsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Panels & Teams"
        description="Keep the AUSTRC hierarchy clean: executive panels and functional teams."
        actions={
          <Button variant="outline" disabled>
            Backend integration (soon)
          </Button>
        }
      />

      <PanelsTeamsOverview
        panels={demoPanels}
        teams={demoTeams}
        variant="it"
      />

      <PanelsStructureEditor
        initialPanels={demoPanels}
        initialTeams={demoTeams}
        variant="it"
      />
    </div>
  );
}
