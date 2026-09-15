//import Image from "next/image";

import ShowCard from "@/components/ShowCard";
import type { Show } from '@/types/show'

export default function Home() {

  //test data
  const shows: Show[] = [
    {
      title: "The Great Silence", supportingbands: "w/ Inimicus, Seasonless, and Moon Traveler Deluxe",
      description: "Tour with Inimicus kick-off show!", imageUrl: "/thegreatsilence.jpg",
      venue: "Urban Lounge", city: 'Salt Lake City', date: "10-01-2026", time: "9 PM", genre: 'metal'
    },
    {
      title: "Mastodon", supportingbands: "Deafheaven, Alcest",
      description: "A description", imageUrl: "/mastodon.jpg",
      venue: "The Complex", city: 'Salt Lake City', date: "10-06-2026", time: "9 PM", genre: 'metal'
    },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold">list of shows</h1>

      <p>filters</p>

      <div>
        {shows.map((show, index) => (
          <ShowCard key={index} {...show} />
        ))}
      </div>
    </div>
  );
}
