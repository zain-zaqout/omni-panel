import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("firebase_token")?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login", "/signup", "/verify-email"];
  const isPublicPath = publicPaths.includes(pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.json).*)"],
};
