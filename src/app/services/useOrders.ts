import { useMutation } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { ORDER_MUTATION } from "./query/orderQuery";

export const useOrders = () => {
  const { data, mutateAsync } = useMutation<any, any, OrderData, any>({
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
      return data.data;
    },
    onError: (err) => console.log("register mutation error", err),
  });

  return { data, handleOrder: mutateAsync };
};
