"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

//components
import { PopoverClose } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { ProfileIcon } from "@/app/icons";
import { LogoutIcon } from "@/app/icons/LogoutIcon";

import { USER_PROFILE } from "@/app/shared/constants";

import useAuth from "@/app/hooks/useAuth";

//jotai
import { useSetAtom } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

interface Props {
  t: any;
}

const Index: FC<Props> = ({ t }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const setAuth = useSetAtom(atoms.isAuth);

  const handleToProfile = () => {
    push("/profile");
  };

  const handleLogout = () => {
    logout();
    setAuth(false);
    localStorage.removeItem(USER_PROFILE);
    if (pathname.includes("/profile")) {
      push("/");
    }
  };

  return (
    <Popover>
      <PopoverTrigger type="button" className="flex items-center rounded-3xl bg-gray-1 p-2 md:hidden">
        <ProfileIcon className="fill-bg-1" />
      </PopoverTrigger>
      <PopoverContent className="mr-2 mt-2 w-64 border border-gray-1 bg-gray-3 shadow-xl">
        <p className="mb-2 border-b border-gray-1 px-4 py-2 text-xl font-bold">{t("Index.account")}</p>
        <PopoverClose onClick={handleToProfile} className="flex w-full space-x-3 p-3 text-lg hover:bg-gray-2/50">
          <ProfileIcon />
          <p> {t("Index.profile")}</p>
        </PopoverClose>
        <button onClick={handleLogout} className="mt-1 flex w-full space-x-3 p-3 text-start text-lg hover:bg-gray-2/50">
          <LogoutIcon />
          <p>{t("Index.logout")}</p>
        </button>
      </PopoverContent>
    </Popover>
  );
};
export default Index;
