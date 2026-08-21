import React from 'react'
//import Image from "next/image"

export type ShowCardProps = {
    title: string
    description: string
    imageUrl: string
}

const ShowCard = ({ title, description, imageUrl }: ShowCardProps) => {
    return (
        <div>
            <article>
                <h3>{title}</h3>
                <p>{description}</p>
                <img src={imageUrl} alt={`${title} image`} />
            </article>
        </div>
    )
}

export default ShowCard