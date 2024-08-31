import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "@/app/(pages)/_providers/i18n/i18config";

export default createMiddleware({
  defaultLocale: "ru",
  locales,
  localePrefix,
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/public|_next/image|favicon.ico).*)"],
};
