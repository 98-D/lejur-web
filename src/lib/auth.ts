import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
import { reactStartCookies } from "better-auth/react-start"; // ← add this import

import * as schema from "@/db/schema";
import {replaceHistoryOnSuccess} from "@/lib/better-auth-replace-plugin.ts";

export const auth = betterAuth({
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            prompt: "select_account consent",
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema,
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // Cache duration in seconds
        },
    },
    plugins: [

        replaceHistoryOnSuccess(),   // ← put this first (or anywhere before the last one)
        // Keep this as the very last plugin (required for cookie handling)
        reactStartCookies(),
    ],
});