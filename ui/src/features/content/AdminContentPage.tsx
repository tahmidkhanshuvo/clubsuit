// src/features/admin/content/AdminContentPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";

const mockContent = [
  {
    id: "proj-1",
    title: "Line Follower Robot",
    type: "Project",
    status: "published" as const,
    updated: "2 days ago",
  },
  {
    id: "news-1",
    title: "AUSTRC wins national contest",
    type: "News",
    status: "scheduled" as const,
    updated: "1 week ago",
  },
  {
    id: "act-1",
    title: "Monthly internal meet-up",
    type: "Activity",
    status: "draft" as const,
    updated: "3 weeks ago",
  },
];

function statusTone(status: typeof mockContent[number]["status"]) {
  if (status === "published") return "success" as const;
  if (status === "scheduled") return "warning" as const;
  return "muted" as const;
}

export function AdminContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Content"
        description="Projects, activities, and news shown on the public AUSTRC website."
        actions={
          <Button variant="outline" disabled>
            New content (coming soon)
          </Button>
        }
      />

      <SimpleTable columns={["Title", "Type", "Status", "Last updated"]}>
        {mockContent.map((item) => (
          <SimpleTableRow key={item.id}>
            <SimpleTableCell>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-50">
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-500">
                  ID: {item.id}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {item.type}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill tone={statusTone(item.status)}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </StatusPill>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {item.updated}
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
