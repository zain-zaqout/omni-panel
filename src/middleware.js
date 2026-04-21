import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get('auth_token'); 
    const { pathname } = request.nextUrl;

    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && pathname === "/login") {
        return NextResponse.url === new URL('/', request.url).href 
               ? NextResponse.next() 
               : NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};