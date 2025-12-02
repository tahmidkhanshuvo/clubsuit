// src/features/member/profile/MemberProfilePage.tsx
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

const mockProfile = {
  name: "Example Member",
  email: "member@austrc.com",
  studentId: "AUST-123456",
  department: "EEE",
  batch: "25",
  membershipStatus: "active" as const,
  joinDate: "Jan 2024",
  roles: ["RnD Team", "Event Volunteer"],
};

export function MemberProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Basic details about your AUSTRC membership. Editing will be added later."
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
              Core details used for registrations and certificates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-slate-300">
            <div>
              <span className="text-slate-400">Name</span>
              <div className="text-slate-100">{mockProfile.name}</div>
            </div>
            <div>
              <span className="text-slate-400">Email</span>
              <div className="text-slate-100">{mockProfile.email}</div>
            </div>
            <div>
              <span className="text-slate-400">Student ID</span>
              <div className="text-slate-100">{mockProfile.studentId}</div>
            </div>
            <div className="flex gap-4">
              <div>
                <span className="text-slate-400">Department</span>
                <div className="text-slate-100">{mockProfile.department}</div>
              </div>
              <div>
                <span className="text-slate-400">Batch</span>
                <div className="text-slate-100">{mockProfile.batch}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership</CardTitle>
            <CardDescription>
              Status and involvement inside AUSTRC.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-400">Membership status</span>
                <div className="mt-1">
                  <StatusPill tone="success">Active member</StatusPill>
                </div>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Joined</span>
                <div className="text-slate-100">{mockProfile.joinDate}</div>
              </div>
            </div>

            <div>
              <span className="text-slate-400">Roles / teams</span>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {mockProfile.roles.map((role) => (
                  <li key={role} className="text-slate-100">
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] text-slate-500">
              Later we can add a timeline of your participation, badges, and
              role history here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
