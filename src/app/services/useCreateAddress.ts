import { useMutation } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { CREATE_ADDRESS_MUTATION } from "./query/addressesQuery";

type CreateAddressResponse = { id: string; addresses: Omit<AddressData, "city">[] };

export const useCreateAddress = () => {
  const { data, mutateAsync, isPending } = useMutation<CreateAddressResponse, any, { id: string; userData: any }>({
    mutationFn: async ({ id, userData }) => {
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
