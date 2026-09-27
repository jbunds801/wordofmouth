//import Image from "next/image";

import { sql } from '@/lib/db'
import ShowCard from "@/components/ShowCard";
import type { Show } from '@/types/show'


export default async function Home() {
  const shows = await sql`
    SELECT
      id,
      title,
      supporting_bands AS supportingbands,
      description,
      image_url AS "imageUrl",
      venue,
      city,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      TO_CHAR(time, 'HH24:MI') AS time,
      genre
    FROM shows
    WHERE approved = true
    ORDER BY date, time
  ` as Array<Show & { id: string }>

  return (
    <div>
      <h1 className="text-4xl font-bold">list of shows</h1>

      <p>filters</p>

      <div>
        {shows.map((show) => (
          <ShowCard key={show.id} {...show} />
        ))}
      </div>
    </div>
  )
}