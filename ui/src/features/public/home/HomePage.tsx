// src/features/public/home/HomePage.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/public/section-heading";
import { EventCard } from "@/components/public/event-card";
import { publicEvents } from "@/data/public-events";

export const homeMetadata: Metadata = {
  title: "AUSTRC – AUST Robotics Club",
  description:
    "Official website of Ahsanullah University of Science & Technology Robotics Club (AUSTRC). Explore events, projects and activities.",
};

export function HomePage() {
  const upcomingEvents = publicEvents.filter(
    (ev) => ev.status === "upcoming" || ev.status === "running",
  );

  return (
    <div className="space-y-10 md:space-y-12">
      {/* Hero */}
      <section className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] md:items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-300">
            <span className="font-semibold uppercase tracking-[0.22em] text-slate-400">
              AUSTRC
            </span>
            <span>Robotics, competitions, and community at AUST.</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
            Building robots, teams, and experiences at{" "}
            <span className="text-sky-400">AUST</span>.
          </h1>
          <p className="max-w-xl text-sm text-slate-300 md:text-base">
            Ahsanullah University of Science &amp; Technology Robotics Club
            (AUSTRC) organizes flagship competitions, workshops, and internal
            projects that help students learn and compete in robotics and tech.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/events">
              <Button className="h-9 rounded-full px-4 text-xs md:h-10 md:px-5">
                View events
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="h-9 rounded-full px-4 text-xs md:h-10 md:px-5"
              >
                Member / admin login
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <Card>
            <CardContent className="space-y-4 px-4 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Snapshot
              </div>
              <dl className="grid grid-cols-2 gap-4 text-xs text-slate-300">
                <div>
                  <dt className="text-[11px] text-slate-400">
                    Active members
                  </dt>
                  <dd className="text-xl font-semibold text-slate-50">—</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-400">
                    Annual flagship events
                  </dt>
                  <dd className="text-xl font-semibold text-slate-50">—</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-400">
                    National titles
                  </dt>
                  <dd className="text-xl font-semibold text-slate-50">—</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-400">
                    Internal projects
                  </dt>
                  <dd className="text-xl font-semibold text-slate-50">—</dd>
                </div>
              </dl>
              <p className="text-[11px] text-slate-500">
                These numbers will later be connected to real statistics from
                the AUSTRC system.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming events */}
      <section>
        <SectionHeading
          eyebrow="Events"
          title="Upcoming & running events"
          description="Flagship competitions, freshers’ workshops, and internal meetups are announced here."
          actions={
            <Link href="/events">
              <Button variant="outline" className="h-8 rounded-full px-3 text-xs">
                View all events
              </Button>
            </Link>
          }
        />
        {upcomingEvents.length === 0 ? (
          <p className="text-sm text-slate-400">
            No upcoming events at the moment. Check back soon!
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Club focus */}
      <section>
        <SectionHeading
          eyebrow="What we do"
          title="Events, projects, and community"
          description="AUSTRC works across competitions, workshops, and internal R&amp;D projects to help students grow."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="space-y-2 px-4 py-4">
              <div className="text-xs font-semibold text-slate-100">
                Competitions
              </div>
              <p className="text-xs text-slate-400">
                Flagship robotics competitions and external contests where AUSTRC
                teams participate and represent AUST.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 px-4 py-4">
              <div className="text-xs font-semibold text-slate-100">
                Workshops & training
              </div>
              <p className="text-xs text-slate-400">
                Hands-on workshops for freshers and members on robotics,
                electronics, programming, and competition preparation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 px-4 py-4">
              <div className="text-xs font-semibold text-slate-100">
                Internal projects
              </div>
              <p className="text-xs text-slate-400">
                Long-term projects and experiments maintained inside the club to
                explore new ideas and prepare for future events.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
