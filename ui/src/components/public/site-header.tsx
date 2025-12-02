"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const mainNav = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo / brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-[11px] font-bold tracking-tight">
            AUS
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold text-slate-300">
              Ahsanullah University of Science & Technology
            </div>
            <div className="text-sm font-semibold text-slate-50">
              Robotics Club (AUSTRC)
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 text-xs font-medium text-slate-300 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1 transition-colors",
                isActive(pathname, item.href)
                  ? "bg-slate-800 text-slate-50"
                  : "hover:bg-slate-900 hover:text-slate-50",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: login */}
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button
              variant="outline"
              className="h-8 rounded-full px-3 text-xs font-medium"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
