// src/lib/auth-server.ts
"use server";

import { createServerFn } from "@tanstack/react-start";
import {getRequest } from "@tanstack/react-start/server";
import { auth } from "./auth"; // or "@/lib/auth" depending on your path

export const getSession = createServerFn({ method: "GET" }).handler(
    async () => {
        const req = getRequest();
        if (!req) return null;

        const session = await auth.api.getSession({
            headers: req.headers, // Better Auth reads cookies from here
        });

        // Better Auth returns null if not logged in
        return session;
    },
);
