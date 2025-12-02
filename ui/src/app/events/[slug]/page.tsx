// src/app/events/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/public-shell";
import { EventDetailPage } from "@/features/public/events/EventDetailPage";
import { getEventBySlug, publicEvents } from "@/data/public-events";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return publicEvents.map((event) => ({ slug: event.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const event = getEventBySlug(params.slug);
  if (!event) {
    return {
      title: "Event not found | AUSTRC",
    };
  }
  return {
    title: `${event.title} | AUSTRC`,
    description: event.shortDescription,
  };
}

export default function Page({ params }: PageProps) {
  const event = getEventBySlug(params.slug);
  if (!event) {
    notFound();
  }

  return (
    <PublicShell>
      <EventDetailPage event={event} />
    </PublicShell>
  );
}
