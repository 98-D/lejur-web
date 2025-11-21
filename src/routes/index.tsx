import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GoogleSignInButton } from "@/components/GoogleSignInButton.tsx";

export const Route = createFileRoute("/")({
    component: HomePage,
});

type Theme = "light" | "dark";
type View = "none" | "login" | "learn";

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
    const [view, setView] = useState<View>("none");

    useEffect(() => {
        const id = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const openLogin = () => setView("login");
    const openLearn = () => setView("learn");
    const closeOverlay = () => setView("none");

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
                    className={`
            select-none
            w-full max-w-5xl mx-auto px-5
            flex flex-col items-center text-center
            gap-6
            py-10 sm:py-14
            transition-all duration-500
            ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
                >
                    <LejurLogo />

                    <p className="select-none max-w-md text-sm sm:text-base text-black/70 dark:text-white/55">
                        a modern accounting application
                    </p>

                    {/* Main CTAs */}
                    <div className="mt-2 w-full max-w-xs flex flex-col gap-3.5">
                        <button
                            type="button"
                            onClick={openLogin}
                            className="
                w-full inline-flex items-center justify-center
                rounded-xl px-5 py-3 text-sm font-medium
                border border-black/80 text-white bg-black
                dark:border-white/80 dark:bg-white dark:text-black
                hover:translate-y-[1px]
                active:translate-y-[2px]
                transition
              "
                        >
                            Sign in with Google
                        </button>

                        <button
                            type="button"
                            onClick={openLearn}
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
                        </button>
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
          2025 • Build=0.14 • Release=ORION
        </span>
            </footer>

            {/* Full-page overlay / takeover */}
            {view !== "none" && (
                <div
                    className="
            fixed inset-0 z-30
            flex items-center justify-center
            bg-black/60 backdrop-blur-md
          "
                >
                    {/* Click outside to close */}
                    <button
                        type="button"
                        onClick={closeOverlay}
                        className="absolute inset-0 cursor-default"
                        aria-label="Close overlay"
                    />

                    <div
                        className="
              relative z-10
              w-full max-w-3xl
              max-h-[90vh]
              mx-4
              rounded-3xl
              border border-white/10
              bg-white/95 text-black
              dark:bg-[#050712]/95 dark:text-white
              shadow-2xl
              overflow-hidden
              flex flex-col
            "
                    >
                        {/* Top bar inside overlay */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 dark:border-white/10">
                            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase text-black/60 dark:text-white/60">
                                <span className="w-2 h-2 rounded-full bg-sky-400" />
                                <span>{view === "login" ? "Sign in" : "About lejur"}</span>
                            </div>
                            <button
                                type="button"
                                onClick={closeOverlay}
                                className="
                  inline-flex items-center gap-1.5 rounded-full px-3 py-1
                  text-[11px] border border-black/10 bg-black/5 text-black/70
                  dark:border-white/15 dark:bg-white/5 dark:text-white/70
                  hover:bg-black/10 dark:hover:bg-white/10
                  transition
                "
                            >
                                <span className="text-xs">←</span>
                                <span>Back to landing</span>
                            </button>
                        </div>

                        {/* Content area */}
                        <div className="flex-1 overflow-auto p-5 sm:p-7">
                            {view === "login" ? <LoginView /> : <LearnMoreView />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* Login overlay content */
function LoginView() {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <h1 className="text-lg sm:text-xl font-semibold">Sign in to lejur</h1>
                <p className="text-md text-black/70 dark:text-white/65 max-w-xl">
                    For new and existing users: Use your Google account to access the Lejur application.
                </p>
            </div>

            <div>
                <GoogleSignInButton />

            </div>


        </div>
    );
}

/* Learn more overlay content */
function LearnMoreView() {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <h1 className="text-lg sm:text-xl font-semibold">What lejur is trying to fix</h1>
                <p className="text-sm text-black/70 dark:text-white/65 max-w-xl">
                    Most small business accounting is held together with vibes and Excel.
                    lejur is built for people who actually want to tie the damn books.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] sm:text-xs">
                <div className="space-y-1.5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/60 dark:text-white/55">
                        Ledger first
                    </div>
                    <p className="text-black/75 dark:text-white/75">
                        Immutable double-entry, period locking, and adjustments that never
                        vanish into a black box. If it moved, you can see it.
                    </p>
                </div>
                <div className="space-y-1.5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/60 dark:text-white/55">
                        GST that actually closes
                    </div>
                    <p className="text-black/75 dark:text-white/75">
                        GST collected, GST paid, and a clearing account that truly hits zero
                        when you file. No mystery “tax suspense” account soaking errors.
                    </p>
                </div>
                <div className="space-y-1.5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/60 dark:text-white/55">
                        Operator-grade UI
                    </div>
                    <p className="text-black/75 dark:text-white/75">
                        Keyboard-first, dense tables, split panes — made for people who
                        reconcile in their sleep, not for someone sending one invoice a year.
                    </p>
                </div>
            </div>

            <div className="mt-2 text-[11px] text-black/60 dark:text-white/55 max-w-xl">
                v0 is Canada-first, single-currency, and unapologetically biased toward
                small firms and solo operators who care more about clean trial balances
                than cute dashboards.
            </div>
        </div>
    );
}
