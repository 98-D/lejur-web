import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
    component: HomePage,
});

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

    return (
        <button
            onClick={toggle}
            className="
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium
        border border-black/10 bg-black/5 text-black/70
        dark:border-white/15 dark:bg-white/5 dark:text-white/70
        hover:bg-black/10 dark:hover:bg-white/10
        transition
      "
        >
      <span
          className="
          w-4 h-4 rounded-full border flex items-center justify-center text-[9px]
          border-black/30 text-black/70
          dark:border-white/40 dark:text-white/80
        "
      >
        {theme === "dark" ? "☾" : "☀"}
      </span>
            {theme === "dark" ? "Dark mode" : "Light mode"}
        </button>
    );
}

function LejurLogo() {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex items-baseline gap-1">
        <span className="pl-2 text-5xl font-light tracking-[0.16em] uppercase">
          lejur
        </span>
            </div>
            <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-sky-400/90" />
                <span className="w-4 h-4 rounded-full bg-emerald-400/90" />
                <span className="w-4 h-4 rounded-full bg-amber-300/90" />
                <span className="w-4 h-4 rounded-full bg-rose-400/90" />
                <span className="w-4 h-4 rounded-full bg-indigo-400/90" />
            </div>
        </div>
    );
}

function HomePage() {
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div
            className={`
        min-h-dvh flex flex-col
        bg-white text-black
        dark:bg-[#02040A] dark:text-white
        bg-[radial-gradient(40%_50%_at_50%_0%,rgba(79,70,229,0.10),transparent_70%)]
        dark:bg-[radial-gradient(40%_50%_at_50%_0%,rgba(79,70,229,0.22),transparent_70%)]
        transition-colors
      `}
        >
            <header
                className="
          w-full
          max-w-5xl mx-auto
          px-5 pt-6 pb-3
          flex items-center justify-between gap-4
        "
            >
                <div className="flex items-center gap-2 text-[9px] tracking-[0.18em] uppercase text-black/55 dark:text-white/45" />
                <ThemeToggle />
            </header>

            <main className="flex-1 w-full flex items-center justify-center">
                <section
                    className={` select-none
            w-full max-w-5xl mx-auto px-5
            flex flex-col items-center text-center
            gap-6
            py-10 sm:py-14
            transition-all duration-500
            ${
                        entered
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                    }
          `}
                >
                    <LejurLogo />

                    <p className="select-none max-w-md text-sm sm:text-base text-black/70 dark:text-white/55">
                        a modern accounting application
                    </p>

                    <div className="pr-15 pl-15 mt-4 w-full max-w-xs flex flex-col gap-3.5">
                        <Link
                            to="/app"
                            className="
                w-full inline-flex items-center justify-center
                rounded-xl px-5 py-3 text-sm font-medium
                bg-black text-white
                dark:bg-white dark:text-black
                border border-black/90 dark:border-white/90
                hover:translate-y-[1px] hover:shadow-sm
                active:translate-y-[2px] active:shadow-none
                transition
              "
                        >
                            Enter app
                        </Link>

                        <Link
                            to="/learn-more"
                            className="
                w-full inline-flex items-center justify-center
                rounded-xl px-5 py-3 text-sm font-medium
                border border-black/10 text-black/80 bg-white/90
                dark:border-white/50 dark:text-white/80 dark:bg-transparent
                hover:bg-black/5 dark:hover:bg-white/5
                hover:translate-y-[1px]
                active:translate-y-[2px]
                transition
              "
                        >
                            Learn more
                        </Link>
                    </div>
                </section>
            </main>

            <footer
                className="
          w-full
          max-w-5xl mx-auto
          px-5 pb-5
          flex justify-end
        "
            >
        <span className="text-[9px] mr-20 tracking-[0.16em] uppercase text-black/35 dark:text-white/25">
          2025 • Orion - v0.11
        </span>
            </footer>
        </div>
    );
}
