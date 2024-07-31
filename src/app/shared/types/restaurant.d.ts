type RestaurantSort = "delivery_time" | "delivery_price" | "delivery_price:DESC" | "";

type RestaurantFilters = {
  deliveryTime: string | null;
  sort: RestaurantSort;
};
interface Category {
  id: number;
  attributes: {
    title: string;
  };
}

interface CategoryResponse {
  data: Category[];
  meta: Meta;
}

interface RestaurantItem {
  title: string;
  image: string;
  price: number;
  gram: number;
  description: string;
  category: string[];
  available_quantity: number;
  is_available: boolean;
}

interface Restaurant {
  title: string;
  description: string;
  banner_url: string;
  delivery_time: number;
  is_delivery: boolean;
  delivery_price: number;
  open_time: string;
  close_time: string;
  budget_category: number;
  cities: string[];
  address: string;
  free_after_amount: number;
  dish: RestaurantItem;
  is_blocked: boolean;
}

interface MainPageRestaurantItem {
  attributes: {
    title: string;
    delivery_time: number;
    budget_category: number;
    banner_url: {
      data: {
        id: number;
        attributes: {
          alternativeText: string | null;
          url: string;
        };
      };
    };
  };
}

interface RestaurantResponse {
  data: MainPageRestaurantItem[];
  meta: PaginationMeta;
}

// interface RestaurantResponse {
//   pageParams: number[];
//   pages: Restaurant[];
// }
