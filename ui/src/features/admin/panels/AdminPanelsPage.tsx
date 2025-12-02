// src/features/admin/panels/AdminPanelsPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  PanelsTeamsOverview,
  type PanelRecord,
  type TeamRecord,
} from "@/features/panels/components/PanelsTeamsOverview";
import { PanelsStructureEditor } from "@/features/panels/components/PanelsStructureEditor";

const adminPanelsDemo: PanelRecord[] = [
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

const adminTeamsDemo: TeamRecord[] = [
  {
    id: "team-events",
    name: "Events & Operations Team",
    members: 22,
    status: "active",
    lead: "General Secretary (GS)",
    keyRoles: ["General Secretary (GS)", "Vice President (VP)", "Senior Executive (SSE)", "Executive (SE)"],
    panelId: "panel-2025",
  },
  {
    id: "team-rnd",
    name: "RnD Team",
    members: 18,
    status: "active",
    lead: "Vice President (VP)",
    keyRoles: ["Vice President (VP)", "Senior Executive (SSE)", "Executive (SE)"],
    panelId: "panel-2025",
  },
  {
    id: "team-media",
    name: "Media & Social Media Team",
    members: 15,
    status: "active",
    lead: "Senior Executive (SSE)",
    keyRoles: ["Senior Executive (SSE)", "Executive (SE)", "Volunteer"],
    panelId: "panel-2024",
  },
  {
    id: "team-alumni",
    name: "Alumni Relations Team",
    members: 10,
    status: "inactive",
    lead: "Executive (SE)",
    keyRoles: ["Executive (SE)", "Volunteer"],
  },
];

export function AdminPanelsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Panels & Teams"
        description="See how members are organized into panels and teams for club operations."
        actions={
          <Button variant="outline" disabled>
            Backend integration (soon)
          </Button>
        }
      />

      <PanelsTeamsOverview
        panels={adminPanelsDemo}
        teams={adminTeamsDemo}
        variant="admin"
      />

      <PanelsStructureEditor
        initialPanels={adminPanelsDemo}
        initialTeams={adminTeamsDemo}
        variant="admin"
      />
    </div>
  );
}
