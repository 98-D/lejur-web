import { Button } from "react-aria-components";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { LejurKebabMenu } from "@/components/ui/LejurMenu.tsx";

// Reports-backed tabs
const tabs = [
    { id: "accounts", label: "Accounts", to: "/app/" },
    { id: "journal", label: "Journal", to: "/app/journal" },
    { id: "reports", label: "Reports", to: "/app/reports" },
    { id: "third-parties", label: "Third parties", to: "/app/third-parties" },
];

export function TopNav() {
    const router = useRouter();
    const { location } = useRouterState();

    const activeId =
        tabs.find((tab) =>
            tab.to === "/app/"
                ? location.pathname === "/app" || location.pathname === "/app/"
                : location.pathname.startsWith(tab.to)
        )?.id ?? "accounts";

    return (
        <nav className="mt-2 px-5">
            <div className="flex items-center gap-3 w-full">

                <div className="select-none flex items-center mx-auto gap-1.5">
                    {tabs.map((tab) => (
                        <Button
                            key={tab.id}
                            onPress={() => router.navigate({ to: tab.to })}
                            className={({ isFocusVisible }) =>
                                [
                                    "relative inline-flex items-center",
                                    "px-3.25 py-1.5 rounded-full",
                                    "text-[12px] font-medium",
                                    "transition-all duration-160 ease-out",
                                    "outline-none",
                                    // base
                                    "text-neutral-500 dark:text-neutral-400",
                                    "hover:text-neutral-900 dark:hover:text-white",
                                    "hover:bg-neutral-900/3 dark:hover:bg-white/5",
                                    // active
                                    activeId === tab.id
                                        ? [
                                            "bg-neutral-900/5 dark:bg-white/9",
                                            "text-neutral-900 dark:text-white",
                                            "shadow-[0_4px_10px_rgba(15,23,42,0.18)]",
                                            "before:absolute before:-bottom-[5px] before:left-3 before:right-3",
                                            "before:h-[2px] before:rounded-full",
                                            "before:bg-gradient-to-r",
                                            "before:from-sky-400/0 before:via-sky-400/70 before:to-emerald-400/0",
                                        ].join(" ")
                                        : "",
                                    // focus ring
                                    isFocusVisible
                                        ? "ring-1 ring-offset-0 ring-neutral-400/70 dark:ring-white/70"
                                        : "",
                                ].join(" ")
                            }
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="mt-2 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent dark:via-white/14" />
        </nav>
    );
}
