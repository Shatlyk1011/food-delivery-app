import { Pathnames, createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "ru", "tk"] as const;
export const localePrefix = "always";
export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    ru: "/pfadnamen",
    tk: "/pfadnamen",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, localePrefix });
