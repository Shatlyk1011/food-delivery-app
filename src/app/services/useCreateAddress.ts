import { useMutation } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { CREATE_ADDRESS_MUTATION } from "./query/addressesQuery";
import { Address } from "cluster";

type UserData = { id: string; userData: { addresses: AddressData[] } };
export const useCreateAddress = () => {
  const { data, mutateAsync } = useMutation<any, any, any, any>({
    mutationFn: async ({ id, userData }: UserData) => {
      const { data } = await axios({
        // withCredentials: true,
        data: {
          query: CREATE_ADDRESS_MUTATION,
          variables: { id, userData },
        },
      });
      return await data.data;
    },
  });
  return { data, createAddress: mutateAsync };
};
