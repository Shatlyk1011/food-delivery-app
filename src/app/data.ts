export const CITIES = [{ title: "Turkmenabat", value: "turkmenabat" }];

export const LANGUAGES = [
  { title: "Русский", value: "ru" },
  { title: "Turkmen", value: "tk" },
];

export const BUCKET_INPUTS = [
  { name: "district", placeholder: "BucketForm.district", styles: "sm:row-start-1 sm:col-span-2", type: "text" },
  {
    name: "houseNumber",
    placeholder: "BucketForm.houseNumber",
    styles: "sm:row-start-1 sm:col-span-2",
    type: "number",
  },
  { name: "apartment", placeholder: "BucketForm.kw", styles: "sm:row-start-2 sm:col-span-2", type: "number" },
  { name: "entrance", placeholder: "BucketForm.entrance", styles: "sm:row-start-2 sm:col-span-2", type: "number" },
  {
    name: "phoneNumber",
    placeholder: "Index.phoneNumber",
    styles: "row-start-2 sm:row-start-3 col-span-4",
    type: "tel",
    maxLength: 8,
  },
  {
    name: "comment",
    placeholder: "BucketForm.leaveComment",
    styles: "row-start-3 sm:row-start-4 col-span-4",
    type: "text",
  },
];

export const DEFAULT_RESTAURANT_INFO: RestaurantWithDishesInfo = {
  dishes: [],
  isDelivery: true,
};

export const defaultFilters: Filters = {
  deliveryTime: 0,
  sortBy: null,
  tag: "all",
};
