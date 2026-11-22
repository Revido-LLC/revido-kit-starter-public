import { projects } from "./data";
import { ProjectsView } from "./projects-view";

// A server component: load the page's data here (database, API), then hand it
// to the client component that owns the interaction.
export default function ProjectsPage() {
  return <ProjectsView initialProjects={projects} />;
}
