import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["ru", "tk", "en"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale.includes(locale as any)) notFound();
  console.log('locale', locale)
  return {
    messages: (await import(`./../locales/${locale}.json`)).default,
  };
});
