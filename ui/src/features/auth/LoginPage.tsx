// src/features/auth/LoginPage.tsx
import { SectionHeading } from "@/components/public/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <SectionHeading
        eyebrow="Access"
        title="Login to AUSTRC system"
        description="From here, members, admins, executives, and IT can access their respective consoles once authentication is wired up."
      />

      <Card>
        <CardContent className="grid gap-6 px-4 py-6 md:grid-cols-2">
          <form className="space-y-3 text-xs text-slate-300">
            <div>
              <label className="mb-1 block text-[11px] text-slate-400">
                AUSTRC email or student email
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600"
                disabled
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-slate-400">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600"
                disabled
              />
            </div>
            <Button
              type="button"
              className="h-8 rounded-full px-3 text-[11px]"
              disabled
            >
              Login (coming soon)
            </Button>
            <p className="text-[11px] text-slate-500">
              Authentication and role-based routing will be implemented later,
              using this page as the entry point.
            </p>
          </form>

          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Who can log in
              </div>
              <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
                <li>IT team (system-level configuration)</li>
                <li>Admin team (events, content, certificates)</li>
                <li>Executive / panel members</li>
                <li>General members (member console)</li>
              </ul>
            </div>
            <p className="text-[11px] text-slate-500">
              Public visitors do not need an account to view events and
              activities. Only AUSTRC stakeholders use the internal consoles.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
