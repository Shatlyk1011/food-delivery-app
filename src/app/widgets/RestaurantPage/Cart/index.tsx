import { FC } from "react";

//components
import AddedItem from "@/app/components/restaurant-page-ui/Cart/AddedItem";
import CartInfo from "@/app/components/restaurant-page-ui/Cart/CartInfo";
import CartButton from "@/app/components/restaurant-page-ui/Cart/CartButton";
import { EmptyBucketIcon } from "@/app/icons";

import useProductItem from "@/app/hooks/useProductItem";

interface Props {
  restaurantInfo: CartInfo;
  t: any;
  isDelivery: boolean;
}

const Index: FC<Props> = ({ restaurantInfo, t }) => {
  const { selectedItems, increaseItem, decreaseItem, clearItems, totalPrice } = useProductItem();

  return (
    <div className="h-[calc(100vh-140px)] overflow-hidden rounded-[16px] bg-bg-1">
      <div className="flex h-16 items-center justify-between px-4 py-2">
        <h5 className="text-xl font-medium 2xl:text-lg xl:text-base">{restaurantInfo.title}</h5>
        <button className="text-base text-text-4 hover:text-text-3" onClick={clearItems}>
          {t("Index.clear")}
        </button>
      </div>

      <ul className="perfect-scrollbar h-[calc(100vh-354px)] space-y-4 p-4 pt-0">
        {selectedItems && selectedItems.dishes?.length > 0 ? (
          selectedItems?.dishes?.map((item, index) => (
            <AddedItem
              key={index}
              item={item}
              increaseItem={() => increaseItem(item)}
              decreaseItem={() => decreaseItem(item)}
            />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center pt-2  text-center">
            <EmptyBucketIcon className="text-text-4/70" />
            <p className="mt-4 px-2 text-xl font-semibold leading-[1.25] text-text-2 ">{t("Index.emptyBucket")}</p>
          </div>
        )}
      </ul>

      {selectedItems?.dishes.length > 0 && (
        <div className="mx-4 mb-6 border-t border-text-4 pt-4">
          <CartInfo selfCareTime={30} restaurantInfo={restaurantInfo} isDelivery={true} t={t} />
          <CartButton submitTitle={t("Index.toBucket")} total={totalPrice} />
        </div>
      )}
    </div>
  );
};
export default Index;
