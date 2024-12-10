import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";

import { USER_TOKEN } from "@/app/shared/constants";

// Custom middleware
const middleware = createMiddleware(routing);

export default async function (req: any) {
  const { pathname } = req.nextUrl;

  if (pathname.includes("/admin")) {
    return NextResponse.next();
  }
  if (pathname.includes("/profile")) {
    const cookie = req.cookies.get(USER_TOKEN);
    if (!cookie) {
      const redirectUrl = new URL("/", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return middleware(req);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/public|_next/image|favicon.ico ).*)", "/(tk|ru|en)/:path*"],
};
