type LoginCredentials = { email: string; password: string };
type LoginResponse = { exp: number; token: string; user: any };

type UserData = { id: string; name: string; phone: string; addresses: AddressData[] };

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

type AddressData = {
  city: string;
  district: string;
  houseNumber: string;
  apartment: string;
  phoneNumber?: number;
};
