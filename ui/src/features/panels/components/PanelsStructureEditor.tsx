// src/features/panels/components/PanelsStructureEditor.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  PanelRecord,
  TeamRecord,
  type PanelStatus,
  type TeamStatus,
} from "@/features/panels/components/PanelsTeamsOverview";
import { cn } from "@/lib/utils";

const INTERNAL_ROLES = [
  { code: "PRES", label: "President" },
  { code: "GS", label: "General Secretary (GS)" },
  { code: "VP", label: "Vice President (VP)" },
  { code: "JS", label: "Joint Secretary (JS)" },
  { code: "SSE", label: "Senior Executive (SSE)" },
  { code: "SE", label: "Executive (SE)" },
  { code: "MEM", label: "Member" },
  { code: "VOL", label: "Volunteer" },
];

type PanelsStructureEditorProps = {
  initialPanels: PanelRecord[];
  initialTeams: TeamRecord[];
  variant?: "it" | "admin";
};

type PanelFormState = {
  name: string;
  role: string;
  term: string;
  status: PanelStatus;
};

type TeamFormState = {
  name: string;
  panelId: string;
  members: string;
  status: TeamStatus;
  leadRoleCode: string;
  keyRoleCodes: string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function PanelsStructureEditor({
  initialPanels,
  initialTeams,
  variant = "it",
}: PanelsStructureEditorProps) {
  const [panels, setPanels] = useState<PanelRecord[]>(initialPanels);
  const [teams, setTeams] = useState<TeamRecord[]>(initialTeams);

  const [panelForm, setPanelForm] = useState<PanelFormState>({
    name: "",
    role: "Executive",
    term: "",
    status: "active",
  });

  const [teamForm, setTeamForm] = useState<TeamFormState>({
    name: "",
    panelId: initialPanels[0]?.id ?? "",
    members: "",
    status: "active",
    leadRoleCode: "GS",
    keyRoleCodes: ["GS", "VP", "SSE", "SE"],
  });

  const canEdit = variant === "it" || variant === "admin";

  function handlePanelInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setPanelForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleTeamInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setTeamForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleRoleToggle(roleCode: string) {
    setTeamForm((prev) => {
      const exists = prev.keyRoleCodes.includes(roleCode);
      return {
        ...prev,
        keyRoleCodes: exists
          ? prev.keyRoleCodes.filter((c) => c !== roleCode)
          : [...prev.keyRoleCodes, roleCode],
      };
    });
  }

  function handlePanelSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!panelForm.name.trim()) return;

    const id = `panel-${panelForm.term || "custom"}-${slugify(panelForm.name)}`;
    const newPanel: PanelRecord = {
      id,
      name: panelForm.name.trim(),
      role: panelForm.role || "Executive",
      members: 0,
      term: panelForm.term || "Custom",
      status: panelForm.status,
    };

    setPanels((prev) => [...prev, newPanel]);
    // Reset name/term only
    setPanelForm((prev) => ({
      ...prev,
      name: "",
      term: "",
    }));
  }

  function handleTeamSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!teamForm.name.trim()) return;

    const roles = INTERNAL_ROLES.filter((r) =>
      teamForm.keyRoleCodes.includes(r.code)
    ).map((r) => r.label);

    const leadRole = INTERNAL_ROLES.find(
      (r) => r.code === teamForm.leadRoleCode
    );

    const id = `team-${slugify(teamForm.name)}-${teams.length + 1}`;
    const newTeam: TeamRecord = {
      id,
      name: teamForm.name.trim(),
      members: Number(teamForm.members || 0),
      status: teamForm.status,
      lead: leadRole ? leadRole.label : undefined,
      keyRoles: roles,
      panelId: teamForm.panelId || undefined,
    };

    setTeams((prev) => [...prev, newTeam]);
    setTeamForm((prev) => ({
      ...prev,
      name: "",
      members: "",
    }));
  }

  // Group teams by panel for preview
  const teamsByPanel = panels.map((panel) => ({
    panel,
    teams: teams.filter((t) => t.panelId === panel.id),
  }));

  const looseTeams = teams.filter((t) => !t.panelId);

  if (!canEdit) return null;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
          Structure editor (demo)
        </h2>
        <p className="mt-1 text-[11px] text-slate-500">
          Form panels and teams, and assign internal roles like GS, VP, SE, SSE.
          This UI uses local state only – backend integration can later replace
          the submit handlers.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2.3fr),minmax(0,2.2fr)]">
        {/* Forms */}
        <div className="space-y-4">
          {/* Panel form */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Add panel
            </h3>
            <form
              onSubmit={handlePanelSubmit}
              className="mt-3 space-y-3 text-[11px]"
            >
              <div className="space-y-1">
                <label className="text-slate-400">Panel name</label>
                <input
                  name="name"
                  value={panelForm.name}
                  onChange={handlePanelInputChange}
                  placeholder="e.g. Executive Panel 2026"
                  className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Role</label>
                  <input
                    name="role"
                    value={panelForm.role}
                    onChange={handlePanelInputChange}
                    placeholder="Executive"
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Term/year</label>
                  <input
                    name="term"
                    value={panelForm.term}
                    onChange={handlePanelInputChange}
                    placeholder="2026"
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">Status</label>
                <select
                  name="status"
                  value={panelForm.status}
                  onChange={handlePanelInputChange}
                  className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-500"
                >
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <Button
                type="submit"
                variant="outline"
                className="mt-1 h-7 px-2 text-[11px]"
              >
                Add panel (local only)
              </Button>
            </form>
          </div>

          {/* Team form */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Add team
            </h3>
            <form
              onSubmit={handleTeamSubmit}
              className="mt-3 space-y-3 text-[11px]"
            >
              <div className="space-y-1">
                <label className="text-slate-400">Team name</label>
                <input
                  name="name"
                  value={teamForm.name}
                  onChange={handleTeamInputChange}
                  placeholder="e.g. RnD Team"
                  className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Attach to panel</label>
                  <select
                    name="panelId"
                    value={teamForm.panelId}
                    onChange={handleTeamInputChange}
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  >
                    <option value="">No panel</option>
                    {panels.map((panel) => (
                      <option key={panel.id} value={panel.id}>
                        {panel.name} ({panel.term})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Members (approx.)</label>
                  <input
                    name="members"
                    value={teamForm.members}
                    onChange={handleTeamInputChange}
                    placeholder="18"
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Team status</label>
                <select
                  name="status"
                  value={teamForm.status}
                  onChange={handleTeamInputChange}
                  className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Team lead role</label>
                <select
                  name="leadRoleCode"
                  value={teamForm.leadRoleCode}
                  onChange={handleTeamInputChange}
                  className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-500"
                >
                  {INTERNAL_ROLES.map((role) => (
                    <option key={role.code} value={role.code}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">
                  Internal hierarchy (roles)
                </label>
                <div className="mt-1 grid grid-cols-2 gap-1.5">
                  {INTERNAL_ROLES.map((role) => {
                    const active = teamForm.keyRoleCodes.includes(role.code);
                    return (
                      <button
                        key={role.code}
                        type="button"
                        onClick={() => handleRoleToggle(role.code)}
                        className={cn(
                          "rounded-md border px-2 py-1 text-[10px] text-left transition",
                          active
                            ? "border-slate-300 bg-slate-100 text-slate-900"
                            : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                        )}
                      >
                        {role.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                variant="outline"
                className="mt-1 h-7 px-2 text-[11px]"
              >
                Add team (local only)
              </Button>
            </form>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Preview structure
          </h3>
          <p className="text-[11px] text-slate-500">
            How panels and teams look right now. In the real system this would
            mirror the AUSTRC hierarchy from the database.
          </p>

          <div className="space-y-3 text-[11px] text-slate-300">
            {teamsByPanel.map(({ panel, teams: panelTeams }) => (
              <div
                key={panel.id}
                className="rounded-lg border border-slate-800 bg-slate-950/80 p-3"
              >
                <div className="flex justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-slate-50">
                      {panel.name}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      ID: {panel.id} • Term {panel.term} • {panel.role}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {panelTeams.length} teams
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  {panelTeams.length > 0 ? (
                    panelTeams.map((team) => (
                      <div
                        key={team.id}
                        className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5"
                      >
                        <div className="flex justify-between gap-2">
                          <span className="text-[11px] text-slate-50">
                            {team.name}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {team.members} members
                          </span>
                        </div>
                        {team.lead && (
                          <div className="mt-0.5 text-[10px] text-slate-400">
                            Lead: {team.lead}
                          </div>
                        )}
                        {team.keyRoles && team.keyRoles.length > 0 && (
                          <div className="mt-0.5 text-[10px] text-slate-500">
                            Roles: {team.keyRoles.join(", ")}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-[10px] text-slate-500">
                      No teams attached yet.
                    </div>
                  )}
                </div>
              </div>
            ))}

            {looseTeams.length > 0 && (
              <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                <div className="text-xs font-semibold text-slate-50">
                  Teams without panel
                </div>
                <div className="mt-2 space-y-1.5">
                  {looseTeams.map((team) => (
                    <div
                      key={team.id}
                      className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5"
                    >
                      <div className="flex justify-between gap-2">
                        <span className="text-[11px] text-slate-50">
                          {team.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {team.members} members
                        </span>
                      </div>
                      {team.lead && (
                        <div className="mt-0.5 text-[10px] text-slate-400">
                          Lead: {team.lead}
                        </div>
                      )}
                      {team.keyRoles && team.keyRoles.length > 0 && (
                        <div className="mt-0.5 text-[10px] text-slate-500">
                          Roles: {team.keyRoles.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
