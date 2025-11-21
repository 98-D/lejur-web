import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index"; // your drizzle instance
import { reactStartCookies } from "better-auth/react-start";
import * as schema from "@/db/schema"

export const auth = betterAuth({
        socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            prompt: "select_account consent", 
        }}, 
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural:true,
        schema
        // or "mysql", "sqlite"
    }),
      plugins: [reactStartCookies()] // make sure this is the last plugin in the array
});