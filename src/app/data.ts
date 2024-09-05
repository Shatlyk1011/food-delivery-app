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
    placeholder: "BucketForm.phoneNumber",
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

export const ADDRES_INPUTS = [
  [
    // { name: "city", label: "ProfilePage.city", placeholder: "Placeholder.enterCity", defaultValue: "Turkmenabat" },
    { name: "district", label: "BucketForm.district", placeholder: "Placeholder.enterDistrict" },
  ],
  [
    { name: "houseNumber", label: "ProfilePage.houseNumber", placeholder: "Placeholder.enterHouseNumber" },
    { name: "apartment", label: "ProfilePage.appartmentOffice", placeholder: "Placeholder.enterAppartmentOffice" },
  ],
];

export const DEFAULT_RESTAURANT_INFO: RestaurantWithDishesInfo = {
  dishes: [],
  // isDelivery: true,
};

export const defaultFilters: Filters = {
  deliveryTime: 0,
  sortBy: null,
  tag: "all",
};

export const PROFILE_OUTER_HEAD = [
  { title: "ProfilePage.restaurantName", className: "w-[20%]" },
  { title: "MainPage.address", className: "w-[15%]" },
  { title: "ProfilePage.price", className: "w-[11%]" },
  { title: "ProfilePage.deliveryType", className: "w-[18%]" },
  { title: "ProfilePage.orderTime", className: "w-[15%]" },
];

export const PROFILE_INNER_HEAD = [
  { title: "ProfilePage.dishTitle", className: "w-[40%]" },
  { title: "ProfilePage.price", className: "w-[30%]" },
  { title: "Index.quantity", className: "w-[30%]" },
];

export const ORDER_STATUSES = {
  pending: "Status.pending",
  recieved: "Status.recieved",
  sended: "Status.sended",
  delivered: "Status.delivered",
  rejected: "Status.rejected",
};

export const STATUS_CLASSES = {
  pending: "text-[#FFA500]",
  recieved: "text-[#4CAF50]",
  sended: "text-[#1E90FF]",
  delivered: "text-[#008000]",
  rejected: "text-[#FF4500]",
};
