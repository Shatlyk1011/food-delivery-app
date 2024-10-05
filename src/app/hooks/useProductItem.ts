import { useCallback, useMemo } from "react";
//jotai
import atoms from "@/app/(pages)/_providers/jotai";
import { useAtom, useSetAtom } from "jotai";

//MEMOIZE
import { DEFAULT_RESTAURANT_INFO } from "../data";
import useToast from "./useToast";

const useProductItem = () => {
  const toast = useToast();

  const [selectedItems, setSelectedItems] = useAtom(atoms.selectedItems);
  const setClearModal = useSetAtom(atoms.isClearBucketModal);

  const increaseItem = useCallback((itemToIncrease: any) => {
    setSelectedItems((prev) => {
      const increasedCount = prev.dishes.map((item) => {
        if (item.id === itemToIncrease.id) {
          if (item.count === item.availableAmount) {
            toast("Actions.maxAvailableAmount", "info", { position: "bottom-left" });
            return item;
          }
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      return { ...prev, dishes: increasedCount };
    });
  }, []);

  const decreaseItem = useCallback(
    (itemToDecrease: any) => {
      setSelectedItems((prev) => {
        const filteredItems = prev.dishes.filter((item) => {
          if (item.id === itemToDecrease.id && item.count === 1) return false;
          return true;
        });

        const updatedItems = filteredItems.map((item) => {
          if (item.id === itemToDecrease.id && item.count > 1) {
            return { ...item, count: item.count - 1 };
          }
          return item;
        });

        return { ...prev, dishes: updatedItems };
      });
    },
    [setSelectedItems],
  );

  const addItem = useCallback(
    (itemToAdd: any, restaurantInfo: RestaurantLocalInfo) => {
      const last = selectedItems?.dishes.at(-1);
      if (last && last.restaurant?.id !== restaurantInfo.id) {
        setClearModal(true);
        return;
      }

      const exists = selectedItems.dishes.find((item) => item.id === itemToAdd.id);
      if (exists) {
        increaseItem(itemToAdd);
      } else {
        setSelectedItems((prev) => ({
          dishes: [...prev.dishes, { ...itemToAdd, count: 1 }],
          //6 hours
          timestamp: new Date().getTime() + 6 * 360 * 1000,
        }));
      }
    },
    [selectedItems, setClearModal, setSelectedItems, increaseItem],
  );

  const toggleDelivery = useCallback(
    (isDelivery: boolean) => {
      setSelectedItems((prev) => ({
        ...prev,
        isDelivery,
      }));
    },
    [setSelectedItems],
  );

  const clearItems = useCallback(() => {
    setSelectedItems(DEFAULT_RESTAURANT_INFO);
  }, [setSelectedItems]);

  const totalPrice = useMemo(() => {
    return selectedItems?.dishes?.reduce((prev, curr) => prev + curr.price * curr.count || 1, 0);
  }, [selectedItems.dishes]);

  const totalDishes = useMemo(() => {
    return selectedItems?.dishes?.reduce((curr, item) => curr + item.count || 1, 0);
  }, [selectedItems.dishes]);

  const restId = selectedItems.dishes.at(-1)?.restaurant.id;

  return {
    selectedItems,
    restId,
    increaseItem,
    decreaseItem,
    addItem,
    clearItems,
    totalPrice,
    totalDishes,
    toggleDelivery,
  };
};

export default useProductItem;
