// src/routes/login.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";


const searchSchema = z.object({
    redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
    validateSearch: searchSchema,

    beforeLoad: async ({ context, search }) => {
        const user = await context.queryClient.ensureQueryData();
        if (user) {
            throw redirect({
                to: search.redirect ?? "/dashboard",
                replace: true,
            });
        }
    },

    component: LoginPage,
});

function LoginPage() {
    const { redirect } = Route.useSearch();

    const handleSignIn = () => {
        const callbackURL = redirect ?? "/dashboard";

        authClient.signIn.social({
            provider: "google",
            callbackURL, // must be a string
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950">
            <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
                <h1 className="text-lg font-semibold mb-2 text-neutral-50">
                    Sign in to lejur
                </h1>
                <p className="text-sm text-neutral-400 mb-6">
                    Use your Google account to continue.
                </p>

                <GoogleSignInButton onClick={handleSignIn} />
            </div>
        </div>
    );
}
