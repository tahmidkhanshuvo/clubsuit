// src/features/panels/ItPanelsPage.tsx
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  PanelsTeamsOverview,
  type PanelRecord,
  type TeamRecord,
} from "@/features/panels/PanelsTeamsOverview";
import { PanelsStructureEditor } from "@/features/panels/PanelStructureEditor";
import { demoUsers } from "@/features/users/demoUsers";

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
    keyRoles: [
      "General Secretary (GS)",
      "Senior Executive (SSE)",
      "Executive (SE)",
    ],
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

const memberOptions = demoUsers.map((u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
}));

export function ItPanelsPage() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Panels & Teams"
        description="IT view of AUSTRC hierarchy: executive panels and functional teams."
        actions={
          <Button
            variant="outline"
            onClick={() => setShowEditor((prev) => !prev)}
          >
            {showEditor ? "Hide editor" : "Open editor"}
          </Button>
        }
      />

      <PanelsTeamsOverview
        panels={demoPanels}
        teams={demoTeams}
        variant="it"
        onOpenEditor={() => setShowEditor(true)}
      />

      {showEditor && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-xl">
            <PanelsStructureEditor
              initialPanels={demoPanels}
              initialTeams={demoTeams}
              availableMembers={memberOptions}
              variant="it"
              onClose={() => setShowEditor(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
