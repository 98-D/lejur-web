// src/lib/auth-server.ts
"use server";

import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { auth } from "./auth"; // or "@/lib/auth" depending on your path

export const getSession = createServerFn({ method: "GET" }).handler(
    async () => {
        const req = getRequest();

        const res = await auth.api.getSession({
            headers: req.headers,
            asRequest: true, // Enables full Response for cookie handling
        });

        // Parse session from response
        const session = await res.json();

        // Apply any Set-Cookie headers to update/refresh cookies (fixes cache issues)
        const setCookieHeaders = res.headers.getSetCookie();
        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie) => {
                setResponseHeader("Set-Cookie", cookie);
            });
        }

        return session;
    },
);