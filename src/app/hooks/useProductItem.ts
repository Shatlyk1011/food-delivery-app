//jotai
import atoms from "@/app/(pages)/_providers/jotai";
import { useAtom } from "jotai";

const useProductItem = () => {
  const [selectedItems, setSelectedItems] = useAtom(atoms.selectedItems);

  const increaseItem = (itemToIncrease: any) => {
    const increasedCount = selectedItems.map((item) =>
      item.id === itemToIncrease.id ? { ...item, count: item.count + 1 } : item,
    );
    setSelectedItems(increasedCount);
  };

  const decreaseItem = (itemToDecrease: any) => {
    const filteredItems = selectedItems.filter((item) => {
      if (item.id === itemToDecrease.id && item.count === 1) return false;
      return true;
    });

    const updatedItems = filteredItems.map((item) => {
      if (item.id === itemToDecrease.id && item.count > 1) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setSelectedItems(updatedItems);
  };

  const addItem = (itemToAdd: any) => {
    const exists = selectedItems.find((item) => item.id === itemToAdd.id);
    if (exists) {
      increaseItem(itemToAdd);
    } else setSelectedItems([...selectedItems, { ...itemToAdd, count: 1 }]);
  };

  const clearItems = () => {
    setSelectedItems([]);
  };

  const totalPrice = (() => selectedItems?.reduce((prev, curr) => prev + curr.price * curr.count || 1, 0))();

  const totalDishes = (() => selectedItems?.reduce((curr, item) => curr + item.count || 1, 0))();
  return { selectedItems, increaseItem, decreaseItem, addItem, clearItems, totalPrice, totalDishes };
};

export default useProductItem;
