// The project's brand. Change these values for a new project, then run `pnpm theme`.
// Override only what the brand needs; everything else keeps the Revido defaults.
// All options: README.md → Theming.

/** @type {Parameters<typeof import("@revido-llc/kit/tokens").createTheme>[0]} */
const theme = {
  name: "acme",
  colors: { brand: "#16A34A" },
  // A client's own typeface (load it in app/layout.tsx first):
  // font: { sans: '"Geist", system-ui, sans-serif', features: "normal" },
};

export default theme;
