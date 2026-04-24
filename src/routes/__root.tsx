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
      { title: "The Sanctuary" },
      {
        name: "description",
        content:
          "A private medical-wellness retreat in the Blue Ridge of Western North Carolina. One family in residence at a time.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "The Sanctuary" },
      { name: "twitter:title", content: "The Sanctuary" },
      { name: "description", content: "An ultra-luxury executive recovery retreat for high-net-worth individuals." },
      { property: "og:description", content: "An ultra-luxury executive recovery retreat for high-net-worth individuals." },
      { name: "twitter:description", content: "An ultra-luxury executive recovery retreat for high-net-worth individuals." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/Dfn8VavMxXS3yh70GuUB31JITni2/social-images/social-1777042068184-Screenshot_2026-04-24_at_10.31.38_AM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/Dfn8VavMxXS3yh70GuUB31JITni2/social-images/social-1777042068184-Screenshot_2026-04-24_at_10.31.38_AM.webp" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
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
