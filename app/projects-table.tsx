"use client";

import { Badge, DataTable, createDataTableColumnHelper } from "@revido-llc/kit";
import { euro, type Project, type ProjectStatus } from "./data";

const status: Record<ProjectStatus, { label: string; tone: "success" | "warning" | "neutral" }> = {
  active: { label: "Active", tone: "success" },
  "at-risk": { label: "At risk", tone: "warning" },
  done: { label: "Done", tone: "neutral" },
};

const helper = createDataTableColumnHelper<Project>();
const columns = helper.columns([
  helper.accessor("name", { header: "Project", enableSorting: true }),
  helper.accessor("client", { header: "Client", enableSorting: true }),
  helper.accessor("status", {
    header: "Status",
    cell: (info) => <Badge tone={status[info.getValue()].tone}>{status[info.getValue()].label}</Badge>,
  }),
  helper.accessor("budget", { header: "Budget", enableSorting: true, cell: (info) => euro.format(info.getValue()) }),
]);

export function ProjectsTable({ projects, onEdit }: { projects: Project[]; onEdit: (project: Project) => void }) {
  return (
    <DataTable
      aria-label="Projects"
      data={projects}
      columns={columns}
      itemLabel="projects"
      onRowAction={onEdit}
    />
  );
}
