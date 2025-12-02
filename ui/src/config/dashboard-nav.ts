// src/config/dashboard-nav.ts
import {
  LayoutDashboard,
  Users,
  Shield,
  CalendarDays,
  FileBadge2,
  Settings2,
  Newspaper,
  ScrollText,
  Ticket,
  IdCard,
} from "lucide-react";
import type { NavItem } from "@/types/nav";

export const itNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/it",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/it/users",
    icon: Users,
  },
  {
    label: "Panels & Teams",
    href: "/it/panels",
    icon: Shield,
  },
  {
    label: "Events",
    href: "/it/events",
    icon: CalendarDays,
  },
  {
    label: "Certificates",
    href: "/it/certificates",
    icon: FileBadge2,
  },
  {
    label: "Content",
    href: "/it/content",
    icon: Newspaper,
  },
  {
    label: "System Settings",
    href: "/it/settings",
    icon: Settings2,
    badge: "IT",
  },
  {
    label: "Audit Logs",
    href: "/it/logs",
    icon: ScrollText,
  },
];

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: CalendarDays,
  },
  {
    label: "Content",
    href: "/admin/content",
    icon: Newspaper,
  },
  {
    label: "Certificates",
    href: "/admin/certificates",
    icon: FileBadge2,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

export const memberNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/member",
    icon: LayoutDashboard,
  },
  {
    label: "Events",
    href: "/member/events",
    icon: CalendarDays,
  },
  {
    label: "My registrations",
    href: "/member/registrations",
    icon: Ticket,
  },
  {
    label: "Certificates",
    href: "/member/certificates",
    icon: FileBadge2,
  },
  {
    label: "Profile",
    href: "/member/profile",
    icon: IdCard,
  },
];
