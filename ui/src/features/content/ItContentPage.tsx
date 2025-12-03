// src/features/it/content/ItContentPage.tsx
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
    visibility: "Public",
    updated: "2 days ago",
  },
  {
    id: "news-1",
    title: "AUSTRC wins national contest",
    type: "News",
    visibility: "Public",
    updated: "1 week ago",
  },
  {
    id: "act-1",
    title: "Monthly internal meet-up",
    type: "Activity",
    visibility: "Hidden",
    updated: "3 weeks ago",
  },
];

export function ItContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Content"
        description="Projects, activities, and public-facing content managed by the admin team."
        actions={
          <Button variant="outline" disabled>
            Open CMS (coming soon)
          </Button>
        }
      />

      <SimpleTable
        columns={["Title", "Type", "Visibility", "Last updated"]}
      >
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
              <StatusPill
                tone={item.visibility === "Public" ? "success" : "muted"}
              >
                {item.visibility}
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
