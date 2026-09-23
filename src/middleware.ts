import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    // Decode "Basic <base64(user:password)>"
    const base64 = authHeader.split(" ")[1] || "";
    const [user, password] = atob(base64).split(":");

    if (
      user === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  // Trigger browser's native login popup
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/shows/:id"],
};
