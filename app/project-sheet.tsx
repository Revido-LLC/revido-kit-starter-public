"use client";

import {
  Button,
  NumberField,
  Select,
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  TextField,
} from "@revido/kit";
import type { Project, ProjectStatus } from "./data";

const statusOptions: Array<{ id: ProjectStatus; label: string }> = [
  { id: "active", label: "Active" },
  { id: "at-risk", label: "At risk" },
  { id: "done", label: "Done" },
];

interface ProjectSheetProps {
  project?: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export function ProjectSheet({ project, onClose, onSave }: ProjectSheetProps) {
  return (
    <Sheet
      isOpen
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {({ close }) => (
        <form
          className="contents"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            // The example saves to browser state. Call your backend here for persistence.
            onSave({
              id: project?.id ?? crypto.randomUUID(),
              name: String(form.get("name")),
              client: String(form.get("client")),
              status: form.get("status") as ProjectStatus,
              budget: Number(form.get("budget")),
            });
            close();
          }}
        >
          <SheetHeader>
            <SheetTitle>{project ? "Edit project" : "New project"}</SheetTitle>
            <SheetDescription>Changes appear in the projects table.</SheetDescription>
          </SheetHeader>
          <SheetBody>
            <TextField name="name" label="Project name" defaultValue={project?.name} isRequired autoFocus />
            <TextField name="client" label="Client" defaultValue={project?.client} isRequired />
            <Select name="status" label="Status" items={statusOptions} defaultSelectedKey={project?.status} isRequired />
            <NumberField
              name="budget"
              label="Budget"
              defaultValue={project?.budget}
              formatOptions={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
              minValue={0}
              isRequired
            />
          </SheetBody>
          <SheetFooter>
            <SheetClose />
            <Button type="submit">{project ? "Save changes" : "Create project"}</Button>
          </SheetFooter>
        </form>
      )}
    </Sheet>
  );
}
