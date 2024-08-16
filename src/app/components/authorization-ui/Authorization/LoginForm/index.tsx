import { FC } from "react";
import { setCookie } from "cookies-next";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/shared-ui/Form/form";

import Input from "@/app/components/shared-ui/Input";

//jotai
import atoms from "@/app/(pages)/_providers/jotai";
import { useSetAtom } from "jotai";

import { useLoginScheme } from "@/app/hooks/formSchemes";

import { useLogin } from "@/app/services/useAuthentication";

import { USER_INFO } from "@/app/shared/constants";

interface Props {
  t: any;
  classes?: string;
}

const Index: FC<Props> = ({ t, classes }) => {
  const { form } = useLoginScheme();

  const { login } = useLogin();

  const setAuth = useSetAtom(atoms.isAuth);
  const setUserProfile = useSetAtom(atoms.userProfile);

  const handleLogin = async (values: any) => {
    const response = await login(values);

    if (response?.token) {
      setAuth(true);
      setUserProfile(response?.user);

      setCookie(USER_INFO, response.token, {
        maxAge: response.exp,
      });
      console.log("response.user", response.user);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className={`space-y-3 text-start ${classes}`}>
        {Object.keys(form.getValues()).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as any}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t(`Placeholder.${key}`)} {...field} className="h-12 w-full px-[14px]" />
                </FormControl>
                <FormMessage className="mt-1" />
              </FormItem>
            )}
          />
        ))}

        <button type="submit" className="h-12 w-full rounded-md bg-primary text-xl font-medium hover:bg-accent">
          {t("Login.login")}
        </button>
      </form>
    </Form>
  );
};

export default Index;
