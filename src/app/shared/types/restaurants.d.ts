interface MainPageRestaurant {
  id: string;
  title: string;
  budgetCategory: "cheap" | "average" | "expensive";
  deliveryTime: string;
  bannerImage: {
    url: string | null;
    alt: string;
  };
  // limit: number;
  // page: number;
}

interface Categories {
  title: string;
}

type SortBy = "" | "-deliveryTime" | "budgetCategory" | "-budgetCategory";

type Filters = {
  deliveryTime: string | null;
  sortBy: string | null;
};
