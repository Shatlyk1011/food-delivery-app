import { FC, useEffect, useState } from "react";

//components
import CartTabs from "@/app/components/restaurant-page-ui/Cart/CartTabs";
import AddedItem from "@/app/components/restaurant-page-ui/Cart/AddedItem";
import CartInfo from "@/app/components/restaurant-page-ui/Cart/CartInfo";
import CartButton from "@/app/components/restaurant-page-ui/Cart/CartButton";

import useProductItem from "@/app/hooks/useProductItem";

interface Props {
  restaurantInfo: { deliveryPrice: number; title: string };
  t: any;
  isDelivery: boolean;
}

const Index: FC<Props> = ({ restaurantInfo, t, isDelivery }) => {
  const [hasSelectedRestDelivery, setHasSelectedRestDelivery] = useState(undefined);
  const {
    selectedItems,
    increaseItem,
    decreaseItem,
    clearItems,
    totalPrice,
    toggleDelivery,
    isDelivery: selectedDelivery,
  } = useProductItem();

  useEffect(() => {
    if (selectedItems.dishes.length > 0) {
      const lastDish = selectedItems.dishes.at(-1);
      if (lastDish?.restaurant.isDelivery === false) {
        setHasSelectedRestDelivery(false);
      } else {
        setHasSelectedRestDelivery(true);
      }
    } else {
      setHasSelectedRestDelivery(isDelivery);
    }
  }, [isDelivery, selectedItems]);

  return (
    <div className="h-[calc(100vh-140px)] overflow-hidden rounded-[16px] bg-bg-1">
      <div className="flex h-16 items-center justify-between px-4 py-2">
        <h5 className="text-xl font-medium 2xl:text-lg xl:text-base">{restaurantInfo.title}</h5>
        <button className="text-base text-text-4 hover:text-text-3" onClick={clearItems}>
          {t("Index.clear")}
        </button>
      </div>

      <CartTabs
        t={t}
        handleChange={toggleDelivery}
        isDelivery={hasSelectedRestDelivery}
        selectedDelivery={hasSelectedRestDelivery === false ? false : selectedDelivery}
      />

      <ul className="perfect-scrollbar h-[calc(100vh-430px)] space-y-4 p-4 pt-0">
        {selectedItems?.dishes?.map((item, index) => (
          <AddedItem
            key={index}
            item={item}
            increaseItem={() => increaseItem(item)}
            decreaseItem={() => decreaseItem(item)}
          />
        ))}
      </ul>

      <div className="mx-4 mb-6 border-t border-text-4 pt-4">
        <CartInfo deliveryPrice={restaurantInfo?.deliveryPrice} isDelivery={selectedDelivery} t={t} />
        <CartButton submitTitle={t("Index.toBucket")} total={totalPrice} />
      </div>
    </div>
  );
};
export default Index;
