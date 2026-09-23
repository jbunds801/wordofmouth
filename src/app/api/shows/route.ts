import { sql } from "@/lib/db";
import type { Show } from "@/types/show";

export async function GET(request: Request) {
  const approved = new URL(request.url).searchParams.get("approved");

  if (approved !== "true") {
    return Response.json({ error: "Use approved=true." }, { status: 400 });
  }

  const shows = await sql`
		SELECT
			id,
			title,
			supporting_bands AS supportingbands,
			description,
			image_url AS "imageUrl",
			venue,
			city,
			date,
			time,
			genre,
			approved
		FROM shows
		WHERE approved = true
		ORDER BY date, time
	`;

  return Response.json(shows);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Show>;

  if (
    !body.title?.trim() ||
    !body.imageUrl?.trim() ||
    !body.venue?.trim() ||
    !body.city?.trim() ||
    !body.date ||
    !body.time ||
    !body.genre?.trim()
  ) {
    return Response.json(
      { error: "Title, venue, city, date, time, and genre are required." },
      { status: 400 },
    );
  }

  const [show] = await sql`
		INSERT INTO shows (
			title,
			supporting_bands,
			description,
			image_url,
			venue,
			city,
			date,
			time,
			genre,
			approved
		)
		VALUES (
			${body.title.trim()},
			${body.supportingbands?.trim() || null},
			${body.description?.trim() || null},
			${body.imageUrl?.trim() || null},
			${body.venue.trim()},
			${body.city.trim()},
			${body.date},
			${body.time},
			${body.genre.trim()},
			false
		)
		RETURNING
			id,
			title,
			supporting_bands AS supportingbands,
			description,
			image_url AS "imageUrl",
			venue,
			city,
			date,
			time,
			genre,
			approved
	`;

  return Response.json(show, { status: 201 });
}
