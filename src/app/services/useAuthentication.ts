import { useMutation } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { LOGIN_ME, LOGIN_MUTATION, REGISTER_MUTATION } from "./query";

type LoginResponse = { exp: number; token: string; user: any };

type LoginCredentials = { email: string; password: string };

export const loginUser = async (variables: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await axios({
    withCredentials: true,
    data: {
      query: LOGIN_MUTATION,
      variables,
    },
  });

  const loginRes = (await data.data.loginUser) as LoginResponse;

  if (loginRes?.token) {
  }
  return loginRes;
};

export const loginMe = async () => {
  const { data } = await axios({
    withCredentials: true,
    data: {
      query: LOGIN_ME,
    },
  });

  console.log("MEEE", data);

  return data;
};

export const useLogin = () => {
  const { data, mutateAsync } = useMutation<LoginResponse, any, { email: string; password: string }, any>({
    mutationFn: async ({ email, password }) => loginUser({ email, password }),
  });

  return { data, login: mutateAsync };
};

export const useRegister = () => {
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
      console.log("variables", variables);
      const { email, password } = variables;
      console.log("register settle data", data);
      if (data?.name) {
        console.log("hmhmh");
        //toast with greeting !
        await loginUser({ email, password });
      } else {
        //something went wrong error
      }
    },
  });

  return { data, register: mutateAsync };
};
