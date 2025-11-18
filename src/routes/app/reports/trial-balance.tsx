import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/reports/trial-balance')({
    component: TrialBalanceReport,
})

function TrialBalanceReport() {
    return (
        <div className="w-full h-full min-h-[calc(100dvh_-_10rem)] rounded-4xl p-4 text-[11px]">
            {/* Trial Balance UI goes here */}
            Trial Balance
        </div>
    )
}
