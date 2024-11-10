import dynamic from "next/dynamic";
import { FC, useState } from "react";

import Spinner from "@/app/components/shared-ui/Spinner";

//components
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/app/components/shared-ui/Dialog";
const LoginForm = dynamic(() => import("./LoginForm"), {
  loading: () => <Spinner />,
});
const RegisterForm = dynamic(() => import("./RegisterForm"), {
  loading: () => <Spinner />,
});

interface Props {
  t: any;
}

const Index: FC<Props> = ({ t }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild className="h-10 rounded-xl bg-gray-1 px-4 font-medium text-text-2">
        <button type="button">{t("Login.login")}</button>
      </DialogTrigger>

      <DialogContent className="mx-auto gap-0 rounded-md p-0 text-center md:max-w-[90%]">
        <DialogTitle className="mb-[6px] mt-8 text-3xl font-bold sm:mt-5 sm:text-2xl">
          {isLogin ? t("Login.login") : t("Login.register")}
        </DialogTitle>
        <p className="mb-[18px] text-text-3 sm:mb-3">
          {isLogin ? t("Login.loginViaEmail") : t("Login.registerAccount")}
        </p>

        {isLogin ? <LoginForm classes="px-6" t={t} /> : <RegisterForm classes="px-6" t={t} />}

        <p className="leading px-6 py-2.5 text-text-3 sm:px-4 sm:text-sm">{t("Login.rules")}</p>

        <div className="border-t border-text-4 pb-3 pt-4 font-medium sm:pb-2 sm:pt-2 sm:text-sm">
          <p>
            <span className="text-text-3">{isLogin ? t("Login.noAccount") : t("Login.haveAccount")} </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer border-b border-[transparent] py-0.5 transition hover:border-text-2"
            >
              {isLogin ? t("Login.register") : t("Login.login")}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Index;
