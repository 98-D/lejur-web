import {
    createAuthClient
} from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_BETTER_AUTH_URL ?? process.env.VITE_BETTER_AUTH_URL as string
})

export const {
    signIn,
    signOut,
    signUp,
    useSession,
    getSession,     // imperative fetch
} = authClient;