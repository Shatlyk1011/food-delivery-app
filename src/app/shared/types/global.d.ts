type PaginationMeta = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

interface TitleValue {
  title: string;
  value: string;
}

interface RestaurantLocalInfo {
  id: string;
  name: string;
  deliveryPrice: number;
  isDelivery: boolean;
}

interface RestaurantWithDishesInfo {
  dishes: any[];
  restaurantInfo: RestaurantLocalInfo;
}
