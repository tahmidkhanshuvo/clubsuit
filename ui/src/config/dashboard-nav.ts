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
  Inbox,
  MessageCircle,
} from "lucide-react";
import type { NavItem } from "@/types/nav";

/**
 * IT Team navigation
 * Extra items:
 * - System Settings
 * - Audit Logs
 */
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
    label: "Content",
    href: "/it/content",
    icon: Newspaper,
  },
  {
    label: "Certificates",
    href: "/it/certificates",
    icon: FileBadge2,
  },
  {
    label: "Mailbox",
    href: "/it/mailbox",
    icon: Inbox,
  },
  {
    label: "Messages",
    href: "/it/messages",
    icon: MessageCircle,
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

/**
 * Admin Team navigation
 * Shares most items & order with IT, without system-level tools.
 */
export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Panels & Teams",
    href: "/admin/panels",
    icon: Shield,
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
    label: "Mailbox",
    href: "/admin/mailbox",
    icon: Inbox,
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: MessageCircle,
  },
];

/**
 * Member navigation
 */
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
    label: "Mailbox",
    href: "/member/mailbox",
    icon: Inbox,
  },
  {
    label: "Messages",
    href: "/member/messages",
    icon: MessageCircle,
  },
  {
    label: "Profile",
    href: "/member/profile",
    icon: IdCard,
  },
];

/**
 * Executive navigation
 */
export const executiveNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/executive",
    icon: LayoutDashboard,
  },
  {
    label: "Events I manage",
    href: "/executive/events",
    icon: CalendarDays,
  },
  {
    label: "My teams",
    href: "/executive/teams",
    icon: Users,
  },
  {
    label: "Tasks",
    href: "/executive/tasks",
    icon: ScrollText,
  },
  {
    label: "Certificates",
    href: "/executive/certificates",
    icon: FileBadge2,
  },
  {
    label: "Mailbox",
    href: "/executive/mailbox",
    icon: Inbox,
  },
  {
    label: "Messages",
    href: "/executive/messages",
    icon: MessageCircle,
  },
  {
    label: "Profile",
    href: "/executive/profile",
    icon: IdCard,
  },
];
