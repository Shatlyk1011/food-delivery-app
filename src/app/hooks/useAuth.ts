import axios from "../shared/lib/axios";

//jotai
import { useSetAtom } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

import { LOGIN_MUTATION, LOGOUT_MUTATION } from "../services/query/authQuery";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "./useToast";

const useAuth = () => {
  const setAuth = useSetAtom(atoms.isAuth);
  const setUserProfile = useSetAtom(atoms.userProfile);

  const toast = useToast();

  const queryClient = useQueryClient();

  const login = async (variables: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axios({
      // withCredentials: true,
      data: {
        query: LOGIN_MUTATION,
        variables,
      },
    });

    const response = (await data.data.loginUser) as LoginResponse;

    if (response?.token) {
      setAuth(true);
      setUserProfile(response?.user);
      location.reload();
    }
    return response;
  };

  const logout = async () => {
    const { data } = await axios({
      data: {
        query: LOGOUT_MUTATION,
      },
    });
    setUserProfile(null);
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    if (data.data.logoutUser) {
      toast("Actions.logoutUser", "info");
    }
  };

  return { login, logout };
};

export default useAuth;
