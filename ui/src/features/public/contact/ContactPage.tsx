// src/features/public/contact/ContactPage.tsx
import { SectionHeading } from "@/components/public/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactPage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch with AUSTRC"
        description="Official contact channels for Ahsanullah University of Science & Technology Robotics Club. Exact details can be updated later from configuration."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 px-4 py-4 text-xs text-slate-300">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Email
              </div>
              <p className="mt-2 text-slate-200">
                (Add official AUSTRC email here later)
              </p>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Location
              </div>
              <p className="mt-2 text-slate-200">
                Ahsanullah University of Science &amp; Technology (AUST)
              </p>
              <p className="text-slate-400">
                Exact club room / campus address can be added later.
              </p>
            </div>

            <p className="text-[11px] text-slate-500">
              When the backend is ready, this section can be dynamic, editable
              from the IT / Admin configuration pages.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 px-4 py-4 text-xs text-slate-300">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Simple contact form (placeholder)
            </div>
            <p className="text-slate-400">
              A real contact form would either send emails or create internal
              messages in the AUSTRC system. For now this is just a visual
              placeholder.
            </p>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600"
                disabled
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600"
                disabled
              />
              <textarea
                placeholder="Your message"
                rows={4}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600"
                disabled
              />
              <Button
                type="button"
                variant="outline"
                className="h-8 rounded-full px-3 text-[11px]"
                disabled
              >
                Submit (coming soon)
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
