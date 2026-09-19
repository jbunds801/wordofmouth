'use client'

import React, { useState } from 'react'
import type { ShowForm } from '@/types/show'

const genres = ['Rock', 'Metal', 'Indie', 'Hip-Hop']

const SubmitForm = () => {
    const [form, setForm] = useState<ShowForm>({
        title: '',
        supportingbands: '',
        description: '',
        imageUrl: '',
        venue: '',
        city: '',
        date: '',
        time: '',
        genre: '',
    })
    const [imageError, setImageError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })

        if (e.target.name === 'imageUrl') {
            setImageError('')
        }
    }

    const handleImageFile = (file?: File) => {
        if (!file) return

        setForm({ ...form, imageFile: file })
        setImageError('')
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        handleImageFile(e.dataTransfer.files[0])
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.imageUrl && !form.imageFile) {
            setImageError('Add an image URL or drop an image file.')
            return
        }

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
                <div
                    className="border-2 border-dashed rounded-md p-6 text-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    <label htmlFor="imageFile">Drop an image here, or choose an image</label>
                    <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFile(e.target.files?.[0])}
                    />
                    {form.imageFile && <p>Selected: {form.imageFile.name}</p>}
                </div>
                {imageError && <p role="alert">{imageError}</p>}
            </div>
            <div>
                <label htmlFor="imageUrl">Image URL (optional)</label>
                <input id="imageUrl" name="imageUrl" type="url" value={form.imageUrl} onChange={handleChange} />
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
                <label htmlFor="time">Time *</label>
                <input id="time" name="time" type="time" required value={form.time} onChange={handleChange} />
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