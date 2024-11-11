import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "@/(pages)/_providers/i18n/i18config";
import { NextResponse } from "next/server";

import { USER_TOKEN } from "./app/shared/constants";

// Custom middleware
const middleware = createMiddleware({
  defaultLocale: "en",
  locales,
  localePrefix,
});

export default async function (req) {
  const { pathname } = req.nextUrl;

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
  matcher: ["/((?!api|_next/static|_next/public|_next/image|favicon.ico).*)"],
};
