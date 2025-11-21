import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
    component: Dashboard,
});

function Dashboard() {
    // 1. Access the context defined in the parent layout
    // TypeScript knows 'user' exists here because of the parent route!
    const { user } = Route.useRouteContext();

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Overview</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <p>Welcome back, <span className="font-semibold">{user.name}</span></p>
                <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            {/* Your accounting widgets go here */}
        </div>
    );
}