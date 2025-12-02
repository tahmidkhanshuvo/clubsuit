// src/features/executive/profile/ExecutiveProfilePage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";

const mockExecProfile = {
  name: "Example Executive",
  email: "executive@austrc.com",
  studentId: "AUST-654321",
  department: "CSE",
  batch: "24",
  panelRole: "Event Secretary",
  panelTerm: "2025",
  membershipStatus: "active" as const,
  joinDate: "Jan 2023",
  teams: ["RnD Team (Advisor)", "Media Team (Coordinator)"],
};

export function ExecutiveProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive profile"
        description="Your panel role, term, and team responsibilities."
        actions={
          <Button variant="outline" disabled>
            Edit profile (coming soon)
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal info</CardTitle>
            <CardDescription>
              Core details shared with your member profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-slate-300">
            <div>
              <span className="text-slate-400">Name</span>
              <div className="text-slate-100">{mockExecProfile.name}</div>
            </div>
            <div>
              <span className="text-slate-400">Email</span>
              <div className="text-slate-100">{mockExecProfile.email}</div>
            </div>
            <div>
              <span className="text-slate-400">Student ID</span>
              <div className="text-slate-100">{mockExecProfile.studentId}</div>
            </div>
            <div className="flex gap-4">
              <div>
                <span className="text-slate-400">Department</span>
                <div className="text-slate-100">
                  {mockExecProfile.department}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Batch</span>
                <div className="text-slate-100">{mockExecProfile.batch}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Panel & membership</CardTitle>
            <CardDescription>
              Your executive role within AUSTRC leadership.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-400">Panel role</span>
                <div className="text-slate-100">{mockExecProfile.panelRole}</div>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Panel term</span>
                <div className="text-slate-100">{mockExecProfile.panelTerm}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-400">Membership status</span>
                <div className="mt-1">
                  <StatusPill tone="success">Active executive</StatusPill>
                </div>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Joined</span>
                <div className="text-slate-100">{mockExecProfile.joinDate}</div>
              </div>
            </div>

            <div>
              <span className="text-slate-400">Teams / responsibilities</span>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {mockExecProfile.teams.map((role) => (
                  <li key={role} className="text-slate-100">
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] text-slate-500">
              Later we can add a full timeline of your executive history and
              event involvement.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
