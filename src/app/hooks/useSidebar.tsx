import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

//jotai
import atoms from "@/app/(pages)/_providers/jotai";
import { useAtom } from "jotai";

import useChangeLanguage from "./useChangeLanguage";

//components
import { BucketIcon, EarthIcon, ExitIcon, HomeIcon, LocationIcon, ProfileIcon } from "../icons";
import MiniDishesCount from "@/app/components/navigation-ui/TotalDishesCount";
import { CITIES, LANGUAGES } from "../data";

const useSidebar = (isAuth = true) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(atoms.isSidebarOpen);
  const [selectedCity, setSelectedCity] = useAtom(atoms.selectedCity);
  const [overlap, setOverlap] = useState("");

  const { languageTitle, handleChange } = useChangeLanguage();

  const t = useTranslations();

  function handleToProfile() {
    // router.push("/profile");
    setIsSidebarOpen(false);
  }
  function handleHome() {
    router.push("/");
    setIsSidebarOpen(false);
  }
  function handleToBucket() {
    router.push("/bucket");
    setIsSidebarOpen(false);
  }
  function handleCitySelect(item: string) {
    setSelectedCity(item);
    closeOverlap();
  }
  function handleClose() {
    setIsSidebarOpen(false);
    closeOverlap();
  }
  function closeOverlap() {
    setOverlap("");
  }

  const list = [
    {
      title: t("Index.home"),
      icon: <HomeIcon className="h-5 w-5" />,
      onClick: handleHome,
      authRequired: true,
    },
    {
      title: t("Index.profile"),
      icon: <ProfileIcon className="h-5 w-5" />,
      onClick: handleToProfile,
      authRequired: true,
    },
    {
      title: t("Index.bucket"),
      icon: <BucketIcon className="h-5 w-5" />,
      onClick: handleToBucket,
      authRequired: true,
      miniDishesCount: <MiniDishesCount className="right-0staging relative" />,
    },
    {
      title: selectedCity ? `${t("Index.city")}: ${selectedCity}` : t("Index.chooseCity"),
      icon: <LocationIcon className="h-5 w-5" />,
      onClick: () => setOverlap("cities"),
      authRequired: false,
    },
    {
      title: `${t("Index.language")}: ${languageTitle}`,
      icon: <EarthIcon className="h-5 w-5" />,
      onClick: () => setOverlap("language"),
      authRequired: false,
    },
    { title: t("Index.logout"), icon: <ExitIcon className="h-5 w-5" />, onClick: handleClose, authRequired: true },
  ];
  const sidebarList = (() => (!isAuth ? list.filter((item) => item.authRequired === false) : list))();
  const overlapList = overlap === "language" ? LANGUAGES : CITIES;

  return {
    isSidebarOpen,
    overlap,
    sidebarList,
    overlapList,
    handleCitySelect,
    handleLanguageChange: handleChange,
    handleClose,
    closeOverlap,
  };
};

export default useSidebar;
