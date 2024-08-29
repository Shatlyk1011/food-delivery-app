interface OrderData {
  orderedByUser: string;
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

interface UserOrder {
  id: string
  district: string
  apartment: string
  houseNumber: number
  orderStatus: OrderStatus
  isDelivery:boolean
  totalAmount: number
  restaurantName: string
  dishes: {
    quantity: number 
    dish: {
      title: string
      price: number
      image: {
        url: string
        alt: string
      }
    }
  }[]
  createdAt: string
}

interface OrderForm {
  apartment: string;
  city: string;
  district: string;
  houseNumber: string;
  phoneNumber: string;
  comment?: string;
}
