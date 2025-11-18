import {
    createFileRoute,
    Link,
    Outlet,
    useRouterState,
} from "@tanstack/react-router";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TopNav } from "@/components/ui/TopNav";
import {LejurKebabMenu} from "@/components/ui/LejurMenu.tsx";

export const Route = createFileRoute("/app")({
    component: AppShellLayout,
});

// ---- Theme handling (unchanged) ----

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
        localStorage.setItem("lejur-theme", theme);
    } catch {}
}

function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "dark";
    try {
        const stored = localStorage.getItem("lejur-theme");
        if (stored === "light" || stored === "dark") return stored;
    } catch {}
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
}

function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const initial = getInitialTheme();
        setTheme(initial);
        applyTheme(initial);
    }, []);

    const toggle = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
    };

    const isDark = theme === "dark";

    return (
        <button
            onClick={toggle}
            className={[
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                "text-[10px] font-medium",
                "border border-black/8 bg-black/3 text-black/70",
                "dark:border-white/18 dark:bg-white/4 dark:text-white/75",
                "hover:bg-black/7 dark:hover:bg-white/8",
                "hover:-translate-y-[0.5px]",
                "hover:shadow-[0_6px_16px_rgba(0,0,0,0.18)]",
                "focus-visible:outline-none focus-visible:ring-1",
                "focus-visible:ring-black/45 dark:focus-visible:ring-white/55",
                "transition-all duration-160 ease-out",
            ].join(" ")}
        >
      <span
          className={[
              "w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px]",
              isDark
                  ? "bg-black/80 text-white/85 border border-white/12"
                  : "bg-white/95 text-amber-500 border border-black/10",
          ].join(" ")}
      >
        {isDark ? "☾" : "☀"}
      </span>
            <span className="uppercase tracking-[0.16em]">
        {isDark ? "Dark" : "Light"}
      </span>
        </button>
    );
}

// ---- Bits of chrome (unchanged) ----

function LejurMark() {
    return (
        <div className="inline-flex items-center gap-2">
      <span
          className="
          text-lg font-semibold tracking-[0.22em] uppercase
          text-neutral-900/90 dark:text-neutral-50
        "
      >
        lejur
      </span>
            <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-sky-400/95" />
        <span className="w-2 h-2 rounded-full bg-emerald-400/95" />
        <span className="w-2 h-2 rounded-full bg-amber-300/95" />
        <span className="w-2 h-2 rounded-full bg-rose-400/95" />
        <span className="w-2 h-2 rounded-full bg-indigo-400/95" />
      </span>
        </div>
    );
}

function CurrentOrgPill() {
    return (
        <div
            className={[
                "inline-flex items-center gap-1.5 px-2.75 py-1.25",
                "rounded-full",
                "border border-black/6 bg-black/2 text-black/70",
                "dark:border-white/14 dark:bg-white/4 dark:text-white/75",
                "text-[9.5px] backdrop-blur-[2px]",
            ].join(" ")}
        >
      <span className="uppercase tracking-[0.16em] text-[9px] text-black/55 dark:text-white/55">
        Org
      </span>
            <span className="text-[10px] font-medium text-black/80 dark:text-white/80">
        demo org
      </span>
        </div>
    );
}

function UserPill() {
    return (
        <button
            className={[
                "inline-flex items-center gap-2 px-2.75 py-1.25",
                "rounded-full border",
                "border-black/10 bg-white/96 text-black/80",
                "dark:border-white/26 dark:bg-white/5 dark:text-white/78",
                "hover:bg-white dark:hover:bg-white/10",
                "hover:-translate-y-[0.5px]",
                "hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]",
                "focus-visible:outline-none focus-visible:ring-1",
                "focus-visible:ring-black/40 dark:focus-visible:ring-white/55",
                "text-[10px] font-medium transition-all duration-160 ease-out",
            ].join(" ")}
        >
            <span className="w-5 h-5 rounded-full bg-black/85 dark:bg-white/85" />
            <span>you</span>
        </button>
    );
}

// ---- App Shell Layout ----

function AppShellLayout() {
    const [entered, setEntered] = useState(false);
    const { location } = useRouterState(); // THIS is the important part

    useEffect(() => {
        const id = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div
            className={[
                "min-h-dvh",
                "bg-white text-black",
                "dark:bg-[#02040A] dark:text-white",
                "bg-[radial-gradient(40%_40%_at_50%_0%,rgba(79,70,229,0.06),transparent_70%)]",
                "dark:bg-[radial-gradient(40%_40%_at_50%_0%,rgba(79,70,229,0.16),transparent_70%)]",
                "transition-colors duration-200",
            ].join(" ")}
        >
            <header>
            <header
                className={[
                    "sticky top-0 z-40 w-full",
                    "bg-white/94 dark:bg-[#02040A]/96",
                    "backdrop-blur-md",
                    "border-b border-black/5 dark:border-white/10",
                ].join(" ")}
            >
                <div
                    className={[
                        "max-w-6xl mx-auto px-4",
                        "h-12",
                        "grid grid-cols-3 items-center gap-4",
                    ].join(" ")}
                >
                    <div className="flex items-center gap-3 justify-start">
                       <LejurKebabMenu></LejurKebabMenu>
                        <CurrentOrgPill />
                    </div>

                    <div className="flex justify-center">
                        <Link to="/" className="inline-flex" preload="intent">
                            <LejurMark />
                        </Link>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <ThemeToggle />
                        <UserPill />
                    </div>
                </div>
            </header>

            <TopNav />
            </header>

            <main className="relative h-full overflow-y-auto overscroll-contain max-w-[95rem] mx-auto px-4 pb-6 pt-3">

                        <Outlet />


            </main>
        </div>
    );
}
