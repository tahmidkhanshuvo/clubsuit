// src/components/public/site-footer.tsx
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-semibold text-slate-300">AUSTRC</span>{" "}
          <span>· Ahsanullah University of Science & Technology Robotics Club</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span>© {year} AUSTRC. All rights reserved.</span>
          <span className="hidden sm:inline-block">·</span>
          <span>Built for internal & public use.</span>
        </div>
      </div>
    </footer>
  );
}
