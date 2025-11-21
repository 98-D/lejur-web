// src/routes/login.tsx
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export const Route = createFileRoute("/login")({
    component: LoginPage,
});

function LoginPage() {
    // @ts-ignore
    const { redirect } = Route.useSearch() ?? {};

    const handleSignIn = () => {
        authClient.signIn.social({ provider: "google" });
        // That's literally it. No redirect param, no replace, no nothing.
    };

    // @ts-ignore
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
