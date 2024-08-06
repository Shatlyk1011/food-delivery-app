//jotai
import atoms from "@/app/(pages)/_providers/jotai";
import { useAtom, useSetAtom } from "jotai";

import { DEFAULT_RESTAURANT_INFO } from "../data";

const useProductItem = () => {
  const [selectedItems, setSelectedItems] = useAtom(atoms.selectedItems);
  const setClearModal = useSetAtom(atoms.isClearBucketModal);

  const increaseItem = (itemToIncrease: any) => {
    const increasedCount = selectedItems.dishes.map((item) =>
      item.id === itemToIncrease.id ? { ...item, count: item.count + 1 } : item,
    );
    setSelectedItems((prev) => ({ ...prev, dishes: increasedCount }));
  };

  const decreaseItem = (itemToDecrease: any) => {
    const filteredItems = selectedItems.dishes.filter((item) => {
      if (item.id === itemToDecrease.id && item.count === 1) return false;
      return true;
    });

    const updatedItems = filteredItems.map((item) => {
      if (item.id === itemToDecrease.id && item.count > 1) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setSelectedItems((prev) => ({ ...prev, dishes: updatedItems }));
  };

  const addItem = (itemToAdd: any, restaurantInfo: RestaurantLocalInfo) => {
    if (selectedItems.restaurantInfo.id && selectedItems.restaurantInfo.id !== restaurantInfo.id) {
      setClearModal(true);
      return;
    }
    const exists = selectedItems.dishes.find((item) => item.id === itemToAdd.id);
    if (exists) {
      increaseItem(itemToAdd);
    } else {
      setSelectedItems({ restaurantInfo, dishes: [...selectedItems.dishes, { ...itemToAdd, count: 1 }] });
    }
    if (selectedItems.dishes.length > 0 && !selectedItems.restaurantInfo.id) {
      clearItems();
    }
  };

  const toggleDelivery = (isDelivery: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      restaurantInfo: { ...prev.restaurantInfo, isDelivery },
    }));
  };

  const clearItems = () => {
    setSelectedItems(DEFAULT_RESTAURANT_INFO);
  };

  const totalPrice = (() => selectedItems?.dishes?.reduce((prev, curr) => prev + curr.price * curr.count || 1, 0))();

  const totalDishes = (() => selectedItems?.dishes?.reduce((curr, item) => curr + item.count || 1, 0))();

  const isDelivery = selectedItems.restaurantInfo.isDelivery;

  const deliveryPrice = selectedItems.restaurantInfo.deliveryPrice;

  return {
    selectedItems,
    increaseItem,
    decreaseItem,
    addItem,
    clearItems,
    totalPrice,
    totalDishes,
    toggleDelivery,
    isDelivery,
    deliveryPrice,
  };
};

export default useProductItem;
