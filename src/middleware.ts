import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const isPublicShowsRequest =
    pathname === "/api/shows" &&
    (req.method === "POST" ||
      (req.method === "GET" && searchParams.get("approved") === "true"));

  if (isPublicShowsRequest) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    try {
      // Decode "Basic <base64(user:password)>"
      const base64 = authHeader.split(" ")[1] || "";
      const decoded = atob(base64);
      const separator = decoded.indexOf(":");
      const user = decoded.slice(0, separator);
      const password = decoded.slice(separator + 1);

      if (
        separator !== -1 &&
        process.env.ADMIN_USER &&
        process.env.ADMIN_PASSWORD &&
        user === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASSWORD
      ) {
        return NextResponse.next();
      }
    } catch {
      // Malformed header falls through to the 401 response.
    }
  }

  // Trigger browser's native login popup
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/shows", "/api/shows/:id"],
};
