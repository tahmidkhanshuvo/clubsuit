// src/features/public/about/AboutPage.tsx
import { SectionHeading } from "@/components/public/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function AboutPage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <SectionHeading
        eyebrow="About"
        title="Ahsanullah University of Science & Technology Robotics Club"
        description="AUSTRC is the robotics club of AUST, run by students and guided by faculty advisors. The club arranges events, projects and competitions around robotics and technology."
      />

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]">
        <div className="space-y-4 text-sm text-slate-300">
          <p>
            AUSTRC brings together students from different departments who are
            passionate about robotics, electronics, programming and teamwork. The
            club organizes flagship events, trains freshers and runs internal
            projects throughout the year.
          </p>
          <p>
            This website is designed to support both public visitors and internal
            operations: showcasing events and activities publicly, while also
            giving members, admins, executive panel and IT team a dedicated
            workspace.
          </p>
          <p>
            The exact structure (executive panel, admins, teams like RnD, MSM,
            Content, GFX, Logistics, etc.) is maintained in the internal
            dashboards you’ve already set up.
          </p>
        </div>

        <Card>
          <CardContent className="space-y-3 px-4 py-4 text-xs text-slate-300">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Focus areas
              </div>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Robotics competitions & contests</li>
                <li>Workshops & training for students</li>
                <li>Internal projects and research</li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Who can join
              </div>
              <p className="mt-2 text-slate-400">
                AUST students can join as general members through events and
                recruitment drives. Internal dashboards will later handle
                registration and member records.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
