type LoginCredentials = { email: string; password: string };
type LoginResponse = { exp: number; token: string; user: any };

type UserData = { name: string; phone: string };

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
  isDelivery: boolean;
}
