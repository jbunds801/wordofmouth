'use client'

import React, { useState } from 'react'
import type { ShowForm } from '@/types/show'

const genres = ['Rock', 'Metal', 'Punk', 'Indie', 'Hip-Hop']

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
        <form onSubmit={handleSubmit} className='border-2 rounded-md max-w-2xl mx-auto aspect-5/4 my-10'>
            <div className='flex h-full p-5'>
                <div className='w-1/3 min-w-0 space-y-4'>
                    <div>
                        <label htmlFor="title" className='sr-only'>Title *</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder='Title *'
                            required value={form.title}
                            onChange={handleChange}
                            className='w-full text-2xl sm:text-3xl font-extrabold 
                            placeholder:font-extrabold placeholder:text-2xl placeholder:sm:text-3xl placeholder:text-black mb-1'
                        />
                    </div>

                    <div>
                        <label htmlFor="supportingbands" className='sr-only'>Supporting Bands</label>
                        <input
                            id="supportingbands"
                            name="supportingbands"
                            type="text"
                            placeholder='Supporting Bands'
                            value={form.supportingbands}
                            onChange={handleChange}
                            className='w-full text-l sm:text-xl font-semibold mb-3 
                            placeholder:text-l placeholder:sm:text-xl placeholder:font-semibold placeholder:text-black'
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className='sr-only'>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder='Description'
                            value={form.description}
                            onChange={handleChange}
                            className='w-full text-s sm:text-base placeholder:text-black'
                        />
                    </div>

                    <div className='pt-5'>
                        <div>
                            <label htmlFor="venue" className='sr-only'>Where:</label>
                            <input
                                id="venue"
                                name="venue"
                                type="text"
                                placeholder='Where: (venue)'
                                required value={form.venue}
                                onChange={handleChange}
                                className='w-full text-s sm:text-base font-semibold
                                placeholder:text-s placeholder:sm:text-base placeholder:font-semibold placeholder:text-black'
                            />
                        </div>

                        <div className='pb-2'>
                            <label htmlFor="city" className='sr-only'>City</label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                placeholder='City'
                                required value={form.city}
                                onChange={handleChange}
                                className='w-full text-s sm:text-base placeholder:text-black'
                            />
                        </div>

                        <div className='pb-2'>
                            <label htmlFor="date" className='text-s sm:text-base font-semibold'>When:</label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                required value={form.date}
                                onChange={handleChange}
                                className='w-full text-s sm:text-base'
                            />
                        </div>

                        <div className='pb-2'>
                            <label htmlFor="time" className='text-s sm:text-base font-semibold'>Time:</label>
                            <input id="time" name="time" type="time" required value={form.time}
                                onChange={handleChange} className='w-full text-s sm:text-base' />
                        </div>

                        <div>
                            <label htmlFor="genre" className='sr-only'>Genre</label>
                            <select
                                id="genre"
                                name="genre"
                                required value={form.genre}
                                onChange={handleChange}
                                className='w-full text-s sm:text-base font-semibold'
                            >
                                <option value="">Genre</option>
                                {genres.map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='w-2/3 pl-5'>
                    <div
                        className="border-2 border-dashed rounded-md p-6 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        <label htmlFor="imageFile" className='text-s sm:text-base'>Drop an image here, or choose an image</label>
                        <input
                            id="imageFile"
                            name="imageFile"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFile(e.target.files?.[0])}
                            className='h-80'
                        />
                        {form.imageFile && <p className='text-s sm:text-base'>Selected: {form.imageFile.name}</p>}
                    </div>
                    {imageError && <p role="alert">{imageError}</p>}

                    <div className='pt-5'>
                        <p className='pb-2 font-semibold'>OR</p>
                        <label htmlFor="imageUrl" className='sr-only'>Image URL</label>
                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            placeholder='Enter Image URL'
                            value={form.imageUrl}
                            onChange={handleChange}
                            className='w-full text-s sm:text-base placeholder:text-black' />

                    </div>
                </div>
            </div>

            <div className='flex justify-end mx-3'>
                <button type="submit" className='border-2 rounded-xl p-1 mb-3'>Submit</button>
            </div>
        </form>
    )
}

export default SubmitForm;