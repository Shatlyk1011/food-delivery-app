import { buckerFormScheme, loginScheme, registerScheme } from "../shared/lib/zod";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

//jotai
import { useSetAtom } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

import useProductItem from "./useProductItem";

export const useLoginScheme = () => {
  const t = useTranslations();
  const formSchema = loginScheme(t);

  const setIsLogin = useSetAtom(atoms.isAuth);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLogin(true);
  }

  return { form, onSubmit };
};

export const useRegisterScheme = () => {
  const t = useTranslations();
  const formSchema = registerScheme(t);

  const setIsLogin = useSetAtom(atoms.isAuth);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLogin(true);
  }

  return { form, onSubmit };
};

export const useBucketFormScheme = () => {
  const t = useTranslations();
  const formSchema = buckerFormScheme(t);
  const { selectedItems } = useProductItem();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      district: "",
      houseNumber: "",
      apartment: "",
      entrance: "",
      phoneNumber: "",
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    console.log("selectedItems", selectedItems);
  }

  return { form, onSubmit };
};
