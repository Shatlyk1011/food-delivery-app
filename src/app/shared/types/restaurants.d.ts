interface MainPageRestaurant {
  id: string;
  title: string;
  budgetCategory: "cheap" | "average" | "expensive";
  bannerImage: {
    url: string | null;
    alt: string;
  };

  limit: number;
  page: number;
}
