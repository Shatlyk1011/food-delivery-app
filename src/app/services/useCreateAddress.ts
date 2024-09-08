import { useMutation } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { CREATE_ADDRESS_MUTATION } from "./query/addressesQuery";

import useToast from "../hooks/useToast";

type CreateAddressResponse = { id: string; phone: string; addresses: Omit<AddressData, "city">[] };

export const useCreateAddress = () => {
  const toast = useToast();
  const { data, mutateAsync, isPending } = useMutation<
    CreateAddressResponse,
    any,
    { id: string; userData: { addresses: AddressData[] } }
  >({
    mutationFn: async ({ id, userData }) => {
      const { data } = await axios({
        data: {
          query: CREATE_ADDRESS_MUTATION,
          variables: { id, userData },
        },
      });
      return await data.data.updateUser;
    },
    onSuccess: (data) => {
      if (data.id) {
        toast("Actions.successAddress", "success");
      }
    },
  });
  return { data, createAddress: mutateAsync, isPending };
};
