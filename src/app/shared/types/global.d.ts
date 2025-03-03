type LoginCredentials = { email: string; password: string };
type LoginResponse = { exp: number; token: string; user: any };

type I18N = "ru" | "tk" | "en";

type UserData = { id: string; phone: string; addresses: AddressData[] };

interface BannerInfo {
  title: string;
  deliveryTime: string;
  address: string;
  workingHours: WorkingHours;
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

type City = { id: string; title: string };

type CategoryTypes = "dish" | "restaurant";

type OrderStatus = "pending" | "recieved" | "sended" | "delivered" | "rejected";

type FeedbackType = "cooperation" | "feedback";
interface FeedbackOrCoop {
  name?: string;
  phoneNumber?: string;
  description: string;
  type: FeedbackType;
}

interface FeedbackOrCoopResponse {
  id: string;
  type: FeedbackType;
}

type ToastTypes = "error" | "success" | "warning" | "info";

type SortTypes = {
  title: string;
  value: SortBy;
};