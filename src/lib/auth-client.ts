// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

const baseURL =
    import.meta.env.VITE_BETTER_AUTH_URL ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

console.log("AUTH CLIENT baseURL =", baseURL);

export const authClient = createAuthClient({
    baseURL,
});

export const {
    signIn,
    signOut,
    signUp,
    useSession,
    getSession,
} = authClient;

// Debug entry
if (typeof window !== "undefined") {
    // @ts-ignore
    window.__auth = { getSession };
}
