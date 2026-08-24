//import Image from "next/image";

import ShowCard from "@/components/ShowCard";
import { ShowCardProps } from "@/components/ShowCard";

export default function Home() {

  const shows: ShowCardProps[] = [
    {
      title: "The Great Silence", supportingbands: "w/ Inimiscus, Seasonless, and Moon Traveler Deluxe",
      description: "Tour with Inimiscus kick-off show!", imageUrl: "/thegreatsilence.jpg",
      venue: "Urban Lounge", date: "10-01-2026"
    },
    {
      title: "Mastodon", supportingbands: "Deafheaven, Alcest",
      description: "A description", imageUrl: "/mastodon.jpg",
      venue: "The Complex", date: "10-06-2026"
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
            venue={show.venue}
            date={show.date}
          />
        ))}
      </div>
    </div>
  );
}
