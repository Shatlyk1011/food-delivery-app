import { useRouter } from "next/navigation";
import { FC } from "react";

import useProductItem from "@/app/hooks/useProductItem";

//components
import EmptyBucket from "@/app/components/shared-ui/EmptyBucket";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { BucketIcon } from "@/app/icons";
import { PopoverClose } from "@radix-ui/react-popover";
import MiniItem from "./MiniItem";
import MiniDishesCount from "../TotalDishesCount";

interface Props {
  t: any;
}

const Index: FC<Props> = ({ t }) => {
  const { selectedItems, increaseItem, decreaseItem, clearItems, totalPrice } = useProductItem();

  const router = useRouter();

  const handleToBucket = () => router.push("/bucket");
  return (
    <Popover>
      <PopoverTrigger asChild className="right-50 md:hidden">
        <button className="relative flex h-12 items-center space-x-1.5 rounded-[16px] bg-primary px-4 py-2.5 md:h-10 md:px-3">
          <BucketIcon />
          <p className="font-medium xl:hidden">{totalPrice ?? 2000}TMT</p>
          <MiniDishesCount className="absolute -right-3 -top-2 " />
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
            {selectedItems?.dishes?.map((item) => (
              <MiniItem
                key={item.id}
                item={item}
                decrease={() => decreaseItem(item)}
                increase={() => increaseItem(item)}
              />
            ))}
            {!selectedItems?.dishes?.length && <EmptyBucket title={t("Index.noItems")} />}
          </div>
          <PopoverClose
            onClick={handleToBucket}
            type="button"
            className="mt-6 flex w-full justify-between rounded-[14px] bg-primary px-[18px] py-2.5 text-xl hover:bg-accent "
          >
            <p className="">{t("Index.toBucket")}</p>
            <p className="font-medium">{totalPrice}TMT</p>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Index;
