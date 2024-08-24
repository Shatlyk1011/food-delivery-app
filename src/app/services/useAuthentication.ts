import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { LOGIN_ME, REGISTER_MUTATION } from "./query/authQuery";

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
  const { data, mutateAsync } = useMutation<{ name: string }, any, any, any>({
    mutationFn: async (userData) => {
      const { data } = await axios({
        data: {
          query: REGISTER_MUTATION,
          variables: { userData },
        },
      });

      return data.data.createUser;
    },
    onError: (err) => console.log("register mutation error", err),
    async onSettled(data, error, variables) {
      const { email, password } = variables;
      if (data?.name) {
        //toast with greeting !
        await loginFn({ email, password });
      } else {
        //something went wrong error
      }
    },
  });

  return { data, register: mutateAsync };
};
