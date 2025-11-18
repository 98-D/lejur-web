// src/routes/app/journal.tsx
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/app/journal")({
    component: JournalPage,
});




function JournalPage() {


    return (


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
                                Record transactions
                            </h1>
                        </div>


                    </div>

                </div>
            </div>

    );
}

export default JournalPage;
