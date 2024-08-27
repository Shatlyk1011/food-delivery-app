import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { DEFAULT_RESTAURANT_INFO } from "@/app/data";

const isClearBucketModal = atom(false);
const isSidebarOpen = atom(false);
const isAuth = atom(false);
const query = atom("");

const selectedCity = atomWithStorage("CITY", "Turkmenabat");
const selectedItems = atomWithStorage<RestaurantWithDishesInfo>("DISHES", DEFAULT_RESTAURANT_INFO);
const userProfile = atomWithStorage<UserData | null>("USER_PROFILE", null);

const atoms = {
  isSidebarOpen,
  selectedItems,
  isAuth,
  query,
  selectedCity,
  isClearBucketModal,
  userProfile,
};

export default atoms;
