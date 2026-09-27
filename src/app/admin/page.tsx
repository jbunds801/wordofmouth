'use client'

import { useEffect, useState } from 'react'
import PendingShowCard from '@/components/PendingShowCard'
import type { PendingShow } from '@/types/show'


export default function AdminPage() {
    const [pendingShows, setPendingShows] = useState<PendingShow[]>([])

    const handleApprove = async (id: string) => {
        const response = await fetch(`/api/shows/${id}`, {
            method: 'PATCH',
        })

        if (!response.ok) {
            return
        }
        setPendingShows(((shows) => shows.filter
            ((show) => show.id !== id)))
    }

    const handleReject = (id: string) => {
        // Will delete from Postgres later
        setPendingShows(pendingShows.filter(show => show.id !== id))
    }

    useEffect(() => {
        async function loadPendingShows() {
            const response = await fetch('/api/shows?approved=false')
            const shows = await response.json()
            if (response.ok) {
                setPendingShows(shows)
            }
        }

        loadPendingShows()
    }, [])

    return (
        <main>
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard — Pending Shows</h1>

            {pendingShows.length === 0 ? (
                <p>No pending shows to review.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {pendingShows.map((show) => (
                        <PendingShowCard
                            key={show.id}
                            show={show}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}
