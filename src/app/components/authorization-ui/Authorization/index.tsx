import dynamic from "next/dynamic";
import { FC, Suspense, useState } from "react";

//components
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/shared-ui/Dialog";
const LoginForm = dynamic(() => import("./LoginForm"));
const RegisterForm = dynamic(() => import("./RegisterForm"));

interface Props {
  t: any;
}

const Index: FC<Props> = ({ t }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild className="h-10 rounded-xl bg-gray-1 px-4 font-medium text-text-2">
        <button type="button">{t("Login.login")}</button>
      </DialogTrigger>

      <DialogContent className="gap-0 rounded-md p-0 text-center">
        <h2 className="mb-[6px] mt-8 text-3xl font-bold">{isLogin ? t("Login.login") : t("Login.register")}</h2>
        <p className="mb-[18px] text-text-3">{isLogin ? t("Login.loginViaEmail") : t("Login.registerAccount")}</p>

        <Suspense fallback={"Loading..."}>
          {isLogin ? <LoginForm classes="px-6" t={t} /> : <RegisterForm classes="px-6" t={t} />}
        </Suspense>

        <p className="leading54 px-6 py-2.5 text-text-3">{t("Login.rules")}</p>

        <div className="border-t border-text-4 pb-3 pt-4 font-medium">
          <p>
            <span className="text-text-3">{isLogin ? t("Login.noAccount") : t("Login.haveAccount")} </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer border-b border-[transparent] py-0.5 transition hover:border-text-2"
            >
              {isLogin ? t("Login.register") : t("Login.login")}
            </button>
          </p>
          {isLogin && (
            <button className="mt-1 cursor-pointer border-b border-[transparent] py-0.5 transition hover:border-text-2">
              {t("Login.resetPassword")}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Index;
