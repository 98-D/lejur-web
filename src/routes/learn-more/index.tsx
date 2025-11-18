import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/learn-more/")({
    component: LearnMorePage,
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

function LejurLockup() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1">
        <span className="pl-1 text-xl font-light tracking-[0.18em] uppercase">
          lejur
        </span>
            </div>
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400/90" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300/90" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400/90" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/90" />
            </div>
        </div>
    );
}

function LearnMorePage() {
    const router = useRouter();
    const [entered, setEntered] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const handleBack = () => {
        // trigger slide-down fade-out
        setExiting(true);
        setEntered(false);
        setTimeout(() => {
            router.navigate({ to: "/" });
        }, 260); // match transition duration
    };

    return (
        <div
            className={`
            select-none
        min-h-dvh flex flex-col
        bg-white text-black
        dark:bg-[#02040A] dark:text-white
        bg-[radial-gradient(40%_50%_at_50%_0%,rgba(79,70,229,0.08),transparent_70%)]
        dark:bg-[radial-gradient(40%_50%_at_50%_0%,rgba(79,70,229,0.20),transparent_70%)]
        transition-colors
      `}
        >
            <header
                className="
          w-full max-w-5xl mx-auto
          px-5 pt-6 pb-3
          flex items-center justify-between gap-4
        "
            >
                <div className="flex justify-center content-center align-middle items-center gap-3">
                    <LejurLockup />
                </div>
                <ThemeToggle />
            </header>

            <main className="flex-1 w-full flex items-start justify-center">
                <section
                    className={`
            w-full max-w-5xl mx-auto px-5
            pt-4 pb-10
            flex flex-col gap-8
            transition-all duration-250
            ${
                        entered && !exiting
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                    }
          `}
                >
                    {/* Intro */}
                    <div className="max-w-2xl">
                        <h1 className="text-2xl sm:text-3xl font-light tracking-[0.14em] uppercase">
                            Learn more
                        </h1>
                        <p className="mt-3 text-sm sm:text-base text-black/70 dark:text-white/60">
                            lejur is a ledger-first accounting application built for people who
                            actually care if the numbers tie. Immutable entries, sane GST, and
                            an operator-grade UI instead of a toy.
                        </p>
                    </div>

                    {/* What lejur does */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="rounded-2xl border border-black/8 dark:border-white/10 bg-white/80 dark:bg-white/0 px-4 py-4 backdrop-blur-sm">
                            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/60 dark:text-white/55">
                                What lejur does
                            </h2>
                            <ul className="mt-3 space-y-2.5 text-[11px] leading-relaxed text-black/75 dark:text-white/60">
                                <li>
                                    <span className="font-semibold">Ledger-first.</span> Every change
                                    is a posted journal entry. Fixes are reversals. No silent edits.
                                </li>
                                <li>
                                    <span className="font-semibold">Sane GST.</span> Explicit
                                    collected/paid, proper clearing, filings you can explain with a pencil.
                                </li>
                                <li>
                                    <span className="font-semibold">Operator UI.</span> Dialog-first,
                                    hotkeys, no submenu hell.
                                </li>
                                <li>
                                    <span className="font-semibold">Attachments & tags.</span> Real-world
                                    context on every entry.
                                </li>
                                <li>
                                    <span className="font-semibold">Bulk & imports.</span> Idempotent,
                                    predictable.
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-black/8 dark:border-white/10 bg-white/40 dark:bg-white/0 px-4 py-4 backdrop-blur-sm">
                            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/60 dark:text-white/55">
                                What lejur doesn&apos;t do
                            </h2>
                            <ul className="mt-3 space-y-2.5 text-[11px] leading-relaxed text-black/75 dark:text-white/60">
                                <li>No auto-magic bank feeds that destroy your GL.</li>
                                <li>No hidden subledgers inventing balances.</li>
                                <li>No fake-compliant payroll/inventory bolted on.</li>
                                <li>No dark-pattern pricing or hostage data.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Engine */}
                    <div className="grid gap-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
                        <div className="rounded-2xl border border-black/8 dark:border-white/10 bg-white/80 dark:bg-white/0 px-4 py-4 backdrop-blur-sm">
                            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/60 dark:text-white/55">
                                Engine & reporting
                            </h2>
                            <p className="mt-3 text-[11px] text-black/75 dark:text-white/60 leading-relaxed">
                                Immutable journal as source of truth. Period close rolls P&amp;L into
                                retained earnings; TB, GL, P&amp;L, and balance sheet are just honest
                                views over that ledger.
                            </p>
                            <p className="mt-2 text-[11px] text-black/75 dark:text-white/60 leading-relaxed">
                                Fixes are adjustments, never cover-ups. Auditors see intent, not guesses.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-black/8 dark:border-white/10 bg-white/60 dark:bg-white/0 px-4 py-4 backdrop-blur-sm">
                            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/60 dark:text-white/55">
                                Data, security, auditability
                            </h2>
                            <ul className="mt-3 space-y-2 text-[11px] text-black/75 dark:text-white/60 leading-relaxed">
                                <li>Ledger core is separate from UI chrome.</li>
                                <li>Every mutation is explicit, attributable, and reviewable.</li>
                                <li>No silent schema games that make assurance impossible.</li>
                                <li>Built so external reviewers don&apos;t need a séance to follow cash.</li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        <button
                            onClick={handleBack}
                            className="
                inline-flex items-center justify-center
                rounded-xl px-4 py-2 text-[11px] font-medium
                bg-black text-white
                dark:bg-white dark:text-black
                border border-black/90 dark:border-white/90
                hover:translate-y-[1px] hover:shadow-sm
                active:translate-y-[2px] active:shadow-none
                transition
              "
                        >
                            ← Back to hero
                        </button>
                        <span className="text-[9px] uppercase tracking-[0.16em]  text-black/50 dark:text-sky-300/60 ">
              v2025 • ORION - v0.11
            </span>
                    </div>
                </section>
            </main>
        </div>
    );
}
