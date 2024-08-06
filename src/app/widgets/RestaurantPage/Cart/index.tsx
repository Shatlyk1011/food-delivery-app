import { FC } from "react";

//components
import CartTabs from "@/app/components/restaurant-page-ui/Cart/CartTabs";
import AddedItem from "@/app/components/restaurant-page-ui/Cart/AddedItem";
import CartInfo from "@/app/components/restaurant-page-ui/Cart/CartInfo";
import CartButton from "@/app/components/restaurant-page-ui/Cart/CartButton";

import useProductItem from "@/app/hooks/useProductItem";

interface Props {
  restaurantTitle: string;
  t: any;
}

const Index: FC<Props> = ({ restaurantTitle, t }) => {
  const { selectedItems, increaseItem, decreaseItem, clearItems, totalPrice, toggleDelivery, isDelivery } =
    useProductItem();

  return (
    <div className="h-[calc(100vh-140px)] overflow-hidden rounded-[16px] bg-bg-1">
      <div className="flex h-16 items-center justify-between px-4 py-2">
        <h5 className="text-xl font-medium 2xl:text-lg xl:text-base">{restaurantTitle}</h5>
        <button className="text-base text-text-4 hover:text-text-3" onClick={clearItems}>
          {t("Index.clear")}
        </button>
      </div>

      <CartTabs t={t} handleChange={toggleDelivery} isDelivery={isDelivery} />

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
        <CartInfo isDelivery={isDelivery} t={t} />
        <CartButton submitTitle={t("Index.toBucket")} total={totalPrice} />
      </div>
    </div>
  );
};
export default Index;
