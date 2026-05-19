import { NextResponse } from "next/server";

export function middleware(request) {
const token = request.cookies.get('auth_token')?.value;
    const { pathname } = request.nextUrl;

    // 1. القائمة البيضاء: الصفحات التي يُسمح للجميع بدخولها بدون تسجيل
    const publicPaths = ["/login", "/logup"];
    const isPublicPath = publicPaths.includes(pathname);

    // 2. إذا لم يكن هناك توكن والمستخدم يحاول دخول صفحة محمية
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. إذا كان هناك توكن والمستخدم يحاول دخول صفحات Login أو Signup
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.json).*)'],
};