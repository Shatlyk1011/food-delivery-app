import { Pathnames, createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ru", "tk"] as const;
export const localePrefix = "always";
export const pathnames = {
  "/": "/",
  "/pathnames": {
    ru: "/pathnames",
    tk: "/pfadnamen",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, localePrefix });
