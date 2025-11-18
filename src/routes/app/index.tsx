// src/routes/app/chart-of-accounts.tsx
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/app/")({
    component: ChartOfAccountsPage,
});


function ChartOfAccountsPage() {


    return (
        <div className="flex h-full flex-col gap-3 text-[11px] text-neutral-900 dark:text-neutral-50">
            <div className="min-h-[calc(100dvh_-_120px)] bg-pink-100">                <div
                    className="
                        flex flex-col gap-3
                        text-[11px] text-neutral-900 dark:text-neutral-50

                    "
                >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 shrink-0">
                        <div className="flex flex-col gap-0.5">
                            <h1 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400">
                                Chart of Accounts
                            </h1>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
}

