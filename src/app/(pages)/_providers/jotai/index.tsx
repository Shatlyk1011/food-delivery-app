import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const isClearBucketModal = atom(false);
const isSidebarOpen = atom(false);
const isDelivery = atom(true);
const isAuth = atom(false);

const selectedCity = atomWithStorage("CITY", "");
const selectedLanguage = atomWithStorage("LANGUAGE", "ru");
const selectedItems = atomWithStorage<{ dishes: any[]; restaurantInfo: { id: string; name: string } }>("DISHES", {
  dishes: [],
  restaurantInfo: { id: "", name: "" },
});

const atoms = {
  isSidebarOpen,
  selectedLanguage,
  selectedItems,
  isDelivery,
  isAuth,
  selectedCity,
  isClearBucketModal,
};

export default atoms;
