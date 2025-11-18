import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/reports/general-ledger')({
    component: GeneralLedgerReport,
})

function GeneralLedgerReport() {
    return (
        <div className="w-full h-full min-h-[calc(100dvh_-_10rem)] rounded-4xl p-4 text-[11px]">
            General Ledger
        </div>
    )
}
