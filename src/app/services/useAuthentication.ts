import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { LOGIN_ME, REGISTER_MUTATION } from "./query/authQuery";
import useToast from "../hooks/useToast";

type LoginFn = (crededentials: LoginCredentials) => Promise<LoginResponse>;

export const loginMe = () => {
  const { data } = useQuery<UserData>({
    queryFn: async () => {
      const { data } = await axios({
        withCredentials: true,
        data: {
          query: LOGIN_ME,
        },
      });
      return await data.data.meUser.user;
    },
    staleTime: 1000 * 60 * 30,
    queryKey: ["currentUser"],
  });

  return { currentUser: data };
};

export const useRegister = (loginFn: LoginFn) => {
  const toast = useToast();
  const { data, mutateAsync } = useMutation<{ name: string }, any, any, any>({
    mutationFn: async (userData) => {
      try {
        const { data } = await axios({
          data: {
            query: REGISTER_MUTATION,
            variables: { userData },
          },
        });
        if (data.errors) {
          throw new Error(data.errors[0].extensions.data[0].message);
        }
        return data.data.createUser;
      } catch (err) {
        throw err;
      }
    },
    async onSettled(data, error, variables) {
      const { email, password } = variables;
      if (data?.name) {
        await loginFn({ email, password });
      } else if (error) {
        toast(error, "error");
      }
    },
  });

  return { data, register: mutateAsync };
};
