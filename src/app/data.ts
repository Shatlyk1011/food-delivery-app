export const CITIES = [
  { title: "Moscow", value: "moscow" },
  { title: "New York", value: "new-york" },
  { title: "Delhi", value: "Delhi" },
  { title: "Kiev", value: "Kiev" },
];

export const LANGUAGES = [
  { title: "Русский", value: "ru" },
  { title: "Turkmen", value: "tk" },
];

export const BUCKET_INPUTS = [
  { name: "district", placeholder: "BucketForm.district", styles: "sm:row-start-1 sm:col-span-2", type: "text" },
  {
    name: "house_number",
    placeholder: "BucketForm.houseNumber",
    styles: "sm:row-start-1 sm:col-span-2",
    type: "number",
  },
  { name: "apartment", placeholder: "BucketForm.kw", styles: "sm:row-start-2 sm:col-span-2", type: "number" },
  { name: "entrance", placeholder: "BucketForm.entrance", styles: "sm:row-start-2 sm:col-span-2", type: "number" },
  {
    name: "phone_number",
    placeholder: "Index.phoneNumber",
    styles: "row-start-2 sm:row-start-3 col-span-4",
    type: "tel",
  },
  {
    name: "comment",
    placeholder: "BucketForm.leaveComment",
    styles: "row-start-3 sm:row-start-4 col-span-4",
    type: "text",
  },
];
