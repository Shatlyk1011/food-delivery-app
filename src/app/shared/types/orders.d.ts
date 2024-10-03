interface OrderData {
  district: string;
  apartment: string;
  houseNumber: string;
  phoneNumber: number;
  orderedByUser: string;
  isDelivery: boolean;
  restaurantID: string;
  dishes: {
    // dish: string;
    quantity: number;
    id: string;
  }[];
  commentToCourier?: string;
  commentToRestaurant?: string;
  entrance?: string;
  city?: string;
}

interface OrderResponse {
  id: string;
  totalAmount: 972;
}

interface UserOrder {
  id: string;
  district: string;
  apartment: string;
  houseNumber: number;
  orderStatus: OrderStatus;
  isDelivery: boolean;
  totalAmount: number;
  deliveryPrice: number;
  restaurantName: string;
  dishes: UserOrderDish[];
  createdAt: string;
}
interface UserOrderDish {
  quantity: number;
  dish: {
    title: string;
    price: number;
    image: {
      url: string;
      alt: string;
    };
  };
}

interface OrderForm {
  apartment: string;
  district: string;
  houseNumber: string;
  phoneNumber: string;
  city?: string;
  entrance?: string;
  commentToCourier?: string;
  commentToRestaurant?: string;
}
