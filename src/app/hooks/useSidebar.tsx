import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

//jotai
import atoms from "@/app/(pages)/_providers/jotai";
import { useAtom, useAtomValue } from "jotai";

//hooks
import useAuth from "./useAuth";
import useChangeLanguage from "./useChangeLanguage";
import useProductItem from "./useProductItem";
import { useGetCities } from "../services/useCities";

//components
import { BucketIcon, EarthIcon, ExitIcon, HomeIcon, LocationIcon, ProfileIcon } from "../icons";
import MiniDishesCount from "@/app/components/navigation-ui/TotalDishesCount";
import { LANGUAGES } from "../data";

const useSidebar = () => {
  const router = useRouter();
  const isAuth = useAtomValue(atoms.isAuth);

  const { cities } = useGetCities();

  const { totalDishes } = useProductItem();

  const [isSidebarOpen, setIsSidebarOpen] = useAtom(atoms.isSidebarOpen);
  const [selectedCity, setSelectedCity] = useAtom(atoms.selectedCity);
  const [overlap, setOverlap] = useState("");

  // ya eto isprawlyu
  const { languageTitle, handleChange } = useChangeLanguage();
  const { logout } = useAuth();

  const t = useTranslations("Index");

  function handleToProfile() {
    router.push("/profile");
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
      title: t("home"),
      icon: <HomeIcon className="h-5 w-5" />,
      onClick: handleHome,
      authRequired: true,
    },
    {
      title: t("profile"),
      icon: <ProfileIcon className="h-5 w-5" />,
      onClick: handleToProfile,
      authRequired: true,
    },
    {
      title: t("bucket"),
      icon: <BucketIcon className="h-5 w-5" />,
      onClick: handleToBucket,
      authRequired: true,
      miniDishesCount: <MiniDishesCount count={totalDishes} className="right-0staging relative" />,
    },
    {
      title: selectedCity ? `${t("city")}: ${selectedCity}` : t("chooseCity"),
      icon: <LocationIcon className="h-5 w-5" />,
      onClick: () => setOverlap("cities"),
      authRequired: false,
    },
    {
      title: `${t("language")}: ${languageTitle}`,
      icon: <EarthIcon className="h-5 w-5" />,
      onClick: () => setOverlap("language"),
      authRequired: false,
    },
    {
      title: t("logout"),
      icon: <ExitIcon className="h-5 w-5" />,
      onClick: () => {
        handleClose();
        logout();
      },
      authRequired: true,
    },
  ];
  const sidebarList = (() => (!isAuth ? list.filter((item) => item.authRequired === false) : list))();
  const overlapList = overlap === "language" ? LANGUAGES : cities;

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
