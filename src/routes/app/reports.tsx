// src/routes/app/reports.tsx
import {
    createFileRoute,
    Link,
    Outlet,
    useRouterState,
} from '@tanstack/react-router'
import { FileDown } from 'lucide-react';
import {Button} from "react-aria-components";

export const Route = createFileRoute('/app/reports')({
    component: ReportsLayout,
})

const REPORT_TABS = [
    { id: 'trial-balance', label: 'Trial Balance', to: '/app/reports/trial-balance' },
    { id: 'balance-sheet', label: 'Balance Sheet', to: '/app/reports/balance-sheet' },
    { id: 'income-statement', label: 'Income Statement', to: '/app/reports/income-statement' },
    { id: 'general-ledger', label: 'General Ledger', to: '/app/reports/general-ledger' },
] as const

function ReportsLayout() {
    const { location } = useRouterState()

    return (
        <div className="min-h-[calc(100dvh_-_120px)] rounded-4xl">
            <div className="pl-4 pt-4 flex flex-col text-neutral-900 dark:text-neutral-50">
                <div className="grid grid-cols-18 gap-3">
                    {/* Left nav */}
                    <div className="mt-3 col-span-3 justify-self-start">
                        <div className="grid gap-2 justify-items-start text-left">
                            {REPORT_TABS.map((tab) => {
                                const isActive = location.pathname === tab.to

                                return (
                                    <Link
                                        key={tab.id}
                                        to={tab.to}
                                        className={
                                            [
                                                'inline-flex items-center cursor-pointer transition-all duration-150 hover:scale-102',
                                                'text-[11px] font-semibold tracking-[0.16em] uppercase -ml-2',
                                                isActive
                                                    ? 'text-neutral-900 dark:text-neutral-50 underline underline-offset-[4px] decoration-[1px] decoration-neutral-900/70 dark:decoration-neutral-50/70'
                                                    : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white',
                                            ].join(' ')
                                        }
                                    >
                                        {tab.label}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Mid pane */}
                    <div className="col-span-14 pr-1 pb-1">
                        <div className="h-full rounded-3xl border border-neutral-900/5 dark:border-white/5 bg-neutral-50/80 dark:bg-neutral-900/40 overflow-y-auto overscroll-contain">
                            <Outlet />
                        </div>
                    </div>


                    <div className="flex">
                        <div className="mx-auto mt-4">
                            <Button>
                                <FileDown className="h-[22px] hover:scale-105 hover:drop-shadow-md text-black/75 dark:text-white/75" />
                            </Button>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}
