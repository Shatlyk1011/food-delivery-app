type LoginCredentials = { email: string; password: string };
type LoginResponse = { exp: number; token: string; user: any };

type UserData = { id: string; phone: string; addresses: AddressData[] };

interface BannerInfo {
  title: string;
  deliveryTime: string;
  address: string;
}

interface CartInfo extends BannerInfo {
  deliveryPrice: number;
}

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

interface RestaurantWithDishesInfo {
  dishes: any[];
  // isDelivery: boolean;
  timestamp?: number;
}

type AddressData = {
  district: string;
  houseNumber: string;
  apartment: string;
  city?: string;
};

type OrderStatus = "pending" | "recieved" | "sended" | "delivered" | "rejected";
