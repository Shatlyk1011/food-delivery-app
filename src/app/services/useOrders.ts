import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { ORDER_MUTATION, USER_ORDERS } from "./query/orderQuery";

export const useOrderSubmit = () => {
  const { mutateAsync, isPending } = useMutation<OrderResponse, any, OrderData, any>({
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
      return data.data.CreateOrder;
    },
    onError: (err) => console.log("register mutation error", err),
  });

  return { handleOrder: mutateAsync, isSubmitPending: isPending };
};

export const useGetUserOrderList = (userId: string | undefined) => {
  const { data } = useQuery<any, any, UserOrder, any>({
    queryKey: ["user_orders"],
    enabled: Boolean(userId),
    // refetchInterval: 1500,
    refetchInterval: 3000,
    queryFn: async () => {
      const { data } = await axios({
        withCredentials: true,
        data: {
          query: USER_ORDERS,
          variables: { userId, limit: 20, page: 1 },
        },
      });
      console.log("userOrders", data.data);
      return data.data.Orders;
    },
  });

  return { userOrders: data };
};
