import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer admin-")) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  if (request.headers.get("x-requested-with") !== "fetch") {
    response.headers.set("Cache-Control", "no-store, must-revalidate");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|woff2|woff)$).*)"],
};
