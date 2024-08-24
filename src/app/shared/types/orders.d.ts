interface OrderData {
  district: string;
  apartment: string;
  houseNumber: string;
  phoneNumber: number;
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

interface OrderForm {
  apartment: string;
  city: string;
  district: string;
  houseNumber: string;
  phoneNumber: string;
  comment?: string;
}
