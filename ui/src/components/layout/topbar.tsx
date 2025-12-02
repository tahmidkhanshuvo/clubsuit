// src/components/layout/topbar.tsx
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { Search, Bell } from "lucide-react";

type TopbarProps = {
  roleLabel: string;        // e.g. "IT Team"
  roleDescription?: string; // e.g. "System & infrastructure access"
};

export function Topbar({ roleLabel, roleDescription }: TopbarProps) {
  return (
    <header className="border-b border-slate-800 px-4 md:px-6 py-3 flex items-center justify-between gap-3 bg-slate-950/80 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">
          AUSTRC
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950/70 px-2 py-1">
          <Search className="h-3.5 w-3.5 text-slate-500" />
          <input
            className="bg-transparent border-none text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
            placeholder="Search (coming soon)"
            disabled
          />
        </div>

        <IconButton aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </IconButton>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-medium text-slate-100">
              {roleLabel}
            </span>
            {roleDescription ? (
              <span className="text-[11px] text-slate-500">
                {roleDescription}
              </span>
            ) : null}
          </div>
          <Avatar />
        </div>
      </div>
    </header>
  );
}
