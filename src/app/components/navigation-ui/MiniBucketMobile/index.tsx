import { useRouter } from "next/navigation";
import { FC } from "react";
//components
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "@/app/components/shared-ui/Drawer";
import EmptyBucket from "@/app/components/shared-ui/EmptyBucket";
import MiniDishesCount from "../TotalDishesCount";
import MiniItem from "../MiniBucket/MiniItem";
import { BucketIcon } from "@/app/icons";

import useProductItem from "@/app/hooks/useProductItem";

interface Props {
  t: any;
}

const Index: FC<Props> = ({ t }) => {
  const { selectedItems, increaseItem, decreaseItem, clearItems, totalPrice } = useProductItem();

  const router = useRouter();

  const handleToBucket = () => router.push("/bucket");
  return (
    <Drawer>
      <DrawerTrigger className="relative hidden h-12 items-center space-x-1.5 rounded-[16px] bg-primary px-4 py-2.5 md:flex md:h-10 md:px-2.5">
        <BucketIcon />
        <p className="font-medium xl:hidden">{totalPrice ?? 2000}TMT</p>
        <MiniDishesCount className="absolute -right-3 -top-2 " />
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <div className="mb-4 flex justify-between px-4">
            <h5 className="text-2xl font-medium">{t("Index.bucket")}</h5>
            <button
              onClick={clearItems}
              type="button"
              className="font-base h-7 border-b border-[transparent] font-medium text-text-4 hover:border-text-4"
            >
              {t("Index.clear")}
            </button>
          </div>
          <div className="perfect-scrollbar h-96 space-y-6 pl-4 pr-2">
            {selectedItems?.dishes?.map((item) => (
              <MiniItem
                key={item.id}
                item={item}
                decrease={() => decreaseItem(item)}
                increase={() => increaseItem(item)}
              />
            ))}
            {!selectedItems?.dishes.length && <EmptyBucket title={t("Index.noItems")} />}
          </div>
          <DrawerFooter>
            <DrawerClose
              onClick={handleToBucket}
              type="button"
              className="flex w-full justify-between rounded-[14px] bg-primary px-[18px] py-2.5 text-xl hover:bg-accent sm:text-base "
            >
              <p className="">{t("Index.toBucket")}</p>
              <p className="font-medium">{totalPrice}TMT</p>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Index;
