export const getLocaleDate = (stringDate: string, locale: string = "en-EN") => {
  return new Date(stringDate).toLocaleDateString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  });
};
