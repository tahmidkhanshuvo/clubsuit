// src/features/executive/tasks/ExecutiveTasksPage.tsx
import { PageHeader } from "@/components/layout/page-header";
import {
  SimpleTable,
  SimpleTableRow,
  SimpleTableCell,
} from "@/components/layout/simple-table";
import { StatusPill } from "@/components/ui/status-pill";

const mockTasks = [
  {
    id: "task-1",
    title: "Finalize event schedule",
    event: "Robo Carnival 2025",
    due: "Jan 10, 2025",
    status: "in-progress" as const,
  },
  {
    id: "task-2",
    title: "Confirm sponsor logos",
    event: "Robo Carnival 2025",
    due: "Jan 5, 2025",
    status: "pending" as const,
  },
  {
    id: "task-3",
    title: "Brief volunteers",
    event: "Robotics Showcase 2024",
    due: "Dec 18, 2024",
    status: "done" as const,
  },
];

export function ExecutiveTasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Tasks assigned to you for events and teams."
      />

      <SimpleTable columns={["Task", "Event", "Due", "Status"]}>
        {mockTasks.map((task) => (
          <SimpleTableRow key={task.id}>
            <SimpleTableCell>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-50">
                  {task.title}
                </span>
                <span className="text-[11px] text-slate-500">
                  ID: {task.id}
                </span>
              </div>
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {task.event}
            </SimpleTableCell>
            <SimpleTableCell className="text-slate-300">
              {task.due}
            </SimpleTableCell>
            <SimpleTableCell>
              <StatusPill
                tone={
                  task.status === "done"
                    ? "success"
                    : task.status === "in-progress"
                    ? "warning"
                    : "muted"
                }
              >
                {task.status === "done"
                  ? "Done"
                  : task.status === "in-progress"
                  ? "In progress"
                  : "Pending"}
              </StatusPill>
            </SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTable>
    </div>
  );
}
