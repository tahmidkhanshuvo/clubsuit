// src/features/users/demoUsers.ts

export type UserStatus = "pending" | "active" | "inactive" | "banned";
export type SystemRole = "IT" | "ADMIN" | "EXECUTIVE" | "USER";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  systemRole: SystemRole;
  clubRole: string;
  status: UserStatus;
  eventsParticipated?: number;
};

export type UserDetails = UserRecord & {
  memberType?: "IT" | "Admin" | "Executive" | "Member" | "Volunteer" | "Alumni";
  phone?: string;
  joinedAt?: string; // ISO or readable
  lastLoginAt?: string;
  teams?: { id: string; name: string; role?: string }[];
  panels?: { id: string; name: string; role?: string; term?: string }[];
};

export const demoUsers: UserDetails[] = [
  {
    id: "IT-001",
    name: "Example IT Admin",
    email: "it.admin@austrc.com",
    systemRole: "IT",
    clubRole: "Tech Lead",
    status: "active",
    eventsParticipated: 12,
    memberType: "IT",
    phone: "+880 1700-000001",
    joinedAt: "2022-02-15",
    lastLoginAt: "2025-11-30T14:22:00",
    teams: [{ id: "team-rnd", name: "RnD Team", role: "Tech Lead (GS)" }],
    panels: [
      {
        id: "panel-2025",
        name: "Executive Panel 2025",
        role: "Executive",
        term: "2025",
      },
    ],
  },
  {
    id: "AD-001",
    name: "Example Admin",
    email: "admin@austrc.com",
    systemRole: "ADMIN",
    clubRole: "General Secretary",
    status: "active",
    eventsParticipated: 18,
    memberType: "Admin",
    phone: "+880 1700-000002",
    joinedAt: "2021-09-10",
    lastLoginAt: "2025-11-29T19:05:00",
    teams: [
      {
        id: "team-events",
        name: "Events & Operations Team",
        role: "GS",
      },
    ],
    panels: [
      {
        id: "panel-2025",
        name: "Executive Panel 2025",
        role: "Executive",
        term: "2025",
      },
    ],
  },
  {
    id: "EX-001",
    name: "Executive Lead",
    email: "exec.lead@austrc.com",
    systemRole: "EXECUTIVE",
    clubRole: "Vice President",
    status: "active",
    eventsParticipated: 25,
    memberType: "Executive",
    phone: "+880 1700-000003",
    joinedAt: "2020-03-05",
    lastLoginAt: "2025-11-26T09:40:00",
    teams: [{ id: "team-rnd", name: "RnD Team", role: "VP" }],
    panels: [
      {
        id: "panel-2025",
        name: "Executive Panel 2025",
        role: "Executive",
        term: "2025",
      },
    ],
  },
  {
    id: "MB-001",
    name: "Core RnD Member",
    email: "rnd.member@austrc.com",
    systemRole: "USER",
    clubRole: "RnD Member",
    status: "active",
    eventsParticipated: 9,
    memberType: "Member",
    phone: "+880 1700-000004",
    joinedAt: "2023-01-12",
    lastLoginAt: "2025-11-20T20:11:00",
    teams: [{ id: "team-rnd", name: "RnD Team", role: "SE" }],
  },
  {
    id: "MB-002",
    name: "Inactive Volunteer",
    email: "volunteer.inactive@austrc.com",
    systemRole: "USER",
    clubRole: "Event Volunteer",
    status: "inactive",
    eventsParticipated: 4,
    memberType: "Volunteer",
    phone: "+880 1700-000005",
    joinedAt: "2022-06-01",
    lastLoginAt: "2024-09-10T17:45:00",
    teams: [
      {
        id: "team-events",
        name: "Events & Operations Team",
        role: "Volunteer",
      },
    ],
  },
  {
    id: "MB-003",
    name: "New Member (pending)",
    email: "new.member@austrc.com",
    systemRole: "USER",
    clubRole: "Unassigned",
    status: "pending",
    eventsParticipated: 0,
    memberType: "Member",
    phone: "+880 1700-000006",
    joinedAt: "2025-11-30",
  },
  {
    id: "MB-004",
    name: "Workshop Participant (pending)",
    email: "pending.workshop@austrc.com",
    systemRole: "USER",
    clubRole: "Unassigned",
    status: "pending",
    eventsParticipated: 1,
    memberType: "Member",
    phone: "+880 1700-000007",
    joinedAt: "2025-11-28",
  },
  {
    id: "MB-005",
    name: "Banned Member",
    email: "banned.member@austrc.com",
    systemRole: "USER",
    clubRole: "Former Volunteer",
    status: "banned",
    eventsParticipated: 2,
    memberType: "Member",
    phone: "+880 1700-000008",
    joinedAt: "2021-02-10",
    lastLoginAt: "2023-01-01T10:00:00",
  },
  {
    id: "MB-101",
    name: "Example Member",
    email: "member@austrc.com",
    systemRole: "USER",
    clubRole: "Member",
    status: "active",
    eventsParticipated: 3,
    memberType: "Member",
    phone: "+880 1700-000009",
    joinedAt: "2023-05-10",
  },
  {
    id: "VL-201",
    name: "Example Volunteer",
    email: "volunteer@austrc.com",
    systemRole: "USER",
    clubRole: "Volunteer",
    status: "active",
    eventsParticipated: 5,
    memberType: "Volunteer",
    phone: "+880 1700-000010",
    joinedAt: "2022-11-01",
  },
  {
    id: "AL-301",
    name: "Example Alumni",
    email: "alumni@austrc.com",
    systemRole: "USER",
    clubRole: "Alumni",
    status: "inactive",
    eventsParticipated: 7,
    memberType: "Alumni",
    phone: "+880 1700-000011",
    joinedAt: "2018-03-05",
  },
  {
    id: "MB-103",
    name: "Banned User",
    email: "banned.user@austrc.com",
    systemRole: "USER",
    clubRole: "Former Volunteer",
    status: "banned",
    eventsParticipated: 4,
    memberType: "Member",
    phone: "+880 1700-000012",
    joinedAt: "2020-07-20",
  },
];

export function getDemoUserById(id: string): UserDetails | undefined {
  return demoUsers.find((u) => u.id === id);
}

export function getDemoUsersForContext(
  context: "it" | "admin"
): UserDetails[] {
  if (context === "it") {
    // IT sees everyone
    return demoUsers;
  }
  // Admin view – hide pure IT infra people if needed
  return demoUsers.filter((u) => u.systemRole !== "IT");
}
