import { useRouter } from "next/navigation";
import { FC } from "react";

import useProductItem from "@/app/hooks/useProductItem";

//components
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { BucketIcon, EmptyBucketIcon } from "@/app/icons";
import { PopoverClose } from "@radix-ui/react-popover";
import MiniItem from "./MiniItem";
import MiniDishesCount from "../TotalDishesCount";

interface Props {
  t: any;
}

const Index: FC<Props> = ({ t }) => {
  const { selectedItems, totalDishes, increaseItem, decreaseItem, clearItems, totalPrice } = useProductItem();

  const router = useRouter();

  const handleToBucket = () => {
    if (selectedItems.dishes.length > 0) {
      router.push("/bucket");
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild className="right-50 md:hidden">
        <button className="relative flex h-12 items-center space-x-1.5 rounded-[16px] bg-primary px-4 py-2.5 md:h-10 md:px-3">
          <BucketIcon />
          <p className="font-medium xl:hidden">{totalPrice}$</p>
          <MiniDishesCount count={totalDishes} className="absolute -right-2 -top-2 " />
        </button>
      </PopoverTrigger>
      <PopoverContent
        isCover={true}
        className="top-[50%] z-[51] ml-[-200px] min-w-[448px] rounded-[16px] px-6 py-8 shadow-2xl"
      >
        <div className="">
          <div className="mb-5 flex justify-between">
            <h5 className="text-2xl font-medium">{t("Index.bucket")}</h5>
            <button
              onClick={clearItems}
              type="button"
              className="font-base h-7 border-b border-[transparent] font-medium text-text-4 hover:border-text-4"
            >
              {t("Index.clear")}
            </button>
          </div>
          <div className="perfect-scrollbar h-96 space-y-6">
            {selectedItems && selectedItems.dishes.length > 0 ? (
              selectedItems?.dishes?.map((item) => (
                <MiniItem
                  key={item.id}
                  item={item}
                  decrease={() => decreaseItem(item)}
                  increase={() => increaseItem(item)}
                />
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center pt-2 text-center">
                <EmptyBucketIcon className="text-text-4/70" />
                <p className="mt-4 px-2 text-xl font-semibold leading-[1.25] text-text-2 ">{t("Index.emptyBucket")}</p>
              </div>
            )}
          </div>
          <PopoverClose
            onClick={handleToBucket}
            disabled={selectedItems?.dishes?.length === 0}
            type="button"
            className="mt-6 flex w-full justify-between rounded-[14px] bg-primary px-[18px] py-2.5 text-xl hover:bg-accent disabled:bg-black/10 disabled:text-black/50"
          >
            <p className="">{t("Index.toBucket")}</p>
            <p className="font-medium">{totalPrice}$</p>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Index;
