export const getLocaleDate = (stringDate: string) => {
  return new Date(stringDate).toLocaleDateString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    month: "long",
    day: "numeric",
  });
};
