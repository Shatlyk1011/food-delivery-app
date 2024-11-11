import { FC, useState } from "react";

//components
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shared-ui/Form/form";
import Input from "@/components/shared-ui/Input";
import { EyeIcon } from "@/icons";

//hooks
import { useLoginScheme } from "@/hooks/formSchemes";
import useAuth from "@/hooks/useAuth";

interface Props {
  t: any;
  classes?: string;
}

const Index: FC<Props> = ({ t, classes }) => {
  const { form } = useLoginScheme();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)} className={`space-y-3 text-start ${classes}`}>
        {Object.keys(form.getValues()).map((key: "login" | "password") => (
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
          {t("Login.login")}
        </button>
      </form>
    </Form>
  );
};

export default Index;
