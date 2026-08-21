//import Image from "next/image";

import ShowCard from "@/components/ShowCard";
import { ShowCardProps } from "@/components/ShowCard";

export default function Home() {

  const shows: ShowCardProps[] = [
    { title: "Some Show", description: "A description", imageUrl: "/show1.jpg" },
    { title: "Some Other Show", description: "A description", imageUrl: "/show2.jpg" },
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
            description={show.description}
            imageUrl={show.imageUrl} />
        ))}
      </div>
    </div>
  );
}
