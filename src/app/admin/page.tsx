'use client'

import { useState } from 'react'
import { useShows } from '@/hooks/useShows'
import PendingShowCard from '@/components/PendingShowCard'
import EditDeleteShowCard from '@/components/EditDeleteShowCard'


export default function AdminPage() {
    const [pendingShows, setPendingShows] = useShows(false)
    const [approvedShows] = useShows(true)
    const [view, setView] = useState<'pending' | 'approved' | null>(null)

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

    return (
        <main>
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            <div className='flex gap-4 mb-6'>
                <button type='button' onClick={() => setView('pending')}>Pending Shows</button>
                <button type='button' onClick={() => setView('approved')}>Edit Shows</button>
            </div>

            {view === 'pending' && (
                pendingShows.length === 0 ? (
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
                )
            )}

            {view === 'approved' && approvedShows.map((show) => (
                <EditDeleteShowCard
                    key={show.id} show={show}
                />
            ))}
        </main>
    );
};
