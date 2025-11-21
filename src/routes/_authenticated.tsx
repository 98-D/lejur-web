// src/routes/_authenticated.tsx
import {
    createFileRoute,
    redirect,
    Outlet,
} from "@tanstack/react-router";
import { getSession } from "@/lib/auth-server";
import { CurrentUserPill } from "@/components/CurrentUserPill";

// This route group wraps all protected pages, e.g. /dashboard, /journal, etc.
export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async ({ location }) => {
        const session = await getSession();

        if (!session) {
            // Not logged in → punt them to login/landing
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }

        // Expose user + session to the layout + children
        return {
            user: session.user,
            session: session.session,
        };
    },
    component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
    // Grab what we returned in beforeLoad
    const { user } = Route.useRouteContext();

    return (
        <div className="min-h-screen flex bg-neutral-950 text-neutral-50">
            {/* Sidebar (can flesh this out later) */}
            <aside
                className="
          hidden md:flex
          w-60 flex-col
          border-r border-neutral-800
          bg-black/40
          backdrop-blur-sm
          px-4 py-4
          gap-4
        "
            >
                <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-400">
                    <div className="h-7 w-7 rounded-xl border border-neutral-700 flex items-center justify-center text-[10px] font-semibold">
                        L
                    </div>
                    <span>lejur</span>
                </div>

                {/* Placeholder nav – wire real links later */}
                <nav className="mt-2 flex flex-col gap-1 text-[12px] text-neutral-400">
          <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 mb-1">
            Navigation
          </span>
                    <div className="rounded-lg px-2 py-1.5 bg-neutral-900/80 text-neutral-100 text-xs">
                        Dashboard
                    </div>
                    <button className="rounded-lg px-2 py-1.5 text-left hover:bg-neutral-900/70 transition">
                        Journal
                    </button>
                    <button className="rounded-lg px-2 py-1.5 text-left hover:bg-neutral-900/70 transition">
                        Reports
                    </button>
                    <button className="rounded-lg px-2 py-1.5 text-left hover:bg-neutral-900/70 transition">
                        Settings
                    </button>
                </nav>
            </aside>

            {/* Main column */}
            <div className="flex-1 flex flex-col">
                {/* Top bar */}
                <header className="h-12 border-b border-neutral-800 px-4 md:px-6 flex items-center justify-between gap-3 bg-black/40 backdrop-blur-sm">
                    <div className="flex items-center gap-2 md:hidden">
                        {/* Mobile brand badge */}
                        <div className="h-7 w-7 rounded-xl border border-neutral-700 flex items-center justify-center text-[10px] font-semibold">
                            L
                        </div>
                        <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-400">
              lejur
            </span>
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-400">
                        <span>Workspace</span>
                    </div>

                    {/* Current user pill on the right */}
                    <CurrentUserPill
                        email={user.email}
                        name={user.name}
                        image={user.image}
                        size="sm"
                    />
                </header>

                {/* Content area */}
                <main className="flex-1 overflow-y-auto bg-[radial-gradient(40%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent_70%)]">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
