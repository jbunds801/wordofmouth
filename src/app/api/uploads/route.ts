import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("imageFile");

  if (!(file instanceof File)) {
    return Response.json(
      { error: "An image file is required." },
      { status: 400 },
    );
  }

  if (!file.type.startsWith("image/")) {
    return Response.json(
      { error: "Only image files are allowed." },
      { status: 400 },
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    return Response.json(
      { error: "The image must be smaller than 10MB." },
      { status: 400 },
    );
  }

  const extension = file.type.split("/")[1] || "bin";
  const key = `shows/${crypto.randomUUID()}.${extension}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    }),
  );

  const imageUrl = `${process.env.R2_PUBLIC_URL!.replace(/\/$/, "")}/${key}`;

  return Response.json({ imageUrl }, { status: 201 });
}
