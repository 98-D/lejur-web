import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { getSession } from "@/lib/auth-server"; // The server function we made earlier


export const Route = createFileRoute("/_authenticated")({
    // 1. BEFORE LOAD: This runs on the server
    beforeLoad: async ({ location }) => {
        const session = await getSession();

        // 2. If no session, kick them out
        if (!session) {
            throw redirect({
                to: "/login",
                search: {
                    // This lets you redirect them back after they login
                    redirect: location.href,
                },
            });
        }

        // 3. If valid, return user data to the context
        return {
            user: session.user,
            session: session.session
        };
    },
    component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
    // Access the user data we returned in beforeLoad
    //const { user } = Route.useRouteContext();

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Shared Sidebar for all protected routes */}


            <main className="flex-1 overflow-y-auto p-8">
                {/* This is where dashboard.tsx, invoices.tsx, etc. will render */}
                <Outlet />
            </main>
        </div>
    );
}