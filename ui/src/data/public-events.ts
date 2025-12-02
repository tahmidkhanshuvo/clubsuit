// src/data/public-events.ts
export type PublicEventStatus = "upcoming" | "running" | "past";

export type PublicEvent = {
  slug: string;
  title: string;
  shortDescription: string;
  date: string;
  location: string;
  tag: string;
  status: PublicEventStatus;
};

export const publicEvents: PublicEvent[] = [
  {
    slug: "robo-carnival-2025",
    title: "Robo Carnival 2025",
    shortDescription:
      "Flagship national robotics festival hosted by AUSTRC, featuring competitions, workshops and exhibitions.",
    date: "January 25–27, 2025",
    location: "AUST Campus",
    tag: "Flagship",
    status: "upcoming",
  },
  {
    slug: "freshers-workshop-spring-2025",
    title: "Freshers’ Robotics Workshop – Spring 2025",
    shortDescription:
      "Hands-on introduction to robotics, Arduino and basic control for new AUST students.",
    date: "February 10–12, 2025",
    location: "AUST Lab 401",
    tag: "Workshop",
    status: "upcoming",
  },
  {
    slug: "monthly-internal-meetup-dec-2024",
    title: "Monthly Internal Meetup – December 2024",
    shortDescription:
      "Internal session to showcase ongoing projects, discuss competitions and plan upcoming events.",
    date: "December 5, 2024",
    location: "AUSTRC Club Room",
    tag: "Internal",
    status: "past",
  },
];

export function getEventBySlug(slug: string): PublicEvent | undefined {
  return publicEvents.find((ev) => ev.slug === slug);
}
