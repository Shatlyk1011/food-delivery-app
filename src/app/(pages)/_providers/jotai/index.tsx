import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const isSidebarOpen = atom(false);
const isDelivery = atom(true);
const isAuth = atom(false);

const selectedCity = atomWithStorage("CITY", "");
const selectedLanguage = atomWithStorage("LANGUAGE", "ru");
const selectedItems = atomWithStorage<any[]>("DISHES", []);

const atoms = {
  isSidebarOpen,
  selectedLanguage,
  selectedItems,
  isDelivery,
  isAuth,
  selectedCity,
};

export default atoms;
