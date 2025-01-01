type WorkingHours = {
  openTime: string;
  closeTime: string;
};

interface MainPageRestaurant {
  id: string;
  title: string;
  //_1 - cheap, _2 - average, _3 - expensive
  budgetCategory: "_1" | "_2" | "_3";
  workingHours: {
    closeTime: string;
  };
  deliveryPrice: number;
  deliveryTime: string;
  bannerImage: {
    url: string | null;
    alt: string;
  };
}

interface RestaurantLocalInfo {
  id: string;
  name: string;
  deliveryPrice: number;
  // isDelivery: boolean;
}

interface Categories {
  category: string;
  value: string;
}

type SortBy = "" | "deliveryTime" | "budgetCategory" | "-budgetCategory";

type Filters = {
  deliveryTime: number | null;
  sortBy: string | null;
  tag: string | undefined;
};

interface RestaurantId {
  id: string;
  title: string;
  description: string;
  address: string;
  deliveryTime: string;
  deliveryPrice: number;
  freeAfterAmount: number;
  workingHours: WorkingHours;
  isClosed: boolean;
  isDelivery: boolean;
  bannerImage: {
    id: string;
    url: string;
    alt: string;
  };
  dishes: Dish[];
}

interface Dish {
  id: string;
  title: string;
  description: string;
  price: number;
  gram: number;
  availableAmount: number;
  cookTime: number;
  categories?: {
    category: string;
  };
  image: {
    url: string;
    alt: string;
  };
}

interface WithCategories {
  category: string;
  dishes: Dish[];
}
