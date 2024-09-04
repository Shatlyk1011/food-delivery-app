import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { DEFAULT_RESTAURANT_INFO } from "@/app/data";

const isClearBucketModal = atom(false);
const isSidebarOpen = atom(false);
const isAuth = atom(false);
const query = atom("");

const selectedLanguage = atomWithStorage("LANGUAGE", "ru");
const selectedCity = atomWithStorage("CITY", "Turkmenabat");
const selectedItems = atomWithStorage<RestaurantWithDishesInfo>("DISHES", DEFAULT_RESTAURANT_INFO, {
  getItem(key, initialValue) {
    const storedVal = localStorage.getItem(key);

    if (!storedVal) {
      return initialValue;
    }

    const parsedVal = JSON.parse(storedVal);
    const currentTime = new Date().getTime();

    const isExpired = parsedVal.timestamp < currentTime;

    return isExpired ? initialValue : parsedVal;
  },
  setItem(key, newValue) {
    localStorage.setItem(key, JSON.stringify(newValue));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
});
const userProfile = atomWithStorage<UserData | null>("USER_PROFILE", null);

const atoms = {
  isSidebarOpen,
  selectedItems,
  selectedLanguage,
  isAuth,
  query,
  selectedCity,
  isClearBucketModal,
  userProfile,
};

export default atoms;
