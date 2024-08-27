import { useMutation } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { CREATE_ADDRESS_MUTATION } from "./query/addressesQuery";

type UserData = { id: string; userData: { addresses: AddressData[] } };

export const useCreateAddress = () => {
  const { data, mutateAsync, isPending } = useMutation<any, any, any, any>({
    mutationFn: async ({ id, userData }: UserData) => {
      const { data } = await axios({
        data: {
          query: CREATE_ADDRESS_MUTATION,
          variables: { id, userData },
        },
      });
      return await data.data;
    },
  });
  return { data, createAddress: mutateAsync, isPending };
};
