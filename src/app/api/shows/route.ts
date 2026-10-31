import { sql } from "@/lib/db";
import type { Show } from "@/types/show";

export async function GET(request: Request) {
  const approved = new URL(request.url).searchParams.get("approved");

  if (approved !== "true" && approved !== "false") {
    return Response.json(
      { error: "Use approved=true or approved=false." },
      { status: 400 },
    );
  }

  const approvedValue = approved === "true";

  const shows = await sql`
		SELECT
			id,
			title,
			supporting_bands AS supportingbands,
			description,
			image_url AS "imageUrl",
			venue,
			city,
			date::text AS date,
			TO_CHAR(time, 'HH24:MI') AS time,
			genre,
			approved
		FROM shows
		WHERE approved = ${approvedValue}
		ORDER BY date, time
	`;

  return Response.json(shows);
}

export async function POST(request: Request) {
  let body: Partial<Show>;

  try {
    body = (await request.json()) as Partial<Show>;
  } catch {
    return Response.json(
      { error: "Request must be valid JSON." },
      { status: 400 },
    );
  }

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
      {
        error: "Title, image, venue, city, date, time, and genre are required.",
      },
      { status: 400 },
    );
  }

  if (
    Number.isNaN(Date.parse(body.date)) ||
    !/^\d{2}:\d{2}(:\d{2})?$/.test(body.time)
  ) {
    return Response.json(
      { error: "Enter a valid date and time." },
      { status: 400 },
    );
  }

  const [duplicate] = await sql`
		SELECT id
		FROM shows
		WHERE LOWER(title) = LOWER(${body.title.trim()})
			AND LOWER(venue) = LOWER(${body.venue.trim()})
			AND date = ${body.date}
			AND time = ${body.time}
		LIMIT 1
	`;

  if (duplicate) {
    return Response.json(
      { error: "This show has already been submitted." },
      { status: 409 },
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
