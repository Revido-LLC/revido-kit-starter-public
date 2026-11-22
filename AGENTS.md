# Revido Kit agent guide

This starter targets `@revido-llc/kit@0.13.1`. Use the docs shipped with the installed version. Install the project with `pnpm install --frozen-lockfile` if needed.

1. Open `node_modules/@revido-llc/kit/dist/generated/llms.txt` for the component index. Read the relevant Markdown in `dist/generated/docs/` inside that package, starting with `data-table.md` and `sheet.md`. These pages include usage examples. The companion examples are available as `@revido-llc/kit/examples/data-table` and `@revido-llc/kit/examples/sheet`.
2. Follow `app/projects-table.tsx`, `app/projects-view.tsx`, and `app/project-sheet.tsx`. Use the Kit page frame, `DataTable`, and `Sheet` with labeled Kit fields. Keep `NextKitProvider` and use semantic classes like `bg-background` and `text-foreground`. Read the relevant installed Next.js guide in `node_modules/next/dist/docs/` before changing routing or server and client component boundaries.
3. If you change `theme.config.mjs`, run `pnpm theme` and commit `app/theme.css`. Run `pnpm check` before finishing and resolve any failures. MCP is optional.

Codex reads this file directly. Claude Code imports it from `CLAUDE.md`, and the Cursor project rule points here.

## Copyable prompt

```text
Build a projects table with an edit drawer in this starter. Read AGENTS.md and
the installed Kit's DataTable and Sheet docs first. Use the existing projects
example and Kit components. When a user activates a row, open a Sheet with
the current project values. Save edits back to the table and close the Sheet.
Keep Cancel and Escape from changing the row. Preserve keyboard access,
labels and theme tokens. Run pnpm check before you finish.
```
