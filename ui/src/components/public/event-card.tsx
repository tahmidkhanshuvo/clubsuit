// src/components/public/event-card.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import type { PublicEvent } from "@/data/public-events";

type EventCardProps = {
  event: PublicEvent;
};

function statusTone(status: PublicEvent["status"]) {
  if (status === "running") return "success" as const;
  if (status === "upcoming") return "warning" as const;
  return "muted" as const;
}

function statusLabel(status: PublicEvent["status"]) {
  if (status === "running") return "Running";
  if (status === "upcoming") return "Upcoming";
  return "Past";
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.slug}`} className="block h-full">
      <Card className="flex h-full flex-col border-slate-800 bg-slate-950/70 transition-colors hover:border-slate-700 hover:bg-slate-900/90">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-[2px] text-[10px] font-medium text-slate-200">
              {event.tag}
            </span>
            <StatusPill tone={statusTone(event.status)} className="text-[10px]">
              {statusLabel(event.status)}
            </StatusPill>
          </div>
          <CardTitle className="text-sm md:text-base">{event.title}</CardTitle>
          <CardDescription className="text-xs text-slate-400">
            {event.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto space-y-1 text-[11px] text-slate-400">
          <div>{event.date}</div>
          <div className="text-slate-500">{event.location}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
