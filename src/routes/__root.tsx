import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter,
} from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass rounded-3xl p-10 max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lost in the gym</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for isn't on the program.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass rounded-3xl p-10 max-w-md text-center">
        <h1 className="font-display text-xl font-semibold">Something went sideways</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing the page.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-xl border border-border px-4 py-2 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
