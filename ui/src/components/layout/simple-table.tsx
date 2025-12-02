// src/components/layout/simple-table.tsx
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SimpleTableProps = {
  columns: string[];
  children: ReactNode;
};

export function SimpleTable({ columns, children }: SimpleTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-slate-800 bg-slate-950/80">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">{children}</tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

type SimpleTableRowProps = {
  children: ReactNode;
  className?: string;
};

export function SimpleTableRow({ children, className }: SimpleTableRowProps) {
  return <tr className={cn("hover:bg-slate-900/40", className)}>{children}</tr>;
}

type SimpleTableCellProps = {
  children: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
};

const alignClass: Record<NonNullable<SimpleTableCellProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function SimpleTableCell({
  children,
  align = "left",
  className,
}: SimpleTableCellProps) {
  return (
    <td
      className={cn(
        "px-4 py-2 text-xs text-slate-200",
        alignClass[align],
        className,
      )}
    >
      {children}
    </td>
  );
}
