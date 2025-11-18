import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index"; // your drizzle instance

export const auth = betterAuth({
        socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
            accessType: "offline", 
            prompt: "select_account consent", 
        }}, 
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
});