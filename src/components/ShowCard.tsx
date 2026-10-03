import type { Show } from '@/types/show'

const ShowCard = ({ title, supportingbands, description, imageUrl, venue, city, date, time, genre }: Show) => {

    const formatDate = (date: string) => {
        const [year, month, day] = date.split('-').map(Number)

        return new Intl.DateTimeFormat
            ('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
            }).format(new Date(Date.UTC(year, month - 1, day)))
    }

    const formatTime = (time: string) => {
        const [hourText, minute] = time.split(':')
        const hour = Number(hourText)
        const period = hour >= 12 ? 'PM' : 'AM'

        return `${hour % 12 || 12}:${minute} ${period}`
    }

    return (
        <div>
            <article className='border-2 rounded-md max-w-2xl mx-auto aspect-5/4 my-10'>
                <div className='flex h-full p-5'>
                    <div className='w-1/3 min-w-0 space-x-5'>
                        <h3 className='text-2xl sm:text-3xl font-extrabold mb-1'>{title}</h3>
                        <p className='text-l sm:text-xl font-semibold mb-3'>{supportingbands}</p>
                        <p className='text-s sm:text-base'>{description}</p>

                        <div className='pt-5'>
                            <p className='text-s sm:text-base'> <span className='font-semibold'>Where: </span>{venue},</p>
                            <p className='text-s sm:text-base pb-2'>{city}</p>
                            <p className='text-s sm:text-base pb-2'><span className='font-semibold'>When: </span>{formatDate(date)}</p>
                            <p className='text-s sm:text-base pb-2'><span className='font-semibold'>Time: </span>{formatTime(time)} (local time)</p>
                            <p className='font-semibold'>{genre}</p>
                        </div>
                    </div>

                    <div className='relative w-2/3'>
                        {imageUrl ? (
                            // User-provided URLs cannot be allowlisted for next/image, 
                            // added one-line eslint suppression

                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                className="h-full w-full object-contain object-top"
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


//have it so people can add a link to buy tickets