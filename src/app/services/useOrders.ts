import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { ORDER_MUTATION, USER_ORDERS } from "./query/orderQuery";

export const useOrderSubmit = () => {
  const { mutateAsync } = useMutation<OrderResponse, any, OrderData, any>({
    mutationFn: async (orderData: OrderData) => {
      console.log("orderData", orderData);
      const { data } = await axios({
        // withCredentials: true,
        data: {
          query: ORDER_MUTATION,
          variables: { orderData },
        },
      });
      console.log("data.data", data.data);
      return data.data.createOrder;
    },
    onError: (err) => console.log("register mutation error", err),
  });

  return { handleOrder: mutateAsync };
};

export const useGetUserOrderList = () => {
  const { data } = useQuery<any, any, UserOrder[], any>({
    queryKey: ["user_orders"],
    // refetchInterval: 6000,
    refetchInterval: 3000,

    queryFn: async () => {
      const { data } = await axios({
        withCredentials: true,
        data: {
          query: USER_ORDERS,
          variables: { limit: 20, page: 1 },
        },
      });
      console.log("userOrders", data.data);
      return data.data.Orders.docs;
    },
  });

  return { userOrders: data };
};
