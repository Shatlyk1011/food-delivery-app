"use client";
import { useRouter } from "@/app/(pages)/_providers/i18n/navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";

import useChangeLanguage from "@/app/hooks/useChangeLanguage";

//components
import Authorization from "@/app/components/authorization-ui/Authorization";
import Regions from "@/app/components/navigation-ui/Cities";
import Language from "@/app/components/navigation-ui/Language";
import MiniBucket from "@/app/components/navigation-ui/MiniBucket";
import MiniBucketMobile from "@/app/components/navigation-ui/MiniBucketMobile";
import Profile from "@/app/components/navigation-ui/Profile";
import Search from "@/app/components/navigation-ui/Search";
import { MenuIcon } from "lucide-react";
import SidebarTrigger from "@/app/components/navigation-ui/SidebarItems";

import { CITIES } from "@/app/data";

//jotai
import { useAtom } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

interface Props {}

const Index: FC<Props> = ({}) => {
  const { push } = useRouter();
  const { languageTitle, handleChange } = useChangeLanguage();

  const [isAuth, setAuth] = useAtom(atoms.isAuth);
  const t = useTranslations();
  return (
    <header className="fixed top-0 z-20 flex h-20 w-screen items-center justify-between space-x-10 bg-bg-1 px-5 py-4 shadow-md xl:space-x-6 xl:px-4 lg:space-x-4 md:h-16 md:space-x-2 md:px-4 md:py-2">
      <div className="flex items-center space-x-3 xl:flex-grow xl:space-x-2">
        <SidebarTrigger>
          <MenuIcon className="h-6 w-6" />
        </SidebarTrigger>
        <button className="md:hidden" type="button" onClick={() => push("/")}>
          <div className="text-2xl">logo</div>
        </button>

        <Search searchTitle={t("Index.search")} searchPlaceholder={t("Index.searchPlaceholder")} />
        <Regions cities={CITIES} regionsTitle={t("Index.chooseCity")} regionTitle={t("Index.city")} />
      </div>
      <div className="flex items-center space-x-4 md:space-x-0">
        <Language languageTitle={languageTitle} handleChange={handleChange} />
        {isAuth ? (
          <>
            <MiniBucket t={t} />
            <MiniBucketMobile t={t} />
            <Profile t={t} />
          </>
        ) : (
          <Authorization t={t} />
        )}
      </div>
    </header>
  );
};
export default Index;
