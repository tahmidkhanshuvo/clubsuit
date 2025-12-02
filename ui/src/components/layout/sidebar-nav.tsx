// src/components/layout/sidebar-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SidebarNavProps = {
  items: NavItem[];
};

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 text-sm">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors",
              isActive
                ? "bg-slate-800 text-slate-50"
                : "text-slate-300 hover:bg-slate-900/80 hover:text-slate-50",
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/60 group-hover:border-slate-600",
                isActive && "border-slate-600",
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="flex-1 text-xs font-medium">{item.label}</span>
            {item.badge ? (
              <Badge className="ml-auto text-[9px] px-1.5 py-[1px]">
                {item.badge}
              </Badge>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
