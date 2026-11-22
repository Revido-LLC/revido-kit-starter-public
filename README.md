# Revido Kit starter

Use Node.js 22 and pnpm 9.15.0. Clone the [public GitHub template](https://github.com/Revido-LLC/revido-kit-starter-public) or choose **Use this template** to create your own repository.

```sh
git clone https://github.com/Revido-LLC/revido-kit-starter-public.git
cd revido-kit-starter-public
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Select a row in the projects table to open the edit drawer, or choose **New project** to add a row. The example uses local state and resets on reload. It runs on Next.js 16 and pins `@revido-llc/kit@0.13.1` from the public npm registry. Setup requires no registry credentials.

## Check your changes

```sh
pnpm check
```

This checks the generated theme and its WCAG AA contrast, runs the Kit design and Next.js lint rules, typechecks the app, and builds it for production. CI runs the same command after a frozen install. Use `pnpm start` to serve the production build.

## Make it yours

- Edit `theme.config.mjs`, run `pnpm theme`, and commit the regenerated `app/theme.css`. The starter imports it after the Kit CSS so your tokens take precedence. The root layout follows the system light or dark preference and loads the Kit's self-hosted Inter font.
- Change the app title and breadcrumbs in `app/layout.tsx`. The layout owns the Kit page frame and uses `NextKitProvider` for navigation and motion.
- Use `app/projects-view.tsx`, `app/projects-table.tsx`, and `app/project-sheet.tsx` as examples for listing and editing your own data.
- For Codex, Claude Code, or Cursor, start with [the versioned agent guide](AGENTS.md). It includes a copyable table-and-drawer prompt.
- To upgrade the Kit, read the installed package's `CHANGELOG.md`, run `pnpm add -E @revido-llc/kit@<version>`, regenerate the theme, and run `pnpm check`. Commit the lockfile with dependency changes.
