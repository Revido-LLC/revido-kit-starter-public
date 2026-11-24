// Turns theme.config.mjs into app/theme.css with the Kit's own token renderer,
// and stops if the brand colours miss WCAG AA contrast in light or dark mode.
//
//   node scripts/build-theme.mjs          write app/theme.css
//   node scripts/build-theme.mjs --check  fail when app/theme.css is out of date (CI)
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { clampToSrgb, contrastReport, createTheme, renderTokensCss } from "@revido/kit/tokens";
import brand from "../theme.config.mjs";

const theme = createTheme(brand);

const failures = contrastReport(theme).filter((result) => !result.pass);
if (failures.length > 0) {
  console.error(`Theme "${theme.name}" fails WCAG AA contrast. Pick a darker or lighter brand colour:`);
  for (const { mode, foreground, background, ratio, minimum } of failures) {
    console.error(`  ${mode}: ${foreground} on ${background} is ${ratio}:1, needs ${minimum}:1`);
  }
  process.exit(1);
}

// The project's theme owns :root and .dark, so it replaces the Revido colours
// that @revido/kit/css sets. Import it after the Kit CSS (app/globals.css).
// The Kit's renderer opens with its own "edit packages/kit" header; replace it with ours.
const header = `/* GENERATED from theme.config.mjs by \`pnpm theme\` (scripts/build-theme.mjs). Do not edit.
 * Revido Kit tokens for theme "${theme.name}", light and dark. */
`;
const css = header + renderTokensCss([theme], clampToSrgb).replace(/^\/\*[\s\S]*?\*\/\n/, "");
const target = new URL("../app/theme.css", import.meta.url);

if (process.argv.includes("--check")) {
  const current = existsSync(target) ? readFileSync(target, "utf8") : "";
  if (current !== css) {
    console.error("app/theme.css is out of date. Run `pnpm theme` and commit the result.");
    process.exit(1);
  }
  console.log(`app/theme.css matches theme "${theme.name}".`);
} else {
  writeFileSync(target, css);
  console.log(`Wrote app/theme.css for theme "${theme.name}".`);
}
