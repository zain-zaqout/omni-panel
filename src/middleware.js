import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get('auth_token'); 
    const { pathname } = request.nextUrl;

    // 1. إذا لم يوجد توكن والمستخدم يحاول دخول أي صفحة غير اللوجن
    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. إذا وجد توكن والمستخدم يحاول دخول صفحة اللوجن، أرسله للرئيسية
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