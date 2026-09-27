'use client'

import ShowCard from '@/components/ShowCard'
import type { PendingShow } from '@/types/show'

type PendingShowCardProps = {
    show: PendingShow
    onApprove: (id: string) => void | Promise<void>
    onReject: (id: string) => void
}

export default function PendingShowCard({ show, onApprove, onReject }: PendingShowCardProps) {
    return (
        <div>
            <ShowCard {...show} />
            <div className="flex justify-center gap-4">
                <button
                    type="button"
                    onClick={() => onApprove(show.id)}
                    className="border px-4 py-1"
                >
                    Approve
                </button>
                <button
                    type="button"
                    onClick={() => onReject(show.id)}
                    className="border px-4 py-1"
                >
                    Reject
                </button>
            </div>
        </div>
    )
}