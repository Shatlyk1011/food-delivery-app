import axios from "../shared/lib/axios";

//jotai
import { useSetAtom } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

import { LOGIN_MUTATION, LOGOUT_MUTATION } from "../services/query";
import { useQueryClient } from "@tanstack/react-query";

const useAuth = () => {
  const setAuth = useSetAtom(atoms.isAuth);
  const setUserProfile = useSetAtom(atoms.userProfile);

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

      console.log("response.user", response.user);
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
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    return data.data.logoutUser;
  };

  return { login, logout };
};

export default useAuth;
