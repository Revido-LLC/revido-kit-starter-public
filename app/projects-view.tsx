"use client";

import { useState } from "react";
import { Page, PageHeader, PageSummary } from "@revido-llc/kit";
import { euro, type Project } from "./data";
import { ProjectSheet } from "./project-sheet";
import { ProjectsTable } from "./projects-table";

export function ProjectsView({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [sheet, setSheet] = useState<{ project?: Project } | null>(null);

  const active = projects.filter((project) => project.status === "active").length;
  const atRisk = projects.filter((project) => project.status === "at-risk").length;
  const budget = projects.reduce((sum, project) => sum + project.budget, 0);

  return (
    <Page>
      <PageHeader
        title="Projects"
        count={projects.length}
        primaryAction={{ label: "New project", onPress: () => setSheet({}) }}
      />
      <PageSummary
        items={[
          { value: String(active), label: "active" },
          { value: String(atRisk), label: "at risk" },
          { value: euro.format(budget), label: "total budget" },
        ]}
      />
      <ProjectsTable projects={projects} onEdit={(project) => setSheet({ project })} />
      {sheet && (
        <ProjectSheet
          project={sheet.project}
          onClose={() => setSheet(null)}
          onSave={(project) =>
            setProjects((current) =>
              sheet.project
                ? current.map((row) => (row.id === project.id ? project : row))
                : [...current, project],
            )
          }
        />
      )}
    </Page>
  );
}
