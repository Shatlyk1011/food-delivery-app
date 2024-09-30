import { FC, useState } from "react";

//components
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/shared-ui/Form/form";
import Input from "@/app/components/shared-ui/Input";
import { EyeIcon } from "lucide-react";

//hooks
import { useRegisterScheme } from "@/app/hooks/formSchemes";
import useAuth from "@/app/hooks/useAuth";

import { useRegister } from "@/app/services/useAuthentication";

interface Props {
  t: any;
  classes?: string;
}

const Index: FC<Props> = ({ t, classes }) => {
  const { form } = useRegisterScheme();
  const [showPassword, setShowPassword] = useState(false);
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
            render={({ field }) => {
              const isPassword = key === "password";

              return (
                <FormItem className={isPassword && "relative"}>
                  <FormControl>
                    <Input
                      placeholder={t(`Placeholder.${key}`)}
                      {...field}
                      type={isPassword && !showPassword ? "password" : "text"}
                      className="h-12 w-full px-[14px] sm:h-10 sm:px-2.5"
                      onFocus={(e) => e.target.removeAttribute("readonly")}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-1 top-[35%] m-0 translate-y-[-50%] rounded-full p-1.5 transition hover:bg-black/10 ${!isPassword && "hidden"}`}
                  >
                    <EyeIcon className="h-5 w-5 text-text-2" />
                  </button>
                </FormItem>
              );
            }}
          />
        ))}

        <button
          type="submit"
          className="h-12 w-full rounded-md bg-primary text-xl font-medium hover:bg-accent sm:h-10 sm:text-base"
        >
          {t("Login.register")}
        </button>
      </form>
    </Form>
  );
};

export default Index;
