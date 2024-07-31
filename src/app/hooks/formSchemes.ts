import { buckerFormScheme, loginScheme, registerScheme } from "../shared/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSetAtom } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

export const useLoginScheme = () => {
  const setIsLogin = useSetAtom(atoms.isAuth);
  const form = useForm<z.infer<typeof loginScheme>>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginScheme>) {
    console.log(values);
    setIsLogin(true);
  }

  return { form, onSubmit };
};
export const useRegisterScheme = () => {
  const setIsLogin = useSetAtom(atoms.isAuth);
  const form = useForm<z.infer<typeof registerScheme>>({
    resolver: zodResolver(registerScheme),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerScheme>) {
    console.log(values);
    setIsLogin(true);
  }

  return { form, onSubmit };
};

export const useBucketFormScheme = () => {
  const form = useForm<z.infer<typeof buckerFormScheme>>({
    resolver: zodResolver(buckerFormScheme),
    defaultValues: {
      city: "",
      district: "",
      house_number: "",
      apartment: "",
      entrance: "",
      phone_number: "",
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof buckerFormScheme>) {
    console.log(values);
  }

  return { form, onSubmit };
};
