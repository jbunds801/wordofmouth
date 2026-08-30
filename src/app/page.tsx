//import Image from "next/image";

import ShowCard from "@/components/ShowCard";
import type { Show } from '@/types/show'

export default function Home() {

  //test data
  const shows: Show[] = [
    {
      title: "The Great Silence", supportingbands: "w/ Inimiscus, Seasonless, and Moon Traveler Deluxe",
      description: "Tour with Inimiscus kick-off show!", imageUrl: "/thegreatsilence.jpg",
      venue: "Urban Lounge", city: 'Salt Lake City', date: "10-01-2026", genre: 'metal'
    },
    {
      title: "Mastodon", supportingbands: "Deafheaven, Alcest",
      description: "A description", imageUrl: "/mastodon.jpg",
      venue: "The Complex", city: 'Salt Lake City', date: "10-06-2026", genre: 'metal'
    },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold">list of shows</h1>

      <p>filters</p>

      <div>
        {shows.map((show, index) => (
          <ShowCard
            key={index}
            title={show.title}
            supportingbands={show.supportingbands}
            description={show.description}
            imageUrl={show.imageUrl}
            venue={`${show.venue},`}
            city={show.city}
            date={show.date}
            genre={show.genre}
          />
        ))}
      </div>
    </div>
  );
}
