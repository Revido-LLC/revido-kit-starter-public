import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageBar, PageContent, PageProvider } from "@revido/kit";
import { NextKitProvider } from "@revido/kit/next";
import { revidoFont } from "@revido/kit/next/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme",
  description: "Built on the Revido Kit.",
};

// The Kit styles dark mode through a `dark` class on <html>. This follows the
// system setting before the first paint and whenever it changes.
const followSystemColorMode = `(() => {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const apply = () => document.documentElement.classList.toggle("dark", query.matches);
  apply();
  query.addEventListener("change", apply);
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={revidoFont.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: followSystemColorMode }} />
      </head>
      <body className="flex h-dvh flex-col bg-background text-foreground">
        <NextKitProvider>
          <PageProvider>
            <PageBar crumbs={[{ label: "Acme", href: "/" }, { label: "Projects" }]} />
            <PageContent>{children}</PageContent>
          </PageProvider>
        </NextKitProvider>
      </body>
    </html>
  );
}
