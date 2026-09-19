import Image from "next/image"
import type { Show } from '@/types/show'

const ShowCard = ({ title, supportingbands, description, imageUrl, venue, city, date, time, genre }: Show) => {
    return (
        <div>
            <article className='border-2 rounded-md max-w-2xl mx-auto aspect-5/4 my-10'>
                <div className='flex h-full p-5'>
                    <div className='w-1/3 min-w-0 space-x-5'>
                        <h3 className='text-2xl sm:text-3xl font-extrabold mb-1'>{title}</h3>
                        <p className='text-l sm:text-xl font-semibold mb-3'>{supportingbands}</p>
                        <p className='text-s sm:text-base'>{description}</p>

                        <div className='pt-5'>
                            <p className='text-s sm:text-base'> <span className='font-semibold'>Where:</span> {venue},</p>
                            <p className='text-s sm:text-base'>{city}</p>
                            <p className='text-s sm:text-base'><span className='font-semibold'>When:</span> {date}</p>
                            <p className='text-s sm:text-base'><span className='font-semibold'>Time:</span> {time}</p>
                            <p>{genre}</p>
                        </div>
                    </div>

                    <div className='relative w-2/3'>
                        {imageUrl ? (
                            <Image
                                className='object-contain object-top'
                                loading="eager"
                                fill
                                src={imageUrl}
                                alt={`${title} image`}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                </div>
            </article>
        </div>
    )
}

export default ShowCard