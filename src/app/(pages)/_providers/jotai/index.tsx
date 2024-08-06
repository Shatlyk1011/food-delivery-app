import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { DEFAULT_RESTAURANT_INFO } from "@/app/data";

const isClearBucketModal = atom(false);
const isSidebarOpen = atom(false);
const isAuth = atom(false);

const selectedCity = atomWithStorage("CITY", "Turkmenabat");
const selectedLanguage = atomWithStorage("LANGUAGE", "ru");
const selectedItems = atomWithStorage<RestaurantWithDishesInfo>("DISHES", DEFAULT_RESTAURANT_INFO);

const atoms = {
  isSidebarOpen,
  selectedLanguage,
  selectedItems,
  isAuth,
  selectedCity,
  isClearBucketModal,
};

export default atoms;
