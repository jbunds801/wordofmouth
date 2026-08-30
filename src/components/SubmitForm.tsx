'use client'

import React, { useState } from 'react'

const genres = ['Rock', 'Metal', 'Indie', 'Hip-Hop']

const SubmitForm = () => {
    const [form, setForm] = useState({
        title: '',
        supportingbands: '',
        description: '',
        imageUrl: '',
        venue: '',
        city: '',
        date: '',
        genre: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title *</label>
                <input id="title" name="title" type="text" required value={form.title} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="supportingbands">Supporting Bands</label>
                <input id="supportingbands" name="supportingbands" type="text" value={form.supportingbands} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={form.description} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="imageUrl">Image URL *</label>
                <input id="imageUrl" name="imageUrl" type="url" required value={form.imageUrl} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="venue">Venue *</label>
                <input id="venue" name="venue" type="text" required value={form.venue} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="city">City *</label>
                <input id="city" name="city" type="text" required value={form.city} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="date">Date *</label>
                <input id="date" name="date" type="date" required value={form.date} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="genre">Genre *</label>
                <select id="genre" name="genre" required value={form.genre} onChange={handleChange}>
                    <option value="">Select a genre</option>
                    {genres.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default SubmitForm;