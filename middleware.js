import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname, origin, searchParams } = req.nextUrl;

  const validRoutes = ["/", "/contact", "/projects", "/work"];

  if (!validRoutes.includes(pathname) && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(`${origin}/`);
  }

  if (pathname.startsWith("/admin")) {
    const secretKey = searchParams.get("key");

    if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
