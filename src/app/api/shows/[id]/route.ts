import { sql } from "@/lib/db";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const [show] = await sql`
		UPDATE shows
		SET approved = true
		WHERE id = ${id}
		RETURNING id, approved
	`;

  if (!show) {
    return Response.json({ error: "Show not found." }, { status: 404 });
  }

  return Response.json(show);
}
