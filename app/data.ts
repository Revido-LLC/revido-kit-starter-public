// Example rows for the starter page. Replace with your own data source.
export type ProjectStatus = "active" | "at-risk" | "done";

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  budget: number;
}

export const projects: Project[] = [
  { id: "p-101", name: "Customer portal", client: "Acme Logistics", status: "active", budget: 48000 },
  { id: "p-102", name: "Field service app", client: "Northwind", status: "at-risk", budget: 36500 },
  { id: "p-103", name: "Quote builder", client: "Acme Logistics", status: "active", budget: 22000 },
  { id: "p-104", name: "Partner onboarding", client: "Globex", status: "done", budget: 15800 },
  { id: "p-105", name: "Inventory sync", client: "Initech", status: "active", budget: 29900 },
];

export const euro = new Intl.NumberFormat("en-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
