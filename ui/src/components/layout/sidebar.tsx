// src/components/layout/sidebar.tsx
import type { NavItem } from "@/types/nav";
import { SidebarNav } from "./sidebar-nav";

type SidebarProps = {
  appShortName?: string; // e.g. "AUSTRC"
  appLabel: string;      // e.g. "IT Console"
  appSubtitle?: string;
  navItems: NavItem[];
};

export function Sidebar({
  appShortName = "AUSTRC",
  appLabel,
  appSubtitle,
  navItems,
}: SidebarProps) {
  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="px-4 pt-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-[11px] font-bold tracking-tight">
            {appShortName.slice(0, 3).toUpperCase()}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">
              {appShortName}
            </div>
            <div className="text-sm font-semibold text-slate-50">
              {appLabel}
            </div>
          </div>
        </div>
        {appSubtitle ? (
          <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
            {appSubtitle}
          </p>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <SidebarNav items={navItems} />
      </div>
    </aside>
  );
}
