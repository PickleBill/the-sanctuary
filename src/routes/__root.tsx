import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0F172A" },
      // No og:image at root — leaf routes set their own per the TanStack rule.
      // Per-route head() concatenates with root, and a root og:image would
      // pollute every page (e.g. /privacy-policy gets the homepage hero).
      // Default title/description are minimal placeholders; every leaf overrides.
      { title: "Sanctuary Southeast" },
      {
        name: "description",
        content:
          "A private medical-wellness retreat in the Blue Ridge of Western North Carolina. One family in residence at a time.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Sanctuary Southeast" },
      { name: "twitter:title", content: "Sanctuary Southeast" },
      { name: "description", content: "Sanctuary Southeast offers an ultra-luxury executive recovery retreat for high-net-worth individuals." },
      { property: "og:description", content: "Sanctuary Southeast offers an ultra-luxury executive recovery retreat for high-net-worth individuals." },
      { name: "twitter:description", content: "Sanctuary Southeast offers an ultra-luxury executive recovery retreat for high-net-worth individuals." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a815d0ee-f319-4b03-8f84-57cfcb33b282/id-preview-f8fb4223--14cfc7e9-e959-4f21-9f32-73470da14fa9.lovable.app-1776977454842.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a815d0ee-f319-4b03-8f84-57cfcb33b282/id-preview-f8fb4223--14cfc7e9-e959-4f21-9f32-73470da14fa9.lovable.app-1776977454842.png" },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
