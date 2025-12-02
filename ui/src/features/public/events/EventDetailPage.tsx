// src/features/public/events/EventDetailPage.tsx
import { SectionHeading } from "@/components/public/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import type { PublicEvent } from "@/data/public-events";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";

type EventDetailPageProps = {
  event: PublicEvent;
};

export function EventDetailPage({ event }: EventDetailPageProps) {
  const isRegistrationOpen =
    event.status === "upcoming" || event.status === "running";

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionHeading
        eyebrow="Event"
        title={event.title}
        description={event.shortDescription}
        actions={
          <Button variant="outline" disabled={!isRegistrationOpen}>
            {isRegistrationOpen ? "Login to register (coming soon)" : "Registration closed"}
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]">
        <div className="space-y-4 text-sm text-slate-300">
          <p>
            This is a placeholder event description. In the real system, event
            details like schedule, sectors, rules, FAQs, and resources will be
            managed from the Admin / IT dashboards and displayed here for
            visitors.
          </p>
          <p>
            Registration, QR codes, and certificate flows will connect to the
            internal AUSTRC system you are building in the other dashboards.
          </p>
        </div>

        <Card>
          <CardContent className="space-y-3 px-4 py-4 text-xs text-slate-300">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-[2px] text-[10px] font-medium text-slate-200">
                {event.tag}
              </span>
              <StatusPill tone="warning">
                {event.status === "upcoming"
                  ? "Upcoming"
                  : event.status === "running"
                  ? "Running"
                  : "Past event"}
              </StatusPill>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Date</div>
              <div className="text-slate-100">{event.date}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Location</div>
              <div className="text-slate-100">{event.location}</div>
            </div>
            <p className="text-[11px] text-slate-500">
              More structured fields (registration windows, fees, categories,
              etc.) can be added here once the backend model is finalized.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
