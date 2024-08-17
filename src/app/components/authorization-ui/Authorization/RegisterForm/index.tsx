import { FC } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/shared-ui/Form/form";

import Input from "@/app/components/shared-ui/Input";

import { useRegisterScheme } from "@/app/hooks/formSchemes";

import { useRegister } from "@/app/services/useAuthentication";
import useAuth from "@/app/hooks/useAuth";

interface Props {
  t: any;
  classes?: string;
}

const Index: FC<Props> = ({ t, classes }) => {
  const { form } = useRegisterScheme();

  const { login } = useAuth();

  const { register } = useRegister(login);

  const handleLogin = async (values: any) => {
    await register(values);
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
          {t("Login.register")}
        </button>
      </form>
    </Form>
  );
};

export default Index;
