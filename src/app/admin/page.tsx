'use client'

import React, { useState } from 'react'
import ShowCard from '@/components/ShowCard'
import type { Show } from '@/types/show'

type PendingShow = Show & {
    id: string
}

// Temporary test data until database is connected
const initialPendingShows: PendingShow[] = [
    {
        id: '1',
        title: 'The Great Silence',
        supportingbands: 'Inimiscus, Seasonless',
        description: 'Tour kick-off show',
        imageUrl: '/thegreatsilence.jpg',
        venue: 'Urban Lounge',
        city: 'Salt Lake City',
        date: '2026-10-01',
        time: '21:00',
        genre: 'Metal',
    },
]

export default function AdminPage() {
    const [pendingShows, setPendingShows] = useState<PendingShow[]>(initialPendingShows)

    const handleApprove = (id: string) => {
        // Will update approved = true in Postgres later
        setPendingShows(pendingShows.filter(show => show.id !== id))
    }

    const handleReject = (id: string) => {
        // Will delete from Postgres later
        setPendingShows(pendingShows.filter(show => show.id !== id))
    }

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard — Pending Shows</h1>

            {pendingShows.length === 0 ? (
                <p>No pending shows to review.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {pendingShows.map((show) => (
                        <div key={show.id}>
                            <ShowCard
                                title={show.title}
                                supportingbands={show.supportingbands}
                                description={show.description}
                                imageUrl={show.imageUrl}
                                imageFile={show.imageFile}
                                venue={show.venue}
                                city={show.city}
                                date={show.date}
                                time={show.time}
                                genre={show.genre}
                            />
                            <div className="flex justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleApprove(show.id)}
                                    className="border px-4 py-1"
                                >
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleReject(show.id)}
                                    className="border px-4 py-1"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}
