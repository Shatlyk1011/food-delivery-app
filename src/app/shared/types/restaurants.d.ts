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

interface Categories {
  title: string;
}

type SortBy = "" | "deliveryTime" | "budgetCategory" | "-budgetCategory";

type Filters = {
  deliveryTime: number | null;
  sortBy: string | null;
  tag: string;
};
