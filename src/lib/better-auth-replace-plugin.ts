// src/lib/better-auth-replace-plugin.ts
import type { BetterAuthPlugin } from "better-auth";
import { redirect } from "@tanstack/react-router";

export const replaceHistoryOnSuccess = (): BetterAuthPlugin => ({
    id: "replace-history-on-success",
    hooks: {
        // This runs on EVERY successful sign-in (social, email, etc.)
        async signIn({ ctx, redirectTo }) {
            // If we're in a server context (OAuth callback, email sign-in, etc.)
            if (ctx?.redirect) {
                // Throw TanStack redirect with replace: true
                throw redirect({
                    to: redirectTo ?? "/dashboard",
                    replace: true,          // ← this nukes /login from history
                });
            }
        },
    },
});