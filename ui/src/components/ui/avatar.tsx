// src/components/ui/avatar.tsx
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  initials?: string;
};

export function Avatar({ initials = "IT", className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-100",
        className,
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
