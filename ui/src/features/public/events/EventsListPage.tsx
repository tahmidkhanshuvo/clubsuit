// src/features/public/events/EventsListPage.tsx
import { SectionHeading } from "@/components/public/section-heading";
import { EventCard } from "@/components/public/event-card";
import { publicEvents } from "@/data/public-events";

export function EventsListPage() {
  const upcoming = publicEvents.filter(
    (e) => e.status === "upcoming" || e.status === "running",
  );
  const past = publicEvents.filter((e) => e.status === "past");

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionHeading
        eyebrow="Events"
        title="AUSTRC events"
        description="Public overview of AUSTRC events. Detailed configuration and scanning are handled inside the internal dashboards."
      />

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-200">
          Upcoming & running
        </h3>
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-400">
            There are no upcoming events right now. Check back later!
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-200">Past events</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
