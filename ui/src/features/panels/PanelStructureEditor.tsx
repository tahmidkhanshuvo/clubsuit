// src/features/panels/PanelStructureEditor.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  PanelRecord,
  TeamRecord,
  type PanelStatus,
  type TeamStatus,
} from "@/features/panels/PanelsTeamsOverview";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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

type MemberOption = {
  id: string;
  name: string;
  email: string;
};

type PanelsStructureEditorProps = {
  initialPanels: PanelRecord[];
  initialTeams: TeamRecord[];
  /**
   * List of users that can be added to teams.
   * This is just for UI; backend will replace this later.
   */
  availableMembers?: MemberOption[];
  variant?: "it" | "admin";
  /**
   * Called when “Close editor” is pressed.
   */
  onClose?: () => void;
};

type PanelFormState = {
  name: string;
  role: string;
  term: string;
  status: PanelStatus;
  teamIds: string[];
};

type TeamFormState = {
  name: string;
  status: TeamStatus;
  leadRoleCode: string;
  keyRoleCodes: string[];
  memberIds: string[];
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
  availableMembers,
  variant = "it",
  onClose,
}: PanelsStructureEditorProps) {
  const [panels, setPanels] = useState<PanelRecord[]>(initialPanels);
  const [teams, setTeams] = useState<TeamRecord[]>(initialTeams);

  const [panelForm, setPanelForm] = useState<PanelFormState>({
    name: "",
    role: "Executive",
    term: "",
    status: "active",
    teamIds: [],
  });

  const [teamForm, setTeamForm] = useState<TeamFormState>({
    name: "",
    status: "active",
    leadRoleCode: "GS",
    keyRoleCodes: ["GS", "VP", "SSE", "SE"],
    memberIds: [],
  });

  const [memberQuery, setMemberQuery] = useState("");

  const canEdit = variant === "it" || variant === "admin";
  if (!canEdit) return null;

  // --- helpers

  function handlePanelInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setPanelForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePanelTeamToggle(teamId: string) {
    setPanelForm((prev) => {
      const exists = prev.teamIds.includes(teamId);
      return {
        ...prev,
        teamIds: exists
          ? prev.teamIds.filter((id) => id !== teamId)
          : [...prev.teamIds, teamId],
      };
    });
  }

  function handleTeamInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (name === "name") {
      setTeamForm((prev) => ({ ...prev, name: value }));
    } else if (name === "status") {
      setTeamForm((prev) => ({ ...prev, status: value as TeamStatus }));
    } else if (name === "leadRoleCode") {
      setTeamForm((prev) => ({ ...prev, leadRoleCode: value }));
    }
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

  function handleMemberQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setMemberQuery(e.target.value);
  }

  function handleAddMember(memberId: string) {
    setTeamForm((prev) => {
      if (prev.memberIds.includes(memberId)) return prev;
      return { ...prev, memberIds: [...prev.memberIds, memberId] };
    });
    setMemberQuery("");
  }

  function handleRemoveMember(memberId: string) {
    setTeamForm((prev) => ({
      ...prev,
      memberIds: prev.memberIds.filter((id) => id !== memberId),
    }));
  }

  function getMemberLabel(memberId: string) {
    const match = availableMembers?.find((m) => m.id === memberId);
    if (!match) return memberId;
    return `${match.name}`;
  }

  const trimmedQuery = memberQuery.trim().toLowerCase();
  const memberSuggestions =
    trimmedQuery && availableMembers
      ? availableMembers
          .filter(
            (m) =>
              !teamForm.memberIds.includes(m.id) &&
              (m.name.toLowerCase().includes(trimmedQuery) ||
                m.email.toLowerCase().includes(trimmedQuery) ||
                m.id.toLowerCase().includes(trimmedQuery))
          )
          .slice(0, 6)
      : [];

  function handlePanelSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!panelForm.name.trim()) return;

    const id = `panel-${panelForm.term || "custom"}-${slugify(
      panelForm.name
    )}`;

    // Teams included in this panel
    const teamsInPanel = teams.filter((t) =>
      panelForm.teamIds.includes(t.id)
    );
    const totalMembers = teamsInPanel.reduce(
      (sum, team) => sum + (team.members || 0),
      0
    );

    const newPanel: PanelRecord = {
      id,
      name: panelForm.name.trim(),
      role: panelForm.role || "Executive",
      members: totalMembers,
      term: panelForm.term || "Custom",
      status: panelForm.status,
      teamIds: [...panelForm.teamIds],
    };

    setPanels((prev) => [...prev, newPanel]);

    // attach teams to this panel (via panelId field)
    if (panelForm.teamIds.length > 0) {
      setTeams((prev) =>
        prev.map((team) =>
          panelForm.teamIds.includes(team.id)
            ? { ...team, panelId: id }
            : team
        )
      );
    }

    setPanelForm((prev) => ({
      ...prev,
      name: "",
      term: "",
      teamIds: [],
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
    const membersCount = teamForm.memberIds.length;

    const newTeam: TeamRecord = {
      id,
      name: teamForm.name.trim(),
      status: teamForm.status,
      members: membersCount,
      lead: leadRole ? leadRole.label : undefined,
      keyRoles: roles,
      memberIds: [...teamForm.memberIds],
    };

    setTeams((prev) => [...prev, newTeam]);

    setTeamForm((prev) => ({
      ...prev,
      name: "",
      memberIds: [],
    }));
    setMemberQuery("");
  }

  // Group teams by panel for preview
  const teamsByPanel = panels.map((panel) => ({
    panel,
    teams: teams.filter((t) => t.panelId === panel.id),
  }));

  const looseTeams = teams.filter((t) => !t.panelId);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            Structure editor (demo)
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            Form panels from teams, and build teams by adding members via
            search. Roles (IT/Admin/etc.) are assigned in the Users tab – this
            editor only manages club structure (GS, VP, SE, SSE, etc.).
          </p>
        </div>

        {onClose && (
          <Button
            type="button"
            variant="ghost"
            className="h-7 px-2 text-[11px] text-slate-400 hover:text-slate-100"
            onClick={onClose}
          >
            Close editor
          </Button>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2.3fr),minmax(0,2.2fr)]">
        {/* Forms column */}
        <div className="space-y-4">
          {/* Panel form – create panel by selecting TEAMS (no individual users) */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              New panel
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
                  <label className="text-slate-400">Term / year</label>
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

              <div className="space-y-1">
                <label className="text-slate-400">Teams in this panel</label>
                <div className="mt-1 max-h-40 overflow-y-auto rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 space-y-1.5">
                  {teams.length === 0 ? (
                    <p className="text-[10px] text-slate-500">
                      Create teams first, then attach them to a panel.
                    </p>
                  ) : (
                    teams.map((team) => {
                      const checked = panelForm.teamIds.includes(team.id);
                      return (
                        <label
                          key={team.id}
                          className="flex items-center gap-2 text-[11px]"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handlePanelTeamToggle(team.id)}
                            className="h-3 w-3 rounded border border-slate-600 bg-slate-950"
                          />
                          <span className="text-slate-100">
                            {team.name}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            • {team.members} members
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
                <p className="text-[10px] text-slate-500">
                  Panels are built only from teams. There is no option to add
                  individual users directly to a panel.
                </p>
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

          {/* Team form – create team, pick roles, assign members via search */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              New team
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

              <div className="space-y-1">
                <label className="text-slate-400">
                  Members (search by name, add as tags)
                </label>
                {availableMembers ? (
                  <>
                    <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5">
                      <input
                        value={memberQuery}
                        onChange={handleMemberQueryChange}
                        placeholder="Type a name or email"
                        className="w-full border-0 bg-transparent text-[11px] text-slate-100 placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>
                    {memberSuggestions.length > 0 && (
                      <div className="mt-1 max-h-32 overflow-y-auto rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 space-y-1">
                        {memberSuggestions.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => handleAddMember(m.id)}
                            className="flex w-full items-center justify-between rounded-md px-1.5 py-1 text-left text-[11px] text-slate-100 hover:bg-slate-900"
                          >
                            <span>{m.name}</span>
                            <span className="text-[10px] text-slate-500">
                              {m.email}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {teamForm.memberIds.length === 0 ? (
                        <span className="text-[10px] text-slate-500">
                          No members added yet.
                        </span>
                      ) : (
                        teamForm.memberIds.map((id) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleRemoveMember(id)}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-100"
                          >
                            <span>{getMemberLabel(id)}</span>
                            <X className="h-3 w-3 text-slate-400" />
                          </button>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-[10px] text-slate-500">
                    Member search is demo-only. When backend is ready, this will
                    query users by name/email and add them as tags.
                  </p>
                )}
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

        {/* Preview column */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Preview structure
          </h3>
          <p className="text-[11px] text-slate-500">
            This view mirrors how panels and teams are currently structured.
            Panels are made of teams; teams contain members and internal roles.
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
                            Lead role: {team.lead}
                          </div>
                        )}
                        {team.keyRoles && team.keyRoles.length > 0 && (
                          <div className="mt-0.5 text-[10px] text-slate-500">
                            Hierarchy: {team.keyRoles.join(", ")}
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
                          Lead role: {team.lead}
                        </div>
                      )}
                      {team.keyRoles && team.keyRoles.length > 0 && (
                        <div className="mt-0.5 text-[10px] text-slate-500">
                          Hierarchy: {team.keyRoles.join(", ")}
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
    </div>
  );
}
